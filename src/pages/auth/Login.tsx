import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/ui/ThemeToggle';
import { authService } from '../../services/auth.service';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    if (validate()) {
      setIsLoading(true);
      try {
        const response = await authService.login(formData);
        console.log('Login success:', response);
        // Successfully logged in
        navigate('/dashboard'); // Or wherever you want to go
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.response?.status === 422) {
          // Laravel validation errors mapping
          const validationErrors = error.response.data.errors;
          const newErrors: FormErrors = {};
          
          if (validationErrors) {
            Object.keys(validationErrors).forEach((key) => {
              if (key === 'email' || key === 'password') {
                newErrors[key as keyof FormErrors] = validationErrors[key][0];
              }
            });
            setErrors(newErrors);
          }
          setApiError(error.response.data.message || 'Validation failed');
        } else {
          setApiError(
            error.response?.data?.message || 
            'Login failed. Please check your credentials.'
          );
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-5 relative">
      <div className="fixed top-6 right-6 z-[1000]">
        <ThemeToggle />
      </div>
      <div className="bg-[var(--bg-secondary)] rounded-2xl shadow-[0_4px_24px_var(--shadow)] p-12 w-full max-w-[450px] animate-[slideUp_0.5s_cubic-bezier(0.4,0,0.2,1)] border border-[var(--border-color)] transition-[var(--transition)] dark:shadow-[0_4px_24px_var(--shadow)]">
        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        <div className="text-center mb-8">
          <h1 className="text-[var(--text-primary)] text-[28px] font-bold m-0 mb-2 tracking-[-0.5px]">Welcome Back</h1>
          <p className="text-[var(--text-secondary)] text-[15px] m-0">Sign in to your account</p>
        </div>

        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium animate-pulse">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[var(--text-primary)] text-sm font-semibold tracking-[0.2px]">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`py-3.5 px-4 border-2 rounded-[10px] text-[15px] transition-[var(--transition)] outline-none bg-[var(--bg-primary)] text-[var(--text-primary)] font-inherit placeholder:text-[var(--text-tertiary)] ${
                errors.email 
                  ? 'border-[var(--error-color)] focus:shadow-[0_0_0_3px_rgba(220,53,69,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(255,107,107,0.2)]' 
                  : 'border-[var(--border-color)] focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(13,110,253,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(77,171,247,0.2)]'
              }`}
            />
            {errors.email && <span className="text-[var(--error-color)] text-[13px] -mt-1 font-medium">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[var(--text-primary)] text-sm font-semibold tracking-[0.2px]">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`py-3.5 px-4 border-2 rounded-[10px] text-[15px] transition-[var(--transition)] outline-none bg-[var(--bg-primary)] text-[var(--text-primary)] font-inherit placeholder:text-[var(--text-tertiary)] ${
                errors.password 
                  ? 'border-[var(--error-color)] focus:shadow-[0_0_0_3px_rgba(220,53,69,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(255,107,107,0.2)]' 
                  : 'border-[var(--border-color)] focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(13,110,253,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(77,171,247,0.2)]'
              }`}
            />
            {errors.password && <span className="text-[var(--error-color)] text-[13px] -mt-1 font-medium">{errors.password}</span>}
          </div>

          <div className="flex justify-between items-center -mt-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-[var(--text-secondary)] select-none">
              <input type="checkbox" className="w-[18px] h-[18px] cursor-pointer accent-[var(--accent-color)]" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-[var(--accent-color)] no-underline text-sm font-medium transition-[var(--transition)] hover:text-[var(--accent-hover)] hover:underline">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-[var(--accent-color)] text-white border-none py-4 px-6 rounded-[10px] text-base font-semibold cursor-pointer transition-[var(--transition)] mt-2 font-inherit tracking-[0.3px] hover:bg-[var(--accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_var(--shadow-hover)] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-[var(--border-color)]">
          <p className="text-[var(--text-secondary)] text-sm m-0">
            Don't have an account?{' '}
            <Link to="/register" className="text-[var(--accent-color)] no-underline font-semibold transition-[var(--transition)] hover:text-[var(--accent-hover)] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
