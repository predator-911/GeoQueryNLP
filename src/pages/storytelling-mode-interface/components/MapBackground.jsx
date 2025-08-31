import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MapBackground = ({ 
  currentChapter, 
  scrollProgress, 
  isAutoPlay 
}) => {
  const mapRef = useRef(null);

  // Mock map camera positions for different chapters
  const cameraPositions = {
    1: { lat: 28.6139, lng: 77.2090, zoom: 10, pitch: 0, bearing: 0 },
    2: { lat: 28.6448, lng: 77.2167, zoom: 12, pitch: 30, bearing: 45 },
    3: { lat: 28.5355, lng: 77.3910, zoom: 13, pitch: 45, bearing: 90 },
    4: { lat: 28.6692, lng: 77.4538, zoom: 11, pitch: 60, bearing: 135 },
    5: { lat: 28.7041, lng: 77.1025, zoom: 14, pitch: 30, bearing: 180 }
  };

  useEffect(() => {
    // Simulate map camera animation based on current chapter
    const position = cameraPositions?.[currentChapter] || cameraPositions?.[1];
    
    if (mapRef?.current) {
      // Mock map update - in real implementation, this would update MapLibre GL JS
      mapRef.current.style.transform = `
        scale(${1 + scrollProgress * 0.1}) 
        rotate(${position?.bearing}deg)
      `;
    }
  }, [currentChapter, scrollProgress]);

  return (
    <div className="fixed inset-0 z-0">
      {/* Mock Map Container */}
      <div 
        ref={mapRef}
        className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 smooth-transition"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 70%)
          `
        }}
      >
        {/* Mock Delhi Ward Boundaries */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="ward-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ward-pattern)" />
        </svg>

        {/* Mock Data Points */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: currentChapter >= 2 ? 0.8 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Hospitals */}
          {Array.from({ length: 15 })?.map((_, i) => (
            <motion.div
              key={`hospital-${i}`}
              className="absolute w-2 h-2 bg-red-500 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`
              }}
              initial={{ scale: 0 }}
              animate={{ scale: currentChapter >= 2 ? 1 : 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: currentChapter >= 3 ? 0.8 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* ATMs */}
          {Array.from({ length: 25 })?.map((_, i) => (
            <motion.div
              key={`atm-${i}`}
              className="absolute w-1.5 h-1.5 bg-green-500 rounded-full"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`
              }}
              initial={{ scale: 0 }}
              animate={{ scale: currentChapter >= 3 ? 1 : 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: currentChapter >= 4 ? 0.8 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Metro Stations */}
          {Array.from({ length: 8 })?.map((_, i) => (
            <motion.div
              key={`metro-${i}`}
              className="absolute w-3 h-3 bg-blue-500 rounded-full border-2 border-white"
              style={{
                left: `${25 + Math.random() * 50}%`,
                top: `${25 + Math.random() * 50}%`
              }}
              initial={{ scale: 0 }}
              animate={{ scale: currentChapter >= 4 ? 1 : 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            />
          ))}
        </motion.div>

        {/* Animated Overlay Effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"
          animate={{ opacity: isAutoPlay ? 0.3 : 0.1 }}
          transition={{ duration: 2 }}
        />
      </div>
    </div>
  );
};

export default MapBackground;