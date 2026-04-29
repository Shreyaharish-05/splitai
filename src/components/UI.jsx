// src/components/UI.jsx
import React from 'react';
import { MEMBERS, CAT_COLORS, CAT_ICONS } from '../data/initialData';

export function Avatar({ name, size = 32 }) {
  const m = MEMBERS.find(x => x.name === name) || MEMBERS[0];
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: m.color + '22', color: m.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.34, fontWeight: 600, flexShrink: 0,
    }}>{m.avatar}</div>
  );
}

export function Tag({ label, type = 'blue' }) {
  const colors = {
    green: { bg: 'rgba(34,201,138,0.12)', color: 'var(--green)', border: 'rgba(34,201,138,0.3)' },
    red: { bg: 'rgba(244,92,92,0.12)', color: 'var(--red)', border: 'rgba(244,92,92,0.3)' },
    amber: { bg: 'rgba(245,166,35,0.12)', color: 'var(--amber)', border: 'rgba(245,166,35,0.3)' },
    blue: { bg: 'rgba(59,158,255,0.12)', color: 'var(--blue)', border: 'rgba(59,158,255,0.3)' },
    purple: { bg: 'rgba(124,111,247,0.12)', color: 'var(--accent2)', border: 'rgba(124,111,247,0.3)' },
  };
  const c = colors[type] || colors.blue;
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 20,
      fontSize: 10, fontWeight: 500,
      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
    }}>{label}</span>
  );
}

export function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 'var(--card-r)', padding: '16px',
      animation: 'fadeIn 0.2s ease', ...style,
    }}>{children}</div>
  );
}

export function SectionTitle({ children, badge }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      {children}
      {badge && (
        <span style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 20, padding: '2px 8px', fontSize: 10, color: 'var(--text3)', textTransform: 'none', letterSpacing: 0 }}>
          {badge}
        </span>
      )}
    </div>
  );
}

export function StatCard({ label, value, delta, deltaType = 'neutral', style = {} }) {
  const deltaColors = { up: 'var(--green)', down: 'var(--red)', neutral: 'var(--text2)' };
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 'var(--card-r)', padding: '14px 16px', ...style,
    }}>
      <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{value}</div>
      {delta && <div style={{ fontSize: 11, marginTop: 4, color: deltaColors[deltaType] }}>{delta}</div>}
    </div>
  );
}

export function ExpenseItem({ expense, onDelete }) {
  const totalAmount = expense.amount + (expense.tax || 0);
  const perHead = (totalAmount / (expense.participants?.length || 5));
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)', animation: 'slideIn 0.2s ease' }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: CAT_COLORS[expense.cat] + '22',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
      }}>{CAT_ICONS[expense.cat]}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
          {expense.desc}
          <span style={{ display: 'inline-block', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px', fontSize: 10, color: 'var(--text2)' }}>{expense.cat}</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>
          {expense.date} · Paid by <span style={{ color: 'var(--text2)' }}>{expense.payer}</span>
          {expense.split === 'assigned' && <span style={{ color: 'var(--accent)', marginLeft: 4 }}>· Custom split</span>}
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: expense.payer === 'You' ? 'var(--green)' : 'var(--text)' }}>
            ₹{totalAmount.toLocaleString('en-IN')}
          </div>
          {expense.tax > 0 && (
            <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 1 }}>
              +₹{expense.tax} tax
            </div>
          )}
          <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>
            Your share: ₹{Math.round(perHead).toLocaleString('en-IN')}
          </div>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(expense.id)}
            style={{
              background: 'var(--red)',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '4px 8px',
              fontSize: 10,
              cursor: 'pointer',
              opacity: 0.7,
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.7'}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export function Btn({ children, onClick, primary, small, style = {} }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: small ? '5px 12px' : '8px 16px',
        borderRadius: 'var(--r)',
        border: primary ? `1px solid ${hover ? 'var(--accent)' : 'var(--accent3)'}` : '1px solid var(--border)',
        background: primary ? (hover ? 'var(--accent)' : 'var(--accent3)') : (hover ? 'var(--bg4)' : 'var(--bg3)'),
        color: primary ? '#fff' : 'var(--text)',
        fontSize: small ? 11 : 12,
        fontWeight: 500,
        transition: 'all 0.15s',
        ...style,
      }}
    >{children}</button>
  );
}

export function ProgressBar({ value, max, color = 'var(--accent)' }) {
  const pct = Math.min(Math.round((value / max) * 100), 100);
  return (
    <div style={{ height: 4, background: 'var(--bg4)', borderRadius: 2, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2, transition: 'width 0.4s ease' }} />
    </div>
  );
}
