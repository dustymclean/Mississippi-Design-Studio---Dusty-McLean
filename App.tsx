import React, { useState } from 'react';
import { BrandIdentity, GeneratedImage, DesignCategory } from './types';
import { BrandToggle } from './components/BrandToggle';
import { GeneratedGallery } from './components/GeneratedGallery';
import { generateApparelDesign } from './services/geminiService';
import { Sparkles, Loader2, Shirt, Dumbbell, PaintBucket } from 'lucide-react';

export default function App() {
  const [currentBrand, setCurrentBrand] = useState<BrandIdentity>(BrandIdentity.MISSISSIPPI);
  const [currentCategory, setCurrentCategory] = useState<DesignCategory>(DesignCategory.EVERYDAY);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  const isMs = currentBrand === BrandIdentity.MISSISSIPPI;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const base64Data = await generateApparelDesign(prompt, currentBrand, currentCategory);
      
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        base64: base64Data,
        prompt: prompt,
        timestamp: Date.now(),
        brand: currentBrand,
        category: currentCategory
      };

      setGeneratedImages(prev => [newImage, ...prev]);
    } catch (error) {
      console.error("Failed to generate:", error);
      alert("Failed to generate design. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getPresetPrompts = () => {
    if (isMs) {
      if (currentCategory === DesignCategory.LOGO) return ["Minimalist gold monogram", "Elegant script watermark", "Abstract swan icon"];
      if (currentCategory === DesignCategory.EVERYDAY) return ["Soft cotton wrap top", "Studio-to-street hoodie", "Balletcore cardigan"];
      return ["Performance lyrical dress", "Competition leotard with mesh", "Professional rehearsal tutu"];
    } else {
      if (currentCategory === DesignCategory.LOGO) return ["Bold Bulldog mascot head", "Varsity block letter 'OB'", "Retro badge emblem"];
      if (currentCategory === DesignCategory.EVERYDAY) return ["Vintage wash fan tee", "Cozy spirit sweatshirt", "Mom-cut denim jacket with patch"];
      return ["Game day cheer shell", "Football practice jersey", "Track warmup suit"];
    }
  };

  const categories = [
    { id: DesignCategory.EVERYDAY, label: 'Everyday Wear', icon: Shirt },
    { id: DesignCategory.SPORTSWEAR, label: 'Sportswear', icon: Dumbbell },
    { id: DesignCategory.LOGO, label: 'Brand & Logo', icon: PaintBucket },
  ];

  return (
    <div 
      className={`min-h-screen transition-colors duration-700 ease-in-out ${
        isMs ? 'bg-ms-blush/30' : 'bg-ob-gray'
      }`}
    >
      {/* Header */}
      <header className={`w-full py-6 px-8 border-b transition-colors duration-500 ${
        isMs ? 'bg-white border-ms-gold/20' : 'bg-ob-blue border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className={`text-2xl md:text-3xl transition-colors duration-500 ${
              isMs ? 'font-display text-ms-black tracking-widest' : 'font-varsity text-white uppercase tracking-wider italic'
            }`}>
              {isMs ? 'Mississippi Dancewear' : 'Ole Brook Dancewear'}
            </h1>
            <p className={`text-xs mt-1 transition-colors duration-500 ${
              isMs ? 'font-serif italic text-gray-500' : 'font-sans text-blue-200 uppercase tracking-widest font-semibold'
            }`}>
              {isMs ? 'The National Collection' : 'The Local Spirit Brand'}
            </p>
          </div>
          <div className={`hidden md:flex items-center gap-2 text-xs font-bold tracking-widest px-3 py-1 rounded border ${
            isMs ? 'border-ms-black/10 text-ms-black/50' : 'border-white/20 text-white/50'
          }`}>
             POWERED BY OLE BROOK WEB SERVICES
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-20">
        
        <BrandToggle currentBrand={currentBrand} onToggle={setCurrentBrand} />

        {/* Design Workspace */}
        <div className="max-w-4xl mx-auto">
          <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 border ${
            isMs ? 'border-ms-gold/20' : 'border-ob-blue/10'
          }`}>
            
            {/* Input Section */}
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className={`text-3xl md:text-4xl mb-4 ${
                  isMs ? 'font-serif text-gray-900 italic' : 'font-varsity text-ob-blue uppercase tracking-tight'
                }`}>
                  {isMs ? 'Design Your Collection' : 'Create Team Spirit'}
                </h2>
                
                {/* Category Selector */}
                <div className="flex flex-wrap justify-center gap-3 mt-8 mb-8">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = currentCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setCurrentCategory(cat.id)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${
                          isActive
                            ? isMs 
                              ? 'bg-black text-white shadow-lg ring-2 ring-ms-gold ring-offset-2'
                              : 'bg-ob-blue text-white shadow-lg ring-2 ring-ob-red ring-offset-2'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className={isMs ? "font-sans tracking-wide" : "font-varsity tracking-wider uppercase"}>
                          {cat.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleGenerate} className="relative">
                <div className="relative group">
                  <div className={`absolute -inset-0.5 rounded-lg blur opacity-30 transition duration-1000 group-hover:duration-200 group-hover:opacity-75 ${
                    isMs ? 'bg-gradient-to-r from-ms-gold to-pink-200' : 'bg-gradient-to-r from-ob-blue via-ob-red to-ob-gold'
                  }`}></div>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={isMs 
                      ? "Describe your vision (e.g., A minimalist black leotard with satin ribbon details...)" 
                      : "Describe your gear (e.g., A distressed royal blue t-shirt with a vintage bulldog mascot...)"
                    }
                    className="relative w-full h-32 p-6 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 resize-none font-sans text-lg shadow-inner"
                  />
                </div>

                <div className="flex flex-wrap gap-2 mt-4 mb-8 justify-center">
                  {getPresetPrompts().map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setPrompt(preset)}
                      className={`text-xs px-4 py-2 rounded-full border transition-all duration-300 ${
                        isMs 
                          ? 'border-gray-200 text-gray-500 hover:border-ms-gold hover:text-ms-gold bg-white' 
                          : 'border-gray-200 text-gray-500 hover:border-ob-blue hover:text-ob-blue hover:bg-blue-50 font-bold uppercase'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isGenerating || !prompt.trim()}
                    className={`
                      group relative overflow-hidden rounded-full px-12 py-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                      ${isMs 
                        ? 'bg-black text-white hover:bg-gray-900 ring-4 ring-ms-blush' 
                        : 'bg-ob-blue text-white hover:bg-blue-900 ring-4 ring-gray-200'
                      }
                    `}
                  >
                    <span className="relative flex items-center gap-3 text-lg font-medium">
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className={isMs ? "font-serif italic" : "font-varsity tracking-wider"}>Crafting...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span className={isMs ? "font-serif" : "font-varsity tracking-wider"}>
                            {isMs ? 'Generate Design' : 'Launch Product'}
                          </span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <GeneratedGallery images={generatedImages} brand={currentBrand} />

      </main>
    </div>
  );
}
