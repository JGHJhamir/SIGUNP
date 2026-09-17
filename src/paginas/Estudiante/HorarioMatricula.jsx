import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTema } from "../../contexto/ContextoTema";
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

// Paleta de estilos por asignatura (Gradientes vibrantes para modo claro y dark mode elegante)
const paletaColoresNuevos = [
  {
    badge: "bg-blue-600 text-white border-blue-700 dark:bg-blue-500/25 dark:text-blue-300 dark:border-blue-500/40 border shadow-sm font-extrabold",
    card: "bg-gradient-to-br from-blue-100/90 via-blue-50 to-sky-100/80 dark:from-blue-950/90 dark:via-blue-900/50 dark:to-slate-950/90 border-blue-300 dark:border-blue-500/50 text-blue-950 dark:text-blue-100 hover:border-blue-500 dark:hover:border-blue-400 shadow-md shadow-blue-500/10",
    solido: "bg-blue-600 text-white",
    glow: "shadow-blue-500/40 border-blue-500 ring-2 ring-blue-500/60 scale-[1.02]",
    tag: "Blue"
  },
  {
    badge: "bg-emerald-600 text-white border-emerald-700 dark:bg-emerald-500/25 dark:text-emerald-300 dark:border-emerald-500/40 border shadow-sm font-extrabold",
    card: "bg-gradient-to-br from-emerald-100/90 via-emerald-50 to-teal-100/80 dark:from-emerald-950/90 dark:via-teal-900/50 dark:to-slate-950/90 border-emerald-300 dark:border-emerald-500/50 text-emerald-950 dark:text-emerald-100 hover:border-emerald-500 dark:hover:border-emerald-400 shadow-md shadow-emerald-500/10",
    solido: "bg-emerald-600 text-white",
    glow: "shadow-emerald-500/40 border-emerald-500 ring-2 ring-emerald-500/60 scale-[1.02]",
    tag: "Emerald"
  },
  {
    badge: "bg-purple-600 text-white border-purple-700 dark:bg-purple-500/25 dark:text-purple-300 dark:border-purple-500/40 border shadow-sm font-extrabold",
    card: "bg-gradient-to-br from-purple-100/90 via-purple-50 to-violet-100/80 dark:from-purple-950/90 dark:via-violet-900/50 dark:to-slate-950/90 border-purple-300 dark:border-purple-500/50 text-purple-950 dark:text-purple-100 hover:border-purple-500 dark:hover:border-purple-400 shadow-md shadow-purple-500/10",
    solido: "bg-purple-600 text-white",
    glow: "shadow-purple-500/40 border-purple-500 ring-2 ring-purple-500/60 scale-[1.02]",
    tag: "Purple"
  },
  {
    badge: "bg-amber-600 text-white border-amber-700 dark:bg-amber-500/25 dark:text-amber-300 dark:border-amber-500/40 border shadow-sm font-extrabold",
    card: "bg-gradient-to-br from-amber-100/90 via-amber-50 to-orange-100/80 dark:from-amber-950/90 dark:via-orange-900/50 dark:to-slate-950/90 border-amber-300 dark:border-amber-500/50 text-amber-950 dark:text-amber-100 hover:border-amber-500 dark:hover:border-amber-400 shadow-md shadow-amber-500/10",
    solido: "bg-amber-600 text-white",
    glow: "shadow-amber-500/40 border-amber-500 ring-2 ring-amber-500/60 scale-[1.02]",
    tag: "Amber"
  },
  {
    badge: "bg-rose-600 text-white border-rose-700 dark:bg-rose-500/25 dark:text-rose-300 dark:border-rose-500/40 border shadow-sm font-extrabold",
    card: "bg-gradient-to-br from-rose-100/90 via-rose-50 to-pink-100/80 dark:from-rose-950/90 dark:via-red-900/50 dark:to-slate-950/90 border-rose-300 dark:border-rose-500/50 text-rose-950 dark:text-rose-100 hover:border-rose-500 dark:hover:border-rose-400 shadow-md shadow-rose-500/10",
    solido: "bg-rose-600 text-white",
    glow: "shadow-rose-500/40 border-rose-500 ring-2 ring-rose-500/60 scale-[1.02]",
    tag: "Rose"
  },
  {
    badge: "bg-cyan-600 text-white border-cyan-700 dark:bg-sky-500/25 dark:text-sky-300 dark:border-sky-500/40 border shadow-sm font-extrabold",
    card: "bg-gradient-to-br from-cyan-100/90 via-sky-50 to-teal-100/80 dark:from-sky-950/90 dark:via-cyan-900/50 dark:to-slate-950/90 border-cyan-300 dark:border-sky-500/50 text-cyan-950 dark:text-sky-100 hover:border-cyan-500 dark:hover:border-sky-400 shadow-md shadow-cyan-500/10",
    solido: "bg-cyan-600 text-white",
    glow: "shadow-cyan-500/40 border-cyan-500 ring-2 ring-cyan-500/60 scale-[1.02]",
    tag: "Sky"
  },
  {
    badge: "bg-indigo-600 text-white border-indigo-700 dark:bg-indigo-500/25 dark:text-indigo-300 dark:border-indigo-500/40 border shadow-sm font-extrabold",
    card: "bg-gradient-to-br from-indigo-100/90 via-indigo-50 to-blue-100/80 dark:from-indigo-950/90 dark:via-blue-900/50 dark:to-slate-950/90 border-indigo-300 dark:border-indigo-500/50 text-indigo-950 dark:text-indigo-100 hover:border-indigo-500 dark:hover:border-indigo-400 shadow-md shadow-indigo-500/10",
    solido: "bg-indigo-600 text-white",
    glow: "shadow-indigo-500/40 border-indigo-500 ring-2 ring-indigo-500/60 scale-[1.02]",
    tag: "Indigo"
  }
];

