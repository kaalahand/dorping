import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8"><strong>Last Updated: June 16, 2025</strong></p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              Dorp AI ("we," "us," or "our") is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, process, and protect your information when you use our AI-powered prompt engineering platform and services (the "Service").
            </p>
            <p className="text-gray-700 mb-4">
              This Privacy Policy complies with the European Union's General Data Protection Regulation (GDPR), the Digital Services Act (DSA), and other applicable privacy laws.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Data Controller Information</h2>
            <p className="text-gray-700 mb-4">
              Dorp AI acts as the data controller for the personal data we process. You can contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@dorp.ai</p>
              <p className="text-gray-700 mb-2"><strong>Data Protection Officer:</strong> dpo@dorp.ai</p>
              <p className="text-gray-700"><strong>Address:</strong> [Your Company Address]</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Information You Provide</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Account Information:</strong> Email address, password, and profile information</li>
              <li><strong>Payment Information:</strong> Billing details processed by our payment processors</li>
              <li><strong>Content Data:</strong> Prompts, generated content, and user inputs</li>
              <li><strong>Communication Data:</strong> Messages sent through our support channels</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Information We Collect Automatically</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Usage Data:</strong> How you interact with our Service, features used, and time spent</li>
              <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
              <li><strong>Log Data:</strong> IP addresses, access times, and error logs</li>
              <li><strong>Cookies and Tracking:</strong> As described in our Cookie Policy</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.3 Information from Third Parties</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Authentication Services:</strong> Information from Google OAuth or other login providers</li>
              <li><strong>Payment Processors:</strong> Transaction confirmations and payment status</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. How We Use Your Information</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.1 Legal Bases for Processing</h3>
            <p className="text-gray-700 mb-4">We process your personal data based on the following legal grounds:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Contract Performance:</strong> To provide our services and fulfill our obligations</li>
              <li><strong>Legitimate Interests:</strong> To improve our services, ensure security, and conduct analytics</li>
              <li><strong>Consent:</strong> For marketing communications and non-essential cookies</li>
              <li><strong>Legal Obligations:</strong> To comply with applicable laws and regulations</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.2 Specific Uses</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Providing and maintaining our AI services</li>
              <li>Processing payments and managing subscriptions</li>
              <li>Improving our AI models and service quality</li>
              <li>Providing customer support and responding to inquiries</li>
              <li>Sending service-related communications</li>
              <li>Detecting and preventing fraud and abuse</li>
              <li>Complying with legal requirements</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. AI and Machine Learning</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.1 AI Processing</h3>
            <p className="text-gray-700 mb-4">
              Our Service uses artificial intelligence to generate content based on your inputs. We may use your prompts and interactions to improve our AI models, but we implement privacy-preserving techniques such as:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Data anonymization and pseudonymization</li>
              <li>Differential privacy techniques</li>
              <li>Secure aggregation methods</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.2 Human Oversight</h3>
            <p className="text-gray-700 mb-4">
              In compliance with the EU AI Act, we maintain human oversight of our AI systems and provide mechanisms for users to contest AI-generated decisions that significantly affect them.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Data Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.1 Service Providers</h3>
            <p className="text-gray-700 mb-4">We may share your data with trusted third-party service providers who assist us in:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Cloud hosting and infrastructure (AWS, Google Cloud)</li>
              <li>Payment processing (Stripe, PayPal)</li>
              <li>Analytics and monitoring services</li>
              <li>Customer support tools</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.2 Legal Requirements</h3>
            <p className="text-gray-700 mb-4">
              We may disclose your information when required by law, court order, or to protect our rights, property, or safety, or that of our users or the public.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.3 Business Transfers</h3>
            <p className="text-gray-700 mb-4">
              In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction, subject to appropriate safeguards.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. International Data Transfers</h2>
            <p className="text-gray-700 mb-4">
              Your data may be processed in countries outside the European Economic Area (EEA). When we transfer data internationally, we ensure adequate protection through:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>European Commission adequacy decisions</li>
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>Binding Corporate Rules</li>
              <li>Other appropriate safeguards as required by GDPR</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Data Retention</h2>
            <p className="text-gray-700 mb-4">We retain your personal data only for as long as necessary to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Provide our services to you</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Improve our services (in anonymized form)</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Specific retention periods vary by data type and are detailed in our Data Retention Schedule, available upon request.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Your Rights Under GDPR</h2>
            <p className="text-gray-700 mb-4">As a data subject, you have the following rights:</p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.1 Access and Portability</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.2 Correction and Deletion</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.3 Processing Control</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Right to Restrict Processing:</strong> Limit how we process your data</li>
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for consent-based processing</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.4 Exercising Your Rights</h3>
            <p className="text-gray-700 mb-4">
              To exercise any of these rights, contact us at privacy@dorp.ai. We will respond within 30 days and may request verification of your identity.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Cookies and Tracking Technologies</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.1 Types of Cookies</h3>
            <p className="text-gray-700 mb-4">We use the following types of cookies:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
              <li><strong>Performance Cookies:</strong> Help us understand how you use our site</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Used for targeted advertising (with consent)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.2 Cookie Management</h3>
            <p className="text-gray-700 mb-4">
              You can manage your cookie preferences through our cookie banner or browser settings. Note that disabling certain cookies may affect site functionality.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Security Measures</h2>
            <p className="text-gray-700 mb-4">We implement comprehensive security measures to protect your data:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Encryption in transit and at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our Service is not intended for children under 16 years of age. We do not knowingly collect personal data from children under 16. If we become aware that we have collected such data, we will take steps to delete it promptly.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by email or through our Service. The updated policy will be effective when posted, and your continued use constitutes acceptance of the changes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. Complaints and Supervisory Authority</h2>
            <p className="text-gray-700 mb-4">
              If you have concerns about our data processing practices, you can:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Contact us directly at privacy@dorp.ai</li>
              <li>File a complaint with your local data protection authority</li>
              <li>Contact the lead supervisory authority in your jurisdiction</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">15. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For any privacy-related questions or requests, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@dorp.ai</p>
              <p className="text-gray-700 mb-2"><strong>Data Protection Officer:</strong> dpo@dorp.ai</p>
              <p className="text-gray-700 mb-2"><strong>Support:</strong> support@dorp.ai</p>
              <p className="text-gray-700"><strong>Address:</strong> [Your Company Address]</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This Privacy Policy is designed to comply with GDPR, the Digital Services Act, and other applicable privacy laws. It should be reviewed by qualified legal counsel to ensure full compliance with your specific business model and applicable jurisdictions.
              </p>
            </div>
          </div>
        </div>
      </div>

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
              <span className="text-gray-300">Privacy</span>
              <button onClick={onBack} className="text-gray-300 hover:text-white transition-colors">Terms</button>
              <button onClick={onBack} className="text-gray-300 hover:text-white transition-colors">Blog</button>
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

export default PrivacyPolicy;