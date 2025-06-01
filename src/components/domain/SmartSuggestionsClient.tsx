
"use client";

import { useEffect, useState } from 'react';
import { suggestRelevantServices, SuggestRelevantServicesInput, SuggestRelevantServicesOutput } from '@/ai/flows/suggest-relevant-services';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { placeholderHandymen, placeholderUsers } from '@/lib/placeholder-data'; // Using placeholder data

export default function SmartSuggestionsClient() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSuggestions() {
      setIsLoading(true);
      setError(null);
      try {
        // Create simplified profiles for the AI model
        const userProfileString = `User ID: ${placeholderUsers[0].id}, Location: ${placeholderUsers[0].locationPreference}, Service Preferences: ${placeholderUsers[0].servicePreferences?.join(', ')}`;
        
        const handymanProfilesString = placeholderHandymen.slice(0, 2).map(hm => 
          `Handyman ID: ${hm.id}, Name: ${hm.name}, Skills: ${hm.skills.join(', ')}, Location: ${hm.locationPreference}, Rate: $${hm.ratePerHour}/hr`
        ).join('; ');

        const input: SuggestRelevantServicesInput = {
          userProfile: userProfileString,
          handymanProfiles: handymanProfilesString,
        };
        
        const result: SuggestRelevantServicesOutput = await suggestRelevantServices(input);
        setSuggestions(result.suggestions);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setError("Failed to load suggestions. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSuggestions();
  }, []);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Smart Suggestions</CardTitle>
        </div>
        <CardDescription>AI-powered recommendations based on your profile and local handymen.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Loading suggestions...</p>
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center justify-center py-8 text-destructive">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <p>{error}</p>
          </div>
        )}
        {!isLoading && !error && suggestions.length > 0 && (
          <ul className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="p-3 bg-secondary/50 rounded-md shadow-sm">
                <p className="text-secondary-foreground">{suggestion}</p>
              </li>
            ))}
          </ul>
        )}
        {!isLoading && !error && suggestions.length === 0 && (
          <p className="text-muted-foreground text-center py-4">No specific suggestions available at the moment. Explore our services!</p>
        )}
      </CardContent>
    </Card>
  );
}
