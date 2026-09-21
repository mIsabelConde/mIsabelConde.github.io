import { ConceptCardData, ApplicationSector, TechTool } from '../types';

export const AI_CONCEPTS: ConceptCardData[] = [
  {
    id: 'intro-ai',
    title: '¿Qué es la IA?',
    subtitle: 'Fundamentos de Inteligencia Computacional',
    category: 'Fundamento',
    description: 'Disciplina científica de la computación dedicada a diseñar algoritmos y sistemas capaces de emular funciones cognitivas humanas: razonamiento, deducción, inferencia, aprendizaje y resolución autónoma de problemas complejos.',
    example: 'Algoritmos heurísticos de búsqueda en grafos, sistemas de recomendación contextual y motores de ajedrez como Deep Blue o Stockfish.',
    technologies: ['Heurísticas', 'Lógica Difusa', 'Grafos de Conocimiento', 'Sistemas Expertos'],
    keyMetric: 'Capacidad de deducción abstracta',
    iconName: 'Cpu',
    glowColor: 'cyan'
  },
  {
    id: 'history-ai',
    title: 'Historia y Evolución',
    subtitle: 'De Turing (1950) a la Era de los Transformers',
    category: 'Evolución',
    description: 'Iniciada con el test de Alan Turing (1950) y la conferencia de Dartmouth (1956). Atravesó dos "Inviernos de la IA" por limitaciones de hardware, renaciendo con el auge del Big Data, GPUs masivas y la arquitectura Transformer (Vaswani et al., 2017).',
    example: 'Evolución desde el perceptrón simple (Rosenblatt, 1958) hasta modelos fundacionales con más de 1 billón de parámetros.',
    technologies: ['Dartmouth 1956', 'Perceptrón 1958', 'Backpropagation 1986', 'Transformers 2017'],
    keyMetric: '7+ décadas de iteración científica',
    iconName: 'History',
    glowColor: 'blue'
  },
  {
    id: 'weak-vs-general',
    title: 'IA Estrecha vs AGI y GenAI',
    subtitle: 'Niveles de Autonomía y Generalización',
    category: 'Taxonomía',
    description: 'La IA Estrecha (ANI) domina una tarea delimitada (clasificar rayos X o jugar Go). La Inteligencia Artificial General (AGI) aspira a igualar la versatilidad cognitiva humana transversal. La IA Generativa crea artefactos sintéticos con coherencia semántica.',
    example: 'AlphaFold predice plegamientos proteicos (ANI) vs modelos autoregresivos multimodales que razonan y generan código.',
    technologies: ['ANI (Narrow)', 'AGI (General)', 'ASI (Superinteligencia)', 'GenAI Multimodal'],
    keyMetric: 'De tareas discretas a cognición general',
    iconName: 'Compass',
    glowColor: 'purple'
  },
  {
    id: 'machine-learning',
    title: 'Aprendizaje Automático',
    subtitle: 'Machine Learning Estadístico',
    category: 'Núcleo ML',
    description: 'Subcampo de la IA enfocado en construir sistemas computacionales que aprenden patrones empíricos a partir de distribuciones de datos observacionales, sin estar programados con reglas rígidas explícitas.',
    example: 'Detección de fraude financiero mediante árboles de decisión Gradient Boosted (XGBoost/LightGBM) en milisegundos.',
    technologies: ['Descenso de Gradiente', 'Funciones de Pérdida', 'Regularización L1/L2', 'Validación Cruzada'],
    keyMetric: 'Minimización empírica del riesgo',
    iconName: 'Binary',
    glowColor: 'green'
  },
  {
    id: 'neural-networks',
    title: 'Redes Neuronales Artificiales',
    subtitle: 'Deep Learning y Arquitecturas Profundas',
    category: 'Arquitectura',
    description: 'Estructuras conectivistas inspiradas en redes biológicas. Múltiples capas de tensores interconectados con pesos sinápticos que aplican transformaciones no lineales y propagan gradientes hacia atrás (Backpropagation).',
    example: 'Convolucionales (CNN) para imágenes médicas, Recurrentes/LSTM para series temporales y Transformers con auto-atención multi-cabezal.',
    technologies: ['Backpropagation', 'Funciones de Activación', 'Auto-Atención', 'Convoluciones'],
    keyMetric: 'Aproximadores universales de funciones',
    iconName: 'Network',
    glowColor: 'cyan'
  },
  {
    id: 'nlp',
    title: 'Procesamiento de Lenguaje',
    subtitle: 'Natural Language Processing & LLMs',
    category: 'Lingüística',
    description: 'Cruce entre lingüística computacional y modelos de lenguaje de gran escala (LLMs). Permite entender sintaxis, semántica, pragmática, tokenización de subpalabras y representaciones densas en espacios vectoriales (Embeddings).',
    example: 'Traducción simultánea interlingual, resumen automático de documentos jurídicos y asistentes de programación con contexto.',
    technologies: ['Tokenización BPE', 'Vector Embeddings', 'Mecanismo de Atención', 'RLHF / DPO'],
    keyMetric: 'Comprensión contextual profunda',
    iconName: 'MessageSquareCode',
    glowColor: 'green'
  },
  {
    id: 'computer-vision',
    title: 'Visión por Computadora',
    subtitle: 'Extracción Semántica de Imágenes y Video',
    category: 'Percepción',
    description: 'Algoritmos diseñados para percibir, segmentar, detectar y reconstruir geométricamente escenas a partir de píxeles digitales o nubes de puntos LiDAR en tiempo real.',
    example: 'Vehículos autónomos que detectan ciclistas, carriles y señales en condiciones climáticas adversas a 60 FPS.',
    technologies: ['YOLOv10', 'Segment Anything (SAM)', 'NeRF / 3D Gaussian Splatting', 'ResNet'],
    keyMetric: 'Inferencia visual de baja latencia',
    iconName: 'Eye',
    glowColor: 'blue'
  },
  {
    id: 'generative-ai',
    title: 'IA Generativa',
    subtitle: 'Síntesis Autoregresiva y Modelos de Difusión',
    category: 'Síntesis',
    description: 'Modelos probabilísticos que aprenden la distribución de probabilidad subyacente de un conjunto de datos para muestrear nuevas instancias plausibles: texto, imágenes fotorrealistas, audio sintetizado o código ejecutable.',
    example: 'Modelos de difusión latente desruidando tensores gaussianos para generar arte conceptual de alta fidelidad.',
    technologies: ['Diffusion Models', 'GANs', 'Autoregressive LLMs', 'Variational Autoencoders'],
    keyMetric: 'Espacio latente de alta dimensionalidad',
    iconName: 'Sparkles',
    glowColor: 'purple'
  },
  {
    id: 'ai-agents',
    title: 'Agentes Inteligentes',
    subtitle: 'Sistemas Autónomos Orientados a Objetivos',
    category: 'Agentes',
    description: 'Entidades de software que perciben su entorno a través de sensores/APIs, razonan con memoria reflexiva (memoria episódica y semántica), planifican rutas y ejecutan acciones con herramientas externas para alcanzar un objetivo.',
    example: 'Agentes DevOps que detectan caídas en clústeres Kubernetes, analizan logs, aplican parches y validan pruebas sin intervención humana.',
    technologies: ['ReAct Framework', 'Tool Calling', 'Plan & Solve', 'Búsqueda en Árbol MCTS'],
    keyMetric: 'Autonomía con ciclo de retroalimentación',
    iconName: 'Bot',
    glowColor: 'cyan'
  }
];

