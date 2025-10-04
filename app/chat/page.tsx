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
    // Restored Bloom AI header and logo/text layout, improved suggestion boxes
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto">
                <FlowerIcon />
              </div>
            </div>
            <h1 className="text-4xl text-gray-800 leading-tight mb-2" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>
              Bloom AI
            </h1>
            <p className="text-lg text-gray-600">
              Your personal productivity assistant
            </p>
          </div>
        </div>
        {/* Improved Quick Question Cards */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(question)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition shadow-sm"
            >
              {question}
            </button>
          ))}
        </div>
        {/* Input Area fixed at bottom */}
        <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6 pointer-events-none">
          <div className="w-full max-w-xl pointer-events-auto">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Bloom AI anything..."
                className="w-full px-3 py-2 border-0 rounded-lg text-sm focus:outline-none bg-gray-50"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="px-4 py-2 text-white text-sm font-medium rounded-lg bg-[#736ee1] hover:bg-[#5a54c4] transition disabled:opacity-50 disabled:cursor-not-allowed"
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
    <div className="bg-white min-h-screen flex flex-col">
      {/* Minimal header */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-100 shadow-sm">
        <button 
          onClick={() => {
            setShowChat(false);
            setMessages([]);
            setInputText('');
          }}
          className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-all"
        >
          <FlowerIcon />
        </button>
        <span className="text-lg font-semibold text-gray-800 tracking-tight">Bloom AI</span>
      </div>
      {/* Chat Container */}
      <div className="flex-1 px-0 pb-32 overflow-y-auto">
        <div className="max-w-2xl mx-auto pt-6 px-6">
          {/* Messages Area */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end gap-2 w-full ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${message.isUser ? 'bg-[#736ee1]' : 'bg-gray-100 border border-gray-200'}`}>
                    {message.isUser ? (
                      <span className="text-white text-xs font-medium">You</span>
                    ) : (
                      <FlowerIcon />
                    )}
                  </div>
                  {/* Message Bubble */}
                  <div className={`rounded-xl px-4 py-3 shadow-sm ${message.isUser ? 'bg-[#736ee1] text-white' : 'bg-gray-50 text-gray-900 border border-gray-200'} max-w-[65%] sm:max-w-[520px]`}>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.text}
                    </div>
                    <div className={`text-xs mt-2 ${message.isUser ? 'text-purple-100' : 'text-gray-400'}`}>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </div>
              </div>
            ))}
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2 w-full">
                  <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <FlowerIcon />
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 shadow-sm max-w-[65%] sm:max-w-[520px]">
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
      </div>
      {/* Input Area fixed at bottom, perfectly centered */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6">
        <div className="max-w-2xl w-full mx-auto flex justify-center">
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-6 py-4 flex items-center gap-3 max-w-full w-full" style={{maxWidth: '600px'}}>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask Bloom AI anything..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-base focus:outline-none bg-gray-50 resize-none"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
              className="px-5 py-2 text-white text-base font-medium rounded-lg bg-[#736ee1] hover:bg-[#5a54c4] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
