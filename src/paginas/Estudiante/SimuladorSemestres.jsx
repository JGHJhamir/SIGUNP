import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Plus,
  Trash2,
  Calendar,
  Layers,
  AlertTriangle,
  ChevronRight
} from "lucide-react";

const ROMANOS = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI", 7: "VII", 8: "VIII", 9: "IX", 10: "X" };

// Estructura completa de la carrera de Ingeniería Informática - Plan 2018-1
const planEstudiosCompleto = [
  { id: "ED1292", nombre: "Actividad Deportiva", creditos: 2, requisitos: [], ciclo: 1 },
  { id: "SI1447", nombre: "Algoritmos", creditos: 4, requisitos: [], ciclo: 1 },
  { id: "ED1331", nombre: "Comunicación", creditos: 3, requisitos: [], ciclo: 1 },
  { id: "MA1470", nombre: "Geometría Analítica", creditos: 4, requisitos: [], ciclo: 1 },
  { id: "SI1358", nombre: "Herramientas Ofimáticas para la Vida Universitaria", creditos: 3, requisitos: [], ciclo: 1 },
  { id: "SI1216", nombre: "Introducción a la Ingeniería Informática", creditos: 2, requisitos: [], ciclo: 1 },
  { id: "MA1408", nombre: "Matemática Básica", creditos: 4, requisitos: [], ciclo: 1 },
  { id: "ED1297", nombre: "Metodología de los Estudios Superiores Universitarios", creditos: 2, requisitos: [], ciclo: 1 },
  { id: "CB1324", nombre: "Biología y Educación Ambiental", creditos: 3, requisitos: [], ciclo: 2 },
  { id: "MA1435", nombre: "Cálculo I", creditos: 4, requisitos: ["MA1408", "MA1470"], ciclo: 2 },
  { id: "FI1363", nombre: "Concepción Física del Universo", creditos: 3, requisitos: [], ciclo: 2 },
  { id: "SI1445", nombre: "Estructuras Discretas", creditos: 4, requisitos: ["SI1447"], ciclo: 2 },
  { id: "CS1286", nombre: "Filosofía y Ética", creditos: 2, requisitos: [], ciclo: 2 },
  { id: "SI1435", nombre: "Programación I", creditos: 4, requisitos: ["SI1216", "SI1447"], ciclo: 2 },
  { id: "QU1363", nombre: "Química General", creditos: 3, requisitos: [], ciclo: 2 },
  { id: "CA2337", nombre: "Administración", creditos: 3, requisitos: [], ciclo: 3 },
  { id: "MA2441", nombre: "Cálculo II", creditos: 4, requisitos: ["MA1435"], ciclo: 3 },
  { id: "EC2201", nombre: "Economía General", creditos: 2, requisitos: [], ciclo: 3 },
  { id: "FI2410", nombre: "Física I", creditos: 4, requisitos: ["FI1363", "MA1435"], ciclo: 3 },
  { id: "SI2422", nombre: "Programación II", creditos: 4, requisitos: ["SI1435"], ciclo: 3 },
  { id: "CS2397", nombre: "Realidad Nacional y Regional", creditos: 3, requisitos: [], ciclo: 3 },
  { id: "CS2258", nombre: "Sociología", creditos: 2, requisitos: [], ciclo: 3 },
  { id: "ED2278", nombre: "Taller de Arte", creditos: 2, requisitos: [], ciclo: 3 },
  { id: "CA2101", nombre: "Actividad de Responsabilidad Social Universitaria", creditos: 1, requisitos: ["CS2258"], ciclo: 4 },
  { id: "MA2333", nombre: "Álgebra Lineal", creditos: 3, requisitos: ["MA1435"], ciclo: 4 },
  { id: "ES2300", nombre: "Estadística General", creditos: 3, requisitos: ["SI1358"], ciclo: 4 },
  { id: "SI2418", nombre: "Estructura de Datos", creditos: 4, requisitos: ["SI1435", "SI1445"], ciclo: 4 },
  { id: "FI2411", nombre: "Física II", creditos: 4, requisitos: ["FI2410"], ciclo: 4 },
  { id: "SI2452", nombre: "Ingeniería de Procesos de Negocios", creditos: 4, requisitos: ["CA2337"], ciclo: 4 },
  { id: "CO2201", nombre: "Introducción a la Contabilidad", creditos: 2, requisitos: [], ciclo: 4 },
  { id: "CS2259", nombre: "Psicología General", creditos: 2, requisitos: [], ciclo: 4 },
  { id: "SI3422", nombre: "Análisis y Diseño de Sistemas I", creditos: 4, requisitos: ["SI2452"], ciclo: 5 },
  { id: "MA3412", nombre: "Cálculo III", creditos: 4, requisitos: ["MA2441"], ciclo: 5 },
  { id: "FI3492", nombre: "Circuitos Eléctricos y Electrónicos", creditos: 4, requisitos: ["FI2411"], ciclo: 5 },
  { id: "ED3286", nombre: "Discapacidad y Derechos Humanos", creditos: 2, requisitos: ["CS2397"], ciclo: 5 },
  { id: "ED3283", nombre: "Inglés I", creditos: 2, requisitos: [], ciclo: 5 },
  { id: "SI3421", nombre: "Modelado de Datos", creditos: 4, requisitos: ["SI2418"], ciclo: 5 },
  { id: "SI3331", nombre: "Aplicaciones Avanzadas con Hojas de Cálculo", creditos: 3, requisitos: ["SI1447"], ciclo: 5 },
  { id: "SI3334", nombre: "Introducción a los Entornos Operativos", creditos: 3, requisitos: ["SI1216"], ciclo: 5 },
  { id: "SI3423", nombre: "Análisis y Diseño de Sistemas II", creditos: 4, requisitos: ["SI3422"], ciclo: 6 },
  { id: "SI3400", nombre: "Arquitectura de Computadores", creditos: 4, requisitos: ["FI3492"], ciclo: 6 },
  { id: "SI3420", nombre: "Base de Datos", creditos: 4, requisitos: ["SI3421"], ciclo: 6 },
  { id: "ED3287", nombre: "Defensa Nacional", creditos: 2, requisitos: ["CS2397"], ciclo: 6 },
  { id: "ES3336", nombre: "Inferencia y Probabilidades", creditos: 3, requisitos: ["ES2300"], ciclo: 6 },
  { id: "ED3284", nombre: "Inglés II", creditos: 2, requisitos: ["ED3283"], ciclo: 6 },
  { id: "ED3285", nombre: "Taller de Redacción Científica", creditos: 2, requisitos: ["ED1331"], ciclo: 6 },
  { id: "SI3337", nombre: "Análisis de Algoritmos", creditos: 3, requisitos: ["SI2422"], ciclo: 6 },
  { id: "SI3336", nombre: "Gráficos por Computadoras", creditos: 3, requisitos: ["SI2422"], ciclo: 6 },
  { id: "AA3303", nombre: "Logística Empresarial", creditos: 3, requisitos: ["CA2337"], ciclo: 6 },
  { id: "SI3335", nombre: "Teoría de Compiladores", creditos: 3, requisitos: ["SI2418"], ciclo: 6 },
  { id: "IO4447", nombre: "Diseños de Investigación para Ingeniería", creditos: 4, requisitos: ["ED3285", "ES3336"], ciclo: 7 },
  { id: "CA4221", nombre: "Emprendedurismo", creditos: 2, requisitos: [], ciclo: 7 },
  { id: "IO4448", nombre: "Investigación de Operaciones", creditos: 4, requisitos: ["ES3336", "MA2333"], ciclo: 7 },
  { id: "SI4386", nombre: "Programación Visual", creditos: 3, requisitos: ["SI2422"], ciclo: 7 },
  { id: "SI4489", nombre: "Sistema de Administración de Base de Datos", creditos: 4, requisitos: ["SI3420"], ciclo: 7 },
  { id: "SI4490", nombre: "Sistemas Operativos", creditos: 4, requisitos: ["SI2418", "SI3400"], ciclo: 7 },
  { id: "SI4388", nombre: "Métodos de Acceso", creditos: 3, requisitos: ["SI3421"], ciclo: 7 },
  { id: "IO4334", nombre: "Métodos Numéricos", creditos: 3, requisitos: ["MA3412"], ciclo: 7 },
  { id: "SI4387", nombre: "Programación Multimedia", creditos: 3, requisitos: ["SI2422"], ciclo: 7 },
  { id: "IO4332", nombre: "Simulación y Juegos", creditos: 3, requisitos: ["SI2422"], ciclo: 7 },
  { id: "DP4331", nombre: "Derecho Informático", creditos: 3, requisitos: ["CS1286", "ED3286"], ciclo: 8 },
  { id: "SI4488", nombre: "Ingeniería de Software", creditos: 4, requisitos: ["SI3423", "SI4489"], ciclo: 8 },
  { id: "EM4461", nombre: "Microeconomía", creditos: 4, requisitos: ["EC2201"], ciclo: 8 },
  { id: "SI4360", nombre: "Organización y Administración Informática", creditos: 3, requisitos: ["SI3423"], ciclo: 8 },
  { id: "SI4491", nombre: "Redes", creditos: 4, requisitos: ["SI4490"], ciclo: 8 },
  { id: "SI4465", nombre: "Sistemas de Información Gerencial", creditos: 4, requisitos: ["SI4489"], ciclo: 8 },
  { id: "SI5364", nombre: "Elaboración de Proyectos Informáticos", creditos: 3, requisitos: ["SI4360"], ciclo: 9 },
  { id: "IO5365", nombre: "Metodología para el Proyecto de Investigación", creditos: 3, requisitos: ["IO4447", "SI4488"], ciclo: 9 },
  { id: "SI5497", nombre: "Procesos de Desarrollo de Software", creditos: 4, requisitos: ["SI3423"], ciclo: 9 },
  { id: "SI5496", nombre: "Seguridad de la Información", creditos: 4, requisitos: ["SI4491"], ciclo: 9 },
  { id: "SI5441", nombre: "Sistemas de Control y Auditoría Informática", creditos: 4, requisitos: ["DP4331", "SI4488"], ciclo: 9 },
  { id: "SI5365", nombre: "Tecnología y Desarrollo Web", creditos: 3, requisitos: ["SI4488"], ciclo: 9 },
  { id: "SI5370", nombre: "Microcomputadoras", creditos: 3, requisitos: ["SI3400"], ciclo: 9 },
  { id: "II5314", nombre: "Programación de Microbots", creditos: 3, requisitos: ["SI3400"], ciclo: 9 },
  { id: "SI5369", nombre: "Tratamiento Digital de Imágenes y Audio", creditos: 3, requisitos: ["MA3412", "SI2422"], ciclo: 9 },
  { id: "CO5397", nombre: "Contabilidad de Costos y Presupuestos", creditos: 3, requisitos: ["CO2201", "EM4461"], ciclo: 10 },
  { id: "SI5367", nombre: "Desarrollo de la Investigación Informática", creditos: 3, requisitos: ["IO5365"], ciclo: 10 },
  { id: "SI5411", nombre: "Gestión en Informática", creditos: 4, requisitos: ["SI5364"], ciclo: 10 },
  { id: "SI5499", nombre: "Inteligencia de Negocios", creditos: 4, requisitos: ["SI4465"], ciclo: 10 },
  { id: "SI5498", nombre: "Sistemas Orientados a Servicios", creditos: 4, requisitos: ["SI5365"], ciclo: 10 },
  { id: "SI5368", nombre: "Tecnología y Desarrollo Móvil", creditos: 3, requisitos: ["SI5365"], ciclo: 10 },
  { id: "SI5373", nombre: "Trabajo de Investigación", creditos: 3, requisitos: ["IO5365"], ciclo: 10 },
  { id: "SI5361", nombre: "Introducción a la Inteligencia Artificial", creditos: 3, requisitos: ["SI2418"], ciclo: 10 },
  { id: "II5345", nombre: "Planeamiento y Control de Producción", creditos: 3, requisitos: ["IO4448"], ciclo: 10 },
  { id: "II5344", nombre: "Sistemas SCADA", creditos: 3, requisitos: ["SI3400"], ciclo: 10 },
  { id: "SI5371", nombre: "Taller de Servidores", creditos: 3, requisitos: ["SI4491"], ciclo: 10 }
];

