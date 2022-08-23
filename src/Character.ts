import { GLTF, GLTFParser, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import CharacterType from './types/CharacterType';


export default class Character {

    public model!: GLTF;

    constructor(path: CharacterType, scene: THREE.Scene) {
        const loader = new GLTFLoader();

        loader.load(path, (gltf: GLTF) => {
            this.model = gltf;
            scene.add(this.model.scene);
        });
    }
}