import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const InteractiveHotspot = ({ 
  hotspot, 
  isVisible, 
  onExplore, 
  currentChapter, 
  interactionMode 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const { 
    id, 
    title, 
    description, 
    position, 
    type, 
    data, 
    actions, 
    interactive = true 
  } = hotspot;

  const getHotspotIcon = (type) => {
    switch (type) {
      case 'hospital': return 'Cross';
      case 'metro': return 'Train';
      case 'commercial': return 'Building2';
      case 'atm': return 'CreditCard';
      case 'buffer': return 'Circle';
      case 'heatmap': return 'TrendingUp';
      default: return 'MapPin';
    }
  };

  const getHotspotColor = (type) => {
    switch (type) {
      case 'hospital': return 'from-red-500 to-red-600';
      case 'metro': return 'from-blue-500 to-blue-600';
      case 'commercial': return 'from-yellow-500 to-yellow-600';
      case 'atm': return 'from-green-500 to-green-600';
      case 'buffer': return 'from-purple-500 to-purple-600';
      case 'heatmap': return 'from-orange-500 to-orange-600';
      default: return 'from-primary to-blue-500';
    }
  };

  const handleHotspotClick = () => {
    if (!interactive) return;
    
    if (actions && actions?.length > 0) {
      setShowDetails(true);
    } else {
      onExplore(hotspot);
    }
  };

  const handleActionClick = (action) => {
    setShowDetails(false);
    onExplore(hotspot, action?.action);
  };

  // Responsive positioning based on screen size
  const getResponsivePosition = () => {
    return {
      left: `${position?.x}%`,
      top: `${position?.y}%`,
      transform: 'translate(-50%, -50%)'
    };
  };

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          z: isHovered ? 10 : 0
        }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        className="fixed pointer-events-auto z-30 cursor-pointer"
        style={getResponsivePosition()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleHotspotClick}
      >
        {/* Main Hotspot Marker */}
        <div className="relative">
          {/* Pulsing Background */}
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${getHotspotColor(type)} -z-10`}
            style={{ padding: '8px' }}
          />
          
          {/* Interactive Marker */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r ${getHotspotColor(type)} flex items-center justify-center shadow-lg border-2 border-white/50 backdrop-blur-sm`}
          >
            <Icon 
              name={getHotspotIcon(type)} 
              size={20} 
              className="text-white" 
            />
          </motion.div>

          {/* Interaction Mode Indicator */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
          >
            <Icon 
              name={interactionMode === 'demo' ? 'Play' : interactionMode === 'learn' ? 'BookOpen' : 'MousePointer'} 
              size={12} 
              className="text-white" 
            />
          </motion.div>

          {/* Hover Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none"
              >
                <div className="bg-background/95 backdrop-blur-lg border border-border rounded-xl p-4 shadow-2xl min-w-64 max-w-80">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getHotspotColor(type)} flex items-center justify-center flex-shrink-0`}>
                      <Icon name={getHotspotIcon(type)} size={16} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-sm mb-1 truncate">
                        {title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {description}
                      </p>
                      
                      {data && data?.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {data?.slice(0, 4)?.map((item, index) => (
                            <div key={index} className="text-center">
                              <div className="flex items-center justify-center space-x-1">
                                {item?.icon && (
                                  <Icon name={item?.icon} size={12} className="text-primary" />
                                )}
                                <span className="text-xs font-semibold text-primary">
                                  {item?.value}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {item?.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/30">
                        <span className="text-xs text-muted-foreground capitalize">
                          {interactionMode} mode
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-primary">
                          <span>Click to explore</span>
                          <Icon name="ArrowRight" size={10} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      {/* Detailed Action Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e?.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${getHotspotColor(type)} flex items-center justify-center`}>
                    <Icon name={getHotspotIcon(type)} size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{title}</h3>
                    <p className="text-xs text-muted-foreground capitalize">{type} • {interactionMode} mode</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center smooth-transition"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {description}
              </p>
              
              {/* Data Stats */}
              {data && data?.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {data?.map((item, index) => (
                    <div key={index} className="bg-muted/30 rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        {item?.icon && (
                          <Icon name={item?.icon} size={16} className="text-primary" />
                        )}
                        <span className="text-lg font-bold text-primary">{item?.value}</span>
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">
                        {item?.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Interactive Actions */}
              {actions && actions?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Available Actions</h4>
                  {actions?.map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleActionClick(action)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/50 rounded-lg smooth-transition group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded bg-gradient-to-r ${getHotspotColor(type)} flex items-center justify-center`}>
                          <Icon name="Zap" size={12} className="text-white" />
                        </div>
                        <span className="text-sm font-medium text-foreground group-hover:text-primary smooth-transition">
                          {action?.label}
                        </span>
                      </div>
                      <Icon 
                        name="ArrowRight" 
                        size={16} 
                        className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 smooth-transition" 
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InteractiveHotspot;