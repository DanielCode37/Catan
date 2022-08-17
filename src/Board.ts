import MapTile from './MapTile';

export default class Board {
    private readonly scene: THREE.Scene;
    private tiles: MapTile[] = [];

    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }

    public generateMap(numTiles: number) {
        const tile = new MapTile();
        this.scene.add(tile);
    }
}