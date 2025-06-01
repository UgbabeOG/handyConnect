
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { HardHat, DollarSign } from "lucide-react"

const serviceCategories = ["Plumbing", "Electrical", "Painting", "Gardening", "Cleaning", "Moving", "General Repair", "Appliance Repair", "Carpentry", "HVAC", "Other"];

const handymanRegisterFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  skills: z.string().min(5, { message: "Please list your skills (comma-separated)."}),
  ratePerHour: z.coerce.number().min(1, { message: "Rate must be at least $1." }),
  availability: z.string().min(5, {message: "Please describe your availability."}),
  location: z.string().min(3, {message: "Please enter your service area/location."}),
  bio: z.string().min(20, {message: "Bio must be at least 20 characters."}).max(500).optional(),
  serviceTypes: z.array(z.string()).nonempty({ message: "Please select at least one service type." }),
});

type HandymanRegisterFormValues = z.infer<typeof handymanRegisterFormSchema>

export default function HandymanRegisterPage() {
  const { toast } = useToast();
  const form = useForm<HandymanRegisterFormValues>({
    resolver: zodResolver(handymanRegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      skills: "",
      availability: "Mon-Fri, 9am-5pm",
      location: "",
      serviceTypes: [],
    },
  })

  function onSubmit(data: HandymanRegisterFormValues) {
    console.log(data) // Placeholder for actual registration logic
    toast({
      title: "Handyman Registration Attempted",
      description: `Welcome, ${data.name}! Your handyman profile is being reviewed. (This is a demo).`,
    });
    // router.push('/profile'); // Redirect to profile page after successful registration
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Become a Handyman</CardTitle>
          <CardDescription>Offer your skills on HandyConnect and reach new clients.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name / Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe Services" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Pipe repair, Light installation, Painting" {...field} />
                    </FormControl>
                    <FormDescription>List your skills, separated by commas.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Service Types</FormLabel>
                    <Select onValueChange={(value) => field.onChange(value ? [value] : [])} > {/* Simplified for single select UI, can be multi-select component */}
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select main service type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceCategories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select your main service categories. For multiple, you can list more in skills/bio.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="ratePerHour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hourly Rate ($)</FormLabel>
                      <FormControl>
                         <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input type="number" placeholder="e.g., 50" className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Mon-Fri, 9am-5pm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Area / Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., New York City, Brooklyn" {...field} />
                    </FormControl>
                     <FormDescription>Where are you available to work?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Bio (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell clients a bit about yourself and your experience." className="resize-y min-h-[80px]" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                <HardHat className="mr-2 h-5 w-5" /> Register as Handyman
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-primary hover:underline">
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
