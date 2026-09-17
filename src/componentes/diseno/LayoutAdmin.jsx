import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  BookOpenCheck,
  Settings,
  LogOut,
  Sun,
  Moon,
  ShieldCheck,
  ChevronRight,
  GraduationCap,
  Search,
  Menu,
  X,
  ExternalLink
} from "lucide-react";
import { useTema } from "../../contexto/ContextoTema";

export default function LayoutAdmin() {
  const localizacion = useLocation();
  const navegar = useNavigate();
  const { tema, alternarTema } = useTema();
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  const nombreUsuario = localStorage.getItem("nombreEstudiante") || "Jhamir Walverdir Garcia Herrera";
  const codigoUsuario = localStorage.getItem("codigoUniversitario") || "0512021015";

  const menuItems = [
    {
      ruta: "/admin/inicio",
      etiqueta: "Resumen General",
      descripcion: "Dashboard ejecutivo y estadísticas",
      icono: <LayoutDashboard className="w-4 h-4" />
    },
    {
      ruta: "/admin/facultades",
      etiqueta: "Facultades y Escuelas",
      descripcion: "Gestión de la estructura UNP",
      icono: <Building2 className="w-4 h-4" />
    },
    {
      ruta: "/admin/usuarios",
      etiqueta: "Usuarios del Sistema",
      descripcion: "Estudiantes, docentes y administradores",
      icono: <Users className="w-4 h-4" />
    },
    {
      ruta: "/admin/cursos",
      etiqueta: "Cursos y Mallas",
      descripcion: "Planes de estudio y prerrequisitos",
      icono: <BookOpenCheck className="w-4 h-4" />
    },
    {
      ruta: "/admin/configuracion",
      etiqueta: "Configuración",
      descripcion: "Periodos lectivos y matrícula",
      icono: <Settings className="w-4 h-4" />
    }
  ];

  const manejarCerrarSesion = () => {
    localStorage.clear();
    navegar("/");
  };

  const irAVistaEstudiante = () => {
    navegar("/estudiante/inicio");
  };

  const itemActivo = menuItems.find((item) => item.ruta === localizacion.pathname) || menuItems[0];

  return (
    <div className={`min-h-screen ${tema === 'dark' ? 'bg-[#060911] text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col md:flex-row font-sans selection:bg-purple-600 selection:text-white relative overflow-hidden transition-colors duration-200`}>
      
      {/* Background Glowing Ambient Orbs for Liquid Glass Refraction */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[550px] h-[550px] rounded-full bg-purple-600/15 dark:bg-purple-500/12 blur-[130px] animate-float-orb-1"></div>
        <div className="absolute -bottom-20 -right-10 w-[650px] h-[650px] rounded-full bg-indigo-600/15 dark:bg-blue-500/10 blur-[140px] animate-float-orb-2"></div>
        <div className="absolute top-[40%] right-[30%] w-[450px] h-[450px] rounded-full bg-fuchsia-500/10 dark:bg-purple-500/10 blur-[130px] animate-pulse-subtle"></div>
      </div>

      {/* Sidebar Lateral para Desktop */}
      <aside className="hidden md:flex md:w-72 liquid-glass border-r border-white/10 dark:border-white/10 border-slate-200/80 flex-col shrink-0 relative z-30 transition-colors duration-200">
        
        {/* Header del Sidebar */}
        <div className={`p-5 border-b ${tema === 'dark' ? 'border-white/10' : 'border-slate-200/80'} space-y-4`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 p-0.5 border border-purple-500/40 flex items-center justify-center shadow-lg shrink-0 overflow-hidden hover-pop">
              <img src="/sigunp-logo.png" alt="SIGUNP Logo" style={{ clipPath: 'circle(49% at 50% 50%)' }} className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`font-black tracking-tight text-base ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  SIGUNP
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-purple-500/15 text-purple-400 border border-purple-500/30 uppercase tracking-wider shadow-sm">
                  Admin
                </span>
              </div>
              <p className={`text-[11px] ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium mt-0.5`}>
                Universidad Nacional de Piura
              </p>
            </div>
          </div>

          {/* Tarjeta de Estado del Administrador */}
          <div className={`p-3 rounded-2xl ${tema === 'dark' ? 'bg-[#0a1020]/75 border-white/10' : 'bg-white/80 border-slate-200/90'} border space-y-1.5 liquid-btn glare-hover shadow-sm`}>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-extrabold uppercase tracking-wider ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} flex items-center gap-1.5`}>
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Superusuario
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                Online
              </span>
            </div>
            <p className={`text-xs font-bold truncate ${tema === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
              {nombreUsuario}
            </p>
            <p className={`text-[11px] font-mono ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Cód: {codigoUsuario}
            </p>
          </div>
        </div>

        {/* Links del Menú Lateral */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          <div className={`px-3 py-1 text-[10px] font-black tracking-wider uppercase ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Módulos Principales
          </div>
          {menuItems.map((item) => {
            const estaActivo = localizacion.pathname === item.ruta;
            return (
              <Link
                key={item.ruta}
                to={item.ruta}
                className={`group flex items-center space-x-3.5 px-4 py-3 rounded-2xl transition-all duration-300 text-xs font-semibold relative hover-expand-item ${
                  estaActivo
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold shadow-xl shadow-purple-500/30 scale-[1.03] border border-purple-400/50"
                    : tema === 'dark'
                      ? "text-slate-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/15 shadow-sm"
                      : "text-slate-700 hover:text-slate-900 hover:bg-white/90 border border-transparent hover:border-slate-300 shadow-sm"
                }`}
              >
                <div className={`${estaActivo ? "text-white scale-110" : "text-slate-400 group-hover:text-purple-400 group-hover:scale-125"} transition-all duration-300`}>
                  {item.icono}
                </div>
                <div className="flex-1 truncate">
                  <div className="truncate tracking-tight font-bold">{item.etiqueta}</div>
                  <div className={`text-[10px] font-normal truncate ${estaActivo ? "text-purple-100" : tema === 'dark' ? "text-slate-400" : "text-slate-500"}`}>
                    {item.descripcion}
                  </div>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 transition-all duration-300 ${
                  estaActivo
                    ? "text-white opacity-100 translate-x-0.5"
                    : "text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-purple-400"
                }`} />
              </Link>
            );
          })}
        </nav>

        {/* Footer del Sidebar */}
        <div className={`p-4 border-t ${tema === 'dark' ? 'border-white/10 bg-[#070b16]/75' : 'border-slate-200 bg-slate-50/80'} space-y-2`}>
          {/* Botón para cambiar a Vista Estudiante */}
          <button
            onClick={irAVistaEstudiante}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-semibold transition-all liquid-btn ${
              tema === 'dark'
                ? 'bg-slate-800/60 border-white/10 text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-sm'
            }`}
          >
            <span className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-500" /> Vista Estudiante
            </span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </button>

          {/* Botón de Cerrar Sesión */}
          <button
            onClick={manejarCerrarSesion}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-500 hover:bg-rose-500/15 border border-rose-500/20 transition-all liquid-btn"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Menú Móvil (Hamburguesa) - Liquid Glass Estilo iPhone */}
      <div className={`md:hidden flex items-center justify-between p-4 iphone-glass-header relative z-40`}>
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 p-0.5 border border-purple-500/40 flex items-center justify-center shadow-md shrink-0 overflow-hidden hover-pop">
            <img src="/sigunp-logo.png" alt="SIGUNP" style={{ clipPath: 'circle(49% at 50% 50%)' }} className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className={`font-black text-xs ${tema === 'dark' ? 'text-white' : 'text-slate-900'} leading-none`}>
                SIGUNP Admin
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse-subtle"></span>
            </div>
            <span className="text-[10px] text-purple-500 dark:text-purple-400 block font-bold mt-0.5 tracking-wide">Univ. Nac. de Piura</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={alternarTema}
            className={`p-2 rounded-xl border hover-pop active:scale-90 transition-all ${tema === 'dark' ? 'bg-slate-800/80 border-slate-700 text-amber-400 shadow-sm' : 'bg-white border-slate-200 text-slate-700 shadow-sm'}`}
          >
            {tema === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
            className={`p-2 rounded-xl border hover-pop active:scale-90 transition-all ${tema === 'dark' ? 'bg-slate-800/80 border-slate-700 text-slate-200 shadow-sm' : 'bg-white border-slate-200 text-slate-700 shadow-sm'}`}
          >
            {menuMovilAbierto ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5 text-purple-400" />}
          </button>
        </div>
      </div>

      {/* Drawer Móvil desplegable */}
      {menuMovilAbierto && (
        <div className={`md:hidden fixed inset-0 top-[65px] z-50 ${tema === 'dark' ? 'bg-[#090d16]/98' : 'bg-white/98'} backdrop-blur-md p-4 flex flex-col justify-between overflow-y-auto animate-fadeIn`}>
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const estaActivo = localizacion.pathname === item.ruta;
              return (
                <Link
                  key={item.ruta}
                  to={item.ruta}
                  onClick={() => setMenuMovilAbierto(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-xs font-semibold ${
                    estaActivo
                      ? "bg-purple-600 text-white"
                      : tema === 'dark'
                        ? "text-slate-300 bg-slate-900/60"
                        : "text-slate-700 bg-slate-100"
                  }`}
                >
                  {item.icono}
                  <span>{item.etiqueta}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={() => { setMenuMovilAbierto(false); irAVistaEstudiante(); }}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg bg-blue-600/10 text-blue-500 border border-blue-500/20 font-semibold text-xs"
            >
              <GraduationCap className="w-4 h-4" /> Ir a Vista Estudiante
            </button>
            <button
              onClick={manejarCerrarSesion}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20 font-semibold text-xs"
            >
              <LogOut className="w-4 h-4" /> Cerrar Sesión
            </button>
          </div>
        </div>
      )}

      {/* Área Principal de Contenido */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative z-10">
        
        {/* Header Superior Desktop */}
        <header className={`hidden md:flex items-center justify-between px-8 py-3.5 border-b ${tema === 'dark' ? 'bg-[#0e1526]/80 border-slate-800/80' : 'bg-white/80 border-slate-200'} backdrop-blur-md sticky top-0 z-20`}>
          <div>
            <div className="flex items-center space-x-2 text-xs font-medium text-purple-500">
              <span>Administración</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className={tema === 'dark' ? 'text-slate-200' : 'text-slate-800'}>{itemActivo.etiqueta}</span>
            </div>
            <h1 className={`text-lg font-bold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {itemActivo.etiqueta}
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            {/* Buscador Rápido del Header */}
            <div className={`relative hidden lg:block`}>
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar usuarios, cursos, facultades..."
                className={`w-64 pl-8 pr-3 py-1.5 text-xs rounded-lg border outline-none transition-all ${
                  tema === 'dark'
                    ? 'bg-slate-950/70 border-slate-800 text-slate-200 focus:border-purple-500'
                    : 'bg-slate-100 border-slate-200 text-slate-800 focus:border-purple-600'
                }`}
              />
            </div>

            {/* Toggle Tema */}
            <button
              onClick={alternarTema}
              title={tema === 'dark' ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
              className={`p-2 rounded-lg border transition-all ${
                tema === 'dark'
                  ? 'bg-slate-800/60 border-slate-700 text-amber-400 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
            >
              {tema === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
          </div>
        </header>

        {/* Vista hija (Outlet) */}
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto animate-fadeIn overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

