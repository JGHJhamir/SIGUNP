import React, { useState, useEffect, useMemo } from "react";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Save,
  Check,
  Info
} from "lucide-react";

const ELECTIVOS_SET = new Set([
  "SI3331", "SI3334", "SI3337", "SI3336", "AA3303", "SI3335",
  "SI4388", "IO4334", "SI4387", "IO4332", "SI5370", "II5314",
  "SI5369", "SI5361", "II5345", "II5344", "SI5371"
]);

// Plan completo con número de ciclo incluido en cada curso
const planEstudiosCompleto = [
  // ── Ciclo I ──
  { id: "ED1292", nombre: "Actividad Deportiva", creditos: 2, ciclo: 1, requisitos: [] },
  { id: "SI1447", nombre: "Algoritmos", creditos: 4, ciclo: 1, requisitos: [] },
  { id: "ED1331", nombre: "Comunicación", creditos: 3, ciclo: 1, requisitos: [] },
  { id: "MA1470", nombre: "Geometría Analítica", creditos: 4, ciclo: 1, requisitos: [] },
  { id: "SI1358", nombre: "Herramientas Ofimáticas para la Vida Universitaria", creditos: 3, ciclo: 1, requisitos: [] },
  { id: "SI1216", nombre: "Introducción a la Ingeniería Informática", creditos: 2, ciclo: 1, requisitos: [] },
  { id: "MA1408", nombre: "Matemática Básica", creditos: 4, ciclo: 1, requisitos: [] },
  { id: "ED1297", nombre: "Metodología de los Estudios Superiores Universitarios", creditos: 2, ciclo: 1, requisitos: [] },
  // ── Ciclo II ──
  { id: "CB1324", nombre: "Biología y Educación Ambiental", creditos: 3, ciclo: 2, requisitos: [] },
  { id: "MA1435", nombre: "Cálculo I", creditos: 4, ciclo: 2, requisitos: ["MA1408", "MA1470"] },
  { id: "FI1363", nombre: "Concepción Física del Universo", creditos: 3, ciclo: 2, requisitos: [] },
  { id: "SI1445", nombre: "Estructuras Discretas", creditos: 4, ciclo: 2, requisitos: ["SI1447"] },
  { id: "CS1286", nombre: "Filosofía y Ética", creditos: 2, ciclo: 2, requisitos: [] },
  { id: "SI1435", nombre: "Programación I", creditos: 4, ciclo: 2, requisitos: ["SI1216", "SI1447"] },
  { id: "QU1363", nombre: "Química General", creditos: 3, ciclo: 2, requisitos: [] },
  // ── Ciclo III ──
  { id: "CA2337", nombre: "Administración", creditos: 3, ciclo: 3, requisitos: [] },
  { id: "MA2441", nombre: "Cálculo II", creditos: 4, ciclo: 3, requisitos: ["MA1435"] },
  { id: "EC2201", nombre: "Economía General", creditos: 2, ciclo: 3, requisitos: [] },
  { id: "FI2410", nombre: "Física I", creditos: 4, ciclo: 3, requisitos: ["FI1363", "MA1435"] },
  { id: "SI2422", nombre: "Programación II", creditos: 4, ciclo: 3, requisitos: ["SI1435"] },
  { id: "CS2397", nombre: "Realidad Nacional y Regional", creditos: 3, ciclo: 3, requisitos: [] },
  { id: "CS2258", nombre: "Sociología", creditos: 2, ciclo: 3, requisitos: [] },
  { id: "ED2278", nombre: "Taller de Arte", creditos: 2, ciclo: 3, requisitos: [] },
  // ── Ciclo IV ──
  { id: "CA2101", nombre: "Actividad de Responsabilidad Social Universitaria", creditos: 1, ciclo: 4, requisitos: ["CS2258"] },
  { id: "MA2333", nombre: "Álgebra Lineal", creditos: 3, ciclo: 4, requisitos: ["MA1435"] },
  { id: "ES2300", nombre: "Estadística General", creditos: 3, ciclo: 4, requisitos: ["SI1358"] },
  { id: "SI2418", nombre: "Estructura de Datos", creditos: 4, ciclo: 4, requisitos: ["SI1435", "SI1445"] },
  { id: "FI2411", nombre: "Física II", creditos: 4, ciclo: 4, requisitos: ["FI2410"] },
  { id: "SI2452", nombre: "Ingeniería de Procesos de Negocios", creditos: 4, ciclo: 4, requisitos: ["CA2337"] },
  { id: "CO2201", nombre: "Introducción a la Contabilidad", creditos: 2, ciclo: 4, requisitos: [] },
  { id: "CS2259", nombre: "Psicología General", creditos: 2, ciclo: 4, requisitos: [] },
  // ── Ciclo V ──
  { id: "SI3422", nombre: "Análisis y Diseño de Sistemas I", creditos: 4, ciclo: 5, requisitos: ["SI2452"] },
  { id: "MA3412", nombre: "Cálculo III", creditos: 4, ciclo: 5, requisitos: ["MA2441"] },
  { id: "FI3492", nombre: "Circuitos Eléctricos y Electrónicos", creditos: 4, ciclo: 5, requisitos: ["FI2411"] },
  { id: "ED3286", nombre: "Discapacidad y Derechos Humanos", creditos: 2, ciclo: 5, requisitos: ["CS2397"] },
  { id: "ED3283", nombre: "Inglés I", creditos: 2, ciclo: 5, requisitos: [] },
  { id: "SI3421", nombre: "Modelado de Datos", creditos: 4, ciclo: 5, requisitos: ["SI2418"] },
  { id: "SI3331", nombre: "Aplicaciones Avanzadas con Hojas de Cálculo", creditos: 3, ciclo: 5, requisitos: ["SI1447"] },
  { id: "SI3334", nombre: "Introducción a los Entornos Operativos", creditos: 3, ciclo: 5, requisitos: ["SI1216"] },
  // ── Ciclo VI ──
  { id: "SI3423", nombre: "Análisis y Diseño de Sistemas II", creditos: 4, ciclo: 6, requisitos: ["SI3422"] },
  { id: "SI3400", nombre: "Arquitectura de Computadores", creditos: 4, ciclo: 6, requisitos: ["FI3492"] },
  { id: "SI3420", nombre: "Base de Datos", creditos: 4, ciclo: 6, requisitos: ["SI3421"] },
  { id: "ED3287", nombre: "Defensa Nacional", creditos: 2, ciclo: 6, requisitos: ["CS2397"] },
  { id: "ES3336", nombre: "Inferencia y Probabilidades", creditos: 3, ciclo: 6, requisitos: ["ES2300"] },
  { id: "ED3284", nombre: "Inglés II", creditos: 2, ciclo: 6, requisitos: ["ED3283"] },
  { id: "ED3285", nombre: "Taller de Redacción Científica", creditos: 2, ciclo: 6, requisitos: ["ED1331"] },
  { id: "SI3337", nombre: "Análisis de Algoritmos", creditos: 3, ciclo: 6, requisitos: ["SI2422"] },
  { id: "SI3336", nombre: "Gráficos por Computadoras", creditos: 3, ciclo: 6, requisitos: ["SI2422"] },
  { id: "AA3303", nombre: "Logística Empresarial", creditos: 3, ciclo: 6, requisitos: ["CA2337"] },
  { id: "SI3335", nombre: "Teoría de Compiladores", creditos: 3, ciclo: 6, requisitos: ["SI2418"] },
  // ── Ciclo VII ──
  { id: "IO4447", nombre: "Diseños de Investigación para Ingeniería", creditos: 4, ciclo: 7, requisitos: ["ED3285", "ES3336"] },
  { id: "CA4221", nombre: "Emprendedurismo", creditos: 2, ciclo: 7, requisitos: [] },
  { id: "IO4448", nombre: "Investigación de Operaciones", creditos: 4, ciclo: 7, requisitos: ["ES3336", "MA2333"] },
  { id: "SI4386", nombre: "Programación Visual", creditos: 3, ciclo: 7, requisitos: ["SI2422"] },
  { id: "SI4489", nombre: "Sistema de Administración de Base de Datos", creditos: 4, ciclo: 7, requisitos: ["SI3420"] },
  { id: "SI4490", nombre: "Sistemas Operativos", creditos: 4, ciclo: 7, requisitos: ["SI2418", "SI3400"] },
  { id: "SI4388", nombre: "Métodos de Acceso", creditos: 3, ciclo: 7, requisitos: ["SI3421"] },
  { id: "IO4334", nombre: "Métodos Numéricos", creditos: 3, ciclo: 7, requisitos: ["MA3412"] },
  { id: "SI4387", nombre: "Programación Multimedia", creditos: 3, ciclo: 7, requisitos: ["SI2422"] },
  { id: "IO4332", nombre: "Simulación y Juegos", creditos: 3, ciclo: 7, requisitos: ["SI2422"] },
  // ── Ciclo VIII ──
  { id: "DP4331", nombre: "Derecho Informático", creditos: 3, ciclo: 8, requisitos: ["CS1286", "ED3286"] },
  { id: "SI4488", nombre: "Ingeniería de Software", creditos: 4, ciclo: 8, requisitos: ["SI3423", "SI4489"] },
  { id: "EM4461", nombre: "Microeconomía", creditos: 4, ciclo: 8, requisitos: ["EC2201"] },
  { id: "SI4360", nombre: "Organización y Administración Informática", creditos: 3, ciclo: 8, requisitos: ["SI3423"] },
  { id: "SI4491", nombre: "Redes", creditos: 4, ciclo: 8, requisitos: ["SI4490"] },
  { id: "SI4465", nombre: "Sistemas de Información Gerencial", creditos: 4, ciclo: 8, requisitos: ["SI4489"] },
  // ── Ciclo IX ──
  { id: "SI5364", nombre: "Elaboración de Proyectos Informáticos", creditos: 3, ciclo: 9, requisitos: ["SI4360"] },
  { id: "IO5365", nombre: "Metodología para el Proyecto de Investigación", creditos: 3, ciclo: 9, requisitos: ["IO4447", "SI4488"] },
  { id: "SI5497", nombre: "Procesos de Desarrollo de Software", creditos: 4, ciclo: 9, requisitos: ["SI3423"] },
  { id: "SI5496", nombre: "Seguridad de la Información", creditos: 4, ciclo: 9, requisitos: ["SI4491"] },
  { id: "SI5441", nombre: "Sistemas de Control y Auditoría Informática", creditos: 4, ciclo: 9, requisitos: ["DP4331", "SI4488"] },
  { id: "SI5365", nombre: "Tecnología y Desarrollo Web", creditos: 3, ciclo: 9, requisitos: ["SI4488"] },
  { id: "SI5370", nombre: "Microcomputadoras", creditos: 3, ciclo: 9, requisitos: ["SI3400"] },
  { id: "II5314", nombre: "Programación de Microbots", creditos: 3, ciclo: 9, requisitos: ["SI3400"] },
  { id: "SI5369", nombre: "Tratamiento Digital de Imágenes y Audio", creditos: 3, ciclo: 9, requisitos: ["MA3412", "SI2422"] },
  // ── Ciclo X ──
  { id: "CO5397", nombre: "Contabilidad de Costos y Presupuestos", creditos: 3, ciclo: 10, requisitos: ["CO2201", "EM4461"] },
  { id: "SI5367", nombre: "Desarrollo de la Investigación Informática", creditos: 3, ciclo: 10, requisitos: ["IO5365"] },
  { id: "SI5411", nombre: "Gestión en Informática", creditos: 4, ciclo: 10, requisitos: ["SI5364"] },
  { id: "SI5499", nombre: "Inteligencia de Negocios", creditos: 4, ciclo: 10, requisitos: ["SI4465"] },
  { id: "SI5498", nombre: "Sistemas Orientados a Servicios", creditos: 4, ciclo: 10, requisitos: ["SI5365"] },
  { id: "SI5368", nombre: "Tecnología y Desarrollo Móvil", creditos: 3, ciclo: 10, requisitos: ["SI5365"] },
  { id: "SI5373", nombre: "Trabajo de Investigación", creditos: 3, ciclo: 10, requisitos: ["IO5365"] },
  { id: "SI5361", nombre: "Introducción a la Inteligencia Artificial", creditos: 3, ciclo: 10, requisitos: ["SI2418"] },
  { id: "II5345", nombre: "Planeamiento y Control de Producción", creditos: 3, ciclo: 10, requisitos: ["IO4448"] },
  { id: "II5344", nombre: "Sistemas SCADA", creditos: 3, ciclo: 10, requisitos: ["SI3400"] },
  { id: "SI5371", nombre: "Taller de Servidores", creditos: 3, ciclo: 10, requisitos: ["SI4491"] }
];

