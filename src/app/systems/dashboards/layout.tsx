import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Dashboards',
  description: 'Track leads, monitor team performance, and gain real-time visibility into your business metrics from one centralized location.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
