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

let imageUrl = '';
let message = '';

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
    //console.log( "image: ", image );
    console.log( "image: ", image.data[0].url );

    if ( image ) {
        imageUrl = image.data[0].url ?? '';
        message = image.data[0].revised_prompt ?? '';
    }

    return NextResponse.json({
      result: imageUrl,
      message: message,
      //cost: 0,
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
