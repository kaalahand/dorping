import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'AI Craft - From Idea to Final Draft in Seconds',
  description: 'Transform your simple thoughts into perfectly structured, ready-to-use content with our AI assistant that asks the right questions.',
  keywords: 'AI writing, content creation, email writing, document creation, AI assistant',
  authors: [{ name: 'AI Craft Team' }],
  creator: 'AI Craft',
  publisher: 'AI Craft',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aicraft.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AI Craft - From Idea to Final Draft in Seconds',
    description: 'Transform your simple thoughts into perfectly structured, ready-to-use content with our AI assistant.',
    url: 'https://aicraft.com',
    siteName: 'AI Craft',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Craft - AI Content Creation Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Craft - From Idea to Final Draft in Seconds',
    description: 'Transform your simple thoughts into perfectly structured, ready-to-use content.',
    images: ['/og-image.jpg'],
    creator: '@aicraft',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}