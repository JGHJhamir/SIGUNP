import React, { useState, useEffect } from "react";
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

const planEstudiosCompleto = [
  { id: "ED1292", creditos: 2, ciclo: 1 },
  { id: "SI1447", creditos: 4, ciclo: 1 },
  { id: "ED1331", creditos: 3, ciclo: 1 },
  { id: "MA1470", creditos: 4, ciclo: 1 },
  { id: "SI1358", creditos: 3, ciclo: 1 },
  { id: "SI1216", creditos: 2, ciclo: 1 },
  { id: "MA1408", creditos: 4, ciclo: 1 },
  { id: "ED1297", creditos: 2, ciclo: 1 },
  { id: "CB1324", creditos: 3, ciclo: 2 },
  { id: "MA1435", creditos: 4, ciclo: 2 },
  { id: "FI1363", creditos: 3, ciclo: 2 },
  { id: "SI1445", creditos: 4, ciclo: 2 },
  { id: "CS1286", creditos: 2, ciclo: 2 },
  { id: "SI1435", creditos: 4, ciclo: 2 },
  { id: "QU1363", creditos: 3, ciclo: 2 },
  { id: "CA2337", creditos: 3, ciclo: 3 },
  { id: "MA2441", creditos: 4, ciclo: 3 },
  { id: "EC2201", creditos: 2, ciclo: 3 },
  { id: "FI2410", creditos: 4, ciclo: 3 },
  { id: "SI2422", creditos: 4, ciclo: 3 },
  { id: "CS2397", creditos: 3, ciclo: 3 },
  { id: "CS2258", creditos: 2, ciclo: 3 },
  { id: "ED2278", creditos: 2, ciclo: 3 },
  { id: "CA2101", creditos: 1, ciclo: 4 },
  { id: "MA2333", creditos: 3, ciclo: 4 },
  { id: "ES2300", creditos: 3, ciclo: 4 },
  { id: "SI2418", creditos: 4, ciclo: 4 },
  { id: "FI2411", creditos: 4, ciclo: 4 },
  { id: "SI2452", creditos: 4, ciclo: 4 },
  { id: "CO2201", creditos: 2, ciclo: 4 },
  { id: "CS2259", creditos: 2, ciclo: 4 },
  { id: "SI3422", creditos: 4, ciclo: 5 },
  { id: "MA3412", creditos: 4, ciclo: 5 },
  { id: "FI3492", creditos: 4, ciclo: 5 },
  { id: "ED3286", creditos: 2, ciclo: 5 },
  { id: "ED3283", creditos: 2, ciclo: 5 },
  { id: "SI3421", creditos: 4, ciclo: 5 },
  { id: "SI3331", creditos: 3, ciclo: 5 },
  { id: "SI3334", creditos: 3, ciclo: 5 },
  { id: "SI3423", creditos: 4, ciclo: 6 },
  { id: "SI3400", creditos: 4, ciclo: 6 },
  { id: "SI3420", creditos: 4, ciclo: 6 },
  { id: "ED3287", creditos: 2, ciclo: 6 },
  { id: "ES3336", creditos: 3, ciclo: 6 },
  { id: "ED3284", creditos: 2, ciclo: 6 },
  { id: "ED3285", creditos: 2, ciclo: 6 },
  { id: "SI3337", creditos: 3, ciclo: 6 },
  { id: "SI3336", creditos: 3, ciclo: 6 },
  { id: "AA3303", creditos: 3, ciclo: 6 },
  { id: "SI3335", creditos: 3, ciclo: 6 },
  { id: "IO4447", creditos: 4, ciclo: 7 },
  { id: "CA4221", creditos: 2, ciclo: 7 },
  { id: "IO4448", creditos: 4, ciclo: 7 },
  { id: "SI4386", creditos: 3, ciclo: 7 },
  { id: "SI4489", creditos: 4, ciclo: 7 },
  { id: "SI4490", creditos: 4, ciclo: 7 },
  { id: "SI4388", creditos: 3, ciclo: 7 },
  { id: "IO4334", creditos: 3, ciclo: 7 },
  { id: "SI4387", creditos: 3, ciclo: 7 },
  { id: "IO4332", creditos: 3, ciclo: 7 },
  { id: "DP4331", creditos: 3, ciclo: 8 },
  { id: "SI4488", creditos: 4, ciclo: 8 },
  { id: "EM4461", creditos: 4, ciclo: 8 },
  { id: "SI4360", creditos: 3, ciclo: 8 },
  { id: "SI4491", creditos: 4, ciclo: 8 },
  { id: "SI4465", creditos: 4, ciclo: 8 },
  { id: "SI5364", creditos: 3, ciclo: 9 },
  { id: "IO5365", creditos: 3, ciclo: 9 },
  { id: "SI5497", creditos: 4, ciclo: 9 },
  { id: "SI5496", creditos: 4, ciclo: 9 },
  { id: "SI5441", creditos: 4, ciclo: 9 },
  { id: "SI5365", creditos: 3, ciclo: 9 },
  { id: "SI5370", creditos: 3, ciclo: 9 },
  { id: "II5314", creditos: 3, ciclo: 9 },
  { id: "SI5369", creditos: 3, ciclo: 9 },
  { id: "CO5397", creditos: 3, ciclo: 10 },
  { id: "SI5367", creditos: 3, ciclo: 10 },
  { id: "SI5411", creditos: 4, ciclo: 10 },
  { id: "SI5499", creditos: 4, ciclo: 10 },
  { id: "SI5498", creditos: 4, ciclo: 10 },
  { id: "SI5368", creditos: 3, ciclo: 10 },
  { id: "SI5373", creditos: 3, ciclo: 10 },
  { id: "SI5361", creditos: 3, ciclo: 10 },
  { id: "II5345", creditos: 3, ciclo: 10 },
  { id: "II5344", creditos: 3, ciclo: 10 },
  { id: "SI5371", creditos: 3, ciclo: 10 }
];

