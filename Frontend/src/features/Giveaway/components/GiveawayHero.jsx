import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const GiveawayHero = ({ onJoinClick }) => {
  const handleJoinClick = (e) => {
    if (onJoinClick) {
      e.preventDefault();
      onJoinClick();
    } else {
      const el = document.getElementById('active-giveaways');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="template-hero-section position-relative overflow-hidden mb-4 mb-lg-5">
      {/* Ambient background glow orbs */}
      <div className="hero-purple-orb" />
      <div className="hero-violet-orb" />

      <div className="w-100 px-0">
        <div className="row align-items-center g-4 g-lg-5 m-0">
          {/* Left Column: Headline, Subtitle, CTA & Social Proof */}
          <div className="col-12 col-lg-6 text-center text-lg-start px-2 px-sm-3 px-lg-4">
            {/* Exclusive Giveaway Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="template-exclusive-badge d-inline-flex align-items-center gap-2 mb-3"
            >
              <span className="badge-flame-icon">🔥</span>
              <span className="badge-text">EXCLUSIVE GIVEAWAY</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="template-hero-title mb-3"
            >
              Giveaway<br />
              <span className="template-gradient-word">Rewards</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="template-hero-subtitle mb-4"
            >
              Complete eligible activities, collect entries and get a chance to win exciting rewards.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-lg-start gap-3 mb-4"
            >
              <a
                href="#active-giveaways"
                onClick={handleJoinClick}
                className="btn template-btn-join"
              >
                <span>Join Giveaway</span>
                <FiArrowRight size={18} />
              </a>
            </motion.div>

            {/* Social Proof: Avatars Stack + Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3"
            >
              <div className="template-avatar-stack">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Participant 1"
                  className="stack-avatar"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Participant 2"
                  className="stack-avatar"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Participant 3"
                  className="stack-avatar"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="Participant 4"
                  className="stack-avatar"
                />
              </div>
              <span className="template-social-text">
                <strong>8.5K+</strong> Users Participating
              </span>
            </motion.div>
          </div>

          {/* Right Column: 3D Artwork Showcase */}
          <div className="col-12 col-lg-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="template-hero-visual-wrap position-relative mx-auto"
            >
              {/* Radial glow background */}
              <div className="template-hero-glow-halo" />

              {/* High-quality 3D Hero Artwork matching template */}
              <img
                src="/hero_showcase.jpg"
                alt="Veloop Giveaway Rewards with 3D Gift Box, iPhone, Ticket and Gold Coins"
                className="template-hero-img img-fluid"
                onError={(e) => {
                  e.target.src = '/giveaway_gift_3d.jpg';
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiveawayHero;
