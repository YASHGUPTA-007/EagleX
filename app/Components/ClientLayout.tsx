// app/Components/ClientLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './Navbar';
import EagleCursor from './EagleCursor';
import SmoothScrolling from './SmoothScrolling';
import Footer from './Footer';
import PageLoader from './PageLoader';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if current route is an admin route
  const isAdminRoute = pathname?.startsWith('/admin');

  // Add/remove admin class to body
  useEffect(() => {
    if (isAdminRoute) {
      document.body.classList.add('admin-route');
    } else {
      document.body.classList.remove('admin-route');
    }

    return () => {
      document.body.classList.remove('admin-route');
    };
  }, [isAdminRoute]);

  // If it's an admin route, render only children without Navbar, Footer, etc.
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For regular routes, render with all components
  return (
    <>
      <PageLoader />
      <SmoothScrolling />
      <Navbar />
      <EagleCursor />
      {children}
      <Footer />
    </>
  );
}