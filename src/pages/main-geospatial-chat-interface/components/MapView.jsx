import React, { useRef, useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const MapView = ({ queryResults, selectedLocation, onLocationHover, mapStyle, layers }) => {
  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentView, setCurrentView] = useState({
    center: [77.2090, 28.6139], // Delhi center
    zoom: 10,
    pitch: 0,
    bearing: 0
  });

  // Mock map data for demonstration
  const mockLocations = [
    {
      id: 1,
      name: "All India Institute of Medical Sciences",
      type: "hospital",
      coordinates: [77.2090, 28.5672],
      address: "Ansari Nagar, New Delhi",
      distance: "2.3 km"
    },
    {
      id: 2,
      name: "Connaught Place Metro Station",
      type: "metro",
      coordinates: [77.2167, 28.6315],
      address: "Connaught Place, New Delhi",
      distance: "1.8 km"
    },
    {
      id: 3,
      name: "State Bank of India ATM",
      type: "atm",
      coordinates: [77.2245, 28.6289],
      address: "Janpath, New Delhi",
      distance: "0.5 km"
    }
  ];

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (queryResults && queryResults?.length > 0) {
      // Simulate fly-to animation when new results arrive
      const firstResult = queryResults?.[0];
      setCurrentView(prev => ({
        ...prev,
        center: firstResult?.coordinates || [77.2090, 28.6139],
        zoom: 14,
        pitch: 45
      }));
    }
  }, [queryResults]);

  const handleLocationClick = (location) => {
    onLocationHover(location);
    setCurrentView(prev => ({
      ...prev,
      center: location?.coordinates,
      zoom: 16,
      pitch: 60
    }));
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'hospital': return 'Cross';
      case 'metro': return 'Train';
      case 'atm': return 'CreditCard';
      case 'police': return 'Shield';
      case 'government': return 'Building';
      default: return 'MapPin';
    }
  };

  const getLocationColor = (type) => {
    switch (type) {
      case 'hospital': return 'text-red-400';
      case 'metro': return 'text-blue-400';
      case 'atm': return 'text-green-400';
      case 'police': return 'text-yellow-400';
      case 'government': return 'text-purple-400';
      default: return 'text-primary';
    }
  };

  return (
    <div className="h-full relative bg-card rounded-lg border border-border overflow-hidden">
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full relative">
        {!mapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Icon name="Map" size={32} className="text-primary" />
              </div>
              <p className="text-muted-foreground">Loading 3D Map...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
              {/* Grid Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: `
                    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}></div>
              </div>

              {/* Mock Delhi Boundary */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 border-2 border-primary/30 rounded-lg transform rotate-12 animate-pulse"></div>
              </div>

              {/* Location Markers */}
              {mockLocations?.map((location) => (
                <div
                  key={location?.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `${45 + Math.random() * 30}%`,
                    top: `${35 + Math.random() * 30}%`
                  }}
                  onClick={() => handleLocationClick(location)}
                >
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full bg-background border-2 border-current ${getLocationColor(location?.type)} flex items-center justify-center group-hover:scale-125 smooth-transition hover-glow`}>
                      <Icon name={getLocationIcon(location?.type)} size={16} />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 smooth-transition pointer-events-none">
                      <div className="bg-background border border-border rounded-lg p-2 shadow-lg min-w-48">
                        <p className="font-medium text-foreground text-sm">{location?.name}</p>
                        <p className="text-muted-foreground text-xs">{location?.address}</p>
                        <p className="text-primary text-xs mt-1">{location?.distance}</p>
                      </div>
                    </div>

                    {/* Pulse Animation */}
                    <div className={`absolute inset-0 rounded-full border-2 border-current ${getLocationColor(location?.type)} animate-ping opacity-30`}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* 3D Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none"></div>
          </>
        )}
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="w-10 h-10 bg-background/90 backdrop-blur-subtle border border-border rounded-lg flex items-center justify-center hover:bg-muted/50 smooth-transition hover-glow">
          <Icon name="Plus" size={18} className="text-foreground" />
        </button>
        <button className="w-10 h-10 bg-background/90 backdrop-blur-subtle border border-border rounded-lg flex items-center justify-center hover:bg-muted/50 smooth-transition hover-glow">
          <Icon name="Minus" size={18} className="text-foreground" />
        </button>
        <button className="w-10 h-10 bg-background/90 backdrop-blur-subtle border border-border rounded-lg flex items-center justify-center hover:bg-muted/50 smooth-transition hover-glow">
          <Icon name="RotateCcw" size={18} className="text-foreground" />
        </button>
        <button className="w-10 h-10 bg-background/90 backdrop-blur-subtle border border-border rounded-lg flex items-center justify-center hover:bg-muted/50 smooth-transition hover-glow">
          <Icon name="Compass" size={18} className="text-foreground" />
        </button>
      </div>
      {/* Current View Info */}
      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-subtle border border-border rounded-lg p-3">
        <div className="flex items-center space-x-3 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} className="text-primary" />
            <span className="text-muted-foreground">Delhi</span>
          </div>
          <div className="w-px h-4 bg-border"></div>
          <div className="flex items-center space-x-1">
            <Icon name="Zap" size={14} className="text-primary" />
            <span className="text-muted-foreground">Zoom: {currentView?.zoom}</span>
          </div>
          <div className="w-px h-4 bg-border"></div>
          <div className="flex items-center space-x-1">
            <Icon name="RotateCw" size={14} className="text-primary" />
            <span className="text-muted-foreground">3D View</span>
          </div>
        </div>
      </div>
      {/* Layer Indicators */}
      {layers && layers?.length > 0 && (
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {layers?.map((layer, index) => (
            <div key={index} className="bg-background/90 backdrop-blur-subtle border border-border rounded-lg px-3 py-1">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${layer?.active ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
                <span className="text-xs text-foreground">{layer?.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapView;