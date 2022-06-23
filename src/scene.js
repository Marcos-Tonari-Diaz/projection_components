import * as THREE from "three"
import { Vector2, Vector3 } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Box } from "./box";
import { ProjectionCenter } from "./projection_center";
import { ProjectionPlane } from "./projection_plane";
import { Vertex } from "./vertex";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let look_at_vector = new Vector3(5, 1, 1).normalize()

let projection_center_position = new Vector3(0, 0, 0)
let projection_center = new ProjectionCenter(projection_center_position.x, projection_center_position.y, projection_center_position.z);
projection_center.lookAt(look_at_vector);

let projection_plane = new ProjectionPlane(look_at_vector, 3)

let look_at_arrow = new THREE.ArrowHelper(look_at_vector.normalize(), projection_center_position, 0.9, '#a31c62', 0.25, 0.08)

let box_position = new Vector3(0, 0, 0);
box_position.copy(projection_center_position);
box_position.addScaledVector(look_at_vector, 10);
const box_size = 2;
const box = new Box(box_size, box_size, box_size, box_position);
box.rotateY(40)

// let vertices = cube_geometry.vertices
// let vertices = []
// vertices.push(new Vertex(5, 0, 0, 'white'));
// vertices.push(new Vertex(5, 3, 0, 'white'));
// vertices.push(new Vertex(5, 0, 2, 'white'));

let vertices = box.getVertices();

let vertex_group = new THREE.Group();
vertices.forEach((vertex) => vertex_group.add(vertex.getMesh()))

let projected_meshlines = projection_center.projectLines(vertices)

// let projected_point = new Vector3(0, 0, 0);
// projection_plane.addPlanePoint(projected_point)
projection_plane.intersectLines(projection_center.getProjectedLines())


scene.add(projection_center.vertex_representation.getMesh());
scene.add(vertex_group);
scene.add(projected_meshlines);
scene.add(look_at_arrow);
scene.add(projection_plane.getMesh());
scene.add(projection_plane.getPointMeshes());
scene.add(projection_plane.getEdegeMeshes());
// scene.add(projection_plane.getPlaneHelper());
scene.add(projection_plane.getGrid());
scene.add(box.getMesh());
scene.background = new THREE.Color('Moccasin');

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();
controls.enableDamping = true;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate()