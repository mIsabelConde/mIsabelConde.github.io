import React, { useState } from 'react';
import { 
  Database, Sparkles, Search, BarChart3, LineChart, PieChart, 
  CheckCircle, ArrowRight, Layers, Table, RefreshCw
} from 'lucide-react';

export const DataScienceSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeChartType, setActiveChartType] = useState<'distribucion' | 'correlacion' | 'boxplot'>('distribucion');
  const [selectedDataset, setSelectedDataset] = useState<'iot' | 'salud' | 'finanzas'>('iot');

  const lifecycleSteps = [
    {
      id: 'recoleccion',
      title: '1. Recolección',
      sub: 'Ingesta de Datos',
      icon: Database,
      desc: 'Extracción de fuentes heterogéneas: Data Warehouses, APIs REST, feeds Kafka en tiempo real, web scraping y bases de datos relacionales.',
      tech: 'SQL • Kafka • Scrapy • BigQuery',
      badge: 'Extracción Bruta'
    },
    {
      id: 'limpieza',
      title: '2. Limpieza',
      sub: 'Tratamiento y ETL',
      icon: Sparkles,
      desc: 'Detección y tratamiento de valores nulos (NaN), corrección de outliers, normalización min-max, estandarización z-score y codificación one-hot.',
      tech: 'Pandas • Polars • PySpark • NumPy',
      badge: 'Data Wrangling'
    },
    {
      id: 'exploracion',
      title: '3. Exploración',
      sub: 'EDA Exhaustivo',
      icon: Search,
      desc: 'Análisis Exploratorio de Datos (EDA) para identificar distribuciones bivariadas, asimetría estadística (skewness), kurtosis y patrones emergentes.',
      tech: 'Seaborn • Plotly • Matplotlib',
      badge: 'Inspección Visual'
    },
    {
      id: 'analisis',
      title: '4. Análisis',
      sub: 'Estadística Formal',
      icon: BarChart3,
      desc: 'Contraste de hipótesis, cálculo de p-valores, intervalos de confianza del 95%, pruebas t-Student, ANOVA y correlaciones de Pearson/Spearman.',
      tech: 'SciPy • Statsmodels • R',
      badge: 'Inferencia'
    },
    {
      id: 'modelo',
      title: '5. Modelo',
      sub: 'Modelado Predictivo',
      icon: Layers,
      desc: 'Selección de arquitecturas óptimas (Random Forest, XGBoost, Regresión Logística), ajuste fino de hiperparámetros (Grid/Bayesian Search) y validación K-Fold.',
      tech: 'Scikit-learn • XGBoost • LightGBM',
      badge: 'Entrenamiento'
    },
    {
      id: 'visualizacion',
      title: '6. Visualización',
      sub: 'Dashboards Ejecutivos',
      icon: LineChart,
      desc: 'Comunicación visual de hallazgos mediante gráficos intuitivos que transforman métricas abstractas en narrativas cuantitativas de alto impacto.',
      tech: 'D3.js • Grafana • PowerBI • Tableau',
      badge: 'Storytelling'
    },
    {
      id: 'decision',
      title: '7. Decisión',
      sub: 'Impacto Estratégico',
      icon: CheckCircle,
      desc: 'Traducción de conclusiones cuantitativas en decisiones operativas de negocio, automatización de políticas y despliegue de pipelines MLOps.',
      tech: 'MLflow • Docker • Kubernetes • FastAPI',
      badge: 'Acción'
    }
  ];

  return (
    <section id="data-science" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/40 border border-blue-500/30 text-blue-300 font-tech text-xs uppercase mb-3">
          <Database className="w-3.5 h-3.5" />
          <span>Módulo 03 • Ciclo Completo de Datos</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
          CIENCIA <span className="text-blue-400 text-glow-blue">DE DATOS</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          El pipeline riguroso que transforma registros brutos no estructurados en conocimiento predictivo y decisiones estratégicas cuantificables.
        </p>
      </div>

      {/* Interactive Lifecycle Breadcrumb Steps */}
      <div className="mb-10 overflow-x-auto pb-4">
        <div className="flex items-center min-w-[700px] justify-between relative px-2">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-800 -translate-y-1/2 -z-0" />
          
          {lifecycleSteps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx <= activeStep;
            const isCurrent = idx === activeStep;

            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className="relative z-10 flex flex-col items-center cursor-pointer group"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? 'bg-blue-500 text-black shadow-[0_0_20px_rgba(59,130,246,0.6)] scale-110'
                      : isCompleted
                      ? 'bg-blue-950 border border-blue-400 text-blue-300'
                      : 'bg-slate-900 border border-slate-700 text-slate-400 group-hover:border-slate-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="mt-2 text-center">
                  <div className={`text-[11px] font-tech font-bold ${isCurrent ? 'text-blue-400' : 'text-slate-400'}`}>
                    {step.title}
                  </div>
                  <div className="text-[9px] text-slate-400 hidden sm:block">
                    {step.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Step Details Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-blue-500/30 mb-12 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-tech uppercase bg-blue-950 text-blue-300 border border-blue-500/40">
                {lifecycleSteps[activeStep].badge}
              </span>
              <span className="text-xs font-tech text-slate-400">Paso {activeStep + 1} de 7</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              {lifecycleSteps[activeStep].title} — {lifecycleSteps[activeStep].sub}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {lifecycleSteps[activeStep].desc}
            </p>
            <div className="text-xs font-tech text-cyan-300">
              Stack estándar: <span className="text-white font-mono">{lifecycleSteps[activeStep].tech}</span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-2 justify-end">
            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % lifecycleSteps.length)}
              className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-tech font-bold text-xs uppercase flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] cursor-pointer"
            >
              <span>Siguiente Etapa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="text-center text-[10px] font-tech text-slate-400">
              Haz clic en cualquier fase superior para explorarla
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Data Science Visualization Lab */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.7)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-blue-400 text-xs font-tech uppercase mb-1">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Explorador Gráfico Interactivo</span>
            </div>
            <h3 className="text-xl font-display font-bold text-white">
              Visualizaciones Estadísticas Dinámicas en SVG/Canvas
            </h3>
          </div>

          {/* Dataset Switcher & Chart Type */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 text-xs font-tech text-cyan-300 rounded-lg px-3 py-1.5 focus:border-cyan-400 focus:outline-none"
            >
              <option value="iot">Dataset: Telemetría Sensores IoT</option>
              <option value="salud">Dataset: Biomarcadores Clínicos</option>
              <option value="finanzas">Dataset: Transacciones Financieras</option>
            </select>

            <div className="inline-flex bg-slate-950 border border-slate-800 rounded-lg p-1">
              <button
                onClick={() => setActiveChartType('distribucion')}
                className={`px-3 py-1 text-xs font-tech rounded-md transition-colors ${
                  activeChartType === 'distribucion' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Histograma
              </button>
              <button
                onClick={() => setActiveChartType('correlacion')}
                className={`px-3 py-1 text-xs font-tech rounded-md transition-colors ${
                  activeChartType === 'correlacion' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Correlación Heatmap
              </button>
              <button
                onClick={() => setActiveChartType('boxplot')}
                className={`px-3 py-1 text-xs font-tech rounded-md transition-colors ${
                  activeChartType === 'boxplot' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Boxplot Cuantiles
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Graphic Display */}
        <div className="w-full bg-[#080c11] rounded-xl p-5 border border-slate-800/80">
          {activeChartType === 'distribucion' && (
            <div>
              <div className="flex justify-between items-center text-xs font-tech text-slate-400 mb-3">
                <span>Distribución Normal Ajustada (μ=52.4, σ=11.2) con Histograma de Frecuencias</span>
                <span className="text-emerald-400 font-bold">N=5,000 Muestras</span>
              </div>
              <div className="h-64 sm:h-72 w-full">
                <svg viewBox="0 0 600 240" className="w-full h-full overflow-visible">
                  {/* Axis */}
                  <line x1="40" y1="20" x2="40" y2="210" stroke="#1e293b" strokeWidth="1" />
                  <line x1="40" y1="210" x2="580" y2="210" stroke="#1e293b" strokeWidth="1" />

                  {/* Histogram bars */}
                  {[
                    12, 28, 48, 85, 130, 175, 195, 180, 140, 92, 55, 30, 15, 8
                  ].map((height, i) => {
                    const barX = 60 + i * 36;
                    const barY = 210 - height;
                    return (
                      <g key={i}>
                        <rect
                          x={barX}
                          y={barY}
                          width="30"
                          height={height}
                          fill="rgba(59, 130, 246, 0.65)"
                          stroke="#3b82f6"
                          strokeWidth="1"
                          rx="2"
                        />
                        <text x={barX + 15} y="225" fill="#64748b" fontSize="9" textAnchor="middle" fontFamily="monospace">
                          {20 + i * 5}
                        </text>
                      </g>
                    );
                  })}

                  {/* Gaussian Bell curve overlay */}
                  <path
                    d="M 60 205 Q 160 190, 230 110 T 310 15 T 410 130 T 540 205"
                    fill="none"
                    stroke="#00f3ff"
                    strokeWidth="2.5"
                  />
                  <text x="310" y="30" fill="#00f3ff" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    Curva Gaussiana Teórica
                  </text>
                </svg>
              </div>
            </div>
          )}

          {activeChartType === 'correlacion' && (
            <div>
              <div className="flex justify-between items-center text-xs font-tech text-slate-400 mb-3">
                <span>Matriz de Correlación de Pearson (-1.0 a +1.0) entre Features del Dataset</span>
                <span className="text-cyan-400 font-mono">Heatmap de Calor Normalizado</span>
              </div>

              {/* Heatmap Grid */}
              <div className="grid grid-cols-5 gap-2 max-w-xl mx-auto py-2">
                {[
                  ['Temp', '1.00', '0.84', '-0.42', '0.68'],
                  ['Pres', '0.84', '1.00', '-0.65', '0.73'],
                  ['Humed', '-0.42', '-0.65', '1.00', '-0.29'],
                  ['Volt', '0.68', '0.73', '-0.29', '1.00'],
                  ['Target', '0.91', '0.88', '-0.51', '0.79']
                ].map((row, rIdx) => (
                  <React.Fragment key={rIdx}>
                    {row.map((val, cIdx) => {
                      const num = parseFloat(val);
                      let bgColor = 'bg-slate-900';
                      let textColor = 'text-slate-300';
                      if (!isNaN(num)) {
                        if (num > 0.8) { bgColor = 'bg-cyan-500/80'; textColor = 'text-black font-bold'; }
                        else if (num > 0.5) { bgColor = 'bg-cyan-700/60'; textColor = 'text-white'; }
                        else if (num > 0) { bgColor = 'bg-cyan-900/40'; textColor = 'text-cyan-200'; }
                        else if (num < -0.5) { bgColor = 'bg-rose-900/70'; textColor = 'text-rose-200'; }
                        else { bgColor = 'bg-rose-950/40'; textColor = 'text-rose-300'; }
                      }
                      return (
                        <div
                          key={cIdx}
                          className={`p-3 rounded-lg border border-slate-800 text-center font-tech text-xs transition-transform hover:scale-105 ${bgColor} ${textColor}`}
                        >
                          {val}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-center items-center gap-4 text-[10px] font-tech text-slate-400 mt-3">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-cyan-500 rounded" /> Correlación Positiva Alta</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-800 rounded" /> Neutral (~0.0)</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-rose-900 rounded" /> Correlación Inversa Fuerte</span>
              </div>
            </div>
          )}

          {activeChartType === 'boxplot' && (
            <div>
              <div className="flex justify-between items-center text-xs font-tech text-slate-400 mb-3">
                <span>Diagrama de Caja y Bigotes (Mediana, Rango Intercuartil IQR y Outliers)</span>
                <span className="text-emerald-400 font-mono">Tukey Boxplot</span>
              </div>
              <div className="h-60 sm:h-64 w-full">
                <svg viewBox="0 0 600 220" className="w-full h-full overflow-visible">
                  <line x1="50" y1="20" x2="50" y2="190" stroke="#1e293b" strokeWidth="1" />
                  <line x1="50" y1="190" x2="580" y2="190" stroke="#1e293b" strokeWidth="1" />

                  {/* 3 Boxplots for classes A, B, C */}
                  {[
                    { label: 'Cluster Alpha', x: 130, q1: 130, med: 100, q3: 70, min: 160, max: 40, out: [25] },
                    { label: 'Cluster Beta', x: 290, q1: 150, med: 120, q3: 90, min: 180, max: 60, out: [35, 195] },
                    { label: 'Cluster Gamma', x: 450, q1: 110, med: 80, q3: 50, min: 140, max: 30, out: [] }
                  ].map((box, idx) => (
                    <g key={idx}>
                      {/* Whiskers */}
                      <line x1={box.x} y1={box.max} x2={box.x} y2={box.q3} stroke="#00ff66" strokeWidth="1.5" />
                      <line x1={box.x} y1={box.q1} x2={box.x} y2={box.min} stroke="#00ff66" strokeWidth="1.5" />
                      <line x1={box.x - 15} y1={box.max} x2={box.x + 15} y2={box.max} stroke="#00ff66" strokeWidth="1.5" />
                      <line x1={box.x - 15} y1={box.min} x2={box.x + 15} y2={box.min} stroke="#00ff66" strokeWidth="1.5" />

                      {/* Box (Q1 to Q3) */}
                      <rect
                        x={box.x - 30}
                        y={box.q3}
                        width="60"
                        height={box.q1 - box.q3}
                        fill="rgba(0, 255, 102, 0.2)"
                        stroke="#00ff66"
                        strokeWidth="2"
                        rx="2"
                      />

                      {/* Median line */}
                      <line x1={box.x - 30} y1={box.med} x2={box.x + 30} y2={box.med} stroke="#ffffff" strokeWidth="2.5" />

                      {/* Outliers */}
                      {box.out.map((outY, oIdx) => (
                        <circle key={oIdx} cx={box.x} cy={outY} r="3.5" fill="#f43f5e" />
                      ))}

                      {/* Label */}
                      <text x={box.x} y="208" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                        {box.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
