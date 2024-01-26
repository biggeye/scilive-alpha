import { createClient } from "@/utils/supabase/route";

export async function GET(req: Request) {
    // Initialize the Supabase client
    const supabase = createClient(req);

    // Extracting query parameters from the request
    const queryParams = new URL(req.url).searchParams;
    const userId = queryParams.get('id'); // Assuming 'id' is passed as a query parameter

    if (!userId) {
        return new Response(JSON.stringify({ error: "User ID is required" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    try {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId);

        if (error) throw error;

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
