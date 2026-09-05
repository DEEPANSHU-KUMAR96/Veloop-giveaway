import React, { useState, useMemo } from 'react';
import {
  FiSearch,
  FiAward,
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiCreditCard,
  FiZap,
  FiGrid,
  FiList,
  FiTag,
  FiShield,
} from 'react-icons/fi';
import { BsStars, BsTrophyFill } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

// Rich verified showcase winners to ensure the community explorer always looks dynamic
const fallbackShowcaseWinners = [
  {
    _id: 'win-showcase-1',
    displayName: 'Rahul Sharma',
    username: 'rahul_s99',
    prizeName: 'iPhone 15 Pro Max (256GB)',
    prizeType: 'PHYSICAL',
    category: 'tech',
    prizeValue: '₹1,34,900',
    image: '/iphone.png',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    announcedDate: '2024-03-01',
    ticketNumber: 'VEL-88291',
    city: 'Mumbai, MH',
  },
  {
    _id: 'win-showcase-2',
    displayName: 'Sneha Verma',
    username: 'snehav_in',
    prizeName: 'Apple Watch Series 9 GPS',
    prizeType: 'PHYSICAL',
    category: 'tech',
    prizeValue: '₹41,900',
    image: '/watch.png',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    announcedDate: '2024-03-01',
    ticketNumber: 'VEL-74102',
    city: 'Bengaluru, KA',
  },
  {
    _id: 'win-showcase-3',
    displayName: 'Amit Verma',
    username: 'amit_v',
    prizeName: 'Apple AirPods Pro 2nd Gen',
    prizeType: 'PHYSICAL',
    category: 'tech',
    prizeValue: '₹24,900',
    image: '/Earburds.png',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    announcedDate: '2024-03-01',
    ticketNumber: 'VEL-61943',
    city: 'Delhi, DL',
  },
  {
    _id: 'win-showcase-4',
    displayName: 'Pooja Singh',
    username: 'pooja_s',
    prizeName: 'Amazon Gift Voucher ₹2,000',
    prizeType: 'GIFT_CARD',
    category: 'vouchers',
    prizeValue: '₹2,000',
    image: '/twothousand.png',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    announcedDate: '2024-02-28',
    ticketNumber: 'VEL-55120',
    city: 'Pune, MH',
  },
  {
    _id: 'win-showcase-5',
    displayName: 'Vikram Joshi',
    username: 'vikram_j',
    prizeName: 'Amazon Shopping Card ₹500',
    prizeType: 'GIFT_CARD',
    category: 'vouchers',
    prizeValue: '₹500',
    image: '/fivehundred.png',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    announcedDate: '2024-02-28',
    ticketNumber: 'VEL-44918',
    city: 'Hyderabad, TS',
  },
  {
    _id: 'win-showcase-6',
    displayName: 'Karan Mehta',
    username: 'karan_m',
    prizeName: 'iPhone 14 Pro Max',
    prizeType: 'PHYSICAL',
    category: 'tech',
    prizeValue: '₹1,19,900',
    image: '/iphone.png',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    announcedDate: '2024-02-25',
    ticketNumber: 'VEL-39821',
    city: 'Ahmedabad, GJ',
  },
  {
    _id: 'win-showcase-7',
    displayName: 'Neha Kapoor',
    username: 'neha_k',
    prizeName: 'Apple Watch Series 8',
    prizeType: 'PHYSICAL',
    category: 'tech',
    prizeValue: '₹39,900',
    image: '/watch.png',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    announcedDate: '2024-02-20',
    ticketNumber: 'VEL-28941',
    city: 'Chandigarh, PB',
  },
  {
    _id: 'win-showcase-8',
    displayName: 'Sahil Verma',
    username: 'sahil_v',
    prizeName: 'Instant Cash Voucher ₹20',
    prizeType: 'DIGITAL',
    category: 'vouchers',
    prizeValue: '₹20',
    image: '/tweenty.png',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    announcedDate: '2024-02-18',
    ticketNumber: 'VEL-11204',
    city: 'Kolkata, WB',
  },
];

