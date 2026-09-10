import React, { createContext, useContext, useState, useEffect } from "react";

const ContextoTema = createContext();

export function ProveedorTema({ children }) {
  const [tema, setTema] = useState(() => {
    const temaGuardado = localStorage.getItem("theme");
    return temaGuardado || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (tema === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", tema);
  }, [tema]);

  const alternarTema = () => {
    setTema((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ContextoTema.Provider value={{ tema, setTema, alternarTema }}>
      {children}
    </ContextoTema.Provider>
  );
}

export function useTema() {
  const contexto = useContext(ContextoTema);
  if (!contexto) {
    throw new Error("useTema debe ser usado dentro de ProveedorTema");
  }
  return contexto;
}
