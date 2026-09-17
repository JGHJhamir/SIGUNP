import React, { useState, useEffect, useMemo } from "react";
import { useTema } from "../../contexto/ContextoTema";
import { supabase } from "../../lib/supabase";
import {
  Search,
  CheckCircle2,
  Lock,
  Unlock,
  Sparkles,
  AlertCircle,
  BookOpen,
  Check,
  X,
  Layers,
  Award,
  BookMarked,
  CheckCheck,
  RotateCcw,
  Zap,
  Info,
  Filter,
  GitBranch,
  ArrowRight,
  ArrowDown,
  ChevronRight,
  Workflow,
  ShieldCheck
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
      { id: "SI3421", nombre: "Modelado de Datos", creditos: 4, tipo: "O", requisitos: ["SI2418"] }
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
      { id: "ED3285", nombre: "Taller de Redacción Científica", creditos: 2, tipo: "O", requisitos: ["ED1331"] }
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
      { id: "SI4490", nombre: "Sistemas Operativos", creditos: 4, tipo: "O", requisitos: ["SI2418", "SI3400"] }
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
      { id: "SI5365", nombre: "Tecnología y Desarrollo Web", creditos: 3, tipo: "O", requisitos: ["SI4488"] }
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
      { id: "SI5373", nombre: "Trabajo de Investigación", creditos: 3, tipo: "O", requisitos: ["IO5365"] }
    ]
  }
];

