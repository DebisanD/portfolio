import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  { id: 'cyber', name: 'Cyber Midnight', color: '#06b6d4', bg: '#030712', mode: 'dark' },
  { id: 'light', name: 'Clean White (Light)', color: '#2563eb', bg: '#ffffff', mode: 'light' },
  { id: 'mono-black', name: 'Pitch Black (Pure Dark)', color: '#38bdf8', bg: '#000000', mode: 'dark' },
  { id: 'golden', name: 'Golden Luxury', color: '#fbbf24', bg: '#0c0a04', mode: 'dark' },
  { id: 'emerald', name: 'Emerald Green', color: '#10b981', bg: '#022c22', mode: 'dark' },
  { id: 'violet', name: 'Royal Violet', color: '#a855f7', bg: '#090514', mode: 'dark' },
];

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'cyber';
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('portfolio_theme', newTheme);
  };

  const toggleLightDark = () => {
    if (theme === 'light') {
      setTheme('cyber');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleLightDark, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