export const APPLICATION_SECTORS: ApplicationSector[] = [
  {
    id: 'medicina',
    title: 'Medicina & Salud',
    icon: 'Stethoscope',
    description: 'Diagnóstico precoz de patologías mediante análisis de resonancias magnéticas, tomografías y descubrimiento molecular asistido por IA.',
    practicalExample: 'Detección de retinopatía diabética con 98.4% de precisión antes de la manifestación de síntomas visibles.',
    impactMetrics: 'Reducción del 45% en falsos negativos oncológicos.',
    technologies: ['Vision Transformers', 'Graph Neural Networks', 'DICOM Pipelines', 'Segmentación 3D'],
    caseStudy: 'Aceleración de ensayos clínicos mediante cribado computacional de miles de compuestos activos en días en lugar de años.'
  },
  {
    id: 'finanzas',
    title: 'Finanzas & FinTech',
    icon: 'LineChart',
    description: 'Modelos predictivos de riesgo crediticio, prevención de lavado de activos (AML) y trading algorítmico de alta frecuencia (HFT).',
    practicalExample: 'Detección de transacciones fraudulentas en tarjetas de crédito en menos de 15 milisegundos usando Gradient Boosting.',
    impactMetrics: 'Disminución del 80% en pérdidas por fraude digital.',
    technologies: ['Isolation Forests', 'LSTMs', 'Kafka Stream Mining', 'Autoencoders'],
    caseStudy: 'Análisis de sentimiento bursátil en tiempo real procesando feeds financieros globales y reportes regulatorios 10-K.'
  },
  {
    id: 'educacion',
    title: 'Educación & EdTech',
    icon: 'GraduationCap',
    description: 'Tutores cognitivos adaptativos que personalizan la ruta de aprendizaje según el ritmo de asimilación y dificultades de cada estudiante.',
    practicalExample: 'Sistemas que reformulan explicaciones matemáticas abstractas con analogías personalizadas según los intereses del alumno.',
    impactMetrics: '+35% en tasas de retención conceptual.',
    technologies: ['Knowledge Tracing', 'RAG Semántico', 'Generación de Pruebas', 'Speech-to-Text'],
    caseStudy: 'Plataformas universitarias con feedback automático instantáneo de tareas de código con explicaciones de complejidad temporal.'
  },
  {
    id: 'industria',
    title: 'Industria 4.0 & Manufactura',
    icon: 'Factory',
    description: 'Mantenimiento predictivo de turbinas, robots de línea de montaje y control de calidad óptico automatizado sin paradas no programadas.',
    practicalExample: 'Sensores de vibración y temperatura acoplados a modelos de series temporales que avisan 48h antes de una avería de rodamientos.',
    impactMetrics: '65% menos tiempos muertos de planta.',
    technologies: ['Edge AI', 'Digital Twins', 'Anomalías FFT', 'Visión Industrial'],
    caseStudy: 'Inspección de soldaduras aeronáuticas mediante micro-escaneo láser analizado con redes neuronales convolucionales.'
  },
  {
    id: 'agricultura',
    title: 'Agricultura de Precisión',
    icon: 'Sprout',
    description: 'Drones con cámaras multiespectrales para monitoreo de clorofila, estrés hídrico y pulverización selectiva de fertilizantes.',
    practicalExample: 'Detección temprana de hongos en cultivos de trigo ahorrando 70% en uso de agroquímicos focalizados.',
    impactMetrics: '-30% de huella hídrica y +22% de rendimiento por hectárea.',
    technologies: ['Satélites Sentinel', 'Índices NDVI', 'Edge Computing en Tractor', 'Modelos Climáticos'],
    caseStudy: 'Riego autónomo gobernado por sensores subterráneos de humedad y modelos predictivos de evapotranspiración.'
  },
  {
    id: 'transporte',
    title: 'Transporte & Movilidad',
    icon: 'Car',
    description: 'Sistemas de conducción autónoma de nivel 4/5, optimización logística de flotas y sincronización adaptativa de redes de semáforos.',
    practicalExample: 'Rutas logísticas dinámicas recalculadas en tiempo real para evitar atascos y minimizar emisiones de carbono.',
    impactMetrics: 'Reducción del 28% en tiempos de tránsito urbano.',
    technologies: ['Sensor Fusion (LiDAR/Radar)', 'Reinforcement Learning', 'SLAM', 'Mapas HD'],
    caseStudy: 'Sistemas ferroviarios de alta velocidad con frenado automático inteligente optimizado por condiciones orográficas y meteorológicas.'
  },
  {
    id: 'ciberseguridad',
    title: 'Ciberseguridad Defensiva',
    icon: 'ShieldAlert',
    description: 'Detección heurística de ataques de día cero (Zero-Day), análisis de comportamiento de entidades y usuarios (UEBA) y respuesta orquestada.',
    practicalExample: 'Identificación de exfiltración lenta de datos cifrados mediante análisis de entropía en paquetes de red DNS.',
    impactMetrics: 'Respuesta ante incidentes 10x más rápida.',
    technologies: ['SIEM Inteligente', 'Grafos de Amenazas', 'Análisis Heurístico', 'SOAR'],
    caseStudy: 'Aislamiento instantáneo de máquinas comprometidas con ransomware antes del cifrado del directorio activo.'
  },
  {
    id: 'robotica',
    title: 'Robótica Inteligente',
    icon: 'Bot',
    description: 'Manipulación física diestra con brazos robóticos, navegación en entornos hostiles y robots humanoides guiados por modelos VLA (Vision-Language-Action).',
    practicalExample: 'Robots de almacén colaborativos (Cobots) que esquivan operadores humanos y seleccionan piezas de formas irregulares.',
    impactMetrics: 'Cero accidentes laborales en almacenes de alta velocidad.',
    technologies: ['Modelos VLA', 'Control Predictivo (MPC)', 'Cinemática Inversa', 'Simulación Isaac Sim'],
    caseStudy: 'Robots de exploración subacuática que mapean arrecifes de coral e inspeccionan tuberías submarinas autónomamente.'
  },
  {
    id: 'marketing',
    title: 'Marketing & E-commerce',
    icon: 'Target',
    description: 'Hiperpersonalización de catálogos en tiempo real, modelado de propensión de compra y optimización multivariante de contenido.',
    practicalExample: 'Motores de filtrado colaborativo que sugieren productos complementarios aumentando el ticket promedio en un 18%.',
    impactMetrics: '+40% en tasa de conversión de campañas dirigidas.',
    technologies: ['Matrix Factorization', 'Vector Search (Pinecone/Faiss)', 'Bandidos Multibrazo', 'NLP Semántico'],
    caseStudy: 'Generación dinámica de creatividades publicitarias adaptadas al contexto y preferencias demográficas de cada audiencia.'
  },
  {
    id: 'ciencia',
    title: 'Investigación Científica',
    icon: 'Atom',
    description: 'Simulaciones cuánticas, descubrimiento de nuevos metamateriales para baterías y análisis astrofísico de señales del telescopio James Webb.',
    practicalExample: 'Clasificación de millones de galaxias espirales a partir de capturas de espacio profundo en minutos.',
    impactMetrics: 'Aceleración de 100x en descubrimientos de superconductores.',
    technologies: ['PINNs (Physics-Informed NNs)', 'Graph Networks', 'Supercómputo GPU', 'Clustering No Supervisado'],
    caseStudy: 'Predicción de la estabilidad de aleaciones metálicas para reactores de fusión nuclear mediante redes neuronales con restricciones físicas.'
  }
];

