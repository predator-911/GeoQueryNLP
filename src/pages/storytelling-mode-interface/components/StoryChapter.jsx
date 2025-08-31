import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StoryChapter = ({ 
  chapter, 
  isActive, 
  progress, 
  onChapterClick, 
  onInteractiveElement,
  interactionMode,
  chapterIndex,
  totalChapters
}) => {
  const { 
    id, 
    title, 
    subtitle, 
    description, 
    features, 
    stats, 
    interactiveElements, 
    color = "from-primary to-blue-500",
    icon = "Circle"
  } = chapter;

  const handleInteractiveClick = (action) => {
    onInteractiveElement?.(action);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ 
        opacity: isActive ? 1 : 0.2,
        y: isActive ? 0 : 50,
        scale: isActive ? 1 : 0.95,
        filter: isActive ? 'blur(0px)' : 'blur(2px)'
      }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`fixed inset-0 pointer-events-none ${isActive ? 'z-20' : 'z-10'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-4xl pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card/95 backdrop-blur-lg rounded-3xl p-6 sm:p-8 lg:p-10 border border-border/50 shadow-2xl"
            >
              {/* Chapter Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <motion.div
                      animate={{ rotate: isActive ? 360 : 0 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} p-3 mr-4`}
                    >
                      <Icon name={icon} size={24} className="text-white" />
                    </motion.div>
                    <div>
                      <span className="text-sm font-medium text-primary uppercase tracking-wider">
                        Chapter {id} of {totalChapters}
                      </span>
                      {subtitle && (
                        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                      )}
                    </div>
                  </div>
                  
                  <motion.h2 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {title}
                  </motion.h2>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-right"
                >
                  <div className="text-3xl font-bold text-primary">
                    {Math.round(progress)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Progress</div>
                </motion.div>
              </div>

              {/* Chapter Description */}
              <motion.p 
                className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {description}
              </motion.p>

              {/* Key Features */}
              {features && features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mb-6"
                >
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color}`} />
                        <span className="text-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Statistics */}
              {stats && stats.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0, 
                        scale: isActive ? 1 : 0.8 
                      }}
                      transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                      className="bg-muted/30 backdrop-blur-sm rounded-xl p-4 text-center border border-border/30 hover:border-primary/30 smooth-transition group cursor-pointer"
                    >
                      <div className="flex items-center justify-center mb-2">
                        {stat.icon && (
                          <Icon 
                            name={stat.icon} 
                            size={20} 
                            className={`text-gradient bg-gradient-to-r ${color} mr-2`}
                          />
                        )}
                        <div className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent group-hover:scale-110 smooth-transition`}>
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Interactive Elements */}
              {interactiveElements && interactiveElements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="space-y-3"
                >
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                    Interactive Elements
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {interactiveElements.map((element, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleInteractiveClick(element.action)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: isActive ? 1 : 0, 
                          scale: isActive ? 1 : 0.8 
                        }}
                        transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border border-border bg-gradient-to-r ${color} text-white hover:shadow-lg hover:shadow-primary/20 smooth-transition group`}
                      >
                        <Icon 
                          name={element.type === 'demo' ? 'Play' : element.type === 'learn' ? 'BookOpen' : 'Search'} 
                          size={16} 
                          className="group-hover:animate-pulse"
                        />
                        <span className="text-sm font-medium">{element.label}</span>
                        <Icon name="ArrowRight" size={12} className="group-hover:translate-x-1 smooth-transition" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Progress Bar */}
              <motion.div
                className="mt-8 pt-6 border-t border-border/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Chapter Progress</span>
                  <span className="text-xs text-primary font-medium">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? `${progress}%` : 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${color} rounded-full relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Navigation Hint */}
              <motion.div
                className="flex items-center justify-center space-x-4 mt-6 text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <div className="flex items-center space-x-1">
                  <Icon name="Mouse" size={12} />
                  <span>Scroll to continue</span>
                </div>
                <div className="w-px h-3 bg-border" />
                <button
                  onClick={() => onChapterClick(id)}
                  className="flex items-center space-x-1 hover:text-primary smooth-transition"
                >
                  <Icon name="RotateCcw" size={12} />
                  <span>Restart chapter</span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StoryChapter;
