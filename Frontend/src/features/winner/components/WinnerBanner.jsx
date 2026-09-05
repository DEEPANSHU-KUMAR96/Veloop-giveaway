import React from 'react';
import { FiGift, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { BsStars, BsTrophyFill } from 'react-icons/bs';
import { motion } from 'framer-motion';

const WinnerBanner = ({ isWinner, winnerData, onClaimClick, hasClaimed = false }) => {
  if (!isWinner) return null;

  const prizeName = winnerData?.prizeName || 'Exclusive Reward';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="p-4 rounded-4 mb-5 text-white position-relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.35) 0%, rgba(236, 72, 153, 0.22) 50%, rgba(56, 189, 248, 0.2) 100%)',
        border: '1.5px solid rgba(192, 132, 252, 0.5)',
        boxShadow: '0 16px 45px rgba(124, 58, 237, 0.3), 0 0 35px rgba(192, 132, 252, 0.2)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
        {/* Left Info */}
        <div className="d-flex flex-column flex-sm-row align-items-center gap-3 w-100 w-md-auto">
          <motion.div
            animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%)',
              color: '#ffffff',
              fontSize: '26px',
              boxShadow: '0 6px 20px rgba(245, 158, 11, 0.45)',
            }}
          >
            <BsTrophyFill />
          </motion.div>

          <div>
            <div className="d-flex align-items-center gap-2 justify-content-center justify-content-sm-start flex-wrap">
              <span
                className="badge rounded-pill fw-bold text-dark px-3 py-1 text-uppercase"
                style={{ background: '#f59e0b', fontSize: '0.72rem', letterSpacing: '0.5px' }}
              >
                🎉 Congratulations! You Won
              </span>
              <span className="small fw-semibold" style={{ color: '#67e8f9', fontSize: '0.82rem' }}>
                <FiCheckCircle className="me-1" />
                Verified Winner
              </span>
            </div>
            <h3 className="fw-bold mb-1 mt-1 text-white" style={{ fontSize: 'clamp(1.15rem, 3vw, 1.45rem)' }}>
              You have won: <span className="template-winner-gradient-text">{prizeName}</span>!
            </h3>
            <p className="small mb-0" style={{ color: '#cbd5e1', fontSize: '0.86rem' }}>
              Your entry ticket matched the winning cryptographic hash. Complete your claim details to dispatch your reward!
            </p>
          </div>
        </div>

        {/* Right Action Button */}
        <div className="w-100 w-md-auto flex-shrink-0 mt-2 mt-md-0">
          {hasClaimed ? (
            <div
              className="badge p-3 rounded-pill d-flex align-items-center justify-content-center gap-2 w-100 w-md-auto"
              style={{
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                color: '#4ade80',
                fontSize: '0.88rem',
              }}
            >
              <FiCheckCircle size={18} />
              <span>Claim Submitted & Processing</span>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onClaimClick}
              className="btn px-4 py-3 fw-bold text-white rounded-pill d-flex align-items-center justify-content-center gap-2 w-100 w-md-auto"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)',
                boxShadow: '0 6px 24px rgba(124, 58, 237, 0.5)',
                border: 'none',
                minHeight: '48px',
                fontSize: '0.94rem',
              }}
            >
              <FiGift size={19} />
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
