import type { Ticket, Customer, KBArticle, Message } from '../types';

// Mock Messages
const mockMessages: Message[] = [
  {
    id: 'msg-1',
    sender: 'customer',
    content: 'I\'m having trouble logging into my account. It keeps saying my password is incorrect.',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: 'msg-2',
    sender: 'ai',
    content: 'I understand you\'re having login issues. Let me help you with that. First, let\'s try resetting your password.',
    timestamp: '2024-01-15T10:32:00Z'
  },
  {
    id: 'msg-3',
    sender: 'customer',
    content: 'I tried that but I\'m not receiving the reset email.',
    timestamp: '2024-01-15T10:35:00Z'
  },
  {
    id: 'msg-4',
    sender: 'agent',
    content: 'Hi! I can help you with this. Let me check your account status and verify your email address.',
    timestamp: '2024-01-15T10:40:00Z'
  }
];

// Mock Tickets
export const ticketsData: Ticket[] = [
  {
    id: 'TKT-2024-001',
    title: 'Login Issues - Password Reset Not Working',
    description: 'Customer unable to log in and password reset emails are not being received.',
    status: 'in-progress',
    priority: 'high',
    category: 'Authentication',
    customerId: 'CUST-001',
    assignedAgent: 'John Smith',
    createdAt: '2024-01-15T09:30:00Z',
    updatedAt: '2024-01-15T10:40:00Z',
    messages: mockMessages,
    tags: ['login', 'password', 'email'],
    satisfactionRating: 4
  },
  {
    id: 'TKT-2024-002',
    title: 'Billing Discrepancy - Overcharged This Month',
    description: 'Customer reporting unexpected charges on their monthly invoice.',
    status: 'open',
    priority: 'medium',
    category: 'Billing',
    customerId: 'CUST-002',
    createdAt: '2024-01-15T08:15:00Z',
    updatedAt: '2024-01-15T08:15:00Z',
    messages: [
      {
        id: 'msg-5',
        sender: 'customer',
        content: 'I noticed my bill this month is $50 higher than usual. Can you please explain why?',
        timestamp: '2024-01-15T08:15:00Z'
      }
    ],
    tags: ['billing', 'overcharge', 'invoice']
  },
  {
    id: 'TKT-2024-003',
    title: 'Feature Request - Dark Mode',
    description: 'Customer requesting dark mode theme for the application.',
    status: 'resolved',
    priority: 'low',
    category: 'Feature Request',
    customerId: 'CUST-003',
    assignedAgent: 'Sarah Johnson',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
    messages: [
      {
        id: 'msg-6',
        sender: 'customer',
        content: 'Would it be possible to add a dark mode option? The bright interface hurts my eyes during long work sessions.',
        timestamp: '2024-01-14T14:20:00Z'
      },
      {
        id: 'msg-7',
        sender: 'agent',
        content: 'Thank you for the suggestion! I\'ve forwarded this to our product team. Dark mode is on our roadmap for Q2.',
        timestamp: '2024-01-15T09:00:00Z'
      }
    ],
    tags: ['feature', 'dark-mode', 'ui'],
    satisfactionRating: 5
  },
  {
    id: 'TKT-2024-004',
    title: 'API Integration Error - 429 Rate Limit',
    description: 'Customer experiencing rate limit errors when making API calls.',
    status: 'urgent',
    priority: 'urgent',
    category: 'Technical',
    customerId: 'CUST-004',
    createdAt: '2024-01-15T11:45:00Z',
    updatedAt: '2024-01-15T11:45:00Z',
    messages: [
      {
        id: 'msg-8',
        sender: 'customer',
        content: 'Our production system is getting 429 errors from your API. This is blocking our critical operations!',
        timestamp: '2024-01-15T11:45:00Z'
      }
    ],
    tags: ['api', 'rate-limit', 'production', 'urgent']
  },
  {
    id: 'TKT-2024-005',
    title: 'Account Upgrade Request',
    description: 'Customer wants to upgrade from Basic to Premium plan.',
    status: 'open',
    priority: 'medium',
    category: 'Account',
    customerId: 'CUST-005',
    createdAt: '2024-01-15T07:30:00Z',
    updatedAt: '2024-01-15T07:30:00Z',
    messages: [
      {
        id: 'msg-9',
        sender: 'customer',
        content: 'I\'d like to upgrade my account to Premium. What\'s the process and when will the changes take effect?',
        timestamp: '2024-01-15T07:30:00Z'
      }
    ],
    tags: ['upgrade', 'premium', 'billing']
  }
];

