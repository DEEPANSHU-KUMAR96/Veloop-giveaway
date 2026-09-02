import React from 'react';
import { FiGift, FiAward, FiUsers } from 'react-icons/fi';

const WinnersTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'featured', label: 'Active Giveaways', icon: FiGift },
    { id: 'recent-winners', label: 'Recent Winners', icon: FiAward },
    { id: 'past-giveaways', label: 'Past Giveaways', icon: FiUsers },
  ];

  return (
    <div className="d-flex align-items-center justify-content-center gap-2 mb-4 flex-wrap">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`btn d-flex align-items-center gap-2 px-3 py-2 rounded-pill small fw-bold transition ${
              isActive
                ? 'btn-primary text-white shadow-sm'
                : 'btn-outline-secondary text-secondary border-secondary-subtle'
            }`}
            style={{
              background: isActive
                ? 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)'
                : 'rgba(15, 20, 39, 0.6)',
              border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.82rem',
            }}
          >
            <Icon size={14} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default WinnersTabs;
