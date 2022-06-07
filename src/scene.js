import * as THREE from "three"
import { Vector2, Vector3 } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ProjectionCenter } from "./projection_center";
import { Vertex } from "./vertex";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let vertices = []
vertices.push(new Vertex(5, 0, 0, 'white'));
vertices.push(new Vertex(5, 3, 0, 'white'));
vertices.push(new Vertex(5, 0, 2, 'white'));

let vertex_group = new THREE.Group();
vertices.forEach((vertex) => vertex_group.add(vertex.getMesh()))

let projection_center_position = new Vector3(0, 0, 0)
let projection_center = new ProjectionCenter(projection_center_position.x, projection_center_position.y, projection_center_position.z);
let look_at_vector = new Vector3(5, 1, 1)
projection_center.lookAt(look_at_vector);
let look_at_arrow = new THREE.ArrowHelper(look_at_vector.normalize(), projection_center_position, 0.9, '#a31c62', 0.25, 0.08)
let projected_lines_group = projection_center.projectLines(vertices)

scene.add(projection_center.vertex_representation.getMesh());
scene.add(vertex_group);
scene.add(projected_lines_group);
scene.add(look_at_arrow);
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

console.log(vertices[0].mesh.position)
console.log(vertices[0].mesh.matrixWorld)

animate()