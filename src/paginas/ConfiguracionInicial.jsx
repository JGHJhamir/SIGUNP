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

const cursosReales = [
  // ── Ciclo I ──
  { id: "ED1292", nombre: "Actividad Deportiva", ciclo: "I", creditos: 2 },
  { id: "SI1447", nombre: "Algoritmos", ciclo: "I", creditos: 4 },
  { id: "ED1331", nombre: "Comunicación", ciclo: "I", creditos: 3 },
  { id: "MA1470", nombre: "Geometría Analítica", ciclo: "I", creditos: 4 },
  { id: "SI1358", nombre: "Herramientas Ofimáticas para la Vida Universitaria", ciclo: "I", creditos: 3 },
  { id: "SI1216", nombre: "Introducción a la Ingeniería Informática", ciclo: "I", creditos: 2 },
  { id: "MA1408", nombre: "Matemática Básica", ciclo: "I", creditos: 4 },
  { id: "ED1297", nombre: "Metodología de los Estudios Superiores Universitarios", ciclo: "I", creditos: 2 },
  // ── Ciclo II ──
  { id: "CB1324", nombre: "Biología y Educación Ambiental", ciclo: "II", creditos: 3 },
  { id: "MA1435", nombre: "Cálculo I", ciclo: "II", creditos: 4 },
  { id: "FI1363", nombre: "Concepción Física del Universo", ciclo: "II", creditos: 3 },
  { id: "SI1445", nombre: "Estructuras Discretas", ciclo: "II", creditos: 4 },
  { id: "CS1286", nombre: "Filosofía y Ética", ciclo: "II", creditos: 2 },
  { id: "SI1435", nombre: "Programación I", ciclo: "II", creditos: 4 },
  { id: "QU1363", nombre: "Química General", ciclo: "II", creditos: 3 },
  // ── Ciclo III ──
  { id: "CA2337", nombre: "Administración", ciclo: "III", creditos: 3 },
  { id: "MA2441", nombre: "Cálculo II", ciclo: "III", creditos: 4 },
  { id: "EC2201", nombre: "Economía General", ciclo: "III", creditos: 2 },
  { id: "FI2410", nombre: "Física I", ciclo: "III", creditos: 4 },
  { id: "SI2422", nombre: "Programación II", ciclo: "III", creditos: 4 },
  { id: "CS2397", nombre: "Realidad Nacional y Regional", ciclo: "III", creditos: 3 },
  { id: "CS2258", nombre: "Sociología", ciclo: "III", creditos: 2 },
  { id: "ED2278", nombre: "Taller de Arte", ciclo: "III", creditos: 2 },
  // ── Ciclo IV ──
  { id: "CA2101", nombre: "Actividad de Responsabilidad Social Universitaria", ciclo: "IV", creditos: 1 },
  { id: "MA2333", nombre: "Álgebra Lineal", ciclo: "IV", creditos: 3 },
  { id: "ES2300", nombre: "Estadística General", ciclo: "IV", creditos: 3 },
  { id: "SI2418", nombre: "Estructura de Datos", ciclo: "IV", creditos: 4 },
  { id: "FI2411", nombre: "Física II", ciclo: "IV", creditos: 4 },
  { id: "SI2452", nombre: "Ingeniería de Procesos de Negocios", ciclo: "IV", creditos: 4 },
  { id: "CO2201", nombre: "Introducción a la Contabilidad", ciclo: "IV", creditos: 2 },
  { id: "CS2259", nombre: "Psicología General", ciclo: "IV", creditos: 2 },
  // ── Ciclo V ──
  { id: "SI3422", nombre: "Análisis y Diseño de Sistemas I", ciclo: "V", creditos: 4 },
  { id: "MA3412", nombre: "Cálculo III", ciclo: "V", creditos: 4 },
  { id: "FI3492", nombre: "Circuitos Eléctricos y Electrónicos", ciclo: "V", creditos: 4 },
  { id: "ED3286", nombre: "Discapacidad y Derechos Humanos", ciclo: "V", creditos: 2 },
  { id: "ED3283", nombre: "Inglés I", ciclo: "V", creditos: 2 },
  { id: "SI3421", nombre: "Modelado de Datos", ciclo: "V", creditos: 4 },
  { id: "SI3331", nombre: "Aplicaciones Avanzadas con Hojas de Cálculo", ciclo: "V", creditos: 3 },
  { id: "SI3334", nombre: "Introducción a los Entornos Operativos", ciclo: "V", creditos: 3 },
  // ── Ciclo VI ──
  { id: "SI3423", nombre: "Análisis y Diseño de Sistemas II", ciclo: "VI", creditos: 4 },
  { id: "SI3400", nombre: "Arquitectura de Computadores", ciclo: "VI", creditos: 4 },
  { id: "SI3420", nombre: "Base de Datos", ciclo: "VI", creditos: 4 },
  { id: "ED3287", nombre: "Defensa Nacional", ciclo: "VI", creditos: 2 },
  { id: "ES3336", nombre: "Inferencia y Probabilidades", ciclo: "VI", creditos: 3 },
  { id: "ED3284", nombre: "Inglés II", ciclo: "VI", creditos: 2 },
  { id: "ED3285", nombre: "Taller de Redacción Científica", ciclo: "VI", creditos: 2 },
  { id: "SI3337", nombre: "Análisis de Algoritmos", ciclo: "VI", creditos: 3 },
  { id: "SI3336", nombre: "Gráficos por Computadoras", ciclo: "VI", creditos: 3 },
  { id: "AA3303", nombre: "Logística Empresarial", ciclo: "VI", creditos: 3 },
  { id: "SI3335", nombre: "Teoría de Compiladores", ciclo: "VI", creditos: 3 },
  // ── Ciclo VII ──
  { id: "IO4447", nombre: "Diseños de Investigación para Ingeniería", ciclo: "VII", creditos: 4 },
  { id: "CA4221", nombre: "Emprendedurismo", ciclo: "VII", creditos: 2 },
  { id: "IO4448", nombre: "Investigación de Operaciones", ciclo: "VII", creditos: 4 },
  { id: "SI4386", nombre: "Programación Visual", ciclo: "VII", creditos: 3 },
  { id: "SI4489", nombre: "Sistema de Administración de Base de Datos", ciclo: "VII", creditos: 4 },
  { id: "SI4490", nombre: "Sistemas Operativos", ciclo: "VII", creditos: 4 },
  { id: "SI4388", nombre: "Métodos de Acceso", ciclo: "VII", creditos: 3 },
  { id: "IO4334", nombre: "Métodos Numéricos", ciclo: "VII", creditos: 3 },
  { id: "SI4387", nombre: "Programación Multimedia", ciclo: "VII", creditos: 3 },
  { id: "IO4332", nombre: "Simulación y Juegos", ciclo: "VII", creditos: 3 },
  // ── Ciclo VIII ──
  { id: "DP4331", nombre: "Derecho Informático", ciclo: "VIII", creditos: 3 },
  { id: "SI4488", nombre: "Ingeniería de Software", ciclo: "VIII", creditos: 4 },
  { id: "EM4461", nombre: "Microeconomía", ciclo: "VIII", creditos: 4 },
  { id: "SI4360", nombre: "Organización y Administración Informática", ciclo: "VIII", creditos: 3 },
  { id: "SI4491", nombre: "Redes", ciclo: "VIII", creditos: 4 },
  { id: "SI4465", nombre: "Sistemas de Información Gerencial", ciclo: "VIII", creditos: 4 },
  // ── Ciclo IX ──
  { id: "SI5364", nombre: "Elaboración de Proyectos Informáticos", ciclo: "IX", creditos: 3 },
  { id: "IO5365", nombre: "Metodología para el Proyecto de Investigación", ciclo: "IX", creditos: 3 },
  { id: "SI5497", nombre: "Procesos de Desarrollo de Software", ciclo: "IX", creditos: 4 },
  { id: "SI5496", nombre: "Seguridad de la Información", ciclo: "IX", creditos: 4 },
  { id: "SI5441", nombre: "Sistemas de Control y Auditoría Informática", ciclo: "IX", creditos: 4 },
  { id: "SI5365", nombre: "Tecnología y Desarrollo Web", ciclo: "IX", creditos: 3 },
  { id: "SI5370", nombre: "Microcomputadoras", ciclo: "IX", creditos: 3 },
  { id: "II5314", nombre: "Programación de Microbots", ciclo: "IX", creditos: 3 },
  { id: "SI5369", nombre: "Tratamiento Digital de Imágenes y Audio", ciclo: "IX", creditos: 3 },
  // ── Ciclo X ──
  { id: "CO5397", nombre: "Contabilidad de Costos y Presupuestos", ciclo: "X", creditos: 3 },
  { id: "SI5367", nombre: "Desarrollo de la Investigación Informática", ciclo: "X", creditos: 3 },
  { id: "SI5411", nombre: "Gestión en Informática", ciclo: "X", creditos: 4 },
  { id: "SI5499", nombre: "Inteligencia de Negocios", ciclo: "X", creditos: 4 },
  { id: "SI5498", nombre: "Sistemas Orientados a Servicios", ciclo: "X", creditos: 4 },
  { id: "SI5368", nombre: "Tecnología y Desarrollo Móvil", ciclo: "X", creditos: 3 },
  { id: "SI5373", nombre: "Trabajo de Investigación", ciclo: "X", creditos: 3 },
  { id: "SI5361", nombre: "Introducción a la Inteligencia Artificial", ciclo: "X", creditos: 3 },
  { id: "II5345", nombre: "Planeamiento y Control de Producción", ciclo: "X", creditos: 3 },
  { id: "II5344", nombre: "Sistemas SCADA", ciclo: "X", creditos: 3 },
  { id: "SI5371", nombre: "Taller de Servidores", ciclo: "X", creditos: 3 }
];

