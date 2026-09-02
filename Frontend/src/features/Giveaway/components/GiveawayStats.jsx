import React from 'react';
import { FiGift, FiUsers, FiAward, FiClock } from 'react-icons/fi';
import Countdown from './Countdown.jsx';

const GiveawayStats = ({
  totalGiveaways = 0,
  totalGiveawaysSub = 'Active',
  totalParticipants = 0,
  totalParticipantsSub = 'Users',
  prizesWon = 0,
  prizesWonSub = 'Rewards',
  targetDate,
}) => {
  return (
    <section className="metrics-row">
      <div className="row g-3">
        {/* Total Giveaways */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="metric-card">
            <div className="metric-icon-wrap metric-icon-purple">
              <FiGift />
            </div>
            <div>
              <div className="metric-label">TOTAL GIVEAWAYS</div>
              <div className="metric-value">
                {totalGiveaways} <span className="metric-highlight-purple">{totalGiveawaysSub}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Participants */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="metric-card">
            <div className="metric-icon-wrap metric-icon-cyan">
              <FiUsers />
            </div>
            <div>
              <div className="metric-label">TOTAL PARTICIPANTS</div>
              <div className="metric-value">
                {totalParticipants > 0 ? `${totalParticipants}` : '0'}{' '}
                <span className="metric-highlight-cyan">{totalParticipantsSub}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prizes Won */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="metric-card">
            <div className="metric-icon-wrap metric-icon-green">
              <FiAward />
            </div>
            <div>
              <div className="metric-label">PRIZES WON</div>
              <div className="metric-value">
                {prizesWon} <span className="metric-highlight-green">{prizesWonSub}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ends In */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="metric-card">
            <div className="metric-icon-wrap metric-icon-amber">
              <FiClock />
            </div>
            <div>
              <div className="metric-label">ENDS IN</div>
              <div className="metric-value metric-highlight-amber" style={{ fontSize: '0.94rem' }}>
                <Countdown targetDate={targetDate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiveawayStats;
