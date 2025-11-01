import React from 'react';
import { Shield } from 'lucide-react';

const InsureBrainLogo = ({ size = 'default', showTagline = true, className = '' }) => {
  const sizes = {
    small: { container: 'h-8', icon: 'w-8 h-8', shield: 'w-4 h-4', text: 'text-lg', tagline: 'text-xs' },
    default: { container: 'h-12', icon: 'w-10 h-10', shield: 'w-5 h-5', text: 'text-2xl', tagline: 'text-sm' },
    large: { container: 'h-16', icon: 'w-12 h-12', shield: 'w-6 h-6', text: 'text-3xl', tagline: 'text-base' }
  };

  const sizeConfig = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Rounded square logo with shield icon matching the design */}
        <div className={`${sizeConfig.icon} rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center shadow-sm`}>
          <Shield className={`${sizeConfig.shield} text-white`} />
        </div>
      </div>
      <div>
        <h1 className={`${sizeConfig.text} font-bold text-violet-700`}>
          InsureBrain
        </h1>
        {showTagline && (
          <p className={`${sizeConfig.tagline} text-gray-600`}>
            AI-Powered Insurance Solutions
          </p>
        )}
      </div>
    </div>
  );
};

export default InsureBrainLogo;