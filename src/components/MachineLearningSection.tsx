import React, { useState, useMemo } from 'react';
import { 
  Binary, CheckCircle2, Shuffle, Repeat, Sliders, RefreshCw, 
  TrendingUp, Layers, HelpCircle, ArrowRight, Activity
} from 'lucide-react';

export const MachineLearningSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'supervisado' | 'no-supervisado' | 'refuerzo'>('supervisado');

  // Interactive Prediction Simulator State
  const [slope, setSlope] = useState<number>(2.4);
  const [intercept, setIntercept] = useState<number>(15);
  const [noiseLevel, setNoiseLevel] = useState<number>(12);
  const [sampleCount, setSampleCount] = useState<number>(30);
  const [queryX, setQueryX] = useState<number>(50);
  const [seed, setSeed] = useState<number>(42);

  // RL Step animation state
  const [rlStep, setRlStep] = useState<number>(0);
  const rlSteps = [
    { title: '1. Agente (Policy Network)', desc: 'Evalúa el estado actual s_t y selecciona una acción a_t para maximizar la recompensa futura esperada.', color: 'text-cyan-400' },
    { title: '2. Acción (a_t)', desc: 'Envía la decisión ejecutiva (ej: acelerar, comprar acción, girar brazo) al entorno operativo.', color: 'text-emerald-400' },
    { title: '3. Entorno (Environment / MDP)', desc: 'El sistema físico o digital procesa la acción y transiciona a un nuevo estado s_t+1.', color: 'text-blue-400' },
    { title: '4. Recompensa (r_t+1)', desc: 'Feedback escalar cuantitativo (+1 por éxito, -10 por colisión) para actualizar la función Q.', color: 'text-amber-400' }
  ];

  // Generate synthetic points based on parameters
  const dataset = useMemo(() => {
    // pseudo-random with seed
    const points: { x: number; y: number }[] = [];
    let currentRandom = seed;
    const lcg = () => {
      currentRandom = (currentRandom * 1664525 + 1013904223) % 4294967296;
      return currentRandom / 4294967296;
    };

    for (let i = 0; i < sampleCount; i++) {
      const x = (i / (sampleCount - 1)) * 100;
      const noise = (lcg() - 0.5) * noiseLevel * 2;
      const y = Math.max(0, Math.min(300, slope * x + intercept + noise));
      points.push({ x, y });
    }
    return points;
  }, [slope, intercept, noiseLevel, sampleCount, seed]);

  // Compute metrics (Linear Regression fit)
  const { predY, mse, r2 } = useMemo(() => {
    const n = dataset.length;
    if (n === 0) return { predY: 0, mse: 0, r2: 0 };

    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0, sumYY = 0;
    dataset.forEach(p => {
      sumX += p.x;
      sumY += p.y;
      sumXY += p.x * p.y;
      sumXX += p.x * p.x;
      sumYY += p.y * p.y;
    });

    const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX || 1);
    const b = (sumY - m * sumX) / n;

    // MSE
    let totalError = 0;
    dataset.forEach(p => {
      const yHat = m * p.x + b;
      totalError += Math.pow(p.y - yHat, 2);
    });
    const mseVal = totalError / n;

    // R2
    const meanY = sumY / n;
    let ssTot = 0, ssRes = 0;
    dataset.forEach(p => {
      ssTot += Math.pow(p.y - meanY, 2);
      ssRes += Math.pow(p.y - (m * p.x + b), 2);
    });
    const r2Val = ssTot === 0 ? 1 : Math.max(0, 1 - ssRes / ssTot);

    // Predict for queryX
    const predictedY = Math.max(0, slope * queryX + intercept);

    return {
      predY: predictedY.toFixed(1),
      mse: mseVal.toFixed(1),
      r2: (r2Val * 100).toFixed(1)
    };
  }, [dataset, slope, intercept, queryX]);

  return (
    <section id="machine-learning" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-tech text-xs uppercase mb-3">
          <Binary className="w-3.5 h-3.5" />
          <span>Módulo 02 • Algoritmos de Aprendizaje</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
          MACHINE <span className="text-emerald-400 text-glow-green">LEARNING</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Los tres paradigmas esenciales para transformar datos en modelos predictivos y agentes que toman decisiones autónomas en entornos inciertos.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-xl bg-slate-900 border border-slate-800 gap-1">
          <button
            id="tab-supervisado"
            onClick={() => setActiveTab('supervisado')}
            className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-tech font-bold transition-all flex items-center gap-2 ${
              activeTab === 'supervisado'
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Supervisado</span>
          </button>
          <button
            id="tab-no-supervisado"
            onClick={() => setActiveTab('no-supervisado')}
            className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-tech font-bold transition-all flex items-center gap-2 ${
              activeTab === 'no-supervisado'
                ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shuffle className="w-4 h-4" />
            <span>No Supervisado</span>
          </button>
          <button
            id="tab-refuerzo"
            onClick={() => setActiveTab('refuerzo')}
            className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-tech font-bold transition-all flex items-center gap-2 ${
              activeTab === 'refuerzo'
                ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Repeat className="w-4 h-4" />
            <span>Por Refuerzo</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="mb-14">
        {activeTab === 'supervisado' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            <div className="p-6 rounded-xl bg-slate-900/60 border border-cyan-500/30 hover:glow-cyan transition-all">
              <div className="text-cyan-400 font-tech text-xs uppercase mb-2">01 • Aprendizaje Continuo</div>
              <h3 className="text-xl font-display font-bold text-white mb-2">Regresión</h3>
              <p className="text-slate-300 text-sm mb-4">
                Modela y predice variables dependientes continuas numéricas a partir de un vector de atributos independientes.
              </p>
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300 font-tech">
                <span className="text-cyan-300 font-bold">Ejemplo:</span> Estimación del precio de bienes raíces según metros cuadrados, antigüedad y ubicación geoespacial.
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/60 border border-cyan-500/30 hover:glow-cyan transition-all">
              <div className="text-cyan-400 font-tech text-xs uppercase mb-2">02 • Categorización Discreta</div>
              <h3 className="text-xl font-display font-bold text-white mb-2">Clasificación</h3>
              <p className="text-slate-300 text-sm mb-4">
                Asigna etiquetas discretas o multiclase a muestras desconocidas calculando límites de decisión óptimos (hiperplanos).
              </p>
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300 font-tech">
                <span className="text-cyan-300 font-bold">Ejemplo:</span> Filtrado de correos legítimos vs Phishing / Spam bancario mediante Support Vector Machines.
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/60 border border-cyan-500/30 hover:glow-cyan transition-all">
              <div className="text-cyan-400 font-tech text-xs uppercase mb-2">03 • Pronóstico Temporal</div>
              <h3 className="text-xl font-display font-bold text-white mb-2">Predicción</h3>
              <p className="text-slate-300 text-sm mb-4">
                Extrapolación de tendencias secuenciales y estacionales en series temporales para proyectar escenarios futuros.
              </p>
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300 font-tech">
                <span className="text-cyan-300 font-bold">Ejemplo:</span> Predicción de demanda energética en la red eléctrica durante olas de calor extremas.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'no-supervisado' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            <div className="p-6 rounded-xl bg-slate-900/60 border border-emerald-500/30 hover:glow-green transition-all">
              <div className="text-emerald-400 font-tech text-xs uppercase mb-2">01 • Agrupamiento Natural</div>
              <h3 className="text-xl font-display font-bold text-white mb-2">Clustering</h3>
              <p className="text-slate-300 text-sm mb-4">
                Descubre subgrupos intrínsecos de datos con alta similitud intra-cluster y máxima distancia inter-cluster sin etiquetas previas.
              </p>
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300 font-tech">
                <span className="text-emerald-300 font-bold">Ejemplo:</span> Segmentación de clientes e-commerce por patrones de navegación y valor de vida (LTV).
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/60 border border-emerald-500/30 hover:glow-green transition-all">
              <div className="text-emerald-400 font-tech text-xs uppercase mb-2">02 • Compresión Vectorial</div>
              <h3 className="text-xl font-display font-bold text-white mb-2">Reducción de Dimensionalidad</h3>
              <p className="text-slate-300 text-sm mb-4">
                Proyecta espacios de alta dimensionalidad (cientos de columnas) a 2D o 3D conservando la varianza explicada o topología.
              </p>
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300 font-tech">
                <span className="text-emerald-300 font-bold">Ejemplo:</span> Visualización en 2D de embeddings genómicos de 50.000 genes mediante UMAP y PCA.
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/60 border border-emerald-500/30 hover:glow-green transition-all">
              <div className="text-emerald-400 font-tech text-xs uppercase mb-2">03 • Descubrimiento de Anomalías</div>
              <h3 className="text-xl font-display font-bold text-white mb-2">Detección de Patrones</h3>
              <p className="text-slate-300 text-sm mb-4">
                Identifica puntos de datos aislados o desviaciones inusuales que no se ajustan a la distribución normal del sistema.
              </p>
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300 font-tech">
                <span className="text-emerald-300 font-bold">Ejemplo:</span> Aislamiento de tráfico anómalo en servidores bancarios antes de que ocurra una denegación de servicio.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'refuerzo' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-amber-500/30 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-amber-400 font-tech text-xs uppercase">Bucle de Aprendizaje Autónomo</span>
              <h3 className="text-2xl font-display font-bold text-white mt-1">
                Agente <span className="text-cyan-400">→</span> Acción <span className="text-emerald-400">→</span> Entorno <span className="text-amber-400">→</span> Recompensa
              </h3>
              <p className="text-slate-300 text-sm mt-2">
                El agente aprende por ensayo y error interactuando con su entorno, maximizando la recompensa acumulativa a largo plazo (Markov Decision Process).
              </p>
            </div>

            {/* Interactive Loop Diagram */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {rlSteps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => setRlStep(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    rlStep === idx
                      ? 'bg-slate-800 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className={`font-tech font-bold text-sm mb-1 ${step.color}`}>
                    {step.title}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-tech text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span>Ejemplo emblemático: <strong>AlphaZero</strong> aprendiendo Ajedrez y Go desde cero hasta derrotar a grandes maestros mundiales.</span>
              </div>
              <button
                onClick={() => setRlStep((prev) => (prev + 1) % 4)}
                className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded hover:bg-amber-400/30 transition-colors flex items-center gap-1"
              >
                <span>Avanzar Paso</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Parameter Demo: Linear Regression / Prediction Simulator */}
      <div id="ml-interactive-simulator" className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-tech uppercase mb-1">
              <Sliders className="w-3.5 h-3.5" />
              <span>Laboratorio en Vivo</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Simulador de Predicción y Regresión en Tiempo Real
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Modifica los hiperparámetros y observa cómo la distribución empírica y la inferencia de la línea predictiva se reajustan dinámicamente.
            </p>
          </div>
          <button
            onClick={() => setSeed(Math.floor(Math.random() * 99999))}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-tech text-cyan-300 flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerar Semilla</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Sliders */}
          <div className="lg:col-span-5 space-y-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
            {/* Slope Slider */}
            <div>
              <div className="flex justify-between text-xs font-tech mb-1">
                <span className="text-slate-300">Pendiente (Tasa de Crecimiento β₁):</span>
                <span className="text-cyan-400 font-bold">{slope}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.1"
                value={slope}
                onChange={(e) => setSlope(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Intercept Slider */}
            <div>
              <div className="flex justify-between text-xs font-tech mb-1">
                <span className="text-slate-300">Término Independiente (Sesgo β₀):</span>
                <span className="text-cyan-400 font-bold">{intercept}</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={intercept}
                onChange={(e) => setIntercept(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Noise Slider */}
            <div>
              <div className="flex justify-between text-xs font-tech mb-1">
                <span className="text-slate-300">Varianza Estocástica (Ruido):</span>
                <span className="text-emerald-400 font-bold">{noiseLevel}</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="2"
                value={noiseLevel}
                onChange={(e) => setNoiseLevel(parseInt(e.target.value))}
                className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Query X Prediction Slider */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between text-xs font-tech mb-1">
                <span className="text-cyan-300 font-bold">Punto de Inferencia (Input X):</span>
                <span className="text-amber-400 font-bold">{queryX}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={queryX}
                onChange={(e) => setQueryX(parseInt(e.target.value))}
                className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Model Output Telemetry */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="text-[10px] font-tech text-slate-400">Predicción ŷ</div>
                <div className="text-sm font-tech font-bold text-amber-400">{predY}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="text-[10px] font-tech text-slate-400">Error MSE</div>
                <div className="text-sm font-tech font-bold text-rose-400">{mse}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="text-[10px] font-tech text-slate-400">Precisión R²</div>
                <div className="text-sm font-tech font-bold text-emerald-400">{r2}%</div>
              </div>
            </div>
          </div>

          {/* Canvas SVG Graph */}
          <div className="lg:col-span-7 bg-[#090d12] p-4 rounded-xl border border-slate-800 relative">
            <div className="text-xs font-tech text-slate-400 mb-2 flex items-center justify-between">
              <span>Gráfico de Dispersión y Ajuste MCO (Ordinary Least Squares)</span>
              <span className="text-cyan-400">Ecuación: ŷ = {slope}x + {intercept}</span>
            </div>

            {/* SVG Graph View */}
            <div className="w-full h-64 sm:h-72 relative">
              <svg viewBox="0 0 500 300" className="w-full h-full overflow-visible">
                {/* Grid Lines */}
                <line x1="50" y1="20" x2="50" y2="260" stroke="#1e293b" strokeWidth="1" />
                <line x1="50" y1="260" x2="480" y2="260" stroke="#1e293b" strokeWidth="1" />
                <line x1="50" y1="180" x2="480" y2="180" stroke="#1e293b" strokeDasharray="3,3" strokeWidth="0.8" />
                <line x1="50" y1="100" x2="480" y2="100" stroke="#1e293b" strokeDasharray="3,3" strokeWidth="0.8" />
                <line x1="190" y1="20" x2="190" y2="260" stroke="#1e293b" strokeDasharray="3,3" strokeWidth="0.8" />
                <line x1="330" y1="20" x2="330" y2="260" stroke="#1e293b" strokeDasharray="3,3" strokeWidth="0.8" />

                {/* Axis Labels */}
                <text x="250" y="290" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">Variable Predictora (X)</text>
                <text x="20" y="140" fill="#64748b" fontSize="10" textAnchor="middle" transform="rotate(-90 20 140)" fontFamily="monospace">Objetivo (Y)</text>

                {/* Fitted Regression Line */}
                {(() => {
                  const startX = 50;
                  const startY = 260 - ((intercept) / 300) * 240;
                  const endX = 480;
                  const endYVal = slope * 100 + intercept;
                  const endY = 260 - (Math.min(endYVal, 300) / 300) * 240;
                  return (
                    <line
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      stroke="#00f3ff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  );
                })()}

                {/* Synthetic Data Points */}
                {dataset.map((pt, idx) => {
                  const svgX = 50 + (pt.x / 100) * 430;
                  const svgY = 260 - (Math.min(pt.y, 300) / 300) * 240;
                  return (
                    <circle
                      key={idx}
                      cx={svgX}
                      cy={svgY}
                      r="3.5"
                      fill="#00ff66"
                      opacity="0.85"
                    />
                  );
                })}

                {/* Query Prediction Point Indicator */}
                {(() => {
                  const qSvgX = 50 + (queryX / 100) * 430;
                  const calcY = Math.min(slope * queryX + intercept, 300);
                  const qSvgY = 260 - (calcY / 300) * 240;
                  return (
                    <g>
                      <line x1={qSvgX} y1="260" x2={qSvgX} y2={qSvgY} stroke="#fbbf24" strokeDasharray="4,4" strokeWidth="1.5" />
                      <line x1="50" y1={qSvgY} x2={qSvgX} y2={qSvgY} stroke="#fbbf24" strokeDasharray="4,4" strokeWidth="1.5" />
                      <circle cx={qSvgX} cy={qSvgY} r="7" fill="#fbbf24" stroke="#000" strokeWidth="2" />
                      <text x={qSvgX + 10} y={qSvgY - 8} fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace">
                        ŷ = {predY}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
