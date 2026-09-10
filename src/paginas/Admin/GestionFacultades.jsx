import React, { useState, useEffect, useRef } from "react";
import {
  Building2,
  GraduationCap,
  Plus,
  Search,
  Trash2,
  CheckCircle2,
  Clock,
  X,
  ChevronDown,
  ChevronUp,
  Upload,
  Image as ImageIcon,
  Sparkles,
  RefreshCcw,
  Clipboard,
  Link as LinkIcon
} from "lucide-react";
import { useTema } from "../../contexto/ContextoTema";

const unpEstructuraInicial = {
  "Facultad de Ingeniería Industrial": [
    { nombre: "Ingeniería Industrial", estado: "En desarrollo" },
    { nombre: "Ingeniería Informática", estado: "Habilitada" },
    { nombre: "Ingeniería Agroindustrial", estado: "En desarrollo" },
    { nombre: "Ingeniería Mecatrónica", estado: "En desarrollo" }
  ],
  "Facultad de Ciencias": [
    { nombre: "Ciencias Biológicas", estado: "En desarrollo" },
    { nombre: "Física", estado: "En desarrollo" },
    { nombre: "Matemáticas", estado: "En desarrollo" },
    { nombre: "Estadística", estado: "En desarrollo" },
    { nombre: "Ingeniería Electrónica y Telecomunicaciones", estado: "En desarrollo" }
  ],
  "Facultad de Ingeniería de Minas": [
    { nombre: "Ingeniería de Minas", estado: "En desarrollo" },
    { nombre: "Ingeniería Geológica", estado: "En desarrollo" },
    { nombre: "Ingeniería de Petróleo", estado: "En desarrollo" },
    { nombre: "Ingeniería Química", estado: "En desarrollo" }
  ],
  "Facultad de Agronomía": [
    { nombre: "Agronomía", estado: "En desarrollo" },
    { nombre: "Ingeniería Agrícola", estado: "En desarrollo" }
  ],
  "Facultad de Ciencias Administrativas": [
    { nombre: "Administración", estado: "En desarrollo" }
  ],
  "Facultad de Ciencias Contables y Financieras": [
    { nombre: "Contabilidad", estado: "En desarrollo" }
  ],
  "Facultad de Economía": [
    { nombre: "Economía", estado: "En desarrollo" }
  ],
  "Facultad de Ciencias de la Salud": [
    { nombre: "Medicina Humana", estado: "En desarrollo" },
    { nombre: "Enfermería", estado: "En desarrollo" },
    { nombre: "Obstetricia", estado: "En desarrollo" },
    { nombre: "Estomatología", estado: "En desarrollo" }
  ],
  "Facultad de Ciencias Sociales y Educación": [
    { nombre: "Educación Inicial", estado: "En desarrollo" },
    { nombre: "Educación Primaria", estado: "En desarrollo" },
    { nombre: "Ciencias de la Comunicación", estado: "En desarrollo" },
    { nombre: "Historia y Geografía", estado: "En desarrollo" },
    { nombre: "Lengua y Literatura", estado: "En desarrollo" }
  ],
  "Facultad de Derecho y Ciencias Políticas": [
    { nombre: "Derecho", estado: "En desarrollo" }
  ],
  "Facultad de Ingeniería Civil": [
    { nombre: "Ingeniería Civil", estado: "En desarrollo" }
  ],
  "Facultad de Arquitectura y Urbanismo": [
    { nombre: "Arquitectura", estado: "En desarrollo" }
  ],
  "Facultad de Ingeniería Pesquera": [
    { nombre: "Ingeniería Pesquera", estado: "En desarrollo" }
  ],
  "Facultad de Zootecnia": [
    { nombre: "Zootecnia", estado: "En desarrollo" },
    { nombre: "Medicina Veterinaria", estado: "En desarrollo" }
  ]
};

