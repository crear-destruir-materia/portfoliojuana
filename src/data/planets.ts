export type PlanetKey =
  | "sol"
  | "saturno"
  | "neptuno"
  | "tierra"
  | "venus"
  | "marte"
  | "luna";

export interface PlanetDef {
  src: string;
  label: string;
  /** Diámetro real en km (se usa para la escala relativa) */
  diameterKm: number;
  /** Fracción del ancho de la imagen que ocupa el disco del planeta */
  disc: number;
  /** Cuánto se difumina el borde (en % del radio) */
  feather: number;
  /** Color del halo atmosférico */
  glow: string;
  /** Máscara personalizada (p. ej. Saturno y sus anillos) */
  mask?: string;
}

export const PLANETS: Record<PlanetKey, PlanetDef> = {
  sol: {
    src: "/sol.png",
    label: "Sol",
    diameterKm: 1392700,
    disc: 0.86,
    feather: 32,
    glow: "rgba(255, 196, 61, 0.4)",
  },
  saturno: {
    src: "/saturno.png",
    label: "Saturno",
    diameterKm: 116460,
    disc: 0.68,
    feather: 0,
    glow: "rgba(255, 214, 140, 0.25)",
    mask: "radial-gradient(circle farthest-corner, #000 44%, rgba(0,0,0,0.45) 60%, transparent 72%)",
  },
  neptuno: {
    src: "/neptuno.png",
    label: "Neptuno",
    diameterKm: 49244,
    disc: 0.85,
    feather: 26,
    glow: "rgba(96, 170, 255, 0.35)",
  },
  tierra: {
    src: "/tierra.png",
    label: "Tierra",
    diameterKm: 12742,
    disc: 0.62,
    feather: 22,
    glow: "rgba(90, 165, 255, 0.4)",
  },
  venus: {
    src: "/images_sin_fondo_png_4.png",
    label: "Venus",
    diameterKm: 12104,
    disc: 0.91,
    feather: 26,
    glow: "rgba(255, 190, 90, 0.32)",
  },
  marte: {
    src: "/marte.png",
    label: "Marte",
    diameterKm: 6779,
    disc: 0.93,
    feather: 26,
    glow: "rgba(255, 125, 75, 0.32)",
  },
  luna: {
    src: "/luna.png",
    label: "Luna",
    diameterKm: 3474,
    disc: 0.67,
    feather: 22,
    glow: "rgba(225, 238, 255, 0.32)",
  },
};

const EARTH_KM = PLANETS.tierra.diameterKm;

export interface PlanetScale {
  /** Diámetro en px que tendría la Tierra en esta escala */
  earthPx: number;
  /** Exponente de compresión (1 = real, <1 = comprime extremos) */
  exp?: number;
  min?: number;
  max?: number;
}

/** Diámetro del disco en px manteniendo la proporción real entre cuerpos celestes */
export function planetSize(key: PlanetKey, scale: PlanetScale): number {
  const { earthPx, exp = 0.75, min = 0, max = Infinity } = scale;
  const raw = earthPx * Math.pow(PLANETS[key].diameterKm / EARTH_KM, exp);
  return Math.round(Math.min(max, Math.max(min, raw)));
}

export function planetKeyFromSrc(src: string): PlanetKey {
  const found = (Object.keys(PLANETS) as PlanetKey[]).find(
    (k) => PLANETS[k].src === src
  );
  return found ?? "luna";
}

/** Escalas predefinidas para cada contexto del sitio */
export const SCALES = {
  ambient: { earthPx: 40, exp: 0.68 },
  hero: { earthPx: 14, exp: 0.68 },
  card: { earthPx: 44, exp: 0.48, min: 22, max: 105 },
  project: { earthPx: 42, exp: 0.48, min: 22, max: 84 },
  modal: { earthPx: 52, exp: 0.48, min: 26, max: 105 },
  node: { earthPx: 14, exp: 0.48, min: 8, max: 28 },
} satisfies Record<string, PlanetScale>;