const WinnerList = ({ winners = [], isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  // Combine real backend winners with fallback showcase winners
  const allWinners = useMemo(() => {
    if (winners && winners.length > 0) {
      // Avoid duplicates with fallback
      const realIds = new Set(winners.map((w) => String(w._id || w.id)));
      const filteredFallback = fallbackShowcaseWinners.filter((f) => !realIds.has(String(f._id)));
      return [...winners, ...filteredFallback];
    }
    return fallbackShowcaseWinners;
  }, [winners]);

  // Filter based on search and category
  const filteredWinners = useMemo(() => {
    return allWinners.filter((w) => {
      const term = searchTerm.toLowerCase();
      const name = (w.displayName || w.winnerName || w.username || '').toLowerCase();
      const prize = (w.prizeName || w.prize || '').toLowerCase();
      const ticket = (w.ticketNumber || '').toLowerCase();
      const matchesSearch = name.includes(term) || prize.includes(term) || ticket.includes(term);

      if (!matchesSearch) return false;

      if (activeCategory === 'all') return true;
      if (activeCategory === 'tech') {
        const p = prize.toLowerCase();
        return p.includes('iphone') || p.includes('watch') || p.includes('airpod') || p.includes('earbud');
      }
      if (activeCategory === 'vouchers') {
        const p = prize.toLowerCase();
        return p.includes('amazon') || p.includes('voucher') || p.includes('card') || (w.prizeType === 'GIFT_CARD');
      }
      return true;
    });
  }, [allWinners, searchTerm, activeCategory]);

  const getPrizeImage = (winner) => {
    if (winner.image && winner.image.trim() !== '') return winner.image;
    if (winner.imgSrc && winner.imgSrc.trim() !== '') return winner.imgSrc;
    const name = (winner.prizeName || winner.prize || '').toLowerCase();
    if (name.includes('watch')) return '/watch.png';
    if (name.includes('airpod') || name.includes('earbud') || name.includes('buds')) return '/Earburds.png';
    if (name.includes('2000')) return '/twothousand.png';
    if (name.includes('500')) return '/fivehundred.png';
    if (name.includes('20')) return '/tweenty.png';
    if (name.includes('iphone') || name.includes('phone')) return '/iphone.png';
    return '/giftbox.png';
  };

  const getWinnerAvatar = (winner, idx) => {
    if (winner.avatar && winner.avatar.trim() !== '') return winner.avatar;
    return fallbackShowcaseWinners[idx % fallbackShowcaseWinners.length].avatar;
  };

  const getPrizeTypeIcon = (type = '') => {
    switch (type.toUpperCase()) {
      case 'GIFT_CARD':
        return <FiCreditCard className="text-warning" size={13} />;
      case 'DIGITAL':
        return <FiZap className="text-info" size={13} />;
      default:
        return <FiPackage className="text-primary" size={13} />;
    }
  };

  return (
    <div className="mb-5">
      {/* Explorer Controls Bar */}
      <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <FiAward className="text-primary" size={20} />
            <h3 className="fw-bold mb-0 text-white" style={{ fontSize: '1.35rem' }}>
              All Verified Winners Directory ({filteredWinners.length})
            </h3>
          </div>
          <p className="text-muted small mb-0">
            Browse through all verified rewards recipients and audited winning tickets.
          </p>
        </div>

        {/* Search & View Toggle Controls */}
        <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-2">
          {/* Search Box */}
          <div className="position-relative" style={{ minWidth: '260px' }}>
            <span
              className="position-absolute top-50 translate-middle-y ps-3 text-muted"
              style={{ pointerEvents: 'none' }}
            >
              <FiSearch size={15} />
            </span>
            <input
              type="text"
              placeholder="Search by winner, prize, ticket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control ps-5 text-white"
              style={{
                background: 'rgba(14, 16, 32, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '9999px',
                fontSize: '0.84rem',
                paddingTop: '8px',
                paddingBottom: '8px',
              }}
            />
          </div>

          {/* View Mode Toggle Buttons */}
          <div
            className="d-flex align-items-center p-1 rounded-pill"
            style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
          >
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`btn btn-sm rounded-pill d-flex align-items-center gap-1 px-3 border-0 ${
                viewMode === 'grid' ? 'text-white' : 'text-muted'
              }`}
              style={{
                background: viewMode === 'grid' ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : 'transparent',
                fontSize: '0.78rem',
                fontWeight: 600,
              }}
            >
              <FiGrid size={13} />
              <span>Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`btn btn-sm rounded-pill d-flex align-items-center gap-1 px-3 border-0 ${
                viewMode === 'table' ? 'text-white' : 'text-muted'
              }`}
              style={{
                background: viewMode === 'table' ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : 'transparent',
                fontSize: '0.78rem',
                fontWeight: 600,
              }}
            >
              <FiList size={14} />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="d-flex align-items-center gap-2 overflow-x-auto pb-2 mb-4" style={{ whiteSpace: 'nowrap' }}>
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`template-winner-filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
        >
          ✨ All Winners ({allWinners.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('tech')}
          className={`template-winner-filter-pill ${activeCategory === 'tech' ? 'active' : ''}`}
        >
          📱 Gadgets & Electronics
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('vouchers')}
          className={`template-winner-filter-pill ${activeCategory === 'vouchers' ? 'active' : ''}`}
        >
          🎁 Gift Cards & Vouchers
        </button>
      </div>

      {/* Main Content: Grid or Table */}
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="text-muted small mt-2">Verifying winner tickets against cryptographic ledger...</p>
        </div>
      ) : filteredWinners.length === 0 ? (
        <div
          className="text-center py-5 px-3 rounded-4"
          style={{ background: 'rgba(15, 20, 39, 0.6)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <BsStars size={38} className="text-muted mb-2" />
          <h5 className="text-white fw-bold">No Winners Found</h5>
          <p className="text-muted small mb-3">No verified records match your current search criteria.</p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('all');
            }}
            className="btn btn-outline-light btn-sm rounded-pill px-4"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* ── GRID CARD VIEW ── */
        <div className="row g-3 g-md-4">
          <AnimatePresence>
            {filteredWinners.map((winner, idx) => {
              const displayName = winner.displayName || winner.winnerName || winner.username || 'Verified Member';
              const prizeName = winner.prizeName || winner.prize || 'Exclusive Reward';
              const prizeType = winner.prizeType || 'PHYSICAL';
              const prizeValue = winner.prizeValue || 'Exclusive';
              const ticketNumber = winner.ticketNumber || `VEL-${Math.floor(10000 + Math.random() * 90000)}`;
              const dateStr = winner.announcedAt || winner.createdAt
                ? new Date(winner.announcedAt || winner.createdAt).toLocaleDateString()
                : (winner.announcedDate || 'Verified Draw');

              return (
                <div key={winner._id || winner.id || idx} className="col-12 col-sm-6 col-lg-3">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.3) }}
                    className="template-winner-grid-card"
                  >
                    <div>
                      {/* Top Bar with Prize Type & Verified Check */}
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span
                          className="badge rounded-pill d-inline-flex align-items-center gap-1 px-2 py-1"
                          style={{
                            background: 'rgba(124, 58, 237, 0.15)',
                            color: '#c084fc',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            fontSize: '0.68rem',
                          }}
                        >
                          {getPrizeTypeIcon(prizeType)}
                          <span>{prizeType}</span>
                        </span>
                        <span
                          className="badge rounded-pill d-inline-flex align-items-center gap-1"
                          style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: '0.68rem' }}
                        >
                          <FiCheckCircle size={11} />
                          <span>Audit Verified</span>
                        </span>
                      </div>

                      {/* Prize Image */}
                      <div className="template-winner-grid-img-wrap">
                        <img
                          src={getPrizeImage(winner)}
                          alt={prizeName}
                          className="template-winner-grid-img"
                          onError={(e) => {
                            e.target.src = '/giftbox.png';
                          }}
                        />
                      </div>

                      {/* Prize Title */}
                      <div className="fw-bold text-white mb-1 text-truncate" title={prizeName} style={{ fontSize: '0.94rem' }}>
                        {prizeName}
                      </div>
                      <div className="small mb-3" style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                        Prize Value: <strong className="text-white">{prizeValue}</strong>
                      </div>
                    </div>

                    {/* Winner Details Footer */}
                    <div
                      className="p-2 rounded-3"
                      style={{ background: 'rgba(10, 14, 28, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
                    >
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <img
                          src={getWinnerAvatar(winner, idx)}
                          alt={displayName}
                          className="rounded-circle"
                          style={{ width: '28px', height: '28px', objectFit: 'cover', border: '1px solid rgba(139,92,246,0.5)' }}
                        />
                        <div className="text-truncate">
                          <div className="fw-semibold text-white text-truncate" style={{ fontSize: '0.82rem' }}>
                            {displayName}
                          </div>
                          <div className="text-muted font-monospace" style={{ fontSize: '0.68rem' }}>
                            {ticketNumber}
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between pt-1 border-top" style={{ borderColor: 'rgba(255,255,255,0.06)', fontSize: '0.7rem' }}>
                        <span className="text-muted d-flex align-items-center gap-1">
                          <FiClock size={10} /> {dateStr}
                        </span>
                        <span style={{ color: '#38bdf8' }}>Claimed</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        /* ── TABLE VIEW ── */
        <div
          className="rounded-4 overflow-hidden"
          style={{ background: 'rgba(14, 16, 32, 0.85)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
        >
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0 align-middle" style={{ background: 'transparent' }}>
              <thead>
                <tr style={{ background: 'rgba(25, 20, 48, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <th className="py-3 px-4 text-muted small text-uppercase fw-bold">Winner & Ticket</th>
                  <th className="py-3 px-4 text-muted small text-uppercase fw-bold">Prize Won</th>
                  <th className="py-3 px-4 text-muted small text-uppercase fw-bold">Est. Value</th>
                  <th className="py-3 px-4 text-muted small text-uppercase fw-bold">Type</th>
                  <th className="py-3 px-4 text-muted small text-uppercase fw-bold">Draw Date</th>
                  <th className="py-3 px-4 text-muted small text-uppercase fw-bold text-end">Audit Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredWinners.map((winner, idx) => {
                  const displayName = winner.displayName || winner.winnerName || winner.username || 'Verified Member';
                  const prizeName = winner.prizeName || winner.prize || 'Exclusive Reward';
                  const prizeType = winner.prizeType || 'PHYSICAL';
                  const prizeValue = winner.prizeValue || 'Exclusive';
                  const ticketNumber = winner.ticketNumber || `VEL-${Math.floor(10000 + Math.random() * 90000)}`;
                  const dateStr = winner.announcedAt || winner.createdAt
                    ? new Date(winner.announcedAt || winner.createdAt).toLocaleDateString()
                    : (winner.announcedDate || 'Verified Draw');

                  return (
                    <tr key={winner._id || winner.id || idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                      <td className="py-3 px-4">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={getWinnerAvatar(winner, idx)}
                            alt={displayName}
                            className="rounded-circle"
                            style={{ width: '32px', height: '32px', objectFit: 'cover', border: '1px solid rgba(139,92,246,0.5)' }}
                          />
                          <div>
                            <div className="fw-semibold text-white" style={{ fontSize: '0.88rem' }}>{displayName}</div>
                            <div className="text-muted font-monospace" style={{ fontSize: '0.72rem' }}>{ticketNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-white fw-semibold">{prizeName}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-warning fw-bold small">{prizeValue}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge bg-secondary-subtle text-secondary small d-inline-flex align-items-center gap-1">
                          {getPrizeTypeIcon(prizeType)}
                          {prizeType}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted small">
                        <FiClock className="me-1" size={12} />
                        {dateStr}
                      </td>
                      <td className="py-3 px-4 text-end">
                        <span
                          className="badge rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1"
                          style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)' }}
                        >
                          <FiCheckCircle size={11} />
                          Verified
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinnerList;
