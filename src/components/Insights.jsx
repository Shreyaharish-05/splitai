// src/components/Insights.jsx
import React, { useState } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, SectionTitle, ProgressBar } from './UI';
import { BUDGETS, CAT_COLORS } from '../data/initialData';

const INSIGHTS = [
  { icon: '🔥', title: 'High Fun Spending Alert', body: 'Fun activities (₹26,700) account for 31.6% of total spend — above the recommended 20% cap for group trips. Consider budgeting ₹18,000 for remaining days.', type: 'red' },
  { icon: '✅', title: 'Best Value Day: May 19', body: 'May 19 had the lowest per-person cost (₹1,160/head) while maintaining 3 activities. Replicating this pattern on remaining days can save ₹2,200.', type: 'green' },
  { icon: '💡', title: 'Split Optimization Tip', body: 'Switching to "by consumption" splits for food could reduce billing disputes by ~40%. You consumed 18% less food than group average.', type: 'purple' },
  { icon: '📊', title: 'Priya Leads Group Payments', body: 'Priya has fronted ₹12,000 in payments this trip. AI recommends Arjun or Rahul pay next 2-3 expenses to rebalance cash flow stress.', type: 'amber' },
  { icon: '🎯', title: 'Budget Forecast', body: 'At current spending rate you will exceed the ₹1,00,000 group budget by ₹3,200. Reducing ₹640/person on the last 2 days keeps you on track.', type: 'blue' },
  { icon: '🧠', title: 'Spending Pattern', body: 'Group spends 40% more on weekends vs weekdays. Friday-Saturday account for 38% of total spend despite being 2 of 7 days.', type: 'purple' },
];

const tagColors = {
  red: { bg: 'rgba(244,92,92,0.1)', color: 'var(--red)', border: 'rgba(244,92,92,0.25)' },
  green: { bg: 'rgba(34,201,138,0.1)', color: 'var(--green)', border: 'rgba(34,201,138,0.25)' },
  amber: { bg: 'rgba(245,166,35,0.1)', color: 'var(--amber)', border: 'rgba(245,166,35,0.25)' },
  blue: { bg: 'rgba(59,158,255,0.1)', color: 'var(--blue)', border: 'rgba(59,158,255,0.25)' },
  purple: { bg: 'rgba(124,111,247,0.1)', color: 'var(--accent2)', border: 'rgba(124,111,247,0.25)' },
};

const ACTUALS = { Food: 13200, Stay: 32000, Travel: 5400, Fun: 26700, Shopping: 7320 };

const radarData = [
  { subject: 'Food', A: 88, B: 100 },
  { subject: 'Stay', A: 107, B: 100 },
  { subject: 'Travel', A: 90, B: 100 },
  { subject: 'Fun', A: 134, B: 100 },
  { subject: 'Shop', A: 146, B: 100 },
];

const trendData = [
  { day: 'Day 1', cumulative: 9600 }, { day: 'Day 2', cumulative: 23200 },
  { day: 'Day 3', cumulative: 39400 }, { day: 'Day 4', cumulative: 58000 },
  { day: 'Day 5', cumulative: 71600 }, { day: 'Day 6', cumulative: 84620 },
  { day: 'Day 7 (proj)', cumulative: 91000 }, { day: 'Day 8 (proj)', cumulative: 97200 },
];

const tooltipStyle = { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, color: 'var(--text)' };

export default function Insights() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ animation: 'fadeIn 0.2s ease' }}>
      {/* AI banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(124,111,247,0.12), rgba(34,201,138,0.06))',
        border: '1px solid rgba(124,111,247,0.25)', borderRadius: 'var(--card-r)',
        padding: '14px 18px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>✦</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent2)' }}>AI Analysis Complete</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>6 insights generated from {INSIGHTS.length * 2} data points across 12 expenses and 5 members</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12, marginBottom: 14 }}>
        {/* Insights list */}
        <div>
          {INSIGHTS.map((ins, i) => {
            const c = tagColors[ins.type];
            return (
              <div
                key={i}
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={{
                  background: expanded === i ? c.bg : 'var(--bg3)',
                  border: `1px solid ${expanded === i ? c.border : 'var(--border)'}`,
                  borderRadius: 'var(--r)', padding: '12px 14px', marginBottom: 8,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{ins.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: c.color, flex: 1 }}>{ins.title}</span>
                  <span style={{ fontSize: 10, color: 'var(--text3)' }}>{expanded === i ? '▲' : '▼'}</span>
                </div>
                {expanded === i && (
                  <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${c.border}` }}>
                    {ins.body}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card>
            <SectionTitle>Budget vs Actual (%)</SectionTitle>
            <ResponsiveContainer width="100%" height={160}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'var(--text3)' }} />
                <Radar name="Actual" dataKey="A" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.2} />
                <Radar name="Budget" dataKey="B" stroke="var(--green)" fill="var(--green)" fillOpacity={0.08} strokeDasharray="4 4" />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <SectionTitle>Category Budget Tracking</SectionTitle>
            {Object.entries(ACTUALS).map(([cat, spent]) => {
              const budget = BUDGETS[cat];
              const over = spent > budget;
              return (
                <div key={cat} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                    <span style={{ color: 'var(--text2)' }}>{cat}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: over ? 'var(--red)' : 'var(--green)' }}>
                      ₹{spent.toLocaleString('en-IN')} / ₹{budget.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <ProgressBar value={spent} max={budget} color={over ? 'var(--red)' : 'var(--green)'} />
                </div>
              );
            })}
          </Card>
        </div>
      </div>

      {/* Cumulative spend trend */}
      <Card>
        <SectionTitle badge="with projection">Cumulative Spend Forecast</SectionTitle>
        <ResponsiveContainer width="100%" height={130}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 9, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={tooltipStyle} formatter={v => [`₹${v.toLocaleString('en-IN')}`, 'Cumulative']} />
            <Area type="monotone" dataKey="cumulative" stroke="var(--accent)" fill="url(#grad)" strokeWidth={2} dot={{ r: 3, fill: 'var(--accent)' }} />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><div style={{ width: 12, height: 2, background: 'var(--accent)', borderRadius: 1 }} /><span style={{ fontSize: 10, color: 'var(--text3)' }}>Actual spend</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><div style={{ width: 12, height: 2, background: 'var(--accent)', borderRadius: 1, opacity: 0.4, borderTop: '1px dashed' }} /><span style={{ fontSize: 10, color: 'var(--text3)' }}>Projected (Days 7-8)</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><div style={{ width: 12, height: 2, background: 'var(--red)', borderRadius: 1 }} /><span style={{ fontSize: 10, color: 'var(--text3)' }}>₹1,00,000 budget limit</span></div>
        </div>
      </Card>
    </div>
  );
}