const ELECTIVOS_SET = new Set([
  "SI3331", "SI3334", "SI3337", "SI3336", "AA3303", "SI3335",
  "SI4388", "IO4334", "SI4387", "IO4332", "SI5370", "II5314",
  "SI5369", "SI5361", "II5345", "II5344", "SI5371"
]);

export default function SimuladorSemestres() {
  const [cursosAprobadosReales, setCursosAprobadosReales] = useState([]);
  const [semestresSimulados, setSemestresSimulados] = useState([]);
  const [asignacionCursos, setAsignacionCursos] = useState({});
  const [aprobadosSimulacion, setAprobadosSimulacion] = useState([]);
  
  // Estados para el formulario de creación
  const [nuevoAnio, setNuevoAnio] = useState(new Date().getFullYear().toString());
  const [nuevoCiclo, setNuevoCiclo] = useState("I");
  const [nuevoLimite, setNuevoLimite] = useState(24);

  // Estados visuales de interfaz
  const [modoCompacto, setModoCompacto] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(true);

  // Cargar datos locales al iniciar
  useEffect(() => {
    const reales = JSON.parse(localStorage.getItem("cursosAprobados") || "[]");
    setCursosAprobadosReales(reales);

    const semestresGuardados = JSON.parse(localStorage.getItem("simulacionSemestres") || "[]");
    const asignacionGuardada = JSON.parse(localStorage.getItem("simulacionAsignacion") || "{}");
    const aprobadosGuardados = JSON.parse(localStorage.getItem("simulacionAprobados") || "[]");

    setSemestresSimulados(semestresGuardados);
    setAsignacionCursos(asignacionGuardada);
    setAprobadosSimulacion(aprobadosGuardados);
  }, []);

  // Guardar datos automáticos en localStorage al cambiar estados
  const guardarSimulacion = (semestres, asignacion, aprobados) => {
    localStorage.setItem("simulacionSemestres", JSON.stringify(semestres));
    localStorage.setItem("simulacionAsignacion", JSON.stringify(asignacion));
    localStorage.setItem("simulacionAprobados", JSON.stringify(aprobados));
  };

  // Cronología y ordenación de semestres
  const ordenarSemestres = (lista) => {
    return [...lista].sort((a, b) => {
      const añoA = parseInt(a.año);
      const añoB = parseInt(b.año);
      if (añoA !== añoB) return añoA - añoB;

      // Prioridad interna de ciclos por año: 0 (Verano) -> I (Enero-Junio) -> II (Agosto-Diciembre)
      const pesos = { "0": 0, "I": 1, "II": 2 };
      return pesos[a.ciclo] - pesos[b.ciclo];
    });
  };

  // Crear nuevo semestre
  const manejarCrearSemestre = (e) => {
    e.preventDefault();
    
    const anioActual = new Date().getFullYear();
    if (parseInt(nuevoAnio) < anioActual) {
      alert(`El año académico debe ser igual o posterior al año actual (${anioActual}).`);
      return;
    }

    const id = `${nuevoAnio}-${nuevoCiclo}`;
    
    // Evitar semestres duplicados
    if (semestresSimulados.some((s) => s.id === id)) {
      alert(`El semestre ${id} ya existe en tu plan.`);
      return;
    }

    const nuevo = {
      id,
      año: nuevoAnio,
      ciclo: nuevoCiclo,
      limiteCreditos: parseInt(nuevoLimite) || 24
    };

    const semestresActualizados = ordenarSemestres([...semestresSimulados, nuevo]);
    setSemestresSimulados(semestresActualizados);
    guardarSimulacion(semestresActualizados, asignacionCursos, aprobadosSimulacion);
  };

  // Eliminar un semestre y todos los semestres posteriores
  const manejarEliminarSemestre = (idSemestre) => {
    const idx = semestresSimulados.findIndex((s) => s.id === idSemestre);
    if (idx === -1) return;

    // Los semestres a conservar son los anteriores, los posteriores y el actual se eliminan
    const semestresAConservar = semestresSimulados.slice(0, idx);
    const semestresAEliminar = semestresSimulados.slice(idx);
    const idsEliminados = semestresAEliminar.map((s) => s.id);
    
    // Desasignar los cursos que estaban en todos los semestres eliminados
    const asignacionActualizada = { ...asignacionCursos };
    let aprobadosActualizados = [...aprobadosSimulacion];

    Object.keys(asignacionActualizada).forEach((cursoId) => {
      if (idsEliminados.includes(asignacionActualizada[cursoId])) {
        delete asignacionActualizada[cursoId];
        aprobadosActualizados = aprobadosActualizados.filter((cId) => cId !== cursoId);
      }
    });

    setSemestresSimulados(semestresAConservar);
    setAsignacionCursos(asignacionActualizada);
    setAprobadosSimulacion(aprobadosActualizados);
    guardarSimulacion(semestresAConservar, asignacionActualizada, aprobadosActualizados);
  };

  // Asignar curso a un semestre determinado
  const asignarCursoASemestre = (cursoId, idSemestre) => {
    const asignacionActualizada = { ...asignacionCursos };
    
    if (idSemestre === "") {
      delete asignacionActualizada[cursoId];
      // Si se desasigna, también quitamos la aprobación simulada
      setAprobadosSimulacion((prev) => {
        const nuevos = prev.filter((id) => id !== cursoId);
        guardarSimulacion(semestresSimulados, asignacionActualizada, nuevos);
        return nuevos;
      });
    } else {
      asignacionActualizada[cursoId] = idSemestre;
      // Por defecto, al asignarlo a un semestre, se marca como aprobado en la simulación
      setAprobadosSimulacion((prev) => {
        const nuevos = prev.includes(cursoId) ? prev : [...prev, cursoId];
        guardarSimulacion(semestresSimulados, asignacionActualizada, nuevos);
        return nuevos;
      });
    }

    setAsignacionCursos(asignacionActualizada);
  };

  // Alternar si un curso en simulación está aprobado o no
  const toggleAprobadoSimulacion = (cursoId) => {
    let nuevosAprobados;
    if (aprobadosSimulacion.includes(cursoId)) {
      nuevosAprobados = aprobadosSimulacion.filter((id) => id !== cursoId);
    } else {
      nuevosAprobados = [...aprobadosSimulacion, cursoId];
    }
    setAprobadosSimulacion(nuevosAprobados);
    guardarSimulacion(semestresSimulados, asignacionCursos, nuevosAprobados);
  };

  // Vaciar completamente el simulador
  const limpiarTodo = () => {
    if (window.confirm("¿Estás seguro de que deseas limpiar toda la planificación del simulador?")) {
      setSemestresSimulados([]);
      setAsignacionCursos({});
      setAprobadosSimulacion([]);
      localStorage.removeItem("simulacionSemestres");
      localStorage.removeItem("simulacionAsignacion");
      localStorage.removeItem("simulacionAprobados");
    }
  };

  // Filtrar cursos no aprobados en la vida real
  const cursosPendientes = planEstudiosCompleto.filter(
    (curso) => !cursosAprobadosReales.includes(curso.id)
  );

  // Obtener cursos asignados a un semestre particular
  const obtenerCursosDeSemestre = (idSemestre) => {
    return planEstudiosCompleto.filter(
      (curso) => asignacionCursos[curso.id] === idSemestre
    );
  };

  // Determina si los prerrequisitos de un curso están listos antes de llevarlo en su semestre asignado
  const validarPrerrequisitosCurso = (curso, idSemestreActual) => {
    if (curso.requisitos.length === 0) return true;

    // Obtener los semestres que ocurrieron estrictamente antes del semestre actual
    const idxActual = semestresSimulados.findIndex((s) => s.id === idSemestreActual);
    const semestresPrevios = semestresSimulados.slice(0, idxActual);
    const idsSemestresPrevios = semestresPrevios.map((s) => s.id);

    return curso.requisitos.every((reqId) => {
      // 1. ¿Está aprobado en el historial real?
      if (cursosAprobadosReales.includes(reqId)) return true;

      // 2. ¿Está asignado a un semestre anterior Y aprobado en la simulación?
      const semAsignadoReq = asignacionCursos[reqId];
      const estaEnSemestrePrevio = semAsignadoReq && idsSemestresPrevios.includes(semAsignadoReq);
      const estaAprobadoEnSimulacion = aprobadosSimulacion.includes(reqId);

      return estaEnSemestrePrevio && estaAprobadoEnSimulacion;
    });
  };

  // Comprobar si el semestre completo tiene problemas
  const obtenerEstadoSemestre = (idSemestre, cursosSemestre, limite) => {
    // 1. Validar créditos
    const totalCreditos = cursosSemestre.reduce((sum, c) => sum + c.creditos, 0);
    if (totalCreditos > limite) {
      return { tipo: "error", mensaje: `Límite de créditos superado (${totalCreditos}/${limite} CR)` };
    }

    // 2. Validar requisitos de cada curso
    const tieneFaltas = cursosSemestre.some((curso) => !validarPrerrequisitosCurso(curso, idSemestre));
    if (tieneFaltas) {
      return { tipo: "warning", mensaje: "Requisitos pendientes en cursos" };
    }

    // 3. Validar si está finalizado (todos los cursos del semestre aprobados)
    const todosAprobados = cursosSemestre.length > 0 &&
      cursosSemestre.every((c) => aprobadosSimulacion.includes(c.id));

    if (todosAprobados) {
      return { tipo: "success", mensaje: "✓ Finalizado" };
    }

    return { tipo: "info", mensaje: "En planificación" };
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIMULADOR DE CICLOS FUTUROS</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center space-x-3">
              <span>Planificación de Semestres</span>
            </h1>
            <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
              Organiza de forma prospectiva tus asignaturas pendientes respetando prerrequisitos y límites de créditos.
            </p>
          </div>

          <Link
            to="/estudiante/malla"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-2xl border border-slate-700 transition-all flex items-center space-x-2 shrink-0 cursor-pointer shadow-sm"
          >
            <span>Volver a Malla</span>
            <ChevronRight className="w-4 h-4 text-purple-400" />
          </Link>
        </div>
      </div>

      {/* Formulario: Crear Semestre */}
      <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 shadow-xl space-y-6 backdrop-blur-2xl">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-800/80 pb-3 flex items-center space-x-2">
          <Plus className="w-4 h-4 text-purple-400" />
          <span>Crear Nuevo Semestre en la Simulación</span>
        </h2>

        <form onSubmit={manejarCrearSemestre} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">Año Académico</label>
            <input
              type="number"
              value={nuevoAnio}
              onChange={(e) => setNuevoAnio(e.target.value)}
              placeholder={`Ej. ${new Date().getFullYear()}`}
              min={new Date().getFullYear()}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 shadow-inner"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">Ciclo</label>
            <select
              value={nuevoCiclo}
              onChange={(e) => setNuevoCiclo(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-100 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 cursor-pointer shadow-inner"
            >
              <option value="I">I (Enero - Junio)</option>
              <option value="II">II (Agosto - Diciembre)</option>
              <option value="0">0 (Verano)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">Límite de Créditos</label>
            <input
              type="number"
              value={nuevoLimite}
              onChange={(e) => setNuevoLimite(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-100 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 shadow-inner"
              min="1"
              max="35"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs rounded-2xl shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center space-x-1.5 cursor-pointer active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Semestre</span>
          </button>
        </form>

        {/* Acciones globales */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setModoCompacto(!modoCompacto)}
            className="w-full sm:w-auto px-4 py-2 bg-slate-950/80 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
          >
            {modoCompacto ? "📋 Vista Detallada" : "📦 Vista Compacta"}
          </button>

          <button
            type="button"
            onClick={() => setMostrarHistorial(!mostrarHistorial)}
            className="w-full sm:w-auto px-4 py-2 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 text-purple-300 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
          >
            {mostrarHistorial ? "Ocultar historial" : "Mostrar historial"}
          </button>

          <button
            type="button"
            onClick={limpiarTodo}
            className="w-full sm:w-auto px-4 py-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-300 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center space-x-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpiar Todo</span>
          </button>
        </div>
      </div>

      {/* Grid de Semestres Simulados */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider pl-1 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <span>Tus Semestres Planificados ({semestresSimulados.length})</span>
        </h3>

        {semestresSimulados.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/80 border border-slate-800/90 rounded-3xl shadow-xl text-slate-400 backdrop-blur-2xl space-y-2">
            <Calendar className="w-12 h-12 mx-auto text-slate-600" />
            <p className="text-xs font-extrabold text-slate-200">No tienes semestres planificados en el simulador.</p>
            <p className="text-[11px] text-slate-500">Crea un ciclo arriba (ej. 2026-II) para comenzar tu simulación.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
            {semestresSimulados.map((semestre) => {
              const cursosDeEsteSemestre = obtenerCursosDeSemestre(semestre.id);
              const totalCreditos = cursosDeEsteSemestre.reduce((sum, c) => sum + c.creditos, 0);
              const estado = obtenerEstadoSemestre(semestre.id, cursosDeEsteSemestre, semestre.limiteCreditos);

              // Cursos disponibles para añadir
              const cursosAñadibles = cursosPendientes
                .filter((c) => !asignacionCursos[c.id] && validarPrerrequisitosCurso(c, semestre.id))
                .sort((a, b) => a.ciclo - b.ciclo);

              return (
                <div key={semestre.id} className="bg-slate-900/80 rounded-3xl border border-slate-800/90 shadow-xl overflow-hidden flex flex-col justify-between backdrop-blur-2xl">
                  
                  {/* Cabecera del Semestre */}
                  <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/60 shrink-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-black text-white tracking-tight">
                        {semestre.año}-{semestre.ciclo === "0" ? "0" : semestre.ciclo}
                      </span>
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full font-black">
                        {totalCreditos} / {semestre.limiteCreditos} CR
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => manejarEliminarSemestre(semestre.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1.5 hover:bg-rose-500/10 rounded-xl cursor-pointer"
                      title="Eliminar este semestre"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Cuerpo de Cursos */}
                  <div className="flex-1 p-5 space-y-3 min-h-[140px]">
                    {cursosDeEsteSemestre.length === 0 ? (
                      <div className="text-center py-8 text-[11px] text-slate-500 font-medium">
                        Sin asignaturas en este semestre.
                      </div>
                    ) : (
                      cursosDeEsteSemestre.map((curso) => {
                        const aprobado = aprobadosSimulacion.includes(curso.id);
                        const requisitosCumplidos = validarPrerrequisitosCurso(curso, semestre.id);
                        const esElectivo = ELECTIVOS_SET.has(curso.id);

                        return (
                          <div
                            key={curso.id}
                            className={`p-3.5 rounded-2xl border flex flex-col justify-between space-y-2 transition-all shadow-sm ${
                              aprobado
                                ? "bg-emerald-500/10 dark:bg-emerald-500/10 light:bg-emerald-50 border-emerald-500/30 light:border-emerald-300"
                                : esElectivo
                                ? "bg-purple-950/30 dark:bg-purple-950/30 light:bg-purple-50/80 border-purple-500/40 light:border-purple-300"
                                : "bg-slate-950/70 dark:bg-slate-950/70 light:bg-white border-slate-800 dark:border-slate-800 light:border-slate-200"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="max-w-[70%]">
                                <div className="text-[9px] font-mono font-extrabold text-slate-400 light:text-slate-600 leading-none flex items-center gap-1.5 flex-wrap">
                                  <span>{curso.id}</span>
                                  <span>·</span>
                                  <span>{curso.creditos} CR</span>
                                  <span>·</span>
                                  <span className="text-purple-400 light:text-purple-700 font-bold bg-purple-500/10 light:bg-purple-100 px-1.5 py-0.5 rounded">Ciclo {ROMANOS[curso.ciclo]}</span>
                                  {esElectivo && (
                                    <span className="text-amber-300 light:text-purple-900 bg-amber-500/20 light:bg-purple-200 border border-amber-500/30 light:border-purple-300 px-1.5 py-0.5 rounded font-black">⚡ ELECTIVO</span>
                                  )}
                                </div>
                                <div className="text-xs font-black text-slate-100 dark:text-slate-100 light:text-slate-900 leading-tight mt-1.5">
                                  {curso.nombre}
                                </div>
                              </div>

                              <div className="flex items-center space-x-2 shrink-0">
                                {/* Checkbox para aprobar */}
                                <input
                                  type="checkbox"
                                  checked={aprobado}
                                  onChange={() => toggleAprobadoSimulacion(curso.id)}
                                  className="w-4 h-4 text-emerald-500 border-slate-700 bg-slate-950 rounded focus:ring-emerald-500 cursor-pointer"
                                  title="Aprobado en simulación"
                                />

                                {/* Selector para mover o quitar */}
                                <select
                                  value={semestre.id}
                                  onChange={(e) => asignarCursoASemestre(curso.id, e.target.value)}
                                  className="text-[10px] bg-slate-900 border border-slate-700 text-slate-200 px-2 py-1 rounded-xl font-bold focus:outline-none cursor-pointer"
                                >
                                  <option value={semestre.id}>Cambiar</option>
                                  {semestresSimulados
                                    .filter((s) => s.id !== semestre.id)
                                    .map((s) => (
                                      <option key={s.id} value={s.id}>
                                        Mover a {s.id}
                                      </option>
                                    ))}
                                  <option value="">Quitar</option>
                                </select>
                              </div>
                            </div>

                            {/* Detalles de requerimiento */}
                            {!modoCompacto && (
                              <div className="flex justify-between items-center text-[9px] font-semibold border-t border-slate-800/80 pt-2 mt-1">
                                <span className={requisitosCumplidos ? "text-slate-400" : "text-amber-400 font-bold flex items-center space-x-0.5"}>
                                  {!requisitosCumplidos && <AlertTriangle className="w-3 h-3 text-amber-400 inline mr-1" />}
                                  <span>{curso.requisitos.length > 0 ? `Req: ${curso.requisitos.join(" - ")}` : "Sin prerrequisitos"}</span>
                                </span>

                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black ${
                                  aprobado
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : "bg-slate-800 text-slate-400"
                                }`}>
                                  {aprobado ? "Aprobado" : "Pendiente"}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Selector rápido para agregar cursos */}
                  <div className="px-5 pb-3 shrink-0">
                    <select
                      onChange={(e) => {
                        if (e.target.value !== "") {
                          asignarCursoASemestre(e.target.value, semestre.id);
                          e.target.value = "";
                        }
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 text-slate-300 text-xs font-bold rounded-2xl focus:outline-none cursor-pointer shadow-inner"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        + Añadir curso a {semestre.año}-{semestre.ciclo === "0" ? "0" : semestre.ciclo}...
                      </option>
                      {cursosAñadibles.map((c) => (
                        <option key={c.id} value={c.id}>
                          (Ciclo {ROMANOS[c.ciclo]}) {c.id} - {c.nombre} ({c.creditos} CR)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Pie de Semestre: Estado */}
                  <div className={`px-5 py-3 border-t text-[11px] font-extrabold tracking-wide shrink-0 ${
                    estado.tipo === "success"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : estado.tipo === "error"
                      ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                      : estado.tipo === "warning"
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                      : "bg-slate-950/60 border-slate-800 text-slate-400"
                  }`}>
                    {estado.mensaje}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Historial de Semestres (Collapsible) */}
      {mostrarHistorial && semestresSimulados.length > 0 && (
        <div className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800/90 shadow-xl space-y-4 backdrop-blur-2xl">
          <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center space-x-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Resumen del Historial de Semestres</span>
          </h3>

          <div className="space-y-3 pl-1 font-sans text-xs">
            {semestresSimulados.map((semestre) => {
              const cursos = obtenerCursosDeSemestre(semestre.id);
              if (cursos.length === 0) return null;
              
              return (
                <div key={semestre.id} className="border-b border-slate-800/80 pb-3 last:border-0 last:pb-0">
                  <div className="font-black text-white">{semestre.id}</div>
                  <ul className="mt-1.5 space-y-1 pl-4 text-slate-300">
                    {cursos.map((c) => {
                      const aprobado = aprobadosSimulacion.includes(c.id);
                      return (
                        <li key={c.id} className="flex items-center space-x-2 text-xs">
                          <span className={aprobado ? "text-emerald-400 font-bold" : "text-slate-500"}>
                            {aprobado ? "✓" : "○"}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">{c.id}</span>
                          <span className="font-semibold text-slate-200">({c.creditos} CR)</span>
                          <span className="text-[9px] font-bold text-purple-400">Ciclo {ROMANOS[c.ciclo]}</span>
                          <span>—</span>
                          <span className="truncate">{c.nombre}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer corporativo */}
      <footer className="text-center text-[10px] text-slate-500 py-6 border-t border-slate-800/60 font-semibold">
        © 2026 Planificador de Malla • Organización de semestres con datos locales
      </footer>

    </div>
  );
}
