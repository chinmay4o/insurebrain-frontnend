import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import InsureBrainLogo from './ui/InsureBrainLogo';
import { BarChart3, Zap, Shield, Users, ChevronRight, Play, TrendingUp, PieChart, Activity, ChevronLeft } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const dashboardSlides = [
    {
      id: 1,
      title: "AI-Powered Analysis Dashboard",
      description: "Real-time client profile analysis",
      icon: BarChart3,
      bgGradient: "from-blue-100 to-purple-100",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      title: "Policy Comparison Engine",
      description: "Compare multiple insurance options",
      icon: TrendingUp,
      bgGradient: "from-green-100 to-blue-100",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      title: "Risk Assessment Matrix",
      description: "Advanced risk profiling system",
      icon: PieChart,
      bgGradient: "from-purple-100 to-pink-100",
      iconColor: "text-purple-600"
    },
    {
      id: 4,
      title: "Performance Analytics",
      description: "Track your success metrics",
      icon: Activity,
      bgGradient: "from-orange-100 to-red-100",
      iconColor: "text-orange-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dashboardSlides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [dashboardSlides.length]);

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dashboardSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + dashboardSlides.length) % dashboardSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <InsureBrainLogo size="default" showTagline={false} />
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <Button
                variant="outline"
                onClick={handleLogin}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Login
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  <Zap className="h-4 w-4" />
                  AI-POWERED PLATFORM
                </div>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                Insurance
                <br />
                Recommendations,
                <br />
                Reimagined
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                InsureBrain uses advanced AI to analyze client profiles and recommend the perfect insurance policies from top insurers. Transform how you sell insurance.
              </p>
              
              <div className="flex gap-4">
                <Button
                  onClick={handleGetStarted}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-medium"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 text-lg font-medium"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>
            
            <div className="relative">
              {/* Dashboard Slider */}
              <div className="relative overflow-hidden rounded-2xl h-80">
                <div 
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {dashboardSlides.map((slide, index) => {
                    const IconComponent = slide.icon;
                    return (
                      <div
                        key={slide.id}
                        className={`min-w-full bg-gradient-to-br ${slide.bgGradient} p-8 flex items-center justify-center`}
                      >
                        <div className="text-center">
                          <IconComponent className={`h-24 w-24 ${slide.iconColor} mx-auto mb-4`} />
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">{slide.title}</h3>
                          <p className="text-gray-600">{slide.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {dashboardSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentSlide
                          ? 'bg-white shadow-lg'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>

                {/* Slide Counter */}
                <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                  {currentSlide + 1} / {dashboardSlides.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose InsureBrain Section */}
      <section className="py-20 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose InsureBrain?</h2>
            <p className="text-xl text-gray-600">Enterprise-grade insurance recommendations powered by artificial intelligence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Recommendations</h3>
              <p className="text-gray-600">Get AI-powered insurance recommendations in seconds, not hours</p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Data-Driven Insights</h3>
              <p className="text-gray-600">Analyze client profiles and match them with optimal coverage</p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-Product Support</h3>
              <p className="text-gray-600">Life, Health, Auto, Home, Business, and Group Insurance coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, streamlined process to find the perfect insurance for your clients</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Client Profile</h3>
              <p className="text-gray-600 text-sm">Input client information and needs</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm">Our AI analyzes coverage requirements</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Recommendations</h3>
              <p className="text-gray-600 text-sm">Get personalized policy suggestions</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Close Deal</h3>
              <p className="text-gray-600 text-sm">Complete the sale with confidence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Professionals Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Insurance Professionals</h2>
            <p className="text-xl text-gray-600">InsureBrain is built with enterprise-grade security and compliance standards</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <p className="text-gray-600">Active Users</p>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <p className="text-gray-600">Policies Recommended</p>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">94%</div>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Transform Your Insurance Business?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of insurance professionals using InsureBrain to close more deals faster</p>
          
          <Button
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium"
          >
            Start Free Trial
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <InsureBrainLogo size="small" showTagline={true} />
              <p className="text-gray-600 text-sm mt-4">AI-Powered Insurance Solutions</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>About</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 flex justify-between items-center">
            <p className="text-sm text-gray-600">© 2024 InsureBrain. All rights reserved.</p>
            <div className="flex space-x-4 text-sm text-gray-600">
              <span>Twitter</span>
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;