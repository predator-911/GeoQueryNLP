import React from 'react';
import Icon from '../../../components/AppIcon';

const PrivacyControls = ({ privacyMode, onPrivacyModeChange }) => {
  const privacyModes = [
    {
      id: 'exact',
      name: 'Exact',
      description: 'Precise location data',
      icon: 'Target',
      color: 'text-success'
    },
    {
      id: 'jittered',
      name: 'Jittered',
      description: 'Approximate locations with noise',
      icon: 'Shuffle',
      color: 'text-warning'
    },
    {
      id: 'cluster',
      name: 'Cluster Heatmap',
      description: 'Aggregated visualization',
      icon: 'Grid3x3',
      color: 'text-error'
    }
  ];

  return (
    <div className="bg-card/50 rounded-lg border border-border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Shield" size={18} className="text-primary" />
        <h3 className="font-semibold text-foreground">Privacy Controls</h3>
      </div>
      <div className="space-y-3">
        {privacyModes?.map((mode) => (
          <label
            key={mode?.id}
            className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer smooth-transition ${
              privacyMode === mode?.id
                ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <input
              type="radio"
              name="privacyMode"
              value={mode?.id}
              checked={privacyMode === mode?.id}
              onChange={(e) => onPrivacyModeChange(e?.target?.value)}
              className="sr-only"
            />
            
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              privacyMode === mode?.id ? 'bg-primary/20' : 'bg-muted'
            }`}>
              <Icon 
                name={mode?.icon} 
                size={16} 
                className={privacyMode === mode?.id ? mode?.color : 'text-muted-foreground'} 
              />
            </div>

            <div className="flex-1">
              <div className="font-medium text-foreground">{mode?.name}</div>
              <div className="text-sm text-muted-foreground">{mode?.description}</div>
            </div>

            <div className={`w-4 h-4 rounded-full border-2 ${
              privacyMode === mode?.id
                ? 'border-primary bg-primary' :'border-muted-foreground'
            }`}>
              {privacyMode === mode?.id && (
                <div className="w-2 h-2 bg-white rounded-full m-0.5" />
              )}
            </div>
          </label>
        ))}
      </div>
      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Current Mode:</strong> {privacyModes?.find(m => m?.id === privacyMode)?.name}
            <br />
            Privacy settings affect how location data is displayed on the map for enhanced user privacy.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControls;