'use client';

import { useState } from 'react';

interface Payment {
  id: string;
  label: string;
  amount: number;
  currency: 'ETH' | 'USDC';
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  nextDue: string;
  status: 'Active' | 'Paused';
}

export default function PaymentScheduler() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      label: 'Cloud Server',
      amount: 0.05,
      currency: 'ETH',
      frequency: 'Monthly',
      nextDue: '2024-01-15',
      status: 'Active'
    },
    {
      id: '2',
      label: 'Subscription Service',
      amount: 50,
      currency: 'USDC',
      frequency: 'Monthly',
      nextDue: '2024-01-20',
      status: 'Active'
    },
    {
      id: '3',
      label: 'Team Payment',
      amount: 1.2,
      currency: 'ETH',
      frequency: 'Weekly',
      nextDue: '2024-01-12',
      status: 'Active'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newPayment, setNewPayment] = useState({
    label: '',
    amount: '',
    currency: 'USDC' as 'ETH' | 'USDC',
    frequency: 'Monthly' as 'Daily' | 'Weekly' | 'Monthly'
  });

  const handleSchedule = () => {
    if (!newPayment.label || !newPayment.amount) {
      alert('Please fill in all fields');
      return;
    }

    const payment: Payment = {
      id: Date.now().toString(),
      label: newPayment.label,
      amount: parseFloat(newPayment.amount),
      currency: newPayment.currency,
      frequency: newPayment.frequency,
      nextDue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Active'
    };

    setPayments([...payments, payment]);
    setNewPayment({ label: '', amount: '', currency: 'USDC', frequency: 'Monthly' });
    setShowForm(false);
    console.log('New payment scheduled:', payment);
  };

  const handleApprove = (id: string) => {
    console.log(`Approving payment ${id}`);
    alert('Payment approved - Transaction will be processed');
  };

  const handlePause = (id: string) => {
    setPayments(payments.map(p => 
      p.id === id ? { ...p, status: p.status === 'Active' ? 'Paused' as const : 'Active' as const } : p
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Payment Scheduler</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
        >
          {showForm ? 'Cancel' : '+ New Payment'}
        </button>
      </div>

      {/* New Payment Form */}
      {showForm && (
        <div className="mb-6 p-5 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-white font-semibold mb-4">Schedule New Payment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 text-sm mb-2">Label</label>
              <input
                type="text"
                value={newPayment.label}
                onChange={(e) => setNewPayment({ ...newPayment, label: e.target.value })}
                placeholder="e.g., Cloud Server"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-2">Amount</label>
              <input
                type="number"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                placeholder="0.00"
                step="0.01"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-2">Currency</label>
              <select
                value={newPayment.currency}
                onChange={(e) => setNewPayment({ ...newPayment, currency: e.target.value as 'ETH' | 'USDC' })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="ETH">ETH</option>
                <option value="USDC">USDC</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-2">Frequency</label>
              <select
                value={newPayment.frequency}
                onChange={(e) => setNewPayment({ ...newPayment, frequency: e.target.value as 'Daily' | 'Weekly' | 'Monthly' })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleSchedule}
            className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
          >
            Schedule Payment
          </button>
        </div>
      )}

      {/* Payments List */}
      <div className="space-y-3">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white text-sm">💳</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">{payment.label}</h4>
                  <p className="text-slate-400 text-sm">{payment.frequency}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">
                  {payment.amount} {payment.currency}
                </p>
                <p className="text-slate-400 text-xs">
                  Next: {formatDate(payment.nextDue)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleApprove(payment.id)}
                className="flex-1 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-all duration-200 border border-green-500/30"
              >
                Approve
              </button>
              <button
                onClick={() => handlePause(payment.id)}
                className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  payment.status === 'Active'
                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30'
                    : 'bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/30'
                }`}
              >
                {payment.status === 'Active' ? 'Pause' : 'Resume'}
              </button>
              <button
                onClick={() => setPayments(payments.filter(p => p.id !== payment.id))}
                className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-all duration-200 border border-red-500/30"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {payments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No scheduled payments yet</p>
          <p className="text-slate-500 text-sm mt-2">Click "New Payment" to get started</p>
        </div>
      )}
    </div>
  );
}

