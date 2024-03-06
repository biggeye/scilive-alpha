'use server';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export async function getUserId() {
  const { data, error } = await supabase.auth.getSession();
  const userId = await data.session?.user.id;
  if (userId) {
    return userId;
  }
}

export async function fetchUser() {
  const { data, error } = await supabase
  .from('users')
  .select('*');
  if (error) {
  console.error('Error fetching user: ', error.message);
return null;
} return data;
}

export async function fetchUserAvatar() {
  const { data, error } = await supabase
    .from('users')
    .select('avatar_url')
    .single();
  if (error) {
    console.error('Error fetching user avatar:', error.message);
    return null;
  } return data;
}

