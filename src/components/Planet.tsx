import React from "react";
import { cn } from "../lib/utils";
import {
  PLANETS,
  planetKeyFromSrc,
  planetSize,
  type PlanetKey,
  type PlanetScale,
} from "../data/planets";

interface PlanetProps {
  name?: PlanetKey;
  src?: string;
  /** Escala relativa (respeta las proporciones reales entre planetas) */
  scale?: PlanetScale;
  /** Diámetro del disco en px (anula la escala) */
  size?: number;
  /** Nivel de desenfoque óptico (px) para dar profundidad de campo */
  blurPx?: number;
  glow?: boolean;
  shade?: boolean;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
}

/**
 * Planeta con bordes difuminados, halo atmosférico y sombreado de volumen.
 * El tamaño se calcula a partir del diámetro real del cuerpo celeste.
 */
export const Planet: React.FC<PlanetProps> = ({
  name,
  src,
  scale = { earthPx: 44 },
  size,
  blurPx = 1.4,
  glow = true,
  shade = true,
  className,
  imgClassName,
  style,
}) => {
  const key = name ?? planetKeyFromSrc(src ?? "");
  const p = PLANETS[key];
  const discPx = size ?? planetSize(key, scale);
  const box = Math.round(discPx / p.disc);
  const discInset = `${((1 - p.disc) / 2) * 100}%`;

  const outer = p.disc * 100;
  const innerStop = Math.max(20, outer - p.feather);
  const midStop = Math.round(innerStop + (outer - innerStop) * 0.55);
  const mask =
    p.mask ??
    `radial-gradient(circle closest-side, #000 ${innerStop}%, rgba(0,0,0,0.45) ${midStop}%, transparent ${outer}%)`;

  return (
    <div
      className={cn("relative shrink-0 pointer-events-none select-none", className)}
      style={{
        width: box,
        height: box,
        filter: blurPx > 0 ? `blur(${blurPx}px)` : undefined,
        ...style,
      }}
      aria-hidden="true"
    >
      {glow && (
        <div
          className="absolute rounded-full"
          style={{
            inset: discInset,
            background: p.glow,
            filter: `blur(${Math.max(6, discPx * 0.2)}px)`,
            transform: "scale(1.18)",
          }}
        />
      )}

      <img
        src={p.src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        draggable={false}
        className={cn("relative h-full w-full object-contain", imgClassName)}
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />

      {shade && (
        <div
          className="absolute rounded-full"
          style={{
            inset: discInset,
            background:
              "radial-gradient(circle at 30% 26%, rgba(255,255,255,0.14), transparent 38%, rgba(5,20,45,0.5) 82%)",
            maskImage:
              "radial-gradient(circle closest-side, #000 80%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(circle closest-side, #000 80%, transparent 100%)",
          }}
        />
      )}
    </div>
  );
};

