// src/components/Groups.jsx
import React, { useState } from 'react';
import { Card, SectionTitle, Btn } from './UI';

export default function Groups({ currentGroup, onGroupChange }) {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Goa Trip 2025', members: ['You', 'Priya', 'Rahul', 'Neha', 'Arjun'], description: 'Beach vacation expenses' },
    { id: 2, name: 'Roommates', members: ['You', 'Priya', 'Rahul'], description: 'Monthly shared expenses' },
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', description: '', members: ['You'] });

  const handleCreateGroup = () => {
    if (newGroup.name) {
      const group = {
        id: Date.now(),
        ...newGroup,
      };
      setGroups(prev => [...prev, group]);
      setNewGroup({ name: '', description: '', members: ['You'] });
      setShowCreateForm(false);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.2s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>Expense Groups</h2>
        <Btn primary onClick={() => setShowCreateForm(true)}>+ Create Group</Btn>
      </div>

      {showCreateForm && (
        <Card style={{ marginBottom: 20 }}>
          <SectionTitle>Create New Group</SectionTitle>
          <div style={{ display: 'grid', gap: 12 }}>
            <input
              placeholder="Group Name"
              value={newGroup.name}
              onChange={e => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
              style={{
                padding: '10px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r)',
                background: 'var(--bg3)',
                color: 'var(--text)',
                fontSize: 14,
              }}
            />
            <input
              placeholder="Description (optional)"
              value={newGroup.description}
              onChange={e => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
              style={{
                padding: '10px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r)',
                background: 'var(--bg3)',
                color: 'var(--text)',
                fontSize: 14,
              }}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn onClick={() => setShowCreateForm(false)}>Cancel</Btn>
              <Btn primary onClick={handleCreateGroup}>Create Group</Btn>
            </div>
          </div>
        </Card>
      )}

      <div style={{ display: 'grid', gap: 12 }}>
        {groups.map(group => (
          <Card key={group.id} style={{
            cursor: 'pointer',
            border: currentGroup === group.id ? '2px solid var(--accent)' : '1px solid var(--border)',
            background: currentGroup === group.id ? 'rgba(40,167,69,0.05)' : 'var(--bg2)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                  {group.name}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 8 }}>
                  {group.description}
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {group.members.map(member => (
                    <span key={member} style={{
                      background: 'var(--bg3)',
                      border: '1px solid var(--border)',
                      borderRadius: 12,
                      padding: '4px 8px',
                      fontSize: 11,
                      color: 'var(--text2)',
                    }}>
                      {member}
                    </span>
                  ))}
                </div>
              </div>
              <Btn
                small
                primary={currentGroup === group.id}
                onClick={() => onGroupChange(group.id)}
                style={{ marginLeft: 12 }}
              >
                {currentGroup === group.id ? 'Active' : 'Switch'}
              </Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}