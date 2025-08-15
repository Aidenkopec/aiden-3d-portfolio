import React, { useState, useEffect, useRef } from 'react';
import { themes, setTheme, getCurrentTheme } from '../styles';

const ThemeSelector = ({ isOpen, onClose, isMobile = false }) => {
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  const selectorRef = useRef(null);

  useEffect(() => {
    setCurrentTheme(getCurrentTheme());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleThemeChange = (themeKey) => {
    setTheme(themeKey);
    setCurrentTheme(themeKey);
    // Close the selector after a short delay for better UX
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getThemePreviewColors = (theme) => {
    const primary = theme['--primary-color'];
    const accent = theme['--text-color-variable'];
    const secondary = theme['--tertiary-color'];
    return { primary, accent, secondary };
  };

  if (!isOpen) return null;

  return (
    <div
      ref={selectorRef}
      className={`absolute top-full ${isMobile ? 'left-0' : 'right-0'} mt-2 ${
        isMobile ? 'w-72' : 'w-80'
      } bg-black-100 border border-[#232631] rounded-xl p-4 shadow-2xl z-[9999]`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-lg font-semibold">Choose Theme</h3>
        <button
          onClick={onClose}
          className="text-secondary hover:text-white transition-colors text-xl"
        >
          ×
        </button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {Object.entries(themes).map(([themeKey, theme]) => {
          const colors = getThemePreviewColors(theme);
          const isSelected = currentTheme === themeKey;

          return (
            <div
              key={themeKey}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleThemeChange(themeKey);
              }}
              className={`
                relative p-3 rounded-lg cursor-pointer transition-all duration-300 border
                ${
                  isSelected
                    ? 'border-[#ff6b6b] bg-[#1a1a1a] shadow-lg'
                    : 'border-[#232631] hover:border-[#ff6b6b] bg-tertiary hover:bg-[#1a1a1a]'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm mb-2">
                    {theme.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-600"
                      style={{ backgroundColor: colors.primary }}
                      title="Primary Color"
                    />
                    <div
                      className="w-4 h-4 rounded-full border border-gray-600"
                      style={{ backgroundColor: colors.accent }}
                      title="Accent Color"
                    />
                    <div
                      className="w-4 h-4 rounded-full border border-gray-600"
                      style={{ backgroundColor: colors.secondary }}
                      title="Secondary Color"
                    />
                  </div>
                </div>

                {isSelected && (
                  <div className="text-[#915EFF] text-sm font-medium">
                    ✓ Active
                  </div>
                )}
              </div>

              {/* Theme preview gradient */}
              <div
                className="absolute top-0 right-0 w-1 h-full rounded-r-lg"
                style={{
                  background: `linear-gradient(to bottom, ${colors.accent}, ${colors.primary})`,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-[#232631]">
        <p className="text-secondary text-xs text-center">
          Themes are automatically saved
        </p>
      </div>
    </div>
  );
};

export default ThemeSelector;
