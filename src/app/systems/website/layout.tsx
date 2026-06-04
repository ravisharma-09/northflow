import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website Systems',
  description: 'High-performance, conversion-focused websites designed to act as the central hub for your business growth and lead generation.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
