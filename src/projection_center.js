import * as THREE from "three"
import { Line3, PerspectiveCamera, Vector3 } from "three";
import { Vertex } from "./vertex";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

export class ProjectionCenter extends PerspectiveCamera {
    constructor(x, y, z) {
        super({ near: 2 })
        this.position.set(x, y, z)
        this.lookAt(0, 0, 0)
        this.vertex_representation = new Vertex(x, y, z, 'crimson', 0.5)
    }
    projectLines(vertices) {
        const projected_meshlines = new THREE.Group();
        this.projected_lines = []
        const material = new MeshLineMaterial({ color: 'skyblue', lineWidth: 0.05 });
        for (const vertex of vertices) {
            let points = [vertex.getMesh().position, this.position]
            let line = new Line3(vertex.getMesh().position, this.position)
            let geometry = new THREE.BufferGeometry().setFromPoints(points);
            let meshline = new MeshLine();
            meshline.setGeometry(geometry)
            this.projected_lines.push(line)
            projected_meshlines.add(new THREE.Mesh(meshline, material))
        }
        return projected_meshlines
    }
    getProjectedLines() { return this.projected_lines }
    setLookAt() { }
    getArrowHelper() { }
}