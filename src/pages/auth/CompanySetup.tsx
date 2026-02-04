import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert, { AlertType } from '../../components/ui/Alert';
import ProgressBar from '../../components/ui/ProgressBar';
import { useTheme } from '../../contexts/ThemeContext';

interface GroupRoute {
  code: string;
  name: string;
  status: string;
}

interface CompanyConfig {
  key: string;
  value: string;
}

interface Module {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface SelectedModule {
  [itemId: string]: {
    name: string;
    price: number;
    quantity: number;
  };
}

const CompanySetup: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const steps = ['group-routes', 'company-config', 'addon-modules', 'pbx-config'];

  // Step 1: Group Routes
  const [groupRouteForm, setGroupRouteForm] = useState({ code: '', name: '' });
  const [groupRoutes, setGroupRoutes] = useState<GroupRoute[]>([]);

  // Step 2: Company Config
  const [configForm, setConfigForm] = useState({ key: '', key_custom: '', value: '' });
  const availableKeys = [
    { value: 'company_name', label: 'Company Name', desc: 'Nama perusahaan' },
    { value: 'company_address', label: 'Company Address', desc: 'Alamat perusahaan' },
    { value: 'company_phone', label: 'Company Phone', desc: 'Nomor telepon perusahaan' },
    { value: 'company_email', label: 'Company Email', desc: 'Email perusahaan' },
  ];

  // Step 3: Addon Modules
  const [modules] = useState<Module[]>([
    { id: '1', name: 'Omnichat', price: 50000, description: 'Multi-channel chat integration' },
    { id: '2', name: 'Outbound Call', price: 75000, description: 'Outbound calling system' },
    { id: '3', name: 'Email Module', price: 60000, description: 'Email management system' },
    { id: '4', name: 'Analytics', price: 80000, description: 'Advanced analytics dashboard' },
  ]);
  const [selectedModules, setSelectedModules] = useState<SelectedModule>({});
  const [customerInfo, setCustomerInfo] = useState({
    customer_first_name: '',
    customer_last_name: '',
    customer_email: '',
    customer_phone: '',
  });

  // Step 4: PBX Config
  const [pbxForm, setPbxForm] = useState({
    connection_name: '',
    domain_pabx: '',
    ip_public: '',
    user_db: '',
    pass_db: '',
    port_db: '',
    name_db: '',
    type_db: 'MySQL',
    logo_panjang: '',
    logo_pendek: '',
  });

  // Alert state
  const [alert, setAlert] = useState<{ message: string; type: AlertType } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showAlert = (message: string, type: AlertType) => {
    setAlert({ message, type });
  };

  const showStep = (step: number) => {
    if (step < 1 || step > totalSteps) return;
    setCurrentStep(step);
  };

  const validateCurrentStep = (): boolean => {
    const form = document.querySelector(`#${steps[currentStep - 1]}-form`) as HTMLFormElement;
    if (!form) return true;
    return form.checkValidity();
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else if (!validateCurrentStep()) {
      showAlert('Please fill in all required fields', 'error');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipPbx = () => {
    showAlert('PBX Config skipped. Setup completed!', 'info');
    setTimeout(() => navigate('/login'), 2000);
  };

  // Step 1: Group Routes Handlers
  const handleGroupRouteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupRouteForm({ ...groupRouteForm, [e.target.name]: e.target.value });
  };

  const handleGroupRouteSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRoute: GroupRoute = {
        code: groupRouteForm.code,
        name: groupRouteForm.name,
        status: 'Active',
      };
      
      setGroupRoutes([...groupRoutes, newRoute]);
      setGroupRouteForm({ code: '', name: '' });
      showAlert('Group route saved successfully!', 'success');
    } catch (error) {
      showAlert('Failed to save group route', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Company Config Handlers
  const handleConfigChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'key') {
      setConfigForm({ ...configForm, key: value, key_custom: '' });
    } else if (name === 'key_custom') {
      setConfigForm({ ...configForm, key_custom: value, key: '' });
    } else {
      setConfigForm({ ...configForm, [name]: value });
    }
  };

