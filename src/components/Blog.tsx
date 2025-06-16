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
      date: "January 15, 2025",
      readTime: "12 min read",
      category: "Productivity",
      featured: true
    },
    {
      id: 2,
      title: "The Future of AI Productivity: Trends for 2025",
      excerpt: "Explore the emerging trends in AI-powered productivity tools and how they're reshaping the workplace.",
      author: "Sarah Chen",
      date: "January 10, 2025",
      readTime: "8 min read",
      category: "AI Trends",
      featured: false
    },
    {
      id: 3,
      title: "5 Common Prompt Engineering Mistakes and How to Avoid Them",
      excerpt: "Learn from the most common pitfalls in prompt engineering and discover best practices for better results.",
      author: "Mike Rodriguez",
      date: "January 5, 2025",
      readTime: "6 min read",
      category: "Best Practices",
      featured: false
    }
  ];

  const [selectedPost, setSelectedPost] = React.useState<number | null>(null);

  if (selectedPost === 1) {
    return <PromptEngineeringArticle onBack={() => setSelectedPost(null)} onHome={onBack} />;
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
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
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
                <User className="w-4 h-4 mr-2" />
                Dorp AI Team
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                January 15, 2025
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

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Science Behind Structured Prompts</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">From Conversational to Structured Prompting</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              There are two primary approaches to interacting with AI systems: conversational and structured prompting.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Conversational prompting</strong> involves casual, natural language interactions—similar to how you might chat with a colleague. While accessible and intuitive, this approach often requires multiple back-and-forth exchanges to refine results.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Structured prompting</strong> takes a more deliberate approach by precisely encoding instructions, examples, and constraints. This method translates human knowledge into a prompt "script" that guides the AI system through a specific workflow.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Research consistently shows that structured prompts outperform conversational ones across various tasks. In one study comparing the two approaches for content creation, structured prompts produced significantly better results—generating content tailored to specific audiences with relevant details, while conversational prompts yielded generic, unfocused outputs.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How Structured Prompts Save You Time</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">The Productivity Impact</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The time-saving potential of well-engineered prompts is substantial and measurable. Research indicates that knowledge workers can save an average of 5+ hours weekly by implementing better prompting techniques. This translates to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 ml-4">
              <li>68 minutes saved weekly on research tasks</li>
              <li>97 minutes saved weekly on content creation</li>
              <li>134 minutes saved weekly on data analysis</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              When calculated over a year, this represents a potential ROI of 1,170% based on the time investment required to learn effective prompt engineering techniques.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Task-Specific Time Savings</h3>
            
            <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Content Creation</h4>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Content creators report some of the most dramatic time savings from structured prompts. Traditional content creation workflows often involve hours of planning, drafting, editing, and refinement. With structured prompts, you can:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 ml-4">
              <li>Generate comprehensive content briefs in minutes instead of hours</li>
              <li>Adapt content for multiple platforms simultaneously</li>
              <li>Create consistent brand messaging across all channels</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">Email Writing</h4>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Professionals spend an average of 8.8 hours weekly on email correspondence—a significant portion of the workweek. Structured prompts can transform this process by:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 ml-4">
              <li>Reducing email drafting time from 30 minutes to just 5 minutes per message</li>
              <li>Ensuring consistent tone and messaging across all communications</li>
              <li>Eliminating errors and improving clarity without extensive editing</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Structured Prompts vs. Generic Prompts: The Performance Gap</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Measurable Differences</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The performance gap between structured and generic prompts is substantial and measurable. In controlled comparisons:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 ml-4">
              <li>Structured prompts produce results that require 67% less editing time</li>
              <li>They achieve 78% higher first-attempt success rates for coding tasks</li>
              <li>They generate content with 4.8/5 average user satisfaction ratings (compared to 3.2/5 for generic prompts)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Real-World Examples</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">Consider these contrasting examples:</p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-red-800 mb-2">Generic Prompt:</p>
              <p className="text-red-700">"Write a marketing email about our new product."</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-green-800 mb-2">Structured Prompt (Dorp):</p>
              <div className="text-green-700 text-sm">
                <p>Role: You are an expert email copywriter with 10+ years of experience in SaaS marketing</p>
                <p>Task: Create a promotional email for our new AI productivity tool</p>
                <p>Context: Our target audience is busy professionals aged 30-45 who struggle with email overload</p>
                <p>Format: 3 paragraphs with a clear call-to-action</p>
                <p>Tone: Professional but conversational, emphasizing time savings</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              The generic prompt typically produces generic marketing language that requires substantial editing. The structured prompt (Dorp) generates a tailored email that's ready to use with minimal modifications, saving valuable time and mental energy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Introducing Dorps: Structured Prompts Made Simple</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What Are Dorps?</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Dorps are pre-engineered, platform-specific prompt templates designed to maximize AI output quality while minimizing user effort. Unlike generic prompts that produce inconsistent results, Dorps are structured to:
            </p>
            <ol className="list-decimal list-inside text-gray-700 mb-6 ml-4">
              <li>Automatically adapt to specific AI platforms (like Replit, ChatGPT, or Midjourney)</li>
              <li>Incorporate best practices from prompt engineering research</li>
              <li>Include contextual elements that improve output relevance and quality</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How Dorps Work</h3>
            <p className="text-gray-700 mb-2 leading-relaxed">Each Dorp follows a structured format that includes:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 ml-4">
              <li><strong>Clear role definition</strong> for the AI system</li>
              <li><strong>Specific task instructions</strong> with measurable outcomes</li>
              <li><strong>Relevant context</strong> to inform the AI's understanding</li>
              <li><strong>Format specifications</strong> for the desired output</li>
              <li><strong>Style and tone guidance</strong> to match your needs</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              This structured approach eliminates the guesswork from prompt creation, allowing you to focus on your actual work rather than figuring out how to communicate with AI systems.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Practical Tips for Creating Your Own Structured Prompts</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">The Elements of Effective Prompts</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Even without using pre-built Dorps, you can improve your prompt engineering skills by incorporating these key elements:
            </p>
            <ol className="list-decimal list-inside text-gray-700 mb-6 ml-4">
              <li><strong>Be specific about roles:</strong> Tell the AI what expert perspective to adopt (e.g., "Act as an experienced data analyst")</li>
              <li><strong>Provide clear context:</strong> Include relevant background information that frames the task</li>
              <li><strong>Define the format:</strong> Specify exactly how you want the information structured</li>
              <li><strong>Include examples:</strong> When appropriate, show the AI what good outputs look like</li>
              <li><strong>Set constraints:</strong> Establish boundaries for length, style, or content focus</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Measuring Your Success with Structured Prompts</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Tracking Time Savings</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              To quantify the benefits of structured prompts in your workflow, consider tracking these metrics:
            </p>
            <ol className="list-decimal list-inside text-gray-700 mb-6 ml-4">
              <li><strong>Time spent per task:</strong> Compare completion times before and after implementing structured prompts</li>
              <li><strong>Iteration count:</strong> Track how many revisions are needed to achieve satisfactory results</li>
              <li><strong>Quality ratings:</strong> Assess the usability of first-draft outputs on a 1-5 scale</li>
              <li><strong>Cognitive load:</strong> Note how mentally taxing the process feels (1-10 scale)</li>
            </ol>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Many professionals find that structured prompts reduce their task completion time by 40-70% while simultaneously improving output quality.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculating Your ROI</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">You can calculate your personal return on investment using this formula:</p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-mono text-sm">
                ROI = (Time Saved × Hourly Rate × 52 weeks) ÷ (Time Investment in Learning Better Prompting)
              </p>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              For the average knowledge worker earning $45/hour and saving 5 hours weekly, the annual return exceeds $11,700—representing an ROI of over 1,000% based on a 10-hour learning investment.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Prompt engineering isn't just a technical skill—it's a productivity multiplier that can transform how you work with AI systems. By mastering structured prompts like Dorps, you can dramatically reduce the time spent on routine tasks while improving output quality across content creation, email writing, document generation, and research.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The data is clear: professionals who invest in learning prompt engineering techniques save an average of 5+ hours weekly—time that can be redirected to high-value work, creative thinking, or simply achieving better work-life balance.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              As AI continues to integrate into our professional workflows, the ability to communicate effectively with these systems becomes increasingly valuable. Structured prompts represent one of the highest-leverage skills you can develop to thrive in this evolving landscape.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Start implementing these techniques today, and you'll likely find yourself wondering how you ever worked without them.
            </p>
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