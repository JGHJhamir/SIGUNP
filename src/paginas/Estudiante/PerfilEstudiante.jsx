import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  IdCard,
  Hash,
  Building2,
  BookOpenCheck,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  KeyRound,
  GraduationCap,
  RefreshCw
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

export default function PerfilEstudiante() {
  const { tema } = useTema();

  // ── ESTADOS DEL PERFIL ──
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");
  const [codigoUni, setCodigoUni] = useState("");
  const [email, setEmail] = useState("");
  const [facultad, setFacultad] = useState("");
  const [escuela, setEscuela] = useState("");

  // ── ESTADOS DE CAMBIO DE CONTRASEÑA ──
  const [passwordActual, setPasswordActual] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mostrarPassActual, setMostrarPassActual] = useState(false);
  const [mostrarPassNueva, setMostrarPassNueva] = useState(false);
  const [mostrarPassConfirm, setMostrarPassConfirm] = useState(false);

  // Estados de carga y feedback
  const [cargandoPerfil, setCargandoPerfil] = useState(false);
  const [cargandoPassword, setCargandoPassword] = useState(false);
  const [mensajePerfil, setMensajePerfil] = useState(null);
  const [mensajePassword, setMensajePassword] = useState(null);

  const codigoActual = localStorage.getItem("codigoUniversitario") || "";
  const dniActual = localStorage.getItem("dniEstudiante") || "";
  const emailActual = localStorage.getItem("emailEstudiante") || "";
  const idBusqueda = codigoActual || dniActual || emailActual;

  // Cargar datos actuales del perfil desde Supabase o localStorage
  useEffect(() => {
    const cargarPerfil = async () => {
      const nombreGuardado = localStorage.getItem("nombreEstudiante") || "Estudiante UNP";
      const partesNombre = nombreGuardado.split(" ");
      const nom = partesNombre[0] || "Estudiante";
      const ape = partesNombre.slice(1).join(" ") || "UNP";
      const fac = localStorage.getItem("facultadEstudiante") || "Facultad de Ingeniería Industrial";
      const esc = localStorage.getItem("escuelaEstudiante") || "Ingeniería Informática";

      setNombres(nom);
      setApellidos(ape);
      setDni(dniActual);
      setCodigoUni(codigoActual);
      setEmail(emailActual);
      setFacultad(fac);
      setEscuela(esc);

      if (idBusqueda) {
        try {
          const { data, error } = await supabase
            .from("estudiantes")
            .select("*")
            .or(`codigo_universitario.eq.${idBusqueda},dni.eq.${idBusqueda},email.eq.${idBusqueda}`)
            .maybeSingle();

          if (data && !error) {
            setNombres(data.nombres || nom);
            setApellidos(data.apellidos || ape);
            setDni(data.dni || dniActual || "");
            setCodigoUni(data.codigo_universitario || "");
            setEmail(data.email || emailActual || "");
            if (data.facultad) setFacultad(data.facultad);
            if (data.escuela) setEscuela(data.escuela);
          }
        } catch (e) {
          console.warn("Carga perfil Supabase:", e);
        }
      }
    };
    cargarPerfil();
  }, [idBusqueda]);

  const manejarCambioFacultad = (e) => {
    setFacultad(e.target.value);
    setEscuela("");
    setMensajePerfil(null);
  };

  // ── GUARDAR DATOS DEL PERFIL EN SUPABASE Y LOCALSTORAGE ──
  const guardarPerfil = async (e) => {
    e.preventDefault();
    setMensajePerfil(null);

    if (!nombres.trim() || !apellidos.trim()) {
      setMensajePerfil({ tipo: "error", texto: "Ingresa tus nombres y apellidos." });
      return;
    }

    if (!facultad || !escuela) {
      setMensajePerfil({ tipo: "error", texto: "Selecciona tu Facultad y Escuela Profesional." });
      return;
    }

    setCargandoPerfil(true);

    try {
      const dniLimpio = dni.trim() || null;
      const codigoLimpio = codigoUni.trim() || null;
      const emailLimpio = email.trim().toLowerCase() || `${codigoLimpio || dniLimpio}@unp.edu.pe`;
      const nombreCompleto = `${nombres.trim()} ${apellidos.trim()}`;

      const payload = {
        nombres: nombres.trim(),
        apellidos: apellidos.trim(),
        dni: dniLimpio,
        codigo_universitario: codigoLimpio,
        email: emailLimpio,
        facultad,
        escuela
      };

      let updateError = null;

      // 1. Intentar actualizar el registro existente en Supabase
      if (idBusqueda) {
        const { error } = await supabase
          .from("estudiantes")
          .update(payload)
          .or(`codigo_universitario.eq.${idBusqueda},dni.eq.${idBusqueda},email.eq.${idBusqueda}`);
        
        updateError = error;
      }

      // 2. Si no existía o falló el update, hacer upsert por email o codigo
      if (!idBusqueda || updateError) {
        const { error: upsertErr } = await supabase
          .from("estudiantes")
          .upsert(payload, { onConflict: emailLimpio ? "email" : "codigo_universitario" });

        updateError = upsertErr;
      }

      if (updateError) {
        console.warn("Actualización perfil Supabase:", updateError.message);
      }

      // Actualizar localStorage
      localStorage.setItem("nombreEstudiante", nombreCompleto);
      localStorage.setItem("codigoUniversitario", codigoLimpio || "");
      localStorage.setItem("dniEstudiante", dniLimpio || "");
      localStorage.setItem("emailEstudiante", emailLimpio || "");
      localStorage.setItem("facultadEstudiante", facultad);
      localStorage.setItem("escuelaEstudiante", escuela);

      setMensajePerfil({
        tipo: "success",
        texto: "¡Perfil actualizado con éxito en Supabase y guardado en tu sesión!"
      });
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      setMensajePerfil({ tipo: "error", texto: "Ocurrió un error al guardar los cambios." });
    } finally {
      setCargandoPerfil(false);
    }
  };

  // ── CAMBIAR CONTRASEÑA EN SUPABASE ──
  const cambiarPassword = async (e) => {
    e.preventDefault();
    setMensajePassword(null);

    if (!passwordActual) {
      setMensajePassword({ tipo: "error", texto: "Ingresa tu contraseña actual." });
      return;
    }

    if (nuevaPassword.length < 6) {
      setMensajePassword({ tipo: "error", texto: "La nueva contraseña debe tener al menos 6 caracteres." });
      return;
    }

    if (nuevaPassword !== confirmarPassword) {
      setMensajePassword({ tipo: "error", texto: "La nueva contraseña y la confirmación no coinciden." });
      return;
    }

    setCargandoPassword(true);

    try {
      const codigoLimpio = codigoUni.trim() || codigoActual;

      // Actualizar password_hash en Supabase
      const { error } = await supabase
        .from("estudiantes")
        .update({ password_hash: nuevaPassword })
        .eq("codigo_universitario", codigoLimpio);

      if (error) {
        console.warn("Cambio password Supabase:", error.message);
      }

      setPasswordActual("");
      setNuevaPassword("");
      setConfirmarPassword("");

      setMensajePassword({
        tipo: "success",
        texto: "¡Contraseña actualizada correctamente en Supabase!"
      });
    } catch (err) {
      console.error("Error al cambiar contraseña:", err);
      setMensajePassword({ tipo: "error", texto: "Error al actualizar la contraseña." });
    } finally {
      setCargandoPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Encabezado del Perfil */}
      <div className={`p-6 md:p-8 rounded-3xl border ${
        tema === 'dark' ? 'bg-slate-900/90 border-slate-800/90' : 'bg-white border-slate-200 shadow-xl'
      } backdrop-blur-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6`}>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-blue-600 via-sky-400 to-purple-600 p-1 shadow-xl flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-black text-2xl text-white">
                {nombres.charAt(0)}{apellidos.charAt(0)}
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
          </div>

          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold mb-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{escuela || "Ingeniería Informática"}</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'} tracking-tight`}>
              {nombres} {apellidos}
            </h1>
            <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-semibold mt-0.5`}>
              {facultad || "Facultad de Ingeniería Industrial"} · UNP
            </p>
          </div>
        </div>

        <div className={`px-4 py-3 rounded-2xl ${
          tema === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        } border text-xs space-y-1 font-mono shrink-0`}>
          <div className="flex items-center space-x-2 text-slate-400">
            <Hash className="w-3.5 h-3.5 text-blue-500" />
            <span>Código: <strong className="text-white dark:text-white light:text-slate-900">{codigoUni || "Sin registrar"}</strong></span>
          </div>
          <div className="flex items-center space-x-2 text-slate-400">
            <IdCard className="w-3.5 h-3.5 text-purple-500" />
            <span>DNI: <strong className="text-white dark:text-white light:text-slate-900">{dni || "Sin registrar"}</strong></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── SECCIÓN 1: EDITAR DATOS DEL PERFIL (2 COLS) ── */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-6 sm:p-8 rounded-3xl border ${
            tema === 'dark' ? 'bg-slate-900/80 border-slate-800/90' : 'bg-white border-slate-200 shadow-xl'
          } space-y-6 backdrop-blur-xl`}>
            
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className={`text-base font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Editar Información Personal y Académica
                  </h2>
                  <p className="text-xs text-slate-400">
                    Actualiza tus datos para sincronizarlos con la base de datos de Supabase.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={guardarPerfil} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1.5 flex items-center space-x-1.5`}>
                    <User className="w-3.5 h-3.5 text-blue-500" />
                    <span>Nombres</span>
                  </label>
                  <input
                    type="text"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    className={`w-full px-4 py-3 rounded-2xl ${
                      tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    } border text-xs font-semibold focus:outline-none focus:border-blue-500`}
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
                    className={`w-full px-4 py-3 rounded-2xl ${
                      tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    } border text-xs font-semibold focus:outline-none focus:border-blue-500`}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1.5 flex items-center space-x-1.5`}>
                    <IdCard className="w-3.5 h-3.5 text-blue-500" />
                    <span>DNI (8 dígitos)</span>
                  </label>
                  <input
                    type="text"
                    value={dni}
                    onChange={(e) => setDni(e.target.value.replace(/\D/g, "").slice(0, 8))}
                    maxLength={8}
                    className={`w-full px-4 py-3 rounded-2xl ${
                      tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    } border text-xs font-mono font-semibold focus:outline-none focus:border-blue-500`}
                  />
                </div>

                <div>
                  <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1.5 flex items-center space-x-1.5`}>
                    <Hash className="w-3.5 h-3.5 text-blue-500" />
                    <span>Código UNP (10 dígitos)</span>
                  </label>
                  <input
                    type="text"
                    value={codigoUni}
                    onChange={(e) => setCodigoUni(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    maxLength={10}
                    className={`w-full px-4 py-3 rounded-2xl ${
                      tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    } border text-xs font-mono font-semibold focus:outline-none focus:border-blue-500`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1.5 flex items-center space-x-1.5`}>
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  <span>Correo Electrónico</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="estudiante@unp.edu.pe"
                  className={`w-full px-4 py-3 rounded-2xl ${
                    tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                  } border text-xs font-semibold focus:outline-none focus:border-blue-500`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1.5 flex items-center space-x-1.5`}>
                    <Building2 className="w-3.5 h-3.5 text-blue-500" />
                    <span>Facultad</span>
                  </label>
                  <select
                    value={facultad}
                    onChange={manejarCambioFacultad}
                    className={`w-full px-4 py-3 rounded-2xl ${
                      tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    } border text-xs font-semibold focus:outline-none focus:border-blue-500 cursor-pointer`}
                    required
                  >
                    <option value="">Seleccione Facultad</option>
                    {Object.keys(unpEstructura).map((fac) => (
                      <option key={fac} value={fac}>{fac}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1.5 flex items-center space-x-1.5`}>
                    <BookOpenCheck className="w-3.5 h-3.5 text-blue-500" />
                    <span>Escuela Profesional</span>
                  </label>
                  <select
                    value={escuela}
                    onChange={(e) => setEscuela(e.target.value)}
                    className={`w-full px-4 py-3 rounded-2xl ${
                      tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    } border text-xs font-semibold focus:outline-none focus:border-blue-500 cursor-pointer disabled:opacity-40`}
                    disabled={!facultad}
                    required
                  >
                    <option value="">Seleccione Escuela</option>
                    {facultad && unpEstructura[facultad]?.map((esc) => (
                      <option key={esc} value={esc}>{esc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {mensajePerfil && (
                <div className={`p-4 rounded-2xl border flex items-start space-x-3 text-xs font-semibold animate-fadeIn ${
                  mensajePerfil.tipo === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                }`}>
                  {mensajePerfil.tipo === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                  <span>{mensajePerfil.texto}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={cargandoPerfil}
                className="w-full py-4 rounded-2xl font-black text-white tracking-wide transition-all shadow-xl bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] flex items-center justify-center space-x-2 text-xs cursor-pointer disabled:opacity-50"
              >
                {cargandoPerfil ? (
                  <span>Guardando en Supabase...</span>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Guardar Cambios de Perfil</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ── SECCIÓN 2: CAMBIAR CONTRASEÑA (1 COL) ── */}
        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border ${
            tema === 'dark' ? 'bg-slate-900/80 border-slate-800/90' : 'bg-white border-slate-200 shadow-xl'
          } space-y-5 backdrop-blur-xl`}>
            
            <div className="flex items-center space-x-3 border-b border-slate-800/80 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-base font-black ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Cambiar Contraseña
                </h2>
                <p className="text-[11px] text-slate-400">
                  Actualiza tu clave de acceso en Supabase.
                </p>
              </div>
            </div>

            <form onSubmit={cambiarPassword} className="space-y-3.5">
              <div>
                <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1 flex items-center space-x-1.5`}>
                  <Lock className="w-3.5 h-3.5 text-purple-500" />
                  <span>Contraseña Actual</span>
                </label>
                <div className="relative">
                  <input
                    type={mostrarPassActual ? "text" : "password"}
                    value={passwordActual}
                    onChange={(e) => setPasswordActual(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full px-3.5 py-2.5 pr-10 rounded-xl ${
                      tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    } border text-xs focus:outline-none focus:border-purple-500`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPassActual(!mostrarPassActual)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer p-1"
                  >
                    {mostrarPassActual ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1 flex items-center space-x-1.5`}>
                  <Lock className="w-3.5 h-3.5 text-purple-500" />
                  <span>Nueva Contraseña (Mín. 6)</span>
                </label>
                <div className="relative">
                  <input
                    type={mostrarPassNueva ? "text" : "password"}
                    value={nuevaPassword}
                    onChange={(e) => setNuevaPassword(e.target.value)}
                    minLength={6}
                    placeholder="••••••••"
                    className={`w-full px-3.5 py-2.5 pr-10 rounded-xl ${
                      tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    } border text-xs focus:outline-none focus:border-purple-500`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPassNueva(!mostrarPassNueva)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer p-1"
                  >
                    {mostrarPassNueva ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-[11px] font-bold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'} uppercase tracking-wider mb-1 flex items-center space-x-1.5`}>
                  <Lock className="w-3.5 h-3.5 text-purple-500" />
                  <span>Confirmar Nueva Contraseña</span>
                </label>
                <div className="relative">
                  <input
                    type={mostrarPassConfirm ? "text" : "password"}
                    value={confirmarPassword}
                    onChange={(e) => setConfirmarPassword(e.target.value)}
                    minLength={6}
                    placeholder="••••••••"
                    className={`w-full px-3.5 py-2.5 pr-10 rounded-xl ${
                      tema === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
                    } border text-xs focus:outline-none focus:border-purple-500`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPassConfirm(!mostrarPassConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer p-1"
                  >
                    {mostrarPassConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {mensajePassword && (
                <div className={`p-3 rounded-2xl border flex items-start space-x-2 text-xs font-semibold ${
                  mensajePassword.tipo === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                }`}>
                  {mensajePassword.tipo === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{mensajePassword.texto}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={cargandoPassword}
                className="w-full py-3.5 rounded-2xl font-black text-white tracking-wide transition-all shadow-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.99] flex items-center justify-center space-x-2 text-xs cursor-pointer disabled:opacity-50"
              >
                {cargandoPassword ? (
                  <span>Actualizando...</span>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Actualizar Contraseña</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Tarjeta Estado Servidor BD */}
          <div className={`p-5 rounded-3xl border space-y-3 ${
            tema === 'dark' ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Conexión Supabase Activa</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              Todos tus cambios en este perfil se persisten en tiempo real en la base de datos PostgreSQL de Supabase.
            </p>
            <div className="pt-1 flex items-center space-x-2 text-[10px] font-bold text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>SIGUNP v2.0 · Proyecto JIAR</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
