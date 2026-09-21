import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Type, Image as ImageIcon, Code2, Music, Eye, 
  Play, RefreshCw, Sliders, Zap, Check, Terminal, Cpu
} from 'lucide-react';

export const GenerativeAiStudio: React.FC = () => {
  const [activeModality, setActiveModality] = useState<'texto' | 'imagen' | 'codigo' | 'audio' | 'multimodal'>('texto');
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputContent, setOutputContent] = useState<string>('');
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [diffusionStep, setDiffusionStep] = useState<number>(0);

  // Hyperparameters
  const [temperature, setTemperature] = useState<number>(0.7);
  const [topP, setTopP] = useState<number>(0.9);
  const [guidanceScale, setGuidanceScale] = useState<number>(7.5);

  // Presets
  const prompts = {
    texto: 'Explica el mecanismo de auto-atención en Transformers a un científico cuántico.',
    imagen: 'Cyberpunk neural core with bioluminescent glowing circuits and quantum matrices 8K.',
    codigo: 'Implementar algoritmo de optimización AdamW con tensor decay en PyTorch.',
    audio: 'Sintetizar onda binaural espacial con armónicos en 432Hz y pulso rítmico cyberpunk.',
    multimodal: 'Analizar tomografía médica multimodal cruzada con reporte genómico de paciente.'
  };

  const [currentPrompt, setCurrentPrompt] = useState<string>(prompts.texto);

  useEffect(() => {
    setCurrentPrompt(prompts[activeModality]);
    setOutputContent('');
    setGenerationProgress(0);
    setDiffusionStep(0);
  }, [activeModality]);

  const handleSimulateGeneration = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setOutputContent('');
    setGenerationProgress(0);
    setDiffusionStep(0);

    if (activeModality === 'texto') {
      const fullText = `[INFERENCIA AUTOREGRESIVA COMPLETADA]\n\nEl mecanismo de Auto-Atención (Self-Attention) proyecta cada token de entrada en tres representaciones tensoriales: Consulta (Query Q), Clave (Key K) y Valor (Value V).\n\nFórmula fundamental de atención escalada por producto punto:\nAttention(Q, K, V) = softmax((Q • K^T) / sqrt(d_k)) • V\n\nEl factor de escala sqrt(d_k) previene que los productos punto crezcan en magnitudes excesivas donde la función softmax satura sus gradientes hacia cero. Mediante cabezales múltiples (Multi-Head Attention), el modelo proyecta paralelamente la información a diferentes subespacios latentes, capturando simultáneamente dependencias sintácticas locales y relaciones semánticas de largo alcance en O(1) pasos secuenciales.`;
      
      let charIdx = 0;
      const interval = setInterval(() => {
        charIdx += 6;
        if (charIdx >= fullText.length) {
          setOutputContent(fullText);
          setIsGenerating(false);
          setGenerationProgress(100);
          clearInterval(interval);
        } else {
          setOutputContent(fullText.slice(0, charIdx));
          setGenerationProgress(Math.floor((charIdx / fullText.length) * 100));
        }
      }, 30);
    } else if (activeModality === 'imagen') {
      let step = 0;
      const interval = setInterval(() => {
        step += 1;
        setDiffusionStep(step);
        setGenerationProgress(Math.floor((step / 20) * 100));
        if (step >= 20) {
          clearInterval(interval);
          setIsGenerating(false);
        }
      }, 80);
    } else if (activeModality === 'codigo') {
      const fullCode = `import torch
import torch.nn as nn

class AdamWCustomOptimizer(torch.optim.Optimizer):
    """Optimizador Adam con desacoplamiento de decaimiento de peso (Weight Decay)."""
    def __init__(self, params, lr=1e-3, betas=(0.9, 0.999), eps=1e-8, weight_decay=1e-2):
        defaults = dict(lr=lr, betas=betas, eps=eps, weight_decay=weight_decay)
        super().__init__(params, defaults)

    @torch.no_grad()
    def step(self, closure=None):
        for group in self.param_groups:
            lr, wd = group['lr'], group['weight_decay']
            beta1, beta2 = group['betas']
            for p in group['params']:
                if p.grad is None: continue
                # Aplicar decaimiento de peso desacoplado
                p.mul_(1.0 - lr * wd)
                # Momentos de primer y segundo orden
                state = self.state[p]
                # Inferencia óptima convergente
                p.add_(-lr * p.grad)`;

      let cIdx = 0;
      const interval = setInterval(() => {
        cIdx += 12;
        if (cIdx >= fullCode.length) {
          setOutputContent(fullCode);
          setIsGenerating(false);
          setGenerationProgress(100);
          clearInterval(interval);
        } else {
          setOutputContent(fullCode.slice(0, cIdx));
          setGenerationProgress(Math.floor((cIdx / fullCode.length) * 100));
        }
      }, 35);
    } else if (activeModality === 'audio') {
      let prog = 0;
      const interval = setInterval(() => {
        prog += 5;
        setGenerationProgress(prog);
        if (prog >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setOutputContent('Onda sintetizada con éxito: 48.0 kHz • 24-bit PCM Flac • Modelo de Vocoder HiFi-GAN');
        }
      }, 60);
    } else {
      // Multimodal
      const fullMulti = `[ANÁLISIS DE FUSIÓN MULTIMODAL VLM]\n\n1. Tensor Visual (Resonancia Magnética 3D): Detección de lesión focal en lóbulo temporal izquierdo (coordenadas: [x:142, y:88, z:34]). Coeficiente de atenuación: 1.42.\n2. Secuenciación Genómica: Presencia de variante patogénica en el gen EGFR con frecuencia alélica del 14.8%.\n3. Síntesis Diagnóstica Cruzada: Alta probabilidad de respuesta terapéutica positiva a inhibidores de tirosina quinasa de tercera generación. Nivel de certeza del modelo: 97.3%.`;
      let mIdx = 0;
      const interval = setInterval(() => {
        mIdx += 8;
        if (mIdx >= fullMulti.length) {
          setOutputContent(fullMulti);
          setIsGenerating(false);
          setGenerationProgress(100);
          clearInterval(interval);
        } else {
          setOutputContent(fullMulti.slice(0, mIdx));
          setGenerationProgress(Math.floor((mIdx / fullMulti.length) * 100));
        }
      }, 30);
    }
  };

  return (
    <section id="ia-generativa" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-tech text-xs uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Módulo 05 • Síntesis Multimodal</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
          IA <span className="text-cyan-400 text-glow-cyan">GENERATIVA</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Explora la creación sintética de texto, código, audio, imágenes y comprensión multimodal mediante modelos de difusión latente y LLMs autoregresivos.
        </p>
      </div>

      {/* Modality Selector Bar */}
      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap items-center justify-center p-1.5 rounded-xl bg-slate-900 border border-slate-800 gap-1">
          {[
            { id: 'texto', label: 'Texto & LLMs', icon: Type },
            { id: 'imagen', label: 'Difusión de Imágenes', icon: ImageIcon },
            { id: 'codigo', label: 'Generación Código', icon: Code2 },
            { id: 'audio', label: 'Audio & Vocoders', icon: Music },
            { id: 'multimodal', label: 'Multimodal Vision-Text', icon: Eye }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeModality === item.id;
            return (
              <button
                key={item.id}
                id={`genai-tab-${item.id}`}
                onClick={() => setActiveModality(item.id as any)}
                className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-tech font-bold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Prompt & Config Controls */}
        <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-md space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-tech text-cyan-300 uppercase font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>Prompt de Entrada (Input Conditioning)</span>
              </label>
              <button
                onClick={() => setCurrentPrompt(prompts[activeModality])}
                className="text-[10px] font-tech text-slate-400 hover:text-cyan-300 underline"
              >
                Restablecer Preset
              </button>
            </div>
            <textarea
              value={currentPrompt}
              onChange={(e) => setCurrentPrompt(e.target.value)}
              rows={3}
              className="w-full bg-[#080c12] border border-slate-700 rounded-xl p-3 text-xs font-tech text-slate-200 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none"
            />
          </div>

          {/* Hyperparameter Sliders */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <div>
              <div className="flex justify-between text-xs font-tech mb-1">
                <span className="text-slate-300">Temperatura (Creatividad / Entropía):</span>
                <span className="text-cyan-400 font-bold">{temperature}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.5"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-tech mb-1">
                <span className="text-slate-300">Top-p (Nucleus Sampling):</span>
                <span className="text-emerald-400 font-bold">{topP}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.05"
                value={topP}
                onChange={(e) => setTopP(parseFloat(e.target.value))}
                className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {activeModality === 'imagen' && (
              <div>
                <div className="flex justify-between text-xs font-tech mb-1">
                  <span className="text-slate-300">Escala de Guía CFG (Guidance Scale):</span>
                  <span className="text-purple-400 font-bold">{guidanceScale}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={guidanceScale}
                  onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
                  className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Action Trigger Button */}
          <button
            id="start-genai-synthesis-btn"
            disabled={isGenerating}
            onClick={handleSimulateGeneration}
            className={`w-full py-3.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isGenerating
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 animate-pulse'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)]'
            }`}
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>{isGenerating ? `Sintetizando (${generationProgress}%)...` : 'Iniciar Generación Sintética'}</span>
          </button>
        </div>

        {/* Output Canvas / Screen */}
        <div className="lg:col-span-7 bg-[#080c12] p-6 rounded-2xl border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.8)] min-h-[380px] flex flex-col justify-between">
          <div>
            {/* Header Telemetry */}
            <div className="flex items-center justify-between text-xs font-tech text-slate-400 pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isGenerating ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'}`} />
                <span className="text-white font-bold uppercase">{activeModality} Engine</span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span>Latencia: <strong className="text-cyan-400">38 ms</strong></span>
                <span>Throughput: <strong className="text-emerald-400">92 tokens/s</strong></span>
                <span>VRAM: <strong className="text-purple-400">14.2 GB</strong></span>
              </div>
            </div>

            {/* Content Output Rendering */}
            {activeModality === 'imagen' ? (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-64 h-64 rounded-xl border border-cyan-500/40 relative overflow-hidden flex items-center justify-center bg-slate-950 shadow-[0_0_25px_rgba(0,243,255,0.2)]">
                  {diffusionStep === 0 && !isGenerating && (
                    <div className="text-center p-4 text-slate-400 text-xs font-tech">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                      Presiona "Iniciar Generación" para ver el desruidado latente paso a paso.
                    </div>
                  )}

                  {/* Latent Diffusion Simulation View */}
                  {(isGenerating || diffusionStep > 0) && (
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                      <div 
                        className="w-full h-full transition-all duration-300 flex items-center justify-center"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, rgba(0, 243, 255, ${diffusionStep / 20}), rgba(13, 17, 23, 0.95))`,
                          filter: `blur(${Math.max(0, 10 - (diffusionStep / 2))}px)`
                        }}
                      >
                        <div className="text-center p-4">
                          <Cpu className="w-16 h-16 mx-auto text-cyan-400 drop-shadow-[0_0_15px_#00f3ff]" />
                          <div className="text-xs font-tech font-bold text-white mt-2">
                            {diffusionStep >= 20 ? 'CYBER MATRIX CORE' : `Desruidando Paso ${diffusionStep}/20`}
                          </div>
                          <div className="text-[10px] font-tech text-cyan-300">
                            Latent Noise: {Math.max(0, (1 - diffusionStep / 20)).toFixed(2)} σ
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full max-w-xs mt-3 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full transition-all duration-100"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
              </div>
            ) : activeModality === 'audio' ? (
              <div className="py-6 text-center space-y-4">
                <div className="h-28 flex items-center justify-center gap-1.5 px-4 bg-slate-950 rounded-xl border border-slate-800">
                  {Array.from({ length: 32 }).map((_, idx) => {
                    const heightPercent = isGenerating 
                      ? Math.sin(idx * 0.5 + generationProgress * 0.1) * 35 + 45 
                      : generationProgress === 100 
                      ? Math.abs(Math.sin(idx * 0.8)) * 60 + 15 
                      : 10;
                    return (
                      <div
                        key={idx}
                        className="w-1.5 rounded-full bg-cyan-400 transition-all duration-75"
                        style={{ height: `${heightPercent}%`, opacity: 0.3 + (heightPercent / 100) * 0.7 }}
                      />
                    );
                  })}
                </div>
                <div className="text-xs font-tech text-slate-300">
                  {outputContent || 'Listo para muestrear el vocoder neural en tiempo real...'}
                </div>
              </div>
            ) : (
              <div className="relative">
                <pre className="text-xs font-tech text-slate-200 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto pr-2">
                  {outputContent || '// Haz clic en "Iniciar Generación Sintética" para comenzar la transmisión de tensores...'}
                  {isGenerating && (
                    <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-pulse align-middle" />
                  )}
                </pre>
              </div>
            )}
          </div>

          {/* Footer Status */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-tech text-slate-400">
            <span>Algoritmo: Transformer Decoder con Rotary Position Embeddings (RoPE)</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Simulación Determinista Local</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
