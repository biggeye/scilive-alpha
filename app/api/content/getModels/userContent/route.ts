import { createClient } from "@/utils/supabase/route";

export async function POST(req: Request) {
    const supabase = createClient(req);

    let selectedModelId;
    try {
        // Assuming the model ID is sent directly in the body, adjust if it's nested
        const requestBody = await req.json();
        selectedModelId = requestBody.selectedModelId;

        if (!selectedModelId) {
            return new Response(JSON.stringify({ error: "Model ID is required" }), { status: 400 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400 });
    }

    try {
        const { data: modelsData, error } = await supabase
            .from('master_content')
            .select('url')
            .eq('model_id', selectedModelId);

        if (error) {
            throw error;
        }

        if (modelsData.length === 0) {
            return new Response(JSON.stringify({ message: "No examples found" }), { status: 404 });
        } 

        return new Response(JSON.stringify(modelsData), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error }), { status: 500 });
    }
}
