import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProveedorTema } from './contexto/ContextoTema.jsx'

// ─────────────────────────────────────────────────────────────────────────────
// Control de versión del localStorage.
// Al cambiar STORAGE_VERSION se limpian automáticamente los datos del
// localStorage incompatibles con la versión actual del código.
// ─────────────────────────────────────────────────────────────────────────────
const STORAGE_VERSION = "2";

const versionGuardada = localStorage.getItem("storageVersion");

if (versionGuardada !== STORAGE_VERSION) {
  const temaPrevio = localStorage.getItem("theme");
  localStorage.clear();
  localStorage.setItem("storageVersion", STORAGE_VERSION);
  if (temaPrevio) localStorage.setItem("theme", temaPrevio);
  console.info(`[SIGUNP] localStorage actualizado a versión ${STORAGE_VERSION}.`);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProveedorTema>
      <App />
    </ProveedorTema>
  </StrictMode>,
)
