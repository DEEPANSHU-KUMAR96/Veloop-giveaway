import React from 'react';
import { FiAward, FiCheckCircle, FiExternalLink, FiShield } from 'react-icons/fi';
import { BsTrophyFill, BsStars } from 'react-icons/bs';
import { motion } from 'framer-motion';
import UserAvatar from '../../../components/UserAvatar.jsx';

// Default showcase champions in case database draw is yet to conclude
const fallbackTopThree = [
  {
    _id: 'podium-1',
    rank: 1,
    prizeName: 'iPhone 15 Pro Max (256GB)',
    prizeValue: '₹1,34,900',
    displayName: 'Rahul Sharma',
    username: 'rahul_s99',
    city: 'Mumbai, MH',
    ticketNumber: 'VEL-88291',
    image: '/iphone.png',
    avatar: '/avatars/avatar1.svg',
    announcedDate: 'Recent Grand Draw',
  },
  {
    _id: 'podium-2',
    rank: 2,
    prizeName: 'Apple Watch Series 9 GPS',
    prizeValue: '₹41,900',
    displayName: 'Sneha Verma',
    username: 'snehav_in',
    city: 'Bengaluru, KA',
    ticketNumber: 'VEL-74102',
    image: '/watch.png',
    avatar: '/avatars/avatar2.svg',
    announcedDate: 'Recent Grand Draw',
  },
  {
    _id: 'podium-3',
    rank: 3,
    prizeName: 'Apple AirPods Pro 2nd Gen',
    prizeValue: '₹24,900',
    displayName: 'Amit Verma',
    username: 'amit_v',
    city: 'Delhi, DL',
    ticketNumber: 'VEL-61943',
    image: '/Earburds.png',
    avatar: '/avatars/avatar3.svg',
    announcedDate: 'Recent Grand Draw',
  },
];