export default function MallaCurricular() {
  const { tema } = useTema();
  const [aprobados, setAprobados] = useState([]);
  const [mensajeError, setMensajeError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(null);
  
  // Pestaña de ciclo activa: 1 al 10 o "todos"
  const [cicloActivo, setCicloActivo] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [cursoDetalleModal, setCursoDetalleModal] = useState(null);

  // Todos los cursos plano
  const todosLosCursos = useMemo(() => {
    return planEstudios.flatMap((sem) =>
      sem.cursos.map((c) => ({
        ...c,
        cicloNombre: sem.ciclo,
        numeroCiclo: sem.numeroCiclo
      }))
    );
  }, []);

  // Mapeo ID -> Curso
  const mapaCursos = useMemo(() => {
    const mapa = {};
    todosLosCursos.forEach((c) => { mapa[c.id] = c; });
    return mapa;
  }, [todosLosCursos]);

  // Requisitos previos del curso en modal
  const requisitosPreviosModal = useMemo(() => {
    if (!cursoDetalleModal || !cursoDetalleModal.requisitos) return [];
    return cursoDetalleModal.requisitos.map((id) => mapaCursos[id]).filter(Boolean);
  }, [cursoDetalleModal, mapaCursos]);

  // Cursos que abre (post-requisitos) del curso en modal
  const cursosQueAbreModal = useMemo(() => {
    if (!cursoDetalleModal) return [];
    return todosLosCursos.filter((c) => c.requisitos.includes(cursoDetalleModal.id));
  }, [cursoDetalleModal, todosLosCursos]);

  // Cargar cursos aprobados al iniciar
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
          console.warn("Error Supabase fallback local", e);
        }
      }
      const cursosGuardados = localStorage.getItem("cursosAprobados");
      if (cursosGuardados) {
        try {
          setAprobados(JSON.parse(cursosGuardados));
        } catch (e) {
          console.error("Error al cargar cursos aprobados", e);
        }
      } else {
        // Fallback por defecto si es usuario nuevo
        const defaultAprobados = [
          "ED1292", "SI1447", "ED1331", "MA1470", "SI1358", "SI1216", "MA1408", "ED1297",
          "CB1324", "MA1435", "FI1363", "SI1445", "CS1286", "SI1435", "QU1363"
        ];
        setAprobados(defaultAprobados);
        localStorage.setItem("cursosAprobados", JSON.stringify(defaultAprobados));
      }
    };
    cargarCursos();
  }, []);

  // Guardar en localStorage y Supabase
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
        console.warn("Error sincronizando Supabase", e);
      }
    }
  };

  const obtenerEstadoCurso = (curso) => {
    if (aprobados.includes(curso.id)) {
      return "aprobado";
    }
    const requisitosCumplidos = curso.requisitos.every((reqId) => aprobados.includes(reqId));
    return requisitosCumplidos ? "disponible" : "bloqueado";
  };

  const manejarClickCurso = (curso) => {
    setMensajeError(null);
    setMensajeExito(null);
    const estadoActual = obtenerEstadoCurso(curso);

    if (estadoActual === "aprobado") {
      // Verificar si es prerrequisito de otro curso aprobado
      const esPrerrequisitoDeAprobado = todosLosCursos.some(
        (c) => c.requisitos.includes(curso.id) && aprobados.includes(c.id)
      );

      if (esPrerrequisitoDeAprobado) {
        setMensajeError(`No puedes desaprobar ${curso.nombre} (${curso.id}) porque es requisito de otros cursos que ya aprobaste.`);
        return;
      }

      guardarAprobados(aprobados.filter((id) => id !== curso.id));
      setMensajeExito(`Curso ${curso.nombre} desmarcado.`);
    } else if (estadoActual === "disponible") {
      guardarAprobados([...aprobados, curso.id]);
      setMensajeExito(`¡${curso.nombre} marcado como Aprobado! 🎉`);
    } else {
      const requisitosFaltantes = curso.requisitos.filter((reqId) => !aprobados.includes(reqId));
      const nombresRequisitos = requisitosFaltantes.map(
        (id) => `${mapaCursos[id]?.nombre || id} (${id})`
      );

      setMensajeError(`Para habilitar ${curso.nombre} primero debes aprobar: ${nombresRequisitos.join(", ")}.`);
    }
  };

  // Marcar Ciclo Completo (Solo asignaturas desbloqueadas/disponibles)
  const marcarCicloCompleto = (numeroCiclo) => {
    setMensajeError(null);
    setMensajeExito(null);

    const sem = planEstudios.find((s) => s.numeroCiclo === numeroCiclo);
    if (!sem) return;

    const cursosCiclo = sem.cursos;
    let aprobadosNuevos = [...aprobados];
    let aprobadosEnEstaAccion = 0;
    let bloqueadosOmitidos = 0;

    // Iterar para aprobar en cadena los disponibles del ciclo
    let cambioOcurrio = true;
    while (cambioOcurrio) {
      cambioOcurrio = false;
      cursosCiclo.forEach((curso) => {
        if (!aprobadosNuevos.includes(curso.id)) {
          const sePuedeAprobar = curso.requisitos.every((reqId) => aprobadosNuevos.includes(reqId));
          if (sePuedeAprobar) {
            aprobadosNuevos.push(curso.id);
            aprobadosEnEstaAccion++;
            cambioOcurrio = true;
          }
        }
      });
    }

    // Contar cuántos quedaron sin aprobar por estar bloqueados
    bloqueadosOmitidos = cursosCiclo.filter((c) => !aprobadosNuevos.includes(c.id)).length;

    if (aprobadosEnEstaAccion > 0) {
      guardarAprobados(aprobadosNuevos);
      if (bloqueadosOmitidos === 0) {
        setMensajeExito(`¡Ciclo ${sem.ciclo} marcado como 100% Completo y guardado! 🎉`);
      } else {
        setMensajeExito(`Se aprobaron ${aprobadosEnEstaAccion} cursos disponibles del ${sem.ciclo}. (${bloqueadosOmitidos} cursos continúan bloqueados por prerrequisitos previos).`);
      }
    } else {
      if (bloqueadosOmitidos === 0) {
        setMensajeExito(`Todos los cursos del ${sem.ciclo} ya se encontraban aprobados.`);
      } else {
        setMensajeError(`No se pudo aprobar cursos del ${sem.ciclo} porque se encuentran bloqueados por prerrequisitos de ciclos anteriores.`);
      }
    }
  };

  // Desmarcar todo el ciclo activo (si ningún futuro curso los requiere)
  const desmarcarCicloCompleto = (numeroCiclo) => {
    setMensajeError(null);
    setMensajeExito(null);

    const sem = planEstudios.find((s) => s.numeroCiclo === numeroCiclo);
    if (!sem) return;

    const idsCiclo = sem.cursos.map((c) => c.id);
    
    // Verificar si algún curso aprobado fuera de este ciclo depende de los del ciclo
    const bloqueadosPorPrerrequisito = sem.cursos.filter((curso) => {
      if (!aprobados.includes(curso.id)) return false;
      return todosLosCursos.some(
        (c) => !idsCiclo.includes(c.id) && c.requisitos.includes(curso.id) && aprobados.includes(c.id)
      );
    });

    if (bloqueadosPorPrerrequisito.length > 0) {
      setMensajeError(`No se puede desmarcar todo el ${sem.ciclo} porque algunas asignaturas son requisito de cursos aprobados en ciclos superiores.`);
      return;
    }

    const nuevaLista = aprobados.filter((id) => !idsCiclo.includes(id));
    guardarAprobados(nuevaLista);
    setMensajeExito(`Se han desmarcado los cursos del ${sem.ciclo}.`);
  };

  // Totales globales
  const totalCreditosPlan = planEstudios.reduce((acc, sem) => acc + sem.cursos.reduce((sAcc, c) => sAcc + c.creditos, 0), 0);
  const totalObligatoriosPlan = todosLosCursos.length;

  const totalCreditosAprobados = todosLosCursos.reduce((acc, c) => acc + (aprobados.includes(c.id) ? c.creditos : 0), 0);
  const totalCursosAprobados = aprobados.length;

  const porcentajeObligatorios = Math.round((totalCursosAprobados / totalObligatoriosPlan) * 100);
  const porcentajeProgreso = Math.min(100, Math.round((totalCreditosAprobados / (totalCreditosPlan || 205)) * 100));

  // Filtrado de cursos según el ciclo activo y la búsqueda
  const ciclosAMostrar = useMemo(() => {
    if (cicloActivo === "todos") {
      return planEstudios;
    }
    return planEstudios.filter((s) => s.numeroCiclo === cicloActivo);
  }, [cicloActivo]);

  return (
    <div className="space-y-4 sm:space-y-5">

      {/* Banner Principal de Métricas Resumen (Compacto) */}
      <div className="rounded-2xl liquid-glass-card glare-hover p-3.5 sm:p-4 md:p-5 space-y-3 sm:space-y-4 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="space-y-0.5">
            <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-[10px] sm:text-xs font-bold">
              <Sparkles className="w-3 h-3" />
              <span>PLAN DE ESTUDIOS 2018-1 · ING. INFORMÁTICA UNP</span>
            </div>
            <h1 className={`text-base sm:text-xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Avance Curricular por Ciclos
            </h1>
          </div>

          {/* Buscador Rápido de Cursos */}
          <div className="relative w-full sm:w-56 shrink-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar curso o código..."
              className={`w-full pl-8 pr-4 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                tema === 'dark'
                  ? 'bg-[#090e1a] border-slate-800 text-white placeholder-slate-500 focus:border-blue-500'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 shadow-2xs'
              }`}
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Tarjetas de Avance - Fila Única Compacta (Celular y Escritorio) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          
          {/* Cursos Aprobados */}
          <div className={`p-2.5 sm:p-3 rounded-xl border ${
            tema === 'dark' ? 'bg-[#090e1a]/80 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
          } flex flex-col justify-between liquid-btn`}>
            <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-bold text-blue-500 uppercase tracking-wider truncate">
              <span>Cursos</span>
              <span className="bg-blue-500/10 text-blue-500 px-1 py-0.2 rounded font-bold border border-blue-500/20 text-[8px] sm:text-[9px]">{porcentajeObligatorios}%</span>
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <div className={`text-sm sm:text-xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {totalCursosAprobados} <span className={`text-[9px] sm:text-[11px] font-medium ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/{totalObligatoriosPlan}</span>
              </div>
            </div>
            <div className={`w-full ${tema === 'dark' ? 'bg-slate-800/80' : 'bg-slate-200'} h-1 sm:h-1.5 rounded-full overflow-hidden mt-1`}>
              <div className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${porcentajeObligatorios}%` }}></div>
            </div>
          </div>

          {/* Créditos Acumulados */}
          <div className={`p-2.5 sm:p-3 rounded-xl border ${
            tema === 'dark' ? 'bg-[#090e1a]/80 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
          } flex flex-col justify-between liquid-btn`}>
            <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-bold text-emerald-500 uppercase tracking-wider truncate">
              <span>Créditos</span>
              <span className="bg-emerald-500/10 text-emerald-500 px-1 py-0.2 rounded font-bold border border-emerald-500/20 text-[8px] sm:text-[9px]">{porcentajeProgreso}%</span>
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <div className={`text-sm sm:text-xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {totalCreditosAprobados} <span className={`text-[9px] sm:text-[11px] font-medium ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/{totalCreditosPlan}</span>
              </div>
            </div>
            <div className={`w-full ${tema === 'dark' ? 'bg-slate-800/80' : 'bg-slate-200'} h-1 sm:h-1.5 rounded-full overflow-hidden mt-1`}>
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${porcentajeProgreso}%` }}></div>
            </div>
          </div>

          {/* Avance Global */}
          <div className={`p-2.5 sm:p-3 rounded-xl border ${
            tema === 'dark' ? 'bg-[#090e1a]/80 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
          } flex flex-col justify-between liquid-btn`}>
            <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-bold text-purple-500 uppercase tracking-wider truncate">
              <span>Avance</span>
              <span className="text-purple-500 font-bold text-[8px] sm:text-[9px]">{porcentajeProgreso}%</span>
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <div className={`text-sm sm:text-xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {porcentajeProgreso}%
              </div>
            </div>
            <div className={`w-full ${tema === 'dark' ? 'bg-slate-800/80' : 'bg-slate-200'} h-1 sm:h-1.5 rounded-full overflow-hidden mt-1`}>
              <div className="bg-purple-500 h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${porcentajeProgreso}%` }}></div>
            </div>
          </div>

        </div>
      </div>

      {/* Alertas Toasts */}
      {mensajeError && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start space-x-2.5 text-rose-500 text-xs font-semibold animate-fadeIn shadow-2xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
          <span className="leading-relaxed">{mensajeError}</span>
        </div>
      )}

      {mensajeExito && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start space-x-2.5 text-emerald-500 text-xs font-semibold animate-fadeIn shadow-2xs">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
          <span className="leading-relaxed">{mensajeExito}</span>
        </div>
      )}

      {/* Pestañas de Selección de Ciclos (Ciclo I a X + Todos) */}
      <div className="rounded-2xl liquid-glass-card p-3 sm:p-3.5 space-y-3">
        
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 dark:border-slate-800/80">
          <span className={`text-[11px] sm:text-xs font-extrabold uppercase tracking-wider ${
            tema === 'dark' ? 'text-slate-400' : 'text-slate-600'
          } flex items-center space-x-1.5`}>
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            <span>Ciclo Académico:</span>
          </span>
          <span className={`text-[10px] sm:text-[11px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {cicloActivo === "todos" ? "Todos los ciclos" : `Ciclo ${cicloActivo}`}
          </span>
        </div>

        {/* Scroll Horizontal de Pestañas de Ciclo */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {planEstudios.map((sem) => {
            const esActivo = cicloActivo === sem.numeroCiclo;
            const aprobadosEnCiclo = sem.cursos.filter((c) => aprobados.includes(c.id)).length;
            const esCompleto = aprobadosEnCiclo === sem.cursos.length;

            return (
              <button
                key={sem.numeroCiclo}
                type="button"
                onClick={() => setCicloActivo(sem.numeroCiclo)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold transition-all shrink-0 flex items-center space-x-1 cursor-pointer liquid-btn ${
                  esActivo
                    ? "bg-blue-600 text-white shadow-xs scale-102"
                    : esCompleto
                    ? tema === 'dark'
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                    : tema === 'dark'
                    ? "bg-[#090e1a]/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                    : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <span>{sem.ciclo.replace("Ciclo ", "C-")}</span>
                <span className={`text-[9px] px-1 py-0.1 rounded-full font-bold ${
                  esActivo
                    ? "bg-white/20 text-white"
                    : esCompleto
                    ? "bg-emerald-500/20 text-emerald-500"
                    : "bg-slate-500/20 text-slate-400"
                }`}>
                  {esCompleto ? "✓" : `${aprobadosEnCiclo}/${sem.cursos.length}`}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setCicloActivo("todos")}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold transition-all shrink-0 flex items-center space-x-1 cursor-pointer liquid-btn ${
              cicloActivo === "todos"
                ? "bg-blue-600 text-white shadow-xs scale-102"
                : tema === 'dark'
                ? "bg-[#090e1a]/80 text-slate-400 border border-slate-800 hover:text-white"
                : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
            }`}
          >
            <Filter className="w-3 h-3" />
            <span>Todos</span>
          </button>
        </div>

      </div>

      {/* Lista de Cursos del Ciclo Activo (Vista Vertical Compacta) */}
      <div className="space-y-4">
        {ciclosAMostrar.map((semestre) => {
          const cursosFiltrados = semestre.cursos.filter((c) => {
            if (!busqueda) return true;
            const term = busqueda.toLowerCase();
            return c.nombre.toLowerCase().includes(term) || c.id.toLowerCase().includes(term);
          });

          if (cursosFiltrados.length === 0) return null;

          const aprobadosCount = semestre.cursos.filter((c) => aprobados.includes(c.id)).length;
          const esCicloCompleto = aprobadosCount === semestre.cursos.length;
          const creditosTotalesCiclo = semestre.cursos.reduce((acc, c) => acc + c.creditos, 0);

          return (
            <div
              key={semestre.numeroCiclo}
              className={`p-3.5 sm:p-5 rounded-2xl liquid-glass-card space-y-3 transition-all`}
            >
              {/* Cabecera del Ciclo con Botones de Acción */}
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b ${
                tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'
              }`}>
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <h2 className={`text-base sm:text-lg font-extrabold ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {semestre.ciclo}
                    </h2>
                    {esCicloCompleto && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                        <Check className="w-2.5 h-2.5" />
                        <span>Completo</span>
                      </span>
                    )}
                  </div>
                  <p className={`text-[11px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {semestre.cursos.length} Asignaturas · {creditosTotalesCiclo} CR ({aprobadosCount}/{semestre.cursos.length} Aprobados)
                  </p>
                </div>

                {/* Acciones para Marcar Ciclo Completo */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => marcarCicloCompleto(semestre.numeroCiclo)}
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] sm:text-xs font-bold transition-all shadow-2xs flex items-center space-x-1 cursor-pointer active:scale-95"
                    title="Aprobar asignaturas con prerrequisitos cumplidos en este ciclo"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Marcar Ciclo Completo</span>
                  </button>

                  {aprobadosCount > 0 && (
                    <button
                      type="button"
                      onClick={() => desmarcarCicloCompleto(semestre.numeroCiclo)}
                      className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all border flex items-center space-x-1 cursor-pointer active:scale-95 ${
                        tema === 'dark'
                          ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                          : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                      title="Desmarcar todas las asignaturas de este ciclo"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Desmarcar</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Lista Vertical de Cursos (Diseño Ultra Compacto y Táctil) */}
              <div className="space-y-1.5 sm:space-y-2">
                {cursosFiltrados.map((curso) => {
                  const estado = obtenerEstadoCurso(curso);
                  const estaAprobado = estado === "aprobado";
                  const estaDisponible = estado === "disponible";

                  return (
                    <div
                      key={curso.id}
                      onClick={() => setCursoDetalleModal(curso)}
                      className={`p-2 sm:p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer liquid-btn hover-scale-pop ${
                        estaAprobado
                          ? tema === 'dark'
                            ? "bg-emerald-950/25 border-emerald-500/30 text-emerald-100 hover:border-emerald-500/50"
                            : "bg-emerald-50/90 border-emerald-200 text-slate-900 hover:border-emerald-300"
                          : estaDisponible
                          ? tema === 'dark'
                            ? "bg-blue-950/25 border-blue-500/30 text-white hover:border-blue-500/50"
                            : "bg-blue-50/80 border-blue-200 text-slate-900 hover:border-blue-300"
                          : tema === 'dark'
                          ? "bg-[#090e1a]/50 border-slate-800/60 text-slate-400 hover:border-slate-700 opacity-75"
                          : "bg-slate-100/70 border-slate-200 text-slate-500 hover:border-slate-300 opacity-75"
                      }`}
                    >
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        {/* Estado Icono */}
                        <div className="shrink-0">
                          {estaAprobado && (
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                          )}
                          {estaDisponible && (
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                              <Unlock className="w-3 h-3" />
                            </div>
                          )}
                          {!estaAprobado && !estaDisponible && (
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-slate-500/10 text-slate-500 border border-slate-500/20 flex items-center justify-center">
                              <Lock className="w-3 h-3" />
                            </div>
                          )}
                        </div>

                        {/* Nombre y Detalles Comprimidos */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-1.5">
                            <span className={`px-1 py-0.1 rounded text-[9px] font-extrabold ${
                              estaAprobado
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : estaDisponible
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                            }`}>
                              {curso.id}
                            </span>
                            <span className={`text-[9px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                              {curso.creditos} CR
                            </span>
                          </div>

                          <h3 className={`text-xs font-bold truncate leading-tight mt-0.5 ${
                            estaAprobado
                              ? tema === 'dark' ? 'text-emerald-300' : 'text-emerald-950'
                              : estaDisponible
                              ? tema === 'dark' ? 'text-white' : 'text-slate-900'
                              : tema === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            {curso.nombre}
                          </h3>
                        </div>
                      </div>

                      {/* Badge de Estado y Flecha Árbol */}
                      <div className="flex items-center space-x-1.5 shrink-0">
                        {estaAprobado && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold">
                            Aprobado
                          </span>
                        )}
                        {estaDisponible && (
                          <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[9px] font-bold shadow-2xs">
                            Aprobar
                          </span>
                        )}
                        {!estaAprobado && !estaDisponible && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700 text-[9px] font-bold">
                            Bloqueado
                          </span>
                        )}
                        <GitBranch className="w-3.5 h-3.5 text-slate-400 hover:text-blue-400 transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

      {/* Modal Interactivo de Árbol de Dependencias del Curso */}
      {cursoDetalleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl liquid-glass-card border border-white/20 p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-2xl animate-scaleUp">
            
            {/* Cabecera del Modal */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/15 text-blue-400 border border-blue-500/30">
                    {cursoDetalleModal.cicloNombre || `Ciclo ${cursoDetalleModal.numeroCiclo}`}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500/15 text-purple-400 border border-purple-500/30">
                    {cursoDetalleModal.id}
                  </span>
                  <span className={`text-[10px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {cursoDetalleModal.creditos} Créditos
                  </span>
                </div>
                <h2 className={`text-lg sm:text-xl font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {cursoDetalleModal.nombre}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setCursoDetalleModal(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subtítulo Árbol Flujo */}
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-500 uppercase tracking-wider">
              <GitBranch className="w-4 h-4" />
              <span>Flujo Curricular: Requisitos y Cadena de Desbloqueo</span>
            </div>

            {/* Estructura del Árbol (3 Capas: Requisitos -> Actual -> Abre) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
              
              {/* Columna 1: Cursos Anteriores (Requisitos) */}
              <div className={`p-3 rounded-2xl border ${
                tema === 'dark' ? 'bg-[#090e1a]/80 border-slate-800' : 'bg-slate-50 border-slate-200'
              } space-y-2 flex flex-col justify-between`}>
                <div>
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Requisitos Previos</span>
                    <span className="text-amber-500 font-bold">{requisitosPreviosModal.length}</span>
                  </div>

                  {requisitosPreviosModal.length === 0 ? (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400 text-center">
                      ✨ Libre Matrícula (Sin prerrequisitos anteriores)
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {requisitosPreviosModal.map((req) => {
                        const reqAprobado = aprobados.includes(req.id);
                        return (
                          <div
                            key={req.id}
                            onClick={() => setCursoDetalleModal(req)}
                            className={`p-2 rounded-xl border text-left cursor-pointer transition-all hover:scale-102 ${
                              reqAprobado
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                                : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                            }`}
                            title="Haz clic para inspeccionar este prerrequisito"
                          >
                            <div className="flex items-center justify-between text-[10px] font-black">
                              <span>{req.id}</span>
                              <span>{reqAprobado ? "✓ Aprobado" : "🔒 Pendiente"}</span>
                            </div>
                            <div className="text-xs font-bold truncate mt-0.5">{req.nombre}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Columna 2: Nodo Central (Curso Seleccionado) */}
              <div className={`p-3.5 rounded-2xl border-2 ${
                obtenerEstadoCurso(cursoDetalleModal) === 'aprobado'
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : obtenerEstadoCurso(cursoDetalleModal) === 'disponible'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-700 bg-slate-900/80'
              } flex flex-col justify-between space-y-3 relative overflow-hidden glare-hover shadow-lg`}>
                <div className="space-y-1 text-center">
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-600 text-white">
                    Curso Seleccionado
                  </span>
                  <div className="text-xs font-black tracking-tight text-white mt-2">
                    {cursoDetalleModal.id}
                  </div>
                  <div className="text-sm font-black text-white leading-tight">
                    {cursoDetalleModal.nombre}
                  </div>
                  <div className="text-[11px] font-bold text-slate-300 mt-1">
                    {cursoDetalleModal.creditos} CR · {cursoDetalleModal.cicloNombre || `Ciclo ${cursoDetalleModal.numeroCiclo}`}
                  </div>
                </div>

                {/* Badge de Estado del Curso */}
                <div className="text-center pt-2">
                  {obtenerEstadoCurso(cursoDetalleModal) === 'aprobado' && (
                    <span className="px-3 py-1 rounded-xl bg-emerald-500 text-white text-xs font-extrabold inline-flex items-center space-x-1 shadow-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>APROBADO</span>
                    </span>
                  )}
                  {obtenerEstadoCurso(cursoDetalleModal) === 'disponible' && (
                    <span className="px-3 py-1 rounded-xl bg-blue-600 text-white text-xs font-extrabold inline-flex items-center space-x-1 shadow-xs animate-pulse">
                      <Unlock className="w-4 h-4" />
                      <span>DISPONIBLE</span>
                    </span>
                  )}
                  {obtenerEstadoCurso(cursoDetalleModal) === 'bloqueado' && (
                    <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 text-xs font-extrabold inline-flex items-center space-x-1">
                      <Lock className="w-4 h-4" />
                      <span>BLOQUEADO</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Columna 3: Cursos que Abre (Post-requisitos) */}
              <div className={`p-3 rounded-2xl border ${
                tema === 'dark' ? 'bg-[#090e1a]/80 border-slate-800' : 'bg-slate-50 border-slate-200'
              } space-y-2 flex flex-col justify-between`}>
                <div>
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Cursos que Abre</span>
                    <span className="text-purple-400 font-bold">{cursosQueAbreModal.length}</span>
                  </div>

                  {cursosQueAbreModal.length === 0 ? (
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-[11px] font-semibold text-slate-400 text-center">
                      🏁 Último nivel de la cadena
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-48 overflow-y-auto">
                      {cursosQueAbreModal.map((post) => {
                        const postAprobado = aprobados.includes(post.id);
                        return (
                          <div
                            key={post.id}
                            onClick={() => setCursoDetalleModal(post)}
                            className={`p-2 rounded-xl border text-left cursor-pointer transition-all hover:scale-102 ${
                              postAprobado
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                                : "bg-purple-500/10 border-purple-500/30 text-purple-300"
                            }`}
                            title="Haz clic para inspeccionar este curso posterior"
                          >
                            <div className="flex items-center justify-between text-[10px] font-black">
                              <span>{post.id}</span>
                              <span className="text-[9px] font-bold">Ciclo {post.numeroCiclo}</span>
                            </div>
                            <div className="text-xs font-bold truncate mt-0.5">{post.nombre}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Footer con Botón de Marcado de Aprobación */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              {obtenerEstadoCurso(cursoDetalleModal) === 'aprobado' ? (
                <button
                  type="button"
                  onClick={() => manejarClickCurso(cursoDetalleModal)}
                  className="w-full py-2.5 sm:py-3 rounded-xl bg-rose-600/20 hover:bg-rose-600 border border-rose-500/40 text-rose-300 hover:text-white font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Desmarcar Aprobado</span>
                </button>
              ) : obtenerEstadoCurso(cursoDetalleModal) === 'disponible' ? (
                <button
                  type="button"
                  onClick={() => manejarClickCurso(cursoDetalleModal)}
                  className="w-full py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg active:scale-98 glare-hover"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>¡Marcar como Aprobado! 🎉</span>
                </button>
              ) : (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-400 font-semibold flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Este curso está bloqueado. Aprueba los requisitos previos resaltados arriba para habilitarlo.</span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
