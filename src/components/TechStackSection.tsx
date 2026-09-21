import React, { useState } from 'react';
import { TECH_TOOLS } from '../data/aiData';
import { TechTool } from '../types';
import { Code, Terminal, Layers, ExternalLink, Copy, Check, Cpu } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechTool>(TECH_TOOLS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('Todas');
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = ['Todas', 'Lenguaje', 'Deep Learning', 'Machine Learning', 'Data Science', 'Infraestructura'];

  const filteredTools = activeCategory === 'Todas'
    ? TECH_TOOLS
    : TECH_TOOLS.filter((t) => t.category === activeCategory);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedTech.sampleCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="herramientas" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-tech text-xs uppercase mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>Módulo 10 • Ecosistema Tecnológico</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
          TECNOLOGÍAS Y <span className="text-emerald-400 text-glow-green">HERRAMIENTAS</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Las herramientas, bibliotecas y plataformas de cómputo fundamentales que sustentan el flujo de trabajo moderno en Inteligencia Artificial.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs font-tech rounded-md transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(0,255,102,0.4)]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive List of Tools */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[540px] overflow-y-auto pr-1">
          {filteredTools.map((tech) => {
            const isSelected = selectedTech.name === tech.name;
            return (
              <div
                key={tech.name}
                id={`tech-card-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedTech(tech)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-400 shadow-[0_0_15px_rgba(0,255,102,0.25)]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-white text-base">{tech.name}</span>
                  <span className="text-[10px] font-tech text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    {tech.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                  {tech.description}
                </p>
                <div className="flex items-center justify-between text-[11px] font-tech text-slate-400">
                  <span>Adopción Global</span>
                  <span className="text-emerald-400 font-bold">{tech.popularity}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Tech Code Terminal Viewer */}
        <div className="lg:col-span-6 bg-[#080c12] p-6 rounded-2xl border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-display font-bold text-lg">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-lg">{selectedTech.name}</h3>
                <span className="text-xs font-tech text-slate-400">{selectedTech.category}</span>
              </div>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-tech text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {selectedTech.description}
          </p>

          {/* Code block */}
          <div className="bg-[#05080c] rounded-xl p-4 border border-slate-800 font-tech text-xs overflow-x-auto">
            <div className="text-[10px] text-slate-500 uppercase mb-2">// Código de Ejemplo • Inicialización</div>
            <pre className="text-emerald-300 leading-relaxed">
              <code>{selectedTech.sampleCode}</code>
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-tech">
            <span className="text-slate-400">Ecosistema estándar de desarrollo</span>
            <a
              href={selectedTech.officialSite}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Documentación Oficial</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
