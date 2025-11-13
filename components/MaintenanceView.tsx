import React, { useState } from 'react';
import { MOCK_MAINTENANCE_TICKETS, MOCK_OEE_DATA } from '../constants';
import Card from './ui/Card';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { MaintenanceTicket, TicketStatus } from '../types';
import { PlusIcon } from './icons/IconComponents';

const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
        case TicketStatus.Open:
            return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">{status}</span>;
        case TicketStatus.InProgress:
            return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">{status}</span>;
        case TicketStatus.Resolved:
            return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">{status}</span>;
    }
};

const MaintenanceView: React.FC = () => {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(MOCK_MAINTENANCE_TICKETS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    machine: MOCK_OEE_DATA[0]?.name || '',
    issue: '',
    reportedBy: 'Operator',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.machine || !newTicket.issue) {
      alert('Please fill out all fields.');
      return;
    }
    const ticketToAdd: MaintenanceTicket = {
      id: `TKT${String(tickets.length + 10).padStart(3, '0')}`,
      ...newTicket,
      status: TicketStatus.Open,
      date: new Date().toISOString().split('T')[0],
    };
    setTickets(prevTickets => [ticketToAdd, ...prevTickets]);
    setIsModalOpen(false);
    setNewTicket({ machine: MOCK_OEE_DATA[0]?.name || '', issue: '', reportedBy: 'Operator' });
  };


  return (
    <>
      <Card>
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-bold">Maintenance Tickets</h2>
          <Button onClick={() => setIsModalOpen(true)}>
            <div className="flex items-center gap-2">
              <PlusIcon className="w-5 h-5" />
              <span>Log New Issue</span>
            </div>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.machine}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.issue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.reportedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(ticket.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log New Maintenance Issue">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="machine" className="block text-sm font-medium text-gray-700">Machine</label>
            <select id="machine" name="machine" value={newTicket.machine} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              {MOCK_OEE_DATA.map(machine => <option key={machine.name} value={machine.name}>{machine.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="issue" className="block text-sm font-medium text-gray-700">Issue Description</label>
            <textarea id="issue" name="issue" rows={3} value={newTicket.issue} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Describe the issue..."></textarea>
          </div>
          <div className="flex justify-end pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="mr-2">Cancel</Button>
            <Button type="submit">Submit Ticket</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MaintenanceView;