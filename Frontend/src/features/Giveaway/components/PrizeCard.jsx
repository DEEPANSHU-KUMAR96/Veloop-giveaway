import React from 'react';
import { FiUsers, FiClock, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const PrizeCard = ({ giveaway = {}, isFeatured = false, onJoinClick }) => {
  const title = giveaway.title || giveaway.name || 'Exclusive Prize';
  const subtitle = giveaway.subtitle || giveaway.description || 'Join and stand a chance to win';
  const badge = giveaway.badge || '1st Prize';
  const isSelected = giveaway.isSelected || isFeatured || badge.toLowerCase().includes('1st');

  // Badge styling
  const isGoldBadge = badge.toLowerCase().includes('1st') || badge.toLowerCase().includes('lucky');
  const badgeClass = isGoldBadge ? 'template-badge-gold' : 'template-badge-purple';

  // Format participant count
  const participantsCount =
    giveaway.participantsCountText ||
    (typeof giveaway.totalParticipants === 'number'
      ? `${giveaway.totalParticipants > 999 ? (giveaway.totalParticipants / 1000).toFixed(1) + 'K+' : giveaway.totalParticipants} Participants`
      : '2.3K+ Participants');

  const timeLeft = giveaway.timeLeft || '12d : 08h : 45m';

  // Choose accurate image
  const getPrizeImage = () => {
    if (giveaway.imgSrc && giveaway.imgSrc.trim() !== '') return giveaway.imgSrc;
    if (giveaway.image && giveaway.image.trim() !== '') return giveaway.image;

    const lower = (title + ' ' + subtitle).toLowerCase();
    if (lower.includes('watch')) return '/watch.png';
    if (lower.includes('airpod') || lower.includes('earbud') || lower.includes('gen')) return '/Earburds.png';
    if (lower.includes('amazon') || lower.includes('card') || lower.includes('voucher') || lower.includes('2000')) return '/twothousand.png';
    if (lower.includes('iphone') || lower.includes('phone') || lower.includes('apple')) return '/iphone.png';
    return '/iphone.png';
  };

  const imageSrc = getPrizeImage();

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`template-prize-card h-100 d-flex flex-column ${isSelected ? 'template-card-featured' : ''}`}
    >
      {/* Top Badge */}
      <div className="card-top-badge-wrap">
        <span className={`template-prize-badge ${badgeClass}`}>
          {badge}
        </span>
      </div>

      {/* Prize Image Showcase */}
      <div className="template-prize-image-container">
        <div className="template-prize-glow-circle" />
        <img
          src={imageSrc}
          alt={title}
          className="template-prize-img"
          onError={(e) => {
            e.target.src = '/giveaway_gift_3d.jpg';
          }}
        />
      </div>

      {/* Card Content & Metadata */}
      <div className="template-card-body d-flex flex-column flex-grow-1 p-3">
        <h4 className="template-card-title mb-1 text-truncate" title={title}>
          {title}
        </h4>
        <p className="template-card-desc mb-3 line-clamp-2">
          {subtitle}
        </p>

        {/* Meta Stats: Participants & Time Left */}
        <div className="d-flex flex-column gap-1 mb-3 mt-auto">
          <div className="d-flex align-items-center gap-2 text-muted template-card-meta">
            <FiUsers size={14} className="meta-icon" />
            <span>{participantsCount}</span>
          </div>
          <div className="d-flex align-items-center gap-2 text-muted template-card-meta">
            <FiClock size={14} className="meta-icon" />
            <span>{timeLeft}</span>
          </div>
        </div>

        {/* Join Now CTA Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => onJoinClick && onJoinClick(giveaway)}
          className="btn template-card-btn-join w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <span>Join Now</span>
          <FiArrowRight size={15} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PrizeCard;
