import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  Tag,
  Send,
  Paperclip,
  Bot,
  Lightbulb,
  Star,
  Trash2,
  Edit3
} from 'lucide-react';
import type { Ticket, Message } from '../types';

interface TicketDetailProps {
  ticket: Ticket;
  onTicketUpdate: (ticket: Ticket) => void;
  onBack: () => void;
}

export const TicketDetail: React.FC<TicketDetailProps> = ({ 
  ticket, 
  onTicketUpdate, 
  onBack 
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(ticket.status);
  const [selectedPriority, setSelectedPriority] = useState(ticket.priority);
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  const aiSuggestions = [
    {
      content: "Based on the user's description, this appears to be a login issue. I recommend checking their account status and providing password reset instructions.",
      confidence: 0.92,
      actions: ["Send password reset link", "Check account status", "Escalate to security team"]
    },
    {
      content: "This might be related to the recent system update. Consider providing information about the known issues and workarounds.",
      confidence: 0.78,
      actions: ["Share system status", "Provide workaround", "Add to FAQ"]
    }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      sender: 'agent',
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    const updatedTicket = {
      ...ticket,
      messages: [...ticket.messages, message],
      updatedAt: new Date().toISOString(),
      status: selectedStatus as any
    };

    onTicketUpdate(updatedTicket);
    setNewMessage('');
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    const updatedTicket = {
      ...ticket,
      status: status as any,
      updatedAt: new Date().toISOString()
    };
    onTicketUpdate(updatedTicket);
  };

  const handlePriorityChange = (priority: string) => {
    setSelectedPriority(priority);
    const updatedTicket = {
      ...ticket,
      priority: priority as any,
      updatedAt: new Date().toISOString()
    };
    onTicketUpdate(updatedTicket);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSenderIcon = (sender: string) => {
    switch (sender) {
      case 'customer': return <User className="w-4 h-4" />;
      case 'agent': return <User className="w-4 h-4" />;
      case 'ai': return <Bot className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getSenderColor = (sender: string) => {
    switch (sender) {
      case 'customer': return 'bg-blue-500';
      case 'agent': return 'bg-green-500';
      case 'ai': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tickets</span>
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{ticket.title}</h1>
            <p className="text-gray-600 mt-2">Ticket #{ticket.id}</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                showAISuggestions
                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI Assistant</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200">
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversation</h2>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {ticket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex space-x-3 ${
                      message.sender === 'customer' ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getSenderColor(message.sender)}`}>
                      {getSenderIcon(message.sender)}
                    </div>
                    
                    <div className={`flex-1 max-w-md ${
                      message.sender === 'customer' ? 'text-left' : 'text-right'
                    }`}>
                      <div className={`inline-block p-3 rounded-lg ${
                        message.sender === 'customer'
                          ? 'bg-gray-100 text-gray-900'
                          : message.sender === 'ai'
                          ? 'bg-purple-100 text-purple-900'
                          : 'bg-blue-100 text-blue-900'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(message.timestamp).toLocaleString()} • {message.sender}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your response..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-150">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition-colors duration-200"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {showAISuggestions && (
            <div className="bg-purple-50 rounded-xl border border-purple-200 p-6 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-900">AI Suggestions</h3>
              </div>
              
              <div className="space-y-4">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-purple-100">
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-sm text-gray-700 flex-1">{suggestion.content}</p>
                      <span className="text-xs font-medium text-purple-600 ml-3">
                        {Math.round(suggestion.confidence * 100)}% confident
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {suggestion.actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full hover:bg-purple-200 transition-colors duration-150"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={selectedPriority}
                  onChange={(e) => handlePriorityChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Agent</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Unassigned</option>
                  <option value="john">John Doe</option>
                  <option value="jane">Jane Smith</option>
                  <option value="mike">Mike Johnson</option>
                </select>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Info</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">Customer ID: {ticket.customerId}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">Category: {ticket.category}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            
            <div className="flex flex-wrap gap-2">
              {ticket.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {ticket.satisfactionRating && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Satisfaction</h3>
              
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < ticket.satisfactionRating!
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {ticket.satisfactionRating}/5
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};