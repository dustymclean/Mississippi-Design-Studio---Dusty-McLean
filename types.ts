export enum BrandIdentity {
  MISSISSIPPI = 'MISSISSIPPI',
  OLE_BROOK = 'OLE_BROOK',
}

export enum DesignCategory {
  EVERYDAY = 'EVERYDAY',
  SPORTSWEAR = 'SPORTSWEAR',
  LOGO = 'LOGO',
}

export interface GeneratedImage {
  id: string;
  base64: string;
  prompt: string;
  timestamp: number;
  brand: BrandIdentity;
  category?: DesignCategory;
}

export interface BrandConfig {
  id: BrandIdentity;
  name: string;
  tagline: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  styleKeywords: string[];
}