export const TECH_TOOLS: TechTool[] = [
  {
    name: 'Python',
    category: 'Lenguaje',
    description: 'El estándar de oro indiscutible para IA y Data Science gracias a su ecosistema masivo, expresividad y bindings nativos a librerías C/C++.',
    popularity: 99,
    sampleCode: 'import torch\nimport numpy as np\nx = torch.randn(3, 3, requires_grad=True)\ny = x.pow(2).sum()\ny.backward()',
    officialSite: 'https://python.org',
    badge: 'Core Language'
  },
  {
    name: 'PyTorch',
    category: 'Deep Learning',
    description: 'Framework líder en investigación y producción de Deep Learning creado por Meta AI. Grafos computacionales dinámicos y aceleración CUDA óptima.',
    popularity: 96,
    sampleCode: 'class NeuralNet(torch.nn.Module):\n  def __init__(self):\n    super().__init__()\n    self.fc = torch.nn.Linear(128, 10)\n  def forward(self, x):\n    return torch.relu(self.fc(x))',
    officialSite: 'https://pytorch.org',
    badge: 'DL Pioneer'
  },
  {
    name: 'TensorFlow',
    category: 'Deep Learning',
    description: 'Ecosistema integral de código abierto desarrollado por Google Brain. Destaca en despliegues a gran escala, TensorFlow Lite para Edge y TFX.',
    popularity: 92,
    sampleCode: 'import tensorflow as tf\nmodel = tf.keras.Sequential([\n  tf.keras.layers.Dense(64, activation="relu"),\n  tf.keras.layers.Dense(1, activation="sigmoid")\n])',
    officialSite: 'https://tensorflow.org',
    badge: 'Production Ready'
  },
  {
    name: 'Scikit-learn',
    category: 'Machine Learning',
    description: 'Biblioteca fundamental para ML clásico en Python. Algoritmos de clasificación, regresión, clustering y herramientas de preprocesamiento.',
    popularity: 94,
    sampleCode: 'from sklearn.ensemble import RandomForestClassifier\nclf = RandomForestClassifier(n_estimators=100)\nclf.fit(X_train, y_train)\ny_pred = clf.predict(X_test)',
    officialSite: 'https://scikit-learn.org',
    badge: 'Essential ML'
  },
  {
    name: 'Pandas',
    category: 'Data Science',
    description: 'Estructuras de datos DataFrame de alto rendimiento para manipulación, limpieza, agregación y análisis tabular de información heterogénea.',
    popularity: 97,
    sampleCode: 'import pandas as pd\ndf = pd.read_csv("telemetry.csv")\nclean_df = df.dropna().groupby("region")["latency"].mean()',
    officialSite: 'https://pandas.pydata.org',
    badge: 'Tabular Power'
  },
  {
    name: 'NumPy',
    category: 'Data Science',
    description: 'Base del cómputo científico en Python. Arreglos N-dimensionales ultrarrápidos, operaciones vectorizadas y álgebra lineal optimizada con BLAS/LAPACK.',
    popularity: 98,
    sampleCode: 'import numpy as np\nA = np.random.rand(500, 500)\ninv_A = np.linalg.inv(A)\neigenvalues = np.linalg.eigvals(A)',
    officialSite: 'https://numpy.org',
    badge: 'Array Engine'
  },
  {
    name: 'Jupyter',
    category: 'Data Science',
    description: 'Entorno interactivo para notebooks computacionales con ejecución por celdas, visualización inline de datos y documentación reproducible.',
    popularity: 93,
    sampleCode: '# Jupyter Notebook Cell Execution\n%matplotlib inline\nimport matplotlib.pyplot as plt\nplt.plot([1, 2, 4, 8, 16], color="cyan")',
    officialSite: 'https://jupyter.org',
    badge: 'Interactive Lab'
  },
  {
    name: 'SQL',
    category: 'Data Science',
    description: 'Lenguaje universal de consulta estructurada para almacenamiento, extracción y transformación de datos en Data Warehouses (BigQuery, Snowflake, PostgreSQL).',
    popularity: 95,
    sampleCode: 'SELECT user_id, COUNT(*) AS sessions, AVG(dwell_time)\nFROM user_events\nWHERE event_date >= CURRENT_DATE - 30\nGROUP BY user_id HAVING sessions > 5',
    officialSite: 'https://iso.org',
    badge: 'Universal Query'
  },
  {
    name: 'Docker',
    category: 'Infraestructura',
    description: 'Contenedores ligeros que aseguran reproducibilidad estricta de entornos de entrenamiento e inferencia en cualquier clúster o máquina física.',
    popularity: 91,
    sampleCode: 'FROM nvidia/cuda:12.2.0-runtime-ubuntu22.04\nRUN apt-get update && apt-get install -y python3-pip\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt',
    officialSite: 'https://docker.com',
    badge: 'Reproducibility'
  },
  {
    name: 'APIs & Cloud MLOps',
    category: 'Infraestructura',
    description: 'Servicios de inferencia serveless, endpoints REST/gRPC y plataformas de cómputo elástico en la nube con orquestación Kubeflow y Triton.',
    popularity: 89,
    sampleCode: 'from fastapi import FastAPI\napp = FastAPI()\n@app.post("/predict")\ndef inference(payload: ModelInput):\n    return {"prediction": model(payload.data)}',
    officialSite: 'https://fastapi.tiangolo.com',
    badge: 'Deployment'
  }
];

