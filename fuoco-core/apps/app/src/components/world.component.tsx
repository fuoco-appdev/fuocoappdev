import WorldController from '../controllers/world.controller';
import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";
import styles from './world.module.scss';
import * as AtmosphereShader from '../shaders/atmosphere.shader';
import * as TWEEN from '@tweenjs/tween.js';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';

async function LoadWorldAsync(): Promise<void> {
    const scene = new THREE.Scene();
    const width = WorldController.ref.current?.clientWidth ?? 0;
    const height = WorldController.ref.current?.clientHeight ?? 0;
    const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    if ((WorldController.ref.current?.children.length ?? 0) <= 0) {
        WorldController.ref.current?.appendChild(renderer.domElement);
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

    const baseEarth = new THREE.SphereGeometry(WorldController.minDotRadius, 50, 50 );
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
    const imageData = await WorldController.loadImageAsync(ctx, 'assets/images/map_alpha.png', textureWidth, textureHeight);

    const dotVector = new THREE.Vector3();
    const dotGeometry = new THREE.CircleGeometry(.01, 5);
    const dots: Array<THREE.BufferGeometry> = [];
    const dotCount = 60000;
        
    for (let i = 0; i < dotCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / dotCount);
        const theta = Math.sqrt(dotCount * Math.PI) * phi;
        
        dotVector.setFromSphericalCoords(WorldController.minDotRadius, phi, theta);
                
        const latLong = WorldController.vector3ToLatLong(dotVector, 2);
        const pixelPoint = WorldController.latLongToVector2(
            latLong.long, 
            latLong.lat, 
            textureWidth, 
            textureHeight);
                
        const textureIndex = pixelPoint.y * textureWidth + pixelPoint.x;
        const pixel = (imageData as number[][]).at(textureIndex) ?? [0,0,0,0];
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

    const atmosphere = new THREE.SphereGeometry(WorldController.minDotRadius + .1, 50, 50);
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
    const animate = () => {
        requestAnimationFrame(animate);

        aspect = window.innerWidth/window.innerHeight;
        if (camera.aspect !== aspect) {
            camera.aspect = aspect;
            camera?.updateProjectionMatrix();
            renderer?.setSize(window.innerWidth, window.innerHeight);
        }

        if (!WorldController.pressed) {
            WorldController.globeRotation.y += 0.001;
            TWEEN.update();
        } 

        pivot.rotation.x = WorldController.globeRotation.x;
        pivot.rotation.y = WorldController.globeRotation.y;

        if (!WorldController.model.isVisible) {
            pivot.scale.setScalar(0);
        }else {
            pivot.scale.setScalar(1);
        }
            
        renderer.render(scene, camera);
    };

    animate();
}

export default function WorldComponent(): JSX.Element {
    const location = useLocation();
    WorldController.model.location = location;

    useEffect(() => {
        LoadWorldAsync();
    }, []);

    return (
        <div className={styles["root"]} ref={WorldController.ref}/>
    );
}