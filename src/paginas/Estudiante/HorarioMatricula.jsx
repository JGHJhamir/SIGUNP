import React, { useState, useEffect, useMemo } from "react";
import { useTema } from "../../contexto/ContextoTema";
import { supabase } from "../../lib/supabase";
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
  Plus,
  Edit3,
  Trash2,
  Save,
  MapPin,
  User,
  GraduationCap,
  CloudCheck,
  Cloud,
  Search,
  Filter,
  AlertCircle
} from "lucide-react";
import {
  obtenerPlanEstudiosActual,
  obtenerNombreCarreraActual,
  CARRERAS_DISPONIBLES
} from "../../datos/planesEstudio";

// Información de bloques de grupos y sus horarios
const informacionGrupos = {
  grupo01: { etiqueta: "G-01", horario: "07:00 - 08:40 (Mié₁ 7:00-7:50)", diasTexto: "Lun · Mar · Mié₁" },
  grupo02: { etiqueta: "G-02", horario: "07:00 - 08:40 (Mié₂ 7:50-8:40)", diasTexto: "Mié₂ · Jue · Vie" },
  grupo03: { etiqueta: "G-03", horario: "08:50 - 10:30 (Mié₁ 8:50-9:40)", diasTexto: "Lun · Mar · Mié₁" },
  grupo04: { etiqueta: "G-04", horario: "08:50 - 10:30 (Mié₂ 9:40-10:30)", diasTexto: "Mié₂ · Jue · Vie" },
  grupo05: { etiqueta: "G-05", horario: "10:40 - 12:20 (Mié₁ 10:40-11:30)", diasTexto: "Lun · Mar · Mié₁" },
  grupo06: { etiqueta: "G-06", horario: "10:40 - 12:20 (Mié₂ 11:30-12:20)", diasTexto: "Mié₂ · Jue · Vie" },
  grupo07: { etiqueta: "G-07", horario: "01:50 - 03:30 (Mié₁ 1:50-2:40)", diasTexto: "Lun · Mar · Mié₁" },
  grupo08: { etiqueta: "G-08", horario: "01:50 - 03:30 (Mié₂ 2:40-3:30)", diasTexto: "Mié₂ · Jue · Vie" },
  grupo09: { etiqueta: "G-09", horario: "03:40 - 05:20 (Mié₁ 3:40-4:30)", diasTexto: "Lun · Mar · Mié₁" },
  grupo10: { etiqueta: "G-10", horario: "03:40 - 05:20 (Mié₂ 4:30-5:20)", diasTexto: "Mié₂ · Jue · Vie" },
  grupo11: { etiqueta: "G-11", horario: "05:30 - 07:10 (Mié₁ 5:30-6:20)", diasTexto: "Lun · Mar · Mié₁" },
  grupo12: { etiqueta: "G-12", horario: "05:30 - 07:10 (Mié₂ 6:20-7:10)", diasTexto: "Mié₂ · Jue · Vie" },
  grupo13: { etiqueta: "G-13", horario: "07:20 - 09:00 (Mié₁ 7:20-8:10)", diasTexto: "Lun · Mar · Mié₁" },
  grupo14: { etiqueta: "G-14", horario: "07:20 - 09:00 (Mié₂ 8:10-9:00)", diasTexto: "Mié₂ · Jue · Vie" }
};

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

// Paleta de estilos por asignatura
const paletaColoresNuevos = [
  {
    badge: "bg-blue-600 text-white border-blue-700 dark:bg-blue-500/25 dark:text-blue-300 dark:border-blue-500/40 border shadow-xs font-extrabold",
    card: "bg-gradient-to-br from-blue-100/90 via-blue-50 to-sky-100/80 dark:from-blue-950/90 dark:via-blue-900/50 dark:to-slate-950/90 border-blue-300 dark:border-blue-500/50 text-blue-950 dark:text-blue-100 hover:border-blue-500 dark:hover:border-blue-400 shadow-md shadow-blue-500/10",
    solido: "bg-blue-600 text-white",
    glow: "shadow-blue-500/40 border-blue-500 ring-2 ring-blue-500/60 scale-[1.02]"
  },
  {
    badge: "bg-emerald-600 text-white border-emerald-700 dark:bg-emerald-500/25 dark:text-emerald-300 dark:border-emerald-500/40 border shadow-xs font-extrabold",
    card: "bg-gradient-to-br from-emerald-100/90 via-emerald-50 to-teal-100/80 dark:from-emerald-950/90 dark:via-teal-900/50 dark:to-slate-950/90 border-emerald-300 dark:border-emerald-500/50 text-emerald-950 dark:text-emerald-100 hover:border-emerald-500 dark:hover:border-emerald-400 shadow-md shadow-emerald-500/10",
    solido: "bg-emerald-600 text-white",
    glow: "shadow-emerald-500/40 border-emerald-500 ring-2 ring-emerald-500/60 scale-[1.02]"
  },
  {
    badge: "bg-purple-600 text-white border-purple-700 dark:bg-purple-500/25 dark:text-purple-300 dark:border-purple-500/40 border shadow-xs font-extrabold",
    card: "bg-gradient-to-br from-purple-100/90 via-purple-50 to-violet-100/80 dark:from-purple-950/90 dark:via-violet-900/50 dark:to-slate-950/90 border-purple-300 dark:border-purple-500/50 text-purple-950 dark:text-purple-100 hover:border-purple-500 dark:hover:border-purple-400 shadow-md shadow-purple-500/10",
    solido: "bg-purple-600 text-white",
    glow: "shadow-purple-500/40 border-purple-500 ring-2 ring-purple-500/60 scale-[1.02]"
  },
  {
    badge: "bg-amber-600 text-white border-amber-700 dark:bg-amber-500/25 dark:text-amber-300 dark:border-amber-500/40 border shadow-xs font-extrabold",
    card: "bg-gradient-to-br from-amber-100/90 via-amber-50 to-orange-100/80 dark:from-amber-950/90 dark:via-orange-900/50 dark:to-slate-950/90 border-amber-300 dark:border-amber-500/50 text-amber-950 dark:text-amber-100 hover:border-amber-500 dark:hover:border-amber-400 shadow-md shadow-amber-500/10",
    solido: "bg-amber-600 text-white",
    glow: "shadow-amber-500/40 border-amber-500 ring-2 ring-amber-500/60 scale-[1.02]"
  },
  {
    badge: "bg-rose-600 text-white border-rose-700 dark:bg-rose-500/25 dark:text-rose-300 dark:border-rose-500/40 border shadow-xs font-extrabold",
    card: "bg-gradient-to-br from-rose-100/90 via-rose-50 to-pink-100/80 dark:from-rose-950/90 dark:via-red-900/50 dark:to-slate-950/90 border-rose-300 dark:border-rose-500/50 text-rose-950 dark:text-rose-100 hover:border-rose-500 dark:hover:border-rose-400 shadow-md shadow-rose-500/10",
    solido: "bg-rose-600 text-white",
    glow: "shadow-rose-500/40 border-rose-500 ring-2 ring-rose-500/60 scale-[1.02]"
  },
  {
    badge: "bg-cyan-600 text-white border-cyan-700 dark:bg-sky-500/25 dark:text-sky-300 dark:border-sky-500/40 border shadow-xs font-extrabold",
    card: "bg-gradient-to-br from-cyan-100/90 via-sky-50 to-teal-100/80 dark:from-sky-950/90 dark:via-cyan-900/50 dark:to-slate-950/90 border-cyan-300 dark:border-sky-500/50 text-cyan-950 dark:text-sky-100 hover:border-cyan-500 dark:hover:border-sky-400 shadow-md shadow-cyan-500/10",
    solido: "bg-cyan-600 text-white",
    glow: "shadow-cyan-500/40 border-cyan-500 ring-2 ring-cyan-500/60 scale-[1.02]"
  }
];

