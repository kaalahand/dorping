import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsAndConditionsProps {
  onBack: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onBack }) => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions for Dorp.ai</h1>
          <p className="text-gray-600 mb-8"><strong>Last Updated: June 16, 2025</strong></p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing or using the Dorp.ai website and services (the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, you may not access or use our Service. These Terms constitute a binding agreement between you and Dorp.ai ("we," "us," or "our").
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              Dorp.ai is an artificial intelligence-powered platform that provides prompt engineering and content generation services. Our Service allows users to create structured prompts (called "Dorps") for various AI platforms and generate content including emails, documents, and other written materials. The Service operates on a freemium model with both free and paid subscription tiers.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. EU Compliance and Legal Framework</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Digital Services Act Compliance</h3>
            <p className="text-gray-700 mb-4">
              As a digital service provider operating in the European Union, we comply with the Digital Services Act (DSA) requirements. We maintain clear content moderation policies and procedures for handling illegal content reports. Users may report content that violates our terms through our designated contact mechanisms.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 GDPR Compliance</h3>
            <p className="text-gray-700 mb-4">
              We process personal data in accordance with the General Data Protection Regulation (GDPR). Our data processing activities are governed by our separate Privacy Policy and Data Processing Agreement, which form an integral part of these Terms.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.3 AI Act Compliance</h3>
            <p className="text-gray-700 mb-4">
              Where applicable, our AI systems comply with the European Union's Artificial Intelligence Act. We maintain appropriate risk management systems and human oversight for our AI services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. User Accounts and Registration</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.1 Account Creation</h3>
            <p className="text-gray-700 mb-4">
              To access certain features of our Service, you must create an account by providing accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.2 Age Requirements</h3>
            <p className="text-gray-700 mb-4">
              You must be at least 16 years old to use our Service, or the minimum age required in your jurisdiction. If you are under 18, you represent that you have obtained parental consent to use our Service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Subscription Plans and Payment Terms</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.1 Service Tiers</h3>
            <p className="text-gray-700 mb-2">We offer the following subscription plans:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li><strong>Free Plan</strong>: 50 prompts per month with basic features</li>
              <li><strong>Starter Plan</strong>: 125 prompts per month for $4.99/month</li>
              <li><strong>Pro Plan</strong>: 500 prompts per month for $19.99/month</li>
              <li><strong>Unlimited Plan</strong>: Unlimited prompts for $49/month</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.2 Payment and Billing</h3>
            <p className="text-gray-700 mb-4">
              Subscription fees are charged in advance on a monthly basis. All prices are inclusive of applicable VAT for EU customers. Payment processing is handled by our third-party payment processors in compliance with EU payment regulations.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.3 Cancellation and Refunds</h3>
            <p className="text-gray-700 mb-4">
              You may cancel your subscription at any time through your account settings. Cancellations take effect at the end of the current billing period. Refunds are provided in accordance with EU consumer protection laws.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Acceptable Use Policy</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.1 Permitted Uses</h3>
            <p className="text-gray-700 mb-2">You may use our Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Generate illegal, harmful, or misleading content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights of others</li>
              <li>Harass, threaten, or harm other users</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.2 Content Moderation</h3>
            <p className="text-gray-700 mb-4">
              We implement content moderation policies using both automated systems and human review. We reserve the right to remove content that violates our terms and to suspend or terminate accounts for repeated violations.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.1 Service Ownership</h3>
            <p className="text-gray-700 mb-4">
              The Service, including all software, algorithms, and proprietary technology, remains our exclusive property. You receive only a limited, non-exclusive license to use the Service.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.2 AI-Generated Content</h3>
            <p className="text-gray-700 mb-4">
              Content generated using our AI services may not be eligible for copyright protection under current EU and international law. Users are responsible for determining the intellectual property status of generated content.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.3 User-Generated Content</h3>
            <p className="text-gray-700 mb-4">
              You retain ownership of content you input into our Service, but grant us a license to process and analyze such content to provide our services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Data Protection and Privacy</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.1 GDPR Rights</h3>
            <p className="text-gray-700 mb-2">As an EU-based service, we provide all rights required under GDPR, including:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Right of access to your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.2 Data Processing Basis</h3>
            <p className="text-gray-700 mb-4">
              We process personal data based on legitimate interests for service provision, contract performance for paid services, and consent where required.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.3 Cookie Policy</h3>
            <p className="text-gray-700 mb-4">
              Our website uses cookies in compliance with EU cookie legislation. We obtain your consent before placing non-essential cookies and provide granular options for cookie preferences.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Service Availability and Support</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.1 Service Level Agreement</h3>
            <p className="text-gray-700 mb-4">
              We strive to maintain 99.5% uptime for our Service but do not guarantee uninterrupted availability. Scheduled maintenance will be announced in advance when possible.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.2 Customer Support</h3>
            <p className="text-gray-700 mb-4">
              We provide customer support through our designated channels, with priority support for paid subscribers. EU customers have additional rights under consumer protection laws.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Limitation of Liability</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.1 Disclaimer of Warranties</h3>
            <p className="text-gray-700 mb-4">
              The Service is provided "as is" without warranties of any kind, to the extent permitted by applicable law. We disclaim all warranties regarding accuracy, reliability, or fitness for a particular purpose.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.2 Liability Limitations</h3>
            <p className="text-gray-700 mb-4">
              Our liability is limited to the extent permitted by EU law. We shall not be liable for indirect, consequential, or punitive damages except where prohibited by mandatory consumer protection laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.3 EU Consumer Rights</h3>
            <p className="text-gray-700 mb-4">
              Nothing in these Terms limits your statutory rights as a consumer under EU consumer protection legislation.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Termination</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">11.1 Termination by Us</h3>
            <p className="text-gray-700 mb-4">
              We may suspend or terminate your access to the Service for violations of these Terms or for other legitimate reasons. We will provide reasonable notice except in cases of serious violations.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">11.2 Effect of Termination</h3>
            <p className="text-gray-700 mb-4">
              Upon termination, your right to use the Service ceases immediately. We will retain your data only as required by law or legitimate business purposes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">12.1 Governing Law</h3>
            <p className="text-gray-700 mb-4">
              These Terms are governed by the laws of the European Union and applicable member state law. Any disputes will be subject to the jurisdiction of the competent courts.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">12.2 Consumer Dispute Resolution</h3>
            <p className="text-gray-700 mb-4">
              EU consumers may access alternative dispute resolution mechanisms as provided by EU consumer protection laws. We participate in the EU Online Dispute Resolution platform where applicable.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Contact Information</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">13.1 General Contact</h3>
            <p className="text-gray-700 mb-4">
              For general inquiries, please contact us at: support@dorp.ai
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">13.2 Data Protection Officer</h3>
            <p className="text-gray-700 mb-4">
              Our Data Protection Officer can be reached at: dpo@dorp.ai
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">13.3 Content Reporting</h3>
            <p className="text-gray-700 mb-4">
              To report illegal content or terms violations: report@dorp.ai
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We may update these Terms from time to time. Significant changes will be communicated with at least 30 days' notice for existing users. Continued use of the Service after changes constitutes acceptance of the updated Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">15. Severability</h2>
            <p className="text-gray-700 mb-4">
              If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This Terms and Conditions document is designed for compliance with EU regulations including GDPR, the Digital Services Act, and the AI Act. It should be reviewed by qualified legal counsel to ensure full compliance with your specific business model and applicable jurisdictions.
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
              <button onClick={onBack} className="text-gray-300 hover:text-white transition-colors">Privacy</button>
              <span className="text-gray-300">Terms</span>
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

export default TermsAndConditions;