export const ETHICS_THEMES = [
  {
    title: 'Ética y Alineación de la IA',
    icon: 'Scale',
    color: 'cyan',
    summary: 'Asegurar que los objetivos y comportamientos de los sistemas de IA permanezcan alineados con el bienestar, los valores morales y los derechos humanos universales.',
    challenges: ['Problema del alineamiento (Value Alignment Problem)', 'Definición formal de moralidad computable', 'Supervisión humana en sistemas ultrarrápidos'],
    solutions: ['Aprendizaje por refuerzo con feedback humano (RLHF)', 'Constitutional AI con principios rectores', 'Comités de auditoría ética independientes']
  },
  {
    title: 'Privacidad y Confidencialidad de Datos',
    icon: 'Lock',
    color: 'green',
    summary: 'Proteger la identidad y los registros sensibles de los individuos frente a técnicas de extracción de entrenamiento o memorización no deseada.',
    challenges: ['Ataques de inferencia de membresía', 'Exfiltración de datos confidenciales en prompts', 'Cumplimiento normativo transfronterizo (GDPR, CCPA)'],
    solutions: ['Privacidad diferencial (Differential Privacy)', 'Aprendizaje federado (Federated Learning)', 'Cómputo confidencial en enclaves seguros']
  },
  {
    title: 'Sesgos Algorítmicos y Equidad',
    icon: 'Users',
    color: 'purple',
    summary: 'Prevenir la perpetuación o amplificación de discriminaciones históricas raciales, de género, socioeconómicas o geográficas presentes en los datos de entrenamiento.',
    challenges: ['Desbalance estadístico en datasets públicos', 'Variables proxies encubiertas (ej. código postal)', 'Compromiso matemático entre diferentes métricas de justicia'],
    solutions: ['Auditorías de representatividad estadística', 'Técnicas de re-ponderación y contra-muestreo', 'Métricas de paridad demográfica e impacto dispar']
  },
  {
    title: 'Seguridad y Ciberdefensa de Modelos',
    icon: 'ShieldCheck',
    color: 'blue',
    summary: 'Blindar los sistemas de inteligencia artificial contra vectores de ataque específicos como inyecciones de prompts, jailbreaks y envenenamiento de datos.',
    challenges: ['Ataques adversarios con perturbaciones imperceptibles', 'Data Poisoning durante pre-entrenamiento', 'Jailbreaks multimodales complejos'],
    solutions: ['Entrenamiento adversario robusto (Adversarial Training)', 'Monitoreo de entropía en inputs y outputs', 'Sandboxing estricto de ejecuciones de código']
  },
  {
    title: 'Transparencia y Explicabilidad (XAI)',
    icon: 'Eye',
    color: 'cyan',
    summary: 'Eliminar el efecto "caja negra" de los modelos profundos, permitiendo que humanos comprendan por qué un sistema tomó una decisión médica o judicial crucial.',
    challenges: ['Complejidad no lineal de redes con miles de millones de pesos', 'Intercambio entre precisión predictiva y simplicidad explicativa'],
    solutions: ['Métodos SHAP (Shapley Additive Explanations)', 'LIME (Local Interpretable Model-agnostic Explanations)', 'Mapas de calor de atención y saliency maps']
  },
  {
    title: 'Gobernanza y Uso Responsable',
    icon: 'FileText',
    color: 'green',
    summary: 'Marcos regulatorios internacionales (EU AI Act, NIST AI Risk Management Framework) que clasifican los riesgos y responsabilizan legalmente a los desarrolladores.',
    challenges: ['Velocidad de innovación tecnológica vs lentitud legislativa', 'Fronteras geopolíticas en el desarrollo de modelos de frontera'],
    solutions: ['Tarjetas de modelo (Model Cards) y datasheets de datos', 'Auditorías de terceros certificadas', 'Marcas de agua criptográficas en contenido sintético']
  },
  {
    title: 'Impacto Laboral y Transformación',
    icon: 'Briefcase',
    color: 'purple',
    summary: 'La automatización inteligente redefinirá la fuerza de trabajo global, sustituyendo tareas repetitivas y exigiendo programas masivos de recualificación digital (Reskilling).',
    challenges: ['Transición abrupta en puestos administrativos y creativos', 'Brecha digital y concentración de riqueza tecnológica'],
    solutions: ['Colaboración humano-en-el-bucle (Human-in-the-Loop)', 'Educación técnica continua en habilidades aumentadas por IA', 'Políticas públicas de transición económica inclusiva']
  },
  {
    title: 'Futuro de la IA: Hacia la AGI',
    icon: 'Rocket',
    color: 'blue',
    summary: 'Exploración del horizonte hacia la Inteligencia Artificial General (AGI), la superinteligencia sintética (ASI) y la coexistencia armónica a largo plazo.',
    challenges: ['Riesgos existenciales y pérdida de control sistémico', 'Capacidades emergentes impredecibles en escalado exponencial'],
    solutions: ['Investigación proactiva en seguridad de AGI', 'Protocolos internacionales de no proliferación de modelos no alineados', 'Investigación en interpretabilidad mecanicista']
  }
];
