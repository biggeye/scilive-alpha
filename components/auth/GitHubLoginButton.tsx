'use client'
import { createClient } from "@/utils/supabase/client";

export default function GitHubLoginButton() {
    const supabase = createClient();

    const handleGitHubLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/api/auth/callback'
            }
        })
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    }

    return (
        <>
        <button onClick={handleGitHubLogin}>
        Sign In With GitHub
    </button>
    <button onClick={handleSignOut}>Sign Out</button>
    </>
    )
}

