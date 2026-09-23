import { useState, useEffect } from 'react';
import Silk from './Silk.jsx';

function getTheme() {
  if (typeof document === 'undefined') return 'dim';
  return document.documentElement.getAttribute('data-theme') === 'bright' ? 'bright' : 'dim';
}

export default function ThemeAwareSilk(props) {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Silk
      {...props}
      lightMode={theme === 'bright'}
      /* dim mode → dark purple silk; bright mode → pale lavender/white silk */
      color="#1a0a2e"
      lightColor="#e8e4f5"
    />
  );
}
