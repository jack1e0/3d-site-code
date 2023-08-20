import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 3 things needed for scene: SCENE, CAMERA, RENDERER

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera = new THREE.OrthographicCamera(-1 * window.innerWidth / 16, window.innerWidth / 16, window.innerHeight / 16, -1 * window.innerHeight / 16);
//camera.rotation.set(-5, 1, 1);
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

// const light = new THREE.PointLight(0xc4c4c4, 10);
// light.position.set(0, 300, 500);
// scene.add(light);

// const light2 = new THREE.PointLight(0xc4c4c4, 1);
// light2.position.set(500, 100, 0);
// scene.add(light2);

// const light3 = new THREE.PointLight(0xc4c4c4, 1);
// light3.position.set(0, 100, -500);
// scene.add(light3);

// const light4 = new THREE.PointLight(0xc4c4c4, 1);
// light4.position.set(-500, 300, 500);
// scene.add(light4);

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

// function addStar() {
//     const geometry = new THREE.SphereGeometry(0.25, 24, 24);
//     const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
//     const star = new THREE.Mesh(geometry, material);

//     const [x, y, z] = Array(3)
//         .fill()
//         .map(() => THREE.MathUtils.randFloatSpread(100));

//     star.position.set(x, y, z);
//     scene.add(star);
// }

// Array(400).fill().forEach(addStar);

// function animate() {
//     requestAnimationFrame(animate);
//     torus.rotation.x += 0.01;
//     torus.rotation.y += 0.01;

//     renderer.render(scene, camera);
//     orbitControl.update();
// }

// animate();


