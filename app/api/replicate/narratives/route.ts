import { createClient } from '@/utils/supabase/route'
import Replicate from 'replicate';


export async function POST(req: any, res: any) {

    const supabase = createClient(req);
    const session = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({
      error: 'not_authenticated',
      description: 'The user does not have an active session or is not authenticated',
    })
  }
  if (req.method === 'POST') {
    try {
      const { eyeMagickUpload, eyeMagickPrompt } = req.body;
      const replicate = new Replicate({
          auth: process.env.REPLICATE_API_TOKEN,
      });
      let prediction = await replicate.deployments.predictions.create(
        "biggeye",
        "minigpt-4",
        {
            input: {
                image: eyeMagickUpload,
                prompt: eyeMagickPrompt,
            },
            stream: true,
        })
       if (prediction) {
        return new Response(JSON.stringify(prediction), { status: 201 });
      }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
      }
    }
    
  }