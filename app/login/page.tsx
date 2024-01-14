import { NextRequest, NextResponse } from 'next/server';
import { handleSignInWithPassword, handleOAuthLogin } from '@/lib/supabase-server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function Login(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { email, password } = await req.json();
// WHAT ARE THE SERVER-SIDE EQUIVALENTS FOR THE FOLLOWING COMMENTED OUT DECLARATIONS?  THEY ARE REQUIRED IN THE JSX 
  /*
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
*/

  const handleGitHubLogin = async (event: { preventDefault: any; }) => {
    event.preventDefault;
    try {
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/auth/callback`,
        },
      });
    } catch (error) {
      console.error("GitHub login error:", error);
    }
  };

 
  const handleGoogleLogin = async (event: { preventDefault: any; }) => {
    event.preventDefault;
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",    options: {
          redirectTo: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/auth/callback`,
        },
      });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };



  return (
 <div>   Login form here</div>
  );
}
export default Login;