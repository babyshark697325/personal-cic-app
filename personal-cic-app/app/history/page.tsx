export default function HistoryPage() {
  // Auto-tagging function (same as in check-in page)
  const generateTags = (text: string): string[] => {
    const tags: string[] = [];
    const lowerText = text.toLowerCase();

    // Programming languages
    const languages = [
      'javascript', 'typescript', 'python', 'react', 'next.js', 'nextjs', 'vue', 'angular',
      'html', 'css', 'sass', 'scss', 'tailwind', 'bootstrap', 'node.js', 'nodejs',
      'express', 'mongodb', 'sql', 'mysql', 'postgresql', 'firebase', 'supabase',
      'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin'
    ];

    // Concepts and activities
    const concepts = [
      'debugging', 'learning', 'tutorial', 'project', 'api', 'database', 'frontend',
      'backend', 'fullstack', 'deployment', 'testing', 'git', 'github', 'responsive',
      'mobile', 'design', 'ui', 'ux', 'algorithm', 'data structure', 'performance',
      'optimization', 'refactoring', 'review', 'documentation', 'planning', 'mockup',
      'component', 'structure', 'setup', 'routing', 'grid', 'layout', 'errors'
    ];

    // Emotions and experiences
    const experiences = [
      'struggling', 'confused', 'frustrated', 'stuck', 'breakthrough', 'progress',
      'accomplished', 'learned', 'discovered', 'fixed', 'completed', 'started',
      'improved', 'challenge', 'success', 'milestone', 'achievement', 'proud',
      'overwhelmed', 'figured out', 'finally', 'tough', 'struggled'
    ];

    // Check for languages and concepts
    [...languages, ...concepts, ...experiences].forEach(term => {
      if (lowerText.includes(term.toLowerCase())) {
        const capitalizedTerm = term.charAt(0).toUpperCase() + term.slice(1);
        if (!tags.includes(capitalizedTerm)) {
          tags.push(capitalizedTerm);
        }
      }
    });

    // Additional context-based tagging
    if (lowerText.includes('error') || lowerText.includes('bug') || lowerText.includes('issue')) {
      if (!tags.includes('Debugging')) tags.push('Debugging');
    }
    if (lowerText.includes('family tree')) {
      if (!tags.includes('Family Tree')) tags.push('Family Tree');
    }

    return tags.slice(0, 5); // Limit to 5 tags
  };

  // Enhanced fake data with auto-generated tags
  const checkins = [
    { 
      date: "2025-09-30", 
      mood: "great",
      moodEmoji: "Great",
      text: "Worked on family tree mockup design. Finally figured out how to implement the recursive component structure! Feeling really proud of the progress.",
      tags: [] // Will be auto-generated
    },
    { 
      date: "2025-09-29", 
      mood: "good",
      moodEmoji: "Good",
      text: "Started coding the check-in website. Set up Next.js project and basic routing. Learned about the new app directory structure.",
      tags: [] // Will be auto-generated
    },
    { 
      date: "2025-09-28", 
      mood: "okay",
      moodEmoji: "Okay",
      text: "Struggled with CSS Grid layout today. Spent most of the time debugging responsive issues, but finally got it working.",
      tags: [] // Will be auto-generated
    },
    { 
      date: "2025-09-27", 
      mood: "tough",
      moodEmoji: "Tough",
      text: "Had a tough day with TypeScript errors. Feeling overwhelmed with all the type definitions, but pushing through.",
      tags: [] // Will be auto-generated
    },
  ].map(checkin => ({
    ...checkin,
    tags: generateTags(checkin.text) // Auto-generate tags for each check-in
  }));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getMoodColor = (mood: string) => {
    const colors = {
      great: "bg-emerald-900/50 text-emerald-300 border-emerald-800/50",
      good: "bg-indigo-900/50 text-indigo-300 border-indigo-800/50",
      okay: "bg-yellow-900/50 text-yellow-300 border-yellow-800/50",
      meh: "bg-orange-900/50 text-orange-300 border-orange-800/50",
      tough: "bg-red-900/50 text-red-300 border-red-800/50"
    };
    return colors[mood as keyof typeof colors] || "bg-slate-700 text-slate-300 border-slate-600";
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-100">My CIC Program Timeline</h1>
        <p className="text-slate-300 font-medium">
          Look back at your coding progress, celebrate your growth, and see how far you&apos;ve come
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-700 p-4 text-center">
          <div className="text-2xl font-bold text-indigo-400">{checkins.length}</div>
          <div className="text-sm text-slate-300 font-medium">Reflections</div>
        </div>
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-700 p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">4</div>
          <div className="text-sm text-slate-300 font-medium">Days of Growth</div>
        </div>
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-700 p-4 text-center">
          <div className="text-2xl font-bold text-teal-400">8</div>
          <div className="text-sm text-slate-300 font-medium">Skills Developed</div>
        </div>
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-700 p-4 text-center">
          <div className="text-2xl font-bold text-orange-400">Active</div>
          <div className="text-sm text-slate-300 font-medium">Learning Streak</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-100 flex items-center space-x-2">
          <span>My Recent Reflections</span>
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-indigo-500"></div>
          
          {checkins.map((checkin, index) => (
            <div key={index} className="relative pl-16 pb-8">
              {/* Timeline dot */}
              <div className="absolute left-4 w-4 h-4 bg-slate-800 border-4 border-indigo-400 rounded-full shadow-sm"></div>
              
              {/* Content card */}
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-400">
                      {formatDate(checkin.date)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getMoodColor(checkin.mood)}`}>
                      <span>{checkin.moodEmoji}</span>
                    </span>
                  </div>
                </div>
                
                <p className="text-slate-200 leading-relaxed mb-4 font-medium">
                  {checkin.text}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {checkin.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-900/50 text-indigo-300 border border-indigo-800/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty state message (when there are no real check-ins) */}
      <div className="text-center py-12 bg-slate-800/60 rounded-xl border-2 border-dashed border-slate-600">
        <h3 className="text-lg font-semibold text-slate-200 mb-2">No reflections yet</h3>
        <p className="text-slate-400 mb-4 font-medium">Start documenting your CIC program with your first check-in!</p>
        <a
          href="/checkin"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          <span>Create My First Reflection</span>
        </a>
      </div>
    </div>
  );
}
