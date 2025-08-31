import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DataSourceCard from './components/DataSourceCard';
import StorageMetrics from './components/StorageMetrics';
import PerformancePanel from './components/PerformancePanel';
import CacheManagement from './components/CacheManagement';
import DataValidation from './components/DataValidation';
import ErrorLog from './components/ErrorLog';

const OfflineDataManager = () => {
  const [activeTab, setActiveTab] = useState('sources');
  const [isMobile, setIsMobile] = useState(false);

  // Mock data for data sources
  const dataSources = [
    {
      id: 'delhi-wards',
      name: 'Delhi Wards',
      description: 'Administrative ward boundaries for Delhi',
      icon: 'MapPin',
      status: 'loaded',
      fileSize: 2457600, // 2.4 MB
      recordCount: 272,
      lastUpdated: '29/08/2025, 14:30',
      offlineAvailable: true,
      enabled: true
    },
    {
      id: 'hospitals',
      name: 'Hospitals',
      description: 'Healthcare facilities across Delhi',
      icon: 'Heart',
      status: 'loaded',
      fileSize: 1843200, // 1.8 MB
      recordCount: 1247,
      lastUpdated: '30/08/2025, 09:15',
      offlineAvailable: true,
      enabled: true
    },
    {
      id: 'atms',
      name: 'ATMs',
      description: 'Automated Teller Machine locations',
      icon: 'CreditCard',
      status: 'loading',
      fileSize: 921600, // 900 KB
      recordCount: 3456,
      lastUpdated: '28/08/2025, 16:45',
      offlineAvailable: false,
      enabled: true
    },
    {
      id: 'metro-stations',
      name: 'Metro Stations',
      description: 'Delhi Metro railway stations',
      icon: 'Train',
      status: 'loaded',
      fileSize: 512000, // 500 KB
      recordCount: 285,
      lastUpdated: '31/08/2025, 11:20',
      offlineAvailable: true,
      enabled: true
    },
    {
      id: 'bus-stops',
      name: 'Bus Stops',
      description: 'Public bus stop locations',
      icon: 'Bus',
      status: 'error',
      fileSize: 1536000, // 1.5 MB
      recordCount: 0,
      lastUpdated: '27/08/2025, 08:30',
      offlineAvailable: false,
      enabled: false
    },
    {
      id: 'schools',
      name: 'Schools',
      description: 'Educational institutions in Delhi',
      icon: 'GraduationCap',
      status: 'loaded',
      fileSize: 2048000, // 2 MB
      recordCount: 2134,
      lastUpdated: '30/08/2025, 13:45',
      offlineAvailable: true,
      enabled: true
    }
  ];

  // Mock storage metrics
  const storageMetrics = {
    totalStorage: 104857600, // 100 MB
    usedStorage: 67108864, // 64 MB
    geoJsonStorage: 45088768, // 43 MB
    geoJsonFiles: 6,
    cacheStorage: 16777216, // 16 MB
    cacheEntries: 1247,
    historyStorage: 4194304, // 4 MB
    historyEntries: 156,
    settingsStorage: 1048576, // 1 MB
    lastCleanup: '28/08/2025'
  };

  // Mock performance data
  const performanceData = {
    overallScore: 78,
    renderingScore: 85,
    memoryScore: 72,
    loadingScore: 76,
    memoryUsage: {
      heap: { used: 45, total: 128 },
      gpu: { used: 234, total: 512 }
    },
    activeLayers: {
      count: 4,
      limit: 8,
      recommended: 6,
      layers: [
        { name: 'Delhi Wards', icon: 'MapPin', features: 272, performance: 'good' },
        { name: 'Hospitals', icon: 'Heart', features: 1247, performance: 'fair' },
        { name: 'Metro Stations', icon: 'Train', features: 285, performance: 'good' },
        { name: 'Schools', icon: 'GraduationCap', features: 2134, performance: 'fair' }
      ]
    },
    recommendations: [
      {
        type: 'warning',
        title: 'High Memory Usage',
        description: 'Consider reducing active layers or clearing cache',
        action: 'optimize-memory',
        actionLabel: 'Optimize'
      },
      {
        type: 'info',
        title: 'Enable Data Compression',
        description: 'Reduce storage usage by enabling GeoJSON compression',
        action: 'enable-compression',
        actionLabel: 'Enable'
      }
    ]
  };

  // Mock cache data
  const cacheData = {
    totalEntries: 1247,
    totalSize: 16777216, // 16 MB
    hitRate: 87,
    health: 'good',
    categories: [
      {
        id: 'query-results',
        name: 'Query Results',
        description: 'Cached search and filter results',
        icon: 'Search',
        entries: 456,
        size: 8388608, // 8 MB
        lastUpdated: '31/08/2025, 06:15',
        hitRate: 92
      },
      {
        id: 'map-tiles',
        name: 'Map Tiles',
        description: 'Rendered map tile cache',
        icon: 'Map',
        entries: 234,
        size: 4194304, // 4 MB
        lastUpdated: '30/08/2025, 18:30',
        hitRate: 78
      },
      {
        id: 'geometry-cache',
        name: 'Geometry Cache',
        description: 'Processed geometric calculations',
        icon: 'Shapes',
        entries: 345,
        size: 2097152, // 2 MB
        lastUpdated: '31/08/2025, 04:45',
        hitRate: 85
      },
      {
        id: 'api-responses',
        name: 'API Responses',
        description: 'Cached API call responses',
        icon: 'Database',
        entries: 212,
        size: 2097152, // 2 MB
        lastUpdated: '30/08/2025, 22:10',
        hitRate: 94
      }
    ],
    popularQueries: [
      { id: 1, text: 'hospitals near me', count: 45 },
      { id: 2, text: 'nearest metro station', count: 38 },
      { id: 3, text: 'ATMs in Connaught Place', count: 29 },
      { id: 4, text: 'schools in South Delhi', count: 24 }
    ],
    settings: {
      autoPreload: true,
      backgroundSync: true,
      smartCleanup: true
    }
  };

  // Mock validation data
  const validationData = {
    isRunning: false,
    lastRun: '31/08/2025, 05:30',
    lastDuration: '2m 34s',
    summary: {
      passed: 18,
      warnings: 3,
      failed: 1,
      total: 22
    },
    checks: [
      {
        id: 'geojson-format',
        name: 'GeoJSON Format Validation',
        description: 'Validates GeoJSON structure and syntax',
        status: 'passed',
        issues: []
      },
      {
        id: 'coordinate-bounds',
        name: 'Coordinate Bounds Check',
        description: 'Ensures coordinates are within Delhi boundaries',
        status: 'warning',
        issues: [
          {
            id: 'coord-1',
            message: 'Some coordinates extend beyond Delhi boundaries',
            location: 'hospitals.geojson:line 234',
            severity: 'medium',
            fixable: true
          }
        ]
      },
      {
        id: 'data-completeness',
        name: 'Data Completeness',
        description: 'Checks for missing required fields',
        status: 'failed',
        issues: [
          {
            id: 'missing-1',
            message: 'Missing name field in 12 records',
            location: 'bus-stops.geojson',
            severity: 'high',
            fixable: false
          }
        ]
      }
    ],
    metrics: {
      coordinateSystem: {
        projection: 'WGS84 (EPSG:4326)',
        validPercentage: 98.7,
        withinBounds: true
      },
      completeness: {
        requiredFields: 94.2,
        missingValues: 156,
        duplicates: 3
      }
    }
  };

  // Mock error data
  const errorData = {
    summary: {
      critical: 1,
      high: 2,
      medium: 4,
      total: 7
    },
    recent: [
      {
        id: 'error-1',
        title: 'Failed to load bus stops data',
        message: 'Network timeout while fetching bus-stops.geojson',
        type: 'network',
        severity: 'high',
        timestamp: Date.now() - 3600000, // 1 hour ago
        component: 'DataLoader',
        retryable: true,
        stackTrace: `Error: Network timeout\n    at DataLoader.fetchGeoJSON (dataLoader.js:45)\n    at async loadBusStops (index.js:123)\n    at async initializeData (index.js:89)`,
        solution: 'Check network connection and retry. If problem persists, use cached data.'
      },
      {
        id: 'error-2',
        title: 'Memory usage warning',
        message: 'Heap memory usage exceeded 80% threshold',
        type: 'performance',
        severity: 'medium',
        timestamp: Date.now() - 7200000, // 2 hours ago
        component: 'MemoryMonitor',
        retryable: false,
        solution: 'Clear cache or reduce active layers to free up memory.'
      }
    ],
    categories: [
      { type: 'network', name: 'Network Errors', description: 'Connection and data loading issues', count: 3 },
      { type: 'parsing', name: 'Parsing Errors', description: 'Data format and structure issues', count: 2 },
      { type: 'validation', name: 'Validation Errors', description: 'Data quality and integrity issues', count: 1 },
      { type: 'performance', name: 'Performance Issues', description: 'Memory and rendering problems', count: 1 }
    ],
    troubleshooting: [
      {
        title: 'Network Connection Issues',
        description: 'Steps to resolve data loading problems',
        steps: [
          'Check internet connection stability',
          'Verify firewall settings allow data access',
          'Try refreshing the data source',
          'Use offline mode if available'
        ]
      },
      {
        title: 'High Memory Usage',
        description: 'Optimize memory consumption',
        steps: [
          'Clear browser cache and reload',
          'Reduce number of active layers',
          'Enable data compression',
          'Restart the application'
        ]
      }
    ]
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    { id: 'sources', label: 'Data Sources', icon: 'Database', count: dataSources?.length },
    { id: 'performance', label: 'Performance', icon: 'Zap', count: performanceData?.recommendations?.length },
    { id: 'cache', label: 'Cache', icon: 'HardDrive', count: cacheData?.categories?.length },
    { id: 'validation', label: 'Validation', icon: 'Shield', count: validationData?.summary?.failed + validationData?.summary?.warnings },
    { id: 'errors', label: 'Errors', icon: 'AlertCircle', count: errorData?.summary?.total }
  ];

  const handleRefreshSource = (sourceId) => {
    console.log('Refreshing source:', sourceId);
  };

  const handleToggleSource = (sourceId) => {
    console.log('Toggling source:', sourceId);
  };

  const handleViewSourceDetails = (sourceId) => {
    console.log('Viewing source details:', sourceId);
  };

  const handleOptimizePerformance = (action) => {
    console.log('Optimizing performance:', action);
  };

  const handleUpdatePerformanceSettings = () => {
    console.log('Updating performance settings');
  };

  const handleClearCache = (categoryId) => {
    console.log('Clearing cache:', categoryId);
  };

  const handleRefreshCache = (categoryId) => {
    console.log('Refreshing cache:', categoryId);
  };

  const handlePreloadData = (queryId) => {
    console.log('Preloading data:', queryId);
  };

  const handleRunValidation = () => {
    console.log('Running validation');
  };

  const handleFixIssue = (issueId) => {
    console.log('Fixing issue:', issueId);
  };

  const handleViewValidationDetails = (checkId) => {
    console.log('Viewing validation details:', checkId);
  };

  const handleClearErrorLog = () => {
    console.log('Clearing error log');
  };

  const handleRetryAction = (errorId) => {
    console.log('Retrying action:', errorId);
  };

  const handleViewErrorDetails = (errorId) => {
    console.log('Viewing error details:', errorId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sources':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 gap-6">
                  {dataSources?.map((source) => (
                    <DataSourceCard
                      key={source?.id}
                      source={source}
                      onRefresh={handleRefreshSource}
                      onToggle={handleToggleSource}
                      onViewDetails={handleViewSourceDetails}
                    />
                  ))}
                </div>
              </div>
              <div>
                <StorageMetrics metrics={storageMetrics} />
              </div>
            </div>
          </div>
        );
      case 'performance':
        return (
          <PerformancePanel
            performance={performanceData}
            onOptimize={handleOptimizePerformance}
            onUpdateSettings={handleUpdatePerformanceSettings}
          />
        );
      case 'cache':
        return (
          <CacheManagement
            cacheData={cacheData}
            onClearCache={handleClearCache}
            onRefreshCache={handleRefreshCache}
            onPreloadData={handlePreloadData}
          />
        );
      case 'validation':
        return (
          <DataValidation
            validationData={validationData}
            onRunValidation={handleRunValidation}
            onFixIssue={handleFixIssue}
            onViewDetails={handleViewValidationDetails}
          />
        );
      case 'errors':
        return (
          <ErrorLog
            errors={errorData}
            onClearLog={handleClearErrorLog}
            onRetryAction={handleRetryAction}
            onViewDetails={handleViewErrorDetails}
          />
        );
      default:
        return null;
    }
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 pb-20 px-4">
          {/* Mobile Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Icon name="Database" size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Data Manager</h1>
                <p className="text-sm text-muted-foreground">Offline data management</p>
              </div>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap smooth-transition ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="text-sm font-medium">{tab?.label}</span>
                {tab?.count > 0 && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeTab === tab?.id
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {tab?.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Content */}
          <div className="space-y-4">
            {renderTabContent()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <Icon name="Database" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Offline Data Manager</h1>
                  <p className="text-muted-foreground">
                    Manage local GeoJSON datasets, monitor performance, and configure offline functionality
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Sync All
                </Button>
                <Button
                  variant="default"
                  iconName="Settings"
                  iconPosition="left"
                >
                  Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop Tab Navigation */}
          <div className="flex items-center space-x-1 mb-8 border-b border-border">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 border-b-2 smooth-transition ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span className="font-medium">{tab?.label}</span>
                {tab?.count > 0 && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeTab === tab?.id
                      ? 'bg-primary/20 text-primary' :'bg-muted text-muted-foreground'
                  }`}>
                    {tab?.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Desktop Content */}
          <div className="pb-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineDataManager;