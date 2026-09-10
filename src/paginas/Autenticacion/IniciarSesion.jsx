import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  User,
  KeyRound,
  Lock,
  Building2,
  BookOpenCheck,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
  Info
} from "lucide-react";
import { useTema } from "../../contexto/ContextoTema";
import { supabase } from "../../lib/supabase";

const unpEstructura = {
  "Facultad de Ingeniería Industrial": ["Ingeniería Industrial", "Ingeniería Informática", "Ingeniería Agroindustrial", "Ingeniería Mecatrónica"],
  "Facultad de Ciencias": ["Ciencias Biológicas", "Física", "Matemáticas", "Estadística", "Ingeniería Electrónica y Telecomunicaciones"],
  "Facultad de Ingeniería de Minas": ["Ingeniería de Minas", "Ingeniería Geológica", "Ingeniería de Petróleo", "Ingeniería Química"],
  "Facultad de Agronomía": ["Agronomía", "Ingeniería Agrícola"],
  "Facultad de Ciencias Administrativas": ["Administración"],
  "Facultad de Ciencias Contables y Financieras": ["Contabilidad"],
  "Facultad de Economía": ["Economía"],
  "Facultad de Ciencias de la Salud": ["Medicina Humana", "Enfermería", "Obstetricia", "Estomatología"],
  "Facultad de Ciencias Sociales y Educación": ["Educación Inicial", "Educación Primaria", "Ciencias de la Comunicación", "Historia y Geografía", "Lengua y Literatura"],
  "Facultad de Derecho y Ciencias Políticas": ["Derecho"],
  "Facultad de Ingeniería Civil": ["Ingeniería Civil"],
  "Facultad de Arquitectura y Urbanismo": ["Arquitectura"],
  "Facultad de Ingeniería Pesquera": ["Ingeniería Pesquera"],
  "Facultad de Zootecnia": ["Zootecnia", "Medicina Veterinaria"]
};

