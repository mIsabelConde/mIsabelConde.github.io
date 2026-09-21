import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Brain, Cpu, Database, ShieldAlert, ChevronDown, Binary, Globe, GraduationCap, Code2, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  onExplore?: () => void;
  onLaunchPlayground?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onLaunchPlayground }) => {
  // Live animated counters
  const [modelsAnalyzed, setModelsAnalyzed] = useState(14829);
  const [dataProcessed, setDataProcessed] = useState(849.2); // Petabytes
  const [predictionsCount, setPredictionsCount] = useState(9421503);
  const [threatsDetected, setThreatsDetected] = useState(3842);

  const handleExplore = () => {
    if (onExplore) {
      onExplore();
    } else {
      document.getElementById('conceptos')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLaunchPlayground = () => {
    if (onLaunchPlayground) {
      onLaunchPlayground();
    } else {
      document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setModelsAnalyzed((prev) => prev + Math.floor(Math.random() * 3));
      setDataProcessed((prev) => +(prev + (Math.random() * 0.05)).toFixed(2));
      setPredictionsCount((prev) => prev + Math.floor(Math.random() * 14) + 5);
      if (Math.random() > 0.6) {
        setThreatsDetected((prev) => prev + 1);
      }
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="inicio" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Radial cyber gradient spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full text-center relative z-10">
        {/* Futuristic Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-tech mb-6 shadow-[0_0_20px_rgba(0,243,255,0.15)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="tracking-wide">CÁTEDRA DE PROGRAMACIÓN • GUÍA DIDÁCTICA DE INTELIGENCIA ARTIFICIAL</span>
          <span className="bg-cyan-500/20 text-cyan-200 px-2 py-0.5 rounded text-[10px] uppercase font-bold">Nodo Educativo</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white mb-3">
          INTELIGENCIA ARTIFICIAL <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-blue-500 text-glow-cyan">
            EN LA PROGRAMACIÓN
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg md:text-xl font-tech text-cyan-300/90 font-medium mb-6 tracking-wide">
          Algoritmos <span className="text-emerald-400">•</span> Machine Learning <span className="text-cyan-400">•</span> Redes Neuronales <span className="text-blue-400">•</span> Data Science
        </p>

        {/* Author Highlight Card */}
        <div className="max-w-2xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-900/75 to-slate-900/95 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_30px_rgba(0,243,255,0.12)] flex flex-col sm:flex-row items-center gap-4 text-left">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold shadow-[0_0_20px_rgba(0,243,255,0.35)] flex-shrink-0">
            <GraduationCap className="w-7 h-7 text-black" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-xs font-tech font-bold uppercase tracking-wider text-cyan-400">Autora</span>
              <span className="text-[11px] font-tech text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Code2 className="w-3 h-3" />
                Docente de Programación
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide">
              María Isabel Conde Altamirano
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light mt-1.5 leading-relaxed">
              Plataforma interactiva concebida para estudiantes y desarrolladores: desde la lógica de programación y estructuras computacionales hasta modelos generativos, entrenamiento tensorial y análisis de datos en tiempo real.
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-slate-300 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-8 text-balance">
          Explora la intersección entre el código y los modelos cognitivos. Experimenta con simuladores de redes neuronales, descenso de gradiente, clustering interactivo y defensa algorítmica sin requerir configuración previa.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            id="hero-explore-btn"
            onClick={handleExplore}
            className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-tech font-bold text-sm uppercase tracking-wider flex items-center gap-2.5 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_25px_rgba(0,243,255,0.4)] hover:shadow-[0_0_35px_rgba(0,243,255,0.6)] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            <span>Explorar IA</span>
          </button>

          <button
            id="hero-playground-btn"
            onClick={handleLaunchPlayground}
            className="px-8 py-3.5 rounded-lg bg-[#0d1117]/80 hover:bg-slate-900 border border-emerald-500/60 text-emerald-400 font-tech font-bold text-sm uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-[0_0_20px_rgba(0,255,102,0.2)] hover:shadow-[0_0_30px_rgba(0,255,102,0.35)] cursor-pointer"
          >
            <Play className="w-4 h-4 fill-emerald-400" />
            <span>Iniciar Playground</span>
          </button>
        </div>

        {/* Animated Cyber KPI Indicators */}
        <div id="hero-indicators-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {/* Models Analyzed */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 backdrop-blur-md transition-all group hover:glow-cyan">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-tech uppercase text-slate-400 tracking-wider">Modelos Analizados</span>
              <Brain className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-tech font-bold text-cyan-400 tracking-tight">
              {modelsAnalyzed.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 font-tech mt-1 flex items-center gap-1">
              <span className="text-emerald-400">+12%</span> vs ciclo anterior
            </div>
          </div>

          {/* Data Processed */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 backdrop-blur-md transition-all group hover:glow-green">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-tech uppercase text-slate-400 tracking-wider">Datos Procesados</span>
              <Database className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-tech font-bold text-emerald-400 tracking-tight">
              {dataProcessed} <span className="text-base text-slate-400">PB</span>
            </div>
            <div className="text-[10px] text-slate-400 font-tech mt-1 flex items-center gap-1">
              <span className="text-emerald-400">+2.4 TB/s</span> throughput
            </div>
          </div>

          {/* Predictions Made */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 backdrop-blur-md transition-all group hover:glow-blue">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-tech uppercase text-slate-400 tracking-wider">Predicciones Realizadas</span>
              <Cpu className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-tech font-bold text-blue-400 tracking-tight">
              {(predictionsCount / 1000000).toFixed(2)} <span className="text-base text-slate-400">M</span>
            </div>
            <div className="text-[10px] text-slate-400 font-tech mt-1 flex items-center gap-1">
              <span className="text-cyan-400">99.78%</span> inferencia precisa
            </div>
          </div>

          {/* Threats Detected */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-red-500/40 backdrop-blur-md transition-all group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-tech uppercase text-slate-400 tracking-wider">Amenazas Detectadas</span>
              <ShieldAlert className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-tech font-bold text-rose-400 tracking-tight">
              {threatsDetected.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 font-tech mt-1 flex items-center gap-1">
              <span className="text-emerald-400">100%</span> neutralizadas
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={onExplore}
            className="text-slate-400 hover:text-cyan-300 transition-colors flex flex-col items-center gap-1 text-xs font-tech animate-bounce cursor-pointer"
          >
            <span>DESCUBRIR MÓDULOS</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
