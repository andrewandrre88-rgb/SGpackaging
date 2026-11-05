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
  seoKeywords?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  isCustom?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  date: string;
  seoKeywords?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  readTime?: string;
  isCustom?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}