// Mock Customers
export const customersData: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Alice Johnson',
    email: 'alice.johnson@techcorp.com',
    company: 'TechCorp Solutions',
    phone: '+1 (555) 123-4567',
    tier: 'premium',
    joinedAt: '2023-06-15T00:00:00Z',
    lastActivity: '2024-01-15T10:40:00Z',
    totalTickets: 12,
    resolvedTickets: 10
  },
  {
    id: 'CUST-002',
    name: 'Bob Smith',
    email: 'bob.smith@startup.io',
    company: 'Startup Inc',
    phone: '+1 (555) 234-5678',
    tier: 'basic',
    joinedAt: '2023-09-22T00:00:00Z',
    lastActivity: '2024-01-15T08:15:00Z',
    totalTickets: 5,
    resolvedTickets: 4
  },
  {
    id: 'CUST-003',
    name: 'Carol Williams',
    email: 'carol.williams@design.studio',
    company: 'Creative Design Studio',
    tier: 'premium',
    joinedAt: '2023-03-10T00:00:00Z',
    lastActivity: '2024-01-14T14:20:00Z',
    totalTickets: 8,
    resolvedTickets: 8
  },
  {
    id: 'CUST-004',
    name: 'David Brown',
    email: 'david.brown@enterprise.com',
    company: 'Enterprise Corp',
    phone: '+1 (555) 345-6789',
    tier: 'enterprise',
    joinedAt: '2023-01-05T00:00:00Z',
    lastActivity: '2024-01-15T11:45:00Z',
    totalTickets: 25,
    resolvedTickets: 22
  },
  {
    id: 'CUST-005',
    name: 'Emma Davis',
    email: 'emma.davis@freelance.com',
    tier: 'basic',
    joinedAt: '2023-11-08T00:00:00Z',
    lastActivity: '2024-01-15T07:30:00Z',
    totalTickets: 3,
    resolvedTickets: 2
  }
];

