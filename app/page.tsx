import { useUserContext } from "@/lib/UserProvider";
import { Text } from "@chakra-ui/react";
import { Link
 } from "@chakra-ui/react";
function Home() {
  const { userProfile } = useUserContext();
  return(
     userProfile ? (
      <Text>Hello {userProfile.id}</Text>
     )  : (
      <Text>Click <Link href="/login">here</Link> to login.</Text>
     )
     
  )
}

export default Home;
