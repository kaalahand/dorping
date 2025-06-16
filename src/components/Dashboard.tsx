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
  Edit3
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
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

  const tasks = [
    {
      id: 'email',
      title: 'Write Email',
      icon: <Mail className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      description: 'Professional emails, follow-ups, and communications'
    },
    {
      id: 'content',
      title: 'Create Content',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      description: 'Blog posts, articles, and marketing content'
    },
    {
      id: 'master-prompts',
      title: 'Create Master Prompts',
      icon: <Lightbulb className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      description: 'Advanced prompts and creative templates'
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
      id: 'social',
      title: 'Social Media',
      icon: <PenTool className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600',
      description: 'Social media posts and engagement content'
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
    { id: 'create', icon: <Plus className="w-6 h-6" />, label: 'Create Prompt', active: true },
    { id: 'history', icon: <History className="w-6 h-6" />, label: 'My Prompts' },
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
      case 'content':
        sampleOutput = `# ${answers.goal || 'Engaging Content Strategy'}

## Introduction

Creating compelling content that resonates with your ${answers.audience || 'target audience'} requires a strategic approach that balances ${answers.tone || 'engaging'} storytelling with valuable insights.

## Key Content Pillars

### 1. Audience-Centric Approach
Understanding your ${answers.audience || 'audience'} is crucial for creating content that drives engagement and achieves your goal of ${answers.goal || 'building brand awareness'}.

### 2. Consistent Voice and Tone
Maintaining a ${answers.tone || 'consistent'} voice across all content helps build trust and recognition with your audience.

### 3. Value-Driven Content
Every piece of content should provide clear value to your ${answers.audience || 'readers'}, whether through education, entertainment, or inspiration.

## Content Strategy Framework

- **Research**: Deep dive into audience preferences and pain points
- **Planning**: Develop content calendars aligned with business objectives
- **Creation**: Produce high-quality, ${answers.tone || 'engaging'} content
- **Distribution**: Share across relevant channels and platforms
- **Analysis**: Measure performance and optimize for better results

## Conclusion

By focusing on ${answers.goal || 'your core objectives'} and maintaining a ${answers.tone || 'consistent'} approach, you can create content that truly connects with your ${answers.audience || 'audience'} and drives meaningful results.`;
        break;
      case 'master-prompts':
        sampleOutput = `# Master Prompt Template: ${answers.goal || 'Advanced Content Creation'}

## Prompt Structure Framework

### Context Setting
**Role Definition**: You are an expert ${answers.audience || 'content strategist'} with deep knowledge in creating ${answers.tone || 'professional'} content that achieves ${answers.goal || 'specific business objectives'}.

### Task Specification
**Primary Objective**: ${answers.goal || 'Create compelling content that drives engagement'}
**Target Audience**: ${answers.audience || 'Professional stakeholders'}
**Desired Tone**: ${answers.tone || 'Professional yet approachable'}

### Detailed Instructions
1. **Analysis Phase**
   - Analyze the target audience's needs and preferences
   - Identify key pain points and opportunities
   - Research relevant trends and best practices

2. **Creation Phase**
   - Develop content that speaks directly to the ${answers.audience || 'audience'}
   - Maintain a ${answers.tone || 'consistent'} voice throughout
   - Focus on achieving the goal of ${answers.goal || 'maximum impact'}

3. **Optimization Phase**
   - Review content for clarity and engagement
   - Ensure alignment with stated objectives
   - Refine based on best practices

### Output Requirements
- **Format**: Structured, easy-to-read content
- **Length**: Comprehensive yet concise
- **Style**: ${answers.tone || 'Professional'} and engaging
- **Focus**: Directly addresses ${answers.goal || 'stated objectives'}

### Quality Checklist
✅ Content addresses the specific goal: ${answers.goal || '[Goal]'}
✅ Tone is appropriate for ${answers.audience || '[Audience]'}: ${answers.tone || '[Tone]'}
✅ Information is accurate and valuable
✅ Structure is logical and easy to follow
✅ Call-to-action is clear and compelling

## Usage Instructions
This master prompt can be adapted for various content types by modifying the context, audience, and specific requirements while maintaining the core structure for consistent, high-quality outputs.`;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Sidebar Navigation */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'} flex flex-col`}>
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
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Prompt Studio</h1>
              <p className="text-gray-600">Create your perfect prompt in three simple steps</p>
            </div>
            
            {/* Onboarding Checklist */}
            {showOnboarding && (
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
                    <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                    <span className="text-sm text-gray-600">Save a Prompt</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                    <span className="text-sm text-gray-600">Rate a Prompt's Quality</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Prompt Studio Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
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
                    <div className="flex items-center mb-4">
                      <div className={`bg-gradient-to-r ${getSelectedTaskInfo()?.color} p-3 rounded-lg text-white mr-4`}>
                        {getSelectedTaskInfo()?.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{getSelectedTaskInfo()?.title}</h3>
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
                        className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors flex items-center justify-center"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
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
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-4">
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
    </div>
  );
};

export default Dashboard;