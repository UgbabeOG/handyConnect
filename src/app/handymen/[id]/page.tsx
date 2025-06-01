
import { placeholderHandymen, placeholderReviews, placeholderTasks } from '@/lib/placeholder-data';
import type { Handyman, Review, Task } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ReviewItem from '@/components/domain/ReviewItem';
import TaskCard from '@/components/domain/TaskCard';
import { Star, MapPin, DollarSign, Briefcase, CalendarCheck, MessageSquare, Clock } from 'lucide-react';
import Image from 'next/image';

interface HandymanDetailsPageProps {
  params: { id: string };
}

export default function HandymanDetailsPage({ params }: HandymanDetailsPageProps) {
  const handyman = placeholderHandymen.find(h => h.id === params.id);
  
  if (!handyman) {
    return <div className="text-center py-10">Handyman not found.</div>;
  }

  const handymanReviews = placeholderReviews.filter(review => review.revieweeId === handyman.id && review.type === 'user_on_handyman');
  const completedTasksByHandyman = placeholderTasks.filter(task => task.assignedToHandymanId === handyman.id && task.status === 'completed').slice(0,3);

  return (
    <div className="space-y-8">
      {/* Handyman Profile Header */}
      <Card className="overflow-hidden shadow-xl">
        <div className="relative h-48 md:h-64 w-full bg-muted">
           <Image 
            src={`https://placehold.co/1200x400.png?text=${handyman.serviceTypes?.[0] || 'Service Profile'}`} 
            alt={`${handyman.name}'s cover image`}
            layout="fill"
            objectFit="cover"
            className="opacity-80"
            data-ai-hint="workshop tools"
          />
        </div>
        <CardHeader className="relative -mt-16 md:-mt-20 px-6 pb-6 flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 bg-card/80 backdrop-blur-sm rounded-b-lg pt-4">
          <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-lg">
            <AvatarImage src={handyman.avatarUrl} alt={handyman.name} data-ai-hint="profile portrait" />
            <AvatarFallback className="text-4xl">{handyman.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-grow text-center md:text-left">
            <CardTitle className="text-3xl md:text-4xl font-headline">{handyman.name}</CardTitle>
            <CardDescription className="text-lg text-primary">{handyman.serviceTypes?.join(' / ') || 'General Handyman'}</CardDescription>
            <div className="flex items-center justify-center md:justify-start mt-2">
              <Star className="h-5 w-5 mr-1 text-accent" />
              <span className="font-semibold">{handyman.averageRating?.toFixed(1) || 'N/A'}</span>
              <span className="ml-1 text-muted-foreground">({handymanReviews.length} reviews)</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
              <CalendarCheck className="mr-2 h-5 w-5" /> Book Appointment
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <MessageSquare className="mr-2 h-5 w-5" /> Contact
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* About and Skills */}
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">About {handyman.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">{handyman.bio || 'No detailed biography available.'}</p>
            <h3 className="font-semibold text-lg mb-3 font-headline">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {handyman.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-3 text-primary" />
              <span>{handyman.locationPreference || 'Not specified'}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-3 text-green-500" />
              <span>${handyman.ratePerHour}/hr</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
              <span>Availability: {handyman.availability}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Completed Tasks Showcase */}
      {completedTasksByHandyman.length > 0 && (
        <section>
          <h2 className="text-2xl font-headline font-semibold mb-4">Recent Work</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedTasksByHandyman.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </section>
      )}

      {/* Customer Reviews */}
      <section>
        <h2 className="text-2xl font-headline font-semibold mb-4">Customer Reviews</h2>
        {handymanReviews.length > 0 ? (
          <div className="space-y-6">
            {handymanReviews.map(review => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No reviews yet for {handyman.name}.</p>
        )}
      </section>
    </div>
  );
}
