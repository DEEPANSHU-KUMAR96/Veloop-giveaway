import React, { useState, useEffect } from 'react';
import { FiGift, FiUsers, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';

const GiveawayStats = ({
  totalGiveaways = 24,
  totalParticipants = 8500,
  prizesWon = 1200,
  targetDate,
}) => {
  // Live countdown state that ticks every second
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 8,
    minutes: 45,
    seconds: 32,
  });

  useEffect(() => {
    // If a targetDate is supplied, calculate from it; otherwise use 12d from now
    const target = targetDate ? new Date(targetDate).getTime() : Date.now() + 12 * 86400000 + 8 * 3600000 + 45 * 60000 + 32 * 1000;

    const interval = setInterval(() => {
      const diff = target - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Format numbers nicely
  const displayGiveaways = totalGiveaways || 24;
  const displayParticipants =
    typeof totalParticipants === 'number' && totalParticipants >= 1000
      ? `${(totalParticipants / 1000).toFixed(1)}K+`
      : totalParticipants || '8.5K+';
  const displayPrizesWon =
    typeof prizesWon === 'number' && prizesWon >= 1000
      ? `${(prizesWon / 1000).toFixed(1)}K+`
      : prizesWon || '1.2K+';

  return (
    <section className="template-stats-bar-wrapper mb-5">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="template-stats-card p-3 p-md-4 rounded-4"
      >
        <div className="row g-3 g-md-0 align-items-center">
          {/* Col 1: Total Giveaways */}
          <div className="col-6 col-md-3 template-stat-item border-end-divider">
            <div className="d-flex align-items-center gap-3">
              <div className="template-stat-icon-wrap stat-icon-purple">
                <FiGift size={20} />
              </div>
              <div>
                <div className="stat-label">Total Giveaways</div>
                <div className="d-flex align-items-baseline gap-1.5">
                  <span className="stat-main-value">{displayGiveaways}</span>
                  <span className="stat-sub-text">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Total Participants */}
          <div className="col-6 col-md-3 template-stat-item border-end-divider">
            <div className="d-flex align-items-center gap-3">
              <div className="template-stat-icon-wrap stat-icon-purple">
                <FiUsers size={20} />
              </div>
              <div>
                <div className="stat-label">Total Participants</div>
                <div className="d-flex align-items-baseline gap-1.5">
                  <span className="stat-main-value">{displayParticipants}</span>
                  <span className="stat-sub-text">Users</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Prizes Won */}
          <div className="col-6 col-md-3 template-stat-item border-end-divider">
            <div className="d-flex align-items-center gap-3">
              <div className="template-stat-icon-wrap stat-icon-gold">
                <FiAward size={20} />
              </div>
              <div>
                <div className="stat-label">Prizes Won</div>
                <div className="d-flex align-items-baseline gap-1.5">
                  <span className="stat-main-value">{displayPrizesWon}</span>
                  <span className="stat-sub-text">Rewards</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Giveaway Ends In Countdown */}
          <div className="col-12 col-sm-6 col-md-3 template-stat-item ps-md-3 mt-3 mt-md-0">
            <div>
              <div className="stat-label mb-1.5 text-uppercase fw-semibold" style={{ letterSpacing: '0.5px' }}>
                Giveaway Ends In
              </div>
              <div className="template-countdown-ticker d-inline-flex align-items-center gap-1.5">
                {/* Days */}
                <div className="countdown-block text-center">
                  <span className="time-val font-monospace">{String(timeLeft.days).padStart(2, '0')}d</span>
                  <span className="countdown-unit-lbl">Days</span>
                </div>
                <span className="time-sep">:</span>

                {/* Hours */}
                <div className="countdown-block text-center">
                  <span className="time-val font-monospace">{String(timeLeft.hours).padStart(2, '0')}h</span>
                  <span className="countdown-unit-lbl">Hours</span>
                </div>
                <span className="time-sep">:</span>

                {/* Minutes */}
                <div className="countdown-block text-center">
                  <span className="time-val font-monospace">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                  <span className="countdown-unit-lbl">Mins</span>
                </div>
                <span className="time-sep">:</span>

                {/* Seconds */}
                <div className="countdown-block text-center">
                  <span className="time-val font-monospace time-sec-val">{String(timeLeft.seconds).padStart(2, '0')}s</span>
                  <span className="countdown-unit-lbl">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default GiveawayStats;
