import Replicate from 'replicate';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const { allInputs }: { allInputs: AllInputs } = await req.json();

    if (!allInputs.modelName || !allInputs.prompt) {
      return new Response(JSON.stringify({ error: 'Model name and prompt are required' }), { status: 400 });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // Construct the input object dynamically
    let inputObject: { [key: string]: any } = {};
    for (const key in allInputs) {
      if (allInputs[key] !== undefined && allInputs[key] !== null) {
        inputObject[key] = allInputs[key];
      }
    }

    // Assuming modelName is used to specify the model and not as an input parameter
    const modelName = inputObject.modelName;
    delete inputObject.modelName;  // Remove modelName from inputObject as it's not an input parameter

    console.log("modelName: ", modelName);
    console.log("inputObject: ", {
      inputObject
    })

    let prediction: any = await replicate.deployments.predictions.create(
      "biggeye",
      modelName,
      { input: inputObject }
    );
    
    prediction = await replicate.wait(prediction);
    console.log(prediction.output);
    
    return new Response(JSON.stringify(prediction.output));
    }