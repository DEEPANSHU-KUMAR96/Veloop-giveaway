import React, { useState } from 'react';
import { FiSearch, FiAward, FiCheckCircle, FiClock, FiPackage, FiCreditCard, FiZap } from 'react-icons/fi';
import { BsBoxSeam, BsStars } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

const WinnerList = ({ winners = [], isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWinners = winners.filter((w) => {
    const term = searchTerm.toLowerCase();
    const name = (w.displayName || w.winnerName || w.username || '').toLowerCase();
    const prize = (w.prizeName || w.prize || '').toLowerCase();
    return name.includes(term) || prize.includes(term);
  });

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
    <div className="mb-4 mb-md-5">
      {/* Section Header */}
      <div className="section-header-box mb-3 d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
        <div>
          <h4 className="section-header-title">
            <FiAward className="text-primary" />
            <span>All Concluded Winners ({winners.length})</span>
          </h4>
          <p className="section-header-sub">Search verified winners by prize or display ID.</p>
        </div>

        {/* Search Input - Fluid on mobile */}
        {winners.length > 0 && (
          <div className="w-100" style={{ maxWidth: '320px' }}>
            <div className="veloop-input-box" style={{ height: '40px' }}>
              <span className="veloop-input-icon-left" style={{ fontSize: '15px' }}>
                <FiSearch />
              </span>
              <input
                type="text"
                placeholder="Search winners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="veloop-input"
                style={{ fontSize: '0.85rem' }}
              />
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="text-muted small mt-2">Loading verified winners from database...</p>
        </div>
      ) : filteredWinners.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-5 px-3 rounded-4"
          style={{ background: 'rgba(15, 20, 39, 0.6)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <BsBoxSeam size={36} className="text-secondary mb-2" />
          <h5 className="text-white fw-bold">No Winners in Database Yet</h5>
          <p className="text-muted small mb-0">Winners will appear here once the draw is executed and verified in the database.</p>
        </motion.div>
      ) : (
        <>
          {/* ── MOBILE VIEW: Responsive Cards (Hidden on md and up) ── */}
          <div className="d-block d-md-none">
            <div className="row g-2">
              <AnimatePresence>
                {filteredWinners.map((winner, idx) => {
                  const displayName = winner.displayName || winner.winnerName || winner.username || 'Verified Member';
                  const prizeName = winner.prizeName || winner.prize || 'Exclusive Prize';
                  const prizeType = winner.prizeType || 'PHYSICAL';
                  const dateStr = winner.announcedAt || winner.createdAt
                    ? new Date(winner.announcedAt || winner.createdAt).toLocaleDateString()
                    : 'Verified Draw';

                  return (
                    <motion.div
                      key={winner._id || winner.id || idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: Math.min(idx * 0.04, 0.3) }}
                      className="col-12"
                    >
                      <div
                        className="p-3 rounded-3"
                        style={{
                          background: 'rgba(15, 20, 39, 0.85)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: '30px',
                                height: '30px',
                                background: 'rgba(99, 102, 241, 0.2)',
                                border: '1px solid rgba(99, 102, 241, 0.4)',
                                color: '#818cf8',
                                fontSize: '13px',
                              }}
                            >
                              <BsStars />
                            </div>
                            <span className="fw-bold text-white font-monospace" style={{ fontSize: '0.9rem' }}>
                              {displayName}
                            </span>
                          </div>
                          <span
                            className="badge bg-success-subtle text-success border border-success-subtle d-inline-flex align-items-center gap-1"
                            style={{ fontSize: '0.7rem' }}
                          >
                            <FiCheckCircle size={10} />
                            Verified
                          </span>
                        </div>

                        <div className="p-2 rounded-2 mb-2" style={{ background: 'rgba(10, 14, 28, 0.5)' }}>
                          <div className="text-white fw-semibold small text-truncate">{prizeName}</div>
                          <div className="d-flex align-items-center gap-2 mt-1">
                            <span
                              className="badge bg-secondary-subtle text-secondary border border-secondary-subtle d-inline-flex align-items-center gap-1"
                              style={{ fontSize: '0.68rem' }}
                            >
                              {getPrizeTypeIcon(prizeType)}
                              {prizeType}
                            </span>
                          </div>
                        </div>

                        <div className="d-flex align-items-center justify-content-between text-muted" style={{ fontSize: '0.72rem' }}>
                          <span className="d-flex align-items-center gap-1">
                            <FiClock size={11} /> {dateStr}
                          </span>
                          <span className="text-info fw-semibold">Audit Passed</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* ── DESKTOP VIEW: Sleek Table (Hidden on mobile) ── */}
          <div
            className="d-none d-md-block rounded-4 overflow-hidden"
            style={{ background: 'rgba(15, 20, 39, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
          >
            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0 align-middle" style={{ background: 'transparent' }}>
                <thead>
                  <tr style={{ background: 'rgba(30, 41, 77, 0.5)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <th className="py-3 px-4 text-muted small text-uppercase fw-bold">Winner ID</th>
                    <th className="py-3 px-4 text-muted small text-uppercase fw-bold">Prize Won</th>
                    <th className="py-3 px-4 text-muted small text-uppercase fw-bold">Type</th>
                    <th className="py-3 px-4 text-muted small text-uppercase fw-bold">Announced Date</th>
                    <th className="py-3 px-4 text-muted small text-uppercase fw-bold text-end">Audit Status</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredWinners.map((winner, idx) => {
                      const displayName = winner.displayName || winner.winnerName || winner.username || 'Verified Member';
                      const prizeName = winner.prizeName || winner.prize || 'Exclusive Prize';
                      const prizeType = winner.prizeType || 'PHYSICAL';
                      const dateStr = winner.announcedAt || winner.createdAt
                        ? new Date(winner.announcedAt || winner.createdAt).toLocaleDateString()
                        : 'Verified Draw';

                      return (
                        <motion.tr
                          key={winner._id || winner.id || idx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, delay: Math.min(idx * 0.03, 0.25) }}
                          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}
                        >
                          <td className="py-3 px-4">
                            <span className="fw-semibold text-white font-monospace">{displayName}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-white fw-semibold">{prizeName}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="badge bg-secondary-subtle text-secondary small d-inline-flex align-items-center gap-1">
                              {getPrizeTypeIcon(prizeType)}
                              {prizeType}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-muted small" style={{ color: '#94a3b8' }}>
                            <FiClock className="me-1" size={13} />
                            {dateStr}
                          </td>
                          <td className="py-3 px-4 text-end">
                            <span className="badge bg-success-subtle text-success border border-success-subtle small px-2 py-1">
                              <FiCheckCircle className="me-1" />
                              Verified
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WinnerList;
