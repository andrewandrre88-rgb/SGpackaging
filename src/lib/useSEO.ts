import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export function useSEO({ title, description, keywords, image }: SEOProps) {
  useEffect(() => {
    const originalTitle = document.title;
    
    // Update title
    if (title) {
      document.title = `${title} | SG Packaging`;
    }

    // Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description.slice(0, 160));
      }
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        const currentKeywords = metaKeywords.getAttribute('content') || '';
        metaKeywords.setAttribute('content', `${keywords}, ${currentKeywords}`);
      }
    }

    // Update OpenGraph Image
    if (image) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', image);
      }
    }

    return () => {
      document.title = originalTitle;
    };
  }, [title, description, keywords, image]);
}
