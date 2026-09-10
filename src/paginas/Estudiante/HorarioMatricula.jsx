import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Coffee,
  Utensils,
  BookOpen,
  Printer,
  Sparkles,
  ArrowRight,
  Info,
  Grid,
  List,
  Layers,
  Check,
  Copy,
  X,
  ChevronRight,
  Zap,
  CheckCircle2,
  Sliders
} from "lucide-react";

// Estructura de bloques de clases y recesos
const estructuraHorarioClases = [
  {
    identificadorFila: "bloque01",
    tipoFila: "clase",
    rangoHorario: "07:00 - 08:40",
    primeraHoraPedagogica: "7:00 a.m. - 7:50 a.m.",
    segundaHoraPedagogica: "7:50 a.m. - 8:40 a.m.",
    diaLunes: "grupo01",
    diaMartes: "grupo01",
    diaMiercolesPrimeraHora: "grupo01",
    diaMiercolesSegundaHora: "grupo02",
    diaJueves: "grupo02",
    diaViernes: "grupo02"
  },
  { identificadorFila: "receso01", tipoFila: "recreo", unicaHora: "08:40 a.m. - 08:50 a.m." },
  {
    identificadorFila: "bloque02",
    tipoFila: "clase",
    rangoHorario: "08:50 - 10:30",
    primeraHoraPedagogica: "8:50 a.m. - 9:40 a.m.",
    segundaHoraPedagogica: "9:40 a.m. - 10:30 a.m.",
    diaLunes: "grupo03",
    diaMartes: "grupo03",
    diaMiercolesPrimeraHora: "grupo03",
    diaMiercolesSegundaHora: "grupo04",
    diaJueves: "grupo04",
    diaViernes: "grupo04"
  },
  { identificadorFila: "receso02", tipoFila: "recreo", unicaHora: "10:30 a.m. - 10:40 a.m." },
  {
    identificadorFila: "bloque03",
    tipoFila: "clase",
    rangoHorario: "10:40 - 12:20",
    primeraHoraPedagogica: "10:40 a.m. - 11:30 a.m.",
    segundaHoraPedagogica: "11:30 a.m. - 12:20 p.m.",
    diaLunes: "grupo05",
    diaMartes: "grupo05",
    diaMiercolesPrimeraHora: "grupo05",
    diaMiercolesSegundaHora: "grupo06",
    diaJueves: "grupo06",
    diaViernes: "grupo06"
  },
  { identificadorFila: "almuerzo", tipoFila: "almuerzo", unicaHora: "12:20 p.m. - 01:50 p.m." },
  {
    identificadorFila: "bloque04",
    tipoFila: "clase",
    rangoHorario: "01:50 - 03:30",
    primeraHoraPedagogica: "1:50 p.m. - 2:40 p.m.",
    segundaHoraPedagogica: "2:40 p.m. - 3:30 p.m.",
    diaLunes: "grupo07",
    diaMartes: "grupo07",
    diaMiercolesPrimeraHora: "grupo07",
    diaMiercolesSegundaHora: "grupo08",
    diaJueves: "grupo08",
    diaViernes: "grupo08"
  },
  { identificadorFila: "receso03", tipoFila: "recreo", unicaHora: "03:30 p.m. - 03:40 p.m." },
  {
    identificadorFila: "bloque05",
    tipoFila: "clase",
    rangoHorario: "03:40 - 05:20",
    primeraHoraPedagogica: "3:40 p.m. - 4:30 p.m.",
    segundaHoraPedagogica: "4:30 p.m. - 5:20 p.m.",
    diaLunes: "grupo09",
    diaMartes: "grupo09",
    diaMiercolesPrimeraHora: "grupo09",
    diaMiercolesSegundaHora: "grupo10",
    diaJueves: "grupo10",
    diaViernes: "grupo10"
  },
  { identificadorFila: "receso04", tipoFila: "recreo", unicaHora: "05:20 p.m. - 05:30 p.m." },
  {
    identificadorFila: "bloque06",
    tipoFila: "clase",
    rangoHorario: "05:30 - 07:10",
    primeraHoraPedagogica: "5:30 p.m. - 6:20 p.m.",
    segundaHoraPedagogica: "6:20 p.m. - 7:10 p.m.",
    diaLunes: "grupo11",
    diaMartes: "grupo11",
    diaMiercolesPrimeraHora: "grupo11",
    diaMiercolesSegundaHora: "grupo12",
    diaJueves: "grupo12",
    diaViernes: "grupo12"
  },
  { identificadorFila: "receso05", tipoFila: "recreo", unicaHora: "07:10 p.m. - 07:20 p.m." },
  {
    identificadorFila: "bloque07",
    tipoFila: "clase",
    rangoHorario: "07:20 - 09:00",
    primeraHoraPedagogica: "7:20 p.m. - 8:10 p.m.",
    segundaHoraPedagogica: "8:10 p.m. - 9:00 p.m.",
    diaLunes: "grupo13",
    diaMartes: "grupo13",
    diaMiercolesPrimeraHora: "grupo13",
    diaMiercolesSegundaHora: "grupo14",
    diaJueves: "grupo14",
    diaViernes: "grupo14"
  }
];

