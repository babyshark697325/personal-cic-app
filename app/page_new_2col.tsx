"use client";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen relative">
      {/* Grid background pattern with fade - starts at absolute top */}
      <div className="absolute inset-0 top-0">
        <div 
          className="w-full"
          style={{
            height: '280px',
            backgroundImage: `
              linear-gradient(to right, #9ca3af 1px, transparent 1px),
              linear-gradient(to bottom, #9ca3af 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.05) 70%, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.05) 70%, transparent 90%)'
          }}
        ></div>
      </div>

      <div className="px-8 pt-8 pb-8 relative">
        {/* Dashboard Header Section */}
        <div className="relative pb-8">
          <div className="flex items-end justify-between">
            {/* Left side - Date and Greeting */}
            <div>
              <p className="text-sm text-gray-500 mb-6 mt-4">Mon, July 7</p>
              <div className="space-y-1">
                <h1 className="text-4xl text-gray-800 leading-tight" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>Hello, Courtney</h1>
                <div className="flex items-center">
                  <p className="text-4xl bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent leading-tight" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
                    How can I help you today?
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Action Buttons aligned with second line */}
            <div className="flex items-center space-x-4 mb-1">
              {/* Ask AI button - filled gradient pill */}
              <button className="h-10 px-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-medium rounded-full hover:from-purple-700 hover:to-purple-800 transition-all">
                ✨ Ask AI
              </button>

              {/* Outlined gradient border pills */}
              <div className="h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 p-0.5">
                <button className="h-full px-5 bg-gray-50 text-black text-sm font-medium rounded-full hover:bg-white/10 transition-all flex items-center whitespace-nowrap">
                  Get tasks updates
                </button>
              </div>

              <div className="h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 p-0.5">
                <button className="h-full px-5 bg-gray-50 text-black text-sm font-medium rounded-full hover:bg-white/10 transition-all flex items-center whitespace-nowrap">
                  Create workspace
                </button>
              </div>

              <div className="h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 p-0.5">
                <button className="h-full px-5 bg-gray-50 text-black text-sm font-medium rounded-full hover:bg-white/10 transition-all flex items-center whitespace-nowrap">
                  Connect apps
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Widget Grid - 2 Column layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - My Tasks and My Goals */}
          <div className="space-y-6">
            {/* My Tasks Widget */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center">
                    <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-800" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>My Tasks</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-600 hover:text-gray-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0V0m0 4h4M6 21l4-4H6l4-4" />
                    </svg>
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* IN PROGRESS Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <button className="text-gray-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded">IN PROGRESS</span>
                  <span className="text-sm text-gray-600">• 2 tasks</span>
                </div>

                {/* Column Headers */}
                <div className="flex text-xs text-gray-500 mb-2 px-4">
                  <div className="flex-1">Name</div>
                  <div className="w-20 text-center">Priority</div>
                  <div className="w-24 text-right">Due date</div>
                </div>

                {/* Task Items */}
                <div className="space-y-1">
                  <div className="flex items-center px-4 py-2 hover:bg-gray-50 rounded-lg group">
                    <div className="flex-1 flex items-center gap-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-800">Create wireframe for blog section</span>
                    </div>
                    <div className="w-20 flex justify-center">
                      <span className="inline-block w-2 h-2 bg-orange-400 rounded-full"></span>
                    </div>
                    <div className="w-24 text-right text-xs text-gray-500">July 9</div>
                  </div>
                  
                  <div className="flex items-center px-4 py-2 hover:bg-gray-50 rounded-lg group">
                    <div className="flex-1 flex items-center gap-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-800">Update project documentation</span>
                    </div>
                    <div className="w-20 flex justify-center">
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                    </div>
                    <div className="w-24 text-right text-xs text-gray-500">July 8</div>
                  </div>
                </div>
              </div>

              {/* TODO Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <button className="text-gray-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">TODO</span>
                  <span className="text-sm text-gray-600">• 3 tasks</span>
                </div>
              </div>
            </div>

            {/* My Goals Widget */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg text-gray-800" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>My Goals</h2>
                <button className="text-gray-600 hover:text-gray-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-800">Check Emails and Messages</span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-gray-200 rounded-md h-2">
                        <div className="bg-teal-500 h-2 rounded-md" style={{width: '73%'}}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">73%</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">Product launch • My Projects</div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-800">Prepare a brief status update to the client</span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-gray-200 rounded-md h-2">
                        <div className="bg-orange-400 h-2 rounded-md" style={{width: '11%'}}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">11%</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">Product launch • My Projects</div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-800">Update project documentation</span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-gray-200 rounded-md h-2">
                        <div className="bg-teal-500 h-2 rounded-md" style={{width: '63%'}}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">63%</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">Team brainstorm • My Projects</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Projects and Calendar */}
          <div className="space-y-6">
            {/* Projects Widget */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg text-gray-800" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>Projects</h2>
                <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
                  <span>Recents</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Create new project card */}
                <div className="p-3 rounded-lg border-2 border-dashed border-gray-200 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="flex-1 flex items-center">
                      <h3 className="text-sm text-gray-600 font-medium">Create new project</h3>
                    </div>
                  </div>
                </div>

                {/* Product launch */}
                <div className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-4 h-4 bg-purple-600 rounded transform rotate-45"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm text-gray-900 font-medium mb-1">Product launch</h3>
                      <p className="text-xs text-gray-500">6 tasks • 12 teammates</p>
                    </div>
                  </div>
                </div>

                {/* Team brainstorm */}
                <div className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-4 h-4 bg-blue-600 rounded transform rotate-45"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm text-gray-900 font-medium mb-1">Team brainstorm</h3>
                      <p className="text-xs text-gray-500">2 tasks • 32 teammates</p>
                    </div>
                  </div>
                </div>

                {/* Branding launch */}
                <div className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-4 h-4 bg-green-600 rounded transform rotate-45"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm text-gray-900 font-medium mb-1">Branding launch</h3>
                      <p className="text-xs text-gray-500">8 tasks • 12 teammates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Widget */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <h2 className="text-lg font-medium text-gray-900">Calendar</h2>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-700">July</span>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Week navigation */}
              <div className="flex items-center justify-between mb-6">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="flex items-center gap-2">
                  {[
                    { day: 'Fri', date: '04' },
                    { day: 'Sat', date: '05' },
                    { day: 'Sun', date: '06' },
                    { day: 'Mon', date: '07', isToday: true },
                    { day: 'Tue', date: '08' },
                    { day: 'Wed', date: '09' },
                    { day: 'Thu', date: '10' }
                  ].map((dayInfo, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">{dayInfo.day}</div>
                      <div className={`px-3 py-2 text-sm rounded-lg ${
                        dayInfo.isToday 
                          ? 'bg-purple-600 text-white font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}>
                        {dayInfo.date}
                      </div>
                    </div>
                  ))}
                </div>

                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Meeting Event */}
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Meeting with VP</h3>
                    <p className="text-xs text-gray-500">Today • 10:00 - 11:00 am</p>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-200">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg" 
                          alt="Google Meet" 
                          className="w-3 h-3"
                        />
                        <span className="text-xs text-gray-700">Google Meet</span>
                      </div>
                      
                      <div className="flex -space-x-1 ml-auto">
                        <div className="w-6 h-6 bg-orange-400 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-red-400 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-purple-600 text-white text-xs rounded-full border-2 border-white flex items-center justify-center font-medium">
                          +2
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="text-gray-400 hover:text-gray-600 ml-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
