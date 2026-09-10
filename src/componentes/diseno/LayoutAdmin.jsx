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
    <div className={`min-h-screen ${tema === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col md:flex-row font-sans selection:bg-purple-600 selection:text-white relative overflow-hidden transition-colors duration-300`}>
      
      {/* Glows ambientales en segundo plano */}
      <div className={`fixed top-0 left-0 w-[550px] h-[550px] ${tema === 'dark' ? 'bg-purple-600/10' : 'bg-purple-500/10'} rounded-full blur-[140px] pointer-events-none`}></div>
      <div className={`fixed bottom-0 right-0 w-[550px] h-[550px] ${tema === 'dark' ? 'bg-blue-600/10' : 'bg-indigo-500/10'} rounded-full blur-[140px] pointer-events-none`}></div>

      {/* Sidebar Lateral para Desktop */}
      <aside className={`hidden md:flex md:w-72 ${tema === 'dark' ? 'bg-slate-900/90 border-slate-800/80' : 'bg-white/90 border-slate-200'} backdrop-blur-2xl border-r flex-col shrink-0 relative z-30 transition-colors duration-300`}>
        
        {/* Header del Sidebar */}
        <div className={`p-6 border-b ${tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'} space-y-4`}>
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-950/80 p-1 border border-purple-500/40 flex items-center justify-center shadow-lg shadow-purple-600/20 ring-2 ring-indigo-400/20 shrink-0">
              <img src="/sigunp-logo.png" alt="SIGUNP Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold tracking-tight text-base bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
                  SIGUNP
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20 uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium`}>
                Sistema Integral de Gestión UNP
              </p>
            </div>
          </div>

          {/* Tarjeta de Estado del Administrador */}
          <div className={`p-3.5 rounded-xl ${tema === 'dark' ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-100/80 border-slate-200'} border space-y-2`}>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold uppercase tracking-wider ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} flex items-center gap-1.5`}>
                <ShieldCheck className="w-3.5 h-3.5 text-purple-500" /> Superusuario
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Online
              </span>
            </div>
            <p className={`text-xs font-semibold truncate ${tema === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
              {nombreUsuario}
            </p>
            <p className={`text-[11px] font-mono ${tema === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
              Cód: {codigoUsuario}
            </p>
          </div>
        </div>

        {/* Links del Menú Lateral */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className={`px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase ${tema === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            Módulos Principales
          </div>
          {menuItems.map((item) => {
            const estaActivo = localizacion.pathname === item.ruta;
            return (
              <Link
                key={item.ruta}
                to={item.ruta}
                className={`group flex items-center space-x-3 px-3.5 py-3 rounded-xl transition-all duration-200 text-xs font-semibold relative ${
                  estaActivo
                    ? "bg-unp-gradient text-white shadow-lg shadow-sky-600/25 font-bold"
                    : tema === 'dark'
                      ? "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <div className={`${estaActivo ? "text-amber-300" : "text-sky-500 group-hover:scale-110"} transition-transform duration-200`}>
                  {item.icono}
                </div>
                <div className="flex-1 truncate">
                  <div className="truncate">{item.etiqueta}</div>
                  <div className={`text-[10px] font-normal truncate ${estaActivo ? "text-sky-100" : tema === 'dark' ? "text-slate-500" : "text-slate-500"}`}>
                    {item.descripcion}
                  </div>
                </div>
                {estaActivo && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer del Sidebar */}
        <div className={`p-4 border-t ${tema === 'dark' ? 'border-slate-800/80' : 'border-slate-200'} space-y-2`}>
          {/* Botón para cambiar a Vista Estudiante */}
          <button
            onClick={irAVistaEstudiante}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 ${
              tema === 'dark'
                ? 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
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
            className="w-full flex items-center justify-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Menú Móvil (Hamburguesa) */}
      <div className={`md:hidden flex items-center justify-between p-4 border-b ${tema === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} relative z-40`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950/80 p-1 border border-purple-500/40 flex items-center justify-center shadow-md shrink-0">
            <img src="/sigunp-logo.png" alt="SIGUNP" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="font-extrabold text-sm bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent block">
              SIGUNP Admin
            </span>
            <span className="text-[10px] text-slate-400 block font-semibold">Univ. Nac. de Piura</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={alternarTema}
            className={`p-2 rounded-xl border ${tema === 'dark' ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
          >
            {tema === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
            className={`p-2 rounded-xl border ${tema === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
          >
            {menuMovilAbierto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Drawer Móvil desplegable */}
      {menuMovilAbierto && (
        <div className={`md:hidden fixed inset-0 top-[65px] z-50 ${tema === 'dark' ? 'bg-slate-950/95' : 'bg-white/95'} backdrop-blur-xl p-4 flex flex-col justify-between overflow-y-auto animate-fadeIn`}>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const estaActivo = localizacion.pathname === item.ruta;
              return (
                <Link
                  key={item.ruta}
                  to={item.ruta}
                  onClick={() => setMenuMovilAbierto(false)}
                  className={`flex items-center space-x-3 p-3.5 rounded-xl text-sm font-semibold ${
                    estaActivo
                      ? "bg-purple-600 text-white"
                      : tema === 'dark'
                        ? "text-slate-300 bg-slate-900"
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
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-600/10 text-blue-500 border border-blue-500/20 font-semibold text-sm"
            >
              <GraduationCap className="w-4 h-4" /> Ir a Vista Estudiante
            </button>
            <button
              onClick={manejarCerrarSesion}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 font-semibold text-sm"
            >
              <LogOut className="w-4 h-4" /> Cerrar Sesión
            </button>
          </div>
        </div>
      )}

      {/* Área Principal de Contenido */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative z-10">
        
        {/* Header Superior Desktop */}
        <header className={`hidden md:flex items-center justify-between px-8 py-4 border-b ${tema === 'dark' ? 'bg-slate-900/50 border-slate-800/80' : 'bg-white/60 border-slate-200'} backdrop-blur-xl sticky top-0 z-20`}>
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-purple-500">
              <span>Administración</span>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className={tema === 'dark' ? 'text-slate-200' : 'text-slate-800'}>{itemActivo.etiqueta}</span>
            </div>
            <h1 className={`text-xl font-extrabold tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {itemActivo.etiqueta}
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            {/* Buscador Rápido del Header */}
            <div className={`relative hidden lg:block`}>
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar usuarios, cursos, facultades..."
                className={`w-72 pl-9 pr-4 py-2 text-xs rounded-xl border outline-none transition-all duration-200 ${
                  tema === 'dark'
                    ? 'bg-slate-950/70 border-slate-800 text-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
                    : 'bg-slate-100 border-slate-200 text-slate-800 focus:border-purple-600 focus:ring-1 focus:ring-purple-600'
                }`}
              />
            </div>

            {/* Toggle Tema */}
            <button
              onClick={alternarTema}
              title={tema === 'dark' ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
              className={`p-2.5 rounded-xl border transition-all duration-200 ${
                tema === 'dark'
                  ? 'bg-slate-800/80 border-slate-700/80 text-amber-400 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
            >
              {tema === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Badge de Servidor Supabase */}
            <div className={`hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl border ${
              tema === 'dark' ? 'bg-slate-950/60 border-slate-800/80 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
            } text-xs font-semibold`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Supabase Cloud Active</span>
            </div>
          </div>
        </header>

        {/* Vista Inyectada por React Router */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
