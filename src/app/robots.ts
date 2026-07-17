import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/login/'],
      },
    ],
    sitemap: 'https://northflow.in/sitemap.xml',
  };
}