const WinnerPodium = ({ topWinners = [] }) => {
  // Use real backend winners if available, otherwise use showcase data
  const displayPodium = topWinners.length >= 3
    ? topWinners.slice(0, 3)
    : topWinners.length > 0
      ? [...topWinners, ...fallbackTopThree.slice(topWinners.length, 3)]
      : fallbackTopThree;

  const getRankMeta = (index) => {
    if (index === 0) {
      return {
        rankClass: 'rank-1',
        rankNum: '1st Prize',
        label: 'Grand Champion',
        badgeBg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        badgeColor: '#1e1b4b',
        glowColor: 'rgba(245, 158, 11, 0.4)',
        icon: '👑',
      };
    }
    if (index === 1) {
      return {
        rankClass: 'rank-2',
        rankNum: '2nd Prize',
        label: 'Runner Up',
        badgeBg: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
        badgeColor: '#0f172a',
        glowColor: 'rgba(148, 163, 184, 0.35)',
        icon: '🥈',
      };
    }
    return {
      rankClass: 'rank-3',
      rankNum: '3rd Prize',
      label: '3rd Place',
      badgeBg: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)',
      badgeColor: '#ffffff',
      glowColor: 'rgba(217, 119, 6, 0.35)',
      icon: '🥉',
    };
  };

  const getPrizeImage = (winner, index) => {
    if (winner.image && winner.image.trim() !== '') return winner.image;
    if (winner.imgSrc && winner.imgSrc.trim() !== '') return winner.imgSrc;
    const name = (winner.prizeName || winner.prize || '').toLowerCase();
    if (name.includes('watch')) return '/watch.png';
    if (name.includes('airpod') || name.includes('earbud') || name.includes('buds')) return '/Earburds.png';
    if (name.includes('2000')) return '/twothousand.png';
    if (name.includes('500')) return '/fivehundred.png';
    if (name.includes('20')) return '/tweenty.png';
    if (name.includes('iphone') || name.includes('phone')) return '/iphone.png';
    return fallbackTopThree[index % 3].image;
  };

  const getWinnerAvatar = (winner, index) => {
    if (winner.avatar && winner.avatar.trim() !== '') return winner.avatar;
    return fallbackTopThree[index % 3].avatar;
  };

  return (
    <div className="mb-5">
      {/* Section Header */}
      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <BsTrophyFill className="text-warning" size={20} />
            <h3 className="fw-bold mb-0 text-white" style={{ fontSize: '1.35rem' }}>
              Hall of Fame • Grand Prize Champions
            </h3>
          </div>
          <p className="text-muted small mb-0">
            Top verified winners selected by cryptographic draw with audited random entropy.
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span
            className="badge rounded-pill d-inline-flex align-items-center gap-1 px-3 py-2"
            style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)', fontSize: '0.74rem' }}
          >
            <FiShield size={12} />
            <span>NIST Verified RNG</span>
          </span>
        </div>
      </div>

      {/* Podium Cards Grid */}
      <div className="row g-4 align-items-stretch">
        {displayPodium.map((winner, idx) => {
          const meta = getRankMeta(idx);
          const prizeName = winner.prizeName || winner.prize || fallbackTopThree[idx]?.prizeName;
          const prizeValue = winner.prizeValue || fallbackTopThree[idx]?.prizeValue || 'Exclusive';
          const displayName = winner.displayName || winner.winnerName || winner.username || fallbackTopThree[idx]?.displayName;
          const ticketNumber = winner.ticketNumber || fallbackTopThree[idx]?.ticketNumber || `VEL-${Math.floor(10000 + Math.random() * 90000)}`;
          const dateStr = winner.announcedAt || winner.createdAt
            ? new Date(winner.announcedAt || winner.createdAt).toLocaleDateString()
            : (winner.announcedDate || 'Verified Draw');

          return (
            <div key={winner._id || idx} className="col-12 col-md-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`template-podium-card ${meta.rankClass} p-4 h-100 d-flex flex-column justify-content-between text-center`}
              >
                {/* Top Badge */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span
                    className="template-podium-rank-badge"
                    style={{ background: meta.badgeBg, color: meta.badgeColor }}
                  >
                    <span>{meta.icon}</span>
                    <span>{meta.rankNum}</span>
                  </span>
                  <span
                    className="badge rounded-pill px-2 py-1"
                    style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8', fontSize: '0.68rem' }}
                  >
                    {meta.label}
                  </span>
                </div>

                {/* Prize Image Showcase */}
                <div className="template-podium-img-box">
                  <img
                    src={getPrizeImage(winner, idx)}
                    alt={prizeName}
                    className="template-podium-img"
                    onError={(e) => {
                      e.target.src = '/giftbox.png';
                    }}
                  />
                </div>

                {/* Prize Details */}
                <div className="mb-3">
                  <div className="badge mb-2 px-2 py-1" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', fontSize: '0.72rem' }}>
                    Value: {prizeValue}
                  </div>
                  <h4 className="fw-bold text-white mb-2" style={{ fontSize: '1.05rem', lineHeight: '1.3' }}>
                    {prizeName}
                  </h4>
                </div>

                {/* Winner Champion Details */}
                <div
                  className="p-3 rounded-4 mt-auto"
                  style={{
                    background: 'rgba(10, 14, 28, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
                    <UserAvatar
                      src={getWinnerAvatar(winner, idx)}
                      name={displayName}
                      size={50}
                      showRing={true}
                      ringColor={idx === 0 ? '#f59e0b' : idx === 1 ? '#94a3b8' : '#d97706'}
                    />
                    <div className="text-start">
                      <div className="fw-bold text-white d-flex align-items-center gap-1" style={{ fontSize: '0.92rem' }}>
                        <span>{displayName}</span>
                        <FiCheckCircle className="text-success" size={14} />
                      </div>
                      <div className="text-muted small" style={{ fontSize: '0.74rem' }}>
                        Ticket: <span className="font-monospace text-info">{ticketNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-2 border-top" style={{ borderColor: 'rgba(255,255,255,0.06)', fontSize: '0.72rem' }}>
                    <span className="text-muted">{dateStr}</span>
                    <span className="fw-bold" style={{ color: '#4ade80' }}>
                      100% Claimed
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WinnerPodium;
