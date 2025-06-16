import React from 'react';
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from 'lucide-react';

interface BlogProps {
  onBack: () => void;
}

const Blog: React.FC<BlogProps> = ({ onBack }) => {
  const blogPosts = [
    {
      id: 1,
      title: "What Is Prompt Engineering? How Smarter Prompts Save You Hours Every Week",
      excerpt: "Discover how structured prompts can reduce content production time by up to 73% while improving quality and consistency.",
      author: "Dorp AI Team",
      date: "June 16, 2025",
      readTime: "12 min read",
      category: "Productivity",
      featured: true
    },
    {
      id: 2,
      title: "Top 10 AI Prompts Every Content Marketer Should Use in 2025",
      excerpt: "Master the essential AI prompts that are transforming content marketing, with proven templates that drive measurable results.",
      author: "Dorp AI Team",
      date: "June 17, 2025",
      readTime: "15 min read",
      category: "Marketing",
      featured: false
    },
    {
      id: 3,
      title: "The Future of AI Productivity: Trends for 2025",
      excerpt: "Explore the emerging trends in AI-powered productivity tools and how they're reshaping the workplace.",
      author: "Sarah Chen",
      date: "June 10, 2025",
      readTime: "8 min read",
      category: "AI Trends",
      featured: false
    }
  ];

  const [selectedPost, setSelectedPost] = React.useState<number | null>(null);

  if (selectedPost === 1) {
    return <PromptEngineeringArticle onBack={() => setSelectedPost(null)} onHome={onBack} />;
  }

  if (selectedPost === 2) {
    return <AIPromptsArticle onBack={() => setSelectedPost(null)} onHome={onBack} />;
  }

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
              Dorp AI 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, tips, and strategies for mastering AI productivity and prompt engineering
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
            {blogPosts.filter(post => post.featured).map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors cursor-pointer"
                      onClick={() => setSelectedPost(post.id)}>
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedPost(post.id)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center"
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <div key={post.id} className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors cursor-pointer"
                      onClick={() => setSelectedPost(post.id)}>
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedPost(post.id)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay Updated with AI Productivity Tips
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest insights on prompt engineering, AI productivity, and Dorping strategies delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <button className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-r-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
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
              <button onClick={onBack} className="text-gray-300 hover:text-white transition-colors">Privacy</button>
              <button onClick={onBack} className="text-gray-300 hover:text-white transition-colors">Terms</button>
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

// Prompt Engineering Article Component
const PromptEngineeringArticle: React.FC<{ onBack: () => void; onHome: () => void }> = ({ onBack, onHome }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blog
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

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Productivity
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              What Is Prompt Engineering? How Smarter Prompts Save You Hours Every Week
            </h1>
            <div className="flex items-center space-x-4 text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                June 16, 2025
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                12 min read
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Introduction</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              In today's fast-paced digital landscape, professionals across industries are constantly seeking ways to maximize productivity and efficiency. Enter prompt engineering—a powerful technique that's revolutionizing how we interact with artificial intelligence to get better, faster results. At its core, prompt engineering is the art and science of crafting precise instructions that guide AI systems to produce exactly what you need, when you need it.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              For content creators, marketers, researchers, and busy professionals, mastering this skill isn't just a nice-to-have—it's becoming essential for staying competitive in an AI-powered world. Studies show that well-engineered prompts can reduce content production time by up to 73% while simultaneously improving quality and consistency.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Let's explore how structured prompts (like Dorps) can transform your workflow and save you hours every week across content creation, email writing, document generation, and research tasks.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Is Prompt Engineering?</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">The Basics Explained</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Prompt engineering is the process of structuring or crafting instructions to produce the best possible output from generative AI models. Think of it as learning to speak the language of AI effectively—the better your communication, the better your results.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Unlike casual conversations with AI where you might ask vague questions and hope for useful answers, prompt engineering involves deliberately designing your inputs to maximize the quality, relevance, and accuracy of AI-generated outputs. It combines elements of logic, coding, and creative communication to guide AI systems toward desired outcomes.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Why Prompt Engineering Matters</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The difference between a poorly engineered prompt and a well-crafted one can be dramatic. Generic prompts often lead to generic, unfocused results that require extensive editing and refinement. In contrast, structured prompts provide clear guidance that helps AI models understand exactly what you're looking for.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Consider this: knowledge workers lose an estimated 25% of their productive time correcting or redirecting AI responses that miss the mark. With proper prompt engineering, you can eliminate most of this wasted effort and get usable results on your first attempt.
            </p>

            {/* Continue with rest of the article content... */}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Dorping?</h3>
            <p className="text-gray-700 mb-6">
              Transform your AI productivity with structured prompts. Join thousands of professionals who are already saving hours every week.
            </p>
            <button 
              onClick={onHome}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get Started with Dorp AI
            </button>
          </div>
        </div>
      </article>

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
              <button onClick={onHome} className="text-gray-300 hover:text-white transition-colors">Privacy</button>
              <button onClick={onHome} className="text-gray-300 hover:text-white transition-colors">Terms</button>
              <button onClick={onHome} className="text-gray-300 hover:text-white transition-colors">Blogs</button>
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

// AI Prompts Article Component
const AIPromptsArticle: React.FC<{ onBack: () => void; onHome: () => void }> = ({ onBack, onHome }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blog
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

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center mb-4">
              <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Marketing
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Top 10 AI Prompts Every Content Marketer Should Use in 2025
            </h1>
            <div className="flex items-center space-x-4 text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                June 17, 2025
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                15 min read
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6 leading-relaxed">
              The artificial intelligence revolution has fundamentally transformed content marketing, with AI-powered tools helping marketers streamline workflows, enhance creativity, and drive measurable results. By analyzing performance data from over 50,000 email campaigns using AI-generated content, researchers have found that ChatGPT-generated subject lines achieve an average open rate of 27.8%, compared to the industry average of 21.33%.
            </p>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Furthermore, AI-generated content drives click-through rates of 4.5% versus the industry standard of 2.62%, demonstrating the tangible impact of well-crafted prompts on marketing performance. As we move deeper into 2025, the prompt engineering market is projected to reach $7.07 billion by 2031, growing at an impressive 33.9% CAGR.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why AI Prompts Are Essential for Content Marketing in 2025</h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              The landscape of content marketing has evolved dramatically, with AI becoming an indispensable tool for teams juggling multiple clients, tight deadlines, and diverse content requirements. Modern marketing teams report saving significant time through AI-powered content creation, with structured prompts reducing content production time by up to 73% while maintaining or improving quality.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Effective AI prompts serve multiple functions beyond simple content generation. They help streamline brainstorming when creative blocks arise, maintain consistency in tone and style across different content pieces, and scale output without proportionally increasing headcount. Perhaps most importantly, they enable marketers to optimize content performance through data-driven insights and automated analytics.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Top 10 AI Prompts Every Content Marketer Needs</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. The Strategic Blog Post Generator</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Purpose:</strong> Create comprehensive, SEO-optimized blog content that drives organic traffic and establishes thought leadership.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-gray-800 mb-2">Template:</p>
              <div className="text-gray-700 text-sm font-mono">
                <p>Role: You are an expert content strategist with 10+ years of experience in [INDUSTRY]</p>
                <p>Task: Write a [WORD COUNT] blog post titled "[TITLE]"</p>
                <p>Audience: [TARGET AUDIENCE - be specific about demographics, pain points, and interests]</p>
                <p>SEO Focus: Primary keyword "[KEYWORD]" with supporting keywords [LIST 3-5 RELATED KEYWORDS]</p>
                <p>Structure: Include H2s and H3s, compelling introduction with hook, 3-5 main sections with actionable insights, and strong conclusion with CTA</p>
                <p>Tone: [Professional/Conversational/Educational] - align with brand voice</p>
                <p>Include: Real-world examples, data points, and practical takeaways readers can implement immediately</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Why It Works:</strong> This prompt combines SEO optimization with strategic content planning, ensuring blog posts serve both search engines and human readers. The specific role assignment and detailed structure requirements result in more polished, professional content that aligns with marketing objectives.
            </p>

            {/* Continue with remaining prompts... */}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Content Marketing?</h3>
            <p className="text-gray-700 mb-6">
              Start using these proven AI prompts to create better content faster. Join thousands of marketers who are already seeing dramatic improvements in their content performance.
            </p>
            <button 
              onClick={onHome}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get Started with Dorp AI
            </button>
          </div>
        </div>
      </article>

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
              <button onClick={onHome} className="text-gray-300 hover:text-white transition-colors">Privacy</button>
              <button onClick={onHome} className="text-gray-300 hover:text-white transition-colors">Terms</button>
              <button onClick={onHome} className="text-gray-300 hover:text-white transition-colors">Blogs</button>
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

export default Blog;