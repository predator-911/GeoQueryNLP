import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformancePanel = ({ 
  performance, 
  onOptimize, 
  onUpdateSettings 
}) => {
  const getPerformanceColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getPerformanceIcon = (score) => {
    if (score >= 80) return 'Zap';
    if (score >= 60) return 'AlertTriangle';
    return 'AlertCircle';
  };

  return (
    <div className="space-y-6">
      {/* Performance Score */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Icon 
                name={getPerformanceIcon(performance?.overallScore)} 
                size={20} 
                className={getPerformanceColor(performance?.overallScore)} 
              />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Performance Score</h3>
              <p className="text-sm text-muted-foreground">Overall system performance</p>
            </div>
          </div>
          <div className={`text-2xl font-bold ${getPerformanceColor(performance?.overallScore)}`}>
            {performance?.overallScore}/100
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className={`text-lg font-semibold ${getPerformanceColor(performance?.renderingScore)}`}>
              {performance?.renderingScore}
            </div>
            <div className="text-sm text-muted-foreground">Rendering</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-semibold ${getPerformanceColor(performance?.memoryScore)}`}>
              {performance?.memoryScore}
            </div>
            <div className="text-sm text-muted-foreground">Memory</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-semibold ${getPerformanceColor(performance?.loadingScore)}`}>
              {performance?.loadingScore}
            </div>
            <div className="text-sm text-muted-foreground">Loading</div>
          </div>
        </div>
      </div>
      {/* Memory Usage */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Cpu" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Memory Usage</h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Heap Memory</span>
              <span className="text-sm font-medium text-foreground">
                {performance?.memoryUsage?.heap?.used}MB / {performance?.memoryUsage?.heap?.total}MB
              </span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-primary smooth-transition"
                style={{ width: `${(performance?.memoryUsage?.heap?.used / performance?.memoryUsage?.heap?.total) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">GPU Memory</span>
              <span className="text-sm font-medium text-foreground">
                {performance?.memoryUsage?.gpu?.used}MB / {performance?.memoryUsage?.gpu?.total}MB
              </span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-secondary smooth-transition"
                style={{ width: `${(performance?.memoryUsage?.gpu?.used / performance?.memoryUsage?.gpu?.total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Active Layers */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Layers" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Active Layers</h3>
          </div>
          <span className={`text-sm font-medium ${
            performance?.activeLayers?.count > performance?.activeLayers?.recommended ? 'text-warning' : 'text-success'
          }`}>
            {performance?.activeLayers?.count} / {performance?.activeLayers?.limit}
          </span>
        </div>

        <div className="space-y-3">
          {performance?.activeLayers?.layers?.map((layer, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={layer?.icon} size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{layer?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">{layer?.features} features</span>
                <div className={`w-2 h-2 rounded-full ${
                  layer?.performance === 'good' ? 'bg-success' :
                  layer?.performance === 'fair' ? 'bg-warning' : 'bg-error'
                }`} />
              </div>
            </div>
          ))}
        </div>

        {performance?.activeLayers?.count > performance?.activeLayers?.recommended && (
          <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm text-warning">
                Consider reducing active layers for better performance
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Optimization Recommendations */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Lightbulb" size={20} className="text-accent" />
          <h3 className="font-semibold text-foreground">Recommendations</h3>
        </div>

        <div className="space-y-3">
          {performance?.recommendations?.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
              <Icon 
                name={recommendation?.type === 'warning' ? 'AlertTriangle' : 'Info'} 
                size={16} 
                className={recommendation?.type === 'warning' ? 'text-warning' : 'text-primary'} 
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{recommendation?.title}</div>
                <div className="text-sm text-muted-foreground">{recommendation?.description}</div>
              </div>
              {recommendation?.action && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOptimize(recommendation?.action)}
                >
                  {recommendation?.actionLabel}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center space-x-3">
        <Button
          variant="default"
          onClick={onOptimize}
          iconName="Zap"
          iconPosition="left"
        >
          Auto Optimize
        </Button>
        <Button
          variant="outline"
          onClick={onUpdateSettings}
          iconName="Settings"
          iconPosition="left"
        >
          Performance Settings
        </Button>
      </div>
    </div>
  );
};

export default PerformancePanel;