const ELECTIVOS_SET = new Set([
  "SI3331", "SI3334", "SI3337", "SI3336", "AA3303", "SI3335",
  "SI4388", "IO4334", "SI4387", "IO4332", "SI5370", "II5314",
  "SI5369", "SI5361", "II5345", "II5344", "SI5371"
]);

export default function ConfiguracionInicial() {
  const navigate = useNavigate();
  const { tema, alternarTema } = useTema();
  
  const [aprobados, setAprobados] = useState([]);
  const [cicloActivo, setCicloActivo] = useState("I");
  const [filtroElectivosCiclo, setFiltroElectivosCiclo] = useState("todos");

  // Lista de 11 Pestañas: Ciclo I al X + Pestaña Especial "ELECTIVOS"
  const ciclos = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "ELECTIVOS"];

  const toggleCurso = (id) => {
    setAprobados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const manejarConfirmar = () => {
    localStorage.setItem("tutorialCompletado", "true");
    localStorage.setItem("cursosAprobados", JSON.stringify(aprobados));
    navigate("/estudiante/inicio");
  };

  const esModoElectivos = cicloActivo === "ELECTIVOS";

  // Cursos obligatorios del ciclo activo (FILTRADO STRICTO: Ningún electivo aparece en los ciclos I al X)
  const cursosObligatoriosDelCiclo = cursosReales.filter(
    (c) => c.ciclo === cicloActivo && !ELECTIVOS_SET.has(c.id)
  );

  const todosObligatoriosAprobadosEnCiclo =
    cursosObligatoriosDelCiclo.length > 0 &&
    cursosObligatoriosDelCiclo.every((c) => aprobados.includes(c.id));

  const toggleTodoElCicloObligatorio = () => {
    const idsCiclo = cursosObligatoriosDelCiclo.map((c) => c.id);
    if (todosObligatoriosAprobadosEnCiclo) {
      setAprobados((prev) => prev.filter((id) => !idsCiclo.includes(id)));
    } else {
      setAprobados((prev) => {
        const filtrados = prev.filter((id) => !idsCiclo.includes(id));
        return [...filtrados, ...idsCiclo];
      });
    }
  };

  // Cursos electivos para la pestaña dedicada "ELECTIVOS"
  const todosLosElectivos = cursosReales.filter((c) => ELECTIVOS_SET.has(c.id));
  const electivosFiltrados = todosLosElectivos.filter((c) => {
    if (filtroElectivosCiclo === "todos") return true;
    return c.ciclo === filtroElectivosCiclo;
  });

  // Métricas de progreso
  const creditosAprobados = cursosReales
    .filter((c) => aprobados.includes(c.id))
    .reduce((acc, c) => acc + c.creditos, 0);

  const obligatoriosAprobados = aprobados.filter((id) => !ELECTIVOS_SET.has(id)).length;
  const electivosAprobados = aprobados.filter((id) => ELECTIVOS_SET.has(id)).length;
  const creditosElectivosAprobados = cursosReales
    .filter((c) => ELECTIVOS_SET.has(c.id) && aprobados.includes(c.id))
    .reduce((acc, c) => acc + c.creditos, 0);

  const porcentajeObligatorios = Math.round((obligatoriosAprobados / 69) * 100);
  const porcentajeElectivos = Math.min(100, Math.round((creditosElectivosAprobados / 15) * 100));
  const porcentajeAvance = Math.min(100, Math.round((creditosAprobados / 274) * 100));

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
      tema === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    } flex items-center justify-center p-4 md:p-8 font-sans selection:bg-blue-600 selection:text-white relative overflow-hidden transition-colors duration-300`}>
      
      {/* Background ambient lighting */}
      <div className={`absolute top-10 left-10 w-[500px] h-[500px] ${tema === 'dark' ? 'bg-blue-600/10' : 'bg-blue-500/10'} rounded-full blur-[140px] pointer-events-none`}></div>
      <div className={`absolute bottom-10 right-10 w-[500px] h-[500px] ${tema === 'dark' ? 'bg-purple-600/10' : 'bg-purple-500/10'} rounded-full blur-[140px] pointer-events-none`}></div>

      <div className={`w-full max-w-5xl ${
        tema === 'dark' ? 'bg-slate-900/90 border-slate-800/90' : 'bg-white/90 border-slate-200 shadow-2xl'
      } backdrop-blur-2xl rounded-3xl border p-4 sm:p-6 md:p-10 relative overflow-hidden z-10 animate-fadeIn transition-colors duration-300 max-w-full`}>
        
        {/* Step Indicator Bar */}
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b ${tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'} pb-4 gap-3`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-2xl ${
              esModoElectivos
                ? 'bg-purple-600/20 text-purple-400 border-purple-500/40'
                : 'bg-blue-600/20 text-blue-500 border-blue-500/40'
            } border flex items-center justify-center font-black text-xs shadow-md shrink-0`}>
              {esModoElectivos ? "⚡" : `01`}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>
                  {esModoElectivos ? "Sección Especial: Cursos Electivos" : `Calibración Malla: Ciclo ${cicloActivo} (Cursos Obligatorios)`}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                  esModoElectivos
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                    : 'bg-blue-500/10 text-blue-500 border-blue-500/30'
                }`}>
                  {esModoElectivos ? "Electivos UNP" : "Solo Obligatorios"}
                </span>
              </div>
              <span className={`text-[10px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} block font-medium mt-0.5`}>
                {esModoElectivos
                  ? "Selecciona los cursos electivos que hayas aprobado."
                  : "Marca las asignaturas obligatorias que ya has aprobado."}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              type="button"
              onClick={alternarTema}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center space-x-2 shadow-sm ${
                tema === 'dark'
                  ? "bg-slate-800/80 border-slate-700 text-amber-300 hover:bg-slate-800"
                  : "bg-slate-100 border-slate-300 text-amber-700 hover:bg-slate-200"
              }`}
            >
              {tema === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
              <span className="hidden sm:inline">{tema === 'dark' ? "Claro" : "Oscuro"}</span>
            </button>

            <div className={`hidden sm:flex items-center space-x-2 text-xs ${
              tema === 'dark' ? 'text-slate-400 bg-slate-950/60 border-slate-800' : 'text-slate-600 bg-slate-100 border-slate-200'
            } font-semibold px-3 py-1.5 rounded-xl border`}>
              <GraduationCap className="w-4 h-4 text-blue-500" />
              <span>Plan 2018-1 · Ing. Informática</span>
            </div>
          </div>
        </div>

        {/* Encabezado Principal */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="relative group inline-flex items-center justify-center mb-3 sm:mb-4">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl pointer-events-none"></div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-slate-950/80 border border-sky-400/30 p-1 shadow-xl shadow-sky-500/20 ring-2 ring-amber-400/20 flex items-center justify-center relative z-10 backdrop-blur-md hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img src="/sigunp-logo.png" alt="SIGUNP" style={{ clipPath: 'circle(49% at 50% 50%)' }} className="w-full h-full object-cover rounded-full drop-shadow-md" />
            </div>
          </div>

          <h1 className={`text-xl sm:text-2xl md:text-3xl font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>
            {esModoElectivos ? "Selección de Asignaturas Electivas Aprobadas" : "Indica tus Asignaturas Aprobadas"}
          </h1>
          <p className={`text-xs md:text-sm ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} mt-1.5 max-w-xl mx-auto leading-relaxed`}>
            {esModoElectivos
              ? "Selecciona únicamente las asignaturas electivas que hayas cursado y aprobado."
              : "Marca los cursos obligatorios que ya has superado del Ciclo I al X."}
          </p>
        </div>

        {/* Dynamic Progress Metric Bar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          
          {/* Cursos Obligatorios */}
          <div className={`${
            !esModoElectivos ? 'ring-2 ring-blue-500/50' : ''
          } ${tema === 'dark' ? 'bg-slate-950/80 border-slate-800/90' : 'bg-blue-50/60 border-blue-200'} rounded-2xl p-4 border flex items-center space-x-3.5 shadow-lg transition-all`}>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <div className={`text-xl font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>{obligatoriosAprobados} <span className="text-xs font-bold text-slate-400">/ 69</span></div>
                <span className="text-[10px] font-black text-blue-500 dark:text-blue-400">{porcentajeObligatorios}%</span>
              </div>
              <div className={`text-[10px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-wider`}>Obligatorios</div>
            </div>
          </div>

          {/* Cursos Electivos */}
          <div className={`${
            esModoElectivos ? 'ring-2 ring-purple-500/50' : ''
          } ${tema === 'dark' ? 'bg-purple-950/20 border-purple-500/30' : 'bg-purple-50/60 border-purple-200'} rounded-2xl p-4 border flex items-center space-x-3.5 shadow-lg transition-all`}>
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 dark:text-purple-300 flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <div className="text-xl font-black text-purple-400 dark:text-purple-300 light:text-purple-900">{creditosElectivosAprobados} <span className="text-xs font-bold text-slate-400">/ 15 CR</span></div>
                <span className="text-[10px] font-black text-purple-400">{porcentajeElectivos}%</span>
              </div>
              <div className={`text-[10px] font-bold ${tema === 'dark' ? 'text-purple-300/80' : 'text-purple-700'} uppercase tracking-wider flex items-center space-x-1`}>
                <span>⚡ Créditos Electivos</span>
              </div>
            </div>
          </div>

          {/* Créditos Acumulados */}
          <div className={`${tema === 'dark' ? 'bg-slate-950/80 border-slate-800/90' : 'bg-emerald-50/60 border-emerald-200'} rounded-2xl p-4 border flex items-center space-x-3.5 shadow-lg`}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xl font-black text-emerald-500 dark:text-emerald-400">{creditosAprobados} <span className="text-xs font-bold text-slate-400">/ 274</span></div>
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

        {/* ── BARRA DE 11 PESTAÑAS (Ciclo I al X + Pestaña Especial "⚡ Cursos Electivos") ── */}
        <div className={`flex space-x-1.5 mb-6 border-b ${tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'} pb-0 overflow-x-auto no-scrollbar`}>
          {ciclos.map((ciclo) => {
            const esElectivoTab = ciclo === "ELECTIVOS";
            const estaActivo = cicloActivo === ciclo;

            if (esElectivoTab) {
              return (
                <button
                  key="ELECTIVOS"
                  type="button"
                  onClick={() => setCicloActivo("ELECTIVOS")}
                  className={`px-4 py-3 text-xs font-black rounded-t-2xl shrink-0 transition-all border-b-2 cursor-pointer flex items-center space-x-1.5 ${
                    estaActivo
                      ? "text-purple-400 border-purple-500 bg-purple-500/20 shadow-inner"
                      : "text-purple-400/80 border-transparent hover:text-purple-300 hover:bg-purple-950/30"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>⚡ Cursos Electivos</span>
                  {electivosAprobados > 0 && (
                    <span className="ml-1 text-[9px] bg-purple-500/30 text-purple-300 border border-purple-500/40 px-1.5 py-0.5 rounded-full font-black">
                      {electivosAprobados}
                    </span>
                  )}
                </button>
              );
            }

            const aprobadosEnCiclo = cursosReales.filter(
              (c) => c.ciclo === ciclo && !ELECTIVOS_SET.has(c.id) && aprobados.includes(c.id)
            ).length;
            const totalEnCiclo = cursosReales.filter((c) => c.ciclo === ciclo && !ELECTIVOS_SET.has(c.id)).length;

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

        {/* ── CONTENIDO VISTA DE CICLO NORMAL (CICLOS I AL X - SOLO OBLIGATORIOS) ── */}
        {!esModoElectivos && (
          <div className="space-y-6 animate-fadeIn">
            {/* Acciones del ciclo actual */}
            <div className="flex justify-between items-center px-1">
              <span className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider flex items-center space-x-2`}>
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-500" />
                <span>Asignaturas Obligatorias del Ciclo {cicloActivo} ({cursosObligatoriosDelCiclo.length} cursos)</span>
              </span>

              <button
                type="button"
                onClick={toggleTodoElCicloObligatorio}
                className="text-xs font-extrabold text-blue-500 dark:text-blue-400 hover:opacity-80 transition-all flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 cursor-pointer shadow-sm"
              >
                {todosObligatoriosAprobadosEnCiclo ? <CheckSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Square className="w-4 h-4 text-blue-500" />}
                <span>{todosObligatoriosAprobadosEnCiclo ? "Desmarcar este ciclo" : "Marcar todo el ciclo"}</span>
              </button>
            </div>

            {/* Listado de cursos obligatorios del ciclo activo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-80 overflow-y-auto pr-1">
              {cursosObligatoriosDelCiclo.map((curso) => {
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
        )}

        {/* ── CONTENIDO PESTAÑA DEDICADA: "⚡ CURSOS ELECTIVOS" (UBICADA DESPUÉS DEL CICLO X) ── */}
        {esModoElectivos && (
          <div className="space-y-6 animate-fadeIn">
            {/* Pestañas de filtro por ciclo para Electivos */}
            <div className={`flex space-x-1.5 border-b ${tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'} pb-0 overflow-x-auto no-scrollbar`}>
              {[
                { id: "todos", etiqueta: "Todos los Electivos (17)" },
                { id: "V", etiqueta: "Ciclo V (2)" },
                { id: "VI", etiqueta: "Ciclo VI (4)" },
                { id: "VII", etiqueta: "Ciclo VII (4)" },
                { id: "IX", etiqueta: "Ciclo IX (3)" },
                { id: "X", etiqueta: "Ciclo X (4)" }
              ].map((f) => {
                const estaActivo = filtroElectivosCiclo === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFiltroElectivosCiclo(f.id)}
                    className={`px-4 py-2.5 text-xs font-extrabold rounded-t-xl shrink-0 transition-all border-b-2 cursor-pointer ${
                      estaActivo
                        ? "text-purple-400 border-purple-500 bg-purple-500/10"
                        : tema === 'dark'
                        ? "text-slate-400 border-transparent hover:text-slate-200"
                        : "text-slate-500 border-transparent hover:text-slate-900"
                    }`}
                  >
                    {f.etiqueta}
                  </button>
                );
              })}
            </div>

            {/* Listado de los 17 Cursos Electivos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-80 overflow-y-auto pr-1">
              {electivosFiltrados.map((curso) => {
                const estaSeleccionado = aprobados.includes(curso.id);

                return (
                  <button
                    key={curso.id}
                    type="button"
                    onClick={() => toggleCurso(curso.id)}
                    className={`p-4 rounded-2xl border text-left flex items-start space-x-3.5 transition-all duration-200 cursor-pointer group ${
                      estaSeleccionado
                        ? "bg-purple-500/20 border-purple-500/60 dark:border-purple-500/60 light:border-purple-400 text-purple-900 dark:text-purple-200 shadow-lg shadow-purple-500/10"
                        : tema === 'dark'
                        ? "bg-purple-950/20 border-purple-900/40 hover:border-purple-500/40 text-purple-300/90"
                        : "bg-purple-50/60 border-purple-200 hover:border-purple-300 text-slate-800"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                        estaSeleccionado
                          ? "bg-purple-600 border-purple-400 text-white"
                          : "bg-slate-200 dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                      }`}
                    >
                      {estaSeleccionado && <CheckCircle2 className="w-4 h-4 font-bold" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-extrabold leading-tight flex items-center justify-between gap-1 text-purple-300 light:text-purple-900">
                        <span>{curso.nombre}</span>
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 light:bg-purple-200 light:text-purple-900 border border-purple-500/30 shrink-0">
                          ⚡ Ciclo {curso.ciclo}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1.5 flex items-center space-x-2 font-mono">
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 font-bold">
                          {curso.id}
                        </span>
                        <span>·</span>
                        <span className="font-bold text-purple-300">{curso.creditos} CR</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Navegación entre Pestañas */}
        <div className={`flex flex-col sm:flex-row items-center justify-between border-t ${tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'} pt-6 gap-4 mt-6`}>
          <div className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-center sm:text-left font-medium`}>
            <span className={`${tema === 'dark' ? 'text-white' : 'text-slate-900'} font-black`}>{aprobados.length}</span> asignaturas marcadas (
            <span className="text-emerald-500 dark:text-emerald-400 font-bold">{obligatoriosAprobados} obligatorios</span> · <span className="text-purple-400 font-bold">{creditosElectivosAprobados} CR electivos</span>)
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
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

            {!esModoElectivos ? (
              <button
                type="button"
                onClick={irSiguientePestana}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white font-black rounded-2xl text-sm transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{cicloActivo === "X" ? "Ir a Cursos Electivos ⚡" : `Siguiente: Ciclo ${ciclos[ciclos.indexOf(cicloActivo) + 1]}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={manejarConfirmar}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 active:scale-[0.98] text-white font-black rounded-2xl text-sm transition-all shadow-xl shadow-purple-600/30 flex items-center justify-center space-x-2 cursor-pointer"
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
