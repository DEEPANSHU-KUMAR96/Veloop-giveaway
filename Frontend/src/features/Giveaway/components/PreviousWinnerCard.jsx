import React from 'react';
import { FiGift, FiAward, FiCalendar, FiUsers } from 'react-icons/fi';

const PreviousWinnerCard = ({ giveaway }) => {
  const {
    title = 'MacBook Pro M3',
    winnerName = 'Sarah K.',
    winnerId = '@sarah_k',
    totalEntries = '14.2K',
    endedDate = 'Aug 28, 2024',
    prizeValue = '$1,999',
    imgSrc = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80',
  } = giveaway || {};

  return (
    <div
      className="p-3 rounded-4"
      style={{
        background: 'rgba(15, 20, 39, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="d-flex align-items-center justify-content-between mb-3">
        <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle small">
          Concluded
        </span>
        <span className="text-muted" style={{ fontSize: '0.74rem' }}>
          <FiCalendar className="me-1" /> {endedDate}
        </span>
      </div>

      <div className="d-flex align-items-center gap-3 mb-3">
        <img
          src={imgSrc}
          alt={title}
          className="rounded-3"
          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
        />
        <div>
          <h5 className="text-white fw-bold mb-1" style={{ fontSize: '0.95rem' }}>
            {title}
          </h5>
          <span className="text-success fw-bold small">{prizeValue} Value</span>
        </div>
      </div>

      <div
        className="p-2 rounded-3 mt-auto"
        style={{ background: 'rgba(10, 14, 28, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <FiAward className="text-warning" size={16} />
            <div>
              <div className="text-white fw-semibold small">{winnerName}</div>
              <div className="text-muted" style={{ fontSize: '0.7rem' }}>{winnerId}</div>
            </div>
          </div>
          <div className="text-end">
            <div className="text-muted" style={{ fontSize: '0.7rem' }}>Total Entries</div>
            <div className="text-info fw-bold small">{totalEntries}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousWinnerCard;
