import React, { useState, useEffect } from "react";
import {
  Search,
  CheckCircle2,
  Lock,
  Unlock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FolderOpen,
  FolderClosed,
  BookOpen
} from "lucide-react";

// Estructura completa de la carrera de Ingeniería Informática - Plan 2018-1
const planEstudios = [
  {
    ciclo: "Ciclo I",
    cursos: [
      { id: "ED1292", nombre: "Actividad Deportiva", creditos: 2, tipo: "O", requisitos: [] },
      { id: "SI1447", nombre: "Algoritmos", creditos: 4, tipo: "O", requisitos: [] },
      { id: "ED1331", nombre: "Comunicación", creditos: 3, tipo: "O", requisitos: [] },
      { id: "MA1470", nombre: "Geometría Analítica", creditos: 4, tipo: "O", requisitos: [] },
      { id: "SI1358", nombre: "Herramientas Ofimáticas para la Vida Universitaria", creditos: 3, tipo: "O", requisitos: [] },
      { id: "SI1216", nombre: "Introducción a la Ingeniería Informática", creditos: 2, tipo: "O", requisitos: [] },
      { id: "MA1408", nombre: "Matemática Básica", creditos: 4, tipo: "O", requisitos: [] },
      { id: "ED1297", nombre: "Metodología de los Estudios Superiores Universitarios", creditos: 2, tipo: "O", requisitos: [] }
    ]
  },
  {
    ciclo: "Ciclo II",
    cursos: [
      { id: "CB1324", nombre: "Biología y Educación Ambiental", creditos: 3, tipo: "O", requisitos: [] },
      { id: "MA1435", nombre: "Cálculo I", creditos: 4, tipo: "O", requisitos: ["MA1408", "MA1470"] },
      { id: "FI1363", nombre: "Concepción Física del Universo", creditos: 3, tipo: "O", requisitos: [] },
      { id: "SI1445", nombre: "Estructuras Discretas", creditos: 4, tipo: "O", requisitos: ["SI1447"] },
      { id: "CS1286", nombre: "Filosofía y Ética", creditos: 2, tipo: "O", requisitos: [] },
      { id: "SI1435", nombre: "Programación I", creditos: 4, tipo: "O", requisitos: ["SI1216", "SI1447"] },
      { id: "QU1363", nombre: "Química General", creditos: 3, tipo: "O", requisitos: [] }
    ]
  },
  {
    ciclo: "Ciclo III",
    cursos: [
      { id: "CA2337", nombre: "Administración", creditos: 3, tipo: "O", requisitos: [] },
      { id: "MA2441", nombre: "Cálculo II", creditos: 4, tipo: "O", requisitos: ["MA1435"] },
      { id: "EC2201", nombre: "Economía General", creditos: 2, tipo: "O", requisitos: [] },
      { id: "FI2410", nombre: "Física I", creditos: 4, tipo: "O", requisitos: ["FI1363", "MA1435"] },
      { id: "SI2422", nombre: "Programación II", creditos: 4, tipo: "O", requisitos: ["SI1435"] },
      { id: "CS2397", nombre: "Realidad Nacional y Regional", creditos: 3, tipo: "O", requisitos: [] },
      { id: "CS2258", nombre: "Sociología", creditos: 2, tipo: "O", requisitos: [] },
      { id: "ED2278", nombre: "Taller de Arte", creditos: 2, tipo: "O", requisitos: [] }
    ]
  },
  {
    ciclo: "Ciclo IV",
    cursos: [
      { id: "CA2101", nombre: "Actividad de Responsabilidad Social Universitaria", creditos: 1, tipo: "O", requisitos: ["CS2258"] },
      { id: "MA2333", nombre: "Álgebra Lineal", creditos: 3, tipo: "O", requisitos: ["MA1435"] },
      { id: "ES2300", nombre: "Estadística General", creditos: 3, tipo: "O", requisitos: ["SI1358"] },
      { id: "SI2418", nombre: "Estructura de Datos", creditos: 4, tipo: "O", requisitos: ["SI1435", "SI1445"] },
      { id: "FI2411", nombre: "Física II", creditos: 4, tipo: "O", requisitos: ["FI2410"] },
      { id: "SI2452", nombre: "Ingeniería de Procesos de Negocios", creditos: 4, tipo: "O", requisitos: ["CA2337"] },
      { id: "CO2201", nombre: "Introducción a la Contabilidad", creditos: 2, tipo: "O", requisitos: [] },
      { id: "CS2259", nombre: "Psicología General", creditos: 2, tipo: "O", requisitos: [] }
    ]
  },
  {
    ciclo: "Ciclo V",
    cursos: [
      { id: "SI3422", nombre: "Análisis y Diseño de Sistemas I", creditos: 4, tipo: "O", requisitos: ["SI2452"] },
      { id: "MA3412", nombre: "Cálculo III", creditos: 4, tipo: "O", requisitos: ["MA2441"] },
      { id: "FI3492", nombre: "Circuitos Eléctricos y Electrónicos", creditos: 4, tipo: "O", requisitos: ["FI2411"] },
      { id: "ED3286", nombre: "Discapacidad y Derechos Humanos", creditos: 2, tipo: "O", requisitos: ["CS2397"] },
      { id: "ED3283", nombre: "Inglés I", creditos: 2, tipo: "O", requisitos: [] },
      { id: "SI3421", nombre: "Modelado de Datos", creditos: 4, tipo: "O", requisitos: ["SI2418"] },
      { id: "SI3331", nombre: "Aplicaciones Avanzadas con Hojas de Cálculo", creditos: 3, tipo: "E", requisitos: ["SI1447"] },
      { id: "SI3334", nombre: "Introducción a los Entornos Operativos", creditos: 3, tipo: "E", requisitos: ["SI1216"] }
    ]
  },
  {
    ciclo: "Ciclo VI",
    cursos: [
      { id: "SI3423", nombre: "Análisis y Diseño de Sistemas II", creditos: 4, tipo: "O", requisitos: ["SI3422"] },
      { id: "SI3400", nombre: "Arquitectura de Computadores", creditos: 4, tipo: "O", requisitos: ["FI3492"] },
      { id: "SI3420", nombre: "Base de Datos", creditos: 4, tipo: "O", requisitos: ["SI3421"] },
      { id: "ED3287", nombre: "Defensa Nacional", creditos: 2, tipo: "O", requisitos: ["CS2397"] },
      { id: "ES3336", nombre: "Inferencia y Probabilidades", creditos: 3, tipo: "O", requisitos: ["ES2300"] },
      { id: "ED3284", nombre: "Inglés II", creditos: 2, tipo: "O", requisitos: ["ED3283"] },
      { id: "ED3285", nombre: "Taller de Redacción Científica", creditos: 2, tipo: "O", requisitos: ["ED1331"] },
      { id: "SI3337", nombre: "Análisis de Algoritmos", creditos: 3, tipo: "E", requisitos: ["SI2422"] },
      { id: "SI3336", nombre: "Gráficos por Computadoras", creditos: 3, tipo: "E", requisitos: ["SI2422"] },
      { id: "AA3303", nombre: "Logística Empresarial", creditos: 3, tipo: "E", requisitos: ["CA2337"] },
      { id: "SI3335", nombre: "Teoría de Compiladores", creditos: 3, tipo: "E", requisitos: ["SI2418"] }
    ]
  },
  {
    ciclo: "Ciclo VII",
    cursos: [
      { id: "IO4447", nombre: "Diseños de Investigación para Ingeniería", creditos: 4, tipo: "O", requisitos: ["ED3285", "ES3336"] },
      { id: "CA4221", nombre: "Emprendedurismo", creditos: 2, tipo: "O", requisitos: [] },
      { id: "IO4448", nombre: "Investigación de Operaciones", creditos: 4, tipo: "O", requisitos: ["ES3336", "MA2333"] },
      { id: "SI4386", nombre: "Programación Visual", creditos: 3, tipo: "O", requisitos: ["SI2422"] },
      { id: "SI4489", nombre: "Sistema de Administración de Base de Datos", creditos: 4, tipo: "O", requisitos: ["SI3420"] },
      { id: "SI4490", nombre: "Sistemas Operativos", creditos: 4, tipo: "O", requisitos: ["SI2418", "SI3400"] },
      { id: "SI4388", nombre: "Métodos de Acceso", creditos: 3, tipo: "E", requisitos: ["SI3421"] },
      { id: "IO4334", nombre: "Métodos Numéricos", creditos: 3, tipo: "E", requisitos: ["MA3412"] },
      { id: "SI4387", nombre: "Programación Multimedia", creditos: 3, tipo: "E", requisitos: ["SI2422"] },
      { id: "IO4332", nombre: "Simulación y Juegos", creditos: 3, tipo: "E", requisitos: ["SI2422"] }
    ]
  },
  {
    ciclo: "Ciclo VIII",
    cursos: [
      { id: "DP4331", nombre: "Derecho Informático", creditos: 3, tipo: "O", requisitos: ["CS1286", "ED3286"] },
      { id: "SI4488", nombre: "Ingeniería de Software", creditos: 4, tipo: "O", requisitos: ["SI3423", "SI4489"] },
      { id: "EM4461", nombre: "Microeconomía", creditos: 4, tipo: "O", requisitos: ["EC2201"] },
      { id: "SI4360", nombre: "Organización y Administración Informática", creditos: 3, tipo: "O", requisitos: ["SI3423"] },
      { id: "SI4491", nombre: "Redes", creditos: 4, tipo: "O", requisitos: ["SI4490"] },
      { id: "SI4465", nombre: "Sistemas de Información Gerencial", creditos: 4, tipo: "O", requisitos: ["SI4489"] }
    ]
  },
  {
    ciclo: "Ciclo IX",
    cursos: [
      { id: "SI5364", nombre: "Elaboración de Proyectos Informáticos", creditos: 3, tipo: "O", requisitos: ["SI4360"] },
      { id: "IO5365", nombre: "Metodología para el Proyecto de Investigación", creditos: 3, tipo: "O", requisitos: ["IO4447", "SI4488"] },
      { id: "SI5497", nombre: "Procesos de Desarrollo de Software", creditos: 4, tipo: "O", requisitos: ["SI3423"] },
      { id: "SI5496", nombre: "Seguridad de la Información", creditos: 4, tipo: "O", requisitos: ["SI4491"] },
      { id: "SI5441", nombre: "Sistemas de Control y Auditoría Informática", creditos: 4, tipo: "O", requisitos: ["DP4331", "SI4488"] },
      { id: "SI5365", nombre: "Tecnología y Desarrollo Web", creditos: 3, tipo: "O", requisitos: ["SI4488"] },
      { id: "SI5370", nombre: "Microcomputadoras", creditos: 3, tipo: "E", requisitos: ["SI3400"] },
      { id: "II5314", nombre: "Programación de Microbots", creditos: 3, tipo: "E", requisitos: ["SI3400"] },
      { id: "SI5369", nombre: "Tratamiento Digital de Imágenes y Audio", creditos: 3, tipo: "E", requisitos: ["MA3412", "SI2422"] }
    ]
  },
  {
    ciclo: "Ciclo X",
    cursos: [
      { id: "CO5397", nombre: "Contabilidad de Costos y Presupuestos", creditos: 3, tipo: "O", requisitos: ["CO2201", "EM4461"] },
      { id: "SI5367", nombre: "Desarrollo de la Investigación Informática", creditos: 3, tipo: "O", requisitos: ["IO5365"] },
      { id: "SI5411", nombre: "Gestión en Informática", creditos: 4, tipo: "O", requisitos: ["SI5364"] },
      { id: "SI5499", nombre: "Inteligencia de Negocios", creditos: 4, tipo: "O", requisitos: ["SI4465"] },
      { id: "SI5498", nombre: "Sistemas Orientados a Servicios", creditos: 4, tipo: "O", requisitos: ["SI5365"] },
      { id: "SI5368", nombre: "Tecnología y Desarrollo Móvil", creditos: 3, tipo: "O", requisitos: ["SI5365"] },
      { id: "SI5373", nombre: "Trabajo de Investigación", creditos: 3, tipo: "O", requisitos: ["IO5365"] },
      { id: "SI5361", nombre: "Introducción a la Inteligencia Artificial", creditos: 3, tipo: "E", requisitos: ["SI2418"] },
      { id: "II5345", nombre: "Planeamiento y Control de Producción", creditos: 3, tipo: "E", requisitos: ["IO4448"] },
      { id: "II5344", nombre: "Sistemas SCADA", creditos: 3, tipo: "E", requisitos: ["SI3400"] },
      { id: "SI5371", nombre: "Taller de Servidores", creditos: 3, tipo: "E", requisitos: ["SI4491"] }
    ]
  }
];

