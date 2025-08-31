import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LayerTreeItem = ({ 
  layer, 
  onToggleVisibility, 
  onOpacityChange, 
  onColorChange, 
  onExtrusionChange,
  isExpanded,
  onToggleExpanded 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleOpacityChange = (e) => {
    onOpacityChange(layer?.id, parseFloat(e?.target?.value));
  };

  const handleExtrusionChange = (e) => {
    onExtrusionChange(layer?.id, parseInt(e?.target?.value));
  };

  const getLayerIcon = (type) => {
    switch (type) {
      case 'hospitals': return 'Heart';
      case 'atms': return 'CreditCard';
      case 'metro': return 'Train';
      case 'wards': return 'Map';
      case 'custom': return 'Layers';
      default: return 'Circle';
    }
  };

  return (
    <div className="border border-border rounded-lg bg-card/50 mb-2">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleExpanded(layer?.id)}
            className="w-6 h-6"
          >
            <Icon 
              name={isExpanded ? "ChevronDown" : "ChevronRight"} 
              size={16} 
            />
          </Button>
          
          <div className="flex items-center space-x-2">
            <Icon 
              name={getLayerIcon(layer?.type)} 
              size={18} 
              className={layer?.visible ? "text-primary" : "text-muted-foreground"} 
            />
            <span className={`font-medium ${layer?.visible ? "text-foreground" : "text-muted-foreground"}`}>
              {layer?.name}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            {layer?.count} items
          </span>
          <button
            onClick={() => onToggleVisibility(layer?.id)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
              layer?.visible ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                layer?.visible ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="px-3 pb-3 space-y-3 border-t border-border/50 pt-3">
          {/* Opacity Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Opacity</label>
              <span className="text-xs text-muted-foreground">{Math.round(layer?.opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={layer?.opacity}
              onChange={handleOpacityChange}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              disabled={!layer?.visible}
            />
          </div>

          {/* Color Control */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={layer?.color}
                onChange={(e) => onColorChange(layer?.id, e?.target?.value)}
                className="w-8 h-8 rounded border border-border cursor-pointer"
                disabled={!layer?.visible}
              />
              <span className="text-xs text-muted-foreground font-mono">
                {layer?.color}
              </span>
            </div>
          </div>

          {/* 3D Extrusion Control */}
          {layer?.supports3D && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">3D Height</label>
                <span className="text-xs text-muted-foreground">{layer?.extrusionHeight}m</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={layer?.extrusionHeight}
                onChange={handleExtrusionChange}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                disabled={!layer?.visible}
              />
            </div>
          )}

          {/* Advanced Settings Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full justify-between"
          >
            <span>Advanced Settings</span>
            <Icon name={showAdvanced ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>

          {showAdvanced && (
            <div className="space-y-3 pt-2 border-t border-border/50">
              <div className="flex items-center justify-between">
                <label className="text-sm text-foreground">Hover Effects</label>
                <button
                  onClick={() => {/* Toggle hover effects */}}
                  className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                    layer?.hoverEnabled ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform ${
                      layer?.hoverEnabled ? 'translate-x-4' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-foreground">Click Interactions</label>
                <button
                  onClick={() => {/* Toggle click interactions */}}
                  className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                    layer?.clickEnabled ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform ${
                      layer?.clickEnabled ? 'translate-x-4' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LayerTreeItem;