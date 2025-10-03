"use client";
import { useState } from "react";

export default function ChatPage() {
  const [question, setQuestion] = useState("");
  const [conversations, setConversations] = useState<Array<{question: string, answer: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sampleQuestions = [
    "How has my coding confidence grown over time?",
    "What programming concepts have I mastered recently?",
    "What patterns do you see in my learning journey?",
    "Which challenges have helped me grow the most?",
    "What should I focus on next in my development?"
  ];

  function handleAsk() {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockAnswers = [
        `Based on your check-ins, you've been working on "${question.toLowerCase()}". You've shown great progress with React components and have been consistently learning new concepts.`,
        `Looking at your recent activity, I can see you've been focused on frontend development. Your mood has been generally positive, and you're building momentum in your coding journey.`,
        `From your check-ins, it appears you've been exploring Next.js, TypeScript, and CSS Grid. You've faced some challenges but have shown great resilience in pushing through difficult concepts.`,
        `Your recent entries show you're making steady progress. The family tree project seems to be a significant focus, and you're learning valuable skills in component architecture.`
      ];
      
      const randomAnswer = mockAnswers[Math.floor(Math.random() * mockAnswers.length)];      
      setConversations(prev => [...prev, { question, answer: randomAnswer }]);
      setQuestion("");
      setIsLoading(false);
    }, 1500);
  }

  function handleSampleQuestion(sampleQ: string) {
    setQuestion(sampleQ);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-100">My CIC Journey Insights</h1>
        <p className="text-slate-300 font-medium">
          Get personalized insights about your coding journey and growth patterns
        </p>
      </div>

      {/* Chat Interface */}
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-700 shadow-lg overflow-hidden">
        {/* Conversation History */}
        {conversations.length > 0 && (
          <div className="max-h-96 overflow-y-auto p-6 space-y-4 border-b border-slate-700">
            {conversations.map((conv, index) => (
              <div key={index} className="space-y-3">
                {/* User Question */}
                <div className="flex justify-end">
                  <div className="bg-indigo-600 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-sm">
                    <p className="text-sm font-medium">{conv.question}</p>
                  </div>
                </div>
                
                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="bg-slate-700 text-slate-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-semibold text-slate-400">AI Assistant</span>
                    </div>
                    <p className="text-sm leading-relaxed font-medium">{conv.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Input Section */}
        <div className="p-6 space-y-4">
          <div className="flex space-x-3">
            <input
              className="flex-1 px-4 py-3 border-2 border-slate-600 rounded-xl focus:border-indigo-400 focus:ring-0 transition-colors duration-200 text-slate-100 placeholder-slate-400 bg-slate-700/50"
              placeholder="Ask me anything about your CIC journey..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
              disabled={isLoading}
            />
            <button
              onClick={handleAsk}
              disabled={!question.trim() || isLoading}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                question.trim() && !isLoading
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl"
                  : "bg-slate-600 text-slate-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Thinking...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Ask</span>
                </div>
              )}
            </button>
          </div>

          {/* Sample Questions */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-200">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => handleSampleQuestion(sample)}
                  className="px-3 py-2 text-sm bg-indigo-900/50 text-indigo-300 rounded-lg border border-indigo-800/50 hover:bg-indigo-900/70 transition-colors duration-200 font-medium"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {conversations.length === 0 && (
        <div className="text-center py-12 bg-slate-800 rounded-2xl border-2 border-dashed border-slate-600">
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Ready to explore your journey?</h3>
          <p className="text-slate-400 mb-4 font-medium">
            Ask me anything about your CIC progress and development patterns!
          </p>
        </div>
      )}

      {/* Feature Info */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-600">
        <h3 className="font-semibold text-slate-100 mb-2 flex items-center space-x-2">
          <span>How I can help with your CIC journey:</span>
        </h3>
        <ul className="text-sm text-slate-300 space-y-1 font-medium">
          <li>• Analyze your learning patterns and growth trends</li>
          <li>• Identify your strongest areas of development</li>
          <li>• Suggest focus areas for continued growth</li>
          <li>• Celebrate your coding milestones and victories</li>
          <li>• Help you reflect on your personal development journey</li>
        </ul>
      </div>
    </div>
  );
}
