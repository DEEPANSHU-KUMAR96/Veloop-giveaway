import React from 'react';
import { FiFileText, FiCheck } from 'react-icons/fi';

const GiveawayRules = ({ isOpen, onClose, rules = [], eligibility = '' }) => {
  if (!isOpen) return null;

  const defaultRules = [
    {
      title: '1. Eligibility Criteria',
      desc: eligibility || 'Open to all registered VELoop Rewards members. Ensure your profile is in good standing.',
    },
    {
      title: '2. Entry Calculation & Multipliers',
      desc: 'Users earn verified entries upon joining. Higher platform points (VEs, SVEs, Tokens) unlock higher tier entries.',
    },
    {
      title: '3. Verifiable Random Drawing',
      desc: 'Winners are chosen via an open, cryptographically secure RNG algorithm immediately when the event countdown reaches zero.',
    },
    {
      title: '4. Prize Claiming & Worldwide Delivery',
      desc: 'Physical hardware (e.g. iPhone, Apple Watch) is shipped globally with full tracking and insurance. Digital gift cards are issued within 24 to 48 hours.',
    },
  ];

  const hasCustomRules = Array.isArray(rules) && rules.length > 0;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: 'rgba(5, 8, 20, 0.85)', backdropFilter: 'blur(8px)' }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div
          className="modal-content text-white"
          style={{
            background: 'rgba(18, 24, 46, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '24px',
          }}
        >
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
              <FiFileText className="text-primary" />
              <span>Giveaway Rules & Guidelines</span>
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body py-4">
            <div className="d-flex flex-column gap-3 text-secondary small">
              {hasCustomRules ? (
                rules.map((ruleText, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-3"
                    style={{ background: 'rgba(10, 14, 28, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
                  >
                    <strong className="text-white d-block mb-1">Rule #{idx + 1}</strong>
                    {ruleText}
                  </div>
                ))
              ) : (
                defaultRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-3"
                    style={{ background: 'rgba(10, 14, 28, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
                  >
                    <strong className="text-white d-block mb-1">{rule.title}</strong>
                    {rule.desc}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="modal-footer border-0 pt-0">
            <button
              type="button"
              className="btn btn-primary px-4 rounded-3"
              onClick={onClose}
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveawayRules;
