import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ControlBar = ({ onLayerToggle, onPrivacyModeChange, onMapStyleChange, layers, privacyMode, mapStyle }) => {
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [showStylePanel, setShowStylePanel] = useState(false);

  const privacyModes = [
    { id: 'exact', name: 'Exact', icon: 'Target', description: 'Show precise locations' },
    { id: 'jittered', name: 'Jittered', icon: 'Shuffle', description: 'Slightly offset locations' },
    { id: 'cluster', name: 'Cluster', icon: 'Grid3x3', description: 'Group nearby locations' }
  ];

  const mapStyles = [
    { id: 'dark', name: 'Dark', icon: 'Moon', description: 'Dark theme map' },
    { id: 'light', name: 'Light', icon: 'Sun', description: 'Light theme map' },
    { id: 'satellite', name: 'Satellite', icon: 'Satellite', description: 'Satellite imagery' },
    { id: 'terrain', name: 'Terrain', icon: 'Mountain', description: 'Topographic view' }
  ];

  const defaultLayers = [
    { id: 'wards', name: 'Delhi Wards', active: true, color: 'bg-blue-400' },
    { id: 'hospitals', name: 'Hospitals', active: true, color: 'bg-red-400' },
    { id: 'metro', name: 'Metro Stations', active: true, color: 'bg-blue-400' },
    { id: 'atms', name: 'ATMs', active: false, color: 'bg-green-400' },
    { id: 'police', name: 'Police Stations', active: false, color: 'bg-yellow-400' },
    { id: 'government', name: 'Govt Offices', active: false, color: 'bg-purple-400' }
  ];

  const layersToShow = layers || defaultLayers;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Layer Controls */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              iconName="Layers"
              iconPosition="left"
              onClick={() => setShowLayerPanel(!showLayerPanel)}
              className={showLayerPanel ? 'bg-primary/10 border-primary/50' : ''}
            >
              Layers ({layersToShow?.filter(l => l?.active)?.length})
            </Button>
            
            {showLayerPanel && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-border">
                  <h3 className="font-medium text-foreground">Map Layers</h3>
                  <p className="text-xs text-muted-foreground">Toggle data visibility</p>
                </div>
                <div className="p-2 space-y-1">
                  {layersToShow?.map((layer) => (
                    <div
                      key={layer?.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 smooth-transition"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${layer?.color}`}></div>
                        <span className="text-sm text-foreground">{layer?.name}</span>
                      </div>
                      <button
                        onClick={() => onLayerToggle && onLayerToggle(layer?.id)}
                        className={`w-10 h-5 rounded-full border-2 smooth-transition ${
                          layer?.active 
                            ? 'bg-primary border-primary' :'bg-muted border-border'
                        }`}
                      >
                        <div className={`w-3 h-3 bg-white rounded-full smooth-transition ${
                          layer?.active ? 'translate-x-5' : 'translate-x-0'
                        }`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Layers Indicators */}
          <div className="flex items-center space-x-2">
            {layersToShow?.filter(l => l?.active)?.slice(0, 3)?.map((layer) => (
              <div key={layer?.id} className="flex items-center space-x-1 px-2 py-1 bg-muted/20 rounded-md">
                <div className={`w-2 h-2 rounded-full ${layer?.color}`}></div>
                <span className="text-xs text-foreground">{layer?.name}</span>
              </div>
            ))}
            {layersToShow?.filter(l => l?.active)?.length > 3 && (
              <div className="px-2 py-1 bg-muted/20 rounded-md">
                <span className="text-xs text-muted-foreground">
                  +{layersToShow?.filter(l => l?.active)?.length - 3} more
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Center Section - Privacy Mode */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground mr-2">Privacy:</span>
          {privacyModes?.map((mode) => (
            <Button
              key={mode?.id}
              variant={privacyMode === mode?.id ? "default" : "ghost"}
              size="sm"
              iconName={mode?.icon}
              iconPosition="left"
              onClick={() => onPrivacyModeChange && onPrivacyModeChange(mode?.id)}
              title={mode?.description}
            >
              {mode?.name}
            </Button>
          ))}
        </div>

        {/* Right Section - Map Style & Tools */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              iconName="Palette"
              iconPosition="left"
              onClick={() => setShowStylePanel(!showStylePanel)}
              className={showStylePanel ? 'bg-primary/10 border-primary/50' : ''}
            >
              Style
            </Button>
            
            {showStylePanel && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-border">
                  <h3 className="font-medium text-foreground">Map Style</h3>
                </div>
                <div className="p-2 space-y-1">
                  {mapStyles?.map((style) => (
                    <button
                      key={style?.id}
                      onClick={() => {
                        onMapStyleChange && onMapStyleChange(style?.id);
                        setShowStylePanel(false);
                      }}
                      className={`w-full flex items-center space-x-3 p-2 rounded-lg smooth-transition ${
                        mapStyle === style?.id 
                          ? 'bg-primary/10 text-primary' :'hover:bg-muted/30 text-foreground'
                      }`}
                    >
                      <Icon name={style?.icon} size={16} />
                      <div className="text-left">
                        <p className="text-sm font-medium">{style?.name}</p>
                        <p className="text-xs opacity-70">{style?.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-border"></div>

          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            title="Reset View"
          >
            Reset
          </Button>

          <Button
            variant="ghost"
            size="sm"
            iconName="Maximize2"
            title="Fullscreen"
          >
            Fullscreen
          </Button>
        </div>
      </div>
      {/* Quick Stats Bar */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={14} className="text-primary" />
            <span className="text-muted-foreground">Delhi NCR</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Layers" size={14} className="text-primary" />
            <span className="text-muted-foreground">{layersToShow?.filter(l => l?.active)?.length} active layers</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={14} className="text-primary" />
            <span className="text-muted-foreground">Privacy: {privacyModes?.find(m => m?.id === privacyMode)?.name || 'Exact'}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Wifi" size={14} className="text-green-400" />
          <span>Online</span>
          <div className="w-px h-4 bg-border"></div>
          <Icon name="Clock" size={14} />
          <span>{new Date()?.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;