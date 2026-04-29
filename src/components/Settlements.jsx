// src/components/Settlements.jsx
import React, { useState } from 'react';
import { Card, SectionTitle, Avatar, Tag, Btn } from './UI';

const OPTIMAL = [
  { from: 'Priya', to: 'You', amount: 2260 },
  { from: 'Arjun', to: 'You', amount: 1940 },
  { from: 'Rahul', to: 'Neha', amount: 480 },
  { from: 'Arjun', to: 'Neha', amount: 260 },
];

const HISTORY = [
  { from: 'Rahul', to: 'You', amount: 3400, date: 'May 15, 2025', method: 'UPI' },
  { from: 'Neha', to: 'Priya', amount: 1200, date: 'May 12, 2025', method: 'Bank Transfer' },
  { from: 'Priya', to: 'Arjun', amount: 800, date: 'May 10, 2025', method: 'Cash' },
];

export default function Settlements() {
  const [settled, setSettled] = useState([]);

  const markPaid = (i) => setSettled(prev => [...prev, i]);

  return (
    <div style={{ animation: 'fadeIn 0.2s ease' }}>
      {/* AI optimization card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(124,111,247,0.15), rgba(59,158,255,0.08))',
        border: '1px solid rgba(124,111,247,0.3)',
        borderRadius: 'var(--card-r)', padding: '16px 20px', marginBottom: 14,
        display: 'flex', alignItems: 'flex-start', gap: 14,
      }}>
        <div style={{ fontSize: 28 }}>✦</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent2)', marginBottom: 4 }}>AI-Optimized Settlement Plan</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
            AI has analyzed all balances and minimized the number of transactions needed from <strong style={{ color: 'var(--text)' }}>9 transactions</strong> down to just <strong style={{ color: 'var(--green)' }}>4 transactions</strong>. This saves everyone time and UPI fees.
          </div>
        </div>
      </div>

      <Card style={{ marginBottom: 12 }}>
        <SectionTitle badge="4 transactions">Pending Settlements</SectionTitle>
        {OPTIMAL.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
            background: settled.includes(i) ? 'rgba(34,201,138,0.06)' : 'var(--bg3)',
            border: `1px solid ${settled.includes(i) ? 'rgba(34,201,138,0.3)' : 'var(--border)'}`,
            borderRadius: 'var(--r)', marginBottom: 8,
            opacity: settled.includes(i) ? 0.6 : 1,
            transition: 'all 0.2s',
          }}>
            <Avatar name={s.from} size={34} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>
                <span style={{ color: 'var(--text2)' }}>{s.from}</span>
                <span style={{ color: 'var(--text3)', margin: '0 8px', fontSize: 16 }}>→</span>
                <span style={{ color: 'var(--text)' }}>{s.to}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>Recommended: UPI / Bank Transfer</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent2)', marginRight: 10 }}>
              ₹{s.amount.toLocaleString('en-IN')}
            </div>
            {settled.includes(i) ? (
              <Tag label="✓ Paid" type="green" />
            ) : (
              <Btn small primary onClick={() => markPaid(i)}>Mark Paid</Btn>
            )}
          </div>
        ))}
      </Card>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 14 }}>
        {[
          { label: 'Total to Settle', value: `₹${OPTIMAL.reduce((s, x) => s + x.amount, 0).toLocaleString('en-IN')}` },
          { label: 'Transactions', value: `${OPTIMAL.length - settled.length} remaining` },
          { label: 'Saved', value: '5 extra steps', sub: 'vs naive method' },
        ].map((c, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--card-r)', padding: '14px 16px' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: 18, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{c.value}</div>
            {c.sub && <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>{c.sub}</div>}
          </div>
        ))}
      </div>

      {/* History */}
      <Card>
        <SectionTitle>Settlement History</SectionTitle>
        {HISTORY.map((h, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < HISTORY.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <Avatar name={h.from} size={30} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13 }}>
                <span style={{ color: 'var(--text2)' }}>{h.from}</span>
                <span style={{ color: 'var(--text3)', margin: '0 6px' }}>→</span>
                <span>{h.to}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{h.date} · {h.method}</div>
            </div>
            <Tag label={`✓ ₹${h.amount.toLocaleString('en-IN')}`} type="green" />
          </div>
        ))}
      </Card>
    </div>
  );
}
