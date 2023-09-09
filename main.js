import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

// 3 things needed for scene: SCENE, CAMERA, RENDERER
// Note: When first opening folder, run: 'npx vite'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdbd5d0);

const camera = new THREE.OrthographicCamera(-1 * window.innerWidth / 16, window.innerWidth / 16, window.innerHeight / 16, -1 * window.innerHeight / 16);
camera.position.set(30, 30, 42);

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
orbitControl.target.set(1, 20, 0);

orbitControl.rotateSpeed = 0.5;
orbitControl.maxPolarAngle = Math.PI / 2 - 0.1;
orbitControl.minPolarAngle = 1;
orbitControl.minAzimuthAngle = 0.3;
orbitControl.maxAzimuthAngle = 0.94;

orbitControl.enablePan = false;
orbitControl.enableZoom = false;
orbitControl.enableDamping = true;
orbitControl.dampingFactor = 0.5;

// LOADING
const loader = new GLTFLoader();

loader.load('3DCity.glb', function (gltf) {
    scene.add(gltf.scene);
})

scene.add(ambientLight);


//2D stuff

// Setting up renderer
// const labelRenderer = new CSS2DRenderer();
// labelRenderer.setSize(window.innerWidth, window.innerHeight);
// labelRenderer.domElement.style.position = 'fixed';
// labelRenderer.domElement.style.top = '0px';
// labelRenderer.domElement.style.pointerEvents = 'none';

// const para = document.createElement('p');
// para.textContent = "Welcome!";

// const div = document.createElement('div');
// div.appendChild(para);
// const obj = new CSS2DObject(div);
// scene.add(obj);

// document.body.appendChild(labelRenderer.domElement);
const d = document.getElementById('text');
d.style.zIndex = 100;
d.style.position = 'absolute';


function handleMouseScroll(event) {
    const delta = event.deltaY;
    if (delta > 0) {
        if (camera.position.y <= 45) {
            camera.position.y += delta * 0.01;
            orbitControl.target.y += delta * 0.01;
        }
    } else {
        if (camera.position.y >= 5) {
            camera.position.y += delta * 0.01;
            orbitControl.target.y += delta * 0.01;
        }
    }
}

function updateTextPos() {
    const vector = new THREE.Vector3();
    camera.getWorldPosition(vector);
    vector.project(camera);

    // Map the 3D position to 2D screen coordinates
    const x = (vector.x + 1) * window.innerWidth / 2;
    const y = (-vector.y + 1) * window.innerHeight / 2;

    // Update the position of the text element
    //div.style.transform = `translate(${x}px, ${y}px)`;
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    //labelRenderer.render(scene, camera);

    orbitControl.update();
    console.log(div.style.transform);
    //updateTextPos();
}

window.addEventListener('wheel', handleMouseScroll);
window.addEventListener('resize', resize);

animate();

