import React, { useState } from 'react';
import { AI_CONCEPTS } from '../data/aiData';
import { ConceptCardData } from '../types';
import { 
  Cpu, History, Compass, Binary, Network, 
  MessageSquareCode, Eye, Sparkles, Bot, ArrowRight, X, ExternalLink, Lightbulb
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  History,
  Compass,
  Binary,
  Network,
  MessageSquareCode,
  Eye,
  Sparkles,
  Bot
};

export const AiConceptsSection: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<ConceptCardData | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('todos');

  const categories = ['todos', 'Fundamento', 'Evolución', 'Taxonomía', 'Núcleo ML', 'Arquitectura', 'Lingüística', 'Percepción', 'Síntesis', 'Agentes'];

  const filteredConcepts = activeFilter === 'todos' 
    ? AI_CONCEPTS 
    : AI_CONCEPTS.filter(c => c.category === activeFilter);

  return (
    <section id="ia" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-tech text-xs uppercase mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Módulo 01 • Fundamentos Cognitivos</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
          INTELIGENCIA <span className="text-cyan-400 text-glow-cyan">ARTIFICIAL</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Explora los pilares conceptuales que han impulsado la revolución tecnológica contemporánea: desde los fundamentos de la computación simbólica hasta los agentes autónomos de última generación.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1 text-xs font-tech rounded-md transition-all uppercase ${
                activeFilter === cat
                  ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_12px_rgba(0,243,255,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-cyan-300 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Interactive Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConcepts.map((concept) => {
          const Icon = iconMap[concept.iconName] || Cpu;
          const isCyan = concept.glowColor === 'cyan';
          const isGreen = concept.glowColor === 'green';
          const isBlue = concept.glowColor === 'blue';

          const borderHoverClass = isCyan 
            ? 'hover:border-cyan-400/80 hover:shadow-[0_0_25px_rgba(0,243,255,0.25)]' 
            : isGreen 
            ? 'hover:border-emerald-400/80 hover:shadow-[0_0_25px_rgba(0,255,102,0.25)]' 
            : isBlue
            ? 'hover:border-blue-400/80 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]'
            : 'hover:border-purple-400/80 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]';

          const accentBadgeClass = isCyan
            ? 'text-cyan-300 bg-cyan-950/60 border-cyan-500/30'
            : isGreen
            ? 'text-emerald-300 bg-emerald-950/60 border-emerald-500/30'
            : isBlue
            ? 'text-blue-300 bg-blue-950/60 border-blue-500/30'
            : 'text-purple-300 bg-purple-950/60 border-purple-500/30';

          return (
            <div
              key={concept.id}
              id={`concept-card-${concept.id}`}
              onClick={() => setSelectedConcept(concept)}
              className={`group relative rounded-xl p-6 bg-slate-900/50 border border-slate-800/90 backdrop-blur-md transition-all duration-300 flex flex-col justify-between cursor-pointer ${borderHoverClass}`}
            >
              {/* Corner tech accents */}
              <div className="absolute top-2 right-2 flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-tech text-cyan-400">#0{AI_CONCEPTS.findIndex(c => c.id === concept.id) + 1}</span>
              </div>

              <div>
                {/* Header Icon + Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center border transition-all duration-300 group-hover:scale-110 ${accentBadgeClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-tech uppercase tracking-wider px-2 py-0.5 rounded border ${accentBadgeClass}`}>
                    {concept.category}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {concept.title}
                </h3>
                <p className="text-xs font-tech text-slate-400 mb-3">
                  {concept.subtitle}
                </p>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {concept.description}
                </p>
              </div>

              {/* Application Example Box */}
              <div>
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 mb-4 group-hover:border-slate-700 transition-colors">
                  <div className="text-[10px] font-tech uppercase text-cyan-400 mb-1 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-cyan-400" />
                    <span>Ejemplo Práctico</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {concept.example}
                  </p>
                </div>

                {/* Footer Tag Badges & Action */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-tech text-emerald-400">
                    {concept.keyMetric}
                  </span>
                  <span className="text-xs font-tech text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Detalles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Detail Modal / Overlay */}
      {selectedConcept && (
        <div 
          id="concept-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedConcept(null)}
        >
          <div 
            className="relative max-w-2xl w-full bg-[#0d1117] border border-cyan-500/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,243,255,0.3)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedConcept(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-tech px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 uppercase">
                {selectedConcept.category}
              </span>
              <span className="text-xs font-tech text-emerald-400">
                {selectedConcept.keyMetric}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              {selectedConcept.title}
            </h3>
            <p className="text-sm font-tech text-cyan-400 mb-6">
              {selectedConcept.subtitle}
            </p>

            <div className="space-y-6 text-sm text-slate-200">
              <div>
                <h4 className="text-xs font-tech uppercase text-slate-400 tracking-wider mb-2">Definición Detallada</h4>
                <p className="leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-slate-300">
                  {selectedConcept.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-tech uppercase text-slate-400 tracking-wider mb-2">Caso de Uso y Aplicación Real</h4>
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30">
                  <p className="text-cyan-200">
                    {selectedConcept.example}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-tech uppercase text-slate-400 tracking-wider mb-2">Tecnologías y Métodos Clave</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedConcept.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs font-tech text-slate-200 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedConcept(null)}
                className="px-5 py-2 rounded-lg bg-cyan-500 text-black font-tech font-bold text-xs uppercase hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(0,243,255,0.4)]"
              >
                Cerrar Explorador
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
