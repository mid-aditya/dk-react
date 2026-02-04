import React from 'react';

export interface JourneyStep {
  id: string;
  label: string;
  icon?: string; // Can be icon class (e.g., 'bx bx-user') or image path (e.g., '/assets/icons/whatsapp.svg')
  iconType?: 'class' | 'image'; // 'class' for icon classes, 'image' for image paths
  isActive?: boolean;
  isCompleted?: boolean;
  tooltip?: string;
}

export interface JourneyProps {
  steps: JourneyStep[];
  className?: string;
}

const Journey: React.FC<JourneyProps> = ({ steps, className = '' }) => {
  return (
    <div className={`flex items-start relative py-2 gap-0 w-full ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = step.isCompleted;
        const isActive = step.isActive;
        const prevStepCompleted = index > 0 && (steps[index - 1].isCompleted || steps[index - 1].isActive);
        
        return (
          <React.Fragment key={step.id}>
            {index > 0 && (
              <div 
                className={`h-0.5 z-[1] transition-all duration-300 flex-1 mt-[15px] ${
                  prevStepCompleted 
                    ? 'bg-[var(--brand-primary)]' 
                    : 'bg-[var(--border-color)]'
                }`}
              ></div>
            )}
            <div className={`relative flex flex-col items-center flex-1 z-[2] min-w-0 ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm text-[var(--text-secondary)] transition-all duration-300 relative cursor-pointer z-[2] ${
                isCompleted || isActive
                  ? 'bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white'
                  : 'bg-[var(--bg-tertiary)] border-[var(--border-color)]'
              } ${isActive ? 'scale-110 shadow-[0_0_0_4px_var(--brand-alpha)]' : ''}`}>
                {step.icon ? (
                  step.iconType === 'image' || step.icon.startsWith('/') || step.icon.startsWith('http') ? (
                    <img src={step.icon} alt={step.label} className="w-5 h-5 object-contain" />
                  ) : (
                    <i className={`${step.icon} text-lg`}></i>
                  )
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className={`mt-1 text-[10px] text-[var(--text-secondary)] text-center font-medium transition-all duration-300 leading-tight ${
                isCompleted || isActive
                  ? 'text-[var(--text-primary)] font-semibold'
                  : ''
              }`}>{step.label}</div>
              {step.tooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg py-2 px-3 text-[11px] text-[var(--text-primary)] whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-200 shadow-[0_4px_12px_var(--shadow)] z-[100] after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[var(--bg-secondary)] group-hover:opacity-100 group-hover:pointer-events-auto">
                  {step.tooltip}
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Journey;

