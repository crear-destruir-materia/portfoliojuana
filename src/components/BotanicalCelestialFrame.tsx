import React from "react";

/**
 * Marco Botánico-Celeste inspirado en la portada oficial de Juana Varela:
 * Corona simétrica con estrella dorada durmiente en la cima,
 * flores azules de cinco pétalos, cálices celestes tipo tulipán/loto,
 * capullos y flores doradas laterales, tallos verdes con rizo botánico,
 * firma "Juana Varela" y estrella celeste facetada inferior.
 */
export const BotanicalCelestialFrame: React.FC = () => {
  return (
    <div className="planet-float relative flex w-[min(86vw,380px)] aspect-square sm:h-[490px] sm:w-[490px] lg:h-[520px] lg:w-[520px] items-center justify-center select-none">
      {/* Resplandor atmosférico suave detrás del marco */}
      <div className="pointer-events-none absolute inset-10 rounded-full bg-gradient-to-tr from-[#1a4a96]/65 via-[#2c6cd0]/30 to-[#ffc83d]/20 blur-3xl" />

      {/* SVG DE LA CORONA BOTÁNICA Y ESTELAR (SIMÉTRICA IZQUIERDA / DERECHA) */}
      <svg
        viewBox="0 0 600 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-0 z-30 h-full w-full overflow-visible drop-shadow-[0_8px_22px_rgba(4,12,29,0.75)]"
        aria-hidden="true"
      >
        <defs>
          {/* Degradado estrella dorada superior */}
          <radialGradient id="jvGoldStar" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff4c4" />
            <stop offset="55%" stopColor="#f5d372" />
            <stop offset="100%" stopColor="#cfa032" />
          </radialGradient>

          {/* Degradado pétalos azules superiores */}
          <radialGradient id="jvBlueFlower" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#4a90e2" />
            <stop offset="45%" stopColor="#7fc0ff" />
            <stop offset="85%" stopColor="#a8d5ff" />
            <stop offset="100%" stopColor="#63a8f0" />
          </radialGradient>

          {/* Degradado cáliz / tulipán celeste lateral */}
          <linearGradient id="jvBlueTulip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cce7ff" />
            <stop offset="45%" stopColor="#89c5ff" />
            <stop offset="100%" stopColor="#468ee0" />
          </linearGradient>

          {/* Degradado flores doradas laterales */}
          <radialGradient id="jvGoldPetal" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#d89e2b" />
            <stop offset="45%" stopColor="#f3cf68" />
            <stop offset="85%" stopColor="#fae39c" />
            <stop offset="100%" stopColor="#d49b2a" />
          </radialGradient>

          {/* Degradado tallos y hojas verdes */}
          <linearGradient id="jvGreenStem" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a8cc3c" />
            <stop offset="55%" stopColor="#7ca623" />
            <stop offset="100%" stopColor="#4b6e11" />
          </linearGradient>

          {/* Degradado estrella celeste facetada inferior */}
          <linearGradient id="jvBottomStar" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4ebff" />
            <stop offset="50%" stopColor="#6eb2f5" />
            <stop offset="100%" stopColor="#1f5396" />
          </linearGradient>

          {/* Halo de polvo estelar */}
          <filter id="jvStardustGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* MITAD IZQUIERDA DE LA GUIRNALDA BOTÁNICA (SE REFLEJA A LA DERECHA) */}
          <g id="jvBotanicalHalf">
            {/* 1. RAMA VERDE SUPERIOR ENTRELAZADA */}
            {/* Tallo principal que sube desde la flor azul hacia la estrella */}
            <path
              d="M 140 120 C 175 118, 212 104, 245 78 C 228 96, 192 110, 146 114 Z"
              fill="url(#jvGreenStem)"
              stroke="#1d3310"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Zarcillo superior con rizo hacia arriba */}
            <path
              d="M 164 114 C 154 90, 146 65, 160 50 C 169 42, 178 52, 170 60 C 165 64, 159 57, 163 53"
              fill="none"
              stroke="url(#jvGreenStem)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 164 114 C 154 90, 146 65, 160 50 C 169 42, 178 52, 170 60"
              fill="none"
              stroke="#1d3310"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Segunda ramita cruzada hacia la derecha */}
            <path
              d="M 155 104 C 182 112, 205 100, 224 72 C 208 94, 186 105, 154 99 Z"
              fill="url(#jvGreenStem)"
              stroke="#1d3310"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* 2. FLOR AZUL DE 5 PÉTALOS SUPERIOR IZQUIERDA */}
            <g transform="translate(122, 138)">
              {/* 5 Pétalos con borde ondulado y nervaduras */}
              {[0, 72, 144, 216, 288].map((angle) => (
                <g key={angle} transform={`rotate(${angle})`}>
                  <path
                    d="M 0 0 C -14 -14, -22 -36, -8 -44 C -2 -47, 2 -43, 5 -45 C 14 -48, 22 -34, 12 -14 Z"
                    fill="url(#jvBlueFlower)"
                    stroke="#173a6a"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  {/* Nervaduras finas del pétalo */}
                  <path
                    d="M 0 -6 Q -4 -22 -4 -35 M 0 -6 Q 3 -24 5 -36 M 0 -6 Q 8 -20 9 -28"
                    stroke="#1d4b8a"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                     opacity="0.75"
                  />
                </g>
              ))}
              {/* Centro oscuro y estambres de la flor azul */}
              <circle r="7" fill="#173a6a" opacity="0.6" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <g key={a} transform={`rotate(${a})`}>
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="-11"
                    stroke="#102a52"
                    strokeWidth="1.2"
                  />
                  <circle cx="0" cy="-12" r="1.8" fill="#ffd95a" stroke="#102a52" strokeWidth="0.7" />
                </g>
              ))}
            </g>

            {/* 3. CAPULLO DORADO DE 3 PÉTALOS EXTERIOR (BAJO LA FLOR AZUL) */}
            <g transform="translate(76, 198) rotate(-32)">
              {/* Pétalo izquierdo */}
              <path
                d="M 0 16 C -16 6, -24 -14, -12 -22 C -4 -26, 0 -10, 0 16 Z"
                fill="url(#jvGoldPetal)"
                stroke="#4a3510"
                strokeWidth="1.4"
              />
              {/* Pétalo derecho */}
              <path
                d="M 0 16 C 16 6, 24 -14, 12 -22 C 4 -26, 0 -10, 0 16 Z"
                fill="url(#jvGoldPetal)"
                stroke="#4a3510"
                strokeWidth="1.4"
              />
              {/* Pétalo central */}
              <path
                d="M 0 18 C -10 -2, -10 -26, 0 -30 C 10 -26, 10 -2, 0 18 Z"
                fill="url(#jvGoldPetal)"
                stroke="#4a3510"
                strokeWidth="1.4"
              />
              {/* Estambres que sobresalen del capullo */}
              <path
                d="M -4 -20 L -9 -32 M 0 -22 L 0 -35 M 4 -20 L 9 -32"
                stroke="#4a3510"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="-9" cy="-33" r="2.2" fill="#ffd95a" stroke="#4a3510" strokeWidth="1" />
              <circle cx="0" cy="-36" r="2.2" fill="#ffd95a" stroke="#4a3510" strokeWidth="1" />
              <circle cx="9" cy="-33" r="2.2" fill="#ffd95a" stroke="#4a3510" strokeWidth="1" />
            </g>

            {/* 4. TALLO INFERIOR VERDE CON RIZO Y HOJAS LARGAS */}
            {/* Tallo principal desde la base del cáliz celeste hasta el centro inferior */}
            <path
              d="M 94 316 C 96 368, 114 415, 168 442 C 185 450, 202 452, 214 452 C 200 457, 178 456, 158 446 C 106 420, 88 370, 86 316 Z"
              fill="url(#jvGreenStem)"
              stroke="#1d3310"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Rizo / bucle botánico característico en el tallo */}
            <path
              d="M 118 408 C 138 398, 142 418, 126 424 C 114 428, 110 412, 128 395"
              fill="none"
              stroke="url(#jvGreenStem)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M 118 408 C 138 398, 142 418, 126 424 C 114 428, 110 412, 128 395"
              fill="none"
              stroke="#1d3310"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            {/* Hoja verde superior interna que sube desde el nudo */}
            <path
              d="M 176 446 C 162 418, 144 392, 118 374 C 134 398, 146 422, 164 446 Z"
              fill="url(#jvGreenStem)"
              stroke="#1d3310"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Hoja verde inferior larga que barre hacia abajo e izquierda */}
            <path
              d="M 182 452 C 152 468, 126 498, 92 522 C 132 514, 158 486, 192 454 Z"
              fill="url(#jvGreenStem)"
              stroke="#1d3310"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Nervadura central de la hoja inferior */}
            <path
              d="M 184 453 C 154 476, 130 500, 102 517"
              fill="none"
              stroke="#1d3310"
              strokeWidth="1.1"
              opacity="0.75"
            />

            {/* 5. CÁLIZ / TULIPÁN CELESTE DE 5 PÉTALOS EN EL COSTADO MEDIO */}
            <g transform="translate(90, 272) rotate(-6)">
              {/* Pétalos traseros */}
              <path
                d="M -26 12 C -34 -14, -28 -38, -18 -50 C -8 -36, -6 -14, -10 16 Z"
                fill="url(#jvBlueTulip)"
                stroke="#173a6a"
                strokeWidth="1.5"
              />
              <path
                d="M 26 12 C 34 -14, 28 -38, 18 -50 C 8 -36, 6 -14, 10 16 Z"
                fill="url(#jvBlueTulip)"
                stroke="#173a6a"
                strokeWidth="1.5"
              />
              {/* Pétalo central */}
              <path
                d="M -16 26 C -22 -8, -14 -40, 0 -56 C 14 -40, 22 -8, 16 26 Z"
                fill="url(#jvBlueTulip)"
                stroke="#173a6a"
                strokeWidth="1.6"
              />
              {/* Pétalo frontal izquierdo */}
              <path
                d="M 0 44 C -28 40, -44 12, -40 -26 C -24 -10, -10 12, 0 44 Z"
                fill="url(#jvBlueTulip)"
                stroke="#173a6a"
                strokeWidth="1.6"
              />
              {/* Pétalo frontal derecho */}
              <path
                d="M 0 44 C 28 40, 44 12, 40 -26 C 24 -10, 10 12, 0 44 Z"
                fill="url(#jvBlueTulip)"
                stroke="#173a6a"
                strokeWidth="1.6"
              />
              {/* Líneas de textura de los pétalos */}
              <path
                d="M 0 40 L 0 -46 M -8 34 Q -14 0 -16 -32 M 8 34 Q 14 0 16 -32 M -18 28 Q -28 8 -33 -14 M 18 28 Q 28 8 33 -14"
                stroke="#1d4b8a"
                strokeWidth="0.9"
                opacity="0.65"
                fill="none"
              />
              {/* Receptáculo verde en la base del cáliz */}
              <path
                d="M -8 42 Q 0 50 8 42 L 4 52 L -4 52 Z"
                fill="url(#jvGreenStem)"
                stroke="#1d3310"
                strokeWidth="1.3"
              />
            </g>

            {/* 6. FLOR DORADA DE 4 PÉTALOS INFERIOR EXTERIOR */}
            <g transform="translate(86, 428) rotate(-25)">
              {/* 4 pétalos en abanico */}
              {[-48, -16, 18, 52].map((ang, idx) => (
                <g key={idx} transform={`rotate(${ang})`}>
                  <path
                    d="M 0 0 C -12 -14, -16 -38, 0 -44 C 16 -38, 12 -14, 0 0 Z"
                    fill="url(#jvGoldPetal)"
                    stroke="#4a3510"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M 0 -6 L 0 -34 M -4 -10 L -6 -28 M 4 -10 L 6 -28"
                    stroke="#5c4214"
                    strokeWidth="0.8"
                    opacity="0.65"
                  />
                </g>
              ))}
              {/* Centro punteado de la flor dorada */}
              <ellipse cx="0" cy="2" rx="9" ry="6" fill="#d89b28" stroke="#4a3510" strokeWidth="1.3" />
              <circle cx="-3" cy="1" r="1.2" fill="#4a3510" />
              <circle cx="3" cy="1" r="1.2" fill="#4a3510" />
              <circle cx="0" cy="4" r="1.2" fill="#4a3510" />
            </g>
          </g>
        </defs>

        {/* DESTELLOS DE POLVO ESTELAR ALREDEDOR DE LA CORONA */}
        <g opacity="0.7">
          {[
            [245, 42, 2.2],
            [355, 42, 2.2],
            [92, 108, 1.8],
            [508, 108, 1.8],
            [52, 240, 2.0],
            [548, 240, 2.0],
            [60, 390, 1.8],
            [540, 390, 1.8],
            [270, 505, 1.6],
            [330, 505, 1.6],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="#fff4c4"
              filter="url(#jvStardustGlow)"
            />
          ))}
        </g>

        {/* RENDERIZADO SIMÉTRICO: MITAD IZQUIERDA Y MITAD DERECHA ESPEJADA */}
        <use href="#jvBotanicalHalf" />
        <use href="#jvBotanicalHalf" transform="translate(600, 0) scale(-1, 1)" />

        {/* ESTRELLA DORADA SUPERIOR CON ROSTRO SERENO (CORONA CENTRAL) */}
        <g transform="translate(300, 68)" filter="url(#jvStardustGlow)">
          {/* Estrella de 5 puntas ligeramente orgánica y redondeada */}
          <path
            d="M 0 -54 C 4 -38, 10 -24, 14 -16 C 24 -16, 38 -17, 50 -16 C 40 -6, 30 3, 22 10 C 26 22, 31 36, 34 48 C 22 40, 10 31, 0 24 C -10 31, -22 40, -34 48 C -31 36, -26 22, -22 10 C -30 3, -40 -6, -50 -16 C -38 -17, -24 -16, -14 -16 C -10 -24, -4 -38, 0 -54 Z"
            fill="url(#jvGoldStar)"
            stroke="#594114"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Mejillas cálidas */}
          <ellipse cx="-14" cy="4" rx="5" ry="3" fill="#e8924a" opacity="0.45" />
          <ellipse cx="14" cy="4" rx="5" ry="3" fill="#e8924a" opacity="0.45" />
          {/* Cejas suaves */}
          <path
            d="M -15 -9 Q -10 -12 -5 -9 M 5 -9 Q 10 -12 15 -9"
            stroke="#4a3410"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          {/* Ojos cerrados serenos */}
          <path
            d="M -15 -3 Q -10 1 -5 -3 M 5 -3 Q 10 1 15 -3"
            stroke="#4a3410"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Pequeña nariz y gesto tranquilo */}
          <path
            d="M 0 -4 L -1.5 2 L 1 2 M -3 7 Q 0 6 3 7"
            stroke="#4a3410"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* FIRMA CENTRAL ENTRE LOS TALLOS Y ESTRELLA FACETADA INFERIOR */}
        <text
          x="300"
          y="460"
          textAnchor="middle"
          className="font-bodoni"
          fill="#ffe9a3"
          fontSize="26"
          fontWeight="600"
          letterSpacing="0.03em"
          style={{
            filter: "drop-shadow(0 2px 8px rgba(4, 12, 29, 0.95))",
          }}
        >
          Juana Varela
        </text>

        {/* Estrella celeste de 8 puntas facetada debajo del nombre */}
        <g transform="translate(300, 502)" filter="url(#jvStardustGlow)">
          {/* Puntas diagonales cortas */}
          <path
            d="M 0 -12 L 3 -3 L 12 0 L 3 3 L 0 12 L -3 3 L -12 0 L -3 -3 Z"
            fill="#8fc9ff"
            stroke="#102a52"
            strokeWidth="1.1"
          />
          {/* Puntas cardinales principales */}
          <path
            d="M 0 -24 L 4.5 -4.5 L 22 0 L 4.5 4.5 L 0 24 L -4.5 4.5 L -22 0 L -4.5 -4.5 Z"
            fill="url(#jvBottomStar)"
            stroke="#102a52"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          {/* Rombo interior brillante */}
          <polygon
            points="0,-6 4,0 0,6 -4,0"
            fill="#e6f4ff"
            stroke="#173a6a"
            strokeWidth="0.9"
          />
        </g>
      </svg>

      {/* RETRATO CENTRAL DE JUANA VARELA ENMARCADO DENTRO DE LA CORONA BOTÁNICA */}
      <div className="relative z-20 flex h-[54%] w-[54%] -mt-[3%] items-center justify-center">
        {/* Marco circular doble en oro y azul cobalto para la foto de Juana */}
        <div className="relative h-full w-full rounded-full bg-gradient-to-br from-[#ffe38a] via-[#ffc83d] to-[#5aa5f8] p-2 sm:p-2.5 shadow-[0_0_45px_rgba(20,55,130,0.85),0_0_28px_rgba(255,200,61,0.3)]">
          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-[#ffc83d]/65 bg-[#07152d]">
            <img
              src="/juana.jpg"
              alt="Retrato de Juana Varela, diseñadora gráfica e ilustradora"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover object-center filter contrast-[1.05] brightness-105 transition-transform duration-700 hover:scale-105"
            />
            {/* Viñeta interna sutil */}
            <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_24px_rgba(4,12,29,0.5)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

