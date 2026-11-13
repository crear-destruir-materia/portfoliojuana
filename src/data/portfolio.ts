export type SectorCategory = "Arte Digital" | "Diseño Gráfico" | "Ilustración";

export interface CreativeToolItem {
  id: string;
  name: string;
  shortCode: string;
  sealTitle: string;
  orbitalOrder: string;
  masteryTime: string;
  specialty: string;
  description: string;
  pillars: string[];
  planetImage: string;
  planetLabel: string;
  sealGradient: string;
  accentGold: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  badgeType: string;
  category: SectorCategory;
  year: string;
  client: string;
  planetName: string;
  planetImage: string;
  coverImage: string;
  spreadImage?: string;
  coordinates: string;
  description: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  tools: string[];
  palette: string[];
  accentColor: string;
  gradient: string;
  behanceUrl: string;
  featured?: boolean;
  topRank?: number;
}

export interface ExperienceItem {
  period: string;
  role: string;
  studio: string;
  missionCode: string;
  planetImage: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  institution: string;
  period: string;
  title: string;
  details?: string[];
}

export const portfolioData = {
  profile: {
    name: "Juana Varela",
    greetingTitle: "¡Hola!",
    greetingSubtitle: "Soy Juana Varela",
    role: "Arte Digital · Diseño Gráfico · Ilustración",
    sectors: ["Arte Digital", "Diseño Gráfico", "Ilustración"] as SectorCategory[],
    tagline:
      "Soy diseñadora gráfica con enfoque en diseño editorial, branding, social media e ilustración. Tengo experiencia en el desarrollo de libros, revistas, informes, folletos, identidad visual y piezas digitales, tanto en entornos corporativos como freelance.",
    bio: "Disfruto transformar información en piezas visuales claras y estéticamente cuidadas. Fuera del diseño, dibujar, pintar, hacer manualidades y practicar yoga nutren mi creatividad y mi forma de ver el mundo.",
    edition: "Portafolio Diseño Gráfico 2026",
    callsign: "BOGOTÁ, COLOMBIA // @JUANA.ILUSTRA",
    location: "Bogotá, Colombia",
    phone: "(57+) 3213447790",
    instagram: "@juana.ilustra",
    instagramUrl: "https://www.instagram.com/juana.ilustra/",
    behanceHandle: "behance.net/juanavarela",
    availability: "Disponible para proyectos freelance & corporativos",
    behanceUrl:
      "https://www.behance.net/gallery/246515659/Portafolio-Diseno-Grafico-2026-Juana-Varela",
    email: "juana.ilustra@gmail.com",
    stats: [
      { label: "Sectores Creativos", value: "03", code: "SEC-03" },
      { label: "Tiempo de Dominio", value: "∞", code: "DOM-INF" },
      { label: "Experiencia Desde", value: "2020", code: "EXP-20" },
      { label: "Mención Honorífica", value: "#1", code: "HON-UPC" },
    ],
    education: [
      {
        institution: "Universidad Piloto de Colombia",
        period: "2020 - 2024",
        title: "Pregrado en Diseño Gráfico",
        details: [
          "Mención honorífica por el mayor promedio acumulado durante el transcurso de la carrera.",
        ],
      },
      {
        institution: "Universidad Nacional de Colombia",
        period: "2024",
        title: "Diplomado en Diseño de Animación Digital",
      },
      {
        institution: "Domestika · Formación Complementaria",
        period: "2026",
        title: "Especialización Editorial, Datos e Ilustración",
        details: [
          "Diseño editorial: Concepto, edición y materiales",
          "Visualización de datos para proyectos editoriales",
          "Laboratorio de fanzines y autopublicación",
          "Ilustración informativa: despierta la curiosidad",
        ],
      },
      {
        institution: "SENA",
        period: "2018 - 2020",
        title: "Curso en Manejo de Adobe Illustrator (2020) · Técnico en Asistencia Administrativa (2018-2019)",
      },
    ] as EducationItem[],
    recognitions: [
      {
        title: "Mención Honorífica Académica",
        description:
          "Mayor promedio acumulado durante el transcurso de la carrera de Diseño Gráfico en la Universidad Piloto de Colombia.",
      },
      {
        title: "Publicaciones en Revista Mirada Proyectual (Ed. 24 y 25)",
        description:
          "Publicación de dos proyectos de ilustración y diseño de información en la revista del Sello Editorial UniPiloto Mirada Proyectual, ediciones 24 y 25.",
      },
    ],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "B2 - Intermedio alto" },
      { name: "Francés", level: "B1 - Intermedio" },
    ],
    skills: {
      technical: [
        "Diagramación editorial",
        "Artes finales / Pre-prensa",
        "Ilustración digital",
        "Branding",
        "Social Media",
      ],
      soft: [
        "Adaptabilidad",
        "Resolución de problemas",
        "Recursividad",
        "Trabajo en equipo",
        "Organización",
      ],
      softwareEcosystem: {
        adobe: [
          "Adobe Illustrator",
          "Adobe Photoshop",
          "Adobe InDesign",
          "Adobe After Effects",
          "Adobe Premiere Pro",
          "Adobe Lightroom",
          "Adobe Firefly",
        ],
        office: [
          "Microsoft Word",
          "Microsoft Excel",
          "Microsoft PowerPoint",
          "Microsoft Outlook",
        ],
        others: [
          "Canva, Procreate & CapCut",
          "ChatGPT, Gemini & Claude",
        ],
      },
    },
  },
  creativeTools: [
    {
      id: "illustrator",
      name: "Adobe Illustrator",
      shortCode: "Ai",
      sealTitle: "Sello Vectorial · Orden Áurea",
      orbitalOrder: "ASTROLABIO I // VECTORES & BRANDING",
      masteryTime: "∞",
      specialty: "Ilustración Digital, Identidad Visual, Infografía & Vectores",
      description:
        "Desarrollo de sistemas de identidad visual, logotipos, ilustración científica y botánica, stickers, empaques y conceptualización gráfica.",
      pillars: [
        "Branding & Logotipos",
        "Ilustración Científica",
        "Infografías & Datos",
        "Empaques & Stickers",
      ],
      planetImage: "/saturno.png",
      planetLabel: "Regente: Saturno",
      sealGradient:
        "radial-gradient(circle at 32% 28%, #3279e0 0%, #1d4d9c 52%, #0e2448 100%)",
      accentGold: "#ffd95a",
    },
    {
      id: "photoshop",
      name: "Adobe Photoshop",
      shortCode: "Ps",
      sealTitle: "Sello Alquímico · Luz & Fotomontaje",
      orbitalOrder: "ASTROLABIO II // ARTE DIGITAL",
      masteryTime: "∞",
      specialty: "Arte Digital, Fotomontaje Simbólico, Texturas & Dirección de Arte",
      description:
        "Experimentación compositiva, fotomontaje editorial, tratamiento de texturas naturales, ilustración pictórica y presentación de mockups.",
      pillars: [
        "Fotomontaje Editorial",
        "Ilustración & Texturas",
        "Dirección de Arte",
        "Piezas Social Media",
      ],
      planetImage: "/neptuno.png",
      planetLabel: "Regente: Neptuno",
      sealGradient:
        "radial-gradient(circle at 32% 28%, #2f71d6 0%, #1a4690 55%, #0d2242 100%)",
      accentGold: "#ffcf4a",
    },
    {
      id: "indesign",
      name: "Adobe InDesign",
      shortCode: "Id",
      sealTitle: "Sello Códice · Arquitectura Editorial",
      orbitalOrder: "ASTROLABIO III // DISEÑO EDITORIAL",
      masteryTime: "∞",
      specialty: "Diagramación de Libros, Cartillas Educativas, Guías & Revistas",
      description:
        "Arquitectura de contenidos, sistemas de retículas, maquetación de libros ilustrados, cartillas interactivas en PDF y artes finales / pre-prensa.",
      pillars: [
        "Libros & Cartillas",
        "Sistemas de Retícula",
        "PDFs Interactivos",
        "Artes Finales / Pre-prensa",
      ],
      planetImage: "/luna.png",
      planetLabel: "Regente: Luna",
      sealGradient:
        "radial-gradient(circle at 32% 28%, #3580e8 0%, #1c4a96 55%, #0d2242 100%)",
      accentGold: "#ffe38a",
    },
    {
      id: "after-effects",
      name: "Adobe After Effects",
      shortCode: "Ae",
      sealTitle: "Sello Cinético · Animación Digital",
      orbitalOrder: "ASTROLABIO IV // MOTION DESIGN",
      masteryTime: "∞",
      specialty: "Animación Digital, Reels Dinámicos & Narrativa Audiovisual",
      description:
        "Respaldada por su Diplomado en Diseño de Animación Digital en la Universidad Nacional de Colombia, dando vida y movimiento a sistemas gráficos.",
      pillars: [
        "Animación Digital",
        "Motion para Redes",
        "Narrativa en Vídeo",
        "Identidad en Movimiento",
      ],
      planetImage: "/marte.png",
      planetLabel: "Regente: Marte",
      sealGradient:
        "radial-gradient(circle at 32% 28%, #2c6acb 0%, #183f80 55%, #0b1e3d 100%)",
      accentGold: "#ffc83d",
    },
  ] as CreativeToolItem[],
  /**
   * Los 3 mejores trabajos destacados del portafolio de Behance de Juana Varela,
   * acompañados de 3 obras complementarias reales del mismo portafolio.
   */
  projects: [
    {
      id: "donde-los-signos-florecen",
      title: "Donde los Signos Florecen",
      subtitle: "Dirección de Arte, Fotomontaje & Libro Editorial",
      badgeType: "PROYECTO DOMESTIKA · LIBRO EDITORIAL",
      category: "Arte Digital",
      year: "2026",
      client: "Editorial Juana Varela · Primera Edición",
      planetName: "Venus · Jardín Estelar",
      planetImage: "/images_sin_fondo_png_4.png",
      coverImage: "/projects/signos-cover.jpg",
      spreadImage: "/projects/signos-spreads.jpg",
      coordinates: "OBRA DESTACADA #01 // LIBROS",
      description:
        "Donde florecen los signos es un proyecto editorial que explora la esencia de los signos zodiacales a través de su relación con los cuatro elementos: tierra, agua, aire y fuego. Cada signo se concibe como una fuerza viva que crece, se transforma y encuentra su forma de expresión en la naturaleza.",
      challenge:
        "Traducir conceptos simbólicos y referencias astrológicas de los doce signos en un lenguaje visual poético basado en la observación de la naturaleza, sin caer en clichés literales.",
      solution:
        "Construcción narrativa y arquitectura de capítulos organizada según los cuatro elementos naturales (Tierra, Agua, Aire y Fuego), combinando exploración fotográfica de texturas orgánicas, fotomontaje compositivo y un sistema de retícula editorial refinado.",
      deliverables: [
        "Investigación, escritura y construcción narrativa del libro",
        "Sistema de retícula, arquitectura de contenidos y diseño de portada",
        "Fotomontaje simbólico y dirección de arte por elemento (Tierra, Agua, Aire, Fuego)",
        "Diagramación integral de capítulos (Capricornio, Leo, Acuario, Géminis, etc.)",
      ],
      tools: ["Adobe InDesign", "Adobe Illustrator", "Adobe Photoshop"],
      palette: ["#6D7B47", "#3D4B28", "#D9C382", "#5DA3D9"],
      accentColor: "from-[#ffe38a] via-[#9ab366] to-[#13315f]",
      gradient:
        "radial-gradient(circle at 30% 25%, rgba(124, 150, 72, 0.55), rgba(22, 56, 110, 0.8) 60%, rgba(11, 30, 61, 0.96))",
      behanceUrl:
        "https://www.behance.net/gallery/246515659/Portafolio-Diseno-Grafico-2026-Juana-Varela",
      featured: true,
      topRank: 1,
    },
    {
      id: "mango-pets-boutique",
      title: "Mango Pets Boutique",
      subtitle: "Identidad Visual, Branding, Empaques & Social Media",
      badgeType: "PROYECTO FREELANCE · BRANDING",
      category: "Diseño Gráfico",
      year: "2025 — 2026",
      client: "Mango Pets Boutique",
      planetName: "Saturno · Sistema de Marca",
      planetImage: "/saturno.png",
      coverImage: "/projects/mango-branding.jpg",
      spreadImage: "/projects/mango-header.jpg",
      coordinates: "OBRA DESTACADA #02 // BRANDING",
      description:
        "Diseño de identidad visual para una marca de productos para mascotas, desarrollando el concepto gráfico (Mascotas + Amor + Creatividad), logotipo y sistema visual aplicado a empaques, tarjetas, stickers ilustrados, tote bags y piezas para redes sociales.",
      challenge:
        "Construir un universo gráfico cálido, alegre y versátil capaz de adaptarse desde cajas de empaque y textiles hasta contenido educativo y promocional en Instagram.",
      solution:
        "Creación de un imagotipo que sintetiza huella, corazón e idea creativa, acompañado de ilustraciones personalizadas de mascotas, patrones para packaging y plantillas dinámicas para redes sociales.",
      deliverables: [
        "Concepto gráfico, logotipo e isotipo (Mascotas + Amor + Creatividad)",
        "Diseño de empaques, cajas ilustradas y tarjetas de agradecimiento",
        "Stickers troquelados ilustrados y merchandising (Tote Bag Cat Lover)",
        "Sistema de parrilla y carruseles educativos para Social Media",
      ],
      tools: ["Adobe Illustrator", "Adobe Photoshop"],
      palette: ["#0E8A99", "#28B5C4", "#EAA324", "#F5D078"],
      accentColor: "from-[#ffd95a] via-[#eaa324] to-[#0e8a99]",
      gradient:
        "radial-gradient(circle at 70% 25%, rgba(234, 163, 36, 0.45), rgba(14, 138, 153, 0.65) 55%, rgba(11, 30, 61, 0.95))",
      behanceUrl:
        "https://www.behance.net/gallery/246515659/Portafolio-Diseno-Grafico-2026-Juana-Varela",
      featured: true,
      topRank: 2,
    },
    {
      id: "la-quimica-en-la-ingenieria-civil",
      title: "La Química en la Ingeniería Civil",
      subtitle: "Diseño, Ilustración & Diagramación de Cartilla Académica",
      badgeType: "CARTILLA EDUCATIVA · SELLO EDITORIAL UNIPILOTO",
      category: "Ilustración",
      year: "2024 — 2026",
      client: "Sello Editorial UniPiloto · PhD. Rafael Alberto Fonseca Correa",
      planetName: "Neptuno · Códice Científico",
      planetImage: "/neptuno.png",
      coverImage: "/projects/quimica-cover.jpg",
      spreadImage: "/projects/quimica-spreads.jpg",
      coordinates: "OBRA DESTACADA #03 // EDITORIAL & ILUSTRACIÓN",
      description:
        "Diseño, ilustración y diagramación de portada y páginas internas de una cartilla académica para el Sello Editorial UniPiloto, con conceptualización visual acorde al tema para una lectura clara y coherente.",
      challenge:
        "Unir dos disciplinas científicas —la ingeniería civil estructural y la química molecular— en un sistema editorial e ilustrado que facilite el aprendizaje técnico.",
      solution:
        "Ilustración conceptual de portada donde una grúa torre se fusiona con un matraz Erlenmeyer sosteniendo enlaces moleculares dorados, acompañada de páginas internas con tablas, fórmulas y esquemas ilustrados en tonos turquesa.",
      deliverables: [
        "Ilustración conceptual y diseño de cubierta académica",
        "Dirección de arte y conceptualización visual científica",
        "Diagramación de páginas internas, índice, tablas y fórmulas",
        "Ilustraciones técnicas y esquemas de laboratorio para lectura clara",
      ],
      tools: ["Adobe InDesign", "Adobe Illustrator", "Adobe Photoshop"],
      palette: ["#2796A8", "#48B5C6", "#EAA832", "#13315F"],
      accentColor: "from-[#ffd95a] via-[#2796a8] to-[#132d63]",
      gradient:
        "radial-gradient(circle at 30% 25%, rgba(39, 150, 168, 0.58), rgba(22, 56, 120, 0.78) 55%, rgba(11, 30, 61, 0.96))",
      behanceUrl:
        "https://www.behance.net/gallery/246515659/Portafolio-Diseno-Grafico-2026-Juana-Varela",
      featured: true,
      topRank: 3,
    },
    {
      id: "rana-sabanera-infografia",
      title: "Rana Sabanera",
      subtitle: "Infografía Científica, Ilustración & Diagramación Editorial",
      badgeType: "PROYECTO ACADÉMICO · INFOGRAFÍA",
      category: "Ilustración",
      year: "2024",
      client: "Proyecto Académico · Ilustración Científica",
      planetName: "Tierra · Biodiversidad Andina",
      planetImage: "/tierra.png",
      coverImage: "/projects/rana-cover.jpg",
      spreadImage: "/projects/rana-sabanera.jpg",
      coordinates: "INFOGRAFÍA // DENDROPSOPHUS MOLITOR",
      description:
        "Infografía centrada en ilustración científica y diagramación editorial, usando la rana sabanera (Dendropsophus molitor) como contexto para convertir información técnica en una pieza visual clara y didáctica.",
      challenge:
        "Sintetizar taxonomía, anatomía, ciclo de metamorfosis, hábitos nocturnos, cadena trófica y amenazas de una especie endémica de los Andes colombianos en una sola lámina didáctica.",
      solution:
        "Ilustración naturalista detallada de la rana sabanera y su ecosistema, organizada mediante una retícula informativa con llamadas anatómicas, escala comparativa y stickers troquelados.",
      deliverables: [
        "Ilustración científica de Dendropsophus molitor y su metamorfosis",
        "Diagramación de infografía educativa de gran formato",
        "Visualización de clasificación técnica, hábitat y cadena alimenticia",
        "Stickers ilustrados de fauna y flora andina",
      ],
      tools: ["Adobe Illustrator", "Adobe Photoshop"],
      palette: ["#5B8C32", "#88B646", "#C83E2B", "#E9EFE0"],
      accentColor: "from-[#88b646] via-[#5b8c32] to-[#13315f]",
      gradient:
        "radial-gradient(circle at 65% 30%, rgba(91, 140, 50, 0.5), rgba(20, 52, 110, 0.78) 55%, rgba(11, 30, 61, 0.95))",
      behanceUrl:
        "https://www.behance.net/gallery/246515659/Portafolio-Diseno-Grafico-2026-Juana-Varela",
    },
    {
      id: "guia-osc-migracion-oim",
      title: "Guía OSC en Migración y Refugio de OIM",
      subtitle: "Diagramación de Cartilla Interactiva & Conceptualización Visual",
      badgeType: "CARTILLA EDUCATIVA · OIM",
      category: "Diseño Gráfico",
      year: "2025",
      client: "OIM · Organizaciones de la Sociedad Civil",
      planetName: "Luna · Guía Humanitaria",
      planetImage: "/luna.png",
      coverImage: "/projects/guia-oim-cover.jpg",
      spreadImage: "/projects/guia-oim-spreads.jpg",
      coordinates: "EDITORIAL // CARTILLA INTERACTIVA PDF",
      description:
        "Diagramación de portada y páginas internas de una cartilla para la OIM sobre preparación y respuesta a emergencias en contexto de migración y refugio en América Latina y el Caribe, con interactividad en PDF para facilitar la navegación.",
      challenge:
        "Transformar un documento extenso de lineamientos humanitarios en una publicación accesible, cálida y fácilmente navegable en entornos digitales.",
      solution:
        "Ilustración de cubierta empática, jerarquía cromática por módulos, infografías de datos y marcadores interactivos en PDF para lectura fluida.",
      deliverables: [
        "Ilustración y diseño de portada institucional",
        "Diagramación editorial de páginas internas y tablas de datos",
        "Interactividad en PDF para navegación por capítulos",
        "Sistema iconográfico y visualización de información",
      ],
      tools: ["Adobe InDesign", "Adobe Illustrator", "Adobe Photoshop"],
      palette: ["#1F4F99", "#F2A922", "#E0533C", "#F8F5EC"],
      accentColor: "from-[#f2a922] via-[#1f4f99] to-[#0f2650]",
      gradient:
        "radial-gradient(circle at 40% 40%, rgba(242, 169, 34, 0.42), rgba(18, 46, 98, 0.8) 55%, rgba(11, 30, 61, 0.95))",
      behanceUrl:
        "https://www.behance.net/gallery/246515659/Portafolio-Diseno-Grafico-2026-Juana-Varela",
    },
    {
      id: "alua-kits-creativos",
      title: "Alua Kits",
      subtitle: "Identidad Visual, Packaging, Piezas Impresas & Reels",
      badgeType: "PROYECTO FREELANCE · BRANDING & SOCIAL MEDIA",
      category: "Arte Digital",
      year: "2025",
      client: "Alua · Kits Creativos en Casa",
      planetName: "Marte · Chispa Creativa",
      planetImage: "/marte.png",
      coverImage: "/projects/alua-kits.jpg",
      coordinates: "BRANDING // KITS CREATIVOS EN CASA",
      description:
        "Diseño de identidad visual para una marca de kits creativos en casa, definiendo concepto gráfico, logotipo, personajes ilustrados ('Soy Hartista') y sistema visual aplicado a empaques, guías impresas y redes sociales.",
      challenge:
        "Transmitir la alegría de pintar y crear manualidades en casa mediante un sistema gráfico lúdico que conecte con jóvenes y adultos en redes sociales.",
      solution:
        "Logotipo con estrella integrada, personaje ilustrado estrella, cajas de experiencia ilustradas, instructivos paso a paso y contenido audiovisual/carruseles para Instagram.",
      deliverables: [
        "Concepto gráfico, logotipo y paleta cromática vibrante",
        "Diseño de caja de empaque e instructivo 'Crea tu propio Tote Bag'",
        "Personaje ilustrado y stickers ('Buenos días estrellitas', 'Soy Hartista')",
        "Piezas para Social Media y contenido en vídeo para eventos en Bogotá",
      ],
      tools: ["Adobe Illustrator", "Adobe Photoshop", "CapCut"],
      palette: ["#158199", "#F48FB1", "#F7C244", "#8E6CC9"],
      accentColor: "from-[#f7c244] via-[#f48fb1] to-[#158199]",
      gradient:
        "radial-gradient(circle at 50% 25%, rgba(244, 143, 177, 0.4), rgba(21, 129, 153, 0.7) 55%, rgba(11, 30, 61, 0.95))",
      behanceUrl:
        "https://www.behance.net/gallery/246515659/Portafolio-Diseno-Grafico-2026-Juana-Varela",
    },
  ] as ProjectItem[],
  experience: [
    {
      period: "Julio 2026 — Actualidad",
      role: "Diseñadora Gráfica Multilínea",
      studio: "IMOCOM · Bogotá, Colombia",
      missionCode: "EXP // 01 · ACTUAL",
      planetImage: "/saturno.png",
      description:
        "Desempeño integral como diseñadora gráfica multilínea liderando comunicación visual multicanal, campañas publicitarias, contenido digital y producción audiovisual asistida por inteligencia artificial.",
      highlights: [
        "Diseño publicitario, diseño POP para punto de venta y material de marca.",
        "Planeación de contenido, copywriting estratégico y gestión visual para Social Media.",
        "Producción audiovisual y creación de contenidos innovadores con herramientas de inteligencia artificial.",
      ],
    },
    {
      period: "Marzo 2026 — Abril 2026",
      role: "Diseñadora Editorial | Freelance",
      studio: "SANCHO BBDO",
      missionCode: "EXP // 02 · AGENCIA",
      planetImage: "/sol.png",
      description:
        "Desarrollo y diagramación de piezas editoriales de alto impacto visual en modalidad freelance para una de las agencias creativas líderes del país.",
      highlights: [
        "Maquetación editorial y dirección gráfica con rigor tipográfico.",
        "Entrega de artes finales y piezas listas para producción e imprenta.",
      ],
    },
    {
      period: "Febrero 2025 — Actualidad",
      role: "Diseñadora Gráfica | Freelance",
      studio: "DOINMEDIA",
      missionCode: "EXP // 03 · FREELANCE",
      planetImage: "/saturno.png",
      description:
        "Diseño continuo de piezas gráficas, comunicación visual, contenido digital para redes sociales y material corporativo.",
      highlights: [
        "Evolución desde pasantía (Agosto 2024 - Febrero 2025) hasta rol actual como Diseñadora Gráfica Freelance.",
        "Creación de sistemas visuales coherentes y adaptables a múltiples formatos.",
      ],
    },
    {
      period: "Marzo 2025 — Noviembre 2025",
      role: "Creativa Gráfica Editorial",
      studio: "GOOD",
      missionCode: "EXP // 04 · EDITORIAL",
      planetImage: "/neptuno.png",
      description:
        "Conceptualización, dirección de arte y diseño editorial para publicaciones, informes, cartillas e identidad visual.",
      highlights: [
        "Transformación de información compleja en piezas visuales claras y estéticamente cuidadas.",
        "Integración de ilustración digital y diagramación avanzada en InDesign e Illustrator.",
      ],
    },
    {
      period: "Agosto 2024 — Febrero 2025",
      role: "Diseñadora Junior | Pasantía",
      studio: "DOINMEDIA",
      missionCode: "EXP // 05 · JUNIOR",
      planetImage: "/tierra.png",
      description:
        "Apoyo integral en diseño gráfico, piezas para social media, branding e ilustración digital.",
      highlights: [
        "Producción ágil de activos gráficos y consolidación de flujos de trabajo en equipo.",
      ],
    },
    {
      period: "Agosto 2023 — Febrero 2024",
      role: "Diseñadora Junior Sello Editorial UniPiloto | Práctica Profesional",
      studio: "UNIVERSIDAD PILOTO DE COLOMBIA",
      missionCode: "EXP // 06 · SELLO EDITORIAL",
      planetImage: "/luna.png",
      description:
        "Diseño, ilustración y diagramación de libros, cartillas académicas (como 'La química en la Ingeniería civil'), cubiertas y piezas divulgativas del Sello Editorial UniPiloto.",
      highlights: [
        "Diseño de portadas, páginas internas y piezas promocionales para la librería y audiolibros UniPiloto.",
        "Publicación de dos proyectos en la revista Mirada Proyectual, ediciones 24 y 25.",
      ],
    },
    {
      period: "Desde 2020 — Actualidad",
      role: "Freelancer Independiente",
      studio: "Diseño Editorial, Branding, Social Media e Ilustración (@juana.ilustra)",
      missionCode: "EXP // 07 · INDEPENDIENTE",
      planetImage: "/marte.png",
      description:
        "Desarrollo de proyectos integrales para marcas y clientes independientes como Mango Pets Boutique, Alua Kits, brochures educativos, infografías y rutas de atención.",
      highlights: [
        "Creación de identidades visuales desde cero, empaques, papelería y contenido digital.",
      ],
    },
  ] as ExperienceItem[],
};
