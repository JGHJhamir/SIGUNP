import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      titulo: "Matrícula Extemporánea Semestre 2026-II",
      mensaje: "Se informa a la comunidad universitaria que el proceso de matrícula extemporánea estará disponible del 5 al 8 de Agosto de 2026.",
      tipo: "urgente",
      categoria: "urgentes",
      fecha: "Hace 2 horas"
    },
    {
      id: 2,
      titulo: "Seminario de Inteligencia Artificial - FIIS",
      mensaje: "Este viernes a las 4:00 PM se llevará a cabo el taller interactivo de Machine Learning en el auditorio de Ingeniería Industrial.",
      tipo: "info",
      categoria: "eventos",
      fecha: "Ayer"
    },
    {
      id: 3,
      titulo: "Calibración de Malla Curricular Activa",
      mensaje: "Tu perfil académico ha sido calibrado. Puedes revisar y modificar tus cursos aprobados directamente desde la pestaña 'Malla Curricular'.",
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800/90 p-4 sm:p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
          <div className="flex items-center space-x-3 sm:space-x-5">
            <div className="relative shrink-0 hidden sm:flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl pointer-events-none"></div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-slate-950/80 border border-sky-400/30 p-1 shadow-xl shadow-sky-500/20 ring-2 ring-amber-400/20 flex items-center justify-center relative z-10 backdrop-blur-md hover:scale-105 transition-transform duration-300 overflow-hidden">
                <img src="/sigunp-logo.png" alt="SIGUNP Logo" style={{ clipPath: 'circle(49% at 50% 50%)' }} className="w-full h-full object-cover rounded-full drop-shadow-md" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] sm:text-xs font-bold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>PANEL ACADÉMICO PRINCIPAL</span>
                </div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] sm:text-[11px] font-bold shadow-sm">
                  <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Proyecto Independiente por JIAR (No Oficial UNP)</span>
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-4xl font-black text-white tracking-tight">
                ¡Bienvenido(a), {localStorage.getItem("nombreEstudiante") ? localStorage.getItem("nombreEstudiante").split(" ")[0] : "Estudiante"}! 👋
              </h1>
              <p className="text-xs md:text-sm text-slate-400 max-w-lg leading-relaxed">
                Sistema Integral de Gestión de la Universidad Nacional de Piura.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950/80 border border-slate-800 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl backdrop-blur-md shadow-xl shrink-0 w-full sm:w-auto justify-between sm:justify-start">
            <Calendar className="w-5 h-5 text-blue-400" />
            <div>
              <div className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400">Semestre Vigente</div>
              <div className="text-sm font-black text-white">2026-II</div>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen Académico Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Créditos Aprobados */}
        <div className="bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800/90 dark:border-slate-800/90 light:border-slate-200/90 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 light:text-slate-500 uppercase tracking-wider block">Créditos Aprobados</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-white dark:text-white light:text-slate-900">{creditosAprobados}</span>
                <span className="text-xs font-bold text-slate-400 light:text-slate-500">/ 274 CR</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 light:text-blue-600 flex items-center justify-center shadow-inner">
              <Award className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex justify-between text-[11px] font-bold text-slate-400 light:text-slate-600">
              <span>Avance de Carrera</span>
              <span className="text-blue-400 light:text-blue-600 font-black">{porcentajeProgreso}%</span>
            </div>
            <div className="w-full bg-slate-800/80 light:bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${porcentajeProgreso}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cursos Obligatorios */}
        <div className="bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800/90 dark:border-slate-800/90 light:border-slate-200/90 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-blue-400 light:text-blue-700 uppercase tracking-wider block">Cursos Obligatorios</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-white dark:text-white light:text-slate-900">{totalObligatoriosAprobados}</span>
                <span className="text-xs font-bold text-slate-400 light:text-slate-500">/ 69 completados</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 light:text-blue-600 flex items-center justify-center shadow-inner">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex justify-between text-[11px] font-bold text-slate-400 light:text-slate-600">
              <span>Progreso Obligatorio</span>
              <span className="text-blue-400 light:text-blue-600 font-black">{porcentajeObligatorios}%</span>
            </div>
            <div className="w-full bg-slate-800/80 light:bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${porcentajeObligatorios}%` }} />
            </div>
          </div>
        </div>

        {/* Cursos Electivos */}
        <div className="bg-slate-900/80 dark:bg-slate-900/80 light:bg-purple-50/30 border border-purple-500/30 dark:border-purple-500/30 light:border-purple-200 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-purple-400 light:text-purple-700 uppercase tracking-wider block flex items-center space-x-1">
                <span>⚡ Créditos Electivos</span>
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-purple-300 dark:text-purple-300 light:text-purple-900">{creditosElectivosAprobados}</span>
                <span className="text-xs font-bold text-slate-400 light:text-slate-500">/ 15 CR requeridos</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-400 light:text-purple-700 flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex justify-between text-[11px] font-bold text-slate-400 light:text-slate-600">
              <span>Progreso Electivo ({totalElectivosAprobados} cursos)</span>
              <span className="text-purple-400 light:text-purple-700 font-black">{porcentajeElectivos}%</span>
            </div>
            <div className="w-full bg-slate-800/80 light:bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 via-violet-400 to-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${porcentajeElectivos}%` }} />
            </div>
          </div>
        </div>

        {/* Ciclo Estimado */}
        <div className="bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800/90 dark:border-slate-800/90 light:border-slate-200/90 rounded-3xl p-6 shadow-xl flex flex-col justify-between backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 light:text-slate-500 uppercase tracking-wider block">Ciclo Estimado</span>
              <div className="text-2xl font-black text-white dark:text-white light:text-slate-900 mt-1">{nombreCiclo}</div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 light:text-emerald-600 flex items-center justify-center shadow-inner">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-center justify-between text-xs text-slate-400 light:text-slate-600 font-medium">
            <span>Según Malla Curricular</span>
            <span className="text-emerald-400 light:text-emerald-700 font-extrabold text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">Actualizado</span>
          </div>
        </div>

      </div>

      {/* Grid: Notificaciones & Accesos Rápidos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bandeja de Notificaciones */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800/90 dark:border-slate-800/90 light:border-slate-200/90 rounded-3xl p-6 shadow-xl light:shadow-sm space-y-5 backdrop-blur-xl">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 pb-4">
              <div className="flex items-center space-x-2.5">
                <Bell className="w-5 h-5 text-blue-400 light:text-blue-600" />
                <h2 className="text-base font-black text-white dark:text-white light:text-slate-900 tracking-tight">
                  Bandeja de Notificaciones
                </h2>
              </div>

              <button
                type="button"
                onClick={marcarTodasLeidas}
                className="text-xs text-blue-400 light:text-blue-600 font-bold hover:underline transition-colors cursor-pointer text-left flex items-center space-x-1"
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
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    filtroNotif === f.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200"
                  }`}
                >
                  {f.etiqueta}
                </button>
              ))}
            </div>

            {/* Lista de Notificaciones */}
            <div className="space-y-3">
              {notificacionesFiltradas.map((notif) => {
                const estaLeida = !!notifLeidas[notif.id];
                return (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-2xl border transition-all duration-200 flex items-start space-x-4 ${
                      estaLeida
                        ? "bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-100/50 border-slate-800/50 dark:border-slate-800/50 light:border-slate-200 opacity-60"
                        : "bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border-slate-800 dark:border-slate-800 light:border-slate-200/90 shadow-md light:shadow-sm"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm ${
                        notif.tipo === "urgente"
                          ? "bg-rose-500/10 text-rose-400 light:bg-rose-50 light:text-rose-600 border-rose-500/20 light:border-rose-200"
                          : notif.tipo === "info"
                          ? "bg-amber-500/10 text-amber-400 light:bg-amber-50 light:text-amber-600 border-amber-500/20 light:border-amber-200"
                          : "bg-blue-500/10 text-blue-400 light:bg-blue-50 light:text-blue-600 border-blue-500/20 light:border-blue-200"
                      }`}
                    >
                      {notif.tipo === "urgente" ? (
                        <AlertTriangle className="w-5 h-5" />
                      ) : notif.tipo === "info" ? (
                        <Info className="w-5 h-5" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-extrabold text-white dark:text-white light:text-slate-900 truncate">{notif.titulo}</h3>
                        <span className="text-[10px] text-slate-400 light:text-slate-500 font-semibold shrink-0 ml-2">{notif.fecha}</span>
                      </div>
                      <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed font-medium">{notif.mensaje}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Acceso Rápido a Módulos */}
        <div className="space-y-4">
          <div className="bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800/90 dark:border-slate-800/90 light:border-slate-200/90 rounded-3xl p-6 shadow-xl light:shadow-sm space-y-4 backdrop-blur-xl">
            
            <h2 className="text-xs font-black text-slate-400 light:text-slate-500 tracking-wider uppercase border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 pb-3">
              Módulos Principales
            </h2>

            <div className="space-y-2.5">
              <Link
                to="/estudiante/horario"
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800/90 dark:border-slate-800/90 light:border-slate-200 hover:border-blue-500/50 light:hover:border-blue-400 hover:bg-slate-800/40 dark:hover:bg-slate-800/40 light:hover:bg-slate-100 transition-all group shadow-sm"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 light:text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white dark:text-white light:text-slate-900">Mi Horario</div>
                    <div className="text-[10px] text-slate-400 light:text-slate-500 font-medium">Ver clases semanales</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </Link>

              <Link
                to="/estudiante/malla"
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800/90 dark:border-slate-800/90 light:border-slate-200 hover:border-emerald-500/50 light:hover:border-emerald-400 hover:bg-slate-800/40 dark:hover:bg-slate-800/40 light:hover:bg-slate-100 transition-all group shadow-sm"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 light:text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white dark:text-white light:text-slate-900">Malla Curricular</div>
                    <div className="text-[10px] text-slate-400 light:text-slate-500 font-medium">Plan de estudios 10 ciclos</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </Link>

              <Link
                to="/estudiante/simulador"
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800/90 dark:border-slate-800/90 light:border-slate-200 hover:border-purple-500/50 light:hover:border-purple-400 hover:bg-slate-800/40 dark:hover:bg-slate-800/40 light:hover:bg-slate-100 transition-all group shadow-sm"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 light:text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white dark:text-white light:text-slate-900">Simulador</div>
                    <div className="text-[10px] text-slate-400 light:text-slate-500 font-medium">Planificar futuros ciclos</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </Link>

              <Link
                to="/estudiante/apuntes"
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800/90 dark:border-slate-800/90 light:border-slate-200 hover:border-sky-500/50 light:hover:border-sky-400 hover:bg-slate-800/40 dark:hover:bg-slate-800/40 light:hover:bg-slate-100 transition-all group shadow-sm"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 light:text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white dark:text-white light:text-slate-900">Apuntes Notion</div>
                    <div className="text-[10px] text-slate-400 light:text-slate-500 font-medium">Cuadernos por curso</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
