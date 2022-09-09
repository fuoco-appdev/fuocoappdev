import React from 'react';
import WorldController from '../controllers/world.controller';
import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";
import styles from './world.module.scss';
import * as AtmosphereShader from '../shaders/atmosphere.shader';
import * as TWEEN from '@tweenjs/tween.js';
import {WorldProps} from '../models';
import { useObservable } from '@ngneat/use-observable';
import { useLocation } from "react-router-dom";

export type WorldState = WorldProps;

class WorldComponent extends React.Component<WorldProps, WorldState> {
    private readonly _ref: React.RefObject<HTMLDivElement>;
    private readonly _globeRotation: {x: number, y: number};
    private readonly _prevMousePosition: {x: number, y: number};
    private readonly _delta: {x: number, y: number};
    private readonly _minDotRadius: number;
    private readonly _maxDotRadius: number;
    private _tween: TWEEN.Tween<{x: number, y: number}> | undefined;
    private _pressed: boolean;

    public constructor(props: WorldProps) {
        super(props);

        this.state = {
            isVisible: false, 
            location: undefined
        };
        
        this._ref = React.createRef();
        this._globeRotation = {x: 0, y: 0};
        this._prevMousePosition = {x: 0, y: 0};
        this._minDotRadius = 1.8;
        this._maxDotRadius = 3;
        this._pressed = false;
        this._delta = {x: 0, y: 0};

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mousedown', this.onMouseDown);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    public static getDerivedStateFromProps(props: WorldProps, state: WorldState) {
        if (props !== state) {
          return props;
        }

        return null;
    }

    public override async componentDidMount(): Promise<void> {
        const scene = new THREE.Scene();
        const width = this._ref.current?.clientWidth ?? 0;
        const height = this._ref.current?.clientHeight ?? 0;
        const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setSize( window.innerWidth, window.innerHeight );
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        if ((this._ref.current?.children.length ?? 0) <= 0) {
            this._ref.current?.appendChild(renderer.domElement);
        }

        const light = new THREE.PointLight(0xffffff, 1, 400);
        light.position.set(-40, 15, 0);
        light.castShadow = true;
        light.shadow.bias = -0.0001;
        light.shadow.mapSize.width = 1024 * 4;
        light.shadow.mapSize.height = 1024 * 4;
        scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.x = -1;
        directionalLight.position.y = 1;
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(ambientLight);

        const space = new THREE.BoxGeometry(100, 100, 50);
        const spaceMaterial = new THREE.MeshStandardMaterial( { color: 0x151d65, side: THREE.BackSide } );
        const spaceMesh = new THREE.Mesh(space, spaceMaterial);
        scene.add(spaceMesh);

        const baseEarth = new THREE.SphereGeometry(this._minDotRadius, 50, 50 );
        const baseEarthMaterial = new THREE.MeshStandardMaterial( { color: 0x373593, opacity: 0.9 } );
        baseEarthMaterial.transparent = true;
        const baseEarthMesh = new THREE.Mesh(baseEarth, baseEarthMaterial);
        baseEarthMesh.receiveShadow = true;

        const textureWidth = 2160;
        const textureHeight = 1080;
        const canvas = document.createElement("canvas");
        canvas.width = textureWidth;
        canvas.height = textureHeight;
        const ctx = canvas.getContext("2d");
        const imageData = await this.loadImageAsync(ctx, 'assets/images/map_alpha.png', textureWidth, textureHeight);

        const dotVector = new THREE.Vector3();
        const dotGeometry = new THREE.CircleGeometry(.01, 5);
        const dots: Array<THREE.BufferGeometry> = [];
        const dotCount = 60000;
        
        for (let i = 0; i < dotCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / dotCount);
            const theta = Math.sqrt(dotCount * Math.PI) * phi;
        
            dotVector.setFromSphericalCoords(this._minDotRadius, phi, theta);
                
            const latLong = this.vector3ToLatLong(dotVector, 2);
            const pixelPoint = this.latLongToVector2(
                latLong.long, 
                latLong.lat, 
                textureWidth, 
                textureHeight);
                
            const textureIndex = pixelPoint.y * textureWidth + pixelPoint.x;
            const pixel = imageData.at(textureIndex) ?? [0,0,0,0];
            const alpha = pixel[3];
            if (alpha > 0) {
                const geometry = dotGeometry.clone();
                geometry.lookAt(dotVector);
                geometry.translate(dotVector.x, dotVector.y, dotVector.z);
            
                dots.push(geometry);
            }
        }

        const geometriesDots = BufferGeometryUtils.mergeBufferGeometries(dots);
        const dotMaterial = new THREE.MeshStandardMaterial({color: 0x4AFFFF});
        const dotMesh = new THREE.Mesh(geometriesDots, dotMaterial);

