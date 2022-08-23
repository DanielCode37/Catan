import * as THREE from "three";
import Board from "./Board";
import TileType from './types/TileType';
import Character from './Character';

export default class MapTile extends THREE.Mesh {
	public static readonly RADIUS: number = 1;
	public static readonly HEIGHT: number = 0.3;

	public readonly geometry: THREE.CylinderGeometry;
	public readonly material: THREE.MeshPhongMaterial;
	public character?: Character
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

	public static get distanceToEdge(): number {
		return Math.sqrt(3) / 2 * MapTile.RADIUS;
	}

	public onClick() {

		for (const tile of this.board.tiles) tile.deactivate();

		this.position.setY(0.1);
	}

	public deactivate() {
		this.position.setY(0);
	}

	public moveCharacterTo(newTileIndex: number): boolean {

		const surroundingTiles = this.board.getConnectedTiles(this.board.tiles.indexOf(this));

		if (!surroundingTiles.includes(newTileIndex)) return false;

		const newTile = this.board.tiles[newTileIndex];
		if (newTile.character) return false;

		this.character?.model.scene.position.set(newTile.position.x, newTile.position.y, newTile.position.z);

		newTile.character = this.character;

		this.character = undefined;

		return true;


	}
}