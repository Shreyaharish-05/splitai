// src/components/AIChat.jsx
import React, { useState, useRef, useEffect } from 'react';
import { AI_RESPONSES } from '../data/initialData';

export default function AIChat({ onAddExpense }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: AI_RESPONSES.greeting }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);

  const getResponse = (msg) => {
    const m = msg.toLowerCase();
    const amtMatch = msg.match(/₹?(\d+)/);
    if (amtMatch && (m.includes('add') || m.includes('paid') || m.includes('spent') || m.includes('split'))) {
      const amount = parseInt(amtMatch[1]);
      const catMap = { dinner: 'Food', lunch: 'Food', breakfast: 'Food', food: 'Food', restaurant: 'Food', hotel: 'Stay', stay: 'Stay', villa: 'Stay', taxi: 'Travel', cab: 'Travel', uber: 'Travel', scuba: 'Fun', trek: 'Fun', beach: 'Fun', club: 'Fun', shopping: 'Shopping', market: 'Shopping' };
      let cat = 'Other';
      for (const [k, v] of Object.entries(catMap)) { if (m.includes(k)) { cat = v; break; } }
      const payerMatch = msg.match(/paid by (\w+)/i);
      const payer = payerMatch ? payerMatch[1] : 'You';
      const descWords = msg.replace(/₹?\d+/, '').replace(/add/gi, '').replace(/paid by \w+/gi, '').replace(/split.*/gi, '').trim();
      const desc = descWords.charAt(0).toUpperCase() + descWords.slice(1).trim() || 'Expense';
      onAddExpense({ desc, amount, cat, payer, split: 'equal', date: new Date().toISOString().split('T')[0], participants: ['You', 'Priya', 'Rahul', 'Neha', 'Arjun'] });
      return `Done! Added **${desc}** for ₹${amount.toLocaleString('en-IN')} paid by ${payer}. Split equally — ₹${Math.round(amount / 5).toLocaleString('en-IN')} per person. Balances updated!`;
    }
    if (m.includes('owe') || m.includes('balance') || m.includes('who')) return AI_RESPONSES.balances;
    if (m.includes('summar') || m.includes('week') || m.includes('overview')) return AI_RESPONSES.summary;
    if (m.includes('budget') || m.includes('forecast')) return AI_RESPONSES.budget;
    if (m.includes('settl') || m.includes('pay back') || m.includes('optimal')) return AI_RESPONSES.settle;
    if (m.includes('hello') || m.includes('hi') || m.includes('hey')) return "Hey! Ready to help track expenses and split bills. What do you need?";
    if (m.includes('thank')) return "Happy to help! Ask me anything about your group expenses.";
    return AI_RESPONSES.default;
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: getResponse(userMsg) }]);
    }, 1100 + Math.random() * 600);
  };

  const renderText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text)">$1</strong>');
  };

  const QUICK = ['Who owes the most?', 'Summarize spending', 'Budget status', 'Optimize settlements'];

  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--card-r)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', animation: 'pulse 2s infinite' }} />
        <div style={{ fontSize: 13, fontWeight: 500 }}>AI Assistant</div>
        <div style={{ fontSize: 11, color: 'var(--text3)', marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace" }}>NLP · Expense AI</div>
      </div>

      {/* Chat body */}
      <div ref={bodyRef} style={{ padding: '14px 16px', maxHeight: 300, overflowY: 'auto' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 12, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, flexShrink: 0, marginTop: 2,
              background: msg.role === 'ai' ? 'linear-gradient(135deg, var(--accent), var(--blue))' : 'var(--accent3)',
              color: '#fff',
            }}>{msg.role === 'ai' ? 'AI' : 'YO'}</div>
            <div style={{
              maxWidth: '84%', padding: '9px 12px', borderRadius: 10, fontSize: 12.5, lineHeight: 1.55,
              background: msg.role === 'ai' ? 'var(--bg3)' : 'rgba(124,111,247,0.18)',
              border: `1px solid ${msg.role === 'ai' ? 'var(--border)' : 'rgba(124,111,247,0.3)'}`,
              color: 'var(--text2)',
            }} dangerouslySetInnerHTML={{ __html: renderText(msg.text) }} />
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 600 }}>AI</div>
            <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text3)', animation: `blink 1.2s ${d}s infinite` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick replies */}
      <div style={{ padding: '0 16px 10px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {QUICK.map(q => (
          <button
            key={q}
            onClick={() => { setInput(q); }}
            style={{
              padding: '4px 10px', background: 'var(--bg3)', border: '1px solid var(--border)',
              borderRadius: 20, fontSize: 10, color: 'var(--text3)', cursor: 'pointer',
              fontFamily: "'Sora', sans-serif", transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--border2)'; e.target.style.color = 'var(--text2)'; }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text3)'; }}
          >{q}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder='Ask or add: "₹1200 dinner paid by Priya split equally"'
          style={{
            flex: 1, background: 'var(--bg3)', border: '1px solid var(--border)',
            borderRadius: 'var(--r)', padding: '8px 12px', color: 'var(--text)',
            fontSize: 12, fontFamily: "'Sora', sans-serif", outline: 'none',
          }}
        />
        <button
          onClick={send}
          style={{
            padding: '8px 16px', background: 'var(--accent3)', border: 'none',
            borderRadius: 'var(--r)', color: '#fff', fontSize: 12,
            fontFamily: "'Sora', sans-serif", cursor: 'pointer', fontWeight: 500,
          }}
        >Send ↑</button>
      </div>
    </div>
  );
}
