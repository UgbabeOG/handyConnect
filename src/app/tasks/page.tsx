
import TaskCard from '@/components/domain/TaskCard';
import { placeholderTasks } from '@/lib/placeholder-data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, Search, Tag, MapPinIcon } from 'lucide-react';

export default function AvailableTasksPage() {
  // In a real app, these would be fetched and filtered based on state
  const tasks = placeholderTasks.filter(task => task.status === 'open' || task.status === 'in_progress');
  const categories = Array.from(new Set(placeholderTasks.map(t => t.category)));
  const locations = Array.from(new Set(placeholderTasks.map(t => t.location).filter(Boolean)));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-headline font-bold mb-2">Available Tasks</h1>
        <p className="text-lg text-muted-foreground">Find tasks and jobs posted by users in your community.</p>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-card border rounded-lg shadow-sm">
        <div>
          <label htmlFor="search-task" className="block text-sm font-medium text-foreground mb-1">Search Tasks</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="search-task" placeholder="e.g., Leaky faucet or Painting" className="pl-10" />
          </div>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">Category</label>
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="task-location" className="block text-sm font-medium text-foreground mb-1">Location</label>
          <Select>
            <SelectTrigger id="task-location">
              <SelectValue placeholder="Any Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Location</SelectItem>
              {locations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
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

      {/* Tasks List */}
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No tasks available at the moment. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
