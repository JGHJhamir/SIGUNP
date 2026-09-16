import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTema } from "../../contexto/ContextoTema";
import {
  Bell,
  Award,
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
  GraduationCap,
  Sliders,
  FileText,
  CheckCheck
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

const NOMBRES_CICLO = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const ELECTIVOS_SET = new Set([
  "SI3331", "SI3334", "SI3337", "SI3336", "AA3303", "SI3335",
  "SI4388", "IO4334", "SI4387", "IO4332", "SI5370", "II5314",
  "SI5369", "SI5361", "II5345", "II5344", "SI5371"
]);

export default function InicioEstudiante() {
  const { tema } = useTema();
  const [cursosAprobados, setCursosAprobados] = useState([]);
  const [cursosInscritos, setCursosInscritos] = useState([]);
  const [filtroNotif, setFiltroNotif] = useState("todas");
  const [notifLeidas, setNotifLeidas] = useState({});

  useEffect(() => {
    const aprobados = JSON.parse(localStorage.getItem("cursosAprobados") || "[]");
    const inscritos = JSON.parse(localStorage.getItem("cursosInscritos") || "[]");
    setCursosAprobados(aprobados);
    setCursosInscritos(inscritos);
  }, []);

  const creditosAprobados = planEstudiosCompleto
    .filter((c) => cursosAprobados.includes(c.id))
    .reduce((acc, c) => acc + c.creditos, 0);

  const totalObligatoriosAprobados = cursosAprobados.filter((id) => !ELECTIVOS_SET.has(id)).length;
  const totalElectivosAprobados = cursosAprobados.filter((id) => ELECTIVOS_SET.has(id)).length;
  const creditosElectivosAprobados = planEstudiosCompleto
    .filter((c) => ELECTIVOS_SET.has(c.id) && cursosAprobados.includes(c.id))
    .reduce((acc, c) => acc + c.creditos, 0);

  const porcentajeObligatorios = Math.round((totalObligatoriosAprobados / 69) * 100);
  const porcentajeElectivos = Math.min(100, Math.round((creditosElectivosAprobados / 15) * 100));

  // El ciclo estimado se determina por el menor ciclo que contiene al menos un curso obligatorio pendiente
  const calcularCicloEstimado = () => {
    if (cursosAprobados.length === 0) return "Ciclo I";
    for (let c = 1; c <= 10; c++) {
      const obligatoriosDelCiclo = planEstudiosCompleto.filter(
        (curso) => curso.ciclo === c && !ELECTIVOS_SET.has(curso.id)
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

  const cantidadInscritos = cursosInscritos.length;
  const porcentajeProgreso = Math.min(100, Math.round((creditosAprobados / 274) * 100));

  const notificaciones = [
    {
      id: 1,
      titulo: "Cronograma OCRE: Matrícula Regular 2026-I",
      mensaje: "La Oficina Central de Registro y Estadística (OCRE - UNP) comunica la publicación de horarios y prioridades según promedio ponderado acumulado.",
      tipo: "urgente",
      categoria: "urgentes",
      fecha: "Hace 2 horas"
    },
    {
      id: 2,
      titulo: "Jornada Académica - Escuela Profesional de Informática",
      mensaje: "Conferencia presencial sobre Sistemas Distribuidos y Arquitectura Software en el Auditorio Central de la Facultad de Ingeniería Industrial.",
      tipo: "info",
      categoria: "eventos",
      fecha: "Ayer"
    },
    {
      id: 3,
      titulo: "Consolidación de Créditos Plan 2018-1",
      mensaje: "Se ha verificado la asignación de créditos obligatorios y electivos. Puedes consultar tu avance en el módulo Malla Curricular.",
      tipo: "sistema",
      categoria: "sistema",
      fecha: "Hace 1 día"
    }
  ];

  const notificacionesFiltradas = notificaciones.filter(n => {
    if (filtroNotif === "todas") return true;
    return n.categoria === filtroNotif;
  });

  const marcarTodasLeidas = () => {
    const mapa = {};
    notificaciones.forEach(n => mapa[n.id] = true);
    setNotifLeidas(mapa);
  };

  return (
    <div className="space-y-6">

      {/* Hero Welcome Banner */}
      <div className={`relative overflow-hidden rounded-2xl ${
        tema === 'dark' ? 'bg-[#0e1526] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      } border p-4 sm:p-6 md:p-8 transition-colors`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-5">
          <div className="flex items-center space-x-3.5">
            <div className="shrink-0 hidden sm:flex items-center justify-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-900 border border-slate-700 p-0.5 flex items-center justify-center overflow-hidden shadow-sm">
                <img src="/sigunp-logo.png" alt="SIGUNP Logo" style={{ clipPath: 'circle(49% at 50% 50%)' }} className="w-full h-full object-cover rounded-full" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20">
                  <span>SISTEMA INTEGRAL ACADÉMICO</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-medium bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
                  <Info className="w-3 h-3 text-blue-500 shrink-0" />
                  <span>Universidad Nacional de Piura (OCRE - UNP)</span>
                </span>
              </div>
              <h1 className={`text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                ¡Bienvenido(a), {localStorage.getItem("nombreEstudiante") ? localStorage.getItem("nombreEstudiante").split(" ")[0] : "Estudiante"}!
              </h1>
              <p className={`text-xs sm:text-sm ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} max-w-xl`}>
                Escuela Profesional de Ingeniería Informática · Plan Curricular 2018-1.
              </p>
            </div>
          </div>

          <div className={`flex items-center space-x-3 ${
            tema === 'dark' ? 'bg-[#090e1a] border-slate-800' : 'bg-slate-50 border-slate-200'
          } border px-3.5 py-2.5 rounded-xl shrink-0 w-full sm:w-auto justify-between sm:justify-start`}>
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <div>
              <div className={`text-[9px] sm:text-[10px] uppercase tracking-wider font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Semestre Lectivo</div>
              <div className={`text-xs sm:text-sm font-extrabold ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>2026-I</div>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen Académico Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Créditos Aprobados */}
        <div className={`p-5 rounded-xl border ${
          tema === 'dark'
            ? 'bg-[#0e1526] border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        } flex flex-col justify-between transition-all`}>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className={`text-[11px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider block`}>Créditos Aprobados</span>
              <div className="flex items-baseline space-x-2">
                <span className={`text-3xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>{creditosAprobados}</span>
                <span className={`text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/ 274 CR</span>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-lg ${tema === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'} border border-blue-500/20 flex items-center justify-center`}>
              <Award className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className={`flex justify-between text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              <span>Avance de Carrera</span>
              <span className="text-blue-500 font-bold">{porcentajeProgreso}%</span>
            </div>
            <div className={`w-full ${tema === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} h-2 rounded-full overflow-hidden`}>
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${porcentajeProgreso}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cursos Obligatorios */}
        <div className={`p-5 rounded-xl border ${
          tema === 'dark'
            ? 'bg-[#0e1526] border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        } flex flex-col justify-between transition-all`}>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className={`text-[11px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider block`}>Cursos Obligatorios</span>
              <div className="flex items-baseline space-x-2">
                <span className={`text-3xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>{totalObligatoriosAprobados}</span>
                <span className={`text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/ 69 completados</span>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-lg ${tema === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'} border border-blue-500/20 flex items-center justify-center`}>
              <BookOpen className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className={`flex justify-between text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              <span>Progreso Obligatorio</span>
              <span className="text-blue-500 font-bold">{porcentajeObligatorios}%</span>
            </div>
            <div className={`w-full ${tema === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} h-2 rounded-full overflow-hidden`}>
              <div className="bg-blue-500 h-full rounded-full transition-all duration-300" style={{ width: `${porcentajeObligatorios}%` }} />
            </div>
          </div>
        </div>

        {/* Cursos Electivos */}
        <div className={`p-5 rounded-xl border ${
          tema === 'dark'
            ? 'bg-[#0e1526] border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        } flex flex-col justify-between transition-all`}>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className={`text-[11px] font-bold ${tema === 'dark' ? 'text-purple-400' : 'text-purple-700'} uppercase tracking-wider block`}>Créditos Electivos</span>
              <div className="flex items-baseline space-x-2">
                <span className={`text-3xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>{creditosElectivosAprobados}</span>
                <span className={`text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/ 15 CR requeridos</span>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-lg ${tema === 'dark' ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-700'} border border-purple-500/20 flex items-center justify-center`}>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className={`flex justify-between text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              <span>Progreso Electivo ({totalElectivosAprobados} cursos)</span>
              <span className={`font-bold ${tema === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>{porcentajeElectivos}%</span>
            </div>
            <div className={`w-full ${tema === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} h-2 rounded-full overflow-hidden`}>
              <div className="bg-purple-600 h-full rounded-full transition-all duration-300" style={{ width: `${porcentajeElectivos}%` }} />
            </div>
          </div>
        </div>

        {/* Ciclo Estimado */}
        <div className={`p-5 rounded-xl border ${
          tema === 'dark'
            ? 'bg-[#0e1526] border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        } flex flex-col justify-between transition-all`}>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className={`text-[11px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider block`}>Ciclo Estimado</span>
              <div className={`text-2xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'} mt-1`}>{nombreCiclo}</div>
            </div>
            <div className={`w-10 h-10 rounded-lg ${tema === 'dark' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'} border border-emerald-500/20 flex items-center justify-center`}>
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className={`mt-4 pt-3 border-t ${tema === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} flex items-center justify-between text-xs font-medium`}>
            <span>Según Malla Curricular</span>
            <span className={`font-bold text-[10px] px-2 py-0.5 rounded ${
              tema === 'dark'
                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
            }`}>Actualizado</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bandeja de Notificaciones */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className={`p-5 sm:p-6 rounded-2xl border ${
            tema === 'dark'
              ? 'bg-[#0e1526] border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          } space-y-4 transition-colors`}>
            
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b ${
              tema === 'dark' ? 'border-slate-800' : 'border-slate-200'
            } pb-4`}>
              <div className="flex items-center space-x-2.5">
                <Bell className={`w-5 h-5 ${tema === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <h2 className={`text-base font-bold ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>
                  Bandeja de Notificaciones
                </h2>
              </div>

              <button
                type="button"
                onClick={marcarTodasLeidas}
                className={`text-xs ${tema === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-bold transition-colors cursor-pointer text-left flex items-center space-x-1`}
              >
                <CheckCheck className="w-4 h-4" />
                <span>Marcar todas como leídas</span>
              </button>
            </div>

            {/* Filtros de Notificaciones */}
            <div className="flex space-x-2 overflow-x-auto pb-1">
              {[
                { id: "todas", etiqueta: "Todas" },
                { id: "urgentes", etiqueta: "Urgentes" },
                { id: "eventos", etiqueta: "Eventos" },
                { id: "sistema", etiqueta: "Sistema" }
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFiltroNotif(f.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filtroNotif === f.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : tema === 'dark'
                      ? "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                      : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {f.etiqueta}
                </button>
              ))}
            </div>

            {/* Lista de Notificaciones */}
            <div className="space-y-2.5">
              {notificacionesFiltradas.map((notif) => {
                const estaLeida = !!notifLeidas[notif.id];
                return (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-xl border transition-all flex items-start space-x-3.5 ${
                      estaLeida
                        ? tema === 'dark'
                          ? "bg-slate-900/40 border-slate-800/50 text-slate-400 opacity-60"
                          : "bg-slate-100/70 border-slate-200 text-slate-500 opacity-60"
                        : tema === 'dark'
                          ? "bg-[#090e1a] border-slate-800 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-900"
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {notif.tipo === "urgente" && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                      {notif.tipo === "info" && <Info className="w-4 h-4 text-blue-500" />}
                      {notif.tipo === "sistema" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                          {notif.titulo}
                        </h3>
                        <span className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{notif.fecha}</span>
                      </div>
                      <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                        {notif.mensaje}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Accesos Rápidos */}
        <div className="space-y-4">
          <div className={`p-5 sm:p-6 rounded-2xl border ${
            tema === 'dark'
              ? 'bg-[#0e1526] border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900 shadow-sm'
          } space-y-4 transition-colors`}>
            
            <h2 className={`text-base font-bold ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight pb-2 border-b ${
              tema === 'dark' ? 'border-slate-800' : 'border-slate-200'
            }`}>
              Accesos Rápidos
            </h2>

            <div className="space-y-2">
              <Link
                to="/estudiante/horario"
                className={`flex items-center justify-between p-3 rounded-xl border transition-all group ${
                  tema === 'dark'
                    ? 'bg-[#090e1a] border-slate-800 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-200' : 'text-slate-800'} group-hover:text-blue-500 transition-colors`}>
                      Mi Horario
                    </div>
                    <div className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Ver clases semanales
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </Link>

              <Link
                to="/estudiante/malla"
                className={`flex items-center justify-between p-3 rounded-xl border transition-all group ${
                  tema === 'dark'
                    ? 'bg-[#090e1a] border-slate-800 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-200' : 'text-slate-800'} group-hover:text-emerald-500 transition-colors`}>
                      Malla Curricular
                    </div>
                    <div className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Plan de estudios 10 ciclos
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              </Link>

              <Link
                to="/estudiante/simulador"
                className={`flex items-center justify-between p-3 rounded-xl border transition-all group ${
                  tema === 'dark'
                    ? 'bg-[#090e1a] border-slate-800 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 border border-purple-500/20">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-200' : 'text-slate-800'} group-hover:text-purple-500 transition-colors`}>
                      Simulador
                    </div>
                    <div className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Planificar futuros ciclos
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 transition-colors" />
              </Link>

              <Link
                to="/estudiante/matricula"
                className={`flex items-center justify-between p-3 rounded-xl border transition-all group ${
                  tema === 'dark'
                    ? 'bg-[#090e1a] border-slate-800 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-200' : 'text-slate-800'} group-hover:text-amber-500 transition-colors`}>
                      Pre-Matrícula
                    </div>
                    <div className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Inscripción y horarios
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

