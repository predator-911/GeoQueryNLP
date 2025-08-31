import React from 'react';
import Icon from '../../../components/AppIcon';

const InfoPanel = ({ queryResults, selectedLocation, isLoading }) => {
  const mockResults = [
    {
      id: 1,
      name: "All India Institute of Medical Sciences",
      type: "hospital",
      address: "Ansari Nagar, New Delhi, Delhi 110029",
      distance: "2.3 km",
      rating: 4.5,
      phone: "+91-11-2658-8500",
      hours: "24/7",
      coordinates: [77.2090, 28.5672],
      amenities: ["Emergency", "ICU", "Pharmacy", "Parking"]
    },
    {
      id: 2,
      name: "Safdarjung Hospital",
      type: "hospital",
      address: "Ansari Nagar West, New Delhi, Delhi 110029",
      distance: "3.1 km",
      rating: 4.2,
      phone: "+91-11-2673-0000",
      hours: "24/7",
      coordinates: [77.1910, 28.5672],
      amenities: ["Emergency", "Trauma Center", "Blood Bank"]
    },
    {
      id: 3,
      name: "Ram Manohar Lohia Hospital",
      type: "hospital",
      address: "Baba Kharak Singh Marg, New Delhi, Delhi 110001",
      distance: "4.2 km",
      rating: 4.0,
      phone: "+91-11-2336-5525",
      hours: "24/7",
      coordinates: [77.2167, 28.6315],
      amenities: ["Emergency", "OPD", "Diagnostic Center"]
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'hospital': return 'Cross';
      case 'metro': return 'Train';
      case 'atm': return 'CreditCard';
      case 'police': return 'Shield';
      case 'government': return 'Building';
      default: return 'MapPin';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'hospital': return 'text-red-400 bg-red-400/10';
      case 'metro': return 'text-blue-400 bg-blue-400/10';
      case 'atm': return 'text-green-400 bg-green-400/10';
      case 'police': return 'text-yellow-400 bg-yellow-400/10';
      case 'government': return 'text-purple-400 bg-purple-400/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const resultsToShow = queryResults && queryResults?.length > 0 ? queryResults : mockResults;

  return (
    <div className="h-full flex flex-col bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Info" size={18} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Results</h2>
              <p className="text-sm text-muted-foreground">
                {isLoading ? 'Searching...' : `${resultsToShow?.length} locations found`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 rounded-lg bg-muted/30 hover:bg-muted/50 flex items-center justify-center smooth-transition">
              <Icon name="Filter" size={16} className="text-muted-foreground" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-muted/30 hover:bg-muted/50 flex items-center justify-center smooth-transition">
              <Icon name="SortAsc" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
      {/* Results List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3]?.map((i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/20 animate-pulse">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-muted/50"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted/50 rounded w-3/4"></div>
                    <div className="h-3 bg-muted/50 rounded w-1/2"></div>
                    <div className="h-3 bg-muted/50 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : resultsToShow?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
              <Icon name="Search" size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Results</h3>
            <p className="text-muted-foreground">Try a different search query</p>
          </div>
        ) : (
          resultsToShow?.map((result) => (
            <div
              key={result?.id}
              className={`p-4 rounded-lg border border-border hover:border-primary/50 smooth-transition cursor-pointer hover-glow ${
                selectedLocation?.id === result?.id ? 'border-primary bg-primary/5' : 'bg-muted/10 hover:bg-muted/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(result?.type)}`}>
                  <Icon name={getTypeIcon(result?.type)} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-foreground text-sm leading-tight">{result?.name}</h3>
                    <div className="flex items-center space-x-1 ml-2">
                      <Icon name="MapPin" size={12} className="text-primary" />
                      <span className="text-xs text-primary font-medium">{result?.distance}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{result?.address}</p>
                  
                  {result?.rating && (
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                        <span className="text-xs text-foreground font-medium">{result?.rating}</span>
                      </div>
                      {result?.hours && (
                        <>
                          <div className="w-px h-3 bg-border"></div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Clock" size={12} className="text-green-400" />
                            <span className="text-xs text-green-400">{result?.hours}</span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  
                  {result?.phone && (
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="Phone" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{result?.phone}</span>
                    </div>
                  )}
                  
                  {result?.amenities && result?.amenities?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {result?.amenities?.slice(0, 3)?.map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                        >
                          {amenity}
                        </span>
                      ))}
                      {result?.amenities?.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-muted/30 text-muted-foreground rounded-md">
                          +{result?.amenities?.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-1 text-xs text-primary hover:text-primary/80 smooth-transition">
                    <Icon name="Navigation" size={12} />
                    <span>Directions</span>
                  </button>
                  <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground smooth-transition">
                    <Icon name="Share" size={12} />
                    <span>Share</span>
                  </button>
                </div>
                <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground smooth-transition">
                  <Icon name="ExternalLink" size={12} />
                  <span>Details</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Quick Stats */}
      {!isLoading && resultsToShow?.length > 0 && (
        <div className="p-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-semibold text-foreground">{resultsToShow?.length}</p>
              <p className="text-xs text-muted-foreground">Found</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {Math.min(...resultsToShow?.map(r => parseFloat(r?.distance)))}km
              </p>
              <p className="text-xs text-muted-foreground">Nearest</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {(resultsToShow?.reduce((sum, r) => sum + (r?.rating || 0), 0) / resultsToShow?.length)?.toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;