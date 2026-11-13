import React, { useEffect, useRef, useState } from "react";

interface ThreadNavItem {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  /** Fracción del recorrido máximo del hilo donde queda anclado el botón (0..1) */
  anchorRatio: number;
}

const THREAD_NAV_ITEMS: ThreadNavItem[] = [
  { id: "inicio", label: "Inicio", shortLabel: "Inicio", href: "#inicio", anchorRatio: 0.02 },
  { id: "sectores", label: "Sectores", shortLabel: "Sectores", href: "#sectores", anchorRatio: 0.2 },
  { id: "proyectos", label: "Obras", shortLabel: "Obras", href: "#proyectos", anchorRatio: 0.38 },
  {
    id: "herramientas",
    label: "Software",
    shortLabel: "Software",
    href: "#herramientas",
    anchorRatio: 0.56,
  },
  {
    id: "experiencia",
    label: "Currículum",
    shortLabel: "CV",
    href: "#experiencia",
    anchorRatio: 0.74,
  },
  { id: "contacto", label: "Contacto", shortLabel: "Contacto", href: "#contacto", anchorRatio: 0.9 },
];

const CHECK_ORDER = [
  "contacto",
  "experiencia",
  "herramientas",
  "proyectos",
  "sectores",
  "inicio",
];

/**
 * Navegación estelar con el osito:
 * - En pantallas grandes (>= 768px): mantiene el osito colgando verticalmente del lazo estelar
 *   a la derecha de la pantalla, revelando los botones sobre el hilo al hacer scroll.
 * - En pantallas pequeñas (< 768px): muestra la barra horizontal inferior ligera con el osito
 *   caminando (/osito.png) sobre el lazo estelar usando solo transformaciones GPU sin re-renders
 *   constantes ni filtros SVG pesados, evitando congelamientos en móviles.
 */
export const StellarLassoBear: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (isDesktop === null) return null;

  return isDesktop ? <DesktopVerticalLassoBear /> : <MobileHorizontalLassoBear />;
};

