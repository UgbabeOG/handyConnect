
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  servicePreferences?: string[];
  locationPreference?: string;
  isHandyman: boolean;
}

export interface Handyman extends User {
  skills: string[];
  ratePerHour: number;
  availability: string; // e.g., "Mon-Fri, 9am-5pm"
  bio?: string;
  averageRating?: number;
  serviceTypes?: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  postedByUserId: string;
  postedByUser?: User; // populated for display
  assignedToHandymanId?: string | null;
  assignedToHandyman?: Handyman; // populated for display
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  pay: number;
  location: string;
  postedDate: string; // ISO date string
  dueDate?: string; // ISO date string
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewer?: User; // populated for display
  revieweeId: string; // User ID or Handyman ID
  reviewee?: User | Handyman; // populated for display
  taskId?: string | null; // Optional: if review is for a specific task
  task?: Task; // populated for display
  rating: number; // 1-5 stars
  comment: string;
  reviewDate: string; // ISO date string
  type: 'user_on_handyman' | 'handyman_on_user' | 'task_system';
}
