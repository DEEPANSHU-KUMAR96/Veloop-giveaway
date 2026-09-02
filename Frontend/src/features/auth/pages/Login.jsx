import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle } from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';
import useAuth from '../hooks/useAuth.js';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated, clearAuthError } = useAuth();

  const [formData, setFormData] = useState({
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
    if (!formData.email.trim() || !formData.password.trim()) {
      setLocalError('Please enter both your email address and password.');
      return;
    }

    try {
      await login({
        email: formData.email.trim(),
        password: formData.password,
      });
    } catch (err) {
      console.error('Login error:', err);
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
              <BsBoxSeam />
            </span>
            <span className="veloop-brand-name">Veloop Rewards</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="veloop-title">Welcome Back</h1>
        <p className="veloop-subtitle">
          Sign in to access your exclusive rewards.
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email Address */}
          <div className="veloop-form-group">
            <div className="veloop-label-row">
              <label htmlFor="login-email" className="veloop-label">
                Email Address
              </label>
            </div>
            <div className="veloop-input-box">
              <span className="veloop-input-icon-left">
                <FiMail />
              </span>
              <input
                id="login-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="veloop-input"
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="veloop-form-group">
            <div className="veloop-label-row">
              <label htmlFor="login-password" className="veloop-label">
                Password
              </label>
              <a
                href="#forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Password reset link will be sent to your email.');
                }}
                className="veloop-forgot-link"
              >
                Forgot Password?
              </a>
            </div>
            <div className="veloop-input-box">
              <span className="veloop-input-icon-left">
                <FiLock />
              </span>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="veloop-input"
                autoComplete="current-password"
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
            className="veloop-btn veloop-btn-login"
            id="login-submit-btn"
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <FiArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="veloop-card-footer">
          <span>Don't have an account?</span>
          <Link to="/register" className="veloop-card-footer-link veloop-btn-register-link">
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;