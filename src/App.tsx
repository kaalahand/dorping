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
  Clock
} from 'lucide-react';
import SignupModal from './components/SignupModal';
import AboutUs from './components/AboutUs';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [demoState, setDemoState] = useState('initial');
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    period: string;
    prompts: string;
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
  };

  const useCases = [
    {
      title: "Marketing Manager",
      task: "Ad Copy Creation",
      example: "Created compelling social media ads that increased CTR by 40%",
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: "Student",
      task: "Essay Writing",
      example: "Structured a 5-paragraph essay on climate change in 2 minutes",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Manager",
      task: "Performance Review",
      example: "Drafted professional employee feedback with actionable insights",
      icon: <Users className="w-6 h-6" />
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

  // Show About Us page if requested
  if (showAboutUs) {
    return <AboutUs onBack={() => setShowAboutUs(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img 
                src="/Dorp_logo_v1 (1)-Photoroom.png" 
                alt="Dorp AI Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-gray-900">Dorp AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAboutUs(true)}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About Us
              </button>
              <button 
                onClick={scrollToPricing}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => handleSignupClick()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                From Idea to 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Final Draft</span>
                <br />in Seconds
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our AI assistant asks the right questions to transform your simple thoughts into perfectly structured, ready-to-use content.
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
                        <span className="font-medium">Create Document</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg cursor-pointer hover:from-green-600 hover:to-green-700 transition-all">
                      <Lightbulb className="w-6 h-6 mb-2" />
                      <span className="font-medium">Brainstorm Content</span>
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
                  <span className="text-xs font-medium text-purple-700">Document</span>
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
            <p className="text-xl text-gray-600">See how professionals across industries save hours every week</p>
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
                <blockquote className="text-gray-700 italic">
                  "{useCase.example}"
                </blockquote>
                <div className="flex items-center mt-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">5.0 rating</span>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src="/Dorp_logo_v1 (1)-Photoroom.png" 
                alt="Dorp AI Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">Dorp AI</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Dorp AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}

export default App;