// Paleta de estilos por asignatura (Gradientes pulidos con glow y contraste alto)
const paletaColoresNuevos = [
  {
    badge: "bg-blue-500/20 dark:bg-blue-500/20 light:bg-blue-100 text-blue-300 dark:text-blue-300 light:text-blue-900 border border-blue-500/40 light:border-blue-300",
    card: "bg-gradient-to-br from-blue-950/90 via-blue-900/50 to-slate-950/90 dark:from-blue-950/90 dark:via-blue-900/50 dark:to-slate-950/90 light:from-blue-50 light:via-white light:to-sky-50/80 border-blue-500/50 dark:border-blue-500/50 light:border-blue-300 text-blue-200 dark:text-blue-200 light:text-slate-900 hover:border-blue-400 light:hover:border-blue-500 shadow-lg shadow-blue-500/10 light:shadow-blue-500/5",
    solido: "bg-blue-600 text-white",
    glow: "shadow-blue-500/40 border-blue-400 ring-2 ring-blue-400/50 scale-[1.02]",
    tag: "Blue"
  },
  {
    badge: "bg-emerald-500/20 dark:bg-emerald-500/20 light:bg-emerald-100 text-emerald-300 dark:text-emerald-300 light:text-emerald-900 border border-emerald-500/40 light:border-emerald-300",
    card: "bg-gradient-to-br from-emerald-950/90 via-teal-900/50 to-slate-950/90 dark:from-emerald-950/90 dark:via-teal-900/50 dark:to-slate-950/90 light:from-emerald-50 light:via-white light:to-teal-50/80 border-emerald-500/50 dark:border-emerald-500/50 light:border-emerald-300 text-emerald-200 dark:text-emerald-200 light:text-slate-900 hover:border-emerald-400 light:hover:border-emerald-500 shadow-lg shadow-emerald-500/10 light:shadow-emerald-500/5",
    solido: "bg-emerald-600 text-white",
    glow: "shadow-emerald-500/40 border-emerald-400 ring-2 ring-emerald-400/50 scale-[1.02]",
    tag: "Emerald"
  },
  {
    badge: "bg-purple-500/20 dark:bg-purple-500/20 light:bg-purple-100 text-purple-300 dark:text-purple-300 light:text-purple-900 border border-purple-500/40 light:border-purple-300",
    card: "bg-gradient-to-br from-purple-950/90 via-violet-900/50 to-slate-950/90 dark:from-purple-950/90 dark:via-violet-900/50 dark:to-slate-950/90 light:from-purple-50 light:via-white light:to-violet-50/80 border-purple-500/50 dark:border-purple-500/50 light:border-purple-300 text-purple-200 dark:text-purple-200 light:text-slate-900 hover:border-purple-400 light:hover:border-purple-500 shadow-lg shadow-purple-500/10 light:shadow-purple-500/5",
    solido: "bg-purple-600 text-white",
    glow: "shadow-purple-500/40 border-purple-400 ring-2 ring-purple-400/50 scale-[1.02]",
    tag: "Purple"
  },
  {
    badge: "bg-amber-500/20 dark:bg-amber-500/20 light:bg-amber-100 text-amber-300 dark:text-amber-300 light:text-amber-900 border border-amber-500/40 light:border-amber-300",
    card: "bg-gradient-to-br from-amber-950/90 via-orange-900/50 to-slate-950/90 dark:from-amber-950/90 dark:via-orange-900/50 dark:to-slate-950/90 light:from-amber-50 light:via-white light:to-orange-50/80 border-amber-500/50 dark:border-amber-500/50 light:border-amber-300 text-amber-200 dark:text-amber-200 light:text-slate-900 hover:border-amber-400 light:hover:border-amber-500 shadow-lg shadow-amber-500/10 light:shadow-amber-500/5",
    solido: "bg-amber-600 text-white",
    glow: "shadow-amber-500/40 border-amber-400 ring-2 ring-amber-400/50 scale-[1.02]",
    tag: "Amber"
  },
  {
    badge: "bg-rose-500/20 dark:bg-rose-500/20 light:bg-rose-100 text-rose-300 dark:text-rose-300 light:text-rose-900 border border-rose-500/40 light:border-rose-300",
    card: "bg-gradient-to-br from-rose-950/90 via-red-900/50 to-slate-950/90 dark:from-rose-950/90 dark:via-red-900/50 dark:to-slate-950/90 light:from-rose-50 light:via-white light:to-red-50/80 border-rose-500/50 dark:border-rose-500/50 light:border-rose-300 text-rose-200 dark:text-rose-200 light:text-slate-900 hover:border-rose-400 light:hover:border-rose-500 shadow-lg shadow-rose-500/10 light:shadow-rose-500/5",
    solido: "bg-rose-600 text-white",
    glow: "shadow-rose-500/40 border-rose-400 ring-2 ring-rose-400/50 scale-[1.02]",
    tag: "Rose"
  },
  {
    badge: "bg-sky-500/20 dark:bg-sky-500/20 light:bg-sky-100 text-sky-300 dark:text-sky-300 light:text-sky-900 border border-sky-500/40 light:border-sky-300",
    card: "bg-gradient-to-br from-sky-950/90 via-cyan-900/50 to-slate-950/90 dark:from-sky-950/90 dark:via-cyan-900/50 dark:to-slate-950/90 light:from-sky-50 light:via-white light:to-cyan-50/80 border-sky-500/50 dark:border-sky-500/50 light:border-sky-300 text-sky-200 dark:text-sky-200 light:text-slate-900 hover:border-sky-400 light:hover:border-sky-500 shadow-lg shadow-sky-500/10 light:shadow-sky-500/5",
    solido: "bg-sky-600 text-white",
    glow: "shadow-sky-500/40 border-sky-400 ring-2 ring-sky-400/50 scale-[1.02]",
    tag: "Sky"
  },
  {
    badge: "bg-indigo-500/20 dark:bg-indigo-500/20 light:bg-indigo-100 text-indigo-300 dark:text-indigo-300 light:text-indigo-900 border border-indigo-500/40 light:border-indigo-300",
    card: "bg-gradient-to-br from-indigo-950/90 via-blue-900/50 to-slate-950/90 dark:from-indigo-950/90 dark:via-blue-900/50 dark:to-slate-950/90 light:from-indigo-50 light:via-white light:to-blue-50/80 border-indigo-500/50 dark:border-indigo-500/50 light:border-indigo-300 text-indigo-200 dark:text-indigo-200 light:text-slate-900 hover:border-indigo-400 light:hover:border-indigo-500 shadow-lg shadow-indigo-500/10 light:shadow-indigo-500/5",
    solido: "bg-indigo-600 text-white",
    glow: "shadow-indigo-500/40 border-indigo-400 ring-2 ring-indigo-400/50 scale-[1.02]",
    tag: "Indigo"
  }
];