const NOMBRES_CICLO = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const informacionGrupos = {
  grupo01: { etiqueta: "G-01", horario: "7:00 - 8:40 (Mié₁ 7:00-7:50)", dias: "Lun · Mar · Mié₁" },
  grupo02: { etiqueta: "G-02", horario: "7:00 - 8:40 (Mié₂ 7:50-8:40)", dias: "Mié₂ · Jue · Vie" },
  grupo03: { etiqueta: "G-03", horario: "8:50 - 10:30 (Mié₁ 8:50-9:40)", dias: "Lun · Mar · Mié₁" },
  grupo04: { etiqueta: "G-04", horario: "8:50 - 10:30 (Mié₂ 9:40-10:30)", dias: "Mié₂ · Jue · Vie" },
  grupo05: { etiqueta: "G-05", horario: "10:40 - 12:20 (Mié₁ 10:40-11:30)", dias: "Lun · Mar · Mié₁" },
  grupo06: { etiqueta: "G-06", horario: "10:40 - 12:20 (Mié₂ 11:30-12:20)", dias: "Mié₂ · Jue · Vie" },
  grupo07: { etiqueta: "G-07", horario: "1:50 - 3:30 (Mié₁ 1:50-2:40)", dias: "Lun · Mar · Mié₁" },
  grupo08: { etiqueta: "G-08", horario: "1:50 - 3:30 (Mié₂ 2:40-3:30)", dias: "Mié₂ · Jue · Vie" },
  grupo09: { etiqueta: "G-09", horario: "3:40 - 5:20 (Mié₁ 3:40-4:30)", dias: "Lun · Mar · Mié₁" },
  grupo10: { etiqueta: "G-10", horario: "3:40 - 5:20 (Mié₂ 4:30-5:20)", dias: "Mié₂ · Jue · Vie" },
  grupo11: { etiqueta: "G-11", horario: "5:30 - 7:10 (Mié₁ 5:30-6:20)", dias: "Lun · Mar · Mié₁" },
  grupo12: { etiqueta: "G-12", horario: "5:30 - 7:10 (Mié₂ 6:20-7:10)", dias: "Mié₂ · Jue · Vie" },
  grupo13: { etiqueta: "G-13", horario: "7:20 - 9:00 (Mié₁ 7:20-8:10)", dias: "Lun · Mar · Mié₁" },
  grupo14: { etiqueta: "G-14", horario: "7:20 - 9:00 (Mié₂ 8:10-9:00)", dias: "Mié₂ · Jue · Vie" }
};

