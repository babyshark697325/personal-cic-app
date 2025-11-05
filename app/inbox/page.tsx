"use client";

import { useState } from 'react';

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  isRead: boolean;
  type: string;
  avatar: string;
}

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Sarah Wilson",
      subject: "Project Update - Q3 Launch",
      preview: "Hi team, I wanted to share the latest updates on our Q3 product launch. The development team has made significant progress...",
      time: "2 hours ago",
      isRead: false,
      type: "message",
      avatar: "SW"
    },
    {
      id: 2,
      sender: "Marketing Team",
      subject: "Campaign Performance Report",
      preview: "Our latest marketing campaign has exceeded expectations with a 15% increase in engagement rates...",
      time: "4 hours ago",
      isRead: true,
      type: "message",
      avatar: "MT"
    },
    {
      id: 3,
      sender: "System",
      subject: "Task Reminder: One-on-One Meeting",
      preview: "You have a scheduled one-on-one meeting with your manager today at 10:00 AM.",
      time: "6 hours ago",
      isRead: false,
      type: "reminder",
      avatar: "SY"
    },
    {
      id: 4,
      sender: "John Chen",
      subject: "Budget Review Meeting Notes",
      preview: "Thanks for the productive meeting today. Here are the key takeaways and action items we discussed...",
      time: "1 day ago",
      isRead: true,
      type: "message",
      avatar: "JC"
    },
    {
      id: 5,
      sender: "System",
      subject: "Weekly Analytics Report",
      preview: "Your weekly productivity report is ready. You completed 12 tasks this week with 85% on-time completion rate.",
      time: "1 day ago",
      isRead: false,
      type: "notification",
      avatar: "SY"
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filterType, setFilterType] = useState('all');

  const markAsRead = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
  };

  const deleteMessage = (messageId: number) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
    if (selectedMessage && selectedMessage.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const filteredMessages = filterType === 'all' 
    ? messages 
    : messages.filter(msg => msg.type === filterType);

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return (
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        );
      case 'notification':
        return (
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
  <div className="bg-gradient-to-b from-white to-[#f0e8ff] min-h-screen">
      <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-24 sm:pb-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-4xl text-gray-800 leading-tight mb-2" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
                Inbox
              </h1>
              <p className="text-lg text-gray-600">
                Stay on top of your messages and notifications
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Unread:</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                  {unreadCount}
                </span>
              </div>
              <button 
                onClick={() => setMessages(messages.map(msg => ({ ...msg, isRead: true })))}
                className="px-4 py-2 text-gray-600 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Mark All Read
              </button>
            </div>
          </div>
        </div>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Message List */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Filter Tabs */}
              <div className="border-b border-gray-200 p-4">
                <div className="flex space-x-1">
                  {[
                    { key: 'all', label: 'All', count: messages.length },
                    { key: 'message', label: 'Messages', count: messages.filter(m => m.type === 'message').length },
                    { key: 'reminder', label: 'Reminders', count: messages.filter(m => m.type === 'reminder').length },
                    { key: 'notification', label: 'Notifications', count: messages.filter(m => m.type === 'notification').length }
                  ].map(filter => (
                    <button
                      key={filter.key}
                      onClick={() => setFilterType(filter.key)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        filterType === filter.key
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {filter.label} ({filter.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Items */}
              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => {
                      setSelectedMessage(message);
                      markAsRead(message.id);
                    }}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                        message.type === 'message' ? 'bg-blue-500' :
                        message.type === 'reminder' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}>
                        {message.avatar}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getMessageTypeIcon(message.type)}
                          <span className={`text-sm font-medium ${!message.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                            {message.sender}
                          </span>
                          {!message.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        
                        <h3 className={`text-sm mb-1 truncate ${!message.isRead ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                          {message.subject}
                        </h3>
                        
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {message.preview}
                        </p>
                        
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-400">{message.time}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className="sm:col-span-2 col-span-1">
            {selectedMessage ? (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="border-b border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white ${
                        selectedMessage.type === 'message' ? 'bg-blue-500' :
                        selectedMessage.type === 'reminder' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}>
                        {selectedMessage.avatar}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getMessageTypeIcon(selectedMessage.type)}
                          <h2 className="text-lg font-medium text-gray-900">{selectedMessage.sender}</h2>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedMessage.subject}</h3>
                        <p className="text-sm text-gray-500">{selectedMessage.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => markAsRead(selectedMessage.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                        title="Mark as read"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100"
                        title="Delete message"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 12.414l3.293-3.293a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {selectedMessage.preview}
                    </p>
                    
                    {selectedMessage.type === 'message' && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          This is a sample message content. In a real application, this would contain the full message body, 
                          formatting, attachments, and other rich content features.
                        </p>
                      </div>
                    )}
                    
                    {selectedMessage.type === 'reminder' && (
                      <div className="mt-6">
                        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                          </svg>
                          <span className="text-sm font-medium text-yellow-800">Reminder Action Required</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {selectedMessage.type === 'message' && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                        Reply
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 flex items-center justify-center h-96">
                <div className="text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a message</h3>
                  <p className="text-gray-500">Choose a message from the list to view its contents</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
