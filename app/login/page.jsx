import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import GitHubLoginButton from "@/components/auth/GitHubLoginButton";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

export default async function LoginPage() {
  const cookieStore = cookies();
  const supabase = createClient({ cookieStore });

  const { data: predictions } = await supabase.from("master_content").select("content-type");


  return (
    <>
      <div className="auth-form"> 
        <GoogleLoginButton />
        <GitHubLoginButton />
        <pre>{JSON.stringify(predictions, null, 2)}</pre>
      </div>
      
    </>
  );
}
