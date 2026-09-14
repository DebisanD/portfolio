import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  { id: 'cyber', name: 'Cyber Midnight', color: '#06b6d4', bg: '#030712' },
  { id: 'golden', name: 'Golden Luxury', color: '#fbbf24', bg: '#0c0a04' },
  { id: 'emerald', name: 'Emerald Green', color: '#10b981', bg: '#022c22' },
  { id: 'violet', name: 'Royal Violet', color: '#a855f7', bg: '#090514' },
];

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'cyber';
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('portfolio_theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
