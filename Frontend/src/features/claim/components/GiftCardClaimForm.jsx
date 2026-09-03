import React, { useState } from 'react';
import { FiMail, FiCheck, FiAlertCircle, FiInfo, FiShield } from 'react-icons/fi';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GiftCardClaimForm = ({
  initialEmail = '',
  onSubmit,
  isLoading = false,
  apiError = null,
}) => {
  const [email, setEmail] = useState(initialEmail || '');
  const [error, setError] = useState('');

  const validate = (val) => {
    const trimmed = (val || '').trim();
    if (!trimmed) return 'Email address is required';
    if (!EMAIL_REGEX.test(trimmed)) return 'Please provide a valid email address';
    return '';
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (error) setError(validate(val));
  };

  const handleBlur = () => {
    setError(validate(email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(email);
    if (err) {
      setError(err);
      return;
    }
    setError('');
    if (onSubmit) {
      onSubmit({ email: email.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {apiError && (
        <div
          className="p-3 mb-3 rounded-3 d-flex align-items-center gap-2 text-danger"
          style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            fontSize: '0.85rem',
          }}
        >
          <FiAlertCircle className="flex-shrink-0" size={18} />
          <span>{apiError}</span>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label small fw-semibold text-muted mb-1">
          Delivery Email Address <span className="text-danger">*</span>
        </label>
        <div className="position-relative">
          <span
            className="position-absolute top-50 translate-middle-y ps-3 text-muted"
            style={{ pointerEvents: 'none' }}
          >
            <FiMail size={16} />
          </span>
          <input
            type="email"
            name="email"
            className={`form-control ps-5 text-white ${error ? 'is-invalid border-danger' : ''}`}
            style={{
              background: 'rgba(13, 17, 33, 0.85)',
              borderColor: error ? '#ef4444' : 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              height: '48px',
              fontSize: '0.9rem',
            }}
            placeholder="e.g. yourname@gmail.com"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
          />
        </div>
        {error && (
          <div className="text-danger small mt-1" style={{ fontSize: '0.78rem' }}>
            {error}
          </div>
        )}
      </div>

      <div
        className="p-3 mb-3 rounded-3"
        style={{
          background: 'rgba(245, 166, 35, 0.08)',
          border: '1px solid rgba(245, 166, 35, 0.25)',
        }}
      >
        <div className="d-flex align-items-start gap-2">
          <FiInfo className="text-warning flex-shrink-0 mt-0.5" size={16} />
          <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
            <span className="fw-semibold text-white">Instant / E-Code Delivery:</span> The gift card
            claim code and redemption instructions will be dispatched directly to this email address within 24 to 48 hours of verification.
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-2 mb-4 p-2 rounded-2 text-muted" style={{ fontSize: '0.75rem', background: 'rgba(255, 255, 255, 0.03)' }}>
        <FiShield className="text-success flex-shrink-0" size={14} />
        <span>Ensure this email address is active and belongs to you. Claims cannot be re-routed once confirmed.</span>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn w-100 py-2.5 rounded-pill fw-bold text-white d-flex align-items-center justify-content-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            border: 'none',
            boxShadow: '0 4px 18px rgba(245, 158, 11, 0.35)',
            height: '48px',
          }}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status"></span>
              <span>Submitting Claim...</span>
            </>
          ) : (
            <>
              <FiCheck size={18} />
              <span>Submit Gift Card Claim</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default GiftCardClaimForm;
