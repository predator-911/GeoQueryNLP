import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const NavigationBar = ({ 
  onExitStoryMode, 
  currentChapter, 
  totalChapters, 
  interactionMode, 
  onInteractionModeChange 
}) => {
  
  const interactionModes = [
    { value: 'explore', label: 'Explore', icon: 'Search', color: 'text-blue-500' },
    { value: 'learn', label: 'Learn', icon: 'BookOpen', color: 'text-green-500' },
    { value: 'demo', label: 'Demo', icon: 'Play', color: 'text-purple-500' }
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo and Title */}
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-r from-primary to-blue-500 rounded-xl flex items-center justify-center cursor-pointer"
            >
              <Icon name="Globe" size={20} className="text-white" />
            </motion.div>
            
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                GeoQuery-NLP Stories
              </h1>
              <p className="text-xs text-muted-foreground">
                Interactive Geographic Narratives
              </p>
            </div>
          </div>

          {/* Center Section - Chapter Progress */}
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/30">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Icon name="BookOpen" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Chapter {currentChapter}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    of {totalChapters}
                  </span>
                </div>
                
                <div className="w-px h-4 bg-border" />
                
                <div className="flex items-center space-x-1">
                  <div className="w-20 bg-muted/30 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentChapter / totalChapters) * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Math.round((currentChapter / totalChapters) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Controls */}
          <div className="flex items-center space-x-3">
            {/* Interaction Mode Selector */}
            <div className="hidden md:flex items-center space-x-1 bg-card/50 backdrop-blur-sm rounded-full p-1 border border-border/30">
              {interactionModes?.map((mode) => (
                <motion.button
                  key={mode?.value}
                  onClick={() => onInteractionModeChange?.(mode?.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium smooth-transition ${
                    interactionMode === mode?.value
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={mode?.icon} size={14} />
                  <span className="hidden lg:inline">{mode?.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Mobile Interaction Mode */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-card/50 backdrop-blur-sm border border-border/30 rounded-full flex items-center justify-center smooth-transition hover:bg-muted/50"
              >
                <Icon 
                  name={interactionModes?.find(m => m?.value === interactionMode)?.icon || 'Search'} 
                  size={16} 
                  className="text-foreground" 
                />
              </motion.button>
            </div>

            {/* Settings/Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-card/50 backdrop-blur-sm border border-border/30 rounded-full flex items-center justify-center smooth-transition hover:bg-muted/50"
            >
              <Icon name="Settings" size={16} className="text-foreground" />
            </motion.button>

            {/* Exit Story Mode Button */}
            <motion.button
              onClick={onExitStoryMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-muted/50 hover:bg-muted/70 border border-border/30 rounded-full px-4 py-2 text-sm font-medium text-foreground smooth-transition"
            >
              <Icon name="ArrowLeft" size={14} />
              <span className="hidden sm:inline">Exit Stories</span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Chapter Info */}
        <div className="sm:hidden pb-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Chapter {currentChapter} of {totalChapters}
              </h2>
              <p className="text-xs text-muted-foreground">
                {interactionModes?.find(m => m?.value === interactionMode)?.label} Mode
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-primary">
                {Math.round((currentChapter / totalChapters) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
          
          <div className="w-full bg-muted/30 rounded-full h-2 mt-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentChapter / totalChapters) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavigationBar;