import React from 'react';
import * as THREE from "three";
import styles from './world.module.scss';

export interface WorldProps {}

export class WorldComponent extends React.Component {
    private _ref: React.RefObject<HTMLDivElement>;

    public constructor(props: WorldProps) {
        super(props);

        this._ref = React.createRef();
    }

    public override componentDidMount(): void {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        this._ref.current?.appendChild(renderer.domElement);
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
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
            
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render( scene, camera);
        };

        animate();
    }

    public override render(): React.ReactNode {
        return (<div ref={this._ref}/>);
    }
}