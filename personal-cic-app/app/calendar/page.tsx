"use client";

import { useState } from 'react';

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState('July');
  const [selectedDate, setSelectedDate] = useState('07');
  
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Meeting with VP",
      time: "10:00 - 11:00 am",
      date: "07",
      type: "Google Meet",
      attendees: 6,
      color: "#f5f6ff"
    },
    {
      id: 2,
      title: "Team Standup",
      time: "2:00 - 2:30 pm", 
      date: "07",
      type: "Zoom",
      attendees: 12,
      color: "#fff5f5"
    },
    {
      id: 3,
      title: "Project Review",
      time: "4:00 - 5:00 pm",
      date: "08",
      type: "In Person",
      attendees: 4,
      color: "#f0fff4"
    }
  ]);

  const [showEventForm, setShowEventForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventType, setNewEventType] = useState('Google Meet');

  const weekDays = [
    { day: 'Fri', date: '04' },
    { day: 'Sat', date: '05' },
    { day: 'Sun', date: '06' },
    { day: 'Mon', date: '07', isToday: true },
    { day: 'Tue', date: '08' },
    { day: 'Wed', date: '09' },
    { day: 'Thu', date: '10' }
  ];

  const addEvent = () => {
    if (newEventTitle.trim() && newEventTime.trim()) {
      const newEvent = {
        id: events.length + 1,
        title: newEventTitle,
        time: newEventTime,
        date: selectedDate,
        type: newEventType,
        attendees: Math.floor(Math.random() * 10) + 2,
        color: "#f5f6ff"
      };
      setEvents([...events, newEvent]);
      setNewEventTitle('');
      setNewEventTime('');
      setShowEventForm(false);
    }
  };

  const deleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const selectedDateEvents = events.filter(event => event.date === selectedDate);

  return (
  <main className="px-8 pt-8 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-gray-800 leading-tight mb-2" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
                Calendar
              </h1>
              <p className="text-lg text-gray-600">
                Schedule and manage your appointments and events
              </p>
            </div>
            
            <button 
              onClick={() => setShowEventForm(true)}
              className="h-10 px-5 text-white text-sm font-medium rounded-full hover:opacity-90 transition-all" 
              style={{background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)'}}
            >
              Add Event
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Calendar Widget */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{color: '#837acb'}}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <h2 className="text-lg font-medium text-gray-900">Calendar</h2>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-700">{currentMonth}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Week navigation */}
              <div className="flex items-center justify-between mb-6">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15,18 9,12 15,6"/>
                  </svg>
                </button>
                
                <div className="flex items-center gap-2">
                  {weekDays.map((dayInfo, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">{dayInfo.day}</div>
                      <button 
                        onClick={() => setSelectedDate(dayInfo.date)}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          selectedDate === dayInfo.date
                            ? 'text-white font-medium' 
                            : dayInfo.isToday
                            ? 'text-white font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`} 
                        style={selectedDate === dayInfo.date || dayInfo.isToday ? {backgroundColor: '#736edd'} : {}}
                      >
                        {dayInfo.date}
                      </button>
                    </div>
                  ))}
                </div>

                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9,18 15,12 9,6"/>
                  </svg>
                </button>
              </div>

              {/* Month Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs text-gray-500 py-2 font-medium">
                    {day}
                  </div>
                ))}
                
                {/* Calendar dates */}
                {Array.from({length: 35}, (_, i) => {
                  const date = i - 6; // Adjust for July starting on Monday
                  const dayStr = date > 0 && date <= 31 ? date.toString().padStart(2, '0') : '';
                  const hasEvent = events.some(event => event.date === dayStr);
                  const isSelected = selectedDate === dayStr;
                  
                  return (
                    <button
                      key={i}
                      onClick={() => dayStr && setSelectedDate(dayStr)}
                      disabled={!dayStr}
                      className={`h-8 text-sm rounded transition-colors relative ${
                        !dayStr 
                          ? 'text-transparent cursor-default' 
                          : isSelected
                          ? 'bg-purple-600 text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {dayStr}
                      {hasEvent && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Events for Selected Date */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Events for {currentMonth} {selectedDate}
              </h3>
              
              <div className="space-y-3">
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map((event) => (
                    <div key={event.id} className="rounded-lg p-4" style={{backgroundColor: event.color}}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">{event.title}</h4>
                          <p className="text-xs text-gray-500 mb-3">{event.time}</p>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-200">
                              <span className="text-xs text-gray-700">{event.type}</span>
                            </div>
                            
                            <div className="flex -space-x-1">
                              {Array.from({length: Math.min(event.attendees, 4)}, (_, i) => (
                                <div key={i} className={`w-5 h-5 rounded-full border border-white ${
                                  i === 0 ? 'bg-orange-400' :
                                  i === 1 ? 'bg-blue-500' :
                                  i === 2 ? 'bg-gray-400' : 'bg-red-400'
                                }`}></div>
                              ))}
                              {event.attendees > 4 && (
                                <div className="w-5 h-5 bg-purple-600 text-white text-xs rounded-full border border-white flex items-center justify-center font-medium">
                                  +{event.attendees - 4}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => deleteEvent(event.id)}
                          className="text-gray-400 hover:text-red-600 ml-2"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <p className="text-sm text-gray-500">No events scheduled</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">This Week</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Events</span>
                  <span className="text-sm font-medium text-gray-900">{events.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Today&apos;s Events</span>
                  <span className="text-sm font-medium text-gray-900">
                    {events.filter(event => event.date === '07').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Upcoming</span>
                  <span className="text-sm font-medium text-gray-900">
                    {events.filter(event => parseInt(event.date) > 7).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Event Form */}
        {showEventForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Event</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="Enter event title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    placeholder="e.g., 2:00 - 3:00 pm"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</label>
                  <select
                    value={newEventType}
                    onChange={(e) => setNewEventType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Google Meet">Google Meet</option>
                    <option value="Zoom">Zoom</option>
                    <option value="In Person">In Person</option>
                    <option value="Phone Call">Phone Call</option>
                  </select>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={addEvent}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Add Event
                  </button>
                  <button
                    onClick={() => {
                      setShowEventForm(false);
                      setNewEventTitle('');
                      setNewEventTime('');
                      setNewEventType('Google Meet');
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
  );
}
