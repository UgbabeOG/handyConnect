
import type { Review } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewItemProps {
  review: Review;
}

const renderStars = (rating: number) => {
  return Array(5).fill(null).map((_, i) => (
    <Star key={i} className={`h-5 w-5 ${i < rating ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
  ));
};

export default function ReviewItem({ review }: ReviewItemProps) {
  const revieweeName = review.reviewee ? review.reviewee.name : (review.type === 'task_system' ? 'Task System' : 'Unknown');
  const reviewerName = review.reviewer ? review.reviewer.name : 'Anonymous';
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={review.reviewer?.avatarUrl} alt={reviewerName} data-ai-hint="profile person" />
            <AvatarFallback>{reviewerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-headline">
              {review.type === 'task_system' ? `Review for ${revieweeName}` : `Review by ${reviewerName}`}
            </CardTitle>
            {review.type !== 'task_system' && (
                 <CardDescription className="text-xs">
                    For: {revieweeName} {review.task && `(Task: ${review.task.title})`}
                 </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-2">
          {renderStars(review.rating)}
        </div>
        <p className="text-sm text-foreground mb-2">{review.comment}</p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(review.reviewDate), 'MMMM d, yyyy')}
        </p>
      </CardContent>
    </Card>
  );
}
