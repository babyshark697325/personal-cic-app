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

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    // Check-in intent detection (robust)
    const trimmedText = messageText.trim();
    const checkinRegex = /^(check in|\/checkin|checking in)\s*(.*)$/i;
    const match = trimmedText.match(checkinRegex);
    if (match) {
      console.log('Check-in intent detected:', match);
    } else {
      console.log('No check-in intent detected:', trimmedText);
    }

    const newMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    if (match) {
      // Extracted check-in message
      const checkinMsg = match[2]?.trim() || "";
      try {
        const res = await fetch("https://myvillageproject.app.n8n.cloud/webhook/a8f0dc29-4f34-491a-a2ec-ca87db49e0f6", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Source: "Bloom",
            First_Name: "Nykeira",
            Last_Name: "McRoy",
            Message: checkinMsg,
            Timestamp: new Date().toISOString()
          })
        });
        if (res.ok) {
          setMessages(prev => [...prev, {
            id: prev.length + 2,
            text: "✅ Got it — your check-in was sent successfully!",
            isUser: false,
            timestamp: new Date()
          }]);
        } else {
          setMessages(prev => [...prev, {
            id: prev.length + 2,
            text: "⚠️ Something went wrong sending your check-in.",
            isUser: false,
            timestamp: new Date()
          }]);
        }
      } catch (err) {
        setMessages(prev => [...prev, {
          id: prev.length + 2,
          text: "⚠️ Something went wrong sending your check-in.",
          isUser: false,
          timestamp: new Date()
        }]);
      }
      setIsTyping(false);
      return;
    }

    // Simulate AI response (default)
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
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
    "What can you do?",
    "How does this work?",
    "Tell me about yourself"
  ];

  if (!showChat) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6">
            <FlowerIcon className="w-full h-full text-[#8b7ff5]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Bloom AI</h1>
          <p className="text-gray-600 mb-8">How can I help you today?</p>
          <div className="space-y-3">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setShowChat(true);
                  handleSendMessage(question);
                }}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-full text-left hover:bg-gray-50 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowChat(true)}
            className="mt-6 w-full py-3 bg-[#8b7ff5] text-white rounded-full font-medium hover:bg-[#7a6fe3] transition-colors shadow-md"
          >
            Start Chat
          </button>
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
            {messages.map((message) => (
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
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full px-6 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-[#8b7ff5] focus:border-transparent text-gray-800 placeholder-gray-400"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
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
