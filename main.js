import * as THREE from "./node_modules/three/build/three.module.js";
import { EffectComposer } from "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "./node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "./node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";

import "./style.css";

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const options = {
  jan: "Dès que tu perdras la peur de l'adversité, tu réussiras.",
  feb: "Tant que tu ne porteras pas de vernis à ongle, tu ne seras pas trahi.",
  mar: "Aussitôt que tu commenceras à mediter, tu seras en plein forme.",
  april: "Tant que tu suivas vertus, tu n'échouras pas.",
  may: "Lorsque tu verras une lune rouge, tu t'évanouiras.",
  june: "Lorsque tu trouveras ton allergie, tu me remercieras.",
  july: "Lorsque les étoiles s'aligneront, tu rencontreras ton jumeau.",
  aug: "Quand tu résoudras l'énigma de la vie, tu seras transformé.",
  sep: "Dès que tu trouveras le livre ancien, tu seras guéri.",
  oct: "Lorsque tu comprendras pourquoi tu existes, tu ressentiras une douleur inconnue.",
  nov: "Tant que tu te croiras, tu ne perdras jamais.",
  dec: "Tant que tu seras heureux, tu seras en bonne santé.",
}

// Scene
const scene = new THREE.Scene();

// Create orb
const geometryS = new THREE.SphereGeometry(1, 64, 64);
const materialS = new THREE.MeshBasicMaterial({
  color: "#38a9ff",
  transparent: true,
  opacity: 1,
  
})
const mesh = new THREE.Mesh(geometryS, materialS);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Light
const ambientlight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientlight);

// Camera
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 8;
camera.position.x = 0;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias:true, });
//renderer.autoClear() = false;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.render(scene, camera);

// Cool lighting w/ bloomRenderer
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 2; //intensity of glow
bloomPass.radius = 0;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

function onClick() {
  const option = document.getElementById("month-name").value;
  p.setText(options.option);
}

const loop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
  bloomComposer.render();
}

loop();
