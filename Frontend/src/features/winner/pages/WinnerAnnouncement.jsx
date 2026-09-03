import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiLogOut, FiUser, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';
import useWinner from '../hooks/useWinner.js';
import useGiveaway from '../../Giveaway/hooks/useGiveaway.js';
import useAuth from '../../auth/hooks/useAuth.js';
import {
  WinnerHero,
  WinnerBanner,
  WinnerPodium,
  WinnerList,
  FairnessAuditCard,
} from '../components/index.js';
import { TrustSection } from '../../Giveaway/components/index.js';
import ClaimModal from '../../claim/pages/ClaimModal.jsx';

const isValidMongoId = (id) => typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);

const WinnerAnnouncement = () => {
  const { giveawayId: paramGiveawayId } = useParams();
  const { user, isAuthenticated, logoutUser } = useAuth();
  const { current, getCurrentGiveaway } = useGiveaway();
  const {
    winners,
    previousWinners,
    myWinnerStatus,
    myClaim,
    isClaiming,
    claimSuccess,
    claimError,
    isLoading,
    error,
    getWinners,
    getPreviousWinners,
    checkIfWinner,
    claimPrize,
    getMyClaim,
    isWinner,
    winnerData,
    resetClaim,
    clearError,
  } = useWinner();

  const [showClaimModal, setShowClaimModal] = useState(false);

  // Clear any previous error on mount
  useEffect(() => {
    if (clearError) clearError();
    getCurrentGiveaway();
    getPreviousWinners();
  }, []);

  // Extract valid giveaway ID
  const targetGiveawayId =
    (paramGiveawayId && isValidMongoId(paramGiveawayId) ? paramGiveawayId : null) ||
    (current?._id && isValidMongoId(current._id) ? current._id : null) ||
    (current?.id && isValidMongoId(current.id) ? current.id : null) ||
    (Array.isArray(current) && current.length > 0 && isValidMongoId(current[0]._id) ? current[0]._id : null);

  useEffect(() => {
    if (targetGiveawayId && isValidMongoId(targetGiveawayId)) {
      getWinners(targetGiveawayId);
      if (isAuthenticated) {
        checkIfWinner(targetGiveawayId);
        getMyClaim(targetGiveawayId);
      }
    }
  }, [targetGiveawayId, isAuthenticated]);

  // Merge current giveaway winners + all previous winners
  // winners = current active giveaway's winners (empty until draw is done)
  // previousWinners = ALL GiveawayWinner records from /previous/winners
  const allDisplayWinners = [
    ...winners,
    // Avoid duplicates: only add previousWinners not already in winners
    ...previousWinners.filter(
      (pw) => !winners.some((w) => String(w._id) === String(pw._id))
    ),
  ];
  const topWinners = allDisplayWinners.slice(0, 3);
  const remainingWinners = allDisplayWinners.slice(3);


  const handleClaimSubmit = async (formData) => {
    if (targetGiveawayId) {
      const res = await claimPrize(targetGiveawayId, formData);
      if (res?.type?.endsWith('fulfilled')) {
        getMyClaim(targetGiveawayId);
      }
    }
  };

  const handleOpenClaimModal = () => {
    resetClaim();
    setShowClaimModal(true);
  };

  const handleCloseClaimModal = () => {
    setShowClaimModal(false);
    resetClaim();
    // Refresh winner claim status so WinnerBanner updates
    if (targetGiveawayId && isAuthenticated) {
      getMyClaim(targetGiveawayId);
    }
  };


  const giveawayTitle =
    current?.title ||
    (Array.isArray(current) && current[0]?.title) ||
    'Summer Rewards Giveaway';

  return (
    <div className="giveaway-page-wrapper">
      {/* Top Navbar */}
      <nav className="veloop-navbar">
        <div className="container d-flex align-items-center justify-content-between">
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <span className="veloop-logo-icon" style={{ fontSize: '24px' }}>
              <BsBoxSeam />
            </span>
            <span className="veloop-brand-name" style={{ fontSize: '1.25rem' }}>
              VELOOP REWARDS
            </span>
          </Link>

          <div className="d-none d-md-flex align-items-center gap-1">
            <Link to="/giveaway" className="nav-link-custom">
              Giveaways
            </Link>
            <Link to="/winners" className="nav-link-custom active">
              Winners
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

      {/* Main Content Area */}
      <div className="container py-4">
        {/* Back Link */}
        <div className="mb-3">
          <Link
            to="/giveaway"
            className="text-muted text-decoration-none small d-flex align-items-center gap-1 hover-white"
            style={{ color: '#94a3b8' }}
          >
            <FiArrowLeft />
            <span>Back to Active Giveaways</span>
          </Link>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="veloop-alert mb-4">
            <div className="d-flex align-items-center gap-2">
              <FiAlertCircle />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Winner Hero Section */}
        <WinnerHero
          giveawayTitle={giveawayTitle}
          winnerCount={allDisplayWinners.length}
        />

        {/* Personalized Winner Banner */}
        <WinnerBanner
          isWinner={isWinner}
          winnerData={winnerData}
          onClaimClick={handleOpenClaimModal}
          hasClaimed={!!myClaim}
        />

        {/* Top 3 Podium Cards */}
        {topWinners.length > 0 && <WinnerPodium topWinners={topWinners} />}

        {/* Remaining All Winners List Table */}
        <WinnerList
          winners={allDisplayWinners}
          isLoading={isLoading}
        />


        {/* Cryptographic Fairness Card */}
        <FairnessAuditCard />

        {/* Bottom Trust Section */}
        <TrustSection />

        {/* Footer */}
        <footer className="veloop-footer mt-5">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
            <div>
              <div className="footer-brand-title">VELoop Rewards</div>
              <div>© 2024 VELoop Rewards. All rights reserved. Secured with SSL Encryption.</div>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              <Link to="/giveaway" className="footer-link">
                GIVEAWAYS
              </Link>
              <Link to="/winners" className="footer-link">
                WINNERS
              </Link>
              <a href="#terms" className="footer-link">
                TERMS
              </a>
              <a href="#privacy" className="footer-link">
                PRIVACY
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Prize Claim Modal — powered by claim Redux slice */}
      <ClaimModal
        isOpen={showClaimModal}
        onClose={handleCloseClaimModal}
        giveawayId={targetGiveawayId}
        winnerData={winnerData}
        user={user}
      />
    </div>
  );
};

export default WinnerAnnouncement;