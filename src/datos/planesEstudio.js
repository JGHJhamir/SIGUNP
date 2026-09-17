// Mallas Curriculares Oficiales de la Universidad Nacional de Piura (UNP)

export const planEstudiosInformatica = [
  {
    ciclo: "Ciclo I",
    numeroCiclo: 1,
    cursos: [
      { id: "ED1292", nombre: "Actividad Deportiva", creditos: 2, tipo: "O", requisitos: [] },
      { id: "SI1447", nombre: "Algoritmos", creditos: 4, tipo: "O", requisitos: [] },
      { id: "ED1331", nombre: "Comunicación", creditos: 3, tipo: "O", requisitos: [] },
      { id: "MA1470", nombre: "Geometría Analítica", creditos: 4, tipo: "O", requisitos: [] },
      { id: "SI1358", nombre: "Herramientas Ofimáticas para la Vida Universitaria", creditos: 3, tipo: "O", requisitos: [] },
      { id: "SI1216", nombre: "Introducción a la Ingeniería Informática", creditos: 2, tipo: "O", requisitos: [] },
      { id: "MA1408", nombre: "Matemática Básica", creditos: 4, tipo: "O", requisitos: [] },
      { id: "ED1297", nombre: "Metodología de los Estudios Superiores Universitarios", creditos: 2, tipo: "O", requisitos: [] }
    ]
  },
  {
    ciclo: "Ciclo II",
    numeroCiclo: 2,
    cursos: [
      { id: "CB1324", nombre: "Biología y Educación Ambiental", creditos: 3, tipo: "O", requisitos: [] },
      { id: "MA1435", nombre: "Cálculo I", creditos: 4, tipo: "O", requisitos: ["MA1408", "MA1470"] },
      { id: "FI1363", nombre: "Concepción Física del Universo", creditos: 3, tipo: "O", requisitos: [] },
      { id: "SI1445", nombre: "Estructuras Discretas", creditos: 4, tipo: "O", requisitos: ["SI1447"] },
      { id: "CS1286", nombre: "Filosofía y Ética", creditos: 2, tipo: "O", requisitos: [] },
      { id: "SI1435", nombre: "Programación I", creditos: 4, tipo: "O", requisitos: ["SI1216", "SI1447"] },
      { id: "QU1363", nombre: "Química General", creditos: 3, tipo: "O", requisitos: [] }
    ]
  },
  {
    ciclo: "Ciclo III",
    numeroCiclo: 3,
    cursos: [
      { id: "CA2337", nombre: "Administración", creditos: 3, tipo: "O", requisitos: [] },
      { id: "MA2441", nombre: "Cálculo II", creditos: 4, tipo: "O", requisitos: ["MA1435"] },
      { id: "EC2201", nombre: "Economía General", creditos: 2, tipo: "O", requisitos: [] },
      { id: "FI2410", nombre: "Física I", creditos: 4, tipo: "O", requisitos: ["FI1363", "MA1435"] },
      { id: "SI2422", nombre: "Programación II", creditos: 4, tipo: "O", requisitos: ["SI1435"] },
      { id: "CS2397", nombre: "Realidad Nacional y Regional", creditos: 3, tipo: "O", requisitos: [] },
      { id: "CS2258", nombre: "Sociología", creditos: 2, tipo: "O", requisitos: [] },
      { id: "ED2278", nombre: "Taller de Arte", creditos: 2, tipo: "O", requisitos: [] }
    ]
  },
  {
    ciclo: "Ciclo IV",
    numeroCiclo: 4,
    cursos: [
      { id: "CA2101", nombre: "Actividad de Responsabilidad Social Universitaria", creditos: 1, tipo: "O", requisitos: ["CS2258"] },
      { id: "MA2333", nombre: "Álgebra Lineal", creditos: 3, tipo: "O", requisitos: ["MA1435"] },
      { id: "ES2300", nombre: "Estadística General", creditos: 3, tipo: "O", requisitos: ["SI1358"] },
      { id: "SI2418", nombre: "Estructura de Datos", creditos: 4, tipo: "O", requisitos: ["SI1435", "SI1445"] },
      { id: "FI2411", nombre: "Física II", creditos: 4, tipo: "O", requisitos: ["FI2410"] },
      { id: "SI2452", nombre: "Ingeniería de Procesos de Negocios", creditos: 4, tipo: "O", requisitos: ["CA2337"] },
      { id: "CO2201", nombre: "Introducción a la Contabilidad", creditos: 2, tipo: "O", requisitos: [] },
      { id: "CS2259", nombre: "Psicología General", creditos: 2, tipo: "O", requisitos: [] }
    ]
  },
  {
    ciclo: "Ciclo V",
    numeroCiclo: 5,
    cursos: [
      { id: "SI3422", nombre: "Análisis y Diseño de Sistemas I", creditos: 4, tipo: "O", requisitos: ["SI2452"] },
      { id: "MA3412", nombre: "Cálculo III", creditos: 4, tipo: "O", requisitos: ["MA2441"] },
      { id: "FI3492", nombre: "Circuitos Eléctricos y Electrónicos", creditos: 4, tipo: "O", requisitos: ["FI2411"] },
      { id: "ED3286", nombre: "Discapacidad y Derechos Humanos", creditos: 2, tipo: "O", requisitos: ["CS2397"] },
      { id: "ED3283", nombre: "Inglés I", creditos: 2, tipo: "O", requisitos: [] },
      { id: "SI3421", nombre: "Modelado de Datos", creditos: 4, tipo: "O", requisitos: ["SI2418"] }
    ]
  },
  {
    ciclo: "Ciclo VI",
    numeroCiclo: 6,
    cursos: [
      { id: "SI3423", nombre: "Análisis y Diseño de Sistemas II", creditos: 4, tipo: "O", requisitos: ["SI3422"] },
      { id: "SI3400", nombre: "Arquitectura de Computadores", creditos: 4, tipo: "O", requisitos: ["FI3492"] },
      { id: "SI3420", nombre: "Base de Datos", creditos: 4, tipo: "O", requisitos: ["SI3421"] },
      { id: "ED3287", nombre: "Defensa Nacional", creditos: 2, tipo: "O", requisitos: ["CS2397"] },
      { id: "ES3336", nombre: "Inferencia y Probabilidades", creditos: 3, tipo: "O", requisitos: ["ES2300"] },
      { id: "ED3284", nombre: "Inglés II", creditos: 2, tipo: "O", requisitos: ["ED3283"] },
      { id: "ED3285", nombre: "Taller de Redacción Científica", creditos: 2, tipo: "O", requisitos: ["ED1331"] }
    ]
  },
  {
    ciclo: "Ciclo VII",
    numeroCiclo: 7,
    cursos: [
      { id: "IO4447", nombre: "Diseños de Investigación para Ingeniería", creditos: 4, tipo: "O", requisitos: ["ED3285", "ES3336"] },
      { id: "CA4221", nombre: "Emprendedurismo", creditos: 2, tipo: "O", requisitos: [] },
      { id: "IO4448", nombre: "Investigación de Operaciones", creditos: 4, tipo: "O", requisitos: ["ES3336", "MA2333"] },
      { id: "SI4386", nombre: "Programación Visual", creditos: 3, tipo: "O", requisitos: ["SI2422"] },
      { id: "SI4489", nombre: "Sistema de Administración de Base de Datos", creditos: 4, tipo: "O", requisitos: ["SI3420"] },
      { id: "SI4490", nombre: "Sistemas Operativos", creditos: 4, tipo: "O", requisitos: ["SI2418", "SI3400"] }
    ]
  },
  {
    ciclo: "Ciclo VIII",
    numeroCiclo: 8,
    cursos: [
      { id: "DP4331", nombre: "Derecho Informático", creditos: 3, tipo: "O", requisitos: ["CS1286", "ED3286"] },
      { id: "SI4488", nombre: "Ingeniería de Software", creditos: 4, tipo: "O", requisitos: ["SI3423", "SI4489"] },
      { id: "EM4461", nombre: "Microeconomía", creditos: 4, tipo: "O", requisitos: ["EC2201"] },
      { id: "SI4360", nombre: "Organización y Administración Informática", creditos: 3, tipo: "O", requisitos: ["SI3423"] },
      { id: "SI4491", nombre: "Redes", creditos: 4, tipo: "O", requisitos: ["SI4490"] },
      { id: "SI4465", nombre: "Sistemas de Información Gerencial", creditos: 4, tipo: "O", requisitos: ["SI4489"] }
    ]
  },
  {
    ciclo: "Ciclo IX",
    numeroCiclo: 9,
    cursos: [
      { id: "SI5364", nombre: "Elaboración de Proyectos Informáticos", creditos: 3, tipo: "O", requisitos: ["SI4360"] },
      { id: "IO5365", nombre: "Metodología para el Proyecto de Investigación", creditos: 3, tipo: "O", requisitos: ["IO4447", "SI4488"] },
      { id: "SI5497", nombre: "Procesos de Desarrollo de Software", creditos: 4, tipo: "O", requisitos: ["SI3423"] },
      { id: "SI5496", nombre: "Seguridad de la Información", creditos: 4, tipo: "O", requisitos: ["SI4491"] },
      { id: "SI5441", nombre: "Sistemas de Control y Auditoría Informática", creditos: 4, tipo: "O", requisitos: ["DP4331", "SI4488"] },
      { id: "SI5365", nombre: "Tecnología y Desarrollo Web", creditos: 3, tipo: "O", requisitos: ["SI4488"] }
    ]
  },
  {
    ciclo: "Ciclo X",
    numeroCiclo: 10,
    cursos: [
      { id: "CO5397", nombre: "Contabilidad de Costos y Presupuestos", creditos: 3, tipo: "O", requisitos: ["CO2201", "EM4461"] },
      { id: "SI5367", nombre: "Desarrollo de la Investigación Informática", creditos: 3, tipo: "O", requisitos: ["IO5365"] },
      { id: "SI5411", nombre: "Gestión en Informática", creditos: 4, tipo: "O", requisitos: ["SI5364"] },
      { id: "SI5499", nombre: "Inteligencia de Negocios", creditos: 4, tipo: "O", requisitos: ["SI4465"] },
      { id: "SI5498", nombre: "Sistemas Orientados a Servicios", creditos: 4, tipo: "O", requisitos: ["SI5365"] },
      { id: "SI5368", nombre: "Tecnología y Desarrollo Móvil", creditos: 3, tipo: "O", requisitos: ["SI5365"] },
      { id: "SI5373", nombre: "Trabajo de Investigación", creditos: 3, tipo: "O", requisitos: ["IO5365"] }
    ]
  }
];

