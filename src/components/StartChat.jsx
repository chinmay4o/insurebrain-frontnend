import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Loader2,
  Shield,
  User,
  DollarSign,
  Calendar,
  TrendingUp,
} from "lucide-react";

const StartChat = ({ insuranceType = "life", onShowResults }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    prospectName: "",
    age: "30",
    lifeAssuredName: "",
    premiumPayingTerm: "10",
    policyTerm: "15",
    maturityAge: "55",
    basicSumAssured: "300000",
    premiumMode: "yearly",
    gender: "male",
    budget: "35000",
    requirement: "",
    // Enhanced fields for scoring algorithm
    smoker: false,
    annual_income: "600000",
    cover_multiplier: "10",
    use_fixed_amount: true,
    need_loan_feature: false,
    need_riders: [],
    liquidity_preference: "medium",
    payout_preference: "lump-sum",
    risk_profile: "moderate",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
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
        insurance_type: insuranceType,
      });

      const apiEndpoint =
        insuranceType === "life" ? "life/recommendations" : "recommendations";
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/${apiEndpoint}?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Navigate to results screen instead of showing inline
        if (onShowResults) {
          onShowResults({
            results: data.results,
            session: data.session,
            userRequirements: formData,
            insuranceType: insuranceType,
            meta: data.meta,
          });
        }
      } else {
        console.error("Failed to fetch recommendations");
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
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
      case "life":
        return {
          title: "Life Insurance Consultation",
          description:
            "Protect your client's family's financial future with comprehensive life coverage",
          icon: Shield,
          bgColor: "bg-blue-500",
        };
      case "health":
        return {
          title: "Health Insurance Consultation",
          description:
            "Comprehensive medical coverage for your client and their loved ones",
          icon: Shield,
          bgColor: "bg-pink-500",
        };
      case "auto":
        return {
          title: "Auto Insurance Consultation",
          description:
            "Complete protection for your client's vehicles and driving peace of mind",
          icon: Shield,
          bgColor: "bg-orange-500",
        };
      default:
        return {
          title: "Insurance Consultation",
          description: "Help your client find the perfect insurance policy",
          icon: Shield,
          bgColor: "bg-blue-500",
        };
    }
  };

  const typeInfo = getInsuranceTypeInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <nav className="flex text-sm text-gray-600">
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:text-gray-900 transition-colors cursor-pointer"
            >
              Dashboard
            </button>
            <span className="mx-2">/</span>
            <button
              onClick={() => navigate("/home")}
              className="hover:text-gray-900 transition-colors cursor-pointer"
            >
              Insurance Types
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{typeInfo.title}</span>
          </nav>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Card - Left Column */}
          <div className="lg:col-span-2">
            <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div
                className={`h-24 ${typeInfo.bgColor} relative overflow-hidden`}
              >
                {/* Premium gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20"></div>

                {/* Subtle pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}
                ></div>

                {/* Icon with premium styling */}
                <div className="absolute bottom-4 left-6">
                  <div className="p-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 shadow-lg">
                    <typeInfo.icon className="h-6 w-6 text-white drop-shadow-sm" />
                  </div>
                </div>

                {/* Premium badge with glass morphism */}
                <div className="absolute bottom-4 right-6">
                  <div className="relative">
                    <span className="bg-white/95 backdrop-blur-md text-slate-700 text-xs font-semibold px-4 py-2 rounded-full border border-white/50 shadow-xl tracking-wider">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        AI-POWERED RECOMMENDATIONS
                      </span>
                    </span>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-sm -z-10"></div>
                  </div>
                </div>

                {/* Corner accent elements */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-black/20 to-transparent"></div>
              </div>
              <CardContent className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Personal Information Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User className="h-3 w-3 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          Personal Information
                        </h3>
                        <p className="text-xs text-gray-600">
                          Basic client details and demographics
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label
                          htmlFor="prospectName"
                          className="text-gray-700 font-medium text-xs"
                        >
                          Name of Prospect/Policyholder *
                        </Label>
                        <Input
                          id="prospectName"
                          name="prospectName"
                          value={formData.prospectName}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter full name"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="age"
                          className="text-gray-700 font-medium text-xs"
                        >
                          Age *
                        </Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          value={formData.age}
                          onChange={handleInputChange}
                          required
                          min="18"
                          max="80"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="lifeAssuredName"
                          className="text-gray-700 font-medium text-xs"
                        >
                          Name of Life Assured
                        </Label>
                        <Input
                          id="lifeAssuredName"
                          name="lifeAssuredName"
                          value={formData.lifeAssuredName}
                          onChange={handleInputChange}
                          placeholder="Same as prospect or different"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="gender"
                          className="text-gray-700 font-medium text-xs"
                        >
                          Gender
                        </Label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 text-xs border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
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
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          Policy Details
                        </h3>
                        <p className="text-sm text-gray-600">
                          Coverage terms and payment structure
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1">
                        <Label
                          htmlFor="premiumPayingTerm"
                          className="text-gray-700 font-medium"
                        >
                          Premium Paying Term
                        </Label>
                        <Input
                          id="premiumPayingTerm"
                          name="premiumPayingTerm"
                          type="number"
                          value={formData.premiumPayingTerm}
                          onChange={handleInputChange}
                          min="1"
                          max="50"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="policyTerm"
                          className="text-gray-700 font-medium"
                        >
                          Policy Term
                        </Label>
                        <Input
                          id="policyTerm"
                          name="policyTerm"
                          type="number"
                          value={formData.policyTerm}
                          onChange={handleInputChange}
                          min="1"
                          max="60"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="maturityAge"
                          className="text-gray-700 font-medium"
                        >
                          Maturity Age
                        </Label>
                        <Input
                          id="maturityAge"
                          name="maturityAge"
                          type="number"
                          value={formData.maturityAge}
                          onChange={handleInputChange}
                          min="30"
                          max="100"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-8 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Financial Information Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          Financial Information
                        </h3>
                        <p className="text-sm text-gray-600">
                          Coverage amounts and payment preferences
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label
                          htmlFor="basicSumAssured"
                          className="text-gray-700 font-medium"
                        >
                          Basic Sum Assured *
                        </Label>
                        <Input
                          id="basicSumAssured"
                          name="basicSumAssured"
                          type="number"
                          value={formData.basicSumAssured}
                          onChange={handleInputChange}
                          required
                          placeholder="300000"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="premiumMode"
                          className="text-gray-700 font-medium"
                        >
                          Premium Mode
                        </Label>
                        <select
                          id="premiumMode"
                          name="premiumMode"
                          value={formData.premiumMode}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 text-xs border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="yearly">Yearly</option>
                          <option value="half-yearly">Half-Yearly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="budget"
                          className="text-gray-700 font-medium"
                        >
                          Annual Budget
                        </Label>
                        <Input
                          id="budget"
                          name="budget"
                          type="number"
                          value={formData.budget}
                          onChange={handleInputChange}
                          placeholder="35000"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="annual_income"
                          className="text-gray-700 font-medium"
                        >
                          Annual Income
                        </Label>
                        <Input
                          id="annual_income"
                          name="annual_income"
                          type="number"
                          value={formData.annual_income}
                          onChange={handleInputChange}
                          placeholder="600000"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-8 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Advanced Preferences Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          Advanced Preferences
                        </h3>
                        <p className="text-sm text-gray-600">
                          Risk profile and coverage customization
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-1">
                        <Label
                          htmlFor="cover_multiplier"
                          className="text-gray-700 font-medium"
                        >
                          Coverage Multiple
                        </Label>
                        <select
                          id="cover_multiplier"
                          name="cover_multiplier"
                          value={formData.cover_multiplier}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 text-xs border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="5">5x Annual Income</option>
                          <option value="10">10x Annual Income</option>
                          <option value="15">15x Annual Income</option>
                          <option value="20">20x Annual Income</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="smoker"
                          className="text-gray-700 font-medium"
                        >
                          Smoking Status
                        </Label>
                        <select
                          id="smoker"
                          name="smoker"
                          value={formData.smoker}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              smoker: e.target.value === "true",
                            }))
                          }
                          className="w-full px-2 py-1 text-xs border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="false">Non-Smoker</option>
                          <option value="true">Smoker</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="liquidity_preference"
                          className="text-gray-700 font-medium"
                        >
                          Liquidity Preference
                        </Label>
                        <select
                          id="liquidity_preference"
                          name="liquidity_preference"
                          value={formData.liquidity_preference}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 text-xs border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="risk_profile"
                          className="text-gray-700 font-medium"
                        >
                          Risk Profile
                        </Label>
                        <select
                          id="risk_profile"
                          name="risk_profile"
                          value={formData.risk_profile}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 text-xs border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="conservative">Conservative</option>
                          <option value="moderate">Moderate</option>
                          <option value="growth">Growth</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="payout_preference"
                          className="text-gray-700 font-medium"
                        >
                          Payout Preference
                        </Label>
                        <select
                          id="payout_preference"
                          name="payout_preference"
                          value={formData.payout_preference}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 text-xs border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="lump-sum">Lump Sum</option>
                          <option value="income">Income Stream</option>
                          <option value="instalments">Instalments</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="need_loan_feature"
                          className="text-gray-700 font-medium"
                        >
                          Loan Facility Required
                        </Label>
                        <select
                          id="need_loan_feature"
                          name="need_loan_feature"
                          value={formData.need_loan_feature}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              need_loan_feature: e.target.value === "true",
                            }))
                          }
                          className="w-full px-2 py-1 text-xs border border-gray-300 bg-white rounded-md focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="false">Not Required</option>
                          <option value="true">Required</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-gray-700 font-medium">
                        Riders Required
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          "TPD",
                          "ADB",
                          "Waiver",
                          "Critical Illness",
                          "Term Rider",
                        ].map((rider) => (
                          <label
                            key={rider}
                            className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                          >
                            <input
                              type="checkbox"
                              checked={formData.need_riders.includes(rider)}
                              onChange={(e) => {
                                const newRiders = e.target.checked
                                  ? [...formData.need_riders, rider]
                                  : formData.need_riders.filter(
                                      (r) => r !== rider
                                    );
                                setFormData((prev) => ({
                                  ...prev,
                                  need_riders: newRiders,
                                }));
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-xs text-gray-700">
                              {rider}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Requirements Section */}
                  <div>
                    <div className="space-y-3">
                      <Label
                        htmlFor="requirement"
                        className="text-gray-700 font-medium"
                      >
                        Additional Requirements
                      </Label>
                      <Textarea
                        id="requirement"
                        name="requirement"
                        value={formData.requirement}
                        onChange={handleInputChange}
                        placeholder="Describe client's specific needs, coverage preferences, or any special requirements..."
                        className="min-h-[60px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <Button
                      type="submit"
                      className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 text-white font-semibold py-3 text-sm tracking-wide border-0 shadow-2xl transition-all duration-300 hover:shadow-blue-500/30 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                      disabled={loading}
                    >
                      {/* Premium gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-50"></div>

                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                      <div className="relative z-10 flex items-center justify-center">
                        {loading ? (
                          <>
                            <div className="mr-2 p-1 rounded-full bg-white/20 backdrop-blur-sm">
                              <Loader2 className="h-4 w-4 animate-spin drop-shadow-sm" />
                            </div>
                            <span className="drop-shadow-sm font-medium">
                              InsureBrain AI is analyzing policies from multiple
                              insurers...
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="mr-2 p-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                              <Shield className="h-4 w-4 drop-shadow-sm" />
                            </div>
                            <span className="drop-shadow-sm">
                              Get AI-Powered Recommendations
                            </span>
                            <span className="ml-2 text-white/90 font-light">
                              →
                            </span>
                          </>
                        )}
                      </div>

                      {/* Bottom highlight */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tips and Info */}
          <div className="lg:col-span-1">
            <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/60 rounded-xl p-6 overflow-hidden shadow-xl">
              {/* Premium background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent"></div>
              
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-5" 
                   style={{
                     backgroundImage: `radial-gradient(circle at 30% 30%, blue 1px, transparent 1px), radial-gradient(circle at 70% 70%, indigo 1px, transparent 1px)`,
                     backgroundSize: '20px 20px'
                   }}>
              </div>
              
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-xl"></div>
              
              <div className="relative z-10 flex items-start gap-4">
                <div className="flex-shrink-0">
                  {/* Premium icon container */}
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg border border-white/30">
                      <Shield className="h-5 w-5 text-white drop-shadow-sm" />
                    </div>
                    {/* Subtle glow */}
                    <div className="absolute inset-0 bg-blue-400/20 rounded-xl blur-sm -z-10"></div>
                  </div>
                </div>
                <div>
                  {/* Premium typography */}
                  <h4 className="font-semibold text-gray-900 mb-3 tracking-wide">
                    <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                      Pro Tip
                    </span>
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Our AI considers over <span className="font-semibold text-blue-700">50+ factors</span> including age, income,
                    risk profile, and coverage preferences to recommend the most
                    suitable policies from <span className="font-semibold text-indigo-700">15+ top insurers</span>. Complete all
                    sections for the most accurate recommendations.
                  </p>
                  
                  {/* Premium feature highlights */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm"></div>
                      <span className="text-xs text-gray-600 font-medium">Real-time policy analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-sm"></div>
                      <span className="text-xs text-gray-600 font-medium">Personalized recommendations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm"></div>
                      <span className="text-xs text-gray-600 font-medium">Instant premium calculations</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom shine */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <Card className="bg-white border border-gray-200 rounded-xl mt-8">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Analyzing Your Client's Profile
                  </h3>
                  <p className="text-gray-600">
                    InsureBrain AI is analyzing policies from multiple top
                    insurers to find the perfect match...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StartChat;
