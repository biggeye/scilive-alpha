// app/api/replicate/predict.ts
import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

// Define the structure of allInputs
interface AllInputs {
  modelName: string;
  prompt: string;
  [key: string]: any; // For other dynamic keys
}

export const config = {
  runtime: 'experimental-edge',
};

export async function POST(req: NextRequest) {
  try {
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

    let prediction = await replicate.deployments.predictions.create(
      "biggeye",  // Assuming "biggeye" is a constant part of the request
      modelName,
      { input: inputObject }  // Pass the dynamically constructed input object
    ) as DeploymentPredictionCreateResponse;

    prediction = await replicate.wait(prediction) as DeploymentPredictionCreateResponse;
    console.log(prediction.output);

    return new Response(JSON.stringify(prediction.output));
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
