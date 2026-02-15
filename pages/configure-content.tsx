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
                <label className="block text-sm font-medium mb-2 text-gray-300">Welcome Audio URL</label>
                <input
                    name="welcomeAudio"
                    value={formData.welcomeAudio}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:border-pink-500 focus:outline-none transition-colors"
                />
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
                <label className="block text-sm font-medium mb-2 text-gray-300">Heart Image URL</label>
                <input
                    name="interactiveHeartImage"
                    value={formData.interactiveHeartImage}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:border-pink-500 focus:outline-none transition-colors"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Man Portrait</label>
                    <input
                        name="couplePortrait.man"
                        value={formData.couplePortrait.man}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:border-pink-500 focus:outline-none transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Woman Portrait</label>
                    <input
                        name="couplePortrait.woman"
                        value={formData.couplePortrait.woman}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:border-pink-500 focus:outline-none transition-colors"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Gallery Images (One URL per line)</label>
                <textarea
                    name="galleryImages"
                    value={formData.galleryImages.join('\n')}
                    onChange={handleChange}
                    rows={10}
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-xs font-mono focus:border-pink-500 focus:outline-none transition-colors"
                />
            </div>

            <button
                onClick={saveContent}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded shadow-lg transform transition-transform hover:scale-[1.02] active:scale-95"
            >
                Save Changes
            </button>
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
