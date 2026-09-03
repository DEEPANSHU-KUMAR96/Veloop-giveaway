import React from 'react';
import { FiGift, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import { motion } from 'framer-motion';

const WinnerBanner = ({ isWinner, winnerData, onClaimClick, hasClaimed = false }) => {
  if (!isWinner) return null;

  const prizeName = winnerData?.prizeName || 'Exclusive Reward';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="p-3 p-sm-4 rounded-4 mb-4 text-white position-relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.28) 0%, rgba(56, 189, 248, 0.18) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.5)',
        boxShadow: '0 0 35px rgba(99, 102, 241, 0.25)',
      }}
    >
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
        {/* Left Info */}
        <div className="d-flex flex-column flex-sm-row align-items-center gap-3 w-100 w-md-auto">
          <motion.div
            animate={{ scale: [1, 1.06, 1], rotate: [0, 4, -4, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: '54px',
              height: '54px',
              background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
              color: '#070913',
              fontSize: '24px',
              boxShadow: '0 4px 15px rgba(167, 139, 250, 0.4)',
            }}
          >
            <BsStars />
          </motion.div>

          <div>
            <div className="d-flex align-items-center gap-2 justify-content-center justify-content-sm-start flex-wrap">
              <span className="badge bg-warning text-dark fw-bold text-uppercase" style={{ fontSize: '0.72rem' }}>
                🎉 You Won!
              </span>
              <span className="small text-info fw-semibold" style={{ fontSize: '0.8rem' }}>
                Winner Confirmed
              </span>
            </div>
            <h4 className="fw-bold mb-1 mt-1 text-white" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>
              You won: {prizeName}!
            </h4>
            <p className="small mb-0" style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>
              Congratulations! Please submit your claiming details to receive your prize.
            </p>
          </div>
        </div>

        {/* Right Action Button */}
        <div className="w-100 w-md-auto flex-shrink-0 mt-2 mt-md-0">
          {hasClaimed ? (
            <span
              className="badge bg-success-subtle text-success border border-success-subtle p-3 rounded-3 d-flex align-items-center justify-content-center gap-2 w-100 w-md-auto"
              style={{ fontSize: '0.84rem' }}
            >
              <FiCheckCircle size={17} />
              <span>Claim Submitted & Processing</span>
            </span>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClaimClick}
              className="btn px-4 py-2 fw-bold text-dark rounded-pill d-flex align-items-center justify-content-center gap-2 w-100 w-md-auto"
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
                boxShadow: '0 4px 20px rgba(56, 189, 248, 0.4)',
                border: 'none',
                minHeight: '44px',
                fontSize: '0.9rem',
              }}
            >
              <FiGift size={18} />
              <span>Claim Prize Now</span>
              <FiArrowRight size={18} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WinnerBanner;
