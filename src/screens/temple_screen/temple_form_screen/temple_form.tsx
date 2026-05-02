import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../../services/api_service';
import { Save, X, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useAuth } from '../../../context/auth_context';
import AppTextField from '../../../commons/ui/app_text_field';
import AppTextArea from '../../../commons/ui/app_text_area';
import AppButton from '../../../commons/ui/app_button';
import AlertBanner from '../../../commons/ui/alert_banner';
import AssetIcon from '../../../commons/ui/asset_icon';
import AppImageUpload from '../../../commons/ui/app_image_upload';
import { ApiRoutes } from '../../../utils/api_routes';
import { C } from '../../../utils/colors';
import { ASSETS } from '../../../utils/assets';

const TempleForm = () => {
  const { user, updateUser } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'basic');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' as 'success' | 'error' | '' });
  const [expandedAlbums, setExpandedAlbums] = useState<number[]>([0]);
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
    history_images_list: [] as (File | string)[],
    gallery: [] as { title: string; images: (File | string)[] }[]
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
        gallery: (user.gallery || []).map((album: any) => ({
          title: album.title || '',
          images: album.images || []
        }))
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
        } else if (key === 'gallery') {
          // New Simplified Gallery Logic
          const gallery = value as { title: string; images: (File | string)[] }[];
          const structure = gallery.map((album, index) => {
            const existing = album.images.filter(img => typeof img === 'string');
            const files = album.images.filter(img => typeof img !== 'string') as File[];

            files.forEach(file => data.append(`gallery_files_${index}`, file));
            return { title: album.title, images: existing };
          });
          data.append('gallery', JSON.stringify(structure));
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
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
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
    <>
      {/* Alert Banner - Completely outside the main box */}
      {message.text && message.type && (
        <div className="max-w-5xl mx-auto mb-6 animate-fade-in">
          <AlertBanner
            message={message.text}
            type={message.type as 'success' | 'error'}
            onClose={() => setMessage({ text: '', type: '' })}
          />
        </div>
      )}

      <div className="max-w-5xl mx-auto pb-20">
        <div className={`${C.bgCard} border ${C.border} ${C.roundedCard} ${C.shadowCard} ${C.transition} overflow-hidden`}>


          {/* Tabs */}
          <div
            ref={tabsRef}
            className="flex justify-start md:justify-center overflow-x-auto border-b border-slate-200 dark:border-slate-800/50 transition-colors duration-300 no-scrollbar px-4 relative"
          >
            {[
              { id: 'basic', label: 'Basic Details', icon: ASSETS.icons.temple },
              { id: 'about', label: 'About', icon: ASSETS.icons.about },
              { id: 'history', label: 'History', icon: ASSETS.icons.history },
              { id: 'position', label: 'Position', icon: ASSETS.icons.position },
              { id: 'gallery', label: 'Gallery', icon: ASSETS.icons.gallery }
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

              {/* Gallery Tab (New Clean Implementation) */}
              {activeTab === 'gallery' && (
                <div className="animate-fade-in space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Temple Gallery</h3>
                    <AppButton
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          gallery: [...prev.gallery, { title: '', images: [] }]
                        }));
                      }}
                    >
                      Add New Album
                    </AppButton>
                  </div>

                  <DragDropContext onDragEnd={(result) => {
                    if (!result.destination) return;
                    const newGallery = Array.from(formData.gallery);
                    const [reorderedItem] = newGallery.splice(result.source.index, 1);
                    newGallery.splice(result.destination.index, 0, reorderedItem);
                    setFormData(prev => ({ ...prev, gallery: newGallery }));
                  }}>
                    <Droppable droppableId="albums">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-6"
                        >
                          {formData.gallery.map((album, index) => {
                            const isExpanded = expandedAlbums.includes(index);
                            const toggleExpand = () => {
                              setExpandedAlbums(prev =>
                                prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
                              );
                            };

                            return (
                              <Draggable key={`album-${index}`} draggableId={`album-${index}`} index={index}>
                                {(provided, snapshot) => {
                                  const content = (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className={`border ${C.border} ${C.roundedCard} bg-white dark:bg-slate-900/40 relative overflow-hidden
                                      ${snapshot.isDragging ? 'shadow-2xl scale-[1.02] z-50 ring-2 ring-orange-500' : 'shadow-sm transition-all duration-300'}`}
                                      style={{
                                        ...provided.draggableProps.style,
                                        // Ensure it matches the container width when dragging
                                        ...(snapshot.isDragging ? { width: '100%', maxWidth: '1024px' } : {})
                                      }}
                                    >
                                      {/* Album Header */}
                                      <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/30">
                                        <div className="flex items-center gap-3">
                                          {/* Album Drag Handle */}
                                          <div
                                            {...provided.dragHandleProps}
                                            className="p-1.5 text-slate-400 hover:text-orange-500 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all cursor-grab active:cursor-grabbing"
                                            title="Drag to reorder album"
                                          >
                                            <GripVertical size={18} />
                                          </div>
                                          <h4 className="font-bold text-slate-800 dark:text-slate-100">
                                            {album.title || `Album ${index + 1}`}
                                          </h4>
                                        </div>

                                        <div className="flex items-center gap-2">
                                          <button
                                            type="button"
                                            onClick={toggleExpand}
                                            className="p-2 text-slate-400 hover:text-orange-500 hover:bg-white dark:hover:bg-slate-700 rounded-full transition-all"
                                          >
                                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                          </button>
                                          <button
                                            type="button"
                                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-full transition-all"
                                            onClick={() => {
                                              const newGallery = [...formData.gallery];
                                              newGallery.splice(index, 1);
                                              setFormData(prev => ({ ...prev, gallery: newGallery }));
                                            }}
                                          >
                                            <X size={18} />
                                          </button>
                                        </div>
                                      </div>

                                      {/* Album Content (Expandable) */}
                                      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'p-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                        <div className="grid grid-cols-1 gap-6">
                                          <AppTextField
                                            label="Album Name"
                                            value={album.title}
                                            onChange={(e) => {
                                              const newGallery = [...formData.gallery];
                                              newGallery[index].title = e.target.value;
                                              setFormData(prev => ({ ...prev, gallery: newGallery }));
                                            }}
                                            placeholder="e.g. Annual Festival, Morning Aarti"
                                          />

                                          <AppImageUpload
                                            name={`gallery_album_${index}`}
                                            label="Photos"
                                            multiple={true}
                                            value={album.images}
                                            onChange={(files) => {
                                              const newGallery = [...formData.gallery];
                                              newGallery[index].images = files;
                                              setFormData(prev => ({ ...prev, gallery: newGallery }));
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  );

                                  if (snapshot.isDragging) {
                                    return createPortal(content, document.body);
                                  }
                                  return content;
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>

                  {formData.gallery.length === 0 && (
                    <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-900/30">
                      <div className="text-slate-400 mb-2 italic">Your gallery is empty.</div>
                      <p className="text-sm text-slate-500">Create your first album to showcase temple photos.</p>
                    </div>
                  )}
                </div>
              )}

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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TempleForm;
