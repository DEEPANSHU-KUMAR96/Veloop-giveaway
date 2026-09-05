import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Mock/Default recent winners exactly matching the design template
const DEFAULT_ANNOUNCEMENT_WINNERS = [
  {
    id: 'w-1',
    name: 'Rahul Sharma',
    prize: 'Won iPhone 14',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'w-2',
    name: 'Sneha Verma',
    prize: 'Won Watch',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'w-3',
    name: 'Amit Verma',
    prize: 'Won AirPods',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'w-4',
    name: 'Pooja Singh',
    prize: 'Won Amazon Card',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'w-5',
    name: 'Vikram Joshi',
    prize: 'Won iPhone 14',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'w-6',
    name: 'Kavita Roy',
    prize: 'Won ₹2000 Card',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
];

const WinnerAnnouncementBanner = ({ winners = [] }) => {
  const winnerList =
    Array.isArray(winners) && winners.length > 0
      ? winners.map((w, idx) => ({
          id: w._id || w.id || `w-${idx}`,
          name: w.displayName || w.name || w.username || 'Winner',
          prize: `Won ${w.prizeName || 'Prize'}`,
          avatar:
            w.avatar ||
            DEFAULT_ANNOUNCEMENT_WINNERS[idx % DEFAULT_ANNOUNCEMENT_WINNERS.length].avatar,
        }))
      : DEFAULT_ANNOUNCEMENT_WINNERS;

  // Responsive items count based on viewport width
  const getItemsPerPage = () => {
    if (typeof window === 'undefined') return 5;
    if (window.innerWidth < 540) return 3;
    if (window.innerWidth < 992) return 4;
    return 5;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const count = getItemsPerPage();
      setItemsPerPage(count);
      setCurrentIndex((prev) => Math.min(prev, Math.max(0, winnerList.length - count)));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [winnerList.length]);

  const maxIndex = Math.max(0, winnerList.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const visibleWinners = winnerList.slice(currentIndex, currentIndex + itemsPerPage);

  // Calculate total pages for dots
  const totalPages = maxIndex + 1;
  const itemWidth =
    itemsPerPage === 3 ? '32%' : itemsPerPage === 4 ? '23%' : '19%';

  return (
    <section className="template-winner-announcement-card mb-5 p-3 p-sm-4 rounded-4 position-relative overflow-hidden">
      {/* Background starlight & purple ambient glow */}
      <div className="announcement-glow-halo" />

      <div className="row align-items-center g-3 g-lg-4 position-relative" style={{ zIndex: 2 }}>
        {/* Left Side: Copy and View All CTA */}
        <div className="col-12 col-lg-4 text-center text-lg-start">
          <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 mb-2">
            <span className="announcement-popper-icon">🎉</span>
            <h4 className="announcement-title mb-0">Winner Announcement</h4>
          </div>
          <p className="announcement-subtitle mb-3 text-muted small">
            Congratulations to our recent lucky winners!
          </p>
          <Link
            to="/winners"
            className="btn template-btn-announcement-view d-inline-flex align-items-center gap-2"
          >
            <span>View All Winners</span>
            <FiArrowRight size={15} />
          </Link>
        </div>

        {/* Right Side: Horizontal Carousel with Prev/Next buttons */}
        <div className="col-12 col-lg-8">
          <div className="d-flex align-items-center justify-content-center gap-1 gap-sm-2">
            {/* Prev Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              className="btn template-carousel-nav-btn p-0 d-flex align-items-center justify-content-center flex-shrink-0"
              aria-label="Previous winners"
            >
              <FiChevronLeft size={18} />
            </button>

            {/* Avatars List */}
            <div className="d-flex align-items-center justify-content-around flex-grow-1 overflow-hidden py-1 px-0">
              <AnimatePresence mode="popLayout">
                {visibleWinners.map((winner) => (
                  <motion.div
                    key={winner.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.25 }}
                    className="text-center px-1 flex-shrink-0"
                    style={{ width: itemWidth, maxWidth: '120px' }}
                  >
                    {/* Circular Avatar with Glowing Ring */}
                    <div className="template-winner-avatar-ring mx-auto mb-1.5">
                      <img
                        src={winner.avatar}
                        alt={winner.name}
                        className="template-winner-avatar-img"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
                        }}
                      />
                    </div>
                    {/* Winner Name */}
                    <div
                      className="template-winner-name text-truncate"
                      title={winner.name}
                    >
                      {winner.name}
                    </div>
                    {/* Prize Won */}
                    <div
                      className="template-winner-prize text-truncate"
                      title={winner.prize}
                    >
                      {winner.prize}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={handleNext}
              className="btn template-carousel-nav-btn p-0 d-flex align-items-center justify-content-center flex-shrink-0"
              aria-label="Next winners"
            >
              <FiChevronRight size={18} />
            </button>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="d-flex align-items-center justify-content-center gap-1.5 mt-3">
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                onClick={() => setCurrentIndex(Math.min(dotIndex, maxIndex))}
                className={`template-carousel-dot border-0 p-0 ${
                  currentIndex === dotIndex ? 'active' : ''
                }`}
                aria-label={`Slide ${dotIndex + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WinnerAnnouncementBanner;
