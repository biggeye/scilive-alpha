'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardFooter } from '@chakra-ui/react';
import { useUserContext } from '@/lib/UserProvider';

const Home = () => {
  const router = useRouter();
  const { userProfile } = useUserContext();

  useEffect(() => {
    // Redirect to /login if the user is not logged in
    if (!userProfile?.id) {
      router.push('/login');
    }
  }, [userProfile, router]);

  // Render placeholder or loader while userProfile is being determined
  if (!userProfile) {
    return <div>Loading...</div>; // Or any other placeholder
  }

  return (
    <Card>
      <CardFooter className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="https://www.scifiction.com"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            <img src="/scifiction.png" alt="SciFiction" width="70px" />
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Home;
