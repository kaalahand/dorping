import { PricingPlan, UseCase, Statistic, FeatureStep } from '@/types';
import { Sparkles, FileText, Users, Mail, Lightbulb, Download, ExternalLink, Copy } from 'lucide-react';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '',
    prompts: '50 prompts',
    features: ['Basic templates', 'Email support', 'Export to PDF'],
    cta: 'Get Started',
    popular: false,
    description: 'Perfect for trying out our AI assistant'
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '$4.99',
    period: '/month',
    prompts: '125 prompts',
    features: ['All templates', 'Priority support', 'All export options', 'Custom templates'],
    cta: 'Start Plan',
    popular: false,
    description: 'Great for individuals getting started'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19.99',
    period: '/month',
    prompts: '500 prompts',
    features: ['Everything in Starter', 'Advanced AI models', 'Team collaboration', 'API access', 'Priority processing'],
    cta: 'Go Pro',
    popular: true,
    description: 'Most popular for professionals'
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    price: '$49',
    period: '/month',
    prompts: 'Unlimited prompts',
    features: ['Everything in Pro', 'White-label solution', 'Custom integrations', 'Dedicated support', 'Advanced analytics'],
    cta: 'Contact Sales',
    popular: false,
    description: 'Enterprise-grade solution'
  }
];

export const USE_CASES: UseCase[] = [
  {
    id: 'marketing',
    title: 'Marketing Manager',
    task: 'Ad Copy Creation',
    example: 'Created compelling social media ads that increased CTR by 40%',
    icon: Sparkles,
    category: 'marketing'
  },
  {
    id: 'student',
    title: 'Student',
    task: 'Essay Writing',
    example: 'Structured a 5-paragraph essay on climate change in 2 minutes',
    icon: FileText,
    category: 'education'
  },
  {
    id: 'manager',
    title: 'Manager',
    task: 'Performance Review',
    example: 'Drafted professional employee feedback with actionable insights',
    icon: Users,
    category: 'business'
  }
];

export const STATISTICS: Statistic[] = [
  {
    id: 'success-rate',
    value: '78%',
    label: 'Success Rate',
    description: 'Aligns with AI adoption statistics and realistic conversion expectations'
  },
  {
    id: 'hours-saved',
    value: '8.1',
    label: 'Hours Saved Weekly',
    description: 'Comes directly from our research showing content creators lose this much time to prompt iteration'
  },
  {
    id: 'market-size',
    value: '$6.5B',
    label: 'Market Size',
    description: 'Uses actual market size projections to show industry momentum'
  }
];

export const FEATURE_STEPS: FeatureStep[] = [
  {
    id: 'choose-task',
    step: 1,
    title: 'Choose Your Task',
    description: 'Select from our library of templates: emails, documents, content, and more.',
    visual: 'task-selection',
    color: 'blue'
  },
  {
    id: 'answer-questions',
    step: 2,
    title: 'Answer Questions',
    description: 'Our AI asks targeted questions to understand your needs and context.',
    visual: 'questions-form',
    color: 'purple'
  },
  {
    id: 'get-output',
    step: 3,
    title: 'Get Your Output',
    description: 'Receive polished, ready-to-use content that you can export anywhere.',
    visual: 'export-options',
    color: 'green'
  }
];

export const DEMO_TASKS = [
  { id: 'email', label: 'Write Email', icon: Mail, color: 'blue' },
  { id: 'document', label: 'Create Document', icon: FileText, color: 'purple' },
  { id: 'brainstorm', label: 'Brainstorm Content', icon: Lightbulb, color: 'green' }
];

export const EXPORT_OPTIONS = [
  { id: 'pdf', label: 'PDF', icon: Download, color: 'blue' },
  { id: 'docs', label: 'Docs', icon: ExternalLink, color: 'green' },
  { id: 'copy', label: 'Copy', icon: Copy, color: 'purple' }
];