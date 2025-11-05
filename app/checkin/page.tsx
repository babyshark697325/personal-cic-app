"use client";
import { useState } from "react";

export default function CheckinPage() {



  // View mode state
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');

  // New check-in input and Bloom rating
  const [checkinText, setCheckinText] = useState("");
  const [bloomRating, setBloomRating] = useState<null | { score: number; feedback: string }>(null);
  const [submitting, setSubmitting] = useState(false);

  // Simulate Bloom Assistant rating
  const rateCheckin = async (text: string) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/rate-checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error("Bloom API error");
      const data = await res.json();
      const result = data.result || [];
      // Expecting result like: [{label: 'Descriptive', score: 0.87}]
      const label = result[0]?.label || "Neutral";
      const score = result[0]?.score ? Math.round(result[0].score * 5) : 3;
      let feedback = "";
      if (label === "Descriptive") {
        feedback = "Clear, thoughtful, and specific check-in.";
      } else if (label === "Neutral") {
        feedback = "Somewhat informative but missing depth.";
      } else if (label === "Vague") {
        feedback = "Minimal or unclear update.";
      } else {
        feedback = "Bloom Assistant rated your check-in.";
      }
      setBloomRating({ score, feedback });
    } catch (err) {
      setBloomRating({ score: 0, feedback: "Could not get rating from Bloom Assistant." });
    }
    setSubmitting(false);
  };

  // Handle submit
  const handleSubmit = () => {
    if (!checkinText || !bloomRating) return;
    // If rating is Descriptive, process immediately
    if (bloomRating.feedback.startsWith("Clear,")) {
      setCheckinText("");
      setBloomRating(null);
      return;
    }
    // Otherwise, prompt for confirmation (already shown in UI)
    setCheckinText("");
    setBloomRating(null);
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
      {/* Check-in Input & Bloom Assistant Rating */}
      <div className="mb-8">
        <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">New Check-In</h2>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-base mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200"
            rows={3}
            placeholder="How are you feeling about your work today?"
            value={checkinText}
            onChange={e => {
              setCheckinText(e.target.value);
              setBloomRating(null);
            }}
            disabled={submitting}
          />
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50"
              disabled={!checkinText || submitting}
              onClick={async () => {
                await rateCheckin(checkinText);
                // If Descriptive, auto-submit
                if (bloomRating && bloomRating.feedback.startsWith("Clear,")) {
                  handleSubmit();
                }
              }}
            >
              {submitting ? "Rating..." : "Get Bloom Rating"}
            </button>
            {/* Only show submit button if not Descriptive */}
            {bloomRating && !bloomRating.feedback.startsWith("Clear,") && (
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition disabled:opacity-50"
                disabled={submitting}
                onClick={handleSubmit}
              >
                Submit Check-In
              </button>
            )}
          </div>
          {bloomRating && (
            <div className="mt-4">
              <div className="mb-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-800 mb-1">Your check-in:</div>
                <div className="text-base text-gray-900">{checkinText}</div>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-base font-semibold text-indigo-600">Bloom Model: <span className="font-bold">{bloomRating.feedback.split(' ')[0]}</span></span>
                <span className="text-sm text-gray-700">{bloomRating.feedback}</span>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-800">Are you sure you want to submit this check-in?</span>
              </div>
            </div>
          )}
        </div>
      </div>
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


    </main>
  );
}
