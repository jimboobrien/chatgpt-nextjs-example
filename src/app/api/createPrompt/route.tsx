// app/api/openai/route.js

import { NextResponse } from 'next/server';
import axios from 'axios';

//import OpenAI from "openai";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.' // System role to set the behavior of the assistant
          },
          {
            role: 'user',
            content: prompt  // User input passed from the frontend
          }
        ],
        max_tokens: 100, // Adjust as needed
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );


    const text = response.data.choices[0].message.content.trim();

    return NextResponse.json({ result: text });
  } catch (error) {
    const err = error as any;
    console.error('OpenAI API error:', err.response?.data || err.message);
    return NextResponse.json(
      { error: 'Failed to connect to OpenAI' },
      { status: 500 }
    );
  }
}
