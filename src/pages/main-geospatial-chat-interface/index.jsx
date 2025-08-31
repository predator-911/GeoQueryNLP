import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ChatPanel from './components/ChatPanel';
import MapView from './components/MapView';
import InfoPanel from './components/InfoPanel';
import ControlBar from './components/ControlBar';

const MainGeospatialChatInterface = () => {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [queryResults, setQueryResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [privacyMode, setPrivacyMode] = useState('exact');
  const [mapStyle, setMapStyle] = useState('dark');
  const [layers, setLayers] = useState([
    { id: 'wards', name: 'Delhi Wards', active: true, color: 'bg-blue-400' },
    { id: 'hospitals', name: 'Hospitals', active: true, color: 'bg-red-400' },
    { id: 'metro', name: 'Metro Stations', active: true, color: 'bg-blue-400' },
    { id: 'atms', name: 'ATMs', active: false, color: 'bg-green-400' },
    { id: 'police', name: 'Police Stations', active: false, color: 'bg-yellow-400' },
    { id: 'government', name: 'Govt Offices', active: false, color: 'bg-purple-400' }
  ]);

  // Mock data for different query types
  const mockDataSets = {
    hospitals: [
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
      }
    ],
    atms: [
      {
        id: 3,
        name: "State Bank of India ATM",
        type: "atm",
        address: "Janpath, New Delhi, Delhi 110001",
        distance: "0.5 km",
        phone: "1800-11-2211",
        hours: "24/7",
        coordinates: [77.2245, 28.6289],
        amenities: ["Cash Withdrawal", "Balance Inquiry", "Mini Statement"]
      },
      {
        id: 4,
        name: "HDFC Bank ATM",
        type: "atm",
        address: "Connaught Place, New Delhi, Delhi 110001",
        distance: "0.8 km",
        phone: "1800-266-4332",
        hours: "24/7",
        coordinates: [77.2167, 28.6315],
        amenities: ["Cash Withdrawal", "Deposit", "PIN Change"]
      }
    ],
    metro: [
      {
        id: 5,
        name: "Connaught Place Metro Station",
        type: "metro",
        address: "Connaught Place, New Delhi, Delhi 110001",
        distance: "1.8 km",
        rating: 4.3,
        hours: "06:00 - 23:00",
        coordinates: [77.2167, 28.6315],
        amenities: ["Blue Line", "Yellow Line", "Parking", "Escalator"]
      },
      {
        id: 6,
        name: "Rajiv Chowk Metro Station",
        type: "metro",
        address: "Rajiv Chowk, New Delhi, Delhi 110001",
        distance: "2.1 km",
        rating: 4.4,
        hours: "06:00 - 23:00",
        coordinates: [77.2190, 28.6328],
        amenities: ["Blue Line", "Yellow Line", "Shopping", "Food Court"]
      }
    ]
  };

  const handleQuerySubmit = async (query) => {
    setIsLoading(true);
    
    // Add user message to conversation
    const userMessage = {
      type: 'user',
      content: query,
      timestamp: new Date()
    };
    setConversationHistory(prev => [...prev, userMessage]);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple query parsing to determine result type
    let results = [];
    let responseMessage = '';

    if (query?.toLowerCase()?.includes('hospital')) {
      results = mockDataSets?.hospitals;
      responseMessage = `Found ${results?.length} hospitals near your location. The closest is ${results?.[0]?.name} at ${results?.[0]?.distance}.`;
    } else if (query?.toLowerCase()?.includes('atm')) {
      results = mockDataSets?.atms;
      responseMessage = `Found ${results?.length} ATMs nearby. The nearest ATM is ${results?.[0]?.name} just ${results?.[0]?.distance} away.`;
    } else if (query?.toLowerCase()?.includes('metro')) {
      results = mockDataSets?.metro;
      responseMessage = `Found ${results?.length} metro stations in the area. ${results?.[0]?.name} is the closest at ${results?.[0]?.distance}.`;
    } else {
      // Default to hospitals for demo
      results = mockDataSets?.hospitals;
      responseMessage = `I found some relevant locations for your query. Here are ${results?.length} nearby places that might help.`;
    }

    // Add bot response to conversation
    const botMessage = {
      type: 'bot',
      content: responseMessage,
      timestamp: new Date()
    };

    setQueryResults(results);
    setConversationHistory(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleLocationHover = (location) => {
    setSelectedLocation(location);
  };

  const handleLayerToggle = (layerId) => {
    setLayers(prev => prev?.map(layer => 
      layer?.id === layerId ? { ...layer, active: !layer?.active } : layer
    ));
  };

  const handlePrivacyModeChange = (mode) => {
    setPrivacyMode(mode);
  };

  const handleMapStyleChange = (style) => {
    setMapStyle(style);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Control Bar */}
          <ControlBar
            layers={layers}
            privacyMode={privacyMode}
            mapStyle={mapStyle}
            onLayerToggle={handleLayerToggle}
            onPrivacyModeChange={handlePrivacyModeChange}
            onMapStyleChange={handleMapStyleChange}
          />

          {/* Main Interface Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-200px)]">
            {/* Chat Panel - Left */}
            <div className="lg:col-span-1 order-1 lg:order-1">
              <ChatPanel
                onQuerySubmit={handleQuerySubmit}
                conversationHistory={conversationHistory}
                isLoading={isLoading}
              />
            </div>

            {/* Map View - Center */}
            <div className="lg:col-span-2 order-3 lg:order-2">
              <MapView
                queryResults={queryResults}
                selectedLocation={selectedLocation}
                onLocationHover={handleLocationHover}
                mapStyle={mapStyle}
                layers={layers}
              />
            </div>

            {/* Info Panel - Right */}
            <div className="lg:col-span-1 order-2 lg:order-3">
              <InfoPanel
                queryResults={queryResults}
                selectedLocation={selectedLocation}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Mobile Bottom Spacing */}
          <div className="h-20 lg:hidden"></div>
        </div>
      </main>
    </div>
  );
};

export default MainGeospatialChatInterface;