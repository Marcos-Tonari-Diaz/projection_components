import * as THREE from "three"
import { Vector3 } from "three";
import { MeshLine, MeshLineMaterial } from "three.meshline";

export class ProjectionPlane {
    constructor(normal_vector, distance_origin) {
        this.point_meshes = new THREE.Group();
        this.edge_meshes = new THREE.Group();
        this.edge_pairs = []

        this.plane = new THREE.Plane(normal_vector, -distance_origin);
        this.plane_helper = new THREE.PlaneHelper(this.plane, 10);

        const geometry = new THREE.PlaneGeometry(10, 10);
        const material = new THREE.MeshBasicMaterial(
            {
                color: '#a5daf2',
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.2
            });
        this.plane_mesh = new THREE.Mesh(geometry, material);
        this.plane_mesh.lookAt(normal_vector);
        this.plane_mesh.position.addScaledVector(normal_vector, distance_origin);


        this.grid = new THREE.GridHelper(10, 10);
        this.grid.geometry.rotateX(THREE.MathUtils.degToRad(90));
        this.grid.position.x = this.plane_mesh.position.x;
        this.grid.position.y = this.plane_mesh.position.y;
        this.grid.position.z = this.plane_mesh.position.z;
        this.grid.lookAt(normal_vector)
        this.grid.material.transparent = true;
        this.grid.material.opacity = 0.1;
        this.grid.material.depthWrite = false;
    }
    getMesh() {
        return this.plane_mesh;
    }
    getPointMeshes() {
        return this.point_meshes;
    }
    getEdegeMeshes() {
        return this.edge_meshes;
    }
    getPlaneHelper() {
        return this.plane_helper;
    }
    getGrid() {
        return this.grid;
    }
    addPlanePoint(point_vector) {
        const circle = new THREE.Shape();
        circle.absarc(0, 0, 0.15)
        const geometry = new THREE.ShapeGeometry(circle, 50);
        const material = new THREE.MeshBasicMaterial({
            color: 'red',
            side: THREE.DoubleSide,
            depthWrite: false
        });
        const point_mesh = new THREE.Mesh(geometry, material)
        point_mesh.lookAt(this.plane.normal);
        // mesh.position.addScaledVector(this.plane_mesh.position, 1)
        point_mesh.position.addScaledVector(point_vector, 1)
        this.point_meshes.add(point_mesh);
    }
    intersectLines(lines) {
        for (const line of lines) {
            const intersection_point = new Vector3();
            this.plane.intersectLine(line, intersection_point)
            this.addPlanePoint(intersection_point)
        }
        const points = this.point_meshes.children
        // this.addPointPair([points[0].position, points[1].position])
        // this.addPointPair([points[1].position, points[2].position])
        // this.addPointPair([points[0].position, points[2].position])
        // this.addIntersectionEdges();
    }
    addPointPair(pair) {
        this.edge_pairs.push(pair);
    }
    addIntersectionEdges() {
        for (const pair of this.edge_pairs) {
            this.addEdge(pair[0], pair[1]);
        }
    }
    addEdge(start, end) {
        const material = new MeshLineMaterial({ color: 'red', lineWidth: 0.03 });
        let geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
        let meshline = new MeshLine();
        meshline.setGeometry(geometry);
        this.edge_meshes.add(new THREE.Mesh(meshline, material));
    }
}