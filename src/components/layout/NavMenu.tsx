
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, ListChecks, Briefcase, UserCircle, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/handymen', label: 'Handymen', icon: Users },
  { href: '/tasks', label: 'Tasks', icon: ListChecks },
  { href: '/tasks/new', label: 'Post Task', icon: Briefcase },
  { href: '/reviews', label: 'Reviews', icon: Star },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          asChild
          className={cn(
            'transition-colors hover:text-primary',
            pathname === item.href ? 'text-primary font-semibold' : 'text-foreground/70'
          )}
        >
          <Link href={item.href} className="flex items-center gap-2 text-sm">
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
