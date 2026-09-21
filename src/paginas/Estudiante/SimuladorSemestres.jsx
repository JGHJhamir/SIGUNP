import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTema } from "../../contexto/ContextoTema";
import {
  Sparkles,
  Plus,
  Trash2,
  Calendar,
  Layers,
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import { obtenerPlanEstudiosActual, obtenerNombreCarreraActual } from "../../datos/planesEstudio";

const ROMANOS = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V", 6: "VI", 7: "VII", 8: "VIII", 9: "IX", 10: "X" };

export default function SimuladorSemestres() {
  const { tema } = useTema();
  const [cursosAprobadosReales, setCursosAprobadosReales] = useState([]);
  const [semestresSimulados, setSemestresSimulados] = useState([]);
  const [asignacionCursos, setAsignacionCursos] = useState({});
  const [aprobadosSimulacion, setAprobadosSimulacion] = useState([]);

  const planActual = obtenerPlanEstudiosActual();
  const nombreCarrera = obtenerNombreCarreraActual();

  const planEstudiosCompleto = useMemo(() => {
    return planActual.flatMap((sem) =>
      sem.cursos.map((c) => ({
        id: c.id,
        nombre: c.nombre,
        creditos: c.creditos,
        requisitos: c.requisitos || [],
        ciclo: sem.numeroCiclo
      }))
    );
  }, [planActual]);
  
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
      <div className="rounded-2xl liquid-glass-card glare-hover p-4 sm:p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-500 dark:text-purple-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIMULADOR DE CICLOS FUTUROS</span>
            </div>
            <h1 className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Planificación de Semestres
            </h1>
            <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} max-w-lg`}>
              Organiza de forma prospectiva tus asignaturas pendientes respetando prerrequisitos y límites de créditos.
            </p>
          </div>

          <Link
            to="/estudiante/malla"
            className={`px-3.5 py-2 ${
              tema === 'dark' ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
            } text-xs font-bold rounded-xl border transition-all flex items-center space-x-2 shrink-0 cursor-pointer liquid-btn`}
          >
            <span>Volver a Malla</span>
            <ChevronRight className="w-4 h-4 text-purple-500" />
          </Link>
        </div>
      </div>

      {/* Formulario: Crear Semestre */}
      <div className="rounded-2xl liquid-glass-card glare-hover p-4 sm:p-6 space-y-6">
        <h2 className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider border-b ${
          tema === 'dark' ? 'border-slate-800' : 'border-slate-200'
        } pb-3 flex items-center space-x-2`}>
          <Plus className="w-4 h-4 text-purple-500" />
          <span>Crear Nuevo Semestre en la Simulación</span>
        </h2>

        <form onSubmit={manejarCrearSemestre} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-end">
          <div>
            <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-2`}>Año Académico</label>
            <input
              type="number"
              value={nuevoAnio}
              onChange={(e) => setNuevoAnio(e.target.value)}
              placeholder={`Ej. ${new Date().getFullYear()}`}
              min={new Date().getFullYear()}
              className={`w-full px-3.5 py-2 rounded-xl text-xs font-medium outline-none transition-all ${
                tema === 'dark'
                  ? 'bg-[#090e1a] border-slate-800 text-slate-200 focus:border-purple-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600'
              } border`}
              required
            />
          </div>

          <div>
            <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-2`}>Ciclo</label>
            <select
              value={nuevoCiclo}
              onChange={(e) => setNuevoCiclo(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl text-xs font-medium outline-none transition-all ${
                tema === 'dark'
                  ? 'bg-[#090e1a] border-slate-800 text-slate-200 focus:border-purple-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600'
              } border cursor-pointer`}
            >
              <option value="I">I (Enero - Junio)</option>
              <option value="II">II (Agosto - Diciembre)</option>
              <option value="0">0 (Verano)</option>
            </select>
          </div>

          <div>
            <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-2`}>Límite de Créditos</label>
            <input
              type="number"
              value={nuevoLimite}
              onChange={(e) => setNuevoLimite(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-xl text-xs font-medium outline-none transition-all ${
                tema === 'dark'
                  ? 'bg-[#090e1a] border-slate-800 text-slate-200 focus:border-purple-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600'
              } border`}
              min="1"
              max="35"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Semestre</span>
          </button>
        </form>

        {/* Acciones globales */}
        <div className={`flex flex-col sm:flex-row justify-end items-center gap-3 pt-4 border-t ${
          tema === 'dark' ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <button
            type="button"
            onClick={() => setModoCompacto(!modoCompacto)}
            className={`w-full sm:w-auto px-3.5 py-2 ${
              tema === 'dark' ? 'bg-[#090e1a] border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            } border text-xs font-bold rounded-xl transition-all cursor-pointer`}
          >
            {modoCompacto ? "📋 Vista Detallada" : "📦 Vista Compacta"}
          </button>

          <button
            type="button"
            onClick={() => setMostrarHistorial(!mostrarHistorial)}
            className="w-full sm:w-auto px-3.5 py-2 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 text-purple-500 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            {mostrarHistorial ? "Ocultar historial" : "Mostrar historial"}
          </button>

          <button
            type="button"
            onClick={limpiarTodo}
            className="w-full sm:w-auto px-3.5 py-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-500 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpiar Todo</span>
          </button>
        </div>
      </div>

      {/* Grid de Semestres Simulados */}
      <div className="space-y-4">
        <h3 className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider pl-1 flex items-center space-x-2`}>
          <Layers className="w-4 h-4 text-purple-500" />
          <span>Tus Semestres Planificados ({semestresSimulados.length})</span>
        </h3>

        {semestresSimulados.length === 0 ? (
          <div className={`text-center py-12 ${tema === 'dark' ? 'bg-[#0e1526] border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-sm'} border rounded-2xl space-y-2`}>
            <Calendar className="w-12 h-12 mx-auto text-slate-600" />
            <p className={`text-xs font-extrabold ${tema === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>No tienes semestres planificados en el simulador.</p>
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
                <div key={semestre.id} className={`${tema === 'dark' ? 'bg-[#0e1526] border-slate-800' : 'bg-white border-slate-200 shadow-sm'} rounded-2xl border overflow-hidden flex flex-col justify-between`}>
                  
                  {/* Cabecera del Semestre */}
                  <div className={`px-5 py-4 border-b ${tema === 'dark' ? 'border-slate-800 bg-[#090e1a]' : 'border-slate-200 bg-slate-50'} flex items-center justify-between shrink-0`}>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>
                        {semestre.año}-{semestre.ciclo === "0" ? "0" : semestre.ciclo}
                      </span>
                      <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-0.5 rounded-full font-bold">
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

                        return (
                          <div
                            key={curso.id}
                            className={`p-3.5 rounded-2xl border flex flex-col justify-between space-y-2 transition-all shadow-sm glare-hover hover-scale-pop ${
                              aprobado
                                ? tema === 'dark'
                                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                                  : "bg-emerald-50 border-emerald-300 text-emerald-900"
                                : tema === 'dark'
                                  ? "bg-[#090e1a]/80 border-white/10 text-slate-200"
                                  : "bg-white border-slate-200 text-slate-900"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="max-w-[70%]">
                                <div className={`text-[9px] font-mono font-extrabold ${
                                  tema === 'dark' ? 'text-slate-400' : 'text-slate-600'
                                } leading-none flex items-center gap-1.5 flex-wrap`}>
                                  <span>{curso.id}</span>
                                  <span>·</span>
                                  <span>{curso.creditos} CR</span>
                                  <span>·</span>
                                  <span className={`font-bold px-1.5 py-0.5 rounded ${
                                    tema === 'dark' ? 'text-purple-400 bg-purple-500/10' : 'text-purple-700 bg-purple-100'
                                  }`}>Ciclo {ROMANOS[curso.ciclo]}</span>
                                </div>
                                <div className={`text-xs font-black ${
                                  tema === 'dark' ? 'text-slate-100' : 'text-slate-900'
                                } leading-tight mt-1.5`}>
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
                                  className={`text-[10px] ${
                                    tema === 'dark'
                                      ? 'bg-[#090e1a] border-white/10 text-slate-200'
                                      : 'bg-slate-100 border-slate-300 text-slate-800'
                                  } border px-2 py-1 rounded-xl font-bold focus:outline-none cursor-pointer`}
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
                              <div className={`flex justify-between items-center text-[9px] font-semibold border-t ${
                                tema === 'dark' ? 'border-white/10' : 'border-slate-200'
                              } pt-2 mt-1`}>
                                <span className={requisitosCumplidos ? (tema === 'dark' ? "text-slate-400" : "text-slate-600") : "text-amber-500 font-bold flex items-center space-x-0.5"}>
                                  {!requisitosCumplidos && <AlertTriangle className="w-3 h-3 text-amber-500 inline mr-1" />}
                                  <span>{curso.requisitos.length > 0 ? `Req: ${curso.requisitos.join(" - ")}` : "Sin prerrequisitos"}</span>
                                </span>

                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black ${
                                  aprobado
                                    ? tema === 'dark' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                    : tema === 'dark' ? "bg-slate-800 text-slate-400" : "bg-slate-200 text-slate-600"
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
                      className={`w-full px-3.5 py-2.5 ${
                        tema === 'dark'
                          ? 'bg-[#090e1a]/80 border-white/10 text-slate-300 hover:border-purple-500/40'
                          : 'bg-white border-slate-200 text-slate-800 hover:border-purple-500/40 shadow-sm'
                      } border text-xs font-bold rounded-2xl focus:outline-none cursor-pointer`}
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
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                      : estado.tipo === "error"
                      ? "bg-rose-500/10 border-rose-500/30 text-rose-500"
                      : estado.tipo === "warning"
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                      : tema === 'dark' ? "bg-[#090e1a]/60 border-white/10 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600"
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
        <div className={`liquid-glass-card rounded-3xl p-6 shadow-xl space-y-4 backdrop-blur-2xl`}>
          <h3 className={`text-xs font-black ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider flex items-center space-x-2`}>
            <Layers className="w-4 h-4 text-purple-500" />
            <span>Resumen del Historial de Semestres</span>
          </h3>

          <div className="space-y-3 pl-1 font-sans text-xs">
            {semestresSimulados.map((semestre) => {
              const cursos = obtenerCursosDeSemestre(semestre.id);
              if (cursos.length === 0) return null;
              
              return (
                <div key={semestre.id} className={`border-b ${
                  tema === 'dark' ? 'border-white/10' : 'border-slate-200'
                } pb-3 last:border-0 last:pb-0`}>
                  <div className={`font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>{semestre.id}</div>
                  <ul className="mt-1.5 space-y-1 pl-4">
                    {cursos.map((c) => {
                      const aprobado = aprobadosSimulacion.includes(c.id);
                      return (
                        <li key={c.id} className="flex items-center space-x-2 text-xs">
                          <span className={aprobado ? "text-emerald-500 font-bold" : "text-slate-400"}>
                            {aprobado ? "✓" : "○"}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">{c.id}</span>
                          <span className={`font-semibold ${tema === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>({c.creditos} CR)</span>
                          <span className="text-[9px] font-bold text-purple-500">Ciclo {ROMANOS[c.ciclo]}</span>
                          <span>—</span>
                          <span className={`truncate ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{c.nombre}</span>
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
