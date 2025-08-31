import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ErrorLog = ({ 
  errors, 
  onClearLog, 
  onRetryAction, 
  onViewDetails 
}) => {
  const getErrorSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getErrorIcon = (type) => {
    switch (type) {
      case 'network': return 'Wifi';
      case 'parsing': return 'FileX';
      case 'validation': return 'AlertTriangle';
      case 'storage': return 'HardDrive';
      case 'performance': return 'Zap';
      default: return 'AlertCircle';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Error Summary */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-error/10">
              <Icon name="AlertCircle" size={20} className="text-error" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Error Log</h3>
              <p className="text-sm text-muted-foreground">System errors and troubleshooting</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={onClearLog}
            iconName="Trash2"
            iconPosition="left"
          >
            Clear Log
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-error/10 border border-error/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-error mb-1">
              {errors?.summary?.critical}
            </div>
            <div className="text-sm text-error">Critical</div>
          </div>
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-warning mb-1">
              {errors?.summary?.high}
            </div>
            <div className="text-sm text-warning">High</div>
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {errors?.summary?.medium}
            </div>
            <div className="text-sm text-primary">Medium</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {errors?.summary?.total}
            </div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
        </div>
      </div>
      {/* Recent Errors */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Clock" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Recent Errors</h3>
        </div>

        <div className="space-y-4">
          {errors?.recent?.map((error, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                    error?.severity === 'critical' ? 'bg-error/10' :
                    error?.severity === 'high' ? 'bg-warning/10' :
                    error?.severity === 'medium' ? 'bg-primary/10' : 'bg-muted/30'
                  }`}>
                    <Icon 
                      name={getErrorIcon(error?.type)} 
                      size={16} 
                      className={getErrorSeverityColor(error?.severity)} 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground">{error?.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        error?.severity === 'critical' ? 'bg-error/10 text-error' :
                        error?.severity === 'high' ? 'bg-warning/10 text-warning' :
                        error?.severity === 'medium'? 'bg-primary/10 text-primary' : 'bg-muted/30 text-muted-foreground'
                      }`}>
                        {error?.severity}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{error?.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Type: {error?.type}</span>
                      <span>Time: {formatTimestamp(error?.timestamp)}</span>
                      {error?.component && <span>Component: {error?.component}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {error?.retryable && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRetryAction(error?.id)}
                      iconName="RotateCcw"
                    >
                      Retry
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(error?.id)}
                    iconName="Eye"
                  >
                    Details
                  </Button>
                </div>
              </div>

              {error?.stackTrace && (
                <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                  <div className="text-xs font-mono text-muted-foreground">
                    {error?.stackTrace?.split('\n')?.slice(0, 3)?.map((line, lineIndex) => (
                      <div key={lineIndex}>{line}</div>
                    ))}
                    {error?.stackTrace?.split('\n')?.length > 3 && (
                      <div className="text-primary cursor-pointer" onClick={() => onViewDetails(error?.id)}>
                        ... view full stack trace
                      </div>
                    )}
                  </div>
                </div>
              )}

              {error?.solution && (
                <div className="mt-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Icon name="Lightbulb" size={16} className="text-success mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-success mb-1">Suggested Solution</div>
                      <div className="text-sm text-success">{error?.solution}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {errors?.recent?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
            <h4 className="font-medium text-foreground mb-2">No Recent Errors</h4>
            <p className="text-sm text-muted-foreground">System is running smoothly</p>
          </div>
        )}
      </div>
      {/* Error Categories */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Error Categories</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {errors?.categories?.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={getErrorIcon(category?.type)} size={16} className="text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">{category?.name}</div>
                  <div className="text-xs text-muted-foreground">{category?.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{category?.count}</div>
                <div className="text-xs text-muted-foreground">errors</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Troubleshooting Guide */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="HelpCircle" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Troubleshooting Guide</h3>
        </div>

        <div className="space-y-4">
          {errors?.troubleshooting?.map((guide, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-1" />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-2">{guide?.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{guide?.description}</p>
                  <div className="space-y-2">
                    {guide?.steps?.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start space-x-2">
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium mt-0.5">
                          {stepIndex + 1}
                        </div>
                        <span className="text-sm text-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ErrorLog;