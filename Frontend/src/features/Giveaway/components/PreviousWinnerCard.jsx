import React from 'react';
import { FiAward, FiCalendar, FiUsers, FiGift } from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';
import { motion } from 'framer-motion';

// Prize image lookup — matches your seeded prize names
const prizeImages = {
  'iPhone 15 Pro': 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=80',
  'Apple Watch Series 9': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=80',
  'AirPods Pro': 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&auto=format&fit=crop&q=80',
  'Amazon Gift Card ₹2000': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=80',
  'Amazon Gift Card ₹500': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=80',
  'Amazon Voucher ₹20': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=80',
};

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=80';

const PreviousWinnerCard = ({ giveaway, winners = [] }) => {
  // ── Giveaway fields from backend schema ──────────────────────────────────
  const title = giveaway?.title || 'Giveaway';

  const endedDate = giveaway?.endAt
    ? new Date(giveaway.endAt).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
    : 'N/A';

  const totalEntries = typeof giveaway?.totalParticipants === 'number' && giveaway.totalParticipants > 0
    ? giveaway.totalParticipants > 999
      ? (giveaway.totalParticipants / 1000).toFixed(1) + 'K'
      : String(giveaway.totalParticipants)
    : 'N/A';

  const prizeCount = Array.isArray(giveaway?.prizes) ? giveaway.prizes.length : 0;

  // First prize info for the card image
  const firstPrize = Array.isArray(giveaway?.prizes) ? giveaway.prizes[0] : null;
  const firstPrizeName = firstPrize?.name || '';
  const imgSrc = firstPrize?.image || prizeImages[firstPrizeName] || DEFAULT_IMG;

  // ── Winners — from GiveawayWinner collection (passed as prop) ────────────
  const hasWinners = winners.length > 0;
  const topWinner = hasWinners ? winners[0] : null;

  const winnerDisplay = topWinner?.displayName || null;
  const winnerPrize = topWinner?.prizeName || firstPrizeName || 'Prize';
  const extraWinnersCount = winners.length > 1 ? winners.length - 1 : 0;

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="p-3 rounded-4 h-100 d-flex flex-column"
      style={{
        background: 'rgba(15, 20, 39, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header row */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle" style={{ fontSize: '0.72rem' }}>
          Concluded
        </span>
        <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize: '0.74rem' }}>
          <FiCalendar size={12} /> {endedDate}
        </span>
      </div>

      {/* Prize image + title */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <img
          src={imgSrc}
          alt={firstPrizeName || title}
          className="rounded-3 flex-shrink-0"
          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
          onError={(e) => { e.target.src = DEFAULT_IMG; }}
        />
        <div className="overflow-hidden">
          <h5 className="text-white fw-bold mb-1 text-truncate" style={{ fontSize: '0.95rem' }} title={title}>
            {title}
          </h5>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            {prizeCount > 0 && (
              <span className="d-flex align-items-center gap-1" style={{ color: '#f5a623', fontSize: '0.75rem' }}>
                <FiGift size={12} /> {prizeCount} {prizeCount === 1 ? 'Prize' : 'Prizes'}
              </span>
            )}
            {totalEntries !== 'N/A' && (
              <span className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '0.75rem' }}>
                <FiUsers size={12} /> {totalEntries} entries
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Winner section — from GiveawayWinner collection */}
      <div
        className="p-2 rounded-3 mt-auto"
        style={{
          background: 'rgba(10, 14, 28, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {hasWinners ? (
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <FiAward className="text-warning flex-shrink-0" size={16} />
              <div>
                <div className="text-white fw-semibold small">{winnerDisplay}</div>
                <div className="text-muted" style={{ fontSize: '0.7rem' }}>Won: {winnerPrize}</div>
              </div>
            </div>
            {extraWinnersCount > 0 && (
              <span
                className="badge rounded-pill"
                style={{
                  background: 'rgba(99,102,241,0.15)',
                  border: '1px solid rgba(99,102,241,0.3)',
                  color: '#818cf8',
                  fontSize: '0.7rem',
                }}
              >
                +{extraWinnersCount} more
              </span>
            )}
          </div>
        ) : (
          <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '0.78rem' }}>
            <BsBoxSeam size={14} className="flex-shrink-0" />
            <span>Winners not yet announced</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PreviousWinnerCard;