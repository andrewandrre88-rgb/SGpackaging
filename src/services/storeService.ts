import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrors';
import { Product, BlogPost } from '../types';
import { PRODUCTS, INITIAL_BLOG_POSTS } from '../data';

const PRODUCTS_COLLECTION = 'products';
const BLOG_COLLECTION = 'blog_posts';

/**
 * Hook to retrieve all products (Firestore custom products merged with catalog defaults)
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const colRef = collection(db, PRODUCTS_COLLECTION);
      const unsubscribe = onSnapshot(
        colRef,
        (snapshot) => {
          const remoteProducts: Product[] = snapshot.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              name: data.name,
              category: data.category,
              shortDescription: data.shortDescription,
              description: data.description,
              features: Array.isArray(data.features) ? data.features : [],
              specifications: typeof data.specifications === 'object' && data.specifications ? data.specifications : {},
              colors: Array.isArray(data.colors) ? data.colors : [],
              moq: data.moq || '10,000 pcs',
              packagingDetails: data.packagingDetails || 'Standard export packaging',
              image: data.image,
              gallery: Array.isArray(data.gallery) && data.gallery.length > 0 ? data.gallery : [data.image],
              seoKeywords: data.seoKeywords || '',
              createdBy: data.createdBy,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
              isCustom: true,
            };
          });

          // Combine with default products, prioritizing custom products by ID
          const customIds = new Set(remoteProducts.map((p) => p.id));
          const baseProducts = PRODUCTS.filter((p) => !customIds.has(p.id));
          setProducts([...remoteProducts, ...baseProducts]);
          setLoading(false);
        },
        (err) => {
          console.error('Error fetching products:', err);
          setError(err.message);
          setLoading(false);
          handleFirestoreError(err, OperationType.GET, PRODUCTS_COLLECTION);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Snapshot init error:', err);
      setLoading(false);
    }
  }, []);

  return { products, loading, error };
}

/**
 * Hook to retrieve all blog posts (Firestore custom posts merged with defaults)
 */
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const colRef = collection(db, BLOG_COLLECTION);
      const unsubscribe = onSnapshot(
        colRef,
        (snapshot) => {
          const remotePosts: BlogPost[] = snapshot.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              title: data.title,
              category: data.category,
              excerpt: data.excerpt,
              content: data.content,
              author: data.author,
              image: data.image,
              date: data.date,
              seoKeywords: data.seoKeywords || '',
              createdBy: data.createdBy,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
              readTime: data.readTime || '4 min read',
              isCustom: true,
            };
          });

          const customIds = new Set(remotePosts.map((p) => p.id));
          const basePosts = INITIAL_BLOG_POSTS.filter((p) => !customIds.has(p.id));
          setPosts([...remotePosts, ...basePosts]);
          setLoading(false);
        },
        (err) => {
          console.error('Error fetching blog posts:', err);
          setError(err.message);
          setLoading(false);
          handleFirestoreError(err, OperationType.GET, BLOG_COLLECTION);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Snapshot init error:', err);
      setLoading(false);
    }
  }, []);

  return { posts, loading, error };
}

/**
 * Add a new product to Firestore
 */
