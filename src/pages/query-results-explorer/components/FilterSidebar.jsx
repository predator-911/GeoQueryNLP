import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onToggle,
  className = '' 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { id: 'hospital', label: 'Hospitals', count: 45, color: 'text-red-500' },
    { id: 'atm', label: 'ATMs', count: 128, color: 'text-green-500' },
    { id: 'metro', label: 'Metro Stations', count: 32, color: 'text-blue-500' },
    { id: 'restaurant', label: 'Restaurants', count: 89, color: 'text-orange-500' },
    { id: 'school', label: 'Schools', count: 67, color: 'text-purple-500' },
    { id: 'mall', label: 'Shopping Malls', count: 23, color: 'text-pink-500' },
    { id: 'park', label: 'Parks', count: 41, color: 'text-emerald-500' },
    { id: 'fuel', label: 'Fuel Stations', count: 56, color: 'text-yellow-500' }
  ];

  const handleDistanceChange = (value) => {
    const newFilters = { ...localFilters, maxDistance: parseFloat(value) };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleCategoryToggle = (categoryId) => {
    const newCategories = localFilters?.categories?.includes(categoryId)
      ? localFilters?.categories?.filter(id => id !== categoryId)
      : [...localFilters?.categories, categoryId];
    
    const newFilters = { ...localFilters, categories: newCategories };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleRatingChange = (rating) => {
    const newFilters = { ...localFilters, minRating: rating };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      maxDistance: 50,
      categories: [],
      minRating: 0,
      hasAccessibility: false,
      isOpen24Hours: false,
      searchText: ''
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const sidebarContent = (
    <div className="space-y-6">
      {/* Search Filter */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Search" size={16} className="mr-2" />
          Search Filter
        </h3>
        <Input
          type="search"
          placeholder="Filter by name or address..."
          value={localFilters?.searchText}
          onChange={(e) => {
            const newFilters = { ...localFilters, searchText: e?.target?.value };
            setLocalFilters(newFilters);
            onFiltersChange(newFilters);
          }}
        />
      </div>

      {/* Distance Filter */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Navigation" size={16} className="mr-2" />
          Distance Range
        </h3>
        <div className="space-y-3">
          <Input
            type="range"
            min="1"
            max="50"
            value={localFilters?.maxDistance}
            onChange={(e) => handleDistanceChange(e?.target?.value)}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>1km</span>
            <span className="text-primary font-medium">{localFilters?.maxDistance}km</span>
            <span>50km</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Grid3X3" size={16} className="mr-2" />
          Categories
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories?.map((category) => (
            <div key={category?.id} className="flex items-center justify-between">
              <Checkbox
                label={
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${category?.color?.replace('text-', 'bg-')}`} />
                    <span className="text-sm">{category?.label}</span>
                  </div>
                }
                checked={localFilters?.categories?.includes(category?.id)}
                onChange={() => handleCategoryToggle(category?.id)}
              />
              <span className="text-xs text-muted-foreground">{category?.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Star" size={16} className="mr-2" />
          Minimum Rating
        </h3>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5]?.map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`p-2 rounded-lg border smooth-transition ${
                localFilters?.minRating >= rating
                  ? 'bg-warning/20 border-warning text-warning' :'border-border hover:border-warning/50'
              }`}
            >
              <Icon 
                name="Star" 
                size={16} 
                className={localFilters?.minRating >= rating ? 'fill-current' : ''} 
              />
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility Options */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Accessibility" size={16} className="mr-2" />
          Accessibility
        </h3>
        <div className="space-y-2">
          <Checkbox
            label="Wheelchair Accessible"
            checked={localFilters?.hasAccessibility}
            onChange={(e) => {
              const newFilters = { ...localFilters, hasAccessibility: e?.target?.checked };
              setLocalFilters(newFilters);
              onFiltersChange(newFilters);
            }}
          />
          <Checkbox
            label="Open 24 Hours"
            checked={localFilters?.isOpen24Hours}
            onChange={(e) => {
              const newFilters = { ...localFilters, isOpen24Hours: e?.target?.checked };
              setLocalFilters(newFilters);
              onFiltersChange(newFilters);
            }}
          />
        </div>
      </div>

      {/* Clear Filters */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={clearAllFilters}
          iconName="X"
          iconPosition="left"
          fullWidth
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:block w-80 bg-card rounded-lg border border-border p-6 h-fit sticky top-24 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Filter" size={20} className="mr-2" />
            Filters
          </h2>
          <div className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded">
            {localFilters?.categories?.length} active
          </div>
        </div>
        {sidebarContent}
      </div>
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-20 right-4 z-50">
        <Button
          variant="default"
          size="icon"
          onClick={onToggle}
          className="w-12 h-12 rounded-full shadow-lg hover-glow"
        >
          <Icon name="Filter" size={20} />
        </Button>
      </div>
      {/* Mobile Filter Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-1000 bg-background/95 backdrop-blur-subtle">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground flex items-center">
                <Icon name="Filter" size={20} className="mr-2" />
                Filters
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;