import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Loader2, Shield, User, DollarSign, Calendar, TrendingUp } from 'lucide-react';

const StartChat = ({ insuranceType = 'life', onShowResults }) => {
  const [formData, setFormData] = useState({
    prospectName: '',
    age: '30',
    lifeAssuredName: '',
    premiumPayingTerm: '10',
    policyTerm: '15',
    maturityAge: '55',
    basicSumAssured: '300000',
    premiumMode: 'yearly',
    gender: 'male',
    budget: '35000',
    requirement: '',
    // Enhanced fields for scoring algorithm
    smoker: false,
    annual_income: '600000',
    cover_multiplier: '10',
    use_fixed_amount: true,
    need_loan_feature: false,
    need_riders: [],
    liquidity_preference: 'medium',
    payout_preference: 'lump-sum',
    risk_profile: 'moderate'
  });
  
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        prospectName: formData.prospectName,
        age: formData.age,
        lifeAssuredName: formData.lifeAssuredName,
        premiumPayingTerm: formData.premiumPayingTerm,
        policyTerm: formData.policyTerm,
        maturityAge: formData.maturityAge,
        basicSumAssured: formData.basicSumAssured,
        premiumMode: formData.premiumMode,
        gender: formData.gender,
        budget: formData.budget,
        requirement: formData.requirement,
        // Enhanced fields for scoring
        smoker: formData.smoker,
        annual_income: formData.annual_income,
        cover_multiplier: formData.cover_multiplier,
        use_fixed_amount: formData.use_fixed_amount,
        need_loan_feature: formData.need_loan_feature,
        need_riders: JSON.stringify(formData.need_riders),
        liquidity_preference: formData.liquidity_preference,
        payout_preference: formData.payout_preference,
        risk_profile: formData.risk_profile,
        insurance_type: insuranceType
      });

      const apiEndpoint = insuranceType === 'life' ? 'life/recommendations' : 'recommendations';
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${apiEndpoint}?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Navigate to results screen instead of showing inline
        if (onShowResults) {
          onShowResults({
            results: data.results,
            session: data.session,
            userRequirements: formData,
            insuranceType: insuranceType,
            meta: data.meta
          });
        }
      } else {
        console.error('Failed to fetch recommendations');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getRecommendations();
  };

  const getInsuranceTypeInfo = () => {
    switch (insuranceType) {
      case 'life':
        return {
          title: 'Life Insurance Consultation',
          description: 'Protect your client\'s family\'s financial future with comprehensive life coverage',
          icon: Shield,
          bgColor: 'bg-blue-500'
        };
      case 'health':
        return {
          title: 'Health Insurance Consultation',
          description: 'Comprehensive medical coverage for your client and their loved ones',
          icon: Shield,
          bgColor: 'bg-pink-500'
        };
      case 'auto':
        return {
          title: 'Auto Insurance Consultation',
          description: 'Complete protection for your client\'s vehicles and driving peace of mind',
          icon: Shield,
          bgColor: 'bg-orange-500'
        };
      default:
        return {
          title: 'Insurance Consultation',
          description: 'Help your client find the perfect insurance policy',
          icon: Shield,
          bgColor: 'bg-blue-500'
        };
    }
  };

  const typeInfo = getInsuranceTypeInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                <typeInfo.icon className="h-4 w-4" />
                CONSULTATION
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
            {typeInfo.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {typeInfo.description}. Enter your client's details below and our AI will analyze and recommend the most suitable insurance products from top insurers.
          </p>
        </div>

        {/* Form Card */}
        <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className={`h-24 ${typeInfo.bgColor} relative`}>
            <div className="absolute bottom-4 left-6">
              <typeInfo.icon className="h-8 w-8 text-white" />
            </div>
            <div className="absolute bottom-4 right-6">
              <span className="bg-white text-gray-600 text-sm font-medium px-3 py-1 rounded-full">
                AI-POWERED RECOMMENDATIONS
              </span>
            </div>
          </div>
          <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  <p className="text-sm text-gray-600">Basic client details and demographics</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="prospectName" className="text-gray-700 font-medium">Name of Prospect/Policyholder *</Label>
                  <Input
                    id="prospectName"
                    name="prospectName"
                    value={formData.prospectName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter full name"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-gray-700 font-medium">Age *</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="18"
                    max="80"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lifeAssuredName" className="text-gray-700 font-medium">Name of Life Assured</Label>
                  <Input
                    id="lifeAssuredName"
                    name="lifeAssuredName"
                    value={formData.lifeAssuredName}
                    onChange={handleInputChange}
                    placeholder="Same as prospect or different"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-gray-700 font-medium">Gender</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Policy Details Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Policy Details</h3>
                  <p className="text-sm text-gray-600">Coverage terms and payment structure</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="premiumPayingTerm" className="text-gray-700 font-medium">Premium Paying Term</Label>
                  <Input
                    id="premiumPayingTerm"
                    name="premiumPayingTerm"
                    type="number"
                    value={formData.premiumPayingTerm}
                    onChange={handleInputChange}
                    min="1"
                    max="50"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="policyTerm" className="text-gray-700 font-medium">Policy Term</Label>
                  <Input
                    id="policyTerm"
                    name="policyTerm"
                    type="number"
                    value={formData.policyTerm}
                    onChange={handleInputChange}
                    min="1"
                    max="60"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maturityAge" className="text-gray-700 font-medium">Maturity Age</Label>
                  <Input
                    id="maturityAge"
                    name="maturityAge"
                    type="number"
                    value={formData.maturityAge}
                    onChange={handleInputChange}
                    min="30"
                    max="100"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Financial Information Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Financial Information</h3>
                  <p className="text-sm text-gray-600">Coverage amounts and payment preferences</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="basicSumAssured" className="text-gray-700 font-medium">Basic Sum Assured *</Label>
                  <Input
                    id="basicSumAssured"
                    name="basicSumAssured"
                    type="number"
                    value={formData.basicSumAssured}
                    onChange={handleInputChange}
                    required
                    placeholder="300000"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="premiumMode" className="text-gray-700 font-medium">Premium Mode</Label>
                  <select
                    id="premiumMode"
                    name="premiumMode"
                    value={formData.premiumMode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="yearly">Yearly</option>
                    <option value="half-yearly">Half-Yearly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-gray-700 font-medium">Annual Budget</Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="35000"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annual_income" className="text-gray-700 font-medium">Annual Income</Label>
                  <Input
                    id="annual_income"
                    name="annual_income"
                    type="number"
                    value={formData.annual_income}
                    onChange={handleInputChange}
                    placeholder="600000"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Preferences Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Advanced Preferences</h3>
                  <p className="text-sm text-gray-600">Risk profile and coverage customization</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="cover_multiplier" className="text-gray-700 font-medium">Coverage Multiple</Label>
                  <select
                    id="cover_multiplier"
                    name="cover_multiplier"
                    value={formData.cover_multiplier}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="5">5x Annual Income</option>
                    <option value="10">10x Annual Income</option>
                    <option value="15">15x Annual Income</option>
                    <option value="20">20x Annual Income</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smoker" className="text-gray-700 font-medium">Smoking Status</Label>
                  <select
                    id="smoker"
                    name="smoker"
                    value={formData.smoker}
                    onChange={(e) => setFormData(prev => ({...prev, smoker: e.target.value === 'true'}))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="false">Non-Smoker</option>
                    <option value="true">Smoker</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liquidity_preference" className="text-gray-700 font-medium">Liquidity Preference</Label>
                  <select
                    id="liquidity_preference"
                    name="liquidity_preference"
                    value={formData.liquidity_preference}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="risk_profile" className="text-gray-700 font-medium">Risk Profile</Label>
                  <select
                    id="risk_profile"
                    name="risk_profile"
                    value={formData.risk_profile}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="conservative">Conservative</option>
                    <option value="moderate">Moderate</option>
                    <option value="growth">Growth</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payout_preference" className="text-gray-700 font-medium">Payout Preference</Label>
                  <select
                    id="payout_preference"
                    name="payout_preference"
                    value={formData.payout_preference}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="lump-sum">Lump Sum</option>
                    <option value="income">Income Stream</option>
                    <option value="instalments">Instalments</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="need_loan_feature" className="text-gray-700 font-medium">Loan Facility Required</Label>
                  <select
                    id="need_loan_feature"
                    name="need_loan_feature"
                    value={formData.need_loan_feature}
                    onChange={(e) => setFormData(prev => ({...prev, need_loan_feature: e.target.value === 'true'}))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="false">Not Required</option>
                    <option value="true">Required</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-gray-700 font-medium">Riders Required</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['TPD', 'ADB', 'Waiver', 'Critical Illness', 'Term Rider'].map((rider) => (
                    <label key={rider} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.need_riders.includes(rider)}
                        onChange={(e) => {
                          const newRiders = e.target.checked
                            ? [...formData.need_riders, rider]
                            : formData.need_riders.filter(r => r !== rider);
                          setFormData(prev => ({...prev, need_riders: newRiders}));
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{rider}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Requirements Section */}
            <div>
              <div className="space-y-3">
                <Label htmlFor="requirement" className="text-gray-700 font-medium">Additional Requirements</Label>
                <Textarea
                  id="requirement"
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleInputChange}
                  placeholder="Describe client's specific needs, coverage preferences, or any special requirements..."
                  className="min-h-[100px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 text-lg" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    InsureBrain AI is analyzing policies from multiple insurers...
                  </>
                ) : (
                  <>
                    <Shield className="mr-3 h-5 w-5" />
                    Get AI-Powered Recommendations →
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card className="bg-white border border-gray-200 rounded-xl mt-8">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Your Client's Profile</h3>
                  <p className="text-gray-600">
                    InsureBrain AI is analyzing policies from multiple top insurers to find the perfect match...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pro Tip Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Pro Tip</h4>
              <p className="text-gray-700">
                Our AI considers over 50+ factors including age, income, risk profile, and coverage preferences to recommend the most suitable policies from 15+ top insurers. Complete all sections for the most accurate recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartChat;