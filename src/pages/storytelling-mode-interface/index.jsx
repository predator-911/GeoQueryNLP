import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StoryChapter from './components/StoryChapter';
import ProgressIndicator from './components/ProgressIndicator';
import MapBackground from './components/MapBackground';
import InteractiveHotspot from './components/InteractiveHotspot';
import AutoPlayControls from './components/AutoPlayControls';
import NavigationBar from './components/NavigationBar';
import Icon from '../../components/AppIcon';


const StorytellingModeInterface = () => {
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(1);
  const [showHotspots, setShowHotspots] = useState(false);
  const [interactionMode, setInteractionMode] = useState('explore'); // explore, learn, demo
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Comprehensive story chapters covering all GeoQuery-NLP features
  const storyChapters = [
    {
      id: 1,
      title: "Welcome to GeoQuery-NLP",
      subtitle: "Conversational Geospatial Intelligence",
      description: `Discover Delhi's urban landscape through natural language conversations. GeoQuery-NLP transforms how you interact with geographic data - simply ask questions in plain English and explore interactive 2D/3D visualizations. Built entirely client-side for privacy, offline-ready deployment, and lightning-fast responses.`,
      features: ["Natural Language Processing", "Client-side Processing", "Privacy-Preserving", "Offline-Ready"],
      stats: [
        { value: "100%", label: "Client-Side", icon: "Shield" },
        { value: "Zero", label: "Paid APIs", icon: "DollarSign" },
        { value: "Free", label: "Deployment", icon: "Zap" },
        { value: "24/7", label: "Available", icon: "Clock" }
      ],
      mapLayer: "overview",
      interactiveElements: [
        { type: "demo", label: "Try Natural Language Query", action: "showNLPDemo" },
        { type: "explore", label: "Explore Privacy Features", action: "showPrivacyInfo" }
      ],
      color: "from-blue-500 to-cyan-500",
      icon: "MessageCircle"
    },
    {
      id: 2,
      title: "Delhi-Specific Data Intelligence",
      subtitle: "Comprehensive Urban Dataset",
      description: `Navigate through Delhi's complete administrative structure with 272 wards, 11 districts, and thousands of points of interest. Our local GeoJSON dataset includes hospitals, ATMs, metro stations, government offices, and commercial centers - all processed locally for instant responses and maximum privacy.`,
      features: ["272 Delhi Wards", "11 Districts", "Complete POI Database", "Local GeoJSON Processing"],
      stats: [
        { value: "272", label: "Wards", icon: "Map" },
        { value: "1,484", label: "km² Area", icon: "Globe" },
        { value: "32.9M", label: "Population", icon: "Users" },
        { value: "5000+", label: "POIs", icon: "MapPin" }
      ],
      mapLayer: "wards",
      interactiveElements: [
        { type: "explore", label: "Browse Ward Details", action: "showWardExplorer" },
        { type: "demo", label: "Query POI Database", action: "showPOISearch" }
      ],
      color: "from-emerald-500 to-teal-500",
      icon: "Database"
    },
    {
      id: 3,
      title: "Natural Language Query Engine",
      subtitle: "Speak Your Geographic Questions",
      description: `Ask questions naturally: "Find hospitals near Connaught Place", "Show me ATMs within 2km of AIIMS", or "What metro stations are in South Delhi?". Our advanced NLP engine understands context, handles multi-turn conversations, and learns from your preferences while keeping everything private.`,
      features: ["Multi-turn Conversations", "Context Understanding", "Preference Learning", "Fuzzy Matching"],
      stats: [
        { value: "95%", label: "Query Accuracy", icon: "Target" },
        { value: "<100ms", label: "Response Time", icon: "Zap" },
        { value: "∞", label: "Query Types", icon: "MessageSquare" },
        { value: "Smart", label: "Context", icon: "Brain" }
      ],
      mapLayer: "nlp_demo",
      interactiveElements: [
        { type: "demo", label: "Try Sample Queries", action: "showQueryDemo" },
        { type: "learn", label: "NLP Tutorial", action: "showNLPTutorial" }
      ],
      color: "from-purple-500 to-indigo-500",
      icon: "Brain"
    },
    {
      id: 4,
      title: "Interactive 2D/3D Visualizations",
      subtitle: "MapLibre GL & deck.gl Power",
      description: `Experience stunning interactive maps powered by MapLibre GL and deck.gl. Switch between 2D and 3D views, apply custom styling, layer multiple datasets, and enjoy smooth animations. Every visualization is rendered client-side for optimal performance and data privacy.`,
      features: ["2D/3D Toggle", "Custom Map Styles", "Layered Visualizations", "Smooth Animations"],
      stats: [
        { value: "WebGL", label: "Powered", icon: "Layers" },
        { value: "60fps", label: "Animation", icon: "Play" },
        { value: "10+", label: "Map Styles", icon: "Palette" },
        { value: "Infinite", label: "Zoom Levels", icon: "ZoomIn" }
      ],
      mapLayer: "3d_demo",
      interactiveElements: [
        { type: "demo", label: "Toggle 2D/3D View", action: "toggle3DView" },
        { type: "explore", label: "Map Styles Gallery", action: "showMapStyles" }
      ],
      color: "from-orange-500 to-red-500",
      icon: "Layers"
    },
    {
      id: 5,
      title: "Advanced Search & Buffer Analysis",
      subtitle: "Turf.js Spatial Operations",
      description: `Perform sophisticated spatial analysis with buffer zones, nearest neighbor searches, and proximity analysis. Our turf.js integration enables complex geographic computations entirely in your browser - no server required for maximum privacy and speed.`,
      features: ["Buffer Zone Analysis", "Nearest Neighbor Search", "Proximity Calculations", "Spatial Intersections"],
      stats: [
        { value: "Turf.js", label: "Powered", icon: "Calculator" },
        { value: "Real-time", label: "Analysis", icon: "Activity" },
        { value: "Precise", label: "Geometry", icon: "Triangle" },
        { value: "Client-side", label: "Processing", icon: "Cpu" }
      ],
      mapLayer: "buffer_demo",
      interactiveElements: [
        { type: "demo", label: "Create Buffer Zones", action: "showBufferDemo" },
        { type: "explore", label: "Spatial Analysis Tools", action: "showSpatialTools" }
      ],
      color: "from-cyan-500 to-blue-500",
      icon: "Calculator"
    },
    {
      id: 6,
      title: "Fly-to Animations & Transitions",
      subtitle: "Cinematic Map Navigation",
      description: `Enjoy smooth, cinematic transitions as you explore Delhi. Our intelligent camera system provides contextual fly-to animations, smooth zoom transitions, and guided tours. Every movement is optimized for the best user experience while maintaining performance.`,
      features: ["Cinematic Transitions", "Smart Camera Control", "Contextual Navigation", "Performance Optimized"],
      stats: [
        { value: "Smooth", label: "60fps Animations", icon: "Wind" },
        { value: "Smart", label: "Camera AI", icon: "Camera" },
        { value: "Contextual", label: "Navigation", icon: "Navigation" },
        { value: "Optimized", label: "Performance", icon: "Gauge" }
      ],
      mapLayer: "animation_demo",
      interactiveElements: [
        { type: "demo", label: "Experience Fly-to", action: "showFlyToDemo" },
        { type: "explore", label: "Animation Settings", action: "showAnimationControls" }
      ],
      color: "from-violet-500 to-purple-500",
      icon: "Wind"
    },
    {
      id: 7,
      title: "Heatmaps & Data Density",
      subtitle: "Pattern Recognition Visualization",
      description: `Visualize data patterns with dynamic heatmaps showing hospital density, ATM distribution, metro accessibility, and population clusters. Our real-time heatmap generation helps identify service gaps and urban planning opportunities.`,
      features: ["Dynamic Heatmaps", "Density Analysis", "Pattern Recognition", "Real-time Updates"],
      stats: [
        { value: "Live", label: "Heatmaps", icon: "TrendingUp" },
        { value: "Multiple", label: "Data Layers", icon: "Layers3" },
        { value: "Real-time", label: "Updates", icon: "RefreshCw" },
        { value: "Interactive", label: "Filtering", icon: "Filter" }
      ],
      mapLayer: "heatmap_demo",
      interactiveElements: [
        { type: "demo", label: "Generate Heatmaps", action: "showHeatmapDemo" },
        { type: "explore", label: "Density Analysis", action: "showDensityTools" }
      ],
      color: "from-red-500 to-orange-500",
      icon: "TrendingUp"
    },
    {
      id: 8,
      title: "Multi-turn Chat Intelligence",
      subtitle: "Conversational Context Memory",
      description: `Engage in natural conversations that remember context. Ask follow-up questions, refine searches, and build upon previous queries. Our chat system maintains conversation history while ensuring all processing stays client-side for privacy.`,
      features: ["Context Memory", "Follow-up Queries", "Conversation History", "Smart Suggestions"],
      stats: [
        { value: "Context", label: "Aware", icon: "MessageCircle" },
        { value: "History", label: "Maintained", icon: "History" },
        { value: "Smart", label: "Suggestions", icon: "Lightbulb" },
        { value: "Private", label: "Conversations", icon: "Lock" }
      ],
      mapLayer: "chat_demo",
      interactiveElements: [
        { type: "demo", label: "Try Multi-turn Chat", action: "showChatDemo" },
        { type: "learn", label: "Chat Best Practices", action: "showChatTutorial" }
      ],
      color: "from-green-500 to-emerald-500",
      icon: "MessageCircle"
    },
    {
      id: 9,
      title: "Fuzzy Search with Fuse.js",
      subtitle: "Intelligent Query Matching",
      description: `Find what you're looking for even with typos, abbreviations, or partial matches. Our fuzzy search powered by Fuse.js understands "AIIMS" equals "All India Institute of Medical Sciences" and "CP" means "Connaught Place" - making queries more intuitive.`,
      features: ["Typo Tolerance", "Abbreviation Support", "Partial Matching", "Learning Algorithm"],
      stats: [
        { value: "Fuzzy", label: "Matching", icon: "Search" },
        { value: "Typo", label: "Tolerant", icon: "Type" },
        { value: "Smart", label: "Abbreviations", icon: "Zap" },
        { value: "Learning", label: "Algorithm", icon: "Brain" }
      ],
      mapLayer: "search_demo",
      interactiveElements: [
        { type: "demo", label: "Try Fuzzy Search", action: "showFuzzySearchDemo" },
        { type: "explore", label: "Search Settings", action: "showSearchSettings" }
      ],
      color: "from-indigo-500 to-blue-500",
      icon: "Search"
    },
    {
      id: 10,
      title: "Privacy-Preserving Architecture",
      subtitle: "Your Data Stays With You",
      description: `Experience complete data privacy with zero server dependencies. All processing happens in your browser - no queries sent to external servers, no user tracking, no data collection. Deploy anywhere as a static site while maintaining full functionality.`,
      features: ["Zero Server Calls", "No Data Collection", "Local Processing", "Static Site Deployment"],
      stats: [
        { value: "100%", label: "Client-side", icon: "Shield" },
        { value: "Zero", label: "Tracking", icon: "EyeOff" },
        { value: "Private", label: "Queries", icon: "Lock" },
        { value: "Secure", label: "By Design", icon: "CheckCircle" }
      ],
      mapLayer: "privacy_demo",
      interactiveElements: [
        { type: "learn", label: "Privacy Features", action: "showPrivacyDetails" },
        { type: "explore", label: "Architecture Overview", action: "showArchitecture" }
      ],
      color: "from-slate-500 to-gray-500",
      icon: "Shield"
    },
    {
      id: 11,
      title: "Scroll-Driven Storytelling",
      subtitle: "Immersive Geographic Narratives",
      description: `This very experience demonstrates our scroll-driven storytelling capabilities. Create immersive geographic narratives that unfold as users scroll, combining data visualization with compelling stories about urban development, infrastructure, and community insights.`,
      features: ["Scroll Animations", "Progressive Disclosure", "Narrative Structure", "Immersive Experience"],
      stats: [
        { value: "Scroll", label: "Driven", icon: "ScrollText" },
        { value: "Progressive", label: "Disclosure", icon: "ChevronDown" },
        { value: "Narrative", label: "Structure", icon: "BookOpen" },
        { value: "Immersive", label: "Experience", icon: "Eye" }
      ],
      mapLayer: "storytelling_demo",
      interactiveElements: [
        { type: "demo", label: "Create Your Story", action: "showStoryBuilder" },
        { type: "explore", label: "Story Templates", action: "showStoryTemplates" }
      ],
      color: "from-pink-500 to-rose-500",
      icon: "BookOpen"
    },
    {
      id: 12,
      title: "Deployment & Integration",
      subtitle: "Free, Fast, and Flexible",
      description: `Deploy GeoQuery-NLP anywhere - Hugging Face Spaces, GitHub Pages, Netlify, or any static hosting. With zero dependencies on paid APIs or backends, enjoy unlimited usage, instant deployment, and seamless integration into existing applications.`,
      features: ["Static Site Deployment", "Multiple Hosting Options", "Zero Cost", "Easy Integration"],
      stats: [
        { value: "Static", label: "Deployment", icon: "Upload" },
        { value: "Free", label: "Hosting", icon: "Gift" },
        { value: "Instant", label: "Updates", icon: "Zap" },
        { value: "Easy", label: "Integration", icon: "Puzzle" }
      ],
      mapLayer: "deployment_demo",
      interactiveElements: [
        { type: "learn", label: "Deployment Guide", action: "showDeploymentGuide" },
        { type: "explore", label: "Integration Options", action: "showIntegrationOptions" }
      ],
      color: "from-emerald-500 to-green-500",
      icon: "Upload"
    }
  ];

  // Enhanced interactive hotspots with more details
  const interactiveHotspots = [
    {
      id: 1,
      title: "AIIMS Delhi - Medical Excellence",
      description: "Premier medical institution demonstrating healthcare accessibility analysis with real-time data visualization.",
      position: { x: 45, y: 60 },
      type: "hospital",
      interactive: true,
      data: [
        { value: "2,478", label: "Beds", icon: "Bed" },
        { value: "24/7", label: "Emergency", icon: "AlertCircle" },
        { value: "50+", label: "Specialties", icon: "Stethoscope" },
        { value: "5★", label: "Rating", icon: "Star" }
      ],
      actions: [
        { label: "Find Similar Hospitals", action: "findSimilarHospitals" },
        { label: "Analyze Accessibility", action: "analyzeAccessibility" },
        { label: "3D Hospital View", action: "show3DHospital" }
      ]
    },
    {
      id: 2,
      title: "Connaught Place - Commercial Hub",
      description: "Central business district showcasing financial services distribution and urban density analysis.",
      position: { x: 50, y: 45 },
      type: "commercial",
      interactive: true,
      data: [
        { value: "127", label: "ATMs", icon: "CreditCard" },
        { value: "45", label: "Bank Branches", icon: "Building" },
        { value: "2M+", label: "Daily Footfall", icon: "Users" },
        { value: "Historic", label: "Heritage", icon: "Crown" }
      ],
      actions: [
        { label: "ATM Density Analysis", action: "analyzeATMDensity" },
        { label: "Financial Services Map", action: "showFinancialMap" },
        { label: "Historical Timeline", action: "showHistoricalData" }
      ]
    },
    {
      id: 3,
      title: "Rajiv Chowk Metro - Transit Hub",
      description: "Busiest metro interchange demonstrating multi-modal transportation analysis and connectivity metrics.",
      position: { x: 52, y: 47 },
      type: "metro",
      interactive: true,
      data: [
        { value: "400K", label: "Daily Users", icon: "Users" },
        { value: "4", label: "Line Connections", icon: "GitBranch" },
        { value: "24", label: "Entry/Exit Points", icon: "DoorOpen" },
        { value: "Underground", label: "Architecture", icon: "Building" }
      ],
      actions: [
        { label: "Route Planner", action: "showRoutePlanner" },
        { label: "Accessibility Analysis", action: "analyzeMetroAccess" },
        { label: "Real-time Status", action: "showMetroStatus" }
      ]
    },
    {
      id: 4,
      title: "Interactive Buffer Zone",
      description: "Dynamic buffer analysis showing 1km radius around selected location with real-time POI counting.",
      position: { x: 48, y: 52 },
      type: "buffer",
      interactive: true,
      data: [
        { value: "1km", label: "Radius", icon: "Circle" },
        { value: "Live", label: "Analysis", icon: "Activity" },
        { value: "Multi-layer", label: "Data", icon: "Layers" },
        { value: "Real-time", label: "Updates", icon: "RefreshCw" }
      ],
      actions: [
        { label: "Adjust Buffer Size", action: "adjustBuffer" },
        { label: "Layer Analysis", action: "analyzeBufferLayers" },
        { label: "Export Results", action: "exportBufferData" }
      ]
    },
    {
      id: 5,
      title: "Heatmap Visualization",
      description: "Dynamic heatmap showing service density patterns across Delhi with interactive filtering options.",
      position: { x: 55, y: 40 },
      type: "heatmap",
      interactive: true,
      data: [
        { value: "Live", label: "Heatmap", icon: "TrendingUp" },
        { value: "5", label: "Data Layers", icon: "Layers3" },
        { value: "Interactive", label: "Filters", icon: "Sliders" },
        { value: "High-Res", label: "Graphics", icon: "Monitor" }
      ],
      actions: [
        { label: "Toggle Heatmap Types", action: "toggleHeatmapTypes" },
        { label: "Adjust Intensity", action: "adjustHeatmapIntensity" },
        { label: "Filter by Category", action: "filterHeatmapData" }
      ]
    }
  ];

  // Auto-scroll functionality with enhanced controls
  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setScrollProgress(prev => {
          const newProgress = prev + (1.5 * autoPlaySpeed);
          if (newProgress >= 100) {
            if (currentChapter < storyChapters?.length) {
              setCurrentChapter(curr => curr + 1);
              return 0;
            } else {
              setIsAutoPlay(false);
              return 100;
            }
          }
          return newProgress;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, autoPlaySpeed, currentChapter, storyChapters?.length]);

  // Enhanced scroll event handler with smooth progress
  useEffect(() => {
    const handleScroll = () => {
      if (!isAutoPlay) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement?.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        
        const chapterSize = 100 / storyChapters?.length;
        const chapterIndex = Math.floor(scrollPercent / chapterSize) + 1;
        const chapterProgress = (scrollPercent % chapterSize) * (storyChapters?.length);
        
        setScrollProgress(chapterProgress);
        setCurrentChapter(Math.min(Math.max(chapterIndex, 1), storyChapters?.length));
      }
    };

    const debouncedScroll = debounce(handleScroll, 10);
    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [isAutoPlay, storyChapters?.length]);

  // Debounce function for better performance
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Show hotspots based on chapter with enhanced logic
  useEffect(() => {
    const shouldShowHotspots = currentChapter >= 3 && currentChapter <= 10;
    setShowHotspots(shouldShowHotspots);
    
    // Set interaction mode based on current chapter
    if (currentChapter <= 2) {
      setInteractionMode('learn');
    } else if (currentChapter <= 8) {
      setInteractionMode('demo');
    } else {
      setInteractionMode('explore');
    }
  }, [currentChapter]);

  // Enhanced event handlers with better UX
  const handleChapterSelect = useCallback((chapterId) => {
    setCurrentChapter(chapterId);
    setScrollProgress(0);
    setIsAutoPlay(false);
    
    // Smooth scroll to chapter
    const targetScroll = ((chapterId - 1) / storyChapters?.length) * document.documentElement?.scrollHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }, [storyChapters?.length]);

  const handleToggleAutoPlay = useCallback(() => {
    setIsAutoPlay(prev => !prev);
  }, []);

  const handleSpeedChange = useCallback((speed) => {
    setAutoPlaySpeed(speed);
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentChapter > 1) {
      const newChapter = currentChapter - 1;
      setCurrentChapter(newChapter);
      setScrollProgress(0);
      setIsAutoPlay(false);
      
      const targetScroll = ((newChapter - 1) / storyChapters?.length) * document.documentElement?.scrollHeight;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, [currentChapter, storyChapters?.length]);

  const handleNext = useCallback(() => {
    if (currentChapter < storyChapters?.length) {
      const newChapter = currentChapter + 1;
      setCurrentChapter(newChapter);
      setScrollProgress(0);
      setIsAutoPlay(false);
      
      const targetScroll = ((newChapter - 1) / storyChapters?.length) * document.documentElement?.scrollHeight;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, [currentChapter, storyChapters?.length]);

  // Enhanced hotspot interaction handler
  const handleHotspotExplore = useCallback((hotspot, action = null) => {
    setSelectedFeature(hotspot);
    
    if (action) {
      // Handle specific actions based on the action type
      switch (action) {
        case 'findSimilarHospitals': console.log('Finding similar hospitals...');
          break;
        case 'analyzeAccessibility': console.log('Analyzing accessibility...');
          break;
        case 'show3DHospital': console.log('Showing 3D hospital view...');
          break;
        case 'analyzeATMDensity': console.log('Analyzing ATM density...');
          break;
        case 'showRoutePlanner': console.log('Opening route planner...');
          break;
        case 'adjustBuffer': console.log('Adjusting buffer size...');
          break;
        case 'toggleHeatmapTypes': console.log('Toggling heatmap types...');
          break;
        default:
          console.log('Exploring hotspot:', hotspot?.title);
      }
    }
  }, []);

  // Interactive element handler
  const handleInteractiveElement = useCallback((action) => {
    switch (action) {
      case 'showNLPDemo': console.log('Showing NLP demonstration...');
        break;
      case 'showPrivacyInfo': console.log('Displaying privacy information...');
        break;
      case 'toggle3DView': console.log('Toggling 3D view...');
        break;
      case 'showBufferDemo': console.log('Demonstrating buffer analysis...');
        break;
      case 'showChatDemo': console.log('Starting chat demonstration...');
        break;
      default:
        console.log('Handling interactive element:', action);
    }
  }, []);

  const handleExitStoryMode = useCallback(() => {
    navigate('/main-geospatial-chat-interface');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Enhanced Navigation Bar */}
      <NavigationBar 
        onExitStoryMode={handleExitStoryMode}
        currentChapter={currentChapter}
        totalChapters={storyChapters?.length}
        interactionMode={interactionMode}
        onInteractionModeChange={setInteractionMode}
      />
      {/* Enhanced Map Background */}
      <MapBackground 
        currentChapter={currentChapter}
        scrollProgress={scrollProgress}
        isAutoPlay={isAutoPlay}
        interactionMode={interactionMode}
        selectedFeature={selectedFeature}
      />
      {/* Story Chapters with Enhanced Interactivity */}
      <div className="relative z-10">
        {storyChapters?.map((chapter, index) => (
          <StoryChapter
            key={chapter?.id}
            chapter={chapter}
            isActive={currentChapter === chapter?.id}
            progress={currentChapter === chapter?.id ? scrollProgress : 0}
            onChapterClick={handleChapterSelect}
            onInteractiveElement={handleInteractiveElement}
            interactionMode={interactionMode}
            chapterIndex={index}
            totalChapters={storyChapters?.length}
          />
        ))}
      </div>
      {/* Enhanced Interactive Hotspots */}
      {showHotspots && interactiveHotspots?.map((hotspot) => (
        <InteractiveHotspot
          key={hotspot?.id}
          hotspot={hotspot}
          isVisible={showHotspots}
          onExplore={handleHotspotExplore}
          currentChapter={currentChapter}
          interactionMode={interactionMode}
        />
      ))}
      {/* Enhanced Progress Indicator */}
      <ProgressIndicator
        currentChapter={currentChapter}
        totalChapters={storyChapters?.length}
        progress={(currentChapter - 1) * (100 / storyChapters?.length) + (scrollProgress / storyChapters?.length)}
        onChapterSelect={handleChapterSelect}
        chapters={storyChapters}
        isAutoPlay={isAutoPlay}
      />
      {/* Enhanced Auto Play Controls */}
      <AutoPlayControls
        isAutoPlay={isAutoPlay}
        onToggleAutoPlay={handleToggleAutoPlay}
        speed={autoPlaySpeed}
        onSpeedChange={handleSpeedChange}
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoPrevious={currentChapter > 1}
        canGoNext={currentChapter < storyChapters?.length}
        currentChapter={currentChapter}
        totalChapters={storyChapters?.length}
      />
      {/* Scroll Content for Manual Navigation with proper spacing */}
      <div className="relative z-0 opacity-0 pointer-events-none">
        {storyChapters?.map((chapter) => (
          <div key={chapter?.id} className="h-screen" />
        ))}
      </div>
      {/* Enhanced Welcome Overlay with Responsive Design */}
      <AnimatePresence>
        {currentChapter === 1 && scrollProgress < 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center max-w-4xl"
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                GeoQuery-NLP Stories
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Discover Delhi's urban intelligence through interactive geographic narratives. 
                Scroll, explore, and interact with cutting-edge geospatial technology.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon name="ChevronDown" size={24} className="text-primary" />
                  </motion.div>
                  <span>Scroll to explore</span>
                </div>
                
                <div className="text-muted-foreground">or</div>
                
                <button
                  onClick={handleToggleAutoPlay}
                  className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 smooth-transition"
                >
                  <Icon name="Play" size={16} />
                  <span>Start Auto-Play</span>
                </button>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-green-500" />
                  <span>100% Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} className="text-yellow-500" />
                  <span>Client-side</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Globe" size={16} className="text-blue-500" />
                  <span>Delhi-focused</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Layers" size={16} className="text-purple-500" />
                  <span>Interactive</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Feature Selection Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full shadow-2xl"
              onClick={(e) => e?.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">{selectedFeature?.title}</h3>
                <button 
                  onClick={() => setSelectedFeature(null)}
                  className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center smooth-transition"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              
              <p className="text-muted-foreground mb-6">{selectedFeature?.description}</p>
              
              {selectedFeature?.actions && (
                <div className="space-y-2">
                  {selectedFeature?.actions?.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleHotspotExplore(selectedFeature, action?.action)}
                      className="w-full flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/50 rounded-lg smooth-transition"
                    >
                      <span>{action?.label}</span>
                      <Icon name="ArrowRight" size={16} />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StorytellingModeInterface;