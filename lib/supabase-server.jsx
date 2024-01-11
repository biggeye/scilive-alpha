import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const cookieStore = cookies();
const createServerSupabaseClient = createClient(cookieStore);

export async function getSession() {
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

export async function getUserDetails() {;
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
  try {
    const { data: masterContent, error } = await supabase
      .from("master_content")
      .select("*");

    // Assuming masterContent is an array of objects, this will format it as a JSON string
    return JSON.stringify(masterContent);
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
};


export async function handleDelete(contentId) {
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
  const { error } = await supabase.auth.signOut();
  console.log("Signing out...");

  if (error) {
    return error.message;
  } else {
    return "You have been signed out.";
  }
};

export const handleSignInWithPassword = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    return error.message;
  }
  return data;
};

export const handleOAuthLogin = async (provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${process.env.DEFAULT_URL}/auth/callback`,
    },
  });
  if (error) {
    return error.message;
  }
};

export const handleSignInWithGoogle = async () => {
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


export async function getImg2TxtModels() {
  try {
    const [ data ] = await supabase.from('img2txt').select('*')
    return data;
  } catch (error) {
    console.error("Error fetching models: ", error);
    return null;
  }
}

export async function getTxt2ImgModels() {
  try {
    const [ data ] = await supabase.from('txt2img').select('*');
    return data;
  } catch (error) {
    console.error("Error fetching models: ", error);
    return null;
  }
}


export async function getImg2ImgModels() {
  try {
    const [ data ] = await supabase.from('img2img').select('*');
    return data;
  } catch (error) {
    console.error("Error fetching models: ", error);
    return null;
  }
}

/*
export async function getSubscription() {

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