export const planEstudiosContabilidad = [
  {
    ciclo: "Ciclo I",
    numeroCiclo: 1,
    cursos: [
      { id: "MA1408", nombre: "MATEMATICA BASICA", creditos: 4, tipo: "O", requisitos: [] },
      { id: "ED1331", nombre: "COMUNICACIÓN", creditos: 3, tipo: "O", requisitos: [] },
      { id: "ED1297", nombre: "METODOLOGIA DE LOS ESTUDIOS SUPERIORES UNIVERSITARIOS", creditos: 2, tipo: "O", requisitos: [] },
      { id: "CG1405", nombre: "CONTABILIDAD 1", creditos: 4, tipo: "O", requisitos: [] },
      { id: "SI1358", nombre: "HERRAMIENTAS OFIMATICAS PARA LA VIDA UNIVERSITARIA", creditos: 3, tipo: "O", requisitos: [] },
      { id: "ED1209", nombre: "ACTIVIDAD DEPORTIVA", creditos: 2, tipo: "O", requisitos: [] },
      { id: "CG1301", nombre: "DOCUMENTACION CONTABLE", creditos: 3, tipo: "O", requisitos: [] }
    ]
  },
  {
    ciclo: "Ciclo II",
    numeroCiclo: 2,
    cursos: [
      { id: "CB1324", nombre: "BIOLOGIA Y EDUCACION AMBIENTAL", creditos: 3, tipo: "O", requisitos: [] },
      { id: "CS1286", nombre: "FILOSOFIA Y ETICA", creditos: 2, tipo: "O", requisitos: [] },
      { id: "CS1285", nombre: "ANTROPOLOGIA", creditos: 2, tipo: "O", requisitos: [] },
      { id: "CG2406", nombre: "CONTABILIDAD II", creditos: 4, tipo: "O", requisitos: ["CG1405", "MA1408"] },
      { id: "MADE", nombre: "MATEMATICA APLICADA", creditos: 4, tipo: "O", requisitos: [] },
      { id: "DEIC", nombre: "INTRODUCCION AL DERECHO CONSTITUCIONAL Y CIVIL", creditos: 3, tipo: "O", requisitos: [] },
      { id: "AD01", nombre: "ADMINISTRACION I", creditos: 3, tipo: "O", requisitos: [] }
    ]
  },
  {
    ciclo: "Ciclo III",
    numeroCiclo: 3,
    cursos: [
      { id: "CS2258", nombre: "SOCIOLOGIA", creditos: 2, tipo: "O", requisitos: ["CS1285"] },
      { id: "EC2201", nombre: "ECONOMIA GENERAL", creditos: 2, tipo: "O", requisitos: [] },
      { id: "ED2277", nombre: "VISION CONTEMPORANEA DEL PERU Y DEL MUNDO", creditos: 2, tipo: "O", requisitos: [] },
      { id: "CG3140", nombre: "CONTABILIDAD III", creditos: 4, tipo: "O", requisitos: ["CG2406"] },
      { id: "MAOF", nombre: "MATEMATICAS FINANCIERAS", creditos: 4, tipo: "O", requisitos: ["MADE", "AD01"] },
      { id: "ADII", nombre: "ADMINISTRACION II", creditos: 3, tipo: "O", requisitos: [] },
      { id: "CA2101", nombre: "RESPONSABILIDAD SOCIAL UNIVERSITARIA", creditos: 1, tipo: "O", requisitos: [] }
    ]
  },
  {
    ciclo: "Ciclo IV",
    numeroCiclo: 4,
    cursos: [
      { id: "ED2279", nombre: "GEOGRAFIA GENERAL", creditos: 2, tipo: "O", requisitos: [] },
      { id: "CS2259", nombre: "PSICOLOGIA GENERAL", creditos: 2, tipo: "O", requisitos: [] },
      { id: "CS2397", nombre: "REALIDAD NACIONAL Y REGIONAL", creditos: 3, tipo: "O", requisitos: ["ED2277"] },
      { id: "CG4140", nombre: "CONTABILIDAD IV", creditos: 4, tipo: "O", requisitos: ["CG3140"] },
      { id: "EAMI", nombre: "MICROECONOMIA", creditos: 3, tipo: "O", requisitos: ["EC2201"] },
      { id: "DEEM", nombre: "DERECHO EMPRESARIAL", creditos: 3, tipo: "O", requisitos: ["DEIC"] },
      { id: "ES2300", nombre: "ESTADISTICA GENERAL", creditos: 3, tipo: "O", requisitos: ["MAOF"] },
      { id: "EL01", nombre: "CURSO ELECTIVO 01", creditos: 3, tipo: "E", requisitos: [] }
    ]
  },
  {
    ciclo: "Ciclo V",
    numeroCiclo: 5,
    cursos: [
      { id: "CGNC1", nombre: "NORMAS CONTABLES INTERNACIONALES I", creditos: 4, tipo: "O", requisitos: ["CG4140"] },
      { id: "FAAI", nombre: "ANALISIS E INTERPRETACION DE LA INFORMACION FINANCIERA", creditos: 4, tipo: "O", requisitos: ["CG4140"] },
      { id: "ESINF", nombre: "ESTADISTICA INFERENCIAL", creditos: 4, tipo: "O", requisitos: ["ES2300"] },
      { id: "FABAS", nombre: "FINANZAS BASICAS", creditos: 4, tipo: "O", requisitos: ["MAOF"] },
      { id: "DELAB", nombre: "DERECHO LABORAL", creditos: 3, tipo: "O", requisitos: ["DEEM"] },
      { id: "EDING1", nombre: "INGLES I", creditos: 2, tipo: "O", requisitos: [] },
      { id: "CACOS1", nombre: "CONTABILIDAD DE COSTOS I", creditos: 4, tipo: "O", requisitos: ["CG4140"] }
    ]
  },
  {
    ciclo: "Ciclo VI",
    numeroCiclo: 6,
    cursos: [
      { id: "CGNC2", nombre: "NORMAS CONTABLES INTERNACIONALES II", creditos: 4, tipo: "O", requisitos: ["CGNC1"] },
      { id: "DETRIB", nombre: "DERECHO TRIBUTARIO", creditos: 3, tipo: "O", requisitos: ["DELAB"] },
      { id: "EDING2", nombre: "INGLES II", creditos: 2, tipo: "O", requisitos: ["EDING1"] },
      { id: "CACOS2", nombre: "CONTABILIDAD DE COSTOS II", creditos: 4, tipo: "O", requisitos: ["CACOS1"] },
      { id: "FAINT", nombre: "FINANZAS INTERMEDIAS", creditos: 4, tipo: "O", requisitos: ["FABAS"] },
      { id: "FATRI1", nombre: "TRIBUTACION I", creditos: 4, tipo: "O", requisitos: ["CGNC1"] },
      { id: "ED3287", nombre: "DEFENSA NACIONAL", creditos: 2, tipo: "O", requisitos: [] },
      { id: "EL02", nombre: "CURSO ELECTIVO 02", creditos: 3, tipo: "E", requisitos: [] }
    ]
  },
  {
    ciclo: "Ciclo VII",
    numeroCiclo: 7,
    cursos: [
      { id: "CACOSTD", nombre: "CONTABILIDAD DE COSTOS PARA LA TOMA DE DECISIONES", creditos: 4, tipo: "O", requisitos: ["CACOS2"] },
      { id: "FATRI2", nombre: "TRIBUTACION II", creditos: 4, tipo: "O", requisitos: ["FATRI1"] },
      { id: "CGSIS", nombre: "SISTEMAS CONTABLES", creditos: 4, tipo: "O", requisitos: ["CGNC2"] },
      { id: "CAPESQ", nombre: "CONTABILIDAD PESQUERA Y PASIVOS AMBIENTALES", creditos: 4, tipo: "O", requisitos: ["CACOS2", "CGNC2"] },
      { id: "CAPRES", nombre: "PRESUPUESTO DEL SECTOR PUBLICO", creditos: 3, tipo: "O", requisitos: ["CGNC2"] },
      { id: "FACOR", nombre: "FINANZAS CORPORATIVAS", creditos: 4, tipo: "O", requisitos: ["FAINT"] },
      { id: "FACTRL", nombre: "CONTROL INTERNO", creditos: 4, tipo: "O", requisitos: ["CG4140"] }
    ]
  },
  {
    ciclo: "Ciclo VIII",
    numeroCiclo: 8,
    cursos: [
      { id: "FAAUDF", nombre: "AUDITORIA FINANCIERA", creditos: 4, tipo: "O", requisitos: ["FACTRL"] },
      { id: "CGAMB", nombre: "CONTABILIDAD AMBIENTAL", creditos: 3, tipo: "O", requisitos: ["CGSIS"] },
      { id: "CAPET", nombre: "CONTABILIDAD PETROLERA Y MINERA", creditos: 4, tipo: "O", requisitos: ["CACOSTD"] },
      { id: "SIEMP", nombre: "INFORMATICA APLICADA A LA EMPRESA", creditos: 3, tipo: "O", requisitos: [] },
      { id: "EDINV", nombre: "METODOLOGIA PARA LA INVESTIGACION", creditos: 3, tipo: "O", requisitos: ["ED1297"] },
      { id: "CAFIN", nombre: "CONTABILIDAD DE INSTITUCIONES FINANCIERAS", creditos: 4, tipo: "O", requisitos: ["CGSIS"] },
      { id: "EL03", nombre: "CURSO ELECTIVO 03", creditos: 3, tipo: "E", requisitos: [] }
    ]
  },
  {
    ciclo: "Ciclo IX",
    numeroCiclo: 9,
    cursos: [
      { id: "SIAPL", nombre: "APLICACIONES INFORMATICAS PARA CONTABILIDAD Y FINANZAS", creditos: 3, tipo: "O", requisitos: ["SIEMP"] },
      { id: "EDTES1", nombre: "SEMINARIO DE TESIS I", creditos: 4, tipo: "O", requisitos: ["EDINV"] },
      { id: "CCGER", nombre: "CONTABILIDAD PARA LA GERENCIA", creditos: 4, tipo: "O", requisitos: ["CACOSTD"] },
      { id: "FAAUDINT", nombre: "AUDITORIA INTEGRAL", creditos: 4, tipo: "O", requisitos: ["FAAUDF"] },
      { id: "FAPERI", nombre: "PERITAJE CONTABLE", creditos: 3, tipo: "O", requisitos: ["FAAUDF"] },
      { id: "EAPOL", nombre: "POLITICA MONETARIA Y BANCARIA", creditos: 3, tipo: "O", requisitos: ["FACOR"] }
    ]
  },
  {
    ciclo: "Ciclo X",
    numeroCiclo: 10,
    cursos: [
      { id: "EDTES2", nombre: "SEMINARIO DE TESIS II", creditos: 4, tipo: "O", requisitos: ["EDTES1"] },
      { id: "FAAUDPUB", nombre: "AUDITORIA DEL SECTOR PUBLICO", creditos: 4, tipo: "O", requisitos: ["FAAUDINT"] },
      { id: "FAMERC", nombre: "MERCADO FINANCIERO Y DE VALORES", creditos: 3, tipo: "O", requisitos: ["FACOR"] },
      { id: "CAAGRO", nombre: "CONTABILIDAD AGROPECUARIA", creditos: 4, tipo: "O", requisitos: ["CACOSTD"] },
      { id: "CAPUB", nombre: "CONTABILIDAD DEL SECTOR PUBLICO", creditos: 4, tipo: "O", requisitos: ["CAPRES"] }
    ]
  }
];

