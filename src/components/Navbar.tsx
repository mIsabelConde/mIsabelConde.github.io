import React, { useState, useEffect } from 'react';
import { Terminal, Play, Menu, X, Cpu, Activity, ShieldCheck, Zap, GraduationCap, Code2 } from 'lucide-react';

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'inicio', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'conceptos', label: 'Conceptos' },
    { id: 'machine-learning', label: 'ML' },
    { id: 'redes-neuronales', label: 'Redes Neuronales' },
    { id: 'ciencia-datos', label: 'Data Science' },
    { id: 'ia-generativa', label: 'IA Generativa' },
    { id: 'playground', label: 'Playground', isPill: true },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'ciberseguridad', label: 'Ciberseguridad' },
    { id: 'aplicaciones', label: 'Aplicaciones' },
    { id: 'herramientas', label: 'Herramientas' },
    { id: 'etica', label: 'Ética' },
    { id: 'terminal', label: 'CLI', icon: Terminal }
  ];

  const handleLinkClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0d1117]/90 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div
            id="brand-logo"
            onClick={() => handleLinkClick('inicio')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/50 flex items-center justify-center group-hover:border-cyan-300 transition-colors shadow-[0_0_15px_rgba(0,243,255,0.25)]">
              <Code2 className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold tracking-wider text-white text-sm sm:text-base">IA EN PROGRAMACIÓN</span>
                <span className="text-[10px] font-tech text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <GraduationCap className="w-2.5 h-2.5" />
                  Docente
                </span>
              </div>
              <div className="text-[10.5px] font-tech text-cyan-300/80 tracking-wide truncate max-w-[210px] sm:max-w-none">
                María Isabel Conde Altamirano
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleLinkClick(item.id)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                    item.isPill
                      ? isActive
                        ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_15px_rgba(0,243,255,0.5)]'
                        : 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20'
                      : isActive
                      ? 'text-cyan-400 bg-slate-800/80 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,243,255,0.2)]'
                      : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/40'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Actions (Desktop Medium) */}
          <div className="hidden md:flex xl:hidden items-center gap-2">
            <button
              onClick={() => handleLinkClick('playground')}
              className="px-3 py-1.5 text-xs font-tech font-semibold bg-cyan-500 text-black rounded-md flex items-center gap-1.5 hover:bg-cyan-400 transition-colors shadow-[0_0_12px_rgba(0,243,255,0.3)]"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>PLAYGROUND</span>
            </button>
            <button
              onClick={() => handleLinkClick('terminal')}
              className="px-3 py-1.5 text-xs font-tech bg-slate-900 border border-emerald-500/50 text-emerald-400 rounded-md flex items-center gap-1.5 hover:bg-slate-800"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 rounded-md transition-colors border border-slate-700/50"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="xl:hidden bg-[#0d1117]/95 border-b border-cyan-500/20 backdrop-blur-xl px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => handleLinkClick('playground')}
              className="py-2.5 px-3 bg-cyan-500 text-black font-tech font-bold text-xs rounded-lg flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,243,255,0.4)]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              PLAYGROUND
            </button>
            <button
              onClick={() => handleLinkClick('terminal')}
              className="py-2.5 px-3 bg-slate-900 border border-emerald-500 text-emerald-400 font-tech font-bold text-xs rounded-lg flex items-center justify-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5" />
              TERMINAL CLI
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  activeSection === item.id
                    ? 'bg-cyan-950/70 text-cyan-300 border-l-2 border-cyan-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
