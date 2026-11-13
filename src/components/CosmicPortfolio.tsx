import React, { useState } from "react";
import {
  Sparkles,
  Rocket,
  Orbit,
  Compass,
  ExternalLink,
  Copy,
  Check,
  Layers,
  PenTool,
  Star,
  ArrowUpRight,
  Radio,
  Globe,
  Send,
  Eye,
  Disc,
  Moon,
  GraduationCap,
  Award,
  Languages,
  Phone,
  AtSign,
  Mail,
  BookOpen,
  Palette,
} from "lucide-react";
import {
  portfolioData,
  type ProjectItem,
  type SectorCategory,
} from "../data/portfolio";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Planet } from "./Planet";
import { SCALES } from "../data/planets";
import { StellarLassoBear } from "./StellarLassoBear";
import { BotanicalCelestialFrame } from "./BotanicalCelestialFrame";
import { EditorialTitle } from "./EditorialTitle";

const categories: ("3 Mejores Obras" | "Todos" | SectorCategory)[] = [
  "3 Mejores Obras",
  "Todos",
  "Arte Digital",
  "Diseño Gráfico",
  "Ilustración",
];

export const CosmicPortfolio: React.FC = () => {
  const { profile, creativeTools, projects, experience } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [activeSlideByProject, setActiveSlideByProject] = useState<
    Record<string, "cover" | "spread">
  >({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactType, setContactType] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [warpActive, setWarpActive] = useState(false);

  const featuredProjects = projects.filter((p) => p.featured);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hola Juana, te escribo desde tu portafolio web.",
      `• Nombre / Estudio: ${contactName.trim()}`,
      `• Correo: ${contactEmail.trim()}`,
      contactType.trim() ? `• Tipo de proyecto: ${contactType.trim()}` : "",
      `• Detalles: ${contactDetails.trim()}`,
    ].filter(Boolean);
    const whatsappUrl = `https://wa.me/573213447790?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  const toggleProjectSlide = (
    e: React.MouseEvent,
    projectId: string,
    mode: "cover" | "spread"
  ) => {
    e.stopPropagation();
    setActiveSlideByProject((prev) => ({ ...prev, [projectId]: mode }));
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div
        className={`relative z-10 min-h-screen overflow-x-hidden transition-transform duration-700 ${warpActive ? "scale-[1.01]" : ""
          }`}
      >
        {/* SCROLL ANIMATION: OSO COLGADO DEL LAZO ESTELAR */}
        <StellarLassoBear />

        {/* AMBIENT FLOATING PLANETS IN DEEP SPACE (SUBTLE BLURRED BACKGROUND DETAILS) */}
        <div
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-[420px] -left-[420px] opacity-20">
            <Planet name="sol" size={580} blurPx={3.2} shade={false} />
          </div>

          <div className="planet-float-delayed absolute top-[32%] -right-24 opacity-20">
            <Planet name="saturno" scale={SCALES.ambient} blurPx={2.2} />
          </div>

          <div className="planet-drift absolute top-[58%] left-[3%] opacity-18">
            <Planet name="neptuno" scale={SCALES.ambient} blurPx={2.4} />
          </div>

          <div className="planet-float absolute top-[16%] right-[22%] opacity-22">
            <Planet name="tierra" scale={SCALES.ambient} blurPx={2} />
            <div className="absolute -right-5 -top-2">
              <Planet
                name="luna"
                scale={SCALES.ambient}
                blurPx={2}
                glow={false}
              />
            </div>
          </div>

          <div className="planet-drift absolute bottom-[14%] right-[30%] opacity-18">
            <Planet name="venus" scale={SCALES.ambient} blurPx={2.4} />
          </div>

          <div className="planet-float absolute bottom-[8%] right-[9%] opacity-20">
            <Planet name="marte" scale={SCALES.ambient} blurPx={2.2} />
          </div>
        </div>

        {/* HERO SECTION: DISPOSICIÓN EN COLUMNA CON MAYOR ANCHO Y ESPACIO (SIN NAVBAR SUPERIOR NI KPIs) */}
        <section
          id="inicio"
          className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-14 pb-24 md:pt-20 md:pb-32"
        >
          {/* Contenedor en Columna (las dos secciones del Hero apiladas verticalmente y con mayor amplitud horizontal) */}
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
            {/* SECCIÓN 1 DE LA COLUMNA: PRESENTACIÓN AMPLIA "¡HOLA! SOY JUANA VARELA" */}
            <div className="w-full space-y-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#ffc83d]/45 bg-[#173d7a]/80 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(255,200,61,0.18)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffd95a] opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ffc83d]"></span>
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#ffd95a]">
                    {profile.edition} · {profile.location}
                  </span>
                </div>

                {/* Sectores de actividad alineados horizontalmente */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#a9c8f5] mr-1">
                    Sectores de actividad:
                  </span>
                  {profile.sectors.map((sector) => (
                    <Badge
                      key={sector}
                      variant="cosmic"
                      className="px-3.5 py-1 text-xs sm:text-sm font-semibold tracking-wide"
                    >
                      <Sparkles className="mr-1.5 h-3.5 w-3.5 text-[#ffd95a]" />
                      {sector}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tarjeta panorámica de saludo con la Estrella/Sol con rostro (/sol_pin.png) en la esquina superior derecha */}
              <div className="relative overflow-visible rounded-3xl border border-[#ffc83d]/35 bg-gradient-to-r from-[#102754]/90 via-[#153468]/80 to-[#0d2242]/90 p-5 sm:p-10 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,12,29,0.75)]">
                {/* Estrella / Sol con rostro (/sol_pin.png) despejada en la esquina superior derecha */}
                <div
                  className="sun-pin-pulse absolute -top-6 right-2 sm:-top-10 sm:right-8 z-30 cursor-pointer group/pin"
                  title="Sol Estelar · Ilustración de Juana Varela"
                >
                  <img
                    src="/sol_pin.png"
                    alt="Pin ilustrado de sol con rostro por Juana Varela"
                    loading="eager"
                    decoding="async"
                    className="h-20 w-20 sm:h-32 sm:w-32 object-contain transition-transform duration-300 group-hover/pin:scale-115 group-hover/pin:rotate-12 drop-shadow-[0_8px_24px_rgba(255,200,61,0.75)]"
                  />
                </div>

                <div className="space-y-4 pr-14 sm:pr-32">
                  <EditorialTitle
                    as="h1"
                    text="¡Hola!"
                    secondLine="Soy Juana Varela"
                    secondLineInitial={true}
                    starAccent={true}
                    className="text-3xl sm:text-6xl lg:text-7xl text-[#f8f5ec]"
                  />
                  <p className="font-mono text-[11px] sm:text-sm uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[#ffd95a]">
                    DISEÑADORA GRÁFICA · DISEÑO EDITORIAL · BRANDING · SOCIAL
                    MEDIA · ILUSTRACIÓN
                  </p>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-12 items-end border-t border-[#ffc83d]/20 pt-6">
                  <div className="space-y-3 lg:col-span-8 text-base sm:text-lg leading-relaxed text-[#d9e2f2]/95">
                    <p>{profile.tagline}</p>
                    <p className="text-sm sm:text-base text-[#c6d4f0]/85">
                      {profile.bio}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:col-span-4 lg:items-end justify-end">
                    <Button size="lg" className="w-full sm:w-auto" asChild>
                      <a href="#proyectos">
                        <Rocket className="h-5 w-5" />
                        Explorar Sus 3 Mejores Obras
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto"
                      asChild
                    >
                      <a
                        href={profile.behanceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="h-5 w-5 text-[#ffd95a]" />
                        {profile.behanceHandle}
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Barra de contacto directo e indicadores clave */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#ffc83d]/25 bg-[#081730]/85 px-5 py-3.5 text-xs sm:text-sm text-[#e8dfc8]">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <span className="inline-flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#ffd95a]" />
                      {profile.phone}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#ffd95a]" />
                      {profile.email}
                    </span>
                    <a
                      href={profile.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-[#ffd95a] transition-colors"
                    >
                      <AtSign className="h-4 w-4 text-[#ffd95a]" />
                      {profile.instagram}
                    </a>
                  </div>
                  <span className="font-mono text-xs text-[#a9c8f5]">
                    Bogotá, Colombia · Portafolio Oficial 2026
                  </span>
                </div>
              </div>
            </div>

            {/* SECCIÓN 2 DE LA COLUMNA: MARCO BOTÁNICO-CELESTE CON EL RETRATO DE JUANA (DESPEJADO Y CON ESPACIO) */}
            <div className="flex w-full flex-col items-center py-6">
              <div className="relative flex items-center justify-center">
                <BotanicalCelestialFrame />
              </div>
            </div>
          </div>

          {/* 3 SECTORS OF ACTIVITY CARDS WITH COMPANION BANNER */}
          <div id="sectores" className="mt-24 space-y-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#ffc83d]/30 bg-gradient-to-r from-[#11295a]/85 via-[#173d7a]/70 to-[#0e2448]/85 p-6 sm:p-8 backdrop-blur-xl shadow-[0_10px_35px_rgba(4,12,29,0.7)]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="relative shrink-0">
                    <img
                      src="/osito2.png"
                      alt="Personaje del oso azul con bufanda amarilla de Juana Varela"
                      loading="lazy"
                      decoding="async"
                      className="h-24 w-24 sm:h-28 sm:w-28 object-contain bear-float drop-shadow-[0_8px_20px_rgba(255,200,61,0.35)]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#ffd95a]">
                      <Sparkles className="h-3.5 w-3.5 text-[#ffc83d]" />
                      <span>Especialidades Creativas · Bogotá & Internacional</span>
                    </div>
                    <div>
                      <EditorialTitle
                        as="h2"
                        text="Sectores Creativos"
                        starAccent={true}
                        className="text-2xl sm:text-4xl text-[#f8f5ec]"
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-[#d9e2f2]/85 max-w-2xl">
                      Especialización en diseño editorial, diagramación de
                      libros, branding, social media e ilustración científica y
                      digital.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant="cosmic"
                    className="font-mono text-xs px-3.5 py-1.5"
                  >
                    LIBROS ✦ BRANDING ✦ INFOGRAFÍAS
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Arte Digital",
                  code: "SECTOR // 01",
                  planet: "/neptuno.png",
                  desc: "Dirección de arte, fotomontaje simbólico, experimentación con texturas naturales y universos cromáticos para publicaciones y medios digitales.",
                  icon: Sparkles,
                },
                {
                  title: "Diseño Gráfico",
                  code: "SECTOR // 02",
                  planet: "/saturno.png",
                  desc: "Diseño editorial de libros, cartillas, revistas e informes, junto con identidad visual (branding), empaques, brochures educativos y social media.",
                  icon: Layers,
                },
                {
                  title: "Ilustración",
                  code: "SECTOR // 03",
                  planet: "/luna.png",
                  desc: "Ilustración digital, científica e informativa, creación de personajes originales, portadas ilustradas y visualización didáctica de datos.",
                  icon: PenTool,
                },
              ].map((sec) => {
                const IconComp = sec.icon;
                return (
                  <Card
                    key={sec.title}
                    className="group relative overflow-hidden border-[#ffc83d]/25 bg-gradient-to-b from-[#143466]/85 via-[#11295a]/90 to-[#0b1e3d]/95 hover:-translate-y-1.5 hover:border-[#ffcf4a]/65 hover:shadow-[0_12px_40px_rgba(255,200,61,0.18)]"
                  >
                    <div className="absolute -right-6 -bottom-6 opacity-20 transition-all duration-500 group-hover:scale-105 group-hover:opacity-35">
                      <Planet
                        src={sec.planet}
                        scale={SCALES.card}
                        blurPx={1.8}
                      />
                    </div>

                    <CardHeader className="pb-2 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] tracking-widest text-[#ffd95a]">
                          {sec.code}
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ffc83d]/40 bg-[#1c4688]/70 text-[#ffd95a] shadow-[0_0_15px_rgba(255,200,61,0.2)] transition-transform group-hover:scale-110">
                          <IconComp className="h-5 w-5" />
                        </div>
                      </div>
                      <CardTitle className="pt-2 text-2xl text-[#f8f5ec] group-hover:text-[#ffd95a] transition-colors">
                        <EditorialTitle text={sec.title} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-sm leading-relaxed text-[#c6d4f0]/80">
                        {sec.desc}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <Separator className="mx-auto max-w-6xl" />

        {/* REDESIGNED AWWWARDS-LEVEL PROJECTS SHOWCASE SECTION */}
        <section
          id="proyectos"
          className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24"
        >
          {/* Cinta divisoria inspirada en el PDF de Behance: ✦ LIBROS ✦ BRANDING ✦ INFOGRAFÍAS ✦ */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2.5 sm:gap-10 rounded-2xl border border-[#ffc83d]/35 bg-gradient-to-r from-[#0b1d3d] via-[#16366d] to-[#0b1d3d] px-3 sm:px-6 py-3 sm:py-4 shadow-[0_10px_35px_rgba(4,12,29,0.85)]">
            <span className="text-[#ffd95a] text-sm sm:text-lg">✦</span>
            <EditorialTitle
              text="Libros"
              className="text-base sm:text-2xl text-[#f8f5ec]"
            />
            <span className="text-[#ffd95a] text-sm sm:text-lg">✦</span>
            <EditorialTitle
              text="Branding"
              className="text-base sm:text-2xl text-[#f8f5ec]"
            />
            <span className="text-[#ffd95a] text-sm sm:text-lg">✦</span>
            <EditorialTitle
              text="Cartillas & Guías"
              className="text-base sm:text-2xl text-[#f8f5ec]"
            />
            <span className="text-[#ffd95a] text-sm sm:text-lg">✦</span>
            <EditorialTitle
              text="Infografías"
              className="text-base sm:text-2xl text-[#f8f5ec]"
            />
            <span className="text-[#ffd95a] text-sm sm:text-lg">✦</span>
          </div>

          {/* Encabezado Editorial de la Galería de Casos de Estudio */}
          <div className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ffc83d]/40 bg-[#143466]/85 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[#ffd95a] shadow-[0_0_20px_rgba(255,200,61,0.15)]">
                <Disc className="h-4 w-4 text-[#ffc83d] animate-spin" />
                EXHIBICIÓN CURADA // CASOS DE ESTUDIO DESTACADOS 2026
              </div>
              <div>
                <EditorialTitle
                  as="h2"
                  text="Obras Destacadas"
                  starAccent={true}
                  className="text-4xl sm:text-6xl text-[#f8f5ec]"
                />
              </div>
            </div>
            <p className="max-w-xl text-sm sm:text-base text-[#c6d4f0]/90 leading-relaxed">
              Presentación de casos de estudio con enfoque narrativo, dirección
              de arte, sistemas cromáticos y desglose editorial de los{" "}
              <span className="text-[#ffd95a] font-semibold">
                3 mejores trabajos de Juana Varela
              </span>{" "}
              junto a su archivo profesional en Behance.
            </p>
          </div>

          <Tabs defaultValue="3 Mejores Obras" className="w-full">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#ffc83d]/20 pb-4">
              <div className="flex justify-start overflow-x-auto">
                <TabsList>
                  {categories.map((cat) => (
                    <TabsTrigger key={cat} value={cat}>
                      {cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <span className="font-mono text-xs text-[#a9c8f5]">
                Haz clic en las miniaturas o en cada obra para alternar vistas y
                abrir el caso de estudio
              </span>
            </div>

            {/* VISTA PRINCIPAL: LOS 3 MEJORES TRABAJOS EN FORMATO MONUMENTAL AWWWARDS / EDITORIAL SPREAD */}
            <TabsContent value="3 Mejores Obras" className="space-y-16">
              {featuredProjects.map((project, idx) => {
                const isReversed = idx % 2 === 1;
                const activeMode =
                  activeSlideByProject[project.id] ?? "cover";
                const mainImg =
                  activeMode === "spread" && project.spreadImage
                    ? project.spreadImage
                    : project.coverImage;

                return (
                  <article
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group relative overflow-hidden rounded-[32px] border border-[#ffc83d]/35 bg-gradient-to-br from-[#132f5e]/95 via-[#0c2144]/98 to-[#07152e] p-5 sm:p-8 lg:p-10 shadow-[0_25px_70px_rgba(2,8,22,0.9)] transition-all duration-500 hover:border-[#ffcf4a]/80 hover:shadow-[0_25px_80px_rgba(255,200,61,0.2)] cursor-pointer"
                  >
                    {/* Resplandor cromático ambiental adaptado a la paleta del proyecto */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-50"
                      style={{ background: project.gradient }}
                    />

                    {/* Número monumental de índice editorial en segundo plano */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-6 right-8 z-0 font-editorial text-8xl sm:text-9xl font-bold tracking-tighter text-[#ffd95a]/10 select-none"
                    >
                      0{idx + 1}
                    </div>

                    <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
                      {/* PANEL VISUAL INTERACTIVO (7 COLUMNAS) */}
                      <div
                        className={`space-y-4 lg:col-span-7 ${isReversed ? "lg:order-2" : "lg:order-1"
                          }`}
                      >
                        {/* Lienzo Principal de Gran Formato */}
                        <div className="relative overflow-hidden rounded-2xl border border-[#ffc83d]/40 bg-[#051024] shadow-[0_18px_45px_rgba(0,0,0,0.75)] aspect-[16/11]">
                          <img
                            src={project.coverImage}
                            alt={`${project.title} — Portada por Juana Varela`}
                            decoding="async"
                            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-[1.03] ${
                              activeMode === "cover"
                                ? "opacity-100 scale-100"
                                : "opacity-0 pointer-events-none"
                            }`}
                          />
                          <img
                            src={project.spreadImage}
                            alt={`${project.title} — Pliegos internos por Juana Varela`}
                            decoding="async"
                            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-[1.03] ${
                              activeMode === "spread"
                                ? "opacity-100 scale-100"
                                : "opacity-0 pointer-events-none"
                            }`}
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040c1d]/80 via-transparent to-[#040c1d]/25" />

                          {/* Etiquetas superiores de la vitrina */}
                          <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
                            <Badge
                              variant="cosmic"
                              className="px-2 sm:px-3.5 py-0.5 sm:py-1 font-mono text-[9px] sm:text-xs shadow-lg backdrop-blur-md"
                            >
                              ★ OBRA CUMBRE 0{idx + 1} / 03
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-[#06132b]/85 border-[#ffc83d]/45 text-[#ffe38a] font-mono text-[9px] sm:text-xs px-2 sm:px-2.5 py-0.5 backdrop-blur-md"
                            >
                              {project.category} · {project.year}
                            </Badge>
                          </div>

                          {/* Píldora flotante interactiva estilo Awwwards en el centro al hacer hover */}
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#ffe38a] bg-[#071630]/90 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#ffe38a] shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
                              <Eye className="h-4 w-4 text-[#ffd95a]" />
                              Abrir Caso de Estudio Completo
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                          </div>

                          {/* Barra inferior del lienzo con selector interactivo de láminas */}
                          {project.spreadImage && (
                            <div className="absolute bottom-2 left-2 right-2 sm:bottom-3.5 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2">
                              <div className="inline-flex items-center gap-1 rounded-xl border border-[#ffc83d]/35 bg-[#06132b]/90 p-0.5 sm:p-1 backdrop-blur-md">
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    toggleProjectSlide(e, project.id, "cover")
                                  }
                                  className={`rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[11px] transition-all ${activeMode === "cover"
                                      ? "bg-[#ffc83d] text-[#040c1d] font-bold shadow"
                                      : "text-[#d9e2f2] hover:text-[#ffd95a]"
                                    }`}
                                >
                                  01 · Portada
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    toggleProjectSlide(e, project.id, "spread")
                                  }
                                  className={`rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[11px] transition-all ${activeMode === "spread"
                                      ? "bg-[#ffc83d] text-[#040c1d] font-bold shadow"
                                      : "text-[#d9e2f2] hover:text-[#ffd95a]"
                                    }`}
                                >
                                  02 · Pliegos
                                </button>
                              </div>

                              <span className="hidden sm:inline-block rounded-lg bg-[#06132b]/85 px-2.5 py-1 font-mono text-[10px] text-[#ffe38a] border border-[#ffc83d]/30">
                                {project.badgeType}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Galería Bento de Miniaturas + Espectro Cromático Pantone */}
                        <div className="grid grid-cols-12 gap-3">
                          {project.spreadImage && (
                            <>
                              <button
                                type="button"
                                onClick={(e) =>
                                  toggleProjectSlide(e, project.id, "cover")
                                }
                                className={`col-span-4 overflow-hidden rounded-xl border transition-all h-20 relative ${activeMode === "cover"
                                    ? "border-[#ffd95a] ring-2 ring-[#ffd95a]/40"
                                    : "border-[#ffc83d]/25 opacity-70 hover:opacity-100"
                                  }`}
                              >
                                <img
                                  src={project.coverImage}
                                  alt={`Vista principal de ${project.title}`}
                                  loading="lazy"
                                  decoding="async"
                                  className="h-full w-full object-cover"
                                />
                                <span className="absolute bottom-1 left-1.5 rounded bg-[#040c1d]/85 px-1.5 py-0.5 font-mono text-[9px] text-[#ffe38a]">
                                  Portada
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) =>
                                  toggleProjectSlide(e, project.id, "spread")
                                }
                                className={`col-span-4 overflow-hidden rounded-xl border transition-all h-20 relative ${activeMode === "spread"
                                    ? "border-[#ffd95a] ring-2 ring-[#ffd95a]/40"
                                    : "border-[#ffc83d]/25 opacity-70 hover:opacity-100"
                                  }`}
                              >
                                <img
                                  src={project.spreadImage}
                                  alt={`Desarrollo interior de ${project.title}`}
                                  loading="lazy"
                                  decoding="async"
                                  className="h-full w-full object-cover"
                                />
                                <span className="absolute bottom-1 left-1.5 rounded bg-[#040c1d]/85 px-1.5 py-0.5 font-mono text-[9px] text-[#ffe38a]">
                                  Pliegos / Sistema
                                </span>
                              </button>
                            </>
                          )}

                          {/* Muestra del Sistema Cromático del Proyecto */}
                          <div
                            className={`${project.spreadImage
                                ? "col-span-4"
                                : "col-span-12"
                              } flex flex-col justify-between rounded-xl border border-[#ffc83d]/25 bg-[#081730]/90 p-2.5`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[9px] uppercase tracking-wider text-[#a9c8f5]">
                                Paleta Cromática
                              </span>
                              <Palette className="h-3 w-3 text-[#ffd95a]" />
                            </div>
                            <div className="flex h-6 w-full overflow-hidden rounded-lg border border-white/15">
                              {project.palette.map((hex) => (
                                <div
                                  key={hex}
                                  className="h-full flex-1 transition-all duration-300 hover:flex-[1.8]"
                                  style={{ backgroundColor: hex }}
                                  title={`Color ${hex}`}
                                />
                              ))}
                            </div>
                            <div className="hidden sm:flex justify-between font-mono text-[8px] text-[#d9e2f2]/75 truncate">
                              <span>{project.palette[0]}</span>
                              <span>{project.palette[2]}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* FICHA MONOGRÁFICA EDITORIAL (5 COLUMNAS) */}
                      <div
                        className={`space-y-5 lg:col-span-5 ${isReversed ? "lg:order-1" : "lg:order-2"
                          }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 font-mono text-xs text-[#ffd95a]">
                            <BookOpen className="h-3.5 w-3.5" />
                            <span>{project.client}</span>
                          </div>

                          <EditorialTitle
                            as="h3"
                            text={project.title}
                            starAccent={true}
                            className="text-3xl sm:text-4xl text-[#f8f5ec] group-hover:text-[#ffe38a] transition-colors"
                          />

                          <p className="text-sm sm:text-base font-medium text-[#8fc0ff]">
                            {project.subtitle}
                          </p>
                        </div>

                        <p className="text-sm sm:text-base leading-relaxed text-[#d9e2f2]/90">
                          {project.description}
                        </p>

                        {/* Síntesis Estratégica (Reto & Solución) */}
                        <div className="rounded-2xl border border-[#ffc83d]/25 bg-[#081730]/80 p-4 space-y-2">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[#ffd95a]">
                            DIRECCIÓN DE ARTE & SOLUCIÓN VISUAL
                          </span>
                          <p className="text-xs sm:text-sm leading-relaxed text-[#c6d4f0]/90">
                            {project.solution}
                          </p>
                        </div>

                        {/* Lista de Entregables Clave */}
                        <div className="space-y-2">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[#a9c8f5]">
                            ENTREGABLES DEL PROYECTO:
                          </span>
                          <ul className="grid gap-1.5 sm:grid-cols-2">
                            {project.deliverables.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-xs text-[#e8dfc8]"
                              >
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffc83d]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Pie de Ficha: Herramientas + Botones de Acción */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#ffc83d]/20 pt-4">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tools.map((tool) => (
                              <span
                                key={tool}
                                className="rounded-lg border border-[#ffc83d]/35 bg-[#163870] px-2.5 py-1 font-mono text-[11px] font-medium text-[#ffd95a]"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>

                          <Button size="sm" className="gap-1.5">
                            <Eye className="h-4 w-4" />
                            Ver Expediente
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </TabsContent>

            {/* VISTAS POR CATEGORÍA Y ARCHIVO COMPLETO (BENTO EDITORIAL CARDS) */}
            {categories
              .filter((c) => c !== "3 Mejores Obras")
              .map((cat) => {
                const filtered =
                  cat === "Todos"
                    ? projects
                    : projects.filter((p) => p.category === cat);

                return (
                  <TabsContent key={cat} value={cat}>
                    <div className="grid gap-8 md:grid-cols-2">
                      {filtered.map((project, idx) => (
                        <Card
                          key={project.id}
                          onClick={() => setSelectedProject(project)}
                          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#ffc83d]/30 bg-gradient-to-b from-[#13315f]/90 to-[#0b1e3d]/95 hover:-translate-y-2 hover:border-[#ffcf4a]/75 hover:shadow-[0_18px_50px_rgba(255,200,61,0.22)] cursor-pointer"
                        >
                          <div
                            className="relative h-72 w-full overflow-hidden border-b border-[#ffc83d]/25"
                            style={{ background: project.gradient }}
                          >
                            <img
                              src={project.coverImage}
                              alt={`${project.title} — ${project.subtitle} por Juana Varela`}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07152d] via-[#07152d]/20 to-transparent" />

                            <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-2">
                              {project.topRank ? (
                                <Badge
                                  variant="cosmic"
                                  className="shadow-lg backdrop-blur-md font-mono text-[10px]"
                                >
                                  ★ TOP #{project.topRank} OBRA CUMBRE
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="font-mono text-[10px] bg-[#0b1e3d]/85 border-[#ffc83d]/40"
                                >
                                  ARCHIVO // 0{idx + 1}
                                </Badge>
                              )}
                              <Badge
                                variant="outline"
                                className="bg-[#0b1e3d]/85 text-[#ffe38a] border-[#ffc83d]/45 backdrop-blur-md"
                              >
                                {project.category}
                              </Badge>
                            </div>

                            <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between">
                              <span className="font-mono text-[10px] text-[#ffe38a] drop-shadow">
                                {project.badgeType}
                              </span>
                              <div className="flex items-center -space-x-1">
                                {project.palette.map((hex) => (
                                  <span
                                    key={hex}
                                    className="h-4 w-4 rounded-full border border-[#ffd95a]/60 shadow-sm"
                                    style={{ backgroundColor: hex }}
                                    title={hex}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between text-xs font-mono text-[#a9c8f5]">
                              <span className="truncate pr-2">
                                {project.client}
                              </span>
                              <span className="shrink-0">{project.year}</span>
                            </div>
                            <CardTitle className="mt-1.5 flex items-start justify-between gap-2 group-hover:text-[#ffd95a] transition-colors">
                              <EditorialTitle
                                text={project.title}
                                className="text-2xl sm:text-3xl text-[#f8f5ec] group-hover:text-[#ffd95a]"
                              />
                              <ArrowUpRight className="h-5 w-5 shrink-0 text-[#a9c8f5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffd95a]" />
                            </CardTitle>
                            <CardDescription className="text-[#e8dfc8]/90 font-medium">
                              {project.subtitle}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="pb-4">
                            <p className="text-sm text-[#c6d4f0]/85 leading-relaxed">
                              {project.description}
                            </p>
                          </CardContent>

                          <CardFooter className="flex flex-wrap items-center justify-between gap-2 border-t border-[#ffc83d]/15 pt-4">
                            <div className="flex flex-wrap gap-1.5">
                              {project.tools.map((tool) => (
                                <span
                                  key={tool}
                                  className="rounded-md bg-[#173d7a] px-2.5 py-0.5 font-mono text-[10px] text-[#ffd95a] border border-[#ffc83d]/25"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#ffd95a] group-hover:underline">
                              <Eye className="h-3.5 w-3.5" />
                              Abrir Caso de Estudio
                            </span>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                );
              })}
          </Tabs>
        </section>

        <Separator className="mx-auto max-w-6xl" />

        {/* TOOLS & SOFTWARE SECTION */}
        <section
          id="herramientas"
          className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24"
        >
          <div className="mb-14 text-center">
            <div className="relative inline-flex flex-col items-center">
              <div className="mb-3 flex items-center justify-center">
                <img
                  src="/osito6.png"
                  alt="Personaje del oso azul sosteniendo las herramientas de diseño de Juana Varela"
                  loading="lazy"
                  decoding="async"
                  className="h-28 w-28 sm:h-36 sm:w-36 object-contain bear-float drop-shadow-[0_8px_20px_rgba(255,200,61,0.35)]"
                />
              </div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#ffc83d]/35 bg-[#143466]/80 px-4 py-1 font-mono text-xs uppercase tracking-widest text-[#ffd95a]">
                <Orbit className="h-4 w-4 text-[#ffc83d] animate-spin" />
                ARSENAL CREATIVO // DOMINIO INFINITO (∞)
              </div>
              <div className="mt-2">
                <EditorialTitle
                  as="h2"
                  text="Software & Herramientas"
                  starAccent={true}
                  className="text-3xl sm:text-5xl text-[#f8f5ec]"
                />
              </div>
              <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-[#c6d4f0]/85">
                Las cuatro herramientas fundamentales de Juana Varela, forjadas
                como sellos astrales en azul cobalto y oro con{" "}
                <span className="font-semibold text-[#ffd95a]">
                  tiempo de dominio infinito (∞)
                </span>
                .
              </p>
            </div>
          </div>

          <div className="grid gap-7 md:grid-cols-2">
            {creativeTools.map((tool) => (
              <div
                key={tool.id}
                className="group relative rounded-3xl bg-gradient-to-br from-[#ffd95a]/45 via-[#2f6ccc]/40 to-[#ffc83d]/35 p-[1px] shadow-[0_15px_45px_rgba(5,16,38,0.85)] transition-all duration-500 hover:-translate-y-1.5 hover:from-[#ffe38a]/80 hover:via-[#ffc83d]/50 hover:to-[#ffd95a]/70 hover:shadow-[0_15px_55px_rgba(255,200,61,0.22)]"
              >
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[23px] bg-gradient-to-b from-[#153468]/95 via-[#0f2650]/98 to-[#0b1e3d] p-6 sm:p-8">
                  <div
                    className="pointer-events-none absolute -top-20 -left-20 h-56 w-56 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-45"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,200,61,0.55), transparent 70%)",
                    }}
                  />

                  <div className="absolute -right-8 -bottom-8 opacity-20 transition-all duration-700 group-hover:scale-105 group-hover:rotate-6 group-hover:opacity-35">
                    <Planet
                      src={tool.planetImage}
                      scale={SCALES.card}
                      blurPx={1.8}
                    />
                  </div>

                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-[#ffc83d]/20 pb-4">
                    <span className="font-mono text-[11px] tracking-widest text-[#a9c8f5]">
                      {tool.orbitalOrder}
                    </span>

                    <div className="flex items-center gap-2 rounded-full border border-[#ffc83d]/55 bg-gradient-to-r from-[#1f4f99] via-[#2a62b8] to-[#1f4f99] px-3.5 py-1 shadow-[0_0_20px_rgba(255,200,61,0.25)]">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#e8dfc8]">
                        Tiempo de dominio:
                      </span>
                      <span
                        className="bg-gradient-to-b from-[#fff4c2] via-[#ffd95a] to-[#f2b01e] bg-clip-text text-2xl font-black leading-none text-transparent drop-shadow-[0_0_8px_rgba(255,217,90,0.6)]"
                        title="Dominio Infinito"
                      >
                        {tool.masteryTime}
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 my-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
                    <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
                      <div className="orbit-ring-slow absolute inset-0 rounded-full border border-dashed border-[#ffc83d]/60" />
                      <div className="orbit-ring-reverse absolute inset-1.5 rounded-full border border-[#ffd95a]/30">
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#ffd95a] shadow-[0_0_8px_#ffd95a]" />
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#ffc83d]" />
                      </div>

                      <div
                        className="relative flex h-22 w-22 flex-col items-center justify-center rounded-full border-2 border-[#ffcf4a] shadow-[0_8px_25px_rgba(0,0,0,0.8),inset_0_2px_15px_rgba(255,217,90,0.35)] transition-transform duration-500 group-hover:scale-105"
                        style={{ background: tool.sealGradient }}
                      >
                        <div className="pointer-events-none absolute inset-1.5 rounded-full border border-dotted border-[#ffd95a]/55" />
                        <span className="text-[10px] leading-none text-[#ffd95a]/90">
                          ✦ ☾ ✦
                        </span>
                        <span className="mt-0.5 bg-gradient-to-b from-[#fff4c2] via-[#ffd95a] to-[#f5a524] bg-clip-text text-3xl font-black tracking-tight text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                          {tool.shortCode}
                        </span>
                      </div>
                    </div>

                    <div className="text-center sm:text-left space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#ffd95a]">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>{tool.sealTitle}</span>
                      </div>
                      <div>
                        <EditorialTitle
                          as="h3"
                          text={tool.name}
                          className="text-2xl sm:text-3xl text-[#f8f5ec] group-hover:text-[#ffe38a] transition-colors"
                        />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-[#8fc0ff]">
                        {tool.specialty}
                      </p>
                    </div>
                  </div>

                  <p className="relative z-10 text-sm leading-relaxed text-[#d9e2f2]/80">
                    {tool.description}
                  </p>

                  <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#ffc83d]/15 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {tool.pillars.map((pillar) => (
                        <span
                          key={pillar}
                          className="rounded-lg border border-[#ffc83d]/30 bg-[#173d7a]/70 px-2.5 py-1 text-xs font-medium text-[#f4ebd0]"
                        >
                          {pillar}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[11px] text-[#a9c8f5]">
                      {tool.planetLabel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 rounded-3xl border border-[#ffc83d]/25 bg-[#0e2246]/80 p-6 sm:grid-cols-3 backdrop-blur-xl">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#ffd95a] mb-2">
                Suite Adobe Completa
              </h4>
              <p className="text-xs sm:text-sm text-[#d9e2f2]/85 leading-relaxed">
                {profile.skills.softwareEcosystem.adobe.join(" · ")}
              </p>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#8fc0ff] mb-2">
                Suite Microsoft Office
              </h4>
              <p className="text-xs sm:text-sm text-[#d9e2f2]/85 leading-relaxed">
                {profile.skills.softwareEcosystem.office.join(" · ")}
              </p>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#ffd95a] mb-2">
                Otros Programas & IA
              </h4>
              <p className="text-xs sm:text-sm text-[#d9e2f2]/85 leading-relaxed">
                {profile.skills.softwareEcosystem.others.join(" · ")}
              </p>
            </div>
          </div>
        </section>

        {/* PROJECT MISSION BRIEFING DIALOG WITH REAL SPREADS */}
        <Dialog
          open={!!selectedProject}
          onOpenChange={(open) => !open && setSelectedProject(null)}
        >
          {selectedProject && (
            <DialogContent>
              <div
                className="relative -mx-6 -mt-6 mb-4 flex h-56 flex-col justify-between overflow-hidden rounded-t-2xl p-6 border-b border-[#ffc83d]/30"
                style={{ background: selectedProject.gradient }}
              >
                <img
                  src={selectedProject.coverImage}
                  alt={selectedProject.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061126] via-[#061126]/65 to-[#061126]/30" />

                <div className="planet-float absolute right-6 top-6 opacity-40">
                  <Planet
                    src={selectedProject.planetImage}
                    scale={SCALES.modal}
                    blurPx={1.6}
                  />
                </div>

                <div className="relative z-10 flex flex-wrap items-center gap-2">
                  <Badge variant="cosmic">{selectedProject.category}</Badge>
                  <Badge variant="outline" className="font-mono bg-black/50">
                    {selectedProject.badgeType}
                  </Badge>
                  <Badge variant="outline" className="font-mono bg-black/50">
                    {selectedProject.year}
                  </Badge>
                </div>

                <div className="relative z-10 max-w-xl">
                  <p className="font-mono text-xs text-[#ffd95a]">
                    {selectedProject.coordinates} · {selectedProject.client}
                  </p>
                  <DialogTitle className="mt-1 text-2xl sm:text-3xl text-[#f8f5ec]">
                    <EditorialTitle text={selectedProject.title} />
                  </DialogTitle>
                  <DialogDescription className="text-[#e8dfc8] font-medium">
                    {selectedProject.subtitle}
                  </DialogDescription>
                </div>
              </div>

              <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
                <p className="text-sm sm:text-base leading-relaxed text-[#d9e2f2]/90">
                  {selectedProject.description}
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="overflow-hidden rounded-xl border border-[#ffc83d]/30 bg-[#07152d]">
                    <img
                      src={selectedProject.coverImage}
                      alt={`Portada de ${selectedProject.title}`}
                      loading="lazy"
                      decoding="async"
                      className="h-52 w-full object-cover"
                    />
                  </div>
                  {selectedProject.spreadImage && (
                    <div className="overflow-hidden rounded-xl border border-[#ffc83d]/30 bg-[#07152d]">
                      <img
                        src={selectedProject.spreadImage}
                        alt={`Páginas y desarrollo de ${selectedProject.title}`}
                        loading="lazy"
                        decoding="async"
                        className="h-52 w-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#ffc83d]/25 bg-[#13315f]/70 p-4">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#ffd95a]">
                      01 // El Reto Visual
                    </h4>
                    <p className="mt-1.5 text-sm text-[#d9e2f2]/85 leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#ffc83d]/25 bg-[#13315f]/70 p-4">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#8fc0ff]">
                      02 // Proceso & Solución
                    </h4>
                    <p className="mt-1.5 text-sm text-[#d9e2f2]/85 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-[#a9c8f5]">
                      Alcance & Entregables
                    </h4>
                    <ul className="space-y-1.5 text-sm text-[#f8f5ec]">
                      {selectedProject.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffc83d]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-[#a9c8f5]">
                        Paleta Cromática
                      </h4>
                      <div className="flex flex-wrap items-center gap-2">
                        {selectedProject.palette.map((hex) => (
                          <div
                            key={hex}
                            className="flex items-center gap-1.5 rounded-lg border border-[#ffc83d]/25 bg-[#13315f]/80 px-2.5 py-1"
                          >
                            <span
                              className="h-4 w-4 rounded-full border border-white/30"
                              style={{ backgroundColor: hex }}
                            />
                            <span className="font-mono text-xs text-[#f8f5ec]">
                              {hex}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-[#a9c8f5]">
                        Software Empleado
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tools.map((tool) => (
                          <Badge key={tool} variant="default">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <span className="font-mono text-xs text-[#a9c8f5]">
                    Portafolio Oficial Behance · Juana Varela
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedProject(null)}
                    >
                      Cerrar
                    </Button>
                    <Button asChild>
                      <a
                        href={selectedProject.behanceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver en Behance
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>

        <Separator className="mx-auto max-w-6xl" />

        {/* CURRÍCULUM REAL DE JUANA VARELA: EXPERIENCIA, ESTUDIOS, HABILIDADES, IDIOMAS & RECONOCIMIENTOS */}
        <section
          id="experiencia"
          className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 space-y-20"
        >
          <div>
            <div className="mb-12">
              <div className="mb-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#ffd95a]">
                <Compass className="h-4 w-4 text-[#ffc83d]" />
                TRAYECTORIA PROFESIONAL // AGENCIAS, EDITORIALES & FREELANCE
              </div>
              <div>
                <EditorialTitle
                  as="h2"
                  text="Experiencia"
                  starAccent={true}
                  className="text-3xl sm:text-5xl text-[#f8f5ec]"
                />
              </div>
            </div>

            <div className="relative space-y-6 before:absolute before:top-4 before:bottom-4 before:left-5 before:w-[2px] before:bg-gradient-to-b before:from-[#ffd95a] before:via-[#ffc83d] before:to-[#2A62B8] sm:before:left-8">
              {experience.map((exp) => (
                <div key={exp.missionCode} className="relative pl-14 sm:pl-24">
                  <div className="absolute left-0 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#ffc83d]/60 bg-[#11295a] shadow-[0_0_20px_rgba(255,200,61,0.35)] sm:left-3">
                    <Planet
                      src={exp.planetImage}
                      scale={SCALES.node}
                      glow={false}
                    />
                  </div>

                  <Card className="relative overflow-hidden border-[#ffc83d]/25 bg-gradient-to-r from-[#13315f]/90 to-[#0d2242]/95 hover:border-[#ffcf4a]/55">
                    <CardHeader className="pb-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Badge variant="default" className="font-mono">
                          {exp.period}
                        </Badge>
                        <span className="font-mono text-xs text-[#a9c8f5]">
                          {exp.missionCode}
                        </span>
                      </div>
                      <CardTitle className="mt-2 text-xl sm:text-2xl text-[#f8f5ec]">
                        <EditorialTitle text={exp.studio} />
                      </CardTitle>
                      <CardDescription className="text-[#ffd95a] font-semibold text-sm sm:text-base">
                        {exp.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2.5">
                      <p className="text-sm text-[#d9e2f2]/85 leading-relaxed">
                        {exp.description}
                      </p>
                      <ul className="space-y-1 pt-1">
                        {exp.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2 text-xs sm:text-sm text-[#c6d4f0]/80"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffc83d]" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <Card className="border-[#ffc83d]/30 bg-gradient-to-b from-[#13315f]/90 to-[#0b1e3d]/95 p-6 sm:p-8 lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-[#ffc83d]/20 pb-4">
                <EditorialTitle
                  as="h3"
                  text="Estudios"
                  starAccent={true}
                  className="text-2xl sm:text-3xl text-[#f8f5ec]"
                />
                <GraduationCap className="h-6 w-6 text-[#ffd95a]" />
              </div>

              <div className="space-y-5">
                {profile.education.map((edu) => (
                  <div
                    key={`${edu.institution}-${edu.period}`}
                    className="rounded-2xl border border-[#ffc83d]/20 bg-[#0d2242]/75 p-4 space-y-1.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs text-[#ffd95a]">
                        {edu.institution}
                      </span>
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {edu.period}
                      </Badge>
                    </div>
                    <p className="font-semibold text-sm sm:text-base text-[#f8f5ec]">
                      {edu.title}
                    </p>
                    {edu.details && (
                      <ul className="space-y-1 pt-1">
                        {edu.details.map((d) => (
                          <li
                            key={d}
                            className="flex items-start gap-2 text-xs text-[#c6d4f0]/85"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffc83d]" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <div className="space-y-6 lg:col-span-5">
              <Card className="border-[#ffc83d]/30 bg-gradient-to-b from-[#13315f]/90 to-[#0b1e3d]/95 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#ffc83d]/20 pb-3">
                  <EditorialTitle
                    as="h3"
                    text="Reconocimientos"
                    starAccent={true}
                    className="text-2xl text-[#f8f5ec]"
                  />
                  <Award className="h-5 w-5 text-[#ffd95a]" />
                </div>
                <div className="space-y-3">
                  {profile.recognitions.map((rec) => (
                    <div
                      key={rec.title}
                      className="rounded-xl border border-[#ffc83d]/20 bg-[#0d2242]/75 p-3.5"
                    >
                      <h4 className="font-semibold text-sm text-[#ffe38a]">
                        {rec.title}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-[#d9e2f2]/85 leading-relaxed">
                        {rec.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border-[#ffc83d]/30 bg-gradient-to-b from-[#13315f]/90 to-[#0b1e3d]/95 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#ffc83d]/20 pb-3">
                  <EditorialTitle
                    as="h3"
                    text="Habilidades"
                    starAccent={true}
                    className="text-2xl text-[#f8f5ec]"
                  />
                  <Sparkles className="h-5 w-5 text-[#ffd95a]" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#ffd95a] mb-2">
                      Habilidades Técnicas
                    </h4>
                    <ul className="space-y-1 text-xs sm:text-sm text-[#d9e2f2]/90">
                      {profile.skills.technical.map((s) => (
                        <li key={s} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#ffc83d]" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#8fc0ff] mb-2">
                      Habilidades Blandas
                    </h4>
                    <ul className="space-y-1 text-xs sm:text-sm text-[#d9e2f2]/90">
                      {profile.skills.soft.map((s) => (
                        <li key={s} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#8fc0ff]" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="border-[#ffc83d]/30 bg-gradient-to-b from-[#13315f]/90 to-[#0b1e3d]/95 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#ffc83d]/20 pb-3">
                  <EditorialTitle
                    as="h3"
                    text="Idiomas"
                    starAccent={true}
                    className="text-2xl text-[#f8f5ec]"
                  />
                  <Languages className="h-5 w-5 text-[#ffd95a]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center">
                  {profile.languages.map((lang) => (
                    <div
                      key={lang.name}
                      className="rounded-xl border border-[#ffc83d]/20 bg-[#0d2242]/80 p-3"
                    >
                      <p className="font-semibold text-sm text-[#f8f5ec]">
                        {lang.name}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] text-[#ffd95a]">
                        {lang.level}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="mx-auto max-w-6xl" />

        {/* CONTACT SECTION: "¡ME ENCANTARÍA TRABAJAR CONTIGO!" */}
        <section
          id="contacto"
          className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24"
        >
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <div className="flex items-center gap-4">
                <img
                  src="/osito3.png"
                  alt="Personaje del oso azul saludando calurosamente"
                  loading="lazy"
                  decoding="async"
                  className="h-24 w-24 sm:h-28 sm:w-28 object-contain bear-wave shrink-0 drop-shadow-[0_8px_20px_rgba(255,200,61,0.35)]"
                />
                <div className="rounded-2xl border border-[#ffc83d]/35 bg-[#143466]/85 p-3.5 shadow-md backdrop-blur-md">
                  <p className="font-editorial text-base sm:text-lg text-[#ffd95a] font-semibold leading-snug">
                    "¡Transformemos tus ideas en piezas visuales claras y
                    estéticamente cuidadas!"
                  </p>
                  <span className="font-mono text-[10px] text-[#a9c8f5] mt-1 block">
                    — Juana Varela · Bogotá, Colombia
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#ffd95a]">
                <Radio className="h-4 w-4 text-[#ffc83d] animate-pulse" />
                CONTACTO DIRECTO // DISPONIBLE
              </div>

              <div>
                <EditorialTitle
                  as="h2"
                  text="Me encantaría"
                  secondLine="trabajar contigo"
                  starAccent={true}
                  className="text-3xl sm:text-5xl text-[#f8f5ec]"
                />
              </div>

              <p className="text-sm sm:text-base text-[#d9e2f2]/80 leading-relaxed">
                ¿Buscas desarrollar un proyecto de{" "}
                <span className="text-[#ffd95a] font-medium">
                  Diseño Editorial, Branding, Social Media o Ilustración
                </span>
                ? Escríbeme directamente.
              </p>

              <Card className="border-[#ffc83d]/30 bg-[#11295a]/85 p-5 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#a9c8f5]">
                      CORREO ELECTRÓNICO OFICIAL
                    </p>
                    <p className="mt-0.5 text-sm sm:text-base font-semibold text-[#f8f5ec]">
                      {profile.email}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleCopyEmail}>
                    {copiedEmail ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#a9c8f5]">
                      TELÉFONO / WHATSAPP
                    </p>
                    <p className="mt-0.5 font-semibold text-[#f8f5ec]">
                      {profile.phone}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#a9c8f5]">
                      INSTAGRAM ILUSTRACIÓN
                    </p>
                    <a
                      href={profile.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block font-semibold text-[#ffd95a] hover:underline"
                    >
                      {profile.instagram}
                    </a>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#a9c8f5]">
                      PORTAFOLIO OFICIAL BEHANCE
                    </p>
                    <p className="mt-0.5 text-xs text-[#d9e2f2]/85">
                      {profile.behanceHandle}
                    </p>
                  </div>
                  <Button size="sm" asChild>
                    <a
                      href={profile.behanceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Abrir Behance
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-7">
              <Card className="relative overflow-hidden border-[#ffc83d]/35 bg-[#11295a]/90 p-6 sm:p-8 shadow-[0_0_50px_rgba(255,200,61,0.14)]">
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#ffc83d]/20 pb-4">
                    <div>
                      <EditorialTitle
                        as="h3"
                        text="Enviar Mensaje"
                        className="text-xl sm:text-2xl text-[#f8f5ec]"
                      />
                      <p className="text-xs text-[#a9c8f5] mt-1">
                        Chat directo por WhatsApp con Juana Varela ({profile.phone})
                      </p>
                    </div>
                    <Badge variant="cosmic" className="font-mono">
                      BOGOTÁ // CO
                    </Badge>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#e8dfc8]">
                        Nombre o Estudio
                      </label>
                      <Input
                        required
                        name="name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Tu nombre o empresa"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#e8dfc8]">
                        Correo Electrónico
                      </label>
                      <Input
                        required
                        type="email"
                        name="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#e8dfc8]">
                      Tipo de Proyecto
                    </label>
                    <Input
                      name="projectType"
                      value={contactType}
                      onChange={(e) => setContactType(e.target.value)}
                      placeholder="Diseño Editorial, Branding, Social Media o Ilustración..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#e8dfc8]">
                      Detalles del Proyecto
                    </label>
                    <Textarea
                      required
                      name="details"
                      value={contactDetails}
                      onChange={(e) => setContactDetails(e.target.value)}
                      placeholder="Cuéntame sobre tu proyecto, objetivos y tiempos estimados..."
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    {formSent ? (
                      <div className="flex items-center gap-2 text-sm font-medium text-[#ffd95a]">
                        <Check className="h-4 w-4" />
                        ¡Abriendo chat de WhatsApp con Juana Varela!
                      </div>
                    ) : (
                      <span className="font-mono text-xs text-[#a9c8f5]">
                        {profile.availability}
                      </span>
                    )}

                    <Button type="submit" size="lg">
                      <Send className="h-4 w-4" />
                      Enviar por WhatsApp
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative z-10 border-t border-[#ffc83d]/20 bg-[#040c1d]/95 pt-10 pb-28 md:pb-10 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <Moon className="h-5 w-5 text-[#ffd95a]" />
              <span className="text-sm font-semibold text-[#f8f5ec]">
                {profile.name} · {profile.edition}
              </span>
            </div>
            <p className="font-mono text-xs text-[#a9c8f5] text-center">
              {profile.phone} · {profile.email} · {profile.instagram}
            </p>
            <a
              href={profile.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#ffd95a] hover:underline"
            >
              {profile.behanceHandle}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
};
