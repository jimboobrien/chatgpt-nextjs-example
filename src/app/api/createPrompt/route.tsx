
/* import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // Fetch data from an external API or database
    const response = await fetch('https://localhost:3000') // Replace with your API endpoint 

    // Check for HTTP errors (status codes outside the 2xx range)
    if (!response.ok) {
      const errorData = await response.json() // Try to extract error details
      throw new Error(`API request failed with status ${response.status}: ${errorData.message || response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(error) 
    return   
 NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 }) 
  }
  
}
  */

// app/api/createMessage/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;
  const url = 'https://api.openai.com/v1/chat/completions';

  const body = JSON.stringify({
    messages,
    model: 'gpt-3.5-turbo',
    stream: false,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Bearer ${apiKey},
      },
      body,
    });
    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 