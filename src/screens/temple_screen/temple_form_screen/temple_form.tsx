import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../../services/api_service';
import { Save, X } from 'lucide-react';
import { useAuth } from '../../../context/auth_context';
import AppTextField from '../../../commons/ui/app_text_field';
import AppTextArea from '../../../commons/ui/app_text_area';
import AppButton from '../../../commons/ui/app_button';
import AlertBanner from '../../../commons/ui/alert_banner';
import AssetIcon from '../../../commons/ui/asset_icon';
import AppImageUpload from '../../../commons/ui/app_image_upload';
import { ApiRoutes } from '../../../utils/api_routes';
import { C } from '../../../utils/colors';

const TempleForm = () => {
  const { user, updateUser } = useAuth();
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
    about_district: '',
    temple_images_list: [] as (File | string)[],
    geography_image: [] as (File | string)[],
    position_image: [] as (File | string)[],
    history_images_list: [] as (File | string)[]
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
        about_geography: user.temple_history?.about_geography || '',
        about_district: user.temple_position?.about_district || '',
        temple_images_list: user.temple_about?.temple_images_list || [],
        geography_image: user.temple_history?.geography_image ? [user.temple_history.geography_image] : [],
        position_image: user.temple_position?.position_image ? [user.temple_position.position_image] : [],
        history_images_list: user.temple_history?.history_images_list || [],
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (name: string, files: (File | string)[]) => {
    setFormData(prev => ({ ...prev, [name]: files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (['temple_images_list', 'history_images_list', 'geography_image', 'position_image'].includes(key)) {
          const files = value as (File | string)[];
          const existingUrls = files.filter(f => typeof f === 'string');
          const newFiles = files.filter(f => typeof f !== 'string');

          if (existingUrls.length > 0) {
            if (key === 'geography_image' || key === 'position_image') {
              data.append(key, existingUrls[0] as string);
            } else {
              data.append(key, JSON.stringify(existingUrls));
            }
          } else if (key === 'temple_images_list' || key === 'history_images_list') {
            data.append(key, JSON.stringify([]));
          } else if (key === 'geography_image' || key === 'position_image') {
            data.append(key, '');
          }

          newFiles.forEach(f => {
            data.append(key, f as File);
          });
        } else {
          data.append(key, value as string);
        }
      });

      const response = await ApiService.put(`${ApiRoutes.TEMPLES}${user.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.success) {
        setMessage({ text: 'Temple updated successfully!', type: 'success' });
        updateUser(response.data);
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
    flex items-center gap-2 px-4 py-4 md:px-8 md:py-5 font-bold ${C.transition} border-b-4 whitespace-nowrap flex-shrink-0
    ${activeTab === tabName ? C.tabActive : C.tabInactive}
  `;

  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollToTab = (target: HTMLElement) => {
    if (!tabsRef.current) return;
    const container = tabsRef.current;
    const scrollLeft = target.offsetLeft - (container.offsetWidth / 2) + (target.offsetWidth / 2);
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className={`${C.bgCard} border ${C.border} ${C.roundedCard} ${C.shadowCard} ${C.transition} overflow-hidden`}>

        {/* Alert Banner */}
        {message.text && message.type && (
          <div className="mx-6 sm:mx-10 mt-6 sm:mt-10">
            <AlertBanner message={message.text} type={message.type as 'success' | 'error'} />
          </div>
        )}

        {/* Tabs */}
        <div 
          ref={tabsRef}
          className="flex justify-start md:justify-center overflow-x-auto border-b border-slate-200 dark:border-slate-800/50 transition-colors duration-300 no-scrollbar px-4 relative"
        >
          {[
            { id: 'basic', label: 'Basic Details', icon: '/assets/icons/dashboard/temple_icon.svg' },
            { id: 'about', label: 'About', icon: '/assets/icons/visit/plan_tour_icon.svg' },
            { id: 'history', label: 'History', icon: '/assets/icons/shri_kashi_vishwanath/history_icon.svg' },
            { id: 'position', label: 'Position', icon: '/assets/icons/shri_kashi_vishwanath/position_icon.svg' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={tabClass(tab.id)}
              onClick={(e) => {
                setActiveTab(tab.id);
                scrollToTab(e.currentTarget);
              }}
              type="button"
            >
              <AssetIcon src={tab.icon} className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>


        <form onSubmit={handleSubmit} className="p-5 sm:p-8">
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
                <div className="md:col-span-2">
                  <AppImageUpload
                    label="Temple Images"
                    name="temple_images_list"
                    multiple={true}
                    value={formData.temple_images_list}
                    onChange={(files) => handleImageChange('temple_images_list', files)}
                  />
                </div>
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
              <div className="animate-fade-in space-y-6">
                <AppTextArea label="Temple History" name="about_history" rows={12} value={formData.about_history} onChange={handleChange} />
                <AppImageUpload
                  label="History Images"
                  name="history_images_list"
                  multiple={true}
                  value={formData.history_images_list}
                  onChange={(files) => handleImageChange('history_images_list', files)}
                />
              </div>
            )}

            {/* Position Tab */}
            {activeTab === 'position' && (
              <div className="animate-fade-in space-y-6">
                <AppImageUpload
                  label="Position Image"
                  name="position_image"
                  multiple={false}
                  value={formData.position_image}
                  onChange={(files) => handleImageChange('position_image', files)}
                />
                <AppTextArea label="About Geography" name="about_geography" rows={6} value={formData.about_geography} onChange={handleChange} />
                <AppImageUpload
                  label="Geography Image"
                  name="geography_image"
                  multiple={false}
                  value={formData.geography_image}
                  onChange={(files) => handleImageChange('geography_image', files)}
                />
                <AppTextArea label="About District" name="about_district" rows={6} value={formData.about_district} onChange={handleChange} />
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <AppButton
              type="button"
              variant="ghost"
              icon={<X size={18} />}
              onClick={() => navigate('/')}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Cancel
            </AppButton>
            <AppButton
              type="submit"
              variant="primary"
              loading={loading}
              loadingText="Saving..."
              icon={<Save size={18} />}
              className="w-full sm:w-auto order-1 sm:order-2"
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
