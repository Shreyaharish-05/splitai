// src/components/Sidebar.jsx
import React from 'react';

const NAV_ITEMS = [
  { id: 'dashboard', icon: '⬡', label: 'Dashboard' },
  { id: 'expenses', icon: '↕', label: 'Expenses' },
  { id: 'balances', icon: '⊜', label: 'Balances' },
  { id: 'settlements', icon: '✓', label: 'Settlements' },
  { id: 'insights', icon: '◈', label: 'AI Insights' },
  { id: 'members', icon: '◎', label: 'Members' },
  { id: 'groups', icon: '👥', label: 'Groups' },
];

const s = {
  sidebar: { width: 220, background: 'var(--bg2)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0, height: '100%' },
  logo: { padding: '20px 18px 16px', borderBottom: '1px solid var(--border)' },
  logoMark: { fontSize: 20, fontWeight: 700, letterSpacing: -1 },
  logoSub: { fontSize: 10, color: 'var(--text3)', marginTop: 3, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5 },
  nav: { padding: '12px 8px', flex: 1 },
  navItem: (active) => ({
    display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px',
    borderRadius: 'var(--r)', cursor: 'pointer', fontSize: 13,
    color: active ? 'var(--accent)' : 'var(--text2)',
    background: active ? 'rgba(40,167,69,0.15)' : 'transparent',
    border: active ? '1px solid rgba(40,167,69,0.3)' : '1px solid transparent',
    marginBottom: 2, transition: 'all 0.15s',
  }),
  navIcon: { width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 },
  footer: { padding: '12px 8px 16px', borderTop: '1px solid var(--border)' },
  groupBadge: { background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '10px 12px' },
  groupName: { fontWeight: 600, fontSize: 13, marginBottom: 3 },
  groupMeta: { color: 'var(--text3)', fontSize: 11 },
};

export default function Sidebar({ page, setPage, memberCount = 5 }) {
  return (
    <div style={s.sidebar}>
      <div style={s.logo}>
        <div style={s.logoMark}>
          split<span style={{ color: 'var(--accent)' }}>AI</span>
        </div>
        <div style={s.logoSub}>Generative AI · Expense Sharing</div>
      </div>
      <nav style={s.nav}>
        {NAV_ITEMS.map(item => (
          <div
            key={item.id}
            style={s.navItem(page === item.id)}
            onClick={() => setPage(item.id)}
          >
            <div style={s.navIcon}>{item.icon}</div>
            {item.label}
          </div>
        ))}
      </nav>
      <div style={s.footer}>
        <div style={s.groupBadge}>
          <div style={s.groupName}>🏠 Goa Trip 2025</div>
          <div style={s.groupMeta}>{memberCount} members · Active</div>
        </div>
      </div>
    </div>
  );
}
