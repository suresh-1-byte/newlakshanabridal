import { useEffect, useState } from "react";
import { firebaseApi } from "../lib/firebaseApi";
import { storage, auth } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  X,
  Image as ImageIcon,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "sonner";
import LoadingSkeleton from "../components/admin/common/LoadingSkeleton";
import EmptyState from "../components/admin/common/EmptyState";
import ConfirmDialog from "../components/admin/common/ConfirmDialog";

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  type: 'image' | 'video';
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
}

export default function AdminGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    type: 'image' as 'image' | 'video'
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);
      const response = await firebaseApi.getGallery();
      if (response.success && response.data) {
        setGallery(response.data as GalleryItem[]);
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      console.log('📤 Processing image...');
      console.log('File:', file.name, 'Size:', (file.size / 1024).toFixed(2), 'KB');

      // Check file size (limit to 1MB for Firestore)
      const maxSize = 1 * 1024 * 1024; // 1MB
      if (file.size > maxSize) {
        throw new Error('Image too large. Please use an image smaller than 1MB.');
      }

      // Convert to base64 data URL
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      console.log('✅ Image converted to data URL');
      
      // Return the data URL (will be stored directly in Firestore)
      return dataUrl;
    } catch (error: any) {
      console.error('❌ Error processing image:', error);
      toast.error(`Failed: ${error.message || 'Please try again'}`);
      throw error;
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error('Please select an image');
      return;
    }

    try {
      setUploading(true);
      
      // Upload image
      const imageUrl = await uploadImage(imageFile);

      // Add to Firestore
      const response = await firebaseApi.addGalleryItem({
        title: formData.title,
        description: formData.description,
        imageUrl: imageUrl,
        thumbnailUrl: imageUrl,
        type: formData.type
      });

      if (response.success) {
        toast.success('Gallery item added successfully!');
        setShowAddModal(false);
        resetForm();
        loadGallery();
      } else {
        toast.error(response.message || 'Failed to add gallery item');
      }
    } catch (error) {
      console.error('Error adding gallery item:', error);
      toast.error('Failed to add gallery item');
    } finally {
      setUploading(false);
    }
  };

  const handleEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    try {
      setUploading(true);

      let imageUrl = selectedItem.imageUrl;

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const response = await firebaseApi.updateGalleryItem(selectedItem.id, {
        title: formData.title,
        description: formData.description,
        imageUrl: imageUrl,
        thumbnailUrl: imageUrl
      });

      if (response.success) {
        toast.success('Gallery item updated successfully!');
        setShowEditModal(false);
        resetForm();
        loadGallery();
      } else {
        toast.error(response.message || 'Failed to update gallery item');
      }
    } catch (error) {
      console.error('Error updating gallery item:', error);
      toast.error('Failed to update gallery item');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      setDeleting(true);
      const response = await firebaseApi.deleteGalleryItem(id);
      if (response.success) {
        toast.success('Gallery item deleted successfully!');
        setDeleteConfirm(null);
        loadGallery();
      } else {
        toast.error(response.message || 'Failed to delete gallery item');
      }
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast.error('Failed to delete gallery item');
    } finally {
      setDeleting(false);
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await firebaseApi.updateGalleryItem(id, {
        isActive: !currentStatus
      });

      if (response.success) {
        toast.success(currentStatus ? 'Image unpublished from website' : 'Image published to website');
        loadGallery();
      } else {
        toast.error(response.message || 'Failed to update image status');
      }
    } catch (error) {
      console.error('Error toggling image status:', error);
      toast.error('Failed to update image status');
    }
  };

  const openEditModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      imageUrl: item.imageUrl,
      type: item.type
    });
    setImagePreview(item.imageUrl);
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      type: 'image'
    });
    setImageFile(null);
    setImagePreview(null);
    setSelectedItem(null);
  };

  if (loading) {
    return <LoadingSkeleton type="card" count={6} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-extrabold text-gray-900" style={{ fontWeight: '900' }}>
            Gallery Management
          </h1>
          <p className="text-gray-800 mt-2 font-bold text-lg" style={{ fontWeight: '700' }}>
            {gallery.length} items in gallery
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="px-8 py-4 bg-gradient-to-r from-[#C9A96E] to-[#B8956A] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-3 text-lg font-extrabold"
          style={{ fontWeight: '900' }}
        >
          <Plus className="w-6 h-6" />
          Add New Image
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div key={item.id} className="glass-card rounded-xl overflow-hidden hover-lift">
              <div className="relative aspect-square">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Published/Unpublished Badge */}
                <div className="absolute top-2 right-2">
                  {item.isActive ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      <Eye className="h-3 w-3" />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-500 text-white text-xs font-medium rounded-full">
                      <EyeOff className="h-3 w-3" />
                      Unpublished
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-extrabold text-gray-900 mb-2 text-lg" style={{ fontWeight: '900' }}>{item.title}</h3>
                {item.description && (
                  <p className="text-sm font-bold text-gray-700 mb-3 line-clamp-2" style={{ fontWeight: '700' }}>{item.description}</p>
                )}
                
                {/* Publish/Unpublish Toggle */}
                <div className="mb-3">
                  <button
                    onClick={() => handleTogglePublish(item.id, item.isActive)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-extrabold transition-all shadow-md hover:shadow-lg border-2 ${
                      item.isActive
                        ? 'bg-yellow-50 text-yellow-800 hover:bg-yellow-100 border-yellow-300'
                        : 'bg-green-50 text-green-800 hover:bg-green-100 border-green-300'
                    }`}
                    style={{ fontWeight: '800' }}
                  >
                    {item.isActive ? (
                      <>
                        <EyeOff className="h-5 w-5" />
                        Unpublish from Website
                      </>
                    ) : (
                      <>
                        <Eye className="h-5 w-5" />
                        Publish to Website
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 border-2 border-blue-300 text-sm font-extrabold shadow-sm hover:shadow-md transition-all"
                    style={{ fontWeight: '800' }}
                  >
                    <Edit className="h-5 w-5" />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(item.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 border-2 border-red-300 text-sm font-extrabold shadow-sm hover:shadow-md transition-all"
                    style={{ fontWeight: '800' }}
                  >
                    <Trash2 className="h-5 w-5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {gallery.length === 0 && (
          <EmptyState
            icon={ImageIcon}
            title="No gallery items yet"
            description="Upload your first image to get started"
            action={{
              label: "Add First Image",
              onClick: () => {
                resetForm();
                setShowAddModal(true);
              }
            }}
          />
        )}

      {/* Confirm Booking Dialog (if needed) */}
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => deleteConfirm && handleDeleteItem(deleteConfirm)}
        title="Delete Gallery Image"
        message="Are you sure you want to delete this image? This action cannot be undone."
        confirmText="Delete Image"
        cancelText="Cancel"
        type="danger"
        loading={deleting}
      />

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Image</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleAddItem} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="Preview" className="max-h-64 mx-auto" />
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Click to upload an image</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-white rounded cursor-pointer hover:bg-[#c4a137]"
                        >
                          Choose File
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Bridal Makeup, Traditional Look"
                    style={{ color: '#000000', fontWeight: '600', fontSize: '16px' }}
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] text-base bg-white"
                  />
                  <p className="text-xs text-gray-700 mt-1 font-semibold">💡 Use quick fill buttons below or type your own</p>
                </div>

                {/* Quick Fill Buttons */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-4">
                  <p className="text-sm font-bold text-gray-900 mb-3">⚡ Click to Auto-Fill:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, title: 'South Indian Bridal Makeup', description: 'Traditional South Indian bridal look with temple jewelry and silk saree' })}
                      className="px-3 py-2 bg-white border-2 border-blue-400 rounded-lg text-sm font-bold text-blue-700 hover:bg-blue-100 transition-all"
                    >
                      🌺 South Indian
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, title: 'Traditional Bridal Makeup', description: 'Classic bridal makeup with traditional jewelry and styling' })}
                      className="px-3 py-2 bg-white border-2 border-purple-400 rounded-lg text-sm font-bold text-purple-700 hover:bg-purple-100 transition-all"
                    >
                      👰 Traditional
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, title: 'Reception Makeup Look', description: 'Glamorous reception makeup with modern styling' })}
                      className="px-3 py-2 bg-white border-2 border-pink-400 rounded-lg text-sm font-bold text-pink-700 hover:bg-pink-100 transition-all"
                    >
                      ✨ Reception
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, title: 'Engagement Day Makeup', description: 'Soft and natural engagement makeup with delicate accessories' })}
                      className="px-3 py-2 bg-white border-2 border-green-400 rounded-lg text-sm font-bold text-green-700 hover:bg-green-100 transition-all"
                    >
                      💍 Engagement
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Add details about makeup style, occasion..."
                    style={{ color: '#000000', fontWeight: '600', fontSize: '16px' }}
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] text-base bg-white"
                  />
                  <p className="text-xs text-gray-700 mt-1 font-semibold">Optional - Quick fill buttons add this automatically!</p>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    disabled={uploading}
                    className="px-6 py-3 border-2 border-gray-400 text-gray-700 font-bold rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontWeight: '700' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || !imageFile}
                    className="px-8 py-3 bg-gradient-to-r from-[#C9A96E] to-[#B8956A] text-white rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-extrabold text-lg shadow-lg flex items-center gap-2"
                    style={{ fontWeight: '900' }}
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      'Add Image'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Image</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleEditItem} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="relative">
                      <img src={imagePreview || selectedItem.imageUrl} alt="Preview" className="max-h-64 mx-auto" />
                      {imagePreview && imagePreview !== selectedItem.imageUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(selectedItem.imageUrl);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="mt-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                        id="image-upload-edit"
                      />
                      <label
                        htmlFor="image-upload-edit"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded cursor-pointer hover:bg-gray-200"
                      >
                        Change Image
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Bridal Makeup, Traditional Look"
                    style={{ color: '#000000', fontWeight: '600', fontSize: '16px' }}
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] text-base bg-white"
                  />
                  <p className="text-xs text-gray-700 mt-1 font-semibold">Give your image a descriptive title</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Add details about makeup style, occasion..."
                    style={{ color: '#000000', fontWeight: '600', fontSize: '16px' }}
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] text-base bg-white"
                  />
                  <p className="text-xs text-gray-700 mt-1 font-semibold">Optional: Add more context about this image</p>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    disabled={uploading}
                    className="px-6 py-3 border-2 border-gray-400 text-gray-700 font-bold rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontWeight: '700' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-8 py-3 bg-gradient-to-r from-[#C9A96E] to-[#B8956A] text-white rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-extrabold text-lg shadow-lg flex items-center gap-2"
                    style={{ fontWeight: '900' }}
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      'Update Image'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
