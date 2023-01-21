import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';

class InteractiveObjects {
  constructor(scene) {
    this.objectsList = [];
    this.scene = scene;
    this.inputX;
    this.inputY;
    this.inputZ;
    this.init();
  }

  init() {
    const loadingManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadingManager);

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 32);
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
    const donutGeometry = new THREE.TorusGeometry(0.8, 0.5, 20, 45);

    const count = 100;

    //Adding objects with textures
    for (let i = 0; i < count; i++) {
      const randomTextureNumber = Math.floor(Math.random() * 10 + 1.5);

      const boxMaterial = new THREE.MeshMatcapMaterial({
        matcap: textureLoader.load(`/textures/${randomTextureNumber}.png`),
      });
      const cylinderMaterial = new THREE.MeshMatcapMaterial({
        matcap: textureLoader.load(`/textures/${randomTextureNumber}.png`),
      });
      const sphereMaterial = new THREE.MeshMatcapMaterial({
        matcap: textureLoader.load(`/textures/${randomTextureNumber}.png`),
      });
      const donutMaterial = new THREE.MeshMatcapMaterial({
        matcap: textureLoader.load(`/textures/${randomTextureNumber}.png`),
      });

      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      const donut = new THREE.Mesh(donutGeometry, donutMaterial);

      this.scene.add(box, donut, sphere, cylinder);
    }

    //Positioning objects
    if (this.inputX && this.inputY && this.inputZ) {
      this.scene.children.forEach((opt3d) => {
        if (!opt3d.isMesh) {
          return;
        }
        const scale = Math.random() - 0.7;
        //TODO Get values from inputs
        opt3d.position.x = randomNumber(-1, 1) * this.inputX;
        opt3d.position.y = randomNumber(-1, 1) * this.inputY;
        opt3d.position.z = randomNumber(-1, 1) * this.inputZ;

        opt3d.userData.defaultPosition = opt3d.position.clone();

        opt3d.scale.setScalar(scale);
      });
    }

    //Explosion
    let currentState = 'explosion';

    const explosionControl = () => {
      let explodeButton = document.querySelector('.explode_btn');
      if (currentState === 'explosion') {
        this.scene.children.forEach((opt3d) => {
          if (!opt3d.isMesh) {
            return;
          }
          gsap.to(opt3d.position, {
            duration: 1.1,
            delay: 0.5,
            x: randomNumber(-30, 30),
            y: randomNumber(-30, 30),
            z: randomNumber(-30, 30),
          });
        });
        currentState = 'implosion';
        explodeButton.innerText = 'Implosion';
      } else {
        //Return objects to previous position
        this.scene.children.forEach((opt3d) => {
          if (!opt3d.isMesh) {
            return;
          }
          gsap.to(opt3d.position, {
            duration: 1.1,
            delay: 0.5,
            x: opt3d.userData.defaultPosition.x,
            y: opt3d.userData.defaultPosition.y,
            z: opt3d.userData.defaultPosition.z,
          });
        });
        currentState = 'explosion';
        explodeButton.innerText = 'Explosion';
      }
    };
    document.querySelector('.explode_btn').addEventListener('click', () => explosionControl(), false);

    const create = () => {
      this.inputX = document.getElementById('x_input').value;
      this.inputY = document.getElementById('y_input').value;
      this.inputZ = document.getElementById('y_input').value;

      return inputX, inputY, inputZ;
    };
    document.querySelector('.create_btn').addEventListener('click', () => create(), false);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export default InteractiveObjects;
