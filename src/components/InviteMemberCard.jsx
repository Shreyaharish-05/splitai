// src/components/InviteMemberCard.jsx
import React, { useState } from 'react';
import { Card, SectionTitle, Tag, Btn } from './UI';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function buildInviteMail({ name, email, inviterName, groupName }) {
  const link = `${window.location.origin}/join?email=${encodeURIComponent(email)}`;
  const subject = `${inviterName} invited you to split expenses on SplitAI`;
  const body = [
    `Hi ${name || 'there'},`,
    '',
    `${inviterName} added you to the "${groupName}" group on SplitAI so you can track shared expenses and settle up.`,
    '',
    `Join here: ${link}`,
    '',
    '— SplitAI',
  ].join('\n');
  return {
    link,
    href: `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}

export default function InviteMemberCard({ invites, memberEmails = [], onInvite, onResend, onCancel, onAccept }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    const trimmedEmail = email.trim();
    if (!name.trim()) return setError('Enter a name');
    if (!EMAIL_RE.test(trimmedEmail)) return setError('Enter a valid email address');
    const key = trimmedEmail.toLowerCase();
    if (memberEmails.some(e => e.toLowerCase() === key)) {
      return setError('That email already belongs to a group member');
    }
    if (invites.some(i => i.email.toLowerCase() === key)) {
      return setError('That email is already invited');
    }
    setError('');
    onInvite({ name: name.trim(), email: trimmedEmail });
    setName('');
    setEmail('');
  };

  const inputStyle = {
    flex: 1, background: 'var(--bg3)', border: '1px solid var(--border)',
    borderRadius: 'var(--r)', padding: '8px 12px', color: 'var(--text)',
    fontSize: 12, outline: 'none', minWidth: 0,
  };

  return (
    <Card>
      <SectionTitle badge={invites.length ? `${invites.length} pending` : null}>Invite by Email</SectionTitle>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Name"
          style={{ ...inputStyle, flex: '0 0 32%' }}
        />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="name@example.com"
          type="email"
          style={inputStyle}
        />
        <Btn primary onClick={submit}>✉ Send Invite</Btn>
      </div>

      {error && <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 8 }}>{error}</div>}

      {invites.length > 0 && (
        <div style={{ marginTop: 14 }}>
          {invites.map(inv => (
            <div key={inv.email} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 0', borderTop: '1px solid var(--border)',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{inv.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {inv.email} · invited {inv.sentAt}
                </div>
              </div>
              <Tag label="Invite sent" type="amber" />
              <Btn small onClick={() => onResend(inv)}>Resend</Btn>
              <Btn small onClick={() => onAccept(inv)}>Mark joined</Btn>
              <Btn small onClick={() => onCancel(inv)}>✕</Btn>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
