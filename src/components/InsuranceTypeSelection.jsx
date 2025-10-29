import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Shield, Heart, Car, Home, Briefcase, Users, LogOut, TrendingUp } from 'lucide-react';
import InsureBrainLogo from './ui/InsureBrainLogo';
import { useAuth } from '../contexts/AuthContext';

const InsuranceTypeSelection = ({ onSelectType }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSelectType = (type) => {
    if (onSelectType) {
      onSelectType(type);
    } else {
      // Direct navigation when used as standalone component
      if (type === 'life') {
        navigate('/insurance/life');
      } else if (type === 'health') {
        navigate('/insurance/health');
      } else if (type === 'auto') {
        navigate('/insurance/auto');
      }
    }
  };

  const insuranceTypes = [
    {
      type: 'life',
      title: 'Life Insurance',
      description: 'Protect your family\'s financial future with comprehensive life coverage',
      icon: Shield,
      bgColor: 'bg-blue-500',
      maxCoverage: '$500K+',
      activeClients: '12.5K',
      available: true,
      comingSoon: false
    },
    {
      type: 'health',
      title: 'Health Insurance', 
      description: 'Comprehensive medical coverage for you and your loved ones',
      icon: Heart,
      bgColor: 'bg-pink-500',
      maxCoverage: '$1M+',
      activeClients: '8.2K',
      available: false,
      comingSoon: true
    },
    {
      type: 'auto',
      title: 'Auto Insurance',
      description: 'Complete protection for your vehicles and driving peace of mind',
      icon: Car,
      bgColor: 'bg-orange-500',
      maxCoverage: '$250K+',
      activeClients: '15.8K',
      available: false,
      comingSoon: true
    },
    {
      type: 'home',
      title: 'Home Insurance',
      description: 'Safeguard your home and belongings against unexpected events',
      icon: Home,
      bgColor: 'bg-green-500',
      maxCoverage: '$750K+',
      activeClients: '9.3K',
      available: false,
      comingSoon: true
    },
    {
      type: 'business',
      title: 'Business Insurance',
      description: 'Protect your business operations and commercial interests',
      icon: Briefcase,
      bgColor: 'bg-orange-600',
      maxCoverage: '$2M+',
      activeClients: '5.1K',
      available: false,
      comingSoon: true
    },
    {
      type: 'group',
      title: 'Group Insurance',
      description: 'Employee benefits and group coverage solutions',
      icon: Users,
      bgColor: 'bg-primary',
      maxCoverage: '$5M+',
      activeClients: '3.7K',
      available: false,
      comingSoon: true
    }
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <InsureBrainLogo size="default" />
            {!onSelectType && (
              <Button
                variant="ghost"
                onClick={logout}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            INSURANCE PRODUCTS
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Select Insurance Type
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Choose the type of insurance you'd like to recommend to your clients. Our AI analyzes client profiles 
            and recommends the most suitable insurance products from top insurers.
          </p>
        </div>

        {/* Insurance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {insuranceTypes.map((insurance) => {
            const IconComponent = insurance.icon;
            
            return (
              <Card 
                key={insurance.type}
                className={`relative bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg ${
                  insurance.available ? 'cursor-pointer hover:border-gray-300' : 'cursor-default'
                }`}
                onClick={() => insurance.available && handleSelectType(insurance.type)}
              >
                {/* Colored header */}
                <div className={`h-24 ${insurance.bgColor} relative`}>
                  {insurance.comingSoon && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-white text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                        COMING SOON
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {insurance.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {insurance.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        MAX COVERAGE
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {insurance.maxCoverage}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        ACTIVE CLIENTS
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {insurance.activeClients}
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  {insurance.available ? (
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectType(insurance.type);
                      }}
                    >
                      Get Started →
                    </Button>
                  ) : (
                    <Button 
                      disabled
                      className="w-full bg-gray-100 text-gray-500 font-medium py-2.5 cursor-not-allowed"
                    >
                      Coming Soon
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Pro Tip Section */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Pro Tip</h4>
              <p className="text-gray-700">
                Our AI analyzes client profiles and recommends the most suitable insurance products. Start with Life Insurance to explore our full capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceTypeSelection;