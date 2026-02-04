import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/ui/ThemeToggle';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  phoneNumber: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  companyName?: string;
  phoneNumber?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      // TODO: Implement actual registration logic here
      console.log('Registration data:', formData);
      alert('Registration successful! (This is a demo)');
      // navigate('/login'); // Navigate to login after successful registration
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-5 relative">
      <div className="fixed top-6 right-6 z-[1000]">
        <ThemeToggle />
      </div>
      <div className="bg-[var(--bg-secondary)] rounded-2xl shadow-[0_4px_24px_var(--shadow)] p-12 w-full max-w-[650px] animate-[slideUp_0.5s_cubic-bezier(0.4,0,0.2,1)] border border-[var(--border-color)] transition-[var(--transition)] dark:shadow-[0_4px_24px_var(--shadow)] md:max-w-[650px]">
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
          <h1 className="text-[var(--text-primary)] text-[28px] font-bold m-0 mb-2 tracking-[-0.5px]">Create Account</h1>
          <p className="text-[var(--text-secondary)] text-[15px] m-0">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[var(--text-primary)] text-sm font-semibold tracking-[0.2px]">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`py-3.5 px-4 border-2 rounded-[10px] text-[15px] transition-[var(--transition)] outline-none bg-[var(--bg-primary)] text-[var(--text-primary)] font-inherit placeholder:text-[var(--text-tertiary)] ${
                errors.name 
                  ? 'border-[var(--error-color)] focus:shadow-[0_0_0_3px_rgba(220,53,69,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(255,107,107,0.2)]' 
                  : 'border-[var(--border-color)] focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(13,110,253,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(77,171,247,0.2)]'
              }`}
            />
            {errors.name && <span className="text-[var(--error-color)] text-[13px] -mt-1 font-medium">{errors.name}</span>}
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[var(--text-primary)] text-sm font-semibold tracking-[0.2px]">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={`py-3.5 px-4 border-2 rounded-[10px] text-[15px] transition-[var(--transition)] outline-none bg-[var(--bg-primary)] text-[var(--text-primary)] font-inherit placeholder:text-[var(--text-tertiary)] ${
                  errors.password 
                    ? 'border-[var(--error-color)] focus:shadow-[0_0_0_3px_rgba(220,53,69,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(255,107,107,0.2)]' 
                    : 'border-[var(--border-color)] focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(13,110,253,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(77,171,247,0.2)]'
                }`}
              />
              {errors.password && <span className="text-[var(--error-color)] text-[13px] -mt-1 font-medium">{errors.password}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-[var(--text-primary)] text-sm font-semibold tracking-[0.2px]">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className={`py-3.5 px-4 border-2 rounded-[10px] text-[15px] transition-[var(--transition)] outline-none bg-[var(--bg-primary)] text-[var(--text-primary)] font-inherit placeholder:text-[var(--text-tertiary)] ${
                  errors.confirmPassword 
                    ? 'border-[var(--error-color)] focus:shadow-[0_0_0_3px_rgba(220,53,69,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(255,107,107,0.2)]' 
                    : 'border-[var(--border-color)] focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(13,110,253,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(77,171,247,0.2)]'
                }`}
              />
              {errors.confirmPassword && <span className="text-[var(--error-color)] text-[13px] -mt-1 font-medium">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="companyName" className="text-[var(--text-primary)] text-sm font-semibold tracking-[0.2px]">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter your company name"
              className={`py-3.5 px-4 border-2 rounded-[10px] text-[15px] transition-[var(--transition)] outline-none bg-[var(--bg-primary)] text-[var(--text-primary)] font-inherit placeholder:text-[var(--text-tertiary)] ${
                errors.companyName 
                  ? 'border-[var(--error-color)] focus:shadow-[0_0_0_3px_rgba(220,53,69,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(255,107,107,0.2)]' 
                  : 'border-[var(--border-color)] focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(13,110,253,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(77,171,247,0.2)]'
              }`}
            />
            {errors.companyName && <span className="text-[var(--error-color)] text-[13px] -mt-1 font-medium">{errors.companyName}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber" className="text-[var(--text-primary)] text-sm font-semibold tracking-[0.2px]">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={`py-3.5 px-4 border-2 rounded-[10px] text-[15px] transition-[var(--transition)] outline-none bg-[var(--bg-primary)] text-[var(--text-primary)] font-inherit placeholder:text-[var(--text-tertiary)] ${
                errors.phoneNumber 
                  ? 'border-[var(--error-color)] focus:shadow-[0_0_0_3px_rgba(220,53,69,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(255,107,107,0.2)]' 
                  : 'border-[var(--border-color)] focus:border-[var(--accent-color)] focus:shadow-[0_0_0_3px_rgba(13,110,253,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(77,171,247,0.2)]'
              }`}
            />
            {errors.phoneNumber && <span className="text-[var(--error-color)] text-[13px] -mt-1 font-medium">{errors.phoneNumber}</span>}
          </div>

          <div className="flex justify-start items-center -mt-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-[var(--text-secondary)] select-none">
              <input type="checkbox" required className="w-[18px] h-[18px] cursor-pointer accent-[var(--accent-color)]" />
              <span>I agree to the Terms and Conditions</span>
            </label>
          </div>

          <button type="submit" className="bg-[var(--accent-color)] text-white border-none py-4 px-6 rounded-[10px] text-base font-semibold cursor-pointer transition-[var(--transition)] mt-2 font-inherit tracking-[0.3px] hover:bg-[var(--accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_var(--shadow-hover)] active:translate-y-0">
            Sign Up
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-[var(--border-color)]">
          <p className="text-[var(--text-secondary)] text-sm m-0">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--accent-color)] no-underline font-semibold transition-[var(--transition)] hover:text-[var(--accent-hover)] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
