import React, { createContext, useContext, useEffect, useState } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  fontSize: 'normal',
  setFontSize: () => {},
  highContrast: false,
  setHighContrast: () => {},
  reducedMotion: false,
  setReducedMotion: () => {}
});

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem('aroggya_fontsize') as FontSize) || 'normal';
  });
  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    return localStorage.getItem('aroggya_highcontrast') === 'true';
  });
  const [reducedMotion, setReducedMotionState] = useState<boolean>(() => {
    return localStorage.getItem('aroggya_reducedmotion') === 'true';
  });

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem('aroggya_fontsize', size);
  };

  const setHighContrast = (val: boolean) => {
    setHighContrastState(val);
    localStorage.setItem('aroggya_highcontrast', String(val));
  };

  const setReducedMotion = (val: boolean) => {
    setReducedMotionState(val);
    localStorage.setItem('aroggya_reducedmotion', String(val));
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-size-large', 'text-size-xlarge', 'high-contrast');
    if (fontSize === 'large') root.classList.add('text-size-large');
    if (fontSize === 'xlarge') root.classList.add('text-size-xlarge');
    if (highContrast) root.classList.add('high-contrast');
  }, [fontSize, highContrast]);

  return (
    <AccessibilityContext.Provider
      value={{ fontSize, setFontSize, highContrast, setHighContrast, reducedMotion, setReducedMotion }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
