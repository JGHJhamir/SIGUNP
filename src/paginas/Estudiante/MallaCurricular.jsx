import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTema } from "../../contexto/ContextoTema";
import { supabase } from "../../lib/supabase";
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
  BookOpen,
  GitBranch,
  Network,
  Zap,
  ArrowRight,
  Info,
  Sliders,
  Check,
  X,
  Grid,
  Layers,
  Compass,
  Link as LinkIcon,
  Flame,
  Award,
  Layers3,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Eye,
  Filter,
  SlidersHorizontal
} from "lucide-react";

// Estructura completa de la carrera de Ingeniería Informática - Plan 2018-1
const planEstudios = [
  {
    ciclo: "Ciclo I",
    numeroCiclo: 1,
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
    numeroCiclo: 2,
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
    numeroCiclo: 3,
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
    numeroCiclo: 4,
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
    numeroCiclo: 5,
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
    numeroCiclo: 6,
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
    numeroCiclo: 7,
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
    numeroCiclo: 8,
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
    numeroCiclo: 9,
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
    numeroCiclo: 10,
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

// Definición de Líneas Académicas de Especialidad
const LINEAS_ACADEMICAS = {
  programacion: {
    id: "programacion",
    nombre: "Línea de Programación y Software",
    icono: "💻",
    color: "from-blue-600 to-indigo-600",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    cursos: ["SI1447", "SI1435", "SI2422", "SI2418", "SI3422", "SI3423", "SI4488", "SI5365", "SI5497", "SI5498"]
  },
  datos: {
    id: "datos",
    nombre: "Línea de Datos e Inteligencia",
    icono: "🗄️",
    color: "from-emerald-600 to-teal-600",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    cursos: ["SI1358", "SI2418", "SI3421", "SI3420", "SI4489", "SI4465", "SI5499", "SI5361"]
  },
  matematica: {
    id: "matematica",
    nombre: "Línea de Ciencias B. y Matemáticas",
    icono: "📐",
    color: "from-purple-600 to-violet-600",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    cursos: ["MA1408", "MA1470", "MA1435", "MA2441", "MA2333", "MA3412", "ES2300", "ES3336", "IO4448", "IO4334"]
  },
  hardware: {
    id: "hardware",
    nombre: "Línea de Hardware, Redes y Sistemas",
    icono: "⚡",
    color: "from-amber-600 to-orange-600",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    cursos: ["FI1363", "FI2410", "FI2411", "FI3492", "SI3400", "SI4490", "SI4491", "SI5496"]
  },
  gestion: {
    id: "gestion",
    nombre: "Línea de Gestión y Proyectos",
    icono: "💼",
    color: "from-rose-600 to-pink-600",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    cursos: ["CA2337", "EC2201", "CO2201", "SI2452", "SI4360", "EM4461", "SI5364", "IO5365", "SI5411"]
  }
};

export default function MallaCurricular() {
  const { tema } = useTema();
  const [aprobados, setAprobados] = useState([]);
  const [mensajeError, setMensajeError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [criterioOrden, setCriterioOrden] = useState("alfabetico");
  const [modoVista, setModoVista] = useState("acordeon"); // "acordeon" | "grafo"
  const [filtroEstadoQuick, setFiltroEstadoQuick] = useState("todos"); // "todos" | "disponibles" | "llave" | "aprobados"
  
  // Estado para la inspección interactiva de cadenas
  const [cursoHovered, setCursoHovered] = useState(null);
  const [cursoModalCadena, setCursoModalCadena] = useState(null);
  const [filtroLineaGrafo, setFiltroLineaGrafo] = useState("todas");
  const [esEscalaPantallaCompleta, setEsEscalaPantallaCompleta] = useState(false);
  const [escalaGrafo, setEscalaGrafo] = useState(0.95);

  const [ciclosExpandidos, setCiclosExpandidos] = useState({
    "Ciclo I": true,
    "Ciclo II": true
  });

  // Canvas Refs for connected SVG lines
  const grafoContainerRef = useRef(null);
  const nodeRefs = useRef({});
  const [rutasConexionSVG, setRutasConexionSVG] = useState([]);

  // Flat array of all courses across 10 cycles
  const todosLosCursos = useMemo(() => {
    return planEstudios.flatMap((sem) => sem.cursos.map((c) => ({ ...c, cicloNombre: sem.ciclo, numeroCiclo: sem.numeroCiclo })));
  }, []);

  // Map of course ID -> course object
  const mapaCursos = useMemo(() => {
    const mapa = {};
    todosLosCursos.forEach((c) => { mapa[c.id] = c; });
    return mapa;
  }, [todosLosCursos]);

  // Deep Prerequisite Calculation (Antecesores que se requieren)
  const antecesoresMap = useMemo(() => {
    const res = {};
    todosLosCursos.forEach((curso) => {
      const visitados = new Set();
      const cola = [...(curso.requisitos || [])];
      while (cola.length > 0) {
        const id = cola.shift();
        if (!visitados.has(id)) {
          visitados.add(id);
          const reqs = mapaCursos[id]?.requisitos || [];
          reqs.forEach((r) => cola.push(r));
        }
      }
      res[curso.id] = Array.from(visitados);
    });
    return res;
  }, [todosLosCursos, mapaCursos]);

  // Deep Unlocked Courses Calculation (Sucesores que este curso abre en ciclos futuros)
  const sucesoresMap = useMemo(() => {
    const res = {};
    todosLosCursos.forEach((curso) => {
      const visitados = new Set();
      const cola = [curso.id];
      while (cola.length > 0) {
        const actualId = cola.shift();
        todosLosCursos.forEach((c) => {
          if (c.requisitos.includes(actualId) && !visitados.has(c.id)) {
            visitados.add(c.id);
            cola.push(c.id);
          }
        });
      }
      res[curso.id] = Array.from(visitados);
    });
    return res;
  }, [todosLosCursos]);

  useEffect(() => {
    const cargarCursos = async () => {
      const codigoUni = localStorage.getItem("codigoUniversitario");
      if (codigoUni) {
        try {
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
        } catch (e) {
          console.warn("Supabase auth error fallback", e);
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

  // Recalcular conexiones de la capa SVG del Grafo
  const actualizarConexionesGrafo = () => {
    if (!grafoContainerRef.current) return;
    const containerRect = grafoContainerRef.current.getBoundingClientRect();
    const scrollLeft = grafoContainerRef.current.scrollLeft;
    const scrollTop = grafoContainerRef.current.scrollTop;
    const paths = [];

    todosLosCursos.forEach((curso) => {
      const targetEl = nodeRefs.current[curso.id];
      if (!targetEl) return;
      const targetRect = targetEl.getBoundingClientRect();

      curso.requisitos.forEach((reqId) => {
        const sourceEl = nodeRefs.current[reqId];
        if (!sourceEl) return;
        const sourceRect = sourceEl.getBoundingClientRect();

        // Puntos de salida (Origen a la derecha del nodo antecesor)
        const x1 = (sourceRect.right - containerRect.left + scrollLeft) / escalaGrafo;
        const y1 = (sourceRect.top + sourceRect.height / 2 - containerRect.top + scrollTop) / escalaGrafo;

        // Puntos de entrada (Destino a la izquierda del nodo objetivo)
        const x2 = (targetRect.left - containerRect.left + scrollLeft) / escalaGrafo;
        const y2 = (targetRect.top + targetRect.height / 2 - containerRect.top + scrollTop) / escalaGrafo;

        const dx = Math.max(35, (x2 - x1) / 2);
        const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

        paths.push({
          id: `${reqId}->${curso.id}`,
          sourceId: reqId,
          targetId: curso.id,
          pathD,
          x1, y1, x2, y2
        });
      });
    });

    setRutasConexionSVG(paths);
  };

  useEffect(() => {
    if (modoVista === "grafo") {
      const timer = setTimeout(() => {
        actualizarConexionesGrafo();
      }, 150);
      window.addEventListener("resize", actualizarConexionesGrafo);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", actualizarConexionesGrafo);
      };
    }
  }, [modoVista, filtroLineaGrafo, escalaGrafo]);

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
        setMensajeError(`No puedes desaprobar ${curso.nombre} (${curso.id}) porque es requisito obligatorio de otros cursos que ya aprobaste.`);
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

  // Determine active highlights for hover / selected course
  const setAntecesoresActivos = useMemo(() => {
    if (!cursoHovered) return new Set();
    return new Set(antecesoresMap[cursoHovered] || []);
  }, [cursoHovered, antecesoresMap]);

  const setSucesoresActivos = useMemo(() => {
    if (!cursoHovered) return new Set();
    return new Set(sucesoresMap[cursoHovered] || []);
  }, [cursoHovered, sucesoresMap]);

  return (
    <div className="space-y-6">

      {/* Metric Header Section */}
      <div className="rounded-2xl liquid-glass-card p-5 sm:p-6 md:p-8 space-y-6 transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PLAN DE ESTUDIOS 2018-1 · ING. INFORMÁTICA</span>
            </div>
            <h1 className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Malla Curricular & Cadenas de Prerrequisitos
            </h1>
            <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Visualiza el mapa interactivo de tu carrera, explora los cursos que desbloqueas y gestiona tu avance académico.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Conmutador de Modo Vista: Acordeón vs Grafo de Cadenas */}
            <div className={`flex ${tema === 'dark' ? 'bg-[#090e1a] border-slate-800' : 'bg-slate-100 border-slate-200'} p-1 rounded-xl border`}>
              <button
                type="button"
                onClick={() => setModoVista("acordeon")}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                  modoVista === "acordeon"
                    ? "bg-blue-600 text-white shadow-sm"
                    : tema === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Grid className="w-4 h-4" />
                <span>Lista por Ciclos</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setModoVista("grafo");
                  setTimeout(actualizarConexionesGrafo, 200);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                  modoVista === "grafo"
                    ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-purple-600/20"
                    : tema === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Network className="w-4 h-4 text-purple-300 animate-pulse-subtle" />
                <span>Grafo de Cadenas 🌿</span>
              </button>
            </div>
          </div>
        </div>

        {/* Breakdown Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Cursos Obligatorios */}
          <div className={`p-4 rounded-xl border ${
            tema === 'dark' ? 'bg-[#090e1a]/80 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
          } space-y-2 liquid-btn`}>
            <div className="flex justify-between items-center text-[10px] font-bold text-blue-500 uppercase tracking-wider">
              <span>Cursos Obligatorios</span>
              <span className="bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded font-bold border border-blue-500/20">{porcentajeObligatorios}%</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className={`text-2xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {totalObligatoriosAprobados} <span className={`text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/ {totalObligatoriosPlan}</span>
              </div>
              <span className={`text-[10px] font-medium ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Obligatorios</span>
            </div>
            <div className={`w-full ${tema === 'dark' ? 'bg-slate-800/80' : 'bg-slate-200'} h-1.5 rounded-full overflow-hidden`}>
              <div className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${porcentajeObligatorios}%` }}></div>
            </div>
          </div>

          {/* Cursos Electivos */}
          <div className={`p-4 rounded-xl border ${
            tema === 'dark' ? 'bg-[#090e1a]/80 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
          } space-y-2 liquid-btn`}>
            <div className="flex justify-between items-center text-[10px] font-bold text-purple-500 uppercase tracking-wider">
              <span className="flex items-center space-x-1">
                <span>Créditos Electivos</span>
              </span>
              <span className="bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded font-bold border border-purple-500/20">{porcentajeElectivos}%</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className={`text-2xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {creditosElectivosAprobados} <span className={`text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/ 15 CR</span>
              </div>
              <span className="text-[10px] font-medium text-purple-500">{creditosElectivosAprobados / 3} electivos</span>
            </div>
            <div className={`w-full ${tema === 'dark' ? 'bg-slate-800/80' : 'bg-slate-200'} h-1.5 rounded-full overflow-hidden`}>
              <div className="bg-purple-500 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${porcentajeElectivos}%` }}></div>
            </div>
          </div>

          {/* Créditos Acumulados */}
          <div className={`p-4 rounded-xl border ${
            tema === 'dark' ? 'bg-[#090e1a]/80 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
          } space-y-2 liquid-btn`}>
            <div className="flex justify-between items-center text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
              <span>Créditos Totales</span>
              <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-bold border border-emerald-500/20">{porcentajeProgreso}%</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className={`text-2xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {totalCreditosAprobados} <span className={`text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/ 274 CR</span>
              </div>
              <span className={`text-[10px] font-medium ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Aprobados</span>
            </div>
            <div className={`w-full ${tema === 'dark' ? 'bg-slate-800/80' : 'bg-slate-200'} h-1.5 rounded-full overflow-hidden`}>
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${porcentajeProgreso}%` }}></div>
            </div>
          </div>

          {/* Avance Global */}
          <div className={`p-4 rounded-xl border ${
            tema === 'dark' ? 'bg-[#090e1a]/80 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
          } space-y-2 liquid-btn`}>
            <div className="flex justify-between items-center text-[10px] font-bold text-sky-500 uppercase tracking-wider">
              <span>Progreso Global</span>
              <span className="text-sky-500 font-bold">{porcentajeProgreso}%</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className={`text-2xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {totalCursosAprobados} <span className={`text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/ {totalObligatoriosPlan + totalElectivosPlan}</span>
              </div>
              <span className={`text-[10px] font-medium ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Total Cursos</span>
            </div>
            <div className={`w-full ${tema === 'dark' ? 'bg-slate-800/80' : 'bg-slate-200'} h-1.5 rounded-full overflow-hidden`}>
              <div className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${porcentajeProgreso}%` }}></div>
            </div>
          </div>

        </div>
      </div>

      {/* Error Alert Toast */}
      {mensajeError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start space-x-3 text-rose-500 text-xs font-semibold animate-fadeIn shadow-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
          <span className="leading-relaxed">{mensajeError}</span>
        </div>
      )}

      {/* Toolbar & Controles con Filtros de Estado */}
      <div className="rounded-2xl liquid-glass-card p-4 md:p-5 flex flex-col md:flex-row justify-between items-center gap-4 transition-all">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar asignatura (ej. Algoritmos, Cálculo)..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs font-medium outline-none transition-all ${
              tema === 'dark'
                ? 'bg-[#090e1a] border-slate-800 text-slate-200 focus:border-blue-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-600'
            } border`}
          />
        </div>

        {/* Dynamic Quick Status Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <div className={`flex ${
            tema === 'dark' ? 'bg-[#090e1a] border-slate-800' : 'bg-slate-100 border-slate-200'
          } p-1 rounded-xl border overflow-x-auto no-scrollbar`}>
            {[
              { id: "todos", etiqueta: "Todos" },
              { id: "disponibles", etiqueta: "🔓 Disponibles hoy" },
              { id: "llave", etiqueta: "⚡ Cursos Llave" },
              { id: "aprobados", etiqueta: "✓ Aprobados" }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFiltroEstadoQuick(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                  filtroEstadoQuick === f.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : tema === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {f.etiqueta}
              </button>
            ))}
          </div>

          {modoVista === "acordeon" ? (
            <>
              <button
                type="button"
                onClick={expandirTodos}
                className={`px-3.5 py-2 ${
                  tema === 'dark'
                    ? 'bg-[#090e1a]/80 text-slate-300 hover:bg-slate-800 border-white/10'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/90 shadow-sm'
                } text-xs font-bold rounded-xl border transition-all flex items-center space-x-1.5 cursor-pointer hover-scale-pop`}
              >
                <FolderOpen className="w-3.5 h-3.5 text-blue-500" />
                <span>Expandir</span>
              </button>
              
              <button
                type="button"
                onClick={colapsarTodos}
                className={`px-3.5 py-2 ${
                  tema === 'dark'
                    ? 'bg-[#090e1a]/80 text-slate-300 hover:bg-slate-800 border-white/10'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/90 shadow-sm'
                } text-xs font-bold rounded-xl border transition-all flex items-center space-x-1.5 cursor-pointer hover-scale-pop`}
              >
                <FolderClosed className="w-3.5 h-3.5 text-slate-400" />
                <span>Colapsar</span>
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setEscalaGrafo((prev) => Math.min(1.4, prev + 0.1))}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Aumentar zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setEscalaGrafo((prev) => Math.max(0.6, prev - 0.1))}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Reducir zoom"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setEscalaGrafo(0.95)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:text-white transition-all cursor-pointer"
              >
                Reset Zoom
              </button>

              <button
                type="button"
                onClick={() => setEsEscalaPantallaCompleta(!esEscalaPantallaCompleta)}
                className="p-2 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 hover:text-white transition-all cursor-pointer"
                title="Pantalla Completa Canvas"
              >
                {esEscalaPantallaCompleta ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Legend Header */}
      <div className={`flex flex-wrap items-center gap-4 px-2 text-[11px] font-extrabold ${
        tema === 'dark' ? 'text-slate-400' : 'text-slate-600'
      } uppercase tracking-wider`}>
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
          <span className={tema === 'dark' ? 'text-slate-300' : 'text-slate-800'}>Aprobado</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          <span className={tema === 'dark' ? 'text-slate-300' : 'text-slate-800'}>Disponible</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-500"></div>
          <span className={tema === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Bloqueado</span>
        </div>
        <span className={tema === 'dark' ? 'text-slate-700' : 'text-slate-300'}>|</span>
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="text-cyan-400 font-bold">⬅️ Requisitos de Origen</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></div>
          <span className="text-purple-400 font-bold">➡️ Cursos que Desbloquea</span>
        </div>
      </div>

      {/* ── VISTA 1: LISTA ACORDEÓN POR CICLOS ── */}
      {modoVista === "acordeon" && (
        <div className="space-y-4">
          {planEstudios.map((semestre) => {
            const estaExpandido = !!ciclosExpandidos[semestre.ciclo];
            const aprobadosEnCiclo = semestre.cursos.filter((c) => aprobados.includes(c.id)).length;
            const totalCursosCiclo = semestre.cursos.length;

            // Search and Status filtering
            let cursosFiltrados = semestre.cursos;
            if (busqueda.trim()) {
              const termino = busqueda.toLowerCase();
              cursosFiltrados = cursosFiltrados.filter(
                (c) => c.nombre.toLowerCase().includes(termino) || c.id.toLowerCase().includes(termino)
              );
            }

            if (filtroEstadoQuick === "disponibles") {
              cursosFiltrados = cursosFiltrados.filter((c) => obtenerEstadoCurso(c) === "disponible");
            } else if (filtroEstadoQuick === "aprobados") {
              cursosFiltrados = cursosFiltrados.filter((c) => obtenerEstadoCurso(c) === "aprobado");
            } else if (filtroEstadoQuick === "llave") {
              cursosFiltrados = cursosFiltrados.filter((c) => (sucesoresMap[c.id] || []).length >= 3);
            }

            if (cursosFiltrados.length === 0) {
              return null;
            }

            const cursosFiltradosYOrdenados = ordenarCursos(cursosFiltrados);

            return (
              <div key={semestre.ciclo} className={`liquid-glass-card rounded-3xl overflow-hidden transition-all backdrop-blur-2xl`}>
                
                {/* Accordion Header Button */}
                <button
                  type="button"
                  onClick={() => toggleCiclo(semestre.ciclo)}
                  className={`w-full px-6 py-4 flex items-center justify-between text-left ${
                    tema === 'dark' ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                  } transition-colors cursor-pointer focus:outline-none`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`text-sm font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>
                      {semestre.ciclo}
                    </div>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${
                      aprobadosEnCiclo === totalCursosCiclo
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                        : aprobadosEnCiclo > 0
                        ? "bg-blue-500/10 text-blue-500 border-blue-500/30"
                        : tema === 'dark'
                        ? "bg-slate-800 text-slate-400 border-slate-700"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}>
                      {aprobadosEnCiclo} / {totalCursosCiclo} Aprobados
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-slate-400">
                    {estaExpandido ? <ChevronUp className="w-5 h-5 text-blue-500" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Accordion Expanded Course Cards Grid */}
                {estaExpandido && (
                  <div className={`px-6 pb-6 pt-2 border-t ${
                    tema === 'dark' ? 'border-white/10' : 'border-slate-200/80'
                  } animate-fadeIn`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {cursosFiltradosYOrdenados.map((curso) => {
                        const estado = obtenerEstadoCurso(curso);
                        const esElectivo = curso.tipo === "E";
                        const cantidadSucesores = (sucesoresMap[curso.id] || []).length;

                        // Dynamic hover highlight states
                        const esHovered = cursoHovered === curso.id;
                        const esAntecesores = setAntecesoresActivos.has(curso.id);
                        const esSucesores = setSucesoresActivos.has(curso.id);

                        let bgCardStyle = "";
                        let accentBarStyle = "";

                        if (esHovered) {
                          bgCardStyle = "ring-2 ring-blue-500 scale-[1.02] shadow-xl shadow-blue-500/20";
                          accentBarStyle = "bg-blue-500";
                        } else if (esAntecesores) {
                          bgCardStyle = "ring-2 ring-cyan-400 scale-[1.01] bg-cyan-950/40 border-cyan-400/80 shadow-lg shadow-cyan-500/20";
                          accentBarStyle = "bg-cyan-400 animate-pulse";
                        } else if (esSucesores) {
                          bgCardStyle = "ring-2 ring-purple-400 scale-[1.01] bg-purple-950/40 border-purple-400/80 shadow-lg shadow-purple-500/20";
                          accentBarStyle = "bg-purple-400 animate-pulse";
                        } else if (esElectivo) {
                          if (estado === "aprobado") {
                            bgCardStyle = tema === 'dark'
                              ? "bg-gradient-to-br from-purple-950/80 via-slate-950/90 to-purple-900/40 border-purple-500/60 shadow-purple-500/10"
                              : "bg-gradient-to-br from-purple-50 via-white to-purple-100/60 border-purple-300 shadow-purple-500/5";
                            accentBarStyle = "bg-gradient-to-b from-emerald-400 to-purple-500";
                          } else if (estado === "disponible") {
                            bgCardStyle = tema === 'dark'
                              ? "bg-gradient-to-br from-purple-950/40 via-slate-950/90 to-amber-950/20 border-purple-500/40 hover:border-purple-400 shadow-purple-500/5"
                              : "bg-gradient-to-br from-purple-50/70 via-white to-amber-50/50 border-purple-300 hover:border-purple-400 shadow-purple-500/5";
                            accentBarStyle = "bg-gradient-to-b from-purple-500 via-violet-400 to-amber-400";
                          } else {
                            bgCardStyle = tema === 'dark'
                              ? "bg-slate-950/40 border-purple-900/30 opacity-60 hover:opacity-80"
                              : "bg-slate-50 border-slate-200 opacity-60 hover:opacity-80";
                            accentBarStyle = "bg-purple-900/50";
                          }
                        } else {
                          if (estado === "aprobado") {
                            bgCardStyle = tema === 'dark'
                              ? "bg-slate-950/90 border-emerald-500/50 hover:border-emerald-400 shadow-emerald-500/5"
                              : "bg-emerald-50/80 border-emerald-300 hover:border-emerald-400 shadow-emerald-500/5";
                            accentBarStyle = "bg-emerald-500";
                          } else if (estado === "disponible") {
                            bgCardStyle = tema === 'dark'
                              ? "bg-slate-950/90 border-blue-500/50 hover:border-blue-400 shadow-blue-500/5"
                              : "bg-white border-blue-300 hover:border-blue-400 shadow-blue-500/5";
                            accentBarStyle = "bg-blue-500";
                          } else {
                            bgCardStyle = tema === 'dark'
                              ? "bg-slate-950/40 border-white/10 opacity-60 hover:opacity-80"
                              : "bg-slate-100 border-slate-200 opacity-60 hover:opacity-80";
                            accentBarStyle = "bg-slate-500";
                          }
                        }

                        return (
                          <div
                            key={curso.id}
                            onMouseEnter={() => setCursoHovered(curso.id)}
                            onMouseLeave={() => setCursoHovered(null)}
                            className={`p-4 rounded-2xl border flex flex-col justify-between transition-all duration-200 shadow-md relative overflow-hidden group glare-hover hover-scale-pop ${bgCardStyle}`}
                          >
                            {/* Accent status bar */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${accentBarStyle}`}></div>

                            <div className="pl-2 space-y-1">
                              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                                <span className="font-mono tracking-wider">{curso.id}</span>
                                <div className="flex items-center space-x-1.5">
                                  {cantidadSucesores > 0 && (
                                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center space-x-1">
                                      <GitBranch className="w-2.5 h-2.5 text-purple-400" />
                                      <span>Abre {cantidadSucesores}</span>
                                    </span>
                                  )}
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${
                                    esElectivo
                                      ? tema === 'dark'
                                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
                                        : "bg-purple-100 text-purple-900 border border-purple-300"
                                      : tema === 'dark'
                                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                        : "bg-blue-100 text-blue-800 border border-blue-300"
                                  }`}>
                                    {esElectivo ? "⚡ ELECTIVO" : "Obligatorio"}
                                  </span>
                                  <span className={`font-mono font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{curso.creditos} CR</span>
                                </div>
                              </div>

                              <h4 className={`text-xs font-black ${tema === 'dark' ? 'text-slate-100' : 'text-slate-900'} leading-tight min-h-[32px] pt-1`}>
                                {curso.nombre}
                              </h4>
                            </div>

                            <div className={`mt-3 pt-2.5 border-t ${
                              tema === 'dark' ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'
                            } flex items-center justify-between text-[10px] font-semibold pl-2 gap-2`}>
                              <button
                                type="button"
                                onClick={() => setCursoModalCadena(curso)}
                                className="text-[10px] font-extrabold text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1 cursor-pointer"
                              >
                                <Network className="w-3 h-3 text-purple-400" />
                                <span>Ver Cadena 🌿</span>
                              </button>
                              
                              <button
                                type="button"
                                onClick={() => manejarClickCurso(curso)}
                                className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center space-x-1 cursor-pointer transition-all ${
                                  estado === "aprobado"
                                    ? tema === 'dark'
                                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                                      : "bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200"
                                    : estado === "disponible"
                                    ? esElectivo
                                      ? tema === 'dark'
                                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30"
                                        : "bg-purple-100 text-purple-800 border border-purple-300 hover:bg-purple-200"
                                      : tema === 'dark'
                                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30"
                                        : "bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200"
                                    : tema === 'dark'
                                      ? "bg-slate-800 text-slate-500 hover:bg-slate-700"
                                      : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                                }`}
                              >
                                {estado === "aprobado" ? (
                                  <>
                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                    <span>Aprobado</span>
                                  </>
                                ) : estado === "disponible" ? (
                                  <>
                                    <Unlock className="w-3 h-3 text-blue-500" />
                                    <span>Aprobar</span>
                                  </>
                                ) : (
                                  <>
                                    <Lock className="w-3 h-3 text-slate-400" />
                                    <span>Bloqueado</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* ── VISTA 2: GRAFO INTERACTIVO DE CADENAS Y ARBOL DE CONEXIONES SVG ── */}
      {modoVista === "grafo" && (
        <div className={`space-y-5 animate-fadeIn ${
          esEscalaPantallaCompleta ? "fixed inset-4 z-50 overflow-auto bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-2xl" : ""
        }`}>

          {/* Selector de Línea Académica de Especialidad */}
          <div className="rounded-2xl liquid-glass-card p-4 space-y-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-slate-200 uppercase tracking-wider block">
                Filtrar por Línea de Especialidad / Cadena de Conocimiento
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Las líneas SVG conectan los cursos requeridos con sus sucesores a través de los 10 ciclos.
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setFiltroLineaGrafo("todas");
                  setTimeout(actualizarConexionesGrafo, 100);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                  filtroLineaGrafo === "todas"
                    ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/20"
                    : "bg-slate-950/80 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                🌐 Todas las Cadenas (10 Ciclos)
              </button>

              {Object.values(LINEAS_ACADEMICAS).map((linea) => {
                const esActiva = filtroLineaGrafo === linea.id;
                return (
                  <button
                    key={linea.id}
                    type="button"
                    onClick={() => {
                      setFiltroLineaGrafo(linea.id);
                      setTimeout(actualizarConexionesGrafo, 100);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer flex items-center space-x-1.5 ${
                      esActiva
                        ? `bg-gradient-to-r ${linea.color} text-white border-transparent shadow-lg`
                        : "bg-slate-950/80 text-slate-400 border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <span>{linea.icono}</span>
                    <span>{linea.nombre}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visualizador de Canvas DAG con Capa SVG Conectora */}
          <div
            ref={grafoContainerRef}
            onScroll={actualizarConexionesGrafo}
            className="rounded-3xl liquid-glass-card p-6 overflow-auto relative min-h-[640px] max-h-[75vh] border border-slate-800 shadow-2xl"
          >
            <div
              className="relative transition-transform duration-200 origin-top-left"
              style={{ transform: `scale(${escalaGrafo})`, width: "max-content", minWidth: "2400px" }}
            >
              {/* Capa SVG Translucida de Conexión de Grafos entre Nodos */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ minWidth: "2400px", minHeight: "1200px" }}>
                <defs>
                  <linearGradient id="neonCyanPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="50%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>

                  <filter id="glowNeon" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {rutasConexionSVG.map((conn) => {
                  const esSourceActivo = setAntecesoresActivos.has(conn.sourceId) || conn.sourceId === cursoHovered;
                  const esTargetActivo = setSucesoresActivos.has(conn.targetId) || setAntecesoresActivos.has(conn.targetId) || conn.targetId === cursoHovered;
                  const esLineaDeImpacto = (esSourceActivo && esTargetActivo) || (conn.sourceId === cursoHovered) || (conn.targetId === cursoHovered);

                  if (!esLineaDeImpacto && cursoHovered) {
                    return (
                      <path
                        key={conn.id}
                        d={conn.pathD}
                        fill="none"
                        stroke="rgba(148, 163, 184, 0.05)"
                        strokeWidth="1"
                      />
                    );
                  }

                  return (
                    <g key={conn.id}>
                      <path
                        d={conn.pathD}
                        fill="none"
                        stroke={esLineaDeImpacto ? "url(#neonCyanPurple)" : "rgba(148, 163, 184, 0.18)"}
                        strokeWidth={esLineaDeImpacto ? "3.5" : "1.5"}
                        filter={esLineaDeImpacto ? "url(#glowNeon)" : undefined}
                        strokeDasharray={esLineaDeImpacto ? "8 4" : undefined}
                      />
                      {esLineaDeImpacto && (
                        <circle cx={conn.x2} cy={conn.y2} r="4.5" fill="#a855f7" className="animate-ping" />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Columnas de los 10 Ciclos Académicos */}
              <div className="flex space-x-8 min-w-[2400px] relative z-20 pb-12 pt-2">
                {planEstudios.map((semestre) => {
                  let cursosCiclo = semestre.cursos;
                  
                  if (filtroLineaGrafo !== "todas") {
                    const codigosLinea = LINEAS_ACADEMICAS[filtroLineaGrafo]?.cursos || [];
                    cursosCiclo = cursosCiclo.filter((c) => codigosLinea.includes(c.id));
                  }

                  if (filtroEstadoQuick === "disponibles") {
                    cursosCiclo = cursosCiclo.filter((c) => obtenerEstadoCurso(c) === "disponible");
                  } else if (filtroEstadoQuick === "aprobados") {
                    cursosCiclo = cursosCiclo.filter((c) => obtenerEstadoCurso(c) === "aprobado");
                  } else if (filtroEstadoQuick === "llave") {
                    cursosCiclo = cursosCiclo.filter((c) => (sucesoresMap[c.id] || []).length >= 3);
                  }

                  return (
                    <div key={semestre.ciclo} className="w-56 shrink-0 space-y-4">
                      {/* Header de Columna de Ciclo */}
                      <div className="bg-slate-950/95 border border-slate-800 rounded-2xl p-3.5 text-center shadow-xl backdrop-blur-xl">
                        <div className="text-xs font-black text-white uppercase tracking-wider">{semestre.ciclo}</div>
                        <div className="text-[10px] text-slate-400 font-bold mt-1">
                          {semestre.cursos.filter((c) => aprobados.includes(c.id)).length}/{semestre.cursos.length} Aprobados
                        </div>
                      </div>

                      {/* Lista de Nodos del Ciclo */}
                      <div className="space-y-3">
                        {cursosCiclo.length === 0 ? (
                          <div className="p-4 rounded-2xl border border-dashed border-slate-800/80 text-center text-[10px] text-slate-500">
                            Sin cursos en este filtro
                          </div>
                        ) : (
                          cursosCiclo.map((curso) => {
                            const estado = obtenerEstadoCurso(curso);
                            const esHovered = cursoHovered === curso.id;
                            const esAntecesores = setAntecesoresActivos.has(curso.id);
                            const esSucesores = setSucesoresActivos.has(curso.id);
                            const cantidadSucesores = (sucesoresMap[curso.id] || []).length;
                            const estaOpaco = cursoHovered && !esHovered && !esAntecesores && !esSucesores;

                            let nodeStyle = "";
                            if (esHovered) {
                              nodeStyle = "bg-blue-600/40 border-blue-400 ring-4 ring-blue-500/50 scale-[1.05] shadow-2xl shadow-blue-500/40 z-30";
                            } else if (esAntecesores) {
                              nodeStyle = "bg-cyan-950/90 border-cyan-400 ring-2 ring-cyan-400/80 scale-[1.02] shadow-xl shadow-cyan-500/30 z-20";
                            } else if (esSucesores) {
                              nodeStyle = "bg-purple-950/90 border-purple-400 ring-2 ring-purple-400/80 scale-[1.02] shadow-xl shadow-purple-500/30 z-20";
                            } else if (estado === "aprobado") {
                              nodeStyle = "bg-emerald-950/60 border-emerald-500/50 text-emerald-200 hover:border-emerald-400";
                            } else if (estado === "disponible") {
                              nodeStyle = "bg-blue-950/50 border-blue-500/50 text-blue-200 hover:border-blue-400";
                            } else {
                              nodeStyle = "bg-slate-950/80 border-slate-800 text-slate-400 opacity-60 hover:opacity-100";
                            }

                            return (
                              <div
                                key={curso.id}
                                ref={(el) => (nodeRefs.current[curso.id] = el)}
                                onMouseEnter={() => setCursoHovered(curso.id)}
                                onMouseLeave={() => setCursoHovered(null)}
                                onClick={() => setCursoModalCadena(curso)}
                                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 relative group overflow-hidden ${nodeStyle} ${
                                  estaOpaco ? "opacity-25 scale-[0.97] blur-[0.2px]" : ""
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-[10px] font-mono font-black text-slate-200">
                                    {curso.id}
                                  </span>
                                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${
                                    estado === "aprobado"
                                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                      : estado === "disponible"
                                      ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                                      : "bg-slate-800 text-slate-400 border-slate-700"
                                  }`}>
                                    {estado === "aprobado" ? "✓ Aprobado" : estado === "disponible" ? "🔓 Habilitado" : "🔒 Bloqueado"}
                                  </span>
                                </div>

                                <div className="text-xs font-black text-white leading-snug line-clamp-2">
                                  {curso.nombre}
                                </div>

                                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-slate-400">
                                  <span>{curso.creditos} CR</span>
                                  {cantidadSucesores > 0 && (
                                    <span className="text-purple-300 font-bold flex items-center space-x-1 bg-purple-500/20 px-1.5 py-0.5 rounded border border-purple-500/30">
                                      <GitBranch className="w-2.5 h-2.5 text-purple-400" />
                                      <span>Abre {cantidadSucesores}</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ── INSPECTOR SLIDE DRAWER / SIDE SHEET UNCLUTTERED UX ── */}
      {cursoModalCadena && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl h-full liquid-glass-modal border-l border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl relative overflow-y-auto flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* Header Drawer */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold">
                    <Network className="w-3.5 h-3.5 text-purple-400" />
                    <span>INSPECTOR DE CADENA DE CONOCIMIENTO</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-white flex items-center space-x-2">
                    <span>{cursoModalCadena.nombre}</span>
                    <span className="text-sm font-mono text-slate-400 font-bold">({cursoModalCadena.id})</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Ciclo {cursoModalCadena.numeroCiclo || "I-X"} · {cursoModalCadena.creditos} Créditos Lectivos · {cursoModalCadena.tipo === "E" ? "Asignatura Electiva" : "Asignatura Obligatoria"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCursoModalCadena(null)}
                  className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Botón Acción Rápida de Aprobación */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-black text-white">Estado de la Asignatura</div>
                  <div className="text-[11px] text-slate-400">
                    {aprobados.includes(cursoModalCadena.id) ? "Asignatura superada exitosamente." : "Habilitada para ser cursada en tu plan de estudios."}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    manejarClickCurso(cursoModalCadena);
                    setTimeout(actualizarConexionesGrafo, 100);
                  }}
                  className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center space-x-2 cursor-pointer shrink-0 shadow-lg ${
                    aprobados.includes(cursoModalCadena.id)
                      ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
                  }`}
                >
                  <span>{aprobados.includes(cursoModalCadena.id) ? "Desmarcar Aprobado" : "Marcar Aprobado ✓"}</span>
                </button>
              </div>

              {/* Sección 1: Requisitos de Origen */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>1. Requisitos de Origen ({cursoModalCadena.requisitos.length})</span>
                </h3>

                {cursoModalCadena.requisitos.length === 0 ? (
                  <p className="text-xs text-slate-500 font-semibold p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    Esta asignatura no requiere prerrequisitos previos. Se puede matricular libremente.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {cursoModalCadena.requisitos.map((reqId) => {
                      const reqCurso = mapaCursos[reqId];
                      const estaAprobado = aprobados.includes(reqId);
                      return (
                        <div key={reqId} className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                          estaAprobado ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300" : "bg-rose-950/40 border-rose-500/40 text-rose-300"
                        }`}>
                          <div>
                            <div className="font-extrabold text-xs">{reqCurso?.nombre || reqId}</div>
                            <div className="text-[10px] font-mono opacity-80">{reqId} · Ciclo {reqCurso?.cicloNombre || "I"}</div>
                          </div>
                          {estaAprobado ? (
                            <span className="text-[10px] font-black bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                              ✓ Aprobado
                            </span>
                          ) : (
                            <span className="text-[10px] font-black bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
                              🔒 Faltante
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Sección 2: Cursos que Abre en Ciclos Futuros */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-purple-400 uppercase tracking-wider flex items-center space-x-2">
                  <GitBranch className="w-4 h-4 text-purple-400" />
                  <span>2. Asignaturas que Habilita en Ciclos Futuros ({(sucesoresMap[cursoModalCadena.id] || []).length})</span>
                </h3>

                {(sucesoresMap[cursoModalCadena.id] || []).length === 0 ? (
                  <p className="text-xs text-slate-500 font-semibold p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    Asignatura terminal del plan de estudios.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(sucesoresMap[cursoModalCadena.id] || []).map((sucId) => {
                      const sucCurso = mapaCursos[sucId];
                      const estaAprobado = aprobados.includes(sucId);
                      return (
                        <div key={sucId} className={`p-2.5 rounded-xl border text-xs flex flex-col justify-between ${
                          estaAprobado
                            ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                            : "bg-purple-950/40 border-purple-500/40 text-purple-300"
                        }`}>
                          <div className="font-extrabold text-[11px] truncate">{sucCurso?.nombre || sucId}</div>
                          <div className="text-[9px] font-mono opacity-80 mt-1 flex justify-between">
                            <span>{sucId}</span>
                            <span>Ciclo {sucCurso?.cicloNombre || "Futuro"}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCursoModalCadena(null)}
                className="w-full py-3 rounded-2xl font-black text-xs bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              >
                Cerrar Inspector
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
