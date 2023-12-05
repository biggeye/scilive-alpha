'use server'
const signInWithPassword = async (event) => {
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const handleOAuthLogin = async (provider) => {
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
