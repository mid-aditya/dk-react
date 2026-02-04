import React from 'react';
import WorkspaceLayout from '../../components/WorkspaceLayout';

const AgentProductivity: React.FC = () => {
  return (
    <WorkspaceLayout>
      <div className="w-full h-full overflow-y-auto bg-[var(--bg-primary)] p-6">
        <div className="bg-[var(--bg-secondary)] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            Agent Productivity
          </h2>
          <p className="text-[var(--text-secondary)]">
            Agent productivity metrics and analytics will be displayed here.
          </p>
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default AgentProductivity;

