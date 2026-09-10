import React, { useState, useEffect } from "react";
import {
  UserPlus,
  Search,
  ShieldCheck,
  GraduationCap,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  Filter,
  RefreshCw
} from "lucide-react";
import { useTema } from "../../contexto/ContextoTema";
import { supabase } from "../../lib/supabase";

// Usuarios demo iniciales para rellenar la tabla
const usuariosIniciales = [
  {
    codigo_universitario: "0512021015",
    nombres: "Jhamir Walverdir",
    apellidos: "Garcia Herrera",
    facultad: "Facultad de Ingeniería Industrial",
    escuela: "Ingeniería Informática",
    rol: "Administrador",
    estado: "Activo"
  },
  {
    codigo_universitario: "0512021001",
    nombres: "Carlos Alberto",
    apellidos: "Mendoza Ruiz",
    facultad: "Facultad de Ingeniería Industrial",
    escuela: "Ingeniería Informática",
    rol: "Estudiante",
    estado: "Activo"
  },
  {
    codigo_universitario: "0512021045",
    nombres: "María Fernanda",
    apellidos: "Paredes Castillo",
    facultad: "Facultad de Ingeniería Industrial",
    escuela: "Ingeniería Informática",
    rol: "Estudiante",
    estado: "Activo"
  },
  {
    codigo_universitario: "1002018090",
    nombres: "Dr. Roberto",
    apellidos: "Gomez Farfán",
    facultad: "Facultad de Ingeniería Industrial",
    escuela: "Ingeniería Informática",
    rol: "Docente",
    estado: "Activo"
  },
  {
    codigo_universitario: "0512021088",
    nombres: "Ana Sofía",
    apellidos: "Vargas Llosa",
    facultad: "Facultad de Ciencias",
    escuela: "Estadística",
    rol: "Estudiante",
    estado: "Inactivo"
  }
];

