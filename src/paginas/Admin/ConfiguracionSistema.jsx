import React, { useState, useEffect } from "react";
import {
  Settings,
  Calendar,
  Lock,
  Unlock,
  Database,
  Download,
  RotateCcw,
  CheckCircle2,
  Save,
  Server
} from "lucide-react";
import { useTema } from "../../contexto/ContextoTema";

export default function ConfiguracionSistema() {
  const { tema } = useTema();

  const [periodoActivo, setPeriodoActivo] = useState(() => {
    return localStorage.getItem("unpPeriodoActivo") || "2026-I";
  });

  const [matriculaAbierta, setMatriculaAbierta] = useState(() => {
    const v = localStorage.getItem("unpMatriculaAbierta");
    return v !== null ? v === "true" : true;
  });

  const [notificacion, setNotificacion] = useState(null);

  const mostrarNotificacion = (texto, tipo = "success") => {
    setNotificacion({ texto, tipo });
    setTimeout(() => setNotificacion(null), 3500);
  };

  const guardarConfiguracion = () => {
    localStorage.setItem("unpPeriodoActivo", periodoActivo);
    localStorage.setItem("unpMatriculaAbierta", String(matriculaAbierta));
    mostrarNotificacion("Configuración del sistema guardada con éxito.");
  };

  const alternarMatricula = () => {
    const nuevoEstado = !matriculaAbierta;
    setMatriculaAbierta(nuevoEstado);
    localStorage.setItem("unpMatriculaAbierta", String(nuevoEstado));
    mostrarNotificacion(
      nuevoEstado ? "Proceso de matrícula APERTURADO para todos los estudiantes." : "Proceso de matrícula CERRADO temporalmente."
    );
  };

  // Exportar respaldo JSON del sistema
  const exportarResguardoJSON = () => {
    const respaldo = {
      fechaExportacion: new Date().toISOString(),
      periodoActivo,
      matriculaAbierta,
      estructuraAdmin: JSON.parse(localStorage.getItem("unpEstructuraAdmin") || "{}"),
      usuariosAdmin: JSON.parse(localStorage.getItem("unpUsuariosAdmin") || "[]"),
      cursosAdmin: JSON.parse(localStorage.getItem("unpCursosAdmin") || "[]")
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(respaldo, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sigunp_respaldo_${periodoActivo}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    mostrarNotificacion("Copia de respaldo exportada en JSON.");
  };

  // Restablecer valores de fábrica
  const restablecerEstadoDemo = () => {
    if (window.confirm("¿Restablecer el sistema al estado demo de fábrica? Esto reiniciará las configuraciones locales.")) {
      localStorage.removeItem("unpPeriodoActivo");
      localStorage.removeItem("unpMatriculaAbierta");
      localStorage.removeItem("unpEstructuraAdmin");
      localStorage.removeItem("unpUsuariosAdmin");
      localStorage.removeItem("unpCursosAdmin");
      setPeriodoActivo("2026-I");
      setMatriculaAbierta(true);
      mostrarNotificacion("Sistema restablecido al estado demo inicial.");
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Toast Notificación */}
      {notificacion && (
        <div className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-2xl border shadow-xl flex items-center space-x-3 ${
          notificacion.tipo === 'error'
            ? 'bg-rose-500 text-white border-rose-600'
            : 'bg-emerald-500 text-white border-emerald-600'
        } animate-fadeIn`}>
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs font-bold">{notificacion.texto}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-black tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Configuración General y Parámetros del Sistema
          </h2>
          <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} mt-1`}>
            Controla los periodos lectivos, la apertura de inscripciones, respaldos y auditorías de SIGUNP.
          </p>
        </div>

        <button
          onClick={guardarConfiguracion}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all duration-200"
        >
          <Save className="w-4 h-4" /> Guardar Cambios
        </button>
      </div>

      {/* Secciones de Configuración */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Tarjeta 1: Periodo Lectivo y Estado de Matrícula */}
        <div className={`p-6 rounded-3xl border space-y-6 ${
          tema === 'dark' ? 'app-surface-card' : 'app-surface-card'
        }`}>
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-800/60">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`font-bold text-base ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Periodo Académico y Matrícula
              </h3>
              <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Ajuste de semestre vigente y switch de inscripciones
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Semestre Académico Vigente
              </label>
              <select
                value={periodoActivo}
                onChange={(e) => setPeriodoActivo(e.target.value)}
                className={`w-full p-3 text-xs font-bold rounded-xl border outline-none ${
                  tema === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option value="2026-I">Semestre 2026-I (Semestre Actual)</option>
                <option value="2026-II">Semestre 2026-II (Próximo Semestre)</option>
                <option value="2027-I">Semestre 2027-I</option>
              </select>
            </div>

            {/* Switch de Matrícula */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              tema === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center space-x-3">
                {matriculaAbierta ? (
                  <Unlock className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Lock className="w-5 h-5 text-rose-500" />
                )}
                <div>
                  <span className={`text-xs font-bold block ${tema === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                    Proceso de Matrícula
                  </span>
                  <span className={`text-[11px] block ${
                    matriculaAbierta ? 'text-emerald-500 font-semibold' : 'text-rose-500 font-semibold'
                  }`}>
                    {matriculaAbierta ? "ABIERTA — Los alumnos pueden inscribir cursos" : "CERRADA — Inscripciones deshabilitadas"}
                  </span>
                </div>
              </div>

              <button
                onClick={alternarMatricula}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  matriculaAbierta
                    ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500 hover:text-white'
                    : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500 hover:text-white'
                }`}
              >
                {matriculaAbierta ? "Cerrar Matrícula" : "Aperturar Matrícula"}
              </button>
            </div>
          </div>
        </div>

        {/* Tarjeta 2: Resguardo de Datos y Backup JSON */}
        <div className={`p-6 rounded-3xl border space-y-6 ${
          tema === 'dark' ? 'app-surface-card' : 'app-surface-card'
        }`}>
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-800/60">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`font-bold text-base ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Resguardo y Mantenimiento de Datos
              </h3>
              <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Exportación de seguridad y reinicio de fábrica
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={exportarResguardoJSON}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                tema === 'dark'
                  ? 'bg-slate-950/60 border-slate-800 hover:border-blue-500/40 text-slate-200'
                  : 'bg-slate-50 border-slate-200 hover:border-blue-300 text-slate-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-blue-500" />
                <div className="text-left">
                  <span className="text-xs font-bold block">Exportar Copia de Resguardo (JSON)</span>
                  <span className="text-[10px] text-slate-400 block">Descarga la estructura de facultades, usuarios y cursos</span>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-500">Descargar</span>
            </button>

            <button
              onClick={restablecerEstadoDemo}
              className="w-full flex items-center justify-between p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 transition-all text-rose-500"
            >
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-rose-500" />
                <div className="text-left">
                  <span className="text-xs font-bold block">Restablecer Estado Demo</span>
                  <span className="text-[10px] text-rose-400/80 block">Reinicia las configuraciones locales a los valores iniciales</span>
                </div>
              </div>
              <span className="text-xs font-bold">Restablecer</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bitácora de Auditoría del Sistema */}
      <div className={`p-6 rounded-3xl border ${
        tema === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
      } space-y-4`}>
        <div className="flex items-center justify-between">
          <h3 className={`font-extrabold text-base ${tema === 'dark' ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
            <Server className="w-5 h-5 text-purple-500" /> Historial de Cambios y Auditoría Administrativa
          </h3>
          <span className="text-xs font-semibold text-slate-400 font-mono">ID Sesión: SYS-2026-OK</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className={`p-3 rounded-xl border font-mono flex items-center justify-between ${
            tema === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <span>[AUDIT-001] Semestre 2026-I establecido como periodo lectivo principal</span>
            <span className="text-slate-400 text-[10px]">2026-09-08 14:45</span>
          </div>
          <div className={`p-3 rounded-xl border font-mono flex items-center justify-between ${
            tema === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <span>[AUDIT-002] Roles de Superusuario asignados a credencial 0512021015</span>
            <span className="text-slate-400 text-[10px]">2026-09-08 14:40</span>
          </div>
          <div className={`p-3 rounded-xl border font-mono flex items-center justify-between ${
            tema === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <span>[AUDIT-003] Sincronización RLS con Supabase verificada exitosamente</span>
            <span className="text-slate-400 text-[10px]">2026-09-08 14:30</span>
          </div>
        </div>
      </div>

    </div>
  );
}
