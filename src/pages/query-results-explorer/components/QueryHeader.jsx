import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QueryHeader = ({ 
  originalQuery, 
  resultCount, 
  averageDistance, 
  onRefineQuery, 
  onExportResults,
  onSaveQuery 
}) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Icon name="Search" size={16} className="mr-2" />
            <span>Query Results</span>
            <Icon name="ChevronRight" size={16} className="mx-2" />
            <span className="text-foreground">Analysis</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            "{originalQuery}"
          </h1>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center text-success">
              <Icon name="MapPin" size={16} className="mr-1" />
              <span>{resultCount} locations found</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Icon name="Navigation" size={16} className="mr-1" />
              <span>Avg. {averageDistance}km away</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Icon name="Clock" size={16} className="mr-1" />
              <span>Updated 2 min ago</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefineQuery}
            iconName="Edit3"
            iconPosition="left"
          >
            Refine
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onSaveQuery}
            iconName="Bookmark"
            iconPosition="left"
          >
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExportResults}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-primary/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Results</p>
              <p className="text-2xl font-semibold text-primary">{resultCount}</p>
            </div>
            <Icon name="Target" size={24} className="text-primary" />
          </div>
        </div>
        
        <div className="bg-success/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Within 5km</p>
              <p className="text-2xl font-semibold text-success">
                {Math.floor(resultCount * 0.7)}
              </p>
            </div>
            <Icon name="Circle" size={24} className="text-success" />
          </div>
        </div>
        
        <div className="bg-warning/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Categories</p>
              <p className="text-2xl font-semibold text-warning">8</p>
            </div>
            <Icon name="Grid3X3" size={24} className="text-warning" />
          </div>
        </div>
        
        <div className="bg-secondary/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Distance</p>
              <p className="text-2xl font-semibold text-secondary">{averageDistance}km</p>
            </div>
            <Icon name="Navigation" size={24} className="text-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryHeader;