import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatPanel = ({ onQuerySubmit, conversationHistory, isLoading }) => {
  const [query, setQuery] = useState('');
  const messagesEndRef = useRef(null);

  const sampleQueries = [
    "Find hospitals near Connaught Place",
    "Show ATMs within 2km of India Gate",
    "Metro stations in Karol Bagh area",
    "Nearest police stations to Red Fort",
    "Government offices in Central Delhi",
    "Banks near Chandni Chowk metro"
  ];

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query?.trim() && !isLoading) {
      onQuerySubmit(query?.trim());
      setQuery('');
    }
  };

  const handleSampleQuery = (sampleQuery) => {
    if (!isLoading) {
      onQuerySubmit(sampleQuery);
    }
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="MessageSquare" size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Chat Interface</h2>
            <p className="text-sm text-muted-foreground">Ask about Delhi locations</p>
          </div>
        </div>
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversationHistory?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="MapPin" size={32} className="text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Welcome to DelhiGeoChat</h3>
            <p className="text-muted-foreground mb-6">Start exploring Delhi's geographic data with natural language queries</p>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground mb-3">Try these sample queries:</p>
              {sampleQueries?.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => handleSampleQuery(sample)}
                  disabled={isLoading}
                  className="block w-full text-left p-3 rounded-lg bg-muted/30 hover:bg-muted/50 text-sm text-foreground smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="Search" size={14} className="inline mr-2 text-primary" />
                  {sample}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {conversationHistory?.map((message, index) => (
              <div key={index} className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
                }`}>
                  <p className="text-sm">{message?.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message?.timestamp?.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm">Processing query...</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e?.target?.value)}
              placeholder="Ask about Delhi locations..."
              disabled={isLoading}
              className="w-full px-4 py-3 pr-12 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Icon name="Search" size={18} className="text-muted-foreground" />
            </div>
          </div>
          <Button
            type="submit"
            disabled={!query?.trim() || isLoading}
            iconName="Send"
            iconSize={18}
            className="px-4"
          >
            Send
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send • Try: "hospitals near CP" or "ATMs in Karol Bagh"
        </p>
      </div>
    </div>
  );
};

export default ChatPanel;