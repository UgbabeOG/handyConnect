
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HandymanCard from "@/components/domain/HandymanCard";
import TaskCard from "@/components/domain/TaskCard";
import SmartSuggestionsClient from "@/components/domain/SmartSuggestionsClient";
import { placeholderHandymen, placeholderTasks } from "@/lib/placeholder-data";
import Link from "next/link";
import { ArrowRight, Search, Send, ListChecks } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const topHandymen = placeholderHandymen.slice(0, 2);
  const topTasks = placeholderTasks.filter(task => task.status === 'open').slice(0, 2);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-24 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
         <div className="absolute inset-0 opacity-50">
            {/* Optional: Subtle background pattern or image */}
         </div>
        <div className="container relative z-10">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Connect with Skilled <span className="text-primary">Handymen</span>, Effortlessly.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find reliable local professionals for all your home repair and improvement needs. Or, offer your skills and find tasks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
              <Link href="/handymen">
                <Search className="mr-2 h-5 w-5" /> Find a Handyman
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-md">
              <Link href="/tasks/new">
                <Send className="mr-2 h-5 w-5" /> Post a Task
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section>
        <h2 className="text-3xl font-headline font-semibold text-center mb-10">How HandyConnect Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center shadow-lg">
            <CardHeader>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <Search className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline text-xl">1. Find or Post</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Users can easily search for handymen by service and location, or post tasks they need help with.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardHeader>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> 
              </div>
              <CardTitle className="font-headline text-xl">2. Connect & Book</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Connect with qualified handymen, view profiles, read reviews, and book services directly.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg">
            <CardHeader>
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <ListChecks className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline text-xl">3. Get It Done</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your chosen handyman completes the task. Pay securely and leave a review to help others.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Top Handymen Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-headline font-semibold">Top Handymen</h2>
          <Button variant="link" asChild className="text-primary hover:text-primary/80">
            <Link href="/handymen">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        {topHandymen.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {topHandymen.map(handyman => <HandymanCard key={handyman.id} handyman={handyman} />)}
          </div>
        ) : (
          <p className="text-muted-foreground">No handymen featured at the moment.</p>
        )}
      </section>

      {/* Available Tasks Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-headline font-semibold">Available Tasks</h2>
          <Button variant="link" asChild className="text-primary hover:text-primary/80">
            <Link href="/tasks">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        {topTasks.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {topTasks.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        ) : (
          <p className="text-muted-foreground">No tasks available right now. Check back soon!</p>
        )}
      </section>

      {/* Smart Suggestions Section */}
      <section>
        <SmartSuggestionsClient />
      </section>

      {/* Call to Action Section */}
      <section className="bg-secondary/50 p-8 md:p-12 rounded-lg text-center shadow-md">
        <h2 className="text-3xl font-headline font-semibold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Join HandyConnect today, whether you're looking for help or offering your skills.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/auth/signup">Sign Up Now</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/handyman/register">Register as Handyman</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
