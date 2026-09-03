import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiGift,
  FiAward,
  FiHelpCircle,
  FiShield,
  FiLogIn,
  FiUserPlus,
  FiChevronRight,
} from 'react-icons/fi';
import { BsBoxSeam, BsStars, BsTrophyFill } from 'react-icons/bs';
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

  const navLinks = [
    { name: 'Giveaways', path: '/giveaway', icon: BsBoxSeam, active: location.pathname.startsWith('/giveaway') },
    { name: 'Winners', path: '/winners', icon: FiAward, active: location.pathname.startsWith('/winners') },
    { name: 'Leaderboard', path: '#leaderboard', icon: BsStars, active: false },
    { name: 'Rewards', path: '#rewards', icon: FiGift, active: false },
    { name: 'Help Center', path: '#help', icon: FiHelpCircle, active: false },
  ];

  return (
    <>
      {/* ── Main Top Navbar ── */}
      <nav className="veloop-navbar">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <span className="veloop-logo-icon" style={{ fontSize: '24px' }}>
              <BsBoxSeam />
            </span>
            <span className="veloop-brand-name" style={{ fontSize: '1.25rem' }}>
              VELOOP REWARDS
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="d-none d-lg-flex align-items-center gap-1">
            {navLinks.map((item) => {
              const isAnchor = item.path.startsWith('#');
              const Component = isAnchor ? 'a' : Link;
              const props = isAnchor ? { href: item.path } : { to: item.path };
              return (
                <Component
                  key={item.name}
                  {...props}
                  className={`nav-link-custom ${item.active ? 'active' : ''}`}
                >
                  {item.name}
                </Component>
              );
            })}
          </div>

          {/* Desktop Auth Section & Mobile Hamburger */}
          <div className="d-flex align-items-center gap-2 gap-sm-3">
            {/* Desktop Auth Controls */}
            <div className="d-none d-sm-flex align-items-center gap-2">
              {isAuthenticated ? (
                <div className="d-flex align-items-center gap-2">
                  <span className="text-white small fw-semibold d-none d-md-inline">
                    <FiUser className="me-1 text-primary" />
                    {user?.fullName || user?.name || user?.username || 'Member'}
                  </span>
                  <button
                    onClick={logoutUser}
                    className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 text-white border-secondary-subtle"
                    style={{ borderRadius: '20px', padding: '5px 14px' }}
                  >
                    <FiLogOut size={14} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-2">
                  <Link to="/login" className="btn-nav-login">
                    Login
                  </Link>
                  <Link to="/register" className="btn-nav-signup">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile / Tablet Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="btn d-lg-none d-flex align-items-center justify-content-center p-2 rounded-3 text-white border-0"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                width: '42px',
                height: '42px',
                fontSize: '20px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
              }}
              aria-label="Toggle navigation menu"
            >
              {isMobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Aside Bar / Drawer with Framer Motion ── */}
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
                background: 'rgba(4, 7, 18, 0.75)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
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
              className="position-fixed top-0 end-0 h-100 text-white d-flex flex-column"
              style={{
                width: 'min(330px, 86vw)',
                zIndex: 1055,
                background: 'linear-gradient(180deg, rgba(12, 16, 36, 0.98) 0%, rgba(7, 10, 24, 0.99) 100%)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.6)',
                overflowY: 'auto',
              }}
            >
              {/* Aside Header */}
              <div className="p-3 border-bottom d-flex align-items-center justify-content-between" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                <div className="d-flex align-items-center gap-2">
                  <span className="veloop-logo-icon" style={{ fontSize: '22px' }}>
                    <BsBoxSeam />
                  </span>
                  <span className="veloop-brand-name" style={{ fontSize: '1.05rem', letterSpacing: '1.5px' }}>
                    VELOOP
                  </span>
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

              {/* User Profile / Auth Block */}
              <div className="p-3" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                {isAuthenticated ? (
                  <div
                    className="p-3 rounded-3 d-flex align-items-center gap-3"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.18) 0%, rgba(56, 189, 248, 0.12) 100%)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                    }}
                  >
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: '42px',
                        height: '42px',
                        background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
                        color: '#070913',
                        fontWeight: 700,
                        fontSize: '18px',
                      }}
                    >
                      {(user?.fullName || user?.name || user?.username || 'U')[0].toUpperCase()}
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
                  <div className="d-flex flex-column gap-2">
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
                      <FiLogIn size={16} />
                      <span>Log In</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileOpen(false)}
                      className="btn w-100 fw-bold text-dark d-flex align-items-center justify-content-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
                        border: 'none',
                        height: '42px',
                        borderRadius: '12px',
                        fontSize: '0.88rem',
                        boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)',
                      }}
                    >
                      <FiUserPlus size={16} />
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
                        transition={{ delay: 0.05 * idx, duration: 0.2 }}
                      >
                        <Component
                          {...props}
                          onClick={() => setIsMobileOpen(false)}
                          className="d-flex align-items-center justify-content-between p-2 rounded-3 text-decoration-none transition"
                          style={{
                            background: link.active ? 'rgba(99, 102, 241, 0.18)' : 'transparent',
                            border: link.active ? '1px solid rgba(99, 102, 241, 0.35)' : '1px solid transparent',
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
                                background: link.active ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                                color: link.active ? '#818cf8' : '#94a3b8',
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

                {/* Quick Trust Highlights in mobile aside */}
                <div className="mt-4 p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div className="d-flex align-items-center gap-2 mb-1 text-info small fw-bold">
                    <FiShield size={14} />
                    <span>Provably Fair Platform</span>
                  </div>
                  <p className="text-muted mb-0" style={{ fontSize: '0.72rem', lineHeight: 1.4 }}>
                    Every giveaway draw is cryptographically verified and recorded on our transparent ledger.
                  </p>
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
