import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiAtSign, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import useAuth from '../hooks/useAuth.js';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, isAuthenticated, clearAuthError } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    displayId: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  // Clear previous errors when component mounts or unmounts
  useEffect(() => {
    if (clearAuthError) clearAuthError();
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/giveaway');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (localError) setLocalError('');
    if (error && clearAuthError) clearAuthError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.fullName.trim() ||
      !formData.displayId.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setLocalError('Please fill in all the required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    try {
      await register({
        fullName: formData.fullName.trim(),
        name: formData.fullName.trim(),
        displayId: formData.displayId.trim(),
        username: formData.displayId.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const displayError = localError || error;

  return (
    <div className="veloop-auth-wrapper">
      <div className="glow-orb-top-left"></div>
      <div className="glow-orb-bottom-right"></div>

      <div className="veloop-auth-card">
        {/* Brand Logo Header */}
        <div className="veloop-brand">
          <div className="veloop-brand-header">
            <span className="veloop-logo-icon">
              <BsStars />
            </span>
            <span className="veloop-brand-name">VELOOP</span>
          </div>
          <span className="veloop-brand-sub">REWARDS</span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="veloop-title">Join the Exclusive</h1>
        <p className="veloop-subtitle">
          Create your account to unlock premium giveaways and rewards.
        </p>

        {/* Error Alert */}
        {displayError && (
          <div className="veloop-alert" role="alert">
            <div className="d-flex align-items-center gap-2">
              <FiAlertCircle className="flex-shrink-0" />
              <span>{displayError}</span>
            </div>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="veloop-form-group">
            <div className="veloop-label-row">
              <label htmlFor="reg-fullName" className="veloop-label">
                Full Name
              </label>
            </div>
            <div className="veloop-input-box">
              <span className="veloop-input-icon-left">
                <FiUser />
              </span>
              <input
                id="reg-fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="veloop-input"
                autoComplete="name"
                required
              />
            </div>
          </div>

          {/* Display ID */}
          <div className="veloop-form-group">
            <div className="veloop-label-row">
              <label htmlFor="reg-displayId" className="veloop-label">
                Display ID
              </label>
            </div>
            <div className="veloop-input-box">
              <span className="veloop-input-icon-left">
                <FiAtSign />
              </span>
              <input
                id="reg-displayId"
                type="text"
                name="displayId"
                value={formData.displayId}
                onChange={handleChange}
                placeholder="johndoe99"
                className="veloop-input"
                autoComplete="username"
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="veloop-form-group">
            <div className="veloop-label-row">
              <label htmlFor="reg-email" className="veloop-label">
                Email Address
              </label>
            </div>
            <div className="veloop-input-box">
              <span className="veloop-input-icon-left">
                <FiMail />
              </span>
              <input
                id="reg-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="veloop-input"
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="veloop-form-group">
            <div className="veloop-label-row">
              <label htmlFor="reg-password" className="veloop-label">
                Password
              </label>
            </div>
            <div className="veloop-input-box">
              <span className="veloop-input-icon-left">
                <FiLock />
              </span>
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="veloop-input"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="veloop-input-icon-right"
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="veloop-btn veloop-btn-register"
            id="register-submit-btn"
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Join Now</span>
                <FiArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="veloop-card-footer">
          <span>Already have an account?</span>
          <Link to="/login" className="veloop-card-footer-link veloop-btn-login-link">
            Sign In
          </Link>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="veloop-trust-badges">
        <div className="veloop-trust-item">
          <FiCheckCircle className="veloop-trust-icon" />
          <span>Secure</span>
        </div>
        <div className="veloop-trust-item">
          <FiShield className="veloop-trust-icon" />
          <span>Private</span>
        </div>
      </div>
    </div>
  );
};

export default Register;