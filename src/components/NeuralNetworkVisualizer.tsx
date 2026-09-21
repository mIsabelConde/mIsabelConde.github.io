import React, { useState, useEffect, useRef } from 'react';
import { Network, Play, RefreshCw, Zap, Sliders, Cpu, Activity, Info } from 'lucide-react';

interface LayerConfig {
  neurons: number;
}

export const NeuralNetworkVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Configuration
  const [numHiddenLayers, setNumHiddenLayers] = useState<number>(2);
  const [neuronsPerHidden, setNeuronsPerHidden] = useState<number>(4);
  const [inputCount, setInputCount] = useState<number>(3);
  const [outputCount, setOutputCount] = useState<number>(2);
  const [activationFunc, setActivationFunc] = useState<'relu' | 'sigmoid' | 'tanh'>('relu');
  const [learningRate, setLearningRate] = useState<number>(0.05);

  // Simulation states
  const [isPropagating, setIsPropagating] = useState<boolean>(false);
  const [pulseStage, setPulseStage] = useState<number>(-1);
  const [selectedNeuronInfo, setSelectedNeuronInfo] = useState<string | null>(null);

  // Weights matrix: [fromLayer][fromNeuron][toNeuron] -> number
  const [weights, setWeights] = useState<number[][][]>([]);

  // Initialize weights whenever layer structure changes
  useEffect(() => {
    const totalLayers = 1 + numHiddenLayers + 1;
    const layerSizes = [
      inputCount,
      ...Array(numHiddenLayers).fill(neuronsPerHidden),
      outputCount
    ];

    const newWeights: number[][][] = [];
    for (let l = 0; l < totalLayers - 1; l++) {
      const fromSize = layerSizes[l];
      const toSize = layerSizes[l + 1];
      const layerW: number[][] = [];
      for (let i = 0; i < fromSize; i++) {
        const neuronW: number[] = [];
        for (let j = 0; j < toSize; j++) {
          neuronW.push((Math.random() - 0.5) * 2); // between -1.0 and 1.0
        }
        layerW.push(neuronW);
      }
      newWeights.push(layerW);
    }
    setWeights(newWeights);
  }, [numHiddenLayers, neuronsPerHidden, inputCount, outputCount]);

  // Handle Signal Propagation Animation
  const handlePropagate = () => {
    if (isPropagating) return;
    setIsPropagating(true);
    setPulseStage(0);

    const totalStages = 1 + numHiddenLayers + 1;
    let currentStage = 0;

    const interval = setInterval(() => {
      currentStage++;
      if (currentStage >= totalStages) {
        clearInterval(interval);
        setTimeout(() => {
          setIsPropagating(false);
          setPulseStage(-1);
        }, 400);
      } else {
        setPulseStage(currentStage);
      }
    }, 450);
  };

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 360);

    ctx.clearRect(0, 0, width, height);

    const layerSizes = [
      inputCount,
      ...Array(numHiddenLayers).fill(neuronsPerHidden),
      outputCount
    ];
    const totalLayers = layerSizes.length;

    // Calculate node coordinates
    const layerXPositions = layerSizes.map((_, idx) => {
      return 60 + (idx / (totalLayers - 1)) * (width - 120);
    });

    const nodePositions: { x: number; y: number; layer: number; index: number }[][] = [];

    layerSizes.forEach((count, lIdx) => {
      const layerNodes: { x: number; y: number; layer: number; index: number }[] = [];
      const x = layerXPositions[lIdx];
      const spacing = height / (count + 1);

      for (let nIdx = 0; nIdx < count; nIdx++) {
        const y = spacing * (nIdx + 1);
        layerNodes.push({ x, y, layer: lIdx, index: nIdx });
      }
      nodePositions.push(layerNodes);
    });

    // 1. Draw Synapses (Weights)
    for (let l = 0; l < totalLayers - 1; l++) {
      const fromNodes = nodePositions[l];
      const toNodes = nodePositions[l + 1];
      const currentLayerWeights = weights[l];

      fromNodes.forEach((fromN, fIdx) => {
        toNodes.forEach((toN, tIdx) => {
          const w = currentLayerWeights?.[fIdx]?.[tIdx] ?? 0.5;
          const isPositive = w >= 0;
          const absWeight = Math.min(Math.abs(w), 1);

          ctx.beginPath();
          ctx.moveTo(fromN.x, fromN.y);
          ctx.lineTo(toN.x, toN.y);

          // Pulse highlight if signal is crossing this layer
          const isPulseCrossing = pulseStage === l;

          if (isPulseCrossing) {
            ctx.strokeStyle = '#00f3ff';
            ctx.lineWidth = 3.5;
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#00f3ff';
          } else {
            ctx.strokeStyle = isPositive 
              ? `rgba(0, 243, 255, ${0.15 + absWeight * 0.4})` 
              : `rgba(244, 63, 94, ${0.15 + absWeight * 0.4})`;
            ctx.lineWidth = Math.max(0.8, absWeight * 2.2);
            ctx.shadowBlur = 0;
          }

          ctx.stroke();
          ctx.shadowBlur = 0;
        });
      });
    }

    // 2. Draw Neurons
    nodePositions.forEach((layerNodes, lIdx) => {
      const isInput = lIdx === 0;
      const isOutput = lIdx === totalLayers - 1;
      const isActivated = pulseStage >= lIdx;

      layerNodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);

        // Fill color
        if (isActivated) {
          ctx.fillStyle = isOutput ? '#10b981' : isInput ? '#00f3ff' : '#a855f7';
          ctx.shadowBlur = 18;
          ctx.shadowColor = isOutput ? '#10b981' : isInput ? '#00f3ff' : '#a855f7';
        } else {
          ctx.fillStyle = '#0f172a';
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#000';
        }

        ctx.fill();

        // Stroke border
        ctx.lineWidth = 2;
        ctx.strokeStyle = isInput ? '#00f3ff' : isOutput ? '#10b981' : '#a855f7';
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Inner label
        ctx.fillStyle = isActivated ? '#000000' : '#ffffff';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const label = isInput ? `x${node.index + 1}` : isOutput ? `y${node.index + 1}` : `h${node.index + 1}`;
        ctx.fillText(label, node.x, node.y);
      });
    });

  }, [weights, numHiddenLayers, neuronsPerHidden, inputCount, outputCount, pulseStage]);

  return (
    <section id="redes-neuronales" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/40 border border-purple-500/30 text-purple-300 font-tech text-xs uppercase mb-3">
          <Network className="w-3.5 h-3.5" />
          <span>Módulo 04 • Deep Learning y Tensores</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
          REDES <span className="text-purple-400 text-glow-purple">NEURONALES</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Simulador interactivo de perceptrones multicapa (MLP). Ajusta la arquitectura, modifica las funciones de activación y observa cómo la señal se propaga hacia adelante (Forward Propagation).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Panel */}
        <div className="lg:col-span-4 bg-slate-900/80 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-md space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Arquitectura de Red</span>
            </h3>
            <button
              onClick={() => {
                // Re-randomize weights
                setWeights((prev) => prev.map(l => l.map(row => row.map(() => (Math.random() - 0.5) * 2))));
              }}
              title="Aleatorizar Pesos (Xavier/He)"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Number of Hidden Layers */}
          <div>
            <div className="flex justify-between text-xs font-tech mb-1.5">
              <span className="text-slate-300">Capas Ocultas:</span>
              <span className="text-purple-400 font-bold">{numHiddenLayers}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => setNumHiddenLayers(num)}
                  className={`py-1.5 text-xs font-tech rounded-lg border transition-all ${
                    numHiddenLayers === num
                      ? 'bg-purple-600 border-purple-400 text-white font-bold shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {num} {num === 1 ? 'Capa' : 'Capas'}
                </button>
              ))}
            </div>
          </div>

          {/* Neurons per hidden layer */}
          <div>
            <div className="flex justify-between text-xs font-tech mb-1.5">
              <span className="text-slate-300">Neuronas por Capa Oculta:</span>
              <span className="text-purple-400 font-bold">{neuronsPerHidden}</span>
            </div>
            <input
              type="range"
              min="2"
              max="6"
              value={neuronsPerHidden}
              onChange={(e) => setNeuronsPerHidden(parseInt(e.target.value))}
              className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Input & Output Counts */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-tech text-slate-400 block mb-1">Entradas (x):</label>
              <select
                value={inputCount}
                onChange={(e) => setInputCount(parseInt(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-tech rounded-lg p-2 focus:border-cyan-400"
              >
                <option value="2">2 Neuronas</option>
                <option value="3">3 Neuronas</option>
                <option value="4">4 Neuronas</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-tech text-slate-400 block mb-1">Salidas (y):</label>
              <select
                value={outputCount}
                onChange={(e) => setOutputCount(parseInt(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 text-emerald-300 text-xs font-tech rounded-lg p-2 focus:border-emerald-400"
              >
                <option value="1">1 Neurona</option>
                <option value="2">2 Neuronas</option>
                <option value="3">3 Neuronas</option>
              </select>
            </div>
          </div>

          {/* Activation Function */}
          <div>
            <label className="text-[11px] font-tech text-slate-400 block mb-1.5">Función de Activación (f(z)):</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'relu', label: 'ReLU', formula: 'max(0, z)' },
                { id: 'sigmoid', label: 'Sigmoid', formula: '1/(1+e^-z)' },
                { id: 'tanh', label: 'Tanh', formula: 'tanh(z)' }
              ].map((act) => (
                <button
                  key={act.id}
                  onClick={() => setActivationFunc(act.id as any)}
                  className={`py-2 px-2 text-xs font-tech rounded-lg border text-center transition-all ${
                    activationFunc === act.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold">{act.label}</div>
                  <div className="text-[9px] text-slate-400 opacity-80">{act.formula}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Trigger Forward Pass Button */}
          <button
            id="trigger-forward-propagation-btn"
            disabled={isPropagating}
            onClick={handlePropagate}
            className={`w-full py-3.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isPropagating
                ? 'bg-purple-900/60 text-purple-300 border border-purple-500/50 animate-pulse'
                : 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]'
            }`}
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{isPropagating ? 'Propagando Señal...' : 'Propagar Señal (Forward Pass)'}</span>
          </button>
        </div>

        {/* Visualizer Canvas & Metrics */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#080c12] p-5 rounded-2xl border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative">
            <div className="flex items-center justify-between text-xs font-tech text-slate-400 mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Capa Entrada</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> Ocultas ({numHiddenLayers})</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Capa Salida</span>
              </div>
              <span className="text-cyan-400 font-mono">
                {isPropagating ? `Propagación: Capa ${pulseStage + 1}` : 'Estado: Listo'}
              </span>
            </div>

            {/* Neural Canvas */}
            <div className="w-full relative">
              <canvas
                ref={canvasRef}
                className="w-full h-[360px] block"
              />
            </div>

            {/* Legend & Synaptic Info */}
            <div className="flex flex-wrap items-center justify-between text-[11px] font-tech text-slate-400 pt-3 border-t border-slate-800 mt-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-cyan-400">
                  <span className="w-3 h-0.5 bg-cyan-400 inline-block" /> Peso Positivo (Excitatorio)
                </span>
                <span className="flex items-center gap-1 text-rose-400">
                  <span className="w-3 h-0.5 bg-rose-400 inline-block" /> Peso Negativo (Inhibitorio)
                </span>
              </div>
              <div className="text-slate-300">
                Total Parámetros: <strong className="text-white">
                  {weights.reduce((acc, l) => acc + l.reduce((rAcc, row) => rAcc + row.length, 0), 0)} pesos
                </strong>
              </div>
            </div>
          </div>

          {/* Mathematical Card */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-tech text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>Fórmula de Inferencia Tensor: <strong className="text-cyan-300 font-mono">a^[l] = σ(W^[l] • a^[l-1] + b^[l])</strong></span>
            </div>
            <span className="text-emerald-400 hidden sm:inline">Backpropagation: ∂L/∂W</span>
          </div>
        </div>
      </div>
    </section>
  );
};
