import * as THREE from "three"
import { Vertex } from "./vertex";

export class ProjectionCenter extends Vertex {
    projectLines(vertices) {
        const projected_lines_group = new THREE.Group();
        const material = new THREE.LineBasicMaterial({ color: 'skyblue' });
        for (const vertex of vertices) {
            let points = [vertex.getMesh().position, this.mesh.position]
            let geometry = new THREE.BufferGeometry().setFromPoints(points);
            projected_lines_group.add(new THREE.Line(geometry, material))
        }
        return projected_lines_group
    }
}