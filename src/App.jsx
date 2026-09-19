// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Expenses from './components/Expenses';
import Balances from './components/Balances';
import Settlements from './components/Settlements';
import Insights from './components/Insights';
import Members from './components/Members';
import AIChat from './components/AIChat';
import AddExpenseModal from './components/AddExpenseModal';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Groups from './components/Groups';
import { Btn } from './components/UI';
import { INITIAL_EXPENSES, INITIAL_BALANCES, MEMBERS } from './data/initialData';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  expenses: 'All Expenses',
  balances: 'Balances & Analytics',
  settlements: 'Settlements',
  insights: 'AI Insights',
  members: 'Group Members',
  groups: 'Expense Groups',
};

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [members, setMembers] = useState(MEMBERS);
  const [balances, setBalances] = useState(INITIAL_BALANCES);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [currentGroup, setCurrentGroup] = useState(1);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthMode('login');
  };

  const addExpense = (expense) => {
    setExpenses(prev => [expense, ...prev]);
    // Update balances with tax splitting and assignments
    const totalAmount = expense.amount + (expense.tax || 0);
    const participants = expense.participants || Object.keys(prev[0] || {});
    const numParticipants = participants.length;

    setBalances(prev => {
      const updated = { ...prev };

      if (expense.split === 'assigned' && expense.assignments) {
        // Custom assignments
        Object.entries(expense.assignments).forEach(([person, amount]) => {
          if (person === expense.payer) {
            updated[person] = (updated[person] || 0) + (totalAmount - amount);
          } else {
            updated[person] = (updated[person] || 0) - amount;
          }
        });
        // Tax is split equally among all participants
        const taxPerPerson = (expense.tax || 0) / numParticipants;
        participants.forEach(p => {
          if (p !== expense.payer) {
            updated[p] = (updated[p] || 0) - taxPerPerson;
          } else {
            updated[p] = (updated[p] || 0) + taxPerPerson * (numParticipants - 1);
          }
        });
      } else {
        // Equal split including tax
        const perHead = totalAmount / numParticipants;
        if (expense.payer === 'You') {
          participants.forEach(p => {
            if (p !== 'You') updated[p] = (updated[p] || 0) - perHead;
          });
          updated.You = (updated.You || 0) + perHead * (numParticipants - 1);
        } else {
          // Handle other payers
          participants.forEach(p => {
            if (p === expense.payer) {
              updated[p] = (updated[p] || 0) + perHead * (numParticipants - 1);
            } else {
              updated[p] = (updated[p] || 0) - perHead;
            }
          });
        }
      }

      return updated;
    });
    showToast(`✓ "${expense.desc}" added — ₹${totalAmount.toLocaleString('en-IN')} total`);
  };

  const deleteExpense = (expenseId) => {
    const expense = expenses.find(e => e.id === expenseId);
    if (!expense) return;

    setExpenses(prev => prev.filter(e => e.id !== expenseId));

    // Reverse the balance updates
    const totalAmount = expense.amount + (expense.tax || 0);
    const participants = expense.participants || Object.keys(balances);
    const numParticipants = participants.length;

    setBalances(prev => {
      const updated = { ...prev };

      if (expense.split === 'assigned' && expense.assignments) {
        // Reverse custom assignments
        Object.entries(expense.assignments).forEach(([person, amount]) => {
          if (person === expense.payer) {
            updated[person] = (updated[person] || 0) - (totalAmount - amount);
          } else {
            updated[person] = (updated[person] || 0) + amount;
          }
        });
        // Reverse tax split
        const taxPerPerson = (expense.tax || 0) / numParticipants;
        participants.forEach(p => {
          if (p !== expense.payer) {
            updated[p] = (updated[p] || 0) + taxPerPerson;
          } else {
            updated[p] = (updated[p] || 0) - taxPerPerson * (numParticipants - 1);
          }
        });
      } else {
        // Reverse equal split
        const perHead = totalAmount / numParticipants;
        if (expense.payer === 'You') {
          participants.forEach(p => {
            if (p !== 'You') updated[p] = (updated[p] || 0) + perHead;
          });
          updated.You = (updated.You || 0) - perHead * (numParticipants - 1);
        } else {
          participants.forEach(p => {
            if (p === expense.payer) {
              updated[p] = (updated[p] || 0) - perHead * (numParticipants - 1);
            } else {
              updated[p] = (updated[p] || 0) + perHead;
            }
          });
        }
      }

      return updated;
    });

    showToast(`✓ "${expense.desc}" deleted`);
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <><Dashboard expenses={expenses} balances={balances} onAddExpense={addExpense} /><div style={{ marginTop: 12 }}><AIChat onAddExpense={addExpense} /></div></>;
      case 'expenses': return <Expenses expenses={expenses} onDeleteExpense={deleteExpense} />;
      case 'balances': return <Balances expenses={expenses} balances={balances} />;
      case 'settlements': return <Settlements />;
      case 'insights': return <Insights />;
      case 'members': return <Members expenses={expenses} balances={balances} members={members} setMembers={setMembers} onToast={showToast} />;
      case 'groups': return <Groups currentGroup={currentGroup} onGroupChange={setCurrentGroup} />;
      default: return null;
    }
  };

  if (!isLoggedIn) {
    return authMode === 'login' ? (
      <LoginForm onLogin={handleLogin} onSwitchToSignup={() => setAuthMode('signup')} />
    ) : (
      <SignupForm onSignup={handleSignup} onSwitchToLogin={() => setAuthMode('login')} />
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar page={page} setPage={setPage} memberCount={members.length} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <div style={{
          padding: '12px 20px', borderBottom: '1px solid var(--border)',
          background: 'var(--bg2)', display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>{PAGE_TITLES[page]}</div>
          <Btn onClick={handleLogout} style={{ background: 'var(--red)', color: '#fff', borderColor: 'var(--red)' }}>Logout</Btn>
          <Btn onClick={() => setShowModal(true)}>+ Add Expense</Btn>
          <Btn primary onClick={() => setPage('insights')}>✦ AI Insights</Btn>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {renderPage()}
        </div>
      </div>

      {/* Modal */}
      {showModal && <AddExpenseModal onAdd={addExpense} onClose={() => setShowModal(false)} />}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          background: 'var(--bg2)', border: '1px solid var(--green)',
          borderRadius: 10, padding: '12px 18px', fontSize: 13,
          color: 'var(--green)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          animation: 'fadeIn 0.2s ease',
        }}>{toast}</div>
      )}
    </div>
  );
}
