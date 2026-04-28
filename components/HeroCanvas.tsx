"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
    camera.position.set(0, 0, 28);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));

    const group = new THREE.Group();
    scene.add(group);

    const gold = new THREE.Color("#f4d88b");
    const blue = new THREE.Color("#8ec9ff");
    const white = new THREE.Color("#ffffff");

    const particleCount = 850;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const t = i / particleCount;
      const angle = t * Math.PI * 2 * 4.6;
      const radius = 4 + 13 * t;
      const pulse = Math.sin(t * Math.PI * 10) * 0.8;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.55 + pulse;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const mix = t < 0.45 ? gold : blue;
      colors[i * 3] = mix.r;
      colors[i * 3 + 1] = mix.g;
      colors[i * 3 + 2] = mix.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.075,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    group.add(particles);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: white,
      transparent: true,
      opacity: 0.14,
      wireframe: true
    });

    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i += 1) {
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(5 + i * 2.3, 0.012, 8, 140),
        ringMaterial.clone()
      );
      torus.rotation.x = Math.PI / 2 + i * 0.12;
      torus.rotation.y = i * 0.25;
      torus.material.opacity = 0.09 + i * 0.018;
      rings.push(torus);
      group.add(torus);
    }

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#f4d88b",
      transparent: true,
      opacity: 0.38
    });
    const heartPoints: THREE.Vector3[] = [];
    for (let i = 0; i < 140; i += 1) {
      const x = -14 + i * 0.2;
      const y = Math.sin(i * 0.18) * 0.28 + (i % 28 === 0 ? 1.2 : 0);
      heartPoints.push(new THREE.Vector3(x, y - 4.5, -2));
    }
    const heartLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(heartPoints), lineMaterial);
    group.add(heartLine);

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      group.position.x = width < 800 ? 3.5 : 8;
      group.position.y = width < 800 ? -4 : -1;
      group.scale.setScalar(width < 800 ? 0.72 : 1);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.8;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.8;
    };

    const animate = (now: number) => {
      const time = now * 0.001;
      const breath = 1 + Math.sin(time * 1.8) * 0.025;
      particles.scale.setScalar(breath);
      group.rotation.y = time * 0.06 + pointerX * 0.14;
      group.rotation.x = pointerY * 0.08;
      heartLine.position.x = Math.sin(time * 1.4) * 0.24;
      rings.forEach((ring, index) => {
        ring.rotation.z = time * (0.08 + index * 0.018);
        ring.scale.setScalar(1 + Math.sin(time * 1.4 + index) * 0.018);
      });
      renderer.render(scene, camera);
      if (!reduceMotion) {
        frame = requestAnimationFrame(animate);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    renderer.render(scene, camera);
    if (!reduceMotion) frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      ringMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="hbg-canvas" aria-hidden="true" />;
}
