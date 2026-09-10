# 🏛️ SIGUNP — Sistema Integral de Gestión
### Universidad Nacional de Piura (UNP)

<p align="center">
  <img src="public/sigunp-logo.png" alt="SIGUNP Emblem" width="180" style="border-radius: 50%;" />
</p>

<p align="center">
  <b>Plataforma Institucional para la Gestión Académica, Mallas Curriculares, Matrícula y Administración de Facultades.</b>
</p>

---

## 🚀 Características Principales

- **🎓 Portal de Estudiantes:**
  - Consulta interactiva de Malla Curricular por ciclos.
  - Simulador dinámico de avance de créditos obligatorios y electivos.
  - Generador y gestor de Horarios de Matrícula.
  - Simulador de Semestres y proyección de notas.
  - Cuaderno digital de apuntes integrado.

- **🛡️ Panel de Administración (`/admin/*`):**
  - **Estructura UNP:** Gestión centralizada de Facultades y Escuelas Profesionales.
  - **Gestor Independiente de Logos:** Subida de logos oficiales por Facultad y por Carrera con soporte para **Ctrl+V (Portapapeles)**, **Drag & Drop** y **URL**.
  - **Control de Usuarios:** Gestión de perfiles para estudiantes, docentes y superusuarios sincronizados con Supabase.
  - **Gestión de Cursos & Mallas:** Creación, edición y asignación de prerrequisitos.
  - **Parámetros del Sistema:** Control de apertura de periodos lectivos y matrículas con exportación de copias de seguridad en JSON.

- **🎨 Diseño Institucional Moderno:**
  - Desarrollado con **React**, **Vite** y **Tailwind CSS**.
  - Soporte completo para **Modo Oscuro** y **Modo Claro**.
  - Paleta de colores oficial UNP (Azul Real, Dorado y Plata).

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18, React Router DOM, Lucide React Icons.
- **Estilos:** Tailwind CSS, Glassmorphism & Custom Ambient Glow Utilities.
- **Backend / Database:** Supabase (PostgreSQL, Auth, RLS).
- **Herramientas:** Vite, Oxlint.

---

## 📦 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JGHJhamir/SIGUNP.git
   cd SIGUNP
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

---

## 👤 Licencia y Créditos

Desarrollado para la **Universidad Nacional de Piura (UNP)**.
All rights reserved.
