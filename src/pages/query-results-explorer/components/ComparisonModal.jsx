import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonModal = ({ 
  isOpen, 
  onClose, 
  selectedResults, 
  results 
}) => {
  if (!isOpen) return null;

  const compareResults = results?.filter(result => 
    selectedResults?.includes(result?.id)
  )?.slice(0, 4); // Limit to 4 for comparison

  const comparisonFields = [
    { key: 'name', label: 'Name', icon: 'Type' },
    { key: 'category', label: 'Category', icon: 'Grid3X3' },
    { key: 'distance', label: 'Distance', icon: 'Navigation', suffix: 'km' },
    { key: 'rating', label: 'Rating', icon: 'Star', type: 'rating' },
    { key: 'address', label: 'Address', icon: 'MapPin' },
    { key: 'isOpen', label: 'Currently Open', icon: 'Clock', type: 'boolean' },
    { key: 'hasAccessibility', label: 'Accessible', icon: 'Accessibility', type: 'boolean' },
    { key: 'hasParking', label: 'Parking Available', icon: 'Car', type: 'boolean' }
  ];

  const renderFieldValue = (result, field) => {
    const value = result?.[field?.key];
    
    switch (field?.type) {
      case 'rating':
        return (
          <div className="flex items-center">
            {[1, 2, 3, 4, 5]?.map((star) => (
              <Icon
                key={star}
                name="Star"
                size={12}
                className={`${
                  star <= value 
                    ? 'text-warning fill-current' :'text-muted-foreground'
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({value})</span>
          </div>
        );
      case 'boolean':
        return (
          <div className={`flex items-center ${value ? 'text-success' : 'text-muted-foreground'}`}>
            <Icon name={value ? 'Check' : 'X'} size={14} className="mr-1" />
            <span className="text-sm">{value ? 'Yes' : 'No'}</span>
          </div>
        );
      default:
        return (
          <span className="text-sm text-foreground">
            {value}{field?.suffix || ''}
          </span>
        );
    }
  };

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

  return (
    <div className="fixed inset-0 z-1000 bg-background/95 backdrop-blur-subtle flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center">
            <Icon name="GitCompare" size={24} className="mr-3 text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Compare Locations
              </h2>
              <p className="text-sm text-muted-foreground">
                Comparing {compareResults?.length} selected locations
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Comparison Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Location Headers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {compareResults?.map((result) => (
              <div key={result?.id} className="bg-muted/20 rounded-lg p-4 text-center">
                <div className={`inline-flex p-3 rounded-lg ${getCategoryColor(result?.category)?.replace('text-', 'bg-')}/10 mb-3`}>
                  <Icon 
                    name={getCategoryIcon(result?.category)} 
                    size={24} 
                    className={getCategoryColor(result?.category)} 
                  />
                </div>
                <h3 className="font-medium text-foreground mb-1 truncate">
                  {result?.name}
                </h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {result?.category?.replace('_', ' ')}
                </p>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="space-y-4">
            {comparisonFields?.map((field) => (
              <div key={field?.key} className="border border-border rounded-lg overflow-hidden">
                <div className="bg-muted/10 px-4 py-3 border-b border-border">
                  <div className="flex items-center">
                    <Icon name={field?.icon} size={16} className="mr-2 text-muted-foreground" />
                    <span className="font-medium text-foreground">{field?.label}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                  {compareResults?.map((result, index) => (
                    <div 
                      key={result?.id} 
                      className={`p-4 ${
                        index < compareResults?.length - 1 
                          ? 'border-r border-border' :''
                      }`}
                    >
                      {renderFieldValue(result, field)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                // Handle export comparison
                console.log('Exporting comparison...');
              }}
              iconName="Download"
              iconPosition="left"
            >
              Export Comparison
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                // Handle share comparison
                console.log('Sharing comparison...');
              }}
              iconName="Share"
              iconPosition="left"
            >
              Share Comparison
            </Button>
            <Button
              variant="default"
              onClick={onClose}
            >
              Close Comparison
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;