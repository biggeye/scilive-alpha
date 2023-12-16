'use server';
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export const handleSignInWithPassword = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      return error.message;
    }
    return data;
  } catch (error) {
    return error.message;
  }
};

export const handleOAuthLogin = async (provider) => {
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
      return error.message;
    }

    // The page will redirect on successful login
    // You might not need to return anything here as the page will redirect
  } catch (error) {
    return error.message;
  }
  // No need for a finally block if you're just returning data
};

export const handleSignInWithGoogle = async (response) => {
  try {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    });

    if (error) {
      console.error("Error during Google Sign-In: ", error.message);
      return error.message;
    }

    console.log("Google Sign-In successful: ", data);
    // Handle the successful sign-in (e.g., redirecting to the dashboard)
  } catch (error) {
    console.error("An error occurred during Google Sign-In: ", error);
    return error.message;
  }
};

export const handleSignout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    console.log("Signing out...");

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

export const getSessionServer = async () => {
  const { data: session } = await supabase.auth.getSession();
  console.log("session: ", session);

  return session;
};
