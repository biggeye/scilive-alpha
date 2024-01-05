'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@chakra-ui/react';

export default function SignOut() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <Button
    padding={".5px"}
    mt={2}
    colorScheme="red"
    type="submit"
    onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}