const semestresDisponibles = ["2026-II", "2027-I", "2027-II", "2028-I"];

// Datos Demo por omisión en caso de no tener matrícula guardada
const matriculaDemoEjemplo = {
  "2026-II": {
    cursos: ["SI2422", "MA2441", "FI2410", "CS2397", "ED2278"],
    grupos: {
      "SI2422": "grupo01",
      "MA2441": "grupo04",
      "FI2410": "grupo05",
      "CS2397": "grupo08",
      "ED2278": "grupo09"
    }
  }
};

const nombresCursosCatalogo = {
  // Ciclo I
  "ED1292": "Actividad Deportiva",
  "SI1447": "Algoritmos",
  "ED1331": "Comunicación",
  "MA1470": "Geometría Analítica",
  "SI1358": "Herramientas Ofimáticas para la Vida Universitaria",
  "SI1216": "Introducción a la Ingeniería Informática",
  "MA1408": "Matemática Básica",
  "ED1297": "Metodología de los Estudios Superiores Universitarios",
  // Ciclo II
  "CB1324": "Biología y Educación Ambiental",
  "MA1435": "Cálculo I",
  "FI1363": "Concepción Física del Universo",
  "SI1445": "Estructuras Discretas",
  "CS1286": "Filosofía y Ética",
  "SI1435": "Programación I",
  "QU1363": "Química General",
  // Ciclo III
  "CA2337": "Administración",
  "MA2441": "Cálculo II",
  "EC2201": "Economía General",
  "FI2410": "Física I",
  "SI2422": "Programación II",
  "CS2397": "Realidad Nacional y Regional",
  "CS2258": "Sociología",
  "ED2278": "Taller de Arte",
  // Ciclo IV
  "CA2101": "Actividad de Responsabilidad Social Universitaria",
  "MA2333": "Álgebra Lineal",
  "ES2300": "Estadística General",
  "SI2418": "Estructura de Datos",
  "FI2411": "Física II",
  "SI2452": "Ingeniería de Procesos de Negocios",
  "CO2201": "Introducción a la Contabilidad",
  "CS2259": "Psicología General",
  // Ciclo V
  "SI3422": "Análisis y Diseño de Sistemas I",
  "MA3412": "Cálculo III",
  "FI3492": "Circuitos Eléctricos y Electrónicos",
  "ED3286": "Discapacidad y Derechos Humanos",
  "ED3283": "Inglés I",
  "SI3421": "Modelado de Datos",
  "SI3331": "Aplicaciones Avanzadas con Hojas de Cálculo",
  "SI3334": "Introducción a los Entornos Operativos",
  // Ciclo VI
  "SI3423": "Análisis y Diseño de Sistemas II",
  "SI3400": "Arquitectura de Computadores",
  "SI3420": "Base de Datos",
  "ED3287": "Defensa Nacional",
  "ES3336": "Inferencia y Probabilidades",
  "ED3284": "Inglés II",
  "ED3285": "Taller de Redacción Científica",
  "SI3337": "Análisis de Algoritmos",
  "SI3336": "Gráficos por Computadoras",
  "AA3303": "Logística Empresarial",
  "SI3335": "Teoría de Compiladores",
  // Ciclo VII
  "IO4447": "Diseños de Investigación para Ingeniería",
  "CA4221": "Emprendedurismo",
  "IO4448": "Investigación de Operaciones",
  "SI4386": "Programación Visual",
  "SI4489": "Sistema de Administración de Base de Datos",
  "SI4490": "Sistemas Operativos",
  "SI4388": "Métodos de Acceso",
  "IO4334": "Métodos Numéricos",
  "SI4387": "Programación Multimedia",
  "IO4332": "Simulación y Juegos",
  // Ciclo VIII
  "DP4331": "Derecho Informático",
  "SI4488": "Ingeniería de Software",
  "EM4461": "Microeconomía",
  "SI4360": "Organización y Administración Informática",
  "SI4491": "Redes",
  "SI4465": "Sistemas de Información Gerencial",
  // Ciclo IX
  "SI5364": "Elaboración de Proyectos Informáticos",
  "IO5365": "Metodología para el Proyecto de Investigación",
  "SI5497": "Procesos de Desarrollo de Software",
  "SI5496": "Seguridad de la Información",
  "SI5441": "Sistemas de Control y Auditoría Informática",
  "SI5365": "Tecnología y Desarrollo Web",
  "SI5370": "Microcomputadoras",
  "II5314": "Programación de Microbots",
  "SI5369": "Tratamiento Digital de Imágenes y Audio",
  // Ciclo X
  "CO5397": "Contabilidad de Costos y Presupuestos",
  "SI5367": "Desarrollo de la Investigación Informática",
  "SI5411": "Gestión en Informática",
  "SI5499": "Inteligencia de Negocios",
  "SI5498": "Sistemas Orientados a Servicios",
  "SI5368": "Tecnología y Desarrollo Móvil",
  "SI5373": "Trabajo de Investigación",
  "SI5361": "Introducción a la Inteligencia Artificial",
  "II5345": "Planeamiento y Control de Producción",
  "II5344": "Sistemas SCADA",
  "SI5371": "Taller de Servidores"
};

