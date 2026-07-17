// Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById("canvas-container").appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

const fillLight = new THREE.DirectionalLight(0xaaccff, 0.5);
fillLight.position.set(-5, 0, -5);
scene.add(fillLight);

// Group to hold the camera parts
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

function buildProgrammaticCamera() {
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.7, metalness: 0.3 });
  const lensMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.8 });
  const glassMaterial = new THREE.MeshStandardMaterial({ color: 0x00aaff, roughness: 0.1, metalness: 1.0 });
  const buttonMaterial = new THREE.MeshStandardMaterial({ color: 0xcc0000 });

  const bodyGeo = new THREE.BoxGeometry(2, 1.2, 0.8);
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMaterial);
  cameraGroup.add(bodyMesh);

  const lensGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.6, 32);
  lensGeo.rotateX(Math.PI / 2);
  const lensMesh = new THREE.Mesh(lensGeo, lensMaterial);
  lensMesh.position.set(0, 0, 0.4 + 0.3);
  cameraGroup.add(lensMesh);

  const glassGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32);
  glassGeo.rotateX(Math.PI / 2);
  const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
  glassMesh.position.set(0, 0, 0.75);
  cameraGroup.add(glassMesh);

  const btnGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16);
  const btnMesh = new THREE.Mesh(btnGeo, buttonMaterial);
  btnMesh.position.set(0.7, 0.6 + 0.05, 0);
  cameraGroup.add(btnMesh);

  const bumpGeo = new THREE.BoxGeometry(0.8, 0.4, 0.6);
  const bumpMesh = new THREE.Mesh(bumpGeo, bodyMaterial);
  bumpMesh.position.set(0, 0.6 + 0.2, 0);
  cameraGroup.add(bumpMesh);
}

// Attempt to load external Sony GLB, fallback to programmatic
if (typeof THREE.GLTFLoader !== "undefined") {
  const loader = new THREE.GLTFLoader();
  loader.load(
    'sony_camera.glb',
    (gltf) => {
      // Success! Add the real model
      const model = gltf.scene;
      
      // Center and scale the model so it fits the scene
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());
      
      model.position.x += (model.position.x - center.x);
      model.position.y += (model.position.y - center.y);
      model.position.z += (model.position.z - center.z);
      
      // Scale it down to roughly the size of our programmatic box
      const targetSize = 3.0; // max dimension
      model.scale.multiplyScalar(targetSize / size);
      
      cameraGroup.add(model);
      console.log("Successfully loaded sony_camera.glb");
    },
    undefined,
    (error) => {
      console.warn("Could not load 'sony_camera.glb'. Using programmatic fallback instead.");
      buildProgrammaticCamera();
    }
  );
} else {
  buildProgrammaticCamera();
}


// GSAP ScrollTrigger Integration
gsap.registerPlugin(ScrollTrigger);

// Link model rotation and scale to the entire scrollable document
gsap.to(cameraGroup.rotation, {
  y: Math.PI * 2, // 360 degree rotation
  x: Math.PI / 4,
  ease: "none",
  scrollTrigger: {
    trigger: ".scroll-content",
    start: "top top",
    end: "bottom bottom",
    scrub: 1, // Smooth scrubbing
  }
});

gsap.to(cameraGroup.scale, {
  x: 1.8,
  y: 1.8,
  z: 1.8,
  ease: "none",
  scrollTrigger: {
    trigger: ".scroll-content",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  }
});

// Animation Loop (Anti-Gravity Bobbing)
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  // Apply a subtle continuous sine-wave bobbing effect
  // We apply this to the group's position so it doesn't conflict with GSAP rotation
  cameraGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
  cameraGroup.position.x = Math.sin(elapsedTime * 0.8) * 0.05;
  
  // Let the model drift slightly on Z
  cameraGroup.position.z = Math.cos(elapsedTime * 1.2) * 0.05;

  renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
