import React from 'react';
import { BsBoxSeam } from 'react-icons/bs';

const GiveawayHero = ({
  badgeText = 'EXCLUSIVE GIVEAWAYS',
  titlePrefix = 'Giveaway',
  titleHighlight = 'Section',
  subtitle = 'Join exciting giveaways, complete simple tasks and win amazing rewards from VELoop Rewards.',
  tagline = '✦ More participation, more chances to win! ✦',
}) => {
  return (
    <section className="giveaway-hero">
      <div className="exclusive-badge">
        <BsBoxSeam />
        <span>{badgeText}</span>
      </div>

      <h1 className="giveaway-main-title">
        {titlePrefix} <span className="giveaway-gradient-text">{titleHighlight}</span>
      </h1>

      <p className="giveaway-main-subtitle">{subtitle}</p>

      <div className="giveaway-tagline">{tagline}</div>
    </section>
  );
};

export default GiveawayHero;
