import ClientLayout from '@/components/ClientLayout';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <ClientLayout>{children}</ClientLayout>;
}