export default function GestionFacultades() {
  const { tema } = useTema();

  // Cargar estructura
  const [estructura, setEstructura] = useState(() => {
    const guardado = localStorage.getItem("unpEstructuraAdmin");
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch (e) {
        console.error("Error al parsear estructura admin", e);
      }
    }
    return unpEstructuraInicial;
  });

  // Cargar logotipos guardados independientemente
  const [logos, setLogos] = useState(() => {
    const guardados = localStorage.getItem("unpLogosFacultades");
    if (guardados) {
      try {
        return JSON.parse(guardados);
      } catch (e) {
        console.error("Error al leer logos", e);
      }
    }
    return {};
  });

  const [busqueda, setBusqueda] = useState("");
  const [facultadExpandida, setFacultadExpandida] = useState(null);

  // Modales
  const [modalNuevaFacultad, setModalNuevaFacultad] = useState(false);
  const [nombreNuevaFacultad, setNombreNuevaFacultad] = useState("");

  const [modalNuevaEscuela, setModalNuevaEscuela] = useState(false);
  const [facultadSeleccionada, setFacultadSeleccionada] = useState("");
  const [nombreNuevaEscuela, setNombreNuevaEscuela] = useState("");
  const [estadoNuevaEscuela, setEstadoNuevaEscuela] = useState("En desarrollo");

  // Modal Subir Logo Independiente
  const [modalLogo, setModalLogo] = useState(false);
  const [targetLogoInfo, setTargetLogoInfo] = useState({
    tipo: "Facultad", // "Facultad" | "Carrera"
    nombre: "",
    facultadPadre: "",
    clave: ""
  });
  const [previewLogo, setPreviewLogo] = useState(null);
  const [urlImagenInput, setUrlImagenInput] = useState("");
  const fileInputRef = useRef(null);

  const [mensajeNotificacion, setMensajeNotificacion] = useState(null);

  useEffect(() => {
    localStorage.setItem("unpEstructuraAdmin", JSON.stringify(estructura));
  }, [estructura]);

  useEffect(() => {
    localStorage.setItem("unpLogosFacultades", JSON.stringify(logos));
  }, [logos]);

  const notificar = (texto, tipo = "success") => {
    setMensajeNotificacion({ texto, tipo });
    setTimeout(() => setMensajeNotificacion(null), 3500);
  };

  // Abrir Modal Logo Facultad
  const abrirModalSubirLogoFacultad = (facultadNombre) => {
    const clave = `FACULTAD::${facultadNombre}`;
    setTargetLogoInfo({
      tipo: "Facultad",
      nombre: facultadNombre,
      facultadPadre: facultadNombre,
      clave
    });
    setPreviewLogo(logos[clave] || logos[facultadNombre] || null);
    setUrlImagenInput("");
    setModalLogo(true);
  };

  // Abrir Modal Logo Carrera
  const abrirModalSubirLogoCarrera = (facultadNombre, escuelaNombre) => {
    const clave = `CARRERA::${facultadNombre}::${escuelaNombre}`;
    setTargetLogoInfo({
      tipo: "Carrera",
      nombre: escuelaNombre,
      facultadPadre: facultadNombre,
      clave
    });
    setPreviewLogo(logos[clave] || logos[escuelaNombre] || null);
    setUrlImagenInput("");
    setModalLogo(true);
  };

  const procesarArchivoLogo = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    if (archivo.size > 2 * 1024 * 1024) {
      notificar("La imagen debe ser menor a 2MB.", "error");
      return;
    }

    const lector = new FileReader();
    lector.onload = (ev) => {
      setPreviewLogo(ev.target.result);
      notificar("Imagen cargada en la vista previa.");
    };
    lector.readAsDataURL(archivo);
  };

  // Pegado de imagen desde el Portapapeles (Ctrl + V)
  const manejarPegarClipboard = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const lector = new FileReader();
          lector.onload = (ev) => {
            setPreviewLogo(ev.target.result);
            notificar("¡Imagen pegada desde el portapapeles con éxito!");
          };
          lector.readAsDataURL(blob);
          break;
        }
      }
    }
  };

  // Arrastrar y Soltar (Drag & Drop)
  const manejarDropLogo = (e) => {
    e.preventDefault();
    const archivo = e.dataTransfer.files[0];
    if (archivo && archivo.type.startsWith("image/")) {
      const lector = new FileReader();
      lector.onload = (ev) => {
        setPreviewLogo(ev.target.result);
        notificar("¡Imagen soltada y lista para guardar!");
      };
      lector.readAsDataURL(archivo);
    }
  };

  // Aplicar URL de imagen
  const aplicarUrlImagen = () => {
    if (urlImagenInput.trim()) {
      setPreviewLogo(urlImagenInput.trim());
      setUrlImagenInput("");
      notificar("URL de imagen aplicada a la vista previa.");
    }
  };

  const guardarLogo = () => {
    if (!targetLogoInfo.clave) return;

    setLogos((prev) => ({
      ...prev,
      [targetLogoInfo.clave]: previewLogo
    }));

    setModalLogo(false);
    notificar(`Logotipo de ${targetLogoInfo.tipo} '${targetLogoInfo.nombre}' guardado independientemente.`);
  };

  const eliminarLogoEntidad = (clave) => {
    setLogos((prev) => {
      const copia = { ...prev };
      delete copia[clave];
      // También limpiar llaves antiguas si existían
      delete copia[targetLogoInfo.nombre];
      return copia;
    });
    setPreviewLogo(null);
    notificar(`Logotipo de '${targetLogoInfo.nombre}' restablecido.`);
  };

  // Alternar estado de carrera (Habilitada <-> En desarrollo)
  const alternarEstadoEscuela = (facultadNombre, escuelaNombre) => {
    setEstructura((prev) => {
      const actualizadas = prev[facultadNombre].map((esc) => {
        if (esc.nombre === escuelaNombre) {
          const nuevoEstado = esc.estado === "Habilitada" ? "En desarrollo" : "Habilitada";
          return { ...esc, estado: nuevoEstado };
        }
        return esc;
      });
      return { ...prev, [facultadNombre]: actualizadas };
    });
    notificar(`Estado de '${escuelaNombre}' actualizado.`);
  };

  // Agregar Facultad
  const agregarFacultad = (e) => {
    e.preventDefault();
    if (!nombreNuevaFacultad.trim()) return;

    if (estructura[nombreNuevaFacultad.trim()]) {
      notificar("La facultad ya existe.", "error");
      return;
    }

    setEstructura((prev) => ({
      ...prev,
      [nombreNuevaFacultad.trim()]: []
    }));

    setNombreNuevaFacultad("");
    setModalNuevaFacultad(false);
    notificar(`Facultad '${nombreNuevaFacultad}' creada con éxito.`);
  };

  // Agregar Escuela/Carrera a una Facultad
  const agregarEscuela = (e) => {
    e.preventDefault();
    if (!facultadSeleccionada || !nombreNuevaEscuela.trim()) return;

    setEstructura((prev) => {
      const listaActual = prev[facultadSeleccionada] || [];
      return {
        ...prev,
        [facultadSeleccionada]: [
          ...listaActual,
          { nombre: nombreNuevaEscuela.trim(), estado: estadoNuevaEscuela }
        ]
      };
    });

    setNombreNuevaEscuela("");
    setModalNuevaEscuela(false);
    notificar(`Carrera '${nombreNuevaEscuela}' agregada a ${facultadSeleccionada}.`);
  };

  // Eliminar Facultad
  const eliminarFacultad = (facultadNombre) => {
    if (window.confirm(`¿Estás seguro de eliminar la ${facultadNombre}?`)) {
      setEstructura((prev) => {
        const copia = { ...prev };
        delete copia[facultadNombre];
        return copia;
      });
      notificar(`Facultad eliminada.`);
    }
  };

  // Eliminar Escuela
  const eliminarEscuela = (facultadNombre, escuelaNombre) => {
    if (window.confirm(`¿Eliminar la carrera '${escuelaNombre}'?`)) {
      setEstructura((prev) => ({
        ...prev,
        [facultadNombre]: prev[facultadNombre].filter((e) => e.nombre !== escuelaNombre)
      }));
      notificar(`Carrera '${escuelaNombre}' eliminada.`);
    }
  };

  // Filtrado de facultades por búsqueda
  const facultadesFiltradas = Object.keys(estructura).filter((fac) => {
    const coincideFacultad = fac.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEscuela = estructura[fac].some((esc) =>
      esc.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    return coincideFacultad || coincideEscuela;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Toast de Notificación */}
      {mensajeNotificacion && (
        <div className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-2xl border shadow-xl flex items-center space-x-3 ${
          mensajeNotificacion.tipo === 'error'
            ? 'bg-rose-500 text-white border-rose-600'
            : 'bg-emerald-500 text-white border-emerald-600'
        } animate-fadeIn`}>
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs font-bold">{mensajeNotificacion.texto}</span>
        </div>
      )}

      {/* Hero Banner UNP */}
      <div className={`p-6 sm:p-8 rounded-3xl ${
        tema === 'dark'
          ? 'bg-gradient-to-r from-sky-950 via-slate-900 to-rose-950 border-sky-500/20'
          : 'bg-gradient-to-r from-sky-500/10 via-blue-500/5 to-rose-500/10 border-sky-200'
      } border relative overflow-hidden backdrop-blur-xl shadow-xl space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/20 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Estructura e Insignias Independientes UNP
            </div>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Gestión de Facultades, Escuelas e Insignias
            </h2>
            <p className={`text-xs ${tema === 'dark' ? 'text-slate-300' : 'text-slate-600'} max-w-2xl mt-1`}>
              Administra las 14 facultades de la UNP y sus carreras. Cada facultad y cada carrera posee su propio escudo e insignia totalmente independiente.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setModalNuevaFacultad(true)}
              className="px-4 py-2.5 rounded-xl bg-unp-gradient text-white text-xs font-bold shadow-lg shadow-sky-600/30 flex items-center gap-2 hover:opacity-95 transition-all duration-200"
            >
              <Plus className="w-4 h-4" /> Nueva Facultad
            </button>
          </div>
        </div>
      </div>

      {/* Barra de Filtro y Búsqueda */}
      <div className={`p-4 rounded-2xl ${tema === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'} border flex flex-col sm:flex-row items-center justify-between gap-4`}>
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por facultad o escuela profesional..."
            className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border outline-none transition-all ${
              tema === 'dark'
                ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-sky-500'
                : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-sky-600'
            }`}
          />
        </div>
        <div className={`text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          Mostrando <span className="text-sky-500 font-bold">{facultadesFiltradas.length}</span> facultades
        </div>
      </div>

      {/* Lista de Facultades */}
      <div className="space-y-4">
        {facultadesFiltradas.length === 0 ? (
          <div className={`p-12 text-center rounded-2xl ${tema === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'} border space-y-3`}>
            <Building2 className="w-10 h-10 text-slate-500 mx-auto" />
            <p className={`text-sm font-semibold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              No se encontraron facultades ni carreras coincidentes.
            </p>
          </div>
        ) : (
          facultadesFiltradas.map((facultadNombre) => {
            const escuelas = estructura[facultadNombre];
            const estaExpandida = facultadExpandida === facultadNombre || busqueda.length > 0;
            const habilitadasCount = escuelas.filter((e) => e.estado === "Habilitada").length;

            // Logo EXCLUSIVO de la Facultad
            const logoFacultad = logos[`FACULTAD::${facultadNombre}`] || logos[facultadNombre];

            return (
              <div
                key={facultadNombre}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  tema === 'dark'
                    ? 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Header de la Facultad */}
                <div
                  onClick={() => setFacultadExpandida(estaExpandida ? null : facultadNombre)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-4">
                    {/* Logotipo EXCLUSIVO de Facultad */}
                    <div className="relative group/logo">
                      <div className="w-14 h-14 rounded-2xl bg-white p-1.5 border border-sky-500/30 flex items-center justify-center shadow-md ring-2 ring-sky-400/20 shrink-0 overflow-hidden">
                        <img
                          src={logoFacultad || "/logo-unp.png"}
                          alt={facultadNombre}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          abrirModalSubirLogoFacultad(facultadNombre);
                        }}
                        className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-sky-600 text-white shadow-lg opacity-90 group-hover/logo:opacity-100 hover:scale-110 transition-all"
                        title="Subir Logo Exclusivo de Facultad"
                      >
                        <Upload className="w-3 h-3" />
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/10 text-sky-500 border border-sky-500/20">
                          Facultad
                        </span>
                      </div>
                      <h3 className={`font-black text-base md:text-lg mt-0.5 ${tema === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {facultadNombre}
                      </h3>
                      <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-medium`}>
                        {escuelas.length} Escuelas Profesionales ({habilitadasCount} Habilitadas)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end md:self-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        abrirModalSubirLogoFacultad(facultadNombre);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20 hover:bg-sky-500 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <ImageIcon className="w-3.5 h-3.5" /> Logo Facultad
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFacultadSeleccionada(facultadNombre);
                        setModalNuevaEscuela(true);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 hover:bg-indigo-500 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Agregar Carrera
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        eliminarFacultad(facultadNombre);
                      }}
                      className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 transition-all"
                      title="Eliminar Facultad"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className={`p-1.5 rounded-xl ${tema === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
                      {estaExpandida ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>
                </div>

                {/* Sub-lista de Escuelas / Carreras Profesionales */}
                {estaExpandida && (
                  <div className={`px-5 pb-5 pt-3 border-t ${tema === 'dark' ? 'border-slate-800/80 bg-slate-950/40' : 'border-slate-100 bg-slate-50/60'} grid grid-cols-1 md:grid-cols-2 gap-3`}>
                    {escuelas.length === 0 ? (
                      <p className="text-xs text-slate-400 italic py-2">Sin escuelas registradas en esta facultad.</p>
                    ) : (
                      escuelas.map((escuela) => {
                        const esHabilitada = escuela.estado === "Habilitada";
                        
                        // Logo INDEPENDIENTE de la Carrera
                        const logoCarrera = logos[`CARRERA::${facultadNombre}::${escuela.nombre}`] || logos[escuela.nombre];

                        return (
                          <div
                            key={escuela.nombre}
                            className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                              tema === 'dark'
                                ? 'bg-slate-900 border-slate-800'
                                : 'bg-white border-slate-200 shadow-sm'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              {/* Insignia INDEPENDIENTE de la Carrera */}
                              <div className="relative group/carrera">
                                <div className="w-11 h-11 rounded-xl bg-white p-1 border border-indigo-500/30 flex items-center justify-center overflow-hidden shrink-0 shadow-md ring-2 ring-indigo-400/10">
                                  <img
                                    src={logoCarrera || "/logo-unp.png"}
                                    alt={escuela.nombre}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <button
                                  onClick={() => abrirModalSubirLogoCarrera(facultadNombre, escuela.nombre)}
                                  className="absolute -bottom-1 -right-1 p-1 rounded-md bg-indigo-600 text-white shadow hover:scale-110 transition-transform"
                                  title="Subir Logo Exclusivo de la Carrera"
                                >
                                  <Upload className="w-2.5 h-2.5" />
                                </button>
                              </div>

                              <div>
                                <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-400">
                                  Carrera / Escuela
                                </span>
                                <span className={`text-xs font-bold block ${tema === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                                  {escuela.nombre}
                                </span>
                                <span className={`inline-flex items-center gap-1 text-[10px] font-bold mt-0.5 ${
                                  esHabilitada ? 'text-emerald-500' : 'text-amber-500'
                                }`}>
                                  {esHabilitada ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                  {escuela.estado}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => abrirModalSubirLogoCarrera(facultadNombre, escuela.nombre)}
                                className="px-2 py-1 rounded-lg text-indigo-400 hover:bg-indigo-500/10 text-[11px] font-semibold transition-colors flex items-center gap-1"
                                title="Subir o cambiar logo de la carrera"
                              >
                                <ImageIcon className="w-3 h-3" /> Logo
                              </button>
                              <button
                                onClick={() => alternarEstadoEscuela(facultadNombre, escuela.nombre)}
                                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all ${
                                  esHabilitada
                                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500 hover:text-white'
                                    : 'bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500 hover:text-white'
                                }`}
                              >
                                {esHabilitada ? "Deshabilitar" : "Habilitar"}
                              </button>
                              <button
                                onClick={() => eliminarEscuela(facultadNombre, escuela.nombre)}
                                className="p-1 rounded-lg text-rose-500 hover:bg-rose-500/10"
                                title="Eliminar Carrera"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal Subir / Gestionar Logotipo Independiente */}
      {modalLogo && (
        <div
          onPaste={manejarPegarClipboard}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl ${
            tema === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          } animate-fadeIn space-y-4`}>
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                  targetLogoInfo.tipo === 'Facultad'
                    ? 'bg-sky-500/10 text-sky-500 border border-sky-500/20'
                    : 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'
                }`}>
                  Logo de {targetLogoInfo.tipo}
                </span>
                <h3 className="text-base font-bold flex items-center gap-2 mt-1">
                  <ImageIcon className="w-5 h-5 text-sky-500" /> {targetLogoInfo.nombre}
                </h3>
                {targetLogoInfo.tipo === 'Carrera' && (
                  <p className="text-[11px] text-slate-400 font-medium">
                    Facultad: {targetLogoInfo.facultadPadre}
                  </p>
                )}
              </div>
              <button onClick={() => setModalLogo(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Zona de Arrastrar/Soltar & Previsualización */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={manejarDropLogo}
              tabIndex={0}
              className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-sky-500/40 bg-sky-500/5 hover:bg-sky-500/10 transition-colors space-y-3 outline-none group cursor-pointer"
            >
              <div className="w-28 h-28 rounded-2xl bg-white p-2 border border-slate-200 shadow-xl flex items-center justify-center overflow-hidden ring-4 ring-sky-500/20 group-hover:scale-105 transition-transform">
                <img
                  src={previewLogo || "/logo-unp.png"}
                  alt="Vista previa del logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={procesarArchivoLogo}
                className="hidden"
              />

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold shadow-md shadow-sky-600/30 flex items-center gap-1.5 hover:bg-sky-700 transition-all"
                >
                  <Upload className="w-3.5 h-3.5" /> Seleccionar Archivo
                </button>

                {previewLogo && (
                  <button
                    type="button"
                    onClick={() => eliminarLogoEntidad(targetLogoInfo.clave)}
                    className="p-2 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white text-xs font-bold transition-all"
                    title="Restablecer a logo predeterminado"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="text-[11px] font-bold text-sky-400 flex items-center gap-1.5">
                <Clipboard className="w-3.5 h-3.5 text-sky-400" /> Presiona <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[10px]">Ctrl + V</kbd> aquí para pegar cualquier imagen
              </div>
            </div>

            {/* Campo para Pegar URL Directa */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-sky-500" /> O Pega la URL directa de la imagen
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="https://ejemplo.com/escudo.png"
                  value={urlImagenInput}
                  onChange={(e) => setUrlImagenInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      aplicarUrlImagen();
                    }
                  }}
                  className={`flex-1 p-2.5 text-xs rounded-xl border outline-none ${
                    tema === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={aplicarUrlImagen}
                  className="px-3.5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md hover:bg-indigo-700 transition-all shrink-0"
                >
                  Cargar URL
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setModalLogo(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-400 hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={guardarLogo}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-unp-gradient text-white hover:opacity-95 shadow-lg shadow-sky-600/30"
              >
                Guardar Logotipo {targetLogoInfo.tipo}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Modal Nueva Facultad */}
      {modalNuevaFacultad && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl ${
            tema === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          } animate-fadeIn`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Building2 className="w-5 h-5 text-sky-500" /> Crear Nueva Facultad
              </h3>
              <button onClick={() => setModalNuevaFacultad(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={agregarFacultad} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Nombre de la Facultad
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Facultad de Ciencias de la Computación"
                  value={nombreNuevaFacultad}
                  onChange={(e) => setNombreNuevaFacultad(e.target.value)}
                  className={`w-full p-3 text-xs rounded-xl border outline-none ${
                    tema === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalNuevaFacultad(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-400 hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-unp-gradient text-white shadow-lg shadow-sky-600/30"
                >
                  Crear Facultad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Nueva Escuela */}
      {modalNuevaEscuela && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl ${
            tema === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          } animate-fadeIn`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-500" /> Nueva Carrera en {facultadSeleccionada}
              </h3>
              <button onClick={() => setModalNuevaEscuela(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={agregarEscuela} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Nombre de la Carrera / Escuela
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ingeniería en Inteligencia Artificial"
                  value={nombreNuevaEscuela}
                  onChange={(e) => setNombreNuevaEscuela(e.target.value)}
                  className={`w-full p-3 text-xs rounded-xl border outline-none ${
                    tema === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Estado Inicial
                </label>
                <select
                  value={estadoNuevaEscuela}
                  onChange={(e) => setEstadoNuevaEscuela(e.target.value)}
                  className={`w-full p-3 text-xs rounded-xl border outline-none ${
                    tema === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Habilitada">Habilitada</option>
                  <option value="En desarrollo">En desarrollo</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalNuevaEscuela(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-400 hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/30"
                >
                  Agregar Carrera
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