const informacionGrupos = {
  grupo01: { etiqueta: "Grupo 01", horario: "07:00 - 08:40", diasTexto: "Lunes, Martes (07:00-08:40) y Miércoles 1ra H (07:00-07:50)" },
  grupo02: { etiqueta: "Grupo 02", horario: "07:00 - 08:40", diasTexto: "Miércoles 2da H (07:50-08:40), Jueves y Viernes (07:00-08:40)" },
  grupo03: { etiqueta: "Grupo 03", horario: "08:50 - 10:30", diasTexto: "Lunes, Martes (08:50-10:30) y Miércoles 1ra H (08:50-09:40)" },
  grupo04: { etiqueta: "Grupo 04", horario: "08:50 - 10:30", diasTexto: "Miércoles 2da H (09:40-10:30), Jueves y Viernes (08:50-10:30)" },
  grupo05: { etiqueta: "Grupo 05", horario: "10:40 - 12:20", diasTexto: "Lunes, Martes (10:40-12:20) y Miércoles 1ra H (10:40-11:30)" },
  grupo06: { etiqueta: "Grupo 06", horario: "10:40 - 12:20", diasTexto: "Miércoles 2da H (11:30-12:20), Jueves y Viernes (10:40-12:20)" },
  grupo07: { etiqueta: "Grupo 07", horario: "01:50 - 03:30", diasTexto: "Lunes, Martes (01:50-03:30) y Miércoles 1ra H (01:50-02:40)" },
  grupo08: { etiqueta: "Grupo 08", horario: "01:50 - 03:30", diasTexto: "Miércoles 2da H (02:40-03:30), Jueves y Viernes (01:50-03:30)" },
  grupo09: { etiqueta: "Grupo 09", horario: "03:40 - 05:20", diasTexto: "Lunes, Martes (03:40-05:20) y Miércoles 1ra H (03:40-04:30)" },
  grupo10: { etiqueta: "Grupo 10", horario: "03:40 - 05:20", diasTexto: "Miércoles 2da H (04:30-05:20), Jueves y Viernes (03:40-05:20)" },
  grupo11: { etiqueta: "Grupo 11", horario: "05:30 - 07:10", diasTexto: "Lunes, Martes (05:30-07:10) y Miércoles 1ra H (05:30-06:20)" },
  grupo12: { etiqueta: "Grupo 12", horario: "05:30 - 07:10", diasTexto: "Miércoles 2da H (06:20-07:10), Jueves y Viernes (05:30-07:10)" },
  grupo13: { etiqueta: "Grupo 13", horario: "07:20 - 09:00", diasTexto: "Lunes, Martes (07:20-09:00) y Miércoles 1ra H (07:20-08:10)" },
  grupo14: { etiqueta: "Grupo 14", horario: "07:20 - 09:00", diasTexto: "Miércoles 2da H (08:10-09:00), Jueves y Viernes (07:20-09:00)" }
};

