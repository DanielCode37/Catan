import * as THREE from 'three';
import MapTile from './MapTile';
import TileType from './types/TileType';

export default class Board {
	private readonly scene: THREE.Scene;
	private static readonly DISTANCE: number = 1.8;
	public tiles: MapTile[] = [];
	public boardSize!: number[];

	constructor(scene: THREE.Scene) {
		this.scene = scene;
	}

	public generateMap(numRows: number) {

		const plan = this.calcNumTilesPerRow(numRows);

		const indexOfCenterRow = Math.floor(plan.length / 2);


		for (let i = 0; i < plan.length; i++) {

			const offsetX = this.xor(plan[i] % 2 !== 0, i % 2 == 0) ? Board.DISTANCE / 2 : 0;

			const offsetY = (i - indexOfCenterRow) * 1.57 * MapTile.RADIUS + 0.2;

			const indexOfCenterPiece = Math.floor(plan[i] / 2);

			for (let tileIndex = 0; tileIndex < plan[i]; tileIndex++) {
				const positionX = (tileIndex - indexOfCenterPiece) * Board.DISTANCE + offsetX + Board.DISTANCE / 2;


				const tile = new MapTile(this.ranodmTileType(), this);

				tile.position.x = positionX
				tile.position.z = offsetY

				this.scene.add(tile);
				this.tiles.push(tile);
			}
		}
	}

	private ranodmTileType(): TileType {
		switch (Math.floor(Math.random() * 6)) {
			case 0: return TileType.GRASS
			case 1: return TileType.GRASS
			case 2: return TileType.GRASS
			case 3: return TileType.MOUNTAIN
			case 4: return TileType.WHEAT
			case 5: return TileType.WHEAT
		}
		return TileType.GRASS
	}

	private calcNumTilesPerRow(numRows: number): number[] {
		if (numRows % 2 !== 0) numRows++;
		let lengthMiddleRow = Math.round(numRows * 1.5) - numRows / 2 % 2 == 0 ? Math.round(numRows * 1.5) : Math.round(numRows * 1.5) + 1;

		const data = [lengthMiddleRow];

		for (let i = 1; i <= numRows / 2; i++) {
			data.unshift(lengthMiddleRow - i);
			data.push(lengthMiddleRow - i);
		}

		this.boardSize = data;
		return data;
	}

	public getConnectedTiles(index: number): number[] {
		// Reihe davor -1 und 0
		// Reihe -1 +1
		// Reihe danach ^

		let indexCopy = index;

		////////////////////////////////////////
		//// RAND MUSS NOCH BEACHTET WERDEN ////
		////////////////////////////////////////

		// TODO: RAND MUSS NOCH BEACHTET WERDEN

		for (let i = 0; i < this.boardSize.length; i++) {
			if (indexCopy > this.boardSize[i]) indexCopy -= this.boardSize[i];
			else {
				if (i < Math.floor(this.boardSize.length / 2)) {

				} else if (i == Math.floor(this.boardSize.length / 2)) {

				} else {

				}

				break;
			}
		}


	}

	private xor(b1: boolean, b2: boolean): boolean {
		return b1 !== b2 || (!b1 && !b2);
	}
}