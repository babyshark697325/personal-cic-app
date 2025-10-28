"use client";
import { useState } from "react";

export default function CheckinPage() {



  // View mode state
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');

  // Mock check-in data
  const checkins = [
    {
      date: "2024-06-01",
      text: "Wrapped up UI improvements for the dashboard. Felt productive!",
      tags: ["UI", "dashboard", "productive"],
      slackUrl: "https://slack.com/app_redirect?channel=general"
    },
    {
      date: "2024-05-29",
      text: "Reviewed feedback and planned next sprint.",
      tags: ["planning", "feedback"],
      slackUrl: "https://slack.com/app_redirect?channel=general"
    },
    {
      date: "2024-05-28",
      text: "Fixed bugs in the calendar view.",
      tags: ["calendar", "bugfix"],
      slackUrl: "https://slack.com/app_redirect?channel=general"
    }
  ];

  // Mock summary data
  const summary = {
    streak: 12,
    daysActive: 18,
    productiveDay: "Wednesday"
  };

  // Helper to format date
  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  // Simple SVG Link icon
  const LinkIcon = () => (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 14L14 10M7 17a5 5 0 0 1 0-7l3-3a5 5 0 0 1 7 7l-3 3a5 5 0 0 1-7 0z"/></svg>
  );

  return (
  <main className="px-4 sm:px-8 pt-6 sm:pt-8 pb-24 sm:pb-8 font-sans max-w-2xl sm:max-w-full mx-auto w-full" style={{fontFamily: 'Inter, Helvetica Neue, Helvetica, Arial, sans-serif'}}>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-4xl text-gray-800 leading-tight mb-2 font-sans">
              Check-Ins
            </h1>
            <p className="text-lg text-gray-600 font-sans">
              Reflection and progress from your recent Slack check-ins
            </p>
          </div>
        </div>
      </div>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
        {/* Timeline Cards */}
  <div className="sm:col-span-2 col-span-1 flex flex-col gap-6 font-sans">
          {checkins.map((entry, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm font-sans h-[7.75rem] flex flex-col justify-center">
              <div className="flex items-center justify-between mb-2 font-sans">
                <span className="text-base font-semibold text-gray-900 font-sans">{formatDate(entry.date)}</span>
                <span className="text-xl font-sans">😊</span>
              </div>
              <div className="text-gray-800 text-base mb-2 font-sans">{entry.text}</div>
              <div className="flex flex-wrap gap-2 mb-2 font-sans">
                {entry.tags.map((tag, i) => (
                  <span key={i} className="px-4 py-1 rounded-full text-xs font-medium flex items-center" style={{backgroundColor: '#f3f2ff', color: '#736ee1'}}>#{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Stats Panel */}
  <div className="space-y-6 mt-6 sm:mt-0 font-sans">
          <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-200 flex flex-col gap-2 font-sans">
            <h3 className="text-lg text-gray-800 font-sans mb-2" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>Weekly Summary</h3>
            <span className="flex items-center gap-2 text-gray-800 text-base font-sans"><span className="font-bold font-sans">{summary.streak}</span> Check-ins</span>
            <span className="flex items-center gap-2 text-gray-800 text-base font-sans"><span className="font-bold font-sans">{summary.daysActive}</span> Days Active</span>
            <span className="flex items-center gap-2 text-gray-800 text-base font-sans">Most Productive: <span className="font-bold font-sans">{summary.productiveDay}</span></span>
          </div>
          <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-200 font-sans">
            <h3 className="text-lg text-gray-800 font-sans mb-2" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>Productivity</h3>
            <div>
              <div className="flex gap-2 items-end h-20 font-sans">
                {[2, 3, 6, 8, 12, 7, 5].map((val, i) => {
                  // Scale so max bar height is 56px (h-14), matching screenshot proportions
                  const maxVal = 12;
                  const minHeight = 16; // px
                  const maxHeight = 56; // px
                  const height = minHeight + ((val / maxVal) * (maxHeight - minHeight));
                  return (
                    <div key={i} className="flex flex-col items-center flex-1 font-sans">
                      <div className={`w-6 rounded-full ${i === 3 ? 'bg-indigo-400' : 'bg-gray-200'} font-sans`} style={{height: `${height}px`}}></div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2 items-end font-sans mt-2">
                {['Su','Mo','Tu','We','Th','Fr','Sa'].map((day, i) => (
                  <span key={day} className="text-xs text-gray-400 font-sans w-6 text-center flex-1">{day}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
