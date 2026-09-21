import React, { useState, useEffect } from 'react';
import { 
  Activity, Database, Cpu, TrendingUp, CheckCircle, 
  BarChart, PieChart, LineChart, Play, Pause, Zap, RefreshCw, AlertCircle
} from 'lucide-react';

export const DataScienceDashboard: React.FC = () => {
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  
  // Dynamic KPIs
  const [datasetsCount, setDatasetsCount] = useState<number>(1428);
  const [activeModels, setActiveModels] = useState<number>(284);
  const [predictionsPerSec, setPredictionsPerSec] = useState<number>(18420);
  const [precisionRate, setPrecisionRate] = useState<number>(99.42);
  const [processedPB, setProcessedPB] = useState<number>(14.85);

  // Time-series loss values for line chart
  const [lossHistory, setLossHistory] = useState<number[]>([
    0.85, 0.72, 0.65, 0.58, 0.49, 0.42, 0.38, 0.31, 0.28, 0.22, 0.19, 0.16, 0.15, 0.14
  ]);

  // Bar chart GPU cluster loads
  const [clusterLoads, setClusterLoads] = useState<number[]>([78, 92, 64, 88, 95, 71]);

  // Scatter plot points
  const [scatterPoints, setScatterPoints] = useState<{ x: number; y: number; alert?: boolean }[]>([
    { x: 30, y: 70 }, { x: 50, y: 120 }, { x: 90, y: 80 }, { x: 130, y: 160 },
    { x: 160, y: 95 }, { x: 210, y: 220 }, { x: 250, y: 180 }, { x: 300, y: 260 },
    { x: 340, y: 210 }, { x: 390, y: 280 }, { x: 420, y: 140, alert: true }, { x: 460, y: 290 }
  ]);

  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      // Dynamic KPI jitter
      setPredictionsPerSec((prev) => Math.floor(prev + (Math.random() - 0.48) * 80));
      setPrecisionRate((prev) => +(Math.min(99.9, Math.max(98.5, prev + (Math.random() - 0.5) * 0.05))).toFixed(2));
      setProcessedPB((prev) => +(prev + 0.001).toFixed(3));

      // Append new loss value
      setLossHistory((prev) => {
        const last = prev[prev.length - 1];
        const nextVal = Math.max(0.08, +(last + (Math.random() - 0.52) * 0.03).toFixed(3));
        return [...prev.slice(1), nextVal];
      });

      // Update cluster loads
      setClusterLoads((prev) => prev.map((l) => Math.min(99, Math.max(45, Math.floor(l + (Math.random() - 0.5) * 10)))));

      // Shift scatter points
      setScatterPoints((prev) =>
        prev.map((pt) => ({
          ...pt,
          y: Math.max(40, Math.min(280, pt.y + (Math.random() - 0.5) * 15))
        }))
      );
    }, 1600);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  return (
    <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-tech text-xs uppercase mb-3">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Módulo 07 • Telemetría MLOps en Vivo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
            DASHBOARD DE <span className="text-cyan-400 text-glow-cyan">DATA SCIENCE</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
            Monitoreo en streaming de pipelines distribuidos, tasas de convergencia tensorial, carga de clústeres GPU y métricas predictivas.
          </p>
        </div>

        {/* Live Stream Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className={`px-4 py-2 rounded-xl text-xs font-tech font-bold uppercase flex items-center gap-2 transition-all cursor-pointer ${
              isLiveStreaming
                ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            {isLiveStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isLiveStreaming ? 'Streaming Activo' : 'Pausado'}</span>
          </button>
        </div>
      </div>

      {/* 5 Dynamic Futuristic KPI Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {/* DATASETS */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-tech uppercase mb-1">
            <span>DATASETS</span>
            <Database className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-tech font-bold text-white tracking-tight">{datasetsCount.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 font-tech mt-1">98.2% limpios & validados</div>
        </div>

        {/* MODELOS */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-tech uppercase mb-1">
            <span>MODELOS</span>
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-tech font-bold text-blue-400 tracking-tight">{activeModels}</div>
          <div className="text-[10px] text-slate-400 font-tech mt-1">En clúster Kubernetes</div>
        </div>

        {/* PREDICCIONES */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-tech uppercase mb-1">
            <span>PREDICCIONES</span>
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl font-tech font-bold text-purple-400 tracking-tight">{predictionsPerSec.toLocaleString()} <span className="text-xs text-slate-400">/s</span></div>
          <div className="text-[10px] text-emerald-400 font-tech mt-1">+4.2% pico de tráfico</div>
        </div>

        {/* PRECISIÓN */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-tech uppercase mb-1">
            <span>PRECISIÓN</span>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-tech font-bold text-emerald-400 tracking-tight">{precisionRate}%</div>
          <div className="text-[10px] text-cyan-400 font-tech mt-1">F1-Score: 0.992</div>
        </div>

        {/* DATOS PROCESADOS */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-tech uppercase mb-1">
            <span>DATOS PROCESADOS</span>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-tech font-bold text-amber-400 tracking-tight">{processedPB} <span className="text-xs text-slate-400">PB</span></div>
          <div className="text-[10px] text-slate-400 font-tech mt-1">Almacenamiento Lakehouse</div>
        </div>
      </div>

      {/* 4 Dynamic Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Gráfico de Líneas: Curva de Pérdida (Loss) en Tiempo Real */}
        <div className="p-6 rounded-2xl bg-[#080c12] border border-slate-800/90 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-tech text-cyan-400 uppercase">Gráfico de Líneas</div>
              <h3 className="text-base font-display font-bold text-white">Función de Pérdida Cruzada (Cross-Entropy Loss)</h3>
            </div>
            <span className="text-xs font-tech text-slate-400">
              Valor Actual: <strong className="text-cyan-400">{lossHistory[lossHistory.length - 1]}</strong>
            </span>
          </div>

          <div className="w-full h-56 relative">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              {/* Grid */}
              <line x1="40" y1="20" x2="40" y2="170" stroke="#1e293b" strokeWidth="1" />
              <line x1="40" y1="170" x2="480" y2="170" stroke="#1e293b" strokeWidth="1" />
              <line x1="40" y1="95" x2="480" y2="95" stroke="#1e293b" strokeDasharray="3,3" strokeWidth="0.8" />

              {/* Area fill */}
              {(() => {
                const pointsSvg = lossHistory.map((val, idx) => {
                  const x = 50 + (idx / (lossHistory.length - 1)) * 420;
                  const y = 170 - (val / 1.0) * 150;
                  return `${x},${y}`;
                }).join(' ');

                const areaPath = `M 50 170 L ${pointsSvg} L 470 170 Z`;
                return (
                  <path
                    d={areaPath}
                    fill="url(#cyan-grad)"
                    opacity="0.25"
                  />
                );
              })()}

              <defs>
                <linearGradient id="cyan-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00f3ff" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>

              {/* Line path */}
              {(() => {
                const pointsSvg = lossHistory.map((val, idx) => {
                  const x = 50 + (idx / (lossHistory.length - 1)) * 420;
                  const y = 170 - (val / 1.0) * 150;
                  return `${x},${y}`;
                }).join(' ');
                return (
                  <polyline
                    fill="none"
                    stroke="#00f3ff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={pointsSvg}
                  />
                );
              })()}

              {/* Data dots */}
              {lossHistory.map((val, idx) => {
                const x = 50 + (idx / (lossHistory.length - 1)) * 420;
                const y = 170 - (val / 1.0) * 150;
                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r={idx === lossHistory.length - 1 ? 5 : 2.5}
                    fill={idx === lossHistory.length - 1 ? '#00f3ff' : '#080c12'}
                    stroke="#00f3ff"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* 2. Gráfico de Barras: Distribución de Carga GPU Clúster */}
        <div className="p-6 rounded-2xl bg-[#080c12] border border-slate-800/90 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-tech text-emerald-400 uppercase">Gráfico de Barras</div>
              <h3 className="text-base font-display font-bold text-white">Utilización de Tensor Cores por Nodo GPU</h3>
            </div>
            <span className="text-xs font-tech text-emerald-400">Media: 81.2%</span>
          </div>

          <div className="w-full h-56 flex items-end justify-between gap-4 pt-6 px-4">
            {clusterLoads.map((load, idx) => {
              const isHigh = load > 90;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className={`text-[10px] font-tech ${isHigh ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
                    {load}%
                  </span>
                  <div className="w-full bg-slate-900 rounded-lg overflow-hidden h-36 flex items-end">
                    <div
                      className={`w-full transition-all duration-500 rounded-t-md ${
                        isHigh ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]' : 'bg-emerald-500 shadow-[0_0_12px_rgba(0,255,102,0.3)]'
                      }`}
                      style={{ height: `${load}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-tech text-slate-400">GPU-0{idx + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Gráfico Circular (Donut): Asignación de Modelos por Arquitectura */}
        <div className="p-6 rounded-2xl bg-[#080c12] border border-slate-800/90 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-tech text-purple-400 uppercase">Gráfico Circular</div>
              <h3 className="text-base font-display font-bold text-white">Distribución de Arquitecturas en Producción</h3>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-2">
            {/* SVG Donut */}
            <div className="w-40 h-40 relative flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* Donut Segments (circumference = 2 * PI * 38 = 238.76) */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#a855f7" strokeWidth="14" strokeDasharray="95.5 143.2" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#00f3ff" strokeWidth="14" strokeDasharray="71.6 167.1" strokeDashoffset="-95.5" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#00ff66" strokeWidth="14" strokeDasharray="47.7 191" strokeDashoffset="-167.1" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#fbbf24" strokeWidth="14" strokeDasharray="23.9 214.8" strokeDashoffset="-214.8" />
              </svg>
              <div className="absolute text-center">
                <span className="text-lg font-tech font-bold text-white">{activeModels}</span>
                <span className="block text-[9px] font-tech text-slate-400">Total Pods</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs font-tech">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-purple-500" />
                <span className="text-slate-200">LLMs / Transformers: <strong>40%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-cyan-400" />
                <span className="text-slate-200">Visión / CNNs: <strong>30%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-400" />
                <span className="text-slate-200">Modelos de Difusión: <strong>20%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-400" />
                <span className="text-slate-200">RL & Recomendación: <strong>10%</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Gráfico de Dispersión: Latencia vs Throughput & Outliers */}
        <div className="p-6 rounded-2xl bg-[#080c12] border border-slate-800/90 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-tech text-amber-400 uppercase">Dispersión de Datos</div>
              <h3 className="text-base font-display font-bold text-white">Scatter Plot: Inferencia vs Tasa de Concurrencia</h3>
            </div>
            <span className="text-xs font-tech text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>1 Outlier Detectado</span>
            </span>
          </div>

          <div className="w-full h-56 relative bg-slate-950 rounded-xl p-2 border border-slate-800/60">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              <line x1="30" y1="10" x2="30" y2="180" stroke="#1e293b" strokeWidth="1" />
              <line x1="30" y1="180" x2="480" y2="180" stroke="#1e293b" strokeWidth="1" />

              {scatterPoints.map((pt, idx) => (
                <g key={idx}>
                  <circle
                    cx={pt.x}
                    cy={200 - pt.y * 0.6}
                    r={pt.alert ? 6 : 4}
                    fill={pt.alert ? '#f43f5e' : '#00f3ff'}
                    opacity={pt.alert ? 1 : 0.75}
                    className={pt.alert ? 'animate-ping' : ''}
                  />
                  <circle
                    cx={pt.x}
                    cy={200 - pt.y * 0.6}
                    r={pt.alert ? 5 : 3.5}
                    fill={pt.alert ? '#f43f5e' : '#00f3ff'}
                  />
                </g>
              ))}

              {/* Anomaly Callout */}
              <text x="360" y="80" fill="#f43f5e" fontSize="9" fontFamily="monospace">
                Latencia Anómala (Spike)
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
