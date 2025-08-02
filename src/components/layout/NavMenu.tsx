
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, ListChecks, Briefcase, UserCircle, Star, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/handymen', label: 'Handymen', icon: Users },
  { href: '/tasks', label: 'Tasks', icon: ListChecks },
  { href: '/tasks/new', label: 'Post Task', icon: Briefcase },
  { href: '/reviews', label: 'Reviews', icon: Star },
  { href: '/referrals', label: 'Referrals', icon: Gift },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

interface NavMenuProps {
  isMobile?: boolean;
}

export default function NavMenu({ isMobile = false }: NavMenuProps) {
  const pathname = usePathname();

  return (
    <nav className={cn(
      isMobile ? 'flex flex-col space-y-2' : 'hidden md:flex items-center space-x-2 lg:space-x-4'
    )}>
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          asChild
          className={cn(
            'transition-colors hover:text-primary justify-start',
            isMobile ? 'w-full text-lg p-6' : 'text-sm',
            pathname === item.href ? 'text-primary font-semibold bg-accent/50' : 'text-foreground/70'
          )}
        >
          <Link href={item.href} className="flex items-center gap-4">
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