const NOMBRES_CURSOS = {
  "ED1292": "Actividades Culturales y Deportivas I",
  "SI1447": "Algoritmos y Programación",
  "ED1331": "Expresión Oral y Escrita",
  "MA1470": "Matemática Básica I",
  "SI1358": "Metodología de la Investigación Científica",
  "SI1216": "Introducción a la Ingeniería de Sistemas e Informática",
  "MA1408": "Cálculo I",
  "ED1297": "Métodos de Estudio",
  "CB1324": "Biología General",
  "MA1435": "Cálculo II",
  "FI1363": "Física I",
  "SI1445": "Programación Orientada a Objetos",
  "CS1286": "Filosofía",
  "SI1435": "Matemática Discreta",
  "QU1363": "Química General",
  "CA2337": "Ecología y Protección del Medio Ambiente",
  "MA2441": "Álgebra Lineal",
  "EC2201": "Realidad Nacional",
  "FI2410": "Física General",
  "SI2422": "Teoría de Sistemas",
  "CS2397": "Realidad Nacional y Regional",
  "CS2258": "Sociología",
  "ED2278": "Taller de Arte",
  "CA2101": "Actividad de Responsabilidad Social Universitaria",
  "MA2333": "Álgebra Lineal",
  "ES2300": "Estadística General",
  "SI2418": "Estructura de Datos",
  "FI2411": "Física II",
  "SI2452": "Ingeniería de Procesos de Negocios",
  "CO2201": "Introducción a la Contabilidad",
  "CS2259": "Psicología General",
  "SI3422": "Análisis y Diseño de Sistemas I",
  "MA3412": "Cálculo III",
  "FI3492": "Circuitos Eléctricos y Electrónicos",
  "ED3286": "Discapacidad y Derechos Humanos",
  "ED3283": "Inglés I",
  "SI3421": "Modelado de Datos",
  "SI3331": "Aplicaciones Avanzadas con Hojas de Cálculo",
  "SI3334": "Introducción a los Entornos Operativos",
  "SI3423": "Análisis y Diseño de Sistemas II",
  "SI3400": "Arquitectura de Computadores",
  "SI3420": "Base de Datos",
  "ED3287": "Defensa Nacional",
  "ES3336": "Inferencia y Probabilidades",
  "ED3284": "Inglés II",
  "ED3285": "Taller de Redacción Científica",
  "SI3337": "Análisis de Algoritmos",
  "SI3336": "Gráficos por Computadoras"
};

