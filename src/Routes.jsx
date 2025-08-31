import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import QueryResultsExplorer from './pages/query-results-explorer';
import MainGeospatialChatInterface from './pages/main-geospatial-chat-interface';
import OfflineDataManager from './pages/offline-data-manager';
import LayerManagementDashboard from './pages/layer-management-dashboard';
import StorytellingModeInterface from './pages/storytelling-mode-interface';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LayerManagementDashboard />} />
        <Route path="/query-results-explorer" element={<QueryResultsExplorer />} />
        <Route path="/main-geospatial-chat-interface" element={<MainGeospatialChatInterface />} />
        <Route path="/offline-data-manager" element={<OfflineDataManager />} />
        <Route path="/layer-management-dashboard" element={<LayerManagementDashboard />} />
        <Route path="/storytelling-mode-interface" element={<StorytellingModeInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
