import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import PrizeCard from './PrizeCard.jsx';

// Default 4 prizes from the team's design template
const TEMPLATE_GIVEAWAYS = [
  {
    id: 'giveaway-iphone-15-pro',
    badge: '1st Prize',
    title: 'iPhone 15 Pro',
    subtitle: 'Latest Apple iPhone 15 Pro 256GB',
    participantsCountText: '2.3K+ Participants',
    timeLeft: '12d : 08h : 45m',
    imgSrc: '/iphone.png',
    isSelected: true,
  },
  {
    id: 'giveaway-apple-watch-9',
    badge: '2nd Prize',
    title: 'Apple Watch Series 9',
    subtitle: 'GPS, 45mm Midnight Aluminium Case',
    participantsCountText: '1.8K+ Participants',
    timeLeft: '12d : 08h : 45m',
    imgSrc: '/watch.png',
    isSelected: false,
  },
  {
    id: 'giveaway-airpods-pro-2',
    badge: '3rd Prize',
    title: 'AirPods Pro (2nd Gen)',
    subtitle: 'Active Noise-Cancellation MagSafe Charging Case',
    participantsCountText: '3.5K+ Participants',
    timeLeft: '12d : 08h : 45m',
    imgSrc: '/Earburds.png',
    isSelected: false,
  },
  {
    id: 'giveaway-amazon-gift-card',
    badge: 'Lucky Draw',
    title: 'Amazon Gift Card',
    subtitle: '₹2,000 Amazon Pay Gift Card',
    participantsCountText: '5K+ Participants',
    timeLeft: '12d : 08h : 45m',
    imgSrc: '/twothousand.png',
    isSelected: false,
  },
];

const FeaturedGiveaways = ({
  giveaways = [],
  onJoinClick,
  isLoading = false,
}) => {
  const [filter, setFilter] = useState('All Giveaways');

  // If live backend items are available, merge them; otherwise use template list
  const displayList =
    Array.isArray(giveaways) && giveaways.length >= 4
      ? giveaways
      : TEMPLATE_GIVEAWAYS.map((tpl, idx) => {
          const live = giveaways[idx];
          if (!live) return tpl;
          return {
            ...tpl,
            ...live,
            badge: live.badge || tpl.badge,
            title: live.title || live.name || tpl.title,
            subtitle: live.subtitle || live.description || tpl.subtitle,
            imgSrc: live.imgSrc || tpl.imgSrc,
            isSelected: idx === 0,
          };
        });

  return (
    <section id="active-giveaways" className="template-active-giveaways-section mb-5">
      {/* Section Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="template-section-heading d-flex align-items-center gap-2 mb-1">
            <span className="sparkle-accent">✨</span>
            <span>Active Giveaways</span>
          </h2>
          <p className="template-section-sub mb-0">
            Join and stand a chance to win amazing rewards.
          </p>
        </div>

        {/* Dropdown Filter */}
        <div className="dropdown">
          <button
            className="btn template-filter-dropdown-btn d-flex align-items-center gap-2"
            type="button"
            id="giveawayFilterDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span>{filter}</span>
            <FiChevronDown size={16} />
          </button>
          <ul className="dropdown-menu dropdown-menu-end template-dropdown-menu" aria-labelledby="giveawayFilterDropdown">
            <li>
              <button className="dropdown-item text-light small" onClick={() => setFilter('All Giveaways')}>
                All Giveaways
              </button>
            </li>
            <li>
              <button className="dropdown-item text-light small" onClick={() => setFilter('Grand Prizes')}>
                Grand Prizes
              </button>
            </li>
            <li>
              <button className="dropdown-item text-light small" onClick={() => setFilter('Lucky Draws')}>
                Lucky Draws
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* 4-Card Responsive Grid */}
      <div className="row g-3 g-lg-4">
        {displayList.map((item, index) => (
          <div key={item.id || item._id || index} className="col-12 col-sm-6 col-lg-3">
            <PrizeCard
              giveaway={item}
              isFeatured={index === 0}
              onJoinClick={onJoinClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedGiveaways;
