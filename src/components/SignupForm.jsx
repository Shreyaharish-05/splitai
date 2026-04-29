// src/components/SignupForm.jsx
import React, { useState } from 'react';
import { Btn } from './UI';

export default function SignupForm({ onSignup, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy signup - in real app, validate and create account
    if (name && email && password && password === confirmPassword) {
      onSignup();
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
          Create Account
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
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              placeholder="Enter your full name"
            />
          </div>
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
          <div style={{ marginBottom: '16px' }}>
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
              placeholder="Create a password"
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
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              placeholder="Confirm your password"
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
            Sign Up
          </Btn>
        </form>
        <div style={{
          textAlign: 'center',
          marginTop: '16px',
          color: 'var(--text2)',
          fontSize: '14px',
        }}>
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent)',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '14px',
            }}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}