import * as THREE from "three"
import { Vertex } from "./vertex";

export class ProjectionPlane {
    constructor() {
        const geometry = new THREE.PlaneGeometry({ width: 1, height: 1 });
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
        this.plane_mesh = new THREE.Mesh(geometry, material);
    }
    getMesh() {
        return this.plane_mesh;
    }
}