export default function HorarioMatricula() {
  const [matriculasPorSemestre, setMatriculasPorSemestre] = useState({});
  const [semestreVista, setSemestreVista] = useState(semestresDisponibles[0]);
  const [modoVista, setModoVista] = useState("grilla"); // "grilla" | "agenda" | "tarjetas"
  const [cursoResaltado, setCursoResaltado] = useState(null);
  const [cursoDetalleModal, setCursoDetalleModal] = useState(null);
  const [diaFiltroAgenda, setDiaFiltroAgenda] = useState("Lunes");
  const [esVistaCompacta, setEsVistaCompacta] = useState(false);
  const [modoDemoActivo, setModoDemoActivo] = useState(false);
  const [mensajeCopiado, setMensajeCopiado] = useState(false);

  // Días de la semana
  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  // Detección del día actual de la semana
  const diaHoyIndex = new Date().getDay(); // 1=Lunes, 2=Martes, 3=Miércoles, 4=Jueves, 5=Viernes
  const diaHoyNombre = diaHoyIndex >= 1 && diaHoyIndex <= 5 ? diasSemana[diaHoyIndex - 1] : null;

  useEffect(() => {
    const matriculas = JSON.parse(localStorage.getItem("matriculasPorSemestre") || "{}");
    if (Object.keys(matriculas).length > 0) {
      setMatriculasPorSemestre(matriculas);
      const semestreConDatos = semestresDisponibles.find((s) => matriculas[s]?.cursos?.length > 0);
      if (semestreConDatos) setSemestreVista(semestreConDatos);
    }
  }, []);

  const datosSemestreActual = useMemo(() => {
    if (modoDemoActivo) {
      return matriculaDemoEjemplo["2026-II"];
    }
    return matriculasPorSemestre[semestreVista] || { cursos: [], grupos: {} };
  }, [matriculasPorSemestre, semestreVista, modoDemoActivo]);

  // Mapa de Código de Grupo -> Datos del Curso
  const mapaGrupoActual = useMemo(() => {
    if (!datosSemestreActual.cursos || !datosSemestreActual.grupos) return {};
    const mapa = {};
    datosSemestreActual.cursos.forEach((cursoId, indice) => {
      const grupoAsignado = datosSemestreActual.grupos[cursoId];
      if (grupoAsignado) {
        const estilo = paletaColoresNuevos[indice % paletaColoresNuevos.length];
        mapa[grupoAsignado] = {
          cursoId,
          nombre: nombresCursosCatalogo[cursoId] || cursoId,
          grupo: grupoAsignado,
          infoGrupo: informacionGrupos[grupoAsignado],
          estilo
        };
      }
    });
    return mapa;
  }, [datosSemestreActual]);

  const tieneDatos = Object.keys(mapaGrupoActual).length > 0;

  // Cálculo de Estadísticas del Horario
  const estadisticasHorario = useMemo(() => {
    const totalCursos = datosSemestreActual.cursos?.length || 0;
    // Cada bloque ocupado son 1.66 horas de clase
    const totalBloques = Object.keys(mapaGrupoActual).length * 3;
    const totalHorasLectivas = Math.round(totalBloques * 1.67);

    // Conteo por día
    const conteoPorDia = { Lunes: 0, Martes: 0, Miércoles: 0, Jueves: 0, Viernes: 0 };
    estructuraHorarioClases.forEach((fila) => {
      if (fila.tipoFila !== "clase") return;
      if (mapaGrupoActual[fila.diaLunes]) conteoPorDia["Lunes"]++;
      if (mapaGrupoActual[fila.diaMartes]) conteoPorDia["Martes"]++;
      if (mapaGrupoActual[fila.diaMiercolesPrimeraHora] || mapaGrupoActual[fila.diaMiercolesSegundaHora]) conteoPorDia["Miércoles"]++;
      if (mapaGrupoActual[fila.diaJueves]) conteoPorDia["Jueves"]++;
      if (mapaGrupoActual[fila.diaViernes]) conteoPorDia["Viernes"]++;
    });

    let diaMasCargado = "Ninguno";
    let maxClases = -1;
    Object.entries(conteoPorDia).forEach(([dia, cant]) => {
      if (cant > maxClases && cant > 0) {
        maxClases = cant;
        diaMasCargado = dia;
      }
    });

    return {
      totalCursos,
      totalHorasLectivas,
      diaMasCargado,
      conteoPorDia
    };
  }, [datosSemestreActual, mapaGrupoActual]);

  // Manejador de Impresión
  const manejarImprimir = () => {
    window.print();
  };

  // Copiar Resumen de Horario al Portapapeles
  const manejarCopiarResumen = () => {
    let resumen = `📌 HORARIO ACADÉMICO UNP - SEMESTRE ${semestreVista}\n`;
    resumen += `───────────────────────────────────────────\n`;

    Object.values(mapaGrupoActual).forEach((c) => {
      resumen += `• ${c.nombre} (${c.cursoId})\n  ${c.infoGrupo.etiqueta} | ${c.infoGrupo.horario} | ${c.infoGrupo.diasTexto}\n\n`;
    });

    navigator.clipboard.writeText(resumen);
    setMensajeCopiado(true);
    setTimeout(() => setMensajeCopiado(false), 3000);
  };

  // Renderizador de Celdas de la Grilla
  const renderizarCeldaGrilla = (codigoGrupo, diaNombre, horaEspecifica) => {
    const datos = mapaGrupoActual[codigoGrupo];

    if (!datos) {
      return (
        <div className="min-h-[56px] flex items-center justify-center text-[11px] text-slate-700/60 font-mono select-none group-hover:text-slate-600 transition-colors">
          —
        </div>
      );
    }

    const esDestacado = cursoResaltado === datos.cursoId;
    const esOpaco = cursoResaltado && cursoResaltado !== datos.cursoId;
    const horarioMostrar = horaEspecifica || datos.infoGrupo.horario;

    return (
      <div
        onClick={() => setCursoDetalleModal({ ...datos, horaActualModal: horarioMostrar })}
        onMouseEnter={() => setCursoResaltado(datos.cursoId)}
        onMouseLeave={() => setCursoResaltado(null)}
        className={`p-2.5 rounded-2xl border min-h-[58px] flex flex-col justify-center text-center cursor-pointer transition-all duration-200 relative group overflow-hidden ${
          datos.estilo.card
        } ${esDestacado ? datos.estilo.glow : ""} ${esOpaco ? "opacity-35 scale-[0.98] blur-[0.3px]" : ""}`}
      >
        <div className="flex items-center justify-between space-x-1 mb-1">
          <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border backdrop-blur-md ${datos.estilo.badge}`}>
            {datos.cursoId}
          </span>
          <span className="text-[9px] font-bold text-slate-300 group-hover:text-white transition-colors">
            {datos.infoGrupo.etiqueta}
          </span>
        </div>

        <div className={`text-[11px] font-extrabold tracking-tight leading-snug line-clamp-2 ${esDestacado ? "text-white" : ""}`}>
          {datos.nombre}
        </div>

        {!esVistaCompacta && (
          <div className="text-[9px] opacity-75 font-mono mt-1 flex items-center justify-center space-x-1">
            <Clock className="w-2.5 h-2.5 opacity-70" />
            <span>{horarioMostrar}</span>
          </div>
        )}
      </div>
    );
  };

  // Construcción de Lista para Vista Agenda Timeline
  const bloquesPorDiaAgenda = useMemo(() => {
    const mapaAgenda = { Lunes: [], Martes: [], Miércoles: [], Jueves: [], Viernes: [] };

    estructuraHorarioClases.forEach((fila) => {
      if (fila.tipoFila === "clase") {
        if (mapaGrupoActual[fila.diaLunes]) {
          mapaAgenda.Lunes.push({ hora: fila.rangoHorario, curso: mapaGrupoActual[fila.diaLunes] });
        }
        if (mapaGrupoActual[fila.diaMartes]) {
          mapaAgenda.Martes.push({ hora: fila.rangoHorario, curso: mapaGrupoActual[fila.diaMartes] });
        }
        if (mapaGrupoActual[fila.diaMiercolesPrimeraHora]) {
          mapaAgenda.Miércoles.push({ hora: `${fila.primeraHoraPedagogica} (1ra Hora)`, curso: mapaGrupoActual[fila.diaMiercolesPrimeraHora] });
        }
        if (mapaGrupoActual[fila.diaMiercolesSegundaHora]) {
          mapaAgenda.Miércoles.push({ hora: `${fila.segundaHoraPedagogica} (2da Hora)`, curso: mapaGrupoActual[fila.diaMiercolesSegundaHora] });
        }
        if (mapaGrupoActual[fila.diaJueves]) {
          mapaAgenda.Jueves.push({ hora: fila.rangoHorario, curso: mapaGrupoActual[fila.diaJueves] });
        }
        if (mapaGrupoActual[fila.diaViernes]) {
          mapaAgenda.Viernes.push({ hora: fila.rangoHorario, curso: mapaGrupoActual[fila.diaViernes] });
        }
      } else {
        // Receso / Almuerzo
        const itemPausa = { hora: fila.unicaHora, esPausa: true, tipo: fila.tipoFila };
        mapaAgenda.Lunes.push(itemPausa);
        mapaAgenda.Martes.push(itemPausa);
        mapaAgenda.Miércoles.push(itemPausa);
        mapaAgenda.Jueves.push(itemPausa);
        mapaAgenda.Viernes.push(itemPausa);
      }
    });

    return mapaAgenda;
  }, [mapaGrupoActual]);

  return (
    <div className="space-y-6">
      {/* CSS optimizado para Impresión */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .print-container { background: white !important; border: none !important; box-shadow: none !important; padding: 0 !important; }
          .print-table { border-collapse: collapse !important; width: 100% !important; }
          .print-table th, .print-table td { border: 1px solid #cbd5e1 !important; color: #0f172a !important; padding: 6px !important; }
        }
      `}</style>

      {/* Header Principal */}
      <div className="bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 shadow-xl backdrop-blur-2xl space-y-6 no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CALENDARIO SEMANAL & HORARIO DE CLASES</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center space-x-3">
              <span>Mi Horario Universitario</span>
              {diaHoyNombre && (
                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Hoy es {diaHoyNombre}</span>
                </span>
              )}
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Visualización interactiva, sincronizada automáticamente con tu plan de estudios y matrícula.
            </p>
          </div>

          {/* Acciones principales del Header */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Botón Cargar Demo cuando no hay matrícula */}
            {!tieneDatos && !modoDemoActivo && (
              <button
                type="button"
                onClick={() => setModoDemoActivo(true)}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-black rounded-2xl shadow-lg shadow-blue-600/25 transition-all flex items-center space-x-2 cursor-pointer active:scale-95"
              >
                <Zap className="w-4 h-4" />
                <span>Cargar Horario de Ejemplo (Demo)</span>
              </button>
            )}

            {modoDemoActivo && (
              <button
                type="button"
                onClick={() => setModoDemoActivo(false)}
                className="px-3.5 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-2xl transition-all flex items-center space-x-2 cursor-pointer hover:bg-amber-500/20"
              >
                <X className="w-4 h-4" />
                <span>Desactivar Demo</span>
              </button>
            )}

            {/* Selector de Semestres */}
            <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
              {semestresDisponibles.map((sem) => {
                const tieneMatriculaGuardada = matriculasPorSemestre[sem]?.cursos?.length > 0;
                return (
                  <button
                    key={sem}
                    type="button"
                    onClick={() => {
                      setSemestreVista(sem);
                      setModoDemoActivo(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                      semestreVista === sem && !modoDemoActivo
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span>{sem}</span>
                    {tieneMatriculaGuardada && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                  </button>
                );
              })}
            </div>

            {/* Copiar Resumen */}
            {tieneDatos && (
              <button
                type="button"
                onClick={manejarCopiarResumen}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-2xl border border-slate-700 transition-all flex items-center space-x-2 cursor-pointer shadow-sm"
                title="Copiar horario en formato texto"
              >
                {mensajeCopiado ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
                <span>{mensajeCopiado ? "¡Copiado!" : "Copiar"}</span>
              </button>
            )}

            {/* Imprimir */}
            {tieneDatos && (
              <button
                type="button"
                onClick={manejarImprimir}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-2xl border border-slate-700 transition-all flex items-center space-x-2 cursor-pointer shadow-sm"
              >
                <Printer className="w-4 h-4 text-sky-400" />
                <span>Imprimir</span>
              </button>
            )}
          </div>
        </div>

        {/* Tarjetas de Métricas / KPIs */}
        {tieneDatos && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
            <div className="bg-slate-950/80 rounded-2xl p-3.5 border border-slate-800/80 flex items-center space-x-3 shadow-inner">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-white leading-none">{estadisticasHorario.totalCursos}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Asignaturas</div>
              </div>
            </div>

            <div className="bg-slate-950/80 rounded-2xl p-3.5 border border-slate-800/80 flex items-center space-x-3 shadow-inner">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-emerald-400 leading-none">~{estadisticasHorario.totalHorasLectivas} hrs</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Carga Semanal</div>
              </div>
            </div>

            <div className="bg-slate-950/80 rounded-2xl p-3.5 border border-slate-800/80 flex items-center space-x-3 shadow-inner">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-purple-300 leading-none truncate max-w-[110px]">{estadisticasHorario.diaMasCargado}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Día Más Cargado</div>
              </div>
            </div>

            <div className="bg-slate-950/80 rounded-2xl p-3.5 border border-slate-800/80 flex items-center space-x-3 shadow-inner">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-amber-300 leading-none">07:00 - 21:00</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Rango Horario</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selector de Modo de Vista y Opciones */}
      {tieneDatos && (
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3 shadow-xl backdrop-blur-2xl flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          {/* Conmutador de 3 Vistas */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setModoVista("grilla")}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-black transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                modoVista === "grilla" ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "text-slate-400 hover:text-white"
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Grilla Semanal</span>
            </button>

            <button
              type="button"
              onClick={() => setModoVista("agenda")}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-black transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                modoVista === "agenda" ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "text-slate-400 hover:text-white"
              }`}
            >
              <List className="w-4 h-4" />
              <span>Agenda por Día</span>
            </button>

            <button
              type="button"
              onClick={() => setModoVista("tarjetas")}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-black transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                modoVista === "tarjetas" ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Mis Asignaturas</span>
            </button>
          </div>

          {/* Opciones de la grilla (Compacto / Tip) */}
          {modoVista === "grilla" && (
            <div className="flex items-center space-x-4 text-xs">
              <button
                type="button"
                onClick={() => setEsVistaCompacta(!esVistaCompacta)}
                className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  esVistaCompacta
                    ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{esVistaCompacta ? "Vista Detallada" : "Vista Compacta"}</span>
              </button>

              <span className="text-[11px] text-slate-400 hidden md:inline-flex items-center space-x-1 font-semibold">
                <Info className="w-3.5 h-3.5 text-blue-400" />
                <span>Pasa el cursor sobre un curso para resaltarlo en toda la semana</span>
              </span>
            </div>
          )}

          {/* Filtro de día para Vista Agenda */}
          {modoVista === "agenda" && (
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
              {diasSemana.map((dia) => (
                <button
                  key={dia}
                  type="button"
                  onClick={() => setDiaFiltroAgenda(dia)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-black transition-all whitespace-nowrap cursor-pointer ${
                    diaFiltroAgenda === dia
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {dia}
                  {diaHoyNombre === dia && <span className="ml-1.5 text-emerald-400">•</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mensaje de Estado Vacío (Sin Datos) */}
      {!tieneDatos && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-12 text-center shadow-xl backdrop-blur-2xl space-y-4 no-print">
          <div className="w-20 h-20 rounded-3xl bg-slate-800/80 border border-slate-700 mx-auto flex items-center justify-center text-blue-400 shadow-inner">
            <Calendar className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black text-white">Tu Horario está actualmente vacío</h3>
            <p className="text-xs md:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              No se han encontrado registros de matrícula activa para el semestre <strong className="text-blue-400">{semestreVista}</strong>.
            </p>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setModoDemoActivo(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-black text-xs transition-all shadow-lg shadow-blue-600/20 flex items-center space-x-2 cursor-pointer active:scale-95"
            >
              <Zap className="w-4 h-4" />
              <span>Ver Horario de Ejemplo (Demo)</span>
            </button>

            <Link
              to="/estudiante/matricula"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs border border-slate-700 transition-all flex items-center space-x-2 shadow-sm"
            >
              <span>Ir a Módulo de Matrícula</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* VISTA 1: GRILLA SEMANAL (CALENDAR GRID) */}
      {tieneDatos && modoVista === "grilla" && (
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-3xl shadow-xl overflow-hidden p-4 md:p-6 backdrop-blur-2xl print-container">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[960px] text-xs print-table">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-black text-slate-400 uppercase tracking-wider bg-slate-950/80">
                  <th className="py-4 px-4 text-left w-44 border-r border-slate-800">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span>Bloque Horario</span>
                    </div>
                  </th>
                  {diasSemana.map((dia) => {
                    const esHoy = diaHoyNombre === dia;
                    return (
                      <th
                        key={dia}
                        className={`py-4 px-3 text-center border-r border-slate-800/80 relative ${
                          esHoy ? "bg-emerald-500/10 text-emerald-300 font-black" : ""
                        }`}
                        colSpan={dia === "Miércoles" ? 2 : 1}
                      >
                        <div className="flex items-center justify-center space-x-1.5">
                          <span>{dia}</span>
                          {esHoy && (
                            <span className="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/30 text-emerald-300 font-extrabold">
                              Hoy
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
                <tr className="border-b border-slate-800/80 text-[9px] text-slate-500 bg-slate-950/40">
                  <th className="border-r border-slate-800"></th>
                  <th></th>
                  <th></th>
                  <th className="py-1.5 text-center font-bold border-r border-dashed border-slate-800/80 text-blue-400">1ra Hora</th>
                  <th className="py-1.5 text-center font-bold text-sky-400">2da Hora</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {estructuraHorarioClases.map((fila) => {
                  if (fila.tipoFila === "recreo" || fila.tipoFila === "almuerzo") {
                    return (
                      <tr
                        key={fila.identificadorFila}
                        className={`text-[11px] ${
                          fila.tipoFila === "almuerzo"
                            ? "bg-gradient-to-r from-sky-950/50 via-slate-900 to-sky-950/50 text-sky-300 border-y border-sky-800/40"
                            : "bg-slate-950/80 text-slate-400 border-y border-slate-800/60"
                        }`}
                      >
                        <td className="py-2.5 px-4 font-mono font-bold border-r border-slate-800 flex items-center space-x-2">
                          <Clock className="w-3.5 h-3.5 opacity-60" />
                          <span>{fila.unicaHora}</span>
                        </td>
                        <td colSpan={6} className="text-center font-extrabold tracking-widest uppercase py-2">
                          {fila.tipoFila === "almuerzo" ? (
                            <span className="inline-flex items-center space-x-2 text-sky-300 bg-sky-500/10 px-4 py-1 rounded-full border border-sky-500/20 shadow-sm">
                              <Utensils className="w-4 h-4" />
                              <span>Horario de Almuerzo Universitario</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-2 text-slate-400 bg-slate-800/60 px-4 py-1 rounded-full border border-slate-700/50 shadow-sm">
                              <Coffee className="w-3.5 h-3.5 text-amber-400" />
                              <span>Receso / Intermedio</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={fila.identificadorFila} className="border-b border-slate-800/60 hover:bg-slate-800/20 transition-colors">
                      <td className="py-3 px-4 border-r border-slate-800 align-middle">
                        <div className="text-[11px] font-black text-slate-200">{fila.primeraHoraPedagogica}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 font-mono font-semibold">{fila.segundaHoraPedagogica}</div>
                      </td>
                      <td className="p-2">{renderizarCeldaGrilla(fila.diaLunes, "Lunes", fila.rangoHorario)}</td>
                      <td className="p-2">{renderizarCeldaGrilla(fila.diaMartes, "Martes", fila.rangoHorario)}</td>
                      <td className="p-2 border-r border-dashed border-slate-800/80">{renderizarCeldaGrilla(fila.diaMiercolesPrimeraHora, "Miércoles", fila.primeraHoraPedagogica)}</td>
                      <td className="p-2">{renderizarCeldaGrilla(fila.diaMiercolesSegundaHora, "Miércoles", fila.segundaHoraPedagogica)}</td>
                      <td className="p-2">{renderizarCeldaGrilla(fila.diaJueves, "Jueves", fila.rangoHorario)}</td>
                      <td className="p-2">{renderizarCeldaGrilla(fila.diaViernes, "Viernes", fila.rangoHorario)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VISTA 2: AGENDA TIMELINE POR DÍA */}
      {tieneDatos && modoVista === "agenda" && (
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-3xl shadow-xl p-6 backdrop-blur-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-lg font-black text-white flex items-center space-x-2">
                <span>Cronograma del {diaFiltroAgenda}</span>
                {diaHoyNombre === diaFiltroAgenda && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-black">
                    ¡Día Actual!
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Clases organizadas secuencialmente por bloque de hora.
              </p>
            </div>
            <span className="text-xs font-black text-slate-400 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800">
              {bloquesPorDiaAgenda[diaFiltroAgenda]?.filter((b) => !b.esPausa).length || 0} Sesiones
            </span>
          </div>

          <div className="space-y-4">
            {bloquesPorDiaAgenda[diaFiltroAgenda]?.map((item, idx) => {
              if (item.esPausa) {
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-extrabold ${
                      item.tipo === "almuerzo"
                        ? "bg-sky-950/40 border-sky-900/50 text-sky-300"
                        : "bg-slate-950/40 border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {item.tipo === "almuerzo" ? <Utensils className="w-4 h-4 text-sky-400" /> : <Coffee className="w-4 h-4 text-amber-400" />}
                      <span>{item.tipo === "almuerzo" ? "Horario de Almuerzo" : "Receso"}</span>
                    </div>
                    <span className="font-mono text-[11px]">{item.hora}</span>
                  </div>
                );
              }

              const c = item.curso;
              return (
                <div
                  key={idx}
                  onClick={() => setCursoDetalleModal(c)}
                  className={`p-5 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-all hover:scale-[1.01] ${c.estilo.card}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950/80 border border-slate-700/60 flex items-center justify-center font-bold text-sm shrink-0 shadow-inner">
                      <BookOpen className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border ${c.estilo.badge}`}>
                          {c.cursoId}
                        </span>
                        <span className="text-xs font-black text-slate-300">{c.infoGrupo.etiqueta}</span>
                      </div>
                      <h3 className="text-base font-black text-white mt-1 leading-snug">{c.nombre}</h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end space-x-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800/60">
                    <div className="text-left md:text-right font-mono">
                      <div className="text-xs font-black text-slate-200 flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>{item.hora}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-sans font-semibold">{c.infoGrupo.diasTexto}</div>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-sm">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VISTA 3: TARJETAS DE ASIGNATURAS */}
      {tieneDatos && modoVista === "tarjetas" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(mapaGrupoActual).map((c) => (
            <div
              key={c.cursoId}
              onClick={() => setCursoDetalleModal(c)}
              className={`p-6 rounded-3xl border space-y-4 cursor-pointer transition-all hover:scale-[1.02] ${c.estilo.card}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${c.estilo.badge}`}>
                  {c.cursoId}
                </span>
                <span className="text-xs font-black px-3 py-1 rounded-xl bg-slate-950/80 border border-slate-700 text-slate-200">
                  {c.infoGrupo.etiqueta}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white leading-tight">{c.nombre}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center space-x-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>{c.infoGrupo.horario}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 font-medium">Días de dictado:</span>
                  <span className="font-bold text-slate-100">{c.infoGrupo.diasTexto}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 font-medium">Horas por semana:</span>
                  <span className="font-extrabold text-emerald-400">~6 hrs pedagógicas</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Detalle de Curso al hacer clic */}
      {cursoDetalleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative overflow-hidden">
            <button
              type="button"
              onClick={() => setCursoDetalleModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start space-x-4">
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-white font-black text-lg shrink-0 shadow-lg ${cursoDetalleModal.estilo.solido}`}>
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="pr-8">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg border ${cursoDetalleModal.estilo.badge}`}>
                    {cursoDetalleModal.cursoId}
                  </span>
                  <span className="text-xs font-black text-slate-300">{cursoDetalleModal.infoGrupo.etiqueta}</span>
                </div>
                <h3 className="text-xl font-black text-white mt-1 leading-snug">{cursoDetalleModal.nombre}</h3>
              </div>
            </div>

            <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400 font-medium">Horario Regular:</span>
                <span className="font-mono font-bold text-blue-400">{cursoDetalleModal.infoGrupo.horario}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400 font-medium">Frecuencia Semanal:</span>
                <span className="font-bold text-slate-200">{cursoDetalleModal.infoGrupo.diasTexto}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400 font-medium">Estado en Matrícula:</span>
                <span className="font-extrabold text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Inscrito ({semestreVista})</span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setCursoDetalleModal(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-black text-xs rounded-xl border border-slate-700 transition-all cursor-pointer shadow-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
