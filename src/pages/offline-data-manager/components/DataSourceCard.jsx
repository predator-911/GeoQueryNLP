import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataSourceCard = ({ 
  source, 
  onRefresh, 
  onToggle, 
  onViewDetails 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'loaded': return 'text-success';
      case 'loading': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'loaded': return 'CheckCircle';
      case 'loading': return 'Loader';
      case 'error': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:border-primary/20 smooth-transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Icon name={source?.icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{source?.name}</h3>
            <p className="text-sm text-muted-foreground">{source?.description}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-2 ${getStatusColor(source?.status)}`}>
          <Icon 
            name={getStatusIcon(source?.status)} 
            size={16} 
            className={source?.status === 'loading' ? 'animate-spin' : ''} 
          />
          <span className="text-sm font-medium capitalize">{source?.status}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="text-sm text-muted-foreground">File Size</div>
          <div className="font-semibold text-foreground">{formatFileSize(source?.fileSize)}</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="text-sm text-muted-foreground">Records</div>
          <div className="font-semibold text-foreground">{source?.recordCount?.toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="text-sm text-muted-foreground">Last Updated</div>
          <div className="font-semibold text-foreground">{source?.lastUpdated}</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="text-sm text-muted-foreground">Offline Available</div>
          <div className={`font-semibold ${source?.offlineAvailable ? 'text-success' : 'text-error'}`}>
            {source?.offlineAvailable ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRefresh(source?.id)}
            disabled={source?.status === 'loading'}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Refresh
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(source?.id)}
            iconName="Eye"
            iconPosition="left"
          >
            Details
          </Button>
        </div>
        <Button
          variant={source?.enabled ? "default" : "outline"}
          size="sm"
          onClick={() => onToggle(source?.id)}
          iconName={source?.enabled ? "ToggleRight" : "ToggleLeft"}
          iconPosition="left"
        >
          {source?.enabled ? 'Enabled' : 'Disabled'}
        </Button>
      </div>
    </div>
  );
};

export default DataSourceCard;