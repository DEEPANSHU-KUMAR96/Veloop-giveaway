import React from 'react';
import { FiAward, FiCheckCircle } from 'react-icons/fi';

const WinnerCard = ({ winner }) => {
  const {
    name = 'Alex M.',
    username = 'alex_m99',
    avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    prize = 'iPhone 15 Pro',
    date = '2 days ago',
    badge = '1st Place',
    badgeColor = '#f59e0b',
  } = winner || {};

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
      <div className="d-flex align-items-center gap-3">
        <div className="position-relative">
          <img
            src={avatar}
            alt={name}
            className="rounded-circle"
            style={{ width: '44px', height: '44px', objectFit: 'cover', border: '2px solid rgba(99, 102, 241, 0.5)' }}
          />
          <span
            className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-dark"
            style={{ width: '10px', height: '10px' }}
          ></span>
        </div>
        <div>
          <div className="d-flex align-items-center gap-1">
            <span className="text-white fw-bold small">{name}</span>
            <FiCheckCircle size={12} className="text-info" />
          </div>
          <span className="text-muted" style={{ fontSize: '0.74rem' }}>
            @{username} • {date}
          </span>
        </div>
      </div>

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
          Won {prize}
        </span>
      </div>
    </div>
  );
};

export default WinnerCard;
