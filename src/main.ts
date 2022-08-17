import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Board from './Board';

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 1;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

const board = new Board(scene);
board.generateMap(20);

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

controls.minPolarAngle = 0;
controls.maxPolarAngle = 2;


controls.minDistance = 2;
controls.maxDistance = 30;

controls.enablePan = true; // Set to false to disable panning (ie vertical and horizontal translations)

controls.enableDamping = true; // Set to false to disable damping (ie inertia)
controls.dampingFactor = 0.25;


controls.addEventListener('change', () => { renderer.render(scene, camera) });
renderer.render(scene, camera);