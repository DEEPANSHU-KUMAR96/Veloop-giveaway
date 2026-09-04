import React from 'react';
import { FiUsers, FiClock, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const PrizeCard = ({ giveaway = {}, onJoinClick }) => {
  const id = giveaway.id || giveaway._id || 'giveaway-item';
  const title = giveaway.title || giveaway.name || giveaway.prize || 'Exclusive Prize';
  const subtitle = giveaway.subtitle || giveaway.description || giveaway.prizeDescription || 'Exciting giveaway item';
  const badge = giveaway.badge || giveaway.prizeTier || 'Featured Prize';
  const badgeClass = giveaway.badgeClass || (badge.toLowerCase().includes('2nd') ? 'prize-badge-2nd' : badge.toLowerCase().includes('3rd') ? 'prize-badge-3rd' : badge.toLowerCase().includes('lucky') ? 'prize-badge-lucky' : 'prize-badge-1st');
  const btnClass = giveaway.btnClass || (badgeClass.includes('2nd') ? 'btn-card-blue' : badgeClass.includes('3rd') ? 'btn-card-green' : badgeClass.includes('lucky') ? 'btn-card-orange' : 'btn-card-purple');

  const participantsCount =
    typeof giveaway.totalParticipants === 'number'
      ? `${giveaway.totalParticipants} Participants`
      : typeof giveaway.participants === 'number'
        ? `${giveaway.participants} Participants`
        : Array.isArray(giveaway.participants)
          ? `${giveaway.participants.length} Participants`
          : giveaway.participantsCount
            ? `${giveaway.participantsCount} Participants`
            : '0 Participants';

  const timeLeftDisplay =
    giveaway.timeLeft ||
    (giveaway.endAt
      ? `${Math.max(0, Math.ceil((new Date(giveaway.endAt) - new Date()) / (1000 * 60 * 60 * 24)))}d Left`
      : 'Active');

  // Match local images based on name/title accurately
  const getPrizeImage = () => {
    // If individual prize itself has an explicit image
    if (giveaway.imgSrc && giveaway.imgSrc.trim() !== '') return giveaway.imgSrc;
    if (giveaway.prizeData?.image && giveaway.prizeData.image.trim() !== '') return giveaway.prizeData.image;

    const lower = (title + ' ' + subtitle).toLowerCase();
    if (lower.includes('watch')) return '/watch.png';
    if (lower.includes('airpod') || lower.includes('earbud') || lower.includes('buds') || lower.includes('headphone')) return '/Earburds.png';
    if (lower.includes('2000') || lower.includes('2,000')) return '/twothousand.png';
    if (lower.includes('500')) return '/fivehundred.png';
    if (lower.includes('20') || lower.includes('twenty') || lower.includes('voucher')) return '/tweenty.png';
    if (lower.includes('iphone') || lower.includes('phone') || lower.includes('mobile')) return '/iphone.png';

    if (giveaway.image) return giveaway.image;
    if (giveaway.imageUrl) return giveaway.imageUrl;
    return '/giveaway_gift_3d.jpg';
  };

  const imageSource = getPrizeImage();

  // Tier Icon
  const getTierIcon = () => {
    const b = badge.toLowerCase();
    if (b.includes('1st')) return '👑';
    if (b.includes('2nd')) return '🥈';
    if (b.includes('3rd')) return '🥉';
    return '🎁';
  };

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="giveaway-card"
    >
      {/* Top Tag & Prize Ribbon Badge */}
      <div className="d-flex align-items-center justify-content-between position-absolute w-100 top-0 start-0 p-3" style={{ zIndex: 2 }}>
        <span className={`prize-badge position-static m-0 ${badgeClass}`}>
          <span className="me-1">{getTierIcon()}</span>
          {badge}
        </span>
        <span className="badge rounded-pill" style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#38bdf8', fontSize: '0.68rem' }}>
          Free Entry
        </span>
      </div>

      {/* Image Preview with 3D Radial Glow */}
      <div className="giveaway-img-wrap position-relative">
        <div className="giveaway-card-glow-backdrop" />
        <img
          src={imageSource}
          alt={title}
          onError={(e) => {
            e.target.src = '/giveaway_gift_3d.jpg';
          }}
        />
      </div>

      {/* Info */}
      <div className="giveaway-info">
        <h3 className="giveaway-title text-truncate" title={title}>{title}</h3>
        <p className="giveaway-subtitle line-clamp-2">{subtitle}</p>

        {/* Meta Stats */}
        <div className="giveaway-meta flex-wrap">
          <div className="giveaway-meta-item text-light">
            <FiUsers size={14} className="text-info" />
            <span>{participantsCount}</span>
          </div>
          <div className="giveaway-meta-item">
            <FiClock size={14} className="text-warning" />
            <span className="text-white-50">{timeLeftDisplay}</span>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onJoinClick && onJoinClick(giveaway)}
          className={`btn-giveaway-action ${btnClass} d-flex align-items-center justify-content-center`}
          style={{ minHeight: '44px' }}
        >
          <span>Participate Now</span>
          <FiArrowRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PrizeCard;
