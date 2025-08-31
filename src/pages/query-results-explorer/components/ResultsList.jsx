import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultsList = ({ 
  results, 
  selectedResults, 
  onResultSelect, 
  onResultHover, 
  sortBy, 
  onSortChange,
  onBulkAction 
}) => {
  const [selectAll, setSelectAll] = useState(false);

  const sortOptions = [
    { value: 'distance', label: 'Distance', icon: 'Navigation' },
    { value: 'rating', label: 'Rating', icon: 'Star' },
    { value: 'name', label: 'Name', icon: 'Type' },
    { value: 'category', label: 'Category', icon: 'Grid3X3' }
  ];

  const getCategoryIcon = (category) => {
    const iconMap = {
      hospital: 'Heart',
      atm: 'CreditCard',
      metro: 'Train',
      restaurant: 'UtensilsCrossed',
      school: 'GraduationCap',
      mall: 'ShoppingBag',
      park: 'Trees',
      fuel: 'Fuel'
    };
    return iconMap?.[category] || 'MapPin';
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      hospital: 'text-red-500',
      atm: 'text-green-500',
      metro: 'text-blue-500',
      restaurant: 'text-orange-500',
      school: 'text-purple-500',
      mall: 'text-pink-500',
      park: 'text-emerald-500',
      fuel: 'text-yellow-500'
    };
    return colorMap?.[category] || 'text-primary';
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    if (newSelectAll) {
      const allIds = results?.map(result => result?.id);
      onResultSelect(allIds);
    } else {
      onResultSelect([]);
    }
  };

  const handleIndividualSelect = (resultId) => {
    const newSelected = selectedResults?.includes(resultId)
      ? selectedResults?.filter(id => id !== resultId)
      : [...selectedResults, resultId];
    
    onResultSelect(newSelected);
    setSelectAll(newSelected?.length === results?.length);
  };

  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={12}
            className={`${
              star <= rating 
                ? 'text-warning fill-current' :'text-muted-foreground'
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header with Sort and Bulk Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
            />
            <span className="ml-2 text-sm text-muted-foreground">
              {selectedResults?.length > 0 
                ? `${selectedResults?.length} selected`
                : 'Select all'
              }
            </span>
          </div>
          
          {selectedResults?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('compare')}
                iconName="GitCompare"
                iconPosition="left"
              >
                Compare
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('export')}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e?.target?.value)}
            className="bg-input border border-border rounded-lg px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sortOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Results List */}
      <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
        {results?.map((result) => (
          <div
            key={result?.id}
            className={`bg-card border rounded-lg p-4 cursor-pointer smooth-transition hover:border-primary/50 hover-glow ${
              selectedResults?.includes(result?.id) 
                ? 'border-primary bg-primary/5' :'border-border'
            }`}
            onClick={() => handleIndividualSelect(result?.id)}
            onMouseEnter={() => onResultHover(result)}
            onMouseLeave={() => onResultHover(null)}
          >
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedResults?.includes(result?.id)}
                onChange={() => handleIndividualSelect(result?.id)}
                className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2 mt-1"
                onClick={(e) => e?.stopPropagation()}
              />
              
              <div className={`p-2 rounded-lg ${getCategoryColor(result?.category)?.replace('text-', 'bg-')}/10 mt-1`}>
                <Icon 
                  name={getCategoryIcon(result?.category)} 
                  size={16} 
                  className={getCategoryColor(result?.category)} 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground truncate">
                      {result?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {result?.category?.replace('_', ' ')}
                    </p>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="flex items-center text-sm text-primary">
                      <Icon name="Navigation" size={12} className="mr-1" />
                      {result?.distance}km
                    </div>
                    {result?.rating && (
                      <div className="mt-1">
                        {renderRating(result?.rating)}
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {result?.address}
                </p>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    {result?.isOpen && (
                      <span className="flex items-center text-success">
                        <Icon name="Clock" size={12} className="mr-1" />
                        Open
                      </span>
                    )}
                    {result?.hasAccessibility && (
                      <span className="flex items-center">
                        <Icon name="Accessibility" size={12} className="mr-1" />
                        Accessible
                      </span>
                    )}
                    {result?.hasParking && (
                      <span className="flex items-center">
                        <Icon name="Car" size={12} className="mr-1" />
                        Parking
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Handle directions
                      }}
                      iconName="Navigation"
                      iconPosition="left"
                    >
                      Directions
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Handle details
                      }}
                      iconName="Info"
                      iconPosition="left"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {results?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsList;