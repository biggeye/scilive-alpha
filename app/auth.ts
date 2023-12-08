import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";


export default async function Auth() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'example@email.com',
        password: 'example-password'
    })
return 
}