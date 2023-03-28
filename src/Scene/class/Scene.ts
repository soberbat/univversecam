import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";
import { Object3D, Vector3 } from "three";

import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

interface SceneProps {
  rendererContainer: any;
}

export class Scene {
  rendererContainer: HTMLDivElement;
  scene: THREE.Scene;
  canvas: any;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  ratio: number;
  controls: any;
  frame: any;

  clock;

  model: any;
  cameraGroup: any;

  planets: any;
  mars: any;
  world: THREE.Object3D;

  isSelected: boolean;
  selectedPlanet: any;

  lockAnimation: TWEEN.Tween<any>;
  lockAnimation2: TWEEN.Tween<any>;

  constructor({ rendererContainer }: SceneProps) {
    this.rendererContainer = rendererContainer;
    this.canvas = document.createElement("canvas");
    this.rendererContainer.appendChild(this.canvas);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();
    this.scene.background = "0x000000";

    this.cameraGroup = new THREE.Group();
    this.ratio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, this.ratio);
    this.camera.position.z = -4;
    this.camera.position.y = 4;
    this.cameraGroup.add(this.camera);
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.cameraGroup);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.minPolarAngle = 1;
    this.controls.update();

    this.planets = [];

    this.world = new THREE.Object3D();
    const pLight1 = new THREE.SpotLight(0x133fff);
    pLight1.position.set(0, 20, 0);
    const width = 5;
    const height = 5;
    const intensity = 0;
    const rectLight = new THREE.RectAreaLight(
      0xffd700,
      intensity,
      width,
      height
    );
    rectLight.position.set(0, -5, 0);
    rectLight.lookAt(0, 0, 0);
    this.world.add(rectLight);
    this.world.name = "world";
    (this.world as any).isPlanet = true;

    this.clock = new THREE.Clock();
    this.isSelected = false;
  }

  init = async () => {
    await this.loadObjects();
    await this.initLights();

    this.addStars();
    this.rotatePlanet();

    this.rendererContainer.addEventListener("mousedown", (e) =>
      this.raycasterListener(e)
    );
  };

  loadObjects = () => {
    const planets = ["sun", "alien", "serenity", "tree", "beta", "vega"];
    const loader = new GLTFLoader();

    const promises = planets.map((planet, i) => {
      return new Promise((resolve, reject) => {
        loader.load(`/planets/${planet}/scene.gltf`, (scene) => {
          const planetGroup = this.world.clone();
          planetGroup.position.set(0, 0, 0);

          (planetGroup as any).isPlanet = true;

          scene.scene.traverse((item) => item.scale.set(1, 1, 1));

          planetGroup.add(scene.scene);
          this.planets.push(planetGroup);
          this.scene.add(planetGroup);

          resolve(scene.scene);
        });
      });
    });

    return Promise.all(promises).then((values) => {});
  };

  initLights = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffc0cb, 1);
    this.scene.add(directionalLight);

    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.7);
    this.scene.add(light);
  };

  gridHelper = () => {
    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.position.set(0, 0.5, 0);
    this.scene.add(gridHelper);
  };

  raycasterListener = (e: MouseEvent) => {
    const X = e.clientX;
    const Y = e.clientY;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (X / window.innerWidth) * 2 - 1;
    mouse.y = -(Y / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, this.camera);

    const intersect = raycaster.intersectObjects(this.planets, true)[0]
      ?.object as any;

    if (intersect) {
      const selectedPlanet = this.getTraversedItem(intersect);

      if (this.isSelected) {
        this.selectedPlanet = selectedPlanet;
        this.animateAreaLight(selectedPlanet);
      }
    } else {
      this.isSelected && this.releaseControls();
      this.isSelected = false;
    }
  };

  getTraversedItem = (intersect: any) => {
    let traversed;

    intersect.traverseAncestors((intersectionObj: any) => {
      if (intersectionObj.isPlanet === true) {
        traversed = intersectionObj;
        this.isSelected = true;
        return;
      }
    });

    return traversed ? traversed : (this.isSelected = false);
  };

  animate = () => {
    this.renderer.render(this.scene, this.camera);

    TWEEN.update();
    this.controls.update();

    this.frame = requestAnimationFrame(this.animate.bind(this));

    this.planets.forEach((planet: THREE.Object3D, i: number) => {
      (planet as Object3D).position.set(
        Math.sin(((Date.now() % 60000) / 60000) * i * Math.PI * 2) * i * 5,
        0,
        Math.cos(((Date.now() % 60000) / 60000) * i * Math.PI * 2) * i * 5
      );
    });

    if (this.isSelected) {
      this.focusPlanet(this.selectedPlanet.position);
    }
  };

  addStars = () => {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 15000;

    const vertices = new Float32Array(particlesCount);
    for (let i = 0; i < particlesCount; i++) {
      vertices[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(vertices, 3)
    );

    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load("/star.png");

    const particlesMaterial = new THREE.PointsMaterial({
      map: particleTexture,
      transparent: true,
      size: 0.3,
    });

    const stars = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(stars);
  };

  animateAreaLight = (intersect: any) => {
    const areaLight = intersect.children[1];
    const areaLightVisibility = new TWEEN.Tween(areaLight)
      .to({ intensity: 5 })
      .duration(1000)
      .easing(TWEEN.Easing.Circular.InOut);

    areaLightVisibility.start();
  };

  rotatePlanet = () => {
    const model = new TWEEN.Tween(this.world.rotation)
      .to({ y: 360 })
      .duration(30000000)
      .repeat(99)
      .easing(TWEEN.Easing.Circular.Out);

    model.start();
  };

  releaseControls = () => {
    TWEEN.removeAll();
    this.animateControls({ x: 0, y: 40, z: 4 }, { x: 0, y: 0, z: 0 });
  };

  animateControls = (camera: any, controls: any) => {
    const cameraTween = new TWEEN.Tween(this.camera.position)
      .to(camera)
      .duration(1600)
      .easing(TWEEN.Easing.Circular.Out);

    const controlsTween = new TWEEN.Tween(this.controls.target)
      .to(controls)
      .duration(1000)
      .easing(TWEEN.Easing.Circular.Out)
      .onStart(() => {
        this.controls.enabled = false;
      })
      .onComplete(() => {
        this.controls.enabled = true;
      });

    controlsTween.start();
    cameraTween.start();
  };

  focusPlanet = (position: any) => {
    const { x, y, z } = position;
    const pos = new Vector3(5, y, z);

    this.lockAnimation = new TWEEN.Tween(this.controls.target)
      .to(position)
      .duration(5000)
      .easing(TWEEN.Easing.Circular.Out)
      .onStart(() => {
        this.controls.enabled = false;
      })
      .onComplete(() => {
        this.controls.enabled = true;
      });

    this.lockAnimation2 = new TWEEN.Tween(this.camera.position)
      .to({ y: 4, z: 4, x: x + 2 })
      .duration(3000)
      .easing(TWEEN.Easing.Circular.Out);

    this.lockAnimation.start();
    this.lockAnimation2.start();
  };
}
