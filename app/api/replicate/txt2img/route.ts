// app/api/replicate/predict.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/replicate';

export const config = {
  runtime: 'experimental-edge',
};

export async function POST(req: NextRequest) {
  try {
    const { modelName, prompt } = await req.json();
    if (!modelName || !prompt) {
      return new Response(JSON.stringify({ error: 'Model name and prompt are required' }), { status: 400 });
    }

    const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});


    let prediction = await replicate.deployments.predictions.create(
      "biggeye",
      modelName,
      {
        input: {
          prompt: prompt,
        },
      }
    );

    prediction = await replicate.wait(prediction);
    console.log(prediction.output);

    return new Response(JSON.stringify(prediction.output));
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}