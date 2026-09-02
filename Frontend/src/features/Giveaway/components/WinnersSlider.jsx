import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiAward } from 'react-icons/fi';
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

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % winners.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + winners.length) % winners.length);
  };

  useEffect(() => {
    if (winners.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [winners.length]);

  return (
    <div className="section-header-box mb-4 p-3 rounded-4">
      <div className="d-flex align-items-center justify-content-between w-100 mb-3">
        <div className="d-flex align-items-center gap-2">
          <FiAward className="text-warning" size={18} />
          <span className="text-white fw-bold small">Recent Verified Winners</span>
        </div>
        {winners.length > 1 && (
          <div className="d-flex align-items-center gap-1">
            <button
              type="button"
              onClick={prevSlide}
              className="btn btn-sm btn-outline-secondary rounded-circle p-1 text-white border-secondary-subtle"
              style={{ width: '28px', height: '28px' }}
            >
              <FiChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="btn btn-sm btn-outline-secondary rounded-circle p-1 text-white border-secondary-subtle"
              style={{ width: '28px', height: '28px' }}
            >
              <FiChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      <div className="row g-3 w-100 m-0">
        <div className="col-12 col-md-6 p-1">
          <WinnerCard winner={winners[startIndex]} />
        </div>
        {winners.length > 1 && (
          <div className="col-12 col-md-6 p-1 d-none d-md-block">
            <WinnerCard winner={winners[(startIndex + 1) % winners.length]} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WinnersSlider;
