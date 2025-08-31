import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CacheManagement = ({ 
  cacheData, 
  onClearCache, 
  onRefreshCache, 
  onPreloadData 
}) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getCacheHealthColor = (health) => {
    switch (health) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'fair': return 'text-warning';
      case 'poor': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Cache Overview */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Icon name="Database" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Cache Overview</h3>
            <p className="text-sm text-muted-foreground">Local data cache status</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {cacheData?.totalEntries?.toLocaleString('en-IN')}
            </div>
            <div className="text-sm text-muted-foreground">Total Entries</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {formatFileSize(cacheData?.totalSize)}
            </div>
            <div className="text-sm text-muted-foreground">Cache Size</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {cacheData?.hitRate}%
            </div>
            <div className="text-sm text-muted-foreground">Hit Rate</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className={`text-2xl font-bold mb-1 ${getCacheHealthColor(cacheData?.health)}`}>
              {cacheData?.health}
            </div>
            <div className="text-sm text-muted-foreground">Health</div>
          </div>
        </div>
      </div>
      {/* Cache Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cacheData?.categories?.map((category, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Icon name={category?.icon} size={20} className="text-primary" />
                <div>
                  <h4 className="font-semibold text-foreground">{category?.name}</h4>
                  <p className="text-sm text-muted-foreground">{category?.description}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onClearCache(category?.id)}
                iconName="Trash2"
                iconPosition="left"
              >
                Clear
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Entries</span>
                <span className="text-sm font-medium text-foreground">
                  {category?.entries?.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Size</span>
                <span className="text-sm font-medium text-foreground">
                  {formatFileSize(category?.size)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <span className="text-sm font-medium text-foreground">
                  {category?.lastUpdated}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Hit Rate</span>
                <span className={`text-sm font-medium ${
                  category?.hitRate > 80 ? 'text-success' : 
                  category?.hitRate > 60 ? 'text-warning' : 'text-error'
                }`}>
                  {category?.hitRate}%
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRefreshCache(category?.id)}
                iconName="RefreshCw"
                iconPosition="left"
                fullWidth
              >
                Refresh Cache
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Preload Management */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Download" size={20} className="text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Preload Management</h3>
            <p className="text-sm text-muted-foreground">Configure data preloading for better performance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-foreground mb-3">Popular Queries</h4>
            <div className="space-y-2">
              {cacheData?.popularQueries?.map((query, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-foreground">{query?.text}</div>
                    <div className="text-xs text-muted-foreground">{query?.count} queries</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPreloadData(query?.id)}
                    iconName="Download"
                  >
                    Preload
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-3">Preload Settings</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-foreground">Auto Preload</div>
                  <div className="text-xs text-muted-foreground">Automatically preload popular data</div>
                </div>
                <Button
                  variant={cacheData?.settings?.autoPreload ? "default" : "outline"}
                  size="sm"
                  iconName={cacheData?.settings?.autoPreload ? "ToggleRight" : "ToggleLeft"}
                >
                  {cacheData?.settings?.autoPreload ? 'On' : 'Off'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-foreground">Background Sync</div>
                  <div className="text-xs text-muted-foreground">Sync data in background</div>
                </div>
                <Button
                  variant={cacheData?.settings?.backgroundSync ? "default" : "outline"}
                  size="sm"
                  iconName={cacheData?.settings?.backgroundSync ? "ToggleRight" : "ToggleLeft"}
                >
                  {cacheData?.settings?.backgroundSync ? 'On' : 'Off'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-foreground">Smart Cleanup</div>
                  <div className="text-xs text-muted-foreground">Auto remove old cache entries</div>
                </div>
                <Button
                  variant={cacheData?.settings?.smartCleanup ? "default" : "outline"}
                  size="sm"
                  iconName={cacheData?.settings?.smartCleanup ? "ToggleRight" : "ToggleLeft"}
                >
                  {cacheData?.settings?.smartCleanup ? 'On' : 'Off'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="destructive"
          onClick={() => onClearCache('all')}
          iconName="Trash2"
          iconPosition="left"
        >
          Clear All Cache
        </Button>
        <Button
          variant="outline"
          onClick={() => onRefreshCache('all')}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh All
        </Button>
        <Button
          variant="secondary"
          onClick={() => onPreloadData('popular')}
          iconName="Download"
          iconPosition="left"
        >
          Preload Popular
        </Button>
      </div>
    </div>
  );
};

export default CacheManagement;