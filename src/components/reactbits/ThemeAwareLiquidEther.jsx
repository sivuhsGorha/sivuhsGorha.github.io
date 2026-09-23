import { useState, useEffect } from 'react';
import LiquidEther from './LiquidEther.jsx';

const DIM_PROPS = {
  colors: ['#2a0a5e', '#e3a857', '#6b21d4'],
  backgroundColor: '#0a0418',
  lightMode: false,
};

const BRIGHT_PROPS = {
  colors: ['#5227FF', '#e3a857', '#8a2be2'],
  backgroundColor: '#ede8ff',
  lightMode: true,
};

function getTheme() {
  if (typeof document === 'undefined') return 'dim';
  return document.documentElement.getAttribute('data-theme') === 'bright' ? 'bright' : 'dim';
}

export default function ThemeAwareLiquidEther(props) {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  const themeProps = theme === 'bright' ? BRIGHT_PROPS : DIM_PROPS;

  return (
    <LiquidEther
      {...props}
      colors={themeProps.colors}
      backgroundColor={themeProps.backgroundColor}
      lightMode={themeProps.lightMode}
    />
  );
}
