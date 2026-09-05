import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiGift, FiAlertCircle, FiCheck,
  FiClock, FiCheckCircle, FiPackage, FiPhone, FiMapPin, FiTruck, FiMail, FiX, FiUser
} from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import { motion } from 'framer-motion';
import useGiveaway from '../hooks/useGiveaway.js';
import useAuth from '../../auth/hooks/useAuth.js';
import useWinner from '../../winner/hooks/useWinner.js';
import useClaim from '../../claim/hooks/useClaim.js';
import Navbar from '../../../components/Navbar.jsx';
import {
  GiveawayHero,
  GiveawayStats,
  FeaturedGiveaways,
  HowToParticipate,
  WinnerAnnouncementBanner,
  PreviousWinnersSection,
  PrizeClaimModal,
  GiveawayRules,
} from '../components/index.js';

// ─────────────────────────────────────────────────────────────────────────────
// ClaimForm — inline component for Physical + Gift Card prize claim
// ─────────────────────────────────────────────────────────────────────────────
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;
const PIN_CODE_REGEX = /^\d{6}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ClaimForm = ({ prizeType, initialData = {}, onSubmit, isLoading, apiError }) => {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || initialData.name || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    email: initialData.email || '',
  });
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    const val = (value || '').trim();
    if (prizeType === 'PHYSICAL') {
      if (name === 'fullName' && !val) return 'Full name is required';
      if (name === 'phone') {
        if (!val) return 'Phone number is required';
        if (!INDIAN_PHONE_REGEX.test(val)) return 'Enter valid 10-digit mobile (starts with 6-9)';
      }
      if (name === 'address' && !val) return 'Address is required';
      if (name === 'city' && !val) return 'City is required';
      if (name === 'state' && !val) return 'State is required';
      if (name === 'pinCode') {
        if (!val) return 'PIN code is required';
        if (!PIN_CODE_REGEX.test(val)) return 'PIN code must be exactly 6 digits';
      }
    }
    if (prizeType === 'GIFT_CARD') {
      if (name === 'email') {
        if (!val) return 'Email is required';
        if (!EMAIL_REGEX.test(val)) return 'Enter a valid email address';
      }
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'phone' || name === 'pinCode') && value && !/^\d*$/.test(value)) return;
    if (name === 'phone' && value.length > 10) return;
    if (name === 'pinCode' && value.length > 6) return;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = prizeType === 'PHYSICAL'
      ? ['fullName', 'phone', 'address', 'city', 'state', 'pinCode']
      : ['email'];
    const newErrors = {};
    fields.forEach(k => {
      const err = validate(k, formData[k]);
      if (err) newErrors[k] = err;
    });
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    const payload = prizeType === 'PHYSICAL'
      ? { fullName: formData.fullName.trim(), phone: formData.phone.trim(), address: formData.address.trim(), city: formData.city.trim(), state: formData.state.trim(), pinCode: formData.pinCode.trim() }
      : { email: formData.email.trim() };
    if (onSubmit) onSubmit(payload);
  };

  const inputStyle = (field) => ({
    background: 'rgba(13, 17, 33, 0.85)',
    borderColor: errors[field] ? '#ef4444' : 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    height: '44px',
    fontSize: '0.88rem',
    color: '#fff',
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      {apiError && (
        <div className="p-2 mb-3 rounded-3 d-flex align-items-center gap-2 text-danger"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', fontSize: '0.82rem' }}>
          <FiAlertCircle size={16} className="flex-shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      {prizeType === 'PHYSICAL' && (
        <div className="row g-2">
          {/* Full Name */}
          <div className="col-12 col-sm-6">
            <label className="form-label small text-muted mb-1">Full Name <span className="text-danger">*</span></label>
            <div className="position-relative">
              <span className="position-absolute top-50 translate-middle-y ps-2 text-muted" style={{ pointerEvents: 'none' }}><FiUser size={14} /></span>
              <input type="text" name="fullName" className="form-control ps-4 text-white" style={inputStyle('fullName')}
                placeholder="Rahul Sharma" value={formData.fullName} onChange={handleChange} onBlur={handleBlur} disabled={isLoading} />
            </div>
            {errors.fullName && <div className="text-danger mt-1" style={{ fontSize: '0.74rem' }}>{errors.fullName}</div>}
          </div>
          {/* Phone */}
          <div className="col-12 col-sm-6">
            <label className="form-label small text-muted mb-1">Mobile (10 digits) <span className="text-danger">*</span></label>
            <div className="position-relative">
              <span className="position-absolute top-50 translate-middle-y ps-2 text-muted" style={{ pointerEvents: 'none' }}><FiPhone size={14} /></span>
              <input type="tel" name="phone" className="form-control ps-4 text-white" style={inputStyle('phone')}
                placeholder="9876543210" value={formData.phone} onChange={handleChange} onBlur={handleBlur} maxLength={10} disabled={isLoading} />
            </div>
            {errors.phone && <div className="text-danger mt-1" style={{ fontSize: '0.74rem' }}>{errors.phone}</div>}
          </div>
          {/* Address */}
          <div className="col-12">
            <label className="form-label small text-muted mb-1">Street Address <span className="text-danger">*</span></label>
            <div className="position-relative">
              <span className="position-absolute top-50 translate-middle-y ps-2 text-muted" style={{ pointerEvents: 'none' }}><FiTruck size={14} /></span>
              <input type="text" name="address" className="form-control ps-4 text-white" style={inputStyle('address')}
                placeholder="Flat No, Street, Landmark" value={formData.address} onChange={handleChange} onBlur={handleBlur} disabled={isLoading} />
            </div>
            {errors.address && <div className="text-danger mt-1" style={{ fontSize: '0.74rem' }}>{errors.address}</div>}
          </div>
          {/* City */}
          <div className="col-12 col-sm-4">
            <label className="form-label small text-muted mb-1">City <span className="text-danger">*</span></label>
            <input type="text" name="city" className="form-control text-white" style={inputStyle('city')}
              placeholder="Mumbai" value={formData.city} onChange={handleChange} onBlur={handleBlur} disabled={isLoading} />
            {errors.city && <div className="text-danger mt-1" style={{ fontSize: '0.74rem' }}>{errors.city}</div>}
          </div>
          {/* State */}
          <div className="col-12 col-sm-4">
            <label className="form-label small text-muted mb-1">State <span className="text-danger">*</span></label>
            <input type="text" name="state" className="form-control text-white" style={inputStyle('state')}
              placeholder="Maharashtra" value={formData.state} onChange={handleChange} onBlur={handleBlur} disabled={isLoading} />
            {errors.state && <div className="text-danger mt-1" style={{ fontSize: '0.74rem' }}>{errors.state}</div>}
          </div>
          {/* PIN */}
          <div className="col-12 col-sm-4">
            <label className="form-label small text-muted mb-1">PIN Code <span className="text-danger">*</span></label>
            <div className="position-relative">
              <span className="position-absolute top-50 translate-middle-y ps-2 text-muted" style={{ pointerEvents: 'none' }}><FiMapPin size={14} /></span>
              <input type="text" name="pinCode" className="form-control ps-4 text-white" style={inputStyle('pinCode')}
                placeholder="400001" value={formData.pinCode} onChange={handleChange} onBlur={handleBlur} maxLength={6} disabled={isLoading} />
            </div>
            {errors.pinCode && <div className="text-danger mt-1" style={{ fontSize: '0.74rem' }}>{errors.pinCode}</div>}
          </div>
        </div>
      )}

      {prizeType === 'GIFT_CARD' && (
        <div>
          <label className="form-label small text-muted mb-1">Delivery Email <span className="text-danger">*</span></label>
          <div className="position-relative">
            <span className="position-absolute top-50 translate-middle-y ps-2 text-muted" style={{ pointerEvents: 'none' }}><FiMail size={14} /></span>
            <input type="email" name="email" className="form-control ps-4 text-white" style={inputStyle('email')}
              placeholder="yourname@gmail.com" value={formData.email} onChange={handleChange} onBlur={handleBlur} disabled={isLoading} />
          </div>
          {errors.email && <div className="text-danger mt-1" style={{ fontSize: '0.74rem' }}>{errors.email}</div>}
          <p className="text-muted mt-2 mb-0" style={{ fontSize: '0.76rem' }}>
            Your gift card voucher code will be sent to this email within 24–48 hours.
          </p>
        </div>
      )}

      <div className="mt-3">
        <button type="submit" disabled={isLoading}
          className="btn w-100 fw-bold text-white d-flex align-items-center justify-content-center gap-2 rounded-pill"
          style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', border: 'none', height: '46px', boxShadow: '0 4px 16px rgba(124,58,237,0.35)' }}>
          {isLoading
            ? <><span className="spinner-border spinner-border-sm" role="status"></span><span>Submitting...</span></>
            : <><FiCheck size={17} /><span>Submit Claim</span></>
          }
        </button>
      </div>
    </form>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Giveaway Page
// ─────────────────────────────────────────────────────────────────────────────
const Giveaway = () => {
  const navigate = useNavigate();

  // ── Giveaway data ──────────────────────────────────────────────────────────
  const {
    current,
    previous,
    isLoading,
    isJoining,
    joinSuccess,
    joinError,
    error,
    getCurrentGiveaway,
    getPreviousGiveaways,
    getMyParticipation,
    enterGiveaway,
    resetJoin,
  } = useGiveaway();

  // ── Auth ───────────────────────────────────────────────────────────────────
  const { user, isAuthenticated } = useAuth();

  // ── Winner status ──────────────────────────────────────────────────────────
  const {
    winners,
    previousWinners,
    isWinner,
    winnerData,
    getWinners,
    getPreviousWinners,
    checkIfWinner,
  } = useWinner();

  // ── Claim state ────────────────────────────────────────────────────────────
  const {
    claim,
    isLoading: isClaimLoading,
    error: claimError,
    success: claimSuccess,
    submitMyClaimAsync,
    getMyClaim,
    clearState: clearClaimState,
    resetAllClaimState,
  } = useClaim();

  // ── Local UI state ─────────────────────────────────────────────────────────
  const [selectedGiveaway, setSelectedGiveaway] = useState(null);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);

  // ── Derive canonical giveaway ID ──────────────────────────────────────────
  const isValidMongoId = (id) => typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);
  const currentId =
    (current?._id && isValidMongoId(current._id) ? current._id : null) ||
    (current?.id && isValidMongoId(current.id) ? current.id : null) ||
    (Array.isArray(current) && current.length > 0 && isValidMongoId(current[0]?._id) ? current[0]._id : null);

  // ── Initial data fetch ─────────────────────────────────────────────────────
  useEffect(() => {
    getCurrentGiveaway();
    getPreviousGiveaways();
    getPreviousWinners();
  }, []);

  // ── Fetch winner + claim status when giveaway/auth changes ─────────────────
  useEffect(() => {
    if (currentId && isValidMongoId(currentId)) {
      getWinners(currentId);
      if (isAuthenticated) {
        checkIfWinner(currentId);
        getMyClaim(currentId);
      }
    }
  }, [currentId, isAuthenticated]);

  // ── Format active giveaways for cards ─────────────────────────────────────
  let activeGiveaways = [];
  if (Array.isArray(current)) {
    activeGiveaways = current.flatMap((g) =>
      Array.isArray(g.prizes) && g.prizes.length > 0
        ? g.prizes.map((p, idx) => ({
          ...g,
          giveawayId: g._id || g.id,
          prizeId: p.id || p._id,
          totalParticipants:
            typeof g.totalParticipants === 'number' ? g.totalParticipants
              : typeof g.participantsCount === 'number' ? g.participantsCount
                : Array.isArray(g.participants) ? g.participants.length
                  : (g.participants || 0),
          title: p.name || p.title || g.title,
          subtitle: p.description || g.description,
          badge: p.position ? `${p.position}st Prize` : p.prizeTier || p.tier || (idx === 0 ? '1st Prize' : idx === 1 ? '2nd Prize' : idx === 2 ? '3rd Prize' : 'Lucky Draw'),
          imgSrc: p.image || p.imageUrl || null,
          prizeData: p,
          prizes: g.prizes,
        }))
        : [g]
    );
  } else if (current && typeof current === 'object' && (current._id || current.id || current.title)) {
    const parentParticipants =
      typeof current.totalParticipants === 'number' ? current.totalParticipants
        : typeof current.participantsCount === 'number' ? current.participantsCount
          : Array.isArray(current.participants) ? current.participants.length
            : (current.participants || 0);

    if (Array.isArray(current.prizes) && current.prizes.length > 0) {
      activeGiveaways = current.prizes.map((p, idx) => ({
        ...current,
        giveawayId: current._id || current.id,
        prizeId: p.id || p._id,
        totalParticipants: parentParticipants,
        title: p.name || p.title || current.title,
        subtitle: p.description || current.description,
        badge: p.position ? `${p.position}st Prize` : p.prizeTier || p.tier || (idx === 0 ? '1st Prize' : idx === 1 ? '2nd Prize' : idx === 2 ? '3rd Prize' : 'Lucky Draw'),
        imgSrc: p.image || p.imageUrl || null,
        prizeData: p,
        prizes: current.prizes,
      }));
    } else {
      activeGiveaways = [{ ...current, totalParticipants: parentParticipants }];
    }
  }

  // ── Metrics calculation ───────────────────────────────────────────────────
  const totalActiveCount = Array.isArray(current)
    ? current.length
    : current && typeof current === 'object' && (current._id || current.id) ? 1
      : 24;

  const totalParticipantsCount = Array.isArray(current)
    ? current.reduce((total, g) =>
      total + (typeof g.totalParticipants === 'number' ? g.totalParticipants
        : typeof g.participantsCount === 'number' ? g.participantsCount
          : Array.isArray(g.participants) ? g.participants.length
            : (g.participants || 0)), 0)
    : current && typeof current.totalParticipants === 'number'
      ? current.totalParticipants
      : 8500;

  const prizesWonCount = Array.isArray(previous) && previous.length > 0 ? previous.length : 1200;

  const targetDate = activeGiveaways.length > 0
    ? (activeGiveaways[0].endAt || activeGiveaways[0].endDate || activeGiveaways[0].endsAt)
    : null;

  // ── Recent winners ─────────────────────────────────────────────────────────
  const recentWinners = winners.length > 0 ? winners : previousWinners.slice(0, 8);

  // ── Claim deadline ─────────────────────────────────────────────────────────
  const claimDeadline = claim?.claimDeadline
    ? new Date(claim.claimDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : (() => { const d = new Date(); d.setDate(d.getDate() + 7); return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); })();

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleJoinClick = (giveaway) => {
    if (!isAuthenticated) { navigate('/login'); return; }
    resetJoin();
    setSelectedGiveaway(giveaway || (activeGiveaways.length > 0 ? activeGiveaways[0] : { title: 'iPhone 15 Pro' }));
  };

  const handleHeroJoinClick = () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    resetJoin();
    setSelectedGiveaway(activeGiveaways.length > 0 ? activeGiveaways[0] : { title: 'iPhone 15 Pro', badge: '1st Prize' });
  };

  const handleConfirmJoin = async (giveaway, entryOptions = {}) => {
    const giveawayId = giveaway.giveawayId || giveaway._id || giveaway.id || giveaway.slug;
    const prizeId =
      entryOptions.prizeId ||
      giveaway.prizeId ||
      (giveaway.prizes?.[0]?.id || giveaway.prizes?.[0]?._id) ||
      giveawayId;
    if (giveawayId) {
      const result = await enterGiveaway(giveawayId, { prizeId, ...entryOptions });
      if (result?.type?.endsWith('fulfilled')) {
        getCurrentGiveaway();
        getMyParticipation(giveawayId);
      }
    }
  };

  const handleClosePrizeModal = () => {
    setSelectedGiveaway(null);
    resetJoin();
  };

  const handleOpenClaimModal = () => {
    clearClaimState();
    setShowClaimModal(true);
  };

  const handleCloseClaimModal = () => {
    setShowClaimModal(false);
    resetAllClaimState();
    if (currentId && isAuthenticated) getMyClaim(currentId);
  };

  const handleClaimSubmit = async (formData) => {
    if (!currentId) return;
    try {
      await submitMyClaimAsync(currentId, formData);
    } catch {
      // Handled in Redux
    }
  };

  const hasClaimed = !!claim && claim.status !== 'NOT_SUBMITTED';
  const prizeType = winnerData?.prizeType || 'PHYSICAL';
  const prizeName = winnerData?.prizeName || 'Exclusive Prize';

  return (
    <div className="template-page-wrapper">
      {/* ── Top Navigation Bar ── */}
      <Navbar />

      {/* ── Main Page Content ── */}
      <div className="container py-3 py-lg-4">
        {/* Backend Error Banner if any */}
        {error && (
          <div className="veloop-alert mb-4">
            <div className="d-flex align-items-center gap-2">
              <FiAlertCircle /><span>{error}</span>
            </div>
          </div>
        )}

        {/* ── 1. Hero Section (Left copy, Right 3D Visual) ── */}
        <GiveawayHero onJoinClick={handleHeroJoinClick} />

        {/* ── Winner Notification Banner (Only for authenticated winners) ── */}
        {isAuthenticated && isWinner && winnerData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="p-3 p-md-4 rounded-4 mb-4 text-white position-relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(99, 102, 241, 0.2) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.45)',
              boxShadow: '0 0 36px rgba(124, 58, 237, 0.25)',
            }}
          >
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', color: '#fff', fontSize: '22px' }}>
                  <BsStars />
                </div>
                <div>
                  <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                    <span className="badge bg-warning text-dark fw-bold text-uppercase" style={{ fontSize: '0.7rem' }}>🎉 You Won!</span>
                    <span className="small text-info fw-semibold">Winner Confirmed</span>
                  </div>
                  <h5 className="fw-bold mb-0 text-white" style={{ fontSize: '1.1rem' }}>
                    {prizeName}
                  </h5>
                  <div className="d-flex align-items-center gap-3 mt-1 flex-wrap">
                    <span className="d-flex align-items-center gap-1 text-muted small">
                      <FiClock size={12} className="text-warning" />
                      Claim by: <strong className="text-light ms-1">{claimDeadline}</strong>
                    </span>
                    {hasClaimed && (
                      <span className="badge d-flex align-items-center gap-1 px-2 py-1 rounded-pill" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', fontSize: '0.72rem' }}>
                        <FiCheckCircle size={11} /> Claim {claim?.status || 'Submitted'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                {hasClaimed ? (
                  <span className="badge px-3 py-2 rounded-3 d-inline-flex align-items-center gap-2"
                    style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', fontSize: '0.8rem' }}>
                    <FiCheckCircle size={15} />
                    <span>Claim Submitted</span>
                  </span>
                ) : (
                  <button
                    onClick={handleOpenClaimModal}
                    className="btn px-4 py-2 fw-bold text-white rounded-pill d-flex align-items-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', border: 'none', boxShadow: '0 4px 18px rgba(124,58,237,0.4)' }}>
                    <FiGift size={16} />
                    <span>Claim Your Prize</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── 2. Horizontal Stats Bar (24 Active, 8.5K+ Users, 1.2K+ Rewards, Countdown) ── */}
        <GiveawayStats
          totalGiveaways={totalActiveCount}
          totalParticipants={totalParticipantsCount}
          prizesWon={prizesWonCount}
          targetDate={targetDate}
        />

        {/* ── 3. Active Giveaways (4 Cards: iPhone 15 Pro, Watch 9, AirPods Pro, Amazon Card) ── */}
        <FeaturedGiveaways
          giveaways={activeGiveaways}
          isLoading={isLoading}
          onJoinClick={handleJoinClick}
        />

        {/* ── 4. How to Participate? (5 Horizontal Steps) ── */}
        <HowToParticipate />

        {/* ── 5. Winner Announcement Banner (Avatar Carousel with Rahul, Sneha, Amit, Pooja, Vikram) ── */}
        <WinnerAnnouncementBanner winners={recentWinners} />

        {/* ── 6. Previous Winners (5 Cards: iPhone 14 Pro, Watch 8, AirPods, Amazon, iPhone 13) ── */}
        <PreviousWinnersSection pastWinners={previousWinners} />

        {/* ── Footer ── */}
        <footer className="template-footer mt-5 pt-4 pb-4 border-top border-secondary-subtle">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
            <div>
              <div className="fw-bold text-white mb-1" style={{ letterSpacing: '1px' }}>VELOOP REWARDS</div>
              <div className="text-muted small">© 2024 VELOOP Rewards. Provably Fair & Secured with SSL Encryption.</div>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <a href="#terms" className="template-footer-link">Terms</a>
              <a href="#privacy" className="template-footer-link">Privacy</a>
              <a href="#fairness" className="template-footer-link">Provably Fair</a>
              <a href="#support" className="template-footer-link">Support</a>
            </div>
          </div>
        </footer>
      </div>

      {/* ── Join / Entry Modal ── */}
      <PrizeClaimModal
        giveaway={selectedGiveaway}
        isOpen={!!selectedGiveaway}
        onClose={handleClosePrizeModal}
        onConfirm={handleConfirmJoin}
        isJoining={isJoining}
        joinSuccess={joinSuccess}
        joinError={joinError}
      />

      {/* ── Giveaway Rules Modal ── */}
      <GiveawayRules
        isOpen={showRulesModal}
        onClose={() => setShowRulesModal(false)}
        rules={current?.rules}
        eligibility={current?.eligibility}
      />

      {/* ── Winner Prize Claim Modal ── */}
      {showClaimModal && isWinner && winnerData && (
        <div
          id="winner-claim-modal-backdrop"
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1060, background: 'rgba(5,8,20,0.9)', backdropFilter: 'blur(10px)', padding: '16px' }}
          onClick={(e) => { if (e.target === e.currentTarget) handleCloseClaimModal(); }}
        >
          <div
            id="winner-claim-modal-box"
            className="position-relative text-white w-100"
            style={{
              maxWidth: '580px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'rgba(12, 16, 35, 0.98)',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: '20px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              padding: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '36px', height: '36px', background: 'rgba(124, 58, 237, 0.25)', border: '1px solid rgba(139, 92, 246, 0.4)' }}>
                  <FiGift size={17} style={{ color: '#c084fc' }} />
                </div>
                <div>
                  <h5 className="fw-bold mb-0 text-white" style={{ fontSize: '1rem' }}>
                    <BsStars className="me-1 text-warning" />
                    Claim Your Prize
                  </h5>
                  <div className="text-muted" style={{ fontSize: '0.76rem' }}>
                    {prizeName} &mdash; {prizeType === 'PHYSICAL' ? '📦 Physical Delivery' : '🎁 Gift Card Voucher'}
                  </div>
                </div>
              </div>
              <button type="button" onClick={handleCloseClaimModal}
                className="btn p-1 border-0 rounded-circle text-muted d-flex align-items-center justify-content-center"
                style={{ background: 'rgba(255,255,255,0.07)', width: '30px', height: '30px' }}>
                <FiX size={16} />
              </button>
            </div>

            <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '0 0 18px' }} />

            {claimSuccess ? (
              <div className="text-center py-4">
                <FiCheckCircle size={52} className="text-success mb-3" />
                <h4 className="fw-bold text-white mb-2">Claim Submitted!</h4>
                <p className="text-muted small mb-3">
                  Your details were successfully recorded. Check your registered email for delivery updates.
                </p>
                <button type="button" onClick={handleCloseClaimModal}
                  className="btn px-5 py-2 rounded-pill fw-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', border: 'none' }}>
                  Done
                </button>
              </div>
            ) : (
              <ClaimForm
                prizeType={prizeType}
                initialData={{ fullName: user?.fullName || user?.name || '', email: user?.email || '' }}
                onSubmit={handleClaimSubmit}
                isLoading={isClaimLoading}
                apiError={claimError}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Giveaway;
