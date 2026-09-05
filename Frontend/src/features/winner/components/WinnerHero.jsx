import React from 'react';
import { FiAward, FiCheckCircle, FiShield, FiGift, FiZap } from 'react-icons/fi';
import { BsStars, BsTrophyFill } from 'react-icons/bs';
import { motion } from 'framer-motion';

const WinnerHero = ({ giveawayTitle = 'Veloop Rewards Mega Giveaway', winnerCount = 0 }) => {
  return (
    <div className="text-center py-4 py-md-5 position-relative">
      {/* Official Announcement Badge */}
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="template-winner-hero-badge mb-3"
      >
        <motion.span
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="d-inline-flex align-items-center text-warning"
        >
          <BsTrophyFill />
        </motion.span>
        <span>OFFICIAL WINNERS • HALL OF FAME</span>
        <BsStars className="text-info" />
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="template-winner-hero-title mb-3"
      >
        Celebrating Our{' '}
        <span className="template-winner-gradient-text">Lucky Winners!</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="template-winner-hero-subtitle mx-auto mb-4"
      >
        The official draw for <strong className="text-white">{giveawayTitle}</strong> has successfully concluded!
        All winners are verified on-chain and cryptographically secured with zero bot tolerance.
      </motion.p>

      {/* High Impact Winners Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="template-winner-stats-bar mx-auto mb-4"
        style={{ maxWidth: '960px' }}
      >
        <div className="row g-3 text-center align-items-center">
          {/* Stat 1 */}
          <div className="col-6 col-md-3 border-end-md" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
              <BsTrophyFill className="text-warning" size={18} />
              <span className="template-winner-stat-val text-white">
                {winnerCount > 0 ? winnerCount : '1,280+'}
              </span>
            </div>
            <div className="template-winner-stat-lbl">Winners Awarded</div>
          </div>

          {/* Stat 2 */}
          <div className="col-6 col-md-3 border-end-md" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
              <FiGift style={{ color: '#c084fc' }} size={18} />
              <span className="template-winner-stat-val text-white">₹15.5L+</span>
            </div>
            <div className="template-winner-stat-lbl">Prizes Distributed</div>
          </div>

          {/* Stat 3 */}
          <div className="col-6 col-md-3 border-end-md" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
              <FiZap className="text-info" size={18} />
              <span className="template-winner-stat-val text-white">100% RNG</span>
            </div>
            <div className="template-winner-stat-lbl">NIST Cryptographic</div>
          </div>

          {/* Stat 4 */}
          <div className="col-6 col-md-3">
            <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
              <FiShield className="text-success" size={18} />
              <span className="template-winner-stat-val text-white">Verified</span>
            </div>
            <div className="template-winner-stat-lbl">Provably Fair Audit</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WinnerHero;
