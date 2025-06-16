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
  Palette
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
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
    { id: 'create', icon: <Plus className="w-5 h-5" />, label: 'Create Prompt', active: true },
    { id: 'history', icon: <History className="w-5 h-5" />, label: 'My Prompts' },
    { id: 'marketplace', icon: <Store className="w-5 h-5" />, label: 'Vibe Marketplace', isPro: true },
    { id: 'analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics', isPro: true },
    { id: 'upgrade', icon: <Crown className="w-5 h-5" />, label: 'Upgrade', isUpgrade: true }
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
    setAnswers({ goal: '', audience: '', tone: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Sidebar Navigation */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'} flex flex-col`}>
        {/* Logo and Collapse Button */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <img 
                src="/Dorp_logo_v1 (1)-Photoroom.png" 
                alt="Dorp AI Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-gray-900">Dorp AI</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : item.isUpgrade
                      ? 'text-purple-600 hover:bg-purple-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
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
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Free Plan</p>
              </div>
            )}
            <button
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
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
          <div className="max-w-4xl mx-auto">
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
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        Generate Final Output
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
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