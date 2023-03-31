import * as MeshLine from "three.meshline";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { LottieLoader } from "three/examples/jsm/loaders/LottieLoader";
import * as TWEEN from "@tweenjs/tween.js";
import { Object3D, Vector3 } from "three";

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
  world: THREE.Object3D;

  factions: any;
  fanctionObj: any;

  points: any;
  line: any;

  isSelected: boolean;
  selectedPlanet: any;

  isCameraMovingFree: boolean;
  canCameraMove: boolean;

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
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.scene = new THREE.Scene();
    this.scene.background = "0x000000";

    this.cameraGroup = new THREE.Group();
    this.ratio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, this.ratio);

    this.camera.position.z = 20;
    this.camera.position.y = 20;
    this.cameraGroup.add(this.camera);
    this.camera.lookAt(0, 0, 0);
    this.camera.fov = 40;
    this.scene.add(this.cameraGroup);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;

    this.controls.update();

    this.planets = [];
    this.points = [];
    this.factions = [];
    this.fanctionObj = [];

    this.world = new THREE.Object3D();
    this.world.name = "world";
    (this.world as any).isPlanet = true;

    this.clock = new THREE.Clock();
    this.isSelected = false;
    this.isCameraMovingFree = true;
    this.canCameraMove = true;
  }

  init = async () => {
    await this.loadObjects();
    await this.initLights();
    this.addSprites();
    this.addStars();

    this.rendererContainer.addEventListener("mousedown", (e) =>
      this.raycasterListener(e)
    );
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
        //    this.lockAnimation.stop();
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

  randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  animate = () => {
    this.renderer.render(this.scene, this.camera);

    TWEEN.update();
    this.controls.update();

    //this.freeMoveCamera();

    this.frame = requestAnimationFrame(this.animate.bind(this));

    this.planets.forEach((planet: THREE.Object3D, i: number) => {
      (planet as Object3D).position.set(
        Math.sin(((Date.now() % 60000) / 60000) * i * Math.PI * 2) * i * 5,
        0,
        Math.cos(((Date.now() % 60000) / 60000) * i * Math.PI * 2) * i * 5
      );
    });

    this.isSelected && this.focusPlanet(this.selectedPlanet.position);

    //    this.canCameraMove && this.isCameraMovingFree && this.moveCamera();
  };

  moveCamera = () => {
    this.isCameraMovingFree = false;

    const randX = this.randomIntFromInterval(-10, 10);
    const randY = this.randomIntFromInterval(39, 41);
    const randZ = this.randomIntFromInterval(4, 6);

    this.animateControls({ x: randX, y: randY, z: randZ }, {}, true, 8000);
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

  addSprites = () => {
    const loader = new LottieLoader();
    loader.load("lotties/pulsee.json", (texture) => {});
    const path = "/icons/stars/star-";
    const factionMaps = [
      new THREE.TextureLoader().load(path + "01.png"),
      new THREE.TextureLoader().load(path + "02.png"),
      new THREE.TextureLoader().load(path + "03.png"),
      new THREE.TextureLoader().load(path + "04.png"),
      new THREE.TextureLoader().load(path + "05.png"),
      new THREE.TextureLoader().load(path + "06.png"),
    ];

    factionMaps.forEach((map: any, i: number) => {
      this.factions.push(new THREE.SpriteMaterial({ map: map, opacity: 0.3 }));
    });

    this.factions.forEach((material) => {
      const randomNum = this.randomIntFromInterval(5, 15);

      for (let i = 0; i < randomNum; i++) {
        const sprite = new THREE.Sprite(material);

        sprite.scale.set(0.6, 0.6, 0.6);
        sprite.position.set(
          this.randomIntFromInterval(-20, 20),
          this.randomIntFromInterval(-10, 10),
          this.randomIntFromInterval(-20, 10)
        );
        this.scene.add(sprite);
      }
    });

    this.fanctionObj = {
      banu: { material: this.factions[0], isVisible: true },
      menx: { material: this.factions[1], isVisible: true },
      septor: { material: this.factions[2], isVisible: true },
      namsxt: { material: this.factions[3], isVisible: true },
      ka: { material: this.factions[4], isVisible: true },
      px23t: { material: this.factions[5], isVisible: true },
    };
  };

  animateFactionVisibility = (faction: string) => {
    const { material, isVisible } = this.fanctionObj[faction];

    const hotspotVisibility = new TWEEN.Tween({
      opacity: isVisible ? 0.3 : 1,
    })
      .to({ opacity: isVisible ? 1 : 0.3 }, 1000)
      .onStart(() => {})
      .onComplete(() => {
        this.fanctionObj[faction].isVisible = !isVisible;
      })
      .onUpdate((tween) => (material.opacity = tween.opacity));

    hotspotVisibility.start();
  };

  releaseControls = () => {
    TWEEN.removeAll();
    this.animateControls({ x: 0, y: 20, z: 20 }, { x: 0, y: 0, z: 0 });
  };

  animateControls = (
    camera: any,
    controls?: any,
    isFreeMovement?: boolean,
    duration?: number
  ) => {
    const cameraTween = new TWEEN.Tween(this.camera.position)
      .to(camera)
      .duration(700)
      .easing(TWEEN.Easing.Circular.Out);

    const controlsTween = new TWEEN.Tween(this.controls.target)
      .to(controls)
      .duration(700)
      .easing(TWEEN.Easing.Circular.Out)
      .onStart(() => {
        this.controls.enabled = false;
        this.controls.update();
      })
      .onComplete(() => {
        this.controls.enabled = true;
      });

    cameraTween.start();
    controlsTween.start();
  };

  set2dCamera = () => {
    this.controls.enabled = false;
    this.controls.maxPolarAngle = Math.PI;
    this.controls.minPolarAngle = 0;
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    const cameraTween = new TWEEN.Tween(this.camera.position)
      .to({ x: 0, y: 40, z: 2 })
      .duration(1000)
      .easing(TWEEN.Easing.Exponential.Out);
    cameraTween.start();
  };

  set3dCamera = () => {
    const cameraTween = new TWEEN.Tween(this.camera.position)
      .to({ x: 0, y: 20, z: 20 })
      .duration(1000)
      .easing(TWEEN.Easing.Exponential.Out)
      .onComplete(() => {
        this.controls.target.set(0, 0, 0);
        this.controls.maxPolarAngle = Math.PI;
        this.controls.minPolarAngle = 0;
        this.controls.enabled = true;
        this.controls.update();
      });
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
