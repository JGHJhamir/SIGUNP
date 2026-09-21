import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTema } from "../../contexto/ContextoTema";
import {
  Award,
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Info,
  ChevronRight,
  GraduationCap,
  Sliders,
  UserCheck,
  ArrowUpRight,
  Clock,
  BookMarked
} from "lucide-react";
import { obtenerPlanEstudiosActual, obtenerNombreCarreraActual } from "../../datos/planesEstudio";
import ModalGuiaInteractiva from "../../componentes/ModalGuiaInteractiva";

const NOMBRES_CICLO = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export default function InicioEstudiante() {
  const { tema } = useTema();
  const [cursosAprobados, setCursosAprobados] = useState([]);
  const [cursosInscritos, setCursosInscritos] = useState([]);
  const [mostrarGuia, setMostrarGuia] = useState(false);

  const carreraKey = (localStorage.getItem("carreraActiva") || "").toLowerCase().includes("contab") ? "contabilidad" : "informatica";
  const planActual = obtenerPlanEstudiosActual();
  const nombreCarrera = obtenerNombreCarreraActual();

  const obtenerSaludoHora = () => {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return { texto: "¡Buenos días", icono: "☀️" };
    if (hora >= 12 && hora < 19) return { texto: "¡Buenas tardes", icono: "🌤️" };
    return { texto: "¡Buenas noches", icono: "🌙" };
  };

  const saludo = obtenerSaludoHora();


  const planEstudiosCompleto = useMemo(() => {
    return planActual.flatMap((sem) =>
      sem.cursos.map((c) => ({
        id: c.id,
        nombre: c.nombre,
        creditos: c.creditos,
        ciclo: sem.numeroCiclo
      }))
    );
  }, [planActual]);

  const mapaNombresCursos = useMemo(() => {
    const mapa = {};
    planEstudiosCompleto.forEach((c) => { mapa[c.id] = c.nombre; });
    return mapa;
  }, [planEstudiosCompleto]);

  const totalCreditosPlan = useMemo(() => {
    return planEstudiosCompleto.reduce((acc, c) => acc + c.creditos, 0);
  }, [planEstudiosCompleto]);

  const totalCursosPlan = planEstudiosCompleto.length;

  useEffect(() => {
    const storageKeyAprobados = `cursosAprobados_${carreraKey}`;
    let aprobados = JSON.parse(localStorage.getItem(storageKeyAprobados) || localStorage.getItem("cursosAprobados") || "[]");
    setCursosAprobados(aprobados);

    const matriculas = JSON.parse(localStorage.getItem(`matriculas_${carreraKey}`) || localStorage.getItem("matriculasPorSemestre") || "{}");
    const inscritos = matriculas["2026-II"]?.cursos || JSON.parse(localStorage.getItem("cursosInscritos") || "[]");
    setCursosInscritos(inscritos);
  }, [carreraKey]);

  const creditosAprobados = planEstudiosCompleto
    .filter((c) => cursosAprobados.includes(c.id))
    .reduce((acc, c) => acc + c.creditos, 0);

  const totalObligatoriosAprobados = cursosAprobados.length;
  const porcentajeObligatorios = Math.round((totalObligatoriosAprobados / (totalCursosPlan || 1)) * 100);

  const calcularCicloEstimado = () => {
    if (cursosAprobados.length === 0) return "Ciclo I";
    for (let c = 1; c <= 10; c++) {
      const obligatoriosDelCiclo = planEstudiosCompleto.filter(
        (curso) => curso.ciclo === c
      );
      const tienePendiente = obligatoriosDelCiclo.some(
        (curso) => !cursosAprobados.includes(curso.id)
      );
      if (tienePendiente) {
        return `Ciclo ${NOMBRES_CICLO[c - 1]}`;
      }
    }
    return "Ciclo X (Egreso)";
  };

  const nombreCiclo = calcularCicloEstimado();
  const porcentajeProgreso = Math.min(100, Math.round((creditosAprobados / 205) * 100));

  const nombreEstudiante = localStorage.getItem("nombreEstudiante")
    ? localStorage.getItem("nombreEstudiante").split(" ")[0]
    : "Estudiante";

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* Hero Banner Principal */}
      <div className="relative overflow-hidden rounded-2xl liquid-glass-card glare-hover p-4 sm:p-6 md:p-8 transition-all">
        {/* Glow de fondo decorativo */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 relative z-10">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="shrink-0 flex items-center justify-center">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl ${
                tema === 'dark' ? 'bg-[#090e1a]/90 border-white/10' : 'bg-white border-slate-200 shadow-md'
              } border p-0.5 flex items-center justify-center overflow-hidden shadow-xs hover-scale-pop`}>
                <img src="/sigunp-logo.png" alt="SIGUNP Logo" style={{ clipPath: 'circle(49% at 50% 50%)' }} className="w-full h-full object-cover rounded-full" />
              </div>
            </div>

            <div className="space-y-0.5 sm:space-y-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[9px] sm:text-[11px] font-bold ${
                  tema === 'dark' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200'
                } border shadow-2xs`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                  <span>PORTAL ACADÉMICO</span>
                </span>
                <span className={`hidden sm:inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium ${
                  tema === 'dark' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : 'bg-slate-100 text-slate-600 border-slate-200'
                } border`}>
                  <Info className="w-3 h-3 text-blue-500 shrink-0" />
                  <span>{nombreCarrera}</span>
                </span>
              </div>

              <h1 className={`text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {saludo.texto}, {nombreEstudiante}! {saludo.icono}
              </h1>
              <p className={`text-[11px] sm:text-sm ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} max-w-xl`}>
                Plan Curricular Oficial · Universidad Nacional de Piura
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 self-stretch sm:self-auto justify-between sm:justify-start">
            <button
              onClick={() => setMostrarGuia(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-blue-500/20 flex items-center space-x-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Guía Interactiva</span>
            </button>

            <div className={`flex items-center space-x-2.5 ${
              tema === 'dark' ? 'bg-[#090e1a]/80 border-white/10' : 'bg-white/90 border-slate-200 shadow-xs'
            } border px-3 py-2 sm:px-4 sm:py-2 rounded-xl hover-scale-pop`}>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 shrink-0" />
                <div>
                  <div className={`text-[8px] sm:text-[10px] uppercase tracking-wider font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Semestre Activo</div>
                  <div className={`text-xs sm:text-sm font-extrabold ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>2026-I</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas de Métricas Resumen (KPIs) - Fila Única Responsive (Celular y Escritorio) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        
        {/* Créditos Aprobados */}
        <div className="p-2.5 sm:p-4 rounded-xl liquid-glass-card glare-hover hover-scale-pop flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className={`text-[9px] sm:text-[11px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider truncate`}>
              Créditos
            </span>
            <div className={`w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg ${tema === 'dark' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-200'} border flex items-center justify-center shrink-0`}>
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
          </div>

          <div className="mt-1.5 sm:mt-2 space-y-1">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline space-x-0.5 sm:space-x-1">
                <span className={`text-base sm:text-2xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>{creditosAprobados}</span>
                <span className={`text-[9px] sm:text-[11px] font-medium ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/205</span>
              </div>
              <span className="text-blue-500 font-bold text-[10px] sm:text-xs">{porcentajeProgreso}%</span>
            </div>

            <div className={`w-full ${tema === 'dark' ? 'bg-slate-800/80' : 'bg-slate-200'} h-1 sm:h-1.5 rounded-full overflow-hidden`}>
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${porcentajeProgreso}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cursos Aprobados */}
        <div className="p-2.5 sm:p-4 rounded-xl liquid-glass-card glare-hover hover-scale-pop flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className={`text-[9px] sm:text-[11px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider truncate`}>
              Cursos
            </span>
            <div className={`w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg ${tema === 'dark' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-200'} border flex items-center justify-center shrink-0`}>
              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
          </div>

          <div className="mt-1.5 sm:mt-2 space-y-1">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline space-x-0.5 sm:space-x-1">
                <span className={`text-base sm:text-2xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>{totalObligatoriosAprobados}</span>
                <span className={`text-[9px] sm:text-[11px] font-medium ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/63</span>
              </div>
              <span className="text-emerald-500 font-bold text-[10px] sm:text-xs">{porcentajeObligatorios}%</span>
            </div>

            <div className={`w-full ${tema === 'dark' ? 'bg-slate-800/80' : 'bg-slate-200'} h-1 sm:h-1.5 rounded-full overflow-hidden`}>
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${porcentajeObligatorios}%` }} />
            </div>
          </div>
        </div>

        {/* Ciclo Estimado */}
        <div className="p-2.5 sm:p-4 rounded-xl liquid-glass-card glare-hover hover-scale-pop flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className={`text-[9px] sm:text-[11px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider truncate`}>
              Ciclo
            </span>
            <div className={`w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg ${tema === 'dark' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-purple-50 text-purple-600 border-purple-200'} border flex items-center justify-center shrink-0`}>
              <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
          </div>

          <div className="mt-1.5 sm:mt-2 flex items-center justify-between">
            <span className={`text-sm sm:text-2xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'} truncate`}>{nombreCiclo.replace("Ciclo ", "C-")}</span>
            <span className={`font-bold text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-full ${
              tema === 'dark'
                ? 'text-purple-400 bg-purple-500/10 border border-purple-500/20'
                : 'text-purple-700 bg-purple-50 border border-purple-200'
            }`}>2026-I</span>
          </div>
        </div>

      </div>

      {/* Grid Principal: Cursos Matriculados + Accesos Rápidos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* Columna Izquierda (2/3): Cursos Matriculados en el Semestre */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 sm:p-6 rounded-2xl liquid-glass-card space-y-4">
            
            <div className={`flex items-center justify-between border-b ${
              tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'
            } pb-3 sm:pb-4`}>
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 sm:p-2 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  <BookMarked className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h2 className={`text-sm sm:text-lg font-bold ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>
                    Asignaturas 2026-I
                  </h2>
                  <p className={`text-[11px] sm:text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {cursosInscritos.length} cursos registrados este semestre
                  </p>
                </div>
              </div>

              <Link
                to="/estudiante/horario"
                className={`inline-flex items-center space-x-1 sm:space-x-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                  tema === 'dark'
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30'
                    : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ver Horario Semanal</span>
                <span className="sm:hidden">Horario</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Lista de Cursos Inscritos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {cursosInscritos.map((codigoCurso, index) => {
                const infoCurso = planEstudiosCompleto.find((c) => c.id === codigoCurso) || { creditos: 4, ciclo: 4, nombre: codigoCurso };
                const nombreCurso = infoCurso.nombre || mapaNombresCursos[codigoCurso] || codigoCurso;

                // Variación sutil de color de borde según índice
                const coloresBorde = [
                  "border-l-blue-500",
                  "border-l-emerald-500",
                  "border-l-purple-500",
                  "border-l-amber-500",
                  "border-l-sky-500"
                ];
                const colorBorde = coloresBorde[index % coloresBorde.length];

                return (
                  <div
                    key={codigoCurso}
                    className={`p-3.5 sm:p-4 rounded-xl border border-l-4 ${colorBorde} transition-all flex flex-col justify-between space-y-2.5 liquid-btn hover-scale-pop active:scale-98 ${
                      tema === 'dark'
                        ? 'bg-[#090e1a]/80 border-slate-800/80 text-white hover:border-blue-500/40'
                        : 'bg-slate-50/90 border-slate-200 text-slate-900 hover:border-blue-500/40 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-extrabold tracking-wide ${
                        tema === 'dark'
                          ? 'bg-blue-500/15 text-blue-400 border border-blue-500/25'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {codigoCurso}
                      </span>
                      <span className={`inline-flex items-center space-x-1 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tema === 'dark'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>En Horario</span>
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className={`text-xs sm:text-sm font-bold line-clamp-2 leading-snug ${
                        tema === 'dark' ? 'text-slate-100' : 'text-slate-900'
                      }`}>
                        {nombreCurso}
                      </h3>
                      <div className={`flex items-center space-x-2 text-[10px] sm:text-[11px] ${
                        tema === 'dark' ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        <span className="flex items-center space-x-1">
                          <BookOpen className="w-3 h-3 text-blue-500 shrink-0" />
                          <span>{infoCurso.creditos} Créditos</span>
                        </span>
                        <span>•</span>
                        <span>Ciclo {NOMBRES_CICLO[(infoCurso.ciclo || 4) - 1]}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Columna Derecha (1/3): Accesos Rápidos Hub (Grid en celular, Lista en escritorio) */}
        <div className="space-y-4">
          <div className="p-4 sm:p-6 rounded-2xl liquid-glass-card space-y-3 sm:space-y-4">
            
            <h2 className={`text-sm sm:text-base font-bold ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight pb-2 sm:pb-3 border-b ${
              tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'
            }`}>
              Accesos Rápidos
            </h2>

            {/* Grid 2 columnas en celular, 1 columna en escritorio */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-2.5">
              
              {/* Horario */}
              <Link
                to="/estudiante/horario"
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all group liquid-btn hover-scale-pop active:scale-95 ${
                  tema === 'dark'
                    ? 'bg-[#090e1a]/80 border-slate-800/80 hover:border-blue-500/40'
                    : 'bg-slate-50/80 border-slate-200 hover:border-blue-500/40 shadow-xs'
                }`}
              >
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-100' : 'text-slate-900'} group-hover:text-blue-500 transition-colors`}>
                      Horario
                    </div>
                    <div className={`text-[9px] sm:text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} hidden sm:block`}>
                      Clases, horas y aulas
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all hidden sm:block" />
              </Link>

              {/* Organizar Cursos */}
              <Link
                to="/estudiante/horario"
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all group liquid-btn hover-scale-pop active:scale-95 ${
                  tema === 'dark'
                    ? 'bg-[#090e1a]/80 border-slate-800/80 hover:border-amber-500/40'
                    : 'bg-slate-50/80 border-slate-200 hover:border-amber-500/40 shadow-xs'
                }`}
              >
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-100' : 'text-slate-900'} group-hover:text-amber-500 transition-colors`}>
                      Organizar Horario
                    </div>
                    <div className={`text-[9px] sm:text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} hidden sm:block`}>
                      Semestres, grupos y aulas
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all hidden sm:block" />
              </Link>

              {/* Malla Curricular */}
              <Link
                to="/estudiante/malla"
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all group liquid-btn hover-scale-pop active:scale-95 ${
                  tema === 'dark'
                    ? 'bg-[#090e1a]/80 border-slate-800/80 hover:border-emerald-500/40'
                    : 'bg-slate-50/80 border-slate-200 hover:border-emerald-500/40 shadow-xs'
                }`}
              >
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-100' : 'text-slate-900'} group-hover:text-emerald-500 transition-colors`}>
                      Malla Curricular
                    </div>
                    <div className={`text-[9px] sm:text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} hidden sm:block`}>
                      Plan 10 ciclos
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all hidden sm:block" />
              </Link>

              {/* Simulador */}
              <Link
                to="/estudiante/simulador"
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all group liquid-btn hover-scale-pop active:scale-95 ${
                  tema === 'dark'
                    ? 'bg-[#090e1a]/80 border-slate-800/80 hover:border-purple-500/40'
                    : 'bg-slate-50/80 border-slate-200 hover:border-purple-500/40 shadow-xs'
                }`}
              >
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20 group-hover:scale-105 transition-transform shrink-0">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-100' : 'text-slate-900'} group-hover:text-purple-500 transition-colors`}>
                      Simulador
                    </div>
                    <div className={`text-[9px] sm:text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} hidden sm:block`}>
                      Planificar futuro
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all hidden sm:block" />
              </Link>

              {/* Perfil */}
              <Link
                to="/estudiante/perfil"
                className={`col-span-2 sm:col-span-1 flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all group liquid-btn hover-scale-pop active:scale-95 ${
                  tema === 'dark'
                    ? 'bg-[#090e1a]/80 border-slate-800/80 hover:border-sky-500/40'
                    : 'bg-slate-50/80 border-slate-200 hover:border-sky-500/40 shadow-xs'
                }`}
              >
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20 group-hover:scale-105 transition-transform shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-100' : 'text-slate-900'} group-hover:text-sky-500 transition-colors`}>
                      Perfil Académico
                    </div>
                    <div className={`text-[9px] sm:text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} hidden sm:block`}>
                      Datos del alumno
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all hidden sm:block" />
              </Link>

            </div>

          </div>
        </div>

      </div>

      {/* Modal Guía Interactiva Paso a Paso */}
      <ModalGuiaInteractiva
        abierto={mostrarGuia}
        alCerrar={() => setMostrarGuia(false)}
      />

    </div>
  );
}
