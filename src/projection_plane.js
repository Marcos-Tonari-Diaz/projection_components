import * as THREE from "three"
import { Vector3 } from "three";

export class ProjectionPlane {
    constructor(normal_vector, distance_origin) {
        const geometry = new THREE.PlaneGeometry(10, 10);
        const material = new THREE.MeshBasicMaterial(
            {
                color: '#a5daf2',
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.2
            });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.lookAt(normal_vector);
        this.mesh.position.addScaledVector(normal_vector, distance_origin);
        this.point_meshes = new THREE.Group();
        this.mesh.add(this.point_meshes);

        this.plane = new THREE.Plane(normal_vector, -distance_origin);
        this.plane_helper = new THREE.PlaneHelper(this.plane, 10);
        this.grid = new THREE.GridHelper(10, 10);
        this.grid.geometry.rotateX(THREE.MathUtils.degToRad(90));
        this.grid.position.x = this.mesh.position.x;
        this.grid.position.y = this.mesh.position.y;
        this.grid.position.z = this.mesh.position.z;
        this.grid.lookAt(normal_vector)
    }
    getMesh() {
        return this.mesh;
    }
    getPointMeshes() {
        return this.point_meshes;
    }
    getPlaneHelper() {
        return this.plane_helper;
    }
    getGrid() {
        return this.grid;
    }
    addPlanePoint(point_vector) {
        const circle = new THREE.Shape();
        circle.absarc(0, 0, 0.3)
        const geometry = new THREE.ShapeGeometry(circle, 50);
        const material = new THREE.MeshBasicMaterial({
            color: 'red',
            side: THREE.DoubleSide,
            depthWrite: false
        });
        this.point_meshes.add(new THREE.Mesh(geometry, material));
    }
    addPointPair(point_pair) {
        this.points.add(point_pair[0])
        this.points.add(point_pair[1])
        // this.addEdge(point_pair)
    }
    // addEdge(point_pair) {

    // }
}