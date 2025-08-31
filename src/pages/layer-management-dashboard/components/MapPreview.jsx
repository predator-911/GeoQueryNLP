import React, { useEffect, useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapPreview = ({ layers, privacyMode, settings }) => {
  const mapRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapStats, setMapStats] = useState({
    zoom: 12,
    center: [77.2090, 28.6139], // Delhi coordinates
    bearing: 0,
    pitch: 0
  });

  // Mock map initialization
  useEffect(() => {
    if (mapRef?.current) {
      // Simulate map initialization
      console.log('Map initialized with layers:', layers);
    }
  }, [layers]);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleResetView = () => {
    setMapStats({
      zoom: 12,
      center: [77.2090, 28.6139],
      bearing: 0,
      pitch: 0
    });
  };

  const getPrivacyModeInfo = () => {
    switch (privacyMode) {
      case 'exact':
        return { icon: 'Target', color: 'text-success', label: 'Exact Positioning' };
      case 'jittered':
        return { icon: 'Shuffle', color: 'text-warning', label: 'Jittered Locations' };
      case 'cluster':
        return { icon: 'Grid3x3', color: 'text-error', label: 'Cluster Heatmap' };
      default:
        return { icon: 'Target', color: 'text-success', label: 'Exact Positioning' };
    }
  };

  const privacyInfo = getPrivacyModeInfo();
  const visibleLayers = layers?.filter(layer => layer?.visible);

  return (
    <div className={`bg-card rounded-lg border border-border overflow-hidden ${
      isFullscreen ? 'fixed inset-4 z-50' : 'h-full'
    }`}>
      {/* Map Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
        <div className="flex items-center space-x-3">
          <Icon name="Map" size={20} className="text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Live Map Preview</h3>
            <p className="text-xs text-muted-foreground">
              {visibleLayers?.length} active layers • {privacyInfo?.label}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 px-2 py-1 bg-muted/50 rounded">
            <Icon name={privacyInfo?.icon} size={14} className={privacyInfo?.color} />
            <span className="text-xs text-muted-foreground">{privacyMode}</span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleResetView}
            title="Reset View"
          >
            <Icon name="RotateCcw" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={16} />
          </Button>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative flex-1 bg-slate-900" style={{ height: isFullscreen ? 'calc(100vh - 120px)' : '400px' }}>
        {/* Mock Map with Delhi */}
        <div ref={mapRef} className="w-full h-full relative overflow-hidden">
          {/* Mock Google Maps Embed for Delhi */}
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Delhi Map Preview"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=28.6139,77.2090&z=12&output=embed"
            className="border-0"
          />
          
          {/* Layer Overlays */}
          <div className="absolute inset-0 pointer-events-none">
            {visibleLayers?.map((layer, index) => (
              <div
                key={layer?.id}
                className="absolute inset-0"
                style={{
                  opacity: layer?.opacity,
                  zIndex: index + 1
                }}
              >
                {/* Mock layer visualization */}
                {layer?.type === 'hospitals' && layer?.visible && (
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                )}
                {layer?.type === 'atms' && layer?.visible && (
                  <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                )}
                {layer?.type === 'metro' && layer?.visible && (
                  <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/90 hover:bg-white text-slate-900"
          >
            <Icon name="Plus" size={16} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/90 hover:bg-white text-slate-900"
          >
            <Icon name="Minus" size={16} />
          </Button>
        </div>

        {/* Map Stats */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-xs font-mono">
          <div>Zoom: {mapStats?.zoom}</div>
          <div>Lat: {mapStats?.center?.[1]?.toFixed(4)}</div>
          <div>Lng: {mapStats?.center?.[0]?.toFixed(4)}</div>
        </div>

        {/* Performance Indicator */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs">Live Preview</span>
          </div>
        </div>
      </div>
      {/* Active Layers Summary */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Layers" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Active Layers:</span>
          </div>
          <div className="flex items-center space-x-2">
            {visibleLayers?.slice(0, 3)?.map((layer) => (
              <div
                key={layer?.id}
                className="flex items-center space-x-1 px-2 py-1 bg-card rounded text-xs"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: layer?.color }}
                />
                <span className="text-foreground">{layer?.name}</span>
              </div>
            ))}
            {visibleLayers?.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{visibleLayers?.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPreview;