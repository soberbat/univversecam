import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";
import { factionData } from "./config";

interface SceneProps {
  rendererContainer: any;
  handlePlanetFocus: (focusedPlanet: string | undefined) => void;
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
  model: any;
  cameraGroup: any;
  planets: Array<THREE.Object3D<THREE.Event>>;
  world: THREE.Object3D;
  factions: Array<{ sprite: THREE.SpriteMaterial; color: string }>;
  fanctionObj: any;
  isSelected: boolean;
  selectedPlanet: THREE.Object3D<THREE.Event> | undefined;
  isCameraMovingFree: boolean;
  canCameraMove: boolean;
  onPlanetFocus: SceneProps["handlePlanetFocus"];

  constructor({ rendererContainer, handlePlanetFocus }: SceneProps) {
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
    this.scene.background = "0x000000" as unknown as THREE.Color;

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
    this.controls.enablePan = false;

    this.controls.update();

    this.planets = [];
    this.factions = [];
    this.selectedPlanet;

    this.fanctionObj = [];

    this.world = new THREE.Object3D();
    this.world.name = "world";
    (this.world as any).isPlanet = true;

    this.isSelected = false;
    this.isCameraMovingFree = true;
    this.canCameraMove = true;

    this.onPlanetFocus = handlePlanetFocus;
  }

  animate = () => {
    this.renderer.render(this.scene, this.camera);
    TWEEN.update();
    this.controls.update();
    this.frame = requestAnimationFrame(this.animate.bind(this));
    this.rotatePlanets();
    this.isSelected && this.focusPlanet(this.selectedPlanet!.position);
  };

  init = async () => {
    this.loadModels();
    this.initLights();
    this.initSprites();
    this.addStars();
    this.rendererContainer.addEventListener("mousedown", this.handleRaycasting);
  };

  rotatePlanets = () => {
    this.planets.forEach((planet, i) => {
      planet.position.set(
        Math.sin(((Date.now() % 60000) / 60000) * i * Math.PI * 2) * i * 3,
        0,
        Math.cos(((Date.now() % 60000) / 60000) * i * Math.PI * 2) * i * 3
      );
    });
  };

  loadModels = () => {
    const planets = ["alien", "serenity", "tree", "beta"];

    const loader = new GLTFLoader();

    const planetLoadMap = planets.map((planet, i) => {
      return new Promise((resolve, reject) => {
        loader.load(`/assets/planets/${planet}.glb`, (scene) => {
          const planetGroup = this.world.clone();
          planetGroup.userData.planetName = planet;
          planetGroup.position.set(0, 0, 0);

          (planetGroup as any).isPlanet = true;

          scene.scene.traverse((item) => {
            item.scale.set(1, 1, 1);
            item.position.set(0, 0, 0);
          });

          planetGroup.add(scene.scene);
          this.planets.push(planetGroup);
          this.scene.add(planetGroup);
          resolve(scene.scene);
        });
      });
    });

    return Promise.all(planetLoadMap);
  };

  initLights = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffc0cb, 0.6);
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.7);
    this.scene.add(ambientLight, directionalLight, hemisphereLight);
  };

  initSprites = () => {
    const factionsWithSpriteMap = factionData.map(({ name, color }) => ({
      spriteMap: this.loadSpriteMaterial(name),
      color,
    }));

    factionsWithSpriteMap.forEach(({ spriteMap, color }) => {
      this.factions.push({
        sprite: new THREE.SpriteMaterial({ map: spriteMap, opacity: 0.3 }),
        color,
      });
    });

    const lines = this.generateSpritesFromFactions();

    this.fanctionObj = {
      banu: {
        material: this.factions[0].sprite,
        isVisible: true,
        lineMat: lines[0],
      },
      menx: {
        material: this.factions[1].sprite,
        isVisible: true,
        lineMat: lines[1],
      },
      septor: {
        material: this.factions[2].sprite,
        isVisible: true,
        lineMat: lines[2],
      },
      namsxt: {
        material: this.factions[3].sprite,
        isVisible: true,
        lineMat: lines[3],
      },
      ka: {
        material: this.factions[4].sprite,
        isVisible: true,
        lineMat: lines[4],
      },
      px23t: {
        material: this.factions[5].sprite,
        isVisible: true,
        lineMat: lines[5],
      },
    };
  };

  generateSpritesFromFactions = () => {
    return this.factions.map(({ sprite, color }) => {
      const length = this.getRandomNumber(5, 15);
      const opacity = 0.1;
      const transparent = true;
      const mat = new THREE.LineBasicMaterial({ color, transparent, opacity });

      for (const _ of Array.from({ length })) {
        const newSprite = this.createSprite(sprite);
        this.drawLine(mat, newSprite);
      }

      return mat;
    });
  };

  drawLine = (lineMaterial: THREE.LineBasicMaterial, sprite: THREE.Sprite) => {
    const curve = new THREE.QuadraticBezierCurve3(
      sprite.position.clone(),
      new THREE.Vector3(
        sprite.position.x / 2,
        sprite.position.y / 2 + 3,
        sprite.position.z / 2
      ),
      new THREE.Vector3(0, 0, 0)
    );

    const points = curve.getPoints(100);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(lineGeometry, lineMaterial);
    this.scene.add(line);
  };

  createSprite = (spriteMaterial: THREE.SpriteMaterial) => {
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.5, 0.5, 0.5);
    sprite.position.set(
      this.getRandomNumber(-20, 20),
      this.getRandomNumber(-10, 10),
      this.getRandomNumber(-10, 10)
    );

    this.scene.add(sprite);

    return sprite;
  };

  addStars = () => {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 15000;

    const vertices = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      vertices[i] = (Math.random() - 0.5) * 100;
    }

    const buffer = new THREE.BufferAttribute(vertices, 3);
    particlesGeometry.setAttribute("position", buffer);

    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load("/star.png");

    const size = 0.1;
    const transparent = true;
    const material = new THREE.PointsMaterial({ map, transparent, size });

    const stars = new THREE.Points(particlesGeometry, material);
    this.scene.add(stars);
  };

  loadSpriteMaterial = (name: string) => {
    return new THREE.TextureLoader().load(`/assets/factions/${name}.png`);
  };

  traverseThroughIntersection = (intersect: THREE.Object3D<THREE.Event>) => {
    let traversed: THREE.Object3D<THREE.Event> | undefined = undefined;

    intersect.traverseAncestors((obj) => {
      if ((obj as any).isPlanet === true) {
        traversed = obj;
        this.isSelected = true;
        return;
      }
    });

    this.isSelected = traversed !== undefined;
    return traversed;
  };

  getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  handleRaycasting = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const X = clientX;
    const Y = clientY;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (X / window.innerWidth) * 2 - 1;
    mouse.y = -(Y / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, this.camera);

    const intersect = raycaster.intersectObjects(this.planets, true)[0]
      ?.object as any;

    if (intersect) {
      const selectedPlanet = this.traverseThroughIntersection(intersect);
      const shouldSetSelectedPlanet = selectedPlanet && this.isSelected;

      if (shouldSetSelectedPlanet) this.selectedPlanet = selectedPlanet;
    } else {
      this.isSelected && this.releaseControls();
      this.isSelected = false;
    }
  };

  //TWEENİNG FUNCTİONS
  animateFactionVisibility = (faction: string) => {
    const { material, isVisible, lineMat } = this.fanctionObj[faction];

    const factionVisibility = new TWEEN.Tween({
      opacity: isVisible ? 0.3 : 1,
    })
      .to({ opacity: isVisible ? 1 : 0.3 }, 1000)
      .onStart(() => {})
      .onComplete(() => {
        this.fanctionObj[faction].isVisible = !isVisible;
      })
      .onUpdate((tween) => {
        lineMat.opacity = tween.opacity;
        material.opacity = tween.opacity;
      });

    const pathVisiblity = new TWEEN.Tween({
      opacity: isVisible ? 0.1 : 0.3,
    })
      .to({ opacity: isVisible ? 0.3 : 0.1 }, 1000)
      .onStart(() => {})
      .onComplete(() => {})
      .onUpdate((tween) => {
        lineMat.opacity = tween.opacity;
      });

    factionVisibility.start();
    pathVisiblity.start();
  };

  animateAreaLight = (intersect: any) => {
    const areaLight = intersect.children[1];
    const areaLightVisibility = new TWEEN.Tween(areaLight)
      .to({ intensity: 10 })
      .duration(1000)
      .easing(TWEEN.Easing.Circular.InOut);

    areaLightVisibility.start();
  };

  releaseControls = () => {
    this.onPlanetFocus(undefined);
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

  focusPlanet = (position: THREE.Vector3) => {
    this.onPlanetFocus(this.selectedPlanet!.userData.planetName);
    this.lockControls(position);
    this.lockCamera(position);
  };

  lockControls = (position: THREE.Vector3) => {
    const tween = new TWEEN.Tween(this.controls.target)
      .to(position)
      .duration(5000)
      .easing(TWEEN.Easing.Circular.Out)
      .onStart(() => (this.controls.enabled = false))
      .onComplete(() => (this.controls.enabled = true));
    tween.start();
  };

  lockCamera = (position: THREE.Vector3) => {
    const tween = new TWEEN.Tween(this.camera.position)
      .to({ y: 4, z: 4, x: position.x + 2 })
      .duration(3000)
      .easing(TWEEN.Easing.Circular.Out);
    tween.start();
  };
}
