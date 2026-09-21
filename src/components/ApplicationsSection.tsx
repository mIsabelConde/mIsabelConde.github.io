import React, { useState } from 'react';
import { APPLICATION_SECTORS } from '../data/aiData';
import { ApplicationSector } from '../types';
import { 
  Stethoscope, GraduationCap, LineChart, Factory, Sprout, 
  Car, ShieldAlert, Bot, Target, Atom, ArrowRight, X, Sparkles, CheckCircle2
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  GraduationCap,
  LineChart,
  Factory,
  Sprout,
  Car,
  ShieldAlert,
  Bot,
  Target,
  Atom
};

export const ApplicationsSection: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<ApplicationSector | null>(null);

  return (
    <section id="aplicaciones" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/40 border border-blue-500/30 text-blue-300 font-tech text-xs uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Módulo 09 • Impacto Multisectorial</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
          APLICACIONES DE <span className="text-blue-400 text-glow-blue">LA IA</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Descubre cómo las tecnologías cognitivas y los modelos predictivos están transformando industrias críticas en todo el planeta.
        </p>
      </div>

      {/* 10 Interactive Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {APPLICATION_SECTORS.map((sector, idx) => {
          const Icon = iconMap[sector.icon] || Sparkles;

          return (
            <div
              key={sector.id}
              id={`sector-card-${sector.id}`}
              onClick={() => setSelectedSector(sector)}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-400/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-950/70 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-tech text-slate-500 group-hover:text-blue-400">
                    #0{idx + 1}
                  </span>
                </div>

                <h3 className="font-display font-bold text-white text-base mb-1.5 group-hover:text-blue-300 transition-colors">
                  {sector.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {sector.description}
                </p>
              </div>

              <div>
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-tech text-cyan-300 line-clamp-2 mb-3">
                  {sector.practicalExample}
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-tech text-blue-400">
                  <span>Ver caso de estudio</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedSector && (
        <div
          id="sector-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedSector(null)}
        >
          <div
            className="relative max-w-xl w-full bg-[#0d1117] border border-blue-500/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(59,130,246,0.3)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSector(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950 border border-blue-500/40 text-blue-300 font-tech text-xs uppercase mb-3">
              <span>Sector Estratégico</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              {selectedSector.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedSector.description}
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-blue-500/30">
                <div className="text-xs font-tech uppercase text-blue-400 font-bold mb-1">
                  Ejemplo Práctico de Campo
                </div>
                <p className="text-xs sm:text-sm text-slate-200">
                  {selectedSector.practicalExample}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
                <div className="text-xs font-tech uppercase text-emerald-400 font-bold mb-1">
                  Métricas de Impacto Cuantificado
                </div>
                <p className="text-xs sm:text-sm text-emerald-300 font-tech font-bold">
                  {selectedSector.impactMetrics}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30">
                <div className="text-xs font-tech uppercase text-purple-400 font-bold mb-1">
                  Caso de Estudio Exhaustivo
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedSector.caseStudy}
                </p>
              </div>

              <div>
                <div className="text-xs font-tech uppercase text-slate-400 mb-2">Arquitecturas y Tecnologías Utilizadas:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedSector.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-slate-800 text-xs font-tech text-cyan-300 border border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedSector(null)}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-tech font-bold text-xs uppercase hover:bg-blue-500 transition-colors"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
