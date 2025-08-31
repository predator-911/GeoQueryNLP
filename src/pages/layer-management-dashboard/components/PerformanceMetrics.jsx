import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ metrics }) => {
  const getPerformanceColor = (value, thresholds) => {
    if (value <= thresholds?.good) return 'text-success';
    if (value <= thresholds?.warning) return 'text-warning';
    return 'text-error';
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card/50 rounded-lg border border-border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Activity" size={18} className="text-primary" />
        <h3 className="font-semibold text-foreground">Performance Metrics</h3>
      </div>
      <div className="space-y-4">
        {/* Active Layers */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Layers" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Active Layers</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${getPerformanceColor(metrics?.activeLayers, { good: 5, warning: 10 })}`}>
              {metrics?.activeLayers}
            </span>
            <span className="text-xs text-muted-foreground">/ {metrics?.totalLayers}</span>
          </div>
        </div>

        {/* Render Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Render Time</span>
          </div>
          <span className={`text-sm font-medium ${getPerformanceColor(metrics?.renderTime, { good: 16, warning: 33 })}`}>
            {metrics?.renderTime}ms
          </span>
        </div>

        {/* Memory Usage */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="HardDrive" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Memory Usage</span>
          </div>
          <span className={`text-sm font-medium ${getPerformanceColor(metrics?.memoryUsage, { good: 50, warning: 100 })}`}>
            {formatBytes(metrics?.memoryUsage * 1024 * 1024)}
          </span>
        </div>

        {/* Data Points */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Database" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Data Points</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            {metrics?.dataPoints?.toLocaleString('en-IN')}
          </span>
        </div>

        {/* FPS */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Frame Rate</span>
          </div>
          <span className={`text-sm font-medium ${getPerformanceColor(60 - metrics?.fps, { good: 10, warning: 30 })}`}>
            {metrics?.fps} FPS
          </span>
        </div>

        {/* Performance Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Overall Performance</span>
            <span className="text-xs text-muted-foreground">{metrics?.overallScore}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                metrics?.overallScore >= 80
                  ? 'bg-success'
                  : metrics?.overallScore >= 60
                  ? 'bg-warning' :'bg-error'
              }`}
              style={{ width: `${metrics?.overallScore}%` }}
            />
          </div>
        </div>

        {/* Last Updated */}
        <div className="pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Last updated</span>
            <span>{new Date(metrics.lastUpdated)?.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;