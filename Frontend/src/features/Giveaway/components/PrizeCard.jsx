import React from 'react';
import { FiUsers, FiClock, FiArrowRight } from 'react-icons/fi';

const PrizeCard = ({ giveaway = {}, onJoinClick }) => {
  const id = giveaway.id || giveaway._id || 'giveaway-item';
  const title = giveaway.title || giveaway.name || giveaway.prize || 'Exclusive Prize';
  const subtitle = giveaway.subtitle || giveaway.description || giveaway.prizeDescription || 'Exciting giveaway item';
  const badge = giveaway.badge || giveaway.prizeTier || 'Featured Prize';
  const badgeClass = giveaway.badgeClass || (badge.toLowerCase().includes('2nd') ? 'prize-badge-2nd' : badge.toLowerCase().includes('3rd') ? 'prize-badge-3rd' : badge.toLowerCase().includes('lucky') ? 'prize-badge-lucky' : 'prize-badge-1st');
  const btnClass = giveaway.btnClass || (badgeClass.includes('2nd') ? 'btn-card-blue' : badgeClass.includes('3rd') ? 'btn-card-green' : badgeClass.includes('lucky') ? 'btn-card-orange' : 'btn-card-purple');

  const participantsCount =
    typeof giveaway.participants === 'number'
      ? `${giveaway.participants} Participants`
      : Array.isArray(giveaway.participants)
      ? `${giveaway.participants.length} Participants`
      : giveaway.participantsCount
      ? `${giveaway.participantsCount} Participants`
      : giveaway.totalParticipants
      ? `${giveaway.totalParticipants} Participants`
      : 'Active Entry';

  const timeLeftDisplay =
    giveaway.timeLeft ||
    (giveaway.endAt
      ? `${Math.max(0, Math.ceil((new Date(giveaway.endAt) - new Date()) / (1000 * 60 * 60 * 24)))}d Left`
      : 'Active');

  // Match local images based on name/title if no external image is supplied
  const getPrizeImage = () => {
    if (giveaway.imgSrc) return giveaway.imgSrc;
    if (giveaway.image) return giveaway.image;
    if (giveaway.imageUrl) return giveaway.imageUrl;

    const lower = title.toLowerCase();
    if (lower.includes('iphone') || lower.includes('phone') || lower.includes('apple')) return '/iphone.png';
    if (lower.includes('watch')) return '/watch.png';
    if (lower.includes('airpod') || lower.includes('earbud') || lower.includes('buds')) return '/Earburds.png';
    if (lower.includes('2000') || lower.includes('2,000')) return '/twothousand.png';
    if (lower.includes('500')) return '/fivehundred.png';
    if (lower.includes('20')) return '/tweenty.png';
    return '/giftbox.png';
  };

  const imageSource = getPrizeImage();

  return (
    <div className="giveaway-card">
      {/* Prize Ribbon Badge */}
      <span className={`prize-badge ${badgeClass}`}>{badge}</span>

      {/* Image Preview */}
      <div className="giveaway-img-wrap">
        <img
          src={imageSource}
          alt={title}
          onError={(e) => {
            e.target.src = '/giftbox.png';
          }}
        />
      </div>

      {/* Info */}
      <div className="giveaway-info">
        <h3 className="giveaway-title">{title}</h3>
        <p className="giveaway-subtitle">{subtitle}</p>

        {/* Meta Stats */}
        <div className="giveaway-meta">
          <div className="giveaway-meta-item">
            <FiUsers size={14} />
            <span>{participantsCount}</span>
          </div>
          <div className="giveaway-meta-item">
            <FiClock size={14} />
            <span>{timeLeftDisplay}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onJoinClick && onJoinClick(giveaway)}
          className={`btn-giveaway-action ${btnClass}`}
        >
          <span>Join Now</span>
          <FiArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PrizeCard;
