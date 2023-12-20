import { useEffect } from "react";
import { supabase } from "@/utils/supabase/legacy";

const GitHubLogin = () => {
    useEffect(() => {
        supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'https://scilive.cloud/legacy'
            }
        })
    }, []);
        return <p> Logging in </p>
        };

        export default GitHubLogin;
 