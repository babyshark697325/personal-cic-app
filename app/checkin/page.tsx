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
      {/* ...existing code... */}
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
