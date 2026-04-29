// src/components/Expenses.jsx
import React, { useState } from 'react';
import { Card, SectionTitle, ExpenseItem, Tag } from './UI';
import { CATEGORIES } from '../data/initialData';

export default function Expenses({ expenses, onDeleteExpense }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('date');

  const filtered = expenses
    .filter(e => filter === 'All' || e.cat === filter)
    .filter(e => e.desc.toLowerCase().includes(search.toLowerCase()) || e.payer.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === 'date' ? new Date(b.date) - new Date(a.date) : b.amount - a.amount);

  const total = filtered.reduce((s, e) => s + e.amount + (e.tax || 0), 0);

  return (
    <div style={{ animation: 'fadeIn 0.2s ease' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 16 }}>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--card-r)', padding: '14px 16px' }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Showing</div>
          <div style={{ fontSize: 22, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{filtered.length}</div>
          <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 3 }}>of {expenses.length} total</div>
        </div>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--card-r)', padding: '14px 16px' }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Filtered Total</div>
          <div style={{ fontSize: 22, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>₹{total.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 3 }}>₹{Math.round(total / 5).toLocaleString('en-IN')} per head</div>
        </div>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--card-r)', padding: '14px 16px' }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Avg per Expense</div>
          <div style={{ fontSize: 22, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>₹{filtered.length ? Math.round(total / filtered.length).toLocaleString('en-IN') : 0}</div>
          <div style={{ fontSize: 11, color: 'var(--green)', marginTop: 3 }}>Across all members</div>
        </div>
      </div>

      <Card>
        {/* Search + Sort */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍  Search expenses..."
            style={{
              flex: 1, background: 'var(--bg3)', border: '1px solid var(--border)',
              borderRadius: 'var(--r)', padding: '8px 12px', color: 'var(--text)',
              fontSize: 12, outline: 'none',
            }}
          />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              background: 'var(--bg3)', border: '1px solid var(--border)',
              borderRadius: 'var(--r)', padding: '8px 12px', color: 'var(--text)',
              fontSize: 12, outline: 'none',
            }}
          >
            <option value="date">Sort: Date</option>
            <option value="amount">Sort: Amount</option>
          </select>
        </div>

        {/* Category filter tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          {['All', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '5px 14px', borderRadius: 20, fontSize: 11, fontWeight: 500,
                border: filter === cat ? '1px solid var(--accent)' : '1px solid var(--border)',
                background: filter === cat ? 'rgba(124,111,247,0.15)' : 'var(--bg3)',
                color: filter === cat ? 'var(--accent2)' : 'var(--text2)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >{cat}</button>
          ))}
        </div>

        <SectionTitle>{filter === 'All' ? 'All Expenses' : `${filter} Expenses`}</SectionTitle>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text3)', fontSize: 13 }}>No expenses found</div>
        ) : (
          filtered.map(e => <ExpenseItem key={e.id} expense={e} onDelete={onDeleteExpense} />)
        )}
      </Card>
    </div>
  );
}
