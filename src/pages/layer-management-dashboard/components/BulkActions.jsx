import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  layers, 
  onBulkToggle, 
  onBulkOpacity, 
  onBulkReset, 
  onExportConfig, 
  onImportConfig 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [bulkOpacity, setBulkOpacity] = useState(1);

  const visibleLayers = layers?.filter(layer => layer?.visible)?.length;
  const totalLayers = layers?.length;

  const handleBulkOpacityChange = (e) => {
    const value = parseFloat(e?.target?.value);
    setBulkOpacity(value);
    onBulkOpacity(value);
  };

  const handleFileImport = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const config = JSON.parse(event?.target?.result);
          onImportConfig(config);
        } catch (error) {
          console.error('Invalid configuration file:', error);
        }
      };
      reader?.readAsText(file);
    }
  };

  return (
    <div className="bg-card/50 rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Settings2" size={18} className="text-primary" />
          <h3 className="font-semibold text-foreground">Bulk Actions</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-6 h-6"
        >
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>

      {/* Layer Status Summary */}
      <div className="flex items-center justify-between mb-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={16} className="text-primary" />
          <span className="text-sm text-foreground">Visible Layers</span>
        </div>
        <span className="text-sm font-medium text-foreground">
          {visibleLayers} / {totalLayers}
        </span>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onBulkToggle(true)}
          iconName="Eye"
          iconPosition="left"
        >
          Show All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onBulkToggle(false)}
          iconName="EyeOff"
          iconPosition="left"
        >
          Hide All
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-border/50">
          {/* Bulk Opacity Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Bulk Opacity</label>
              <span className="text-xs text-muted-foreground">{Math.round(bulkOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={bulkOpacity}
              onChange={handleBulkOpacityChange}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Configuration Management */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Configuration</h4>
            
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onExportConfig}
                iconName="Download"
                iconPosition="left"
              >
                Export Configuration
              </Button>
              
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Upload"
                  iconPosition="left"
                  className="w-full pointer-events-none"
                >
                  Import Configuration
                </Button>
              </div>
            </div>
          </div>

          {/* Reset Options */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Reset Options</h4>
            
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkReset('visibility')}
                iconName="Eye"
                iconPosition="left"
              >
                Reset Visibility
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkReset('opacity')}
                iconName="Palette"
                iconPosition="left"
              >
                Reset Opacity
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkReset('colors')}
                iconName="Paintbrush"
                iconPosition="left"
              >
                Reset Colors
              </Button>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onBulkReset('all')}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Reset All Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;