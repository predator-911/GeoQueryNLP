import React, { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultsMap = ({ 
  results, 
  selectedResults, 
  hoveredResult, 
  center, 
  onMapInteraction,
  showBufferZones = true,
  showConnectingLines = true 
}) => {
  const mapRef = useRef(null);

  // Mock map data for demonstration
  const mapCenter = center || { lat: 28.6139, lng: 77.2090 }; // Delhi center

  useEffect(() => {
    // In a real implementation, this would initialize MapLibre GL JS
    // For now, we'll use a Google Maps iframe as a placeholder
    console.log('Map would be initialized here with:', {
      results,
      selectedResults,
      hoveredResult,
      center: mapCenter
    });
  }, [results, selectedResults, hoveredResult, mapCenter]);

  const mapControls = [
    { icon: 'ZoomIn', action: 'zoomIn', tooltip: 'Zoom In' },
    { icon: 'ZoomOut', action: 'zoomOut', tooltip: 'Zoom Out' },
    { icon: 'RotateCcw', action: 'resetBearing', tooltip: 'Reset Bearing' },
    { icon: 'Maximize2', action: 'fitBounds', tooltip: 'Fit to Results' }
  ];

  const layerControls = [
    { 
      id: 'bufferZones', 
      label: 'Buffer Zones', 
      icon: 'Circle', 
      active: showBufferZones,
      color: 'text-blue-500'
    },
    { 
      id: 'connectingLines', 
      label: 'Connecting Lines', 
      icon: 'GitBranch', 
      active: showConnectingLines,
      color: 'text-green-500'
    },
    { 
      id: 'heatmap', 
      label: 'Density Heatmap', 
      icon: 'Thermometer', 
      active: false,
      color: 'text-red-500'
    }
  ];

  return (
    <div className="relative h-full bg-card rounded-lg border border-border overflow-hidden">
      {/* Map Container */}
      <div className="w-full h-full">
        <iframe
          ref={mapRef}
          width="100%"
          height="100%"
          loading="lazy"
          title="Query Results Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=12&output=embed`}
          className="border-0"
        />
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        {mapControls?.map((control) => (
          <Button
            key={control?.action}
            variant="outline"
            size="icon"
            onClick={() => onMapInteraction?.(control?.action)}
            className="bg-background/90 backdrop-blur-subtle hover-glow"
            title={control?.tooltip}
          >
            <Icon name={control?.icon} size={16} />
          </Button>
        ))}
      </div>
      {/* Layer Controls */}
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-subtle rounded-lg border border-border p-3">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Layers" size={16} className="mr-2" />
          Map Layers
        </h3>
        <div className="space-y-2">
          {layerControls?.map((layer) => (
            <div key={layer?.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={layer?.id}
                checked={layer?.active}
                onChange={() => onMapInteraction?.('toggleLayer', layer?.id)}
                className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
              />
              <label 
                htmlFor={layer?.id}
                className="flex items-center text-sm text-foreground cursor-pointer"
              >
                <Icon name={layer?.icon} size={14} className={`mr-2 ${layer?.color}`} />
                {layer?.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Results Summary */}
      <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-subtle rounded-lg border border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <Icon name="MapPin" size={16} className="mr-2 text-primary" />
              <span className="text-foreground font-medium">{results?.length}</span>
              <span className="text-muted-foreground ml-1">locations</span>
            </div>
            
            {selectedResults?.length > 0 && (
              <div className="flex items-center text-sm">
                <Icon name="CheckCircle" size={16} className="mr-2 text-success" />
                <span className="text-foreground font-medium">{selectedResults?.length}</span>
                <span className="text-muted-foreground ml-1">selected</span>
              </div>
            )}
            
            {hoveredResult && (
              <div className="flex items-center text-sm">
                <Icon name="MousePointer" size={16} className="mr-2 text-warning" />
                <span className="text-foreground font-medium truncate max-w-32">
                  {hoveredResult?.name}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMapInteraction?.('exportMap')}
              iconName="Camera"
              iconPosition="left"
            >
              Screenshot
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMapInteraction?.('shareMap')}
              iconName="Share"
              iconPosition="left"
            >
              Share
            </Button>
          </div>
        </div>
      </div>
      {/* Loading Overlay */}
      {results?.length === 0 && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-subtle flex items-center justify-center">
          <div className="text-center">
            <Icon name="Loader2" size={32} className="text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading map data...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsMap;