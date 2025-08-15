import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = ({
  mobile = false,
  externalOpen = false,
  onExternalOpenChange = null,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef(null);

  // Handle external control
  useEffect(() => {
    if (externalOpen !== null && externalOpen !== undefined) {
      setShowControls(externalOpen);
    }
  }, [externalOpen]);

  // Update parent when controls state changes
  useEffect(() => {
    if (onExternalOpenChange) {
      onExternalOpenChange(showControls);
    }
  }, [showControls, onExternalOpenChange]);

  const playlist = [
    {
      title: 'Deep Space',
      src: '/music/deep-space.mp3',
    },
    {
      title: 'Synthwave Nights',
      src: '/music/synthwave-nights.mp3',
    },
    {
      title: 'Digital Dreams',
      src: '/music/digital-dreams.mp3',
    },
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.warn('Audio playback failed:', error);
        // Handle case where audio file doesn't exist
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const nextIndex = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextIndex);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch((error) => {
          console.warn('Audio playback failed:', error);
          setIsPlaying(false);
        });
      }, 100);
    }
  };

  const previousTrack = () => {
    const prevIndex =
      currentTrack === 0 ? playlist.length - 1 : currentTrack - 1;
    setCurrentTrack(prevIndex);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch((error) => {
          console.warn('Audio playback failed:', error);
          setIsPlaying(false);
        });
      }, 100);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  return (
    <div className="relative">
      {/* Audio element */}
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
      />

      {/* Music toggle button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className={`flex items-center justify-center rounded-full dynamic-gradient hover:opacity-80 transition-all duration-300 shadow-lg hover:shadow-xl ${
          mobile ? 'w-7 h-7' : 'w-10 h-10'
        }`}
        title="Customization & Music"
      >
        <svg
          className={`text-white ${mobile ? 'w-3.5 h-3.5' : 'w-5 h-5'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Expanded controls */}
      {showControls && (
        <div
          className={`absolute bg-black bg-opacity-90 backdrop-blur-sm rounded-lg p-4 shadow-2xl border border-gray-800 ${
            mobile
              ? 'right-0 top-10 min-w-[260px]'
              : 'right-0 top-12 min-w-[280px]'
          }`}
        >
          {/* Track info */}
          <div className="text-center mb-3">
            {hasError ? (
              <div className="text-yellow-400 text-xs">
                <p>🎵 Music files not found</p>
                <p className="text-gray-400 mt-1">
                  Add MP3 files to /public/music/
                </p>
              </div>
            ) : (
              <>
                <h4 className="text-white font-medium text-sm truncate">
                  {playlist[currentTrack]?.title || 'No Track'}
                </h4>
                <p className="text-gray-400 text-xs">
                  {playlist[currentTrack]?.artist || 'Unknown Artist'}
                </p>
              </>
            )}
          </div>

          {/* Control buttons */}
          <div className="flex justify-center items-center space-x-4 mb-3">
            <button
              onClick={previousTrack}
              className="text-white hover:text-purple-400 transition-colors"
              title="Previous Track"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={togglePlay}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-2 transition-all duration-300"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            <button
              onClick={nextTrack}
              className="text-white hover:text-purple-400 transition-colors"
              title="Next Track"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414zm6 0a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L14.586 10l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Volume control */}
          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${
                  volume * 100
                }%, #4b5563 ${volume * 100}%, #4b5563 100%)`,
              }}
            />
          </div>

          {/* Track selector */}
          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-gray-400 text-xs mb-2">Playlist</p>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {playlist.map((track, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTrack(index);
                    if (isPlaying) {
                      setTimeout(() => {
                        audioRef.current?.play().catch(console.error);
                      }, 100);
                    }
                  }}
                  className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                    currentTrack === index
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="truncate">{track.title}</div>
                  <div className="text-gray-400 truncate">{track.artist}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Custom slider styles */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
        }

        .slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
