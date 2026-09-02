import React, { useState, useEffect } from 'react';
import { FiGift, FiCheck, FiX, FiAlertCircle, FiAward } from 'react-icons/fi';
import { BsCheckCircleFill } from 'react-icons/bs';

const PrizeClaimModal = ({
  giveaway,
  isOpen,
  onClose,
  onConfirm,
  isJoining = false,
  joinSuccess = false,
  joinError = null,
}) => {
  if (!isOpen || !giveaway) return null;

  const giveawayId = giveaway.giveawayId || giveaway._id || giveaway.id || giveaway.slug;
  const title = giveaway.title || giveaway.name || giveaway.prize || 'Exclusive Giveaway';
  const subtitle = giveaway.subtitle || giveaway.description || giveaway.prizeDescription || '';

  // Extract prizes array if available
  const prizesList = Array.isArray(giveaway.prizes) && giveaway.prizes.length > 0
    ? giveaway.prizes
    : giveaway.prizeData
      ? [giveaway.prizeData]
      : [];

  const initialPrizeId =
    giveaway.prizeId ||
    (prizesList.length > 0 ? (prizesList[0].id || prizesList[0]._id) : giveawayId);

  const [selectedPrizeId, setSelectedPrizeId] = useState(initialPrizeId);

  useEffect(() => {
    setSelectedPrizeId(initialPrizeId);
  }, [giveaway, initialPrizeId]);

  const handleSubmit = () => {
    const finalPrizeId = selectedPrizeId || initialPrizeId || giveawayId;
    if (onConfirm) {
      onConfirm(giveaway, { prizeId: finalPrizeId });
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: 'rgba(5, 8, 20, 0.85)', backdropFilter: 'blur(8px)' }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content text-white"
          style={{
            background: 'rgba(18, 24, 46, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '20px',
          }}
        >
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
              <FiGift className="text-primary" />
              <span>Enter Giveaway</span>
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={isJoining}
            ></button>
          </div>

          <div className="modal-body text-center py-4">
            {joinSuccess ? (
              <div className="py-3">
                <BsCheckCircleFill size={48} className="text-success mb-3" />
                <h4 className="fw-bold">Entry Confirmed!</h4>
                <p className="text-muted small mb-3">
                  You are now successfully participating in the <strong>{title}</strong> giveaway.
                </p>
                <button
                  type="button"
                  className="btn btn-primary px-4 rounded-pill small fw-bold"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h4 className="fw-bold text-white mb-1">{title}</h4>
                <p className="text-muted small mb-3">{subtitle}</p>

                {joinError && (
                  <div className="veloop-alert mb-3 text-start">
                    <div className="d-flex align-items-center gap-2">
                      <FiAlertCircle className="flex-shrink-0" />
                      <span>{joinError}</span>
                    </div>
                  </div>
                )}

                {/* Prize selection if multiple prizes are available */}
                {prizesList.length > 1 && (
                  <div className="text-start mb-3">
                    <label className="form-label small text-muted fw-semibold mb-2">
                      Select Prize to Enter For:
                    </label>
                    <div className="d-flex flex-column gap-2">
                      {prizesList.map((prize, idx) => {
                        const pid = prize.id || prize._id || `prize-${idx}`;
                        const isSelected = selectedPrizeId === pid;
                        return (
                          <div
                            key={pid}
                            onClick={() => setSelectedPrizeId(pid)}
                            className="p-2 rounded-3 d-flex align-items-center justify-content-between"
                            style={{
                              background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(10, 14, 28, 0.6)',
                              border: isSelected ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.08)',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <div className="d-flex align-items-center gap-2">
                              <FiAward className={isSelected ? 'text-primary' : 'text-muted'} />
                              <span className="small fw-semibold text-white">
                                {prize.name || prize.title || `Prize Tier ${idx + 1}`}
                              </span>
                            </div>
                            <span className="badge bg-secondary-subtle text-secondary small">
                              {prize.position ? `${prize.position}st` : prize.prizeTier || prize.tier || `${idx + 1}st`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div
                  className="p-3 rounded-3 text-start mb-3"
                  style={{
                    background: 'rgba(10, 14, 28, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div className="d-flex justify-content-between text-muted small mb-2">
                    <span>Giveaway ID:</span>
                    <span className="text-white fw-medium font-monospace small">
                      {giveawayId ? String(giveawayId).slice(-8) : 'N/A'}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between text-muted small mb-2">
                    <span>Selected Prize ID:</span>
                    <span className="text-white fw-medium font-monospace small">
                      {selectedPrizeId || 'Auto'}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between text-muted small mb-2">
                    <span>Status:</span>
                    <span className="badge bg-success-subtle text-success border border-success-subtle">
                      Active
                    </span>
                  </div>
                  <div className="d-flex justify-content-between text-muted small">
                    <span>Winner Selection:</span>
                    <span className="text-white">Random Verified Draw</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isJoining}
                  className="veloop-btn veloop-btn-register"
                  style={{ marginTop: '16px' }}
                >
                  {isJoining ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Joining Giveaway...</span>
                    </>
                  ) : (
                    <>
                      <FiCheck size={18} />
                      <span>Confirm & Join Now</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizeClaimModal;
