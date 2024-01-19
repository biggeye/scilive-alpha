import { createClient } from "@/utils/supabase/route";

export async function POST(req: Request) {
    const supabase = createClient(req);

    // Parse the request body to get the selectedModelId
    const { selectedModelId } = await req.json();

    // Check if the model ID is provided
    if (!selectedModelId) {
        return new Response(JSON.stringify({ error: "Model ID is required" }), { status: 400 });
    }

    const { data: modelsData, error } = await supabase
        .from('master_content')
        .select('url')
        .eq('model_id', selectedModelId);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(modelsData), { status: 200 });
}
