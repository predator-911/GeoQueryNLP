import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ 
  currentChapter, 
  totalChapters, 
  progress, 
  onChapterSelect,
  chapters,
  isAutoPlay
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredChapter, setHoveredChapter] = useState(null);

  const getChapterIcon = (chapter) => {
    return chapter?.icon || 'Circle';
  };

  const getChapterColor = (chapterId) => {
    if (chapterId < currentChapter) return 'text-green-500 bg-green-500/20';
    if (chapterId === currentChapter) return 'text-primary bg-primary/20';
    return 'text-muted-foreground bg-muted-foreground/20';
  };

  const handleChapterClick = (chapterId) => {
    onChapterSelect(chapterId);
    setIsExpanded(false);
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30"
    >
      <div className="bg-background/90 backdrop-blur-lg border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Expand/Collapse Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 flex items-center justify-center text-foreground hover:text-primary smooth-transition"
        >
          <Icon name={isExpanded ? 'ChevronRight' : 'ChevronLeft'} size={20} />
        </motion.button>

        {/* Progress Bar - Always Visible */}
        <div className="px-3 pb-3">
          <div className="w-2 bg-muted/30 rounded-full mx-auto relative" style={{ height: '200px' }}>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gradient-to-t from-primary to-blue-500 rounded-full relative overflow-hidden"
            >
              {/* Animated Glow Effect */}
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </motion.div>
            
            {/* Chapter Markers */}
            {chapters?.map((chapter, index) => {
              const position = ((index + 1) / totalChapters) * 100;
              return (
                <motion.div
                  key={chapter?.id}
                  className="absolute right-2 w-3 h-3 rounded-full border-2 border-background transform -translate-y-1/2"
                  style={{ top: `${100 - position}%` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <div 
                    className={`w-full h-full rounded-full smooth-transition cursor-pointer ${getChapterColor(chapter?.id)}`}
                    onClick={() => handleChapterClick(chapter?.id)}
                    onMouseEnter={() => setHoveredChapter(chapter)}
                    onMouseLeave={() => setHoveredChapter(null)}
                  />
                </motion.div>
              );
            })}
          </div>
          
          {/* Progress Text */}
          <div className="text-center mt-3">
            <div className="text-xs text-muted-foreground mb-1">Progress</div>
            <div className="text-lg font-bold text-primary">
              {Math.round(progress)}%
            </div>
            <div className="text-xs text-muted-foreground">
              {currentChapter}/{totalChapters}
            </div>
          </div>
        </div>

        {/* Expanded Chapter List */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="border-l border-border"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-foreground">Story Chapters</h3>
                  <div className="flex items-center space-x-1">
                    {isAutoPlay && (
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {currentChapter}/{totalChapters}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
                  {chapters?.map((chapter, index) => (
                    <motion.button
                      key={chapter?.id}
                      onClick={() => handleChapterClick(chapter?.id)}
                      onMouseEnter={() => setHoveredChapter(chapter)}
                      onMouseLeave={() => setHoveredChapter(null)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-3 rounded-lg smooth-transition border ${
                        chapter?.id === currentChapter
                          ? 'bg-primary/10 border-primary/30 text-primary'
                          : chapter?.id < currentChapter
                          ? 'bg-green-500/10 border-green-500/30 text-green-500' :'bg-muted/30 border-border/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          chapter?.id === currentChapter
                            ? 'bg-primary text-primary-foreground'
                            : chapter?.id < currentChapter
                            ? 'bg-green-500 text-white' :'bg-muted text-muted-foreground'
                        }`}>
                          <Icon 
                            name={chapter?.id < currentChapter ? 'Check' : getChapterIcon(chapter)} 
                            size={16} 
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm truncate">
                              {chapter?.title}
                            </h4>
                            <span className="text-xs opacity-75">
                              Ch {chapter?.id}
                            </span>
                          </div>
                          
                          {chapter?.subtitle && (
                            <p className="text-xs opacity-75 truncate">
                              {chapter?.subtitle}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-1">
                              {chapter?.features?.slice(0, 2)?.map((feature, idx) => (
                                <span key={idx} className="text-xs bg-background/50 px-1.5 py-0.5 rounded truncate">
                                  {feature}
                                </span>
                              ))}
                              {chapter?.features?.length > 2 && (
                                <span className="text-xs opacity-75">
                                  +{chapter?.features?.length - 2}
                                </span>
                              )}
                            </div>
                            
                            {chapter?.id === currentChapter && (
                              <div className="text-xs font-bold">
                                {Math.round((currentChapter / totalChapters) * 100)}%
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                {/* Quick Actions */}
                <div className="mt-4 pt-3 border-t border-border/30">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleChapterClick(1)}
                      className="flex items-center justify-center space-x-1 p-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-xs smooth-transition"
                    >
                      <Icon name="RotateCcw" size={12} />
                      <span>Restart</span>
                    </button>
                    <button
                      onClick={() => handleChapterClick(totalChapters)}
                      className="flex items-center justify-center space-x-1 p-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-xs smooth-transition"
                    >
                      <Icon name="FastForward" size={12} />
                      <span>Skip to End</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover Tooltip for Chapter Markers */}
        <AnimatePresence>
          {hoveredChapter && !isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 pointer-events-none"
            >
              <div className="bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-2xl p-3 min-w-48">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    hoveredChapter?.id === currentChapter
                      ? 'bg-primary text-primary-foreground'
                      : hoveredChapter?.id < currentChapter
                      ? 'bg-green-500 text-white' :'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={getChapterIcon(hoveredChapter)} size={14} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">
                      {hoveredChapter?.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Chapter {hoveredChapter?.id}
                    </p>
                  </div>
                </div>
                
                {hoveredChapter?.subtitle && (
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {hoveredChapter?.subtitle}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {hoveredChapter?.features?.length || 0} features
                  </span>
                  <span className={`font-medium ${
                    hoveredChapter?.id === currentChapter
                      ? 'text-primary'
                      : hoveredChapter?.id < currentChapter
                      ? 'text-green-500' :'text-muted-foreground'
                  }`}>
                    {hoveredChapter?.id < currentChapter 
                      ? 'Completed' 
                      : hoveredChapter?.id === currentChapter 
                      ? 'Active' :'Upcoming'
                    }
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProgressIndicator;