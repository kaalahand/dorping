import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: object;
}

const SEOHead = ({
  title = "Reminology — Your parents' stories, kept forever",
  description = "Reminology captures your parents' life stories on WhatsApp — in Hindi, Bengali, or Tamil — and turns them into a hardcover book delivered to your home in Europe. First 5 stories free.",
  keywords = "life story preservation, family memoir, WhatsApp story collection, hardcover book, oral history, family memories, Indian diaspora, family legacy",
  canonicalUrl = "https://reminology.com/",
  ogImage = "https://reminology.com/og-image.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
}: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    const updateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) meta.setAttribute('property', name);
        else meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', canonicalUrl, true);
    updateMeta('og:image', ogImage, true);
    updateMeta('og:type', ogType, true);
    updateMeta('twitter:title', 'twitter:title');
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);
    updateMeta('twitter:card', twitterCard);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
      return () => { script.parentNode?.removeChild(script); };
    }
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, twitterCard, structuredData]);

  return null;
};

export default SEOHead;
