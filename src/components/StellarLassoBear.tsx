import React, { useEffect, useRef, useState } from "react";

interface ThreadNavItem {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  /** Fracción del recorrido horizontal (0..1) donde se ubica la estación */
  anchorRatio: number;
}

const THREAD_NAV_ITEMS: ThreadNavItem[] = [
  { id: "inicio", label: "Inicio", shortLabel: "Inicio", href: "#inicio", anchorRatio: 0.04 },
  { id: "sectores", label: "Sectores", shortLabel: "Sectores", href: "#sectores", anchorRatio: 0.22 },
  { id: "proyectos", label: "Obras", shortLabel: "Obras", href: "#proyectos", anchorRatio: 0.4 },
  { id: "herramientas", label: "Software", shortLabel: "Software", href: "#herramientas", anchorRatio: 0.58 },
  { id: "experiencia", label: "Currículum", shortLabel: "CV", href: "#experiencia", anchorRatio: 0.76 },
  { id: "contacto", label: "Contacto", shortLabel: "Contacto", href: "#contacto", anchorRatio: 0.94 },
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
 * Barra de navegación horizontal inferior con el osito deslizándose sobre el lazo estelar.
 * - Actualiza las transformaciones CSS (`translate3d` y `scaleX`) directamente sobre refs DOM
 *   y detiene el loop `requestAnimationFrame` cuando alcanza el reposo, evitando re-renders
 *   de React y filtros SVG pesados que congelaban los navegadores móviles.
 */
export const StellarLassoBear: React.FC = () => {
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
        const usableWidth = Math.max(0, trackWidthRef.current - 36);
        const x = clamped * usableWidth;
        bearWrapRef.current.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0) rotate(${tiltDeg.toFixed(2)}deg)`;
      }

      // Actualizar estaciones iluminadas solo cuando cambia el índice
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

      const tilt = Math.max(-10, Math.min(10, velocityRef.current * 0.6));
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

      // Detectar sección activa solo si cambió
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
      className="pointer-events-none fixed bottom-2.5 sm:bottom-4 inset-x-0 z-40 flex justify-center px-2 sm:px-4 select-none"
    >
      <div className="pointer-events-auto relative w-full max-w-3xl rounded-2xl border border-[#ffc83d]/40 bg-[#081730]/95 px-2.5 sm:px-5 pt-4 pb-2.5 shadow-[0_10px_32px_rgba(4,12,29,0.88)]">
        {/* Pista horizontal del lazo estelar */}
        <div
          ref={trackRef}
          className="relative mx-1 sm:mx-2 mb-2.5 h-3 flex items-center"
          aria-hidden="true"
        >
          {/* Hilo base tenue */}
          <div className="h-[2px] w-full rounded-full bg-[#2b528d]/60" />

          {/* Hilo dorado progresivo animado por GPU (scaleX) */}
          <div
            ref={progressLineRef}
            className="absolute left-0 top-1/2 h-[2.5px] w-full -translate-y-1/2 origin-left rounded-full bg-gradient-to-r from-[#fff6cf] via-[#ffd95a] to-[#ffe38a] shadow-[0_0_10px_rgba(255,200,61,0.75)]"
            style={{ transform: "scaleX(0)" }}
          />

          {/* Ancla estelar fija al inicio izquierdo del hilo */}
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

          {/* Nudos de estación sobre la cuerda */}
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

          {/* Osito viajando horizontalmente sobre el lazo */}
          <div
            ref={bearWrapRef}
            className="pointer-events-none absolute -top-7 left-0 h-10 w-10 sm:-top-8 sm:h-11 sm:w-11"
            style={{ transform: "translate3d(0px, 0, 0)" }}
          >
            <img
              src="/osocolgando.png"
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
        <div className="grid grid-cols-6 gap-1 sm:gap-2">
          {THREAD_NAV_ITEMS.map((item, idx) => {
            const isActive = activeSection === item.id;
            const isRevealed = idx <= revealedIndex;

            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex items-center justify-center gap-1 rounded-full border px-1.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "border-[#ffe38a] bg-[#173d7a] text-[#ffe38a] shadow-[0_0_12px_rgba(255,200,61,0.35)]"
                    : isRevealed
                      ? "border-[#ffc83d]/45 bg-[#0e244a] text-[#e8dfc8] hover:border-[#ffd95a] hover:text-[#ffe38a]"
                      : "border-[#2c5491]/70 bg-[#0a1c3a]/80 text-[#9ab5dc] hover:border-[#ffc83d]/60 hover:text-[#ffe38a]"
                }`}
              >
                <span className="sm:hidden truncate">{item.shortLabel}</span>
                <span className="hidden sm:inline truncate">{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
