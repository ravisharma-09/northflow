import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automation Systems',
  description: 'Eliminate repetitive tasks, engage with customers instantly, and streamline your operations with intelligent automation sequences.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
