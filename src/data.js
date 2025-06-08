// src/data.js

// Este archivo centraliza todo el contenido textual del CV.
// Así, las actualizaciones futuras se realizan de forma sencilla en un solo lugar.

const cvData = {
  personal: {
    nombre: "ÁNGEL MATEO TORRES BARCO",
    ocupacion: "Ingeniero de Minas | Consultor en Innovación Estratégica | Fundador de Carpe Diem Engineers",
    resumen: "Ingeniero de Minas y Consultor Estratégico con experiencia probada en la conceptualización, liderazgo y escalamiento de proyectos que generan valor desde la ideación hasta el cierre financiero. Mi fortaleza radica en la convergencia de ingeniería, finanzas y digitalización, con un enfoque particular en la implementación pragmática de la Inteligencia Artificial generativa para la optimización de operaciones y el crecimiento del negocio. Como fundador de empresas y arquitecto de soluciones funcionales, me especializo en traducir visiones estratégicas en resultados medibles, articulando personas, procesos y tecnología para impulsar la rentabilidad y la transformación. Mi visión es ser un referente en la IA aplicada, diseñando modelos éticos, escalables y orientados a la eficiencia, siempre con una mentalidad de 'closer' de proyectos e iniciativas.",
    contacto: {
      ubicacion: "Colombia",
      correo: "ing.atorres97@gmail.com",
      telefonos: ["300 420 6856", "310 278 9537"],
      linkedin: "https://www.linkedin.com/in/ingangmateo",
    },
    // La imagen se gestionará directamente en el componente de perfil usando la ruta /CVPh.jpg
    // ya que debe ir en la carpeta 'public'.
  },
  trayectoria: [
    {
      titulo: "Fundador y Director Ejecutivo en Carpe Diem Engineers SAS",
      periodo: "(2022 - 2024)",
      responsabilidades: [
        "Establecí la empresa desde cero, desarrollando modelos comerciales B2B que resultaron en un crecimiento sostenido de la cartera de clientes y un aumento significativo en los ingresos año tras año.",
        "Lideré la concepción y ejecución de consultorías financieras y técnicas en estructuras metálicas, cerrando acuerdos de alto valor y consolidando la presencia de mercado.",
        "Mi rol incluyó la dirección operativa y la conversión efectiva de oportunidades en proyectos tangibles.",
      ],
    },
    {
      titulo: "Consultor Externo en Planificación Financiera y Calidad en Industrias Metálicas Barco",
      periodo: "(2022 - 2024)",
      responsabilidades: [
        "Diseñé e implementé modelos financieros para proyectos metálicos, logrando una precisión en costos superior al 95% y manteniendo un factor de seguridad de desperdicio entre 2-4% en el despiece de materiales.",
        "Presenté exitosamente 7 de 10 propuestas estratégicas en licitaciones privadas, utilizando análisis comparativos profundos que, incluso en los casos no adjudicados, proporcionaron valiosa inteligencia de mercado y optimizaron futuras estrategias comerciales.",
      ],
    },
    {
      titulo: "Co-Fundador y Director Técnico en Angel & Angel Ingeniería SAS",
      periodo: "(2017 - 2021)",
      responsabilidades: [
        "Ejecución de estudios topográficos mediante tecnologías de teledetección (drones).",
        "Generación de informes geoambientales para toma de decisiones sobre exploración y explotación minera.",
      ],
    },
    {
      titulo: "Consultor en Planeación y Licenciamiento Urbano en Bella Torre S&S SAS",
      periodo: "(2021 - 2023)",
      responsabilidades: [
        "Evaluación de rentabilidad técnico-financiera de proyectos de urbanismo.",
        "Asistencia integral en procesos regulatorios y de licenciamiento constructivo.",
      ],
    },
    {
      titulo: "Consultor Independiente en Minería y Comercialización",
      periodo: "(2021)",
      responsabilidades: [
        "Auditoría documental y técnica para adquisición de activos mineros.",
        "Asesoramiento en negociaciones comerciales bajo términos FOB y FAC.",
      ],
    },
    {
      titulo: "Auxiliar Técnico y Consultor en Transformación Digital en VIVE / Constructora RS",
      periodo: "(2024 - Mayo 2025)",
      responsabilidades: [
        "Elaboración como autor técnico del documento de aterrizaje de planeación para proyectos, bajo supervisión directa del director técnico.",
        "Arquitectura e implementación de plataformas de automatización de procesos operativos:",
        "Inventario Ventus: trazabilidad de insumos de obra mediante interfaces automatizadas.",
        "Portal Ventus XVI: sistema de gestión residencial digital (mudanzas, reservas, visitas).",
        "Liderazgo integral en desarrollo funcional, validación con usuarios, capacitación interna y documentación, mejorando la satisfacción del usuario y las reseñas positivas de forma significativa.",
      ],
    },
  ],
  habilidades: {
    tecnicas: [
      "Planeación financiera avanzada aplicada a proyectos constructivos (sin APU)",
      "Dirección de proyectos técnicos con enfoque en rentabilidad y escalabilidad",
      "Evaluación comparativa de propuestas técnicas y económicas",
      "Diseño de soluciones digitales sin programación (nocode)",
      "Modelado visual en Adobe Illustrator y SketchUp (nivel intermedio)",
      "Diseño web operativo en Wix y WordPress (Hostinger)",
      "Dominio de Google Workspace como ecosistema de productividad colaborativa",
    ],
    ia: [
      {
        nombre: "Ingeniería de Prompts:",
        descripcion: "Diseño estructurado de instrucciones para modelos generativos, con certificación de Microsoft, LinkedIn Learning, Santander y Founderz.",
      },
      {
        nombre: "Aplicación operativa de IA generativa:",
        descripcion: "Integración de herramientas como ChatGPT, Gemini y Microsoft Copilot en la resolución de problemas, automatización de procesos y generación de contenido técnico.",
      },
      {
        nombre: "Promotor de cultura digital basada en IA:",
        descripcion: "Impulso de entornos de trabajo colaborativos donde la IA no reemplaza, sino potencia la capacidad humana, aliviando tareas rutinarias y optimizando el tiempo creativo.",
      },
      {
        nombre: "Visión sistémica:",
        descripcion: "Enfoque holístico donde la IA se alinea con los tres pilares organizacionales: personas, procesos y tecnología; todo ello regido por principios de escalabilidad, transparencia y eficiencia.",
      },
    ],
    transversales: [
      "Comunicación estratégica, empática y orientada a impacto",
      "Inteligencia emocional y liderazgo con conciencia situacional",
      "Capacidad de negociación bajo marcos de alta presión",
      "Visión interdisciplinaria e integración de saberes",
      "Rigurosidad en la ejecución y mejora continua",
      "Adaptabilidad en ecosistemas cambiantes y colaborativos",
    ],
    integracionHumanoIa: [
      {
        titulo: "Identificación de necesidades y diseño de solución:",
        descripcion: "actúo como arquitecto conceptual, definiendo el propósito, el público y la lógica operativa del sistema.",
      },
      {
        titulo: "Dirección de requerimientos técnicos y flujos funcionales:",
        descripcion: "elaboro las reglas de negocio, estructuras de datos, validaciones operativas y formatos necesarios.",
      },
      {
        titulo: "Ingeniero de implementación en entornos reales:",
        descripcion: "soy responsable de configurar, desplegar y poner en marcha soluciones, asegurando su funcionamiento dentro de ecosistemas como Google Workspace o entornos nocode.",
      },
      {
        titulo: "Control de calidad, validación y mejora continua:",
        descripcion: "realizo pruebas exhaustivas, identifico errores y optimizo la experiencia de usuario.",
      },
      {
        titulo: "Gestión iterativa:",
        descripcion: "promuevo ciclos ágiles de retroalimentación, asegurando mejoras continuas alineadas a las necesidades reales.",
      },
      {
        titulo: "La IA es mi copiloto, pero yo diseño el viaje, marco el rumbo y llevo el control.",
        descripcion: "", // Dejar vacío si es solo una frase.
      },
    ],
  },
  formacionIdiomas: {
    formacionAcademica: [
      {
        titulo: "Ingeniería de Minas",
        institucion: "Fundación Universitaria del Área Andina",
        detalle: "Título obtenido en 2023",
      },
      {
        titulo: "Cursos y Certificaciones en IA",
        institucion: "Varias plataformas (LinkedIn, Microsoft, Santander, Founderz)",
        detalle: "Verificable en LinkedIn",
      },
    ],
    idiomas: [
      "Español - Nativo",
      "Inglés - Técnico (comprensión lectora y redacción en entornos de ingeniería)",
    ],
    credencialesLinkedIn: "https://www.linkedin.com/in/ingangmateo/details/certifications/",
  },
  referencias: [
    {
      nombre: "Ing. William Barco",
      cargoEmpresa: "Director General, Industrias Metálicas Barco (Inmeba)",
      telefono: "313 467 2971",
    },
    {
      nombre: "PMO Paula Saavedra",
      cargoEmpresa: "Gerente Administrativa, Bella Vista Bogotá SAS y Bella Torre S&S SAS",
      telefono: "350 450 8036",
    },
    {
      nombre: "Dr. Jesús Cárcamo",
      cargoEmpresa: "Consultor Senior, Firma Privada (sector minero-energético)",
      telefono: "301 771 1298",
    },
    {
      nombre: "Dr. Andrew Gómez",
      cargoEmpresa: "Asesor Legal Corporativo, Firma Privada",
      telefono: "316 747 1877",
    },
    {
      nombre: "José Guillermo Orjuela Ardila",
      cargoEmpresa: "Gerente de Escuela de Participación, IDPAC",
      telefono: "312 683 8869",
    },
    {
      nombre: "Ing. Carlos Ropero",
      cargoEmpresa: "Ingeniero de Minas, colaborador en planificación financiera y estructuración de programas administrativos y estratégicos mineros",
      telefono: "312 577 6404",
    },
    {
      nombre: "Roger Salcedo",
      cargoEmpresa: "CEO, VIVE | Constructora RS",
      telefono: "300 700 5172",
    },
    {
      nombre: "Área Administrativa",
      cargoEmpresa: "VIVE | Constructora RS",
      telefono: "320 312 6786",
    },
    {
      nombre: "Ing. Cristhian Carranza",
      cargoEmpresa: "Supervisor Técnico, VIVE | Constructora RS",
      telefono: "304 464 7112",
    },
  ],
  actividadesComplementarias: [
    "Cinturón franja rojo-franja negro en Taekwondo, con 9 años de experiencia",
    "Juez distrital acreditado por la Liga de Taekwondo de Bogotá",
    "Mentor de jóvenes en formación técnica y emocional a través del deporte",
    "Práctica constante de disciplina física como base de equilibrio emocional y resiliencia profesional",
  ],
  pieDePagina: "Sitio diseñado por Ing. Ángel Torres con asistencia de Inteligencia Artificial como copiloto creativo y técnico.",
};

export default cvData; // Exporta el objeto cvData para que pueda ser importado en otros archivos.
