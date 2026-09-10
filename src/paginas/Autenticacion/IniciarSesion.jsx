import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
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
  Mail,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  IdCard,
  Hash,
  X
} from "lucide-react";
import { useTema } from "../../contexto/ContextoTema";
import { supabase } from "../../lib/supabase";

const unpEstructura = {
  "Facultad de Ingeniería Industrial": [
    "Ingeniería Informática",
    "Ingeniería Industrial",
    "Ingeniería Agroindustrial",
    "Ingeniería Mecatrónica"
  ],
  "Facultad de Ciencias": [
    "Ciencias Biológicas",
    "Física",
    "Matemáticas",
    "Estadística",
    "Ingeniería Electrónica y Telecomunicaciones"
  ],
  "Facultad de Ciencias de la Salud": [
    "Medicina Humana",
    "Enfermería",
    "Obstetricia",
    "Estomatología"
  ],
  "Facultad de Derecho y Ciencias Políticas": ["Derecho"],
  "Facultad de Ciencias Administrativas": ["Administración"],
  "Facultad de Ciencias Contables y Financieras": ["Contabilidad"],
  "Facultad de Economía": ["Economía"],
  "Facultad de Ingeniería de Minas": [
    "Ingeniería de Minas",
    "Ingeniería Geológica",
    "Ingeniería de Petróleo",
    "Ingeniería Química"
  ],
  "Facultad de Ingeniería Civil": ["Ingeniería Civil"],
  "Facultad de Arquitectura y Urbanismo": ["Arquitectura"]
};

