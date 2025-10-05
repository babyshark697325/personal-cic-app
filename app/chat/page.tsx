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

    const newMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages((prev: Message[]) => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: "I'm your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages((prev: Message[]) => [...prev, aiMessage]);
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
      <div className="bg-white min-h-screen flex flex-col items-center justify-center px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto">
                <FlowerIcon />
              </div>
            </div>
            <h1 className="text-4xl text-gray-800 leading-tight mb-2" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>Bloom AI</h1>
            <p className="text-lg text-gray-600">Your personal productivity assistant</p>
          </div>
        </div>
        {/* Improved Quick Question Cards - horizontal layout */}
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

  return (
    <div className="bg-white min-h-screen flex flex-col relative">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-100 shadow-sm">
        <button 
          onClick={() => {
            setShowChat(false);
            setMessages([]);
            setInputText('');
          }}
          className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-all text-[#8b7ff5]"
        >
          <FlowerIcon className="w-5 h-5" />
        </button>
        <span className="text-lg font-semibold text-gray-800 tracking-tight">Bloom AI</span>
      </div>

      {/* Chat Container */}
      <div className="flex-1 px-0 pb-32 overflow-y-auto">
        <div className="w-full pt-6 px-6">
          {/* Messages Area */}
          <div className="space-y-3">
            {messages.map((message: Message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end gap-2 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  {!message.isUser && (
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <FlowerIcon className="w-4 h-4 text-[#8b7ff5]" />
                    </div>
                  )}
                  <div className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'}`}>
                    <div className={`rounded-[18px] px-4 py-2.5 ${message.isUser ? 'bg-[#8b7ff5] text-white' : 'bg-gray-100 text-gray-900'}`} style={{ maxWidth: '600px' }}>
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto w-full p-4">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full px-6 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-[#8b7ff5] focus:border-transparent text-gray-800 placeholder-gray-400"
            />
            <button
              onClick={() => handleSendMessage()}
              className="absolute right-2 bg-[#8b7ff5] hover:bg-[#7a6fe3] text-white rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
