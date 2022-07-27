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
        this.vertices = []
        this.vertices_offset = []
        this.createVerticesFromPositionBuffer(this.mesh.geometry.attributes.position, this.vertices);
        this.edge_vertice_index_pairs = []
        // console.log(this.vertices_offset[0].distanceTo(this.vertices_offset[1]))
        this.pairEdgeVertices()
        console.log(this.edge_vertice_index_pairs)
    }
    createVerticesFromPositionBuffer(position_buffer, vertices) {
        for (let vertex_index = 0; vertex_index < position_buffer.count; vertex_index += 3) {
            const vertex = new Vertex(
                position_buffer.array[vertex_index],
                position_buffer.array[vertex_index + 1],
                position_buffer.array[vertex_index + 2],
                'white',
                0.2
            )
            this.vertices_offset.push(vertex.getPosition())
            this.addBoxPositionOffsetToVertex(vertex)
            this.vertices.push(vertex);
        }
    }
    addBoxPositionOffsetToVertex(vertex) {
        const vertex_global_position = new Vector3(0, 0, 0);
        vertex_global_position.addVectors(vertex.getPosition(), this.mesh.position);
        vertex.setPosition(vertex_global_position.x, vertex_global_position.y, vertex_global_position.z);
    }
    pairEdgeVertices() {
        for (let first_index = 0; first_index < this.vertices_offset.length; first_index++) {
            for (let second_index = first_index; second_index < this.vertices_offset.length; second_index++) {
                let distance = this.vertices_offset[first_index].distanceTo(this.vertices_offset[second_index])
                if (distance == 2) {
                    this.edge_vertice_index_pairs.push([first_index, second_index])
                }
            }
        }
    }
    updateVerticesFromPositionBuffer(position_buffer, vertices) {
        for (let vertex_index = 0; vertex_index < position_buffer.count; vertex_index += 3) {
            vertices[Math.floor(vertex_index / 3)].setPosition(
                position_buffer.array[vertex_index],
                position_buffer.array[vertex_index + 1],
                position_buffer.array[vertex_index + 2],
            )
        }
    }
    rotateY(degrees) {
        this.mesh.geometry.rotateY(THREE.MathUtils.degToRad(degrees));
        this.updateVerticesFromPositionBuffer(this.mesh.geometry.attributes.position, this.vertices);
        this.vertices.forEach((vertex) => this.addBoxPositionOffsetToVertex(vertex));
    }
    getMesh() { return this.mesh; }
    getVertices() { return this.vertices; }
    getEdgeVerticesIndexPairs() { return this.edge_vertice_index_pairs }
}