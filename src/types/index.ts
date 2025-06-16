export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  prompts: string;
  features: string[];
  cta: string;
  popular: boolean;
  description?: string;
}

export interface UseCase {
  id: string;
  title: string;
  task: string;
  example: string;
  icon: React.ReactNode;
  category: 'marketing' | 'education' | 'business';
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface DemoStep {
  id: string;
  title: string;
  description: string;
  visual: 'initial' | 'questions' | 'result';
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  action?: () => void;
}

export interface FeatureStep {
  id: string;
  step: number;
  title: string;
  description: string;
  visual: React.ReactNode;
  color: 'blue' | 'purple' | 'green';
}