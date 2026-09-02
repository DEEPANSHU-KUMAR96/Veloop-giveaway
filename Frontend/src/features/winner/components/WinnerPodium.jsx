import React from 'react';
import { FiAward, FiCheckCircle } from 'react-icons/fi';
import { BsTrophyFill } from 'react-icons/bs';

const WinnerPodium = ({ topWinners = [] }) => {
  if (!topWinners || topWinners.length === 0) return null;

  const getBadgeClass = (index) => {
    if (index === 0) return { bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', label: '1st Prize - Grand Winner', color: '#f59e0b' };
    if (index === 1) return { bg: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', label: '2nd Prize Winner', color: '#3b82f6' };
    if (index === 2) return { bg: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', label: '3rd Prize Winner', color: '#10b981' };
    return { bg: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', label: `${index + 1}th Prize Winner`, color: '#a855f7' };
  };

  const getPrizeImage = (prizeName = '') => {
    const lower = prizeName.toLowerCase();
    if (lower.includes('watch')) return '/watch.png';
    if (lower.includes('airpod') || lower.includes('earbud') || lower.includes('buds')) return '/Earburds.png';
    if (lower.includes('2000')) return '/twothousand.png';
    if (lower.includes('500')) return '/fivehundred.png';
    if (lower.includes('20')) return '/tweenty.png';
    if (lower.includes('iphone') || lower.includes('phone')) return '/iphone.png';
    return '/giftbox.png';
  };

  return (
    <div className="mb-5">
      <div className="section-header-box mb-4">
        <div>
          <h4 className="section-header-title">
            <BsTrophyFill className="text-warning" />
            <span>Top Prize Winners</span>
          </h4>
          <p className="section-header-sub">Recognized top tier prize winners of this giveaway event.</p>
        </div>
      </div>

      <div className="row g-4">
        {topWinners.map((winner, idx) => {
          const badgeInfo = getBadgeClass(idx);
          const prizeName = winner.prizeName || winner.prize || 'Exclusive Prize';
          const displayName = winner.displayName || winner.winnerName || winner.username || 'Verified Member';
          const announcedDate = winner.announcedAt || winner.createdAt
            ? new Date(winner.announcedAt || winner.createdAt).toLocaleDateString()
            : 'Draw Concluded';

          return (
            <div key={winner._id || winner.id || idx} className="col-12 col-md-4">
              <div
                className="p-4 rounded-4 text-center position-relative h-100 d-flex flex-column justify-content-between"
                style={{
                  background: 'rgba(15, 20, 39, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${badgeInfo.color}40`,
                  boxShadow: `0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${badgeInfo.color}15`,
                  transition: 'transform 0.3s ease',
                }}
              >
                {/* Ribbon Tag */}
                <div
                  className="position-absolute top-0 start-50 translate-middle badge rounded-pill px-3 py-1 fw-bold small text-white"
                  style={{ background: badgeInfo.bg }}
                >
                  {badgeInfo.label}
                </div>

                <div className="mt-3">
                  {/* Prize Image Preview */}
                  <div
                    className="mx-auto rounded-3 p-3 mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '130px',
                      height: '130px',
                      background: 'radial-gradient(circle, rgba(30, 41, 77, 0.7) 0%, rgba(10, 14, 28, 0.9) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <img
                      src={getPrizeImage(prizeName)}
                      alt={prizeName}
                      style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
                      onError={(e) => { e.target.src = '/giftbox.png'; }}
                    />
                  </div>

                  <h5 className="fw-bold text-white mb-1">{prizeName}</h5>
                  <div className="d-flex align-items-center justify-content-center gap-1 text-info small fw-semibold mb-2">
                    <FiCheckCircle size={14} />
                    <span>Winner: {displayName}</span>
                  </div>
                </div>

                <div
                  className="p-2 rounded-3 text-muted small mt-3"
                  style={{ background: 'rgba(10, 14, 28, 0.6)', border: '1px solid rgba(255, 255, 255, 0.04)' }}
                >
                  <span className="d-block" style={{ color: '#cbd5e1' }}>Draw Date: {announcedDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WinnerPodium;
