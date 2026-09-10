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
      descripcion: "Resumen y notificaciones",
      icono: <LayoutDashboard className="w-4 h-4" />
    },
    {
      ruta: "/estudiante/horario",
      etiqueta: "Horario",
      descripcion: "Grilla semanal de clases",
      icono: <Calendar className="w-4 h-4" />
    },
    {
      ruta: "/estudiante/malla",
      etiqueta: "Malla Curricular",
      descripcion: "Plan de estudios y requisitos",
      icono: <GitFork className="w-4 h-4" />
    },
    {
      ruta: "/estudiante/simulador",
      etiqueta: "Simulador",
      descripcion: "Planificación de ciclos",
      icono: <Sliders className="w-4 h-4" />
    },
    {
      ruta: "/estudiante/matricula",
      etiqueta: "Matrícula",
      descripcion: "Inscripción de grupos",
      icono: <GraduationCap className="w-4 h-4" />
    },
    {
      ruta: "/estudiante/perfil",
      etiqueta: "Mi Perfil",
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
    <div className={`min-h-screen ${tema === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col md:flex-row font-sans selection:bg-blue-600 selection:text-white relative overflow-hidden transition-colors duration-300`}>
      
      {/* Background ambient glows */}
      <div className={`fixed top-0 left-0 w-[500px] h-[500px] ${tema === 'dark' ? 'bg-blue-600/10' : 'bg-blue-500/10'} rounded-full blur-[140px] pointer-events-none`}></div>
      <div className={`fixed bottom-0 right-0 w-[500px] h-[500px] ${tema === 'dark' ? 'bg-purple-600/10' : 'bg-purple-500/10'} rounded-full blur-[140px] pointer-events-none`}></div>

      {/* Sidebar Lateral para Desktop */}
      <aside className={`hidden md:flex md:w-72 ${tema === 'dark' ? 'bg-slate-900/80 border-slate-800/80' : 'bg-white/90 border-slate-200'} backdrop-blur-2xl border-r flex-col shrink-0 relative z-30 transition-colors duration-300`}>
        
        {/* Header del Sidebar */}
        <div className={`p-6 border-b ${tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'} space-y-4`}>
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-950/80 p-0.5 border border-sky-400/40 flex items-center justify-center shadow-lg shadow-sky-600/20 ring-2 ring-amber-400/20 shrink-0 overflow-hidden">
              <img src="/sigunp-logo.png" alt="SIGUNP Logo" style={{ clipPath: 'circle(49% at 50% 50%)' }} className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className={`text-lg font-black tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'} leading-none`}>SIGUNP</h2>
                <span className="px-1.5 py-0.5 rounded-md text-[9px] font-extrabold bg-sky-500/20 text-sky-500 dark:text-sky-400 border border-sky-500/30">
                  v2.0
                </span>
              </div>
              <p className={`text-[11px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium mt-1`}>Sistema Integral de Gestión</p>
            </div>
          </div>

          {/* User Profile Card (Clickable to /estudiante/perfil) */}
          <Link
            to="/estudiante/perfil"
            title="Editar Mi Perfil y Cambiar Contraseña"
            className={`p-3 rounded-2xl ${
              tema === 'dark' ? 'bg-slate-950/70 border-slate-800/90 hover:border-blue-500/50' : 'bg-slate-100 border-slate-200 hover:border-blue-400'
            } border flex items-center justify-between shadow-inner transition-all group cursor-pointer`}
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className={`w-9 h-9 rounded-xl ${tema === 'dark' ? 'bg-slate-800 border-slate-700/80 text-slate-200' : 'bg-white border-slate-200 text-slate-800'} border flex items-center justify-center font-bold text-xs shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                {userRole === "Administrador" ? <ShieldAlert className="w-4 h-4 text-amber-500" /> : <UserCheck className="w-4 h-4 text-blue-500" />}
              </div>
              <div className="truncate">
                <div className={`text-xs font-bold ${tema === 'dark' ? 'text-slate-100' : 'text-slate-800'} truncate group-hover:text-blue-400 transition-colors`}>
                  {localStorage.getItem("nombreEstudiante") ? localStorage.getItem("nombreEstudiante").split(" ")[0] : "Estudiante"}
                </div>
                <div className={`text-[10px] font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} truncate flex items-center space-x-1.5 mt-0.5`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Mi Perfil (Ver/Editar)</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
          </Link>
        </div>

        {/* Links de Navegación Lateral */}
        <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
          <div className={`px-3 mb-2 text-[10px] font-bold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-widest flex items-center space-x-1.5`}>
            <Compass className="w-3 h-3 text-blue-500" />
            <span>Módulos de Alumno</span>
          </div>

          {menuItems.map((item) => {
            const estaActivo = localizacion.pathname === item.ruta;
            return (
              <Link
                key={item.ruta}
                to={item.ruta}
                className={`group relative flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  estaActivo
                    ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-600/30 font-extrabold"
                    : tema === 'dark'
                    ? "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`transition-transform duration-200 ${estaActivo ? "scale-110 text-white" : "group-hover:scale-110 group-hover:text-blue-500"}`}>
                    {item.icono}
                  </span>
                  <span>{item.etiqueta}</span>
                </div>

                {estaActivo && (
                  <ChevronRight className="w-4 h-4 text-white/90" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className={`p-4 border-t ${tema === 'dark' ? 'border-slate-800/80 bg-slate-900/60' : 'border-slate-200 bg-slate-50/80'} space-y-1.5`}>
          <button
            type="button"
            onClick={alternarTema}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              tema === 'dark'
                ? "bg-slate-800/70 text-amber-300 hover:bg-slate-800 border border-slate-700/60"
                : "bg-slate-200/80 text-amber-700 hover:bg-slate-200 border border-slate-300"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              {tema === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              <span>{tema === 'dark' ? "Modo Claro" : "Modo Oscuro"}</span>
            </div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 dark:text-blue-400">
              {tema === 'dark' ? "Oscuro" : "Claro"}
            </span>
          </button>

          {userRole === "Administrador" && (
            <button
              type="button"
              onClick={() => navegar("/admin/inicio")}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-all duration-200 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 shrink-0 text-purple-500" />
              <span>Panel Administrador</span>
            </button>
          )}

          <button
            type="button"
            onClick={manejarReconfigurar}
            className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs font-semibold ${
              tema === 'dark' ? 'text-slate-400 hover:bg-slate-800 hover:text-amber-400' : 'text-slate-600 hover:bg-slate-100 hover:text-amber-600'
            } transition-all duration-200 cursor-pointer`}
          >
            <RotateCcw className="w-4 h-4 shrink-0 text-amber-500" />
            <span>Reconfigurar Malla</span>
          </button>
          
          <button
            type="button"
            onClick={manejarCerrarSesion}
            className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0 text-rose-500" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Header en Móvil */}
      <header className={`md:hidden w-full ${tema === 'dark' ? 'bg-slate-900/90 border-slate-800/80' : 'bg-white/90 border-slate-200'} backdrop-blur-xl border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950/80 p-0.5 border border-sky-400/40 flex items-center justify-center shadow-md shrink-0 overflow-hidden">
            <img src="/sigunp-logo.png" alt="SIGUNP" style={{ clipPath: 'circle(49% at 50% 50%)' }} className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <span className={`text-xs font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight block`}>SIGUNP</span>
            <span className="text-[10px] text-blue-500 font-bold block">{itemActivo.etiqueta}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/estudiante/perfil"
            title="Mi Perfil y Contraseña"
            className="p-2 rounded-xl text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 transition-all cursor-pointer"
          >
            <User className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={alternarTema}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              tema === 'dark' ? "bg-amber-400/10 border-amber-400/20 text-amber-400" : "bg-indigo-50 border-indigo-200 text-indigo-600"
            }`}
            title="Alternar Modo Claro / Oscuro"
          >
            {tema === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={manejarReconfigurar}
            title="Reconfigurar Malla"
            className="p-2 rounded-xl text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button
            type="button"
            onClick={manejarCerrarSesion}
            title="Cerrar Sesión"
            className="p-2 rounded-xl text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className={`flex-1 flex flex-col min-w-0 pb-24 md:pb-0 overflow-y-auto ${tema === 'dark' ? 'bg-slate-950' : 'bg-slate-50'} relative z-10 transition-colors duration-300`}>
        {/* Top App Bar Header Desktop */}
        <header className={`hidden md:flex items-center justify-between px-8 py-4 ${
          tema === 'dark' ? 'bg-slate-900/40 border-slate-800/60' : 'bg-white/60 border-slate-200'
        } backdrop-blur-xl border-b sticky top-0 z-20 transition-colors duration-300`}>
          <div className="flex items-center space-x-3">
            <span className={`text-xs ${tema === 'dark' ? 'text-slate-500' : 'text-slate-400'} font-medium`}>Estudiante</span>
            <span className={tema === 'dark' ? 'text-slate-600' : 'text-slate-300'}>/</span>
            <span className={`text-xs font-bold ${tema === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center space-x-2`}>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span>{itemActivo.etiqueta}</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/estudiante/perfil"
              title="Ver y Editar Mi Perfil"
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 shadow-sm"
            >
              <User className="w-4 h-4 text-blue-400" />
              <span>Mi Perfil</span>
            </Link>
            <button
              type="button"
              onClick={alternarTema}
              className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer flex items-center space-x-2 ${
                tema === 'dark'
                  ? "bg-slate-800/80 border-slate-700 text-amber-300 hover:bg-slate-800 shadow-sm"
                  : "bg-white border-slate-200 text-amber-600 hover:bg-slate-100 shadow-sm"
              }`}
            >
              {tema === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>Modo Oscuro</span>
                </>
              )}
            </button>

            <div className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-xs font-bold flex items-center space-x-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Universidad Nacional de Piura</span>
            </div>
          </div>
        </header>

        <div className="p-3 sm:p-4 md:p-8 max-w-7xl w-full mx-auto animate-fadeIn overflow-x-hidden">
          <Outlet />
        </div>
      </main>

      {/* Bottom Bar Móvil */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 ${
        tema === 'dark' ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
      } backdrop-blur-2xl border-t flex items-center justify-between py-2 z-50 px-1 shadow-2xl transition-colors duration-300 overflow-x-auto no-scrollbar`}>
        {menuItems.map((item) => {
          const estaActivo = localizacion.pathname === item.ruta;
          return (
            <Link
              key={item.ruta}
              to={item.ruta}
              className={`flex flex-col items-center justify-center px-1 sm:px-2.5 py-1 rounded-xl transition-all duration-200 shrink-0 min-w-0 flex-1 ${
                estaActivo
                  ? "text-blue-500 dark:text-blue-400 scale-105 font-bold"
                  : tema === 'dark'
                  ? "text-slate-400 hover:text-slate-200"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <div className={`shrink-0 ${estaActivo ? "text-blue-500 dark:text-blue-400" : ""}`}>{item.icono}</div>
              <span className="text-[8px] sm:text-[9px] font-bold mt-0.5 tracking-tight truncate max-w-[48px] sm:max-w-[64px] text-center">
                {item.etiqueta}
              </span>
            </Link>
          );
        })}
      </nav>

    </div>
  );
}
