import React, { useState } from 'react';
import { FiSearch, FiAward, FiCheckCircle, FiClock } from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';

const WinnerList = ({ winners = [], isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWinners = winners.filter((w) => {
    const term = searchTerm.toLowerCase();
    const name = (w.displayName || w.winnerName || w.username || '').toLowerCase();
    const prize = (w.prizeName || w.prize || '').toLowerCase();
    return name.includes(term) || prize.includes(term);
  });

  return (
    <div className="mb-5">
      <div className="section-header-box mb-3 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div>
          <h4 className="section-header-title">
            <FiAward className="text-primary" />
            <span>All Concluded Winners ({winners.length})</span>
          </h4>
          <p className="section-header-sub">Search verified winners by prize or display ID.</p>
        </div>

        {/* Search Input */}
        {winners.length > 0 && (
          <div style={{ minWidth: '240px', maxWidth: '300px' }}>
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
        <div
          className="text-center py-5 rounded-4"
          style={{ background: 'rgba(15, 20, 39, 0.6)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <BsBoxSeam size={36} className="text-secondary mb-2" />
          <h5 className="text-white fw-bold">No Winners in Database Yet</h5>
          <p className="text-muted small mb-0">Winners will appear here once the draw is executed and verified in the database.</p>
        </div>
      ) : (
        <div
          className="rounded-4 overflow-hidden"
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
                {filteredWinners.map((winner, idx) => {
                  const displayName = winner.displayName || winner.winnerName || winner.username || 'Verified Member';
                  const prizeName = winner.prizeName || winner.prize || 'Exclusive Prize';
                  const prizeType = winner.prizeType || 'PHYSICAL';
                  const dateStr = winner.announcedAt || winner.createdAt
                    ? new Date(winner.announcedAt || winner.createdAt).toLocaleDateString()
                    : 'Verified Draw';

                  return (
                    <tr key={winner._id || winner.id || idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                      <td className="py-3 px-4">
                        <span className="fw-semibold text-white font-monospace">{displayName}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-white fw-semibold">{prizeName}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge bg-secondary-subtle text-secondary small">{prizeType}</span>
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
