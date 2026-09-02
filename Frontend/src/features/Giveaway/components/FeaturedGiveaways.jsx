import React from 'react';
import { FiStar, FiChevronRight, FiGift } from 'react-icons/fi';
import PrizeCard from './PrizeCard.jsx';

const FeaturedGiveaways = ({
  giveaways = [],
  onJoinClick,
  onViewAllClick,
  isLoading = false,
}) => {
  return (
    <div>
      {/* Section Header */}
      <div className="section-header-box">
        <div>
          <div className="section-header-title">
            <FiStar className="text-warning" />
            <span>Featured Giveaways</span>
          </div>
          <p className="section-header-sub">
            Participate in our handpicked giveaways and win exciting rewards.
          </p>
        </div>
        {giveaways.length > 0 && (
          <a
            href="#all-giveaways"
            onClick={(e) => {
              if (onViewAllClick) {
                e.preventDefault();
                onViewAllClick();
              }
            }}
            className="view-all-link"
          >
            <span>VIEW ALL GIVEAWAYS</span>
            <FiChevronRight />
          </a>
        )}
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading giveaways...</span>
          </div>
          <p className="text-muted small mt-2">Fetching live giveaways from database...</p>
        </div>
      ) : giveaways.length === 0 ? (
        <div
          className="text-center py-5 px-3 rounded-4"
          style={{
            background: 'rgba(15, 20, 39, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <FiGift size={40} className="text-secondary mb-3" />
          <h5 className="text-white fw-bold">No Active Giveaways Yet</h5>
          <p className="text-muted small mb-0">
            Check back soon for new exciting giveaways and exclusive reward drops!
          </p>
        </div>
      ) : (
        /* Giveaway Cards Grid (2x2) */
        <div className="row g-3">
          {giveaways.map((item) => (
            <div key={item.id || item._id} className="col-12 col-sm-6">
              <PrizeCard giveaway={item} onJoinClick={onJoinClick} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedGiveaways;
