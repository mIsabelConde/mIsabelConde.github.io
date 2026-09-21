export interface NavItem {
  id: string;
  label: string;
  badge?: string;
}

export interface MetricCounter {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  trend: string;
  changeRate: number;
}

export interface ConceptCardData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  example: string;
  technologies: string[];
  keyMetric: string;
  iconName: string;
  glowColor: 'cyan' | 'green' | 'blue' | 'purple';
}

export interface ApplicationSector {
  id: string;
  title: string;
  icon: string;
  description: string;
  practicalExample: string;
  impactMetrics: string;
  technologies: string[];
  caseStudy: string;
}

export interface TechTool {
  name: string;
  category: 'Lenguaje' | 'Deep Learning' | 'Machine Learning' | 'Data Science' | 'Infraestructura';
  description: string;
  popularity: number; // 0 - 100
  sampleCode: string;
  officialSite: string;
  badge: string;
}

export interface SecurityThreat {
  id: string;
  timestamp: string;
  type: string;
  severity: 'Crítica' | 'Alta' | 'Media' | 'Baja';
  sourceIp: string;
  targetEndpoint: string;
  aiConfidence: number;
  status: 'Detectado' | 'Mitigando' | 'Neutralizado';
  mitigationAction: string;
}

export interface TerminalEntry {
  command: string;
  output: string | string[];
  timestamp: string;
  isError?: boolean;
}
