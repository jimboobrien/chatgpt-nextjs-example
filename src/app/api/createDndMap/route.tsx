
import { NextResponse } from 'next/server';
//import axios from 'axios';
import OpenAI from "openai";
const openai = new OpenAI();
let imageUrl = '';
let message = '';

let finalPrompt = '';

export async function POST(request: Request) {
  const { mapType, mapGeo, mapStyle, prompt  } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  try {

    finalPrompt += 'create me a DND map ';

    if ( mapType && mapType !== '' ) {
        finalPrompt += 'with a ' + mapType + ' ';
    }

    if ( mapGeo && mapGeo !== '' ) {
        finalPrompt += 'be sure to include ' + mapGeo + ' ';
    }

    if ( mapStyle && mapStyle !== '' ) {
        finalPrompt += 'and make it in the style of ' + mapStyle + ' ';
    }

    if ( prompt && prompt !== '' ) {
        finalPrompt += 'and ' + prompt + ' ';
    }

    console.log("====================================");
    console.log( "finalPrompt: ", finalPrompt );
    console.log("====================================");

    const image = await openai.images.generate(
        {
            model: "dall-e-3",
            prompt: finalPrompt,
            n: 1,
            size: '1024x1024',
        }
    );
    console.log("==============     ======================");
    console.log( "image: ", image );
    console.log("==============     =====================");
    
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
  } catch (error) {
    const err = error as any;
    console.error('OpenAI API error:', err.response?.data || err.message);
    return NextResponse.json(
      { error: 'Failed to connect to OpenAI' },
      { status: 500 }
    );
  }
}
