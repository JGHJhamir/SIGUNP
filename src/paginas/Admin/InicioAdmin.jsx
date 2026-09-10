import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Users,
  BookOpenCheck,
  GraduationCap,
  Calendar,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Activity,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  PlusCircle,
  Database,
  Layers,
  Clock
} from "lucide-react";
import { useTema } from "../../contexto/ContextoTema";

export default function InicioAdmin() {
  const { tema } = useTema();

  const usuarioNombre = localStorage.getItem("nombreEstudiante") || "Jhamir Walverdir Garcia Herrera";

  // Estadísticas clave del sistema
  const stats = [
    {
      titulo: "Facultades UNP",
      valor: "14",
      subtexto: "Facultades constituidas",
      icono: <Building2 className="w-5 h-5 text-purple-500" />,
      badge: "100% Operativo",
      badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    },
    {
      titulo: "Escuelas Profesionales",
      valor: "30",
      subtexto: "Ingeniería Informática activa",
      icono: <GraduationCap className="w-5 h-5 text-blue-500" />,
      badge: "Ing. Informática habilitada",
      badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    },
    {
      titulo: "Usuarios Registrados",
      valor: "1,248",
      subtexto: "Estudiantes y administradores",
      icono: <Users className="w-5 h-5 text-emerald-500" />,
      badge: "+12% este ciclo",
      badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    },
    {
      titulo: "Cursos Registrados",
      valor: "64",
      subtexto: "Malla curricular activa (Ing. Informática)",
      icono: <BookOpenCheck className="w-5 h-5 text-amber-500" />,
      badge: "Ciclos I a X",
      badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20"
    }
  ];

  // Acciones rápidas
  const accionesRapidas = [
    {
      titulo: "Registrar Nuevo Usuario",
      descripcion: "Crear un nuevo estudiante, docente o administrador con código de 10 dígitos.",
      ruta: "/admin/usuarios",
      icono: <UserPlus className="w-5 h-5 text-purple-500" />,
      btnTexto: "Añadir Usuario"
    },
    {
      titulo: "Gestionar Facultades y Escuelas",
      descripcion: "Habilitar carreras en desarrollo o modificar la estructura académica.",
      ruta: "/admin/facultades",
      icono: <Building2 className="w-5 h-5 text-blue-500" />,
      btnTexto: "Ver Facultades"
    },
    {
      titulo: "Editar Plan de Estudios",
      descripcion: "Agregar o modificar asignaturas, créditos y requisitos de la carrera.",
      ruta: "/admin/cursos",
      icono: <BookOpenCheck className="w-5 h-5 text-emerald-500" />,
      btnTexto: "Administrar Cursos"
    },
    {
      titulo: "Estado de Matrícula",
      descripcion: "Aperturar o cerrar procesos de matrícula y ajustar el semestre académico activo.",
      ruta: "/admin/configuracion",
      icono: <Calendar className="w-5 h-5 text-amber-500" />,
      btnTexto: "Ajustes Sistema"
    }
  ];

  // Logs recientes de actividad del sistema
  const actividadesRecientes = [
    {
      id: 1,
      evento: "Registro de estudiante verificado en Supabase",
      detalle: "Jhamir Walverdir Garcia Herrera (0512021015) ingresó con rol Administrador",
      tiempo: "Hace 2 minutos",
      tipo: "success"
    },
    {
      id: 2,
      evento: "Actualización de Malla Curricular",
      detalle: "Cursos del Ciclo V sincronizados con éxito para Ingeniería Informática",
      tiempo: "Hace 15 minutos",
      tipo: "info"
    },
    {
      id: 3,
      evento: "Apertura de Periodo Académico",
      detalle: "Semestre 2026-I marcado como Activo para Matrícula",
      tiempo: "Hace 1 hora",
      tipo: "warning"
    },
    {
      id: 4,
      evento: "Resguardo de Base de Datos",
      detalle: "Copia de respaldo en Supabase completada automáticamente",
      tiempo: "Hace 3 horas",
      tipo: "success"
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner de Bienvenida Ejecutivo */}
      <div className={`p-6 sm:p-8 rounded-3xl ${
        tema === 'dark'
          ? 'bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900 border-purple-500/20'
          : 'bg-gradient-to-r from-purple-600/10 via-indigo-600/5 to-slate-100 border-purple-200'
      } border relative overflow-hidden backdrop-blur-xl shadow-xl`}>
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="relative shrink-0 hidden sm:flex items-center justify-center">
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl pointer-events-none"></div>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-950/80 border border-purple-500/30 p-2 shadow-xl shadow-purple-500/20 ring-2 ring-indigo-400/20 flex items-center justify-center relative z-10 backdrop-blur-md hover:scale-105 transition-transform duration-300">
                <img src="/sigunp-logo.png" alt="SIGUNP Logo" className="w-full h-full object-contain drop-shadow-md" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> SIGUNP — Administrador Principal
              </div>
              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                ¡Bienvenido al Panel, {usuarioNombre.split(" ")[0]}!
              </h2>
              <p className={`text-sm ${tema === 'dark' ? 'text-slate-300' : 'text-slate-600'} max-w-2xl`}>
                Gestión centralizada del Sistema Integral de Gestión de la Universidad Nacional de Piura. Administra facultades, carreras, usuarios, mallas curriculares y periodos lectivos.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/admin/usuarios"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all duration-200 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" /> Nuevo Usuario
            </Link>
            <Link
              to="/admin/configuracion"
              className={`px-4 py-2.5 rounded-xl border font-semibold text-xs transition-all duration-200 ${
                tema === 'dark'
                  ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100 shadow-sm'
              }`}
            >
              Ajustes de Sistema
            </Link>
          </div>
        </div>
      </div>

      {/* Grid de Estadísticas / KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((st, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl ${
              tema === 'dark' ? 'app-surface-card' : 'app-surface-card app-surface-card-hover'
            } space-y-4`}
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-xl ${tema === 'dark' ? 'bg-slate-800/80' : 'bg-slate-100'}`}>
                {st.icono}
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${st.badgeColor}`}>
                {st.badge}
              </span>
            </div>
            <div>
              <div className={`text-2xl sm:text-3xl font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {st.valor}
              </div>
              <div className={`text-xs font-semibold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                {st.titulo}
              </div>
              <div className={`text-[11px] ${tema === 'dark' ? 'text-slate-500' : 'text-slate-600'} mt-1`}>
                {st.subtexto}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección Doble: Acciones Rápidas + Registro de Actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Columna Izquierda: Acciones de Gestión (2 columnas) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
              <Layers className="w-5 h-5 text-purple-500" /> Módulos de Administración Directa
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {accionesRapidas.map((acc, index) => (
              <div
                key={index}
                className={`p-5 rounded-2xl ${
                  tema === 'dark' ? 'app-surface-card' : 'app-surface-card app-surface-card-hover'
                } flex flex-col justify-between space-y-4 group`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${tema === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} group-hover:scale-110 transition-transform duration-200`}>
                      {acc.icono}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 transition-colors duration-200" />
                  </div>
                  <h4 className={`font-bold text-sm ${tema === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
                    {acc.titulo}
                  </h4>
                  <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} line-clamp-2`}>
                    {acc.descripcion}
                  </p>
                </div>
                <Link
                  to={acc.ruta}
                  className={`w-full text-center py-2 px-3 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                    tema === 'dark'
                      ? 'bg-slate-800/80 border-slate-700/80 text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                      : 'bg-slate-50 border-slate-200 text-purple-700 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  }`}
                >
                  {acc.btnTexto}
                </Link>
              </div>
            ))}
          </div>

          {/* Tarjeta de Estado del Servidor & Supabase */}
          <div className={`p-6 rounded-2xl ${
            tema === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          } border space-y-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-emerald-500" />
                <div>
                  <h4 className={`font-bold text-sm ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Integración Supabase Backend Cloud
                  </h4>
                  <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    https://wancdsnnloiqjdnnopeq.supabase.co
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Conectado
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold">
              <div className={`p-3 rounded-xl ${tema === 'dark' ? 'bg-slate-950/60' : 'bg-slate-50'} border ${tema === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                <span className={`text-[10px] block font-bold ${tema === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>TABLA ESTUDIANTES</span>
                <span className={tema === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Sincronizada</span>
              </div>
              <div className={`p-3 rounded-xl ${tema === 'dark' ? 'bg-slate-950/60' : 'bg-slate-50'} border ${tema === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                <span className={`text-[10px] block font-bold ${tema === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>CURSOS APROBADOS</span>
                <span className={tema === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Persistencia Activa</span>
              </div>
              <div className={`p-3 rounded-xl ${tema === 'dark' ? 'bg-slate-950/60' : 'bg-slate-50'} border ${tema === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                <span className={`text-[10px] block font-bold ${tema === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>AUTENTICACIÓN RLS</span>
                <span className={tema === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Superusuario Validado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Registro de Actividad y Log de Auditoría */}
        <div className="space-y-6">
          <h3 className={`text-lg font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
            <Activity className="w-5 h-5 text-indigo-500" /> Registro de Actividad
          </h3>

          <div className={`p-5 rounded-2xl ${
            tema === 'dark' ? 'app-surface-card' : 'app-surface-card'
          } space-y-4`}>
            <div className="space-y-3">
              {actividadesRecientes.map((act) => (
                <div
                  key={act.id}
                  className={`p-3.5 rounded-xl border transition-all duration-200 ${
                    tema === 'dark'
                      ? 'bg-slate-950/50 border-slate-800/80 hover:border-purple-500/40'
                      : 'bg-slate-50 border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>
                        {act.evento}
                      </span>
                    </div>
                  </div>
                  <p className={`text-[11px] mt-1 ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {act.detalle}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2 font-mono">
                    <Clock className="w-3 h-3" /> {act.tiempo}
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/admin/configuracion"
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                tema === 'dark'
                  ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Ver Auditoría Completa
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
