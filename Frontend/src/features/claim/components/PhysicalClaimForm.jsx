import React, { useState } from 'react';
import { FiUser, FiPhone, FiMapPin, FiTruck, FiAlertCircle, FiCheck, FiShield } from 'react-icons/fi';

const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;
const PIN_CODE_REGEX = /^\d{6}$/;

const PhysicalClaimForm = ({
  initialData = {},
  onSubmit,
  isLoading = false,
  apiError = null,
}) => {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || initialData.name || '',
    phone: initialData.phone || '',
    address: initialData.address || '',
    city: initialData.city || '',
    state: initialData.state || '',
    pinCode: initialData.pinCode || '',
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const val = (value || '').trim();
    switch (name) {
      case 'fullName':
        if (!val) return 'Full name is required';
        if (val.length < 2) return 'Full name must be at least 2 characters';
        return '';
      case 'phone':
        if (!val) return 'Phone number is required';
        if (!INDIAN_PHONE_REGEX.test(val)) {
          return 'Must be a valid 10-digit mobile number starting with 6, 7, 8, or 9';
        }
        return '';
      case 'address':
        if (!val) return 'Street address is required';
        if (val.length < 5) return 'Please provide a more detailed address for delivery';
        return '';
      case 'city':
        if (!val) return 'City is required';
        return '';
      case 'state':
        if (!val) return 'State is required';
        return '';
      case 'pinCode':
        if (!val) return '6-digit PIN code is required';
        if (!PIN_CODE_REGEX.test(val)) {
          return 'PIN code must be exactly 6 numeric digits';
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For phone and pinCode, restrict non-digits
    if ((name === 'phone' || name === 'pinCode') && value && !/^\d*$/.test(value)) {
      return;
    }
    // Limit phone to 10 and pinCode to 6
    if (name === 'phone' && value.length > 10) return;
    if (name === 'pinCode' && value.length > 6) return;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (onSubmit) {
      onSubmit({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pinCode: formData.pinCode.trim(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="needs-validation">
      {apiError && (
        <div
          className="p-3 mb-3 rounded-3 d-flex align-items-center gap-2 text-danger"
          style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            fontSize: '0.85rem',
          }}
        >
          <FiAlertCircle className="flex-shrink-0" size={18} />
          <span>{apiError}</span>
        </div>
      )}

      <div className="row g-3">
        {/* Full Name */}
        <div className="col-12 col-md-6">
          <label className="form-label small fw-semibold text-muted mb-1">
            Recipient Full Name <span className="text-danger">*</span>
          </label>
          <div className="position-relative">
            <span
              className="position-absolute top-50 translate-middle-y ps-3 text-muted"
              style={{ pointerEvents: 'none' }}
            >
              <FiUser size={15} />
            </span>
            <input
              type="text"
              name="fullName"
              className={`form-control ps-5 text-white ${errors.fullName ? 'is-invalid border-danger' : ''}`}
              style={{
                background: 'rgba(13, 17, 33, 0.85)',
                borderColor: errors.fullName ? '#ef4444' : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                height: '46px',
                fontSize: '0.9rem',
              }}
              placeholder="e.g. Rahul Sharma"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
            />
          </div>
          {errors.fullName && (
            <div className="text-danger small mt-1" style={{ fontSize: '0.78rem' }}>
              {errors.fullName}
            </div>
          )}
        </div>

        {/* Contact Phone */}
        <div className="col-12 col-md-6">
          <label className="form-label small fw-semibold text-muted mb-1">
            Mobile Number (10 Digits) <span className="text-danger">*</span>
          </label>
          <div className="position-relative">
            <span
              className="position-absolute top-50 translate-middle-y ps-3 text-muted"
              style={{ pointerEvents: 'none' }}
            >
              <FiPhone size={15} />
            </span>
            <input
              type="tel"
              name="phone"
              className={`form-control ps-5 text-white ${errors.phone ? 'is-invalid border-danger' : ''}`}
              style={{
                background: 'rgba(13, 17, 33, 0.85)',
                borderColor: errors.phone ? '#ef4444' : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                height: '46px',
                fontSize: '0.9rem',
              }}
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={10}
              disabled={isLoading}
            />
          </div>
          {errors.phone && (
            <div className="text-danger small mt-1" style={{ fontSize: '0.78rem' }}>
              {errors.phone}
            </div>
          )}
        </div>

        {/* Street Address */}
        <div className="col-12">
          <label className="form-label small fw-semibold text-muted mb-1">
            Shipping Address (House/Flat No, Street, Landmark) <span className="text-danger">*</span>
          </label>
          <div className="position-relative">
            <span
              className="position-absolute top-50 translate-middle-y ps-3 text-muted"
              style={{ pointerEvents: 'none' }}
            >
              <FiTruck size={15} />
            </span>
            <input
              type="text"
              name="address"
              className={`form-control ps-5 text-white ${errors.address ? 'is-invalid border-danger' : ''}`}
              style={{
                background: 'rgba(13, 17, 33, 0.85)',
                borderColor: errors.address ? '#ef4444' : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                height: '46px',
                fontSize: '0.9rem',
              }}
              placeholder="Flat 402, Block B, Silver Crest Apts, MG Road"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
            />
          </div>
          {errors.address && (
            <div className="text-danger small mt-1" style={{ fontSize: '0.78rem' }}>
              {errors.address}
            </div>
          )}
        </div>

        {/* City */}
        <div className="col-12 col-md-4">
          <label className="form-label small fw-semibold text-muted mb-1">
            City <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="city"
            className={`form-control text-white ${errors.city ? 'is-invalid border-danger' : ''}`}
            style={{
              background: 'rgba(13, 17, 33, 0.85)',
              borderColor: errors.city ? '#ef4444' : 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              height: '46px',
              fontSize: '0.9rem',
            }}
            placeholder="e.g. Mumbai"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
          />
          {errors.city && (
            <div className="text-danger small mt-1" style={{ fontSize: '0.78rem' }}>
              {errors.city}
            </div>
          )}
        </div>

        {/* State */}
        <div className="col-12 col-md-4">
          <label className="form-label small fw-semibold text-muted mb-1">
            State <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="state"
            className={`form-control text-white ${errors.state ? 'is-invalid border-danger' : ''}`}
            style={{
              background: 'rgba(13, 17, 33, 0.85)',
              borderColor: errors.state ? '#ef4444' : 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              height: '46px',
              fontSize: '0.9rem',
            }}
            placeholder="e.g. Maharashtra"
            value={formData.state}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
          />
          {errors.state && (
            <div className="text-danger small mt-1" style={{ fontSize: '0.78rem' }}>
              {errors.state}
            </div>
          )}
        </div>

        {/* PIN Code */}
        <div className="col-12 col-md-4">
          <label className="form-label small fw-semibold text-muted mb-1">
            PIN Code (6 Digits) <span className="text-danger">*</span>
          </label>
          <div className="position-relative">
            <span
              className="position-absolute top-50 translate-middle-y ps-3 text-muted"
              style={{ pointerEvents: 'none' }}
            >
              <FiMapPin size={15} />
            </span>
            <input
              type="text"
              name="pinCode"
              className={`form-control ps-5 text-white ${errors.pinCode ? 'is-invalid border-danger' : ''}`}
              style={{
                background: 'rgba(13, 17, 33, 0.85)',
                borderColor: errors.pinCode ? '#ef4444' : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                height: '46px',
                fontSize: '0.9rem',
              }}
              placeholder="400001"
              value={formData.pinCode}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={6}
              disabled={isLoading}
            />
          </div>
          {errors.pinCode && (
            <div className="text-danger small mt-1" style={{ fontSize: '0.78rem' }}>
              {errors.pinCode}
            </div>
          )}
        </div>
      </div>

      <div className="d-flex align-items-center gap-2 mt-3 p-2 rounded-2 text-muted" style={{ fontSize: '0.75rem', background: 'rgba(255, 255, 255, 0.03)' }}>
        <FiShield className="text-success flex-shrink-0" size={14} />
        <span>Your shipping details are encrypted and securely used exclusively for dispatching this verified reward.</span>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="btn w-100 py-2.5 rounded-pill fw-bold text-white d-flex align-items-center justify-content-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #7c77ff 0%, #5e8cff 100%)',
            border: 'none',
            boxShadow: '0 4px 18px rgba(99, 102, 241, 0.35)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            height: '48px',
          }}
        >
          {isLoading ? (
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
  );
};

export default PhysicalClaimForm;
