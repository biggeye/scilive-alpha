import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getTxt2ImgModels } from "@/lib/supabase-server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const session = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({
      error: 'not_authenticated',
      description: 'The user does not have an active session or is not authenticated',
    })
  }
  

    if(req.method === 'GET'){
      const modelsData = await getTxt2ImgModels();
      return res.status(200).json(modelsData);
   }
   else{
      return res.status(405).json({error: 'Method not allowed'});
   }
}