// Mock Knowledge Base Articles
export const knowledgeBaseData: KBArticle[] = [
  {
    id: 'KB-001',
    title: 'How to Reset Your Password',
    content: `If you're having trouble accessing your account, follow these steps to reset your password:

1. Go to the login page
2. Click "Forgot Password?"
3. Enter your email address
4. Check your email for a reset link
5. Follow the link and create a new password

If you don't receive the email within 5 minutes, check your spam folder. If you still don't see it, contact our support team.

Security Tips:
- Use a strong password with at least 8 characters
- Include uppercase, lowercase, numbers, and symbols
- Don't reuse passwords from other accounts
- Consider using a password manager

If you continue to have issues, please contact our support team with your account email address.`,
    category: 'Authentication',
    tags: ['password', 'reset', 'login', 'security'],
    views: 1250,
    helpful: 45,
    notHelpful: 3,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
    author: 'Support Team'
  },
  {
    id: 'KB-002',
    title: 'Understanding Your Monthly Bill',
    content: `Your monthly bill includes several components:

Base Plan Fee:
- This is your monthly subscription fee
- Charged at the beginning of each billing cycle

Usage Charges:
- API calls beyond your plan limit
- Additional storage usage
- Premium features usage

Taxes and Fees:
- Applied based on your billing address
- May include local taxes and regulatory fees

How to Read Your Bill:
1. Check the billing period at the top
2. Review your base plan charges
3. Look at usage overages
4. Check for any credits or adjustments

Common Questions:
- Charges appear when services are used
- Billing cycles run from the 1st to the last day of the month
- Prorated charges apply for mid-month changes

If you see unexpected charges, contact our billing team with your invoice number.`,
    category: 'Billing',
    tags: ['billing', 'invoice', 'charges', 'usage'],
    views: 890,
    helpful: 38,
    notHelpful: 7,
    createdAt: '2023-11-15T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
    author: 'Billing Team'
  },
  {
    id: 'KB-003',
    title: 'API Rate Limits and Best Practices',
    content: `Our API has rate limits to ensure fair usage and optimal performance for all users.

Rate Limits by Plan:
- Basic: 1,000 requests/hour
- Premium: 10,000 requests/hour  
- Enterprise: 100,000 requests/hour

HTTP Status Codes:
- 200: Success
- 429: Rate limit exceeded
- 403: Unauthorized

Best Practices:
1. Implement exponential backoff
2. Cache responses when possible
3. Use batch requests for multiple operations
4. Monitor your usage through the dashboard

Handling 429 Errors:
- Wait before retrying (check Retry-After header)
- Implement proper error handling
- Consider upgrading your plan if hitting limits regularly

Rate Limit Headers:
- X-RateLimit-Limit: Your limit
- X-RateLimit-Remaining: Remaining requests
- X-RateLimit-Reset: When limit resets

Contact us if you need higher limits for your use case.`,
    category: 'Technical',
    tags: ['api', 'rate-limit', 'integration', 'development'],
    views: 1420,
    helpful: 62,
    notHelpful: 5,
    createdAt: '2023-10-20T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
    author: 'Engineering Team'
  },
  {
    id: 'KB-004',
    title: 'Account Security Best Practices',
    content: `Keep your account secure with these best practices:

Password Security:
- Use a unique, strong password
- Enable two-factor authentication (2FA)
- Change passwords regularly
- Never share your credentials

Account Monitoring:
- Review login activity regularly
- Set up security alerts
- Monitor API key usage
- Check for unauthorized access

Two-Factor Authentication:
1. Go to Account Settings
2. Click "Security"
3. Enable 2FA
4. Scan QR code with authenticator app
5. Save backup codes securely

API Security:
- Rotate API keys regularly
- Use environment variables
- Restrict API key permissions
- Monitor usage logs

Suspicious Activity:
If you notice unusual activity:
1. Change your password immediately
2. Revoke API keys if compromised
3. Contact our security team
4. Review recent account changes

We take security seriously and are here to help protect your account.`,
    category: 'Security',
    tags: ['security', 'password', '2fa', 'api-keys'],
    views: 756,
    helpful: 29,
    notHelpful: 2,
    createdAt: '2023-12-15T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z',
    author: 'Security Team'
  },
  {
    id: 'KB-005',
    title: 'Getting Started Guide',
    content: `Welcome! Here's how to get started with our platform:

Step 1: Set Up Your Account
- Complete your profile information
- Verify your email address
- Choose your plan
- Set up billing information

Step 2: API Setup
- Generate your first API key
- Read the API documentation
- Test with sample requests
- Implement in your application

Step 3: Dashboard Overview
- Monitor your usage
- View analytics
- Manage team members
- Access support resources

Step 4: Integration
- Follow our SDKs and libraries
- Check code examples
- Test in sandbox mode
- Deploy to production

Common First Steps:
1. Make your first API call
2. Set up webhooks
3. Configure rate limiting
4. Implement error handling

Need Help?
- Check our documentation
- Join our community forum
- Contact support
- Schedule a demo call

We're excited to have you on board!`,
    category: 'General',
    tags: ['getting-started', 'onboarding', 'setup', 'beginner'],
    views: 2150,
    helpful: 78,
    notHelpful: 4,
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z',
    author: 'Product Team'
  }
];