export default function GestionUsuarios() {
  const { tema } = useTema();

  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem("unpUsuariosAdmin");
    if (guardados) {
      try {
        return JSON.parse(guardados);
      } catch (e) {
        console.error("Error al leer usuarios locales", e);
      }
    }
    return usuariosIniciales;
  });

  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("Todos");
  const [cargandoSupabase, setCargandoSupabase] = useState(false);

  // Estados para Modales
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  // Formulario Nuevo Usuario
  const [formNuevo, setFormNuevo] = useState({
    codigo_universitario: "",
    nombres: "",
    apellidos: "",
    facultad: "Facultad de Ingeniería Industrial",
    escuela: "Ingeniería Informática",
    rol: "Estudiante",
    estado: "Activo"
  });

  const [notificacion, setNotificacion] = useState(null);

  // Cargar usuarios reales de Supabase al montar
  useEffect(() => {
    cargarUsuariosDesdeSupabase();
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("unpUsuariosAdmin", JSON.stringify(usuarios));
  }, [usuarios]);

  const mostrarNotificacion = (texto, tipo = "success") => {
    setNotificacion({ texto, tipo });
    setTimeout(() => setNotificacion(null), 3500);
  };

  const cargarUsuariosDesdeSupabase = async () => {
    setCargandoSupabase(true);
    try {
      const { data, error } = await supabase
        .from("estudiantes")
        .select("*");

      if (data && data.length > 0) {
        // Mezclar datos de Supabase asegurando campos requeridos
        const formateados = data.map((u) => ({
          codigo_universitario: u.codigo_universitario,
          nombres: u.nombres || "",
          apellidos: u.apellidos || "",
          facultad: u.facultad || "Facultad de Ingeniería Industrial",
          escuela: u.escuela || "Ingeniería Informática",
          rol: u.rol || "Estudiante",
          estado: "Activo"
        }));

        // Combinar con los existentes sin duplicados por codigo
        setUsuarios((prev) => {
          const mapa = new Map();
          [...prev, ...formateados].forEach((item) => {
            mapa.set(item.codigo_universitario, item);
          });
          return Array.from(mapa.values());
        });
      }
    } catch (err) {
      console.warn("Aviso al consultar Supabase:", err);
    } finally {
      setCargandoSupabase(false);
    }
  };

  // Guardar Nuevo Usuario
  const manejarCrearUsuario = async (e) => {
    e.preventDefault();

    const codigo = formNuevo.codigo_universitario.trim();
    if (codigo.length !== 10) {
      mostrarNotificacion("El código debe tener exactamente 10 dígitos.", "error");
      return;
    }

    if (usuarios.some((u) => u.codigo_universitario === codigo)) {
      mostrarNotificacion("Ya existe un usuario registrado con este código.", "error");
      return;
    }

    const nuevoObj = {
      ...formNuevo,
      codigo_universitario: codigo,
      nombres: formNuevo.nombres.trim(),
      apellidos: formNuevo.apellidos.trim()
    };

    // 1. Guardar en estado local
    setUsuarios((prev) => [nuevoObj, ...prev]);

    // 2. Intentar guardar en Supabase
    try {
      await supabase.from("estudiantes").upsert(
        {
          codigo_universitario: codigo,
          nombres: nuevoObj.nombres,
          apellidos: nuevoObj.apellidos,
          facultad: nuevoObj.facultad,
          escuela: nuevoObj.escuela,
          rol: nuevoObj.rol
        },
        { onConflict: "codigo_universitario" }
      );
    } catch (err) {
      console.warn("Aviso Supabase:", err);
    }

    setModalCrear(false);
    setFormNuevo({
      codigo_universitario: "",
      nombres: "",
      apellidos: "",
      facultad: "Facultad de Ingeniería Industrial",
      escuela: "Ingeniería Informática",
      rol: "Estudiante",
      estado: "Activo"
    });
    mostrarNotificacion(`Usuario ${codigo} registrado correctamente.`);
  };

  // Guardar Cambios Editar Usuario
  const manejarEditarUsuario = async (e) => {
    e.preventDefault();
    if (!usuarioEditar) return;

    setUsuarios((prev) =>
      prev.map((u) =>
        u.codigo_universitario === usuarioEditar.codigo_universitario ? usuarioEditar : u
      )
    );

    try {
      await supabase.from("estudiantes").upsert(
        {
          codigo_universitario: usuarioEditar.codigo_universitario,
          nombres: usuarioEditar.nombres,
          apellidos: usuarioEditar.apellidos,
          facultad: usuarioEditar.facultad,
          escuela: usuarioEditar.escuela,
          rol: usuarioEditar.rol
        },
        { onConflict: "codigo_universitario" }
      );
    } catch (err) {
      console.warn("Aviso Supabase edit:", err);
    }

    setModalEditar(false);
    setUsuarioEditar(null);
    mostrarNotificacion(`Datos de ${usuarioEditar.nombres} actualizados.`);
  };

  // Eliminar Usuario
  const eliminarUsuario = (codigo) => {
    if (window.confirm(`¿Eliminar usuario con código ${codigo}?`)) {
      setUsuarios((prev) => prev.filter((u) => u.codigo_universitario !== codigo));
      mostrarNotificacion(`Usuario ${codigo} eliminado.`);
    }
  };

  // Filtrar Usuarios
  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideRol = filtroRol === "Todos" || u.rol === filtroRol;
    const q = busqueda.toLowerCase();
    const coincideBusqueda =
      u.codigo_universitario.toLowerCase().includes(q) ||
      u.nombres.toLowerCase().includes(q) ||
      u.apellidos.toLowerCase().includes(q) ||
      u.facultad.toLowerCase().includes(q) ||
      u.escuela.toLowerCase().includes(q);
    return coincideRol && coincideBusqueda;
  });

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
            Gestión de Usuarios y Accesos
          </h2>
          <p className={`text-xs ${tema === 'dark' ? 'text-slate-400' : 'text-slate-600'} mt-1`}>
            Administra los roles, permisos y credenciales de estudiantes, docentes y superusuarios del sistema.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={cargarUsuariosDesdeSupabase}
            disabled={cargandoSupabase}
            className={`p-2.5 rounded-xl border transition-all ${
              tema === 'dark'
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="Sincronizar con Supabase"
          >
            <RefreshCw className={`w-4 h-4 ${cargandoSupabase ? 'animate-spin text-purple-500' : ''}`} />
          </button>
          <button
            onClick={() => setModalCrear(true)}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all duration-200"
          >
            <UserPlus className="w-4 h-4" /> Crear Usuario
          </button>
        </div>
      </div>

      {/* Filtros y Buscador */}
      <div className={`p-4 rounded-2xl ${tema === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'} border flex flex-col md:flex-row items-center justify-between gap-4`}>
        
        {/* Buscador */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por código, nombres, apellidos o carrera..."
            className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border outline-none transition-all ${
              tema === 'dark'
                ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-purple-500'
                : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-600'
            }`}
          />
        </div>

        {/* Badges Filtro por Rol */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto">
          <span className={`text-xs font-semibold ${tema === 'dark' ? 'text-slate-400' : 'text-slate-500'} flex items-center gap-1`}>
            <Filter className="w-3.5 h-3.5" /> Rol:
          </span>
          {["Todos", "Estudiante", "Docente", "Administrador"].map((rol) => (
            <button
              key={rol}
              onClick={() => setFiltroRol(rol)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filtroRol === rol
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : tema === 'dark'
                    ? "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
                    : "bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              {rol}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla Ejecutiva de Usuarios */}
      <div className={`rounded-2xl border overflow-hidden ${
        tema === 'dark' ? 'bg-slate-900/80 border-slate-800/80' : 'bg-white border-slate-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`border-b ${
              tema === 'dark' ? 'bg-slate-950/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
            } uppercase font-bold tracking-wider`}>
              <tr>
                <th className="p-4">Usuario / Código</th>
                <th className="p-4">Nombres y Apellidos</th>
                <th className="p-4">Facultad y Escuela</th>
                <th className="p-4">Rol</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400 font-semibold">
                    No hay usuarios que coincidan con la búsqueda o filtro seleccionados.
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((user) => {
                  const esAdmin = user.rol === "Administrador";
                  const esDocente = user.rol === "Docente";

                  return (
                    <tr
                      key={user.codigo_universitario}
                      className={`transition-colors ${
                        tema === 'dark' ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="p-4 font-mono font-bold">
                        <div className="flex items-center space-x-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${
                            esAdmin
                              ? "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                              : esDocente
                                ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                                : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          }`}>
                            {user.nombres.charAt(0)}
                          </div>
                          <span>{user.codigo_universitario}</span>
                        </div>
                      </td>

                      <td className="p-4 font-semibold">
                        <span className={tema === 'dark' ? 'text-slate-100' : 'text-slate-900'}>
                          {user.nombres} {user.apellidos}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="space-y-0.5">
                          <span className={`block font-semibold ${tema === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                            {user.escuela}
                          </span>
                          <span className={`text-[10px] block ${tema === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                            {user.facultad}
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          esAdmin
                            ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                            : esDocente
                              ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                              : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                        }`}>
                          {esAdmin ? <ShieldCheck className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                          {user.rol}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                          user.estado === 'Activo' ? 'text-emerald-500' : 'text-rose-500'
                        }`}>
                          {user.estado === 'Activo' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {user.estado}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setUsuarioEditar(user);
                              setModalEditar(true);
                            }}
                            className="p-1.5 rounded-lg text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                            title="Editar Usuario"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => eliminarUsuario(user.codigo_universitario)}
                            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Eliminar Usuario"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Crear Usuario */}
      {modalCrear && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl ${
            tema === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          } animate-fadeIn`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-purple-500" /> Registrar Nuevo Usuario
              </h3>
              <button onClick={() => setModalCrear(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={manejarCrearUsuario} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Código Universitario (10 dígitos)
                </label>
                <input
                  type="text"
                  maxLength={10}
                  required
                  placeholder="Ej. 0512021099"
                  value={formNuevo.codigo_universitario}
                  onChange={(e) => setFormNuevo({ ...formNuevo, codigo_universitario: e.target.value })}
                  className={`w-full p-2.5 text-xs font-mono rounded-xl border outline-none ${
                    tema === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Nombres
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Carlos"
                    value={formNuevo.nombres}
                    onChange={(e) => setFormNuevo({ ...formNuevo, nombres: e.target.value })}
                    className={`w-full p-2.5 text-xs rounded-xl border outline-none ${
                      tema === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Perez Castro"
                    value={formNuevo.apellidos}
                    onChange={(e) => setFormNuevo({ ...formNuevo, apellidos: e.target.value })}
                    className={`w-full p-2.5 text-xs rounded-xl border outline-none ${
                      tema === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Facultad
                  </label>
                  <input
                    type="text"
                    required
                    value={formNuevo.facultad}
                    onChange={(e) => setFormNuevo({ ...formNuevo, facultad: e.target.value })}
                    className={`w-full p-2.5 text-xs rounded-xl border outline-none ${
                      tema === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Escuela Profesional
                  </label>
                  <input
                    type="text"
                    required
                    value={formNuevo.escuela}
                    onChange={(e) => setFormNuevo({ ...formNuevo, escuela: e.target.value })}
                    className={`w-full p-2.5 text-xs rounded-xl border outline-none ${
                      tema === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Rol del Usuario
                </label>
                <select
                  value={formNuevo.rol}
                  onChange={(e) => setFormNuevo({ ...formNuevo, rol: e.target.value })}
                  className={`w-full p-2.5 text-xs rounded-xl border outline-none ${
                    tema === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Estudiante">Estudiante</option>
                  <option value="Docente">Docente</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalCrear(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-400 hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/30"
                >
                  Guardar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Editar Usuario */}
      {modalEditar && usuarioEditar && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl ${
            tema === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          } animate-fadeIn`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Edit className="w-5 h-5 text-indigo-500" /> Editar Usuario: {usuarioEditar.codigo_universitario}
              </h3>
              <button onClick={() => setModalEditar(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={manejarEditarUsuario} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Nombres
                  </label>
                  <input
                    type="text"
                    required
                    value={usuarioEditar.nombres}
                    onChange={(e) => setUsuarioEditar({ ...usuarioEditar, nombres: e.target.value })}
                    className={`w-full p-2.5 text-xs rounded-xl border outline-none ${
                      tema === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    required
                    value={usuarioEditar.apellidos}
                    onChange={(e) => setUsuarioEditar({ ...usuarioEditar, apellidos: e.target.value })}
                    className={`w-full p-2.5 text-xs rounded-xl border outline-none ${
                      tema === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Rol
                  </label>
                  <select
                    value={usuarioEditar.rol}
                    onChange={(e) => setUsuarioEditar({ ...usuarioEditar, rol: e.target.value })}
                    className={`w-full p-2.5 text-xs rounded-xl border outline-none ${
                      tema === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Estudiante">Estudiante</option>
                    <option value="Docente">Docente</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Estado
                  </label>
                  <select
                    value={usuarioEditar.estado}
                    onChange={(e) => setUsuarioEditar({ ...usuarioEditar, estado: e.target.value })}
                    className={`w-full p-2.5 text-xs rounded-xl border outline-none ${
                      tema === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalEditar(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-400 hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/30"
                >
                  Actualizar Datos
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
