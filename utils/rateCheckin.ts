// Type for the expected response from the FastAPI backend
export type RateCheckinResponse = {
  label?: string;
  score?: number;
  error?: string;
};

/**
 * Sends a check-in text to the local FastAPI backend for rating.
 * @param text - The user's check-in text to classify.
 * @returns The model's label and score, or an error object.
 */
export async function rateCheckin(text: string): Promise<RateCheckinResponse> {
  try {
    const response = await fetch("http://127.0.0.1:8001/api/rate-checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    // If the response is not OK, throw an error to be caught below
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (err) {
    // Log the error and return a standard error object
    console.error("rateCheckin error:", err);
    return { error: "Failed to connect to model" };
  }
}
