import React, { useState } from 'react';
import { MOCK_SOPS } from '../constants';
import Card from './ui/Card';
import { Sop } from '../types';

const SopModal: React.FC<{ sop: Sop; onClose: () => void }> = ({ sop, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">{sop.title}</h2>
          <p className="text-sm text-gray-500">{sop.category}</p>
        </div>
        <div className="p-6">
          <h3 className="font-semibold mb-2">Steps:</h3>
          <ol className="list-decimal list-inside space-y-2">
            {sop.steps.map((step, index) => <li key={index}>{step}</li>)}
          </ol>
        </div>
        <div className="p-4 bg-gray-50 text-right">
          <button onClick={onClose} className="px-4 py-2 bg-bc-green text-white rounded-lg">Close</button>
        </div>
      </div>
    </div>
  );
};


const SopView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSop, setSelectedSop] = useState<Sop | null>(null);

    const filteredSops = MOCK_SOPS.filter(sop => 
        sop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sop.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Card>
                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Search SOPs by title or category..."
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <ul className="divide-y divide-gray-200">
                    {filteredSops.map(sop => (
                        <li key={sop.id} onClick={() => setSelectedSop(sop)} className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{sop.title}</p>
                                <p className="text-sm text-gray-500">{sop.category}</p>
                            </div>
                            <span className="text-bc-blue font-semibold">&gt;</span>
                        </li>
                    ))}
                </ul>
            </Card>
            {selectedSop && <SopModal sop={selectedSop} onClose={() => setSelectedSop(null)} />}
        </div>
    );
};

export default SopView;
