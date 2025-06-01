
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { placeholderUsers, placeholderTasks, placeholderReviews } from "@/lib/placeholder-data";
import type { User } from "@/lib/types";
import TaskCard from "@/components/domain/TaskCard";
import ReviewItem from "@/components/domain/ReviewItem";
import { Edit3, Mail, MapPin, Settings, ShieldCheck, ListChecks } from "lucide-react";

export default function ProfilePage() {
  // Assume current user is the first placeholder user
  const currentUser: User | undefined = placeholderUsers[0]; 

  if (!currentUser) {
    return <div className="text-center py-10">User profile not available. Please log in.</div>;
  }

  const userTasks = placeholderTasks.filter(task => task.postedByUserId === currentUser.id);
  const userReviewsGiven = placeholderReviews.filter(review => review.reviewerId === currentUser.id);

  return (
    <div className="space-y-10">
      {/* Profile Header */}
      <Card className="shadow-xl">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6 p-6">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="profile user" />
            <AvatarFallback className="text-3xl">{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-grow text-center md:text-left">
            <CardTitle className="text-3xl md:text-4xl font-headline">{currentUser.name}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground flex items-center justify-center md:justify-start gap-2 mt-1">
              <Mail className="h-4 w-4" /> {currentUser.email}
            </CardDescription>
            <CardDescription className="text-md text-muted-foreground flex items-center justify-center md:justify-start gap-2 mt-1">
              <MapPin className="h-4 w-4" /> {currentUser.locationPreference || "Location not set"}
            </CardDescription>
          </div>
          <Button variant="outline" size="lg">
            <Edit3 className="mr-2 h-5 w-5" /> Edit Profile
          </Button>
        </CardHeader>
      </Card>

      {/* Profile Details & Preferences */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Settings className="h-6 w-6 text-primary"/> Preferences</CardTitle>
            <CardDescription>Manage your service and location preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="location">Location Preference</Label>
              <Input id="location" defaultValue={currentUser.locationPreference || ""} placeholder="e.g., New York, NY" />
            </div>
            <div>
              <Label htmlFor="services">Service Preferences (comma-separated)</Label>
              <Input id="services" defaultValue={currentUser.servicePreferences?.join(', ') || ""} placeholder="e.g., Plumbing, Electrical" />
            </div>
            <Button className="w-full md:w-auto">Save Preferences</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><ShieldCheck className="h-6 w-6 text-primary"/> Account Security</CardTitle>
            <CardDescription>Manage your account settings and security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <Button className="w-full md:w-auto">Change Password</Button>
          </CardContent>
        </Card>
      </div>
      
      <Separator />

      {/* User Activity: My Tasks */}
      <section>
        <h2 className="text-2xl font-headline font-semibold mb-4 flex items-center gap-2"><ListChecks className="h-6 w-6 text-primary" /> My Posted Tasks</h2>
        {userTasks.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {userTasks.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        ) : (
          <p className="text-muted-foreground">You haven't posted any tasks yet.</p>
        )}
      </section>

      <Separator />

      {/* User Activity: My Reviews */}
      <section>
        <h2 className="text-2xl font-headline font-semibold mb-4">My Reviews Given</h2>
        {userReviewsGiven.length > 0 ? (
          <div className="space-y-4">
            {userReviewsGiven.map(review => <ReviewItem key={review.id} review={review} />)}
          </div>
        ) : (
          <p className="text-muted-foreground">You haven't written any reviews yet.</p>
        )}
      </section>
    </div>
  );
}
