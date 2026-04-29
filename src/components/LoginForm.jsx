// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Btn } from './UI';

export default function LoginForm({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login - in real app, validate credentials
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'var(--bg)',
    }}>
      <div style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--card-r)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '24px',
          color: 'var(--text)',
          fontSize: '24px',
          fontWeight: '600',
        }}>
          Welcome to SplitAI
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: 'var(--text)',
              fontSize: '14px',
              fontWeight: '500',
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r)',
                fontSize: '14px',
                background: 'var(--bg)',
                color: 'var(--text)',
                outline: 'none',
              }}
              placeholder="Enter your email"
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: 'var(--text)',
              fontSize: '14px',
              fontWeight: '500',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r)',
                fontSize: '14px',
                background: 'var(--bg)',
                color: 'var(--text)',
                outline: 'none',
              }}
              placeholder="Enter your password"
            />
          </div>
          <Btn
            type="submit"
            primary
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            Log In
          </Btn>
        </form>
        <div style={{
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
        }}>
          <Btn
            onClick={onLogin}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              fontWeight: '600',
              background: 'var(--accent2)',
              borderColor: 'var(--accent2)',
              color: '#fff',
            }}
          >
            🚀 Try Demo
          </Btn>
          <p style={{
            marginTop: '12px',
            color: 'var(--text2)',
            fontSize: '12px',
          }}>
            Experience the app with sample data
          </p>
        </div>
      </div>
    </div>
  );
}