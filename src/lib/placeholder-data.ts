
import type { Handyman, Task, Review, User } from './types';

export const placeholderUsers: User[] = [
  { id: 'user1', name: 'Alice Wonderland', email: 'alice@example.com', avatarUrl: 'https://placehold.co/100x100', servicePreferences: ['Plumbing', 'Gardening'], locationPreference: 'New York, NY', isHandyman: false },
  { id: 'user2', name: 'Bob The Builder', email: 'bob@example.com', avatarUrl: 'https://placehold.co/100x100', servicePreferences: ['Electrical'], locationPreference: 'San Francisco, CA', isHandyman: false },
];

export const placeholderHandymen: Handyman[] = [
  { 
    id: 'hm1', 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    avatarUrl: 'https://placehold.co/150x150',
    skills: ['Plumbing', 'Pipe Repair', 'Fixture Installation'], 
    ratePerHour: 50, 
    availability: 'Mon-Fri, 9am-5pm', 
    isHandyman: true, 
    locationPreference: 'New York, NY',
    averageRating: 4.5,
    bio: 'Experienced plumber with 10+ years in the field. Reliable and efficient.',
    serviceTypes: ['Plumbing']
  },
  { 
    id: 'hm2', 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    avatarUrl: 'https://placehold.co/150x150',
    skills: ['Electrical Wiring', 'Light Installation', 'Appliance Repair'], 
    ratePerHour: 65, 
    availability: 'Weekends, 10am-6pm', 
    isHandyman: true, 
    locationPreference: 'San Francisco, CA',
    averageRating: 4.8,
    bio: 'Certified electrician specializing in residential projects. Safety first!',
    serviceTypes: ['Electrical']
  },
  { 
    id: 'hm3', 
    name: 'Mike Johnson', 
    email: 'mike.j@example.com', 
    avatarUrl: 'https://placehold.co/150x150',
    skills: ['Painting', 'Drywall Repair', 'Home Renovation'], 
    ratePerHour: 40, 
    availability: 'Mon-Sat, 8am-7pm', 
    isHandyman: true, 
    locationPreference: 'New York, NY',
    averageRating: 4.2,
    bio: 'Versatile handyman for all your home improvement needs. Quick and affordable.',
    serviceTypes: ['Painting', 'General Repair']
  },
];

export const placeholderTasks: Task[] = [
  { 
    id: 'task1', 
    title: 'Fix Leaky Faucet', 
    description: 'My kitchen faucet is dripping constantly. Need someone to fix it.', 
    category: 'Plumbing',
    postedByUserId: 'user1',
    postedByUser: placeholderUsers[0],
    status: 'open', 
    pay: 75, 
    location: 'New York, NY', 
    postedDate: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
  },
  { 
    id: 'task2', 
    title: 'Install Ceiling Fan', 
    description: 'Need a ceiling fan installed in the living room. Wiring is already there.', 
    category: 'Electrical',
    postedByUserId: 'user2',
    postedByUser: placeholderUsers[1],
    status: 'in_progress', 
    pay: 120, 
    location: 'San Francisco, CA', 
    postedDate: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    assignedToHandymanId: 'hm2',
    assignedToHandyman: placeholderHandymen[1],
  },
  { 
    id: 'task3', 
    title: 'Paint Bedroom Walls', 
    description: 'Looking for someone to paint three walls in a medium-sized bedroom. Paint will be provided.', 
    category: 'Painting',
    postedByUserId: 'user1',
    postedByUser: placeholderUsers[0],
    status: 'completed', 
    pay: 250, 
    location: 'New York, NY', 
    postedDate: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
    assignedToHandymanId: 'hm3',
    assignedToHandyman: placeholderHandymen[2],
  },
];

export const placeholderReviews: Review[] = [
  { 
    id: 'review1', 
    reviewerId: 'user1', 
    reviewer: placeholderUsers[0],
    revieweeId: 'hm1', 
    reviewee: placeholderHandymen[0],
    taskId: 'task1', 
    rating: 5, 
    comment: 'John was fantastic! Fixed my faucet quickly and was very professional.', 
    reviewDate: new Date(Date.now() - 86400000 * 1).toISOString(),
    type: 'user_on_handyman',
  },
  { 
    id: 'review2', 
    reviewerId: 'user2', 
    reviewer: placeholderUsers[1],
    revieweeId: 'hm2', 
    reviewee: placeholderHandymen[1],
    taskId: 'task2', 
    rating: 4, 
    comment: 'Jane did a good job with the fan installation. Took a bit longer than expected but quality work.', 
    reviewDate: new Date().toISOString(),
    type: 'user_on_handyman',
  },
  { 
    id: 'review3', 
    reviewerId: 'hm3', 
    reviewer: placeholderHandymen[2],
    revieweeId: 'user1', 
    reviewee: placeholderUsers[0],
    taskId: 'task3', 
    rating: 5, 
    comment: 'Alice was a great client, clear instructions and prompt payment.', 
    reviewDate: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    type: 'handyman_on_user',
  },
  { 
    id: 'review4', 
    reviewerId: 'user1',
    reviewer: placeholderUsers[0], 
    revieweeId: 'system', // Special ID for system reviews
    rating: 5, 
    comment: 'The task posting system is very easy to use!', 
    reviewDate: new Date(Date.now() - 86400000 * 3).toISOString(),
    type: 'task_system',
  },
];
