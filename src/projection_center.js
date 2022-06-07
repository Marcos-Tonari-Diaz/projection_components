import * as THREE from "three"
import { PerspectiveCamera, Vector3 } from "three";
import { Vertex } from "./vertex";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

export class ProjectionCenter extends PerspectiveCamera {
    constructor(x, y, z) {
        super({ near: 2 })
        this.position.set(x, y, z)
        this.lookAt(0, 0, 0)
        this.vertex_representation = new Vertex(x, y, z, 'crimson')
    }
    projectLines(vertices) {
        const projected_lines_group = new THREE.Group();
        const material = new MeshLineMaterial({ color: 'skyblue', lineWidth: 0.05 });
        for (const vertex of vertices) {
            let points = [vertex.getMesh().position, this.position]
            let geometry = new THREE.BufferGeometry().setFromPoints(points);
            let line = new MeshLine();
            line.setGeometry(geometry)
            projected_lines_group.add(new THREE.Mesh(line, material))
        }
        return projected_lines_group
    }
    // projectPoint(vertex) {
    //     this.projectionMatrix.multiply()
    // }
    setLookAt() { }
    getArrowHelper() { }
}