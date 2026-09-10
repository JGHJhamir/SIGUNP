import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IniciarSesion from "../paginas/Autenticacion/IniciarSesion";
import ConfiguracionInicial from "../paginas/ConfiguracionInicial";

// Módulo Estudiante
import LayoutEstudiante from "../componentes/diseno/LayoutEstudiante";
import InicioEstudiante from "../paginas/Estudiante/InicioEstudiante";
import HorarioMatricula from "../paginas/Estudiante/HorarioMatricula";
import MallaCurricular from "../paginas/Estudiante/MallaCurricular";
import ApuntesNotion from "../paginas/Estudiante/ApuntesNotion";
import SimuladorSemestres from "../paginas/Estudiante/SimuladorSemestres";
import Matricula from "../paginas/Estudiante/Matricula";

// Módulo Administrador
import LayoutAdmin from "../componentes/diseno/LayoutAdmin";
import InicioAdmin from "../paginas/Admin/InicioAdmin";
import GestionFacultades from "../paginas/Admin/GestionFacultades";
import GestionUsuarios from "../paginas/Admin/GestionUsuarios";
import GestionCursos from "../paginas/Admin/GestionCursos";
import ConfiguracionSistema from "../paginas/Admin/ConfiguracionSistema";

// Protege el acceso y verifica que el usuario esté autenticado
function RutaAutenticada({ children }) {
  const rol = localStorage.getItem("userRole");
  if (!rol) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// Controla el onboarding. Redirige a la aplicación si ya se completó el tutorial.
function RutaOnboarding({ children }) {
  const rol = localStorage.getItem("userRole");
  const tutorialCompletado = localStorage.getItem("tutorialCompletado") === "true";

  if (!rol) {
    return <Navigate to="/" replace />;
  }

  if (tutorialCompletado) {
    return <Navigate to="/estudiante/inicio" replace />;
  }

  return children;
}

// Protege los módulos del estudiante. Exige autenticación y haber completado la configuración inicial.
function RutaEstudiante({ children }) {
  const rol = localStorage.getItem("userRole");
  const tutorialCompletado = localStorage.getItem("tutorialCompletado") === "true";

  if (!rol) {
    return <Navigate to="/" replace />;
  }

  if (rol === "Administrador") {
    // Si un administrador desea ver la interfaz estudiante, permitimos el acceso
    return children;
  }

  if (!tutorialCompletado) {
    return <Navigate to="/configuracion-inicial" replace />;
  }

  return children;
}

// Protege los módulos del Administrador. Exige que el rol sea 'Administrador'.
function RutaAdmin({ children }) {
  const rol = localStorage.getItem("userRole");

  if (rol !== "Administrador") {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Redirige al dashboard correspondiente si ya inició sesión al entrar a la raíz
function RutaRaiz() {
  const rol = localStorage.getItem("userRole");
  const tutorialCompletado = localStorage.getItem("tutorialCompletado") === "true";

  if (rol) {
    if (rol === "Administrador") {
      return <Navigate to="/admin/inicio" replace />;
    }
    if (tutorialCompletado) {
      return <Navigate to="/estudiante/inicio" replace />;
    }
    return <Navigate to="/configuracion-inicial" replace />;
  }

  return <IniciarSesion />;
}

export default function EnrutadorApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de Inicio de Sesión y Control de Raíz */}
        <Route path="/" element={<RutaRaiz />} />

        {/* Ruta del Tutorial de Onboarding */}
        <Route
          path="/configuracion-inicial"
          element={
            <RutaOnboarding>
              <ConfiguracionInicial />
            </RutaOnboarding>
          }
        />

        {/* Módulo del Estudiante (Rutas Hijas) */}
        <Route
          path="/estudiante"
          element={
            <RutaEstudiante>
              <LayoutEstudiante />
            </RutaEstudiante>
          }
        >
          <Route index element={<Navigate to="inicio" replace />} />
          <Route path="inicio" element={<InicioEstudiante />} />
          <Route path="horario" element={<HorarioMatricula />} />
          <Route path="malla" element={<MallaCurricular />} />
          <Route path="apuntes" element={<ApuntesNotion />} />
          <Route path="simulador" element={<SimuladorSemestres />} />
          <Route path="matricula" element={<Matricula />} />
        </Route>

        {/* Módulo del Administrador (Rutas Hijas) */}
        <Route
          path="/admin"
          element={
            <RutaAdmin>
              <LayoutAdmin />
            </RutaAdmin>
          }
        >
          <Route index element={<Navigate to="inicio" replace />} />
          <Route path="inicio" element={<InicioAdmin />} />
          <Route path="facultades" element={<GestionFacultades />} />
          <Route path="usuarios" element={<GestionUsuarios />} />
          <Route path="cursos" element={<GestionCursos />} />
          <Route path="configuracion" element={<ConfiguracionSistema />} />
        </Route>

        {/* Comportamiento de comodín para rutas inexistentes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

