import React from 'react';
import { FiRepeat, FiLock, FiShield, FiHeadphones } from 'react-icons/fi';

const TrustSection = () => {
  return (
    <section className="trust-features-bar">
      <div className="row g-4">
        {/* Feature 1 */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="trust-feature-item">
            <div className="trust-feature-icon-wrap">
              <FiRepeat />
            </div>
            <div>
              <div className="trust-feature-title">100% Fair & Transparent</div>
              <p className="trust-feature-desc">All giveaways are conducted fairly.</p>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="trust-feature-item">
            <div className="trust-feature-icon-wrap">
              <FiLock />
            </div>
            <div>
              <div className="trust-feature-title">Secure & Safe</div>
              <p className="trust-feature-desc">Your data and privacy are our top priority.</p>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="trust-feature-item">
            <div className="trust-feature-icon-wrap">
              <FiShield />
            </div>
            <div>
              <div className="trust-feature-title">Trusted by 10K+ Users</div>
              <p className="trust-feature-desc">Join thousands of happy users.</p>
            </div>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="trust-feature-item">
            <div className="trust-feature-icon-wrap">
              <FiHeadphones />
            </div>
            <div>
              <div className="trust-feature-title">24/7 Customer Support</div>
              <p className="trust-feature-desc">We're here to help you anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
