import React from 'react';
import { FiUser, FiCheckSquare, FiAward, FiGift } from 'react-icons/fi';
import { BsTicketPerforated } from 'react-icons/bs';
import { motion } from 'framer-motion';

const HowToParticipate = () => {
  const steps = [
    {
      num: '01',
      title: 'Sign Up / Login',
      desc: 'Create your account or login to continue.',
      icon: FiUser,
      type: 'purple',
    },
    {
      num: '02',
      title: 'Complete Tasks',
      desc: 'Complete eligible activities and tasks.',
      icon: FiCheckSquare,
      type: 'purple',
    },
    {
      num: '03',
      title: 'Earn Entries',
      desc: 'Earn more entries for more chances.',
      icon: BsTicketPerforated,
      type: 'purple',
    },
    {
      num: '04',
      title: 'Join Giveaway',
      desc: 'Use your entries to participate.',
      icon: FiGift,
      type: 'purple',
    },
    {
      num: '05',
      title: 'Winner Selected',
      desc: 'Winners are selected fairly after it ends.',
      icon: FiAward,
      type: 'gold',
    },
  ];

  return (
    <section className="template-how-to-section mb-5 py-3">
      {/* Centered Heading with Sparkles */}
      <div className="text-center mb-5">
        <h3 className="template-how-to-heading d-inline-flex align-items-center justify-content-center gap-2">
          <span className="sparkle-accent">✨</span>
          <span>How to Participate?</span>
          <span className="sparkle-accent">✨</span>
        </h3>
      </div>

      {/* Horizontal 5-step Flow with Dashed Connector */}
      <div className="template-stepper-container position-relative">
        {/* Continuous Dashed Connector Line behind nodes */}
        <div className="template-stepper-line d-none d-lg-block" />

        <div className="row g-4 justify-content-between position-relative" style={{ zIndex: 2 }}>
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isGold = step.type === 'gold';

            return (
              <div key={step.num} className="col-12 col-sm-6 col-lg template-step-col text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="d-flex flex-column align-items-center"
                >
                  {/* Step Number Bubble (01, 02, etc.) */}
                  <div className="template-step-num-bubble mb-2">
                    {step.num}
                  </div>

                  {/* Icon Circle */}
                  <div className={`template-step-icon-circle mb-3 ${isGold ? 'icon-circle-gold' : 'icon-circle-purple'}`}>
                    <Icon size={22} />
                  </div>

                  {/* Step Title */}
                  <h5 className="template-step-title mb-1.5">
                    {step.title}
                  </h5>

                  {/* Step Description */}
                  <p className="template-step-desc mb-0">
                    {step.desc}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowToParticipate;
