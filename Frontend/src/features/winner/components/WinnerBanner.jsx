import React from 'react';
import { FiAward, FiGift, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';

const WinnerBanner = ({ isWinner, winnerData, onClaimClick, hasClaimed = false }) => {
  if (!isWinner) return null;

  const prizeName = winnerData?.prizeName || 'Exclusive Reward';

  return (
    <div
      className="p-4 rounded-4 mb-4 text-white position-relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(56, 189, 248, 0.2) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.5)',
        boxShadow: '0 0 40px rgba(99, 102, 241, 0.25)',
      }}
    >
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
              color: '#070913',
              fontSize: '28px',
            }}
          >
            <BsStars />
          </div>
          <div>
            <div className="d-flex align-items-center gap-2 justify-content-center justify-content-md-start">
              <span className="badge bg-warning text-dark fw-bold text-uppercase">You Won!</span>
              <span className="small text-info fw-semibold">Winner Confirmed</span>
            </div>
            <h4 className="fw-bold mb-1 mt-1">You won: {prizeName}!</h4>
            <p className="small text-muted mb-0" style={{ color: '#cbd5e1 !important' }}>
              Congratulations! Please submit your claiming details to receive your prize.
            </p>
          </div>
        </div>

        <div>
          {hasClaimed ? (
            <span className="badge bg-success-subtle text-success border border-success-subtle p-3 rounded-3 d-flex align-items-center gap-2">
              <FiCheckCircle size={18} />
              <span>Claim Submitted & Processing</span>
            </span>
          ) : (
            <button
              onClick={onClaimClick}
              className="btn px-4 py-2 fw-bold text-dark rounded-pill d-flex align-items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
                boxShadow: '0 4px 20px rgba(56, 189, 248, 0.4)',
                border: 'none',
              }}
            >
              <FiGift size={18} />
              <span>Claim Prize Now</span>
              <FiArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WinnerBanner;
