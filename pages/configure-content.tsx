import React, { useState, useEffect, useRef } from 'react';
import { useContent, ContentData } from '@/context/ContentContext';
import Home from './index';

export default function ConfigureContent() {
  const { content, updateContent, saveContent, isLoading } = useContent();
  const [formData, setFormData] = useState<ContentData | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (content && !initializedRef.current) {
      setFormData(content);
      initializedRef.current = true;
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    const { name, value } = e.target;

    // Handle nested properties manually or flatten/unflatten
    if (name.startsWith('couplePortrait.')) {
        const field = name.split('.')[1];
        setFormData({
            ...formData,
            couplePortrait: {
                ...formData.couplePortrait,
                [field]: value
            }
        });
    } else if (name === 'galleryImages') {
        // Handle newline separated list
        setFormData({
            ...formData,
            galleryImages: value.split('\n').filter(s => s.trim() !== '')
        });
    } else {
        setFormData({
            ...formData,
            [name]: value
        } as any);
    }
  };

  // Update context when form changes (for live preview)
  useEffect(() => {
    if (formData) {
        updateContent(formData);
    }
  }, [formData, updateContent]);

  const uploadFile = async (files: FileList | null): Promise<string[] | null> => {
    if (!files || files.length === 0) return null;

    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
        // Create a local blob URL for the selected file
        const url = URL.createObjectURL(files[i]);
        urls.push(url);
    }
    return urls;
  };

  if (isLoading || !formData) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      {/* Left Panel: Form */}
      <div className="w-1/3 h-full overflow-y-auto p-4 border-r border-gray-800 bg-gray-900 z-50 shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-pink-500">Configure Content</h1>

        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Welcome Text</label>
                <input
                    name="welcomeText"
                    value={formData.welcomeText}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:border-pink-500 focus:outline-none transition-colors"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Welcome Audio</label>
                <div className="flex flex-col gap-2">
                    <input
                        name="welcomeAudio"
                        value={formData.welcomeAudio}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:border-pink-500 focus:outline-none transition-colors text-xs text-gray-400"
                        placeholder="Or enter URL manually"
                    />
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={async (e) => {
                            const urls = await uploadFile(e.target.files);
                            if (urls && urls[0]) {
                                setFormData({ ...formData, welcomeAudio: urls[0] });
                            }
                        }}
                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600"
                    />
                    {formData.welcomeAudio && (
                        <audio controls src={formData.welcomeAudio} className="w-full mt-2 h-8" />
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Duration Title</label>
                <input
                    name="durationText"
                    value={formData.durationText}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:border-pink-500 focus:outline-none transition-colors"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Heart Interaction Text</label>
                <input
                    name="interactiveHeartText"
                    value={formData.interactiveHeartText}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:border-pink-500 focus:outline-none transition-colors"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Heart Image</label>
                <div className="flex items-center gap-4">
                    {formData.interactiveHeartImage && (
                        <img src={formData.interactiveHeartImage} alt="Heart" className="w-16 h-16 object-contain bg-gray-800 rounded" />
                    )}
                    <div className="flex-1">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const urls = await uploadFile(e.target.files);
                                if (urls && urls[0]) {
                                    setFormData({ ...formData, interactiveHeartImage: urls[0] });
                                }
                            }}
                            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600"
                        />
                         <input
                            name="interactiveHeartImage"
                            value={formData.interactiveHeartImage}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-700 text-xs text-gray-500 mt-1 focus:outline-none"
                            placeholder="URL"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Man Portrait</label>
                    <div className="flex flex-col gap-2">
                        {formData.couplePortrait.man && (
                             <img src={formData.couplePortrait.man} alt="Man" className="w-20 h-20 object-cover rounded-full mx-auto" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const urls = await uploadFile(e.target.files);
                                if (urls && urls[0]) {
                                    setFormData({
                                        ...formData,
                                        couplePortrait: { ...formData.couplePortrait, man: urls[0] }
                                    });
                                }
                            }}
                            className="w-full text-xs text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-pink-500 file:text-white"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Woman Portrait</label>
                     <div className="flex flex-col gap-2">
                        {formData.couplePortrait.woman && (
                             <img src={formData.couplePortrait.woman} alt="Woman" className="w-20 h-20 object-cover rounded-full mx-auto" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const urls = await uploadFile(e.target.files);
                                if (urls && urls[0]) {
                                    setFormData({
                                        ...formData,
                                        couplePortrait: { ...formData.couplePortrait, woman: urls[0] }
                                    });
                                }
                            }}
                            className="w-full text-xs text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-pink-500 file:text-white"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Gallery Images</label>
                <div className="flex flex-col gap-4">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={async (e) => {
                            const urls = await uploadFile(e.target.files);
                            if (urls && urls.length > 0) {
                                setFormData({
                                    ...formData,
                                    galleryImages: [...formData.galleryImages, ...urls]
                                });
                            }
                        }}
                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600"
                    />

                    <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 bg-gray-800 rounded">
                        {formData.galleryImages.map((src, idx) => (
                            <div key={idx} className="relative group aspect-square">
                                <img src={src} alt={`Gallery ${idx}`} className="w-full h-full object-cover rounded" />
                                <button
                                    onClick={() => {
                                        const newImages = formData.galleryImages.filter((_, i) => i !== idx);
                                        setFormData({ ...formData, galleryImages: newImages });
                                    }}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    <textarea
                        name="galleryImages"
                        value={formData.galleryImages.join('\n')}
                        onChange={handleChange}
                        rows={5}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-xs font-mono focus:border-pink-500 focus:outline-none transition-colors"
                        placeholder="Edit URLs directly if needed..."
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <button
                    onClick={saveContent}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded shadow-lg transform transition-transform hover:scale-[1.02] active:scale-95"
                >
                    Save Changes
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded shadow-lg transform transition-transform hover:scale-[1.02] active:scale-95"
                >
                    Reset (Refresh)
                </button>
            </div>
        </div>
      </div>

      {/* Right Panel: Preview */}
      <div className="flex-1 relative bg-black overflow-hidden">
        <div className="absolute inset-0 origin-top-left transform scale-[0.6] w-[166.66%] h-[166.66%]">
             <Home />
        </div>
      </div>
    </div>
  );
}
