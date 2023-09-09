import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 3 things needed for scene: SCENE, CAMERA, RENDERER
// Note: When first opening folder, run: 'npx vite'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdbd5d0);

const camera = new THREE.OrthographicCamera(-1 * window.innerWidth / 16, window.innerWidth / 16, window.innerHeight / 16, -1 * window.innerHeight / 16);
camera.position.set(30, 50, 42);

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
orbitControl.target.set(1, 32, 0);

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

const d = document.getElementById('text');
d.style.pointerEvents = 'none';
var welc = document.getElementById('welcome');
var shouldHeadingShow = true;


function handleMouseScroll(event) {
    const delta = event.deltaY;
    if (delta < 0) {
        if (camera.position.y <= 45) {
            camera.position.y -= delta * 0.01;
            orbitControl.target.y -= delta * 0.01;
        }
    } else {
        if (camera.position.y >= 5) {
            camera.position.y -= delta * 0.01;
            orbitControl.target.y -= delta * 0.01;
        }
    }


    if (welc.classList.contains('reveal')) {
        welc.classList.remove('reveal');

        if (shouldHeadingShow) {
            const timeout = 1000; // 1s
            setTimeout(() => {
                welc.textContent = "Drag and scroll to explore.";
                welc.style.fontSize = '40px';
                welc.style.paddingTop = '100px';
                welc.classList.add('reveal');
                shouldHeadingShow = false;
            }, timeout);
        }
    }
}


function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);

    orbitControl.update();
}

window.addEventListener('wheel', handleMouseScroll);
window.addEventListener('resize', resize);

document.addEventListener('DOMContentLoaded', function () {
    welc.classList.add('reveal');
})

animate();

