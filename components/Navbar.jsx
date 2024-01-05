import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Link,
  Collapse,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Spacer,
  Flex,
  Text,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { createClient } from "@/utils/supabase/client";

const DropdownMenu = ({ items }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Menu isOpen={isOpen} onClose={onToggle}>
      <MenuButton as={IconButton} onClick={onToggle}
      boxSize="40px" // Adjust the size as needed for your navbar
      objectFit="cover" // Ensures the image covers the box area
      boxShadow="md"
      >
      <Image src="/sciLive.svg" width={50} />
      </MenuButton>
      <MenuList>
        {items.map((item) => (
          <MenuItem key={item.name} as={Link} href={item.href}>
            {item.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

const UserMenu = ({ userImageUrl }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton as={Button} onClick={onOpen}>
        <Image
          src={userImageUrl}
          alt="User Avatar"
          borderRadius="full" // Makes the image round
          boxSize="40px" // Adjust the size as needed for your navbar
          objectFit="cover" // Ensures the image covers the box area
          boxShadow="md" // Adds a medium drop shadow, you can adjust the shadow as needed
        />
      </MenuButton>
      <MenuList>
        <MenuItem as={Link} href="/account">
          Your Profile
        </MenuItem>
        <MenuItem as={Link} href="#">
          Settings
        </MenuItem>
        <MenuItem as={Link} href="/login">
          Login
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
const UserInfo = ({ email, provider }) => {
  return (
    <Flex direction="column" alignItems="center">
      <Text fontSize={"xx-small"}>Email: {email}</Text>
      <Spacer />
      <Text fontSize={"xx-small"}>Provider: {provider}</Text>
    </Flex>
  );
};

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      const session = await supabase.auth.getSession();
      setUserData(user);
      setSessionData(session);
    };

    fetchData();
  }, []);

  const email =
    userData?.data?.user?.identities?.[0]?.email || "No Email Found";
  const provider =
    sessionData?.data?.session?.user.app_metadata.provider ||
    "No Provider Found";
  const avatar_url = userData?.data?.user?.user_metadata.avatar_url;

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Gallery", href: "/gallery" },
    { name: "Email: " + email, href: "#" },
  ];

  return (
    <Flex direction="row" justifyContent="space-between" as="nav" bg="gray.100" p={1}>
      <DropdownMenu items={navigation} />
      <Spacer />
      <UserMenu userImageUrl={avatar_url} />
    </Flex>
  );
};

export default Navbar;
