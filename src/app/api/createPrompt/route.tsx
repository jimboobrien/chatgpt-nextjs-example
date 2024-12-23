import { NextResponse } from 'next/server';

//import axios from 'axios';
// import OpenAI from "openai";

// const config = {
//   apiKey: process.env.OPENAI_API_KEY,
// }
// console.log( "config: ", config );

// const openai = new OpenAI(config);

// const OpenAI = require("openai");
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(request: Request) {
  const { prompt, promptType } = await request.json();
  let response: any = '';
  let text = '';

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  try {
    switch (promptType) {
      case 'regular':
        response = await openai.chat.completions.create({
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
        break;
      case 'image':
        response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
              {
                  role: "user",
                  content: [
                      { type: "text", text: prompt },
                      {
                          type: "image_url",
                          image_url: {
                              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                          },
                      }
                  ],
              },
          ],
        });
        break;
      case 'json':
        response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
              { role: "system", content: "You extract email addresses into JSON data." },
              {
                  role: "user",
                  content: prompt,
              },
          ],
          response_format: {
              // See /docs/guides/structured-outputs
              type: "json_schema",
              json_schema: {
                  name: "email_schema",
                  schema: {
                      type: "object",
                      properties: {
                          email: {
                              description: "The email address that appears in the input",
                              type: "string"
                          }
                      },
                      additionalProperties: false
                  }
              }
          }
        });
        break;
      default:
        response = await openai.chat.completions.create({
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
        break;
    }

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
