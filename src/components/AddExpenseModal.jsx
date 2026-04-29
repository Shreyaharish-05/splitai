// src/components/AddExpenseModal.jsx
import React, { useState } from 'react';
import { CATEGORIES, MEMBERS } from '../data/initialData';
import { Btn } from './UI';

export default function AddExpenseModal({ onAdd, onClose }) {
  const [billImage, setBillImage] = useState(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleAdd = () => {
    if (!form.desc || !form.amount) return;
    const expense = {
      ...form,
      id: Date.now(),
      amount: parseFloat(form.amount),
      tax: parseFloat(form.tax) || 0,
    };
    onAdd(expense);
    onClose();
  };

  const labelStyle = { fontSize: 11, color: 'var(--text2)', fontWeight: 500, marginBottom: 5, display: 'block', textTransform: 'uppercase', letterSpacing: '0.4px' };
  const inputStyle = { width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '9px 12px', color: 'var(--text)', fontSize: 13, fontFamily: "'Sora', sans-serif", outline: 'none' };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      animation: 'fadeIn 0.15s ease',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16,
        padding: 24, width: 460, maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto',
      }} onClick={e => e.stopPropagation()}>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Add New Expense</div>
          <div style={{ fontSize: 12, color: 'var(--text3)' }}>Or use the AI chat to add via natural language</div>
        </div>

        {/* NL hint */}
        <div style={{
          background: 'rgba(124,111,247,0.08)', border: '1px solid rgba(124,111,247,0.2)',
          borderRadius: 'var(--r)', padding: '10px 14px', marginBottom: 18, fontSize: 12, color: 'var(--text2)',
        }}>
          💬 Tip: In AI chat type <span style={{ color: 'var(--accent2)' }}>"₹1200 beach dinner paid by Priya"</span> to auto-fill
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Description *</label>
            <input style={inputStyle} value={form.desc} onChange={e => update('desc', e.target.value)} placeholder="e.g. Beach dinner at Baga" />
          </div>

          {/* Bill Image Upload */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Upload Bill Image (Optional)</label>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setBillImage(file);
                    setIsProcessingImage(true);
                    // Mock OCR processing
                    setTimeout(() => {
                      // Simulate extracting data from image
                      update('desc', form.desc || 'Restaurant Bill');
                      update('amount', form.amount || '1500');
                      update('tax', form.tax || '180');
                      setIsProcessingImage(false);
                      alert('Bill processed! Amount and tax auto-filled from image.');
                    }, 2000);
                  }
                }}
                style={{ display: 'none' }}
                id="bill-upload"
              />
              <label
                htmlFor="bill-upload"
                style={{
                  ...inputStyle,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: billImage ? 'var(--green)' : 'var(--bg3)',
                  color: billImage ? '#fff' : 'var(--text)',
                }}
              >
                📷 {billImage ? 'Bill Uploaded' : 'Choose Bill Image'}
              </label>
              {isProcessingImage && (
                <span style={{ fontSize: 12, color: 'var(--accent)' }}>Processing image...</span>
              )}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Amount (₹) *</label>
            <input style={inputStyle} type="number" value={form.amount} onChange={e => update('amount', e.target.value)} placeholder="0" />
          </div>
          <div>
            <label style={labelStyle}>Tax (₹)</label>
            <input style={inputStyle} type="number" value={form.tax} onChange={e => update('tax', e.target.value)} placeholder="0" />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select style={inputStyle} value={form.cat} onChange={e => update('cat', e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Paid By</label>
            <select style={inputStyle} value={form.payer} onChange={e => update('payer', e.target.value)}>
              {MEMBERS.map(m => <option key={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Date</label>
            <input style={inputStyle} type="date" value={form.date} onChange={e => update('date', e.target.value)} />
          </div>
        </div>

        {/* Split type */}
        <div style={{ marginTop: 16 }}>
          <label style={labelStyle}>Split Type</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['equal', 'assigned', 'custom', 'exact', 'shares'].map(t => (
              <button
                key={t}
                onClick={() => update('split', t)}
                style={{
                  flex: 1, padding: '7px 4px', borderRadius: 6, fontSize: 11, cursor: 'pointer',
                  fontFamily: "'Sora', sans-serif", fontWeight: 500,
                  border: form.split === t ? '1px solid var(--accent)' : '1px solid var(--border)',
                  background: form.split === t ? 'rgba(40,167,69,0.15)' : 'var(--bg3)',
                  color: form.split === t ? 'var(--accent)' : 'var(--text2)',
                  textTransform: 'capitalize',
                }}
              >{t}</button>
            ))}
          </div>
        </div>

        {/* Participants */}
        <div style={{ marginTop: 16 }}>
          <label style={labelStyle}>Participants</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {MEMBERS.map(m => {
              const included = form.participants.includes(m.name);
              return (
                <button
                  key={m.id}
                  onClick={() => update('participants', included ? form.participants.filter(p => p !== m.name) : [...form.participants, m.name])}
                  style={{
                    padding: '5px 12px', borderRadius: 20, fontSize: 11, cursor: 'pointer',
                    fontFamily: "'Sora', sans-serif",
                    border: included ? `1px solid ${m.color}66` : '1px solid var(--border)',
                    background: included ? m.color + '22' : 'var(--bg3)',
                    color: included ? m.color : 'var(--text3)',
                  }}
                >{m.name}</button>
              );
            })}
          </div>
        </div>

        {/* Assignment for assigned split */}
        {form.split === 'assigned' && (
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Assign Amounts</label>
            <div style={{ display: 'grid', gap: 8 }}>
              {form.participants.map(name => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--text)', minWidth: 60 }}>{name}:</span>
                  <input
                    type="number"
                    value={form.assignments[name] || ''}
                    onChange={e => update('assignments', { ...form.assignments, [name]: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                    style={{
                      flex: 1,
                      background: 'var(--bg3)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--r)',
                      padding: '6px 8px',
                      color: 'var(--text)',
                      fontSize: 13,
                      fontFamily: "'Sora', sans-serif",
                      outline: 'none'
                    }}
                  />
                  <span style={{ fontSize: 12, color: 'var(--text2)' }}>₹</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 22 }}>
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn primary onClick={handleAdd}>Add Expense</Btn>
        </div>
      </div>
    </div>
  );
}
