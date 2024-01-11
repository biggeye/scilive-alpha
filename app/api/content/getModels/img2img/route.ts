import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getImg2ImgModels } from "@/lib/supabase-server";

export default async function GET(req: Request) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/...`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const session = await supabase.auth.getSession();

 

  if(req.method === 'GET'){
      const modelsData = await getImg2ImgModels();
      return Response.json([ modelsData ])
   }
   else{
      return Response.json({error: 'Method not allowed'});
   }
}