import React, { useState } from "react";
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Calendar,
  Sliders,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Layers,
  Award,
  Zap,
  ShieldCheck
} from "lucide-react";
import { useTema } from "../contexto/ContextoTema";

const PASOS_GUIA = [
  {
    titulo: "¡Bienvenido a SIGUNP!",
    subtitulo: "Plataforma Académica Estudiantil · Universidad Nacional de Piura",
    icono: Sparkles,
    colorIcono: "from-blue-500 to-indigo-600",
    descripcion:
      "Diseñado para facilitarte la gestión de tu carrera. Te daremos una breve guía paso a paso para que conozcas las herramientas clave disponibles en tu portal.",
    caracteristicas: [
      "Plataforma optimizada para móvil y escritorio",
      "Control de prerrequisitos en tiempo real",
      "Diseño hiper-traslúcido Liquid Glass"
    ]
  },
  {
    titulo: "Malla Curricular por Ciclos",
    subtitulo: "Seguimiento y visualización de prerrequisitos",
    icono: BookOpen,
    colorIcono: "from-emerald-500 to-teal-600",
    descripcion:
      "Explora los 10 ciclos de tu carrera. Haz clic en cualquier asignatura para marcarla como Aprobada o ver su Diagrama de Árbol interactivo de prerrequisitos.",
    caracteristicas: [
      "Bloqueo automático de asignaturas si faltan prerrequisitos",
      "Buscador rápido por código o nombre de curso",
      "Botón 'Marcar Ciclo Completo' para avanzar ágilmente"
    ]
  },
  {
    titulo: "Pre-Matrícula Inteligente",
    subtitulo: "Inscripción de cursos y selección de horarios",
    icono: GraduationCap,
    colorIcono: "from-amber-500 to-orange-600",
    descripcion:
      "Revisa la lista de cursos habilitados para tu semestre. Selecciona tus asignaturas y asigna los grupos de horario (G-01, G-02, etc.) verificando cruces de hora.",
    caracteristicas: [
      "Detector instantáneo de conflictos de horario",
      "Conteo automático de créditos seleccionados",
      "Guardado de borrador y matrícula definitiva"
    ]
  },
  {
    titulo: "Horario Oficial de Clases",
    subtitulo: "Tu horario semanal actualizado al instante",
    icono: Calendar,
    colorIcono: "from-purple-500 to-pink-600",
    descripcion:
      "Visualiza tu horario semanal en formato de grilla interactiva, vista de agenda diaria o tarjetas. Incluye las aulas, días y profesores asignados.",
    caracteristicas: [
      "Modo agenda para revisión rápida desde celular",
      "Filtro para ocultar horas libres vacías",
      "Función de copiar resumen o imprimir comprobante"
    ]
  },
  {
    titulo: "Simulador de Semestres",
    subtitulo: "Planifica el futuro de tu carrera",
    icono: Sliders,
    colorIcono: "from-sky-500 to-blue-600",
    descripcion:
      "Proyecta tus semestres venideros para calcular cuántos periodos te restan antes de egresar y simular tu carga de créditos ideal.",
    caracteristicas: [
      "Simulación de aprobación por bloques",
      "Cálculo automático de fecha estimada de graduación",
      "Ajuste personalizado de límite de créditos por semestre"
    ]
  }
];

export default function ModalGuiaInteractiva({ abierto, alCerrar }) {
  const { tema } = useTema();
  const [pasoActual, setPasoActual] = useState(0);

  if (!abierto) return null;

  const paso = PASOS_GUIA[pasoActual];
  const IconoPaso = paso.icono;
  const esUltimoPaso = pasoActual === PASOS_GUIA.length - 1;

  const irSiguiente = () => {
    if (esUltimoPaso) {
      alCerrar();
    } else {
      setPasoActual((prev) => prev + 1);
    }
  };

  const irAnterior = () => {
    if (pasoActual > 0) {
      setPasoActual((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-lg rounded-3xl liquid-glass-card glare-hover p-6 sm:p-7 shadow-2xl transition-all border ${
        tema === 'dark' ? 'border-slate-700/80 bg-[#090e1a]/90 text-white' : 'border-white/80 bg-white/90 text-slate-900'
      }`}>
        
        {/* Botón Cerrar */}
        <button
          onClick={alCerrar}
          className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header con Indicador de Progreso */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
              Guía del Portal · Paso {pasoActual + 1} de {PASOS_GUIA.length}
            </span>
            <div className="flex space-x-1">
              {PASOS_GUIA.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === pasoActual
                      ? 'w-6 bg-gradient-to-r from-blue-500 to-indigo-600'
                      : 'w-2 bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Icono del Paso Animado */}
          <div className="flex items-center space-x-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${paso.colorIcono} text-white flex items-center justify-center shadow-lg shrink-0 transform hover:scale-105 transition-transform`}>
              <IconoPaso className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight leading-tight">
                {paso.titulo}
              </h2>
              <p className="text-xs font-semibold text-blue-500 dark:text-blue-400">
                {paso.subtitulo}
              </p>
            </div>
          </div>

          {/* Descripción */}
          <p className={`text-xs sm:text-sm leading-relaxed ${
            tema === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {paso.descripcion}
          </p>

          {/* Puntos destacados */}
          <div className="space-y-2 pt-1">
            {paso.caracteristicas.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className={tema === 'dark' ? 'text-slate-200' : 'text-slate-700'}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer de Navegación */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-800/80">
          <button
            type="button"
            onClick={irAnterior}
            disabled={pasoActual === 0}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
              pasoActual === 0
                ? 'opacity-30 cursor-not-allowed text-slate-400'
                : tema === 'dark'
                ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <button
            type="button"
            onClick={irSiguiente}
            className="px-5 py-2.5 rounded-xl font-black text-xs text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer"
          >
            <span>{esUltimoPaso ? "¡Entendido, Comenzar!" : "Siguiente"}</span>
            {esUltimoPaso ? <CheckCircle2 className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </div>
  );
}
