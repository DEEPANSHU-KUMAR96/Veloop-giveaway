import React from 'react';
import { FiAward, FiCheckCircle } from 'react-icons/fi';
import { BsStars, BsTrophyFill } from 'react-icons/bs';

const WinnerHero = ({ giveawayTitle = 'Summer Rewards Giveaway', winnerCount = 0 }) => {
  return (
    <div className="giveaway-hero text-center py-5 position-relative">
      <div className="exclusive-badge mb-3">
        <BsTrophyFill className="text-warning" />
        <span>OFFICIAL WINNER ANNOUNCEMENT</span>
        <BsStars className="text-info" />
      </div>

      <h1 className="giveaway-main-title">
        Congratulations to All{' '}
        <span className="giveaway-gradient-text">Winners!</span>
      </h1>

      <p className="giveaway-main-subtitle">
        The draw for <strong>{giveawayTitle}</strong> has concluded. All {winnerCount > 0 ? `${winnerCount} winners` : 'winners'} were selected transparently using cryptographically verified RNG.
      </p>

      <div className="d-flex align-items-center justify-content-center gap-3 mt-3 flex-wrap">
        <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill small">
          <FiCheckCircle className="me-1" />
          100% Verified Draw
        </span>
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill small">
          <FiAward className="me-1" />
          Tamper-Proof Audit
        </span>
      </div>
    </div>
  );
};

export default WinnerHero;
