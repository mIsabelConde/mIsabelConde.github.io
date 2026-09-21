import React from 'react';
import { Cpu, Terminal, Shield, Sparkles, ArrowUp, Github, ExternalLink, Heart, GraduationCap, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070a0f] border-t border-cyan-500/20 pt-16 pb-12 overflow-hidden">
      {/* Glow highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_#00f3ff]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info & Author */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-wider text-white block">
                  IA EN <span className="text-cyan-400 text-glow-cyan">PROGRAMACIÓN</span>
                </span>
                <span className="text-[11px] font-tech text-emerald-400 flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  Docente de Programación
                </span>
              </div>
            </div>

            {/* Author Credit Badge Card */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/30">
              <div className="text-[11px] font-tech uppercase text-cyan-400 tracking-wider mb-1">
                Autora de la Plataforma
              </div>
              <div className="text-sm font-display font-bold text-white">
                María Isabel Conde Altamirano
              </div>
              <div className="text-xs text-emerald-400 font-tech">
                Docente de Programación
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Plataforma didáctica e interactiva para la formación en Inteligencia Artificial, Machine Learning y Ciencia de Datos aplicada al desarrollo de software y la estructuración algorítmica.
            </p>

            <div className="pt-1 text-[11px] font-tech text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CÁTEDRA DE PROGRAMACIÓN • NODO DIDÁCTICO MATRIX 2026</span>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h4 className="text-xs font-tech uppercase text-cyan-300 font-bold tracking-wider mb-4">
              Fundamentos
            </h4>
            <ul className="space-y-2 text-xs font-tech">
              <li>
                <a href="#inicio" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Inicio / Matrix Core
                </a>
              </li>
              <li>
                <a href="#conceptos" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Conceptos Fundamentales
                </a>
              </li>
              <li>
                <a href="#machine-learning" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Machine Learning & Paradigmas
                </a>
              </li>
              <li>
                <a href="#redes-neuronales" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Redes Neuronales & Backprop
                </a>
              </li>
              <li>
                <a href="#ciencia-datos" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Ciencia de Datos & Análisis
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h4 className="text-xs font-tech uppercase text-emerald-300 font-bold tracking-wider mb-4">
              Simulación & MLOps
            </h4>
            <ul className="space-y-2 text-xs font-tech">
              <li>
                <a href="#ia-generativa" className="text-slate-400 hover:text-emerald-300 transition-colors">
                  IA Generativa & LLMs
                </a>
              </li>
              <li>
                <a href="#playground" className="text-slate-400 hover:text-emerald-300 transition-colors">
                  AI Playground Interactivo
                </a>
              </li>
              <li>
                <a href="#dashboard" className="text-slate-400 hover:text-emerald-300 transition-colors">
                  Dashboard de Data Science
                </a>
              </li>
              <li>
                <a href="#ciberseguridad" className="text-slate-400 hover:text-emerald-300 transition-colors">
                  IA y Ciberseguridad
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 3 */}
          <div>
            <h4 className="text-xs font-tech uppercase text-purple-300 font-bold tracking-wider mb-4">
              Impacto & Consola
            </h4>
            <ul className="space-y-2 text-xs font-tech">
              <li>
                <a href="#aplicaciones" className="text-slate-400 hover:text-purple-300 transition-colors">
                  Aplicaciones Sectoriales
                </a>
              </li>
              <li>
                <a href="#herramientas" className="text-slate-400 hover:text-purple-300 transition-colors">
                  Tecnologías & Frameworks
                </a>
              </li>
              <li>
                <a href="#etica" className="text-slate-400 hover:text-purple-300 transition-colors">
                  Ética y Futuro de la IA
                </a>
              </li>
              <li>
                <a href="#terminal" className="text-slate-400 hover:text-purple-300 transition-colors">
                  Terminal CLI Matrix
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-slate-400">
          <div className="text-center sm:text-left">
            <span className="text-slate-300 font-medium">
              © {new Date().getFullYear()} Inteligencia Artificial en la Programación • Autora: María Isabel Conde Altamirano (Docente de Programación).
            </span>
            <span className="block text-[11px] text-cyan-400/80 mt-1">
              "El código es el lenguaje del pensamiento lógico; la inteligencia artificial es su mayor acelerador didáctico."
            </span>
          </div>

          <button
            onClick={scrollToTop}
            id="footer-back-to-top"
            className="p-3 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-black text-cyan-400 border border-slate-800 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer flex items-center gap-2"
            title="Volver arriba"
          >
            <span>Subir al Núcleo</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
