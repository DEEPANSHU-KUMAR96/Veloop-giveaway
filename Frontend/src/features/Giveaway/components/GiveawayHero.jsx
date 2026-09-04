import React from 'react';
import { BsStars, BsShieldCheck, BsLightningChargeFill } from 'react-icons/bs';
import { FiArrowRight, FiGift, FiAward, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const GiveawayHero = ({
  onExploreClick,
  onRulesClick,
  badgeText = 'OFFICIAL GIVEAWAYS',
  title = 'Win Premium Rewards &',
  titleHighlight = 'Exclusive Gifts',
  subtitle = 'Participate in verified giveaways, complete simple tasks to collect entries, and stand a chance to win iPhones, smartwatches, vouchers, and cash rewards.',
}) => {
  const handleScrollToGiveaways = (e) => {
    e.preventDefault();
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('featured-giveaways');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="giveaway-hero-showcase position-relative overflow-hidden mb-5">
      {/* Background ambient light orbs */}
      <div className="hero-glow-orb hero-glow-purple" />
      <div className="hero-glow-orb hero-glow-cyan" />
      <div className="hero-glow-orb hero-glow-gold" />

      <div className="container-fluid p-0">
        <div className="row align-items-center g-4 g-lg-5">
          {/* Left Column: Compelling Copy & CTAs */}
          <div className="col-12 col-lg-7 text-center text-lg-start">
            {/* Live Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3 hero-live-pill"
            >
              <span className="hero-live-indicator">
                <span className="hero-live-ping" />
                <span className="hero-live-dot" />
              </span>
              <span className="hero-live-text">{badgeText}</span>
              <span className="hero-pill-divider">•</span>
              <span className="hero-pill-sub text-warning d-flex align-items-center gap-1">
                <BsStars size={12} /> 100% Free Entry
              </span>
            </motion.div>

            {/* Main Catchy Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero-display-title mb-3"
            >
              {title} <br className="d-none d-sm-inline" />
              <span className="hero-gradient-text">{titleHighlight}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-display-subtitle mb-4"
            >
              {subtitle}
            </motion.p>

            {/* Quick Benefit Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-2 gap-sm-3 mb-4"
            >
              <div className="hero-perk-badge">
                <BsLightningChargeFill className="text-warning flex-shrink-0" />
                <span>Instant Claim</span>
              </div>
              <div className="hero-perk-badge">
                <BsShieldCheck className="text-info flex-shrink-0" />
                <span>Provably Fair RNG</span>
              </div>
              <div className="hero-perk-badge">
                <FiGift className="text-primary-purple flex-shrink-0" />
                <span>Verified Prizes</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-lg-start gap-3"
            >
              <a
                href="#featured-giveaways"
                onClick={handleScrollToGiveaways}
                className="btn hero-btn-primary w-100 w-sm-auto"
              >
                <span>Explore Active Giveaways</span>
                <FiArrowRight size={18} />
              </a>

              {onRulesClick && (
                <button
                  type="button"
                  onClick={onRulesClick}
                  className="btn hero-btn-secondary w-100 w-sm-auto"
                >
                  <FiAward size={16} />
                  <span>How It Works & Rules</span>
                </button>
              )}
            </motion.div>

            {/* Trust Micro Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 mt-4 text-muted small"
            >
              <FiCheckCircle className="text-success" size={14} />
              <span>Over ₹1,00,000+ in rewards distributed to community winners</span>
            </motion.div>
          </div>

          {/* Right Column: 3D Visual Artwork & Floating Interactive Cards */}
          <div className="col-12 col-lg-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hero-visual-container position-relative"
            >
              {/* Outer Glow Halo */}
              <div className="hero-artwork-halo" />

              {/* Main AI-Generated 3D Artwork Showcase */}
              <div className="hero-artwork-frame">
                <img
                  src="/giveaway_hero_3d.jpg"
                  alt="Exclusive 3D Giveaway Rewards and Gifts"
                  className="hero-artwork-img"
                  onError={(e) => {
                    e.target.src = '/giveaway_gift_3d.jpg';
                  }}
                />
                <div className="hero-artwork-overlay" />
              </div>

              {/* Floating 3D Badge 1: 3D Grand Prize Box (Top-Left) */}
              <motion.div
                animate={{
                  y: [-6, 6, -6],
                  rotate: [-1, 1.5, -1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  ease: 'easeInOut',
                }}
                className="floating-card floating-card-top-left"
              >
                <div className="floating-card-icon-wrap bg-gradient-amber">
                  <span style={{ fontSize: '18px' }}>🎁</span>
                </div>
                <div>
                  <div className="floating-card-title">Grand Prize Drop</div>
                  <div className="floating-card-sub text-warning fw-bold">₹2,000+ Gift Cards</div>
                </div>
              </motion.div>

              {/* Floating 3D Badge 2: 3D Gold Coins / Zero Cost (Bottom-Right) */}
              <motion.div
                animate={{
                  y: [6, -6, 6],
                  rotate: [1, -1.5, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: 'easeInOut',
                }}
                className="floating-card floating-card-bottom-right"
              >
                <div className="floating-card-icon-wrap bg-gradient-cyan">
                  <span style={{ fontSize: '18px' }}>🪙</span>
                </div>
                <div>
                  <div className="floating-card-title">100% Free Entry</div>
                  <div className="floating-card-sub text-info fw-bold">Zero Hidden Cost</div>
                </div>
              </motion.div>

              {/* Floating 3D Badge 3: Verified RNG (Bottom-Left) */}
              <motion.div
                animate={{
                  y: [-4, 5, -4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3.8,
                  ease: 'easeInOut',
                }}
                className="floating-card floating-card-bottom-left d-none d-sm-flex"
              >
                <div className="floating-card-icon-wrap bg-gradient-emerald">
                  <span style={{ fontSize: '16px' }}>🏆</span>
                </div>
                <div>
                  <div className="floating-card-title">Live Audited</div>
                  <div className="floating-card-sub text-success fw-bold">Transparent RNG</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiveawayHero;

