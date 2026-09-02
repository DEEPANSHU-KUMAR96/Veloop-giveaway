import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser, FiGift, FiAlertCircle } from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';
import useGiveaway from '../hooks/useGiveaway.js';
import useAuth from '../../auth/hooks/useAuth.js';
import {
  GiveawayHero,
  GiveawayStats,
  FeaturedGiveaways,
  HowToParticipate,
  WinnersSlider,
  WinnersTabs,
  PreviousWinnerCard,
  PrizeClaimModal,
  GiveawayRules,
  FAQ,
  TrustSection,
} from '../components/index.js';

const Giveaway = () => {
  const navigate = useNavigate();
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

  const { user, isAuthenticated, logoutUser } = useAuth();

  const [activeTab, setActiveTab] = useState('featured');
  const [selectedGiveaway, setSelectedGiveaway] = useState(null);
  const [showRulesModal, setShowRulesModal] = useState(false);

  // Fetch real giveaway data from backend database on mount
  useEffect(() => {
    getCurrentGiveaway();
    getPreviousGiveaways();
  }, []);

  // Format real database items: unpack prizes array into distinct prize cards
  let activeGiveaways = [];
  if (Array.isArray(current)) {
    activeGiveaways = current.flatMap((g) =>
      Array.isArray(g.prizes) && g.prizes.length > 0
        ? g.prizes.map((p, idx) => ({
            ...g,
            giveawayId: g._id || g.id,
            prizeId: p.id || p._id,
            totalParticipants:
              typeof g.totalParticipants === 'number'
                ? g.totalParticipants
                : typeof g.participantsCount === 'number'
                ? g.participantsCount
                : Array.isArray(g.participants)
                ? g.participants.length
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
      typeof current.totalParticipants === 'number'
        ? current.totalParticipants
        : typeof current.participantsCount === 'number'
        ? current.participantsCount
        : Array.isArray(current.participants)
        ? current.participants.length
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

  const pastGiveaways = Array.isArray(previous)
    ? previous
    : previous && typeof previous === 'object' && (previous._id || previous.id || previous.title)
    ? [previous]
    : [];

  // Extract real metrics from database items
  const totalActiveCount = Array.isArray(current)
    ? current.length
    : current && typeof current === 'object' && (current._id || current.id)
    ? 1
    : activeGiveaways.length > 0
    ? 1
    : 0;

  const totalParticipantsCount = Array.isArray(current)
    ? current.reduce(
        (total, g) =>
          total +
          (typeof g.totalParticipants === 'number'
            ? g.totalParticipants
            : typeof g.participantsCount === 'number'
            ? g.participantsCount
            : Array.isArray(g.participants)
            ? g.participants.length
            : (g.participants || 0)),
        0
      )
    : current
    ? typeof current.totalParticipants === 'number'
      ? current.totalParticipants
      : typeof current.participantsCount === 'number'
      ? current.participantsCount
      : Array.isArray(current.participants)
      ? current.participants.length
      : (current.participants || 0)
    : 0;

  const prizesWonCount = pastGiveaways.length;

  const targetDate = activeGiveaways.length > 0
    ? (activeGiveaways[0].endAt || activeGiveaways[0].endDate || activeGiveaways[0].endsAt)
    : null;

  // Real winners collected from concluded giveaways
  const recentWinners = pastGiveaways
    .filter((g) => g.winner || g.winnerName)
    .map((g) => ({
      name: g.winner?.name || g.winnerName || 'Verified Winner',
      username: g.winner?.username || g.winnerId || 'winner',
      avatar: g.winner?.avatar || g.avatar,
      prize: g.title || g.prize || 'Exclusive Prize',
      date: g.endedDate || (g.updatedAt ? new Date(g.updatedAt).toLocaleDateString() : 'Recently'),
      badge: g.badge || 'Winner',
    }));

  const handleJoinClick = (giveaway) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    resetJoin();
    setSelectedGiveaway(giveaway);
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

  const handleCloseClaimModal = () => {
    setSelectedGiveaway(null);
    resetJoin();
  };

  return (
    <div className="giveaway-page-wrapper">
      {/* Top Navbar */}
      <nav className="veloop-navbar">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <span className="veloop-logo-icon" style={{ fontSize: '24px' }}>
              <BsBoxSeam />
            </span>
            <span className="veloop-brand-name" style={{ fontSize: '1.25rem' }}>
              VELOOP REWARDS
            </span>
          </Link>

          {/* Center Links */}
          <div className="d-none d-md-flex align-items-center gap-1">
            <Link to="/giveaway" className="nav-link-custom active">
              Giveaways
            </Link>
            <a href="#leaderboard" className="nav-link-custom">
              Leaderboard
            </a>
            <a href="#rewards" className="nav-link-custom">
              Rewards
            </a>
            <a href="#help" className="nav-link-custom">
              Help Center
            </a>
          </div>

          {/* Right Action */}
          <div className="d-flex align-items-center gap-3">
            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-2">
                <span className="text-white small fw-semibold d-none d-sm-inline">
                  <FiUser className="me-1 text-primary" />
                  {user?.fullName || user?.name || user?.username || 'Member'}
                </span>
                <button
                  onClick={logoutUser}
                  className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 text-white border-secondary-subtle"
                  style={{ borderRadius: '20px', padding: '5px 14px' }}
                >
                  <FiLogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-nav-login">
                  Login
                </Link>
                <Link to="/register" className="btn-nav-signup">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="container py-4">
        {/* Error Notification if backend error occurs */}
        {error && (
          <div className="veloop-alert mb-4">
            <div className="d-flex align-items-center gap-2">
              <FiAlertCircle />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <GiveawayHero />

        {/* Metrics Row */}
        <GiveawayStats
          totalGiveaways={totalActiveCount}
          totalParticipants={totalParticipantsCount}
          prizesWon={prizesWonCount}
          targetDate={targetDate}
        />

        {/* Winners Slider & Tabs */}
        <WinnersTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'recent-winners' && <WinnersSlider winners={recentWinners} />}

        {activeTab === 'past-giveaways' && (
          <div className="mb-4">
            <div className="section-header-box mb-3">
              <h4 className="section-header-title">Past Concluded Giveaways</h4>
              <p className="section-header-sub">View previous winners and transparently audit results.</p>
            </div>
            {pastGiveaways.length === 0 ? (
              <div className="text-center py-5 rounded-4" style={{ background: 'rgba(15, 20, 39, 0.6)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <FiGift size={36} className="text-secondary mb-2" />
                <h5 className="text-white fw-bold">No Past Giveaways Found</h5>
                <p className="text-muted small mb-0">Past concluded giveaways and audit logs will appear here.</p>
              </div>
            ) : (
              <div className="row g-3">
                {pastGiveaways.map((item, idx) => (
                  <div key={item._id || item.id || idx} className="col-12 col-md-4">
                    <PreviousWinnerCard giveaway={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main 2-Column Content */}
        {activeTab === 'featured' && (
          <div className="row g-4">
            {/* Left: Featured Giveaways */}
            <div className="col-lg-8">
              <FeaturedGiveaways
                giveaways={activeGiveaways}
                isLoading={isLoading}
                onJoinClick={handleJoinClick}
              />
            </div>

            {/* Right: How to Participate */}
            <div className="col-lg-4">
              <HowToParticipate onOpenRules={() => setShowRulesModal(true)} />
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <FAQ />

        {/* Bottom Trust Features Bar */}
        <TrustSection />

        {/* Footer */}
        <footer className="veloop-footer">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
            <div>
              <div className="footer-brand-title">VELoop Rewards</div>
              <div>© 2024 VELoop Rewards. All rights reserved. Secured with SSL Encryption.</div>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-2">
              <a href="#terms" className="footer-link">
                TERMS OF SERVICE
              </a>
              <a href="#privacy" className="footer-link">
                PRIVACY POLICY
              </a>
              <a href="#fairness" className="footer-link">
                FAIRNESS AUDIT
              </a>
              <a href="#support" className="footer-link">
                SUPPORT
              </a>
              <a href="#twitter" className="footer-link">
                TWITTER
              </a>
              <a href="#discord" className="footer-link">
                DISCORD
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Join Giveaway Modal connected to Backend */}
      <PrizeClaimModal
        giveaway={selectedGiveaway}
        isOpen={!!selectedGiveaway}
        onClose={handleCloseClaimModal}
        onConfirm={handleConfirmJoin}
        isJoining={isJoining}
        joinSuccess={joinSuccess}
        joinError={joinError}
      />

      {/* Rules & Guidelines Modal */}
      <GiveawayRules
        isOpen={showRulesModal}
        onClose={() => setShowRulesModal(false)}
        rules={current?.rules}
        eligibility={current?.eligibility}
      />
    </div>
  );
};

export default Giveaway;
