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
    <div className={`min-h-screen ${tema === 'dark' ? 'bg-[#060911] text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col md:flex-row font-sans selection:bg-blue-600 selection:text-white relative overflow-hidden transition-colors duration-200`}>
      
      {/* Background Glowing Ambient Orbs for Liquid Glass Refraction */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[550px] h-[550px] rounded-full bg-blue-600/15 dark:bg-blue-500/10 blur-[120px] animate-float-orb-1"></div>
        <div className="absolute -bottom-20 -right-10 w-[650px] h-[650px] rounded-full bg-indigo-600/15 dark:bg-indigo-500/12 blur-[140px] animate-float-orb-2"></div>
        <div className="absolute top-[35%] right-[25%] w-[450px] h-[450px] rounded-full bg-sky-500/10 dark:bg-purple-500/10 blur-[130px] animate-pulse-subtle"></div>
      </div>
      
      {/* Sidebar Lateral para Desktop */}
      <aside className="hidden md:flex md:w-72 liquid-glass border-r border-white/10 dark:border-white/10 border-slate-200/80 flex-col shrink-0 relative z-30 transition-colors duration-200">
        
        {/* Header del Sidebar */}
        <div className={`p-5 border-b ${tema === 'dark' ? 'border-white/10' : 'border-slate-200/80'} space-y-4`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl ${tema === 'dark' ? 'bg-slate-950 border-blue-500/40' : 'bg-white border-blue-500/30'} p-0.5 border flex items-center justify-center shadow-lg shrink-0 overflow-hidden hover-pop`}>
              <img src="/sigunp-logo.png" alt="SIGUNP Logo" style={{ clipPath: 'circle(49% at 50% 50%)' }} className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className={`text-base font-black tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'} leading-none`}>SIGUNP</h2>
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-500/15 text-blue-500 dark:text-blue-400 border border-blue-500/25 shadow-sm">
                  v2.0 PRO
                </span>
              </div>
              <p className={`text-[11px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium mt-0.5`}>Gestión Académica UNP</p>
            </div>
          </div>

          {/* User Profile Card */}
          <Link
            to="/estudiante/perfil"
            title="Editar Mi Perfil y Cambiar Contraseña"
            className={`p-3 rounded-2xl ${
              tema === 'dark' ? 'bg-[#0a1020]/75 border-white/10 hover:border-blue-500/50' : 'bg-white/80 border-slate-200/90 hover:border-blue-500/50'
            } border flex items-center justify-between transition-all duration-300 group cursor-pointer liquid-btn glare-hover shadow-sm`}
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className={`w-8.5 h-8.5 rounded-xl ${tema === 'dark' ? 'bg-slate-800/90 text-slate-200' : 'bg-slate-100 text-slate-800'} border border-slate-700/50 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm`}>
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
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        {/* Links de Navegación Lateral */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          <div className={`px-3 mb-2 text-[10px] font-black ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider flex items-center space-x-1.5`}>
            <Compass className="w-3 h-3 text-blue-500" />
            <span>Módulos Académicos</span>
          </div>

          {menuItems.map((item) => {
            const estaActivo = localizacion.pathname === item.ruta;
            return (
              <Link
                key={item.ruta}
                to={item.ruta}
                className={`group flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-300 cursor-pointer hover-expand-item ${
                  estaActivo
                    ? "liquid-btn-primary text-white font-black shadow-xl shadow-blue-500/30 scale-[1.03] border-blue-400/50"
                    : tema === 'dark'
                    ? "text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/15 border border-transparent shadow-sm"
                    : "text-slate-700 hover:bg-white/90 hover:text-slate-900 hover:border-slate-300 border border-transparent shadow-sm"
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <span className={`${estaActivo ? "text-white scale-110" : "text-slate-400 group-hover:text-blue-500 group-hover:scale-125"} transition-all duration-300`}>
                    {item.icono}
                  </span>
                  <span className="tracking-tight">{item.etiqueta}</span>
                </div>

                <ChevronRight className={`w-3.5 h-3.5 transition-all duration-300 ${
                  estaActivo
                    ? "text-white opacity-100 translate-x-0.5"
                    : "text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-blue-500"
                }`} />
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className={`p-4 border-t ${tema === 'dark' ? 'border-white/10 bg-[#070b16]/75' : 'border-slate-200 bg-slate-50/80'} space-y-2`}>
          <button
            type="button"
            onClick={alternarTema}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer liquid-btn ${
              tema === 'dark'
                ? "bg-slate-800/70 text-slate-200 hover:bg-slate-800 border border-white/10"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              {tema === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
              <span>{tema === 'dark' ? "Modo Claro" : "Modo Oscuro"}</span>
            </div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-500 dark:text-blue-400 border border-blue-500/20">
              {tema === 'dark' ? "Oscuro" : "Claro"}
            </span>
          </button>

          {userRole === "Administrador" && (
            <button
              type="button"
              onClick={() => navegar("/admin/inicio")}
              className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-purple-400 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 transition-all cursor-pointer liquid-btn shadow-sm"
            >
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-purple-400" />
              <span>Panel Administrador</span>
            </button>
          )}

          <button
            type="button"
            onClick={manejarReconfigurar}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium ${
              tema === 'dark' ? 'text-slate-400 hover:bg-slate-800/60 hover:text-amber-400' : 'text-slate-600 hover:bg-slate-100 hover:text-amber-600'
            } transition-all cursor-pointer liquid-btn`}
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0 text-amber-500" />
            <span>Reconfigurar Malla</span>
          </button>
          
          <button
            type="button"
            onClick={manejarCerrarSesion}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-500 hover:bg-rose-500/15 transition-all cursor-pointer liquid-btn"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0 text-rose-500" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Header en Móvil - Liquid Glass Estilo iPhone */}
      <header className={`md:hidden w-full iphone-glass-header px-4 py-3 flex items-center justify-between sticky top-0 z-50 transition-colors`}>
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 rounded-xl ${tema === 'dark' ? 'bg-slate-950 border-blue-500/40' : 'bg-white border-blue-500/30'} p-0.5 border flex items-center justify-center shadow-md shrink-0 overflow-hidden hover-pop`}>
            <img src="/sigunp-logo.png" alt="SIGUNP" style={{ clipPath: 'circle(49% at 50% 50%)' }} className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className={`text-xs font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight leading-none`}>SIGUNP</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-subtle"></span>
            </div>
            <span className="text-[10px] text-blue-500 dark:text-blue-400 font-extrabold block mt-0.5 tracking-wide">{itemActivo.etiqueta}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <Link
            to="/estudiante/perfil"
            title="Mi Perfil"
            className="p-2 rounded-xl text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 active:scale-90 border border-blue-500/20 transition-all cursor-pointer hover-pop"
          >
            <User className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={alternarTema}
            className={`p-2 rounded-xl border transition-all cursor-pointer hover-pop active:scale-90 ${
              tema === 'dark' ? "bg-slate-800/80 border-white/10 text-amber-400 shadow-sm" : "bg-white border-slate-200 text-indigo-600 shadow-sm"
            }`}
            title="Alternar Modo Claro / Oscuro"
          >
            {tema === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={manejarReconfigurar}
            title="Reconfigurar Malla"
            className="p-2 rounded-xl text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 active:scale-90 border border-amber-500/20 transition-all cursor-pointer hover-pop"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button
            type="button"
            onClick={manejarCerrarSesion}
            title="Cerrar Sesión"
            className="p-2 rounded-xl text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 active:scale-90 border border-rose-500/20 transition-all cursor-pointer hover-pop"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className={`flex-1 flex flex-col min-w-0 pb-28 md:pb-0 overflow-y-auto ${tema === 'dark' ? 'bg-transparent' : 'bg-transparent'} relative z-10 transition-colors`}>
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
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer hover-pop ${
                tema === 'dark' ? 'bg-slate-800/60 border-white/10 text-slate-200 hover:bg-slate-800 hover:border-blue-500/40' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm hover:border-blue-500/40'
              }`}
            >
              <User className="w-3.5 h-3.5 text-blue-500" />
              <span>Mi Perfil</span>
            </Link>

            <button
              type="button"
              onClick={alternarTema}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 hover-pop ${
                tema === 'dark'
                  ? "bg-slate-800/60 border-white/10 text-amber-300 hover:bg-slate-800"
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

            <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-xs font-bold flex items-center space-x-1.5 shadow-sm">
              <span>Universidad Nacional de Piura</span>
            </div>
          </div>
        </header>

        <div className="p-3.5 sm:p-6 md:p-8 max-w-7xl w-full mx-auto animate-fadeIn overflow-x-hidden">
          <Outlet />
        </div>
      </main>

      {/* Floating Bottom Dock Móvil - Liquid Glass Estilo iPhone / iOS 18 (WhatsApp Floating Pill) */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 iphone-glass-dock rounded-[32px] p-2 z-50 flex flex-col items-center justify-between shadow-2xl transition-all">
        <div className="w-full flex items-center justify-around space-x-1">
          {menuItems.map((item) => {
            const estaActivo = localizacion.pathname === item.ruta;
            const esPerfil = item.ruta === "/estudiante/perfil";

            return (
              <Link
                key={item.ruta}
                to={item.ruta}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-[24px] iphone-tab-item flex-1 min-w-0 transition-all duration-300 relative ${
                  estaActivo
                    ? "iphone-active-pill font-extrabold text-white scale-[1.02]"
                    : tema === 'dark'
                    ? "text-slate-400 hover:text-slate-100"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {/* Badge para el elemento activo (ej. notificaciones o estado activo) */}
                {estaActivo && !esPerfil && (
                  <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle shadow-sm"></span>
                )}

                {/* Avatar para pestaña Perfil estilo la imagen del usuario */}
                {esPerfil ? (
                  <div className="relative shrink-0 mb-0.5">
                    <div className={`w-6 h-6 rounded-full ${estaActivo ? 'ring-2 ring-blue-400' : 'border border-slate-500/40'} bg-slate-800 flex items-center justify-center text-[10px] font-black text-white overflow-hidden`}>
                      {localStorage.getItem("nombreEstudiante") ? localStorage.getItem("nombreEstudiante").charAt(0) : "E"}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900"></span>
                  </div>
                ) : (
                  <div className={`shrink-0 transition-transform duration-300 ${estaActivo ? "scale-110 text-white" : "scale-100 opacity-80"}`}>
                    {React.cloneElement(item.icono, { className: "w-5 h-5" })}
                  </div>
                )}

                <span className={`text-[10px] font-bold tracking-tight truncate w-full text-center mt-0.5 ${estaActivo ? "text-white font-black" : ""}`}>
                  {item.etiquetaCorta}
                </span>
              </Link>
            );
          })}
        </div>
        {/* iPhone Home Bar Line */}
        <div className="iphone-home-bar" />
      </nav>

    </div>
  );
}

