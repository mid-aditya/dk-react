import React from 'react';
import { Link } from 'react-router-dom';

interface NotFoundProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
}

const NotFound: React.FC<NotFoundProps> = ({
  title = '404',
  message = 'Page Not Found',
  showBackButton = true,
}) => {
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
      <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--bg-primary)]">
        <div className="text-center max-w-[500px]">
          <div className="text-[120px] text-[var(--text-tertiary)] mb-6 animate-[float_3s_ease-in-out_infinite]">
            <i className="bx bx-error-circle"></i>
          </div>
          <h1 className="text-[72px] font-bold text-[var(--text-primary)] m-0 mb-4 leading-none">{title}</h1>
          <p className="text-2xl font-semibold text-[var(--text-primary)] m-0 mb-2">{message}</p>
          <p className="text-base text-[var(--text-secondary)] m-0 mb-8 leading-normal">
            The page you're looking for doesn't exist or has been moved.
          </p>
          {showBackButton && (
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => window.history.back()}
                className="py-3 px-6 rounded-lg text-sm font-semibold cursor-pointer inline-flex items-center gap-2 no-underline transition-all duration-200 border-none bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]"
              >
                <i className="bx bx-arrow-back"></i>
                Go Back
              </button>
              <Link to="/" className="py-3 px-6 rounded-lg text-sm font-semibold cursor-pointer inline-flex items-center gap-2 no-underline transition-all duration-200 border-none bg-[var(--accent-color)] text-white hover:bg-[var(--accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(59,130,246,0.3)]">
                <i className="bx bx-home"></i>
                Go Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotFound;

