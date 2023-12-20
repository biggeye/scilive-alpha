'use client'
import { createClient } from "@/utils/supabase/client";

export default function GitHubLoginButton() {
    const supabase = createClient();

    const handleGitHubLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'https://scilive.cloud/api/auth/callback'
            }
        })
    };

    return (
        <>
            <button className="submit-button" onClick={handleGitHubLogin}>
                GitHub
            </button>
        </>
    )
}

