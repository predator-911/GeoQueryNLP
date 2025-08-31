import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AutoPlayControls = ({ 
  isAutoPlay, 
  onToggleAutoPlay, 
  speed, 
  onSpeedChange,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  currentChapter,
  totalChapters
}) => {
  const [showSpeedControls, setShowSpeedControls] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const speedOptions = [
    { value: 0.5, label: '0.5x', icon: 'ChevronDown' },
    { value: 1, label: '1x', icon: 'Play' },
    { value: 1.5, label: '1.5x', icon: 'ChevronUp' },
    { value: 2, label: '2x', icon: 'FastForward' }
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (showSpeedControls) {
      setShowSpeedControls(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30"
    >
      <div className="bg-background/90 backdrop-blur-lg border border-border rounded-full shadow-2xl">
        <div className="flex items-center">
          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleExpanded}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 flex items-center justify-center text-foreground hover:text-primary smooth-transition"
            >
              <Icon name={isExpanded ? 'ChevronDown' : 'ChevronUp'} size={20} />
            </motion.button>
          </div>

          {/* Desktop Controls - Always Visible */}
          <div className="hidden md:flex items-center px-2">
            {/* Previous Chapter */}
            <motion.button
              onClick={onPrevious}
              disabled={!canGoPrevious}
              whileHover={{ scale: canGoPrevious ? 1.05 : 1 }}
              whileTap={{ scale: canGoPrevious ? 0.95 : 1 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center smooth-transition ${
                canGoPrevious 
                  ? 'text-foreground hover:text-primary hover:bg-muted/50' 
                  : 'text-muted-foreground/50 cursor-not-allowed'
              }`}
            >
              <Icon name="ChevronLeft" size={18} />
            </motion.button>

            {/* Play/Pause Button */}
            <motion.button
              onClick={onToggleAutoPlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center mx-2 smooth-transition ${
                isAutoPlay
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={isAutoPlay ? 'Pause' : 'Play'} size={20} />
            </motion.button>

            {/* Next Chapter */}
            <motion.button
              onClick={onNext}
              disabled={!canGoNext}
              whileHover={{ scale: canGoNext ? 1.05 : 1 }}
              whileTap={{ scale: canGoNext ? 0.95 : 1 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center smooth-transition ${
                canGoNext 
                  ? 'text-foreground hover:text-primary hover:bg-muted/50' 
                  : 'text-muted-foreground/50 cursor-not-allowed'
              }`}
            >
              <Icon name="ChevronRight" size={18} />
            </motion.button>

            {/* Speed Control */}
            <div className="relative ml-2">
              <motion.button
                onClick={() => setShowSpeedControls(!showSpeedControls)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:text-primary hover:bg-muted/50 smooth-transition"
              >
                <span className="text-xs font-medium">
                  {speed}x
                </span>
              </motion.button>

              <AnimatePresence>
                {showSpeedControls && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2"
                  >
                    <div className="bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-2xl p-2">
                      {speedOptions?.map((option) => (
                        <motion.button
                          key={option?.value}
                          onClick={() => {
                            onSpeedChange(option?.value);
                            setShowSpeedControls(false);
                          }}
                          whileHover={{ scale: 1.05, x: 2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md smooth-transition ${
                            speed === option?.value
                              ? 'bg-primary text-primary-foreground'
                              : 'text-foreground hover:bg-muted/50'
                          }`}
                        >
                          <Icon name={option?.icon} size={14} />
                          <span className="text-sm font-medium">{option?.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Chapter Info */}
            <div className="ml-4 pl-4 border-l border-border">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Chapter</div>
                <div className="text-sm font-bold text-primary">
                  {currentChapter}/{totalChapters}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Expanded Controls */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="md:hidden flex items-center px-2"
              >
                {/* Previous */}
                <motion.button
                  onClick={onPrevious}
                  disabled={!canGoPrevious}
                  whileHover={{ scale: canGoPrevious ? 1.05 : 1 }}
                  whileTap={{ scale: canGoPrevious ? 0.95 : 1 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center smooth-transition ${
                    canGoPrevious 
                      ? 'text-foreground hover:text-primary' 
                      : 'text-muted-foreground/50'
                  }`}
                >
                  <Icon name="ChevronLeft" size={16} />
                </motion.button>

                {/* Play/Pause */}
                <motion.button
                  onClick={onToggleAutoPlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center mx-2 smooth-transition ${
                    isAutoPlay
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <Icon name={isAutoPlay ? 'Pause' : 'Play'} size={18} />
                </motion.button>

                {/* Next */}
                <motion.button
                  onClick={onNext}
                  disabled={!canGoNext}
                  whileHover={{ scale: canGoNext ? 1.05 : 1 }}
                  whileTap={{ scale: canGoNext ? 0.95 : 1 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center smooth-transition ${
                    canGoNext 
                      ? 'text-foreground hover:text-primary' 
                      : 'text-muted-foreground/50'
                  }`}
                >
                  <Icon name="ChevronRight" size={16} />
                </motion.button>

                {/* Speed */}
                <div className="relative ml-1">
                  <motion.button
                    onClick={() => setShowSpeedControls(!showSpeedControls)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-foreground hover:text-primary smooth-transition"
                  >
                    <span className="text-xs font-bold">{speed}x</span>
                  </motion.button>

                  <AnimatePresence>
                    {showSpeedControls && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2"
                      >
                        <div className="bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-2xl p-1">
                          {speedOptions?.map((option) => (
                            <motion.button
                              key={option?.value}
                              onClick={() => {
                                onSpeedChange(option?.value);
                                setShowSpeedControls(false);
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`flex items-center justify-center w-10 h-8 rounded-md smooth-transition ${
                                speed === option?.value
                                  ? 'bg-primary text-primary-foreground'
                                  : 'text-foreground hover:bg-muted/50'
                              }`}
                            >
                              <span className="text-xs font-medium">{option?.label}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Chapter Info */}
                <div className="ml-2 pl-2 border-l border-border">
                  <div className="text-xs text-center">
                    <div className="text-muted-foreground">Ch</div>
                    <div className="font-bold text-primary text-sm">
                      {currentChapter}/{totalChapters}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Status Indicator */}
      <AnimatePresence>
        {isAutoPlay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2"
          >
            <div className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span>Auto-playing at {speed}x speed</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AutoPlayControls;