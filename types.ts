
export interface UploadedPhoto {
  url: string;
  name: string;
  quantity?: number; // For assigning multiple items to one photo
}

export interface ProductVariant {
  id: string;
  name: string;
  photoCount: number;
  itemCount?: number; // How many physical items are in this variant (e.g. 10 for "10 ks" pack)
  price?: number;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  imageUrl: string;
  gallery: string[];
  variants?: ProductVariant[];
  requiredPhotos: number;
  hasTextFields?: boolean;
  imageUrl_portrait?: string;
  imageUrl_landscape?: string;
  gallery_portrait?: string[];
  gallery_landscape?: string[];
}

export interface CartItem {
  id: string; // unique ID for the cart item, e.g., timestamp
  product: Product;
  quantity: number;
  price: number;
  variant?: ProductVariant;
  photos: UploadedPhoto[];
  photoGroupId: string | null;
  customText?: { [key: string]: string };
  orientation?: 'portrait' | 'landscape';
  directMailing?: boolean; // New field for mailing service
  addresses?: string[]; // Multiple receiver addresses
}

