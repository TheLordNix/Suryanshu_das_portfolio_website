import React from 'react';

// Import icons from local assets folder
import nightOn from './assets/night-on.png';
import nightOff from './assets/night-off.png';
import rainOn from './assets/rain-on.png';
import rainOff from './assets/rain-off.png';

// Icon map for toggle buttons
const iconMap = {
  night: {
    on: nightOn,
    off: nightOff,
  },
  rain: {
    on: rainOn,
    off: rainOff,
  },
};

const ButtonToggle = ({ isActive, onToggle, label }) => {
  const lowerLabel = label.toLowerCase();
  const iconSet = iconMap[lowerLabel];

  const iconSrc = iconSet
    ? isActive
      ? iconSet.on
      : iconSet.off
    : ''; // fallback: blank if not found

  return (
    <img
      src={iconSrc}
      alt={label}
      onClick={onToggle}
      className="w-10 h-10 cursor-pointer transition-transform hover:scale-110"
    />
  );
};

export default ButtonToggle;