const semestresDisponibles = ["2026-II", "2027-I", "2027-II", "2028-I"];

const paletaColores = [
  "bg-blue-950/70 border-blue-500/50 text-blue-300",
  "bg-emerald-950/70 border-emerald-500/50 text-emerald-300",
  "bg-purple-950/70 border-purple-500/50 text-purple-300",
  "bg-amber-950/70 border-amber-500/50 text-amber-300",
  "bg-rose-950/70 border-rose-500/50 text-rose-300",
  "bg-sky-950/70 border-sky-500/50 text-sky-300",
  "bg-indigo-950/70 border-indigo-500/50 text-indigo-300"
];

export default function Matricula() {
  const [semestreSeleccionado, setSemestreSeleccionado] = useState("2026-II");
  const [borradorCursos, setBorradorCursos] = useState([]);
  const [borradorGrupos, setBorradorGrupos] = useState({});
  const [matriculasPorSemestre, setMatriculasPorSemestre] = useState({});
  const [cursosAprobados, setCursosAprobados] = useState([]);
  const [conflictos, setConflictos] = useState([]);
  const [notificacion, setNotificacion] = useState(null);
  const [filtroCiclo, setFiltroCiclo] = useState("todos");

  useEffect(() => {
    const aprobados = JSON.parse(localStorage.getItem("cursosAprobados") || "[]");
    setCursosAprobados(aprobados);
    const matriculas = JSON.parse(localStorage.getItem("matriculasPorSemestre") || "{}");
    setMatriculasPorSemestre(matriculas);
  }, []);

  useEffect(() => {
    const datosExistentes = matriculasPorSemestre[semestreSeleccionado];
    if (datosExistentes) {
      setBorradorCursos(datosExistentes.cursos || []);
      setBorradorGrupos(datosExistentes.grupos || {});
    } else {
      setBorradorCursos([]);
      setBorradorGrupos({});
    }
  }, [semestreSeleccionado, matriculasPorSemestre]);

  useEffect(() => {
    const gruposUsados = {};
    const nuevos = [];
    Object.entries(borradorGrupos).forEach(([cursoId, grupo]) => {
      if (!grupo) return;
      if (!gruposUsados[grupo]) { gruposUsados[grupo] = cursoId; }
      else { nuevos.push({ grupo, cursoA: gruposUsados[grupo], cursoB: cursoId }); }
    });
    setConflictos(nuevos);
  }, [borradorGrupos]);

  const catalogoDisponible = useMemo(() => {
    return planEstudiosCompleto.filter((curso) => {
      return !cursosAprobados.includes(curso.id) &&
        curso.requisitos.every((req) => cursosAprobados.includes(req));
    });
  }, [cursosAprobados]);

  const ciclosConCursos = useMemo(() => {
    const ciclos = [...new Set(catalogoDisponible.map((c) => c.ciclo))].sort();
    return ciclos;
  }, [catalogoDisponible]);

  const catalogoFiltrado = useMemo(() => {
    if (filtroCiclo === "todos") return catalogoDisponible;
    return catalogoDisponible.filter((c) => c.ciclo === Number(filtroCiclo));
  }, [catalogoDisponible, filtroCiclo]);

  const toggleCurso = (cursoId) => {
    if (borradorCursos.includes(cursoId)) {
      setBorradorCursos((prev) => prev.filter((id) => id !== cursoId));
      setBorradorGrupos((prev) => { const c = { ...prev }; delete c[cursoId]; return c; });
    } else {
      setBorradorCursos((prev) => [...prev, cursoId]);
    }
  };

  const asignarGrupo = (cursoId, codigoGrupo) => {
    setBorradorGrupos((prev) => ({
      ...prev,
      [cursoId]: prev[cursoId] === codigoGrupo ? null : codigoGrupo
    }));
  };

  const guardarMatricula = () => {
    if (conflictos.length > 0) {
      setNotificacion({ tipo: "error", texto: "Existen conflictos de horario. Elige grupos diferentes antes de guardar." });
      setTimeout(() => setNotificacion(null), 3500);
      return;
    }
    const nuevasMatriculas = {
      ...matriculasPorSemestre,
      [semestreSeleccionado]: { cursos: borradorCursos, grupos: borradorGrupos, fechaGuardado: new Date().toISOString() }
    };
    setMatriculasPorSemestre(nuevasMatriculas);
    localStorage.setItem("matriculasPorSemestre", JSON.stringify(nuevasMatriculas));
    setNotificacion({ tipo: "success", texto: `¡Matrícula ${semestreSeleccionado} guardada con éxito! Tu horario se actualizó.` });
    setTimeout(() => setNotificacion(null), 4000);
  };

  const obtenerNombreCurso = (id) => planEstudiosCompleto.find((c) => c.id === id)?.nombre || id;

  const creditosBorrador = borradorCursos.reduce((acc, id) => {
    return acc + (planEstudiosCompleto.find((c) => c.id === id)?.creditos || 0);
  }, 0);

  const cursosConGrupo = borradorCursos.filter((id) => borradorGrupos[id]);
  const estaCompleto = borradorCursos.length > 0 && cursosConGrupo.length === borradorCursos.length;
  const semestresGuardados = semestresDisponibles.filter((s) => matriculasPorSemestre[s]);

  return (
    <div className="space-y-6 pb-12">

      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 shadow-xl backdrop-blur-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PROCESO DE MATRÍCULA ACADÉMICA</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Inscripción de Asignaturas</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Selecciona tus cursos ofertados y asigna los horarios correspondientes.
            </p>
          </div>

          {semestresGuardados.length > 0 && (
            <div className="flex items-center space-x-1.5 flex-wrap gap-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase">Guardados:</span>
              {semestresGuardados.map((s) => (
                <span key={s} className="text-[10px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  ✓ {s}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Selector de Semestre */}
        <div className="pt-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">Selecciona Semestre Académico</span>
          <div className="flex overflow-x-auto no-scrollbar gap-2 max-w-full pb-1">
            {semestresDisponibles.map((sem) => {
              const guardado = !!matriculasPorSemestre[sem];
              const esActivo = semestreSeleccionado === sem;
              return (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setSemestreSeleccionado(sem)}
                  className={`px-4 py-2 rounded-2xl text-xs font-extrabold border transition-all cursor-pointer ${
                    esActivo
                      ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20"
                      : "bg-slate-950/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  {sem}
                  {guardado && <span className="ml-1.5 text-[10px] text-emerald-400 font-black">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Borrador Stats Pills */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="bg-slate-950/80 rounded-2xl p-3.5 text-center border border-slate-800 shadow-inner">
            <div className="text-2xl font-black text-white">{borradorCursos.length}</div>
            <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">Asignaturas</div>
          </div>
          
          <div className="bg-slate-950/80 rounded-2xl p-3.5 text-center border border-slate-800 shadow-inner">
            <div className="text-2xl font-black text-blue-400">{creditosBorrador}</div>
            <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">Créditos Elegidos</div>
          </div>

          <div className={`rounded-2xl p-3.5 text-center border transition-all shadow-inner ${
            estaCompleto ? "bg-emerald-500/10 border-emerald-500/30"
            : borradorCursos.length > 0 ? "bg-amber-500/10 border-amber-500/30"
            : "bg-slate-950/80 border-slate-800"
          }`}>
            <div className={`text-2xl font-black ${
              estaCompleto ? "text-emerald-400" : borradorCursos.length > 0 ? "text-amber-400" : "text-slate-500"
            }`}>
              {cursosConGrupo.length}/{borradorCursos.length}
            </div>
            <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">Grupos Asignados</div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {notificacion && (
        <div className={`p-4 rounded-2xl flex items-center space-x-3 text-xs font-semibold animate-fadeIn shadow-lg ${
          notificacion.tipo === "success"
            ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
            : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
        }`}>
          {notificacion.tipo === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
          <span>{notificacion.texto}</span>
        </div>
      )}

      {/* Conflicts Banner */}
      {conflictos.length > 0 && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl space-y-2 animate-fadeIn shadow-lg">
          <h3 className="text-xs font-black text-rose-400 flex items-center space-x-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Conflicto de Horario Detectado</span>
          </h3>
          {conflictos.map((c, idx) => (
            <p key={idx} className="text-xs text-rose-300">
              {informacionGrupos[c.grupo]?.etiqueta} ({informacionGrupos[c.grupo]?.horario}):
              &nbsp;<strong>{obtenerNombreCurso(c.cursoA)}</strong> y <strong>{obtenerNombreCurso(c.cursoB)}</strong> coinciden en la misma hora.
            </p>
          ))}
        </div>
      )}

      {/* Paso 1: Seleccionar Cursos */}
      <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl shadow-xl p-6 backdrop-blur-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-sm font-black text-white flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">1</span>
              <span>Selecciona Cursos Habilitados ({semestreSeleccionado})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Cursos con todos los prerrequisitos cumplidos según tu Malla.
            </p>
          </div>

          {/* Cycle filter pills */}
          <div className="flex items-center space-x-1.5 flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setFiltroCiclo("todos")}
              className={`px-3 py-1 rounded-xl text-[10px] font-black border transition-all cursor-pointer ${
                filtroCiclo === "todos"
                  ? "bg-blue-600 text-white border-blue-500"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
              }`}
            >
              Todos
            </button>
            {ciclosConCursos.map((ciclo) => (
              <button
                key={ciclo}
                type="button"
                onClick={() => setFiltroCiclo(String(ciclo))}
                className={`px-3 py-1 rounded-xl text-[10px] font-black border transition-all cursor-pointer ${
                  filtroCiclo === String(ciclo)
                    ? "bg-blue-600 text-white border-blue-500"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                Ciclo {NOMBRES_CICLO[ciclo]}
              </button>
            ))}
          </div>
        </div>

        {catalogoDisponible.length === 0 ? (
          <div className="text-center py-8 text-slate-400 space-y-2">
            <Info className="w-8 h-8 mx-auto text-slate-500" />
            <p className="text-xs font-bold text-slate-300">No hay cursos disponibles para matricular.</p>
            <p className="text-xs text-slate-500">Ve a la pestaña <strong>Malla Curricular</strong> para marcar los cursos que ya aprobaste.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {catalogoFiltrado.map((curso) => {
              const estaInscrito = borradorCursos.includes(curso.id);
              const esElectivo = ELECTIVOS_SET.has(curso.id);
              return (
                <button
                  key={curso.id}
                  type="button"
                  onClick={() => toggleCurso(curso.id)}
                  className={`p-4 rounded-2xl border text-left flex items-start space-x-3 transition-all cursor-pointer ${
                    estaInscrito
                      ? esElectivo
                        ? "bg-purple-500/20 dark:bg-purple-950/50 light:bg-purple-100 border-purple-500/60 light:border-purple-400 shadow-md shadow-purple-500/10"
                        : "bg-blue-500/10 dark:bg-blue-500/10 light:bg-blue-50 border-blue-500/50 light:border-blue-300 shadow-md shadow-blue-500/5"
                      : esElectivo
                      ? "bg-purple-950/20 dark:bg-purple-950/20 light:bg-purple-50/40 border-purple-900/40 light:border-purple-200 hover:bg-purple-900/30"
                      : "bg-slate-950/60 dark:bg-slate-950/60 light:bg-white border-slate-800 dark:border-slate-800 light:border-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                    estaInscrito
                      ? esElectivo
                        ? "bg-purple-600 border-purple-400 text-white"
                        : "bg-blue-500 border-blue-400 text-slate-950"
                      : "bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border-slate-700 light:border-slate-300"
                  }`}>
                    {estaInscrito && <Check className="w-3 h-3 font-bold" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-slate-100 dark:text-slate-100 light:text-slate-900 leading-tight flex items-center justify-between gap-1">
                      <span>{curso.nombre}</span>
                      {esElectivo && (
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 light:bg-purple-200 light:text-purple-900 border border-purple-500/30 shrink-0">⚡ ELECTIVO</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1.5 font-mono text-[10px]">
                      <span className="text-slate-400 light:text-slate-600 font-bold">{curso.id}</span>
                      <span className="text-slate-600 light:text-slate-400">·</span>
                      <span className="text-slate-300 light:text-slate-800 font-extrabold">{curso.creditos} CR</span>
                      <span className="text-slate-600 light:text-slate-400">·</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                        estaInscrito ? "bg-blue-500/20 text-blue-300 light:bg-blue-200 light:text-blue-900" : "bg-slate-800 light:bg-slate-200 text-slate-400 light:text-slate-600"
                      }`}>
                        Ciclo {NOMBRES_CICLO[curso.ciclo]}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Paso 2: Elegir Grupos */}
      {borradorCursos.length > 0 && (
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl shadow-xl p-6 backdrop-blur-2xl space-y-5">
          <div className="border-b border-slate-800/80 pb-4">
            <h2 className="text-sm font-black text-white flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">2</span>
              <span>Asignación de Grupos y Horarios</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Haz clic en cada grupo disponible para definir tu horario de clases.
            </p>
          </div>

          <div className="space-y-6">
            {borradorCursos.map((cursoId, indice) => {
              const datosCurso = planEstudiosCompleto.find((c) => c.id === cursoId);
              const grupoElegido = borradorGrupos[cursoId];
              const colorCurso = paletaColores[indice % paletaColores.length];

              return (
                <div key={cursoId} className="space-y-2.5">
                  
                  {/* Course header */}
                  <div className={`flex items-center justify-between p-4 rounded-2xl border ${colorCurso}`}>
                    <div>
                      <div className="text-xs font-black leading-tight">{datosCurso?.nombre}</div>
                      <div className="flex items-center space-x-2 mt-1 text-[10px] font-mono font-bold">
                        <span>{cursoId}</span>
                        <span>·</span>
                        <span>{datosCurso?.creditos} CR</span>
                        <span>·</span>
                        <span className="bg-slate-950/60 px-2 py-0.5 rounded font-black">
                          Ciclo {NOMBRES_CICLO[datosCurso?.ciclo]}
                        </span>
                      </div>
                    </div>

                    {grupoElegido ? (
                      <div className="text-right shrink-0">
                        <div className="text-xs font-black">{informacionGrupos[grupoElegido]?.etiqueta}</div>
                        <div className="text-[10px] opacity-80 font-mono">{informacionGrupos[grupoElegido]?.horario}</div>
                      </div>
                    ) : (
                      <span className="text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-xl shrink-0">
                        Sin grupo
                      </span>
                    )}
                  </div>

                  {/* 14 Groups grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                    {Object.entries(informacionGrupos).map(([codigoGrupo, infoGrupo]) => {
                      const estaElegido = grupoElegido === codigoGrupo;
                      const ocupadoPorOtro = !estaElegido && Object.entries(borradorGrupos).some(
                        ([oId, oG]) => oG === codigoGrupo && oId !== cursoId
                      );

                      return (
                        <button
                          key={codigoGrupo}
                          type="button"
                          onClick={() => asignarGrupo(cursoId, codigoGrupo)}
                          disabled={ocupadoPorOtro}
                          title={`${infoGrupo.etiqueta} · ${infoGrupo.horario} · ${infoGrupo.dias}`}
                          className={`p-2.5 rounded-xl border text-center transition-all text-[10px] font-bold cursor-pointer ${
                            estaElegido
                              ? `${colorCurso} shadow-md ring-2 ring-blue-500/40`
                              : ocupadoPorOtro
                              ? "bg-slate-950/40 border-slate-800 text-slate-600 cursor-not-allowed opacity-40"
                              : "bg-slate-950/80 border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 text-slate-300"
                          }`}
                        >
                          <div className="font-black">{infoGrupo.etiqueta}</div>
                          <div className="text-[8px] opacity-70 mt-0.5 font-mono">{infoGrupo.horario}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Sticky Save Button */}
      {borradorCursos.length > 0 && (
        <div className="sticky bottom-4 z-20">
          <button
            type="button"
            onClick={guardarMatricula}
            disabled={conflictos.length > 0}
            className={`w-full py-4 rounded-2xl font-black text-sm tracking-wide shadow-2xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              conflictos.length > 0
                ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                : estaCompleto
                ? "bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/30 active:scale-[0.99]"
                : "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-amber-600/30 active:scale-[0.99]"
            }`}
          >
            <Save className="w-5 h-5" />
            <span>
              {estaCompleto
                ? `Guardar Matrícula Definitiva ${semestreSeleccionado}`
                : `Guardar Borrador (${cursosConGrupo.length}/${borradorCursos.length} grupos asignados)`}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
