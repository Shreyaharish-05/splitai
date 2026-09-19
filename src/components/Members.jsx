// src/components/Members.jsx
import React, { useState } from 'react';
import { Card, SectionTitle, Avatar, Tag } from './UI';
import InviteMemberCard, { buildInviteMail } from './InviteMemberCard';

const COLORS = ['#7c6ff7', '#22c98a', '#3b9eff', '#f45c5c', '#f5a623', '#f472b6', '#34d399'];

export default function Members({ expenses, balances, members, setMembers, onToast, groupName = 'Goa Trip' }) {
  const [invites, setInvites] = useState([]);

  const openMailClient = (invite) => {
    const { href } = buildInviteMail({
      name: invite.name,
      email: invite.email,
      inviterName: 'You',
      groupName,
    });
    window.location.href = href;
  };

  const sendInvite = (invite) => {
    const record = { ...invite, sentAt: new Date().toLocaleDateString('en-IN') };
    setInvites(prev => [...prev, record]);
    openMailClient(record);
    onToast?.(`✉ Invite email drafted for ${record.email}`);
  };

  const resendInvite = (invite) => {
    openMailClient(invite);
    onToast?.(`✉ Invite re-sent to ${invite.email}`);
  };

  const cancelInvite = (invite) => {
    setInvites(prev => prev.filter(i => i.email !== invite.email));
    onToast?.(`Invite to ${invite.email} cancelled`);
  };

  const acceptInvite = (invite) => {
    setInvites(prev => prev.filter(i => i.email !== invite.email));
    setMembers(prev => [...prev, {
      id: Date.now(),
      name: invite.name,
      email: invite.email,
      avatar: invite.name.slice(0, 2).toUpperCase(),
      color: COLORS[prev.length % COLORS.length],
    }]);
    onToast?.(`✓ ${invite.name} joined the group`);
  };

  return (
    <div style={{ animation: 'fadeIn 0.2s ease' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 12 }}>
        <Card>
          <SectionTitle>Group Members</SectionTitle>
          {members.map(m => {
            const paid = expenses.filter(e => e.payer === m.name).reduce((s, e) => s + e.amount, 0);
            const share = expenses.reduce((s, e) => s + e.amount / (e.participants?.length || 5), 0);
            const bal = balances[m.name] || 0;
            return (
              <div key={m.id} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
                borderBottom: '1px solid var(--border)',
              }}>
                <Avatar name={m.name} size={42} initials={m.avatar} color={m.color} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>
                    {m.email ? `${m.email} · ` : ''}Paid ₹{paid.toLocaleString('en-IN')} total · {expenses.filter(e => e.payer === m.name).length} transactions
                  </div>
                  <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
                    <Tag label={bal >= 0 ? `Gets +₹${Math.abs(bal).toLocaleString('en-IN')}` : `Owes ₹${Math.abs(bal).toLocaleString('en-IN')}`} type={bal >= 0 ? 'green' : 'red'} />
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: m.color }}>
                    ₹{Math.round(share).toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>fair share</div>
                </div>
              </div>
            );
          })}

        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <InviteMemberCard
            invites={invites}
            memberEmails={members.map(m => m.email).filter(Boolean)}
            onInvite={sendInvite}
            onResend={resendInvite}
            onCancel={cancelInvite}
            onAccept={acceptInvite}
          />

          <Card>
            <SectionTitle>Group Stats</SectionTitle>
            {[
              { label: 'Total Members', value: members.length },
              { label: 'Total Expenses', value: expenses.length },
              { label: 'Avg per Person', value: `₹${Math.round(expenses.reduce((s, e) => s + e.amount, 0) / members.length).toLocaleString('en-IN')}` },
              { label: 'Most Paid By', value: (() => { const m = Object.entries(Object.fromEntries(members.map(m => [m.name, expenses.filter(e => e.payer === m.name).reduce((s, e) => s + e.amount, 0)]))).sort((a, b) => b[1] - a[1])[0]; return m ? m[0] : '-'; })() },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span style={{ color: 'var(--text2)' }}>{s.label}</span>
                <span style={{ fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</span>
              </div>
            ))}
          </Card>

          <Card>
            <SectionTitle>Participation</SectionTitle>
            {members.map(m => {
              const count = expenses.filter(e => e.payer === m.name).length;
              return (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Avatar name={m.name} size={26} initials={m.avatar} color={m.color} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                      <span>{m.name}</span>
                      <span style={{ color: 'var(--text3)' }}>{count} paid</span>
                    </div>
                    <div style={{ height: 4, background: 'var(--bg4)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.round(count / expenses.length * 100)}%`, background: m.color, borderRadius: 2 }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    </div>
  );
}