export default function IniciarSesion() {
  const navegar = useNavigate();
  const { tema, alternarTema } = useTema();

  // Modo: 'login' o 'registro'
  const [pestanaActiva, setPestanaActiva] = useState("login");

  // ── ESTADOS DE INICIO DE SESIÓN ──
  const [identificadorLogin, setIdentificadorLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [mostrarPasswordLogin, setMostrarPasswordLogin] = useState(false);

  // ── ESTADOS DE REGISTRO ──
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");
  const [codigoUni, setCodigoUni] = useState("");
  const [email, setEmail] = useState("");
  const [passwordRegistro, setPasswordRegistro] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mostrarPasswordRegistro, setMostrarPasswordRegistro] = useState(false);
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);
  const [facultad, setFacultad] = useState("");
  // ── ESTADO DE ACEPTACIÓN DE TÉRMINOS ──
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  // ── ESTADO DEL MODAL DE CONFIRMACIÓN ──
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);

  // Superusuario y Carga
  const [esSuperusuario, setEsSuperusuario] = useState(false);
  const [modoIngreso, setModoIngreso] = useState("Estudiante");
  const [cargando, setCargando] = useState(false);

  // Estado de Mensajes de Feedback
  const [mensaje, setMensaje] = useState(null);

  // Escuchar nombres y apellidos para el modo superusuario
  useEffect(() => {
    const esCoincidencia =
      nombres.trim().toLowerCase() === "jhamir walverdir" &&
      apellidos.trim().toLowerCase() === "garcia herrera";
    setEsSuperusuario(esCoincidencia);
    if (!esCoincidencia) setModoIngreso("Estudiante");
  }, [nombres, apellidos]);

  const manejarCambioFacultad = (e) => {
    setFacultad(e.target.value);
    setEscuela("");
    setMensaje(null);
  };

  const autocompletarDemo = (tipo) => {
    if (tipo === "estudiante") {
      setIdentificadorLogin("0512021015");
      setPasswordLogin("123456");
      setNombres("Jhamir Walverdir");
      setApellidos("Garcia Herrera");
      setDni("72839401");
      setCodigoUni("0512021015");
      setEmail("jhamir.garcia@unp.edu.pe");
      setPasswordRegistro("123456");
      setConfirmPassword("123456");
      setFacultad("Facultad de Ingeniería Industrial");
      setEscuela("Ingeniería Informática");
      setModoIngreso("Estudiante");
    } else {
      setIdentificadorLogin("0512021015");
      setPasswordLogin("123456");
      setNombres("Jhamir Walverdir");
      setApellidos("Garcia Herrera");
      setDni("72839401");
      setCodigoUni("0512021015");
      setEmail("jhamir.garcia@unp.edu.pe");
      setPasswordRegistro("123456");
      setConfirmPassword("123456");
      setFacultad("Facultad de Ingeniería Industrial");
      setEscuela("Ingeniería Informática");
      setModoIngreso("Administrador");
    }
    setMensaje({
      tipo: "success",
      texto: "Credenciales demo autocompletadas."
    });
  };

  // ── MANEJO DEL LOGIN ──
  const ejecutarLogin = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setCargando(true);

    try {
      if (!aceptaTerminos) {
        setMensaje({
          tipo: "error",
          texto: "Debes marcar la casilla para aceptar los Términos de Uso y el aviso de proyecto independiente."
        });
        setCargando(false);
        return;
      }

      const idLimpio = identificadorLogin.trim();
      if (!idLimpio || !passwordLogin) {
        setMensaje({ tipo: "error", texto: "Por favor, ingresa tu identificador y contraseña." });
        setCargando(false);
        return;
      }

      // Consulta en Supabase buscando por DNI, Código o Email
      const { data: usuarioBD, error } = await supabase
        .from("estudiantes")
        .select("*")
        .or(`dni.eq.${idLimpio},codigo_universitario.eq.${idLimpio},email.eq.${idLimpio}`)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.warn("Consulta Supabase:", error.message);
      }

      // Si no existe en Supabase pero es la cuenta demo local
      let usuario = usuarioBD;
      if (!usuario && (idLimpio === "0512021015" || idLimpio === "72839401" || idLimpio === "jhamir.garcia@unp.edu.pe")) {
        usuario = {
          nombres: "Jhamir Walverdir",
          apellidos: "Garcia Herrera",
          codigo_universitario: "0512021015",
          dni: "72839401",
          facultad: "Facultad de Ingeniería Industrial",
          escuela: "Ingeniería Informática",
          rol: esSuperusuario ? modoIngreso : "Estudiante"
        };
      }

      if (!usuario) {
        setMensaje({
          tipo: "error",
          texto: "Usuario no encontrado. Verifica tu DNI, Código o Correo, o regístrate si eres nuevo."
        });
        setCargando(false);
        return;
      }

      // Validar longitud mínima de contraseña
      if (passwordLogin.length < 6) {
        setMensaje({ tipo: "error", texto: "La contraseña debe tener al menos 6 caracteres." });
        setCargando(false);
        return;
      }

      const rolFinal = esSuperusuario ? modoIngreso : (usuario.rol || "Estudiante");

      // Cargar cursos aprobados si existen
      if (usuario.codigo_universitario) {
        const { data: aprobadosBD } = await supabase
          .from("estudiante_cursos_aprobados")
          .select("curso_id")
          .eq("codigo_universitario", usuario.codigo_universitario);

        if (aprobadosBD && aprobadosBD.length > 0) {
          const ids = aprobadosBD.map((r) => r.curso_id);
          localStorage.setItem("cursosAprobados", JSON.stringify(ids));
        }
      }

      // Guardar Estado de Sesión Local
      localStorage.setItem("userRole", rolFinal);
      localStorage.setItem("codigoUniversitario", usuario.codigo_universitario || idLimpio);
      localStorage.setItem("nombreEstudiante", `${usuario.nombres} ${usuario.apellidos}`);
      localStorage.setItem("facultadEstudiante", usuario.facultad || "Facultad de Ingeniería Industrial");
      localStorage.setItem("escuelaEstudiante", usuario.escuela || "Ingeniería Informática");
      localStorage.setItem("storageVersion", "2");

      setMensaje({
        tipo: "success",
        texto: `¡Bienvenido(a) ${usuario.nombres}! Ingresando como ${rolFinal}...`
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
      }, 600);
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setMensaje({ tipo: "error", texto: "Error al iniciar sesión. Inténtelo de nuevo." });
    } finally {
      setCargando(false);
    }
  };

  // ── PREPARAR Y REVISAR REGISTRO ──
  const revisarRegistro = (e) => {
    e.preventDefault();
    setMensaje(null);

    if (!aceptaTerminos) {
      setMensaje({
        tipo: "error",
        texto: "Debes marcar la casilla para aceptar los Términos de Uso y el aviso de proyecto independiente."
      });
      return;
    }

    if (!nombres.trim() || !apellidos.trim()) {
      setMensaje({ tipo: "error", texto: "Por favor, ingresa tus nombres y apellidos." });
      return;
    }

    if (!dni.trim() && !codigoUni.trim()) {
      setMensaje({
        tipo: "error",
        texto: "Debes ingresar al menos tu DNI (8 dígitos) o tu Código Universitario."
      });
      return;
    }

    if (dni.trim() && dni.trim().length !== 8) {
      setMensaje({ tipo: "error", texto: "El número de DNI debe contener exactamente 8 dígitos." });
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setMensaje({ tipo: "error", texto: "Ingresa un correo electrónico válido." });
      return;
    }

    if (passwordRegistro.length < 6) {
      setMensaje({ tipo: "error", texto: "La contraseña debe tener al menos 6 caracteres." });
      return;
    }

    if (passwordRegistro !== confirmPassword) {
      setMensaje({ tipo: "error", texto: "Las contraseñas no coinciden. Verifícalas nuevamente." });
      return;
    }

    if (!facultad || !escuela) {
      setMensaje({ tipo: "error", texto: "Por favor, selecciona tu Facultad y Escuela Profesional." });
      return;
    }

    // Abrir modal de confirmación
    setMostrarModalConfirmacion(true);
  };

  // ── CONFIRMAR E INSERTAR REGISTRO EN SUPABASE ──
  const confirmarYRegistrar = async () => {
    setCargando(true);
    setMostrarModalConfirmacion(false);

    try {
      const dniLimpio = dni.trim() || null;
      const codigoLimpio = codigoUni.trim() || null;
      const rolFinal = esSuperusuario ? modoIngreso : "Estudiante";

      const payload = {
        nombres: nombres.trim(),
        apellidos: apellidos.trim(),
        dni: dniLimpio,
        codigo_universitario: codigoLimpio,
        email: email.trim().toLowerCase(),
        password_hash: passwordRegistro,
        facultad,
        escuela,
        rol: rolFinal
      };

      const { error } = await supabase.from("estudiantes").upsert(payload, {
        onConflict: email ? "email" : "codigo_universitario"
      });

      if (error) {
        console.warn("Sincronización Supabase:", error.message);
      }

      // Guardar Estado Local
      localStorage.setItem("userRole", rolFinal);
      localStorage.setItem("codigoUniversitario", codigoLimpio || dniLimpio || "0500000000");
      localStorage.setItem("nombreEstudiante", `${nombres.trim()} ${apellidos.trim()}`);
      localStorage.setItem("facultadEstudiante", facultad);
      localStorage.setItem("escuelaEstudiante", escuela);
      localStorage.setItem("storageVersion", "2");

      setMensaje({
        tipo: "success",
        texto: "¡Registro exitoso! Redirigiendo para calibrar tu malla curricular..."
      });

      setTimeout(() => {
        if (rolFinal === "Administrador") {
          navegar("/admin/inicio");
        } else {
          navegar("/configuracion-inicial");
        }
      }, 700);
    } catch (err) {
      console.error("Error al registrar:", err);
      setMensaje({ tipo: "error", texto: "Error al procesar el registro. Intente nuevamente." });
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
      
      {/* Glows de fondo */}
      <div className={`absolute -top-40 -left-40 w-[600px] h-[600px] ${tema === 'dark' ? 'bg-blue-600/15' : 'bg-sky-400/15'} rounded-full blur-[150px] pointer-events-none animate-pulseSubtle`}></div>
      <div className={`absolute -bottom-40 -right-40 w-[600px] h-[600px] ${tema === 'dark' ? 'bg-purple-600/15' : 'bg-amber-400/15'} rounded-full blur-[150px] pointer-events-none animate-pulseSubtle`}></div>

      {/* Botón superior de Tema */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <button
          type="button"
          onClick={alternarTema}
          className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl border text-xs font-black transition-all cursor-pointer flex items-center space-x-2 shadow-lg ${
            tema === 'dark'
              ? "bg-slate-900/80 border-slate-700 text-amber-300 hover:bg-slate-800"
              : "bg-white/90 border-slate-200 text-amber-600 hover:bg-slate-100"
          }`}
        >
          {tema === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Modo Claro</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Modo Oscuro</span>
            </>
          )}
        </button>
      </div>

      <div className={`w-full max-w-2xl ${
        tema === 'dark' ? 'bg-slate-900/85 border-slate-800/90' : 'bg-white/90 border-slate-200/90 shadow-2xl'
      } backdrop-blur-2xl border rounded-3xl p-4 sm:p-6 md:p-10 relative overflow-hidden z-10 transition-all duration-300 max-w-full`}>
        
        {/* Barra superior de acento */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500"></div>

        {/* Encabezado Principal y Logo */}
        <div className="text-center mb-6">
          <div className="relative group inline-flex items-center justify-center mb-3 mt-2 sm:mt-0">
            <div className={`absolute -inset-3 ${
              tema === 'dark' ? 'bg-gradient-to-r from-blue-600/40 via-amber-500/30 to-sky-400/40' : 'bg-gradient-to-r from-sky-400/30 via-amber-400/25 to-blue-500/30'
            } rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300 pointer-events-none`}></div>
            
            <div className={`relative w-24 h-24 sm:w-36 sm:h-36 rounded-full p-1.5 ${
              tema === 'dark'
                ? 'bg-slate-950/95 border-sky-400/40 shadow-[0_0_50px_rgba(59,130,246,0.3)]'
                : 'bg-white border-sky-300 shadow-xl'
            } border-2 ring-4 ${tema === 'dark' ? 'ring-amber-400/30' : 'ring-amber-400/40'} flex items-center justify-center transition-transform duration-300 group-hover:scale-105 backdrop-blur-xl overflow-hidden`}>
              <img
                src="/sigunp-logo.png"
                alt="SIGUNP Logo"
                style={{ clipPath: 'circle(49% at 50% 50%)' }}
                className="w-full h-full object-cover rounded-full drop-shadow-md"
              />
            </div>
          </div>
          
          <div className="block">
            <div className={`inline-flex items-center space-x-2 px-3.5 py-1 rounded-full ${
              tema === 'dark'
                ? 'bg-slate-950/80 border-amber-400/30 text-amber-400'
                : 'bg-amber-50/90 border-amber-300/80 text-amber-900'
            } border text-[11px] font-extrabold mb-2 backdrop-blur-md`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span className="tracking-widest uppercase font-extrabold bg-gradient-to-r from-sky-500 via-amber-500 to-blue-600 dark:from-sky-400 dark:via-amber-300 dark:to-blue-400 bg-clip-text text-transparent">
                UNIVERSIDAD NACIONAL DE PIURA
              </span>
            </div>
          </div>

          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Portal <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-500 dark:to-indigo-500 bg-clip-text text-transparent">SIGUNP</span>
          </h1>
          <p className={`text-xs ${tema === 'dark' ? 'text-slate-300' : 'text-slate-600'} mt-1 max-w-md mx-auto leading-relaxed font-semibold`}>
            Sistema Integral de Gestión de la Universidad Nacional de Piura.
          </p>
        </div>

        {/* Disclaimer JIAR & Términos y Condiciones */}
        <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2.5 mb-6 backdrop-blur-md transition-all ${
          tema === 'dark' ? 'bg-slate-950/80 border-sky-500/30 text-slate-300' : 'bg-sky-50/90 border-sky-200 text-slate-700 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-sky-500 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Proyecto Independiente · Creado por JIAR</span>
            </span>
            <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
              No Oficial UNP
            </span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Esta plataforma es un proyecto académico independiente creado por <strong>JIAR</strong>. <strong>No es un sitio web oficial de la Universidad Nacional de Piura (UNP)</strong>. Funciona como un simulador y gestor de mallas curriculares.
          </p>

          <label className="flex items-start space-x-2.5 cursor-pointer text-[11px] font-bold text-sky-400 dark:text-sky-300 pt-2 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 select-none">
            <input
              type="checkbox"
              checked={aceptaTerminos}
              onChange={(e) => { setAceptaTerminos(e.target.checked); setMensaje(null); }}
              className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
            />
            <span className="leading-snug">
              He leído y acepto los Términos de Uso y entiendo que SIGUNP es un proyecto académico independiente no oficial.
            </span>
          </label>
        </div>

        {/* ── SELECTOR DE PESTAÑAS: INICIAR SESIÓN / CREAR CUENTA ── */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 mb-6">
          <button
            type="button"
            onClick={() => { setPestanaActiva("login"); setMensaje(null); }}
            className={`py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              pestanaActiva === "login"
                ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md"
                : tema === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Iniciar Sesión</span>
          </button>

          <button
            type="button"
            onClick={() => { setPestanaActiva("registro"); setMensaje(null); }}
            className={`py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              pestanaActiva === "registro"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                : tema === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Crear Cuenta</span>
          </button>
        </div>

        {/* ── FORMULARIO VISTA: INICIAR SESIÓN ── */}
        {pestanaActiva === "login" && (
          <form onSubmit={ejecutarLogin} className="space-y-4 animate-fadeIn">
            <div>
              <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1.5 flex items-center space-x-1.5`}>
                <User className="w-3.5 h-3.5 text-blue-500" />
                <span>Identificador (DNI, Código Universitario o Correo)</span>
              </label>
              <input
                type="text"
                value={identificadorLogin}
                onChange={(e) => setIdentificadorLogin(e.target.value)}
                placeholder="Ingresa tu DNI, Código o Correo"
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
                <Lock className="w-3.5 h-3.5 text-blue-500" />
                <span>Contraseña</span>
              </label>
              <div className="relative">
                <input
                  type={mostrarPasswordLogin ? "text" : "password"}
                  value={passwordLogin}
                  onChange={(e) => setPasswordLogin(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 pr-11 rounded-2xl ${
                    tema === 'dark'
                      ? 'bg-slate-950/80 border-slate-800 text-slate-100 placeholder-slate-600'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  } border text-xs transition-all shadow-inner`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarPasswordLogin(!mostrarPasswordLogin)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer p-1"
                >
                  {mostrarPasswordLogin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Mensajes (Éxito / Error) */}
            {mensaje && (
              <div
                className={`p-3.5 rounded-2xl border flex items-start space-x-3 text-xs font-semibold animate-fadeIn shadow-lg ${
                  mensaje.tipo === "success"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
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

            {/* Acceso Rápido Demo */}
            <div className="pt-2">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 flex items-center justify-between">
                <span>Acceso Rápido Demo</span>
                <span className="text-sky-500 font-bold bg-sky-500/10 px-2 py-0.5 rounded-md">Supabase Ready</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => autocompletarDemo("estudiante")}
                  className="px-3 py-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-extrabold border border-slate-700 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>Estudiante Demo</span>
                </button>
                <button
                  type="button"
                  onClick={() => autocompletarDemo("administrador")}
                  className="px-3 py-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-extrabold border border-slate-700 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Administrador Demo</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full py-4 rounded-2xl font-black text-white tracking-wide transition-all shadow-xl bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] flex items-center justify-center space-x-2 text-sm cursor-pointer disabled:opacity-50"
            >
              {cargando ? (
                <span>Verificando...</span>
              ) : (
                <>
                  <span>Ingresar al Portal Académico</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ── FORMULARIO VISTA: CREAR CUENTA (REGISTRO) ── */}
        {pestanaActiva === "registro" && (
          <form onSubmit={revisarRegistro} className="space-y-4 animate-fadeIn">
            {/* Nombres y Apellidos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1 flex items-center space-x-1.5`}>
                  <User className="w-3.5 h-3.5 text-purple-500" />
                  <span>Nombres</span>
                </label>
                <input
                  type="text"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  placeholder="Ej. Jhamir Walverdir"
                  className={`w-full px-3.5 py-2.5 rounded-xl ${
                    tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                  } border text-xs font-semibold focus:outline-none focus:border-purple-500`}
                  required
                />
              </div>

              <div>
                <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1 flex items-center space-x-1.5`}>
                  <User className="w-3.5 h-3.5 text-purple-500" />
                  <span>Apellidos</span>
                </label>
                <input
                  type="text"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  placeholder="Ej. Garcia Herrera"
                  className={`w-full px-3.5 py-2.5 rounded-xl ${
                    tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                  } border text-xs font-semibold focus:outline-none focus:border-purple-500`}
                  required
                />
              </div>
            </div>

            {/* DNI y Código Universitario (Opcionales individualmente, 1 obligatorio) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1 flex items-center space-x-1.5`}>
                  <IdCard className="w-3.5 h-3.5 text-purple-500" />
                  <span>DNI (8 dígitos)</span>
                </label>
                <input
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value.replace(/\D/g, "").slice(0, 8))}
                  maxLength={8}
                  placeholder="72839401"
                  className={`w-full px-3.5 py-2.5 rounded-xl ${
                    tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                  } border text-xs font-mono font-semibold focus:outline-none focus:border-purple-500`}
                />
              </div>

              <div>
                <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1 flex items-center space-x-1.5`}>
                  <Hash className="w-3.5 h-3.5 text-purple-500" />
                  <span>Código UNP (10 dígitos)</span>
                </label>
                <input
                  type="text"
                  value={codigoUni}
                  onChange={(e) => setCodigoUni(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  maxLength={10}
                  placeholder="0512021015"
                  className={`w-full px-3.5 py-2.5 rounded-xl ${
                    tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                  } border text-xs font-mono font-semibold focus:outline-none focus:border-purple-500`}
                />
              </div>
            </div>

            {/* Correo Electrónico */}
            <div>
              <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1 flex items-center space-x-1.5`}>
                <Mail className="w-3.5 h-3.5 text-purple-500" />
                <span>Correo Electrónico</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="estudiante@unp.edu.pe"
                className={`w-full px-3.5 py-2.5 rounded-xl ${
                  tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                } border text-xs font-semibold focus:outline-none focus:border-purple-500`}
                required
              />
            </div>

            {/* Contraseña y Confirmar Contraseña (mínimo 6 caracteres + ojito) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1 flex items-center space-x-1.5`}>
                  <Lock className="w-3.5 h-3.5 text-purple-500" />
                  <span>Contraseña (Mín. 6)</span>
                </label>
                <div className="relative">
                  <input
                    type={mostrarPasswordRegistro ? "text" : "password"}
                    value={passwordRegistro}
                    onChange={(e) => setPasswordRegistro(e.target.value)}
                    minLength={6}
                    placeholder="••••••••"
                    className={`w-full px-3.5 py-2.5 pr-10 rounded-xl ${
                      tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    } border text-xs focus:outline-none focus:border-purple-500`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPasswordRegistro(!mostrarPasswordRegistro)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer p-1"
                  >
                    {mostrarPasswordRegistro ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1 flex items-center space-x-1.5`}>
                  <Lock className="w-3.5 h-3.5 text-purple-500" />
                  <span>Confirmar Contraseña</span>
                </label>
                <div className="relative">
                  <input
                    type={mostrarConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={6}
                    placeholder="••••••••"
                    className={`w-full px-3.5 py-2.5 pr-10 rounded-xl ${
                      tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    } border text-xs focus:outline-none focus:border-purple-500`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarConfirmPassword(!mostrarConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer p-1"
                  >
                    {mostrarConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Selección de Facultad y Escuela */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1 flex items-center space-x-1.5`}>
                  <Building2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>Facultad</span>
                </label>
                <select
                  value={facultad}
                  onChange={manejarCambioFacultad}
                  className={`w-full px-3.5 py-2.5 rounded-xl ${
                    tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                  } border text-xs font-semibold focus:outline-none focus:border-purple-500 cursor-pointer`}
                  required
                >
                  <option value="">Seleccione Facultad</option>
                  {Object.keys(unpEstructura).map((fac) => (
                    <option key={fac} value={fac}>{fac}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1 flex items-center space-x-1.5`}>
                  <BookOpenCheck className="w-3.5 h-3.5 text-purple-500" />
                  <span>Escuela Profesional</span>
                </label>
                <select
                  value={escuela}
                  onChange={(e) => setEscuela(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl ${
                    tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                  } border text-xs font-semibold focus:outline-none focus:border-purple-500 cursor-pointer disabled:opacity-40`}
                  disabled={!facultad}
                  required
                >
                  <option value="">Seleccione Escuela</option>
                  {facultad && unpEstructura[facultad].map((esc) => (
                    <option key={esc} value={esc}>{esc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mensajes (Éxito / Error) */}
            {mensaje && (
              <div
                className={`p-3.5 rounded-2xl border flex items-start space-x-3 text-xs font-semibold animate-fadeIn shadow-lg ${
                  mensaje.tipo === "success"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
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

            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-black text-white tracking-wide transition-all shadow-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 active:scale-[0.99] flex items-center justify-center space-x-2 text-sm cursor-pointer"
            >
              <span>Revisar y Crear Cuenta</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
          </form>
        )}

        {/* Footer legal & autoría */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-center">
          <p className="text-[10px] text-slate-400 font-medium">
            © 2026 <strong>SIGUNP</strong> · Proyecto Académico Creado por <strong>JIAR</strong>.
          </p>
        </div>
      </div>

      {/* ── MODAL DE CONFIRMACIÓN DE DATOS ("¿ESTÁS SEGURO?") ── */}
      {mostrarModalConfirmacion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-lg ${
            tema === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xl'
          } border rounded-3xl p-6 relative overflow-hidden space-y-5 animate-scaleUp`}>
            
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className={`text-base font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    ¿Estás seguro de que tus datos son correctos?
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Verifica tus datos antes de crear tu cuenta académica en SIGUNP.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMostrarModalConfirmacion(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabla resumen de datos */}
            <div className={`p-4 rounded-2xl border space-y-2.5 text-xs font-semibold ${
              tema === 'dark' ? 'bg-slate-950/90 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-400">Nombres completos:</span>
                <span className="font-extrabold text-right">{nombres} {apellidos}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-400">DNI:</span>
                <span className="font-extrabold font-mono text-right">{dni || "No especificado"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-400">Código Universitario:</span>
                <span className="font-extrabold font-mono text-right">{codigoUni || "No especificado"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-400">Correo Electrónico:</span>
                <span className="font-extrabold text-right truncate max-w-[200px]">{email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/40">
                <span className="text-slate-400">Facultad:</span>
                <span className="font-extrabold text-right truncate max-w-[220px]">{facultad}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Escuela Profesional:</span>
                <span className="font-extrabold text-purple-400 text-right truncate max-w-[220px]">{escuela}</span>
              </div>
            </div>

            {/* Advertencia */}
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-[11px] text-purple-300 leading-relaxed flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Con esta escuela seleccionada se cargará automáticamente tu malla curricular correspondiente.</span>
            </div>

            {/* Acciones del Modal */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setMostrarModalConfirmacion(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
              >
                ✏️ Modificar Datos
              </button>
              <button
                type="button"
                onClick={confirmarYRegistrar}
                disabled={cargando}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-purple-600/30"
              >
                {cargando ? "Registrando..." : "🚀 Confirmar y Crear Cuenta"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