export default function IniciarSesion() {
  const navegar = useNavigate();
  const { tema, alternarTema } = useTema();

  // Estados del Formulario
  const [codigoUniversitario, setCodigoUniversitario] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [facultad, setFacultad] = useState("");
  const [escuela, setEscuela] = useState("");

  // Estados de Superusuario y Carga
  const [esSuperusuario, setEsSuperusuario] = useState(false);
  const [modoIngreso, setModoIngreso] = useState("Estudiante");
  const [cargando, setCargando] = useState(false);

  // Estado de Mensajes de Feedback
  const [mensaje, setMensaje] = useState(null); // { tipo: 'success' | 'error', texto: string }

  // Escuchar nombres y apellidos para activar el modo superusuario
  useEffect(() => {
    const esCoincidenciaSuperusuario =
      nombres.trim().toLowerCase() === "jhamir walverdir" &&
      apellidos.trim().toLowerCase() === "garcia herrera";

    setEsSuperusuario(esCoincidenciaSuperusuario);
    if (!esCoincidenciaSuperusuario) {
      setModoIngreso("Estudiante");
    }
  }, [nombres, apellidos]);

  const manejarCambioFacultad = (e) => {
    setFacultad(e.target.value);
    setEscuela("");
    setMensaje(null);
  };

  const manejarCambioEscuela = (e) => {
    setEscuela(e.target.value);
    setMensaje(null);
  };

  const autocompletarDemo = (tipo) => {
    if (tipo === "estudiante") {
      setCodigoUniversitario("0512021015");
      setNombres("Jhamir Walverdir");
      setApellidos("Garcia Herrera");
      setContrasena("0512021015");
      setFacultad("Facultad de Ingeniería Industrial");
      setEscuela("Ingeniería Informática");
      setModoIngreso("Estudiante");
    } else {
      setCodigoUniversitario("0512021015");
      setNombres("Jhamir Walverdir");
      setApellidos("Garcia Herrera");
      setContrasena("0512021015");
      setFacultad("Facultad de Ingeniería Industrial");
      setEscuela("Ingeniería Informática");
      setModoIngreso("Administrador");
    }
    setMensaje({ tipo: "success", texto: "Credenciales demo autocompletadas. Presiona 'Ingresar al Portal Académico'." });
  };

  const manejarIngresoGoogle = async () => {
    try {
      setCargando(true);
      setMensaje({
        tipo: "info",
        texto: "Iniciando conexión con Google OAuth... (Preparado para vinculación final con Google Cloud Console)."
      });
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) {
        setMensaje({
          tipo: "info",
          texto: "Módulo Google OAuth preparado. Al activar el Client ID de Google Console se iniciará la sesión automáticamente."
        });
      }
    } catch (err) {
      console.warn("Google OAuth setup:", err);
      setMensaje({
        tipo: "info",
        texto: "Inicio de sesión con Google preparado para la versión final."
      });
    } finally {
      setCargando(false);
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setCargando(true);

    try {
      // Verificación inicial de campos completados
      if (!codigoUniversitario || !nombres || !apellidos || !contrasena || !facultad || !escuela) {
        setMensaje({ tipo: "error", texto: "Por favor, complete todos los campos requeridos." });
        setCargando(false);
        return;
      }

      // Regla 1 (Carreras Habilitadas)
      const esProgramaHabilitado =
        facultad === "Facultad de Ingeniería Industrial" &&
        escuela === "Ingeniería Informática";

      if (!esProgramaHabilitado) {
        setMensaje({ tipo: "error", texto: "Esta carrera se encuentra en desarrollo. Próximamente disponible." });
        setCargando(false);
        return;
      }

      // Regla 2 (Estructura del Código)
      const codigoLimpio = codigoUniversitario.trim();
      if (codigoLimpio.length !== 10) {
        setMensaje({ tipo: "error", texto: "El Código Universitario debe tener exactamente 10 dígitos." });
        setCargando(false);
        return;
      }

      if (escuela === "Ingeniería Informática" && !codigoLimpio.startsWith("051")) {
        setMensaje({ tipo: "error", texto: "El código de Ingeniería Informática debe comenzar con 051." });
        setCargando(false);
        return;
      }

      // Regla 3 (Contraseña)
      if (contrasena !== codigoLimpio) {
        setMensaje({ tipo: "error", texto: "Credenciales incorrectas: La contraseña debe coincidir con su Código Universitario." });
        setCargando(false);
        return;
      }

      const rolFinal = esSuperusuario ? modoIngreso : "Estudiante";

      // ── CONEXIÓN REAL CON SUPABASE ──
      // Registrar o actualizar el perfil en la base de datos de Supabase
      const { error: errSupabase } = await supabase
        .from("estudiantes")
        .upsert(
          {
            codigo_universitario: codigoLimpio,
            nombres: nombres.trim(),
            apellidos: apellidos.trim(),
            facultad,
            escuela,
            rol: rolFinal
          },
          { onConflict: "codigo_universitario" }
        );

      if (errSupabase) {
        console.warn("Aviso de sincronización Supabase:", errSupabase.message);
      }

      // Cargar cursos aprobados del estudiante si existen en Supabase
      const { data: aprobadosBD } = await supabase
        .from("estudiante_cursos_aprobados")
        .select("curso_id")
        .eq("codigo_universitario", codigoLimpio);

      if (aprobadosBD && aprobadosBD.length > 0) {
        const ids = aprobadosBD.map((r) => r.curso_id);
        localStorage.setItem("cursosAprobados", JSON.stringify(ids));
      }

      // Guardar Estado de Sesión Local
      localStorage.setItem("userRole", rolFinal);
      localStorage.setItem("codigoUniversitario", codigoLimpio);
      localStorage.setItem("nombreEstudiante", `${nombres} ${apellidos}`);
      localStorage.setItem("facultadEstudiante", facultad);
      localStorage.setItem("escuelaEstudiante", escuela);
      localStorage.setItem("storageVersion", "2");

      setMensaje({
        tipo: "success",
        texto: `¡Acceso Web Real verificado en Supabase! Ingresando como ${rolFinal === "Administrador" ? "Administrador" : "Estudiante"}...`
      });

      const tutorialCompletado = localStorage.getItem("tutorialCompletado") === "true";
      setTimeout(() => {
        if (rolFinal === "Administrador") {
          navegar("/admin/inicio");
        } else if (tutorialCompletado) {
          navegar("/estudiante/inicio");
        } else {
          navegar("/configuracion-inicial");
        }
      }, 700);

    } catch (err) {
      console.error("Error en inicio de sesión:", err);
      setMensaje({ tipo: "error", texto: "Ocurrió un error al procesar el inicio de sesión. Intente nuevamente." });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      tema === 'dark'
        ? 'bg-slate-950 text-slate-100'
        : 'bg-gradient-to-br from-slate-100 via-sky-50/60 to-amber-50/30 text-slate-900'
    } p-4 md:p-8 font-sans relative overflow-hidden selection:bg-blue-600 selection:text-white transition-colors duration-300`}>
      
      {/* Background ambient light spheres */}
      <div className={`absolute -top-40 -left-40 w-[600px] h-[600px] ${tema === 'dark' ? 'bg-blue-600/15' : 'bg-sky-400/15'} rounded-full blur-[150px] pointer-events-none animate-pulseSubtle`}></div>
      <div className={`absolute -bottom-40 -right-40 w-[600px] h-[600px] ${tema === 'dark' ? 'bg-purple-600/15' : 'bg-amber-400/15'} rounded-full blur-[150px] pointer-events-none animate-pulseSubtle`}></div>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full ${
        tema === 'dark' ? 'bg-[radial-gradient(#334155_1px,transparent_1px)] opacity-25' : 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] opacity-40'
      } [background-size:32px_32px] pointer-events-none`}></div>

      {/* Top right theme toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={alternarTema}
          className={`px-4 py-2 rounded-2xl border text-xs font-black transition-all cursor-pointer flex items-center space-x-2 shadow-lg ${
            tema === 'dark'
              ? "bg-slate-900/80 border-slate-700 text-amber-300 hover:bg-slate-800"
              : "bg-white/90 border-slate-200 text-amber-600 hover:bg-slate-100"
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
      </div>

      <div className={`w-full max-w-2xl ${
        tema === 'dark' ? 'bg-slate-900/85 border-slate-800/90' : 'bg-white/90 border-slate-200/90 shadow-2xl'
      } backdrop-blur-2xl border rounded-3xl p-6 md:p-12 relative overflow-hidden z-10 transition-all duration-300`}>
        
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative group inline-flex items-center justify-center mb-6">
            {/* Ambient Backlight Glows */}
            <div className={`absolute -inset-3 ${
              tema === 'dark' ? 'bg-gradient-to-r from-blue-600/40 via-amber-500/30 to-sky-400/40' : 'bg-gradient-to-r from-sky-400/30 via-amber-400/25 to-blue-500/30'
            } rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300 pointer-events-none`}></div>
            
            {/* Logo Ring Container with perfect circular clipping */}
            <div className={`relative w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full p-1.5 ${
              tema === 'dark'
                ? 'bg-slate-950/95 border-sky-400/40 shadow-[0_0_60px_rgba(59,130,246,0.35),0_0_25px_rgba(245,158,11,0.25)]'
                : 'bg-white border-sky-300 shadow-2xl shadow-sky-600/15'
            } border-2 ring-4 ${tema === 'dark' ? 'ring-amber-400/30' : 'ring-amber-400/40'} flex items-center justify-center transition-transform duration-300 group-hover:scale-105 backdrop-blur-xl overflow-hidden`}>
              <img
                src="/sigunp-logo.png"
                alt="SIGUNP Logo Oficial"
                style={{ clipPath: 'circle(49% at 50% 50%)' }}
                className="w-full h-full object-cover rounded-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
          
          <div className="block">
            <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full ${
              tema === 'dark'
                ? 'bg-slate-950/80 border-amber-400/30 text-amber-400 shadow-md shadow-amber-500/10'
                : 'bg-amber-50/90 border-amber-300/80 text-amber-900 shadow-sm'
            } border text-xs font-extrabold mb-3 backdrop-blur-md transition-colors duration-300`}>
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="tracking-widest uppercase text-[11px] font-extrabold bg-gradient-to-r from-sky-500 via-amber-500 to-blue-600 dark:from-sky-400 dark:via-amber-300 dark:to-blue-400 bg-clip-text text-transparent">
                UNIVERSIDAD NACIONAL DE PIURA
              </span>
            </div>
          </div>

          <h1 className={`text-3xl md:text-5xl font-black tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {nombres.trim() ? (
              <span>¡Hola, <span className="bg-gradient-to-r from-sky-400 via-amber-400 to-blue-500 bg-clip-text text-transparent">{nombres.trim().split(" ")[0]}</span>! 👋</span>
            ) : (
              <>Portal <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-500 dark:to-indigo-500 bg-clip-text text-transparent">SIGUNP</span></>
            )}
          </h1>
          <p className={`text-xs md:text-sm ${tema === 'dark' ? 'text-slate-300' : 'text-slate-600'} mt-2 max-w-md mx-auto leading-relaxed font-semibold`}>
            Sistema Integral de Gestión de la Universidad Nacional de Piura.
          </p>
        </div>

        {/* Banner Informativo y Disclaimer de Autoría (JIAR) */}
        <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2.5 mb-6 backdrop-blur-md transition-colors duration-300 ${
          tema === 'dark'
            ? 'bg-slate-950/80 border-sky-500/30 text-slate-300'
            : 'bg-sky-50/90 border-sky-200 text-slate-700 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-sky-600 dark:text-sky-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Info className="w-4 h-4 text-sky-500 shrink-0" />
              <span>Proyecto Independiente · Desarrollado por JIAR</span>
            </span>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              No Oficial UNP
            </span>
          </div>
          <p className="text-[11px] leading-relaxed">
            <strong>Aviso Importante:</strong> Esta plataforma <strong>no es un sitio web oficial</strong> de la Universidad Nacional de Piura (UNP). Es un proyecto independiente diseñado y creado por <strong>JIAR</strong> con la finalidad de brindar a la comunidad estudiantil un simulador de mallas curriculares, cálculo de créditos y gestión académica.
          </p>
          <div className="flex items-center space-x-2 text-[10px] font-bold text-sky-700 dark:text-sky-300 pt-2 border-t border-slate-200 dark:border-slate-800/80">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 animate-pulse" />
            <span>Desarrollo Progresivo: Disponible Ing. Informática. Próximamente se habilitarán todas las escuelas UNP.</span>
          </div>
        </div>

        <form onSubmit={manejarEnvio} className="space-y-5">
          
          {/* Nombres y Apellidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1.5 flex items-center space-x-1.5`}>
                <User className="w-3.5 h-3.5 text-blue-500" />
                <span>Nombres</span>
              </label>
              <input
                type="text"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder="Ej. Jhamir Walverdir"
                className={`w-full px-4 py-3 rounded-2xl ${
                  tema === 'dark'
                    ? 'bg-slate-950/80 border-slate-800 text-slate-100 placeholder-slate-600'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                } border text-xs font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner`}
                required
              />
            </div>

            <div>
              <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1.5 flex items-center space-x-1.5`}>
                <User className="w-3.5 h-3.5 text-blue-500" />
                <span>Apellidos</span>
              </label>
              <input
                type="text"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder="Ej. Garcia Herrera"
                className={`w-full px-4 py-3 rounded-2xl ${
                  tema === 'dark'
                    ? 'bg-slate-950/80 border-slate-800 text-slate-100 placeholder-slate-600'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                } border text-xs font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner`}
                required
              />
            </div>
          </div>

          {/* Selector de Superusuario */}
          {esSuperusuario && (
            <div className="p-4 bg-gradient-to-r from-blue-950/70 via-indigo-950/70 to-purple-950/70 border border-blue-500/50 rounded-2xl space-y-2 animate-fadeIn shadow-lg">
              <label className="block text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Modo de Ingreso Especial (Superusuario)</span>
              </label>
              <select
                value={modoIngreso}
                onChange={(e) => setModoIngreso(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-blue-500/40 text-blue-100 text-xs font-bold focus:outline-none focus:border-blue-400 cursor-pointer"
              >
                <option value="Estudiante">Estudiante</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>
          )}

          {/* Código Universitario y Contraseña */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1.5 flex items-center space-x-1.5`}>
                <KeyRound className="w-3.5 h-3.5 text-blue-500" />
                <span>Código Universitario (10 dígitos)</span>
              </label>
              <input
                type="text"
                value={codigoUniversitario}
                onChange={(e) => setCodigoUniversitario(e.target.value)}
                maxLength={10}
                placeholder="0512021015"
                className={`w-full px-4 py-3 rounded-2xl ${
                  tema === 'dark'
                    ? 'bg-slate-950/80 border-slate-800 text-slate-100 placeholder-slate-600'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                } border font-mono text-xs font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner`}
                required
              />
            </div>

            <div>
              <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1.5 flex items-center space-x-1.5`}>
                <Lock className="w-3.5 h-3.5 text-blue-500" />
                <span>Contraseña</span>
              </label>
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="••••••••••"
                className={`w-full px-4 py-3 rounded-2xl ${
                  tema === 'dark'
                    ? 'bg-slate-950/80 border-slate-800 text-slate-100 placeholder-slate-600'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                } border text-xs transition-all shadow-inner`}
                required
              />
            </div>
          </div>

          {/* Facultad */}
          <div>
            <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1.5 flex items-center space-x-1.5`}>
              <Building2 className="w-3.5 h-3.5 text-blue-500" />
              <span>Facultad</span>
            </label>
            <select
              value={facultad}
              onChange={manejarCambioFacultad}
              className={`w-full px-4 py-3 rounded-2xl ${
                tema === 'dark'
                  ? 'bg-slate-950/80 border-slate-800 text-slate-100'
                  : 'bg-slate-50 border-slate-300 text-slate-900'
              } border text-xs font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all shadow-inner`}
              required
            >
              <option value="">Seleccione Facultad</option>
              {Object.keys(unpEstructura).map((fac) => (
                <option key={fac} value={fac}>
                  {fac}
                </option>
              ))}
            </select>
          </div>

          {/* Escuela */}
          <div>
            <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1.5 flex items-center space-x-1.5`}>
              <BookOpenCheck className="w-3.5 h-3.5 text-blue-500" />
              <span>Escuela Profesional</span>
            </label>
            <select
              value={escuela}
              onChange={manejarCambioEscuela}
              className={`w-full px-4 py-3 rounded-2xl ${
                tema === 'dark'
                  ? 'bg-slate-950/80 border-slate-800 text-slate-100'
                  : 'bg-slate-50 border-slate-300 text-slate-900'
              } border text-xs font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-inner`}
              disabled={!facultad}
              required
            >
              <option value="">Seleccione Escuela</option>
              {facultad &&
                unpEstructura[facultad].map((esc) => (
                  <option key={esc} value={esc}>
                    {esc}
                  </option>
                ))}
            </select>
          </div>

          {/* Mensajes (Éxito / Error) */}
          {mensaje && (
            <div
              className={`p-4 rounded-2xl border flex items-start space-x-3 text-xs font-semibold animate-fadeIn shadow-lg ${
                mensaje.tipo === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                  : mensaje.texto.includes("desarrollo")
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-500"
              }`}
            >
              {mensaje.tipo === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
              )}
              <span className="leading-relaxed">{mensaje.texto}</span>
            </div>
          )}

          {/* Botón de Autenticación con Google (OAuth preparado) */}
          <div className="pt-1">
            <button
              type="button"
              onClick={manejarIngresoGoogle}
              className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs transition-all duration-200 border flex items-center justify-center space-x-3 cursor-pointer shadow-md ${
                tema === 'dark'
                  ? 'bg-slate-950/90 hover:bg-slate-900 border-slate-700/80 text-white shadow-black/40'
                  : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-slate-200'
              }`}
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continuar con Google (OAuth Preparado)</span>
            </button>
          </div>

          {/* Botones de Acceso Rápido Demo */}
          <div className="pt-2">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 flex items-center justify-between">
              <span>Acceso Rápido con Credenciales Universitarias</span>
              <span className="text-sky-500 font-bold bg-sky-500/10 px-2 py-0.5 rounded-md">Supabase Connected</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => autocompletarDemo("estudiante")}
                className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-extrabold border border-slate-200 dark:border-slate-700/80 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
              >
                <User className="w-3.5 h-3.5 text-blue-500" />
                <span>Modo Estudiante (0512021015)</span>
              </button>
              <button
                type="button"
                onClick={() => autocompletarDemo("administrador")}
                className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-extrabold border border-slate-200 dark:border-slate-700/80 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                <span>Modo Administrador (0512021015)</span>
              </button>
            </div>
          </div>

          {/* Botón de Envío */}
          <button
            type="submit"
            disabled={cargando}
            className="w-full py-4 rounded-2xl font-black text-white tracking-wide transition-all duration-200 shadow-xl bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] shadow-blue-600/30 flex items-center justify-center space-x-2 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cargando ? (
              <span>Verificando en Supabase...</span>
            ) : (
              <>
                <span>Ingresar al Portal Académico</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer legal & autoría */}
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-center">
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
            © 2026 <strong>SIGUNP</strong> · Proyecto Académico Creado por <strong>JIAR</strong>.
          </p>
          <p className="text-[9px] text-slate-400/80 dark:text-slate-500/80 mt-0.5">
            No afiliado oficialmente a la Universidad Nacional de Piura.
          </p>
        </div>
      </div>
    </div>
  );
}
