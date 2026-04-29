// src/components/Balances.jsx
import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Card, SectionTitle, Avatar, ProgressBar } from './UI';
import { MEMBERS, CAT_COLORS } from '../data/initialData';

export default function Balances({ expenses, balances }) {
  const catData = {};
  expenses.forEach(e => { catData[e.cat] = (catData[e.cat] || 0) + e.amount; });
  const pieData = Object.entries(catData).map(([name, value]) => ({ name, value }));
  const total = Object.values(catData).reduce((a, b) => a + b, 0);

  const spenderData = MEMBERS.map(m => {
    const paid = expenses.filter(e => e.payer === m.name).reduce((s, e) => s + e.amount, 0);
    return { name: m.name, paid, color: m.color };
  }).sort((a, b) => b.paid - a.paid);

  const tooltipStyle = { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, color: 'var(--text)' };

  return (
    <div style={{ animation: 'fadeIn 0.2s ease' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        {/* Balance list */}
        <Card>
          <SectionTitle>All Member Balances</SectionTitle>
          {Object.entries(balances).map(([name, bal]) => {
            const m = MEMBERS.find(x => x.name === name);
            const maxBal = Math.max(...Object.values(balances).map(Math.abs));
            return (
              <div key={name} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <Avatar name={name} size={34} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>{bal >= 0 ? '← Gets back' : '→ Owes'}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: bal >= 0 ? 'var(--green)' : 'var(--red)' }}>
                    {bal >= 0 ? '+' : ''}₹{Math.abs(bal).toLocaleString('en-IN')}
                  </div>
                </div>
                <div style={{ height: 4, background: 'var(--bg4)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 2, transition: 'width 0.5s ease',
                    width: `${Math.round(Math.abs(bal) / maxBal * 100)}%`,
                    background: bal >= 0 ? 'var(--green)' : 'var(--red)',
                  }} />
                </div>
              </div>
            );
          })}
        </Card>

        {/* Pie + legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card>
            <SectionTitle>Spending by Category</SectionTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={28} outerRadius={52} paddingAngle={2} dataKey="value">
                    {pieData.map((e, i) => <Cell key={i} fill={CAT_COLORS[e.name]} opacity={0.85} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={v => `₹${v.toLocaleString('en-IN')}`} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1 }}>
                {pieData.map(d => (
                  <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: CAT_COLORS[d.name], flexShrink: 0 }} />
                    <div style={{ fontSize: 12, color: 'var(--text2)', flex: 1 }}>{d.name}</div>
                    <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>{Math.round(d.value / total * 100)}%</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle>Top Payers</SectionTitle>
            {spenderData.map(s => (
              <div key={s.name} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: 'var(--text2)' }}>{s.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>₹{s.paid.toLocaleString('en-IN')}</span>
                </div>
                <ProgressBar value={s.paid} max={spenderData[0].paid} color={s.color} />
              </div>
            ))}
          </Card>
        </div>
      </div>

      <Card>
        <SectionTitle>Expense Breakdown by Member</SectionTitle>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={spenderData} barSize={40}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={tooltipStyle} formatter={v => [`₹${v.toLocaleString('en-IN')}`, 'Paid']} />
            {spenderData.map((s, i) => (
              <Bar key={i} dataKey="paid" fill={s.color} radius={[4, 4, 0, 0]} opacity={0.8} />
            ))}
            <Bar dataKey="paid" radius={[4, 4, 0, 0]} opacity={0.8}>
              {spenderData.map((s, i) => <Cell key={i} fill={s.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
