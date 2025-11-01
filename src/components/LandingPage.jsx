import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import InsureBrainLogo from "./ui/InsureBrainLogo";
import {
  Shield,
  ChevronRight,
  BarChart3,
  Zap,
  Eye,
  Users,
  CheckCircle,
  TrendingUp,
  FileText,
  Lock,
  Heart,
  Activity,
  PieChart,
  Globe,
  Search,
  Award,
  UserCheck,
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleScheduleDemo = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <InsureBrainLogo size="default" showTagline={false} />
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm">
                Features
              </a>
              <a
                href="#why-insurebrain"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Why InsureBrain
              </a>
              <Button
                onClick={handleLogin}
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
              >
                Login
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-2 bg-violet-100 text-violet-600 px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="h-4 w-4" />
              AI-POWERED INSURANCE PLATFORM
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-8 max-w-4xl mx-auto">
            Insurance Recommendation
            <br />
            <span className="text-violet-600">Reimagined</span>
          </h1>

          <h5 className="text-xl font-bold text-gray-900 leading-tight mb-8 max-w-4xl mx-auto">
            Insurance Agents Are Overselling, Underselling, and <span className="text-violet-600">Misselling</span>
          </h5>

          <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            In the Indian market, insurance professionals face a critical
            challenge: recommending the right policy at the right price. Agents
            often sell policies that benefit their commission, not their
            clients. Customers get oversold, undersold, or mis-sold because of
            inadequate technology and fragmented information.
          </p>

          {/* Pain Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                • Overselling
              </h3>
              <p className="text-sm text-gray-600">
                Agents recommend expensive policies, leading to customer
                dissatisfaction and policy lapses
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">
                • Underselling
              </h3>
              <p className="text-sm text-gray-600">
                Inadequate coverage leaves families vulnerable during critical
                moments
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">• Misselling</h3>
              <p className="text-sm text-gray-600">
                Wrong policy recommendations damage client trust and regulatory
                compliance
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-violet-600 mb-2">40%+</div>
              <p className="text-gray-600 text-sm">
                Of policies lapse within 2-3 years due to mis-selling
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-violet-600 mb-2">
                ₹5000+ Cr
              </div>
              <p className="text-gray-600 text-sm">
                Annual losses from inadequate & improper insurance
                recommendations
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-violet-600 mb-2">
                2-3 hrs
              </div>
              <p className="text-gray-600 text-sm">
                Time agents spend finding right policy per client
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Solution Section */}
      <section className="py-20 bg-white" id="why-insurebrain">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-2 bg-violet-100 text-violet-600 px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="h-4 w-4" />
              AI-POWERED SOLUTION
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            AI-Powered Recommendations
            <br />
            That Get It Right
          </h2>

          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            InsureBrain combines every customer requirement using advanced ML
            and AI to recommend the perfect policy by eliminating bias-making,
            over-selling, and mis-selling.
          </p>

          {/* AI Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Instant AI Analysis
              </h3>
              <p className="text-sm text-gray-600">
                Analyze customer requirements and provide instant
                recommendations using advanced AI algorithms
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Smart AI Matching
              </h3>
              <p className="text-sm text-gray-600">
                Match using machine learning algorithms for optimal policy
                selection across multiple insurers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Compliance & Security
              </h3>
              <p className="text-sm text-gray-600">
                Ensure regulatory compliance with built-in compliance checks
                and security protocols
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Complete Transparency
              </h3>
              <p className="text-sm text-gray-600">
                Full transparency in recommendations with clear reasoning
                and explainable AI decisions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The InsureBrain Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The InsureBrain Process
          </h2>
          <p className="text-lg text-gray-600 mb-16">
            Four simple steps to eliminate mis-selling and customer
            dissatisfaction
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Client Profile
              </h3>
              <p className="text-sm text-gray-600">
                Agents input comprehensive client requirements including budget,
                risk tolerance and lifestyle preferences
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                AI Validation
              </h3>
              <p className="text-sm text-gray-600">
                Our AI validates the requirements and runs comprehensive risk
                assessment across multiple parameters
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Policy Comparison
              </h3>
              <p className="text-sm text-gray-600">
                InsureBrain compares across 15+ top insurers and provides 3-5
                most relevant suggestions
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Confident Close
              </h3>
              <p className="text-sm text-gray-600">
                Agents can confidently recommend with full transparency and
                data-backed reasoning
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 bg-white" id="features">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise Features
            </h2>
            <p className="text-lg text-gray-600">
              Built for professional insurance brokers and agencies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Client Management Dashboard
              </h3>
              <p className="text-gray-600 mb-8">
                Centralized platform for managing client profiles, recommendations, and policy history
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Commission Tracking
              </h3>
              <p className="text-gray-600 mb-8">
                Track earnings by product, client, and time period with transparent reporting
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Multi-Product Support
              </h3>
              <p className="text-gray-600 mb-8">
                Life, Health, Auto, Home, Business, and Group insurance—all in one platform
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Real-Time Policy Comparison
              </h3>
              <p className="text-gray-600 mb-8">
                Compare 1000+ policies instantly. Filter by coverage, premium, and suitability scores
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Compliance & Audit Trail
              </h3>
              <p className="text-gray-600 mb-8">
                Full audit trail of every recommendation meeting RBI and IRDAI guidelines
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Banking-Grade Security
              </h3>
              <p className="text-gray-600 mb-8">
                256-bit encryption, role-based access control, and regular security audits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Professionals Section */}
      <section className="py-20 bg-violet-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Insurance Professionals
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Built with enterprise-grade security and AI that brings compliance
            with market insights
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-4xl font-bold text-violet-600 mb-2">
                5,000+
              </div>
              <p className="text-gray-600 text-sm">Active Agents & Brokers</p>
            </div>

            <div>
              <div className="text-4xl font-bold text-violet-600 mb-2">
                50,000+
              </div>
              <p className="text-gray-600 text-sm">Policies Recommended</p>
            </div>

            <div>
              <div className="text-4xl font-bold text-violet-600 mb-2">94%</div>
              <p className="text-gray-600 text-sm">Accuracy Rate</p>
            </div>

            <div>
              <div className="text-4xl font-bold text-violet-600 mb-2">89%</div>
              <p className="text-gray-600 text-sm">Policy Retention Rate</p>
            </div>
          </div>

          {/* Compliance badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900">IRDAI Compliant</h4>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900">ISO Compliant</h4>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900">
                SOC 2 Type II Certified
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Eliminate Misselling?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of insurance professionals using InsureBrain to
            recommend the right policies, every time. Start your free trial
            today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGetStarted}
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 text-lg font-medium rounded-lg"
            >
              Start Free Trial
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={handleScheduleDemo}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-medium rounded-lg"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <InsureBrainLogo size="small" showTagline={true} />
              <p className="text-gray-600 text-sm mt-4">
                AI-Powered Insurance Recommendations Platform for Insurance Professionals
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Features</li>
                <li>Pricing</li>
                <li>Integrations</li>
                <li>API</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Blog</li>
                <li>Status</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 sm:mb-0">
              © 2024 InsureBrain. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-600">
              <a href="#" className="hover:text-violet-600">Twitter</a>
              <a href="#" className="hover:text-violet-600">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
