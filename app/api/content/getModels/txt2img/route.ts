import { createClient } from "@/utils/supabase/client";


export async function GET(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {

    const supabase = createClient();
    const session = await supabase.auth.getSession();
    // Assuming you want to use the session for something

    const modelsData = await supabase.from('txt2img').select('*');
    return new Response(JSON.stringify(modelsData), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Error fetching models: ", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