export default function HorarioMatricula() {
  const { tema } = useTema();

  // Estados principales de semestres y configuración
  const [semestres, setSemestres] = useState(["2026-II", "2027-I", "2027-II"]);
  const [semestreVista, setSemestreVista] = useState("2026-II");
  
  // Estructura de datos del horario por semestre:
  // { [semestre]: { cursos: ["SI1435"], detalles: { "SI1435": { grupo: "grupo01", aula: "Aula 102", docente: "Ing. Perez" } } } }
  const [horariosPorSemestre, setHorariosPorSemestre] = useState({});
  const [aprobados, setAprobados] = useState([]);
  
  // Estados de interfaz y modales
  const [modoVista, setModoVista] = useState("grilla"); // "grilla" | "agenda" | "tarjetas"
  const [cursoResaltado, setCursoResaltado] = useState(null);
  const [modalEditarCurso, setModalEditarCurso] = useState(null); // Curso en edición individual
  const [modalOrganizarSemestre, setModalOrganizarSemestre] = useState(false); // Modal para agregar/quitar cursos del avance
  const [modalCrearSemestre, setModalCrearSemestre] = useState(false);
  const [nuevoSemestreInput, setNuevoSemestreInput] = useState("");
  
  const [diaFiltroAgenda, setDiaFiltroAgenda] = useState("Lunes");
  const [ocultarHorasVacias, setOcultarHorasVacias] = useState(true);
  const [mensajeCopiado, setMensajeCopiado] = useState(false);
  const [guardandoEnCloud, setGuardandoEnCloud] = useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = useState(null);

  // Carrera y Plan de estudios
  const carreraKey = (localStorage.getItem("carreraActiva") || "").toLowerCase().includes("contab") ? "contabilidad" : "informatica";
  const planActual = useMemo(() => obtenerPlanEstudiosActual(), []);

  // Todos los cursos del plan
  const todosLosCursos = useMemo(() => {
    return planActual.flatMap((sem) =>
      sem.cursos.map((c) => ({
        ...c,
        cicloNombre: sem.ciclo,
        numeroCiclo: sem.numeroCiclo
      }))
    );
  }, [planActual]);

  const mapaCursos = useMemo(() => {
    const mapa = {};
    todosLosCursos.forEach((c) => { mapa[c.id] = c; });
    return mapa;
  }, [todosLosCursos]);

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const diaHoyIndex = new Date().getDay();
  const diaHoyNombre = diaHoyIndex >= 1 && diaHoyIndex <= 5 ? diasSemana[diaHoyIndex - 1] : null;

  // ── CARGAR DATOS DESDE SUPABASE & LOCALSTORAGE ──
  useEffect(() => {
    const cargarHorarios = async () => {
      const codigoUni = localStorage.getItem("codigoUniversitario");
      const storageKey = `horario_semestres_${carreraKey}`;
      
      // Cargar Cursos Aprobados de la Malla desde LocalStorage y Supabase
      const aprobadosGuardados = localStorage.getItem(`cursosAprobados_${carreraKey}`);
      if (aprobadosGuardados) {
        try { setAprobados(JSON.parse(aprobadosGuardados)); } catch (e) {}
      }

      if (codigoUni) {
        try {
          const { data: dataAprobados } = await supabase
            .from("estudiante_cursos_aprobados")
            .select("curso_id")
            .eq("codigo_universitario", codigoUni)
            .eq("carrera", carreraKey);

          if (dataAprobados && dataAprobados.length > 0) {
            const idsAprobadosBD = dataAprobados.map((r) => r.curso_id);
            setAprobados(idsAprobadosBD);
            localStorage.setItem(`cursosAprobados_${carreraKey}`, JSON.stringify(idsAprobadosBD));
          }
        } catch (e) {
          console.warn("Supabase aprobados fallback local", e);
        }
      }

      // Cargar Semestres personalizados
      const semestresGuardados = localStorage.getItem(`semestres_lista_${carreraKey}`);
      if (semestresGuardados) {
        try { setSemestres(JSON.parse(semestresGuardados)); } catch (e) {}
      }

      // 1. Intentar cargar desde Supabase si existe usuario
      if (codigoUni) {
        try {
          const { data, error } = await supabase
            .from("estudiante_horarios")
            .select("semestre, cursos, detalles")
            .eq("codigo_universitario", codigoUni)
            .eq("carrera", carreraKey);

          if (data && data.length > 0) {
            const mapaCloud = {};
            const semestresEncontrados = new Set(semestres);

            data.forEach((row) => {
              mapaCloud[row.semestre] = {
                cursos: row.cursos || [],
                detalles: row.detalles || {}
              };
              semestresEncontrados.add(row.semestre);
            });

            setHorariosPorSemestre(mapaCloud);
            setSemestres(Array.from(semestresEncontrados));
            localStorage.setItem(storageKey, JSON.stringify(mapaCloud));
            return;
          }
        } catch (e) {
          console.warn("Supabase horarios fallback local", e);
        }
      }

      // 2. Fallback a LocalStorage o datos iniciales de matriculas anteriores
      const localData = localStorage.getItem(storageKey) || localStorage.getItem(`matriculas_${carreraKey}`);
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          // Migrar formato antiguo si es necesario
          const mapaMigrado = {};
          Object.keys(parsed).forEach((sem) => {
            const item = parsed[sem];
            if (item.cursos) {
              const detalles = item.detalles || {};
              // Convertir grupos antiguos a detalles si aplica
              if (item.grupos && Object.keys(detalles).length === 0) {
                Object.keys(item.grupos).forEach((cId) => {
                  detalles[cId] = { grupo: item.grupos[cId], aula: "Aula por definir", docente: "" };
                });
              }
              mapaMigrado[sem] = { cursos: item.cursos, detalles };
            }
          });
          setHorariosPorSemestre(mapaMigrado);
        } catch (e) {
          setHorariosPorSemestre({});
        }
      }
    };

    cargarHorarios();
  }, [carreraKey]);

  // Datos del semestre activo
  // Datos del semestre activo y sanitización para prevenir grupos duplicados en el mismo semestre
  const datosSemestreActual = useMemo(() => {
    const semData = horariosPorSemestre[semestreVista] || { cursos: [], detalles: {} };
    const gruposUsados = new Set();
    const todosLosGrupos = Object.keys(informacionGrupos);
    const detallesSanitizados = { ...semData.detalles };

    (semData.cursos || []).forEach((cursoId) => {
      const d = detallesSanitizados[cursoId] || { grupo: "grupo01", aula: "Aula por definir", docente: "" };
      if (!d.grupo || gruposUsados.has(d.grupo)) {
        const libre = todosLosGrupos.find((g) => !gruposUsados.has(g)) || "grupo01";
        detallesSanitizados[cursoId] = { ...d, grupo: libre };
        gruposUsados.add(libre);
      } else {
        gruposUsados.add(d.grupo);
      }
    });

    return {
      cursos: semData.cursos || [],
      detalles: detallesSanitizados
    };
  }, [horariosPorSemestre, semestreVista]);

  // Mapa de { [grupoCode]: cursoId } para saber qué grupo está ocupado por qué curso en el semestre activo
  const gruposOcupadosEnSemestre = useMemo(() => {
    const mapa = {};
    if (!datosSemestreActual.cursos || !datosSemestreActual.detalles) return mapa;
    datosSemestreActual.cursos.forEach((cursoId) => {
      const d = datosSemestreActual.detalles[cursoId];
      if (d && d.grupo) {
        mapa[d.grupo] = cursoId;
      }
    });
    return mapa;
  }, [datosSemestreActual]);

  // Helper para obtener el primer grupo libre en el semestre
  const obtenerPrimerGrupoDisponible = (detallesExistentes = {}) => {
    const gruposUsados = new Set(
      Object.values(detallesExistentes).map((d) => d?.grupo).filter(Boolean)
    );
    const todosLosGrupos = Object.keys(informacionGrupos);
    return todosLosGrupos.find((g) => !gruposUsados.has(g)) || "grupo01";
  };

  // Mapa de Código de Grupo -> Datos completos del curso (Nombre, Grupo, Aula, Docente)
  const mapaGrupoActual = useMemo(() => {
    if (!datosSemestreActual.cursos || !datosSemestreActual.detalles) return {};
    const mapa = {};
    datosSemestreActual.cursos.forEach((cursoId, indice) => {
      const detalle = datosSemestreActual.detalles[cursoId];
      if (detalle && detalle.grupo) {
        const codigoGrupo = detalle.grupo;
        const estilo = paletaColoresNuevos[indice % paletaColoresNuevos.length];
        mapa[codigoGrupo] = {
          cursoId,
          nombre: mapaCursos[cursoId]?.nombre || cursoId,
          grupo: codigoGrupo,
          aula: detalle.aula || "Por Asignar",
          docente: detalle.docente || "",
          infoGrupo: informacionGrupos[codigoGrupo] || { etiqueta: codigoGrupo, horario: "07:00 - 08:40", diasTexto: "Lun · Mar" },
          estilo
        };
      }
    });
    return mapa;
  }, [datosSemestreActual, mapaCursos]);

  const tieneDatos = Object.keys(mapaGrupoActual).length > 0;

  // Cursos disponibles para organizar según Avance Académico (Malla Curricular)
  // Únicamente se muestran los cursos NO APROBADOS cuyos REQUISITOS YA FUERON CUMPLIDOS (Cursos Disponibles/Aperturables).
  const cursosParaOrganizar = useMemo(() => {
    return todosLosCursos
      .filter((c) => {
        const noAprobado = !aprobados.includes(c.id);
        const requisitosCumplidos = c.requisitos.every((reqId) => aprobados.includes(reqId));
        return noAprobado && requisitosCumplidos;
      })
      .map((c) => ({ ...c, estado: "disponible" }));
  }, [todosLosCursos, aprobados]);

  // ── GUARDAR EN SUPABASE Y LOCALSTORAGE ──
  const guardarHorarioSemestre = async (nuevosHorarios, listaSemestres = semestres) => {
    setHorariosPorSemestre(nuevosHorarios);
    setSemestres(listaSemestres);

    const storageKey = `horario_semestres_${carreraKey}`;
    localStorage.setItem(storageKey, JSON.stringify(nuevosHorarios));
    localStorage.setItem(`semestres_lista_${carreraKey}`, JSON.stringify(listaSemestres));

    const codigoUni = localStorage.getItem("codigoUniversitario");
    if (codigoUni) {
      setGuardandoEnCloud(true);
      try {
        const datosSemestre = nuevosHorarios[semestreVista] || { cursos: [], detalles: {} };
        const payload = {
          codigo_universitario: codigoUni,
          carrera: carreraKey,
          semestre: semestreVista,
          cursos: datosSemestre.cursos,
          detalles: datosSemestre.detalles
        };

        const { error } = await supabase
          .from("estudiante_horarios")
          .upsert(payload, { onConflict: "codigo_universitario, carrera, semestre" });

        if (error) {
          console.warn("Aviso guardado Supabase:", error.message);
        } else {
          mostrarToast("¡Horario guardado y sincronizado en Supabase Cloud! ☁️");
        }
      } catch (e) {
        console.warn("Excepción guardado Supabase:", e);
      } finally {
        setGuardandoEnCloud(false);
      }
    } else {
      mostrarToast("¡Horario guardado en sesión local! 💾");
    }
  };

  const mostrarToast = (texto) => {
    setMensajeNotificacion(texto);
    setTimeout(() => setMensajeNotificacion(null), 3500);
  };

  // Crear Nuevo Semestre
  const manejarCrearSemestre = (e) => {
    e.preventDefault();
    if (!nuevoSemestreInput.trim()) return;
    const nombreNormalizado = nuevoSemestreInput.trim().toUpperCase();
    if (!semestres.includes(nombreNormalizado)) {
      const nuevaLista = [...semestres, nombreNormalizado];
      setSemestres(nuevaLista);
      setSemestreVista(nombreNormalizado);
      guardarHorarioSemestre(horariosPorSemestre, nuevaLista);
    }
    setNuevoSemestreInput("");
    setModalCrearSemestre(false);
  };

  // Asignar o Editar Grupo, Aula y Docente de un curso
  const guardarEdicionCurso = (cursoId, grupo, aula, docente) => {
    const ocupanteId = gruposOcupadosEnSemestre[grupo];
    if (ocupanteId && ocupanteId !== cursoId) {
      const nombreOcupante = mapaCursos[ocupanteId]?.nombre || ocupanteId;
      mostrarToast(`⚠️ El grupo ya está asignado a: ${nombreOcupante}`);
      return;
    }

    const cursosActuales = datosSemestreActual.cursos.includes(cursoId)
      ? datosSemestreActual.cursos
      : [...datosSemestreActual.cursos, cursoId];

    const nuevosDetalles = {
      ...datosSemestreActual.detalles,
      [cursoId]: {
        grupo: grupo || "grupo01",
        aula: aula || "Aula por definir",
        docente: docente || ""
      }
    };

    const nuevosHorarios = {
      ...horariosPorSemestre,
      [semestreVista]: {
        cursos: cursosActuales,
        detalles: nuevosDetalles
      }
    };

    guardarHorarioSemestre(nuevosHorarios);
    setModalEditarCurso(null);
  };

  // Eliminar curso del semestre
  const eliminarCursoDeSemestre = (cursoId) => {
    const nuevosCursos = datosSemestreActual.cursos.filter((id) => id !== cursoId);
    const nuevosDetalles = { ...datosSemestreActual.detalles };
    delete nuevosDetalles[cursoId];

    const nuevosHorarios = {
      ...horariosPorSemestre,
      [semestreVista]: {
        cursos: nuevosCursos,
        detalles: nuevosDetalles
      }
    };

    guardarHorarioSemestre(nuevosHorarios);
    setModalEditarCurso(null);
  };

  // Conmutar inclusión de un curso desde el Modal de Avance
  const toggleCursoEnSemestre = (cursoId) => {
    const yaInscrito = datosSemestreActual.cursos.includes(cursoId);
    let nuevosCursos = [];
    let nuevosDetalles = { ...datosSemestreActual.detalles };

    if (yaInscrito) {
      nuevosCursos = datosSemestreActual.cursos.filter((id) => id !== cursoId);
      delete nuevosDetalles[cursoId];
    } else {
      nuevosCursos = [...datosSemestreActual.cursos, cursoId];
      const grupoLibre = obtenerPrimerGrupoDisponible(nuevosDetalles);
      nuevosDetalles[cursoId] = {
        grupo: grupoLibre,
        aula: "Aula por definir",
        docente: ""
      };
    }

    const nuevosHorarios = {
      ...horariosPorSemestre,
      [semestreVista]: {
        cursos: nuevosCursos,
        detalles: nuevosDetalles
      }
    };

    guardarHorarioSemestre(nuevosHorarios);
  };

  // Filtrado de filas vacías
  const estructuraHorarioFiltrada = useMemo(() => {
    if (!ocultarHorasVacias || !tieneDatos) return estructuraHorarioClases;

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
        if (tieneClase) indicesOcupados.push(idx);
      }
    });

    if (indicesOcupados.length === 0) return estructuraHorarioClases;
    const primerIndice = Math.min(...indicesOcupados);
    const ultimoIndice = Math.max(...indicesOcupados);
    return estructuraHorarioClases.slice(primerIndice, ultimoIndice + 1);
  }, [ocultarHorasVacias, mapaGrupoActual, tieneDatos]);

  // Copiar Resumen
  const manejarCopiarResumen = () => {
    let resumen = `📌 HORARIO ACADÉMICO UNP - SEMESTRE ${semestreVista}\n`;
    resumen += `───────────────────────────────────────────\n`;
    Object.values(mapaGrupoActual).forEach((c) => {
      resumen += `• ${c.nombre} (${c.cursoId})\n  ${c.infoGrupo.etiqueta} | ${c.infoGrupo.horario}\n  🏫 Aula: ${c.aula}${c.docente ? ` | 👤 Docente: ${c.docente}` : ""}\n\n`;
    });
    navigator.clipboard.writeText(resumen);
    setMensajeCopiado(true);
    setTimeout(() => setMensajeCopiado(false), 3000);
  };

  // Renderizador de celdas de la grilla
  const renderizarCeldaGrilla = (codigoGrupo, diaNombre, horaEspecifica, esSubHora = false) => {
    const datos = mapaGrupoActual[codigoGrupo];
    if (!datos) {
      return (
        <div className={`h-full ${esSubHora ? 'min-h-[38px] sm:min-h-[42px]' : 'min-h-[78px] sm:min-h-[92px]'} flex items-center justify-center text-[10px] sm:text-[11px] ${
          tema === 'dark' ? 'text-slate-600' : 'text-slate-300'
        } font-mono select-none`}>
          —
        </div>
      );
    }

    const esDestacado = cursoResaltado === datos.cursoId;
    const esOpaco = cursoResaltado && cursoResaltado !== datos.cursoId;

    return (
      <div
        onClick={() => setModalEditarCurso(datos)}
        onMouseEnter={() => setCursoResaltado(datos.cursoId)}
        onMouseLeave={() => setCursoResaltado(null)}
        className={`p-1.5 sm:p-2 rounded-xl border h-full ${
          esSubHora ? 'min-h-[38px] sm:min-h-[42px]' : 'min-h-[78px] sm:min-h-[92px]'
        } flex flex-col justify-between cursor-pointer transition-all duration-200 relative group overflow-hidden ${
          datos.estilo.card
        } ${esDestacado ? datos.estilo.glow : ""} ${esOpaco ? "opacity-30 scale-[0.98] blur-[0.3px]" : ""}`}
      >
        <div className="flex items-center justify-between space-x-1">
          <span className={`text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.2 rounded border ${datos.estilo.badge}`}>
            {datos.cursoId}
          </span>
          <span className={`text-[8px] sm:text-[9px] font-extrabold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            {datos.infoGrupo.etiqueta}
          </span>
        </div>

        <div className="my-0.5">
          <div className="text-[10px] sm:text-[11px] font-extrabold tracking-tight leading-tight line-clamp-2">
            {datos.nombre}
          </div>
          {/* Nombre de Aula Destacado */}
          <div className="text-[8px] sm:text-[9.5px] font-bold text-blue-600 dark:text-blue-300 mt-0.5 flex items-center space-x-1 truncate">
            <MapPin className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{datos.aula}</span>
          </div>
        </div>

        {!esSubHora && (
          <div className={`text-[8px] sm:text-[9px] font-mono flex items-center justify-between opacity-80 border-t pt-0.5 ${
            tema === 'dark' ? 'border-slate-800/40 text-slate-300' : 'border-slate-200 text-slate-700'
          }`}>
            <span className="truncate">{horaEspecifica || datos.infoGrupo.horario}</span>
            {datos.docente && <User className="w-2.5 h-2.5 text-purple-400 shrink-0 hidden sm:inline-block" />}
          </div>
        )}
      </div>
    );
  };

  // Bloques para Vista Agenda Timeline
  const bloquesPorDiaAgenda = useMemo(() => {
    const mapaAgenda = { Lunes: [], Martes: [], Miércoles: [], Jueves: [], Viernes: [] };
    estructuraHorarioFiltrada.forEach((fila) => {
      if (fila.tipoFila === "clase") {
        if (mapaGrupoActual[fila.diaLunes]) mapaAgenda.Lunes.push({ hora: fila.rangoHorario, curso: mapaGrupoActual[fila.diaLunes] });
        if (mapaGrupoActual[fila.diaMartes]) mapaAgenda.Martes.push({ hora: fila.rangoHorario, curso: mapaGrupoActual[fila.diaMartes] });
        if (mapaGrupoActual[fila.diaMiercolesPrimeraHora]) mapaAgenda.Miércoles.push({ hora: `${fila.primeraHoraPedagogica} (1ra Hora)`, curso: mapaGrupoActual[fila.diaMiercolesPrimeraHora] });
        if (mapaGrupoActual[fila.diaMiercolesSegundaHora]) mapaAgenda.Miércoles.push({ hora: `${fila.segundaHoraPedagogica} (2da Hora)`, curso: mapaGrupoActual[fila.diaMiercolesSegundaHora] });
        if (mapaGrupoActual[fila.diaJueves]) mapaAgenda.Jueves.push({ hora: fila.rangoHorario, curso: mapaGrupoActual[fila.diaJueves] });
        if (mapaGrupoActual[fila.diaViernes]) mapaAgenda.Viernes.push({ hora: fila.rangoHorario, curso: mapaGrupoActual[fila.diaViernes] });
      } else {
        const itemPausa = { hora: fila.unicaHora, esPausa: true, tipo: fila.tipoFila };
        diasSemana.forEach((d) => mapaAgenda[d].push(itemPausa));
      }
    });
    return mapaAgenda;
  }, [mapaGrupoActual, estructuraHorarioFiltrada]);

  return (
    <div className="space-y-6">

      {/* Toast Notificación */}
      {mensajeNotificacion && (
        <div className="fixed top-4 right-4 z-50 p-3.5 bg-emerald-600 text-white rounded-2xl shadow-2xl flex items-center space-x-2 text-xs font-bold animate-fadeIn">
          <CloudCheck className="w-4 h-4 text-emerald-200" />
          <span>{mensajeNotificacion}</span>
        </div>
      )}

      {/* Header Principal con Selección de Semestres y Acciones */}
      <div className={`rounded-2xl border ${
        tema === 'dark' ? 'bg-[#0e1526] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      } p-4 sm:p-5 space-y-3 transition-colors`}>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-lg sm:text-2xl font-black tracking-tight flex items-center space-x-2">
                <span>Mi Horario Semestral</span>
                {diaHoyNombre && (
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Hoy {diaHoyNombre}
                  </span>
                )}
              </h1>
              {guardandoEnCloud && (
                <span className="text-[10px] font-bold text-blue-400 flex items-center space-x-1 animate-pulse">
                  <Cloud className="w-3 h-3" />
                  <span>Sincronizando...</span>
                </span>
              )}
            </div>
            <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Organiza tus cursos según tu avance académico en la Malla Curricular, asigna grupo, aula y docente.
            </p>
          </div>

          {/* Selector de Semestres + Crear Semestre */}
          <div className="flex flex-wrap items-center gap-2">
            <div className={`flex items-center space-x-1 ${
              tema === 'dark' ? 'bg-[#090e1a] border-slate-800' : 'bg-slate-100 border-slate-200'
            } p-1 rounded-xl border overflow-x-auto`}>
              {semestres.map((sem) => (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setSemestreVista(sem)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                    semestreVista === sem
                      ? "bg-blue-600 text-white shadow-xs"
                      : tema === 'dark' ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>{sem}</span>
                  {horariosPorSemestre[sem]?.cursos?.length > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  )}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setModalCrearSemestre(true)}
                className="px-2.5 py-1 rounded-lg text-xs font-bold text-blue-500 hover:bg-blue-500/10 transition-all flex items-center space-x-1 cursor-pointer"
                title="Crear nuevo semestre"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nuevo</span>
              </button>
            </div>

            {/* Botón Principal: Organizar Cursos del Semestre */}
            <button
              type="button"
              onClick={() => setModalOrganizarSemestre(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>Organizar Cursos ({semestreVista})</span>
            </button>
          </div>
        </div>

        {/* Fila Secundario: Vistas + Copiar/Imprimir */}
        {tieneDatos && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
            
            {/* Conmutador de Vistas */}
            <div className={`flex ${tema === 'dark' ? 'bg-[#090e1a] border-slate-800' : 'bg-slate-100 border-slate-200'} p-0.5 rounded-xl border w-full sm:w-auto`}>
              <button
                type="button"
                onClick={() => setModoVista("grilla")}
                className={`flex-1 sm:flex-none px-3.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  modoVista === "grilla" ? "bg-blue-600 text-white shadow-xs" : tema === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grilla Semanal</span>
              </button>

              <button
                type="button"
                onClick={() => setModoVista("agenda")}
                className={`flex-1 sm:flex-none px-3.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  modoVista === "agenda" ? "bg-blue-600 text-white shadow-xs" : tema === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Agenda por Día</span>
              </button>

              <button
                type="button"
                onClick={() => setModoVista("tarjetas")}
                className={`flex-1 sm:flex-none px-3.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  modoVista === "tarjetas" ? "bg-blue-600 text-white shadow-xs" : tema === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Tarjetas</span>
              </button>
            </div>

            {/* Acciones Copiar / Imprimir */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={manejarCopiarResumen}
                className={`px-3 py-1.5 ${
                  tema === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                } text-xs font-bold rounded-xl border transition-all flex items-center space-x-1.5 cursor-pointer`}
              >
                {mensajeCopiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-500" />}
                <span>{mensajeCopiado ? "¡Copiado!" : "Copiar Resumen"}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center space-x-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-sky-400" />
                <span>Imprimir PDF</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Estado Vacío cuando no hay cursos organizados en el semestre */}
      {!tieneDatos && (
        <div className={`border ${tema === 'dark' ? 'bg-[#0e1526] border-slate-800' : 'bg-white border-slate-200 shadow-sm'} rounded-2xl p-8 text-center space-y-4`}>
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 mx-auto flex items-center justify-center text-blue-500">
            <Calendar className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className={`text-base font-bold ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Sin cursos configurados en {semestreVista}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Selecciona los cursos de tu avance académico según tu Malla Curricular y asigna el grupo, aula y docente.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOrganizarSemestre(true)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md inline-flex items-center space-x-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Organizar Cursos de {semestreVista}</span>
          </button>
        </div>
      )}

      {/* ── VISTA 1: GRILLA SEMANAL ── */}
      {tieneDatos && modoVista === "grilla" && (
        <div className={`border ${tema === 'dark' ? 'bg-[#0e1526] border-slate-800' : 'bg-white border-slate-200 shadow-sm'} rounded-2xl overflow-hidden p-3 sm:p-4 print-container`}>
          <div className="block sm:hidden text-[10px] font-bold text-blue-500 dark:text-blue-400 text-center pb-2 tracking-tight">
            ← Desliza horizontalmente para ver la grilla completa de Lunes a Viernes →
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse min-w-[650px] text-xs">
              <thead>
                <tr className={`border-b ${tema === 'dark' ? 'border-slate-800 text-slate-400 bg-[#090e1a]' : 'border-slate-200 text-slate-700 bg-slate-100'} text-[10px] sm:text-[11px] font-bold uppercase tracking-wider`}>
                  <th className={`py-2.5 px-3 text-left w-32 border-r ${tema === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                    <div className="flex items-center space-x-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span>Hora</span>
                    </div>
                  </th>
                  {diasSemana.map((dia) => {
                    const esHoy = diaHoyNombre === dia;
                    return (
                      <th
                        key={dia}
                        className={`py-2.5 px-2 text-center border-r ${
                          tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'
                        } ${esHoy ? "bg-emerald-500/10 text-emerald-400 font-black" : ""}`}
                      >
                        <span>{dia}</span>
                        {esHoy && <span className="ml-1 text-[8px] bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded">Hoy</span>}
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
                            ? tema === 'dark' ? "bg-amber-950/40 text-amber-300 border-y border-amber-800/60" : "bg-amber-50 text-amber-900 border-y border-amber-200"
                            : tema === 'dark' ? "bg-slate-950/80 text-slate-400 border-y border-slate-800/60" : "bg-slate-100/90 text-slate-600 border-y border-slate-200"
                        }`}
                      >
                        <td className={`py-1.5 px-3 font-mono font-bold border-r ${tema === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                          {fila.unicaHora}
                        </td>
                        <td colSpan={5} className="py-1.5 px-2 text-center font-extrabold uppercase text-[10px] tracking-wider">
                          {esAlmuerzo ? "Receso / Horario de Almuerzo" : "Receso Intermedio (10 min)"}
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <React.Fragment key={fila.identificadorFila}>
                      <tr className={`border-b ${tema === 'dark' ? 'border-slate-800/40' : 'border-slate-200/60'}`}>
                        <td className={`py-2 px-3 border-r ${tema === 'dark' ? 'border-slate-800' : 'border-slate-200'} align-middle`}>
                          <div className={`text-[11px] font-black ${tema === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>{fila.primeraHoraPedagogica}</div>
                        </td>
                        <td rowSpan={2} className="p-1 align-stretch">{renderizarCeldaGrilla(fila.diaLunes, "Lunes", fila.rangoHorario, false)}</td>
                        <td rowSpan={2} className="p-1 align-stretch">{renderizarCeldaGrilla(fila.diaMartes, "Martes", fila.rangoHorario, false)}</td>
                        <td rowSpan={1} className="p-1 align-stretch">{renderizarCeldaGrilla(fila.diaMiercolesPrimeraHora, "Miércoles", fila.primeraHoraPedagogica, true)}</td>
                        <td rowSpan={2} className="p-1 align-stretch">{renderizarCeldaGrilla(fila.diaJueves, "Jueves", fila.rangoHorario, false)}</td>
                        <td rowSpan={2} className="p-1 align-stretch">{renderizarCeldaGrilla(fila.diaViernes, "Viernes", fila.rangoHorario, false)}</td>
                      </tr>

                      <tr className={`border-b ${tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'}`}>
                        <td className={`py-2 px-3 border-r ${tema === 'dark' ? 'border-slate-800' : 'border-slate-200'} align-middle`}>
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

      {/* ── VISTA 2: AGENDA POR DÍA ── */}
      {tieneDatos && modoVista === "agenda" && (
        <div className={`border ${tema === 'dark' ? 'bg-[#0e1526] border-slate-800' : 'bg-white border-slate-200 shadow-sm'} rounded-2xl p-6 space-y-5`}>
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-base font-black flex items-center space-x-2">
              <span>Cronograma del {diaFiltroAgenda}</span>
            </h2>
            <div className="flex space-x-1">
              {diasSemana.map((d) => (
                <button
                  key={d}
                  onClick={() => setDiaFiltroAgenda(d)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    diaFiltroAgenda === d ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {bloquesPorDiaAgenda[diaFiltroAgenda]?.map((item, idx) => {
              if (item.esPausa) return null;
              const c = item.curso;
              return (
                <div
                  key={idx}
                  onClick={() => setModalEditarCurso(c)}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 cursor-pointer hover:scale-[1.01] transition-all ${c.estilo.card}`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${c.estilo.badge}`}>{c.cursoId}</span>
                      <span className="text-xs font-black">{c.infoGrupo.etiqueta}</span>
                      <span className="text-xs font-bold text-blue-500 flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{c.aula}</span>
                      </span>
                    </div>
                    <h3 className="text-sm font-black">{c.nombre}</h3>
                    {c.docente && <p className="text-xs opacity-80">Prof: {c.docente}</p>}
                  </div>

                  <div className="text-right font-mono text-xs font-bold">
                    <div>{item.hora}</div>
                    <div className="text-[10px] opacity-75">{c.infoGrupo.diasTexto}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── VISTA 3: TARJETAS DE CURSOS ── */}
      {tieneDatos && modoVista === "tarjetas" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(mapaGrupoActual).map((c) => (
            <div
              key={c.cursoId}
              onClick={() => setModalEditarCurso(c)}
              className={`p-5 rounded-2xl border space-y-3 cursor-pointer transition-all hover:scale-[1.02] ${c.estilo.card}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black px-2.5 py-0.5 rounded border ${c.estilo.badge}`}>{c.cursoId}</span>
                <span className="text-xs font-black px-2.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-white">{c.infoGrupo.etiqueta}</span>
              </div>

              <div>
                <h3 className="text-base font-black leading-tight">{c.nombre}</h3>
                <div className="text-xs font-bold text-blue-500 mt-1 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Aula: {c.aula}</span>
                </div>
                {c.docente && (
                  <div className="text-xs text-slate-300 mt-0.5 flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-purple-400" />
                    <span>Profesor: {c.docente}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-700/50 text-xs flex justify-between">
                <span>Días: <strong>{c.infoGrupo.diasTexto}</strong></span>
                <span className="font-mono text-blue-400">{c.infoGrupo.horario}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── MODAL 1: ORGANIZAR CURSOS SEGÚN AVANCE ACADÉMICO (MALLA) ── */}
      {modalOrganizarSemestre && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className={`border ${
            tema === 'dark' ? 'bg-[#0e1526] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
          } rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative`}>
            
            {/* Header del Modal */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span>Organizar Cursos — Semestre {semestreVista}</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Selecciona los cursos disponibles según tu avance en la Malla Curricular.
                </p>
              </div>

              <button
                onClick={() => setModalOrganizarSemestre(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cuerpo con Scroll */}
            <div className="p-5 overflow-y-auto space-y-3 flex-1">
              {cursosParaOrganizar.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-black text-white">¡No tienes asignaturas pendientes!</h4>
                  <p className="text-xs text-slate-400">Has aprobado todas las asignaturas registradas en tu Malla Curricular.</p>
                </div>
              ) : (
                cursosParaOrganizar.map((curso) => {
                  const enSemestre = datosSemestreActual.cursos.includes(curso.id);
                  const detalle = datosSemestreActual.detalles[curso.id] || {};

                  return (
                    <div
                      key={curso.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        enSemestre
                          ? "bg-blue-600/15 border-blue-500/40 text-white"
                          : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={enSemestre}
                          onChange={() => toggleCursoEnSemestre(curso.id)}
                          className="w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                              {curso.id}
                            </span>
                            <span className="text-xs font-bold text-slate-400">
                              Ciclo {curso.numeroCiclo} · {curso.creditos} CR
                            </span>
                          </div>
                          <h4 className="text-sm font-black mt-0.5">{curso.nombre}</h4>
                        </div>
                      </div>

                      {/* Selector de Grupo Rápido si está seleccionado */}
                      {enSemestre ? (
                        <div className="flex items-center space-x-2">
                          <select
                            value={detalle.grupo || "grupo01"}
                            onChange={(e) => guardarEdicionCurso(curso.id, e.target.value, detalle.aula, detalle.docente)}
                            className="bg-slate-950 border border-blue-500/40 text-xs font-bold rounded-xl px-2.5 py-1 text-white focus:outline-none cursor-pointer"
                          >
                            {Object.entries(informacionGrupos).map(([gCode, gInfo]) => {
                              const ocupanteId = gruposOcupadosEnSemestre[gCode];
                              const estaOcupadoPorOtro = ocupanteId && ocupanteId !== curso.id;
                              const nombreOtro = estaOcupadoPorOtro ? (mapaCursos[ocupanteId]?.nombre || ocupanteId) : "";
                              return (
                                <option
                                  key={gCode}
                                  value={gCode}
                                  disabled={estaOcupadoPorOtro}
                                  className={estaOcupadoPorOtro ? "text-slate-600 bg-slate-900 font-normal" : "text-white font-bold"}
                                >
                                  {gInfo.etiqueta} ({gInfo.diasTexto}){estaOcupadoPorOtro ? ` — 🔒 Ocupado por ${nombreOtro}` : ""}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-emerald-400/90 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                          Disponible
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Modal */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setModalOrganizarSemestre(false)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl cursor-pointer shadow-md"
              >
                Listo y Aplicar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: EDITAR DETALLES DEL CURSO (GRUPO OBLIGATORIO, AULA, DOCENTE) ── */}
      {modalEditarCurso && (
        <FormularioEdicionCursoModal
          curso={modalEditarCurso}
          tema={tema}
          gruposOcupadosEnSemestre={gruposOcupadosEnSemestre}
          mapaCursos={mapaCursos}
          onGuardar={(grupo, aula, docente) => guardarEdicionCurso(modalEditarCurso.cursoId, grupo, aula, docente)}
          onEliminar={() => eliminarCursoDeSemestre(modalEditarCurso.cursoId)}
          onCerrar={() => setModalEditarCurso(null)}
        />
      )}

      {/* ── MODAL 3: CREAR NUEVO SEMESTRE ── */}
      {modalCrearSemestre && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <form onSubmit={manejarCrearSemestre} className={`border ${
            tema === 'dark' ? 'bg-[#0e1526] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
          } rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative`}>
            
            <h3 className="text-base font-black flex items-center space-x-2">
              <Plus className="w-5 h-5 text-blue-500" />
              <span>Crear Nuevo Semestre</span>
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Nombre del Semestre (ej. 2026-II, 2027-I):</label>
              <input
                type="text"
                required
                value={nuevoSemestreInput}
                onChange={(e) => setNuevoSemestreInput(e.target.value)}
                placeholder="2027-I"
                className="w-full px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-700 bg-slate-950 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setModalCrearSemestre(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Crear y Activar
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

// Subcomponente de Formulario de Edición de Curso (Grupo, Aula y Docente)
function FormularioEdicionCursoModal({ curso, tema, gruposOcupadosEnSemestre, mapaCursos, onGuardar, onEliminar, onCerrar }) {
  const [grupoSel, setGrupoSel] = useState(curso.grupo || "grupo01");
  const [aulaInput, setAulaInput] = useState(curso.aula || "Aula por definir");
  const [docenteInput, setDocenteInput] = useState(curso.docente || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(grupoSel, aulaInput.trim() || "Aula por definir", docenteInput.trim());
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <form onSubmit={handleSubmit} className={`border ${
        tema === 'dark' ? 'bg-[#0e1526] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
      } rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative`}>
        
        <button
          type="button"
          onClick={onCerrar}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {curso.cursoId}
            </span>
          </div>
          <h3 className="text-lg font-black leading-tight mt-1">{curso.nombre}</h3>
        </div>

        <div className="space-y-4">
          {/* Grupo (Obligatorio) */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-300 flex items-center justify-between">
              <span>Grupo de Clases (Obligatorio):</span>
              <span className="text-[10px] text-blue-400 font-bold">* Define días y horas</span>
            </label>
            <select
              value={grupoSel}
              onChange={(e) => setGrupoSel(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-700 bg-slate-950 text-white focus:border-blue-500 focus:outline-none"
            >
              {Object.entries(informacionGrupos).map(([gCode, gInfo]) => {
                const ocupanteId = gruposOcupadosEnSemestre?.[gCode];
                const estaOcupadoPorOtro = ocupanteId && ocupanteId !== curso.cursoId;
                const nombreOtro = estaOcupadoPorOtro ? (mapaCursos?.[ocupanteId]?.nombre || ocupanteId) : "";
                return (
                  <option
                    key={gCode}
                    value={gCode}
                    disabled={estaOcupadoPorOtro}
                    className={estaOcupadoPorOtro ? "text-slate-600 bg-slate-900 font-normal" : "text-white font-bold"}
                  >
                    {gInfo.etiqueta} — {gInfo.horario} ({gInfo.diasTexto}){estaOcupadoPorOtro ? ` — 🔒 Ocupado por ${nombreOtro}` : ""}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Nombre de Aula / Salón */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-300 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Nombre de Aula / Salón (Edición Libre):</span>
            </label>
            <input
              type="text"
              value={aulaInput}
              onChange={(e) => setAulaInput(e.target.value)}
              placeholder="Ej. Aula 102, Lab S01, Auditorio B, Virtual..."
              className="w-full px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-700 bg-slate-950 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Nombre del Docente (Opcional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-300 flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-purple-400" />
              <span>Nombre del Docente (Opcional):</span>
            </label>
            <input
              type="text"
              value={docenteInput}
              onChange={(e) => setDocenteInput(e.target.value)}
              placeholder="Ej. Dr. Carlos Ramos"
              className="w-full px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-700 bg-slate-950 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onEliminar}
            className="px-3 py-2 bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 text-xs font-bold rounded-xl border border-rose-500/30 flex items-center space-x-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Quitar de Horario</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onCerrar}
              className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center space-x-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
