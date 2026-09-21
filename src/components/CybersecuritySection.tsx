import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, Activity, Terminal, ArrowRight, 
  Lock, AlertTriangle, Radio, RefreshCw, Zap, Server
} from 'lucide-react';
import { SecurityThreat } from '../types';

export const CybersecuritySection: React.FC = () => {
  const [pipelinePhase, setPipelinePhase] = useState<'trafico' | 'analisis' | 'deteccion' | 'alerta'>('analisis');
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'capacidades'>('pipeline');

  // Threat logs
  const [threats, setThreats] = useState<SecurityThreat[]>([
    {
      id: 'THR-904',
      timestamp: '17:28:44',
      type: 'Ataque DDoS SYN-Flood Masivo',
      severity: 'Crítica',
      sourceIp: '185.220.101.4',
      targetEndpoint: '/api/v1/auth/token',
      aiConfidence: 99.4,
      status: 'Neutralizado',
      mitigationAction: 'Aislamiento IP dinámico en BGP FlowSpec'
    },
    {
      id: 'THR-903',
      timestamp: '17:28:12',
      type: 'Exfiltración DNS Tunneling (Entropía Anómala)',
      severity: 'Alta',
      sourceIp: '192.168.1.145 (Host Interno)',
      targetEndpoint: 'ns1.dark-matrix.xyz',
      aiConfidence: 97.8,
      status: 'Neutralizado',
      mitigationAction: 'Regla de inspección profunda y bloqueo de socket'
    },
    {
      id: 'THR-902',
      timestamp: '17:27:39',
      type: 'Inyección SQL con Evasión Heurística',
      severity: 'Media',
      sourceIp: '103.251.167.22',
      targetEndpoint: '/query/telemetry',
      aiConfidence: 94.1,
      status: 'Neutralizado',
      mitigationAction: 'Saneamiento y sanitización WAF inmediata'
    }
  ]);

  // Rotate pipeline highlight
  useEffect(() => {
    const phases: ('trafico' | 'analisis' | 'deteccion' | 'alerta')[] = ['trafico', 'analisis', 'deteccion', 'alerta'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % phases.length;
      setPipelinePhase(phases[idx]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleRunSecurityScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const newThreat: SecurityThreat = {
        id: `THR-${Math.floor(Math.random() * 899 + 100)}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'Zero-Day Polymorphic Binary Heuristic Flag',
        severity: 'Crítica',
        sourceIp: '45.154.255.99',
        targetEndpoint: '/internal/cluster/rpc',
        aiConfidence: 98.9,
        status: 'Detectado',
        mitigationAction: 'Contenedor aislado en Sandbox de micro-segmentación'
      };
      setThreats((prev) => [newThreat, ...prev.slice(0, 4)]);
      setIsScanning(false);
    }, 1200);
  };

  const capabilities = [
    {
      title: 'Detección de Anomalías',
      icon: Activity,
      desc: 'Modelos de Isolation Forests y Autoencoders profundos que aprenden la línea base normal del tráfico y señalan desviaciones no vistas con latencia de sub-milisegundo.'
    },
    {
      title: 'Detección de Malware',
      icon: AlertTriangle,
      desc: 'Redes neuronales convolucionales aplicadas a representaciones de bytes de ejecutables para descubrir cepas polimórficas sin necesidad de firmas estáticas.'
    },
    {
      title: 'Análisis de Tráfico de Red',
      icon: Radio,
      desc: 'Monitoreo de flujo NetFlow y pcap en tiempo real con cálculo continuo de entropía de Shannon para detectar canales C2 encubiertos.'
    },
    {
      title: 'Detección de Intrusiones (NIDS)',
      icon: ShieldAlert,
      desc: 'Clasificadores basados en Gradient Boosting (XGBoost) entrenados con millones de vectores de ataque que filtran escaneos de puertos y fuerza bruta.'
    },
    {
      title: 'Identificación de Patrones Sospechosos',
      icon: Terminal,
      desc: 'Grafos de conocimiento dinámicos que correlacionan eventos aislados entre múltiples servidores para detectar movimientos laterales de ciberdelincuentes.'
    },
    {
      title: 'Análisis de Comportamiento (UEBA)',
      icon: Lock,
      desc: 'Sistemas que analizan el comportamiento habitual de cada usuario (horarios, volúmenes de descarga, geolocalización) para detectar credenciales comprometidas.'
    }
  ];

  return (
    <section id="ciberseguridad" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-950/40 border border-rose-500/30 text-rose-300 font-tech text-xs uppercase mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Módulo 08 • Defensa Algorítmica</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
          IA Y <span className="text-rose-400 text-glow-rose">CIBERSEGURIDAD</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          La vanguardia de la ciberdefensa proactiva: algoritmos de aprendizaje profundo que neutralizan ciberataques sofisticados antes de que impacten los activos críticos.
        </p>
      </div>

      {/* Pipeline Visual Stepper: TRÁFICO DE RED → ANÁLISIS IA → DETECCIÓN → ALERTA */}
      <div className="mb-12 bg-slate-900/80 p-6 rounded-2xl border border-rose-500/30 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <div className="text-xs font-tech text-slate-400 uppercase text-center mb-4">
          Pipeline de Inspección Continua en Tiempo Real
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: 'trafico',
              title: 'TRÁFICO DE RED',
              desc: 'Ingesta de 4.8 millones de paquetes/s en interfaces 100Gbps con bypass de kernel DPDK.',
              icon: Server,
              color: 'text-cyan-400',
              border: 'border-cyan-500'
            },
            {
              id: 'analisis',
              title: 'ANÁLISIS IA',
              desc: 'Extracción de vectores de características e inferencia en clúster acelerado por GPU Tensor.',
              icon: Activity,
              color: 'text-blue-400',
              border: 'border-blue-500'
            },
            {
              id: 'deteccion',
              title: 'DETECCIÓN',
              desc: 'Clasificación de anomalías, correlación temporal y contraste con base de conocimiento MITRE ATT&CK.',
              icon: AlertTriangle,
              color: 'text-amber-400',
              border: 'border-amber-500'
            },
            {
              id: 'alerta',
              title: 'ALERTA & MITIGACIÓN',
              desc: 'Disparo de reglas firewall automáticas, cuarentena de endpoints y notificación SIEM instantánea.',
              icon: ShieldCheck,
              color: 'text-rose-400',
              border: 'border-rose-500'
            }
          ].map((stage) => {
            const isHighlight = pipelinePhase === stage.id;
            const Icon = stage.icon;

            return (
              <div
                key={stage.id}
                className={`p-5 rounded-xl border transition-all duration-300 relative ${
                  isHighlight
                    ? `bg-slate-800 ${stage.border} shadow-[0_0_20px_rgba(244,63,94,0.3)] scale-[1.02]`
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-slate-900 border border-slate-800 ${stage.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isHighlight && (
                    <span className="flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-rose-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                    </span>
                  )}
                </div>
                <h3 className={`font-tech font-bold text-sm mb-1 ${stage.color}`}>{stage.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{stage.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulated Live Security Operations Center (SOC) Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Threat Radar & Actions */}
        <div className="lg:col-span-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-display font-bold text-white text-base">Escáner Heurístico</h3>
            <span className="text-[10px] font-tech text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
              Zero-Trust Activo
            </span>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed">
            Ejecuta un escaneo estocástico profundo sobre los nodos del clúster para validar las heurísticas de red contra ciberamenazas simuladas.
          </div>

          {/* Quick Metrics */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-tech">
              <span className="text-slate-400">Eficiencia de Mitigación:</span>
              <span className="text-emerald-400 font-bold">99.8%</span>
            </div>
            <div className="flex justify-between text-xs font-tech">
              <span className="text-slate-400">Tiempo Medio de Respuesta (MTTR):</span>
              <span className="text-cyan-400 font-bold">14 ms</span>
            </div>
            <div className="flex justify-between text-xs font-tech">
              <span className="text-slate-400">Reglas Activas en Red Neural:</span>
              <span className="text-purple-400 font-bold">1,840</span>
            </div>
          </div>

          <button
            id="run-soc-scan-btn"
            disabled={isScanning}
            onClick={handleRunSecurityScan}
            className={`w-full py-3 rounded-xl font-tech font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isScanning
                ? 'bg-rose-950 text-rose-300 border border-rose-500/50 animate-pulse'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Escaneando Clúster...' : 'Ejecutar Escaneo Heurístico'}</span>
          </button>
        </div>

        {/* Live Threat Log Table */}
        <div className="lg:col-span-8 bg-[#080c12] p-6 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-tech text-slate-400">
            <span>Log de Amenazas Detectadas por Inferencia IA</span>
            <span className="text-rose-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              Feed en Vivo
            </span>
          </div>

          <div className="space-y-3">
            {threats.map((threat) => (
              <div
                key={threat.id}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-rose-500/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-tech"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-rose-950/80 border border-rose-500/40 text-rose-300 font-bold uppercase">
                      {threat.severity}
                    </span>
                    <span className="text-white font-bold">{threat.type}</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Origen: <span className="text-cyan-300">{threat.sourceIp}</span> • Destino: <span className="text-slate-300">{threat.targetEndpoint}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:text-right">
                  <div>
                    <div className="text-emerald-400 font-bold">Confianza IA: {threat.aiConfidence}%</div>
                    <div className="text-[10px] text-slate-400">{threat.mitigationAction}</div>
                  </div>
                  <span className="px-2 py-1 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    {threat.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6 Core Capabilities Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((cap, idx) => {
          const Icon = cap.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-rose-500/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-rose-950/50 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-base mb-2 group-hover:text-rose-300 transition-colors">
                {cap.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {cap.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
