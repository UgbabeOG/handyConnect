
import ReviewItem from '@/components/domain/ReviewItem';
import { placeholderReviews } from '@/lib/placeholder-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, HardHat, CheckSquare } from 'lucide-react';

export default function ReviewsPage() {
  const handymanReviews = placeholderReviews.filter(r => r.type === 'user_on_handyman');
  const userReviews = placeholderReviews.filter(r => r.type === 'handyman_on_user');
  const taskSystemReviews = placeholderReviews.filter(r => r.type === 'task_system');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-headline font-bold mb-2">Community Reviews</h1>
        <p className="text-lg text-muted-foreground">See what people are saying about handymen, users, and our platform.</p>
      </div>

      <Tabs defaultValue="handyman-reviews" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
          <TabsTrigger value="handyman-reviews" className="text-base py-3">
            <HardHat className="mr-2 h-5 w-5"/> Handyman Reviews
          </TabsTrigger>
          <TabsTrigger value="user-reviews" className="text-base py-3">
            <Users className="mr-2 h-5 w-5"/> User Reviews
          </TabsTrigger>
          <TabsTrigger value="task-system-reviews" className="text-base py-3">
            <CheckSquare className="mr-2 h-5 w-5"/> Platform Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="handyman-reviews">
          <h2 className="text-2xl font-headline font-semibold mb-6">Reviews for Handymen</h2>
          {handymanReviews.length > 0 ? (
            <div className="space-y-6">
              {handymanReviews.map(review => <ReviewItem key={review.id} review={review} />)}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No handyman reviews yet.</p>
          )}
        </TabsContent>

        <TabsContent value="user-reviews">
          <h2 className="text-2xl font-headline font-semibold mb-6">Reviews for Users</h2>
          {userReviews.length > 0 ? (
            <div className="space-y-6">
              {userReviews.map(review => <ReviewItem key={review.id} review={review} />)}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No user reviews yet.</p>
          )}
        </TabsContent>

        <TabsContent value="task-system-reviews">
          <h2 className="text-2xl font-headline font-semibold mb-6">Platform & Task System Feedback</h2>
          {taskSystemReviews.length > 0 ? (
            <div className="space-y-6">
              {taskSystemReviews.map(review => <ReviewItem key={review.id} review={review} />)}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No platform feedback submitted yet.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
