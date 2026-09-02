import React, { useState } from 'react';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How are winners selected fairly?',
      a: 'All draws are conducted using cryptographically certified Random Number Generation (RNG) with public seeds to ensure 100% transparency and fair odds.',
    },
    {
      q: 'Is entering VELoop giveaways completely free?',
      a: 'Yes, entering VELoop giveaways is 100% free. You can earn entries simply by verifying your account and completing daily engagement tasks.',
    },
    {
      q: 'How do I claim my prize if I win?',
      a: 'Winners receive an email notification and an alert on their dashboard. Physical prizes are dispatched with tracked express courier, while digital codes are sent to your verified email.',
    },
    {
      q: 'Can I enter multiple giveaways simultaneously?',
      a: 'Absolutely! You can participate in all active giveaways concurrently to maximize your winning rewards.',
    },
  ];

  return (
    <div className="section-header-box flex-column align-items-stretch mt-4 p-4 rounded-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <FiHelpCircle className="text-info" size={20} />
        <h4 className="text-white fw-bold mb-0" style={{ fontSize: '1.05rem' }}>
          Frequently Asked Questions
        </h4>
      </div>

      <div className="d-flex flex-column gap-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="p-3 rounded-3"
              style={{
                background: isOpen ? 'rgba(30, 41, 77, 0.5)' : 'rgba(10, 14, 28, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-white fw-semibold small">{faq.q}</span>
                <FiChevronDown
                  className="text-muted transition"
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </div>
              {isOpen && (
                <p className="text-muted small mt-2 mb-0" style={{ lineHeight: 1.5 }}>
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
