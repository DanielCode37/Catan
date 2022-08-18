import * as THREE from "three";
export default class MapTile extends THREE.Mesh {
    public static readonly RADIUS: number = 1;
    public static readonly HEIGHT: number = 0.15;
    private static readonly COLOR: number = 0x00ff00;

    public readonly geometry: THREE.CylinderGeometry;
    public readonly material: THREE.MeshPhongMaterial;

    constructor() {
        const geometry = new THREE.CylinderGeometry(MapTile.RADIUS, MapTile.RADIUS, MapTile.HEIGHT, 6);
        const material = new THREE.MeshPhongMaterial();
        super(geometry, material);

        this.geometry = geometry;
        this.material = material;
    }

    public get distanceToEdge(): number {
        return Math.sqrt(3) / 2 * MapTile.RADIUS;
    }

    public onClick() {
        this.position.setY(0.1);
    }
}