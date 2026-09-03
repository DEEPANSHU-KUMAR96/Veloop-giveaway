import React from 'react';
import {
  FiUser,
  FiCheckSquare,
  FiTrendingUp,
  FiGift,
  FiChevronRight,
  FiShield,
  FiZap,
} from 'react-icons/fi';
import { BsRocketTakeoff, BsStars } from 'react-icons/bs';
import { motion } from 'framer-motion';

const HowToParticipate = ({ onOpenRules }) => {
  const steps = [
    {
      num: '01',
      title: 'Sign Up / Log In',
      desc: 'Create or sign in to your free account.',
      icon: FiUser,
      color: '#818cf8',
      badge: 'Free',
    },
    {
      num: '02',
      title: 'Complete Tasks',
      desc: 'Earn entry tickets through quick tasks.',
      icon: FiCheckSquare,
      color: '#38bdf8',
      badge: '+Entries',
    },
    {
      num: '03',
      title: 'Collect Entries',
      desc: 'Entries auto-enroll into the draw pool.',
      icon: FiTrendingUp,
      color: '#34d399',
      badge: 'Auto',
    },
    {
      num: '04',
      title: 'Win & Claim',
      desc: 'Fair RNG draw & instant prize delivery.',
      icon: FiGift,
      color: '#fb923c',
      badge: 'Fair RNG',
    },
  ];

  return (
    <div
      className="p-3 p-xl-4 rounded-4 position-relative overflow-hidden text-white"
      style={{
        background: 'linear-gradient(180deg, rgba(16, 22, 46, 0.92) 0%, rgba(10, 14, 30, 0.96) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(14px)',
      }}
    >
      {/* Ambient background glow */}
      <div
        className="position-absolute top-0 end-0 rounded-circle"
        style={{
          width: '140px',
          height: '140px',
          background: 'radial-gradient(circle, rgba(129, 140, 248, 0.1) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom" style={{ borderColor: 'rgba(255, 255, 255, 0.07)' }}>
        <div className="d-flex align-items-center gap-2">
          <div
            className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.35) 0%, rgba(56, 189, 248, 0.25) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              color: '#c4b5fd',
              fontSize: '16px',
            }}
          >
            <BsRocketTakeoff />
          </div>
          <div>
            <h4 className="fw-bold mb-0 text-white" style={{ fontSize: '0.98rem' }}>
              How to Participate
            </h4>
            <span className="text-muted" style={{ fontSize: '0.72rem' }}>
              4 quick steps to win
            </span>
          </div>
        </div>

        <span
          className="badge px-2 py-1 rounded-pill d-inline-flex align-items-center gap-1"
          style={{
            background: 'rgba(34, 197, 94, 0.12)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#4ade80',
            fontSize: '0.68rem',
          }}
        >
          <FiZap size={10} /> 100% Free
        </span>
      </div>

      {/* Steps List */}
      <div className="d-flex flex-column gap-2 mb-3">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.num}
              whileHover={{ x: 3, backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
              className="p-2 px-2.5 rounded-3 d-flex align-items-center gap-2.5 transition"
              style={{
                background: 'rgba(12, 17, 36, 0.55)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Numbered Icon */}
              <div
                className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                  width: '32px',
                  height: '32px',
                  background: `${step.color}18`,
                  border: `1px solid ${step.color}45`,
                  color: step.color,
                  fontSize: '14px',
                }}
              >
                <Icon size={15} />
              </div>

              {/* Text */}
              <div className="flex-grow-1 overflow-hidden">
                <div className="d-flex align-items-center justify-content-between gap-1">
                  <span className="fw-bold text-white small" style={{ fontSize: '0.82rem' }}>
                    <span style={{ color: step.color }} className="me-1 font-monospace">
                      {step.num}.
                    </span>
                    {step.title}
                  </span>
                  <span
                    className="badge rounded-pill px-1.5 py-0.5"
                    style={{
                      background: `${step.color}15`,
                      color: step.color,
                      fontSize: '0.64rem',
                      fontWeight: 600,
                    }}
                  >
                    {step.badge}
                  </span>
                </div>
                <p className="text-muted mb-0 text-truncate" style={{ fontSize: '0.72rem', lineHeight: 1.3 }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trust Mini Footer */}
      <div
        className="p-2 px-3 rounded-2 mb-3 d-flex align-items-center justify-content-between text-muted small"
        style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.72rem' }}
      >
        <span className="d-flex align-items-center gap-1.5 text-info">
          <FiShield size={13} />
          <span>Provably Fair RNG</span>
        </span>
        <span className="text-success fw-semibold">Zero Purchase</span>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={onOpenRules}
        className="btn w-100 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-3 text-white"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.22) 0%, rgba(56, 189, 248, 0.18) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          height: '40px',
          fontSize: '0.78rem',
          letterSpacing: '0.5px',
        }}
      >
        <BsStars size={14} className="text-warning" />
        <span>VIEW RULES & ELIGIBILITY</span>
        <FiChevronRight size={14} />
      </motion.button>
    </div>
  );
};

export default HowToParticipate;
