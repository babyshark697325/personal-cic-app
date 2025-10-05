"use client";

import React, { useState, useRef, useEffect } from 'react';
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

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    setShowChat(true);
    
    const newMessage: Message = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: "I'm your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && inputText.trim()) {
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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6">
            <FlowerIcon className="w-full h-full text-[#8b7ff5]" />
          </div>
          <h1 className="text-4xl text-gray-800 leading-tight mb-2" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>Bloom AI</h1>
          <p className="text-lg text-gray-600 mb-8">Your personal productivity assistant</p>
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
        </div>
        <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-6 px-4 pl-[280px]">
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-full shadow-lg px-4 py-1 flex items-center gap-2 w-full">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && inputText.trim()) {
                    handleSendMessage();
                  }
                }}
                placeholder="Ask Bloom AI anything..."
                className="w-full px-4 py-3 border-0 rounded-full text-base text-gray-900 focus:outline-none bg-white placeholder-gray-400"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="w-8 h-8 flex items-center justify-center text-white text-sm font-medium rounded-full bg-[#736ee1] hover:bg-[#5a54c4] transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-white to-[#f0e8ff]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setShowChat(false);
              setMessages([]);
              setInputText('');
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="w-5 h-5">
            <FlowerIcon className="w-full h-full text-[#8b7ff5]" />
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 px-0 pb-32 overflow-y-auto">
        <div className="w-full pt-6 px-6">
          {/* Messages Area */}
          <div className="space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end gap-2 ${message.isUser ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  {!message.isUser && (
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <FlowerIcon className="w-4 h-4 text-[#8b7ff5]" />
                    </div>
                  )}
                  <div className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'}`}>
                    <div 
                      className={`rounded-[18px] px-4 py-2.5 ${message.isUser ? 'bg-[#8b7ff5] text-white' : 'bg-gray-100 text-gray-900'}`} 
                      style={{ maxWidth: '600px' }}
                    >
                      <div className="whitespace-pre-wrap text-[15px] leading-[1.4]">
                        {message.text}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <FlowerIcon className="w-4 h-4 text-[#8b7ff5]" />
                  </div>
                  <div className="bg-gray-100 text-gray-900 rounded-[18px] px-4 py-2.5">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-6 px-4 pl-[280px]">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-full shadow-lg px-4 py-1 flex items-center gap-2 w-full">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Bloom AI anything..."
              className="w-full px-4 py-3 border-0 rounded-full text-base text-gray-900 focus:outline-none bg-white placeholder-gray-400"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="w-8 h-8 flex items-center justify-center text-white text-sm font-medium rounded-full bg-[#736ee1] hover:bg-[#5a54c4] transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
