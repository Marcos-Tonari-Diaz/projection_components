import * as THREE from "three"

import { Vertex } from "./vertex";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let vertex = new Vertex(0, 0, 0);

scene.add(vertex.getMesh());

renderer.render(scene, camera);