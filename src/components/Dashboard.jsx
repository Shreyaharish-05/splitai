// src/components/Dashboard.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, SectionTitle, StatCard, ExpenseItem, Avatar } from './UI';
import { CAT_COLORS, MEMBERS } from '../data/initialData';

export default function Dashboard({ expenses, balances, onAddExpense }) {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const youOwe = Object.entries(balances).filter(([n, v]) => n !== 'You' && v > 0).reduce((s, [, v]) => s + v, 0);
  const owedToYou = balances.You > 0 ? balances.You : 0;

  const catData = {};
  expenses.forEach(e => { catData[e.cat] = (catData[e.cat] || 0) + e.amount; });
  const chartData = Object.entries(catData).map(([name, value]) => ({ name, value }));

  const weekData = [
    { day: 'Mon', amount: 4200 }, { day: 'Tue', amount: 8600 }, { day: 'Wed', amount: 11400 },
    { day: 'Thu', amount: 9800 }, { day: 'Fri', amount: 14200 }, { day: 'Sat', amount: 18200 }, { day: 'Sun', amount: 6800 },
  ];

  const tooltipStyle = {
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 8, fontSize: 12, color: 'var(--text)',
  };

  return (
    <div style={{ animation: 'fadeIn 0.2s ease' }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16 }}>
        <StatCard label="Total Group Spend" value={`₹${total.toLocaleString('en-IN')}`} delta="↑ 12% this week" deltaType="up" />
        <StatCard label="You Are Owed" value={`₹${owedToYou.toLocaleString('en-IN')}`} delta="From 3 people" deltaType="neutral" style={{ '--val-color': 'var(--green)' }} />
        <StatCard label="You Owe" value="₹4,240" delta="To 2 people" deltaType="down" />
        <StatCard label="Net Balance" value="+₹4,940" delta="You're ahead" deltaType="up" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 12, marginBottom: 16 }}>
        {/* Recent Expenses */}
        <Card>
          <SectionTitle badge="Latest 6">Recent Expenses</SectionTitle>
          {expenses.slice(0, 6).map(e => <ExpenseItem key={e.id} expense={e} />)}
        </Card>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Balances */}
          <Card>
            <SectionTitle>Member Balances</SectionTitle>
            {Object.entries(balances).map(([name, bal]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                <Avatar name={name} size={30} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)' }}>{bal >= 0 ? 'Gets back' : 'Owes'}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: bal >= 0 ? 'var(--green)' : 'var(--red)' }}>
                  {bal >= 0 ? '+' : ''}₹{Math.abs(bal).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </Card>

          {/* Pie chart */}
          <Card>
            <SectionTitle>By Category</SectionTitle>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={35} outerRadius={58} paddingAngle={3} dataKey="value">
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={CAT_COLORS[entry.name]} opacity={0.85} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `₹${v.toLocaleString('en-IN')}`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
              {chartData.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: CAT_COLORS[d.name] }} />
                  <span style={{ fontSize: 10, color: 'var(--text3)' }}>{d.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Weekly Bar Chart */}
      <Card>
        <SectionTitle badge="This week">Daily Spending Trend</SectionTitle>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={weekData} barSize={28}>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Spent']} />
            <Bar dataKey="amount" fill="var(--accent)" radius={[4, 4, 0, 0]} opacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