  const handleConfigSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setConfigForm({ key: '', key_custom: '', value: '' });
      showAlert('Configuration saved successfully!', 'success');
    } catch (error) {
      showAlert('Failed to save configuration', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3: Addon Modules Handlers
  const handleModuleToggle = (module: Module) => {
    setSelectedModules(prev => {
      const newModules = { ...prev };
      if (newModules[module.id]) {
        delete newModules[module.id];
      } else {
        newModules[module.id] = {
          name: module.name,
          price: module.price,
          quantity: 1,
        };
      }
      return newModules;
    });
  };

  const handleQuantityChange = (moduleId: string, quantity: number) => {
    if (quantity < 1) return;
    setSelectedModules(prev => ({
      ...prev,
      [moduleId]: { ...prev[moduleId], quantity },
    }));
  };

  const handleCustomerInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const calculateTotal = (): number => {
    return Object.values(selectedModules).reduce(
      (total, module) => total + module.price * module.quantity,
      0
    );
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleModulesSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (Object.keys(selectedModules).length === 0) {
      showAlert('Please select at least one module', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real implementation, handle Midtrans Snap token here
      showAlert('Payment initiated successfully!', 'success');
    } catch (error) {
      showAlert('Failed to process payment', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 4: PBX Config Handlers
  const handlePbxChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPbxForm({ ...pbxForm, [e.target.name]: e.target.value });
  };

  const handlePbxSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPbxForm({
        connection_name: '',
        domain_pabx: '',
        ip_public: '',
        user_db: '',
        pass_db: '',
        port_db: '',
        name_db: '',
        type_db: 'MySQL',
        logo_panjang: '',
        logo_pendek: '',
      });
      showAlert('PBX configuration saved successfully! Setup completed!', 'success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      showAlert('Failed to save PBX configuration', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="min-h-screen bg-[var(--bg-primary)] p-6 text-[var(--text-primary)] relative">
        <div className="fixed top-6 right-6 z-[1000]">
          <button 
            className="w-10 h-10 flex items-center justify-center bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg cursor-pointer transition-all duration-200 text-[var(--text-primary)] p-0 m-0 hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] hover:scale-105 active:scale-95" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {theme === 'light' ? (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              ) : (
                <>
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </>
              )}
            </svg>
          </button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-[32px] font-bold text-[var(--text-primary)] m-0 mb-2">Setup Company</h1>
          <p className="text-base text-[var(--text-secondary)] m-0">Configure your company's basic settings</p>
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            autoClose={true}
            autoCloseDelay={5000}
          />
        )}

        <div className="bg-[var(--bg-secondary)] rounded-xl p-6 max-w-[1200px] mx-auto border border-[var(--border-color)]">
          {/* Progress Steps Indicator */}
          <div className="mb-8">
            <ProgressBar
              value={currentStep}
              max={totalSteps}
              showLabel={true}
              label={`Step ${currentStep} of ${totalSteps}`}
              size="lg"
              color="primary"
              animated={true}
              striped={true}
            />
            <div className="flex w-full mt-4 gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className={`flex-1 flex flex-col gap-1 text-center transition-opacity duration-300 ${step <= currentStep ? 'opacity-100' : 'opacity-50'}`}>
                  <span className={`text-xs font-semibold transition-colors duration-300 ${step <= currentStep ? 'text-[var(--accent-color)]' : 'text-[var(--text-tertiary)]'}`}>Step {step}</span>
                  <span className={`text-sm transition-colors duration-300 ${step <= currentStep ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                    {step === 1 && 'Group Routes'}
                    {step === 2 && 'Company Config'}
                    {step === 3 && 'Modules'}
                    {step === 4 && 'PBX Config'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="min-h-[400px] mb-8">
            {/* Step 1: Group Routes */}
            {currentStep === 1 && (
              <div id="group-routes" className="animate-[fadeIn_0.3s_ease]">
                <form id="group-routes-form" onSubmit={handleGroupRouteSubmit} className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                      <h2 className="text-lg font-semibold text-[var(--text-primary)] m-0 mb-4 pb-2 border-b-2 border-[var(--border-color)]">Add Group Route</h2>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="code" className="text-sm font-medium text-[var(--text-primary)]">Code <span className="text-[var(--error-color)]">*</span></label>
                        <input
                          type="text"
                          id="code"
                          name="code"
                          value={groupRouteForm.code}
                          onChange={handleGroupRouteChange}
                          placeholder="Masukkan kode group route"
                          required
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium text-[var(--text-primary)]">Name <span className="text-[var(--error-color)]">*</span></label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={groupRouteForm.name}
                          onChange={handleGroupRouteChange}
                          placeholder="Masukkan nama group route"
                          required
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)]"
                        />
                      </div>
                      <button type="submit" className="w-full py-3 px-6 bg-[var(--accent-color)] text-white border-none rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 mt-2 hover:bg-[var(--accent-hover)] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                        <i className="fas fa-save"></i>
                        {isSubmitting ? 'Saving...' : 'Simpan Group Route'}
                      </button>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h2 className="text-lg font-semibold text-[var(--text-primary)] m-0 mb-4 pb-2 border-b-2 border-[var(--border-color)]">Existing Routes</h2>
                      <div id="existing-routes-table" className="bg-[var(--bg-tertiary)] rounded-lg p-4 min-h-[200px]">
                        {groupRoutes.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-10 text-[var(--text-secondary)] text-center">
                            <i className="bx bx-info-circle text-5xl mb-4 opacity-50"></i>
                            <p>No group routes added yet. Add your first route using the form.</p>
                          </div>
                        ) : (
                          <table className="w-full border-collapse">
                            <thead>
                              <tr>
                                <th className="py-3 px-3 text-left border-b border-[var(--border-color)] font-semibold text-[var(--text-primary)] text-sm">Code</th>
                                <th className="py-3 px-3 text-left border-b border-[var(--border-color)] font-semibold text-[var(--text-primary)] text-sm">Name</th>
                                <th className="py-3 px-3 text-left border-b border-[var(--border-color)] font-semibold text-[var(--text-primary)] text-sm">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {groupRoutes.map((route, index) => (
                                <tr key={index}>
                                  <td className="py-3 px-3 text-left border-b border-[var(--border-color)] text-[var(--text-secondary)] text-sm">{route.code}</td>
                                  <td className="py-3 px-3 text-left border-b border-[var(--border-color)] text-[var(--text-secondary)] text-sm">{route.name}</td>
                                  <td className="py-3 px-3 text-left border-b border-[var(--border-color)] text-[var(--text-secondary)] text-sm">
                                    <span className="py-1 px-3 rounded-xl text-xs font-medium bg-[rgba(34,197,94,0.1)] text-[var(--success-color)]">{route.status}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Company Config */}
            {currentStep === 2 && (
              <div id="company-config" className="animate-[fadeIn_0.3s_ease]">
                <form id="company-config-form" onSubmit={handleConfigSubmit} className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                      <h2 className="text-lg font-semibold text-[var(--text-primary)] m-0 mb-4 pb-2 border-b-2 border-[var(--border-color)]">Configuration</h2>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="key" className="text-sm font-medium text-[var(--text-primary)]">Configuration Key <span className="text-[var(--error-color)]">*</span></label>
                        <select
                          id="key"
                          name="key"
                          value={configForm.key}
                          onChange={handleConfigChange}
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] cursor-pointer"
                        >
                          <option value="">Pilih atau ketik key baru</option>
                          {availableKeys.map((key) => (
                            <option key={key.value} value={key.value}>
                              {key.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="key_custom" className="text-sm font-medium text-[var(--text-primary)]">Custom Key</label>
                        <input
                          type="text"
                          id="key_custom"
                          name="key_custom"
                          value={configForm.key_custom}
                          onChange={handleConfigChange}
                          placeholder="Ketik key baru jika tidak ada di dropdown"
                          disabled={!!configForm.key}
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)] disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="value" className="text-sm font-medium text-[var(--text-primary)]">Configuration Value <span className="text-[var(--error-color)]">*</span></label>
                        <textarea
                          id="value"
                          name="value"
                          value={configForm.value}
                          onChange={handleConfigChange}
                          rows={3}
                          placeholder="Enter configuration value"
                          required
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)] resize-y min-h-[80px]"
                        />
                      </div>
                      <button type="submit" className="w-full py-3 px-6 bg-[var(--accent-color)] text-white border-none rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 mt-2 hover:bg-[var(--accent-hover)] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                        <i className="fas fa-save"></i>
                        {isSubmitting ? 'Saving...' : 'Simpan Konfigurasi'}
                      </button>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h2 className="text-lg font-semibold text-[var(--text-primary)] m-0 mb-4 pb-2 border-b-2 border-[var(--border-color)]">Quick Configuration Examples</h2>
                      <div className="grid grid-cols-1 gap-3">
                        {availableKeys.map((key) => (
                          <div key={key.value} className="bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-[var(--accent-color)] m-0 mb-1">{key.label}</h3>
                            <p className="text-xs text-[var(--text-secondary)] m-0">{key.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Addon Modules */}
            {currentStep === 3 && (
              <div id="addon-modules" className="animate-[fadeIn_0.3s_ease]">
                <form id="addon-modules-form" onSubmit={handleModulesSubmit} className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                    <div className="flex flex-col gap-4 col-span-1">
                      <h2 className="text-lg font-semibold text-[var(--text-primary)] m-0 mb-4 pb-2 border-b-2 border-[var(--border-color)]">Select Modules</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {modules.map((module) => (
                          <div
                            key={module.id}
                            className={`bg-[var(--bg-tertiary)] border-2 rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                              selectedModules[module.id] 
                                ? 'border-[var(--accent-color)] bg-[rgba(59,130,246,0.05)]' 
                                : 'border-[var(--border-color)] hover:border-[var(--accent-color)] hover:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]'
                            }`}
                          >
                            <div className="flex gap-3">
                              <input
                                type="checkbox"
                                id={`module-${module.id}`}
                                checked={!!selectedModules[module.id]}
                                onChange={() => handleModuleToggle(module)}
                                className="w-5 h-5 cursor-pointer mt-0.5"
                              />
                              <label htmlFor={`module-${module.id}`} className="flex-1 cursor-pointer">
                                <h3 className="text-base font-semibold text-[var(--text-primary)] m-0 mb-1">{module.name}</h3>
                                <p className="text-xs text-[var(--text-secondary)] m-0 mb-2">{module.description}</p>
                                <div className="text-lg font-bold text-[var(--success-color)]">{formatCurrency(module.price)}</div>
                              </label>
                            </div>
                            {selectedModules[module.id] && (
                              <div className="mt-3 pt-3 border-t border-[var(--border-color)] flex items-center gap-2">
                                <label className="text-sm text-[var(--text-secondary)]">Quantity:</label>
                                <input
                                  type="number"
                                  min="1"
                                  value={selectedModules[module.id].quantity}
                                  onChange={(e) => handleQuantityChange(module.id, parseInt(e.target.value) || 1)}
                                  className="w-20 py-1.5 px-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md text-[var(--text-primary)] text-sm"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h2 className="text-lg font-semibold text-[var(--text-primary)] m-0 mb-4 pb-2 border-b-2 border-[var(--border-color)]">Customer Information</h2>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="customer_first_name" className="text-sm font-medium text-[var(--text-primary)]">First Name</label>
                        <input
                          type="text"
                          id="customer_first_name"
                          name="customer_first_name"
                          value={customerInfo.customer_first_name}
                          onChange={handleCustomerInfoChange}
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="customer_last_name" className="text-sm font-medium text-[var(--text-primary)]">Last Name</label>
                        <input
                          type="text"
                          id="customer_last_name"
                          name="customer_last_name"
                          value={customerInfo.customer_last_name}
                          onChange={handleCustomerInfoChange}
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="customer_email" className="text-sm font-medium text-[var(--text-primary)]">Email</label>
                        <input
                          type="email"
                          id="customer_email"
                          name="customer_email"
                          value={customerInfo.customer_email}
                          onChange={handleCustomerInfoChange}
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="customer_phone" className="text-sm font-medium text-[var(--text-primary)]">Phone</label>
                        <input
                          type="text"
                          id="customer_phone"
                          name="customer_phone"
                          value={customerInfo.customer_phone}
                          onChange={handleCustomerInfoChange}
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)]"
                        />
                      </div>

                      <div id="payment-summary" className="bg-[var(--bg-tertiary)] rounded-lg p-4 mt-4">
                        <h3 className="text-base font-semibold text-[var(--text-primary)] m-0 mb-4">Payment Summary</h3>
                        {Object.keys(selectedModules).length === 0 ? (
                          <p className="text-[var(--text-secondary)] text-sm text-center py-5 m-0">No modules selected</p>
                        ) : (
                          <>
                            {Object.entries(selectedModules).map(([id, module]) => (
                              <div key={id} className="flex justify-between py-2 border-b border-[var(--border-color)] text-sm text-[var(--text-secondary)]">
                                <span>{module.name} x{module.quantity}</span>
                                <span>{formatCurrency(module.price * module.quantity)}</span>
                              </div>
                            ))}
                            <div className="flex justify-between py-4 pt-4 mt-2 text-lg font-bold text-[var(--success-color)]">
                              <span>Total:</span>
                              <span>{formatCurrency(calculateTotal())}</span>
                            </div>
                          </>
                        )}
                      </div>

                      <button
                        type="submit"
                        id="submitBtn"
                        className="w-full py-3 px-6 bg-[var(--accent-color)] text-white border-none rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 mt-2 hover:bg-[var(--accent-hover)] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={Object.keys(selectedModules).length === 0 || isSubmitting}
                      >
                        <i className="fas fa-credit-card"></i>
                        {isSubmitting ? 'Processing...' : 'Lanjutkan ke Pembayaran'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Step 4: PBX Config */}
            {currentStep === 4 && (
              <div id="pbx-config" className="animate-[fadeIn_0.3s_ease]">
                <div className="bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-lg p-4 mb-6 flex items-center gap-3 text-[var(--accent-color)]">
                  <i className="bx bx-info-circle text-2xl"></i>
                  <p className="m-0 text-sm">PBX Config is optional. You can skip this step if you don't have a PBX system yet.</p>
                </div>

                <form id="pbx-config-form" onSubmit={handlePbxSubmit} className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                      <h2 className="text-lg font-semibold text-[var(--text-primary)] m-0 mb-4 pb-2 border-b-2 border-[var(--border-color)]">PBX Connection Configuration</h2>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="connection_name" className="text-sm font-medium text-[var(--text-primary)]">Connection Name <span className="text-[var(--error-color)]">*</span></label>
                        <input
                          type="text"
                          id="connection_name"
                          name="connection_name"
                          value={pbxForm.connection_name}
                          onChange={handlePbxChange}
                          required
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="domain_pabx" className="text-sm font-medium text-[var(--text-primary)]">Domain PABX</label>
                        <input
                          type="text"
                          id="domain_pabx"
                          name="domain_pabx"
                          value={pbxForm.domain_pabx}
                          onChange={handlePbxChange}
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="ip_public" className="text-sm font-medium text-[var(--text-primary)]">IP Public</label>
                        <input
                          type="text"
                          id="ip_public"
                          name="ip_public"
                          value={pbxForm.ip_public}
                          onChange={handlePbxChange}
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)]"
                        />
                      </div>

                      <h2 className="text-lg font-semibold text-[var(--text-primary)] m-0 mb-4 pb-2 border-b-2 border-[var(--border-color)] mt-4">Database Configuration</h2>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="user_db" className="text-sm font-medium text-[var(--text-primary)]">User Database</label>
                        <input
                          type="text"
                          id="user_db"
                          name="user_db"
                          value={pbxForm.user_db}
                          onChange={handlePbxChange}
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="pass_db" className="text-sm font-medium text-[var(--text-primary)]">Password Database</label>
                        <input
                          type="password"
                          id="pass_db"
                          name="pass_db"
                          value={pbxForm.pass_db}
                          onChange={handlePbxChange}
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="port_db" className="text-sm font-medium text-[var(--text-primary)]">Port Database</label>
                        <input
                          type="number"
                          id="port_db"
                          name="port_db"
                          value={pbxForm.port_db}
                          onChange={handlePbxChange}
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h2 className="text-lg font-semibold text-[var(--text-primary)] m-0 mb-4 pb-2 border-b-2 border-[var(--border-color)]">Database Settings</h2>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name_db" className="text-sm font-medium text-[var(--text-primary)]">Database Name</label>
                        <input
                          type="text"
                          id="name_db"
                          name="name_db"
                          value={pbxForm.name_db}
                          onChange={handlePbxChange}
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="type_db" className="text-sm font-medium text-[var(--text-primary)]">Database Type</label>
                        <select
                          id="type_db"
                          name="type_db"
                          value={pbxForm.type_db}
                          onChange={handlePbxChange}
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] cursor-pointer"
                        >
                          <option value="MySQL">MySQL</option>
                          <option value="PostgreSQL">PostgreSQL</option>
                          <option value="SQLite">SQLite</option>
                        </select>
                      </div>

                      <h2 className="text-lg font-semibold text-[var(--text-primary)] m-0 mb-4 pb-2 border-b-2 border-[var(--border-color)] mt-4">Logo Configuration</h2>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="logo_panjang" className="text-sm font-medium text-[var(--text-primary)]">Long Logo (URL)</label>
                        <input
                          type="text"
                          id="logo_panjang"
                          name="logo_panjang"
                          value={pbxForm.logo_panjang}
                          onChange={handlePbxChange}
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="logo_pendek" className="text-sm font-medium text-[var(--text-primary)]">Short Logo (URL)</label>
                        <input
                          type="text"
                          id="logo_pendek"
                          name="logo_pendek"
                          value={pbxForm.logo_pendek}
                          onChange={handlePbxChange}
                          className="w-full py-3 px-4 bg-[var(--bg-tertiary)] border-0 rounded-lg text-[var(--text-primary)] text-sm transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] placeholder:text-[var(--text-tertiary)]"
                        />
                      </div>

                      <button type="submit" className="w-full py-3 px-6 bg-[var(--accent-color)] text-white border-none rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 mt-2 hover:bg-[var(--accent-hover)] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitting}>
                        <i className="fas fa-save"></i>
                        {isSubmitting ? 'Saving...' : 'Simpan Konfigurasi PBX'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 pt-6 border-t border-[var(--border-color)] md:flex-row flex-col">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="py-3 px-6 border-none rounded-lg text-sm font-semibold cursor-pointer flex items-center gap-2 transition-all duration-200 bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]">
                <i className="fas fa-arrow-left"></i>
                Sebelumnya
              </button>
            )}
            {currentStep < totalSteps && (
              <button type="button" onClick={nextStep} className="py-3 px-6 border-none rounded-lg text-sm font-semibold cursor-pointer flex items-center gap-2 transition-all duration-200 bg-[var(--accent-color)] text-white ml-auto md:ml-auto md:mr-0 hover:bg-[var(--accent-hover)]">
                Selanjutnya
                <i className="fas fa-arrow-right"></i>
              </button>
            )}
            {currentStep === totalSteps && (
              <button type="button" onClick={skipPbx} className="py-3 px-6 border border-[var(--border-color)] rounded-lg text-sm font-semibold cursor-pointer flex items-center gap-2 transition-all duration-200 bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]">
                Lewati PBX Config
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanySetup;
