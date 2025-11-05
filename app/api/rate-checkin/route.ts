import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { text } = await request.json();
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing Hugging Face API key.' }, { status: 500 });
  }
  try {
    const res = await fetch('https://api-inference.huggingface.co/models/user6295018/checkin-quality-classifier', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    });
    if (!res.ok) throw new Error('Hugging Face API error');
    const result = await res.json();
    return NextResponse.json({ result });
  } catch (err) {
    return NextResponse.json({ error: 'Could not get rating from Bloom Assistant.' }, { status: 500 });
  }
}
