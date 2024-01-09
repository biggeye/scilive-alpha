import { createClient } from '@/utils/supabase/route'
import Replicate from 'replicate';


export default async function POST(req: any, res: any) {

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
      const response = await prediction.output();
      res.status(200).json({ output: response.output });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
    