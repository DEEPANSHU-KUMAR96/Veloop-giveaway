import React from 'react';
import { FiUser, FiFileText, FiAward, FiGift, FiChevronRight } from 'react-icons/fi';
import { BsRocketTakeoff } from 'react-icons/bs';

const HowToParticipate = ({ onOpenRules }) => {
  return (
    <div className="how-to-card">
      {/* Card Header */}
      <div className="how-to-header">
        <BsRocketTakeoff className="how-to-icon" />
        <div>
          <h3 className="how-to-title">How to Participate?</h3>
          <p className="how-to-sub">Follow these simple steps to join and win.</p>
        </div>
      </div>

      {/* Stepper Timeline */}
      <div className="stepper-timeline">
        {/* Step 1 */}
        <div className="stepper-item">
          <div className="stepper-icon-badge step-badge-purple">
            <FiUser size={13} />
          </div>
          <h4 className="step-heading">1. Sign Up / Login</h4>
          <p className="step-desc">Create your account or login to get started.</p>
        </div>

        {/* Step 2 */}
        <div className="stepper-item">
          <div className="stepper-icon-badge step-badge-blue">
            <FiFileText size={13} />
          </div>
          <h4 className="step-heading">2. Complete Tasks</h4>
          <p className="step-desc">Complete simple tasks and earn more entries.</p>
        </div>

        {/* Step 3 */}
        <div className="stepper-item">
          <div className="stepper-icon-badge step-badge-green">
            <FiAward size={13} />
          </div>
          <h4 className="step-heading">3. Get Entries</h4>
          <p className="step-desc">Each task gives you entries for the giveaway.</p>
        </div>

        {/* Step 4 */}
        <div className="stepper-item">
          <div className="stepper-icon-badge step-badge-orange">
            <FiGift size={13} />
          </div>
          <h4 className="step-heading">4. Win Rewards</h4>
          <p className="step-desc">Winners are selected randomly after the giveaway ends.</p>
        </div>
      </div>

      {/* Rules Button */}
      <button
        type="button"
        onClick={onOpenRules}
        className="btn-rules"
      >
        <FiFileText size={15} />
        <span>VIEW RULES & GUIDELINES</span>
        <FiChevronRight size={14} />
      </button>
    </div>
  );
};

export default HowToParticipate;
