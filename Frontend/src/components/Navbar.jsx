import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiGift,
  FiAward,
  FiChevronRight,
  FiCompass,
  FiList,
  FiCheckCircle,
} from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../features/auth/hooks/useAuth.js';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, isAuthenticated, logoutUser } = useAuth();
  const location = useLocation();

  // Close aside bar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile aside is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Exact navigation items from design template
  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: FiCompass, active: location.pathname === '/dashboard' },
    { name: 'Activities', path: '#activities', icon: FiList, active: false },
    { name: 'Giveaways', path: '/giveaway', icon: FiGift, active: location.pathname.startsWith('/giveaway') || location.pathname === '/' },
    { name: 'Winners', path: '/winners', icon: FiAward, active: location.pathname.startsWith('/winners') },
    { name: 'My Entries', path: '#my-entries', icon: FiCheckCircle, active: false },
  ];

  const userPoints = user?.points ?? 2450;
  const userInitial = (user?.fullName || user?.name || user?.username || 'V')[0].toUpperCase();

  return (
    <>
      {/* ── Main Top Navbar ── */}
      <nav className="template-navbar">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Brand Logo */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <div className="template-logo-mark">
              <span className="logo-sparkle">✦</span>
            </div>
            <div className="d-flex flex-column leading-none">
              <span className="template-brand-name">VELOOP</span>
              <span className="template-brand-sub">REWARDS</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="d-none d-lg-flex align-items-center gap-1 template-nav-links">
            {navLinks.map((item) => {
              const isAnchor = item.path.startsWith('#');
              const Component = isAnchor ? 'a' : Link;
              const props = isAnchor ? { href: item.path } : { to: item.path };
              return (
                <Component
                  key={item.name}
                  {...props}
                  className={`template-nav-link ${item.active ? 'active' : ''}`}
                >
                  {item.name}
                  {item.active && <span className="active-pill-dot" />}
                </Component>
              );
            })}
          </div>

          {/* Right Action Controls: Coin/Points Chip + User Profile */}
          <div className="d-flex align-items-center gap-2 gap-sm-3">
            {/* Points / Coin Chip */}
            <div className="template-coin-chip" title="Available Rewards Points">
              <span className="coin-icon-circle">🪙</span>
              <span className="coin-balance-text">{userPoints.toLocaleString()}</span>
            </div>

            {/* User Profile Avatar / Pill */}
            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  type="button"
                  className="btn p-0 border-0 d-flex align-items-center gap-2"
                  id="userProfileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="template-profile-avatar">
                    <span>{userInitial}</span>
                    <span className="online-indicator" />
                  </div>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end template-dropdown-menu"
                  aria-labelledby="userProfileDropdown"
                >
                  <li className="px-3 py-2 border-bottom border-secondary-subtle">
                    <div className="fw-bold text-white small">{user?.fullName || user?.name || 'Member'}</div>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>{user?.email || 'Logged in'}</div>
                  </li>
                  <li>
                    <Link className="dropdown-item text-light small py-2" to="/dashboard">
                      <FiCompass className="me-2 text-primary" /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item text-light small py-2" href="#my-entries">
                      <FiCheckCircle className="me-2 text-success" /> My Entries
                    </a>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger small py-2 d-flex align-items-center"
                      onClick={logoutUser}
                    >
                      <FiLogOut className="me-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link to="/login" className="template-profile-avatar-guest" title="Sign In / Account">
                  <FiUser size={16} />
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="btn d-lg-none d-flex align-items-center justify-content-center p-2 rounded-3 text-white border-0 template-menu-toggle"
              aria-label="Toggle navigation menu"
            >
              {isMobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Aside Drawer ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="position-fixed top-0 start-0 w-100 h-100"
              style={{
                background: 'rgba(5, 7, 18, 0.8)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                zIndex: 1050,
              }}
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Aside Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="position-fixed top-0 end-0 h-100 text-white d-flex flex-column template-mobile-drawer"
              style={{
                width: 'min(330px, 86vw)',
                zIndex: 1055,
                background: 'linear-gradient(180deg, #0d0f24 0%, #080916 100%)',
                borderLeft: '1px solid rgba(139, 92, 246, 0.2)',
                boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.7)',
                overflowY: 'auto',
              }}
            >
              {/* Aside Header */}
              <div className="p-3 border-bottom d-flex align-items-center justify-content-between" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                <div className="d-flex align-items-center gap-2">
                  <div className="template-logo-mark small">
                    <span className="logo-sparkle">✦</span>
                  </div>
                  <div className="d-flex flex-column leading-none">
                    <span className="template-brand-name" style={{ fontSize: '1rem' }}>VELOOP</span>
                    <span className="template-brand-sub" style={{ fontSize: '0.55rem' }}>REWARDS</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn p-1 border-0 rounded-circle text-muted d-flex align-items-center justify-content-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    width: '34px',
                    height: '34px',
                    color: '#94a3b8',
                  }}
                  aria-label="Close menu"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* User / Coin Balance Block */}
              <div className="p-3" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                <div className="d-flex align-items-center justify-content-between p-2.5 rounded-3 mb-2"
                  style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                  <span className="small text-warning d-flex align-items-center gap-1.5 fw-semibold">
                    <span>🪙</span> Points Balance
                  </span>
                  <span className="fw-bold text-white small">{userPoints.toLocaleString()} pts</span>
                </div>

                {isAuthenticated ? (
                  <div
                    className="p-3 rounded-3 d-flex align-items-center gap-3"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.18) 0%, rgba(99, 102, 241, 0.12) 100%)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    <div className="template-profile-avatar" style={{ width: '42px', height: '42px' }}>
                      {userInitial}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-white fw-bold text-truncate small">
                        {user?.fullName || user?.name || user?.username || 'Member'}
                      </div>
                      <div className="text-muted text-truncate" style={{ fontSize: '0.72rem' }}>
                        {user?.email || 'Active Member'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2 mt-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileOpen(false)}
                      className="btn w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#ffffff',
                        height: '42px',
                        borderRadius: '12px',
                        fontSize: '0.88rem',
                      }}
                    >
                      <span>Log In</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileOpen(false)}
                      className="btn w-100 fw-bold text-white d-flex align-items-center justify-content-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                        border: 'none',
                        height: '42px',
                        borderRadius: '12px',
                        fontSize: '0.88rem',
                        boxShadow: '0 4px 14px rgba(139, 92, 246, 0.35)',
                      }}
                    >
                      <span>Sign Up Free</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Navigation Links list */}
              <div className="px-3 py-2 flex-grow-1">
                <div className="text-muted small fw-bold text-uppercase px-2 mb-2" style={{ fontSize: '0.68rem', letterSpacing: '1px' }}>
                  Navigation
                </div>
                <div className="d-flex flex-column gap-1">
                  {navLinks.map((link, idx) => {
                    const Icon = link.icon;
                    const isAnchor = link.path.startsWith('#');
                    const Component = isAnchor ? 'a' : Link;
                    const props = isAnchor ? { href: link.path } : { to: link.path };

                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * idx, duration: 0.2 }}
                      >
                        <Component
                          {...props}
                          onClick={() => setIsMobileOpen(false)}
                          className="d-flex align-items-center justify-content-between p-2 rounded-3 text-decoration-none transition"
                          style={{
                            background: link.active ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                            border: link.active ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid transparent',
                            color: link.active ? '#ffffff' : '#cbd5e1',
                            fontSize: '0.9rem',
                            fontWeight: link.active ? 600 : 500,
                          }}
                        >
                          <div className="d-flex align-items-center gap-3">
                            <span
                              className="d-flex align-items-center justify-content-center rounded-2"
                              style={{
                                width: '32px',
                                height: '32px',
                                background: link.active ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                                color: link.active ? '#c084fc' : '#94a3b8',
                              }}
                            >
                              <Icon size={16} />
                            </span>
                            <span>{link.name}</span>
                          </div>
                          <FiChevronRight size={15} style={{ opacity: 0.5 }} />
                        </Component>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Aside Bottom Footer */}
              {isAuthenticated && (
                <div className="p-3 border-top mt-auto" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                  <button
                    onClick={() => {
                      logoutUser();
                      setIsMobileOpen(false);
                    }}
                    className="btn w-100 d-flex align-items-center justify-content-center gap-2 text-danger border-0 rounded-3 py-2"
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                    }}
                  >
                    <FiLogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
