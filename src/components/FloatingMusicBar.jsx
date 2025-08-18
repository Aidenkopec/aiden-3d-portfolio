import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusicPlayer } from '../hooks/useMusicPlayer';

// Icon components adapted for the portfolio theme
const Icons = {
  play: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  pause: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  ),
  skipPrevious: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
    </svg>
  ),
  skipNext: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
    </svg>
  ),
  close: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  ),
  music: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  ),
};

const FloatingMusicBar = () => {
  const {
    isPlaying,
    isFloatingBarVisible,
    floatingBarMode,
    setFloatingBarMode,
    getTrackInfo,
    togglePlay,
    nextTrack,
    previousTrack,
  } = useMusicPlayer();

  const [touchStart, setTouchStart] = useState(null);
  const [shouldScrollTitle, setShouldScrollTitle] = useState(false);
  const [shouldScrollArtist, setShouldScrollArtist] = useState(false);
  const titleRef = useRef(null);
  const artistRef = useRef(null);

  const trackInfo = getTrackInfo();

  // Check if text overflows and needs scrolling
  useEffect(() => {
    const checkOverflow = () => {
      if (titleRef.current) {
        const isOverflowing =
          titleRef.current.scrollWidth > titleRef.current.clientWidth;
        setShouldScrollTitle(isOverflowing);
      }
      if (artistRef.current) {
        const isOverflowing =
          artistRef.current.scrollWidth > artistRef.current.clientWidth;
        setShouldScrollArtist(isOverflowing);
      }
    };

    // Check on mount and when text changes
    checkOverflow();

    // Also check on resize
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [trackInfo.title, trackInfo.artist]);

  // Handle swipe gestures on mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextTrack(); // Swipe left - next track
      } else {
        previousTrack(); // Swipe right - previous track
      }
    }
    setTouchStart(null);
  };

  const closeDock = () => setFloatingBarMode('hidden');

  // Hidden state - show small button
  if (!isFloatingBarVisible || floatingBarMode === 'hidden') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none">
        <div
          className="flex justify-end px-3 py-3"
          style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
        >
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => setFloatingBarMode('standard')}
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 pointer-events-auto hover:scale-105"
            title="Show music controls"
          >
            <Icons.music className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    );
  }

  // Mini mode - just music icon and play button
  if (floatingBarMode === 'mini') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none">
        <div
          className="flex justify-center px-3 py-3"
          style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="pointer-events-auto"
          >
            <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-gray-800/50 rounded-full px-2.5 py-1.5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out">
              <div
                className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex-shrink-0 flex items-center justify-center hover:rotate-12 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 ease-out cursor-pointer"
                onClick={() => setFloatingBarMode('standard')}
              >
                <Icons.music className="w-3.5 h-3.5 text-white" />
              </div>

              <button
                onClick={togglePlay}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="p-1.5 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-md"
                style={{ minWidth: '36px', minHeight: '36px' }}
              >
                {isPlaying ? (
                  <Icons.pause className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Icons.play className="w-3.5 h-3.5 text-white" />
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Standard dock mode
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none">
      <div
        className="flex justify-center px-2 py-3"
        style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
      >
        <AnimatePresence>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="pointer-events-auto relative w-auto"
          >
            <div
              className="flex items-center gap-1.5 sm:gap-2 bg-black/80 backdrop-blur-md border border-gray-800/50 rounded-full px-2.5 py-1.5 sm:px-3 sm:py-1.5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex-shrink-0 flex items-center justify-center hover:rotate-12 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 ease-out cursor-pointer">
                <Icons.music className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>

              <div className="flex flex-col min-w-0 w-20 sm:w-24 cursor-pointer group overflow-hidden">
                <div
                  ref={titleRef}
                  className={`text-xs font-medium text-white group-hover:text-purple-400 transition-colors duration-200 whitespace-nowrap ${
                    shouldScrollTitle ? 'animate-scroll' : ''
                  }`}
                >
                  {trackInfo.title}
                </div>
                <div
                  ref={artistRef}
                  className={`text-xs text-gray-400 group-hover:text-purple-300 transition-colors duration-200 whitespace-nowrap ${
                    shouldScrollArtist ? 'animate-scroll-slow' : ''
                  }`}
                >
                  {trackInfo.artist}
                </div>
              </div>

              <div className="flex items-center gap-0.5 flex-shrink-0">
                <button
                  onClick={previousTrack}
                  className="p-1 sm:p-1.5 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{ minWidth: '28px', minHeight: '28px' }}
                  title="Previous Track"
                >
                  <Icons.skipPrevious className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                </button>

                <button
                  onClick={togglePlay}
                  className="p-1 sm:p-1.5 hover:bg-white/10 rounded-full transition-all duration-200 mx-0.5 hover:scale-110 active:scale-95 hover:shadow-md"
                  style={{ minWidth: '32px', minHeight: '32px' }}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Icons.pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  ) : (
                    <Icons.play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  )}
                </button>

                <button
                  onClick={nextTrack}
                  className="p-1 sm:p-1.5 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{ minWidth: '28px', minHeight: '28px' }}
                  title="Next Track"
                >
                  <Icons.skipNext className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                </button>
              </div>

              <button
                onClick={closeDock}
                className="p-0.5 sm:p-1 opacity-60 hover:opacity-100 hover:rotate-90 hover:text-red-400 transition-all duration-300 flex-shrink-0"
                style={{ minWidth: '20px', minHeight: '20px' }}
                title="Hide music player"
              >
                <Icons.close className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>

            {/* Mobile gesture hint */}
            <div className="sm:hidden mt-2 text-center">
              <p className="text-gray-500 text-xs opacity-75">
                Swipe left/right to change tracks
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scrolling text animations */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          95% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes scroll-slow {
          0% {
            transform: translateX(0);
          }
          95% {
            transform: translateX(-80%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll {
          animation: scroll 12s linear infinite;
        }

        .animate-scroll-slow {
          animation: scroll-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingMusicBar;
