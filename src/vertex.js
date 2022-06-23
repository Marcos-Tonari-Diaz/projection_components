import * as THREE from "three"

export class Vertex {
    constructor(x, y, z, color, radius) {
        this.material = new THREE.MeshBasicMaterial({ color: color })
        this.geometry = new THREE.SphereGeometry(radius)
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y, z)
    }
    getMesh() {
        return this.mesh;
    }
    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z);
    }
    getPosition() {
        return this.mesh.position.clone();
    }
}