import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  TrendingUp, Shield, IndianRupee, Eye, ArrowLeft, User, Heart, Car, 
  Filter, ChevronDown, ChevronUp, Check, X, Clock, CreditCard,
  Calculator, Gift, Umbrella, BadgeCheck, PiggyBank, FileText, Calendar
} from 'lucide-react';
import PolicyBreakdownDrawer from './PolicyBreakdownDrawer';

// Circular Progress Component
const CircularProgress = ({ percentage, size = 80 }) => {
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="6"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(258 69% 42%)"
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-primary">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};

const RecommendationResults = ({ data, onBack }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(true);

  // Get data from props or location state
  const resultData = data || location.state?.data;
  const selectedInsuranceType = location.state?.selectedInsuranceType;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Navigate back based on insurance type
      if (selectedInsuranceType === 'life') {
        navigate('/insurance/life');
      } else if (selectedInsuranceType === 'health') {
        navigate('/insurance/health');
      } else if (selectedInsuranceType === 'auto') {
        navigate('/insurance/auto');
      } else {
        navigate('/');
      }
    }
  };
  const [selectedFilters, setSelectedFilters] = useState({
    policyTerm: [],
    premiumTerm: [],
    policyType: [],
    insurers: [],
    sumAssuredRange: 'all',
    premiumRange: 'all'
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const showBreakdown = (policy) => {
    setSelectedPolicy(policy);
    setDrawerOpen(true);
  };

  const getInsuranceIcon = (type) => {
    switch (type) {
      case 'health': return Heart;
      case 'life': return Shield;
      case 'automobile': return Car;
      default: return Shield;
    }
  };

  const getInsuranceTypeLabel = (type) => {
    switch (type) {
      case 'health': return 'Health Insurance';
      case 'life': return 'Life Insurance';
      case 'automobile': return 'Automobile Insurance';
      default: return 'Insurance';
    }
  };

  // Life Insurance specific feature mapping
  const getLifeCoverageHighlights = (policy) => [
    { icon: Shield, label: 'Death Benefit', value: formatCurrency(resultData.userRequirements?.basicSumAssured || 1000000) },
    { icon: TrendingUp, label: 'Guaranteed Returns', value: '4.5% p.a.' },
    { icon: Clock, label: 'Premium Payment', value: `${policy.premium_payment_terms?.[0] || 10} years` },
    { icon: Calendar, label: 'Policy Term', value: `${policy.policy_terms?.[0] || 20} years` }
  ];

  const getLifePolicyFeatures = (policy) => [
    { icon: CreditCard, label: 'Loan Facility', value: policy.loan?.allowed ? `Up to ${policy.loan.max_pct_of_surrender}%` : 'Not Available' },
    { icon: Calculator, label: 'Partial Withdrawal', value: 'After 5 years' },
    { icon: Umbrella, label: 'Riders Available', value: policy.riders?.length > 0 ? policy.riders.map(r => r.name).join(', ') : 'Basic Coverage' },
    { icon: FileText, label: 'Free Look Period', value: `${policy.free_look_days || 30} days` }
  ];

  const getLifeValueAddedFeatures = (policy) => [
    { icon: Gift, label: 'Tax Benefits', value: 'u/s 80C & 10(10D)' },
    { icon: PiggyBank, label: 'Surrender Value', value: 'Guaranteed' },
    { icon: BadgeCheck, label: 'Life Cover Continuance', value: '1 year' },
    { icon: Shield, label: 'Premium Waiver', value: 'On TPD/Critical Illness' }
  ];

  if (!resultData || !resultData.results) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Form
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="text-muted-foreground">No recommendations available.</p>
        </div>
      </div>
    );
  }

  const Icon = getInsuranceIcon(resultData.insuranceType);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background">
      {/* Left Sidebar - Filters */}
      <div className={`${filtersOpen ? 'lg:w-80 w-full' : 'lg:w-16 w-full lg:h-auto h-16'} transition-all duration-300 lg:border-r border-b lg:border-b-0 bg-card lg:flex-shrink-0`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${!filtersOpen && 'lg:hidden'}`}>FILTERS</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {filtersOpen && (
            <div className="space-y-6">
              {/* Policy Term Filter */}
              <div>
                <h4 className="font-medium text-sm mb-3">POLICY TERM</h4>
                <div className="space-y-2">
                  {['5 Years', '10 Years', '15 Years', '20+ Years'].map((term) => (
                    <label key={term} className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>{term}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Premium Payment Term */}
              <div>
                <h4 className="font-medium text-sm mb-3">PREMIUM PAYMENT</h4>
                <div className="space-y-2">
                  {['Single Pay', 'Limited Pay', 'Regular Pay'].map((term) => (
                    <label key={term} className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>{term}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Policy Type */}
              <div>
                <h4 className="font-medium text-sm mb-3">POLICY TYPE</h4>
                <div className="space-y-2">
                  {['Term Life', 'Endowment', 'Money Back', 'ULIP'].map((type) => (
                    <label key={type} className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Insurers */}
              <div>
                <h4 className="font-medium text-sm mb-3">INSURERS</h4>
                <div className="space-y-2">
                  {['IndiaFirst Life', 'LIC of India', 'HDFC Life', 'ICICI Prudential'].map((insurer) => (
                    <label key={insurer} className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>{insurer}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto min-h-0">
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Form
              </Button>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight flex items-center gap-2">
                  <Icon className="h-8 w-8 text-primary" />
                  {getInsuranceTypeLabel(resultData.insuranceType)} Recommendations
                </h2>
                <p className="text-muted-foreground">
                  InsureBrain AI found {resultData.results.length} matching policies for {resultData.userRequirements.prospectName}
                </p>
              </div>
            </div>
            {resultData.session && (
              <div className="text-xs text-muted-foreground text-right">
                <div>Session: {resultData.session.hash}</div>
                <div>{new Date(resultData.session.timestamp).toLocaleString()}</div>
              </div>
            )}
          </div>

          {/* Client Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Client Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <p className="font-medium">{resultData.userRequirements.prospectName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Age:</span>
                  <p className="font-medium">{resultData.userRequirements.age} years</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Coverage:</span>
                  <p className="font-medium">{formatCurrency(resultData.userRequirements.basicSumAssured)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Budget:</span>
                  <p className="font-medium">{formatCurrency(resultData.userRequirements.budget)}/year</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Summary */}
          {resultData.comparative_explanation && (
            <Card className="bg-blue-50 border-blue-200 mb-6">
              <CardHeader>
                <CardTitle className="text-blue-900">InsureBrain AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800">{resultData.comparative_explanation}</p>
              </CardContent>
            </Card>
          )}

          {/* Policy Results */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Recommended Policies</h3>
            
            {resultData.results.map((policy, index) => (
              <Card key={policy.id} className="relative overflow-hidden">
                {/* Policy Header */}
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs bg-secondary px-2 py-1 rounded font-medium">
                          {policy.insurer}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                          #{index + 1} BEST MATCH
                        </span>
                      </div>
                      <CardTitle className="text-xl mb-2">{policy.name}</CardTitle>
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <span className="text-muted-foreground">Coverage Amount</span>
                          <p className="font-bold text-lg">{formatCurrency(resultData.userRequirements.basicSumAssured)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Annual Premium</span>
                          <p className="font-bold text-lg text-primary">{formatCurrency(policy.price?.totalPremiumToPay || 0)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <CircularProgress percentage={policy.match_percentage} />
                    </div>
                  </div>
                </CardHeader>

                {/* Three Column Feature Layout */}
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x divide-y lg:divide-y-0">
                    {/* Column 1: Coverage Highlights */}
                    <div className="p-4 lg:p-6 bg-green-50/50">
                      <h4 className="font-semibold text-sm mb-4 text-green-800 flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4" />
                        COVERAGE HIGHLIGHTS
                      </h4>
                      <div className="space-y-3">
                        {getLifeCoverageHighlights(policy).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <item.icon className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <div className="text-xs">
                              <div className="font-medium">{item.label}</div>
                              <div className="text-muted-foreground">{item.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Important Features */}
                    <div className="p-4 lg:p-6 bg-blue-50/50">
                      <h4 className="font-semibold text-sm mb-4 text-blue-800 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        IMPORTANT FEATURES
                      </h4>
                      <div className="space-y-3">
                        {getLifePolicyFeatures(policy).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <item.icon className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            <div className="text-xs">
                              <div className="font-medium">{item.label}</div>
                              <div className="text-muted-foreground">{item.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: Value Added Features */}
                    <div className="p-4 lg:p-6 bg-purple-50/50">
                      <h4 className="font-semibold text-sm mb-4 text-purple-800 flex items-center gap-2">
                        <Gift className="h-4 w-4" />
                        VALUE ADDED FEATURES
                      </h4>
                      <div className="space-y-3">
                        {getLifeValueAddedFeatures(policy).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <item.icon className="h-4 w-4 text-purple-600 flex-shrink-0" />
                            <div className="text-xs">
                              <div className="font-medium">{item.label}</div>
                              <div className="text-muted-foreground">{item.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI Explanation Section */}
                  {policy.ai_explanation && (
                    <div className="p-6 bg-gray-50 border-t">
                      <h4 className="font-medium text-sm mb-2">Why this policy suits you:</h4>
                      <p className="text-sm text-gray-700">{policy.ai_explanation}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="p-6 border-t bg-gray-50/50">
                    <div className="flex gap-3">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => showBreakdown(policy)}
                      >
                        <Eye className="h-3 w-3 mr-2" />
                        DETAILS
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        COMPARE
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        SELECT POLICY
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Session Info */}
          {resultData.session && (
            <Card className="bg-muted/50 mt-6">
              <CardContent className="py-3">
                <div className="text-xs text-muted-foreground text-center">
                  Session logged — SHA256: {resultData.session.hash} | Agent: {resultData.session.agent}
                  {resultData.meta && (
                    <span className="ml-2">| Platform: {resultData.meta.platform} | Evaluated {resultData.meta.total_policies_evaluated} policies</span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Policy Breakdown Drawer */}
      <PolicyBreakdownDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        policy={selectedPolicy}
        sumAssured={resultData.userRequirements?.basicSumAssured}
      />
    </div>
  );
};

export default RecommendationResults;