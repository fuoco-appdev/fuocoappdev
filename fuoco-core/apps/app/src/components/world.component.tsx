import React from 'react';
import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";
import styles from './world.module.scss';
import * as AtmosphereShader from '../shaders/atmosphere.shader';
import { BufferAttribute } from 'three';

export interface WorldProps {}

export class WorldComponent extends React.Component {
    private _ref: React.RefObject<HTMLDivElement>;

    public constructor(props: WorldProps) {
        super(props);

        this._ref = React.createRef();
    }

    public override async componentDidMount(): Promise<void> {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setSize( window.innerWidth, window.innerHeight );
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        this._ref.current?.appendChild(renderer.domElement);

        const light = new THREE.PointLight(0xffffff, 1, 400);
        light.position.set(-40, 15, 0);
        light.castShadow = true;
        light.shadow.bias = -0.0001;
        light.shadow.mapSize.width = 1024 * 4;
        light.shadow.mapSize.height = 1024 * 4;
        scene.add(light);

        const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.x = -1;
        directionalLight.position.y = 1;
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(ambientLight);

        const space = new THREE.BoxGeometry(100, 100, 50);
        const spaceMaterial = new THREE.MeshStandardMaterial( { color: 0x151d65, side: THREE.BackSide } );
        const spaceMesh = new THREE.Mesh(space, spaceMaterial);
        scene.add(spaceMesh);

        const baseEarth = new THREE.SphereGeometry( 2, 50, 50 );
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

        const vector = new THREE.Vector3();
        const dotGeometry = new THREE.CircleGeometry(.01, 5);
        const dots: Array<THREE.BufferGeometry> = [];
        const dotCount = 60000;
        const dotRadius = 2;
        
        for (let i = 0; i < dotCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / dotCount);
            const theta = Math.sqrt(dotCount * Math.PI) * phi;
        
            vector.setFromSphericalCoords(dotRadius, phi, theta);
                
            const latLong = this.vector3ToLatLong(vector, 2);
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
                geometry.lookAt(vector);
                geometry.translate(vector.x, vector.y, vector.z);
            
                dots.push(geometry);
            }
        }

        const geometriesDots = BufferGeometryUtils.mergeBufferGeometries(dots);
        const dotMaterial = new THREE.MeshStandardMaterial({color: 0x4AFFFF});
        const dotMesh = new THREE.Mesh(geometriesDots, dotMaterial);

        const atmosphere = new THREE.SphereGeometry(2.1, 50, 50);
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
        const animate = function() {
            requestAnimationFrame(animate);

            aspect = window.innerWidth/window.innerHeight;
            if (camera.aspect !== aspect) {
                camera.aspect = aspect;
                camera?.updateProjectionMatrix();
                renderer?.setSize(window.innerWidth, window.innerHeight);
            }

            
            
            pivot.rotation.y += 0.0001;
            renderer.render( scene, camera);
        };

        animate();
    }

    public override render(): React.ReactNode {
        return (<div ref={this._ref}/>);
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
}