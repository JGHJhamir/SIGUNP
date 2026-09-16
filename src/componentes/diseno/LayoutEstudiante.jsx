import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  GitFork,
  Sliders,
  BookOpen,
  GraduationCap,
  LogOut,
  RotateCcw,
  Sparkles,
  ChevronRight,
  UserCheck,
  User,
  ShieldAlert,
  Compass,
  Sun,
  Moon
} from "lucide-react";
import { useTema } from "../../contexto/ContextoTema";

export default function LayoutEstudiante() {
  const localizacion = useLocation();
  const navegar = useNavigate();
  const { tema, alternarTema } = useTema();

  const userRole = localStorage.getItem("userRole") || "Estudiante";

  const menuItems = [
    {
      ruta: "/estudiante/inicio",
      etiqueta: "Inicio",
      etiquetaCorta: "Inicio",
      descripcion: "Resumen y notificaciones",
      icono: <LayoutDashboard className="w-4 h-4" />
    },
    {
      ruta: "/estudiante/horario",
      etiqueta: "Horario",
      etiquetaCorta: "Horario",
      descripcion: "Grilla semanal de clases",
      icono: <Calendar className="w-4 h-4" />
    },
    {
      ruta: "/estudiante/malla",
      etiqueta: "Malla Curricular",
      etiquetaCorta: "Malla",
      descripcion: "Plan de estudios y requisitos",
      icono: <GitFork className="w-4 h-4" />
    },
    {
      ruta: "/estudiante/simulador",
      etiqueta: "Simulador",
      etiquetaCorta: "Simulador",
      descripcion: "Planificación de ciclos",
      icono: <Sliders className="w-4 h-4" />
    },
    {
      ruta: "/estudiante/matricula",
      etiqueta: "Matrícula",
      etiquetaCorta: "Matrícula",
      descripcion: "Inscripción de grupos",
      icono: <GraduationCap className="w-4 h-4" />
    },
    {
      ruta: "/estudiante/perfil",
      etiqueta: "Mi Perfil",
      etiquetaCorta: "Perfil",
      descripcion: "Editar datos y contraseña",
      icono: <User className="w-4 h-4" />
    }
  ];

  const manejarCerrarSesion = () => {
    localStorage.clear();
    navegar("/");
  };

  const manejarReconfigurar = () => {
    navegar("/configuracion-inicial");
  };

  const itemActivo = menuItems.find((item) => item.ruta === localizacion.pathname) || menuItems[0];

  return (
    <div className={`min-h-screen ${tema === 'dark' ? 'bg-[#080c14] text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col md:flex-row font-sans selection:bg-blue-600 selection:text-white relative overflow-hidden transition-colors duration-200`}>
      
      {/* Sidebar Lateral para Desktop */}
      <aside className="hidden md:flex md:w-72 liquid-glass border-r border-slate-800/60 flex-col shrink-0 relative z-30 transition-colors duration-200">
        
        {/* Header del Sidebar */}
        <div className={`p-5 border-b ${tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'} space-y-4`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 p-0.5 border border-slate-700/80 flex items-center justify-center shadow-sm shrink-0 overflow-hidden">
              <img src="/sigunp-logo.png" alt="SIGUNP Logo" style={{ clipPath: 'circle(49% at 50% 50%)' }} className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className={`text-base font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'} leading-none`}>SIGUNP</h2>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20">
                  v2.0
                </span>
              </div>
              <p className={`text-[11px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium mt-0.5`}>Gestión Académica UNP</p>
            </div>
          </div>

          {/* User Profile Card */}
          <Link
            to="/estudiante/perfil"
            title="Editar Mi Perfil y Cambiar Contraseña"
            className={`p-3 rounded-xl ${
              tema === 'dark' ? 'bg-[#090e1a]/80 border-slate-800/80 hover:border-blue-500/40' : 'bg-slate-50/80 border-slate-200 hover:border-blue-500/40'
            } border flex items-center justify-between transition-all duration-200 group cursor-pointer liquid-btn`}
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className={`w-8 h-8 rounded-lg ${tema === 'dark' ? 'bg-slate-800/80 text-slate-200' : 'bg-white text-slate-800'} border border-slate-700/50 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm`}>
                {userRole === "Administrador" ? <ShieldAlert className="w-4 h-4 text-amber-500" /> : <UserCheck className="w-4 h-4 text-blue-500" />}
              </div>
              <div className="truncate">
                <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-100' : 'text-slate-800'} truncate group-hover:text-blue-500 transition-colors`}>
                  {localStorage.getItem("nombreEstudiante") ? localStorage.getItem("nombreEstudiante").split(" ")[0] : "Estudiante"}
                </div>
                <div className={`text-[10px] font-medium ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} truncate flex items-center space-x-1.5 mt-0.5`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-subtle"></span>
                  <span>Mi Perfil (Editar)</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        {/* Links de Navegación Lateral */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className={`px-3 mb-2 text-[10px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider flex items-center space-x-1.5`}>
            <Compass className="w-3 h-3 text-blue-500" />
            <span>Módulos Académicos</span>
          </div>

          {menuItems.map((item) => {
            const estaActivo = localizacion.pathname === item.ruta;
            return (
              <Link
                key={item.ruta}
                to={item.ruta}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer liquid-btn ${
                  estaActivo
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 font-bold"
                    : tema === 'dark'
                    ? "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`${estaActivo ? "text-white" : "text-slate-400 group-hover:text-blue-500"} transition-colors`}>
                    {item.icono}
                  </span>
                  <span>{item.etiqueta}</span>
                </div>

                {estaActivo && (
                  <ChevronRight className="w-3.5 h-3.5 text-white/80" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className={`p-4 border-t ${tema === 'dark' ? 'border-slate-800/80 bg-[#090e1a]/80' : 'border-slate-200 bg-slate-50/80'} space-y-1.5`}>
          <button
            type="button"
            onClick={alternarTema}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer liquid-btn ${
              tema === 'dark'
                ? "bg-slate-800/70 text-slate-200 hover:bg-slate-800 border border-slate-700/60"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              {tema === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
              <span>{tema === 'dark' ? "Modo Claro" : "Modo Oscuro"}</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 dark:text-blue-400">
              {tema === 'dark' ? "Oscuro" : "Claro"}
            </span>
          </button>

          {userRole === "Administrador" && (
            <button
              type="button"
              onClick={() => navegar("/admin/inicio")}
              className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-all cursor-pointer liquid-btn"
            >
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-purple-500" />
              <span>Panel Administrador</span>
            </button>
          )}

          <button
            type="button"
            onClick={manejarReconfigurar}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium ${
              tema === 'dark' ? 'text-slate-400 hover:bg-slate-800/60 hover:text-amber-400' : 'text-slate-600 hover:bg-slate-100 hover:text-amber-600'
            } transition-all cursor-pointer liquid-btn`}
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0 text-amber-500" />
            <span>Reconfigurar Malla</span>
          </button>
          
          <button
            type="button"
            onClick={manejarCerrarSesion}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer liquid-btn"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0 text-rose-500" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Header en Móvil */}
      <header className={`md:hidden w-full liquid-glass border-b px-3.5 py-2.5 flex items-center justify-between sticky top-0 z-50 transition-colors`}>
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900 p-0.5 border border-slate-700 flex items-center justify-center shadow-sm shrink-0 overflow-hidden">
            <img src="/sigunp-logo.png" alt="SIGUNP" style={{ clipPath: 'circle(49% at 50% 50%)' }} className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <span className={`text-xs font-extrabold ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight block leading-none`}>SIGUNP</span>
            <span className="text-[10px] text-blue-500 font-bold block mt-0.5">{itemActivo.etiqueta}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <Link
            to="/estudiante/perfil"
            title="Mi Perfil"
            className="p-1.5 rounded-lg text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 transition-all cursor-pointer liquid-btn"
          >
            <User className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={alternarTema}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer liquid-btn ${
              tema === 'dark' ? "bg-slate-800/80 border-slate-700 text-amber-400" : "bg-slate-100 border-slate-200 text-indigo-600"
            }`}
            title="Alternar Modo Claro / Oscuro"
          >
            {tema === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={manejarReconfigurar}
            title="Reconfigurar Malla"
            className="p-1.5 rounded-lg text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 transition-all cursor-pointer liquid-btn"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button
            type="button"
            onClick={manejarCerrarSesion}
            title="Cerrar Sesión"
            className="p-1.5 rounded-lg text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 transition-all cursor-pointer liquid-btn"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className={`flex-1 flex flex-col min-w-0 pb-20 md:pb-0 overflow-y-auto ${tema === 'dark' ? 'bg-[#080c14]' : 'bg-slate-50'} relative z-10 transition-colors`}>
        {/* Top App Bar Header Desktop */}
        <header className="hidden md:flex items-center justify-between px-8 py-3.5 liquid-glass border-b sticky top-0 z-20 transition-colors">
          <div className="flex items-center space-x-2 text-xs">
            <span className={`${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Estudiante</span>
            <span className={tema === 'dark' ? 'text-slate-700' : 'text-slate-300'}>/</span>
            <span className={`font-bold ${tema === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center space-x-2`}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse-subtle"></span>
              <span>{itemActivo.etiqueta}</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/estudiante/perfil"
              title="Ver y Editar Mi Perfil"
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer liquid-btn ${
                tema === 'dark' ? 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
            >
              <User className="w-3.5 h-3.5 text-blue-500" />
              <span>Mi Perfil</span>
            </Link>

            <button
              type="button"
              onClick={alternarTema}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 liquid-btn ${
                tema === 'dark'
                  ? "bg-slate-800/60 border-slate-700 text-amber-300 hover:bg-slate-800"
                  : "bg-white border-slate-200 text-amber-600 hover:bg-slate-100 shadow-sm"
              }`}
            >
              {tema === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Modo Oscuro</span>
                </>
              )}
            </button>

            <div className="px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-xs font-bold flex items-center space-x-1.5">
              <span>Universidad Nacional de Piura</span>
            </div>
          </div>
        </header>

        <div className="p-3.5 sm:p-6 md:p-8 max-w-7xl w-full mx-auto animate-fadeIn overflow-x-hidden">
          <Outlet />
        </div>
      </main>

      {/* Bottom Bar Móvil */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 liquid-glass border-t flex items-center justify-around py-1.5 z-50 px-1 shadow-lg transition-colors">
        {menuItems.map((item) => {
          const estaActivo = localizacion.pathname === item.ruta;
          return (
            <Link
              key={item.ruta}
              to={item.ruta}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg transition-all flex-1 min-w-0 liquid-btn ${
                estaActivo
                  ? "text-blue-500 dark:text-blue-400 font-bold"
                  : tema === 'dark'
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <div className={`shrink-0 ${estaActivo ? "text-blue-500 dark:text-blue-400" : ""}`}>{item.icono}</div>
              <span className="text-[10px] font-extrabold mt-0.5 tracking-tight truncate w-full text-center">
                {item.etiquetaCorta}
              </span>
            </Link>
          );
        })}
      </nav>

    </div>
  );
}

