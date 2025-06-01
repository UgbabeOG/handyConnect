
import type { Task } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, DollarSign, User, Briefcase, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

interface TaskCardProps {
  task: Task;
}

const statusColors = {
  open: 'bg-green-100 text-green-700 border-green-300',
  in_progress: 'bg-blue-100 text-blue-700 border-blue-300',
  completed: 'bg-gray-100 text-gray-700 border-gray-300',
  cancelled: 'bg-red-100 text-red-700 border-red-300',
};


export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
         <div className="relative h-40 w-full">
          <Image 
            src={`https://placehold.co/600x240.png?text=${task.category}`} 
            alt={task.title} 
            layout="fill" 
            objectFit="cover"
            data-ai-hint="tools work" 
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-xl font-headline">{task.title}</CardTitle>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[task.status]}`}>
              {task.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">{task.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow px-6 pb-4 space-y-2 text-sm">
        <div className="flex items-center">
          <Tag className="h-4 w-4 mr-2 text-primary" />
          <span>Category: {task.category}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-primary" />
          <span>{task.location}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-2 text-green-500" />
          <span>Pay: ${task.pay}</span>
        </div>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>Posted by: {task.postedByUser?.name || 'Unknown User'}</span>
        </div>
        {task.assignedToHandyman && (
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Assigned to: {task.assignedToHandyman.name}</span>
          </div>
        )}
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>Posted: {formatDistanceToNow(new Date(task.postedDate), { addSuffix: true })}</span>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          {task.status === 'open' ? 'View & Apply' : 'View Details'}
        </Button>
      </CardFooter>
    </Card>
  );
}
