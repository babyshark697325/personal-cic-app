"use client";
import { useState } from "react";

export default function CheckinPage() {
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [autoTags, setAutoTags] = useState<string[]>([]);

  const moodOptions = [
    { emoji: "Great", label: "Great", value: "great" },
    { emoji: "Good", label: "Good", value: "good" },
    { emoji: "Okay", label: "Okay", value: "okay" },
    { emoji: "Meh", label: "Meh", value: "meh" },
    { emoji: "Tough", label: "Tough", value: "tough" },
  ];

  // Auto-tagging logic
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
      'optimization', 'refactoring', 'review', 'documentation', 'planning'
    ];

    // Emotions and experiences
    const experiences = [
      'struggling', 'confused', 'frustrated', 'stuck', 'breakthrough', 'progress',
      'accomplished', 'learned', 'discovered', 'fixed', 'completed', 'started',
      'improved', 'challenge', 'success', 'milestone', 'achievement'
    ];

    // Check for languages
    languages.forEach(lang => {
      if (lowerText.includes(lang.toLowerCase())) {
        const capitalizedLang = lang.charAt(0).toUpperCase() + lang.slice(1);
        if (!tags.includes(capitalizedLang)) {
          tags.push(capitalizedLang);
        }
      }
    });

    // Check for concepts
    concepts.forEach(concept => {
      if (lowerText.includes(concept.toLowerCase())) {
        const capitalizedConcept = concept.charAt(0).toUpperCase() + concept.slice(1);
        if (!tags.includes(capitalizedConcept)) {
          tags.push(capitalizedConcept);
        }
      }
    });

    // Check for experiences
    experiences.forEach(exp => {
      if (lowerText.includes(exp.toLowerCase())) {
        const capitalizedExp = exp.charAt(0).toUpperCase() + exp.slice(1);
        if (!tags.includes(capitalizedExp)) {
          tags.push(capitalizedExp);
        }
      }
    });

    // Additional context-based tagging
    if (lowerText.includes('error') || lowerText.includes('bug') || lowerText.includes('issue')) {
      if (!tags.includes('Debugging')) tags.push('Debugging');
    }
    if (lowerText.includes('first time') || lowerText.includes('new to') || lowerText.includes('beginning')) {
      if (!tags.includes('Learning')) tags.push('Learning');
    }
    if (lowerText.includes('finished') || lowerText.includes('done') || lowerText.includes('complete')) {
      if (!tags.includes('Completed')) tags.push('Completed');
    }

    return tags.slice(0, 5); // Limit to 5 tags
  };

  const handleNotesChange = (text: string) => {
    setNotes(text);
    // Generate tags as user types (with debouncing effect)
    if (text.length > 10) {
      const tags = generateTags(text);
      setAutoTags(tags);
    } else {
      setAutoTags([]);
    }
  };

  function handleSave() {
    const finalTags = generateTags(notes);
    console.log("Check-in saved:", { mood, notes, tags: finalTags });
    setSaved(true);
    setMood("");
    setNotes("");
    setAutoTags([]);
    
    // Hide success message after 3 seconds
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-100">Daily CIC Reflection</h1>
        <p className="text-slate-300 font-medium">
          Take a moment to reflect on today&apos;s CIC program check-in and personal growth
        </p>
      </div>

      {/* Check-in Form */}
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-700 shadow-lg p-8 space-y-6">
        {/* Mood Selection */}
        <div className="space-y-3">
          <label className="block text-lg font-semibold text-slate-100">
            How are you feeling?
          </label>
          <div className="flex flex-wrap gap-3">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setMood(option.value)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                  mood === option.value
                    ? "border-indigo-400 bg-indigo-900/50 text-indigo-200 shadow-md font-semibold"
                    : "border-slate-600 hover:border-indigo-500 hover:bg-indigo-900/25 text-slate-300"
                }`}
              >
                <span className="font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes Section */}
        <div className="space-y-3">
          <label htmlFor="notes" className="block text-lg font-semibold text-slate-100">
            What did you work on in your CIC program today?
          </label>
          <textarea
            id="notes"
            className="w-full p-4 border-2 border-slate-600 rounded-xl focus:border-indigo-400 focus:ring-0 resize-none transition-colors duration-200 text-slate-100 placeholder-slate-400 bg-slate-700/50"
            placeholder="Reflect on today's coding progress... What did you learn? What challenges did you face? What victories did you achieve? How are you growing as a developer?"
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            rows={6}
          />
          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-400 font-medium">
              {notes.length} characters
            </div>
            {autoTags.length > 0 && (
              <div className="text-sm text-indigo-400 font-medium">
                Auto-generating {autoTags.length} tags...
              </div>
            )}
          </div>
          
          {/* Auto-generated Tags Preview */}
          {autoTags.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Auto-detected tags:
              </label>
              <div className="flex flex-wrap gap-2">
                {autoTags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-900/50 text-indigo-300 border border-indigo-800/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500">
                These tags will be automatically added to your check-in
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={handleSave}
            disabled={!notes.trim()}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              notes.trim()
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl"
                : "bg-slate-600 text-slate-400 cursor-not-allowed"
            }`}
          >
            <span>Save My Reflection</span>
          </button>
          
          <button
            onClick={() => {
              setMood("");
              setNotes("");
            }}
            className="px-6 py-3 border-2 border-slate-600 text-slate-300 rounded-xl hover:border-slate-500 hover:bg-slate-700/50 transition-all duration-200 font-medium"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 animate-bounce">
          <span>Reflection saved successfully!</span>
        </div>
      )}
    </div>
  );
}
