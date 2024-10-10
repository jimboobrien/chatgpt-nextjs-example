import { NextResponse } from 'next/server';
//import axios from 'axios';
import OpenAI from "openai";
const openai = new OpenAI();


export async function POST(request: Request) {
  const { prompt } = await request.json();
  let text = '';

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  try {

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
    });

    if (response.usage) {
      console.log( "cost for prompt:", response.usage.prompt_tokens );
      console.log( "total tokens cost: ", response.usage.total_tokens );
    } else {
      return NextResponse.json(
        { error: 'Failed to connect to OpenAI' },
        { status: 500 }
      );
    }
    if ( response.usage ) {
      if (response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content) {
        text = response.choices[0].message.content.trim();
      }
    }
    return NextResponse.json({
      result: text,
      cost: response.usage.total_tokens,
    });
  } catch (error) {
    const err = error as any;
    console.error('OpenAI API error:', err.response?.data || err.message);
    return NextResponse.json(
      { error: 'Failed to connect to OpenAI' },
      { status: 500 }
    );
  }
}
