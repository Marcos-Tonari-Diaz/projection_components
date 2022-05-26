import * as THREE from "three"
import { ProjectionCenter } from "./projection_center";
import { Vertex } from "./vertex";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let vertices = []
vertices.push(new Vertex(5, 0, 0, 'white'));
vertices.push(new Vertex(5, 2, 0, 'white'));
vertices.push(new Vertex(5, 0, 2, 'white'));

let vertex_group = new THREE.Group();
vertices.forEach((vertex) => vertex_group.add(vertex.getMesh()))

let projection_center = new ProjectionCenter(0, 0, 0, 'crimson');
let projected_lines_group = projection_center.projectLines(vertices)

scene.add(projection_center.getMesh());
scene.add(vertex_group);
scene.add(projected_lines_group);

renderer.render(scene, camera);