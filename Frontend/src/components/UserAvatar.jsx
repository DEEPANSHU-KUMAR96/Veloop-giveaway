import React, { useState } from 'react';
import { FiUser } from 'react-icons/fi';

const GRADIENTS = [
  'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
  'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
];

const LOCAL_AVATARS = [
  '/avatars/avatar1.svg',
  '/avatars/avatar2.svg',
  '/avatars/avatar3.svg',
  '/avatars/avatar4.svg',
  '/avatars/avatar5.svg',
  '/avatars/avatar6.svg',
];

export const getDeterministicAvatar = (name = '') => {
  if (!name) return LOCAL_AVATARS[0];
  const charCode = String(name)
    .split('')
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return LOCAL_AVATARS[charCode % LOCAL_AVATARS.length];
};

const UserAvatar = ({
  src,
  name = '',
  size = 40,
  className = '',
  style = {},
  showRing = false,
  ringColor = '#a855f7',
}) => {
  const [hasError, setHasError] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);

  // Compute deterministic index
  const charCode = String(name || 'User')
    .split('')
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const gradient = GRADIENTS[charCode % GRADIENTS.length];
  const localAvatar = LOCAL_AVATARS[charCode % LOCAL_AVATARS.length];

  // Decide initial image source: prefer local avatar if src is an Unsplash URL that can fail
  const isUnsplash = typeof src === 'string' && src.includes('unsplash.com');
  const effectiveSrc = isUnsplash ? localAvatar : (src || localAvatar);

  // Initial letter
  const cleanName = String(name || '').trim();
  const isHexOrMasked = cleanName.toLowerCase().startsWith('6a') || cleanName.includes('****');
  const initial = isHexOrMasked ? null : (cleanName.charAt(0).toUpperCase() || 'U');

  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    minWidth: `${size}px`,
    minHeight: `${size}px`,
    borderRadius: '50%',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(showRing ? { border: `2px solid ${ringColor}`, padding: '2px', boxShadow: `0 0 12px ${ringColor}60` } : {}),
    ...style,
  };

  // If primary image and local avatar failed, render CSS gradient letter
  if (hasError && fallbackFailed) {
    return (
      <div className={className} style={{ ...containerStyle, background: gradient }}>
        {initial ? (
          <span style={{ color: '#ffffff', fontWeight: '700', fontSize: `${Math.round(size * 0.44)}px`, userSelect: 'none' }}>
            {initial}
          </span>
        ) : (
          <FiUser style={{ color: '#ffffff', fontSize: `${Math.round(size * 0.48)}px` }} />
        )}
      </div>
    );
  }

  return (
    <div className={className} style={containerStyle}>
      <img
        src={hasError ? localAvatar : effectiveSrc}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          objectFit: 'cover',
          display: 'block',
        }}
        onError={() => {
          if (!hasError) {
            setHasError(true);
          } else {
            setFallbackFailed(true);
          }
        }}
      />
    </div>
  );
};

export default UserAvatar;