const semestresDisponibles = ["2026-II", "2027-I", "2027-II", "2028-I"];

// Datos Demo por omisión en caso de no tener matrícula guardada
const matriculaDemoEjemplo = {
  "2026-II": {
    cursos: ["SI2418", "MA2333", "ES2300", "FI2411", "SI2452"],
    grupos: {
      "SI2418": "grupo01",
      "MA2333": "grupo04",
      "ES2300": "grupo05",
      "FI2411": "grupo08",
      "SI2452": "grupo09"
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
  const { tema } = useTema();
  const [matriculasPorSemestre, setMatriculasPorSemestre] = useState({});
  const [semestreVista, setSemestreVista] = useState(semestresDisponibles[0]);
  const [modoVista, setModoVista] = useState("grilla"); // "grilla" | "agenda" | "tarjetas"
  const [cursoResaltado, setCursoResaltado] = useState(null);
  const [cursoDetalleModal, setCursoDetalleModal] = useState(null);
  const [diaFiltroAgenda, setDiaFiltroAgenda] = useState("Lunes");
  const [esVistaCompacta, setEsVistaCompacta] = useState(false);
  const [ocultarHorasVacias, setOcultarHorasVacias] = useState(true);
  const [modoDemoActivo, setModoDemoActivo] = useState(false);
  const [mensajeCopiado, setMensajeCopiado] = useState(false);

  // Días de la semana
  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  // Detección del día actual de la semana
  const diaHoyIndex = new Date().getDay(); // 1=Lunes, 2=Martes, 3=Miércoles, 4=Jueves, 5=Viernes
  const diaHoyNombre = diaHoyIndex >= 1 && diaHoyIndex <= 5 ? diasSemana[diaHoyIndex - 1] : null;

  useEffect(() => {
    let matriculas = JSON.parse(localStorage.getItem("matriculasPorSemestre") || "null");
    if (!matriculas || Object.keys(matriculas).length === 0) {
      matriculas = matriculaDemoEjemplo;
      localStorage.setItem("matriculasPorSemestre", JSON.stringify(matriculas));
    }
    setMatriculasPorSemestre(matriculas);
    const semestreConDatos = semestresDisponibles.find((s) => matriculas[s]?.cursos?.length > 0);
    if (semestreConDatos) setSemestreVista(semestreConDatos);
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

  // Filtrado automático de bloques sin clases (ocultar horas vacías temprano/tarde)
  const estructuraHorarioFiltrada = useMemo(() => {
    if (!ocultarHorasVacias || !tieneDatos) {
      return estructuraHorarioClases;
    }

    const indicesOcupados = [];
    estructuraHorarioClases.forEach((fila, idx) => {
      if (fila.tipoFila === "clase") {
        const tieneClase =
          mapaGrupoActual[fila.diaLunes] ||
          mapaGrupoActual[fila.diaMartes] ||
          mapaGrupoActual[fila.diaMiercolesPrimeraHora] ||
          mapaGrupoActual[fila.diaMiercolesSegundaHora] ||
          mapaGrupoActual[fila.diaJueves] ||
          mapaGrupoActual[fila.diaViernes];
        if (tieneClase) {
          indicesOcupados.push(idx);
        }
      }
    });

    if (indicesOcupados.length === 0) return estructuraHorarioClases;

    const primerIndice = Math.min(...indicesOcupados);
    const ultimoIndice = Math.max(...indicesOcupados);

    return estructuraHorarioClases.slice(primerIndice, ultimoIndice + 1);
  }, [ocultarHorasVacias, mapaGrupoActual, tieneDatos]);

  // Cálculo del rango de horas mostrado
  const rangoHorarioTexto = useMemo(() => {
    if (!estructuraHorarioFiltrada || estructuraHorarioFiltrada.length === 0) return "07:00 - 21:00";
    const primeraFila = estructuraHorarioFiltrada[0];
    const ultimaFila = estructuraHorarioFiltrada[estructuraHorarioFiltrada.length - 1];

    const horaInicio = primeraFila.rangoHorario
      ? primeraFila.rangoHorario.split(" - ")[0]
      : primeraFila.unicaHora?.split(" - ")[0]?.replace(" a.m.", "")?.replace(" p.m.", "") || "07:00";

    const horaFin = ultimaFila.rangoHorario
      ? ultimaFila.rangoHorario.split(" - ")[1]
      : ultimaFila.unicaHora?.split(" - ")[1]?.replace(" a.m.", "")?.replace(" p.m.", "") || "21:00";

    return `${horaInicio} - ${horaFin}`;
  }, [estructuraHorarioFiltrada]);

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
  const renderizarCeldaGrilla = (codigoGrupo, diaNombre, horaEspecifica, esSubHora = false) => {
    const datos = mapaGrupoActual[codigoGrupo];

    if (!datos) {
      return (
        <div className={`h-full ${esSubHora ? 'min-h-[42px]' : 'min-h-[88px]'} flex items-center justify-center text-[11px] ${
          tema === 'dark' ? 'text-slate-600' : 'text-slate-300'
        } font-mono select-none`}>
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
        className={`p-1.5 sm:p-2 rounded-xl border h-full ${
          esSubHora ? 'min-h-[42px]' : 'min-h-[88px]'
        } flex flex-col justify-center text-center cursor-pointer transition-all duration-200 relative group overflow-hidden ${
          datos.estilo.card
        } ${esDestacado ? datos.estilo.glow : ""} ${esOpaco ? "opacity-30 scale-[0.98] blur-[0.3px]" : ""}`}
      >
        <div className="flex items-center justify-between space-x-1 mb-0.5">
          <span className={`text-[9px] px-1.5 py-0.5 rounded-md border ${datos.estilo.badge}`}>
            {datos.cursoId}
          </span>
          <span className={`text-[9px] font-extrabold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} group-hover:opacity-100 transition-colors`}>
            {datos.infoGrupo.etiqueta}
          </span>
        </div>

        <div className={`text-[11px] font-extrabold tracking-tight leading-tight line-clamp-2 ${
          esDestacado ? (tema === 'dark' ? "text-white" : "text-slate-950") : ""
        }`}>
          {datos.nombre}
        </div>

        {!esVistaCompacta && !esSubHora && (
          <div className={`text-[9px] font-mono mt-1 flex items-center justify-center space-x-1 ${
            tema === 'dark' ? 'text-slate-300/80' : 'text-slate-700/80'
          }`}>
            <Clock className="w-2.5 h-2.5 opacity-75" />
            <span>{horarioMostrar}</span>
          </div>
        )}
      </div>
    );
  };

  // Construcción de Lista para Vista Agenda Timeline
  const bloquesPorDiaAgenda = useMemo(() => {
    const mapaAgenda = { Lunes: [], Martes: [], Miércoles: [], Jueves: [], Viernes: [] };

    estructuraHorarioFiltrada.forEach((fila) => {
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
  }, [mapaGrupoActual, estructuraHorarioFiltrada]);

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
      <div className={`rounded-2xl border ${
        tema === 'dark' ? 'bg-[#0e1526] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      } p-5 sm:p-6 md:p-8 space-y-6 no-print transition-colors`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-xs font-bold mb-2">
              <span>CALENDARIO SEMANAL & HORARIO DE CLASES</span>
            </div>
            <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center space-x-3`}>
              <span>Mi Horario Universitario</span>
              {diaHoyNombre && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Hoy es {diaHoyNombre}</span>
                </span>
              )}
            </h1>
            <p className={`text-xs sm:text-sm ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
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
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-2 cursor-pointer shadow-sm"
              >
                <Zap className="w-4 h-4" />
                <span>Cargar Horario de Ejemplo (Demo)</span>
              </button>
            )}

            {modoDemoActivo && (
              <button
                type="button"
                onClick={() => setModoDemoActivo(false)}
                className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer hover:bg-amber-500/20"
              >
                <X className="w-3.5 h-3.5" />
                <span>Desactivar Demo</span>
              </button>
            )}

            {/* Selector de Semestres */}
            <div className={`flex ${tema === 'dark' ? 'bg-[#090e1a] border-slate-800' : 'bg-slate-100 border-slate-200'} p-1 rounded-xl border overflow-x-auto no-scrollbar max-w-full`}>
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                      semestreVista === sem && !modoDemoActivo
                        ? "bg-blue-600 text-white shadow-sm"
                        : tema === 'dark' ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span>{sem}</span>
                    {tieneMatriculaGuardada && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                  </button>
                );
              })}
            </div>

            {/* Copiar Resumen */}
            {tieneDatos && (
              <button
                type="button"
                onClick={manejarCopiarResumen}
                className={`px-3 py-1.5 ${
                  tema === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                } text-xs font-bold rounded-xl border transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm`}
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
                <div className="text-sm font-black text-amber-300 leading-none">{rangoHorarioTexto}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Rango Horario</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selector de Modo de Vista y Opciones */}
      {tieneDatos && (
        <div className={`border ${tema === 'dark' ? 'bg-[#0e1526] border-slate-800' : 'bg-white border-slate-200 shadow-sm'} rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 no-print`}>
          {/* Conmutador de 3 Vistas */}
          <div className={`flex ${tema === 'dark' ? 'bg-[#090e1a] border-slate-800' : 'bg-slate-100 border-slate-200'} p-1 rounded-xl border w-full sm:w-auto`}>
            <button
              type="button"
              onClick={() => setModoVista("grilla")}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                modoVista === "grilla" ? "bg-blue-600 text-white shadow-sm" : tema === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Grilla Semanal</span>
            </button>

            <button
              type="button"
              onClick={() => setModoVista("agenda")}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                modoVista === "agenda" ? "bg-blue-600 text-white shadow-sm" : tema === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <List className="w-4 h-4" />
              <span>Agenda por Día</span>
            </button>

            <button
              type="button"
              onClick={() => setModoVista("tarjetas")}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                modoVista === "tarjetas" ? "bg-blue-600 text-white shadow-sm" : tema === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Mis Asignaturas</span>
            </button>
          </div>

          {/* Opciones de la grilla (Ocultar Vacías / Compacto / Tip) */}
          {modoVista === "grilla" && (
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setOcultarHorasVacias(!ocultarHorasVacias)}
                className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  ocultarHorasVacias
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-300"
                    : tema === 'dark' ? "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
                title="Oculta automáticamente las horas vacías sin clases para optimizar espacio"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                <span>{ocultarHorasVacias ? "Ocultar Horas Vacías: ON" : "Mostrar Todo (07:00 - 21:00)"}</span>
              </button>

              <button
                type="button"
                onClick={() => setEsVistaCompacta(!esVistaCompacta)}
                className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  esVistaCompacta
                    ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                    : tema === 'dark' ? "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{esVistaCompacta ? "Vista Detallada" : "Vista Compacta"}</span>
              </button>
            </div>
          )}

          {/* Filtro de día para Vista Agenda */}
          {modoVista === "agenda" && (
            <div className={`flex ${tema === 'dark' ? 'bg-[#090e1a] border-slate-800' : 'bg-slate-100 border-slate-200'} p-1 rounded-xl border overflow-x-auto max-w-full`}>
              {diasSemana.map((dia) => (
                <button
                  key={dia}
                  type="button"
                  onClick={() => setDiaFiltroAgenda(dia)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                    diaFiltroAgenda === dia
                      ? "bg-blue-600 text-white shadow-sm"
                      : tema === 'dark' ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
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
        <div className={`border ${tema === 'dark' ? 'bg-[#0e1526] border-slate-800' : 'bg-white border-slate-200 shadow-sm'} rounded-2xl p-8 sm:p-12 text-center space-y-4 no-print`}>
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 border border-slate-700 mx-auto flex items-center justify-center text-blue-400 shadow-sm">
            <Calendar className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div className="space-y-1">
            <h3 className={`text-base sm:text-lg font-bold ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>Tu Horario está actualmente vacío</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              No se han encontrado registros de matrícula activa para el semestre <strong className="text-blue-500">{semestreVista}</strong>.
            </p>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setModoDemoActivo(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-sm flex items-center space-x-2 cursor-pointer active:scale-95"
            >
              <Zap className="w-4 h-4" />
              <span>Ver Horario de Ejemplo (Demo)</span>
            </button>

            <Link
              to="/estudiante/matricula"
              className={`px-5 py-2.5 rounded-xl ${tema === 'dark' ? 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'} font-bold text-xs border transition-all flex items-center space-x-2 shadow-sm`}
            >
              <span>Ir a Módulo de Matrícula</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* VISTA 1: GRILLA SEMANAL (CALENDAR GRID) */}
      {tieneDatos && modoVista === "grilla" && (
        <div className={`border ${tema === 'dark' ? 'bg-[#0e1526] border-slate-800' : 'bg-white border-slate-200 shadow-sm'} rounded-2xl overflow-hidden p-3.5 sm:p-6 print-container`}>
          <div className="md:hidden flex items-center space-x-1.5 text-[10px] text-slate-400 font-medium mb-3 no-print">
            <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>Desliza horizontalmente para navegar la grilla de días</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[960px] text-xs print-table">
              <thead>
                <tr className={`border-b ${tema === 'dark' ? 'border-slate-800 text-slate-400 bg-[#090e1a]' : 'border-slate-200 text-slate-700 bg-slate-100'} text-[11px] font-bold uppercase tracking-wider`}>
                  <th className={`py-3.5 px-4 text-left w-44 border-r ${tema === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Bloque Horario</span>
                    </div>
                  </th>
                  {diasSemana.map((dia) => {
                    const esHoy = diaHoyNombre === dia;
                    return (
                      <th
                        key={dia}
                        className={`py-3 px-3 text-center border-r ${
                          tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'
                        } relative ${
                          esHoy ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-300 font-black" : ""
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-1.5">
                          <span>{dia}</span>
                          {esHoy && (
                            <span className="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-extrabold border border-emerald-500/30">
                              Hoy
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {estructuraHorarioFiltrada.map((fila) => {
                  if (fila.tipoFila === "recreo" || fila.tipoFila === "almuerzo") {
                    const esAlmuerzo = fila.tipoFila === "almuerzo";
                    return (
                      <tr
                        key={fila.identificadorFila}
                        className={`text-[10px] ${
                          esAlmuerzo
                            ? tema === 'dark'
                              ? "bg-amber-950/40 text-amber-300 border-y border-amber-800/60"
                              : "bg-amber-50 text-amber-900 border-y border-amber-200/80"
                            : tema === 'dark'
                              ? "bg-slate-950/80 text-slate-400 border-y border-slate-800/60"
                              : "bg-slate-100/90 text-slate-600 border-y border-slate-200/80"
                        }`}
                      >
                        <td className={`py-1 px-3 font-mono font-bold text-[10px] border-r ${tema === 'dark' ? 'border-slate-800' : 'border-slate-200'} whitespace-nowrap`}>
                          <div className="flex items-center space-x-1.5 opacity-80">
                            <Clock className="w-3 h-3 shrink-0 text-amber-500" />
                            <span>{fila.unicaHora}</span>
                          </div>
                        </td>
                        <td colSpan={5} className="py-1 px-2 text-center">
                          <div className="inline-flex items-center justify-center space-x-1.5 font-extrabold tracking-wider uppercase text-[10px]">
                            {esAlmuerzo ? (
                              <>
                                <Utensils className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                <span>Receso / Horario de Almuerzo</span>
                              </>
                            ) : (
                              <>
                                <Coffee className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                                <span>Receso Intermedio (10 min)</span>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <React.Fragment key={fila.identificadorFila}>
                      {/* 1ra Hora del Bloque (e.g. 7:00-7:50) */}
                      <tr className={`border-b ${tema === 'dark' ? 'border-slate-800/40 hover:bg-slate-800/20' : 'border-slate-200/60 hover:bg-slate-100/60'} transition-colors`}>
                        <td className={`py-1.5 px-3 border-r ${tema === 'dark' ? 'border-slate-800' : 'border-slate-200'} align-middle`}>
                          <div className={`text-[11px] font-black ${tema === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>{fila.primeraHoraPedagogica}</div>
                        </td>
                        <td rowSpan={2} className="p-1 align-stretch">{renderizarCeldaGrilla(fila.diaLunes, "Lunes", fila.rangoHorario, false)}</td>
                        <td rowSpan={2} className="p-1 align-stretch">{renderizarCeldaGrilla(fila.diaMartes, "Martes", fila.rangoHorario, false)}</td>
                        <td rowSpan={1} className="p-1 align-stretch">{renderizarCeldaGrilla(fila.diaMiercolesPrimeraHora, "Miércoles", fila.primeraHoraPedagogica, true)}</td>
                        <td rowSpan={2} className="p-1 align-stretch">{renderizarCeldaGrilla(fila.diaJueves, "Jueves", fila.rangoHorario, false)}</td>
                        <td rowSpan={2} className="p-1 align-stretch">{renderizarCeldaGrilla(fila.diaViernes, "Viernes", fila.rangoHorario, false)}</td>
                      </tr>

                      {/* 2da Hora del Bloque (e.g. 7:50-8:40) */}
                      <tr className={`border-b ${tema === 'dark' ? 'border-slate-800/80 hover:bg-slate-800/20' : 'border-slate-200 hover:bg-slate-100/60'} transition-colors`}>
                        <td className={`py-1.5 px-3 border-r ${tema === 'dark' ? 'border-slate-800' : 'border-slate-200'} align-middle`}>
                          <div className={`text-[10px] font-mono font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{fila.segundaHoraPedagogica}</div>
                        </td>
                        <td rowSpan={1} className="p-1 align-stretch">{renderizarCeldaGrilla(fila.diaMiercolesSegundaHora, "Miércoles", fila.segundaHoraPedagogica, true)}</td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VISTA 2: AGENDA TIMELINE POR DÍA */}
      {tieneDatos && modoVista === "agenda" && (
        <div className={`border ${
          tema === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-md'
        } rounded-3xl p-6 backdrop-blur-2xl space-y-6`}>
          <div className={`flex items-center justify-between border-b ${tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'} pb-4`}>
            <div>
              <h2 className={`text-lg font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center space-x-2`}>
                <span>Cronograma del {diaFiltroAgenda}</span>
                {diaHoyNombre === diaFiltroAgenda && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-black">
                    ¡Día Actual!
                  </span>
                )}
              </h2>
              <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
                Clases organizadas secuencialmente por bloque de hora.
              </p>
            </div>
            <span className={`text-xs font-black ${
              tema === 'dark' ? 'text-slate-400 bg-slate-950 border-slate-800' : 'text-slate-600 bg-slate-100 border-slate-200'
            } px-3.5 py-1.5 rounded-xl border`}>
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
                        ? tema === 'dark' ? "bg-amber-950/40 border-amber-900/50 text-amber-300" : "bg-amber-50 border-amber-200 text-amber-900"
                        : tema === 'dark' ? "bg-slate-950/40 border-slate-800 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-600"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {item.tipo === "almuerzo" ? <Utensils className="w-4 h-4 text-amber-500" /> : <Coffee className="w-4 h-4 text-amber-500" />}
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
                    <div className={`w-12 h-12 rounded-2xl ${tema === 'dark' ? 'bg-slate-950/80 border-slate-700/60 text-blue-400' : 'bg-white border-blue-200 text-blue-600'} border flex items-center justify-center font-bold text-sm shrink-0 shadow-sm`}>
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border ${c.estilo.badge}`}>
                          {c.cursoId}
                        </span>
                        <span className={`text-xs font-black ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{c.infoGrupo.etiqueta}</span>
                      </div>
                      <h3 className={`text-base font-black ${tema === 'dark' ? 'text-white' : 'text-slate-950'} mt-1 leading-snug`}>{c.nombre}</h3>
                    </div>
                  </div>

                  <div className={`flex items-center justify-between md:justify-end space-x-4 border-t md:border-t-0 pt-3 md:pt-0 ${
                    tema === 'dark' ? 'border-slate-800/60' : 'border-slate-200'
                  }`}>
                    <div className="text-left md:text-right font-mono">
                      <div className={`text-xs font-black ${tema === 'dark' ? 'text-slate-200' : 'text-slate-800'} flex items-center space-x-1.5`}>
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        <span>{item.hora}</span>
                      </div>
                      <div className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} mt-0.5 font-sans font-semibold`}>{c.infoGrupo.diasTexto}</div>
                    </div>

                    <div className={`w-9 h-9 rounded-xl ${
                      tema === 'dark' ? 'bg-slate-800/80 border-slate-700 text-slate-400' : 'bg-white border-slate-300 text-slate-600'
                    } border flex items-center justify-center transition-colors shadow-sm`}>
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
                <span className={`text-xs font-black px-3 py-1 rounded-xl ${
                  tema === 'dark' ? 'bg-slate-950/80 border-slate-700 text-slate-200' : 'bg-white/90 border-slate-300 text-slate-800 shadow-sm'
                } border`}>
                  {c.infoGrupo.etiqueta}
                </span>
              </div>

              <div>
                <h3 className={`text-lg font-black ${tema === 'dark' ? 'text-white' : 'text-slate-950'} leading-tight`}>{c.nombre}</h3>
                <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} mt-1 flex items-center space-x-1.5 font-medium`}>
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span>{c.infoGrupo.horario}</span>
                </p>
              </div>

              <div className={`pt-3 border-t ${tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'} text-xs space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className={`${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} font-medium`}>Días de dictado:</span>
                  <span className={`font-bold ${tema === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>{c.infoGrupo.diasTexto}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} font-medium`}>Horas por semana:</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">~6 hrs pedagógicas</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Detalle de Curso al hacer clic */}
      {cursoDetalleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className={`${
            tema === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
          } border rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative overflow-hidden`}>
            <button
              type="button"
              onClick={() => setCursoDetalleModal(null)}
              className={`absolute top-5 right-5 ${
                tema === 'dark' ? 'text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 border-slate-700/50' : 'text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-300'
              } p-2 rounded-xl border transition-colors cursor-pointer`}
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
                  <span className={`text-xs font-black ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{cursoDetalleModal.infoGrupo.etiqueta}</span>
                </div>
                <h3 className={`text-xl font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'} mt-1 leading-snug`}>{cursoDetalleModal.nombre}</h3>
              </div>
            </div>

            <div className={`${
              tema === 'dark' ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
            } rounded-2xl p-4 border space-y-3 text-xs`}>
              <div className={`flex justify-between items-center py-1 border-b ${tema === 'dark' ? 'border-slate-800/60' : 'border-slate-200'}`}>
                <span className={`${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Horario Regular:</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{cursoDetalleModal.infoGrupo.horario}</span>
              </div>

              <div className={`flex justify-between items-center py-1 border-b ${tema === 'dark' ? 'border-slate-800/60' : 'border-slate-200'}`}>
                <span className={`${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Frecuencia Semanal:</span>
                <span className={`font-bold ${tema === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>{cursoDetalleModal.infoGrupo.diasTexto}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className={`${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Estado en Matrícula:</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Inscrito ({semestreVista})</span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setCursoDetalleModal(null)}
                className={`px-5 py-2.5 ${
                  tema === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                } font-black text-xs rounded-xl border transition-all cursor-pointer shadow-sm`}
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