const NOMBRES_CICLO = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export default function InicioEstudiante() {
  const { tema } = useTema();
  const [cursosAprobados, setCursosAprobados] = useState([]);
  const [cursosInscritos, setCursosInscritos] = useState([]);

  useEffect(() => {
    let aprobados = JSON.parse(localStorage.getItem("cursosAprobados") || "null");
    if (!aprobados || aprobados.length === 0) {
      aprobados = [
        "ED1292", "SI1447", "ED1331", "MA1470", "SI1358", "SI1216", "MA1408", "ED1297",
        "CB1324", "MA1435", "FI1363", "SI1445", "CS1286", "SI1435", "QU1363",
        "CA2337", "MA2441", "EC2201", "FI2410", "SI2422", "CS2397", "CS2258", "ED2278"
      ];
      localStorage.setItem("cursosAprobados", JSON.stringify(aprobados));
    }
    setCursosAprobados(aprobados);

    let inscritos = JSON.parse(localStorage.getItem("cursosInscritos") || "null");
    if (!inscritos || inscritos.length === 0) {
      const matriculas = JSON.parse(localStorage.getItem("matriculasPorSemestre") || "{}");
      inscritos = matriculas["2026-II"]?.cursos || ["SI2418", "MA2333", "ES2300", "FI2411", "SI2452"];
      localStorage.setItem("cursosInscritos", JSON.stringify(inscritos));
    }
    setCursosInscritos(inscritos);
  }, []);

  const creditosAprobados = planEstudiosCompleto
    .filter((c) => cursosAprobados.includes(c.id))
    .reduce((acc, c) => acc + c.creditos, 0);

  const totalObligatoriosAprobados = cursosAprobados.length;
  const porcentajeObligatorios = Math.round((totalObligatoriosAprobados / 63) * 100);

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
    <div className="space-y-6">

      {/* Hero Banner Principal */}
      <div className="relative overflow-hidden rounded-2xl liquid-glass-card glare-hover hover-scale-pop p-5 sm:p-6 md:p-8 transition-all">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-3.5 sm:space-x-4">
            <div className="shrink-0 flex items-center justify-center">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${
                tema === 'dark' ? 'bg-[#090e1a]/90 border-white/10' : 'bg-white border-slate-200 shadow-md'
              } border p-0.5 flex items-center justify-center overflow-hidden shadow-sm hover-scale-pop`}>
                <img src="/sigunp-logo.png" alt="SIGUNP Logo" style={{ clipPath: 'circle(49% at 50% 50%)' }} className="w-full h-full object-cover rounded-full" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold ${
                  tema === 'dark' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200'
                } border shadow-xs`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse-subtle"></span>
                  <span>PORTAL ACADÉMICO</span>
                </span>
                <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium ${
                  tema === 'dark' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : 'bg-slate-100 text-slate-600 border-slate-200'
                } border`}>
                  <Info className="w-3 h-3 text-blue-500 shrink-0" />
                  <span>Escuela Profesional de Ingeniería Informática</span>
                </span>
              </div>

              <h1 className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                ¡Hola, {nombreEstudiante}! 👋
              </h1>
              <p className={`text-xs sm:text-sm ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} max-w-xl`}>
                Plan Curricular 2018-1 · Universidad Nacional de Piura (OCRE)
              </p>
            </div>
          </div>

          <div className={`flex items-center space-x-3 ${
            tema === 'dark' ? 'bg-[#090e1a]/80 border-white/10' : 'bg-white/90 border-slate-200 shadow-sm'
          } border px-4 py-2.5 rounded-xl shrink-0 w-full sm:w-auto justify-between sm:justify-start hover-scale-pop`}>
            <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
            <div>
              <div className={`text-[9px] sm:text-[10px] uppercase tracking-wider font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Semestre Activo</div>
              <div className={`text-xs sm:text-sm font-extrabold ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>2026-I</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas de Métricas Resumen (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Créditos Aprobados */}
        <div className="p-4 sm:p-5 rounded-2xl liquid-glass-card glare-hover hover-scale-pop flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className={`text-[10px] sm:text-[11px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider block`}>Créditos Aprobados</span>
              <div className="flex items-baseline space-x-1.5">
                <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>{creditosAprobados}</span>
                <span className={`text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/ 205 CR</span>
              </div>
            </div>
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${tema === 'dark' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-200'} border flex items-center justify-center shadow-xs`}>
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className={`flex justify-between text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              <span>Avance de Carrera</span>
              <span className="text-blue-500 font-bold">{porcentajeProgreso}%</span>
            </div>
            <div className={`w-full ${tema === 'dark' ? 'bg-slate-800/80' : 'bg-slate-200'} h-2 rounded-full overflow-hidden`}>
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${porcentajeProgreso}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cursos Obligatorios */}
        <div className="p-4 sm:p-5 rounded-2xl liquid-glass-card glare-hover hover-scale-pop flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className={`text-[10px] sm:text-[11px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider block`}>Cursos Aprobados</span>
              <div className="flex items-baseline space-x-1.5">
                <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>{totalObligatoriosAprobados}</span>
                <span className={`text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/ 63 asignaturas</span>
              </div>
            </div>
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${tema === 'dark' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-200'} border flex items-center justify-center shadow-xs`}>
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className={`flex justify-between text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              <span>Avance Obligatorio</span>
              <span className="text-emerald-500 font-bold">{porcentajeObligatorios}%</span>
            </div>
            <div className={`w-full ${tema === 'dark' ? 'bg-slate-800/80' : 'bg-slate-200'} h-2 rounded-full overflow-hidden`}>
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${porcentajeObligatorios}%` }} />
            </div>
          </div>
        </div>

        {/* Ciclo Estimado */}
        <div className="p-4 sm:p-5 rounded-2xl liquid-glass-card glare-hover hover-scale-pop flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className={`text-[10px] sm:text-[11px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider block`}>Ciclo Estimado</span>
              <div className={`text-xl sm:text-2xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'} mt-1`}>{nombreCiclo}</div>
            </div>
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${tema === 'dark' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-purple-50 text-purple-600 border-purple-200'} border flex items-center justify-center shadow-xs`}>
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          <div className={`mt-4 pt-2.5 border-t ${tema === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} flex items-center justify-between text-xs font-medium`}>
            <span>Semestre Actual</span>
            <span className={`font-bold text-[10px] px-2 py-0.5 rounded-full ${
              tema === 'dark'
                ? 'text-purple-400 bg-purple-500/10 border border-purple-500/20'
                : 'text-purple-700 bg-purple-50 border border-purple-200'
            }`}>En curso</span>
          </div>
        </div>

        {/* Estado Académico */}
        <div className="p-4 sm:p-5 rounded-2xl liquid-glass-card glare-hover hover-scale-pop flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className={`text-[10px] sm:text-[11px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider block`}>Condición Estudiante</span>
              <div className={`text-xl sm:text-2xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'} mt-1`}>Alumno Regular</div>
            </div>
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${tema === 'dark' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-600 border-amber-200'} border flex items-center justify-center shadow-xs`}>
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          <div className={`mt-4 pt-2.5 border-t ${tema === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} flex items-center justify-between text-xs font-medium`}>
            <span>Sin sanciones</span>
            <span className={`font-bold text-[10px] px-2 py-0.5 rounded-full ${
              tema === 'dark'
                ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                : 'text-amber-700 bg-amber-50 border border-amber-200'
            }`}>Habilitado</span>
          </div>
        </div>

      </div>

      {/* Grid Principal: Cursos Matriculados + Accesos Rápidos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Columna Izquierda (2/3): Cursos Matriculados en el Semestre */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl liquid-glass-card space-y-4">
            
            <div className={`flex items-center justify-between border-b ${
              tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'
            } pb-4`}>
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  <BookMarked className="w-5 h-5" />
                </div>
                <div>
                  <h2 className={`text-base sm:text-lg font-bold ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>
                    Asignaturas del Semestre Activo
                  </h2>
                  <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Cursos registrados para el semestre 2026-I ({cursosInscritos.length} asignaturas)
                  </p>
                </div>
              </div>

              <Link
                to="/estudiante/horario"
                className={`hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  tema === 'dark'
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30'
                    : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Ver Horario Semanal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Lista de Cursos Inscritos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cursosInscritos.map((codigoCurso) => {
                const infoCurso = planEstudiosCompleto.find((c) => c.id === codigoCurso) || { creditos: 4, ciclo: 4 };
                const nombreCurso = NOMBRES_CURSOS[codigoCurso] || codigoCurso;

                return (
                  <div
                    key={codigoCurso}
                    className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 liquid-btn hover-scale-pop ${
                      tema === 'dark'
                        ? 'bg-[#090e1a]/80 border-slate-800/80 text-white hover:border-blue-500/40'
                        : 'bg-slate-50/90 border-slate-200 text-slate-900 hover:border-blue-500/40 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold tracking-wide ${
                        tema === 'dark'
                          ? 'bg-blue-500/15 text-blue-400 border border-blue-500/25'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {codigoCurso}
                      </span>
                      <span className={`inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tema === 'dark'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Matriculado</span>
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className={`text-xs sm:text-sm font-bold line-clamp-2 leading-snug ${
                        tema === 'dark' ? 'text-slate-100' : 'text-slate-900'
                      }`}>
                        {nombreCurso}
                      </h3>
                      <div className={`flex items-center space-x-3 text-[11px] ${
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

            {/* Acceso directo a Horario en vista móvil */}
            <div className="pt-2 sm:hidden">
              <Link
                to="/estudiante/horario"
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm active:scale-98 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Ver Mi Horario Completo</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

        {/* Columna Derecha (1/3): Accesos Rápidos Hub */}
        <div className="space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl liquid-glass-card space-y-4">
            
            <h2 className={`text-base font-bold ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight pb-3 border-b ${
              tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'
            }`}>
              Accesos Rápidos
            </h2>

            <div className="space-y-2.5">
              
              {/* Horario */}
              <Link
                to="/estudiante/horario"
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group liquid-btn hover-scale-pop ${
                  tema === 'dark'
                    ? 'bg-[#090e1a]/80 border-slate-800/80 hover:border-blue-500/40'
                    : 'bg-slate-50/80 border-slate-200 hover:border-blue-500/40 shadow-xs'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover:scale-105 transition-transform">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-100' : 'text-slate-900'} group-hover:text-blue-500 transition-colors`}>
                      Mi Horario Semanal
                    </div>
                    <div className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Clases, horas y aulas
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
              </Link>

              {/* Pre-Matrícula */}
              <Link
                to="/estudiante/matricula"
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group liquid-btn hover-scale-pop ${
                  tema === 'dark'
                    ? 'bg-[#090e1a]/80 border-slate-800/80 hover:border-amber-500/40'
                    : 'bg-slate-50/80 border-slate-200 hover:border-amber-500/40 shadow-xs'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-100' : 'text-slate-900'} group-hover:text-amber-500 transition-colors`}>
                      Pre-Matrícula OCRE
                    </div>
                    <div className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Selección e inscripción
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
              </Link>

              {/* Malla Curricular */}
              <Link
                to="/estudiante/malla"
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group liquid-btn hover-scale-pop ${
                  tema === 'dark'
                    ? 'bg-[#090e1a]/80 border-slate-800/80 hover:border-emerald-500/40'
                    : 'bg-slate-50/80 border-slate-200 hover:border-emerald-500/40 shadow-xs'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-100' : 'text-slate-900'} group-hover:text-emerald-500 transition-colors`}>
                      Malla Curricular
                    </div>
                    <div className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Plan de estudios 10 ciclos
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>

              {/* Simulador */}
              <Link
                to="/estudiante/simulador"
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group liquid-btn hover-scale-pop ${
                  tema === 'dark'
                    ? 'bg-[#090e1a]/80 border-slate-800/80 hover:border-purple-500/40'
                    : 'bg-slate-50/80 border-slate-200 hover:border-purple-500/40 shadow-xs'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20 group-hover:scale-105 transition-transform">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-100' : 'text-slate-900'} group-hover:text-purple-500 transition-colors`}>
                      Simulador de Semestres
                    </div>
                    <div className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Planificar futuros cursos
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all" />
              </Link>

              {/* Perfil */}
              <Link
                to="/estudiante/perfil"
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group liquid-btn hover-scale-pop ${
                  tema === 'dark'
                    ? 'bg-[#090e1a]/80 border-slate-800/80 hover:border-sky-500/40'
                    : 'bg-slate-50/80 border-slate-200 hover:border-sky-500/40 shadow-xs'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20 group-hover:scale-105 transition-transform">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-100' : 'text-slate-900'} group-hover:text-sky-500 transition-colors`}>
                      Mi Perfil Académico
                    </div>
                    <div className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Datos del alumno e historial
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all" />
              </Link>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
