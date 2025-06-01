
"use client";
import Link from 'next/link';
import NavMenu from './NavMenu';
import ThemeToggle from '@/components/ThemeToggle';
import { Building2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Building2 className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">HandyConnect</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <NavMenu />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
