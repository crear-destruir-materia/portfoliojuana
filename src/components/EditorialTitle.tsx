import React from "react";
import { cn } from "../lib/utils";

interface EditorialTitleProps {
  /** Texto del título (la primera letra se renderiza en caligrafía ornamental y el resto en serif editorial en mayúsculas) */
  text: string;
  /** Segunda línea opcional del título */
  secondLine?: string;
  /** Si la segunda línea también lleva inicial caligráfica */
  secondLineInitial?: boolean;
  /** Mostrar estrella difuminada detrás de la letra inicial (como en el portafolio de Behance de Juana) */
  starAccent?: boolean;
  /** Color de la letra inicial caligráfica */
  initialClassName?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span";
}

/**
 * Mapa de compensación óptica (kerning) por letra inicial en Pinyon Script / Great Vibes.
 * Las mayúsculas caligráficas con rúbricas largas a la derecha (H, T, F, I, J, S, B, R, P, D, M, N, V, W, X, Y, Z)
 * requieren mayor margen derecho en "em" para nunca superponerse con la segunda letra en caja alta.
 */
const INITIAL_RIGHT_KERNING: Record<string, string> = {
  A: "0.14em",
  B: "0.20em",
  C: "0.16em",
  D: "0.20em",
  E: "0.16em",
  F: "0.24em",
  G: "0.16em",
  H: "0.26em",
  I: "0.24em",
  J: "0.24em",
  K: "0.20em",
  L: "0.16em",
  M: "0.20em",
  N: "0.22em",
  O: "0.16em",
  P: "0.22em",
  Q: "0.16em",
  R: "0.18em",
  S: "0.22em",
  T: "0.26em",
  U: "0.18em",
  V: "0.24em",
  W: "0.24em",
  X: "0.22em",
  Y: "0.24em",
  Z: "0.20em",
};

function splitFirstLetter(raw: string): {
  prefix: string;
  initial: string;
  rest: string;
  kerningEm: string;
} {
  const match = raw.match(/^([¡¿"“']*)([A-Za-zÁÉÍÓÚÑáéíóúñ])(.*)$/);
  if (!match) {
    return { prefix: "", initial: "", rest: raw, kerningEm: "0.18em" };
  }
  const initial = (match[2] ?? "").toUpperCase();
  const baseChar = initial
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const kerningEm = INITIAL_RIGHT_KERNING[baseChar] ?? "0.20em";

  return {
    prefix: match[1] ?? "",
    initial,
    rest: (match[3] ?? "").toUpperCase(),
    kerningEm,
  };
}

/**
 * Componente tipográfico dual inspirado en los títulos de Juana Varela ("Brochures Educativos"):
 * - Primera letra en caligrafía Copperplate ornamental con rúbrica (Pinyon Script / Great Vibes)
 *   con kerning óptico calculado por glifo para evitar cualquier superposición.
 * - Resto de letras en serif clásica de alto contraste en caja alta (Cormorant Garamond)
 */
export const EditorialTitle: React.FC<EditorialTitleProps> = ({
  text,
  secondLine,
  secondLineInitial = false,
  starAccent = false,
  initialClassName,
  className,
  as: Tag = "span",
}) => {
  const line1 = splitFirstLetter(text);
  const line2 = secondLine
    ? secondLineInitial
      ? splitFirstLetter(secondLine)
      : { prefix: "", initial: "", rest: secondLine.toUpperCase(), kerningEm: "0em" }
    : null;

  return (
    <Tag
      className={cn(
        "relative inline-block font-editorial font-semibold tracking-[0.035em] leading-[1.14]",
        className
      )}
    >
      {/* Estrella suave de fondo detrás de la inicial caligráfica (estilo Behance de Juana) */}
      {starAccent && (
        <svg
          viewBox="0 0 60 60"
          aria-hidden="true"
          className="pointer-events-none absolute -left-5 -top-4 h-[1.45em] w-[1.45em] text-[#ffd95a]/35 blur-[1px] select-none"
        >
          <path
            fill="currentColor"
            d="M30 2 L35 21 L54 14 L40 29 L56 42 L36 39 L30 58 L24 39 L4 42 L20 29 L6 14 L25 21 Z"
          />
        </svg>
      )}

      <span className="relative z-10">
        {line1.prefix && (
          <span className="mr-[0.16em] font-editorial inline-block">
            {line1.prefix}
          </span>
        )}
        {line1.initial && (
          <span
            style={{ marginRight: line1.kerningEm, paddingLeft: "0.04em" }}
            className={cn(
              "font-script-initial text-[1.46em] text-[#ffe38a] drop-shadow-[0_2px_10px_rgba(255,200,61,0.3)]",
              initialClassName
            )}
          >
            {line1.initial}
          </span>
        )}
        <span>{line1.rest}</span>
      </span>

      {line2 && (
        <>
          <br />
          <span className="relative z-10">
            {line2.prefix && (
              <span className="mr-[0.16em] font-editorial inline-block">
                {line2.prefix}
              </span>
            )}
            {line2.initial && (
              <span
                style={{ marginRight: line2.kerningEm, paddingLeft: "0.04em" }}
                className={cn(
                  "font-script-initial text-[1.46em] text-[#ffe38a] drop-shadow-[0_2px_10px_rgba(255,200,61,0.3)]",
                  initialClassName
                )}
              >
                {line2.initial}
              </span>
            )}
            <span>{line2.rest}</span>
          </span>
        </>
      )}
    </Tag>
  );
};
