# Resumen de Cambios: Eliminación Total de Cursos Electivos

Se han eliminado completamente los cursos electivos y todas sus menciones, tarjetas de métricas y filtros del portal del estudiante, adaptando la plataforma para trabajar exclusivamente con los **63 cursos obligatorios** de la carrera de Ingeniería Informática (**205 Créditos Totales**).

---

## 🛠️ Cambios Realizados por Archivo

### 1. [`MallaCurricular.jsx`](file:///c:/Proyecto%20SIGJIAR/src/paginas/Estudiante/MallaCurricular.jsx)
- Se removieron los 17 elementos electivos del arreglo `planEstudios`.
- Se conservan estrictamente los 63 cursos obligatorios distribuidos en la rejilla gráfica interactiva de 10 filas x 8 columnas del Plan 2018-1 de la UNP.
- Se actualizaron las tarjetas de métricas en la parte superior a 3 tarjetas limpias:
  - **Asignaturas**: Cursos Aprobados / 63 Obligatorios.
  - **Créditos**: Créditos Aprobados / 205 CR Totales.
  - **Progreso Carrera**: Porcentaje exacto basado en 205 CR.
- Se eliminó el texto y filtros del panel de inspección lateral referentes a electivos.

### 2. [`InicioEstudiante.jsx`](file:///c:/Proyecto%20SIGJIAR/src/paginas/Estudiante/InicioEstudiante.jsx)
- Se removió la variable `ELECTIVOS_SET` y los cálculos de créditos electivos.
- Se actualizaron las métricas del panel principal a 3 tarjetas esenciales:
  - **Créditos Aprobados**: X / 205 CR.
  - **Cursos Obligatorios**: X / 63.
  - **Ciclo Estimado**: Basado en el último ciclo obligatorio con asignaturas aprobadas.

### 3. [`SimuladorSemestres.jsx`](file:///c:/Proyecto%20SIGJIAR/src/paginas/Estudiante/SimuladorSemestres.jsx)
- Se eliminaron los cursos electivos del plan de estudios del simulador.
- Se desataron las etiquetas y badges de `⚡ ELECTIVO` en la renderización de tarjetas de asignaturas.

### 4. [`Matricula.jsx`](file:///c:/Proyecto%20SIGJIAR/src/paginas/Estudiante/Matricula.jsx)
- Se eliminó `ELECTIVOS_SET` y las insignias de electivos en el catálogo de oferta académica.
- Todos los cursos del catálogo habilitado ahora corresponden a asignaturas obligatorias con prerrequisitos cumplidos.

### 5. [`ConfiguracionInicial.jsx`](file:///c:/Proyecto%20SIGJIAR/src/paginas/ConfiguracionInicial.jsx)
- Se eliminó la 11ª pestaña dedicada `"⚡ Cursos Electivos"` del setup inicial.
- Se ajustaron las pestañas a exactamente 10 (Ciclos I al X).
- El botón final del Ciclo X permite directo: **"Confirmar e Iniciar Módulos"**.

---

## 🚀 Verificación y Despliegue

1. **Compilación Local (`npm run build`)**: Exitoso (0 errores de sintaxis o imports).
2. **Git Commit & Push**: Subido a `origin/main` (commit `a6bbf0b`).
3. **Despliegue Vercel**: Actualizado en producción en [`https://sigunp.vercel.app`](https://sigunp.vercel.app).
