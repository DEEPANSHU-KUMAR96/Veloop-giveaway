import React, { useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FiCopy, FiCheck, FiPackage, FiTruck, FiArrowRight } from 'react-icons/fi';

const ClaimSuccessCard = ({ claimData, onClose, onViewStatus }) => {
  const [copied, setCopied] = useState(false);

  const claimId = claimData?.claimId || claimData?._id || claimData?.id || '';
  const prizeType = claimData?.prizeType || 'PHYSICAL';

  const handleCopy = () => {
    if (claimId) {
      navigator.clipboard.writeText(claimId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="text-center py-3 text-white">
      {/* Animated glowing checkmark badge */}
      <div className="position-relative d-inline-block mb-3">
        <div
          className="position-absolute top-50 start-50 translate-middle rounded-circle"
          style={{
            width: '90px',
            height: '90px',
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)',
            filter: 'blur(10px)',
            pointerEvents: 'none',
          }}
        />
        <BsCheckCircleFill size={64} className="text-success position-relative" />
      </div>

      <h3 className="fw-bold mb-2 text-white">Claim Submitted Successfully!</h3>
      <p className="text-muted small mb-4" style={{ maxWidth: '440px', margin: '0 auto', color: '#cbd5e1' }}>
        {prizeType === 'GIFT_CARD'
          ? 'Your claim request has been registered. Your voucher code and redemption details will be emailed to your verified address.'
          : 'Our dispatch team has recorded your shipping address. Your prize will be securely packaged and dispatched via tracked courier.'}
      </p>

      {/* Claim confirmation reference */}
      {claimId && (
        <div
          className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <span className="small text-muted">Claim ID:</span>
          <code className="text-info fw-bold" style={{ fontSize: '0.85rem' }}>
            {claimId}
          </code>
          <button
            type="button"
            className="btn btn-sm p-0 border-0 text-white ms-1"
            onClick={handleCopy}
            title="Copy ID"
          >
            {copied ? <FiCheck size={14} className="text-success" /> : <FiCopy size={14} />}
          </button>
        </div>
      )}

      {/* Action buttons */}
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-2 pt-2">
        {onViewStatus && (
          <button
            type="button"
            className="btn btn-outline-info px-4 py-2 rounded-pill small fw-semibold d-flex align-items-center justify-content-center gap-2 w-100 w-sm-auto"
            onClick={onViewStatus}
          >
            <FiTruck size={15} />
            <span>Track Claim Status</span>
          </button>
        )}
        <button
          type="button"
          className="btn btn-primary px-4 py-2 rounded-pill small fw-bold text-white d-flex align-items-center justify-content-center gap-2 w-100 w-sm-auto"
          onClick={onClose}
          style={{
            background: 'linear-gradient(135deg, #7c77ff 0%, #5e8cff 100%)',
            border: 'none',
          }}
        >
          <span>Done</span>
          <FiArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default ClaimSuccessCard;
