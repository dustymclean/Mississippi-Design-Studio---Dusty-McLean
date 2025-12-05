import React from 'react';
import { GeneratedImage, BrandIdentity } from '../types';
import { Download, ExternalLink } from 'lucide-react';

interface GeneratedGalleryProps {
  images: GeneratedImage[];
  brand: BrandIdentity;
}

export const GeneratedGallery: React.FC<GeneratedGalleryProps> = ({ images, brand }) => {
  const handleOpenInNewTab = (base64: string) => {
    // Convert base64 to blob to handle large images safely in new tabs
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  if (images.length === 0) return null;

  return (
    <div className="mt-12 w-full max-w-6xl mx-auto px-4">
      <h3 className={`text-2xl mb-6 text-center ${brand === BrandIdentity.MISSISSIPPI ? 'font-serif italic' : 'font-varsity uppercase tracking-widest'}`}>
        Recent Designs
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="aspect-square relative overflow-hidden bg-gray-50">
              <img
                src={`data:image/png;base64,${img.base64}`}
                alt={img.prompt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <button
                  onClick={() => handleOpenInNewTab(img.base64)}
                  className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-transform hover:scale-110 shadow-lg"
                  title="Open in New Tab"
                >
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">{new Date(img.timestamp).toLocaleTimeString()}</p>
              <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">{img.prompt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
