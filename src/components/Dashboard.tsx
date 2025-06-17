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
  Search,
  Filter,
  Star,
  Calendar,
  Trash2,
  Save,
  Edit,
  Play,
  Menu
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

interface SavedPrompt {
  id: string;
  title: string;
  description: string;
  task: string;
  taskIcon: React.ReactNode;
  taskColor: string;
  originalPrompt: string;
  goal: string;
  audience: string;
  tone: string;
  tags: string[];
  rating: number;
  lastUsed: Date;
  createdAt: Date;
  isStarred: boolean;
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
  const [currentView, setCurrentView] = useState<'create' | 'history'>('create');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promptToDelete, setPromptToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaskFilter, setSelectedTaskFilter] = useState<string>('all');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('all');
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [answers, setAnswers] = useState({
    goal: '',
    audience: '',
    tone: ''
  });

  // Onboarding checklist state
  const [onboardingChecklist, setOnboardingChecklist] = useState({
    signUp: true,
    createPrompt: false,
    savePrompt: false,
    ratePrompt: false
  });

  // Sample saved prompts data
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([
    {
      id: '1',
      title: 'Email-Follow up meeting',
      description: 'Write a follow-up email after our product demo meeting',
      task: 'email',
      taskIcon: <Mail className="w-4 h-4" />,
      taskColor: 'from-blue-500 to-blue-600',
      originalPrompt: 'Write a follow-up email after our product demo meeting',
      goal: 'Follow up on meeting and next steps',
      audience: 'Enterprise clients',
      tone: 'Professional',
      tags: ['follow-up', 'enterprise', 'demo'],
      rating: 5,
      lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isStarred: true
    },
    {
      id: '2',
      title: 'Content-Blog post about AI trends',
      description: 'Create a blog post about emerging AI trends in 2025',
      task: 'content',
      taskIcon: <PenTool className="w-4 h-4" />,
      taskColor: 'from-pink-500 to-pink-600',
      originalPrompt: 'Create a blog post about emerging AI trends in 2025',
      goal: 'Educate readers about AI developments',
      audience: 'Tech enthusiasts and professionals',
      tone: 'Informative and engaging',
      tags: ['AI', 'trends', 'blog', '+1'],
      rating: 3,
      lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isStarred: false
    },
    {
      id: '3',
      title: 'Master Prompt-Creative writing assistant',
      description: 'Create a master prompt for generating creative story ideas',
      task: 'creative',
      taskIcon: <Lightbulb className="w-4 h-4" />,
      taskColor: 'from-green-500 to-green-600',
      originalPrompt: 'Create a master prompt for generating creative story ideas',
      goal: 'Generate unique and engaging story concepts',
      audience: 'Writers and content creators',
      tone: 'Inspiring and creative',
      tags: ['creative', 'writing', 'master-prompt'],
      rating: 5,
      lastUsed: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isStarred: true
    },
    {
      id: '4',
      title: 'Business-Quarterly review presentation',
      description: 'Create an outline for Q4 business review presentation',
      task: 'business',
      taskIcon: <Briefcase className="w-4 h-4" />,
      taskColor: 'from-red-500 to-red-600',
      originalPrompt: 'Create an outline for Q4 business review presentation',
      goal: 'Present quarterly performance and goals',
      audience: 'Executive team and stakeholders',
      tone: 'Professional and data-driven',
      tags: ['business', 'quarterly', 'presentation'],
      rating: 4,
      lastUsed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      isStarred: false
    },
    {
      id: '5',
      title: 'Code-React component documentation',
      description: 'Generate documentation for a React component library',
      task: 'code',
      taskIcon: <Code className="w-4 h-4" />,
      taskColor: 'from-indigo-500 to-indigo-600',
      originalPrompt: 'Generate documentation for a React component library',
      goal: 'Create comprehensive developer documentation',
      audience: 'Frontend developers',
      tone: 'Technical and clear',
      tags: ['code', 'react', 'documentation'],
      rating: 5,
      lastUsed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      isStarred: true
    }
  ]);

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
    { id: 'create', icon: <Plus className="w-6 h-6" />, label: 'Create Prompt', active: currentView === 'create' },
    { id: 'history', icon: <History className="w-6 h-6" />, label: 'My Prompts', active: currentView === 'history' },
    { id: 'marketplace', icon: <Store className="w-6 h-6" />, label: 'Marketplace', isPro: true },
    { id: 'analytics', icon: <BarChart3 className="w-6 h-6" />, label: 'Analytics', isPro: true },
    { id: 'upgrade', icon: <Crown className="w-6 h-6" />, label: 'Upgrade', isUpgrade: true }
  ];

  // Mobile breakpoint detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    setIsEditMode(false);
    setEditingPromptId(null);
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(generatedOutput);
    // You could add a toast notification here
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

  const handleNavigationClick = (itemId: string) => {
    if (itemId === 'create') {
      setCurrentView('create');
      resetWizard();
    } else if (itemId === 'history') {
      setCurrentView('history');
    }
    setIsMobileMenuOpen(false);
  };

  const handleDeletePrompt = (promptId: string) => {
    setPromptToDelete(promptId);
    setShowDeleteModal(true);
  };

  const confirmDeletePrompt = () => {
    if (promptToDelete) {
      setSavedPrompts(prev => prev.filter(p => p.id !== promptToDelete));
      setPromptToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleStarPrompt = (promptId: string) => {
    setSavedPrompts(prev => 
      prev.map(p => 
        p.id === promptId ? { ...p, isStarred: !p.isStarred } : p
      )
    );
  };

  const handleEditPrompt = (prompt: SavedPrompt) => {
    // Set up edit mode
    setIsEditMode(true);
    setEditingPromptId(prompt.id);
    setSelectedTask(prompt.task);
    setUserPrompt(prompt.originalPrompt);
    setAnswers({
      goal: prompt.goal,
      audience: prompt.audience,
      tone: prompt.tone
    });
    setCurrentStep(3);
    setShowQuestions(true);
    setCurrentView('create');
    setIsMobileMenuOpen(false);
  };

  const handleRunPrompt = (prompt: SavedPrompt) => {
    // Set up the prompt and go directly to final output
    setSelectedTask(prompt.task);
    setUserPrompt(prompt.originalPrompt);
    setAnswers({
      goal: prompt.goal,
      audience: prompt.audience,
      tone: prompt.tone
    });
    
    // Update last used time
    setSavedPrompts(prev => 
      prev.map(p => 
        p.id === prompt.id ? { ...p, lastUsed: new Date() } : p
      )
    );
    
    // Generate output directly
    handleGenerateFinalOutput();
    setCurrentView('create');
    setIsMobileMenuOpen(false);
  };

  const handleSavePrompt = () => {
    if (!selectedTask || !userPrompt.trim()) return;

    const taskInfo = getSelectedTaskInfo();
    if (!taskInfo) return;

    const newPrompt: SavedPrompt = {
      id: Date.now().toString(),
      title: `${taskInfo.title}-${userPrompt.slice(0, 20)}`,
      description: userPrompt,
      task: selectedTask,
      taskIcon: taskInfo.icon,
      taskColor: taskInfo.color,
      originalPrompt: userPrompt,
      goal: answers.goal,
      audience: answers.audience,
      tone: answers.tone,
      tags: [],
      rating: 0,
      lastUsed: new Date(),
      createdAt: new Date(),
      isStarred: false
    };

    setSavedPrompts(prev => [newPrompt, ...prev]);
    setOnboardingChecklist(prev => ({ ...prev, savePrompt: true }));
  };

  // Filter prompts based on search and filters
  const filteredPrompts = savedPrompts.filter(prompt => {
    // Search filter
    if (searchQuery && !prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }

    // Task filter
    if (selectedTaskFilter !== 'all' && prompt.task !== selectedTaskFilter) {
      return false;
    }

    // Starred filter
    if (showStarredOnly && !prompt.isStarred) {
      return false;
    }

    // Time filter
    if (selectedTimeFilter !== 'all') {
      const now = new Date();
      const promptDate = prompt.lastUsed;
      const diffInHours = (now.getTime() - promptDate.getTime()) / (1000 * 60 * 60);
      
      switch (selectedTimeFilter) {
        case '24h':
          return diffInHours <= 24;
        case '7d':
          return diffInHours <= 24 * 7;
        case '30d':
          return diffInHours <= 24 * 30;
        case '90d':
          return diffInHours <= 24 * 90;
        default:
          return true;
      }
    }

    return true;
  });

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / (24 * 60))}d ago`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Sidebar Navigation */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isMobile 
          ? `fixed inset-y-0 left-0 z-50 ${sidebarCollapsed ? '-translate-x-full' : 'translate-x-0'} w-64`
          : sidebarCollapsed ? 'w-20' : 'w-64'
      } flex flex-col`}>
        {/* Logo and Collapse Button */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!sidebarCollapsed || isMobile ? (
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
            className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${sidebarCollapsed && !isMobile ? 'absolute right-2' : ''}`}
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
                  className={`w-full flex items-center ${sidebarCollapsed && !isMobile ? 'justify-center' : 'space-x-3'} px-3 py-3 rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : item.isUpgrade
                      ? 'text-purple-600 hover:bg-purple-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  title={(sidebarCollapsed && !isMobile) ? item.label : undefined}
                >
                  <div className={`${(sidebarCollapsed && !isMobile) ? 'w-6 h-6' : ''}`}>
                    {item.icon}
                  </div>
                  {(!sidebarCollapsed || isMobile) && (
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
          {(!sidebarCollapsed || isMobile) && (
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
          <div className={`flex items-center ${(sidebarCollapsed && !isMobile) ? 'flex-col space-y-2' : 'space-x-3'}`}>
            <div className={`${(sidebarCollapsed && !isMobile) ? 'w-10 h-10' : 'w-8 h-8'} bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0`}>
              <User className={`${(sidebarCollapsed && !isMobile) ? 'w-5 h-5' : 'w-4 h-4'} text-white`} />
            </div>
            {(!sidebarCollapsed || isMobile) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500">Free Plan</p>
              </div>
            )}
            <button
              onClick={onLogout}
              className={`p-2 text-gray-400 hover:text-gray-600 transition-colors ${(sidebarCollapsed && !isMobile) ? 'w-full flex justify-center' : ''}`}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              {isMobile && (
                <button
                  onClick={() => setSidebarCollapsed(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
              )}
              
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {currentView === 'create' ? 'Prompt Studio' : 'My Prompts'}
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  {currentView === 'create' 
                    ? 'Create your perfect prompt in three simple steps' 
                    : 'Manage and reuse your saved prompts'
                  }
                </p>
              </div>
            </div>
            
            {/* Onboarding Checklist - Hidden on mobile */}
            {showOnboarding && !isMobile && (
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
                    <span className={`text-sm ${onboardingChecklist.savePrompt ? 'text-gray-600 line-through' : 'text-gray-900 font-medium'}`}>
                      Save a Prompt
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    {onboardingChecklist.ratePrompt ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                    )}
                    <span className={`text-sm ${onboardingChecklist.ratePrompt ? 'text-gray-600 line-through' : 'text-gray-900 font-medium'}`}>
                      Rate a Prompt's Quality
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {currentView === 'create' ? (
            <div className="max-w-6xl mx-auto">
              {/* Step Indicator */}
              <div className="flex items-center justify-center mb-6 sm:mb-8">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  {[1, 2, 3].map((step) => (
                    <React.Fragment key={step}>
                      <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 ${
                        currentStep >= step 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : 'border-gray-300 text-gray-400'
                      }`}>
                        <span className="text-sm sm:text-base">{step}</span>
                      </div>
                      {step < 3 && (
                        <div className={`w-8 sm:w-12 h-0.5 ${
                          currentStep > step ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              {!showFinalOutput ? (
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
                  {/* Step 1: Select Task */}
                  {currentStep === 1 && (
                    <div>
                      <div className="text-center mb-6 sm:mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Select Your Task</h2>
                        <p className="text-gray-600">Choose what you'd like to create today</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {tasks.map((task) => (
                          <button
                            key={task.id}
                            onClick={() => handleTaskSelect(task.id)}
                            className={`bg-gradient-to-r ${task.color} text-white p-4 sm:p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <div className="mb-3 group-hover:scale-110 transition-transform">
                                {task.icon}
                              </div>
                              <h3 className="font-semibold mb-2 text-sm sm:text-base">{task.title}</h3>
                              <p className="text-xs opacity-90 hidden sm:block">{task.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Enter Instruction */}
                  {currentStep === 2 && selectedTask && (
                    <div>
                      <div className="text-center mb-6 sm:mb-8">
                        <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
                          <div className={`bg-gradient-to-r ${getSelectedTaskInfo()?.color} p-3 rounded-lg text-white mr-0 sm:mr-4 mb-4 sm:mb-0`}>
                            {getSelectedTaskInfo()?.icon}
                          </div>
                          <div className="text-center sm:text-left">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{getSelectedTaskInfo()?.title}</h2>
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
                            className="w-full h-24 sm:h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base sm:text-lg"
                            maxLength={500}
                          />
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 space-y-2 sm:space-y-0">
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
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 sm:py-4 px-6 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
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
                      <div className="text-center mb-6 sm:mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                          {isEditMode ? 'Edit Your Prompt' : 'Perfect Your Output'}
                        </h2>
                        <p className="text-gray-600">
                          {isEditMode ? 'Make changes to any section and regenerate' : 'Answer these questions to get exactly what you need'}
                        </p>
                      </div>

                      <div className="space-y-6">
                        {/* Original Instruction Section (Edit Mode Only) */}
                        {isEditMode && (
                          <div className="bg-blue-50 rounded-lg p-4 sm:p-6 border border-blue-200">
                            <div className="flex items-center mb-4">
                              <div className={`bg-gradient-to-r ${getSelectedTaskInfo()?.color} p-3 rounded-lg text-white mr-3`}>
                                {getSelectedTaskInfo()?.icon}
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{getSelectedTaskInfo()?.title}</h3>
                                <p className="text-sm text-gray-600">Original instruction</p>
                              </div>
                            </div>
                            <div>
                              <label className="block text-base font-semibold text-gray-900 mb-3">
                                What would you like to create?
                              </label>
                              <textarea
                                value={userPrompt}
                                onChange={(e) => setUserPrompt(e.target.value)}
                                placeholder="Describe what you want to create..."
                                className="w-full h-20 sm:h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                maxLength={500}
                              />
                              <p className="text-sm text-gray-500 mt-1">{userPrompt.length}/500 characters</p>
                            </div>
                          </div>
                        )}

                        {/* Goal Question */}
                        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                          <div className="flex items-center mb-4">
                            <Target className="w-6 h-6 text-blue-500 mr-3" />
                            <label className="text-base sm:text-lg font-semibold text-gray-900">
                              💭 What's the goal?
                            </label>
                          </div>
                          <textarea
                            value={answers.goal}
                            onChange={(e) => handleAnswerChange('goal', e.target.value)}
                            placeholder="What do you want to achieve with this content? (e.g., persuade, inform, entertain)"
                            className="w-full h-20 sm:h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            maxLength={500}
                          />
                          <p className="text-sm text-gray-500 mt-1">{answers.goal.length}/500 words</p>
                        </div>

                        {/* Audience Question */}
                        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                          <div className="flex items-center mb-4">
                            <Users className="w-6 h-6 text-green-500 mr-3" />
                            <label className="text-base sm:text-lg font-semibold text-gray-900">
                              🎯 Who's the audience?
                            </label>
                          </div>
                          <textarea
                            value={answers.audience}
                            onChange={(e) => handleAnswerChange('audience', e.target.value)}
                            placeholder="Who will be reading this? (e.g., colleagues, customers, friends, specific demographics)"
                            className="w-full h-20 sm:h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            maxLength={500}
                          />
                          <p className="text-sm text-gray-500 mt-1">{answers.audience.length}/500 words</p>
                        </div>

                        {/* Tone Question */}
                        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                          <div className="flex items-center mb-4">
                            <Palette className="w-6 h-6 text-purple-500 mr-3" />
                            <label className="text-base sm:text-lg font-semibold text-gray-900">
                              📝 What's the tone?
                            </label>
                          </div>
                          <textarea
                            value={answers.tone}
                            onChange={(e) => handleAnswerChange('tone', e.target.value)}
                            placeholder="How should this sound? (e.g., professional, casual, friendly, authoritative, humorous)"
                            className="w-full h-20 sm:h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            maxLength={500}
                          />
                          <p className="text-sm text-gray-500 mt-1">{answers.tone.length}/500 words</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
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
                                {isEditMode ? 'Regenerating...' : 'Generating Final Output...'}
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-5 h-5 mr-2" />
                                {isEditMode ? 'Regenerate Output' : 'Generate Final Output'}
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 h-auto lg:h-[calc(100vh-200px)]">
                  {/* Left Panel - Task Summary and Chat */}
                  <div className="bg-white rounded-2xl shadow-lg flex flex-col order-2 lg:order-1">
                    {/* Task Summary Header */}
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                      <div className="flex items-center mb-4">
                        <div className={`bg-gradient-to-r ${getSelectedTaskInfo()?.color} p-3 rounded-lg text-white mr-4`}>
                          {getSelectedTaskInfo()?.icon}
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{getSelectedTaskInfo()?.title}</h3>
                          <p className="text-gray-600">Your prompt session</p>
                        </div>
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
                    <div className="flex-1 flex flex-col min-h-0">
                      <div className="p-4 border-b border-gray-200">
                        <h4 className="font-semibold text-gray-900">Chat with AI</h4>
                        <p className="text-sm text-gray-600">Ask questions or request modifications</p>
                      </div>
                      
                      {/* Chat Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[300px] lg:max-h-none">
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
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                  <div className="bg-white rounded-2xl shadow-lg flex flex-col order-1 lg:order-2">
                    {/* Output Header */}
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Generated Output</h3>
                          <p className="text-gray-600">Your polished content is ready</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleSavePrompt}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Save Prompt"
                          >
                            <Save className="w-4 h-4" />
                          </button>
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
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={handleCopyOutput}
                          className="bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors flex items-center justify-center"
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </button>
                        <button
                          onClick={handleDownloadOutput}
                          className="bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors flex items-center justify-center"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                        <button
                          onClick={handleExportOutput}
                          className="bg-purple-100 text-purple-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors flex items-center justify-center"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Export
                        </button>
                      </div>
                    </div>

                    {/* Output Content */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-[300px]">
                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-gray-900 leading-relaxed text-sm">
                          {generatedOutput}
                        </pre>
                      </div>
                    </div>

                    {/* Rating Section */}
                    <div className="p-4 sm:p-6 border-t border-gray-200">
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
            </div>
          ) : (
            /* My Prompts View */
            <div className="max-w-7xl mx-auto">
              {/* Search and Filters */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search prompts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    {/* Task Filter */}
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        value={selectedTaskFilter}
                        onChange={(e) => setSelectedTaskFilter(e.target.value)}
                        className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[120px]"
                      >
                        <option value="all">All Tasks</option>
                        {tasks.map(task => (
                          <option key={task.id} value={task.id}>{task.title}</option>
                        ))}
                      </select>
                    </div>

                    {/* Time Filter */}
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        value={selectedTimeFilter}
                        onChange={(e) => setSelectedTimeFilter(e.target.value)}
                        className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[120px]"
                      >
                        <option value="all">All Time</option>
                        <option value="24h">Last 24 hours</option>
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                      </select>
                    </div>

                    {/* Starred Filter */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="starred-filter"
                        checked={showStarredOnly}
                        onChange={(e) => setShowStarredOnly(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="starred-filter" className="text-sm font-medium text-gray-700 flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Starred
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prompts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredPrompts.map((prompt) => (
                  <div key={prompt.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className={`bg-gradient-to-r ${prompt.taskColor} p-2 rounded-lg text-white flex-shrink-0`}>
                          {prompt.taskIcon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{prompt.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-500">{getTimeAgo(prompt.lastUsed)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleStarPrompt(prompt.id)}
                        className={`p-1 rounded transition-colors flex-shrink-0 ${
                          prompt.isStarred 
                            ? 'text-yellow-500 hover:text-yellow-600' 
                            : 'text-gray-300 hover:text-yellow-500'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${prompt.isStarred ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-4 text-sm line-clamp-3">{prompt.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {prompt.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                      {prompt.tags.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{prompt.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < prompt.rating ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">Used {getTimeAgo(prompt.lastUsed)}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRunPrompt(prompt)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Run
                      </button>
                      <button
                        onClick={() => handleEditPrompt(prompt)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePrompt(prompt.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredPrompts.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <History className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No prompts found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery || selectedTaskFilter !== 'all' || selectedTimeFilter !== 'all' || showStarredOnly
                      ? 'Try adjusting your filters or search terms.'
                      : 'Create your first prompt to get started!'
                    }
                  </p>
                  <button
                    onClick={() => handleNavigationClick('create')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Create Your First Prompt
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <span>&copy; 2025 Dorp AI. All rights reserved.</span>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-700">Privacy</a>
                <a href="#" className="hover:text-gray-700">Terms</a>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span>Need help?</span>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Contact Support</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Prompt</h3>
                <p className="text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">
                <strong>Warning:</strong> This prompt will be permanently deleted and cannot be recovered.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeletePrompt}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;