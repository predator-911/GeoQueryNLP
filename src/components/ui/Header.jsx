import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Explore',
      path: '/main-geospatial-chat-interface',
      icon: 'MessageSquare',
      description: 'Chat-driven location discovery'
    },
    {
      label: 'Analyze',
      path: '/query-results-explorer',
      icon: 'Search',
      description: 'Query results and data filtering'
    },
    {
      label: 'Layers',
      path: '/layer-management-dashboard',
      icon: 'Layers',
      description: 'Data visualization control'
    },
    {
      label: 'Stories',
      path: '/storytelling-mode-interface',
      icon: 'BookOpen',
      description: 'Immersive geographic narratives'
    },
    {
      label: 'Data',
      path: '/offline-data-manager',
      icon: 'Database',
      description: 'Offline dataset management'
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [location?.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/main-geospatial-chat-interface');
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <div 
      className="flex items-center cursor-pointer group smooth-transition"
      onClick={handleLogoClick}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 smooth-transition mr-3">
        <Icon 
          name="MapPin" 
          size={24} 
          className="text-primary group-hover:scale-110 smooth-transition" 
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-foreground group-hover:text-primary smooth-transition">
          DelhiGeoChat
        </span>
        <span className="text-xs text-muted-foreground -mt-1">
          Spatial Intelligence
        </span>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Header */}
        <header className={`fixed top-0 left-0 right-0 z-1000 bg-background/95 backdrop-blur-subtle border-b border-border ${className}`}>
          <div className="flex items-center justify-between px-4 py-3">
            <Logo />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </header>
        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-1000 bg-card/95 backdrop-blur-subtle border-t border-border">
          <div className="flex items-center justify-around px-2 py-2">
            {navigationItems?.map((item) => {
              const isActive = isActivePath(item?.path);
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg smooth-transition min-w-0 flex-1 ${
                    isActive
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={item?.icon} size={20} className="mb-1" />
                  <span className="text-xs font-medium truncate">{item?.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-1500 bg-background/95 backdrop-blur-subtle">
            <div className="flex flex-col p-6 pt-20">
              {navigationItems?.map((item) => {
                const isActive = isActivePath(item?.path);
                return (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`flex items-center p-4 rounded-lg smooth-transition mb-2 ${
                      isActive
                        ? 'text-primary bg-primary/10 border border-primary/20' :'text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={item?.icon} size={24} className="mr-4" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{item?.label}</span>
                      <span className="text-sm text-muted-foreground">{item?.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-1000 bg-background/95 backdrop-blur-subtle border-b border-border ${className}`}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <Logo />
          
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => {
              const isActive = isActivePath(item?.path);
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center px-4 py-2 rounded-lg smooth-transition hover-glow ${
                    isActive
                      ? 'text-primary bg-primary/10 border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  title={item?.description}
                >
                  <Icon name={item?.icon} size={18} className="mr-2" />
                  <span className="font-medium">{item?.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="hidden lg:flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="hover-glow"
            title="Settings"
          >
            <Icon name="Settings" size={20} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="hover-glow"
            title="Help"
          >
            <Icon name="HelpCircle" size={20} />
          </Button>
          
          <div className="w-px h-6 bg-border mx-2" />
          
          <Button
            variant="outline"
            size="sm"
            className="hover-glow"
          >
            <Icon name="User" size={16} className="mr-2" />
            Profile
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;