export async function createProduct(productData: {
  id?: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  features?: string[];
  specifications?: { [key: string]: string };
  colors?: string[];
  moq?: string;
  packagingDetails?: string;
  image: string;
  gallery?: string[];
  seoKeywords?: string;
}) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('Must be signed in to add products.');
  }

  // Generate safe valid ID
  const cleanId = (productData.id || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`)
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-');

  const now = new Date().toISOString();

  const payload: any = {
    name: productData.name.trim().slice(0, 200),
    category: productData.category.trim().slice(0, 100),
    shortDescription: productData.shortDescription.trim().slice(0, 500),
    description: productData.description.trim().slice(0, 5000),
    features: productData.features || [],
    specifications: productData.specifications || {},
    colors: productData.colors || ['Custom colors available'],
    moq: (productData.moq || '10,000 pcs').slice(0, 100),
    packagingDetails: (productData.packagingDetails || 'Standard export carton').slice(0, 500),
    image: productData.image.slice(0, 200000),
    gallery: productData.gallery && productData.gallery.length > 0 
      ? productData.gallery.map(g => g.slice(0, 200000))
      : [productData.image.slice(0, 200000)],
    createdBy: currentUser.uid,
    createdAt: now,
    updatedAt: now,
  };

  if (productData.seoKeywords) {
    payload.seoKeywords = productData.seoKeywords.trim().slice(0, 500);
  }

  const path = `${PRODUCTS_COLLECTION}/${cleanId}`;
  try {
    await setDoc(doc(db, PRODUCTS_COLLECTION, cleanId), payload);
    return cleanId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Update an existing product
 */
export async function updateProduct(id: string, updates: Partial<Product>) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('Must be signed in to edit products.');
  }
  const path = `${PRODUCTS_COLLECTION}/${id}`;
  const now = new Date().toISOString();

  const defaultProduct = PRODUCTS.find((p) => p.id === id);

  const payload: any = {
    name: (updates.name ?? defaultProduct?.name ?? 'Product').trim().slice(0, 200),
    category: (updates.category ?? defaultProduct?.category ?? 'Trigger Sprayers').trim().slice(0, 100),
    shortDescription: (updates.shortDescription ?? defaultProduct?.shortDescription ?? '').trim().slice(0, 500),
    description: (updates.description ?? defaultProduct?.description ?? '').trim().slice(0, 5000),
    image: (updates.image ?? defaultProduct?.image ?? '').slice(0, 200000),
    gallery: Array.isArray(updates.gallery) && updates.gallery.length > 0
      ? updates.gallery.map(g => g.slice(0, 200000))
      : defaultProduct?.gallery || [updates.image || defaultProduct?.image || ''],
    features: updates.features ?? defaultProduct?.features ?? [],
    specifications: updates.specifications ?? defaultProduct?.specifications ?? {},
    colors: updates.colors ?? defaultProduct?.colors ?? ['White', 'Black'],
    moq: (updates.moq ?? defaultProduct?.moq ?? '10,000 pcs').slice(0, 100),
    packagingDetails: (updates.packagingDetails ?? defaultProduct?.packagingDetails ?? 'Standard export carton').slice(0, 500),
    seoKeywords: (updates.seoKeywords ?? defaultProduct?.seoKeywords ?? '').trim().slice(0, 500),
    createdBy: updates.createdBy ?? defaultProduct?.createdBy ?? currentUser.uid,
    updatedAt: now,
  };

  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await setDoc(docRef, payload, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string) {
  const path = `${PRODUCTS_COLLECTION}/${id}`;
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Add a new blog post
 */
export async function createBlogPost(postData: {
  id?: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  date?: string;
  readTime?: string;
  seoKeywords?: string;
}) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('Must be signed in to add blog posts.');
  }

  const cleanId = (postData.id || `post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`)
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-');

  const now = new Date().toISOString();
  const formattedDate = postData.date || new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const payload: any = {
    title: postData.title.trim().slice(0, 250),
    category: postData.category.trim().slice(0, 100),
    excerpt: postData.excerpt.trim().slice(0, 800),
    content: postData.content.trim().slice(0, 20000),
    author: postData.author.trim().slice(0, 100),
    image: postData.image.slice(0, 200000),
    date: formattedDate.slice(0, 50),
    readTime: postData.readTime || '5 min read',
    createdBy: currentUser.uid,
    createdAt: now,
    updatedAt: now,
  };

  if (postData.seoKeywords) {
    payload.seoKeywords = postData.seoKeywords.trim().slice(0, 500);
  }

  const path = `${BLOG_COLLECTION}/${cleanId}`;
  try {
    await setDoc(doc(db, BLOG_COLLECTION, cleanId), payload);
    return cleanId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Update an existing blog post
 */
export async function updateBlogPost(id: string, updates: Partial<BlogPost>) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('Must be signed in to edit blog posts.');
  }
  const path = `${BLOG_COLLECTION}/${id}`;
  const now = new Date().toISOString();

  const defaultPost = INITIAL_BLOG_POSTS.find((p) => p.id === id);

  const payload: any = {
    title: (updates.title ?? defaultPost?.title ?? 'Blog Post').trim().slice(0, 250),
    category: (updates.category ?? defaultPost?.category ?? 'Industry Trends').trim().slice(0, 100),
    excerpt: (updates.excerpt ?? defaultPost?.excerpt ?? '').trim().slice(0, 800),
    content: (updates.content ?? defaultPost?.content ?? '').trim().slice(0, 20000),
    author: (updates.author ?? defaultPost?.author ?? 'SG Packaging Team').trim().slice(0, 100),
    image: (updates.image ?? defaultPost?.image ?? '').slice(0, 200000),
    date: (updates.date ?? defaultPost?.date ?? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })).slice(0, 50),
    readTime: updates.readTime ?? defaultPost?.readTime ?? '5 min read',
    seoKeywords: (updates.seoKeywords ?? defaultPost?.seoKeywords ?? '').trim().slice(0, 500),
    createdBy: updates.createdBy ?? defaultPost?.createdBy ?? currentUser.uid,
    updatedAt: now,
  };

  try {
    const docRef = doc(db, BLOG_COLLECTION, id);
    await setDoc(docRef, payload, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Delete a blog post
 */
export async function deleteBlogPost(id: string) {
  const path = `${BLOG_COLLECTION}/${id}`;
  try {
    await deleteDoc(doc(db, BLOG_COLLECTION, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
