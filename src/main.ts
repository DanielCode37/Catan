import * as THREE from 'three';
import Board from './Board';
import Controls from './Controls';
import Character from './Character';
import CharacterType from './types/CharacterType';

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
board.generateMap(15);

camera.position.z = 5;

const light = new THREE.HemisphereLight(0xffffff, 0x000000, 0.9);
scene.add(light);

new Controls(camera, renderer, scene);
renderer.render(scene, camera);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


const caracter = new Character(CharacterType.WIZARD, scene);


board.tiles[156].material.color.setHex(0xff0000);
const tiles = board.getConnectedTiles(156);

for (const tile of tiles) {
    board.tiles[tile].material.color.setHex(0xcc5555)
}


addEventListener("click", (event) => {
    event.preventDefault();

    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(board.tiles);

    if (intersects.length > 0) {
        //@ts-ignore
        intersects[0].object.onClick();

    }

})