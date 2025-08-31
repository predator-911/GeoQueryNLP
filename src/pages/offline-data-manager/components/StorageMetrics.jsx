import React from 'react';
import Icon from '../../../components/AppIcon';

const StorageMetrics = ({ metrics }) => {
  const getUsagePercentage = () => {
    return (metrics?.usedStorage / metrics?.totalStorage) * 100;
  };

  const formatStorage = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getUsageColor = () => {
    const percentage = getUsagePercentage();
    if (percentage > 80) return 'text-error';
    if (percentage > 60) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
          <Icon name="HardDrive" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Storage Usage</h3>
          <p className="text-sm text-muted-foreground">Local data storage metrics</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Storage Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Used Storage</span>
            <span className={`text-sm font-medium ${getUsageColor()}`}>
              {getUsagePercentage()?.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div 
              className={`h-2 rounded-full smooth-transition ${
                getUsagePercentage() > 80 ? 'bg-error' : 
                getUsagePercentage() > 60 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${getUsagePercentage()}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>{formatStorage(metrics?.usedStorage)} used</span>
            <span>{formatStorage(metrics?.totalStorage)} total</span>
          </div>
        </div>

        {/* Storage Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Map" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">GeoJSON Data</span>
            </div>
            <div className="text-lg font-semibold text-foreground">
              {formatStorage(metrics?.geoJsonStorage)}
            </div>
            <div className="text-xs text-muted-foreground">
              {metrics?.geoJsonFiles} files
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Database" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-foreground">Cache Data</span>
            </div>
            <div className="text-lg font-semibold text-foreground">
              {formatStorage(metrics?.cacheStorage)}
            </div>
            <div className="text-xs text-muted-foreground">
              {metrics?.cacheEntries} entries
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MessageSquare" size={16} className="text-accent" />
              <span className="text-sm font-medium text-foreground">Query History</span>
            </div>
            <div className="text-lg font-semibold text-foreground">
              {formatStorage(metrics?.historyStorage)}
            </div>
            <div className="text-xs text-muted-foreground">
              {metrics?.historyEntries} queries
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Settings" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Settings</span>
            </div>
            <div className="text-lg font-semibold text-foreground">
              {formatStorage(metrics?.settingsStorage)}
            </div>
            <div className="text-xs text-muted-foreground">
              Configuration
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Last cleanup: {metrics?.lastCleanup}
          </div>
          <div className="text-sm text-muted-foreground">
            Available: {formatStorage(metrics?.totalStorage - metrics?.usedStorage)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageMetrics;