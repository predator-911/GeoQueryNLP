import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdvancedSettings = ({ 
  settings, 
  onSettingsChange, 
  onResetToDefaults, 
  onSavePreset, 
  onLoadPreset 
}) => {
  const handleAnimationSpeedChange = (e) => {
    onSettingsChange('animationSpeed', parseFloat(e?.target?.value));
  };

  const handleToggleSetting = (key) => {
    onSettingsChange(key, !settings?.[key]);
  };

  const presets = [
    { id: 'default', name: 'Default View', description: 'Standard layer configuration' },
    { id: 'minimal', name: 'Minimal', description: 'Essential layers only' },
    { id: 'detailed', name: 'Detailed', description: 'All layers with high opacity' },
    { id: 'performance', name: 'Performance', description: 'Optimized for speed' }
  ];

  return (
    <div className="bg-card/50 rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={18} className="text-primary" />
          <h3 className="font-semibold text-foreground">Advanced Settings</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onResetToDefaults}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset
        </Button>
      </div>
      <div className="space-y-4">
        {/* Animation Speed */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Animation Speed</label>
            <span className="text-xs text-muted-foreground">{settings?.animationSpeed}x</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={settings?.animationSpeed}
            onChange={handleAnimationSpeedChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </div>

        {/* Toggle Settings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">Auto-refresh Data</div>
              <div className="text-xs text-muted-foreground">Automatically update layer data</div>
            </div>
            <button
              onClick={() => handleToggleSetting('autoRefresh')}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                settings?.autoRefresh ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  settings?.autoRefresh ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">Smooth Transitions</div>
              <div className="text-xs text-muted-foreground">Enable smooth layer transitions</div>
            </div>
            <button
              onClick={() => handleToggleSetting('smoothTransitions')}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                settings?.smoothTransitions ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  settings?.smoothTransitions ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">Performance Mode</div>
              <div className="text-xs text-muted-foreground">Optimize for better performance</div>
            </div>
            <button
              onClick={() => handleToggleSetting('performanceMode')}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                settings?.performanceMode ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  settings?.performanceMode ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Layer Presets</h4>
          <div className="grid grid-cols-2 gap-2">
            {presets?.map((preset) => (
              <Button
                key={preset?.id}
                variant="outline"
                size="sm"
                onClick={() => onLoadPreset(preset?.id)}
                className="flex flex-col items-start p-3 h-auto"
              >
                <span className="font-medium text-xs">{preset?.name}</span>
                <span className="text-xs text-muted-foreground text-left">
                  {preset?.description}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Save Current Configuration */}
        <div className="pt-3 border-t border-border/50">
          <Button
            variant="default"
            size="sm"
            onClick={onSavePreset}
            iconName="Save"
            iconPosition="left"
            className="w-full"
          >
            Save Current as Preset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;