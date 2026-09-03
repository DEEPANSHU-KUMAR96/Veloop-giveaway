import React from 'react';
import { FiGift, FiClock, FiCheckCircle, FiPackage, FiCreditCard, FiZap } from 'react-icons/fi';

const PrizeSummaryCard = ({ winnerData, giveaway, claimDeadline }) => {
  const prizeName = winnerData?.prizeName || giveaway?.prize?.name || giveaway?.title || 'Exclusive Reward';
  const prizeType = winnerData?.prizeType || giveaway?.prize?.type || 'PHYSICAL';
  const displayName = winnerData?.displayName || 'Winner';

  const formatDeadline = (dateVal) => {
    if (!dateVal) {
      // Default to 7 days from now if not explicitly provided
      const d = new Date();
      d.setDate(d.getDate() + 7);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return new Date(dateVal).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPrizeTypeMeta = (type) => {
    switch (type) {
      case 'GIFT_CARD':
        return {
          label: 'Digital Gift Card',
          icon: <FiCreditCard className="text-warning" />,
          desc: 'Voucher will be emailed to your verified address',
          pillBg: 'rgba(245, 166, 35, 0.15)',
          pillBorder: 'rgba(245, 166, 35, 0.35)',
          textColor: '#f5a623',
        };
      case 'DIGITAL':
        return {
          label: 'Digital Reward',
          icon: <FiZap className="text-info" />,
          desc: 'Instant cryptographic / digital delivery',
          pillBg: 'rgba(0, 212, 255, 0.15)',
          pillBorder: 'rgba(0, 212, 255, 0.35)',
          textColor: '#00d4ff',
        };
      case 'PHYSICAL':
      default:
        return {
          label: 'Physical Delivery',
          icon: <FiPackage className="text-primary" />,
          desc: 'Tracked courier dispatch to your doorstep',
          pillBg: 'rgba(99, 102, 241, 0.15)',
          pillBorder: 'rgba(99, 102, 241, 0.35)',
          textColor: '#818cf8',
        };
    }
  };

  const meta = getPrizeTypeMeta(prizeType);

  return (
    <div
      className="p-3 mb-4 rounded-4"
      style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 69, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
        <div className="d-flex align-items-center gap-2">
          <span
            className="badge d-inline-flex align-items-center gap-1 px-2.5 py-1.5 rounded-pill text-uppercase fw-semibold"
            style={{
              background: meta.pillBg,
              border: `1px solid ${meta.pillBorder}`,
              color: meta.textColor,
              fontSize: '0.72rem',
              letterSpacing: '0.05em',
            }}
          >
            {meta.icon}
            <span>{meta.label}</span>
          </span>

          <span
            className="badge d-inline-flex align-items-center gap-1 px-2.5 py-1.5 rounded-pill text-white"
            style={{
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              color: '#4ade80',
              fontSize: '0.72rem',
            }}
          >
            <FiCheckCircle size={12} />
            <span>{displayName}</span>
          </span>
        </div>

        <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
          <FiClock className="text-warning flex-shrink-0" size={13} />
          <span>Claim before: <strong className="text-light">{formatDeadline(claimDeadline)}</strong></span>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3 mt-2">
        <div
          className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
          style={{
            width: '46px',
            height: '46px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
          }}
        >
          <FiGift size={24} className="text-primary-purple" style={{ color: '#a855f7' }} />
        </div>

        <div className="flex-grow-1 overflow-hidden">
          <h5 className="mb-0 fw-bold text-white text-truncate" title={prizeName}>
            {prizeName}
          </h5>
          <p className="mb-0 text-muted small" style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
            {meta.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrizeSummaryCard;
