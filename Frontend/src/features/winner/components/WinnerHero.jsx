import React from 'react';
import { FiAward, FiCheckCircle } from 'react-icons/fi';
import { BsStars, BsTrophyFill } from 'react-icons/bs';
import { motion } from 'framer-motion';

const WinnerHero = ({ giveawayTitle = 'Summer Rewards Giveaway', winnerCount = 0 }) => {
  return (
    <div className="giveaway-hero text-center py-4 py-md-5 position-relative">
      {/* Animated Official Badge */}
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="exclusive-badge mb-3 px-3 py-2"
        style={{ fontSize: '0.74rem' }}
      >
        <motion.span
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="d-inline-flex align-items-center text-warning"
        >
          <BsTrophyFill />
        </motion.span>
        <span>OFFICIAL WINNER ANNOUNCEMENT</span>
        <BsStars className="text-info" />
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="giveaway-main-title px-2"
        style={{ fontSize: 'clamp(1.75rem, 5vw, 3.2rem)', lineHeight: 1.2 }}
      >
        Congratulations to All{' '}
        <span className="giveaway-gradient-text">Winners!</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="giveaway-main-subtitle px-3"
        style={{ fontSize: 'clamp(0.85rem, 2.5vw, 0.98rem)', maxWidth: '620px' }}
      >
        The draw for <strong>{giveawayTitle}</strong> has concluded. All{' '}
        {winnerCount > 0 ? `${winnerCount} winners` : 'winners'} were selected transparently using cryptographically verified RNG.
      </motion.p>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="d-flex align-items-center justify-content-center gap-2 gap-sm-3 mt-3 flex-wrap px-2"
      >
        <span
          className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1"
          style={{ fontSize: '0.76rem' }}
        >
          <FiCheckCircle />
          <span>100% Verified Draw</span>
        </span>
        <span
          className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1"
          style={{ fontSize: '0.76rem' }}
        >
          <FiAward />
          <span>Tamper-Proof Audit</span>
        </span>
      </motion.div>
    </div>
  );
};

export default WinnerHero;