export const CARRERAS_DISPONIBLES = [
  {
    key: "informatica",
    nombre: "Ingeniería Informática",
    facultad: "Facultad de Ingeniería Industrial",
    plan: planEstudiosInformatica
  },
  {
    key: "contabilidad",
    nombre: "Ciencias Contables y Financieras",
    facultad: "Facultad de Ciencias Contables y Financieras",
    plan: planEstudiosContabilidad
  }
];

export function obtenerPlanEstudiosActual() {
  const escuela = (localStorage.getItem("escuelaEstudiante") || "").toLowerCase();
  const carreraSeleccionada = (localStorage.getItem("carreraActiva") || "").toLowerCase();
  
  if (
    escuela.includes("contab") ||
    escuela.includes("financier") ||
    carreraSeleccionada.includes("contab") ||
    carreraSeleccionada.includes("financier")
  ) {
    return planEstudiosContabilidad;
  }
  
  return planEstudiosInformatica;
}

export function obtenerNombreCarreraActual() {
  const escuela = (localStorage.getItem("escuelaEstudiante") || "").toLowerCase();
  const carreraSeleccionada = (localStorage.getItem("carreraActiva") || "").toLowerCase();

  if (
    escuela.includes("contab") ||
    escuela.includes("financier") ||
    carreraSeleccionada.includes("contab") ||
    carreraSeleccionada.includes("financier")
  ) {
    return "CIENCIAS CONTABLES Y FINANCIERAS · UNP";
  }

  return "ING. INFORMÁTICA · UNP";
}

