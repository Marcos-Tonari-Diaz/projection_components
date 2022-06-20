import * as THREE from "three"
import { Vector3 } from "three";
import { Vertex } from "./vertex";

export class Box {
    constructor(width, height, depth, position) {
        const cube_geometry = new THREE.BoxGeometry(width, height, depth);
        const cube_material = new THREE.MeshBasicMaterial({
            color: '#3641bf',
            transparent: true,
            opacity: 0.5
        });
        this.mesh = new THREE.Mesh(cube_geometry, cube_material);
        this.mesh.position.copy(position)
        this.vertices_offsets = []
        this.positionBufferToVertices(this.mesh.geometry.attributes.position, this.vertices_offsets);
        this.vertices = this.vertices_offsets.map(() => new Vertex(0, 0, 0, 'white', 0.2))
        this.updateVerticesPositions(position)
    }
    updateVerticesPositions(position) {
        for (let vertex_index in this.vertices) {
            this.vertices[vertex_index].getMesh().position.addVectors(this.vertices_offsets[vertex_index], position)
        }
    }
    positionBufferToVertices(position_buffer, vertices) {
        for (let vertex_index = 0; vertex_index < position_buffer.count; vertex_index += 3) {
            const vertex = new THREE.Vector3(
                position_buffer.array[vertex_index],
                position_buffer.array[vertex_index + 1],
                position_buffer.array[vertex_index + 2],
            )
            vertices.push(vertex)
        }
    }
    getMesh() { return this.mesh; }
    getVertices() { return this.vertices; }
}