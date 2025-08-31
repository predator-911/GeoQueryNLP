import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import QueryHeader from './components/QueryHeader';
import FilterSidebar from './components/FilterSidebar';
import ResultsList from './components/ResultsList';
import ResultsMap from './components/ResultsMap';
import ComparisonModal from './components/ComparisonModal';

const QueryResultsExplorer = () => {
  const [filters, setFilters] = useState({
    maxDistance: 10,
    categories: [],
    minRating: 0,
    hasAccessibility: false,
    isOpen24Hours: false,
    searchText: ''
  });

  const [selectedResults, setSelectedResults] = useState([]);
  const [hoveredResult, setHoveredResult] = useState(null);
  const [sortBy, setSortBy] = useState('distance');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mock query and results data
  const originalQuery = "Find hospitals and ATMs near Connaught Place Delhi";
  
  const mockResults = [
    {
      id: 1,
      name: "All India Institute of Medical Sciences (AIIMS)",
      category: "hospital",
      distance: 2.3,
      rating: 4.5,
      address: "Sri Aurobindo Marg, Ansari Nagar, New Delhi, Delhi 110029",
      isOpen: true,
      hasAccessibility: true,
      hasParking: true,
      coordinates: { lat: 28.5672, lng: 77.2100 }
    },
    {
      id: 2,
      name: "HDFC Bank ATM - CP",
      category: "atm",
      distance: 0.5,
      rating: 4.2,
      address: "Connaught Place, Block A, New Delhi, Delhi 110001",
      isOpen: true,
      hasAccessibility: true,
      hasParking: false,
      coordinates: { lat: 28.6315, lng: 77.2167 }
    },
    {
      id: 3,
      name: "Ram Manohar Lohia Hospital",
      category: "hospital",
      distance: 1.8,
      rating: 4.1,
      address: "Baba Kharak Singh Marg, New Delhi, Delhi 110001",
      isOpen: true,
      hasAccessibility: true,
      hasParking: true,
      coordinates: { lat: 28.6358, lng: 77.2064 }
    },
    {
      id: 4,
      name: "State Bank of India ATM",
      category: "atm",
      distance: 0.3,
      rating: 3.8,
      address: "Janpath, Connaught Place, New Delhi, Delhi 110001",
      isOpen: true,
      hasAccessibility: false,
      hasParking: false,
      coordinates: { lat: 28.6289, lng: 77.2065 }
    },
    {
      id: 5,
      name: "Sir Ganga Ram Hospital",
      category: "hospital",
      distance: 3.2,
      rating: 4.6,
      address: "Rajinder Nagar, New Delhi, Delhi 110060",
      isOpen: true,
      hasAccessibility: true,
      hasParking: true,
      coordinates: { lat: 28.6358, lng: 77.1910 }
    },
    {
      id: 6,
      name: "ICICI Bank ATM - Rajiv Chowk",
      category: "atm",
      distance: 0.4,
      rating: 4.0,
      address: "Rajiv Chowk Metro Station, New Delhi, Delhi 110001",
      isOpen: true,
      hasAccessibility: true,
      hasParking: false,
      coordinates: { lat: 28.6328, lng: 77.2197 }
    },
    {
      id: 7,
      name: "Lady Hardinge Medical College",
      category: "hospital",
      distance: 2.1,
      rating: 4.3,
      address: "Shaheed Bhagat Singh Marg, New Delhi, Delhi 110001",
      isOpen: true,
      hasAccessibility: true,
      hasParking: true,
      coordinates: { lat: 28.6358, lng: 77.2064 }
    },
    {
      id: 8,
      name: "Punjab National Bank ATM",
      category: "atm",
      distance: 0.7,
      rating: 3.9,
      address: "Kasturba Gandhi Marg, New Delhi, Delhi 110001",
      isOpen: true,
      hasAccessibility: false,
      hasParking: false,
      coordinates: { lat: 28.6271, lng: 77.2194 }
    }
  ];

  const [filteredResults, setFilteredResults] = useState(mockResults);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let filtered = [...mockResults];

    // Apply filters
    if (filters?.maxDistance) {
      filtered = filtered?.filter(result => result?.distance <= filters?.maxDistance);
    }

    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(result => filters?.categories?.includes(result?.category));
    }

    if (filters?.minRating > 0) {
      filtered = filtered?.filter(result => result?.rating >= filters?.minRating);
    }

    if (filters?.hasAccessibility) {
      filtered = filtered?.filter(result => result?.hasAccessibility);
    }

    if (filters?.isOpen24Hours) {
      filtered = filtered?.filter(result => result?.isOpen);
    }

    if (filters?.searchText) {
      const searchLower = filters?.searchText?.toLowerCase();
      filtered = filtered?.filter(result => 
        result?.name?.toLowerCase()?.includes(searchLower) ||
        result?.address?.toLowerCase()?.includes(searchLower)
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a?.distance - b?.distance;
        case 'rating':
          return b?.rating - a?.rating;
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'category':
          return a?.category?.localeCompare(b?.category);
        default:
          return 0;
      }
    });

    setFilteredResults(filtered);
  }, [filters, sortBy]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResultSelect = (resultIds) => {
    setSelectedResults(Array.isArray(resultIds) ? resultIds : [resultIds]);
  };

  const handleResultHover = (result) => {
    setHoveredResult(result);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'compare':
        setIsComparisonOpen(true);
        break;
      case 'export':
        console.log('Exporting selected results:', selectedResults);
        break;
      default:
        break;
    }
  };

  const handleMapInteraction = (action, data) => {
    console.log('Map interaction:', action, data);
  };

  const handleRefineQuery = () => {
    console.log('Refining query...');
  };

  const handleSaveQuery = () => {
    console.log('Saving query...');
  };

  const handleExportResults = () => {
    console.log('Exporting results...');
  };

  const averageDistance = filteredResults?.length > 0 
    ? (filteredResults?.reduce((sum, result) => sum + result?.distance, 0) / filteredResults?.length)?.toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-4 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Query Header */}
          <QueryHeader
            originalQuery={originalQuery}
            resultCount={filteredResults?.length}
            averageDistance={averageDistance}
            onRefineQuery={handleRefineQuery}
            onSaveQuery={handleSaveQuery}
            onExportResults={handleExportResults}
          />

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />

            {/* Results Section */}
            <div className="flex-1 flex flex-col lg:flex-row gap-6">
              {/* Results List */}
              <div className={`${isMobile ? 'w-full' : 'w-2/5'} space-y-4`}>
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Search Results ({filteredResults?.length})
                  </h2>
                  <ResultsList
                    results={filteredResults}
                    selectedResults={selectedResults}
                    onResultSelect={handleResultSelect}
                    onResultHover={handleResultHover}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                    onBulkAction={handleBulkAction}
                  />
                </div>
              </div>

              {/* Results Map */}
              <div className={`${isMobile ? 'w-full h-96' : 'w-3/5 h-[calc(100vh-200px)]'}`}>
                <ResultsMap
                  results={filteredResults}
                  selectedResults={selectedResults}
                  hoveredResult={hoveredResult}
                  center={{ lat: 28.6139, lng: 77.2090 }}
                  onMapInteraction={handleMapInteraction}
                  showBufferZones={true}
                  showConnectingLines={true}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        selectedResults={selectedResults}
        results={filteredResults}
      />
      {/* Mobile Bottom Padding */}
      {isMobile && <div className="h-20" />}
    </div>
  );
};

export default QueryResultsExplorer;