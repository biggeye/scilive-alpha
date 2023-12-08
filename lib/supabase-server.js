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

    // Assuming you want to do something with data if there's no error
    // For example, return a success message or the user data
    return data;

  } catch (error) {
    // This catch block is for catching unexpected errors in the try block
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

export const getSession = async () => {
  const { data: session } = await supabase.auth.getSession();
  console.log("session: ", session);

  return session;
};
