'use client';

import { useActionState } from 'react';
import { submitContact, type ContactFormState } from './actions';

const initialState: ContactFormState = { success: false, message: '' };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);

  if (state.success) {
    return (
      <div style={{ borderRadius: '0.75rem', backgroundColor: '#f0fdf4', padding: '2rem', textAlign: 'center', border: '1px solid #bbf7d0' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#15803d' }}>Message Sent!</h3>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#166534' }}>{state.message}</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#16a34a' }}>We'll get back to you within 1 business day.</p>
      </div>
    );
  }

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {state.message && !state.success && (
        <div style={{ borderRadius: '0.5rem', backgroundColor: '#fef2f2', padding: '0.75rem', fontSize: '0.875rem', color: '#b91c1c', border: '1px solid #fecaca' }}>
          {state.message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            Full Name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            name="name" type="text" required
            placeholder="Your full name"
            style={{
              width: '100%', borderRadius: '0.5rem',
              border: `1px solid ${state.errors?.name ? '#f87171' : '#d1d5db'}`,
              padding: '0.625rem 0.875rem', fontSize: '0.875rem',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
          {state.errors?.name && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#dc2626' }}>{state.errors.name}</p>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
            Email <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            name="email" type="email" required
            placeholder="you@company.com"
            style={{
              width: '100%', borderRadius: '0.5rem',
              border: `1px solid ${state.errors?.email ? '#f87171' : '#d1d5db'}`,
              padding: '0.625rem 0.875rem', fontSize: '0.875rem',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
          {state.errors?.email && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#dc2626' }}>{state.errors.email}</p>}
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
          Company <span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#9ca3af' }}>(optional)</span>
        </label>
        <input
          name="company" type="text"
          placeholder="Your company name"
          style={{
            width: '100%', borderRadius: '0.5rem', border: '1px solid #d1d5db',
            padding: '0.625rem 0.875rem', fontSize: '0.875rem',
            outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.375rem' }}>
          Message <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <textarea
          name="message" required rows={5}
          placeholder="Tell us about your project or question..."
          style={{
            width: '100%', borderRadius: '0.5rem',
            border: `1px solid ${state.errors?.message ? '#f87171' : '#d1d5db'}`,
            padding: '0.625rem 0.875rem', fontSize: '0.875rem',
            outline: 'none', resize: 'vertical', boxSizing: 'border-box',
          }}
        />
        {state.errors?.message && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#dc2626' }}>{state.errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          width: '100%', borderRadius: '0.5rem',
          backgroundColor: pending ? 'var(--brand-primary-accent)' : 'var(--brand-primary)',
          padding: '0.75rem 1.25rem', fontSize: '0.875rem', fontWeight: 600,
          color: 'white', border: 'none', cursor: pending ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.15s',
        }}
      >
        {pending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}