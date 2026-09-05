import React from 'react';
import { FiShield, FiLock, FiCheckCircle, FiCpu, FiHash, FiFileText } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import { motion } from 'framer-motion';

const FairnessAuditCard = () => {
  const auditPoints = [
    {
      icon: FiLock,
      color: 'text-info',
      title: 'Immutable Cryptographic Seed',
      desc: 'Draw entropy seeds are pre-committed and hashed prior to giveaway closure, preventing retrospective manipulation.',
    },
    {
      icon: FiCpu,
      color: 'text-warning',
      title: 'NIST-Compliant CSPRNG',
      desc: 'Random winner selections execute using cryptographically secure pseudorandom number generators.',
    },
    {
      icon: FiCheckCircle,
      color: 'text-success',
      title: 'Zero-Bot Fraud Prevention',
      desc: 'Multi-layered sybil defense and account verification ensure only authentic community members participate.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="template-fairness-container mb-5 text-white"
    >
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '36px', height: '36px', background: 'rgba(124, 58, 237, 0.25)', border: '1px solid rgba(168, 85, 247, 0.4)' }}
            >
              <FiShield className="text-warning" size={18} />
            </div>
            <h4 className="fw-bold mb-0 text-white" style={{ fontSize: '1.25rem' }}>
              Provably Fair & Cryptographic Verification
            </h4>
          </div>
          <p className="text-muted small mb-0">
            Every draw winner is cryptographically generated with publicly verifiable mathematical entropy.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span
            className="badge rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1"
            style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)', fontSize: '0.74rem' }}
          >
            <FiCheckCircle size={12} />
            <span>Audit Passed: 100% Fair</span>
          </span>
        </div>
      </div>

      {/* SHA-256 Entropy Seed Preview Box */}
      <div
        className="p-3 rounded-3 mb-4 d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2"
        style={{ background: 'rgba(10, 14, 28, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
      >
        <div className="d-flex align-items-center gap-2 overflow-hidden">
          <FiHash className="text-info flex-shrink-0" size={16} />
          <span className="text-muted small flex-shrink-0">Genesis Seed Hash:</span>
          <span className="font-monospace small text-truncate" style={{ color: '#c084fc' }}>
            0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
          </span>
        </div>
        <span
          className="badge rounded-pill px-3 py-1.5 flex-shrink-0"
          style={{
            background: 'rgba(124, 58, 237, 0.22)',
            border: '1px solid rgba(168, 85, 247, 0.5)',
            color: '#e9d5ff',
            fontSize: '0.74rem',
            fontWeight: '700',
            letterSpacing: '0.6px',
            boxShadow: '0 0 12px rgba(168, 85, 247, 0.25)',
          }}
        >
          NIST SP 800-90A
        </span>
      </div>

      {/* 3 Pillars Row */}
      <div className="row g-3">
        {auditPoints.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="col-12 col-md-4">
              <div className="template-fairness-pill-item h-100">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Icon className={item.color} size={18} />
                  <strong className="text-white" style={{ fontSize: '0.9rem' }}>{item.title}</strong>
                </div>
                <p className="small mb-0" style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: '1.5' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FairnessAuditCard;
