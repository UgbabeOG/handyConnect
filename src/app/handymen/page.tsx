
import HandymanCard from '@/components/domain/HandymanCard';
import { placeholderHandymen } from '@/lib/placeholder-data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';

export default function BrowseHandymenPage() {
  // In a real app, these would be fetched and filtered based on state
  const handymen = placeholderHandymen; 
  const serviceTypes = Array.from(new Set(placeholderHandymen.flatMap(h => h.serviceTypes || [])));
  const locations = Array.from(new Set(placeholderHandymen.map(h => h.locationPreference).filter(Boolean)));


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-headline font-bold mb-2">Find a Handyman</h1>
        <p className="text-lg text-muted-foreground">Browse skilled professionals in your area.</p>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-card border rounded-lg shadow-sm">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">Search by Name/Skill</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="search" placeholder="e.g., John Doe or Plumbing" className="pl-10" />
          </div>
        </div>
        <div>
          <label htmlFor="service-type" className="block text-sm font-medium text-foreground mb-1">Service Type</label>
          <Select>
            <SelectTrigger id="service-type">
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {serviceTypes.map(service => (
                <SelectItem key={service} value={service}>{service}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1">Location</label>
          <Select>
            <SelectTrigger id="location">
              <SelectValue placeholder="Any Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Location</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location!}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button className="w-full">
            <Filter className="mr-2 h-4 w-4" /> Apply Filters
          </Button>
        </div>
      </div>

      {/* Handymen List */}
      {handymen.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {handymen.map((handyman) => (
            <HandymanCard key={handyman.id} handyman={handyman} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No handymen found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
