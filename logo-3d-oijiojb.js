import "./index.css";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { pcss, MeshTransmissionMaterial } from '@pmndrs/vanilla';
console.log(pcss, MeshTransmissionMaterial);

THREE.ColorManagement.legacyMode = false;


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//RESIZE
function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width ||canvas.height !== height) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#logo-model'),
  alpha: true,antialiasing: true,
});



const loader = new GLTFLoader();
loader.load('./logo.glb', function(glb){
  console.log(glb);
  const logo = glb.scene;
  logo.scale.set(3.5, 3.5, 3.5);
  logo.material = Object.assign(new MeshTransmissionMaterial(10), {
    clearcoat: 1,
    clearcoatRoughness: 0,
    transmission: 1,
    chromaticAberration: 0.03,
    anisotrophicBlur: 0.1,
    roughness: 0,
    thickness: 4.5,
    ior: 1.5,
    distortion: 0.1,
    distortionScale: 0.2,
    temporalDistortion: 0.2
  })
  scene.add(logo);
});

//camera.position.z = 2.5;
camera.position.set( 0, 0, 5 )

const controls = new OrbitControls(camera, renderer.domElement);



const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(3, 3, 9);
scene.add(light);


function animate() {
  controls.update();

  resizeCanvasToDisplaySize();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);