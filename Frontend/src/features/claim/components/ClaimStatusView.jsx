import React, { useState } from 'react';
import {
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiCheck,
  FiCopy,
  FiAlertTriangle,
  FiInfo,
  FiTruck,
} from 'react-icons/fi';

const ClaimStatusView = ({ claim, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!claim) return null;

  const claimId = claim._id || claim.claimId || claim.id || 'N/A';
  const status = claim.status || 'SUBMITTED';

  const handleCopyId = () => {
    if (claimId && claimId !== 'N/A') {
      navigator.clipboard.writeText(claimId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusConfig = (st) => {
    switch (st) {
      case 'SUBMITTED':
        return {
          title: 'Claim Received & Queued',
          desc: 'Your shipping/contact details have been securely logged. Our fulfillment team is reviewing your claim.',
          color: '#f5a623',
          badgeClass: 'badge bg-warning text-dark',
          icon: <FiClock size={28} className="text-warning" />,
          step: 2,
        };
      case 'PROCESSING':
        return {
          title: 'Fulfillment & Dispatch In Progress',
          desc: 'Your prize is being verified, packed, or generated. You will receive courier / tracking updates shortly.',
          color: '#00d4ff',
          badgeClass: 'badge bg-info text-dark',
          icon: <FiTruck size={28} className="text-info" />,
          step: 3,
        };
      case 'COMPLETED':
        return {
          title: 'Prize Delivered Successfully',
          desc: 'This reward has been fulfilled and delivered. Thank you for participating in VELoop Giveaways!',
          color: '#22c55e',
          badgeClass: 'badge bg-success',
          icon: <FiCheckCircle size={28} className="text-success" />,
          step: 4,
        };
      case 'EXPIRED':
        return {
          title: 'Claim Window Expired',
          desc: 'The 7-day claim window for this reward has lapsed. Unclaimed rewards are recirculated.',
          color: '#ef4444',
          badgeClass: 'badge bg-danger',
          icon: <FiAlertTriangle size={28} className="text-danger" />,
          step: 0,
        };
      default:
        return {
          title: 'Claim Status Updated',
          desc: 'Your claim is currently on file with our operations team.',
          color: '#6366f1',
          badgeClass: 'badge bg-primary',
          icon: <FiPackage size={28} className="text-primary" />,
          step: 2,
        };
    }
  };

  const config = getStatusConfig(status);

  const steps = [
    { num: 1, label: 'Won Giveaway' },
    { num: 2, label: 'Claim Submitted' },
    { num: 3, label: 'Processing' },
    { num: 4, label: 'Delivered' },
  ];

  return (
    <div className="text-white">
      {/* Header status announcement */}
      <div
        className="text-center p-4 mb-4 rounded-4"
        style={{
          background: 'linear-gradient(180deg, rgba(30, 41, 69, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="mb-3 d-inline-flex p-3 rounded-circle" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
          {config.icon}
        </div>
        <h4 className="fw-bold mb-1">{config.title}</h4>
        <p className="text-muted small mb-3" style={{ maxWidth: '440px', margin: '0 auto', color: '#94a3b8' }}>
          {config.desc}
        </p>
        <span className={`${config.badgeClass} px-3 py-1.5 rounded-pill fs-6 fw-semibold`}>
          Status: {status}
        </span>
      </div>

      {/* Progress Timeline Tracker (if not expired) */}
      {status !== 'EXPIRED' && (
        <div className="mb-4 px-2">
          <div className="d-flex align-items-center justify-content-between position-relative mb-2">
            {/* Horizontal line */}
            <div
              className="position-absolute"
              style={{
                top: '50%',
                left: '10%',
                right: '10%',
                height: '2px',
                background: 'rgba(255, 255, 255, 0.1)',
                zIndex: 0,
                transform: 'translateY(-50%)',
              }}
            />
            {steps.map((s) => {
              const isPassed = config.step >= s.num;
              const isCurrent = config.step === s.num;
              return (
                <div
                  key={s.num}
                  className="d-flex flex-column align-items-center position-relative"
                  style={{ zIndex: 1 }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle fw-bold small"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: isPassed
                        ? 'linear-gradient(135deg, #7c77ff 0%, #5e8cff 100%)'
                        : 'rgba(18, 24, 46, 0.95)',
                      border: isCurrent
                        ? '2px solid #38bdf8'
                        : isPassed
                          ? '2px solid #7c77ff'
                          : '2px solid rgba(255, 255, 255, 0.15)',
                      color: isPassed ? '#ffffff' : '#64748b',
                      fontSize: '0.78rem',
                      boxShadow: isCurrent ? '0 0 12px rgba(56, 189, 248, 0.6)' : 'none',
                    }}
                  >
                    {isPassed ? <FiCheck size={14} /> : s.num}
                  </div>
                  <span
                    className="mt-1 small"
                    style={{
                      fontSize: '0.7rem',
                      color: isCurrent ? '#38bdf8' : isPassed ? '#cbd5e1' : '#64748b',
                      fontWeight: isCurrent ? '600' : 'normal',
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Claim Metadata Details Card */}
      <div
        className="p-3 mb-4 rounded-3"
        style={{
          background: 'rgba(13, 17, 33, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="row g-3 small">
          {/* Claim ID */}
          <div className="col-12 col-sm-6">
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>
              Claim Reference ID
            </div>
            <div className="d-flex align-items-center gap-2 mt-1">
              <code
                className="text-white px-2 py-1 rounded"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                }}
              >
                {claimId}
              </code>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary p-1 border-0 text-light"
                onClick={handleCopyId}
                title="Copy Claim ID"
              >
                {copied ? <FiCheck className="text-success" size={14} /> : <FiCopy size={14} />}
              </button>
            </div>
          </div>

          {/* Prize Type */}
          <div className="col-12 col-sm-6">
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>
              Prize Classification
            </div>
            <div className="fw-semibold text-white mt-1">
              {claim.prizeType || 'PHYSICAL'}
            </div>
          </div>

          {/* Submitted At */}
          <div className="col-12 col-sm-6">
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>
              Submitted At
            </div>
            <div className="text-white mt-1">
              {formatDate(claim.submittedAt || claim.createdAt)}
            </div>
          </div>

          {/* Deadline */}
          {claim.claimDeadline && (
            <div className="col-12 col-sm-6">
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                Claim Deadline Window
              </div>
              <div className="text-white mt-1">
                {formatDate(claim.claimDeadline)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pt-2">
        <div className="d-flex align-items-center gap-1.5 text-muted small" style={{ fontSize: '0.78rem' }}>
          <FiInfo size={14} className="text-info flex-shrink-0" />
          <span>Keep your Claim ID handy if contacting support.</span>
        </div>
        <button
          type="button"
          className="btn btn-secondary px-4 py-2 rounded-pill small fw-semibold"
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ClaimStatusView;
