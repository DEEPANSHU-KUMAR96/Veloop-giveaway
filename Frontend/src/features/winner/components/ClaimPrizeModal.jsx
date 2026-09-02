import React, { useState } from 'react';
import { FiGift, FiCheck, FiX, FiAlertCircle, FiTruck, FiMail, FiPhone, FiMapPin, FiUser } from 'react-icons/fi';
import { BsCheckCircleFill } from 'react-icons/bs';

const ClaimPrizeModal = ({
  isOpen,
  onClose,
  onSubmitClaim,
  winnerData,
  isClaiming = false,
  claimSuccess = false,
  claimError = null,
  user = null,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    fullName: user?.fullName || user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
  });

  const [localError, setLocalError] = useState('');

  const prizeName = winnerData?.prizeName || 'Exclusive Giveaway Prize';

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (localError) setLocalError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setLocalError('Please enter your full name.');
      return;
    }

    if (!formData.phone.trim() || !/^[0-9]{10}$/.test(formData.phone.trim())) {
      setLocalError('Please enter a valid 10-digit phone number.');
      return;
    }

    if (!formData.address.trim()) {
      setLocalError('Please enter your delivery street address.');
      return;
    }

    if (!formData.city.trim()) {
      setLocalError('Please enter your city.');
      return;
    }

    if (!formData.state.trim()) {
      setLocalError('Please enter your state.');
      return;
    }

    if (!formData.pinCode.trim() || !/^[0-9]{6}$/.test(formData.pinCode.trim())) {
      setLocalError('Please enter a valid 6-digit pin code.');
      return;
    }

    if (onSubmitClaim) {
      onSubmitClaim(formData);
    }
  };

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
              <FiGift className="text-primary" />
              <span>Claim Your Prize: {prizeName}</span>
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={isClaiming}
            ></button>
          </div>

          <div className="modal-body py-4">
            {claimSuccess ? (
              <div className="text-center py-4">
                <BsCheckCircleFill size={54} className="text-success mb-3" />
                <h4 className="fw-bold text-white">Claim Submitted Successfully!</h4>
                <p className="text-muted small mb-4" style={{ color: '#cbd5e1 !important' }}>
                  Our dispatch team has received your details. Your prize will be processed and shipped with tracked courier.
                </p>
                <button
                  type="button"
                  className="btn btn-primary px-4 rounded-pill fw-bold"
                  onClick={onClose}
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <p className="text-muted small mb-4" style={{ color: '#94a3b8' }}>
                  Fill in your official shipping and contact details. Our team will verify and dispatch your reward.
                </p>

                {(localError || claimError) && (
                  <div className="veloop-alert mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <FiAlertCircle className="flex-shrink-0" />
                      <span>{localError || claimError}</span>
                    </div>
                  </div>
                )}

                <div className="row g-3">
                  {/* Full Name */}
                  <div className="col-md-6">
                    <label className="form-label small text-muted mb-1">Full Name</label>
                    <div className="veloop-input-box">
                      <span className="veloop-input-icon-left"><FiUser /></span>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="veloop-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label small text-muted mb-1">Email Address</label>
                    <div className="veloop-input-box">
                      <span className="veloop-input-icon-left"><FiMail /></span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="veloop-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <label className="form-label small text-muted mb-1">Phone Number (10 Digits)</label>
                    <div className="veloop-input-box">
                      <span className="veloop-input-icon-left"><FiPhone /></span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className="veloop-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Pin Code */}
                  <div className="col-md-6">
                    <label className="form-label small text-muted mb-1">PIN / Postal Code (6 Digits)</label>
                    <div className="veloop-input-box">
                      <span className="veloop-input-icon-left"><FiMapPin /></span>
                      <input
                        type="text"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleChange}
                        placeholder="110001"
                        className="veloop-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Street Address */}
                  <div className="col-12">
                    <label className="form-label small text-muted mb-1">Street Address</label>
                    <div className="veloop-input-box">
                      <span className="veloop-input-icon-left"><FiTruck /></span>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="House No, Street, Landmark"
                        className="veloop-input"
                        required
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div className="col-md-6">
                    <label className="form-label small text-muted mb-1">City</label>
                    <div className="veloop-input-box">
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="New Delhi"
                        className="veloop-input"
                        required
                      />
                    </div>
                  </div>

                  {/* State */}
                  <div className="col-md-6">
                    <label className="form-label small text-muted mb-1">State</label>
                    <div className="veloop-input-box">
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Delhi"
                        className="veloop-input"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2">
                  <button
                    type="submit"
                    disabled={isClaiming}
                    className="veloop-btn veloop-btn-register w-100"
                  >
                    {isClaiming ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status"></span>
                        <span>Submitting Claim...</span>
                      </>
                    ) : (
                      <>
                        <FiCheck size={18} />
                        <span>Confirm & Submit Delivery Claim</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimPrizeModal;
