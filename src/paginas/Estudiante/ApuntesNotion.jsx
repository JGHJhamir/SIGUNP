import React, { useState } from "react";
import {
  FileText,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  Code,
  Eye,
  Edit3,
  Download,
  Sparkles,
  SaveCheck,
  Search
} from "lucide-react";

const cursosPorDefecto = [
  { id: "FIS-301", nombre: "Física I", codigo: "FI2410" },
  { id: "MAT-102", nombre: "Álgebra Lineal", codigo: "MA2333" },
  { id: "INF-201", nombre: "Algoritmos", codigo: "SI1447" },
  { id: "MAT-201", nombre: "Cálculo II", codigo: "MA2441" },
  { id: "INF-301", nombre: "Estructura de Datos", codigo: "SI2418" },
  { id: "INF-401", nombre: "Base de Datos", codigo: "SI3420" }
];

export default function ApuntesNotion() {
  const [cursoActivo, setCursoActivo] = useState(cursosPorDefecto[0].id);
  const [modoVista, setModoVista] = useState("editor"); // 'editor' | 'previsualizar'
  const [busqueda, setBusqueda] = useState("");

  const [notas, setNotas] = useState({
    "FIS-301": "# Apuntes de Física I\n\n## Tema 1: Vectores y Cinemática\nLos vectores son magnitudes que poseen módulo, dirección y sentido.\n\n- **Ejemplos:** Fuerza, velocidad, aceleración.\n- **Leyes de Newton:**\n  1. Primera Ley: Inercia\n  2. Segunda Ley: F = m * a\n  3. Tercera Ley: Acción y Reacción.",
    "MAT-102": "# Apuntes de Álgebra Lineal\n\n## Tema 1: Matrices y Determinantes\nUna matriz es un arreglo bidimensional de números organizados en filas y columnas.\n\n```python\n# Ejemplo de multiplicación matricial\nimport numpy as np\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[5, 6], [7, 8]])\nprint(A @ B)\n```",
    "INF-201": "# Apuntes de Algoritmos\n\n## Tema 1: Complejidad Temporal (Big O)\nMedimos el tiempo de ejecución en función de la entrada `N`:\n\n- `O(1)`: Tiempo Constante\n- `O(log N)`: Búsqueda Binaria\n- `O(N)`: Recorrido Simple\n- `O(N log N)`: QuickSort / MergeSort",
    "MAT-201": "# Apuntes de Cálculo II\n\n## Tema 1: Integrales Indefinidas\nMétodos principales:\n1. Sustitución Algebraica\n2. Integración por Partes: `∫ u dv = u v - ∫ v du`\n3. Fracciones Parciales.",
    "INF-301": "# Apuntes de Estructura de Datos\n\n## Tema 1: Árboles Binarios de Búsqueda (BST)\nPropiedades:\n- El hijo izquierdo es menor que la raíz.\n- El hijo derecho es mayor que la raíz.\n- Recorridos: In-Order, Pre-Order, Post-Order.",
    "INF-401": "# Apuntes de Base de Datos\n\n## Tema 1: Modelo Relacional y SQL\nSentencias fundamentales:\n`SELECT nombre, ciclo FROM estudiantes WHERE promedio >= 14;`"
  });

  const manejarCambioTexto = (e) => {
    const texto = e.target.value;
    setNotas((prev) => ({
      ...prev,
      [cursoActivo]: texto
    }));
  };

  const insertarFormato = (simboloInicio, simboloFin = "") => {
    const textarea = document.getElementById("notion-editor-textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const textoActual = notas[cursoActivo] || "";

    const seleccion = textoActual.substring(start, end);
    const nuevoTexto =
      textoActual.substring(0, start) +
      simboloInicio +
      (seleccion || "texto") +
      simboloFin +
      textoActual.substring(end);

    setNotas((prev) => ({
      ...prev,
      [cursoActivo]: nuevoTexto
    }));
  };

  const exportarNota = () => {
    const contenido = notas[cursoActivo] || "";
    const blob = new Blob([contenido], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Apuntes_${cursoActivo}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const cursoActivoDetalles = cursosPorDefecto.find((c) => c.id === cursoActivo);

  const cursosFiltrados = cursosPorDefecto.filter(
    (c) =>
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.id.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl p-6 shadow-sm dark:shadow-xl backdrop-blur-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors">
        <div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ESPACIO DE TRABAJO ESTILO NOTION</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Cuaderno de Apuntes
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
            Organiza tus notas de clase por asignatura con editor Markdown y guardado automático.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={exportarNota}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-extrabold rounded-2xl border border-slate-200 dark:border-slate-700 transition-all flex items-center space-x-2 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Exportar (.md)</span>
          </button>
        </div>
      </div>

      {/* Grid de Dos Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

        {/* Columna Izquierda: Cursos */}
        <div className="lg:col-span-1 space-y-3.5">

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar curso..."
              className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-semibold text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 shadow-xs"
            />
          </div>

          <div className="bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 p-3 rounded-3xl shadow-sm dark:shadow-xl flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible backdrop-blur-2xl transition-colors">
            {cursosFiltrados.map((curso) => {
              const esActivo = curso.id === cursoActivo;
              return (
                <button
                  key={curso.id}
                  type="button"
                  onClick={() => setCursoActivo(curso.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${esActivo
                    ? "bg-sky-600 dark:bg-gradient-to-r dark:from-sky-600 dark:to-blue-600 text-white shadow-md shadow-sky-600/20 font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  style={{ width: "auto", minWidth: "160px" }}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono opacity-80 mb-0.5 font-bold">
                    <span>{curso.id}</span>
                    <span className="text-[9px] bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/60 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300 font-semibold">{curso.codigo}</span>
                  </div>
                  <div className="font-extrabold leading-tight truncate">{curso.nombre}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Columna Derecha: Editor Notion */}
        <div className="lg:col-span-3 flex flex-col space-y-3.5 h-[580px]">

          <div className="flex-1 bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl shadow-sm dark:shadow-xl overflow-hidden flex flex-col backdrop-blur-2xl transition-colors">

            {/* Cabecera del Editor con Toolbar Markdown */}
            <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950/70">

              <div className="flex items-center space-x-3 text-xs">
                <span className="font-black text-slate-900 dark:text-white flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>{cursoActivoDetalles?.nombre}</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                  <SaveCheck className="w-3 h-3" />
                  <span>Guardado Local</span>
                </span>
              </div>

              {/* Botones de Formato Markdown & Selector de Modo */}
              <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => insertarFormato("**", "**")}
                  title="Negrita"
                  className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertarFormato("*", "*")}
                  title="Cursiva"
                  className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertarFormato("# ")}
                  title="Título 1"
                  className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Heading1 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertarFormato("## ")}
                  title="Título 2"
                  className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Heading2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertarFormato("- ")}
                  title="Lista"
                  className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertarFormato("`", "`")}
                  title="Código"
                  className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Code className="w-3.5 h-3.5" />
                </button>

                <div className="w-px h-4 bg-slate-300 dark:bg-slate-800 mx-1"></div>

                {/* Alternar Modo Editor / Previsualización */}
                <button
                  type="button"
                  onClick={() => setModoVista(modoVista === "editor" ? "previsualizar" : "editor")}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer ${modoVista === "previsualizar"
                    ? "bg-sky-600 text-white shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                >
                  {modoVista === "editor" ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Vista Previa</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editor</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Contenido del Editor o Vista Previa */}
            {modoVista === "editor" ? (
              <textarea
                id="notion-editor-textarea"
                value={notas[cursoActivo] || ""}
                onChange={manejarCambioTexto}
                placeholder="Escribe tus apuntes en formato Markdown aquí..."
                className="flex-1 w-full p-6 text-xs text-slate-800 dark:text-slate-200 focus:outline-none resize-none font-mono leading-relaxed bg-white dark:bg-slate-950/70 placeholder-slate-400 dark:placeholder-slate-600 transition-colors"
              />
            ) : (
              <div className="flex-1 w-full p-6 text-xs text-slate-800 dark:text-slate-200 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/80 font-sans leading-relaxed space-y-3 max-w-none transition-colors">
                {notas[cursoActivo] ? (
                  notas[cursoActivo].split("\n").map((linea, idx) => {
                    if (linea.startsWith("# ")) {
                      return <h1 key={idx} className="text-xl font-black text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 mt-4">{linea.replace("# ", "")}</h1>;
                    }
                    if (linea.startsWith("## ")) {
                      return <h2 key={idx} className="text-base font-extrabold text-sky-600 dark:text-sky-400 mt-3">{linea.replace("## ", "")}</h2>;
                    }
                    if (linea.startsWith("- ")) {
                      return <li key={idx} className="ml-4 list-disc text-slate-700 dark:text-slate-300 text-xs font-medium">{linea.replace("- ", "")}</li>;
                    }
                    if (linea.startsWith("```")) {
                      return <div key={idx} className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl font-mono text-xs text-sky-700 dark:text-sky-300"><code>{linea.replace(/```/g, "")}</code></div>;
                    }
                    if (!linea.trim()) return <div key={idx} className="h-2"></div>;
                    return <p key={idx} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{linea}</p>;
                  })
                ) : (
                  <p className="text-slate-400 dark:text-slate-500 italic text-xs">Sin apuntes escritos para este curso.</p>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
