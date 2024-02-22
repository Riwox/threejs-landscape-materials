import * as THREE from "three";
import { MapControls } from "three/addons/controls/MapControls";

import { WaterPlaneMaterial } from './src/waterPlane/waterPlaneMaterial.js'
import { HideRepetitionMaterial } from "./src/hideRepetition/hideRepetitionMaterial.js";

// renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("app").appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// controls
const controls = new MapControls(camera, renderer.domElement);
camera.position.set(0, 80, 0);
controls.update();

// lights
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
//const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
//directionalLight.position.set(1, 1, 1);
scene.add(hemiLight)//, directionalLight);

// basic geometry
const geometry = new THREE.PlaneGeometry(100, 100, 400, 400);
geometry.rotateX(-Math.PI / 2);
const texture = new THREE.TextureLoader().load( "./src/hideRepetition/grass2.jpg" )
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(30,30)
const material = new HideRepetitionMaterial({map: texture, microColor: 0xaaffaa, macroContrast: 2.0})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
window.material = material

function animate() {
  requestAnimationFrame(animate);
  //material.uniforms.uTime.value += 0.01
  renderer.render(scene, camera);
}
animate();

window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};
