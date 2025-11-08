import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

export async function POST(request: Request) {
  const { text } = await request.json();
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  const spaceUrl =
    process.env.BLOOM_SPACE_URL ??
    'https://user6295018-checkin-quality-classifier.hf.space/api/predict';

  if (!text || typeof text !== 'string') {
    return NextResponse.json({ error: 'Text to rate is required.' }, { status: 400 });
  }

  if (!spaceUrl) {
    console.error('Missing Bloom Space URL.');
    return NextResponse.json({ error: 'Bloom Space URL is not configured.' }, { status: 500 });
  }

  const result = await getRatingFromHuggingFace(apiKey, text);
  if (result) {
    return NextResponse.json({ result, source: 'hf' });
  }

  const spaceResult = await getRatingFromSpace(spaceUrl, text);
  if (spaceResult) {
    return NextResponse.json({ result: [spaceResult], source: 'space' });
  }

  const fallbackResult = buildHeuristicRating(text);
  return NextResponse.json({
    result: [fallbackResult],
    source: 'heuristic',
    message: 'Using local heuristic rating because Hugging Face endpoints are unavailable.',
  });
}

async function getRatingFromHuggingFace(apiKey: string | undefined, text: string) {
  if (!apiKey) {
    console.warn('Missing Hugging Face API key, skipping direct inference call.');
    return null;
  }

  const hf = new HfInference(apiKey);

  try {
    const response = await hf.textClassification({
      model: 'user6295018/checkin-quality-classifier',
      inputs: text,
    });

    if (!Array.isArray(response) || response.length === 0) {
      return null;
    }

    return response;
  } catch (err) {
    console.error('Hugging Face inference error:', err);
    return null;
  }
}

async function getRatingFromSpace(spaceUrl: string, text: string) {
  try {
    const res = await fetch(spaceUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      console.error('Bloom Space API error:', res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const label = data.label || data.result || data.prediction;
    if (!label || typeof label !== 'string') {
      return null;
    }

    return {
      label,
      score: labelToScore(label),
    };
  } catch (err) {
    console.error('Bloom Space fetch error:', err);
    return null;
  }
}

function labelToScore(label: string) {
  switch (label) {
    case 'Descriptive':
      return 0.92;
    case 'Neutral':
      return 0.65;
    case 'Vague':
      return 0.35;
    default:
      return 0.5;
  }
}

function buildHeuristicRating(text: string) {
  const trimmed = text.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const sentenceCount = trimmed ? trimmed.split(/[.!?]+/).filter(Boolean).length : 0;
  const keywordHits = countKeywordHits(trimmed);

  if (wordCount >= 25 || (wordCount >= 15 && (sentenceCount >= 2 || keywordHits >= 2))) {
    return { label: 'Descriptive', score: clampScore(0.82 + Math.min(wordCount / 200, 0.12)) };
  }
  if (wordCount >= 8 || keywordHits > 0) {
    return { label: 'Neutral', score: clampScore(0.55 + Math.min(wordCount / 120, 0.15)) };
  }
  return { label: 'Vague', score: clampScore(0.3 + Math.min(wordCount / 80, 0.1)) };
}

function countKeywordHits(text: string) {
  const keywords = [
    'today',
    'yesterday',
    'tomorrow',
    'plan',
    'planning',
    'progress',
    'blocked',
    'issue',
    'finished',
    'completed',
    'next',
    'working',
    'update',
    'learned',
  ];
  return keywords.reduce((count, keyword) => (text.toLowerCase().includes(keyword) ? count + 1 : count), 0);
}

function clampScore(score: number) {
  return Math.max(0.1, Math.min(0.99, Number(score.toFixed(2))));
}
