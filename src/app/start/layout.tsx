import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Strategy Call',
  description: 'Tell us about your project. We design and build high-performing systems for modern brands.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
