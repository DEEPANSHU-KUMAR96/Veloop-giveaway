import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import useWinner from '../hooks/useWinner.js';
import useGiveaway from '../../Giveaway/hooks/useGiveaway.js';
import useAuth from '../../auth/hooks/useAuth.js';
import Navbar from '../../../components/Navbar.jsx';
import {
  WinnerHero,
  WinnerBanner,
  WinnerPodium,
  WinnerList,
  FairnessAuditCard,
} from '../components/index.js';
import ClaimModal from '../../claim/pages/ClaimModal.jsx';

const isValidMongoId = (id) => typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);

const WinnerAnnouncement = () => {
  const { giveawayId: paramGiveawayId } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { current, getCurrentGiveaway } = useGiveaway();
  const {
    winners,
    previousWinners,
    isLoading,
    error,
    getWinners,
    getPreviousWinners,
    checkIfWinner,
    claimPrize,
    getMyClaim,
    isWinner,
    winnerData,
    myClaim,
    resetClaim,
    clearError,
  } = useWinner();

  const [showClaimModal, setShowClaimModal] = useState(false);

  // Clear any previous error on mount and fetch giveaway & previous winners
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

  // Merge current giveaway winners + previous winners
  const allDisplayWinners = [
    ...(Array.isArray(winners) ? winners : []),
    ...(Array.isArray(previousWinners) ? previousWinners : []).filter(
      (pw) => !winners?.some((w) => String(w._id) === String(pw._id))
    ),
  ];

  const topWinners = allDisplayWinners.slice(0, 3);

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
    if (targetGiveawayId && isAuthenticated) {
      getMyClaim(targetGiveawayId);
    }
  };

  const giveawayTitle =
    current?.title ||
    (Array.isArray(current) && current[0]?.title) ||
    'Veloop Rewards Mega Giveaway';

  return (
    <div className="template-winner-page-wrap">
      {/* Universal Template Navbar with Logo, Coin Chip, User Avatar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="container py-4">
        {/* Back Link with glowing hover */}
        <div className="mb-3">
          <Link
            to="/giveaway"
            className="d-inline-flex align-items-center gap-2 text-decoration-none small"
            style={{
              color: '#c084fc',
              background: 'rgba(124, 58, 237, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              padding: '6px 16px',
              borderRadius: '9999px',
              transition: 'all 0.2s ease',
            }}
          >
            <FiArrowLeft size={14} />
            <span className="fw-semibold">← Back to Active Giveaways</span>
          </Link>
        </div>

        {/* Error Notice */}
        {error && (
          <div
            className="p-3 mb-4 rounded-3 d-flex align-items-center gap-2 text-danger"
            style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
          >
            <FiAlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* 1. Official Winner Hero with Live Stats Bar */}
        <WinnerHero
          giveawayTitle={giveawayTitle}
          winnerCount={allDisplayWinners.length}
        />

        {/* 2. Personalized Winner Alert Banner (if user won) */}
        <WinnerBanner
          isWinner={isWinner}
          winnerData={winnerData}
          onClaimClick={handleOpenClaimModal}
          hasClaimed={!!myClaim}
        />

        {/* 3. Hall of Fame Top 3 Olympic Champions Podium */}
        <WinnerPodium topWinners={topWinners} />

        {/* 4. Interactive Verified Winners Directory & Search */}
        <WinnerList
          winners={allDisplayWinners}
          isLoading={isLoading}
        />

        {/* 5. Provably Fair & Cryptographic Verification Engine */}
        <FairnessAuditCard />

        {/* Footer matching the template */}
        <footer className="template-footer mt-5 pt-4 pb-4 border-top border-secondary-subtle">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
            <div>
              <div className="fw-bold text-white mb-1" style={{ letterSpacing: '1px' }}>
                ✦ VELOOP REWARDS
              </div>
              <div className="text-muted small">
                © 2024 VELOOP Rewards. Provably Fair, Cryptographically Audited & Secured.
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/giveaway" className="template-footer-link">Giveaways</Link>
              <Link to="/winners" className="template-footer-link">Hall of Fame</Link>
              <a href="#fairness" className="template-footer-link">Provably Fair</a>
              <a href="#terms" className="template-footer-link">Terms</a>
              <a href="#privacy" className="template-footer-link">Privacy</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Prize Claim Modal */}
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