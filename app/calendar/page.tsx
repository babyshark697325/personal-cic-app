"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function CalendarPage() {
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  // Get today's date
  const today = new Date();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentYear = today.getFullYear();
  const currentMonthIndex = today.getMonth();
  const currentDay = today.getDate();
  // State for selected month/year/date
  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);
    const [selectedYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(currentDay.toString().padStart(2, '0'));
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

  // Calculate the current week containing today
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return {
      day: d.toLocaleString('default', { weekday: 'short' }),
      date: d.getDate().toString().padStart(2, '0'),
      isToday:
        d.getDate() === currentDay &&
        d.getMonth() === currentMonthIndex &&
        d.getFullYear() === currentYear,
    };
  });

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
  <main className="px-4 sm:px-8 pt-6 sm:pt-8 pb-24 sm:pb-8 max-w-2xl sm:max-w-full mx-auto w-full">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-4xl text-gray-800 leading-tight mb-2" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>
              Calendar
            </h1>
            <p className="text-lg text-gray-600">
              Schedule and manage your appointments and events
            </p>
          </div>
          <button 
            onClick={() => setShowEventForm(true)}
            className="flex items-center gap-2 h-10 px-5 text-white text-sm font-medium rounded-full hover:opacity-90 transition-all"
            style={{background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)'}}
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Calendar Widget */}
  <div className="sm:col-span-2 col-span-1">
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{color: '#837acb'}}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <h2 className="text-lg text-gray-800 font-sans" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>Calendar</h2>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="flex items-center gap-1 text-sm text-gray-400 bg-transparent outline-none font-normal relative"
                  onClick={() => setMonthDropdownOpen((open) => !open)}
                >
                  {monthNames[selectedMonth]}
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {monthDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-10">
                      {monthNames.map((name, idx) => (
                        <div
                          key={name}
                          role="button"
                          tabIndex={0}
                          className={`block px-4 py-2 text-sm w-full text-left cursor-pointer hover:bg-gray-100 ${selectedMonth === idx ? 'font-bold text-[#766de0]' : 'text-gray-400 font-normal'}`}
                          onClick={() => {
                            setSelectedMonth(idx);
                            setMonthDropdownOpen(false);
                          }}
                          onKeyPress={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setSelectedMonth(idx);
                              setMonthDropdownOpen(false);
                            }
                          }}
                        >
                          {name}
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Week navigation */}
            <div className="grid grid-cols-7 gap-1 mb-6 max-w-md mx-auto w-full">
              {weekDays.map((dayInfo, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">{dayInfo.day}</div>
                  <button 
                    onClick={() => setSelectedDate(dayInfo.date)}
                    className={`h-8 w-8 text-sm rounded-full transition-all font-medium border-0
                      ${dayInfo.isToday
                        ? 'bg-gradient-to-r from-[#766de0] via-[#7d73e7] to-[#bcb4ee] text-white scale-105 shadow-sm'
                        : selectedDate === dayInfo.date
                        ? 'bg-[#bcb4ee] text-white scale-105 shadow-sm'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
                    `}
                  >
                    {dayInfo.date}
                  </button>
                </div>
              ))}
            </div>

            {/* Month Grid */}
            <div className="mb-4 w-full flex flex-col items-center">
              {/* Weekday headers grid */}
              <div className="grid grid-cols-7 gap-1 w-full justify-items-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="h-8 w-8 flex items-center justify-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              {/* Calendar dates grid */}
              <div className="grid grid-cols-7 gap-1 w-full justify-items-center mt-1">
                {(() => {
                  // Use July 2025 for demo, but make dynamic for any month/year
                  const year = selectedYear;
                  const month = selectedMonth;
                  const daysInMonth = new Date(year, month + 1, 0).getDate();
                  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon, ...
                  const cells = [];
                  // Add empty cells for offset
                  for (let i = 0; i < firstDay; i++) {
                    cells.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
                  }
                  // Add day buttons
                  for (let date = 1; date <= daysInMonth; date++) {
                    const dayStr = date.toString().padStart(2, '0');
                    const hasEvent = events.some(event => event.date === dayStr);
                    const isSelected = selectedDate === dayStr;
                    const isToday = date === currentDay && month === currentMonthIndex && year === currentYear;
                    cells.push(
                      <button
                        key={dayStr}
                        onClick={() => setSelectedDate(dayStr)}
                        className={`h-8 w-8 text-sm rounded-full transition-all font-medium border-0 relative flex items-center justify-center
                          ${isSelected
                            ? 'bg-gradient-to-r from-[#766de0] via-[#7d73e7] to-[#bcb4ee] text-white scale-105 shadow-sm'
                            : isToday
                            ? 'bg-[#bcb4ee] text-white scale-105 shadow-sm'
                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
                        `}
                      >
                        {dayStr}
                        {hasEvent && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#766de0] rounded-full"></div>
                        )}
                      </button>
                    );
                  }
                  // Fill remaining cells to complete the grid
                  while (cells.length % 7 !== 0) {
                    cells.push(<div key={`empty-end-${cells.length}`} className="h-8 w-8"></div>);
                  }
                  return cells;
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Events for Selected Date */}
  <div className="space-y-6 mt-6 sm:mt-0">
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
              <h3 className="text-lg text-gray-800 font-sans mb-4" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
                Events for {monthNames[selectedMonth]} {selectedDate}
              </h3>
              
              <div className="space-y-3">
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map((event) => (
                    <div key={event.id} className="rounded-lg p-4" style={{backgroundColor: event.color}}>
                      <div className="rounded-lg p-4 bg-white border border-gray-100 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-[#766de0] mb-1">{event.title}</h4>
                            <p className="text-xs text-gray-500 mb-3">{event.time}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 bg-gradient-to-r from-[#ede9fe] via-[#f3f0ff] to-[#e0e7ff] px-2 py-1 rounded-full border border-gray-100">
                                <span className="text-xs text-[#766de0]">{event.type}</span>
                              </div>
                              <div className="flex -space-x-1">
                                {Array.from({length: Math.min(event.attendees, 4)}, (_, i) => (
                                  <div key={i} className={`w-5 h-5 rounded-full border border-white ${
                                    i === 0 ? 'bg-[#bcb4ee]' :
                                    i === 1 ? 'bg-[#7d73e7]' :
                                    i === 2 ? 'bg-[#766de0]' : 'bg-[#ede9fe]'
                                  }`}></div>
                                ))}
                                {event.attendees > 4 && (
                                  <div className="w-5 h-5 bg-[#766de0] text-white text-xs rounded-full border border-white flex items-center justify-center font-medium">
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
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
              <h3 className="text-lg text-gray-800 font-sans mb-4" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>This Week</h3>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
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
