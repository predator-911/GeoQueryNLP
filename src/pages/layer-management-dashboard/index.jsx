import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LayerTreeItem from './components/LayerTreeItem';
import PrivacyControls from './components/PrivacyControls';
import AdvancedSettings from './components/AdvancedSettings';
import PerformanceMetrics from './components/PerformanceMetrics';
import BulkActions from './components/BulkActions';
import MapPreview from './components/MapPreview';

const LayerManagementDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedLayers, setExpandedLayers] = useState({});
  const [privacyMode, setPrivacyMode] = useState('exact');
  
  // Mock layer data
  const [layers, setLayers] = useState([
    {
      id: 'hospitals',
      name: 'Hospitals',
      type: 'hospitals',
      visible: true,
      opacity: 0.8,
      color: '#ef4444',
      extrusionHeight: 50,
      supports3D: true,
      count: 245,
      hoverEnabled: true,
      clickEnabled: true
    },
    {
      id: 'atms',
      name: 'ATMs',
      type: 'atms',
      visible: true,
      opacity: 0.9,
      color: '#3b82f6',
      extrusionHeight: 30,
      supports3D: true,
      count: 1847,
      hoverEnabled: true,
      clickEnabled: true
    },
    {
      id: 'metro',
      name: 'Metro Stations',
      type: 'metro',
      visible: false,
      opacity: 1.0,
      color: '#10b981',
      extrusionHeight: 80,
      supports3D: true,
      count: 285,
      hoverEnabled: true,
      clickEnabled: true
    },
    {
      id: 'wards',
      name: 'Ward Boundaries',
      type: 'wards',
      visible: true,
      opacity: 0.3,
      color: '#f59e0b',
      extrusionHeight: 20,
      supports3D: true,
      count: 272,
      hoverEnabled: false,
      clickEnabled: true
    },
    {
      id: 'custom1',
      name: 'Traffic Signals',
      type: 'custom',
      visible: false,
      opacity: 0.7,
      color: '#8b5cf6',
      extrusionHeight: 25,
      supports3D: false,
      count: 892,
      hoverEnabled: true,
      clickEnabled: true
    }
  ]);

  // Advanced settings state
  const [settings, setSettings] = useState({
    animationSpeed: 1.0,
    autoRefresh: true,
    smoothTransitions: true,
    performanceMode: false
  });

  // Performance metrics state
  const [metrics, setMetrics] = useState({
    activeLayers: 3,
    totalLayers: 5,
    renderTime: 12,
    memoryUsage: 45,
    dataPoints: 2384,
    fps: 58,
    overallScore: 85,
    lastUpdated: Date.now()
  });

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeLayers: layers?.filter(l => l?.visible)?.length,
        renderTime: Math.floor(Math.random() * 20) + 8,
        fps: Math.floor(Math.random() * 10) + 55,
        lastUpdated: Date.now()
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [layers]);

  // Layer management functions
  const handleToggleVisibility = (layerId) => {
    setLayers(prev => prev?.map(layer => 
      layer?.id === layerId ? { ...layer, visible: !layer?.visible } : layer
    ));
  };

  const handleOpacityChange = (layerId, opacity) => {
    setLayers(prev => prev?.map(layer => 
      layer?.id === layerId ? { ...layer, opacity } : layer
    ));
  };

  const handleColorChange = (layerId, color) => {
    setLayers(prev => prev?.map(layer => 
      layer?.id === layerId ? { ...layer, color } : layer
    ));
  };

  const handleExtrusionChange = (layerId, extrusionHeight) => {
    setLayers(prev => prev?.map(layer => 
      layer?.id === layerId ? { ...layer, extrusionHeight } : layer
    ));
  };

  const handleToggleExpanded = (layerId) => {
    setExpandedLayers(prev => ({
      ...prev,
      [layerId]: !prev?.[layerId]
    }));
  };

  const handleSettingsChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleResetToDefaults = () => {
    setSettings({
      animationSpeed: 1.0,
      autoRefresh: true,
      smoothTransitions: true,
      performanceMode: false
    });
  };

  const handleSavePreset = () => {
    const config = { layers, settings, privacyMode };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `layer-config-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    a?.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadPreset = (presetId) => {
    // Mock preset loading
    console.log('Loading preset:', presetId);
  };

  // Bulk actions
  const handleBulkToggle = (visible) => {
    setLayers(prev => prev?.map(layer => ({ ...layer, visible })));
  };

  const handleBulkOpacity = (opacity) => {
    setLayers(prev => prev?.map(layer => ({ ...layer, opacity })));
  };

  const handleBulkReset = (type) => {
    switch (type) {
      case 'visibility':
        setLayers(prev => prev?.map(layer => ({ ...layer, visible: true })));
        break;
      case 'opacity':
        setLayers(prev => prev?.map(layer => ({ ...layer, opacity: 1.0 })));
        break;
      case 'colors':
        // Reset to default colors
        break;
      case 'all':
        // Reset all settings
        break;
    }
  };

  const handleExportConfig = () => {
    handleSavePreset();
  };

  const handleImportConfig = (config) => {
    if (config?.layers) setLayers(config?.layers);
    if (config?.settings) setSettings(config?.settings);
    if (config?.privacyMode) setPrivacyMode(config?.privacyMode);
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col space-y-6 p-6 overflow-y-auto">
      {/* Layer Tree */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Data Layers</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpandedLayers({})}
            title="Collapse All"
          >
            <Icon name="Minimize2" size={16} />
          </Button>
        </div>
        
        <div className="space-y-2">
          {layers?.map((layer) => (
            <LayerTreeItem
              key={layer?.id}
              layer={layer}
              onToggleVisibility={handleToggleVisibility}
              onOpacityChange={handleOpacityChange}
              onColorChange={handleColorChange}
              onExtrusionChange={handleExtrusionChange}
              isExpanded={expandedLayers?.[layer?.id]}
              onToggleExpanded={handleToggleExpanded}
            />
          ))}
        </div>
      </div>

      {/* Privacy Controls */}
      <PrivacyControls
        privacyMode={privacyMode}
        onPrivacyModeChange={setPrivacyMode}
      />

      {/* Bulk Actions */}
      <BulkActions
        layers={layers}
        onBulkToggle={handleBulkToggle}
        onBulkOpacity={handleBulkOpacity}
        onBulkReset={handleBulkReset}
        onExportConfig={handleExportConfig}
        onImportConfig={handleImportConfig}
      />

      {/* Advanced Settings */}
      <AdvancedSettings
        settings={settings}
        onSettingsChange={handleSettingsChange}
        onResetToDefaults={handleResetToDefaults}
        onSavePreset={handleSavePreset}
        onLoadPreset={handleLoadPreset}
      />

      {/* Performance Metrics */}
      <PerformanceMetrics metrics={metrics} />
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Layer Management Dashboard - DelhiGeoChat</title>
        <meta name="description" content="Control data layer visibility, styling, and interaction modes for optimal map visualization experience in Delhi." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="pt-20 h-screen flex">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <div className="w-96 bg-card border-r border-border flex-shrink-0">
              <SidebarContent />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <div className="p-6 h-full">
              <MapPreview
                layers={layers}
                privacyMode={privacyMode}
                settings={settings}
              />
            </div>
          </div>

          {/* Mobile Bottom Sheet */}
          {isMobile && (
            <>
              {/* Floating Action Button */}
              <Button
                variant="default"
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
                className="fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full shadow-lg hover-glow"
              >
                <Icon name="Layers" size={24} />
              </Button>

              {/* Bottom Sheet Overlay */}
              {isSidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                  <div 
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setIsSidebarOpen(false)}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-xl max-h-[80vh] overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-border">
                      <h2 className="text-lg font-semibold text-foreground">Layer Controls</h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <Icon name="X" size={20} />
                      </Button>
                    </div>
                    <SidebarContent />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LayerManagementDashboard;