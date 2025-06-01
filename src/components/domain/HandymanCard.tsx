
import type { Handyman } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star, MapPin, DollarSign, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface HandymanCardProps {
  handyman: Handyman;
}

export default function HandymanCard({ handyman }: HandymanCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <Image 
            src={`https://placehold.co/600x240.png?text=${handyman.serviceTypes?.[0] || 'Service'}`} 
            alt={handyman.name || 'Handyman'} 
            layout="fill" 
            objectFit="cover"
            data-ai-hint="tools service" 
          />
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-2">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src={handyman.avatarUrl} alt={handyman.name} data-ai-hint="profile person" />
              <AvatarFallback>{handyman.name?.charAt(0).toUpperCase() || 'H'}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-headline">{handyman.name}</CardTitle>
              <CardDescription className="text-sm">{handyman.serviceTypes?.join(', ') || 'Various Services'}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow px-6 pb-4">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{handyman.bio || "No biography available."}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-2 text-accent" />
            <span>{handyman.averageRating?.toFixed(1) || 'N/A'} ({placeholderReviews.filter(r => r.revieweeId === handyman.id && r.type === 'user_on_handyman').length} reviews)</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{handyman.locationPreference || 'Not specified'}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-green-500" />
            <span>${handyman.ratePerHour}/hr</span>
          </div>
           <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Skills: {handyman.skills.slice(0,3).join(', ') || 'N/A'}{handyman.skills.length > 3 ? '...' : ''}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/handymen/${handyman.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Placeholder for reviews count, replace with actual data fetching logic
const placeholderReviews = [
  { revieweeId: 'hm1', type: 'user_on_handyman' },
  { revieweeId: 'hm1', type: 'user_on_handyman' },
  { revieweeId: 'hm2', type: 'user_on_handyman' },
];
