import { createClient } from "@/utils/supabase/route";

export async function GET(req: Request) {
const supabase = createClient(req);

const { data, error } = await supabase
        .from("users")
        .select(*)
        .eq("id", req.body.id);
    }