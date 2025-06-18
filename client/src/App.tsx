import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Mail, 
  Lightbulb, 
  Download, 
  Copy, 
  ExternalLink,
  Check,
  Star,
  Users,
  Clock,
  Smile,
  Menu,
  X
} from 'lucide-react';
import SignupModal from './components/SignupModal';
import SignInModal from './components/SignInModal';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import Blog from './components/Blog';
import SEOHead from './components/SEOHead';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [demoState, setDemoState] = useState('initial');
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    period: string;
    prompts: string;
  } | null>(null);
  const [user, setUser] = useState<{
    id: number;
    username: string;
    email: string;
    plan: string;
    promptsUsed: number;
    promptsLimit: number;
  } | null>(null);

  // Animated demo cycle
  useEffect(() => {
    const interval = setInterval(() => {
      if (demoState === 'initial') {
        setDemoState('questions');
      } else if (demoState === 'questions') {
        setDemoState('result');
      } else {
        setDemoState('initial');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [demoState]);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleSignupClick = (plan?: typeof plans[0]) => {
    if (plan) {
      setSelectedPlan({
        name: plan.name,
        price: plan.price,
        period: plan.period,
        prompts: plan.prompts
      });
    } else {
      // Default to Free plan for general signup buttons
      setSelectedPlan({
        name: 'Free',
        price: '$0',
        period: '',
        prompts: '50 prompts'
      });
    }
    setIsSignupModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleSignInClick = () => {
    setIsSignInModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleSwitchToSignup = () => {
    setIsSignInModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const handleSwitchToSignIn = () => {
    setIsSignupModalOpen(false);
    setIsSignInModalOpen(true);
  };

  const handleSuccessfulAuth = (userData?: any) => {
    setIsSignupModalOpen(false);
    setIsSignInModalOpen(false);
    setShowDashboard(true);
    if (userData) {
      setUser(userData);
    }
  };

  const handleLogout = () => {
    setShowDashboard(false);
    setUser(null);
    localStorage.removeItem('currentUser');
    // Logout from session if using OAuth
    window.location.href = '/api/auth/logout';
  };

  // Check authentication on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();
        
        if (data.authenticated) {
          setUser(data.user);
          setShowDashboard(true);
        } else {
          // Check for stored user (fallback for email auth)
          const storedUser = localStorage.getItem('currentUser');
          if (storedUser) {
            try {
              const userData = JSON.parse(storedUser);
              setUser(userData);
              setShowDashboard(true);
            } catch (error) {
              console.error('Error parsing stored user:', error);
              localStorage.removeItem('currentUser');
            }
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Fallback to localStorage check
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setShowDashboard(true);
          } catch (error) {
            console.error('Error parsing stored user:', error);
            localStorage.removeItem('currentUser');
          }
        }
      }
    };

    // Check for OAuth success parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auth') === 'success') {
      // Remove the parameter from URL
      window.history.replaceState({}, document.title, '/');
      checkAuthStatus();
    } else {
      checkAuthStatus();
    }
  }, []);

  // Function to handle blog navigation and scroll to top
  const handleBlogClick = () => {
    setShowBlog(true);
    setIsMobileMenuOpen(false);
    // Scroll to top after state change
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  // Function to handle privacy page navigation and scroll to top
  const handlePrivacyClick = () => {
    setShowPrivacy(true);
    setIsMobileMenuOpen(false);
    // Scroll to top after state change
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  // Function to handle terms page navigation and scroll to top
  const handleTermsClick = () => {
    setShowTerms(true);
    setIsMobileMenuOpen(false);
    // Scroll to top after state change
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  // Function to handle about us navigation
  const handleAboutUsClick = () => {
    setShowAboutUs(true);
    setIsMobileMenuOpen(false);
  };

  const useCases = [
    {
      title: "Marketing Manager",
      task: "Campaign Optimization",
      example: "Reduced my campaign brief creation from 3 hours to 20 minutes. Our last social campaign saw 23% higher engagement using platform-specific Dorps for Instagram vs generic prompts.",
      icon: <Sparkles className="w-6 h-6" />,
      rating: 4.8
    },
    {
      title: "Student",
      task: "Academic Writing",
      example: "Spent 45 minutes structuring my marketing strategy paper instead of the usual 4 hours. The Dorp helped me organize my thoughts and create proper academic formatting automatically.",
      icon: <FileText className="w-6 h-6" />,
      rating: 4.7
    },
    {
      title: "Project Manager",
      task: "Team Communication",
      example: "Weekly status reports that used to take 90 minutes now take 15 minutes. My team feedback is more structured and actionable since I started Dorping my management communications.",
      icon: <Users className="w-6 h-6" />,
      rating: 4.9
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "",
      prompts: "50 prompts",
      features: ["Basic templates", "Email support", "Export to PDF"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Starter",
      price: "$4.99",
      period: "/month",
      prompts: "125 prompts",
      features: ["All templates", "Priority support", "All export options", "Custom templates"],
      cta: "Start Plan",
      popular: false
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "/month",
      prompts: "500 prompts",
      features: ["Everything in Starter", "Advanced AI models", "Team collaboration", "API access", "Priority processing"],
      cta: "Go Pro",
      popular: true
    },
    {
      name: "Unlimited",
      price: "$49",
      period: "/month",
      prompts: "Unlimited prompts",
      features: ["Everything in Pro", "White-label solution", "Custom integrations", "Dedicated support", "Advanced analytics"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const statistics = [
    {
      value: "78%",
      label: "Success Rate",
      description: "Aligns with AI adoption statistics and realistic conversion expectations"
    },
    {
      value: "8.1",
      label: "Hours Saved Weekly",
      description: "Comes directly from our research showing content creators lose this much time to prompt iteration"
    },
    {
      value: "$6.5B",
      label: "Market Size",
      description: "Uses actual market size projections to show industry momentum"
    }
  ];

  // SEO data for different pages
  const getSEOData = () => {
    if (showAboutUs) {
      return {
        title: "About Dorp AI - The Future of AI Productivity and Prompt Engineering",
        description: "Learn about Dorp AI's mission to revolutionize AI productivity. Discover how our platform helps users save 8.1 hours weekly with structured prompts and intelligent content generation.",
        keywords: "about dorp ai, ai productivity, prompt engineering company, dorping, ai content generation, structured prompts",
        canonicalUrl: "https://dorp.ai/about",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Dorp AI",
          "description": "Learn about Dorp AI's mission to revolutionize AI productivity through intelligent prompt engineering.",
          "url": "https://dorp.ai/about"
        }
      };
    }
    
    if (showBlog) {
      return {
        title: "Dorp AI Blog - AI Productivity Tips, Prompt Engineering Insights & Strategies",
        description: "Discover expert insights on AI productivity, prompt engineering best practices, and content creation strategies. Learn how to master Dorping and save hours every week.",
        keywords: "ai blog, prompt engineering tips, ai productivity strategies, content creation, dorping guides, ai writing tips",
        canonicalUrl: "https://dorp.ai/blog",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Dorp AI Blog",
          "description": "Expert insights on AI productivity and prompt engineering",
          "url": "https://dorp.ai/blog"
        }
      };
    }
    
    if (showPrivacy) {
      return {
        title: "Privacy Policy - Dorp AI | GDPR Compliant Data Protection",
        description: "Read Dorp AI's comprehensive privacy policy. Learn how we protect your data, comply with GDPR, and ensure your privacy while using our AI prompt engineering platform.",
        keywords: "privacy policy, data protection, gdpr compliance, dorp ai privacy, user data security",
        canonicalUrl: "https://dorp.ai/privacy-policy"
      };
    }
    
    if (showTerms) {
      return {
        title: "Terms and Conditions - Dorp AI | Legal Terms of Service",
        description: "Read Dorp AI's terms and conditions. Understand your rights and responsibilities when using our AI-powered prompt engineering platform and content generation services.",
        keywords: "terms of service, legal terms, dorp ai terms, user agreement, service conditions",
        canonicalUrl: "https://dorp.ai/terms-and-conditions"
      };
    }

    if (showDashboard) {
      return {
        title: "Dashboard - Dorp AI | Create Perfect Prompts Instantly",
        description: "Access your Dorp AI dashboard to create, manage, and optimize your AI prompts. Transform your thoughts into polished content with our intelligent prompt engineering studio.",
        keywords: "dorp ai dashboard, prompt studio, ai content creation, prompt engineering tool, ai writing dashboard",
        canonicalUrl: "https://dorp.ai/dashboard"
      };
    }
    
    // Default homepage SEO
    return {
      title: "Dorp AI - Transform Your Thoughts into Reality Instantly | AI Prompt Engineering",
      description: "We understand your prompt, ask the right followup question and deliver clear, compelling drafts tailored to your needs, so you can focus on what matters most. Start free with 50 prompts.",
      keywords: "AI prompt engineering, content generation, AI writing assistant, prompt templates, productivity tools, AI content creator, structured prompts, Dorps, artificial intelligence, content automation",
      canonicalUrl: "https://dorp.ai/"
    };
  };

  // Show dashboard if user is authenticated
  if (showDashboard) {
    return (
      <>
        <SEOHead {...getSEOData()} />
        <Dashboard onLogout={handleLogout} user={user || undefined} />
      </>
    );
  }

  // Show different pages based on state
  if (showAboutUs) {
    return (
      <>
        <SEOHead {...getSEOData()} />
        <AboutUs onBack={() => setShowAboutUs(false)} />
      </>
    );
  }

  if (showTerms) {
    return (
      <>
        <SEOHead {...getSEOData()} />
        <TermsAndConditions onBack={() => setShowTerms(false)} />
      </>
    );
  }

  if (showPrivacy) {
    return (
      <>
        <SEOHead {...getSEOData()} />
        <PrivacyPolicy onBack={() => setShowPrivacy(false)} />
      </>
    );
  }

  if (showBlog) {
    return (
      <>
        <SEOHead {...getSEOData()} />
        <Blog onBack={() => setShowBlog(false)} />
      </>
    );
  }

  return (
    <>
      <SEOHead {...getSEOData()} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <img 
                  src="/Dorp_logo_v1 (1)-Photoroom.png" 
                  alt="Dorp AI Logo" 
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold text-gray-900">Dorp AI</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <button 
                  onClick={handleAboutUsClick}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  About Us
                </button>
                <button 
                  onClick={handleBlogClick}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Blogs
                </button>
                <button 
                  onClick={scrollToPricing}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Pricing
                </button>
                <button 
                  onClick={handleSignInClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign In
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden border-t border-gray-200 bg-white">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <button 
                    onClick={handleAboutUsClick}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    About Us
                  </button>
                  <button 
                    onClick={handleBlogClick}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    Blogs
                  </button>
                  <button 
                    onClick={scrollToPricing}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    Pricing
                  </button>
                  <button 
                    onClick={handleSignInClick}
                    className="block w-full text-left bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-base font-medium transition-colors mt-2"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Transform Your Thoughts into 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Reality</span>
                  —Instantly
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  We understand your prompt, ask the right followup question and deliver clear, compelling drafts tailored to your needs, so you can focus on what matters most.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handleSignupClick()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    Start for Free - 50 Prompts on Us
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                  <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-xl text-lg font-medium transition-colors">
                    Watch Demo
                  </button>
                </div>
              </div>
              
              {/* Animated Demo */}
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-6 transform transition-all duration-500 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">AI Content Creator</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>

                  {demoState === 'initial' && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all">
                          <Mail className="w-6 h-6 mb-2" />
                          <span className="font-medium">Write Email</span>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-all">
                          <FileText className="w-6 h-6 mb-2" />
                          <span className="font-medium">Create Content</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg cursor-pointer hover:from-green-600 hover:to-green-700 transition-all">
                          <Lightbulb className="w-6 h-6 mb-2" />
                          <span className="font-medium">Create Master Prompts</span>
                        </div>
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg cursor-pointer hover:from-orange-600 hover:to-orange-700 transition-all">
                          <Smile className="w-6 h-6 mb-2" />
                          <span className="font-medium">Entertain Me</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {demoState === 'questions' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">What's the goal?</label>
                        <input type="text" placeholder="Follow up on meeting..." className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">What's the tone?</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>Professional</option>
                          <option>Friendly</option>
                          <option>Formal</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {demoState === 'result' && (
                    <div className="animate-fade-in">
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="text-sm text-gray-600 mb-2">Generated Email:</div>
                        <div className="text-sm">
                          <div className="font-medium">Subject: Follow-up on Today's Meeting</div>
                          <div className="mt-2">Hi Sarah,</div>
                          <div className="mt-1">Thank you for taking the time to meet with me today...</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-100 text-blue-700 p-2 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors flex items-center justify-center">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Export
                        </button>
                        <button className="flex-1 bg-green-100 text-green-700 p-2 rounded-md text-sm font-medium hover:bg-green-200 transition-colors flex items-center justify-center">
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">Three simple steps to transform your ideas into polished content</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Task</h3>
                <p className="text-gray-600 mb-6">Select from our library of templates: emails, documents, content, and more.</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs font-medium text-blue-700">Email</span>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
                    <FileText className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <span className="text-xs font-medium text-purple-700">Content</span>
                  </div>
                </div>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Answer Questions</h3>
                <p className="text-gray-600 mb-6">Our AI asks targeted questions to understand your needs and context.</p>
                <div className="bg-gray-50 p-4 rounded-lg text-left">
                  <div className="text-sm text-gray-700 mb-2">💭 What's the goal?</div>
                  <div className="text-sm text-gray-700 mb-2">🎯 Who's the audience?</div>
                  <div className="text-sm text-gray-700">📝 What's the tone?</div>
                </div>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Your Output</h3>
                <p className="text-gray-600 mb-6">Receive polished, ready-to-use content that you can export anywhere.</p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-100 text-blue-700 p-2 rounded-md text-sm font-medium flex items-center justify-center">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </button>
                  <button className="flex-1 bg-green-100 text-green-700 p-2 rounded-md text-sm font-medium flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Docs
                  </button>
                  <button className="flex-1 bg-purple-100 text-purple-700 p-2 rounded-md text-sm font-medium flex items-center justify-center">
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What You Can Create</h2>
              <p className="text-xl text-gray-600">Real feedback from 2,500+ professionals who've eliminated AI prompt frustration</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg text-white mr-4">
                      {useCase.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{useCase.title}</h3>
                      <p className="text-sm text-gray-600">{useCase.task}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic mb-4">
                    "{useCase.example}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">{useCase.rating} rating</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
              <p className="text-xl text-gray-600">Start free, upgrade when you need more power</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {plans.map((plan, index) => (
                <div key={index} className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 mb-6">{plan.prompts}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => handleSignupClick(plan)}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Join content creators saving 8.1 hours weekly with 67% faster results
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {statistics.map((stat, index) => (
                <div key={index} className="text-white relative group">
                  <div className="text-4xl font-bold mb-2 cursor-help">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 w-64">
                    <div className="text-center">{stat.description}</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => handleSignupClick()}
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-colors shadow-lg"
            >
              Start Creating Today - It's Free
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <img 
                  src="/Dorp_logo_v1 (1)-Photoroom.png" 
                  alt="Dorp AI Logo" 
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold">Dorp AI</span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-end space-x-6">
                <button 
                  onClick={handlePrivacyClick}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy
                </button>
                <button 
                  onClick={handleTermsClick}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms
                </button>
                <button 
                  onClick={handleBlogClick}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blogs
                </button>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; 2025 Dorp AI. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <SignupModal 
          isOpen={isSignupModalOpen}
          onClose={() => setIsSignupModalOpen(false)}
          onSwitchToSignIn={handleSwitchToSignIn}
          onSuccess={handleSuccessfulAuth}
          selectedPlan={selectedPlan}
        />
        
        <SignInModal 
          isOpen={isSignInModalOpen}
          onClose={() => setIsSignInModalOpen(false)}
          onSwitchToSignup={handleSwitchToSignup}
          onSuccess={handleSuccessfulAuth}
        />
      </div>
    </>
  );
}

export default App;