export default function MallaCurricular() {
  const [aprobados, setAprobados] = useState([]);
  const [mensajeError, setMensajeError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [criterioOrden, setCriterioOrden] = useState("alfabetico");

  const [ciclosExpandidos, setCiclosExpandidos] = useState({
    "Ciclo I": true,
    "Ciclo II": true
  });

  useEffect(() => {
    const cargarCursos = async () => {
      const codigoUni = localStorage.getItem("codigoUniversitario");
      if (codigoUni) {
        const { data } = await supabase
          .from("estudiante_cursos_aprobados")
          .select("curso_id")
          .eq("codigo_universitario", codigoUni);
        if (data && data.length > 0) {
          const ids = data.map((r) => r.curso_id);
          setAprobados(ids);
          localStorage.setItem("cursosAprobados", JSON.stringify(ids));
          return;
        }
      }
      const cursosGuardados = localStorage.getItem("cursosAprobados");
      if (cursosGuardados) {
        try {
          setAprobados(JSON.parse(cursosGuardados));
        } catch (e) {
          console.error("Error cargando cursos aprobados", e);
        }
      }
    };
    cargarCursos();
  }, []);

  const guardarAprobados = async (nuevaLista) => {
    setAprobados(nuevaLista);
    localStorage.setItem("cursosAprobados", JSON.stringify(nuevaLista));

    const codigoUni = localStorage.getItem("codigoUniversitario");
    if (codigoUni) {
      try {
        await supabase
          .from("estudiante_cursos_aprobados")
          .delete()
          .eq("codigo_universitario", codigoUni);

        if (nuevaLista.length > 0) {
          const payload = nuevaLista.map((id) => ({
            codigo_universitario: codigoUni,
            curso_id: id
          }));
          await supabase.from("estudiante_cursos_aprobados").insert(payload);
        }
      } catch (e) {
        console.warn("Error al sincronizar con Supabase", e);
      }
    }
  };

  const toggleCiclo = (ciclo) => {
    setCiclosExpandidos((prev) => ({
      ...prev,
      [ciclo]: !prev[ciclo]
    }));
  };

  const expandirTodos = () => {
    const todos = {};
    planEstudios.forEach((s) => {
      todos[s.ciclo] = true;
    });
    setCiclosExpandidos(todos);
  };

  const colapsarTodos = () => {
    setCiclosExpandidos({});
  };

  const totalCreditosAprobados = planEstudios.reduce((acumulado, semestre) => {
    return acumulado + semestre.cursos.reduce((subAcum, curso) => {
      return subAcum + (aprobados.includes(curso.id) ? curso.creditos : 0);
    }, 0);
  }, 0);

  const totalCursosAprobados = aprobados.length;
  const totalObligatoriosAprobados = planEstudios.reduce((acc, sem) => {
    return acc + sem.cursos.reduce((sAcc, c) => sAcc + (c.tipo === "O" && aprobados.includes(c.id) ? 1 : 0), 0);
  }, 0);
  const totalElectivosAprobados = planEstudios.reduce((acc, sem) => {
    return acc + sem.cursos.reduce((sAcc, c) => sAcc + (c.tipo === "E" && aprobados.includes(c.id) ? 1 : 0), 0);
  }, 0);

  const obtenerEstadoCurso = (curso) => {
    if (aprobados.includes(curso.id)) {
      return "aprobado";
    }
    const requisitosCumplidos = curso.requisitos.every((reqId) => aprobados.includes(reqId));
    return requisitosCumplidos ? "disponible" : "bloqueado";
  };

  const manejarClickCurso = (curso) => {
    setMensajeError(null);
    const estadoActual = obtenerEstadoCurso(curso);

    if (estadoActual === "aprobado") {
      const esPrerrequisitoDeAprobado = planEstudios.some((semestre) =>
        semestre.cursos.some(
          (c) => c.requisitos.includes(curso.id) && aprobados.includes(c.id)
        )
      );

      if (esPrerrequisitoDeAprobado) {
        setMensajeError(`No puedes desaprobar ${curso.nombre} (${curso.id}) porque es requisito de otros cursos aprobados.`);
        return;
      }

      guardarAprobados(aprobados.filter((id) => id !== curso.id));
    } else if (estadoActual === "disponible") {
      guardarAprobados([...aprobados, curso.id]);
    } else {
      const requisitosFaltantes = curso.requisitos.filter((reqId) => !aprobados.includes(reqId));
      const nombresRequisitos = planEstudios.reduce((acc, sem) => {
        sem.cursos.forEach((c) => {
          if (requisitosFaltantes.includes(c.id)) {
            acc.push(`${c.nombre} (${c.id})`);
          }
        });
        return acc;
      }, []);

      setMensajeError(`Para habilitar ${curso.nombre} primero debes aprobar: ${nombresRequisitos.join(", ")}.`);
    }
  };

  const ordenarCursos = (cursos) => {
    const obligatorios = cursos.filter((c) => c.tipo === "O");
    const electivos = cursos.filter((c) => c.tipo === "E");

    const comparador = (a, b) => {
      if (criterioOrden === "alfabetico") {
        return a.nombre.localeCompare(b.nombre, "es");
      } else {
        if (b.creditos !== a.creditos) {
          return b.creditos - a.creditos;
        }
        return a.nombre.localeCompare(b.nombre, "es");
      }
    };

    return [...[...obligatorios].sort(comparador), ...[...electivos].sort(comparador)];
  };

  const totalObligatoriosPlan = planEstudios.reduce((acc, sem) => acc + sem.cursos.filter((c) => c.tipo === "O").length, 0);
  const totalElectivosPlan = planEstudios.reduce((acc, sem) => acc + sem.cursos.filter((c) => c.tipo === "E").length, 0);
  const creditosElectivosAprobados = planEstudios.reduce((acc, sem) => {
    return acc + sem.cursos.reduce((sAcc, c) => sAcc + (c.tipo === "E" && aprobados.includes(c.id) ? c.creditos : 0), 0);
  }, 0);

  const porcentajeObligatorios = Math.round((totalObligatoriosAprobados / totalObligatoriosPlan) * 100);
  const porcentajeElectivos = Math.min(100, Math.round((creditosElectivosAprobados / 15) * 100));
  const porcentajeProgreso = Math.min(100, Math.round((totalCreditosAprobados / 274) * 100));

  return (
    <div className="space-y-6">

      {/* Metric Header Section */}
      <div className="bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800/90 dark:border-slate-800/90 light:border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 light:text-blue-600 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PLAN DE ESTUDIOS 2018-1</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white dark:text-white light:text-slate-900 tracking-tight">
              Malla Curricular — Ing. Informática
            </h1>
            <p className="text-xs text-slate-400 light:text-slate-500">
              Universidad Nacional de Piura • 10 Ciclos Académicos Completos
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 px-4 py-3 rounded-2xl shadow-md">
            <BookOpen className="w-5 h-5 text-blue-400 light:text-blue-600" />
            <div>
              <div className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 light:text-slate-500">Créditos Totales</div>
              <div className="text-sm font-black text-white dark:text-white light:text-slate-900">{totalCreditosAprobados} / 274 CR</div>
            </div>
          </div>
        </div>

        {/* Breakdown Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Cursos Obligatorios */}
          <div className="bg-slate-950/70 dark:bg-slate-950/70 light:bg-blue-50/50 border border-blue-500/20 light:border-blue-200 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-[10px] font-extrabold text-blue-400 light:text-blue-700 uppercase tracking-wider">
              <span>Cursos Obligatorios</span>
              <span className="bg-blue-500/20 text-blue-300 light:bg-blue-200 light:text-blue-800 px-2 py-0.5 rounded-full font-black">{porcentajeObligatorios}%</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-black text-white dark:text-white light:text-slate-900">
                {totalObligatoriosAprobados} <span className="text-xs font-bold text-slate-400 light:text-slate-500">/ {totalObligatoriosPlan}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 light:text-slate-500">Obligatorios</span>
            </div>
            <div className="w-full bg-slate-800/80 light:bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${porcentajeObligatorios}%` }}></div>
            </div>
          </div>

          {/* Cursos Electivos */}
          <div className="bg-slate-950/70 dark:bg-slate-950/70 light:bg-purple-50/50 border border-purple-500/30 light:border-purple-200 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-[10px] font-extrabold text-purple-400 light:text-purple-700 uppercase tracking-wider">
              <span className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-purple-400 light:text-purple-600" />
                <span>Créditos Electivos</span>
              </span>
              <span className="bg-purple-500/20 text-purple-300 light:bg-purple-200 light:text-purple-800 px-2 py-0.5 rounded-full font-black">{porcentajeElectivos}%</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-black text-purple-300 dark:text-purple-300 light:text-purple-900">
                {creditosElectivosAprobados} <span className="text-xs font-bold text-slate-400 light:text-slate-500">/ 15 CR</span>
              </div>
              <span className="text-[10px] font-bold text-purple-400/80 light:text-purple-600">{totalElectivosAprobados} electivos</span>
            </div>
            <div className="w-full bg-slate-800/80 light:bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 via-violet-400 to-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${porcentajeElectivos}%` }}></div>
            </div>
          </div>

          {/* Créditos Acumulados */}
          <div className="bg-slate-950/70 dark:bg-slate-950/70 light:bg-emerald-50/50 border border-emerald-500/20 light:border-emerald-200 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-[10px] font-extrabold text-emerald-400 light:text-emerald-700 uppercase tracking-wider">
              <span>Créditos Totales</span>
              <span className="bg-emerald-500/20 text-emerald-300 light:bg-emerald-200 light:text-emerald-800 px-2 py-0.5 rounded-full font-black">{porcentajeProgreso}%</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-black text-white dark:text-white light:text-slate-900">
                {totalCreditosAprobados} <span className="text-xs font-bold text-slate-400 light:text-slate-500">/ 274 CR</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400/80 light:text-emerald-600">Aprobados</span>
            </div>
            <div className="w-full bg-slate-800/80 light:bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${porcentajeProgreso}%` }}></div>
            </div>
          </div>

          {/* Avance Global */}
          <div className="bg-slate-950/70 dark:bg-slate-950/70 light:bg-sky-50/50 border border-sky-500/20 light:border-sky-200 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-[10px] font-extrabold text-sky-400 light:text-sky-700 uppercase tracking-wider">
              <span>Progreso Global</span>
              <span className="text-sky-400 light:text-sky-700 font-black">{porcentajeProgreso}%</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-black text-white dark:text-white light:text-slate-900">
                {totalCursosAprobados} <span className="text-xs font-bold text-slate-400 light:text-slate-500">/ {totalObligatoriosPlan + totalElectivosPlan}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 light:text-slate-500">Total Cursos</span>
            </div>
            <div className="w-full bg-slate-800/80 light:bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${porcentajeProgreso}%` }}></div>
            </div>
          </div>

        </div>
      </div>

      {/* Error Alert Toast */}
      {mensajeError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-start space-x-3 text-rose-300 text-xs font-semibold animate-fadeIn shadow-lg">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span className="leading-relaxed">{mensajeError}</span>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800/90 dark:border-slate-800/90 light:border-slate-200/90 rounded-3xl p-4 md:p-5 shadow-xl light:shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 backdrop-blur-xl">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 light:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por asignatura o código (ej. Algoritmos)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-inner light:shadow-none"
          />
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={expandirTodos}
            className="px-3.5 py-2 bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 text-xs font-bold rounded-xl border border-slate-700 dark:border-slate-700 light:border-slate-200 transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm"
          >
            <FolderOpen className="w-3.5 h-3.5 text-blue-400 light:text-blue-600" />
            <span>Expandir</span>
          </button>
          
          <button
            type="button"
            onClick={colapsarTodos}
            className="px-3.5 py-2 bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 text-xs font-bold rounded-xl border border-slate-700 dark:border-slate-700 light:border-slate-200 transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm"
          >
            <FolderClosed className="w-3.5 h-3.5 text-slate-400 light:text-slate-500" />
            <span>Colapsar</span>
          </button>

          <div className="flex bg-slate-950 dark:bg-slate-950 light:bg-slate-100 p-1 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200">
            <button
              type="button"
              onClick={() => setCriterioOrden("alfabetico")}
              className={`px-3 py-1 text-xs font-black rounded-lg transition-all cursor-pointer ${
                criterioOrden === "alfabetico"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900"
              }`}
            >
              A-Z
            </button>
            <button
              type="button"
              onClick={() => setCriterioOrden("creditos")}
              className={`px-3 py-1 text-xs font-black rounded-lg transition-all cursor-pointer ${
                criterioOrden === "creditos"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900"
              }`}
            >
              Créditos
            </button>
          </div>
        </div>
      </div>

      {/* Status Legend */}
      <div className="flex flex-wrap items-center gap-4 px-2 text-[11px] font-extrabold text-slate-400 light:text-slate-600 uppercase tracking-wider">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
          <span className="text-slate-300 light:text-slate-800">Aprobado</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          <span className="text-slate-300 light:text-slate-800">Disponible</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
          <span className="text-slate-400 light:text-slate-600">Bloqueado</span>
        </div>
        <span className="text-slate-700 light:text-slate-300">|</span>
        <div className="flex items-center space-x-1.5 bg-blue-500/10 text-blue-400 light:bg-blue-100 light:text-blue-800 border border-blue-500/20 px-2.5 py-1 rounded-full">
          <span>📘 O = Obligatorio</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-purple-500/20 text-purple-300 light:bg-purple-100 light:text-purple-900 border border-purple-500/30 px-2.5 py-1 rounded-full font-black">
          <span>⚡ E = Electivo</span>
        </div>
      </div>

      {/* Accordion List of Semesters */}
      <div className="space-y-4">
        {planEstudios.map((semestre) => {
          const estaExpandido = !!ciclosExpandidos[semestre.ciclo];
          const aprobadosEnCiclo = semestre.cursos.filter((c) => aprobados.includes(c.id)).length;
          const totalCursosCiclo = semestre.cursos.length;

          // Search filtering
          let cursosFiltrados = semestre.cursos;
          if (busqueda.trim()) {
            const termino = busqueda.toLowerCase();
            cursosFiltrados = cursosFiltrados.filter(
              (c) => c.nombre.toLowerCase().includes(termino) || c.id.toLowerCase().includes(termino)
            );
          }

          if (busqueda.trim() && cursosFiltrados.length === 0) {
            return null; // Skip empty search results for this cycle
          }

          const cursosFiltradosYOrdenados = ordenarCursos(cursosFiltrados);

          return (
            <div key={semestre.ciclo} className="bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800/90 dark:border-slate-800/90 light:border-slate-200/90 rounded-3xl overflow-hidden shadow-xl transition-all backdrop-blur-2xl">
              
              {/* Accordion Header Button */}
              <button
                type="button"
                onClick={() => toggleCiclo(semestre.ciclo)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/40 dark:hover:bg-slate-800/40 light:hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-black text-white dark:text-white light:text-slate-900 tracking-tight">
                    {semestre.ciclo}
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${
                    aprobadosEnCiclo === totalCursosCiclo
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : aprobadosEnCiclo > 0
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      : "bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-slate-400 light:text-slate-600 border-slate-700 light:border-slate-200"
                  }`}>
                    {aprobadosEnCiclo} / {totalCursosCiclo} Aprobados
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-slate-400">
                  {estaExpandido ? <ChevronUp className="w-5 h-5 text-blue-400" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Accordion Expanded Course Cards Grid */}
              {estaExpandido && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {cursosFiltradosYOrdenados.map((curso) => {
                      const estado = obtenerEstadoCurso(curso);
                      const esElectivo = curso.tipo === "E";

                      let bgCardStyle = "";
                      let accentBarStyle = "";

                      if (esElectivo) {
                        if (estado === "aprobado") {
                          bgCardStyle = "bg-gradient-to-br from-purple-950/60 via-slate-950/90 to-purple-900/30 dark:from-purple-950/60 dark:via-slate-950/90 dark:to-purple-900/30 light:from-purple-100 light:via-white light:to-purple-50 border-purple-500/60 light:border-purple-400 shadow-purple-500/10";
                          accentBarStyle = "bg-gradient-to-b from-emerald-400 to-purple-500";
                        } else if (estado === "disponible") {
                          bgCardStyle = "bg-gradient-to-br from-purple-950/40 via-slate-950/90 to-amber-950/20 dark:from-purple-950/40 dark:via-slate-950/90 dark:to-amber-950/20 light:from-purple-50 light:via-white light:to-amber-50/50 border-purple-500/40 hover:border-purple-400 light:border-purple-300 light:hover:border-purple-500 shadow-purple-500/5";
                          accentBarStyle = "bg-gradient-to-b from-purple-500 via-violet-400 to-amber-400";
                        } else {
                          bgCardStyle = "bg-slate-950/40 dark:bg-purple-950/20 light:bg-slate-100 border-purple-900/30 dark:border-purple-900/30 light:border-slate-200 opacity-60 hover:opacity-80";
                          accentBarStyle = "bg-purple-900/50 light:bg-purple-300";
                        }
                      } else {
                        if (estado === "aprobado") {
                          bgCardStyle = "bg-slate-950/90 dark:bg-slate-950/90 light:bg-emerald-50/60 border-emerald-500/50 light:border-emerald-300 hover:border-emerald-400 shadow-emerald-500/5";
                          accentBarStyle = "bg-emerald-500";
                        } else if (estado === "disponible") {
                          bgCardStyle = "bg-slate-950/90 dark:bg-slate-950/90 light:bg-white border-blue-500/50 light:border-blue-300 hover:border-blue-400 shadow-blue-500/5";
                          accentBarStyle = "bg-blue-500";
                        } else {
                          bgCardStyle = "bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-100 border-slate-800/80 light:border-slate-200 opacity-60 hover:opacity-80";
                          accentBarStyle = "bg-slate-700 light:bg-slate-400";
                        }
                      }

                      return (
                        <button
                          key={curso.id}
                          type="button"
                          onClick={() => manejarClickCurso(curso)}
                          className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 shadow-md relative overflow-hidden group cursor-pointer ${bgCardStyle}`}
                        >
                          {/* Accent status bar */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${accentBarStyle}`}></div>

                          <div className="pl-2 space-y-1">
                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 light:text-slate-600">
                              <span className="font-mono tracking-wider">{curso.id}</span>
                              <div className="flex items-center space-x-1.5">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${
                                  esElectivo
                                    ? "bg-gradient-to-r from-purple-500/20 to-amber-500/20 text-purple-300 dark:text-purple-300 light:bg-purple-200 light:text-purple-900 border border-purple-500/40 light:border-purple-300 shadow-sm"
                                    : "bg-blue-500/10 text-blue-400 dark:text-blue-400 light:bg-blue-100 light:text-blue-800 border border-blue-500/20 light:border-blue-300"
                                }`}>
                                  {esElectivo ? "⚡ ELECTIVO" : "Obligatorio"}
                                </span>
                                <span className="text-slate-300 dark:text-slate-300 light:text-slate-700 font-mono font-bold">{curso.creditos} CR</span>
                              </div>
                            </div>

                            <h4 className="text-xs font-black text-slate-100 dark:text-slate-100 light:text-slate-900 leading-tight min-h-[32px] pt-1">
                              {curso.nombre}
                            </h4>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-center justify-between text-[10px] text-slate-400 light:text-slate-600 font-semibold pl-2">
                            <span className="truncate max-w-[130px]" title={curso.requisitos.join(", ")}>
                              Req: {curso.requisitos.length > 0 ? curso.requisitos.join(" · ") : "Ninguno"}
                            </span>
                            
                            <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center space-x-1 ${
                              estado === "aprobado"
                                ? "bg-emerald-500/20 text-emerald-400 light:bg-emerald-100 light:text-emerald-800 border border-emerald-500/30"
                                : estado === "disponible"
                                ? esElectivo
                                  ? "bg-purple-500/20 text-purple-300 light:bg-purple-100 light:text-purple-800 border border-purple-500/30"
                                  : "bg-blue-500/20 text-blue-400 light:bg-blue-100 light:text-blue-800 border border-blue-500/30"
                                : "bg-slate-800 light:bg-slate-200 text-slate-500 light:text-slate-600"
                            }`}>
                              {estado === "aprobado" ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400 light:text-emerald-600" />
                                  <span>Aprobado</span>
                                </>
                              ) : estado === "disponible" ? (
                                <>
                                  <Unlock className="w-3 h-3 text-blue-400 light:text-blue-600" />
                                  <span>Aprobar</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-3 h-3 text-slate-500 light:text-slate-600" />
                                  <span>Bloqueado</span>
                                </>
                              )}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
