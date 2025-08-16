export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  customerId: string;
  assignedAgent?: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  tags: string[];
  satisfactionRating?: number;
}

export interface Message {
  id: string;
  sender: 'customer' | 'agent' | 'ai';
  content: string;
  timestamp: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  avatar?: string;
  tier: 'basic' | 'premium' | 'enterprise';
  joinedAt: string;
  lastActivity: string;
  totalTickets: number;
  resolvedTickets: number;
}

export interface KBArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  views: number;
  helpful: number;
  notHelpful: number;
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface AIResponse {
  id: string;
  content: string;
  confidence: number;
  suggestedActions?: string[];
  relatedArticles?: string[];
}