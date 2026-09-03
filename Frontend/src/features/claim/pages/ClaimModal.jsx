import React, { useEffect, useState, useCallback } from 'react';
import { FiGift, FiX, FiAlertCircle, FiLock, FiPackage, FiCreditCard, FiZap } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import useClaim from '../hooks/useClaim.js';
import PrizeSummaryCard from '../components/PrizeSummaryCard.jsx';
import PhysicalClaimForm from '../components/PhysicalClaimForm.jsx';
import GiftCardClaimForm from '../components/GiftCardClaimForm.jsx';
import ClaimStatusView from '../components/ClaimStatusView.jsx';
import ClaimSuccessCard from '../components/ClaimSuccessCard.jsx';

/**
 * ClaimModal - Standalone prize claim modal driven by Redux (claim slice)
 *
 * Props:
 *   isOpen       {boolean}   — controls modal visibility
 *   onClose      {function}  — called when the modal should close
 *   giveawayId   {string}    — the MongoDB giveaway ID
 *   winnerData   {object}    — winner record from backend (prizeName, prizeType, displayName)
 *   user         {object}    — logged-in user (for pre-filling name/email)
 */
const ClaimModal = ({ isOpen = false, onClose, giveawayId, winnerData, user }) => {
  const {
    claim,
    isLoading,
    error,
    success,
    submitMyClaimAsync,
    getMyClaim,
    clearState,
    resetAllClaimState,
  } = useClaim();

  // Track whether the user just submitted (to show success view)
  const [justSubmitted, setJustSubmitted] = useState(false);
  // View: 'form' | 'status' | 'success'
  const [view, setView] = useState('form');

  const prizeType = winnerData?.prizeType || claim?.prizeType || 'PHYSICAL';

  // On open: fetch existing claim silently
  useEffect(() => {
    if (isOpen && giveawayId) {
      clearState();
      setJustSubmitted(false);
      getMyClaim(giveawayId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, giveawayId]);

  // Compute view from claim state
  useEffect(() => {
    if (!isOpen) return;
    if (justSubmitted && success) {
      setView('success');
    } else if (claim && claim.status && claim.status !== 'NOT_SUBMITTED') {
      setView('status');
    } else {
      setView('form');
    }
  }, [isOpen, claim, success, justSubmitted]);

  const handleClose = useCallback(() => {
    resetAllClaimState();
    setJustSubmitted(false);
    setView('form');
    if (onClose) onClose();
  }, [onClose, resetAllClaimState]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, handleClose]);

  const handleFormSubmit = async (formData) => {
    if (!giveawayId) return;
    try {
      await submitMyClaimAsync(giveawayId, formData);
      setJustSubmitted(true);
    } catch {
      // Error is captured in Redux state — displayed in form
    }
  };

  if (!isOpen) return null;

  const getPrizeTypeLabel = (type) => {
    switch (type) {
      case 'GIFT_CARD': return { icon: <FiCreditCard size={16} />, label: 'Gift Card' };
      case 'DIGITAL': return { icon: <FiZap size={16} />, label: 'Digital' };
      default: return { icon: <FiPackage size={16} />, label: 'Physical Prize' };
    }
  };
  const typeMeta = getPrizeTypeLabel(prizeType);

  return (
    <div
      id="claim-modal-backdrop"
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        zIndex: 1060,
        background: 'rgba(5, 8, 20, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '16px',
      }}
      onClick={handleBackdropClick}
    >
      <div
        id="claim-modal-content"
        className="position-relative w-100 text-white"
        style={{
          maxWidth: '640px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'rgba(12, 16, 35, 0.97)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(99, 102, 241, 0.15)',
          padding: '28px 28px 24px',
          animation: 'claim-modal-in 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="d-flex align-items-start justify-content-between mb-1">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
              style={{
                width: '38px',
                height: '38px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.3) 100%)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
              }}
            >
              <FiGift size={18} style={{ color: '#a855f7' }} />
            </div>
            <div>
              <h5 className="fw-bold mb-0 text-white d-flex align-items-center gap-2">
                <BsStars style={{ color: '#f5a623' }} size={16} />
                {view === 'status' ? 'Your Claim Status' : view === 'success' ? 'Claim Confirmed!' : 'Claim Your Prize'}
              </h5>
              {view === 'form' && (
                <div className="d-flex align-items-center gap-1 mt-0.5" style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  <span className="d-flex align-items-center gap-1 px-2 py-0.5 rounded-pill" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {typeMeta.icon} {typeMeta.label}
                  </span>
                </div>
              )}
            </div>
          </div>

          <button
            id="claim-modal-close"
            type="button"
            onClick={handleClose}
            className="btn p-1 border-0 d-flex align-items-center justify-content-center rounded-circle"
            style={{
              background: 'rgba(255,255,255,0.07)',
              color: '#94a3b8',
              width: '32px',
              height: '32px',
              flexShrink: 0,
            }}
            title="Close"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Divider */}
        <hr style={{ borderColor: 'rgba(255,255,255,0.07)', margin: '14px 0 20px' }} />

        {/* Loading state while fetching existing claim */}
        {isLoading && view === 'form' && !justSubmitted && (
          <div className="text-center py-4 text-muted">
            <div className="spinner-border spinner-border-sm me-2" role="status"></div>
            <span style={{ fontSize: '0.85rem' }}>Checking claim status...</span>
          </div>
        )}

        {/* Prize Summary — shown on form view */}
        {view === 'form' && !isLoading && (
          <PrizeSummaryCard
            winnerData={winnerData}
            claimDeadline={claim?.claimDeadline}
          />
        )}

        {/* FORM VIEW — show appropriate form based on prize type */}
        {view === 'form' && !isLoading && (
          <>
            {/* Auth guard */}
            {!user && (
              <div
                className="p-3 mb-3 rounded-3 d-flex align-items-center gap-2"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  fontSize: '0.84rem',
                  color: '#fca5a5',
                }}
              >
                <FiLock className="flex-shrink-0" size={16} />
                <span>You must be logged in to claim this prize.</span>
              </div>
            )}

            {user && (
              <>
                {prizeType === 'PHYSICAL' && (
                  <PhysicalClaimForm
                    initialData={{
                      fullName: user?.fullName || user?.name || '',
                    }}
                    onSubmit={handleFormSubmit}
                    isLoading={isLoading}
                    apiError={error}
                  />
                )}

                {prizeType === 'GIFT_CARD' && (
                  <GiftCardClaimForm
                    initialEmail={user?.email || ''}
                    onSubmit={handleFormSubmit}
                    isLoading={isLoading}
                    apiError={error}
                  />
                )}

                {prizeType === 'DIGITAL' && (
                  <div className="text-center py-4">
                    <FiZap size={36} className="text-info mb-3" />
                    <h6 className="fw-bold text-white mb-2">Digital Prize — Auto Delivery</h6>
                    <p className="text-muted small" style={{ maxWidth: '360px', margin: '0 auto 20px' }}>
                      Digital prizes are automatically delivered to your registered account. No additional details required.
                    </p>
                    <button
                      type="button"
                      className="btn rounded-pill fw-bold text-white px-5 py-2"
                      style={{
                        background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                        border: 'none',
                        boxShadow: '0 4px 18px rgba(6, 182, 212, 0.35)',
                      }}
                      onClick={() => handleFormSubmit({})}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Processing...
                        </>
                      ) : (
                        'Confirm Digital Prize Claim'
                      )}
                    </button>
                    {error && (
                      <div className="mt-3 text-danger small d-flex align-items-center justify-content-center gap-1">
                        <FiAlertCircle size={14} /> {error}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* STATUS VIEW — already claimed in a previous session */}
        {view === 'status' && (
          <ClaimStatusView claim={claim} onClose={handleClose} />
        )}

        {/* SUCCESS VIEW — just submitted in this session */}
        {view === 'success' && (
          <ClaimSuccessCard
            claimData={claim}
            onClose={handleClose}
            onViewStatus={() => setView('status')}
          />
        )}
      </div>

      {/* Animation keyframe injected inline */}
      <style>{`
        @keyframes claim-modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ClaimModal;
