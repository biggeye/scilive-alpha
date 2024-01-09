"use client";
import React, { useContext } from "react";
import {
  Box,
  Button,
  Link,
  Collapse,
  IconButton,
  Image,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  useDisclosure,
  Spacer,
  Flex,
  Text,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { createClient } from "@/utils/supabase/client";
import { useUserContext } from "@/lib/UserProvider";

const DropdownMenu = ({ items }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Menu isOpen={isOpen} onClose={onToggle}>
      <MenuButton
        as={IconButton}
        onClick={onToggle}
        boxSize="50px" // Adjust the size as needed for your navbar
        objectFit="cover" // Ensures the image covers the box area
        boxShadow="md"
        bgGradient="radial(white 5%, silver 50%)"
        marginLeft="7px"
      >
        <Image src="/sciLive.svg" width={40} />
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
  const supabase = createClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userProfile } = useUserContext();
  const userId = userProfile.id;
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const fallbackImageUrl = "https://scilive.cloud/avatar-icon.svg"; // Replace with your actual fallback image URL

  return (
     <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton as={IconButton} onClick={onOpen} 
      boxSize="50px" // Adjust the size as needed for your navbar
      objectFit="fill" // Ensures the image covers the box area
      boxShadow="md"
      bgGradient="radial(white 5%, silver 50%)"
        marginRight="7px"
        borderRadius="5px">
        <Image
          src={userImageUrl || fallbackImageUrl}
          borderRadius="5px"
          width="100%"
                 />
      </MenuButton>
      <MenuList>
        {userId ? (
          <MenuItem onClick={signOut}>Sign-Out</MenuItem>
        ) : (
          <MenuItem as={Link} href="/login">
            Login
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

const Navbar = () => {
  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Gallery", href: "/gallery" },
    { name: "100ms", href: "/100ms" },
    { name: "eyeMagick", href: "/eyemagick" },
    { name: "Account", href: "/account" },
  ];

  const { userProfile } = useUserContext();
  const avatar_url = userProfile.avatar_url;

  return (
    <Flex
    direction="row"
    justifyContent="space-between"
    alignItems="center" // Add this to align items vertically in the center
    as="nav"
    bgColor="silver"
    p={1}
  >
    <DropdownMenu items={navigation} />
    <Spacer />
    <UserMenu userImageUrl={avatar_url} />
  </Flex>
  );
};

export default Navbar;
