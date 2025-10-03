import Link from "next/link";

export default function Home() {
  const streakDays = 7;
  const isStreakActive = true; // You can make this dynamic based on today's check-in
  
  const stats = [
    { label: "Total reflections", value: "12", change: "+3 this week", color: "text-indigo-400" },
    { 
      label: "Current streak", 
      value: streakDays, 
      change: "Personal best!", 
      color: "text-emerald-400",
      isStreak: true,
      streakActive: isStreakActive
    },
    { label: "Skills tracked", value: "15", change: "+2 new skills", color: "text-teal-400" },
    { label: "Growth score", value: "85%", change: "+12% this month", color: "text-rose-400" },
  ];

  const recentActivity = [
    { 
      date: "Today", 
      title: "Worked extensively on React component architecture and state management", 
      summary: "Spent the day refactoring our main dashboard components to use better state management patterns. Finally figured out how to properly implement useReducer for complex state updates. The performance improvements are noticeable and the code is much cleaner now.",
      mood: "Great", 
      tags: ["React", "Frontend", "State Management", "Performance"] 
    },
    { 
      date: "Yesterday", 
      title: "Debugged complex API integration issues with authentication flow", 
      summary: "Had a challenging day working through OAuth token refresh issues. The API was returning inconsistent responses, but after diving deep into the documentation and testing different approaches, I finally got it working properly.",
      mood: "Good", 
      tags: ["API", "Debugging", "OAuth", "Backend"] 
    },
    { 
      date: "2 days ago", 
      title: "CSS Grid mastery session and responsive design improvements", 
      summary: "Dedicated time to really understanding CSS Grid layouts. Created a flexible dashboard layout that adapts beautifully to different screen sizes. The grid areas feature is incredibly powerful once you get the hang of it.",
      mood: "Okay", 
      tags: ["CSS", "Layout", "Responsive", "Grid"] 
    },
  ];

  // Calendar component logic
  const getCurrentCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    // Mock reflection data for calendar
    const reflectionDays = [1, 3, 5, 7, 8, 10, 12, 15, 17, 20, 22, 25, 28, 30]; // Days with reflections
    
    for (let i = 0; i < 42; i++) {
      const isCurrentMonth = currentDate.getMonth() === currentMonth;
      const isToday = currentDate.toDateString() === today.toDateString();
      const hasReflection = isCurrentMonth && reflectionDays.includes(currentDate.getDate());
      const dayNumber = currentDate.getDate();
      
      days.push({
        date: new Date(currentDate),
        dayNumber,
        isCurrentMonth,
        isToday,
        hasReflection
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return {
      days,
      monthName: today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
  };

  const { days, monthName } = getCurrentCalendar();

  const quickActions = [
    {
      title: "Daily reflection",
      description: "Document today's coding progress",
      href: "/checkin",
      icon: "✍️",
      color: "bg-indigo-600",
      urgent: true
    },
    {
      title: "View timeline",
      description: "Review your daily check-ins",
      href: "/history",
      icon: "📊",
      color: "bg-emerald-600",
      urgent: false
    },
    {
      title: "Get insights",
      description: "Analyze your growth patterns",
      href: "/chat",
      icon: "🔍",
      color: "bg-teal-600",
      urgent: false
    },
  ];

  // Get personalized greeting based on the day
  const getPersonalizedGreeting = () => {
    const today = new Date();
    const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
    const timeOfDay = today.getHours();
    
    let greeting = "";
    if (timeOfDay < 12) {
      greeting = "Good morning";
    } else if (timeOfDay < 18) {
      greeting = "Good afternoon"; 
    } else {
      greeting = "Good evening";
    }

    const dayMessages = {
      'Monday': "Let's start this week with intention and focus",
      'Tuesday': "You're building great momentum this week", 
      'Wednesday': "Halfway through the week, keep going strong",
      'Thursday': "Almost there, finish the week with purpose",
      'Friday': "End this week on a high note",
      'Saturday': "Perfect day for personal growth and reflection",
      'Sunday': "A wonderful day to plan and prepare for what's ahead"
    };

    return {
      greeting: `${greeting}! Happy ${dayOfWeek}`,
      message: dayMessages[dayOfWeek as keyof typeof dayMessages]
    };
  };

  const { greeting, message } = getPersonalizedGreeting();

  return (
    <div className="space-y-8 px-4 lg:px-8">
      {/* Welcome Section - Full Width */}
      <div className="bg-indigo-600 rounded-2xl p-8 lg:p-12 text-white">
        <div className="max-w-none">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {greeting}
          </h1>
          <p className="text-lg lg:text-xl text-indigo-100 mb-6 max-w-3xl">
            {message} ready to continue your CIC program check-ins and make today meaningful?
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/checkin"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center space-x-2 justify-center sm:justify-start"
            >
              <span>Today's reflection</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/history"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors text-center"
            >
              View progress
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid - Full Width */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:shadow-lg hover:shadow-slate-900/20 transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-400">{stat.label}</h3>
              {stat.isStreak && (
                <div className={`text-lg ${stat.streakActive ? 'text-orange-400' : 'text-slate-500'}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.5 2C13.76 2 14.93 2.68 15.54 3.75C16.41 5.34 15.89 7.28 14.5 8.5C14.22 8.75 14 9.09 14 9.5C14 10.33 14.67 11 15.5 11C16.88 11 18 12.12 18 13.5C18 15.26 16.74 16.68 15 16.95V17C15 18.1 14.1 19 13 19H11C9.9 19 9 18.1 9 17V16.95C7.26 16.68 6 15.26 6 13.5C6 12.12 7.12 11 8.5 11C9.33 11 10 10.33 10 9.5C10 9.09 9.78 8.75 9.5 8.5C8.11 7.28 7.59 5.34 8.46 3.75C9.07 2.68 10.24 2 11.5 2C11.83 2 12.17 2.08 12.5 2Z"/>
                  </svg>
                </div>
              )}
            </div>
            <div className={`text-2xl font-bold ${stat.color} mb-1 flex items-center space-x-2`}>
              {stat.isStreak ? (
                <>
                  <span>{stat.value}</span>
                  <span className="text-lg text-slate-400">day{stat.value !== 1 ? 's' : ''}</span>
                </>
              ) : (
                <span>{stat.value}</span>
              )}
            </div>
            <div className="text-xs text-emerald-400 font-medium">
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content - Aligned Layout */}
      <div className="space-y-12">
        {/* Top Row - Quick Actions and Calendar */}
        <div className="grid lg:grid-cols-2 gap-12 lg:items-stretch">
          {/* Quick Actions */}
          <div className="space-y-6 flex flex-col">
            <h2 className="text-xl font-semibold text-slate-100">Quick actions</h2>
            <div className="space-y-3 flex-1 flex flex-col justify-between">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className={`group relative p-4 bg-slate-800 rounded-xl border border-slate-700 hover:shadow-lg hover:shadow-slate-900/20 transition-all duration-200 block ${
                    action.urgent ? "ring-2 ring-indigo-500/30 border-indigo-600/50" : ""
                  }`}
                >
                  {action.urgent && (
                    <div className="absolute top-3 right-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center text-white text-lg mb-3 group-hover:scale-110 transition-transform`}>
                    <div className="w-5 h-5 bg-white rounded opacity-80"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-indigo-400 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-3">
                    {action.description}
                  </p>
                  <div className="text-indigo-400 font-medium text-sm group-hover:text-indigo-300">
                    Get started →
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="space-y-6 flex flex-col">
            <h2 className="text-xl font-semibold text-slate-100">Calendar</h2>
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-3 flex-1 flex flex-col">
              <div className="mb-2">
                <h3 className="text-base font-semibold text-slate-100 text-center">{monthName}</h3>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-slate-400 py-1">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`
                      aspect-square flex items-center justify-center text-xs rounded cursor-pointer transition-colors
                      ${!day.isCurrentMonth 
                        ? 'text-slate-600' 
                        : day.isToday 
                          ? 'bg-indigo-600 text-white font-bold' 
                          : day.hasReflection 
                            ? 'bg-emerald-600/20 text-emerald-300' 
                            : 'text-slate-300 hover:bg-slate-700'
                      }
                    `}
                  >
                    {day.dayNumber}
                  </div>
                ))}
              </div>
              <div className="flex-1"></div>
              <div className="border-t border-slate-700 mt-auto">
                <div className="grid grid-cols-3 gap-3 text-center pt-3">
                  <div>
                    <div className="text-sm font-bold text-emerald-400">
                      {days.filter(day => day.hasReflection && day.isCurrentMonth).length}
                    </div>
                    <div className="text-xs text-slate-400">Month</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-indigo-400">87%</div>
                    <div className="text-xs text-slate-400">Rate</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-teal-400">{streakDays}</div>
                    <div className="text-xs text-slate-400">Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Recent Activity */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-100">Recent activity</h2>
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700">
              <h3 className="font-medium text-slate-100">Latest reflections</h3>
            </div>
            <div className="grid lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-700">
            {recentActivity.map((activity, index) => (
              <div key={index} className="p-6 hover:bg-slate-700/50 transition-colors min-h-[300px] flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="font-medium text-slate-100 text-sm line-clamp-2 flex-1">
                    {activity.title}
                  </div>
                  <div className="text-xs text-slate-400 whitespace-nowrap ml-2">{activity.date}</div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4 flex-1 line-clamp-4">
                  {activity.summary}
                </p>
                <div className="space-y-3 mt-auto">
                  <div className="flex items-center">
                    <span className="text-xs px-2 py-1 bg-emerald-900/50 text-emerald-300 rounded-full font-medium border border-emerald-800/50">
                      {activity.mood}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activity.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded font-medium border border-indigo-800/50"
                      >
                        #{tag}
                      </span>
                    ))}
                    {activity.tags.length > 3 && (
                      <span className="text-xs text-slate-500 font-medium">
                        +{activity.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-slate-700 text-center">
            <Link
              href="/history"
              className="text-sm text-indigo-400 hover:text-indigo-300 font-medium"
            >
              View all reflections →
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

