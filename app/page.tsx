'use client'
import { useUserContext } from "@/lib/UserProvider";
import { Text, Center } from "@chakra-ui/react";
import { Link
 } from "@chakra-ui/react";
function Home() {
  const { userProfile } = useUserContext();
  return(
    <Center>
     {!!userProfile ? (
      <Text>Hello {userProfile.id}</Text>
     )  : (
      <Text>Click <Link href="/login">here</Link> to login.</Text>
     )}
     </Center>
  )
}

export default Home;
