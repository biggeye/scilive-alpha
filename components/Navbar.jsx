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
  const supabase = createClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userProfile } = useUserContext();
  const userId = userProfile.id;
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

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
    { name: "Account", href: "/account" },
  ];

  const { userProfile } = useUserContext();
  const avatar_url = userProfile.avatar_url;

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      as="nav"
      bg="gray.100"
      p={1}
    >
      <DropdownMenu items={navigation} />
      <Spacer />
      <UserMenu userImageUrl={avatar_url} />
    </Flex>
  );
};

export default Navbar;
