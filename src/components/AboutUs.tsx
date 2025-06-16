import React from 'react';
import { ArrowLeft, Clock, Target, TrendingUp, Users, Zap, GitBranch, DollarSign, Shield, Star, Calendar, BarChart3 } from 'lucide-react';

interface AboutUsProps {
  onBack: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onBack }) => {
  const stats = [
    {
      icon: <Clock className="w-8 h-8" />,
      value: "8.1",
      label: "Hours Saved Weekly",
      description: "Content creators using Dorps reduce prompt iteration time by 67%",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      value: "78%",
      label: "First-Try Success Rate",
      description: "Developers achieve higher accuracy with platform-specific Dorps",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      value: "$1,600",
      label: "Monthly Earnings",
      description: "Top Dorp creators in beta tests (yes, you can monetize your skills!)",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "No More Syntax Headaches",
      description: "Dorps auto-adapt to platform rules"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Vibe Control",
      description: "Add \"Professional,\" \"Witty,\" or \"Cyberpunk\" styles"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "One-Click Export",
      description: "Direct to Gmail, Google Docs, GitHub"
    }
  ];

  const roadmapItems = [
    {
      quarter: "Q4 2025",
      title: "Dorp Library & Version Control",
      problem: "92% of users lose track of their best-performing prompts",
      features: [
        "Git-like Versioning - Track changes to Dorps over time",
        "Team Collaboration - Share Dorps with permissions (view/edit)",
        "Performance Analytics - See which Dorp versions get highest ratings"
      ],
      testimonial: {
        quote: "Version control will save me 3 hours weekly managing prompts.",
        author: "Sarah, Beta Tester & DevOps Engineer"
      },
      icon: <GitBranch className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      quarter: "Q1 2026",
      title: "Dorp Marketplace",
      problem: "$2.3B Opportunity - Prompt engineering market growing at 34.9% CAGR",
      features: [
        "Sell Your Dorps - Earn 80% revenue share (we take 20%)",
        "Trending Section - Top Dorps for ChatGPT, Stable Diffusion, etc.",
        "Certified Dorps - Verified by platform partners (Replit/Lovable)"
      ],
      testimonial: null,
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with Back Button */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
            <div className="flex items-center space-x-2">
              <img 
                src="/Dorp_logo_v1 (1)-Photoroom.png" 
                alt="Dorp AI Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-gray-900">Dorp AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Welcome to 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Dorping</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl text-gray-700 mb-8">
              The Future of AI Productivity
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 leading-relaxed">
                <strong className="text-gray-900">Dorping (verb):</strong> The act of transforming simple ideas into perfect AI outputs using intelligent, platform-specific prompts called Dorps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Start Dorping Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Start Dorping Today?</h2>
            <h3 className="text-2xl text-gray-700 mb-8">Dorping Delivers Real Results</h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 text-center group">
                <div className={`bg-gradient-to-r ${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-xl font-semibold text-gray-700 mb-4">{stat.label}</div>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Dorping Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">What is Dorping?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Dorping eliminates the guesswork of AI interactions. Instead of wrestling with generic prompts:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Task</h3>
              <p className="text-gray-600">(e.g., "Write a sales email")</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Your Platform</h3>
              <p className="text-gray-600">(Replit, ChatGPT, Midjourney)</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Let Your Dorp Work</h3>
              <p className="text-gray-600">AI generates perfect, platform-optimized output</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Benefits of Dorping:</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg text-white flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">✅ {benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Roadmap Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Future Roadmap</h2>
            <p className="text-xl text-gray-600">Where Dorping is Headed</p>
          </div>

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`bg-gradient-to-r ${item.color} p-4 rounded-xl text-white mr-6`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-blue-600 mb-1">{item.quarter}</div>
                      <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="text-sm font-semibold text-red-800 mb-1">Problem Solved:</div>
                    <p className="text-red-700">{item.problem}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Features:</h4>
                    <ul className="space-y-3">
                      {item.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {item.testimonial && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                      <blockquote className="text-gray-700 italic mb-3">
                        "{item.testimonial.quote}"
                      </blockquote>
                      <div className="text-sm font-semibold text-gray-900">
                        - {item.testimonial.author}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Start Dorping?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already transforming their AI productivity with Dorp AI.
          </p>
          <button 
            onClick={onBack}
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-colors shadow-lg"
          >
            Get Started Today
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
    </div>
  );
};

export default AboutUs;