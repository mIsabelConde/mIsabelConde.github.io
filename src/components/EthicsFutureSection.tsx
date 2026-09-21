import React, { useState } from 'react';
import { ETHICS_THEMES } from '../data/aiData';
import { 
  Scale, Lock, Users, ShieldCheck, Eye, FileText, 
  Briefcase, Rocket, ChevronRight, CheckCircle2, AlertOctagon, HelpCircle
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Scale,
  Lock,
  Users,
  ShieldCheck,
  Eye,
  FileText,
  Briefcase,
  Rocket
};

export const EthicsFutureSection: React.FC = () => {
  const [selectedThemeIndex, setSelectedThemeIndex] = useState<number>(0);
  const [activeDilemma, setActiveDilemma] = useState<'salud' | 'laboral' | 'transparencia'>('salud');
  const [userDecision, setUserDecision] = useState<string | null>(null);

  const dilemmas = {
    salud: {
      title: 'Triaje Médico Asistido por Algoritmos',
      context: 'En una sala de emergencias saturada, un modelo de Deep Learning predice que el Paciente A tiene 92% de probabilidad de recuperación rápida con soporte respiratorio, mientras que el Paciente B tiene 65% pero es de mayor edad y menor nivel socioeconómico. Solo queda un respirador libre.',
      options: [
        { id: 'opt1', label: 'Priorizar métrica utilitarista pura de la IA (Maximizar vidas salvadas)' },
        { id: 'opt2', label: 'Aplicar principio bioético humano de igualdad (Orden de llegada o deliberación médica)' },
        { id: 'opt3', label: 'Exigir explicabilidad contrafactual al modelo antes de tomar la decisión asistida' }
      ],
      analysis: 'Este dilema ilustra la tensión entre la optimización matemática de supervivencia y los principios bioéticos de no discriminación y dignidad humana universal.'
    },
    laboral: {
      title: 'Automatización Cognitiva vs Preservación del Empleo',
      context: 'Una corporación de logística puede sustituir el 70% de su departamento administrativo y de análisis de datos por agentes LLM autónomos, reduciendo costes un 80% y triplicando el rendimiento operativo.',
      options: [
        { id: 'opt1', label: 'Despliegue total inmediato para maximizar la competitividad en el mercado global' },
        { id: 'opt2', label: 'Transición gradual con reinversión obligatoria en programas de Recualificación (Reskilling)' },
        { id: 'opt3', label: 'Políticas de IA Colaborativa (Copiloto humano-en-el-bucle sin despidos netos)' }
      ],
      analysis: 'Destaca la necesidad de políticas públicas de transición económica para evitar fracturas sociales provocadas por saltos tecnológicos exponenciales.'
    },
    transparencia: {
      title: 'Caja Negra vs Explicabilidad en Préstamos Hipotecarios',
      context: 'Una red neuronal profunda con 1.500 millones de parámetros tiene una precisión del 99.1% al predecir impagos, pero sus ponderaciones tensoriales no pueden explicarse de forma comprensible a un cliente rechazado.',
      options: [
        { id: 'opt1', label: 'Permitir el modelo complejo por su superior tasa de solvencia financiera' },
        { id: 'opt2', label: 'Obligar al uso de modelos inherentemente interpretables (ej: Árboles poco profundos) aunque pierdan 3% de precisión' },
        { id: 'opt3', label: 'Implementar aproximaciones locales explicables (SHAP/LIME) como salvaguarda jurídica' }
      ],
      analysis: 'Muestra el dilema entre maximización de la precisión estadística y el derecho ciudadano fundamental a recibir una explicación comprensible ante una decisión que afecta su vida.'
    }
  };

  const currentTheme = ETHICS_THEMES[selectedThemeIndex];
  const CurrentIcon = iconMap[currentTheme.icon] || Scale;

  return (
    <section id="etica" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/40 border border-purple-500/30 text-purple-300 font-tech text-xs uppercase mb-3">
          <Scale className="w-3.5 h-3.5" />
          <span>Módulo 11 • Responsabilidad y Horizontes</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
          ÉTICA Y FUTURO DE <span className="text-purple-400 text-glow-purple">LA IA</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Una reflexión equilibrada, multidisciplinar y basada en evidencia sobre los desafíos morales, normativos y existenciales del avance de la inteligencia sintética.
        </p>
      </div>

      {/* Grid of 8 Topics with active inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Navigation Topic Pills */}
        <div className="lg:col-span-5 space-y-2">
          {ETHICS_THEMES.map((theme, idx) => {
            const Icon = iconMap[theme.icon] || Scale;
            const isSelected = selectedThemeIndex === idx;

            return (
              <div
                key={idx}
                id={`ethics-tab-${idx}`}
                onClick={() => setSelectedThemeIndex(idx)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-purple-950/60 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-tech font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {theme.title}
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-purple-400 translate-x-1' : 'text-slate-600'}`} />
              </div>
            );
          })}
        </div>

        {/* Selected Topic Deep Dive */}
        <div className="lg:col-span-7 bg-slate-900/80 p-6 sm:p-8 rounded-2xl border border-purple-500/40 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-400 flex items-center justify-center">
              <CurrentIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-tech text-purple-400 uppercase tracking-wider">Marco Normativo & Filosófico</span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                {currentTheme.title}
              </h3>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {currentTheme.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Challenges */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30">
              <div className="text-xs font-tech uppercase text-rose-400 font-bold mb-2 flex items-center gap-1.5">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>Desafíos & Riesgos</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentTheme.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30">
              <div className="text-xs font-tech uppercase text-emerald-400 font-bold mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Soluciones & Gobernanza</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentTheme.solutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Ethical Dilemma Simulator */}
      <div className="bg-[#080c12] p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-tech text-purple-400 uppercase flex items-center gap-1 mb-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Simulador de Toma de Decisiones Éticas</span>
            </div>
            <h3 className="text-xl font-display font-bold text-white">
              Caso Práctico: {dilemmas[activeDilemma].title}
            </h3>
          </div>

          {/* Dilemma Selector */}
          <div className="flex items-center gap-2">
            {(['salud', 'laboral', 'transparencia'] as const).map((d) => (
              <button
                key={d}
                onClick={() => {
                  setActiveDilemma(d);
                  setUserDecision(null);
                }}
                className={`px-3 py-1.5 text-xs font-tech rounded-lg uppercase transition-colors ${
                  activeDilemma === d
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
          {dilemmas[activeDilemma].context}
        </p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {dilemmas[activeDilemma].options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setUserDecision(opt.id)}
              className={`w-full p-3.5 rounded-xl border text-left text-xs font-tech transition-all flex items-center justify-between cursor-pointer ${
                userDecision === opt.id
                  ? 'bg-purple-950/80 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>{opt.label}</span>
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                userDecision === opt.id ? 'border-purple-400 bg-purple-600' : 'border-slate-600'
              }`}>
                {userDecision === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
            </button>
          ))}
        </div>

        {/* Post-Decision Analysis */}
        {userDecision && (
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 animate-in fade-in duration-200 text-xs font-tech">
            <span className="text-purple-300 font-bold block mb-1">Dictamen Filosófico y Regulatorio:</span>
            <p className="text-slate-300 leading-relaxed">
              {dilemmas[activeDilemma].analysis}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
