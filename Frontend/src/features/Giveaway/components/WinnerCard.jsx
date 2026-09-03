import React from 'react';
import { FiAward, FiCheckCircle } from 'react-icons/fi';

const badgeConfig = {
  'iPhone 15 Pro': { badge: '1st Prize', badgeColor: '#f59e0b' },
  'Apple Watch Series 9': { badge: '2nd Prize', badgeColor: '#6366f1' },
  'AirPods Pro': { badge: '3rd Prize', badgeColor: '#10b981' },
  'Amazon Gift Card ₹2000': { badge: 'Lucky Draw', badgeColor: '#f5a623' },
  'Amazon Gift Card ₹500': { badge: 'Lucky Draw', badgeColor: '#f5a623' },
  'Amazon Voucher ₹20': { badge: 'Lucky Draw', badgeColor: '#f5a623' },
};

const prizeEmojis = {
  'iPhone 15 Pro': '📱',
  'Apple Watch Series 9': '⌚',
  'AirPods Pro': '🎧',
  'Amazon Gift Card ₹2000': '🎁',
  'Amazon Gift Card ₹500': '🎁',
  'Amazon Voucher ₹20': '🎁',
};

const WinnerCard = ({ winner }) => {
  // Real backend data
  const displayName = winner?.displayName || 'VE****00';
  const prizeName = winner?.prizeName || 'Prize';
  const announcedAt = winner?.announcedAt
    ? new Date(winner.announcedAt).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    })
    : 'Recently';

  const { badge, badgeColor } = badgeConfig[prizeName] || {
    badge: 'Winner',
    badgeColor: '#f5a623',
  };

  const emoji = prizeEmojis[prizeName] || '🏆';

  return (
    <div
      className="p-3 rounded-4 d-flex align-items-center justify-content-between"
      style={{
        background: 'rgba(15, 20, 39, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Left — Winner Info */}
      <div className="d-flex align-items-center gap-3">

        {/* Avatar — Emoji based kyunki real photos nahi hain */}
        <div
          className="rounded-circle d-flex align-items-center justify-content-center position-relative"
          style={{
            width: '44px',
            height: '44px',
            backgroundColor: `${badgeColor}22`,
            border: `2px solid ${badgeColor}55`,
            fontSize: '1.2rem',
            flexShrink: 0,
          }}
        >
          {emoji}
          {/* Online indicator */}
          <span
            className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-dark"
            style={{ width: '10px', height: '10px' }}
          />
        </div>

        {/* Name + ID */}
        <div>
          <div className="d-flex align-items-center gap-1">
            <span className="text-white fw-bold small">{displayName}</span>
            <FiCheckCircle size={12} className="text-info" />
          </div>
          <span className="text-muted" style={{ fontSize: '0.74rem' }}>
            {announcedAt}
          </span>
        </div>
      </div>

      {/* Right — Prize Info */}
      <div className="text-end">
        <span
          className="badge mb-1 d-block"
          style={{
            background: `${badgeColor}22`,
            color: badgeColor,
            border: `1px solid ${badgeColor}55`,
            fontSize: '0.68rem',
            fontWeight: 700,
          }}
        >
          {badge}
        </span>
        <span className="text-white-50" style={{ fontSize: '0.78rem', fontWeight: 600 }}>
          Won {prizeName}
        </span>
      </div>

    </div>
  );
};

export default WinnerCard;