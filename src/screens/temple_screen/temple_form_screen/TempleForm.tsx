import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../../services/apiService';
import { Save, X } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import AppTextField from '../../../commons/ui/AppTextField';
import AppTextArea from '../../../commons/ui/AppTextArea';
import AppButton from '../../../commons/ui/AppButton';
import AlertBanner from '../../../commons/ui/AlertBanner';

const TempleForm = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' as 'success' | 'error' | '' });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    district: '',
    country: '',
    pincode: '',
    timings: '',
    contact_no: '',
    website: '',
    about_temple: '',
    description_about_temple: '',
    about_history: '',
    about_geography: '',
    about_district: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        district: user.district || '',
        country: user.country || '',
        pincode: user.pincode || '',
        timings: user.timings || '',
        contact_no: user.contact_no || '',
        website: user.website || '',
        about_temple: user.temple_about?.about_temple || '',
        description_about_temple: user.temple_about?.description_about_temple || '',
        about_history: user.temple_history?.about_history || '',
        about_geography: user.temple_position?.about_geography || '',
        about_district: user.temple_position?.about_district || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));

      const response = await ApiService.put(`/temples/${user.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.success) {
        setMessage({ text: 'Temple updated successfully!', type: 'success' });
        localStorage.setItem('user', JSON.stringify(response.data));
      } else {
        setMessage({ text: response.message || 'Failed to update temple', type: 'error' });
      }
    } catch (error: any) {
      setMessage({ text: error.response?.data?.message || 'Failed to update temple', type: 'error' });
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const tabClass = (tabName: string) => `
    flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 border-b-2
    ${activeTab === tabName
      ? 'border-orange-500 text-orange-500 bg-orange-500/5'
      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-slate-200 hover:bg-orange-50/50 dark:hover:bg-slate-800/50'}
  `;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white/90 dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-100 dark:border-slate-700/50 rounded-2xl shadow-xl shadow-orange-900/5 dark:shadow-slate-900/20 transition-all duration-300 overflow-hidden">

        {/* Alert Banner */}
        {message.text && message.type && (
          <div className="mx-6 mt-6">
            <AlertBanner message={message.text} type={message.type as 'success' | 'error'} />
          </div>
        )}

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-100 dark:border-slate-800 transition-colors duration-300 custom-scrollbar mt-2">
          <button className={tabClass('basic')} onClick={() => setActiveTab('basic')} type="button">
            <img src="/assets/icons/dashboard/temple_icon.svg" alt="" className="w-5 h-5 object-contain icon-adaptive" />
            Basic Details
          </button>
          <button className={tabClass('about')} onClick={() => setActiveTab('about')} type="button">
            <img src="/assets/icons/visit/plan_tour_icon.svg" alt="" className="w-5 h-5 object-contain icon-adaptive" />
            About
          </button>
          <button className={tabClass('history')} onClick={() => setActiveTab('history')} type="button">
            <img src="/assets/icons/shri_kashi_vishwanath/history_icon.svg" alt="" className="w-5 h-5 object-contain icon-adaptive" />
            History
          </button>
          <button className={tabClass('position')} onClick={() => setActiveTab('position')} type="button">
            <img src="/assets/icons/shri_kashi_vishwanath/position_icon.svg" alt="" className="w-5 h-5 object-contain icon-adaptive" />
            Position
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="min-h-[400px]">

            {/* Basic Details Tab */}
            {activeTab === 'basic' && (
              <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
                <AppTextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
                <AppTextField label="Contact No" name="contact_no" value={formData.contact_no} onChange={handleChange} />
                <AppTextField label="Address" name="address" value={formData.address} onChange={handleChange} wrapperClassName="md:col-span-2" />
                <AppTextField label="City" name="city" value={formData.city} onChange={handleChange} />
                <AppTextField label="District" name="district" value={formData.district} onChange={handleChange} />
                <AppTextField label="State" name="state" value={formData.state} onChange={handleChange} />
                <AppTextField label="Country" name="country" value={formData.country} onChange={handleChange} />
                <AppTextField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
                <AppTextField label="Timings" name="timings" value={formData.timings} onChange={handleChange} placeholder="e.g. 6:00 AM - 8:00 PM" wrapperClassName="md:col-span-2" />
                <AppTextField label="Website" name="website" value={formData.website} onChange={handleChange} placeholder="https://example.com" wrapperClassName="md:col-span-2" />
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="animate-fade-in space-y-6">
                <AppTextArea label="About Temple (Short)" name="about_temple" rows={4} value={formData.about_temple} onChange={handleChange} />
                <AppTextArea label="Description (Detailed)" name="description_about_temple" rows={8} value={formData.description_about_temple} onChange={handleChange} />
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="animate-fade-in">
                <AppTextArea label="Temple History" name="about_history" rows={12} value={formData.about_history} onChange={handleChange} />
              </div>
            )}

            {/* Position Tab */}
            {activeTab === 'position' && (
              <div className="animate-fade-in space-y-6">
                <AppTextArea label="About Geography" name="about_geography" rows={6} value={formData.about_geography} onChange={handleChange} />
                <AppTextArea label="About District" name="about_district" rows={6} value={formData.about_district} onChange={handleChange} />
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <AppButton
              type="button"
              variant="ghost"
              icon={<X size={18} />}
              onClick={() => navigate('/')}
            >
              Cancel
            </AppButton>
            <AppButton
              type="submit"
              variant="primary"
              loading={loading}
              loadingText="Saving..."
              icon={<Save size={18} />}
            >
              Save Changes
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TempleForm;
