import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiAward } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import WinnerCard from './WinnerCard.jsx';

const WinnersSlider = ({ winners = [] }) => {
  if (!winners || winners.length === 0) {
    return (
      <div className="section-header-box mb-4 p-4 text-center rounded-4">
        <FiAward className="text-secondary mb-2" size={32} />
        <h5 className="text-white fw-bold">No Winners Announced Yet</h5>
        <p className="text-muted small mb-0">
          Winners will automatically appear here once current giveaway draws are completed.
        </p>
      </div>
    );
  }

  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setStartIndex((prev) => (prev + 1) % winners.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setStartIndex((prev) => (prev - 1 + winners.length) % winners.length);
  };

  useEffect(() => {
    if (winners.length <= 1) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [winners.length]);

  return (
    <div className="section-header-box mb-4 p-3 rounded-4 position-relative overflow-hidden">
      {/* Header Row */}
      <div className="d-flex align-items-center justify-content-between w-100 mb-3 flex-wrap gap-2">
        <div className="d-flex align-items-center gap-2">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '32px',
              height: '32px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#f59e0b',
            }}
          >
            <FiAward size={16} />
          </div>
          <div>
            <span className="text-white fw-bold small d-block">Recent Verified Winners</span>
            <span className="text-muted" style={{ fontSize: '0.72rem' }}>
              Live audited winners from recent draws
            </span>
          </div>
        </div>

        {/* Modern Glassmorphic Slider Controls */}
        {winners.length > 1 && (
          <div
            className="d-flex align-items-center p-1 rounded-pill"
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Prev Button */}
            <motion.button
              type="button"
              onClick={prevSlide}
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(99, 102, 241, 0.25)', color: '#ffffff' }}
              whileTap={{ scale: 0.92 }}
              className="btn p-0 rounded-circle d-flex align-items-center justify-content-center border-0"
              style={{
                width: '32px',
                height: '32px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#cbd5e1',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
              aria-label="Previous winner"
            >
              <FiChevronLeft size={16} />
            </motion.button>

            {/* Counter pill */}
            <div className="px-2 text-center" style={{ minWidth: '46px' }}>
              <span className="text-white fw-bold" style={{ fontSize: '0.74rem' }}>
                {startIndex + 1}
              </span>
              <span className="text-muted" style={{ fontSize: '0.7rem' }}>
                /{winners.length}
              </span>
            </div>

            {/* Next Button */}
            <motion.button
              type="button"
              onClick={nextSlide}
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(99, 102, 241, 0.25)', color: '#ffffff' }}
              whileTap={{ scale: 0.92 }}
              className="btn p-0 rounded-circle d-flex align-items-center justify-content-center border-0"
              style={{
                width: '32px',
                height: '32px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#cbd5e1',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
              aria-label="Next winner"
            >
              <FiChevronRight size={16} />
            </motion.button>
          </div>
        )}
      </div>

      {/* Cards Slider with Smooth Animated Transitions */}
      <div className="w-100 position-relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={startIndex}
            initial={{ opacity: 0, x: direction * 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 25 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="row g-2 g-md-3 w-100 m-0"
          >
            <div className="col-12 col-md-6 p-1">
              <WinnerCard winner={winners[startIndex]} />
            </div>
            {winners.length > 1 && (
              <div className="col-12 col-md-6 p-1 d-none d-md-block">
                <WinnerCard winner={winners[(startIndex + 1) % winners.length]} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WinnersSlider;
