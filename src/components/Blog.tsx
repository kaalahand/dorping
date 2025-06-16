import React from 'react';
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from 'lucide-react';

interface BlogProps {
  onBack: () => void;
}

const Blog: React.FC<BlogProps> = ({ onBack }) => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Write SEO-Friendly Blog Posts with AI: Step-by-Step Guide",
      excerpt: "Learn how to craft blog posts that rank well on Google and engage real readers using AI tools like Dorp.ai. Complete step-by-step guide included.",
      author: "Dorp AI Team",
      date: "June 16, 2025",
      readTime: "10 min read",
      category: "SEO",
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
      title: "What Is Prompt Engineering? How Smarter Prompts Save You Hours Every Week",
      excerpt: "Discover how structured prompts can reduce content production time by up to 73% while improving quality and consistency.",
      author: "Dorp AI Team",
      date: "June 10, 2025",
      readTime: "12 min read",
      category: "Productivity",
      featured: false
    }
  ];

  const [selectedPost, setSelectedPost] = React.useState<number | null>(null);

  if (selectedPost === 1) {
    return <SEOBlogArticle onBack={() => setSelectedPost(null)} onHome={onBack} />;
  }

  if (selectedPost === 2) {
    return <AIPromptsArticle onBack={() => setSelectedPost(null)} onHome={onBack} />;
  }

  if (selectedPost === 3) {
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Blogs</span>
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

// SEO Blog Article Component
const SEOBlogArticle: React.FC<{ onBack: () => void; onHome: () => void }> = ({ onBack, onHome }) => {
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
              Back to Blogs
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
                SEO
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              How to Write SEO-Friendly Blog Posts with AI: Step-by-Step Guide
            </h1>
            <div className="flex items-center space-x-4 text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                June 16, 2025
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                10 min read
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6 leading-relaxed">
              In today's competitive digital landscape, crafting blog posts that rank well on Google and engage real readers is essential. With the right AI tools—like Dorp.ai—you can streamline the process and achieve better results, faster. This step-by-step guide will teach you how to research keywords, generate structured outlines, and write optimized content using AI, ensuring your blog posts stand out in search results and captivate your audience.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Use AI for SEO Blog Writing?</h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              AI-powered writing tools have transformed content creation, making it easier to produce high-quality, SEO-optimized blog posts in a fraction of the time. By leveraging AI, you can:
            </p>
            
            <ul className="list-disc list-inside text-gray-700 mb-6 ml-4">
              <li><strong>Save hours of manual research and writing</strong></li>
              <li><strong>Generate content ideas and outlines instantly</strong></li>
              <li><strong>Optimize for relevant keywords and structure</strong></li>
              <li><strong>Ensure readability and engagement</strong></li>
              <li><strong>Scale your content production without sacrificing quality</strong></li>
            </ul>

            <p className="text-gray-700 mb-6 leading-relaxed">
              With Dorp.ai, you get a powerful, user-friendly platform that guides you through every step—from keyword discovery to publishing-ready drafts.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 1: Research and Identify Target Keywords</h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>SEO starts with the right keywords.</strong> Use Dorp.ai's built-in keyword research tool to find terms your audience is searching for.
            </p>
            
            <ol className="list-decimal list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Enter your topic or niche</strong><br />
                Example: "AI for content marketing"</li>
              <li><strong>Get keyword suggestions</strong><br />
                Dorp.ai will recommend primary and secondary keywords, such as "AI blog writing," "SEO content generator,\" and "AI-powered blog posts."</li>
              <li><strong>Analyze search intent</strong><br />
                Select keywords that match your goals—informational, commercial, or navigational.</li>
            </ol>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-semibold mb-2">💡 Tip:</p>
              <p className="text-blue-700">Focus on long-tail keywords (e.g., "how to use AI for SEO blog writing") for less competition and higher conversion potential.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 2: Generate a Structured Outline</h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              A well-organized outline is key to SEO success. Dorp.ai helps you create logical, reader-friendly structures.
            </p>
            
            <ol className="list-decimal list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Paste your main keyword</strong><br />
                Example: "AI for SEO blog writing"</li>
              <li><strong>Generate an outline</strong><br />
                Dorp.ai will suggest headings and subheadings (H2, H3) based on top-performing articles and best practices.</li>
              <li><strong>Customize your outline</strong><br />
                Add or remove sections to fit your unique perspective.</li>
            </ol>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <p className="text-gray-800 font-semibold mb-2">Example Outline:</p>
              <ul className="text-gray-700 text-sm">
                <li>• Introduction</li>
                <li>• Why Use AI for SEO Blog Writing?</li>
                <li>• Step-by-Step Guide</li>
                <li>• Best Practices for AI Blog Writing</li>
                <li>• Conclusion</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 3: Write SEO-Optimized Content</h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Now it's time to turn your outline into a polished blog post. Dorp.ai's AI-powered writing assistant makes this easy.
            </p>
            
            <ol className="list-decimal list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Select a section of your outline</strong><br />
                Example: "Why Use AI for SEO Blog Writing?"</li>
              <li><strong>Generate content</strong><br />
                Dorp.ai will produce a draft tailored to your target keyword and audience.</li>
              <li><strong>Edit and personalize</strong><br />
                Add your own insights, examples, and data to make the content unique and authoritative.</li>
              <li><strong>Optimize for readability</strong><br />
                Use short paragraphs, bullet points, and images to break up text.</li>
            </ol>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-semibold mb-2">💡 Tip:</p>
              <p className="text-green-700">Review your draft for keyword placement, but avoid keyword stuffing. Aim for a natural flow.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 4: Optimize Meta Titles and Descriptions</h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Your blog post's meta title and description are crucial for SEO and click-through rates.
            </p>
            
            <ol className="list-decimal list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Generate meta titles and descriptions</strong><br />
                Dorp.ai will suggest compelling options that include your target keyword.</li>
              <li><strong>Choose the best fit</strong><br />
                Select a title and description that are clear, engaging, and relevant.</li>
              <li><strong>Edit for uniqueness</strong><br />
                Make sure your meta elements stand out from competitors.</li>
            </ol>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 font-semibold mb-2">💡 Tip:</p>
              <p className="text-yellow-700">Keep your title under 60 characters and your description under 160 characters for optimal display in search results.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 5: Add Internal and External Links</h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Linking boosts SEO and helps readers discover more content.
            </p>
            
            <ol className="list-decimal list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Identify relevant internal links</strong><br />
                Link to other blog posts or resources on your site.</li>
              <li><strong>Add authoritative external links</strong><br />
                Include links to reputable sources that support your points.</li>
              <li><strong>Use descriptive anchor text</strong><br />
                Example: "Learn more about AI content tools."</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 6: Review and Publish</h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              Before publishing, take a moment to review and polish your post.
            </p>
            
            <ol className="list-decimal list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Check for accuracy and clarity</strong><br />
                Make sure your facts are correct and your writing is easy to understand.</li>
              <li><strong>Proofread for grammar and spelling</strong><br />
                Use Dorp.ai's built-in editing tools for a final polish.</li>
              <li><strong>Preview your post</strong><br />
                See how your blog post will look to readers.</li>
              <li><strong>Publish and promote</strong><br />
                Share your post on social media and email newsletters to maximize reach.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 7: Monitor Performance and Iterate</h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed">
              SEO is an ongoing process. Use Dorp.ai's analytics to track your blog post's performance.
            </p>
            
            <ol className="list-decimal list-inside text-gray-700 mb-6 ml-4">
              <li><strong>Monitor traffic and engagement</strong><br />
                See which keywords drive the most visits.</li>
              <li><strong>Update your content regularly</strong><br />
                Refresh old posts with new information and keywords.</li>
              <li><strong>Experiment with new formats</strong><br />
                Try videos, infographics, or interactive elements to boost engagement.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Start Writing SEO-Friendly Blog Posts with Dorp.ai Today</h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Ready to supercharge your content marketing? Dorp.ai makes it easy to research keywords, generate outlines, and write optimized blog posts—all in one intuitive platform. With our step-by-step workflow, you'll save time, improve your rankings, and connect with more readers.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Dorp.ai?</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>User-friendly interface:</strong> No coding or technical skills required</li>
                <li><strong>AI-powered keyword research and outline generation</strong></li>
                <li><strong>SEO-optimized content drafts in minutes</strong></li>
                <li><strong>Built-in editing and proofreading tools</strong></li>
                <li><strong>Analytics to track performance and improve over time</strong></li>
              </ul>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Join thousands of marketers, writers, and business owners who are using Dorp.ai to create better content, faster. Sign up today and see the difference for yourself!
            </p>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your SEO Content?</h3>
            <p className="text-gray-700 mb-6">
              Get started now and claim your 50 free prompts to experience the power of AI-driven SEO content creation!
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
              Back to Blogs
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

            {/* Continue with rest of the article content... */}
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
              Back to Blogs
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
                June 10, 2025
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

export default Blog;