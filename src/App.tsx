/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CyberBackground } from './components/CyberBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AiConceptsSection } from './components/AiConceptsSection';
import { MachineLearningSection } from './components/MachineLearningSection';
import { NeuralNetworkVisualizer } from './components/NeuralNetworkVisualizer';
import { DataScienceSection } from './components/DataScienceSection';
import { GenerativeAiStudio } from './components/GenerativeAiStudio';
import { AiPlayground } from './components/AiPlayground';
import { DataScienceDashboard } from './components/DataScienceDashboard';
import { CybersecuritySection } from './components/CybersecuritySection';
import { ApplicationsSection } from './components/ApplicationsSection';
import { TechStackSection } from './components/TechStackSection';
import { EthicsFutureSection } from './components/EthicsFutureSection';
import { TerminalCli } from './components/TerminalCli';
import { Footer } from './components/Footer';

export default function App() {
  const [matrixEffectActive, setMatrixEffectActive] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen bg-[#0d1117] text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Cyberpunk Matrix Background Canvas */}
      <CyberBackground isMatrixMode={matrixEffectActive} />

      {/* Persistent Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-4 sm:space-y-12">
        {/* 1. Hero Landing */}
        <HeroSection />

        {/* 2. Conceptos Fundamentales de IA */}
        <AiConceptsSection />

        {/* 3. Machine Learning y Paradigmas */}
        <MachineLearningSection />

        {/* 4. Redes Neuronales & Deep Learning Visualizer */}
        <NeuralNetworkVisualizer />

        {/* 5. Ciencia de Datos & Métodos Analíticos */}
        <DataScienceSection />

        {/* 6. IA Generativa & Síntesis Multimodal */}
        <GenerativeAiStudio />

        {/* 7. AI Playground (K-Means, SVM, Generador) */}
        <AiPlayground />

        {/* 8. Dashboard de Data Science en Tiempo Real */}
        <DataScienceDashboard />

        {/* 9. IA y Ciberseguridad Defensiva */}
        <CybersecuritySection />

        {/* 10. Aplicaciones Multisectoriales de la IA */}
        <ApplicationsSection />

        {/* 11. Tecnologías y Herramientas */}
        <TechStackSection />

        {/* 12. Ética, Gobernanza y Futuro de la IA */}
        <EthicsFutureSection />

        {/* 13. Terminal CLI Matrix Interactiva */}
        <TerminalCli />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

