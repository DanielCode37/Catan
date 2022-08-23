import * as THREE from "three";
import Board from "./Board";
import TileType from './types/TileType';

export default class MapTile extends THREE.Mesh {
    public static readonly RADIUS: number = 1;
    public static readonly HEIGHT: number = 0.15;

    public readonly geometry: THREE.CylinderGeometry;
    public readonly material: THREE.MeshPhongMaterial;
    private readonly board: Board;

    constructor(type: TileType, parent: Board) {
        const geometry = new THREE.CylinderGeometry(MapTile.RADIUS, MapTile.RADIUS, MapTile.HEIGHT, 6);
        const material = new THREE.MeshPhongMaterial();
        super(geometry, material);

        this.geometry = geometry;
        this.material = material;
        this.board = parent;

        this.material.color.setHex(type);
    }

    public get distanceToEdge(): number {
        return Math.sqrt(3) / 2 * MapTile.RADIUS;
    }

    public onClick() {

        for (const tile of this.board.tiles) tile.deactivate();

        this.position.setY(0.1);
    }

    public deactivate() {
        this.position.setY(0);
    }
}