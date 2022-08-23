import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Controls extends OrbitControls {

    constructor(camera: THREE.Camera, renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
        super(camera, renderer.domElement);

        this.minPolarAngle = 0;
        this.maxPolarAngle = 2;


        this.minDistance = 2;
        this.maxDistance = 50;

        this.enablePan = true; // Set to false to disable panning (ie vertical and horizontal translations)

        this.enableDamping = true; // Set to false to disable damping (ie inertia)
        this.dampingFactor = 0.25;


        this.addEventListener('change', () => { renderer.render(scene, camera) });
    }

}