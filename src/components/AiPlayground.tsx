import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, Sliders, RefreshCw, Layers, Sparkles, Binary, 
  BarChart2, Zap, Download, Compass, Target
} from 'lucide-react';

interface ClusterPoint {
  x: number;
  y: number;
  cluster: number;
}

interface Centroid {
  x: number;
  y: number;
  color: string;
}

export const AiPlayground: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'clustering' | 'clasificacion' | 'generador'>('clustering');

  // ==========================================
  // 1. CLUSTERING K-MEANS STATE
  // ==========================================
  const [kCount, setKCount] = useState<number>(3);
  const [pointCount, setPointCount] = useState<number>(60);
  const [clusterSpread, setClusterSpread] = useState<number>(25);
  const [distributionType, setDistributionType] = useState<'gaussiana' | 'anillos' | 'aleatoria'>('gaussiana');
  const [kIteration, setKIteration] = useState<number>(0);
  
  const [points, setPoints] = useState<ClusterPoint[]>([]);
  const [centroids, setCentroids] = useState<Centroid[]>([]);

  const clusterColors = ['#00f3ff', '#00ff66', '#f43f5e', '#a855f7', '#fbbf24'];

  // Initialize points and centroids
  const initKMeansData = () => {
    const newPoints: ClusterPoint[] = [];
    const width = 500;
    const height = 300;

    if (distributionType === 'gaussiana') {
      const centers = [
        { x: 120, y: 100 },
        { x: 380, y: 120 },
        { x: 250, y: 220 },
        { x: 140, y: 220 },
        { x: 360, y: 230 }
      ];

      for (let i = 0; i < pointCount; i++) {
        const c = centers[i % kCount];
        const rad = Math.random() * clusterSpread * 1.5;
        const angle = Math.random() * Math.PI * 2;
        const x = Math.max(20, Math.min(width - 20, c.x + Math.cos(angle) * rad));
        const y = Math.max(20, Math.min(height - 20, c.y + Math.sin(angle) * rad));
        newPoints.push({ x, y, cluster: -1 });
      }
    } else if (distributionType === 'anillos') {
      for (let i = 0; i < pointCount; i++) {
        const isInner = i % 2 === 0;
        const rad = isInner ? Math.random() * 40 + 20 : Math.random() * 50 + 90;
        const angle = Math.random() * Math.PI * 2;
        const x = 250 + Math.cos(angle) * rad;
        const y = 150 + Math.sin(angle) * rad;
        newPoints.push({ x, y, cluster: -1 });
      }
    } else {
      for (let i = 0; i < pointCount; i++) {
        newPoints.push({
          x: Math.random() * (width - 40) + 20,
          y: Math.random() * (height - 40) + 20,
          cluster: -1
        });
      }
    }

    // Centroids
    const newCentroids: Centroid[] = [];
    for (let k = 0; k < kCount; k++) {
      newCentroids.push({
        x: Math.random() * (width - 80) + 40,
        y: Math.random() * (height - 80) + 40,
        color: clusterColors[k % clusterColors.length]
      });
    }

    setPoints(newPoints);
    setCentroids(newCentroids);
    setKIteration(0);
  };

  useEffect(() => {
    initKMeansData();
  }, [kCount, pointCount, clusterSpread, distributionType]);

  // Step 1: Assign points to nearest centroid
  // Step 2: Recalculate centroids
  const stepKMeans = () => {
    if (centroids.length === 0 || points.length === 0) return;

    // 1. Assign each point to closest centroid
    const updatedPoints = points.map((p) => {
      let minDist = Infinity;
      let bestCluster = 0;
      centroids.forEach((c, idx) => {
        const dist = Math.hypot(p.x - c.x, p.y - c.y);
        if (dist < minDist) {
          minDist = dist;
          bestCluster = idx;
        }
      });
      return { ...p, cluster: bestCluster };
    });

    // 2. Re-estimate centroids
    const updatedCentroids = centroids.map((c, cIdx) => {
      const assigned = updatedPoints.filter((p) => p.cluster === cIdx);
      if (assigned.length === 0) return c;
      const avgX = assigned.reduce((sum, p) => sum + p.x, 0) / assigned.length;
      const avgY = assigned.reduce((sum, p) => sum + p.y, 0) / assigned.length;
      return { ...c, x: avgX, y: avgY };
    });

    setPoints(updatedPoints);
    setCentroids(updatedCentroids);
    setKIteration((prev) => prev + 1);
  };

  // ==========================================
  // 2. CLASIFICACIÓN HYPERPLANE STATE
  // ==========================================
  const [boundaryAngle, setBoundaryAngle] = useState<number>(35);
  const [boundaryBias, setBoundaryBias] = useState<number>(140);
  const [marginWidth, setMarginWidth] = useState<number>(18);

  const classPoints = useMemo(() => {
    const pts: { x: number; y: number; actualClass: 0 | 1 }[] = [];
    // Class 0 (top-left cluster)
    for (let i = 0; i < 25; i++) {
      pts.push({
        x: 100 + (Math.random() - 0.5) * 110,
        y: 80 + (Math.random() - 0.5) * 80,
        actualClass: 0
      });
    }
    // Class 1 (bottom-right cluster)
    for (let i = 0; i < 25; i++) {
      pts.push({
        x: 380 + (Math.random() - 0.5) * 110,
        y: 200 + (Math.random() - 0.5) * 80,
        actualClass: 1
      });
    }
    return pts;
  }, []);

  // Compute Classification Accuracy
  const { accuracy, misclassified } = useMemo(() => {
    const rad = (boundaryAngle * Math.PI) / 180;
    // normal vector
    const nx = Math.cos(rad);
    const ny = Math.sin(rad);

    let correct = 0;
    classPoints.forEach((p) => {
      const val = (p.x - 250) * nx + (p.y - boundaryBias) * ny;
      const predictedClass = val >= 0 ? 1 : 0;
      if (predictedClass === p.actualClass) correct++;
    });

    const acc = Math.round((correct / classPoints.length) * 100);
    return {
      accuracy: acc,
      misclassified: classPoints.length - correct
    };
  }, [classPoints, boundaryAngle, boundaryBias]);

  // ==========================================
  // 3. SYNTHETIC DATA EXPORTER
  // ==========================================
  const [dataFeatures, setDataFeatures] = useState<number>(4);
  const [dataRows, setDataRows] = useState<number>(50);

  const downloadDataset = () => {
    let csv = 'id,feature_1,feature_2,feature_3,feature_4,label\n';
    for (let i = 1; i <= dataRows; i++) {
      const f1 = (Math.random() * 10).toFixed(2);
      const f2 = (Math.random() * 100).toFixed(2);
      const f3 = (Math.random() * 5 - 2.5).toFixed(2);
      const f4 = (Math.random() * 1).toFixed(3);
      const label = parseFloat(f1) * 2 + parseFloat(f3) > 10 ? 1 : 0;
      csv += `${i},${f1},${f2},${f3},${f4},${label}\n`;
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neuronexus_synthetic_dataset_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="playground" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 font-tech text-xs uppercase mb-3 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Módulo 06 • Entorno Experimental</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
          AI <span className="text-cyan-400 text-glow-cyan">PLAYGROUND</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Laboratorio interactivo en tiempo real. Ajusta hiperparámetros, entrena modelos de clustering y clasifica datos bidimensionales sin recargar la página.
        </p>

        {/* Mode Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setActiveMode('clustering')}
            className={`px-5 py-2 rounded-xl text-xs font-tech font-bold transition-all flex items-center gap-2 ${
              activeMode === 'clustering'
                ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,243,255,0.4)]'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Clustering K-Means 2D</span>
          </button>

          <button
            onClick={() => setActiveMode('clasificacion')}
            className={`px-5 py-2 rounded-xl text-xs font-tech font-bold transition-all flex items-center gap-2 ${
              activeMode === 'clasificacion'
                ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(0,255,102,0.4)]'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Hiperplano Clasificador SVM</span>
          </button>

          <button
            onClick={() => setActiveMode('generador')}
            className={`px-5 py-2 rounded-xl text-xs font-tech font-bold transition-all flex items-center gap-2 ${
              activeMode === 'generador'
                ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Binary className="w-4 h-4" />
            <span>Generador Sintético</span>
          </button>
        </div>
      </div>

      {/* Mode 1: CLUSTERING K-MEANS */}
      {activeMode === 'clustering' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-cyan-500/30 backdrop-blur-xl animate-in fade-in duration-300">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-5 bg-slate-950/70 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-display font-bold text-white text-base">Parámetros K-Means</h3>
              <span className="text-xs font-tech text-cyan-400">Iteración #{kIteration}</span>
            </div>

            {/* Clusters count (K) */}
            <div>
              <div className="flex justify-between text-xs font-tech mb-1">
                <span className="text-slate-300">Número de Clústers (K):</span>
                <span className="text-cyan-400 font-bold">{kCount}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[2, 3, 4, 5].map((k) => (
                  <button
                    key={k}
                    onClick={() => setKCount(k)}
                    className={`py-1.5 text-xs font-tech rounded-lg border transition-all ${
                      kCount === k
                        ? 'bg-cyan-500 text-black font-bold border-cyan-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    K={k}
                  </button>
                ))}
              </div>
            </div>

            {/* Distribution type */}
            <div>
              <label className="text-[11px] font-tech text-slate-400 block mb-1">Topología de Datos:</label>
              <select
                value={distributionType}
                onChange={(e) => setDistributionType(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 text-xs font-tech text-cyan-300 rounded-lg p-2 focus:border-cyan-400"
              >
                <option value="gaussiana">Clusters Gaussianos (Separables)</option>
                <option value="anillos">Círculos Concéntricos (No lineales)</option>
                <option value="aleatoria">Distribución Uniforme (Ruido)</option>
              </select>
            </div>

            {/* Point Count */}
            <div>
              <div className="flex justify-between text-xs font-tech mb-1">
                <span className="text-slate-300">Muestras Observadas (N):</span>
                <span className="text-emerald-400 font-bold">{pointCount}</span>
              </div>
              <input
                type="range"
                min="30"
                max="120"
                step="10"
                value={pointCount}
                onChange={(e) => setPointCount(parseInt(e.target.value))}
                className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                id="kmeans-step-btn"
                onClick={stepKMeans}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-tech font-bold text-xs uppercase flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(0,243,255,0.4)] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Iterar K-Means (Paso a Paso)</span>
              </button>

              <button
                onClick={initKMeansData}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-tech text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reiniciar Puntos & Centroides</span>
              </button>
            </div>
          </div>

          {/* 2D Canvas Display */}
          <div className="lg:col-span-8 bg-[#080c12] p-5 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs font-tech text-slate-400 mb-3">
              <span>Espacio Vectorial Bidimensional (R²)</span>
              <div className="flex items-center gap-2">
                {centroids.map((c, i) => (
                  <span key={i} className="flex items-center gap-1 text-[10px]">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    C{i + 1}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full h-72 sm:h-80 relative bg-slate-950 rounded-lg border border-slate-800/80 overflow-hidden">
              <svg viewBox="0 0 500 300" className="w-full h-full">
                {/* Background grid */}
                <defs>
                  <pattern id="grid-pattern" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="500" height="300" fill="url(#grid-pattern)" />

                {/* Lines connecting points to centroids if assigned */}
                {points.map((p, idx) => {
                  if (p.cluster >= 0 && centroids[p.cluster]) {
                    const c = centroids[p.cluster];
                    return (
                      <line
                        key={idx}
                        x1={p.x}
                        y1={p.y}
                        x2={c.x}
                        y2={c.y}
                        stroke={c.color}
                        strokeWidth="0.5"
                        strokeDasharray="2,2"
                        opacity="0.3"
                      />
                    );
                  }
                  return null;
                })}

                {/* Points */}
                {points.map((p, idx) => {
                  const color = p.cluster >= 0 && centroids[p.cluster]
                    ? centroids[p.cluster].color
                    : '#94a3b8';
                  return (
                    <circle
                      key={idx}
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill={color}
                      opacity={p.cluster >= 0 ? 0.9 : 0.5}
                    />
                  );
                })}

                {/* Centroids (Large glowing crosses) */}
                {centroids.map((c, idx) => (
                  <g key={idx}>
                    <circle cx={c.x} cy={c.y} r="10" fill="none" stroke={c.color} strokeWidth="2.5" />
                    <line x1={c.x - 7} y1={c.y} x2={c.x + 7} y2={c.y} stroke={c.color} strokeWidth="2" />
                    <line x1={c.x} y1={c.y - 7} x2={c.x} y2={c.y + 7} stroke={c.color} strokeWidth="2" />
                    <text x={c.x + 12} y={c.y + 4} fill={c.color} fontSize="11" fontWeight="bold" fontFamily="monospace">
                      μ{idx + 1}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="mt-3 text-xs font-tech text-slate-400 flex items-center justify-between">
              <span>Optimización: Minimización de la Inercia WCSS (Within-Cluster Sum of Squares)</span>
              <span className="text-cyan-400 font-bold">Convergencia en O(K • N • d)</span>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: CLASIFICADOR HIPERPLANO SVM */}
      {activeMode === 'clasificacion' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-emerald-500/30 backdrop-blur-xl animate-in fade-in duration-300">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-5 bg-slate-950/70 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-display font-bold text-white text-base">Frontera de Decisión</h3>
              <span className="text-xs font-tech text-emerald-400">SVM Lineal</span>
            </div>

            {/* Boundary Angle */}
            <div>
              <div className="flex justify-between text-xs font-tech mb-1">
                <span className="text-slate-300">Ángulo del Hiperplano (θ):</span>
                <span className="text-emerald-400 font-bold">{boundaryAngle}°</span>
              </div>
              <input
                type="range"
                min="-80"
                max="80"
                value={boundaryAngle}
                onChange={(e) => setBoundaryAngle(parseInt(e.target.value))}
                className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Boundary Bias */}
            <div>
              <div className="flex justify-between text-xs font-tech mb-1">
                <span className="text-slate-300">Término de Sesgo (Offset b):</span>
                <span className="text-emerald-400 font-bold">{boundaryBias}</span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                value={boundaryBias}
                onChange={(e) => setBoundaryBias(parseInt(e.target.value))}
                className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Margin Width */}
            <div>
              <div className="flex justify-between text-xs font-tech mb-1">
                <span className="text-slate-300">Ancho del Margen de Separación:</span>
                <span className="text-cyan-400 font-bold">{marginWidth} px</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={marginWidth}
                onChange={(e) => setMarginWidth(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Telemetry metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="text-[10px] font-tech text-slate-400">Precisión (Accuracy)</div>
                <div className="text-2xl font-tech font-bold text-emerald-400">{accuracy}%</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="text-[10px] font-tech text-slate-400">Muestras Erróneas</div>
                <div className="text-2xl font-tech font-bold text-rose-400">{misclassified}</div>
              </div>
            </div>

            <button
              onClick={() => {
                setBoundaryAngle(32);
                setBoundaryBias(142);
                setMarginWidth(22);
              }}
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-tech font-bold text-xs uppercase transition-colors"
            >
              Auto-Alinear Hiperplano Óptimo
            </button>
          </div>

          {/* SVG Viewport */}
          <div className="lg:col-span-8 bg-[#080c12] p-5 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs font-tech text-slate-400 mb-3">
              <span>Espacio de Decisión: Clase 0 (Cyan) vs Clase 1 (Rojo)</span>
              <span className="text-emerald-400">w^T • x + b = 0</span>
            </div>

            <div className="w-full h-72 sm:h-80 relative bg-slate-950 rounded-lg border border-slate-800/80 overflow-hidden">
              <svg viewBox="0 0 500 300" className="w-full h-full">
                {/* Hyperplane line & margins */}
                {(() => {
                  const rad = (boundaryAngle * Math.PI) / 180;
                  const dx = Math.cos(rad);
                  const dy = Math.sin(rad);

                  // Line center is (250, boundaryBias)
                  // Perpendicular tangent is (-dy, dx)
                  const len = 400;
                  const x1 = 250 - (-dy) * len;
                  const y1 = boundaryBias - dx * len;
                  const x2 = 250 + (-dy) * len;
                  const y2 = boundaryBias + dx * len;

                  // Margins
                  const m1X1 = x1 + dx * marginWidth;
                  const m1Y1 = y1 + dy * marginWidth;
                  const m1X2 = x2 + dx * marginWidth;
                  const m1Y2 = y2 + dy * marginWidth;

                  const m2X1 = x1 - dx * marginWidth;
                  const m2Y1 = y1 - dy * marginWidth;
                  const m2X2 = x2 - dx * marginWidth;
                  const m2Y2 = y2 - dy * marginWidth;

                  return (
                    <g>
                      {/* Margins */}
                      <line x1={m1X1} y1={m1Y1} x2={m1X2} y2={m1Y2} stroke="#38bdf8" strokeDasharray="4,4" strokeWidth="1" opacity="0.6" />
                      <line x1={m2X1} y1={m2Y1} x2={m2X2} y2={m2Y2} stroke="#f43f5e" strokeDasharray="4,4" strokeWidth="1" opacity="0.6" />
                      {/* Main decision boundary */}
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#10b981" strokeWidth="2.5" />
                    </g>
                  );
                })()}

                {/* Scatter Points */}
                {classPoints.map((p, idx) => (
                  <circle
                    key={idx}
                    cx={p.x}
                    cy={p.y}
                    r="4.5"
                    fill={p.actualClass === 0 ? '#00f3ff' : '#f43f5e'}
                    stroke="#000"
                    strokeWidth="1.5"
                  />
                ))}
              </svg>
            </div>

            <div className="mt-3 text-xs font-tech text-slate-400 flex items-center justify-between">
              <span>Maximizador de Margen: <strong className="text-white">Margin = 2 / ||w||</strong></span>
              <span className="text-emerald-400">Regularización C: Criterio Hinge Loss</span>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: GENERADOR DE DATOS */}
      {activeMode === 'generador' && (
        <div className="bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-purple-500/30 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 className="text-2xl font-display font-bold text-white">
              Generador de Datasets Sintéticos para Machine Learning
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Crea distribuciones de datos con etiquetas binarias balanceadas, ruido estocástico y múltiples dimensiones para tus modelos locales o notebooks de Python.
            </p>

            <div className="grid grid-cols-2 gap-4 text-left bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div>
                <label className="text-xs font-tech text-slate-400 mb-1 block">Número de Muestras (Filas):</label>
                <select
                  value={dataRows}
                  onChange={(e) => setDataRows(parseInt(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 text-xs font-tech text-purple-300 rounded-lg p-2"
                >
                  <option value="50">50 Observaciones</option>
                  <option value="200">200 Observaciones</option>
                  <option value="500">500 Observaciones</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-tech text-slate-400 mb-1 block">Dimensiones / Features:</label>
                <select
                  value={dataFeatures}
                  onChange={(e) => setDataFeatures(parseInt(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 text-xs font-tech text-purple-300 rounded-lg p-2"
                >
                  <option value="4">4 Features continuos + Label</option>
                  <option value="8">8 Features continuos + Label</option>
                </select>
              </div>
            </div>

            <button
              onClick={downloadDataset}
              className="py-3 px-8 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-tech font-bold text-xs uppercase flex items-center justify-center gap-2 mx-auto transition-colors shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Dataset CSV Sintético</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
