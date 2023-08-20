import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 3 things needed for scene: SCENE, CAMERA, RENDERER
// Note: When first opening folder, run:
//  npm install
//  npx vite

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

const camera = new THREE.OrthographicCamera(-1 * window.innerWidth / 16, window.innerWidth / 16, window.innerHeight / 16, -1 * window.innerHeight / 16);
camera.position.set(30, 15, 42);


const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// LIGHTING
const ambientLight = new THREE.AmbientLight(0xFFFFFF)

// Leftmost
const directionalLight = new THREE.DirectionalLight(0xffebd1, 1.5);
directionalLight.position.set(0, 0, 1);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Top
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3);
directionalLight2.position.set(0, 1, 0);
directionalLight2.castShadow = true;
scene.add(directionalLight2);

// Right
const directionalLight3 = new THREE.DirectionalLight(0xffffff, 2.5);
directionalLight3.position.set(1, 0, 0);
directionalLight3.castShadow = true;
scene.add(directionalLight3);

// ORBIT CONTROL 
const orbitControl = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();

loader.load('3DCity.glb', function (gltf) {
    scene.add(gltf.scene);
})

scene.add(ambientLight);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    orbitControl.update();
    //console.log(camera.rotation);
}

animate();

