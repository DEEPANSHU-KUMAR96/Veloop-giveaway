import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Exactly matching the 5 previous winners in the design template
const DEFAULT_PREVIOUS_WINNERS = [
  {
    id: 'prev-1',
    prizeBadge: 'iPhone 14 Pro',
    imgSrc: '/iphone.png',
    winnerName: 'Karan Mehta',
    wonDate: 'Won on 10 May 2024',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'prev-2',
    prizeBadge: 'Apple Watch Series 8',
    imgSrc: '/watch.png',
    winnerName: 'Neha Kapoor',
    wonDate: 'Won on 08 May 2024',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'prev-3',
    prizeBadge: 'AirPods Pro',
    imgSrc: '/Earburds.png',
    winnerName: 'Rohit Gupta',
    wonDate: 'Won on 05 May 2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'prev-4',
    prizeBadge: 'Amazon Gift Card',
    imgSrc: '/twothousand.png',
    winnerName: 'Anjali Singh',
    wonDate: 'Won on 03 May 2024',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'prev-5',
    prizeBadge: 'iPhone 13',
    imgSrc: '/iphone.png',
    winnerName: 'Sahil Verma',
    wonDate: 'Won on 28 Apr 2024',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
  },
];

const PreviousWinnersSection = ({ pastWinners = [] }) => {
  const displayList =
    Array.isArray(pastWinners) && pastWinners.length >= 5
      ? pastWinners.map((pw, i) => ({
        id: pw._id || pw.id || `pw-${i}`,
        prizeBadge: pw.prizeName || DEFAULT_PREVIOUS_WINNERS[i]?.prizeBadge || 'Prize',
        imgSrc: pw.prizeImage || DEFAULT_PREVIOUS_WINNERS[i]?.imgSrc || '/iphone.png',
        winnerName: pw.displayName || pw.winnerName || DEFAULT_PREVIOUS_WINNERS[i]?.winnerName || 'Winner',
        wonDate: pw.createdAt ? `Won on ${new Date(pw.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}` : DEFAULT_PREVIOUS_WINNERS[i]?.wonDate || 'Recent Winner',
        avatar: pw.avatar || DEFAULT_PREVIOUS_WINNERS[i]?.avatar,
      }))
      : DEFAULT_PREVIOUS_WINNERS;

  return (
    <section className="template-previous-winners-section mb-5">
      {/* Section Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="template-section-heading d-flex align-items-center gap-2 mb-1">
            <span>🏆</span>
            <span>Previous Winners</span>
          </h2>
          <p className="template-section-sub mb-0">
            Real people. Real rewards.
          </p>
        </div>

        <Link to="/winners" className="template-view-all-link d-inline-flex align-items-center gap-1">
          <span>View All Winners</span>
          <FiChevronRight size={16} />
        </Link>
      </div>

      {/* 5-Card Responsive Row */}
      <div className="row g-3 g-xl-3">
        {displayList.map((item, idx) => (
          <div key={item.id} className="col-6 col-md-4 col-lg template-prev-col">
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="template-prev-winner-card h-100 d-flex flex-column p-3 rounded-3"
            >
              {/* Prize Badge */}
              <div className="mb-2">
                <span className="template-prev-prize-tag">
                  {item.prizeBadge}
                </span>
              </div>

              {/* Prize Product Image */}
              <div className="template-prev-image-wrap mb-3 d-flex align-items-center justify-content-center">
                <img
                  src={item.imgSrc}
                  alt={item.prizeBadge}
                  className="template-prev-img"
                  onError={(e) => {
                    e.target.src = '/giveaway_gift_3d.jpg';
                  }}
                />
              </div>

              {/* Winner Avatar + Details Row */}
              <div className="d-flex align-items-center gap-2 mt-auto pt-2 border-top border-secondary-subtle">
                <img
                  src={item.avatar}
                  alt={item.winnerName}
                  className="template-prev-avatar flex-shrink-0"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="overflow-hidden">
                  <div className="template-prev-winner-name text-truncate">
                    {item.winnerName}
                  </div>
                  <div className="template-prev-date text-truncate">
                    {item.wonDate}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreviousWinnersSection;
