import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import InteractiveObjects from './interacteviObjects';

class Scene {
  constructor(scene, camera, fov = 75, controls, renderer) {
    this.canvas = document.querySelector('.canvas');
    this.inputX = document.querySelector('#x_input').value;
    this.inputY = document.querySelector('#y_input').value;
    this.inputZ = document.querySelector('#z_input').value;
    this.scene = scene;
    this.camera = camera;
    this.fov = fov;
    this.renderer = renderer;
    this.controls = controls;

    //Window sizes
    this.aspectRatio = window.innerWidth / window.innerHeight;

    //Camera frustum
    this.nearFrustum = 1;
    this.farFrustum = 1000;

    //Light
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.spotLight = new THREE.SpotLight(0xffffff, 0.77);

    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspectRatio, this.nearFrustum, this.farFrustum);
    this.camera.position.z = 20;
    console.log('this.inputX', this.inputX);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.ambientLight.castShadow = false;

    this.scene.add(this.ambientLight);

    this.renderer.render(this.scene, this.camera);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.controls.update();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

let scene = new Scene();
scene.initScene();
scene.animate();

new InteractiveObjects(scene.scene);

