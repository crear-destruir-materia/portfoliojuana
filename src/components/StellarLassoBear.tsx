import React, { useEffect, useRef, useState } from "react";

interface ThreadNavItem {
  id: string;
  label: string;
  href: string;
  /** Fracción del recorrido máximo del hilo donde queda anclado el botón (0..1) */
  anchorRatio: number;
}

const THREAD_NAV_ITEMS: ThreadNavItem[] = [
  { id: "inicio", label: "Inicio", href: "#inicio", anchorRatio: 0.02 },
  { id: "sectores", label: "Sectores", href: "#sectores", anchorRatio: 0.2 },
  { id: "proyectos", label: "Obras", href: "#proyectos", anchorRatio: 0.38 },
  {
    id: "herramientas",
    label: "Software",
    href: "#herramientas",
    anchorRatio: 0.56,
  },
  {
    id: "experiencia",
    label: "Currículum",
    href: "#experiencia",
    anchorRatio: 0.74,
  },
  { id: "contacto", label: "Contacto", href: "#contacto", anchorRatio: 0.9 },
];

/**
 * Animación de scroll y Navegación en el Hilo Estelar ("StellarLassoBear"):
 * - Reemplaza la barra de navegación tradicional.
 * - A medida que el osito (/osocolgando.png) desciende con el scroll tirando del lazo estelar,
 *   va dejando descubiertos sobre el hilo los botones interactivos de cada sección
 *   (Inicio, Sectores, Obras, Software, Currículum, Contacto).
 */
export const StellarLassoBear: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [swayDeg, setSwayDeg] = useState(0);
  const [viewportH, setViewportH] = useState(900);
  const [viewportW, setViewportW] = useState(1280);
  const [activeSection, setActiveSection] = useState("inicio");

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateViewport = () => {
      setViewportH(window.innerHeight || 900);
      setViewportW(window.innerWidth || 1280);
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

      // Detectar sección activa para resaltarla en el hilo
      const checkOrder = [
        "contacto",
        "experiencia",
        "herramientas",
        "proyectos",
        "sectores",
        "inicio",
      ];
      for (const secId of checkOrder) {
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

  const isMobile = viewportW < 640;
  const isCompact = viewportH < 700;
  const bearBoxHeight = isMobile ? 84 : isCompact ? 112 : 142;
  // Longitud inicial suficiente para que el primer nudo ("Inicio") ya sea visible arriba del oso
  const minTetherPx = isMobile ? 64 : isCompact ? 82 : 104;
  const maxTetherPx = Math.max(
    minTetherPx + 160,
    viewportH - bearBoxHeight - 16
  );

  // Longitud actual del lazo estelar en píxeles según el scroll
  const tetherLength = minTetherPx + progress * (maxTetherPx - minTetherPx);

  // Coordenada X del hilo dentro del contenedor (compacta en móviles para no tapar el contenido)
  const containerWidth = isMobile ? 76 : isCompact ? 132 : 158;
  const threadX = isMobile ? 48 : isCompact ? 90 : 108;

  // Hebra secundaria entrelazada alrededor del hilo principal
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
      className="pointer-events-none fixed top-0 right-1 sm:right-3 xl:right-6 z-40 select-none"
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

        {/* Halo exterior difuminado del lazo */}
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

        {/* Hebra estelar secundaria entrelazada */}
        <path
          d={wavePath}
          fill="none"
          stroke="rgba(169, 200, 245, 0.55)"
          strokeWidth="1.4"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />

        {/* Cuerda principal dorada del lazo estelar */}
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

        {/* Nudo / Lazo estelar brillante donde se sujeta el oso con sus manos */}
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

      {/* BOTONES DE NAVEGACIÓN ENGARZADOS SOBRE EL HILO QUE SE DESCUBREN A MEDIDA QUE BAJA EL OSO */}
      {THREAD_NAV_ITEMS.map((item) => {
        // Posición Y fija de cada estación a lo largo del hilo
        const topMargin = isCompact ? 38 : 48;
        const usableSpan = Math.max(140, maxTetherPx - topMargin - 30);
        const nodeY = topMargin + item.anchorRatio * usableSpan;

        // El botón queda visible en cuanto el nudo de las manos del oso pasa por debajo de esa estación
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
            {/* Botón interactivo montado directamente sobre el hilo estelar */}
            <a
              href={item.href}
              style={{ left: threadX }}
              className={`group -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1 sm:gap-1.5 rounded-full border px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-xs font-medium tracking-wide backdrop-blur-xl transition-all duration-300 ${
                isActive
                  ? "border-[#ffe38a] bg-gradient-to-r from-[#1c4688] to-[#13315f] text-[#ffe38a] shadow-[0_0_18px_rgba(255,200,61,0.5),0_4px_12px_rgba(0,0,0,0.7)] scale-105"
                  : "border-[#ffc83d]/45 bg-[#081730]/90 text-[#d9e2f2] hover:border-[#ffd95a] hover:bg-[#143466] hover:text-[#ffe38a] shadow-[0_4px_14px_rgba(0,0,0,0.75)]"
              }`}
            >
              {/* Pequeña estrella-nudo sobre el hilo */}
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
          top: tetherLength - (isMobile ? 7 : isCompact ? 9 : 12),
          width: isMobile ? 68 : isCompact ? 92 : 118,
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
