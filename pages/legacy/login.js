import { useEffect } from "react";
import { supabase } from "@/utils/supabase/legacy";

const GitHubLogin = () => {
    useEffect(() => {
        supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/api/auth/callback'
            }
        })
    }, []);
        return <p> Logging in </p>
        };

        export default GitHubLogin;
 