import React from 'react';
import { FiGift, FiUsers, FiAward, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';
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
  const stats = [
    {
      id: 'giveaways',
      label: 'TOTAL GIVEAWAYS',
      value: totalGiveaways,
      sub: totalGiveawaysSub,
      icon: FiGift,
      type: 'purple',
      badge: 'Live Pool',
      isCountdown: false,
    },
    {
      id: 'participants',
      label: 'TOTAL PARTICIPANTS',
      value: totalParticipants > 0 ? `${totalParticipants}` : '0',
      sub: totalParticipantsSub,
      icon: FiUsers,
      type: 'cyan',
      badge: 'Community',
      isCountdown: false,
    },
    {
      id: 'prizes',
      label: 'PRIZES DISTRIBUTED',
      value: prizesWon,
      sub: prizesWonSub,
      icon: FiAward,
      type: 'green',
      badge: '100% Verified',
      isCountdown: false,
    },
    {
      id: 'countdown',
      label: 'NEXT DRAW ENDS IN',
      value: null,
      sub: '',
      icon: FiClock,
      type: 'amber',
      badge: 'Urgent',
      isCountdown: true,
    },
  ];

  return (
    <section className="metrics-row mb-5">
      <div className="row g-3">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="col-12 col-sm-6 col-lg-3">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`metric-card metric-card-${item.type} position-relative overflow-hidden`}
              >
                <div className={`metric-top-border metric-border-${item.type}`} />

                <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                  <div className={`metric-icon-wrap metric-icon-${item.type}`}>
                    <Icon />
                  </div>
                  <span className={`metric-micro-pill metric-pill-${item.type}`}>
                    {item.badge}
                  </span>
                </div>

                <div>
                  <div className="metric-label">{item.label}</div>
                  <div className="metric-value">
                    {item.isCountdown ? (
                      <span className="metric-highlight-amber" style={{ fontSize: '0.96rem' }}>
                        <Countdown targetDate={targetDate} />
                      </span>
                    ) : (
                      <>
                        {item.value}{' '}
                        <span className={`metric-highlight-${item.type}`}>{item.sub}</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GiveawayStats;
