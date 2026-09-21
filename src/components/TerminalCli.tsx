import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2, Trash2, Play, Sparkles } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  content: string;
}

export const TerminalCli: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isMatrixRain, setIsMatrixRain] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      content: '╔════════════════════════════════════════════════════════════════╗\n║  INTELIGENCIA ARTIFICIAL EN LA PROGRAMACIÓN                   ║\n║  Autora: María Isabel Conde Altamirano (Docente de Programación)║\n║  Escribe "help" o "autora" para ver los comandos interactivos. ║\n╚════════════════════════════════════════════════════════════════╝'
    },
    {
      id: 'init-2',
      type: 'output',
      content: 'Entorno pedagógico neural inicializado. Módulos didácticos en línea.'
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    // Add input line
    const userLine: TerminalLine = {
      id: `in-${Date.now()}`,
      type: 'input',
      content: `estudiante@ia-programacion:~$ ${trimmed}`
    };

    setHistory((prev) => [trimmed, ...prev]);
    setHistoryIdx(-1);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let outputLine: TerminalLine;

    switch (command) {
      case 'help':
        outputLine = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: `COMANDOS DISPONIBLES:
• autora   - Muestra los datos y perfil de la autora docente.
• info     - Especificaciones y propósito pedagógico del sistema.
• status   - Telemetría de salud de tensores, memoria y simuladores.
• train    - Simula el bucle de entrenamiento de un modelo de red neuronal.
• predict  - Ejecuta una inferencia determinista sobre un vector numérico.
• scan     - Ejecuta un escaneo heurístico de anomalías y ciberdefensa.
• matrix   - Alterna la lluvia de código Matrix en el fondo interactivo.
• clear    - Limpia la pantalla de esta consola.
• date     - Muestra el tiempo del sistema y sesión activa.`
        };
        break;

      case 'autora':
      case 'author':
      case 'docente':
        outputLine = {
          id: `out-${Date.now()}`,
          type: 'success',
          content: `DATOS DE LA AUTORÍA:
• Nombre: María Isabel Conde Altamirano
• Rol: Docente de Programación
• Especialidad: Enseñanza de Algoritmos, Estructuras de Datos e Inteligencia Artificial
• Propósito de la Plataforma: Facilitar la comprensión intuitiva y matemática de la IA aplicada a la programación y a la ciencia de datos.`
        };
        break;

      case 'clear':
        setLines([]);
        setInputVal('');
        return;

      case 'info':
        outputLine = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: `INFORMACIÓN DE LA PLATAFORMA:
• Título: Inteligencia Artificial en la Programación
• Autora: María Isabel Conde Altamirano (Docente de Programación)
• Tecnologías: React 18 / TypeScript / Tailwind CSS / HTML5 Canvas / SVG Interactivo
• Enfoque: Didáctico, interactivo y determinista (Zero-Backend Client-Side)
• Módulos: Redes Neuronales, Descenso de Gradiente, K-Means, SVM, LLMs, Ciberdefensa`
        };
        break;

      case 'status':
        outputLine = {
          id: `out-${Date.now()}`,
          type: 'success',
          content: `[STATUS REPORT - TODOS LOS SUBSISTEMAS OPERATIVOS]
• CPU Latent Cores: 64/64 ACTIVOS (Carga: 28.4%)
• Memoria HBM3: 48.2 GB / 96.0 GB Asignada
• Topología Neuronal: 4 Capas Conectadas • Tasa de Error: 0.0024
• Clúster Firewall: ACTIVO • MITRE ATT&CK Reglas: 1,840
• Conectividad: Óptima • Latencia: 1.2ms`
        };
        break;

      case 'scan':
        outputLine = {
          id: `out-${Date.now()}`,
          type: 'system',
          content: `[INICIANDO ESCANEO HEURÍSTICO]
> Analizando 42,000 vectores de paquetes en tiempo real...
> Comprobando firmas contra base de datos de anomalías de entropía...
[ALERTA DETECTADA]
• Puerto 8080: Intento de inyección SQL mitigado (Confianza IA: 99.1%)
• Clasificador: Isolation Forest v2.4 • Estado: Neutralizado.`
        };
        break;

      case 'train':
        outputLine = {
          id: `out-${Date.now()}`,
          type: 'system',
          content: `[ENTRENAMIENTO SIMULADO EN CURSO]
Optimizador: AdamW (lr=0.001, betas=(0.9, 0.999))
Epoch 1/5 | Loss: 0.6923 | Precisión: 58.2% | ETA: 4s
Epoch 2/5 | Loss: 0.4512 | Precisión: 79.4% | ETA: 3s
Epoch 3/5 | Loss: 0.2841 | Precisión: 89.1% | ETA: 2s
Epoch 4/5 | Loss: 0.1650 | Precisión: 95.8% | ETA: 1s
Epoch 5/5 | Loss: 0.0812 | Precisión: 99.4% | ¡CONVERGENCIA ÓPTIMA!`
        };
        break;

      case 'predict':
        const inputValSample = args[0] ? parseFloat(args[0]) : 42.5;
        const prob = (1 / (1 + Math.exp(-inputValSample * 0.1))).toFixed(4);
        outputLine = {
          id: `out-${Date.now()}`,
          type: 'success',
          content: `[INFERENCIA TENSORIAL COMPLETADA]
• Vector de Entrada X: [${inputValSample}, ${(inputValSample * 1.5).toFixed(1)}, ${(inputValSample * -0.3).toFixed(1)}]
• Función de Activación: Sigmoid
• Probabilidad P(Clase=1 | X): ${prob}
• Decisión Clasificatoria: CLASE POSITIVA (Alta certeza)`
        };
        break;

      case 'matrix':
        setIsMatrixRain(!isMatrixRain);
        outputLine = {
          id: `out-${Date.now()}`,
          type: 'system',
          content: !isMatrixRain
            ? '>> LLUVIA DIGITAL MATRIX ACTIVADA EN EL CANVAS DE FONDO.'
            : '>> MODO MATRIX DESACTIVADO. Retornando a flujo de red neural.'
        };
        break;

      case 'date':
        outputLine = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: `Timestamp: ${new Date().toISOString()} • Ciclo Cuántico: #89281`
        };
        break;

      default:
        outputLine = {
          id: `err-${Date.now()}`,
          type: 'error',
          content: `Comando no reconocido: "${command}". Escribe "help" para ver la lista de comandos disponibles.`
        };
    }

    setLines((prev) => [...prev, userLine, outputLine]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0) {
        const nextIdx = Math.min(history.length - 1, historyIdx + 1);
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  const quickCommands = ['help', 'status', 'train', 'scan', 'predict 25', 'matrix', 'clear'];

  return (
    <section id="terminal" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-tech text-xs uppercase mb-3">
          <TerminalIcon className="w-3.5 h-3.5" />
          <span>Módulo 12 • Interfaz de Línea de Comandos</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
          TERMINAL <span className="text-emerald-400 text-glow-green">CYBERPUNK</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Interactúa directamente con el núcleo simulado de la plataforma a través de una consola con comandos UNIX/Neural.
        </p>

        {/* Quick Command Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <span className="text-xs font-tech text-slate-400 mr-2">Comandos Rápidos:</span>
          {quickCommands.map((q) => (
            <button
              key={q}
              onClick={() => handleCommand(q)}
              className="px-2.5 py-1 text-xs font-tech bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 rounded-md transition-all hover:border-emerald-400 cursor-pointer"
            >
              ${q}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Window */}
      <div className={`mx-auto bg-[#05080c] rounded-2xl border border-emerald-500/40 shadow-[0_0_50px_rgba(0,255,102,0.15)] overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-w-6xl h-[650px]' : 'max-w-4xl h-[480px]'
      } flex flex-col`}>
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-xs font-tech text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-white font-bold">bash - neuronexus-core@matrix:~</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLines([])}
              className="hover:text-white transition-colors"
              title="Limpiar"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="hover:text-white transition-colors"
              title={isExpanded ? 'Contraer' : 'Expandir'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Output Screen */}
        <div
          className="flex-1 p-5 overflow-y-auto font-tech text-xs sm:text-sm space-y-3 cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line) => {
            let color = 'text-slate-300';
            if (line.type === 'input') color = 'text-cyan-400 font-bold';
            if (line.type === 'success') color = 'text-emerald-400';
            if (line.type === 'error') color = 'text-rose-400';
            if (line.type === 'system') color = 'text-purple-300';

            return (
              <div key={line.id} className="whitespace-pre-wrap leading-relaxed">
                <span className={color}>{line.content}</span>
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Input Field */}
        <div className="px-4 py-3 bg-slate-950/90 border-t border-slate-800 flex items-center gap-2 font-tech text-sm">
          <span className="text-emerald-400 font-bold">guest@neuronexus:~$</span>
          <input
            ref={inputRef}
            type="text"
            id="terminal-cli-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe 'help' o presiona enter..."
            className="flex-1 bg-transparent border-none outline-none text-white font-tech text-xs sm:text-sm caret-emerald-400"
            autoComplete="off"
            spellCheck="false"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs uppercase rounded transition-colors cursor-pointer"
          >
            Enviar
          </button>
        </div>
      </div>
    </section>
  );
};
