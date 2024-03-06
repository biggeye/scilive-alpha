import { Leap } from "@leap-ai/workflows";
import uploadTrainedModel from "@/lib/leap/uploadTrainedModel";

interface bodyData {
  model_name: string,
  type_of_model: string,
  user_id: string,
  uploaded_images: File[],
  number_of_images: string
}

export async function POST(req: Request) {

   try {
    const bodyData = await req.json();
    const model_name = bodyData.model_name;
    const type_of_model = bodyData.type_of_model;
    const user_id = bodyData.user_id;
    const uploaded_images = bodyData.uploaded_images;
    const number_of_images = bodyData.number_of_images;

    const leap = new Leap({
      apiKey: "le_2063514b_i5qgFukiMYVcCKDBK00U6Mgp",
    });
    
    const response = await leap.workflowRuns.workflow(
      {
        workflow_id: "wkf_mxK73zGMRoN5th",
        webhook_url:
          "https://29c1-2603-8000-2700-d75b-00-1258.ngrok-free.app/api/leap/trainer/hook",
        input: {
          name_of_model: model_name,
          type_of_model: type_of_model,
          user_id: user_id,
          number_of_images: number_of_images,
          images: uploaded_images
        },
      },
    );
    if (response.status !== 201) {
      const error = await response;
      return new Response(JSON.stringify({ detail: error }), { status: 500 });
    } else if (response.data.id) {
      const model_id = response.data.id;
      const trainingConfirmation = await uploadTrainedModel(model_id, model_name, user_id, type_of_model, number_of_images, uploaded_images);
    }

return new Response(JSON.stringify({
  id: response.data.id,
  status: response.data.status,
  created_at: response.data.created_at,
  workflow_id: response.data.workflow_id,
  input: response.data.input,
  output: response.data.output, // This will be null if the workflow is still running
}), { status: 201 });

  } catch (error) {
    // Check if the error is an instance of Error to access its message property
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: errorMessage }), { status: 500 });
  }
}