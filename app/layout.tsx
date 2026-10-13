import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Karthik Fresh Fruits | Farm-Fresh Produce & Organic Baskets',
  description: 'Farm-fresh fruits, organic baskets, and exotic produce delivered straight to your door with AI-powered smoothie & recipe recommendations.',
  openGraph: {
    title: 'Karthik Fresh Fruits | Farm-Fresh Produce & Organic Baskets',
    description: 'Farm-fresh fruits, organic baskets, and exotic produce delivered straight to your door with AI-powered smoothie & recipe recommendations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karthik Fresh Fruits | Farm-Fresh Produce & Organic Baskets',
    description: 'Farm-fresh fruits, organic baskets, and exotic produce delivered straight to your door with AI-powered smoothie & recipe recommendations.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body suppressHydrationWarning className="bg-emerald-50/30 text-slate-800 antialiased font-sans">{children}</body>
    </html>
  );
}