export const ESTRUCTURA_FACULTADES_DISPONIBLES = [
  {
    facultad: "Facultad de Ingeniería Industrial",
    escuelas: [
      { nombre: "Ingeniería Informática", disponible: true, carreraKey: "informatica" },
      { nombre: "Ingeniería Industrial", disponible: false, carreraKey: null },
      { nombre: "Ingeniería Agroindustrial", disponible: false, carreraKey: null },
      { nombre: "Ingeniería Mecatrónica", disponible: false, carreraKey: null }
    ]
  },
  {
    facultad: "Facultad de Ciencias Contables y Financieras",
    escuelas: [
      { nombre: "Contabilidad", disponible: true, carreraKey: "contabilidad" }
    ]
  },
  {
    facultad: "Facultad de Ciencias",
    escuelas: [
      { nombre: "Ciencias Biológicas", disponible: false },
      { nombre: "Física", disponible: false },
      { nombre: "Matemáticas", disponible: false },
      { nombre: "Estadística", disponible: false },
      { nombre: "Ingeniería Electrónica y Telecomunicaciones", disponible: false }
    ]
  },
  {
    facultad: "Facultad de Ciencias de la Salud",
    escuelas: [
      { nombre: "Medicina Humana", disponible: false },
      { nombre: "Enfermería", disponible: false },
      { nombre: "Obstetricia", disponible: false },
      { nombre: "Estomatología", disponible: false }
    ]
  },
  {
    facultad: "Facultad de Derecho y Ciencias Políticas",
    escuelas: [
      { nombre: "Derecho", disponible: false }
    ]
  },
  {
    facultad: "Facultad de Ciencias Administrativas",
    escuelas: [
      { nombre: "Administración", disponible: false }
    ]
  },
  {
    facultad: "Facultad de Economía",
    escuelas: [
      { nombre: "Economía", disponible: false }
    ]
  },
  {
    facultad: "Facultad de Ingeniería de Minas",
    escuelas: [
      { nombre: "Ingeniería de Minas", disponible: false },
      { nombre: "Ingeniería Geológica", disponible: false },
      { nombre: "Ingeniería de Petróleo", disponible: false },
      { nombre: "Ingeniería Química", disponible: false }
    ]
  },
  {
    facultad: "Facultad de Ingeniería Civil",
    escuelas: [
      { nombre: "Ingeniería Civil", disponible: false }
    ]
  },
  {
    facultad: "Facultad de Arquitectura y Urbanismo",
    escuelas: [
      { nombre: "Arquitectura", disponible: false }
    ]
  }
];
