import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TicketList } from './components/TicketList';
import { TicketDetail } from './components/TicketDetail';
import { CustomerList } from './components/CustomerList';
import { KnowledgeBase } from './components/KnowledgeBase';
import { Settings } from './components/Settings';
import { ticketsData, customersData, knowledgeBaseData } from './data/mockData';
import type { Ticket, Customer, KBArticle } from './types';

function App() {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(ticketsData);
  const [customers] = useState<Customer[]>(customersData);
  const [kbArticles] = useState<KBArticle[]>(knowledgeBaseData);

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setActiveView('ticket-detail');
  };

  const handleTicketUpdate = (updatedTicket: Ticket) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    ));
    setSelectedTicket(updatedTicket);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard tickets={tickets} customers={customers} />;
      case 'tickets':
        return <TicketList tickets={tickets} onTicketSelect={handleTicketSelect} />;
      case 'ticket-detail':
        return selectedTicket ? (
          <TicketDetail 
            ticket={selectedTicket} 
            onTicketUpdate={handleTicketUpdate}
            onBack={() => setActiveView('tickets')}
          />
        ) : <TicketList tickets={tickets} onTicketSelect={handleTicketSelect} />;
      case 'customers':
        return <CustomerList customers={customers} />;
      case 'knowledge-base':
        return <KnowledgeBase articles={kbArticles} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard tickets={tickets} customers={customers} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;