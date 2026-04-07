import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { ArrowLeft, Sparkles, Quote } from "lucide-react";
import { Link } from "react-router-dom";

import { AnimatedButton } from "./ui/animated-button";
import { dreamCards, dreamQuotes, type DreamCard } from "../data/dreams";

const Dreams = () => {
  const worldRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const activePosterRef = useRef(0);
  const hoveredPosterRef = useRef<number | null>(null);
  const [activePosterIndex, setActivePosterIndex] = useState(0);

  const posterMeta = useMemo(
    () =>
      dreamCards.map((card, index) => ({
        ...card,
        label: `0${index + 1}`,
      })),
    [],
  );

  useEffect(() => {
    const container = worldRef.current;

    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050816, 12, 48);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 1.2, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(0x7dd3fc, 45, 120);
    keyLight.position.set(4, 5, 10);
    scene.add(keyLight);

    const warmLight = new THREE.PointLight(0xf59e0b, 22, 80);
    warmLight.position.set(-5, -2, 6);
    scene.add(warmLight);

    const group = new THREE.Group();
    scene.add(group);

    const textureCache = posterMeta.map((card) => createPosterTexture(card));
    const posterMeshes: Array<{
      mesh: THREE.Mesh;
      baseY: number;
      baseZRotation: number;
      angle: number;
    }> = [];
    const indexByUuid = new Map<string, number>();

    posterMeta.forEach((_, index) => {
      const geometry = new THREE.PlaneGeometry(2.7, 3.85, 1, 1);
      const material = new THREE.MeshStandardMaterial({
        map: textureCache[index],
        roughness: 0.78,
        metalness: 0.08,
      });

      const mesh = new THREE.Mesh(geometry, material);
      const angle = (index / posterMeta.length) * Math.PI * 2;
      const radius = 5.2;
      const height = index % 2 === 0 ? 0.8 : -0.3;
      const baseZRotation = index % 2 === 0 ? -0.06 : 0.06;

      mesh.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius,
      );
      mesh.lookAt(0, 0.3, 0);
      mesh.rotation.z = baseZRotation;
      group.add(mesh);
      posterMeshes.push({ mesh, baseY: height, baseZRotation, angle });
      indexByUuid.set(mesh.uuid, index);
    });

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 900;
    const positions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      const spread = 26;
      positions[index * 3] = (Math.random() - 0.5) * spread;
      positions[index * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[index * 3 + 2] = (Math.random() - 0.5) * spread;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xdbeafe,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const updatePointer = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);

      const intersects = raycaster.intersectObjects(
        posterMeshes.map((entry) => entry.mesh),
        false,
      );

      if (intersects.length > 0) {
        const intersectedUuid = intersects[0].object.uuid;
        const intersectedIndex = indexByUuid.get(intersectedUuid);

        hoveredPosterRef.current =
          typeof intersectedIndex === "number" ? intersectedIndex : null;
        renderer.domElement.style.cursor = "pointer";
      } else {
        hoveredPosterRef.current = null;
        renderer.domElement.style.cursor = "default";
      }
    };

    const handlePosterPick = () => {
      if (typeof hoveredPosterRef.current === "number") {
        setActivePosterIndex(hoveredPosterRef.current);
      }
    };

    const handlePointerLeave = () => {
      hoveredPosterRef.current = null;
      renderer.domElement.style.cursor = "default";
    };

    renderer.domElement.addEventListener("pointermove", updatePointer);
    renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
    renderer.domElement.addEventListener("click", handlePosterPick);

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;

      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(
        1,
        document.body.scrollHeight - window.innerHeight,
      );
      progressRef.current = scrollTop / maxScroll;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let animationFrame = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.elapsedTime;
      const progress = progressRef.current;
      const activeIndex = activePosterRef.current;

      const selectedEntry = posterMeshes[activeIndex];
      const targetFocusRotation = selectedEntry
        ? Math.PI / 2 - selectedEntry.angle
        : 0;
      const baseRotation = progress * Math.PI * 1.05 + elapsed * 0.06;
      const rotationTarget = baseRotation * 0.32 + targetFocusRotation * 0.68;

      group.rotation.y = THREE.MathUtils.damp(
        group.rotation.y,
        rotationTarget,
        4,
        delta,
      );
      group.rotation.x = THREE.MathUtils.damp(
        group.rotation.x,
        Math.sin(progress * Math.PI) * 0.12,
        4,
        delta,
      );

      posterMeshes.forEach(({ mesh, baseY, baseZRotation }, index) => {
        const isActive = index === activeIndex;
        const isHovered = index === hoveredPosterRef.current;
        const targetScale = isActive ? 1.16 : isHovered ? 1.08 : 1;

        mesh.position.y = baseY + Math.sin(elapsed * 0.8 + index) * 0.18;
        mesh.rotation.z =
          baseZRotation + Math.sin(elapsed * 0.45 + index) * 0.02;
        mesh.rotation.y = Math.sin(elapsed * 0.5 + index) * 0.12;

        const nextScale = THREE.MathUtils.lerp(mesh.scale.x, targetScale, 0.1);
        mesh.scale.setScalar(nextScale);

        const material = mesh.material as THREE.MeshStandardMaterial;
        material.emissive.set(
          isActive ? 0x3b82f6 : isHovered ? 0x1d4ed8 : 0x000000,
        );
        material.emissiveIntensity = isActive ? 0.2 : isHovered ? 0.1 : 0;
      });

      particles.rotation.y = elapsed * 0.035;
      particles.rotation.x = Math.sin(elapsed * 0.1) * 0.08;
      camera.position.x = Math.sin(progress * Math.PI * 2) * 0.2;
      camera.position.y = 1.2 + Math.cos(progress * Math.PI * 2) * 0.08;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      renderer.domElement.style.cursor = "default";
      renderer.domElement.removeEventListener("pointermove", updatePointer);
      renderer.domElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      renderer.domElement.removeEventListener("click", handlePosterPick);

      particleGeometry.dispose();
      particleMaterial.dispose();
      posterMeshes.forEach((mesh) => {
        mesh.mesh.geometry.dispose();
        const material = mesh.mesh.material;
        if (Array.isArray(material)) {
          material.forEach((entry) => entry.dispose());
        } else {
          material.dispose();
        }
      });
      textureCache.forEach((texture) => texture.dispose());
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [posterMeta]);

  useEffect(() => {
    activePosterRef.current = activePosterIndex;
  }, [activePosterIndex]);

  return (
    <div className="min-h-screen bg-surface-0 text-primary-0 overflow-hidden">
      <header className="relative z-20 px-6 lg:px-8 pt-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-30 hover:text-primary-0 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <AnimatedButton to="/detailed-projects" tone="neutral" size="sm">
            Real Projects
          </AnimatedButton>
        </div>
      </header>

      <main className="relative">
        <section className="relative min-h-[100svh] flex items-center">
          <div ref={worldRef} className="absolute inset-0" aria-hidden="true" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.64),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.72)_35%,rgba(255,255,255,0.9))] dark:bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.12),transparent_35%),linear-gradient(180deg,rgba(2,6,23,0.48),rgba(2,6,23,0.74)_35%,rgba(2,6,23,0.9))]" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 w-full">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-0 text-surface-0 text-xs font-medium uppercase tracking-[0.35em] mb-6">
                <Sparkles className="h-4 w-4" />
                MY DREAMS
              </p>

              <h1 className="text-5xl md:text-7xl font-extrabold text-primary-0 leading-[0.95] mb-6 max-w-4xl">
                A world of ideas that want to become real.
              </h1>

              <p className="text-lg md:text-xl text-primary-30 leading-relaxed max-w-2xl mb-8">
                This page is the place for the things I want to build in life:
                useful products, a strong brand, and systems that feel smart,
                human, and future-facing.
              </p>

              <div className="flex flex-wrap gap-3">
                <AnimatedButton href="#dream-cards" tone="dream">
                  Scroll the posters
                </AnimatedButton>
                <AnimatedButton to="/materials" tone="warning">
                  Study materials
                </AnimatedButton>
              </div>

              <div className="mt-6 rounded-2xl border border-surface-30 bg-surface-0/80 backdrop-blur-md p-4 max-w-2xl">
                <p className="text-xs uppercase tracking-[0.35em] text-primary-40 mb-2">
                  selected poster
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-primary-0 mb-1">
                  {posterMeta[activePosterIndex].title}
                </h2>
                <p className="text-sm md:text-base text-primary-30 leading-relaxed mb-3">
                  {posterMeta[activePosterIndex].outcome}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <AnimatedButton
                    href={`#dream-${posterMeta[activePosterIndex].id}`}
                    tone="neutral"
                    size="sm"
                  >
                    Open Details
                  </AnimatedButton>
                  <p className="text-xs text-primary-40">
                    Hover and click any poster in the 3D world to switch this.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center text-primary-30 text-xs uppercase tracking-[0.35em]">
            Scroll and click posters to explore each dream
          </div>
        </section>

        <section id="dream-cards" className="relative z-10 pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
            {posterMeta.map((card, index) => (
              <motion.article
                key={card.id}
                id={`dream-${card.id}`}
                className={`grid gap-6 lg:grid-cols-[1.15fr_0.85fr] items-stretch rounded-[2rem] border bg-surface-0/90 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-300 ${
                  activePosterIndex === index
                    ? "border-info-0 ring-2 ring-info-0/30"
                    : "border-surface-30"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onMouseEnter={() => setActivePosterIndex(index)}
              >
                <div className={`p-8 md:p-10 bg-gradient-to-br ${card.accent}`}>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-semibold tracking-[0.45em] text-primary-30 uppercase">
                      poster 0{index + 1}
                    </span>
                    <span className="px-3 py-1 rounded-full border border-surface-30 bg-surface-0 text-xs font-medium text-primary-30">
                      future plan
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-extrabold text-primary-0 mb-4">
                    {card.title}
                  </h2>
                  <p className="text-base md:text-lg text-primary-30 leading-relaxed mb-8 max-w-2xl">
                    {card.summary}
                  </p>

                  <div className="rounded-2xl bg-surface-0/70 border border-surface-30 p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-primary-30 mb-2">
                      what it should feel like
                    </p>
                    <p className="text-primary-0 font-medium text-base md:text-lg">
                      {card.outcome}
                    </p>
                  </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col justify-between gap-8 bg-surface-0">
                  <div>
                    <div className="flex items-center gap-3 mb-4 text-primary-0">
                      <Quote className="h-5 w-5" />
                      <h3 className="text-xl font-bold">Dream quote</h3>
                    </div>
                    <blockquote className="text-2xl md:text-3xl font-semibold text-primary-0 leading-tight">
                      {dreamQuotes[index % dreamQuotes.length]}
                    </blockquote>
                  </div>
                </div>
              </motion.article>
            ))}

            <motion.div
              className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {dreamQuotes.map((quote) => (
                <div
                  key={quote}
                  className="rounded-2xl border border-surface-30 bg-surface-0/90 p-5 text-sm text-primary-30 leading-relaxed shadow-sm"
                >
                  {quote}
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

function createPosterTexture(card: DreamCard & { label?: string }) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1536;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Unable to create 2D context for poster texture.");
  }

  const gradient = context.createLinearGradient(
    0,
    0,
    canvas.width,
    canvas.height,
  );
  const [lightColor, darkColor] = card.posterGradient;
  gradient.addColorStop(0, lightColor);
  gradient.addColorStop(1, darkColor);
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "rgba(255,255,255,0.56)";
  context.fillRect(72, 72, canvas.width - 144, canvas.height - 144);

  context.strokeStyle = "rgba(15, 23, 42, 0.16)";
  context.lineWidth = 14;
  context.strokeRect(72, 72, canvas.width - 144, canvas.height - 144);

  context.fillStyle = "rgba(15, 23, 42, 0.82)";
  context.font = "bold 64px Poppins, sans-serif";
  context.textAlign = "center";
  context.fillText(card.label ?? "01", canvas.width / 2, 220);

  context.font = "bold 72px Poppins, sans-serif";
  wrapText(context, card.title.toUpperCase(), canvas.width / 2, 380, 780, 86);

  context.fillStyle = "rgba(15, 23, 42, 0.82)";
  context.font = "500 34px Inter, sans-serif";
  wrapText(context, card.summary, canvas.width / 2, 760, 760, 50);

  context.fillStyle = "rgba(255,255,255,0.9)";
  context.beginPath();
  context.arc(canvas.width / 2, 1170, 168, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "rgba(15, 23, 42, 0.75)";
  context.font = "600 30px Inter, sans-serif";
  context.fillText("ENTER", canvas.width / 2, 1160);
  context.font = "700 44px Inter, sans-serif";
  context.fillText("THE WORLD", canvas.width / 2, 1212);

  context.fillStyle = "rgba(15, 23, 42, 0.6)";
  context.font = "500 26px Inter, sans-serif";
  context.fillText("scroll-driven poster", canvas.width / 2, 1410);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let index = 0; index < words.length; index += 1) {
    const testLine = `${line}${words[index]} `;
    const metrics = context.measureText(testLine);

    if (metrics.width > maxWidth && index > 0) {
      context.fillText(line.trim(), x, currentY);
      line = `${words[index]} `;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }

  context.fillText(line.trim(), x, currentY);
}

export default Dreams;
