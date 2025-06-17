import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  History, 
  Store, 
  BarChart3, 
  Crown, 
  User, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Mail, 
  FileText, 
  Lightbulb, 
  Smile,
  Code,
  PenTool,
  MessageSquare,
  Briefcase,
  X,
  Check,
  Sparkles,
  Target,
  Users,
  Palette,
  Send,
  Copy,
  Download,
  ExternalLink,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Edit3,
  Save,
  Search,
  Filter,
  Calendar,
  Star,
  Play,
  Edit
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

interface SavedPrompt {
  id: string;
  name: string;
  taskType: string;
  originalPrompt: string;
  answers: {
    goal: string;
    audience: string;
    tone: string;
  };
  generatedOutput: string;
  createdAt: Date;
  lastUsed?: Date;
  rating: number;
  tags: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showFinalOutput, setShowFinalOutput] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{id: number, message: string, sender: 'user' | 'ai', timestamp: Date}>>([]);
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [isGeneratingFinal, setIsGeneratingFinal] = useState(false);
  const [activeView, setActiveView] = useState('create');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [promptName, setPromptName] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [answers, setAnswers] = useState({
    goal: '',
    audience: '',
    tone: ''
  });

  // Sample saved prompts data
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([
    {
      id: '1',
      name: 'Email-Follow up meeting-2025-01-15',
      taskType: 'email',
      originalPrompt: 'Write a follow-up email after our product demo meeting',
      answers: {
        goal: 'Follow up on meeting and next steps',
        audience: 'Enterprise clients',
        tone: 'Professional'
      },
      generatedOutput: 'Sample email content...',
      createdAt: new Date('2025-01-15'),
      lastUsed: new Date('2025-01-15'),
      rating: 5,
      tags: ['follow-up', 'enterprise', 'demo']
    },
    {
      id: '2',
      name: 'Content-Blog post about AI trends-2025-01-14',
      taskType: 'content',
      originalPrompt: 'Create a blog post about emerging AI trends in 2025',
      answers: {
        goal: 'Educate readers about AI developments',
        audience: 'Tech professionals',
        tone: 'Informative'
      },
      generatedOutput: 'Sample blog content...',
      createdAt: new Date('2025-01-14'),
      rating: 4,
      tags: ['AI', 'trends', 'blog', '+1']
    },
    {
      id: '3',
      name: 'Master Prompt-Creative writing assistant-2025-01-13',
      taskType: 'creative',
      originalPrompt: 'Create a master prompt for generating creative story ideas',
      answers: {
        goal: 'Generate engaging story concepts',
        audience: 'Writers and creators',
        tone: 'Inspiring'
      },
      generatedOutput: 'Sample creative content...',
      createdAt: new Date('2025-01-13'),
      lastUsed: new Date('2025-01-13'),
      rating: 5,
      tags: ['creative', 'writing', 'master-prompt']
    },
    {
      id: '4',
      name: 'Business-Quarterly review presentation-2025-01-10',
      taskType: 'business',
      originalPrompt: 'Create an outline for Q4 business review presentation',
      answers: {
        goal: 'Present quarterly results',
        audience: 'Board members',
        tone: 'Professional'
      },
      generatedOutput: 'Sample business content...',
      createdAt: new Date('2025-01-10'),
      rating: 4,
      tags: ['business', 'quarterly', 'presentation']
    },
    {
      id: '5',
      name: 'Code-React component documentation-2025-01-08',
      taskType: 'code',
      originalPrompt: 'Generate documentation for a React component library',
      answers: {
        goal: 'Document component usage',
        audience: 'Developers',
        tone: 'Technical'
      },
      generatedOutput: 'Sample code documentation...',
      createdAt: new Date('2025-01-08'),
      rating: 5,
      tags: ['code', 'react', 'documentation']
    }
  ]);

  // Onboarding checklist state
  const [onboardingChecklist, setOnboardingChecklist] = useState({
    signUp: true,
    createPrompt: false,
    savePrompt: false,
    ratePrompt: false
  });

  const tasks = [
    {
      id: 'email',
      title: 'Write Email',
      icon: <Mail className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      description: 'Professional emails, follow-ups, and communications'
    },
    {
      id: 'document',
      title: 'Create Document',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      description: 'Reports, proposals, and structured documents'
    },
    {
      id: 'creative',
      title: 'Creative Ideas',
      icon: <Lightbulb className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      description: 'Brainstorming, creative writing, and ideation'
    },
    {
      id: 'entertainment',
      title: 'Entertain Me',
      icon: <Smile className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      description: 'Fun content, jokes, and entertainment'
    },
    {
      id: 'code',
      title: 'Write Code',
      icon: <Code className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600',
      description: 'Programming, scripts, and technical documentation'
    },
    {
      id: 'content',
      title: 'Content Creation',
      icon: <PenTool className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600',
      description: 'Blog posts, social media, and marketing content'
    },
    {
      id: 'communication',
      title: 'Team Communication',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-teal-500 to-teal-600',
      description: 'Meeting notes, updates, and team messages'
    },
    {
      id: 'business',
      title: 'Business Strategy',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      description: 'Plans, strategies, and business documents'
    }
  ];

  const navigationItems = [
    { id: 'create', icon: <Plus className="w-6 h-6" />, label: 'Create Prompt', active: activeView === 'create' },
    { id: 'history', icon: <History className="w-6 h-6" />, label: 'My Prompts', active: activeView === 'history' },
    { id: 'marketplace', icon: <Store className="w-6 h-6" />, label: 'Marketplace', isPro: true },
    { id: 'analytics', icon: <BarChart3 className="w-6 h-6" />, label: 'Analytics', isPro: true },
    { id: 'upgrade', icon: <Crown className="w-6 h-6" />, label: 'Upgrade', isUpgrade: true }
  ];

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(taskId);
    setCurrentStep(2);
  };

  const handleGenerateOutput = async () => {
    if (!userPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsGenerating(false);
    setShowQuestions(true);
    setCurrentStep(3);
    
    // Update onboarding
    setOnboardingChecklist(prev => ({ ...prev, createPrompt: true }));
  };

  const handleGenerateFinalOutput = async () => {
    setIsGeneratingFinal(true);
    
    // Simulate API call for final output generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate sample output based on selected task
    const taskInfo = getSelectedTaskInfo();
    let sampleOutput = '';
    
    switch (selectedTask) {
      case 'email':
        sampleOutput = `Subject: ${answers.goal || 'Follow-up on Our Discussion'}

Dear [Recipient],

I hope this email finds you well. I wanted to follow up on our recent conversation and provide you with the information we discussed.

Based on our discussion, I understand that you're looking for a solution that addresses your specific needs while maintaining the ${answers.tone || 'professional'} approach that works best for your ${answers.audience || 'team'}.

I've prepared a comprehensive overview that outlines:
• Key benefits and features
• Implementation timeline
• Next steps for moving forward

I believe this approach aligns perfectly with your goals of ${answers.goal || 'improving efficiency and collaboration'}.

Would you be available for a brief call this week to discuss the details? I'm confident we can create a solution that exceeds your expectations.

Best regards,
[Your Name]`;
        break;
      case 'document':
        sampleOutput = `# ${answers.goal || 'Project Proposal'}

## Executive Summary

This document outlines a comprehensive approach to ${answers.goal || 'achieving our strategic objectives'} while maintaining a ${answers.tone || 'professional'} standard that resonates with our ${answers.audience || 'stakeholders'}.

## Objectives

- Primary Goal: ${answers.goal || 'Deliver exceptional results'}
- Target Audience: ${answers.audience || 'Key stakeholders and team members'}
- Approach: ${answers.tone || 'Collaborative and results-driven'}

## Key Components

### 1. Strategic Framework
Our approach focuses on delivering measurable outcomes that align with organizational priorities.

### 2. Implementation Plan
A phased approach ensuring smooth execution and continuous improvement.

### 3. Success Metrics
Clear KPIs to track progress and ensure accountability.

## Conclusion

This proposal represents a strategic opportunity to ${answers.goal || 'drive meaningful change'} while maintaining the highest standards of quality and professionalism.`;
        break;
      default:
        sampleOutput = `# ${taskInfo?.title || 'Generated Content'}

## Overview

Based on your requirements, I've created content that aims to ${answers.goal || 'meet your specific objectives'} while maintaining a ${answers.tone || 'appropriate'} tone for your ${answers.audience || 'intended audience'}.

## Key Points

• Tailored specifically for your ${answers.audience || 'target audience'}
• Maintains a ${answers.tone || 'professional'} tone throughout
• Focuses on achieving your goal of ${answers.goal || 'delivering value'}

## Content

${userPrompt}

This content has been optimized to resonate with your audience while achieving your stated objectives. The tone and style have been carefully crafted to ensure maximum impact and engagement.

## Next Steps

Feel free to modify, expand, or adapt this content to better suit your specific needs. You can also use the chat feature to request adjustments or ask questions about the generated content.`;
    }
    
    setGeneratedOutput(sampleOutput);
    setIsGeneratingFinal(false);
    setShowFinalOutput(true);
    
    // Add initial AI message to chat
    setChatHistory([{
      id: 1,
      message: "I've generated your content! Feel free to ask me to modify anything or explain my approach. What would you like to adjust?",
      sender: 'ai',
      timestamp: new Date()
    }]);
  };

  const handleSendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      id: chatHistory.length + 1,
      message: chatMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, newMessage]);
    setChatMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatHistory.length + 2,
        message: "I understand your request. Let me help you with that modification. Would you like me to adjust the tone, add more details, or change the structure?",
        sender: 'ai' as const,
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleAnswerChange = (field: string, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const getSelectedTaskInfo = () => {
    return tasks.find(task => task.id === selectedTask);
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setSelectedTask(null);
    setUserPrompt('');
    setShowQuestions(false);
    setShowFinalOutput(false);
    setAnswers({ goal: '', audience: '', tone: '' });
    setChatHistory([]);
    setGeneratedOutput('');
  };

  const handleCopyOutput = async () => {
    try {
      await navigator.clipboard.writeText(generatedOutput);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownloadOutput = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedOutput], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${getSelectedTaskInfo()?.title || 'content'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExportOutput = () => {
    // This would integrate with external services like Google Docs, etc.
    console.log('Export to external service');
  };

  const handleSavePrompt = () => {
    setShowSaveModal(true);
    
    // Generate default name
    const taskInfo = getSelectedTaskInfo();
    const summary = userPrompt.slice(0, 30).replace(/\s+/g, ' ').trim();
    const date = new Date().toISOString().split('T')[0];
    const defaultName = `${taskInfo?.title || 'Prompt'}-${summary}-${date}`;
    setPromptName(defaultName);
  };

  const handleConfirmSave = () => {
    const newPrompt: SavedPrompt = {
      id: Date.now().toString(),
      name: promptName,
      taskType: selectedTask || 'general',
      originalPrompt: userPrompt,
      answers: answers,
      generatedOutput: generatedOutput,
      createdAt: new Date(),
      rating: 0,
      tags: []
    };
    
    setSavedPrompts(prev => [newPrompt, ...prev]);
    setShowSaveModal(false);
    setPromptName('');
    
    // Update onboarding
    setOnboardingChecklist(prev => ({ ...prev, savePrompt: true }));
  };

  const handleNavigationClick = (itemId: string) => {
    setActiveView(itemId);
    if (itemId === 'create') {
      resetWizard();
    }
  };

  const handleRunPrompt = (prompt: SavedPrompt) => {
    // Load the saved prompt data
    setSelectedTask(prompt.taskType);
    setUserPrompt(prompt.originalPrompt);
    setAnswers(prompt.answers);
    setGeneratedOutput(prompt.generatedOutput);
    
    // Set the view to create mode and show final output
    setActiveView('create');
    setCurrentStep(3);
    setShowQuestions(true);
    setShowFinalOutput(true);
    
    // Update last used
    setSavedPrompts(prev => 
      prev.map(p => 
        p.id === prompt.id 
          ? { ...p, lastUsed: new Date() }
          : p
      )
    );
    
    // Add initial AI message to chat
    setChatHistory([{
      id: 1,
      message: "I've loaded your saved prompt! The content has been regenerated. Feel free to ask me to modify anything or make improvements.",
      sender: 'ai',
      timestamp: new Date()
    }]);
  };

  const handleEditPrompt = (prompt: SavedPrompt) => {
    // Load the saved prompt data for editing
    setSelectedTask(prompt.taskType);
    setUserPrompt(prompt.originalPrompt);
    setAnswers(prompt.answers);
    
    // Set the view to create mode and show questions step
    setActiveView('create');
    setCurrentStep(3);
    setShowQuestions(true);
    setShowFinalOutput(false);
    
    // Clear any existing output and chat
    setGeneratedOutput('');
    setChatHistory([]);
  };

  const getTaskIcon = (taskType: string) => {
    const task = tasks.find(t => t.id === taskType);
    return task?.icon || <FileText className="w-5 h-5" />;
  };

  const getTaskColor = (taskType: string) => {
    const task = tasks.find(t => t.id === taskType);
    return task?.color || 'from-gray-500 to-gray-600';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths}mo ago`;
  };

  const filteredPrompts = savedPrompts.filter(prompt => {
    // Search filter
    const matchesSearch = prompt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.originalPrompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Task type filter
    const matchesTaskType = selectedFilter === 'all' || prompt.taskType === selectedFilter;
    
    // Time filter
    let matchesTime = true;
    if (timeFilter !== 'all') {
      const now = new Date();
      const promptDate = prompt.createdAt;
      const diffInHours = (now.getTime() - promptDate.getTime()) / (1000 * 60 * 60);
      
      switch (timeFilter) {
        case '24h':
          matchesTime = diffInHours <= 24;
          break;
        case '7d':
          matchesTime = diffInHours <= 24 * 7;
          break;
        case '30d':
          matchesTime = diffInHours <= 24 * 30;
          break;
        case '90d':
          matchesTime = diffInHours <= 24 * 90;
          break;
      }
    }
    
    return matchesSearch && matchesTaskType && matchesTime;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'} flex flex-col flex-shrink-0`}>
        {/* Logo and Collapse Button */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!sidebarCollapsed ? (
            <div className="flex items-center space-x-2">
              <img 
                src="/Dorp_logo_v1 (1)-Photoroom.png" 
                alt="Dorp AI Logo" 
                className="w-8 h-8 flex-shrink-0"
              />
              <span className="text-xl font-bold text-gray-900">Dorp AI</span>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <img 
                src="/Dorp_logo_v1 (1)-Photoroom.png" 
                alt="Dorp AI Logo" 
                className="w-10 h-10"
              />
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${sidebarCollapsed ? 'absolute right-2' : ''}`}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigationClick(item.id)}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-3 rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : item.isUpgrade
                      ? 'text-purple-600 hover:bg-purple-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <div className={`${sidebarCollapsed ? 'w-6 h-6' : ''}`}>
                    {item.icon}
                  </div>
                  {!sidebarCollapsed && (
                    <>
                      <span className="font-medium">{item.label}</span>
                      {item.isPro && (
                        <span className="ml-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                          Pro
                        </span>
                      )}
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Usage Meter and Profile */}
        <div className="p-4 border-t border-gray-200 space-y-4">
          {/* Usage Meter */}
          {!sidebarCollapsed && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Prompts Used</span>
                <span className="text-sm text-gray-500">12/50</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">38 prompts remaining this month</p>
            </div>
          )}

          {/* User Profile */}
          <div className={`flex items-center ${sidebarCollapsed ? 'flex-col space-y-2' : 'space-x-3'}`}>
            <div className={`${sidebarCollapsed ? 'w-10 h-10' : 'w-8 h-8'} bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0`}>
              <User className={`${sidebarCollapsed ? 'w-5 h-5' : 'w-4 h-4'} text-white`} />
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500">Free Plan</p>
              </div>
            )}
            <button
              onClick={onLogout}
              className={`p-2 text-gray-400 hover:text-gray-600 transition-colors ${sidebarCollapsed ? 'w-full flex justify-center' : ''}`}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeView === 'create' ? 'Prompt Studio' : 'My Prompts'}
              </h1>
              <p className="text-gray-600">
                {activeView === 'create' 
                  ? 'Create your perfect prompt in three simple steps'
                  : 'Manage and reuse your saved prompts'
                }
              </p>
            </div>
            
            {/* Onboarding Checklist */}
            {showOnboarding && activeView === 'create' && (
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Getting Started</h3>
                  <button
                    onClick={() => setShowOnboarding(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600 line-through">Sign Up</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    {onboardingChecklist.createPrompt ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                    )}
                    <span className={`text-sm ${onboardingChecklist.createPrompt ? 'text-gray-600 line-through' : 'text-gray-900 font-medium'}`}>
                      Create Your First Prompt
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    {onboardingChecklist.savePrompt ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                    )}
                    <span className={`text-sm ${onboardingChecklist.savePrompt ? 'text-gray-600 line-through' : 'text-gray-600'}`}>
                      Save a Prompt
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    {onboardingChecklist.ratePrompt ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                    )}
                    <span className={`text-sm ${onboardingChecklist.ratePrompt ? 'text-gray-600 line-through' : 'text-gray-600'}`}>
                      Rate a Prompt's Quality
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto h-full">
            {activeView === 'create' ? (
              <>
                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    {[1, 2, 3].map((step) => (
                      <React.Fragment key={step}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                          currentStep >= step 
                            ? 'bg-blue-500 border-blue-500 text-white' 
                            : 'border-gray-300 text-gray-400'
                        }`}>
                          {step}
                        </div>
                        {step < 3 && (
                          <div className={`w-12 h-0.5 ${
                            currentStep > step ? 'bg-blue-500' : 'bg-gray-300'
                          }`}></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Step Content */}
                {!showFinalOutput ? (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Step 1: Select Task */}
                    {currentStep === 1 && (
                      <div>
                        <div className="text-center mb-8">
                          <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your Task</h2>
                          <p className="text-gray-600">Choose what you'd like to create today</p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {tasks.map((task) => (
                            <button
                              key={task.id}
                              onClick={() => handleTaskSelect(task.id)}
                              className={`bg-gradient-to-r ${task.color} text-white p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group`}
                            >
                              <div className="flex flex-col items-center text-center">
                                <div className="mb-3 group-hover:scale-110 transition-transform">
                                  {task.icon}
                                </div>
                                <h3 className="font-semibold mb-2">{task.title}</h3>
                                <p className="text-xs opacity-90">{task.description}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 2: Enter Instruction */}
                    {currentStep === 2 && selectedTask && (
                      <div>
                        <div className="text-center mb-8">
                          <div className="flex items-center justify-center mb-4">
                            <div className={`bg-gradient-to-r ${getSelectedTaskInfo()?.color} p-3 rounded-lg text-white mr-4`}>
                              {getSelectedTaskInfo()?.icon}
                            </div>
                            <div className="text-left">
                              <h2 className="text-3xl font-bold text-gray-900">{getSelectedTaskInfo()?.title}</h2>
                              <p className="text-gray-600">{getSelectedTaskInfo()?.description}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <label className="block text-lg font-semibold text-gray-900 mb-3">
                              What would you like to create?
                            </label>
                            <textarea
                              value={userPrompt}
                              onChange={(e) => setUserPrompt(e.target.value)}
                              placeholder="Describe what you want to create. Be as specific or general as you'd like - our AI will ask follow-up questions to get the details right."
                              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-lg"
                            />
                            <div className="flex justify-between items-center mt-2">
                              <p className="text-sm text-gray-500">
                                {userPrompt.length}/500 characters
                              </p>
                              <button
                                onClick={resetWizard}
                                className="text-sm text-gray-500 hover:text-gray-700 underline"
                              >
                                Start Over
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={handleGenerateOutput}
                            disabled={!userPrompt.trim() || isGenerating}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                          >
                            {isGenerating ? (
                              <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Generating Questions...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-5 h-5 mr-2" />
                                Generate Output
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Answer Questions */}
                    {currentStep === 3 && showQuestions && (
                      <div>
                        <div className="text-center mb-8">
                          <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect Your Output</h2>
                          <p className="text-gray-600">Answer these questions to get exactly what you need</p>
                        </div>

                        <div className="space-y-6">
                          {/* Goal Question */}
                          <div className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                              <Target className="w-6 h-6 text-blue-500 mr-3" />
                              <label className="text-lg font-semibold text-gray-900">
                                💭 What's the goal?
                              </label>
                            </div>
                            <textarea
                              value={answers.goal}
                              onChange={(e) => handleAnswerChange('goal', e.target.value)}
                              placeholder="What do you want to achieve with this content? (e.g., persuade, inform, entertain)"
                              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                              maxLength={500}
                            />
                            <p className="text-sm text-gray-500 mt-1">{answers.goal.length}/500 words</p>
                          </div>

                          {/* Audience Question */}
                          <div className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                              <Users className="w-6 h-6 text-green-500 mr-3" />
                              <label className="text-lg font-semibold text-gray-900">
                                🎯 Who's the audience?
                              </label>
                            </div>
                            <textarea
                              value={answers.audience}
                              onChange={(e) => handleAnswerChange('audience', e.target.value)}
                              placeholder="Who will be reading this? (e.g., colleagues, customers, friends, specific demographics)"
                              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                              maxLength={500}
                            />
                            <p className="text-sm text-gray-500 mt-1">{answers.audience.length}/500 words</p>
                          </div>

                          {/* Tone Question */}
                          <div className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                              <Palette className="w-6 h-6 text-purple-500 mr-3" />
                              <label className="text-lg font-semibold text-gray-900">
                                📝 What's the tone?
                              </label>
                            </div>
                            <textarea
                              value={answers.tone}
                              onChange={(e) => handleAnswerChange('tone', e.target.value)}
                              placeholder="How should this sound? (e.g., professional, casual, friendly, authoritative, humorous)"
                              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                              maxLength={500}
                            />
                            <p className="text-sm text-gray-500 mt-1">{answers.tone.length}/500 words</p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-4">
                            <button
                              onClick={resetWizard}
                              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
                            >
                              Start Over
                            </button>
                            <button
                              onClick={handleGenerateFinalOutput}
                              disabled={isGeneratingFinal}
                              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                            >
                              {isGeneratingFinal ? (
                                <>
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                  Generating Final Output...
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-5 h-5 mr-2" />
                                  Generate Final Output
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Final Output Split View */
                  <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
                    {/* Left Panel - Task Summary and Chat */}
                    <div className="bg-white rounded-2xl shadow-lg flex flex-col">
                      {/* Task Summary Header */}
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className={`bg-gradient-to-r ${getSelectedTaskInfo()?.color} p-3 rounded-lg text-white mr-4`}>
                              {getSelectedTaskInfo()?.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{getSelectedTaskInfo()?.title}</h3>
                              <p className="text-gray-600">Your prompt session</p>
                            </div>
                          </div>
                          
                          {/* Save Button */}
                          <button
                            onClick={handleSavePrompt}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Save this prompt"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                        </div>
                        
                        {/* Task Details */}
                        <div className="space-y-3">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <h4 className="font-semibold text-gray-900 mb-1">Original Request:</h4>
                            <p className="text-sm text-gray-700">{userPrompt}</p>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-2">
                            {answers.goal && (
                              <div className="bg-blue-50 rounded-lg p-2">
                                <span className="text-xs font-semibold text-blue-700">Goal:</span>
                                <p className="text-xs text-blue-600">{answers.goal}</p>
                              </div>
                            )}
                            {answers.audience && (
                              <div className="bg-green-50 rounded-lg p-2">
                                <span className="text-xs font-semibold text-green-700">Audience:</span>
                                <p className="text-xs text-green-600">{answers.audience}</p>
                              </div>
                            )}
                            {answers.tone && (
                              <div className="bg-purple-50 rounded-lg p-2">
                                <span className="text-xs font-semibold text-purple-700">Tone:</span>
                                <p className="text-xs text-purple-600">{answers.tone}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Chat Section */}
                      <div className="flex-1 flex flex-col">
                        <div className="p-4 border-b border-gray-200">
                          <h4 className="font-semibold text-gray-900">Chat with AI</h4>
                          <p className="text-sm text-gray-600">Ask questions or request modifications</p>
                        </div>
                        
                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                          {chatHistory.map((message) => (
                            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.sender === 'user' 
                                  ? 'bg-blue-500 text-white' 
                                  : 'bg-gray-100 text-gray-900'
                              }`}>
                                <p className="text-sm">{message.message}</p>
                                <p className={`text-xs mt-1 ${
                                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                  {message.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Chat Input */}
                        <div className="p-4 border-t border-gray-200">
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={chatMessage}
                              onChange={(e) => setChatMessage(e.target.value)}
                              placeholder="Ask for modifications or improvements..."
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              onKeyPress={(e) => e.key === 'Enter' && handleSendChatMessage()}
                            />
                            <button
                              onClick={handleSendChatMessage}
                              disabled={!chatMessage.trim()}
                              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel - Generated Output */}
                    <div className="bg-white rounded-2xl shadow-lg flex flex-col">
                      {/* Output Header */}
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">Generated Output</h3>
                            <p className="text-gray-600">Your polished content is ready</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {/* Regenerate logic */}}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                              title="Regenerate"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {/* Edit logic */}}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <button
                            onClick={handleCopyOutput}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
                              copySuccess 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            }`}
                          >
                            {copySuccess ? (
                              <>
                                <Check className="w-4 h-4 mr-1" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 mr-1" />
                                Copy
                              </>
                            )}
                          </button>
                          <button
                            onClick={handleDownloadOutput}
                            className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors flex items-center justify-center"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </button>
                          <button
                            onClick={handleExportOutput}
                            className="flex-1 bg-purple-100 text-purple-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors flex items-center justify-center"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Export
                          </button>
                        </div>
                      </div>

                      {/* Output Content */}
                      <div className="flex-1 overflow-y-auto p-6">
                        <div className="prose prose-sm max-w-none">
                          <pre className="whitespace-pre-wrap font-sans text-gray-900 leading-relaxed">
                            {generatedOutput}
                          </pre>
                        </div>
                      </div>

                      {/* Rating Section */}
                      <div className="p-6 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">Rate this output</h4>
                            <p className="text-sm text-gray-600">Help us improve our AI</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setOnboardingChecklist(prev => ({ ...prev, ratePrompt: true }));
                              }}
                              className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                              title="Good output"
                            >
                              <ThumbsUp className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setOnboardingChecklist(prev => ({ ...prev, ratePrompt: true }));
                              }}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="Needs improvement"
                            >
                              <ThumbsDown className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Start Over Button for Final Output */}
                {showFinalOutput && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={resetWizard}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
                    >
                      Create Another Prompt
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* My Prompts View */
              <div className="space-y-6">
                {/* Search and Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search prompts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    {/* Filters */}
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                      <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="p-3 border-r border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="all">All Tasks</option>
                        <option value="email">Email</option>
                        <option value="document">Document</option>
                        <option value="creative">Creative</option>
                        <option value="content">Content</option>
                        <option value="code">Code</option>
                        <option value="business">Business</option>
                      </select>
                      
                      <select
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                        className="p-3 border-r border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="all">All Time</option>
                        <option value="24h">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="90d">Last 90 Days</option>
                      </select>
                      
                      <button
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                        className="p-3 transition-colors bg-blue-500 text-white"
                        title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
                      >
                        {viewMode === 'grid' ? (
                          <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                            <div className="bg-white rounded-sm"></div>
                            <div className="bg-white rounded-sm"></div>
                            <div className="bg-white rounded-sm"></div>
                            <div className="bg-white rounded-sm"></div>
                          </div>
                        ) : (
                          <div className="w-5 h-5 flex flex-col gap-1">
                            <div className="h-1 bg-white rounded"></div>
                            <div className="h-1 bg-white rounded"></div>
                            <div className="h-1 bg-white rounded"></div>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Prompts Grid/List */}
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                  {filteredPrompts.map((prompt) => (
                    <div key={prompt.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                      {/* Header */}
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <div className={`bg-gradient-to-r ${getTaskColor(prompt.taskType)} p-2 rounded-lg text-white flex-shrink-0`}>
                              {getTaskIcon(prompt.taskType)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-gray-900 truncate" title={prompt.name}>
                                {prompt.name}
                              </h3>
                              <p className="text-sm text-gray-500">{formatTimeAgo(prompt.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <p className="text-sm text-gray-700 mb-3 line-clamp-3 overflow-hidden">
                          {prompt.originalPrompt}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {prompt.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {prompt.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{prompt.tags.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Rating and Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            {renderStars(prompt.rating)}
                            <span className="text-sm text-gray-500 ml-2">
                              {prompt.lastUsed ? `Used ${formatTimeAgo(prompt.lastUsed)}` : 'Never used'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="p-4 border-t border-gray-200 flex space-x-2">
                        <button
                          onClick={() => handleRunPrompt(prompt)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Run
                        </button>
                        <button
                          onClick={() => handleEditPrompt(prompt)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {filteredPrompts.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <History className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No prompts found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchQuery || selectedFilter !== 'all' || timeFilter !== 'all'
                        ? 'Try adjusting your search or filters'
                        : 'Create your first prompt to get started'
                      }
                    </p>
                    <button
                      onClick={() => setActiveView('create')}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Create Your First Prompt
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>&copy; 2025 Dorp AI. All rights reserved.</span>
              <a href="#" className="hover:text-gray-700">Privacy</a>
              <a href="#" className="hover:text-gray-700">Terms</a>
            </div>
            <div className="flex items-center space-x-2">
              <span>Need help?</span>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Contact Support</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Save Prompt</h3>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Save className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-semibold text-blue-900">Save for Future Use</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Saved prompts can be reused and are available in the "My Prompts" section. 
                    You can run them again or edit them anytime.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prompt Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={promptName}
                    onChange={(e) => setPromptName(e.target.value)}
                    placeholder="Enter a custom name or use the default"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Default format: TaskType-summary-date
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowSaveModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmSave}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300"
                  >
                    Save Prompt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;