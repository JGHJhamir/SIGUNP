import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  CheckCircle2,
  BookOpen,
  Award,
  ArrowRight,
  ArrowLeft,
  CheckSquare,
  Square,
  SlidersHorizontal,
  GraduationCap,
  Sun,
  Moon
} from "lucide-react";
import { useTema } from "../contexto/ContextoTema";
import { obtenerPlanEstudiosActual } from "../datos/planesEstudio";

const NOMBRES_CICLO = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export default function ConfiguracionInicial() {
  const navigate = useNavigate();
  const { tema, alternarTema } = useTema();

  const carreraKey = (localStorage.getItem("carreraActiva") || "").toLowerCase().includes("contab") ? "contabilidad" : "informatica";
  const planActual = obtenerPlanEstudiosActual();
  
  const cursosReales = planActual.flatMap((sem) =>
    sem.cursos.map((c) => ({
      id: c.id,
      nombre: c.nombre,
      ciclo: NOMBRES_CICLO[sem.numeroCiclo - 1] || `Ciclo ${sem.numeroCiclo}`,
      creditos: c.creditos
    }))
  );

  const [aprobados, setAprobados] = useState(() => {
    const storageKeyAprobados = `cursosAprobados_${carreraKey}`;
    const guardados = localStorage.getItem(storageKeyAprobados) || localStorage.getItem("cursosAprobados");
    if (guardados) {
      try {
        return JSON.parse(guardados);
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  const [cicloActivo, setCicloActivo] = useState("I");
  const tutorialPrevioCompletado = localStorage.getItem("tutorialCompletado") === "true";

  // Lista de 10 Pestañas: Ciclo I al X
  const ciclos = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  const toggleCurso = (id) => {
    setAprobados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const manejarConfirmar = () => {
    localStorage.setItem("tutorialCompletado", "true");
    localStorage.setItem(`cursosAprobados_${carreraKey}`, JSON.stringify(aprobados));
    localStorage.setItem("cursosAprobados", JSON.stringify(aprobados));
    navigate("/estudiante/inicio");
  };

  // Cursos del ciclo activo
  const cursosDelCiclo = cursosReales.filter((c) => c.ciclo === cicloActivo);

  const todosAprobadosEnCiclo =
    cursosDelCiclo.length > 0 &&
    cursosDelCiclo.every((c) => aprobados.includes(c.id));

  const toggleTodoElCiclo = () => {
    const idsCiclo = cursosDelCiclo.map((c) => c.id);
    if (todosAprobadosEnCiclo) {
      setAprobados((prev) => prev.filter((id) => !idsCiclo.includes(id)));
    } else {
      setAprobados((prev) => {
        const filtrados = prev.filter((id) => !idsCiclo.includes(id));
        return [...filtrados, ...idsCiclo];
      });
    }
  };

  // Métricas de progreso
  const creditosAprobados = cursosReales
    .filter((c) => aprobados.includes(c.id))
    .reduce((acc, c) => acc + c.creditos, 0);

  const obligatoriosAprobados = aprobados.length;
  const porcentajeObligatorios = Math.round((obligatoriosAprobados / 63) * 100);
  const porcentajeAvance = Math.min(100, Math.round((creditosAprobados / 205) * 100));

  const irSiguientePestana = () => {
    const idx = ciclos.indexOf(cicloActivo);
    if (idx < ciclos.length - 1) {
      setCicloActivo(ciclos[idx + 1]);
    }
  };

  const irAnteriorPestana = () => {
    const idx = ciclos.indexOf(cicloActivo);
    if (idx > 0) {
      setCicloActivo(ciclos[idx - 1]);
    }
  };

  return (
    <div className={`min-h-screen ${
      tema === 'dark' ? 'bg-[#060911] text-slate-100' : 'bg-slate-50 text-slate-900'
    } flex items-center justify-center p-4 md:p-8 font-sans selection:bg-blue-600 selection:text-white relative overflow-hidden transition-colors duration-300`}>

      {/* Background Glowing Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full bg-blue-600/15 dark:bg-blue-500/12 blur-[130px] animate-float-orb-1"></div>
        <div className="absolute -bottom-20 -right-20 w-[700px] h-[700px] rounded-full bg-indigo-600/15 dark:bg-purple-500/12 blur-[150px] animate-float-orb-2"></div>
      </div>

      <div className="w-full max-w-5xl liquid-glass-modal rounded-3xl border p-4 sm:p-6 md:p-10 relative overflow-hidden z-10 animate-scale-in transition-colors duration-300 shadow-2xl">
        
        {/* Step Indicator Bar */}
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b ${tema === 'dark' ? 'border-slate-800' : 'border-slate-200'} pb-4 gap-3`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-500 border border-blue-500/30 flex items-center justify-center font-black text-xs shadow-sm shrink-0">
              01
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>
                  Calibración Malla: Ciclo {cicloActivo}
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded border bg-blue-500/10 text-blue-500 border-blue-500/30">
                  Cursos Obligatorios
                </span>
              </div>
              <span className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} block font-medium mt-0.5`}>
                Marca las asignaturas obligatorias que ya has aprobado.
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            {tutorialPrevioCompletado && (
              <button
                type="button"
                onClick={() => navigate("/estudiante/inicio")}
                className={`px-3.5 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 shadow-sm ${
                  tema === 'dark'
                    ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750"
                    : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5 text-blue-500" />
                <span>Volver al Panel</span>
              </button>
            )}

            <button
              type="button"
              onClick={alternarTema}
              className={`px-3.5 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 shadow-sm ${
                tema === 'dark'
                  ? "bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-750"
                  : "bg-slate-100 border-slate-300 text-amber-700 hover:bg-slate-200"
              }`}
            >
              {tema === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
              <span className="hidden sm:inline">{tema === 'dark' ? "Claro" : "Oscuro"}</span>
            </button>

            <div className={`hidden sm:flex items-center space-x-2 text-xs ${
              tema === 'dark' ? 'text-slate-400 bg-slate-950/60 border-slate-800' : 'text-slate-600 bg-slate-100 border-slate-200'
            } font-semibold px-3 py-1.5 rounded-lg border`}>
              <GraduationCap className="w-4 h-4 text-blue-500" />
              <span>Plan 2018-1 · Ing. Informática</span>
            </div>
          </div>
        </div>

        {/* Encabezado Principal */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center mb-3 sm:mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-900 border border-slate-700 p-0.5 flex items-center justify-center overflow-hidden shadow-sm">
              <img src="/sigunp-logo.png" alt="SIGUNP" style={{ clipPath: 'circle(49% at 50% 50%)' }} className="w-full h-full object-cover rounded-full" />
            </div>
          </div>

          <h1 className={`text-xl sm:text-2xl md:text-3xl font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>
            Indica tus Asignaturas Aprobadas
          </h1>
          <p className={`text-xs md:text-sm ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} mt-1.5 max-w-xl mx-auto leading-relaxed`}>
            Marca los cursos obligatorios que ya has superado del Ciclo I al X.
          </p>
        </div>

        {/* Dynamic Progress Metric Bar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          
          {/* Cursos Obligatorios */}
          <div className={`ring-2 ring-blue-500/50 ${tema === 'dark' ? 'bg-slate-950/80 border-slate-800/90' : 'bg-blue-50/60 border-blue-200'} rounded-2xl p-4 border flex items-center space-x-3.5 shadow-lg transition-all`}>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <div className={`text-xl font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>{obligatoriosAprobados} <span className="text-xs font-bold text-slate-400">/ 63</span></div>
                <span className="text-[10px] font-black text-blue-500 dark:text-blue-400">{porcentajeObligatorios}%</span>
              </div>
              <div className={`text-[10px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider`}>Asignaturas Aprobadas</div>
            </div>
          </div>

          {/* Créditos Acumulados */}
          <div className={`${tema === 'dark' ? 'bg-slate-950/80 border-slate-800/90' : 'bg-emerald-50/60 border-emerald-200'} rounded-2xl p-4 border flex items-center space-x-3.5 shadow-lg`}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xl font-black text-emerald-500 dark:text-emerald-400">{creditosAprobados} <span className="text-xs font-bold text-slate-400">/ 205</span></div>
              <div className={`text-[10px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider`}>Créditos (CR)</div>
            </div>
          </div>

          {/* Avance Total */}
          <div className={`${tema === 'dark' ? 'bg-slate-950/80 border-slate-800/90' : 'bg-slate-50 border-slate-200'} rounded-2xl p-4 border flex flex-col justify-center space-y-2 shadow-lg`}>
            <div className={`flex justify-between items-center text-[10px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider`}>
              <span>Avance Global</span>
              <span className="text-blue-500 dark:text-blue-400 font-extrabold">{porcentajeAvance}%</span>
            </div>
            <div className={`w-full ${tema === 'dark' ? 'bg-slate-800/80' : 'bg-slate-200'} h-2 rounded-full overflow-hidden`}>
              <div
                className="bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${porcentajeAvance}%` }}
              ></div>
            </div>
          </div>

        </div>

        {/* ── BARRA DE 10 PESTAÑAS (Ciclo I al X) ── */}
        <div className={`flex space-x-1.5 mb-6 border-b ${tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'} pb-0 overflow-x-auto no-scrollbar`}>
          {ciclos.map((ciclo) => {
            const estaActivo = cicloActivo === ciclo;

            const aprobadosEnCiclo = cursosReales.filter(
              (c) => c.ciclo === ciclo && aprobados.includes(c.id)
            ).length;
            const totalEnCiclo = cursosReales.filter((c) => c.ciclo === ciclo).length;

            return (
              <button
                key={ciclo}
                type="button"
                onClick={() => setCicloActivo(ciclo)}
                className={`px-4 py-3 text-xs font-extrabold rounded-t-2xl shrink-0 transition-all border-b-2 cursor-pointer ${
                  estaActivo
                    ? "text-blue-500 dark:text-blue-400 border-blue-500 bg-blue-500/10 shadow-inner"
                    : tema === 'dark'
                    ? "text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/40"
                    : "text-slate-500 border-transparent hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Ciclo {ciclo}
                {aprobadosEnCiclo > 0 && (
                  <span className="ml-2 text-[9px] bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-black">
                    {aprobadosEnCiclo}/{totalEnCiclo}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── CONTENIDO VISTA DE CICLO ── */}
        <div className="space-y-6 animate-fadeIn">
          {/* Acciones del ciclo actual */}
          <div className="flex justify-between items-center px-1">
            <span className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider flex items-center space-x-2`}>
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-500" />
              <span>Asignaturas del Ciclo {cicloActivo} ({cursosDelCiclo.length} cursos)</span>
            </span>

            <button
              type="button"
              onClick={toggleTodoElCiclo}
              className="text-xs font-extrabold text-blue-500 dark:text-blue-400 hover:opacity-80 transition-all flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 cursor-pointer shadow-sm"
            >
              {todosAprobadosEnCiclo ? <CheckSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Square className="w-4 h-4 text-blue-500" />}
              <span>{todosAprobadosEnCiclo ? "Desmarcar este ciclo" : "Marcar todo el ciclo"}</span>
            </button>
          </div>

          {/* Listado de cursos obligatorios del ciclo activo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-80 overflow-y-auto pr-1">
            {cursosDelCiclo.map((curso) => {
              const estaSeleccionado = aprobados.includes(curso.id);

              return (
                <button
                  key={curso.id}
                  type="button"
                  onClick={() => toggleCurso(curso.id)}
                  className={`p-4 rounded-2xl border text-left flex items-start space-x-3.5 transition-all duration-200 cursor-pointer group ${
                    estaSeleccionado
                      ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-900 dark:text-white shadow-lg shadow-emerald-500/5"
                      : tema === 'dark'
                      ? "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-slate-300"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                      estaSeleccionado
                        ? "bg-emerald-500 border-emerald-400 text-slate-950"
                        : "bg-slate-200 dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                    }`}
                  >
                    {estaSeleccionado && <CheckCircle2 className="w-4 h-4 font-bold" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-extrabold leading-tight ${
                      estaSeleccionado
                        ? "text-emerald-600 dark:text-emerald-300"
                        : tema === 'dark' ? "text-slate-100" : "text-slate-900"
                    }`}>
                      <span>{curso.nombre}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1.5 flex items-center space-x-2 font-mono">
                      <span className={`px-2 py-0.5 rounded ${
                        tema === 'dark' ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-200 text-slate-700 border-slate-300'
                      } border font-bold`}>{curso.id}</span>
                      <span>·</span>
                      <span className={`font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{curso.creditos} CR</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Navegación entre Pestañas */}
        <div className={`flex flex-col sm:flex-row items-center justify-between border-t ${tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'} pt-6 gap-4 mt-6`}>
          <div className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-center sm:text-left font-medium`}>
            <span className={`${tema === 'dark' ? 'text-white' : 'text-slate-900'} font-black`}>{aprobados.length}</span> / 63 asignaturas marcadas (
            <span className="text-emerald-500 dark:text-emerald-400 font-bold">{creditosAprobados} / 205 CR</span>)
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {tutorialPrevioCompletado && (
              <button
                type="button"
                onClick={() => navigate("/estudiante/inicio")}
                className={`w-full sm:w-auto px-4 py-3.5 ${
                  tema === 'dark' ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-200 hover:bg-slate-300 text-slate-800 border-slate-300'
                } font-extrabold rounded-2xl text-xs border transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm`}
              >
                <ArrowLeft className="w-4 h-4 text-blue-500" />
                <span>Volver al Panel</span>
              </button>
            )}

            {cicloActivo !== "I" && (
              <button
                type="button"
                onClick={irAnteriorPestana}
                className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold rounded-2xl text-xs border border-slate-700 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>
            )}

            {cicloActivo !== "X" ? (
              <button
                type="button"
                onClick={irSiguientePestana}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white font-black rounded-2xl text-sm transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{`Siguiente: Ciclo ${ciclos[ciclos.indexOf(cicloActivo) + 1]}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={manejarConfirmar}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 active:scale-[0.98] text-white font-black rounded-2xl text-sm transition-all shadow-xl shadow-emerald-600/30 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Confirmar e Iniciar Módulos</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
