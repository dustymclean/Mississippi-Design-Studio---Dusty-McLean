import { GoogleGenAI } from "@google/genai";
import { BrandIdentity, DesignCategory } from "../types";

// Note: Using 'gemini-2.5-flash-image' as the default efficient image model.
const MODEL_NAME = 'gemini-2.5-flash-image';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateApparelDesign = async (
  userPrompt: string,
  brand: BrandIdentity,
  category: DesignCategory
): Promise<string> => {
  try {
    let styleContext = "";
    let subjectContext = "";
    let visualVibe = "";

    // Matrix of styles based on Brand + Category
    if (brand === BrandIdentity.MISSISSIPPI) {
      // BRAND: MISSISSIPPI (Elegant, Minimalist)
      if (category === DesignCategory.LOGO) {
        styleContext = "Minimalist luxury logo design, typography-focused, gold foil textures, negative space.";
        subjectContext = "Brand identity, monogram, elegant vector-style graphic.";
        visualVibe = "Clean white background, high-end stationery aesthetic.";
      } else if (category === DesignCategory.EVERYDAY) {
        styleContext = "Sophisticated casual wear, soft flutter sleeves, matte fabrics, muted blush and champagne tones.";
        subjectContext = "Lifestyle apparel, wrap tops, soft t-shirts, loungewear.";
        visualVibe = "Soft natural lighting, lifestyle photography, bright airy studio, botanical accents.";
      } else {
        // SPORTSWEAR
        styleContext = "High-performance dancewear, satin finishes, mesh details, lyrical aesthetics, precision cuts.";
        subjectContext = "Professional leotards, stage costumes, performance tights.";
        visualVibe = "Dramatic studio lighting, rim lighting to highlight fabric texture, elegant poses.";
      }
    } else {
      // BRAND: OLE BROOK (Varsity, Bold)
      if (category === DesignCategory.LOGO) {
        styleContext = "Vintage mascot logo, collegiate block lettering, distressed texture, bold outlines.";
        subjectContext = "Sports team mascot, varsity letter, emblem.";
        visualVibe = "Vector illustration style, sticker aesthetic, bold primary colors.";
      } else if (category === DesignCategory.EVERYDAY) {
        styleContext = "Vintage wash t-shirts, retro screenprint style, comfort colors, fan gear.";
        subjectContext = "Spirit wear, hoodies, crew neck sweatshirts, mom-jeans aesthetic.";
        visualVibe = "Golden hour outdoor lighting, bleacher background, film grain, nostalgic feel.";
      } else {
        // SPORTSWEAR
        styleContext = "Modern athletic uniforms, moisture-wicking textures, bold vinyl numbers, aggressive styling.";
        subjectContext = "Football jerseys, cheer uniforms, track suits, compression gear.";
        visualVibe = "High-contrast stadium floodlights, dynamic angles, sharp focus, energetic atmosphere.";
      }
    }

    const fullPrompt = `
      Task: Create a photorealistic design or illustration for ${brand === BrandIdentity.MISSISSIPPI ? 'Mississippi Dancewear' : 'Ole Brook Dancewear'}.
      Category: ${category}
      
      Design DNA:
      ${styleContext}
      
      Visual Presentation:
      ${visualVibe}
      
      Subject Matter:
      ${subjectContext}
      
      Specific User Request:
      ${userPrompt}
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        // We do not use responseMimeType for image generation models like gemini-2.5-flash-image
      }
    });

    // Extract image from response parts
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return part.inlineData.data;
        }
      }
    }

    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};
