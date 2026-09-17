import React, { useState, useEffect, useMemo } from "react";
import { useTema } from "../../contexto/ContextoTema";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Save,
  Check,
  Info
} from "lucide-react";
import { obtenerPlanEstudiosActual, obtenerNombreCarreraActual } from "../../datos/planesEstudio";

const CURSOS_APROBADOS_DEFECTO = [
  "ED1292", "SI1447", "ED1331", "MA1470", "SI1358", "SI1216", "MA1408", "ED1297",
  "CB1324", "MA1435", "FI1363", "SI1445", "CS1286", "SI1435", "QU1363"
];

const MATRICULA_DEMO_DEFECTO = {
  "2026-II": {
    cursos: ["SI2418", "MA2333", "ES2300", "FI2411", "SI2452"],
    grupos: {
      "SI2418": "grupo01",
      "MA2333": "grupo04",
      "ES2300": "grupo05",
      "FI2411": "grupo08",
      "SI2452": "grupo09"
    },
    fechaGuardado: new Date().toISOString()
  }
};

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
  const { tema } = useTema();
  const [semestreSeleccionado, setSemestreSeleccionado] = useState("2026-II");
  const [borradorCursos, setBorradorCursos] = useState([]);
  const [borradorGrupos, setBorradorGrupos] = useState({});
  const [matriculasPorSemestre, setMatriculasPorSemestre] = useState({});
  const [cursosAprobados, setCursosAprobados] = useState([]);
  const [conflictos, setConflictos] = useState([]);
  const [notificacion, setNotificacion] = useState(null);
  const [filtroCiclo, setFiltroCiclo] = useState("todos");

  const planActual = obtenerPlanEstudiosActual();
  const nombreCarrera = obtenerNombreCarreraActual();

  const planEstudiosCompleto = useMemo(() => {
    return planActual.flatMap((sem) =>
      sem.cursos.map((c) => ({
        id: c.id,
        nombre: c.nombre,
        creditos: c.creditos,
        ciclo: sem.numeroCiclo,
        requisitos: c.requisitos || []
      }))
    );
  }, [planActual]);

  useEffect(() => {
    let aprobados = JSON.parse(localStorage.getItem("cursosAprobados") || "null");
    if (!aprobados || aprobados.length === 0) {
      aprobados = CURSOS_APROBADOS_DEFECTO;
      localStorage.setItem("cursosAprobados", JSON.stringify(aprobados));
    }
    setCursosAprobados(aprobados);

    let matriculas = JSON.parse(localStorage.getItem("matriculasPorSemestre") || "null");
    if (!matriculas || Object.keys(matriculas).length === 0) {
      matriculas = MATRICULA_DEMO_DEFECTO;
      localStorage.setItem("matriculasPorSemestre", JSON.stringify(matriculas));
      localStorage.setItem("cursosInscritos", JSON.stringify(MATRICULA_DEMO_DEFECTO["2026-II"].cursos));
    }
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
    const ciclos = [...new Set(catalogoDisponible.map((c) => c.ciclo))].sort((a, b) => a - b);
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
    localStorage.setItem("cursosInscritos", JSON.stringify(borradorCursos));
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

      {/* Header Liquid Glass */}
      <div className="liquid-glass-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-xs font-bold mb-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PROCESO DE MATRÍCULA ACADÉMICA</span>
            </div>
            <h1 className={`text-2xl font-black tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>Inscripción de Asignaturas</h1>
            <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
              Selecciona tus cursos ofertados y asigna los horarios correspondientes.
            </p>
          </div>

          {semestresGuardados.length > 0 && (
            <div className="flex items-center space-x-1.5 flex-wrap gap-1">
              <span className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-extrabold uppercase`}>Guardados:</span>
              {semestresGuardados.map((s) => (
                <span key={s} className="text-[10px] font-black bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  ✓ {s}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Selector de Semestre */}
        <div className="pt-2">
          <span className={`text-[10px] font-black ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider block mb-2`}>Selecciona Semestre Académico</span>
          <div className="flex overflow-x-auto no-scrollbar gap-2 max-w-full pb-1">
            {semestresDisponibles.map((sem) => {
              const guardado = !!matriculasPorSemestre[sem];
              const esActivo = semestreSeleccionado === sem;
              return (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setSemestreSeleccionado(sem)}
                  className={`px-4 py-2 rounded-2xl text-xs font-extrabold border transition-all cursor-pointer liquid-btn ${
                    esActivo
                      ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/30 scale-102"
                      : tema === 'dark'
                      ? "bg-[#090e1a]/80 text-slate-400 border-slate-800 hover:text-slate-200"
                      : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {sem}
                  {guardado && <span className="ml-1.5 text-[10px] text-emerald-500 dark:text-emerald-400 font-black">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Borrador Stats Pills */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className={`rounded-2xl p-3.5 text-center border ${
            tema === 'dark' ? 'bg-[#090e1a]/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`text-2xl font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>{borradorCursos.length}</div>
            <div className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-extrabold uppercase tracking-wider mt-0.5`}>Asignaturas</div>
          </div>
          
          <div className={`rounded-2xl p-3.5 text-center border ${
            tema === 'dark' ? 'bg-[#090e1a]/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="text-2xl font-black text-blue-500 dark:text-blue-400">{creditosBorrador}</div>
            <div className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-extrabold uppercase tracking-wider mt-0.5`}>Créditos Elegidos</div>
          </div>

          <div className={`rounded-2xl p-3.5 text-center border transition-all ${
            estaCompleto ? "bg-emerald-500/10 border-emerald-500/30"
            : borradorCursos.length > 0 ? "bg-amber-500/10 border-amber-500/30"
            : tema === 'dark' ? "bg-[#090e1a]/80 border-slate-800" : "bg-slate-50 border-slate-200"
          }`}>
            <div className={`text-2xl font-black ${
              estaCompleto ? "text-emerald-500 dark:text-emerald-400" : borradorCursos.length > 0 ? "text-amber-500 dark:text-amber-400" : tema === 'dark' ? "text-slate-500" : "text-slate-400"
            }`}>
              {cursosConGrupo.length}/{borradorCursos.length}
            </div>
            <div className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-extrabold uppercase tracking-wider mt-0.5`}>Grupos Asignados</div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {notificacion && (
        <div className={`p-4 rounded-2xl flex items-center space-x-3 text-xs font-semibold animate-fadeIn shadow-lg ${
          notificacion.tipo === "success"
            ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400"
            : "bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-400"
        }`}>
          {notificacion.tipo === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
          <span>{notificacion.texto}</span>
        </div>
      )}

      {/* Conflicts Banner */}
      {conflictos.length > 0 && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl space-y-2 animate-fadeIn shadow-lg">
          <h3 className="text-xs font-black text-rose-500 dark:text-rose-400 flex items-center space-x-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Conflicto de Horario Detectado</span>
          </h3>
          {conflictos.map((c, idx) => (
            <p key={idx} className="text-xs text-rose-600 dark:text-rose-300">
              {informacionGrupos[c.grupo]?.etiqueta} ({informacionGrupos[c.grupo]?.horario}):
              &nbsp;<strong>{obtenerNombreCurso(c.cursoA)}</strong> y <strong>{obtenerNombreCurso(c.cursoB)}</strong> coinciden en la misma hora.
            </p>
          ))}
        </div>
      )}

      {/* Paso 1: Seleccionar Cursos */}
      <div className="liquid-glass-card p-5 sm:p-6 space-y-5">
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
          tema === 'dark' ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div>
            <h2 className={`text-sm font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center space-x-2`}>
              <span className="w-6 h-6 rounded-lg bg-blue-600/20 text-blue-500 dark:text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">1</span>
              <span>Selecciona Cursos Habilitados ({semestreSeleccionado})</span>
            </h2>
            <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
              Cursos con todos los prerrequisitos cumplidos según tu Malla.
            </p>
          </div>

          {/* Cycle filter pills */}
          <div className="flex items-center space-x-1.5 flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setFiltroCiclo("todos")}
              className={`px-3 py-1 rounded-xl text-[10px] font-black border transition-all cursor-pointer liquid-btn ${
                filtroCiclo === "todos"
                  ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                  : tema === 'dark'
                  ? "bg-[#090e1a] text-slate-400 border-slate-800 hover:text-slate-200"
                  : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
              }`}
            >
              Todos
            </button>
            {ciclosConCursos.map((ciclo) => (
              <button
                key={ciclo}
                type="button"
                onClick={() => setFiltroCiclo(String(ciclo))}
                className={`px-3 py-1 rounded-xl text-[10px] font-black border transition-all cursor-pointer liquid-btn ${
                  filtroCiclo === String(ciclo)
                    ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                    : tema === 'dark'
                    ? "bg-[#090e1a] text-slate-400 border-slate-800 hover:text-slate-200"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
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
              return (
                <button
                  key={curso.id}
                  type="button"
                  onClick={() => toggleCurso(curso.id)}
                  className={`p-4 rounded-2xl border text-left flex items-start space-x-3 transition-all cursor-pointer glare-hover hover-scale-pop ${
                    estaInscrito
                      ? tema === 'dark'
                        ? "bg-blue-950/50 border-blue-500/50 text-blue-200 shadow-md shadow-blue-500/5"
                        : "bg-blue-50 border-blue-400 text-blue-900 shadow-md shadow-blue-500/5"
                      : tema === 'dark'
                        ? "bg-[#090e1a]/80 border-white/10 text-slate-200 hover:bg-slate-800/40"
                        : "bg-slate-50/90 border-slate-200 text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                    estaInscrito
                      ? "bg-blue-500 border-blue-400 text-white"
                      : tema === 'dark'
                        ? "bg-slate-900 border-slate-700"
                        : "bg-white border-slate-300"
                  }`}>
                    {estaInscrito && <Check className="w-3 h-3 font-bold" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-black ${tema === 'dark' ? 'text-slate-100' : 'text-slate-900'} leading-tight flex items-center justify-between gap-1`}>
                      <span>{curso.nombre}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1.5 font-mono text-[10px]">
                      <span className={`font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{curso.id}</span>
                      <span className="text-slate-400">·</span>
                      <span className={`font-extrabold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>{curso.creditos} CR</span>
                      <span className="text-slate-400">·</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                        estaInscrito
                          ? tema === 'dark' ? "bg-blue-500/20 text-blue-300" : "bg-blue-200 text-blue-900"
                          : tema === 'dark' ? "bg-slate-800 text-slate-400" : "bg-slate-200 text-slate-600"
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
        <div className="liquid-glass-card p-5 sm:p-6 space-y-5">
          <div className={`pb-4 border-b ${tema === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
            <h2 className={`text-sm font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center space-x-2`}>
              <span className="w-6 h-6 rounded-lg bg-blue-600/20 text-blue-500 dark:text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs">2</span>
              <span>Asignación de Grupos y Horarios</span>
            </h2>
            <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
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
                        <span className="bg-slate-950/60 text-white px-2 py-0.5 rounded font-black">
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
                              ? tema === 'dark'
                                ? "bg-slate-950/40 border-slate-800 text-slate-600 cursor-not-allowed opacity-40"
                                : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-40"
                              : tema === 'dark'
                              ? "bg-[#090e1a]/80 border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 text-slate-300"
                              : "bg-slate-50 border-slate-200 hover:border-blue-500/50 hover:bg-slate-100 text-slate-700"
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
