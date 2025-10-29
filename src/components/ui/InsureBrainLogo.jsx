import React from 'react';

const InsureBrainLogo = ({ size = 'default', showTagline = true, className = '' }) => {
  const sizes = {
    small: { container: 'h-8', icon: 'w-6 h-6', text: 'text-lg', tagline: 'text-xs' },
    default: { container: 'h-12', icon: 'w-8 h-8', text: 'text-2xl', tagline: 'text-sm' },
    large: { container: 'h-16', icon: 'w-12 h-12', text: 'text-3xl', tagline: 'text-base' }
  };

  const sizeConfig = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Simple circular logo with IB text */}
        <div className={`${sizeConfig.container} aspect-square rounded-full bg-primary flex items-center justify-center`}>
          <span className={`font-bold text-white ${size === 'small' ? 'text-sm' : size === 'large' ? 'text-xl' : 'text-base'}`}>
            IB
          </span>
        </div>
      </div>
      <div>
        <h1 className={`${sizeConfig.text} font-bold text-gray-900`}>
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