const DesktopVerticalLassoBear: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [swayDeg, setSwayDeg] = useState(0);
  const [viewportH, setViewportH] = useState(900);
  const [activeSection, setActiveSection] = useState("inicio");

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateViewport = () => {
      setViewportH(window.innerHeight || 900);
    };

    const computeScrollTarget = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const raw =
        docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      targetProgressRef.current = raw;

      const delta = scrollTop - lastScrollYRef.current;
      lastScrollYRef.current = scrollTop;
      velocityRef.current = Math.max(
        -12,
        Math.min(12, velocityRef.current + delta * 0.14)
      );

      for (const secId of CHECK_ORDER) {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.42) {
            setActiveSection(secId);
            break;
          }
        }
      }
    };

    updateViewport();
    computeScrollTarget();
    currentProgressRef.current = targetProgressRef.current;
    setProgress(targetProgressRef.current);

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.14;

      velocityRef.current *= 0.88;
      const idleSwing = Math.sin(elapsed * 1.9) * 2.2;
      const totalSwing = Math.max(
        -11,
        Math.min(11, velocityRef.current * 0.65 + idleSwing)
      );

      setProgress(currentProgressRef.current);
      setSwayDeg(totalSwing);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("scroll", computeScrollTarget, { passive: true });
    window.addEventListener("resize", updateViewport, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", computeScrollTarget);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const isCompact = viewportH < 700;
  const bearBoxHeight = isCompact ? 112 : 142;
  const minTetherPx = isCompact ? 82 : 104;
  const maxTetherPx = Math.max(
    minTetherPx + 160,
    viewportH - bearBoxHeight - 16
  );

  const tetherLength = minTetherPx + progress * (maxTetherPx - minTetherPx);
  const containerWidth = isCompact ? 132 : 158;
  const threadX = isCompact ? 90 : 108;

  const wavePoints = 18;
  const wavePath = Array.from({ length: wavePoints + 1 }, (_, i) => {
    const t = i / wavePoints;
    const y = t * tetherLength;
    const amp = Math.sin(t * Math.PI) * 4.5;
    const x = threadX + Math.sin(t * Math.PI * 5 + progress * 8) * amp;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");

  return (
    <nav
      aria-label="Navegación estelar en el hilo"
      className="pointer-events-none fixed top-0 right-3 xl:right-6 z-40 select-none"
      style={{ width: containerWidth, height: viewportH }}
    >
      {/* Ancla estelar superior fija en el borde del cielo */}
      <div
        className="absolute -top-2 z-20 flex items-center justify-center -translate-x-1/2"
        style={{ left: threadX }}
      >
        <div className="h-6 w-6 rounded-full bg-[#ffd95a]/40 blur-md animate-pulse" />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="absolute text-[#ffe38a] drop-shadow-[0_0_10px_rgba(255,217,90,0.95)]"
        >
          <path
            fill="currentColor"
            d="M12 1.5L14.4 9.1L22 11.5L14.4 13.9L12 21.5L9.6 13.9L2 11.5L9.6 9.1L12 1.5Z"
          />
        </svg>
      </div>

      {/* SVG del Lazo Estelar que se alarga desde arriba hasta las manos del oso */}
      <svg
        width={containerWidth}
        height={Math.max(90, tetherLength + 28)}
        viewBox={`0 0 ${containerWidth} ${Math.max(90, tetherLength + 28)}`}
        className="absolute top-0 left-0 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="stellarLassoCore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff6cf" />
            <stop offset="35%" stopColor="#ffd95a" />
            <stop offset="75%" stopColor="#ffc83d" />
            <stop offset="100%" stopColor="#ffe9a3" />
          </linearGradient>

          <linearGradient id="stellarLassoAura" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(143, 192, 255, 0.45)" />
            <stop offset="50%" stopColor="rgba(255, 200, 61, 0.65)" />
            <stop offset="100%" stopColor="rgba(255, 227, 138, 0.9)" />
          </linearGradient>

          <filter
            id="stellarGlow"
            x="-60%"
            y="-5%"
            width="220%"
            height="110%"
          >
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <line
          x1={threadX}
          y1="0"
          x2={threadX}
          y2={tetherLength}
          stroke="url(#stellarLassoAura)"
          strokeWidth="6"
          strokeLinecap="round"
          style={{ filter: "blur(4px)" }}
        />

        <path
          d={wavePath}
          fill="none"
          stroke="rgba(169, 200, 245, 0.55)"
          strokeWidth="1.4"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />

        <line
          x1={threadX}
          y1="0"
          x2={threadX}
          y2={tetherLength}
          stroke="url(#stellarLassoCore)"
          strokeWidth="2.8"
          strokeLinecap="round"
          filter="url(#stellarGlow)"
        />

        <g
          transform={`translate(${threadX}, ${tetherLength})`}
          filter="url(#stellarGlow)"
        >
          <ellipse
            cx="-7"
            cy="-2"
            rx="7.5"
            ry="4.2"
            transform="rotate(-22 -7 -2)"
            fill="none"
            stroke="#ffd95a"
            strokeWidth="2.2"
          />
          <ellipse
            cx="7"
            cy="-2"
            rx="7.5"
            ry="4.2"
            transform="rotate(22 7 -2)"
            fill="none"
            stroke="#ffd95a"
            strokeWidth="2.2"
          />
          <ellipse
            cx="0"
            cy="4"
            rx="5.5"
            ry="6.5"
            fill="rgba(255, 217, 90, 0.18)"
            stroke="#fff0b3"
            strokeWidth="2.2"
          />
          <circle cx="0" cy="0" r="3.2" fill="#fff8d6" />
        </g>
      </svg>

      {THREAD_NAV_ITEMS.map((item) => {
        const topMargin = isCompact ? 38 : 48;
        const usableSpan = Math.max(140, maxTetherPx - topMargin - 30);
        const nodeY = topMargin + item.anchorRatio * usableSpan;

        const isRevealed = tetherLength >= nodeY + 14;
        const isActive = activeSection === item.id;

        return (
          <div
            key={item.id}
            style={{ top: nodeY }}
            className={`absolute left-0 right-0 z-30 flex items-center transition-all duration-500 ${
              isRevealed
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-75 -translate-y-2 pointer-events-none"
            }`}
          >
            <a
              href={item.href}
              style={{ left: threadX }}
              className={`group -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide backdrop-blur-xl transition-all duration-300 ${
                isActive
                  ? "border-[#ffe38a] bg-gradient-to-r from-[#1c4688] to-[#13315f] text-[#ffe38a] shadow-[0_0_18px_rgba(255,200,61,0.5),0_4px_12px_rgba(0,0,0,0.7)] scale-105"
                  : "border-[#ffc83d]/45 bg-[#081730]/90 text-[#d9e2f2] hover:border-[#ffd95a] hover:bg-[#143466] hover:text-[#ffe38a] shadow-[0_4px_14px_rgba(0,0,0,0.75)]"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-125 ${
                  isActive
                    ? "bg-[#ffe38a] shadow-[0_0_8px_#ffe38a]"
                    : "bg-[#ffc83d]"
                }`}
              />
              <span>{item.label}</span>
            </a>
          </div>
        );
      })}

      {/* Osito colgado del extremo del lazo estelar */}
      <div
        className="absolute"
        style={{
          left: threadX,
          top: tetherLength - (isCompact ? 9 : 12),
          width: isCompact ? 92 : 118,
          height: bearBoxHeight,
          transform: `translateX(-52%) rotate(${swayDeg.toFixed(2)}deg)`,
          transformOrigin: "52% 8%",
          willChange: "transform, top",
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-x-3 top-2 bottom-4 rounded-full opacity-55 blur-xl"
          style={{
            background:
              "radial-gradient(circle at 50% 35%, rgba(255, 217, 90, 0.35), rgba(44, 108, 208, 0.25) 65%, transparent 80%)",
          }}
        />

        <img
          src="/osocolgando.png"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          draggable={false}
          className="relative h-full w-full object-contain drop-shadow-[0_10px_22px_rgba(4,12,29,0.85)]"
        />
      </div>
    </nav>
  );
};

const MobileHorizontalLassoBear: React.FC = () => {
  const [activeSection, setActiveSection] = useState("inicio");
  const [revealedIndex, setRevealedIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const bearWrapRef = useRef<HTMLDivElement | null>(null);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const velocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const trackWidthRef = useRef(300);
  const rafRef = useRef<number | null>(null);
  const activeSectionRef = useRef("inicio");
  const revealedIndexRef = useRef(0);

  useEffect(() => {
    const measureTrack = () => {
      if (trackRef.current) {
        trackWidthRef.current = trackRef.current.clientWidth || 300;
      }
    };

    const applyVisuals = (progress: number, tiltDeg: number) => {
      const clamped = Math.min(1, Math.max(0, progress));
      if (progressLineRef.current) {
        progressLineRef.current.style.transform = `scaleX(${clamped.toFixed(4)})`;
      }
      if (bearWrapRef.current) {
        const usableWidth = Math.max(0, trackWidthRef.current - 44);
        const x = clamped * usableWidth;
        bearWrapRef.current.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0) rotate(${tiltDeg.toFixed(2)}deg)`;
      }

      let nextRevealed = 0;
      for (let i = 0; i < THREAD_NAV_ITEMS.length; i++) {
        if (clamped + 0.02 >= THREAD_NAV_ITEMS[i].anchorRatio) {
          nextRevealed = i;
        }
      }
      if (nextRevealed !== revealedIndexRef.current) {
        revealedIndexRef.current = nextRevealed;
        setRevealedIndex(nextRevealed);
      }
    };

    const step = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.18;
      velocityRef.current *= 0.84;

      const tilt = Math.max(-7, Math.min(7, velocityRef.current * 0.45));
      applyVisuals(currentProgressRef.current, tilt);

      if (Math.abs(diff) > 0.0008 || Math.abs(velocityRef.current) > 0.08) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        currentProgressRef.current = targetProgressRef.current;
        velocityRef.current = 0;
        applyVisuals(currentProgressRef.current, 0);
        rafRef.current = null;
      }
    };

    const scheduleAnimation = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    const handleScroll = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const raw =
        docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

      const delta = scrollTop - lastScrollYRef.current;
      lastScrollYRef.current = scrollTop;
      targetProgressRef.current = raw;
      velocityRef.current = Math.max(
        -12,
        Math.min(12, velocityRef.current + delta * 0.12)
      );

      for (const secId of CHECK_ORDER) {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            if (activeSectionRef.current !== secId) {
              activeSectionRef.current = secId;
              setActiveSection(secId);
            }
            break;
          }
        }
      }

      scheduleAnimation();
    };

    const handleResize = () => {
      measureTrack();
      applyVisuals(currentProgressRef.current, 0);
    };

    measureTrack();
    handleScroll();
    currentProgressRef.current = targetProgressRef.current;
    applyVisuals(currentProgressRef.current, 0);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      aria-label="Navegación estelar horizontal"
      className="pointer-events-none fixed bottom-2.5 inset-x-0 z-40 flex justify-center px-2 select-none"
    >
      <div className="pointer-events-auto relative w-full max-w-lg rounded-2xl border border-[#ffc83d]/40 bg-[#081730]/95 px-2.5 pt-5 pb-2.5 shadow-[0_10px_30px_rgba(4,12,29,0.88)]">
        {/* Pista horizontal del lazo estelar */}
        <div
          ref={trackRef}
          className="relative mx-1 mb-2.5 h-3 flex items-center"
          aria-hidden="true"
        >
          <div className="h-[2px] w-full rounded-full bg-[#2b528d]/60" />

          <div
            ref={progressLineRef}
            className="absolute left-0 top-1/2 h-[2.5px] w-full -translate-y-1/2 origin-left rounded-full bg-gradient-to-r from-[#fff6cf] via-[#ffd95a] to-[#ffe38a] shadow-[0_0_10px_rgba(255,200,61,0.75)]"
            style={{ transform: "scaleX(0)" }}
          />

          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            className="absolute -left-1.5 top-1/2 -translate-y-1/2 text-[#ffe38a]"
          >
            <path
              fill="currentColor"
              d="M12 1.5L14.4 9.1L22 11.5L14.4 13.9L12 21.5L9.6 13.9L2 11.5L9.6 9.1L12 1.5Z"
            />
          </svg>

          {THREAD_NAV_ITEMS.map((item, idx) => {
            const lit = idx <= revealedIndex || activeSection === item.id;
            return (
              <span
                key={`knot-${item.id}`}
                style={{ left: `${item.anchorRatio * 100}%` }}
                className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full transition-colors duration-300 ${
                  lit
                    ? "bg-[#ffe38a] shadow-[0_0_8px_rgba(255,227,138,0.9)]"
                    : "bg-[#2c5491] border border-[#ffc83d]/40"
                }`}
              />
            );
          })}

          {/* Osito caminando horizontalmente sobre el lazo */}
          <div
            ref={bearWrapRef}
            className="pointer-events-none absolute -top-8 left-0 h-11 w-11"
            style={{ transform: "translate3d(0px, 0, 0)" }}
          >
            <img
              src="/osito.png"
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              draggable={false}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Botones de navegación horizontales */}
        <div className="grid grid-cols-6 gap-1">
          {THREAD_NAV_ITEMS.map((item, idx) => {
            const isActive = activeSection === item.id;
            const isRevealed = idx <= revealedIndex;

            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex items-center justify-center rounded-full border px-1 py-1 text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "border-[#ffe38a] bg-[#173d7a] text-[#ffe38a] shadow-[0_0_12px_rgba(255,200,61,0.35)]"
                    : isRevealed
                      ? "border-[#ffc83d]/45 bg-[#0e244a] text-[#e8dfc8]"
                      : "border-[#2c5491]/70 bg-[#0a1c3a]/80 text-[#9ab5dc]"
                }`}
              >
                <span className="truncate">{item.shortLabel}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
