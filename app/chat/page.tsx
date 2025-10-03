"use client";

import { useState, useRef, useEffect } from 'react';
import FlowerIcon from '@/components/FlowerIcon';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Sample question responses
    if (lowerMessage.includes('work on next') || lowerMessage.includes('what should i work on next')) {
      return "Based on your current tasks and priorities, I recommend focusing on:\n\n• Your One-on-One Meeting preparation (due today)\n• Complete the client status update (currently at 11% progress)\n• Review the Product launch project tasks\n\nThese items will have the highest impact on your weekly goals. Would you like me to help you prioritize or break down any of these tasks?";
    }
    
    if (lowerMessage.includes('urgent tasks') || lowerMessage.includes('what are my urgent tasks')) {
      return "Here are your urgent tasks that need immediate attention:\n\n🔴 **High Priority - Due Today:**\n• One-on-One Meeting (scheduled for 10:00 AM)\n\n🟡 **Medium Priority:**\n• Send summary email to stakeholders (3 days left)\n• Update project documentation (63% complete)\n\nI recommend tackling the meeting preparation first, then the stakeholder email. Would you like me to help you plan these tasks?";
    }
    
    if (lowerMessage.includes('tasks created') || lowerMessage.includes('created by me and closed')) {
      return "Here's a summary of your task creation and completion activity:\n\n📝 **Tasks Created by You:**\n• Total created this week: 5 tasks\n• Created for team members: 3 tasks\n• Personal tasks: 2 tasks\n\n✅ **Tasks Completed:**\n• Completed this week: 12 tasks\n• Completion rate: 85%\n• Average completion time: 2.3 days\n\nYou're showing excellent productivity! Your task creation and completion balance is very healthy.";
    }
    
    // Default response for other queries
    return "I'm here to help you with your productivity and tasks! I can assist you with:\n\n• Task prioritization and planning\n• Schedule optimization\n• Productivity insights and analytics\n• Goal tracking and progress updates\n• Meeting and deadline management\n\nWhat specific area would you like help with today?";
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    // If this is the first message, show the chat interface
    if (messages.length === 0) {
      setShowChat(true);
    }

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(messageText),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What should I work on next?",
    "What are my urgent tasks?", 
    "What tasks are created by me and closed?"
  ];

  if (!showChat) {
    // Initial landing page view
    return (
      <div className="bg-gradient-to-br from-purple-100 via-purple-50 to-blue-50 min-h-screen flex flex-col items-center justify-center px-8" style={{background: 'linear-gradient(135deg, #f3f1ff 0%, #ede9ff 50%, #e6f3ff 100%)'}}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl text-gray-800 leading-tight mb-2" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
            Bloom AI
          </h1>
          <p className="text-sm text-gray-600">
            Your personal productivity assistant
          </p>
        </div>

        {/* Central Flower Icon */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto">
            <FlowerIcon />
          </div>
        </div>

        {/* Quick Question Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full mb-8">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(question)}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-white/50 hover:shadow-md hover:bg-white/90 transition-all duration-200 text-center group"
            >
              <div className="text-sm font-medium group-hover:text-gray-700 transition-colors" style={{color: '#736ee1'}}>
                {question}
              </div>
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="w-full max-w-xl">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-white/50">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Bloom AI anything..."
                  className="w-full px-3 py-2 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 bg-white/70"
                />
              </div>
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="px-4 py-2 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{backgroundColor: '#736ee1'}}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chat interface view
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="px-6 pt-6 pb-3">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <button 
              onClick={() => {
                setShowChat(false);
                setMessages([]);
                setInputText('');
              }}
              className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-all"
            >
              <div className="w-6 h-6">
                <FlowerIcon />
              </div>
            </button>
            <div>
              <h1 className="text-2xl text-gray-800 leading-tight" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
                Bloom AI
              </h1>
              <p className="text-sm text-gray-600">
                Your personal productivity assistant
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 px-6 pb-6">
        <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-3 max-w-3xl ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isUser 
                        ? 'bg-blue-500' 
                        : 'bg-white border-2 border-purple-200'
                    }`}>
                      {message.isUser ? (
                        <span className="text-white text-xs font-medium">You</span>
                      ) : (
                        <div className="w-5 h-5">
                          <FlowerIcon />
                        </div>
                      )}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={`rounded-lg px-4 py-3 ${
                      message.isUser 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.text}
                      </div>
                      <div className={`text-xs mt-2 ${
                        message.isUser ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3 max-w-3xl">
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center flex-shrink-0">
                      <div className="w-5 h-5">
                        <FlowerIcon />
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Bloom AI anything..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  style={{minHeight: '44px', maxHeight: '120px'}}
                  rows={1}
                />
              </div>
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping}
                className="px-6 py-3 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{backgroundColor: '#736ee1'}}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
