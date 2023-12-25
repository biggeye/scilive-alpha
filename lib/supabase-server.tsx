import { Database } from '@/types_db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies })
);

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getUserDetails() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: userDetails } = await supabase
      .from('profiles')
      .select('*')
      .single();
    return userDetails;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function fetchUserContent() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: masterContent, error } = await supabase
      .from("master_content")
      .select("*");
    return masterContent;
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
};

export async function handleDelete(contentId: string) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase
    .from("master_content")
    .delete()
    .match({ content_id: contentId })
  if (error)
    console.error("Error deleting content:", error);
  else
    return console.log("Item Deleted");
};

export const handleSignOut = async () => {
  const supabase = createServerSupabaseClient();
  const { error } = await supabase.auth.signOut();
  console.log("Signing out...");

  if (error) {
    return error.message;
  } else {
    return "You have been signed out.";
  }
};

export const handleSignInWithPassword = async (email: string, password: string) => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    return error.message;
  }
  return data;
};

export const handleOAuthLogin = async (provider: any) => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${process.env.DEFAULT_URL}/api/auth/callback`,
    },
  });
  if (error) {
    return error.message;
  }
};

export const handleSignInWithGoogle = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })
  if (error) {
    console.error("Error during Google Sign-In: ", error.message);
    return error.message;
  } else {
    console.log("Google Sign-In successful: ", data);
  }
};

/*
export async function getSubscription() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .maybeSingle()
      .throwOnError();
    return subscription;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
*/


/*
export const getActiveProductsWithPrices = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    console.log(error.message);
  }
  return data ?? [];
};
*/