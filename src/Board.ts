import * as THREE from 'three';
import MapTile from './MapTile';

export default class Board {
	private readonly scene: THREE.Scene;
	private static readonly DISTANCE: number = 1.8;
	private tiles: MapTile[][] = [];

	constructor(scene: THREE.Scene) {
		this.scene = scene;
	}

	public generateMap(numRows: number) {

		const plan = this.calcNumTilesPerRow(numRows);

		const indexOfCenterRow = Math.floor(plan.length / 2);


		for (let i = 0; i < plan.length; i++) {

			const offsetX = this.xor(plan[i] % 2 == 0, i % 2 == 0) ? -Board.DISTANCE / 2 : 0;
			console.log(offsetX);


			const offsetY = (i - indexOfCenterRow) * 1.57 * MapTile.RADIUS + 0.2;

			const indexOfCenterPiece = Math.floor(plan[i] / 2);

			for (let tileIndex = 0; tileIndex < plan[i]; tileIndex++) {
				const positionX = (tileIndex - indexOfCenterPiece) * Board.DISTANCE + offsetX + Board.DISTANCE / 2;

				const tile = new MapTile();

				tile.position.x = positionX
				tile.position.z = offsetY

				this.scene.add(tile);
			}
		}


		// this.scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial()));
	}

	private calcNumTilesPerRow(numRows: number): number[] {
		//TODO:
		return [3, 4, 3];
	}

	private xor(b1: boolean, b2: boolean): boolean {
		return b1 !== b2 || (!b1 && !b2);
	}
}