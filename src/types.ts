export interface Product {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  colors: string[];
  moq: string;
  packagingDetails: string;
  image: string;
  gallery: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}