        const atmosphere = new THREE.SphereGeometry(this._minDotRadius + .1, 50, 50);
        const atmosphereMaterial = new THREE.ShaderMaterial({
            uniforms: { 
                coeficient: {
                    value: .5
                },
                power: {
                    value: 2
                },
                glowColor: {
                    value: new THREE.Color(0x4AFFFF)
                },
            },
            vertexShader: AtmosphereShader.VertexShader,
            fragmentShader: AtmosphereShader.FragmentShader,
            blending	: THREE.AdditiveBlending,
            transparent	: true,
            depthWrite	: false,
        });
        const atmosphereMesh = new THREE.Mesh(atmosphere, atmosphereMaterial);
        const pivot = new THREE.Group();
        pivot.position.setX(2);
        scene.add(pivot);
        pivot.add(baseEarthMesh);
        pivot.add(dotMesh);
        pivot.add(atmosphereMesh);

        camera.position.z = 5;

        let aspect = 0;
        let animate = () => {
            requestAnimationFrame(animate);

            aspect = window.innerWidth/window.innerHeight;
            if (camera.aspect !== aspect) {
                camera.aspect = aspect;
                camera?.updateProjectionMatrix();
                renderer?.setSize(window.innerWidth, window.innerHeight);
            }

            if (!this._pressed) {
                this._globeRotation.y += 0.001;
                TWEEN.update();
            } 

            pivot.rotation.x = this._globeRotation.x;
            pivot.rotation.y = this._globeRotation.y;

            if (!this.state.isVisible) {
                pivot.scale.setScalar(0);
            }else {
                pivot.scale.setScalar(1);
            }
            
            renderer.render(scene, camera);
        };

        animate = animate.bind(this);

        animate();
    }

    public override render(): React.ReactNode {
        const {isVisible} = this.state;
        return <div className={isVisible ? styles["root"] : ''} ref={this._ref}/>;
    }

    private async loadImageAsync(
        context: CanvasRenderingContext2D | null, 
        src: string,
        width: number, 
        height: number
    ): Promise<Array<number[]>> {
        return new Promise<Array<number[]>>((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = () => {
                context?.drawImage(image, 0, 0);
                const data = context?.getImageData(0, 0, width, height);
                const uint32Array = new Array<number[]>();
                const length = data?.data.length ?? 0;
                for (let i = 0; i < length; i+=4) {
                    const uint32 = [
                        data?.data[i + 0] ?? 0,
                        data?.data[i + 1] ?? 0,
                        data?.data[i + 2] ?? 0,
                        data?.data[i + 3] ?? 0
                    ]
                    uint32Array.push(uint32);
                }

                resolve(uint32Array);
            };
            image.onerror = (error) => {
                console.error(error);
                reject(error);
            }
        });
    }

     private latLongToVector3(lat: number, lon: number, radius: number, height: number): THREE.Vector3 {
        const phi = (lat)*Math.PI/180;
        const theta = (lon-180)*Math.PI/180;

        const x = -(radius+height) * Math.cos(phi) * Math.cos(theta);
        const y = (radius+height) * Math.sin(phi);
        const z = (radius+height) * Math.cos(phi) * Math.sin(theta);

        return new THREE.Vector3(x,y,z);
    }

    private vector3ToLatLong(position: THREE.Vector3, radius: number): {lat: number, long: number} {
        const lat = 90 - (Math.acos(position.y / radius)) * 180 / Math.PI;
        const lon = ((270 + (Math.atan2(position.x , position.z)) * 180 / Math.PI) % 360) -360;
        return {lat: lat, long: lon};
    }

    private latLongToVector2(
        long: number, 
        lat: number,
        mapWidth: number, 
        mapHeight: number): THREE.Vector2 {
        const latitudeToRadians = ((lat * Math.PI) / 180);
        const mercN = Math.log(Math.tan((Math.PI / 4) + (latitudeToRadians / 2)));
        const x = ((long + 180) * (mapWidth / 360));
        const y = ((mapHeight / 2) - ((mapWidth * mercN) / (2 * Math.PI)));
        return new THREE.Vector2(Math.floor(x), Math.floor(y));
    }

    private onMouseMove(event: MouseEvent): void {
        if (!this._pressed) {
            this._prevMousePosition.x = event.clientX;
            this._prevMousePosition.y = event.clientY;
            return;
        }
      
        //calculate difference between current and last mouse position
        this._delta.x = event.movementX;
        this._delta.y = event.movementY;

        const moveX = (event.clientX - this._prevMousePosition.x);
        const moveY = (event.clientY - this._prevMousePosition.y);

        this._globeRotation.y += (moveX * .005);
        this._globeRotation.x += (moveY * .005);

        //store new position in lastMove
        this._prevMousePosition.x = event.clientX;
        this._prevMousePosition.y = event.clientY;
    }

    private onMouseDown(): void {
        if (!this._pressed) {
            this._pressed = true;
        }
    }

    private onMouseUp(): void {
        if (this._pressed) {
            this._pressed = false;

            this._tween?.stop();
            this._tween = new TWEEN.Tween(this._globeRotation)
                .to({
                    x: this._globeRotation.x + (this._delta.y * .005) * 10,
                    y: this._globeRotation.y + (this._delta.x * .005) * 10,
                }, 500)
                .easing(TWEEN.Easing.Cubic.Out)
                .start();
        }
    }
}

function ReactiveWorldComponent() {
    const [props] = useObservable(WorldController.model.store);
    const location = useLocation();
    WorldController.model.location = location;
    return <WorldComponent {...props} location={location}/>;
}

export default ReactiveWorldComponent;