import React from 'react';
import { BrandIdentity } from '../types';
import { Sparkles, Trophy } from 'lucide-react';

interface BrandToggleProps {
  currentBrand: BrandIdentity;
  onToggle: (brand: BrandIdentity) => void;
}

export const BrandToggle: React.FC<BrandToggleProps> = ({ currentBrand, onToggle }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white/50 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-gray-200 inline-flex relative">
        {/* Slider Background */}
        <div
          className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full transition-all duration-500 ease-out shadow-sm ${
            currentBrand === BrandIdentity.MISSISSIPPI
              ? 'left-1.5 bg-black'
              : 'left-[calc(50%+3px)] bg-blue-800'
          }`}
        />

        {/* Mississippi Button */}
        <button
          onClick={() => onToggle(BrandIdentity.MISSISSIPPI)}
          className={`relative z-10 px-6 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
            currentBrand === BrandIdentity.MISSISSIPPI
              ? 'text-white'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="tracking-widest font-serif">MISSISSIPPI</span>
        </button>

        {/* Ole Brook Button */}
        <button
          onClick={() => onToggle(BrandIdentity.OLE_BROOK)}
          className={`relative z-10 px-6 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
            currentBrand === BrandIdentity.OLE_BROOK
              ? 'text-white'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span className="tracking-wider font-varsity uppercase">OLE BROOK</span>
        </button>
      </div>
    </div>
  );
};
