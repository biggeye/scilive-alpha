'use server'

export const signInWithPassword = async (event) => {
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

export const handleOAuthLogin = async (provider) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          redirectTo: `${default_url}/api/auth/callback`,
        },
      });

      if (error) {
        setMessage(error.message);
      }
      // The page will redirect on successful login
    } catch (error) {
      setMessage("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

export const handleSignout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      console.log('Signing out...');

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("You have been signed out.");
        redirect("/login"); // Redirect after successful sign out
      }
    } catch (error) {
      console.error("An error occurred during sign out: ", error);
    }
  };

export const getSession = async () => {

    const { data: session } = await supabase.auth.getSession();
      console.log("session: ", session);

    return session;
  };