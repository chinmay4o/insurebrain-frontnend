import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import InsuranceTypeSelection from './InsuranceTypeSelection';
import StartChat from './StartChat';
import MySessions from './MySessions';
import RecommendationResults from './RecommendationResults';
import InsureBrainLogo from './ui/InsureBrainLogo';
import { 
  Home, 
  Shield, 
  History, 
  LogOut,
  User
} from 'lucide-react';

const Dashboard = ({ activeRoute }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedInsuranceType, setSelectedInsuranceType] = useState(null);
  const [recommendationData, setRecommendationData] = useState(null);
  const [policyStats, setPolicyStats] = useState({ activePolicies: '...' });

  // Determine active tab from route or prop
  const getActiveTabFromRoute = () => {
    if (activeRoute) return activeRoute;
    
    const path = location.pathname;
    if (path === '/dashboard') return 'dashboard';
    if (path === '/sessions') return 'my-sessions';
    if (path === '/insurance/life') return 'life-insurance';
    if (path === '/insurance/health') return 'health-insurance';
    if (path === '/insurance/auto') return 'automobile-insurance';
    if (path === '/results') return 'recommendation-results';
    
    return 'dashboard';
  };

  const activeTab = getActiveTabFromRoute();

  useEffect(() => {
    fetchPolicyStats();
  }, []);

  const fetchPolicyStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPolicyStats(data);
      }
    } catch (error) {
      console.error('Error fetching policy stats:', error);
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'insurance-types', label: 'Insurance Types', icon: Shield, path: '/home' },
    { id: 'my-sessions', label: 'My Sessions', icon: History, path: '/sessions' },
  ];

  const handleInsuranceTypeSelect = (type) => {
    setSelectedInsuranceType(type);
    setRecommendationData(null); // Clear any previous results
    if (type === 'life') {
      navigate('/insurance/life');
    } else if (type === 'health') {
      navigate('/insurance/health');
    } else if (type === 'auto') {
      navigate('/insurance/auto');
    }
  };

  const handleShowResults = (data) => {
    setRecommendationData(data);
    navigate('/results', { state: { data, selectedInsuranceType } });
  };

  const handleBackToForm = () => {
    setRecommendationData(null);
    // Go back to the appropriate insurance form
    if (selectedInsuranceType === 'life') {
      navigate('/insurance/life');
    } else if (selectedInsuranceType === 'health') {
      navigate('/insurance/health');
    } else if (selectedInsuranceType === 'auto') {
      navigate('/insurance/auto');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'insurance-types':
        return <InsuranceTypeSelection onSelectType={handleInsuranceTypeSelect} />;
      case 'life-insurance':
        return <StartChat insuranceType="life" onShowResults={handleShowResults} />;
      case 'health-insurance':
        return <StartChat insuranceType="health" onShowResults={handleShowResults} />;
      case 'automobile-insurance':
        return <StartChat insuranceType="automobile" onShowResults={handleShowResults} />;
      case 'recommendation-results':
        return <RecommendationResults data={recommendationData} onBack={handleBackToForm} />;
      case 'my-sessions':
        return <MySessions />;
      default:
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      <Home className="h-4 w-4" />
                      DASHBOARD
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Title and Description */}
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome back, {user?.name}
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl">
                  Here's an overview of your AI-powered insurance recommendations activity. Monitor your sessions, track recommendations, and help more clients find the perfect insurance coverage.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="h-20 bg-blue-500 relative">
                    <div className="absolute bottom-4 left-6">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Sessions</h3>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{policyStats.totalSessions || 0}</div>
                    <p className="text-sm text-gray-600">
                      {policyStats.totalSessions > 0 ? `${policyStats.totalSessions} completed consultations` : 'Start your first consultation'}
                    </p>
                  </div>
                </Card>

                <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="h-20 bg-green-500 relative">
                    <div className="absolute bottom-4 left-6">
                      <History className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Recommendations</h3>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{policyStats.totalRecommendations || 0}</div>
                    <p className="text-sm text-gray-600">
                      {policyStats.totalRecommendations > 0 ? `Given across ${policyStats.totalSessions || 0} sessions` : 'No recommendations yet'}
                    </p>
                  </div>
                </Card>

                <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="h-20 bg-orange-500 relative">
                    <div className="absolute bottom-4 left-6">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Avg. Session Time</h3>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{policyStats.avgSessionTime || '5m'}</div>
                    <p className="text-sm text-gray-600">
                      {policyStats.avgSessionTime && policyStats.avgSessionTime !== '--' ? 'Average consultation duration' : 'Efficient AI-powered process'}
                    </p>
                  </div>
                </Card>

                <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="h-20 bg-purple-500 relative">
                    <div className="absolute bottom-4 left-6">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Active Policies</h3>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{policyStats.activePolicies || '150+'}</div>
                    <p className="text-sm text-gray-600">
                      Available for recommendation
                    </p>
                  </div>
                </Card>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <Card className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Start New Consultation</h3>
                      <p className="text-gray-600">Help clients find the perfect insurance policy</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate('/home')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                  >
                    Choose Insurance Type →
                  </Button>
                </Card>

                <Card className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <History className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">View Past Sessions</h3>
                      <p className="text-gray-600">Review previous consultations and results</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/sessions')}
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3"
                  >
                    View All Sessions
                  </Button>
                </Card>
              </div>

              {/* Pro Tip Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Pro Tip</h4>
                    <p className="text-gray-700">
                      Our AI analyzes client profiles in real-time and recommends the most suitable insurance products from top-rated insurers. Start with Life Insurance to explore our full AI capabilities and help your clients secure their financial future.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  // Show insurance type selection without sidebar initially
  if (activeTab === 'insurance-types' && !selectedInsuranceType) {
    return (
      <div className="min-h-screen bg-background">
        {/* Top-right logout button */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        {renderContent()}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <InsureBrainLogo size="small" showTagline={false} />
            <p className="text-xs text-muted-foreground mt-2">AI-Powered Insurance Platform</p>
            <p className="text-sm text-muted-foreground mt-1">{user?.name}</p>
          </div>
          
          <nav className="flex-1 space-y-1 px-3">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === item.id
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          
          <div className="p-3">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={logout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;