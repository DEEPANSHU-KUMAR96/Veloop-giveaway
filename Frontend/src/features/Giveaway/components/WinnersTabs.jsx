import React from 'react';
import { FiGift, FiAward, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';

const WinnersTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'featured', label: 'Active Giveaways', icon: FiGift },
    { id: 'recent-winners', label: 'Recent Winners', icon: FiAward },
    { id: 'past-giveaways', label: 'Past Giveaways', icon: FiUsers },
  ];

  return (
    <div className="d-flex align-items-center justify-content-center gap-2 mb-4 flex-wrap px-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`btn d-flex align-items-center gap-1 gap-sm-2 px-3 py-2 rounded-pill fw-bold transition ${
              isActive
                ? 'btn-primary text-white shadow-sm'
                : 'btn-outline-secondary text-secondary border-secondary-subtle'
            }`}
            style={{
              background: isActive
                ? 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)'
                : 'rgba(15, 20, 39, 0.6)',
              border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: 'clamp(0.75rem, 2vw, 0.82rem)',
              minHeight: '38px',
            }}
          >
            <Icon size={14} />
            <span>{tab.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default WinnersTabs;
