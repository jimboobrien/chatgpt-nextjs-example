import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  try {
    const image = await openai.images.generate(
        {
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: '1024x1024',
        }
    );

    const imageUrl = image.data?.[0]?.url ?? '';
    const message = image.data?.[0]?.revised_prompt ?? '';
    console.log( "image: ", imageUrl );

    return NextResponse.json({
      result: imageUrl,
      message: message,
    });
  } catch (error: any) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    if (error.response?.status === 504) {
      return NextResponse.json(
        { error: 'Request timed out, please try again.' },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to connect to OpenAI' },
      { status: 500 }
    );
  }
}
