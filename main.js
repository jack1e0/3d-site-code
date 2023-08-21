import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 3 things needed for scene: SCENE, CAMERA, RENDERER
// Note: When first opening folder, run:
//  npm install
//  npx vite

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdbd5d0);

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
const directionalLightLeft = new THREE.DirectionalLight(0xffebd1, 1.5);
directionalLightLeft.position.set(0, 0, 1);
directionalLightLeft.castShadow = true;
scene.add(directionalLightLeft);

// Top
const directionalLightTop = new THREE.DirectionalLight(0xffffff, 3);
directionalLightTop.position.set(0, 1, 0);
directionalLightTop.castShadow = true;
scene.add(directionalLightTop);

// Rightmost
const directionalLightRight = new THREE.DirectionalLight(0xffffff, 2.5);
directionalLightRight.position.set(1, 0, 0);
directionalLightRight.castShadow = true;
scene.add(directionalLightRight);


// ORBIT CONTROL 
const orbitControl = new OrbitControls(camera, renderer.domElement);

// LOADING
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

