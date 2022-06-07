import * as THREE from "three"
import { PerspectiveCamera, Vector3 } from "three";
import { Vertex } from "./vertex";

export class ProjectionCenter extends PerspectiveCamera {
    constructor(x, y, z) {
        super({ near: 2 })
        this.position.set(x, y, z)
        this.lookAt(0, 0, 0)
        this.vertex_representation = new Vertex(x, y, z, 'crimson')
    }
    projectLines(vertices) {
        const projected_lines_group = new THREE.Group();
        const material = new THREE.LineBasicMaterial({ color: 'skyblue' });
        for (const vertex of vertices) {
            let points = [vertex.getMesh().position, this.position]
            let geometry = new THREE.BufferGeometry().setFromPoints(points);
            projected_lines_group.add(new THREE.Line(geometry, material))
        }
        return projected_lines_group
    }
    // projectPoint(vertex) {

    //     this.projectionMatrix.multiply()
    // }
    setLookAt() { }
    getArrowHelper() {
    }
}