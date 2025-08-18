import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';

const MusicContext = createContext();

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within MusicProvider');
  }
  return context;
};

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('musicVolume');
    return saved ? parseFloat(saved) : 0.5;
  });
  const [currentTrack, setCurrentTrack] = useState(() => {
    const saved = localStorage.getItem('currentTrack');
    return saved ? parseInt(saved) : 0;
  });
  const [hasError, setHasError] = useState(false);
  const [isFloatingBarVisible, setIsFloatingBarVisible] = useState(() => {
    const saved = localStorage.getItem('floatingBarVisible');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [floatingBarMode, setFloatingBarMode] = useState(() => {
    const saved = localStorage.getItem('floatingBarMode');
    return saved || 'standard'; // 'hidden', 'mini', 'standard'
  });
  const audioRef = useRef(null);

  const playlist = [
    {
      title: 'Deep Space',
      artist: 'Ambient Artist',
      src: '/music/deep-space.mp3',
    },
    {
      title: 'Synthwave Nights',
      artist: 'Synth Artist',
      src: '/music/synthwave-nights.mp3',
    },
    {
      title: 'Digital Dreams',
      artist: 'Electronic Artist',
      src: '/music/digital-dreams.mp3',
    },
  ];

  // Persist volume changes
  useEffect(() => {
    localStorage.setItem('musicVolume', volume.toString());
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Persist current track changes
  useEffect(() => {
    localStorage.setItem('currentTrack', currentTrack.toString());
  }, [currentTrack]);

  // Persist floating bar visibility and mode
  useEffect(() => {
    localStorage.setItem(
      'floatingBarVisible',
      JSON.stringify(isFloatingBarVisible)
    );
  }, [isFloatingBarVisible]);

  useEffect(() => {
    localStorage.setItem('floatingBarMode', floatingBarMode);
  }, [floatingBarMode]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.warn('Audio playback failed:', error);
        setHasError(true);
        setIsPlaying(false);
      });
    }
  };

  const nextTrack = () => {
    const nextIndex = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextIndex);
    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play().catch((error) => {
          console.warn('Audio playback failed:', error);
          setIsPlaying(false);
          setHasError(true);
        });
      }, 100);
    }
  };

  const previousTrack = () => {
    const prevIndex =
      currentTrack === 0 ? playlist.length - 1 : currentTrack - 1;
    setCurrentTrack(prevIndex);
    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play().catch((error) => {
          console.warn('Audio playback failed:', error);
          setIsPlaying(false);
          setHasError(true);
        });
      }, 100);
    }
  };

  const selectTrack = (index) => {
    setCurrentTrack(index);
    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play().catch((error) => {
          console.warn('Audio playback failed:', error);
          setIsPlaying(false);
          setHasError(true);
        });
      }, 100);
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  const toggleFloatingBar = () => {
    setIsFloatingBarVisible(!isFloatingBarVisible);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return; // Don't trigger shortcuts when typing
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            nextTrack();
          }
          break;
        case 'ArrowLeft':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            previousTrack();
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, currentTrack]);

  const value = {
    // State
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    currentTrack,
    setCurrentTrack,
    hasError,
    setHasError,
    isFloatingBarVisible,
    setIsFloatingBarVisible,
    floatingBarMode,
    setFloatingBarMode,
    audioRef,
    playlist,

    // Actions
    togglePlay,
    nextTrack,
    previousTrack,
    selectTrack,
    handleTrackEnd,
    toggleFloatingBar,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
      {/* Global audio element */}
      <audio
        ref={audioRef}
        src={playlist[currentTrack]?.src}
        onEnded={handleTrackEnd}
        onPlay={() => {
          setIsPlaying(true);
          setHasError(false);
        }}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setHasError(true);
          setIsPlaying(false);
        }}
        preload="metadata"
      />
    </MusicContext.Provider>
  );
};
