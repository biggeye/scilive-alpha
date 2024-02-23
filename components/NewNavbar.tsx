'use client'
import React from 'react';
import {
    Box,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Flex,
    Stack,
    Link,
    Text,
    Spacer,
    Image,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody
} from '@chakra-ui/react';
import { Navbar, NavbarItem, NavbarLink } from '@saas-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Logo from '@/components/Logo';
import { useUserContext } from "@/lib/user/UserProvider";
import { useRouter } from 'next/navigation'; // Corrected from 'next/navigation' to 'next/router'
import SignOut from './Auth/SignOut';
import FacebookTest from './FacebookTest';
const NewNavbar = () => {
    const router = useRouter();
    const { supabase } = useUserContext();
    const { userProfile } = useUserContext();
    const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();

    const userName = userProfile.full_name;
    const userId = userProfile?.id; // Ensure userProfile is accessed safely

    const UserMenu = () => {

        return (
            <Popover placement="bottom-end">
                <PopoverTrigger>
                    <IconButton
                        icon={<Image src={userProfile?.avatar_url || "https://scilive.cloud/avatar-icon.svg"} borderRadius="full" boxSize="40px" />}
                        aria-label="User menu"
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>{userName}</PopoverHeader>
                    <PopoverBody>
                        {userId ? (
                            <Stack>
                                <Link href="/gallery">Gallery</Link>
                                <Link href="/account">Account</Link>
                                <SignOut />
                            </Stack>
                        ) : (
                            <Link href="/auth/signup">Login / Signup</Link>
                        )}
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        );
    };

    return (
        <Box>
            {/* Mobile menu button */}
            <IconButton
                display={{ base: "inline-flex", md: "none" }} // Only show on mobile
                icon={<HamburgerIcon />}
                onClick={onDrawerOpen}
                aria-label="Open Menu"
            />
            <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader><Logo width="50" height="50" /></DrawerHeader>
                    <DrawerBody>
                        <Stack as="nav" spacing={4}>
                            
                                <Link href="/">Home</Link>
                          
                                <Link href="/dashboard">Image</Link>
                          
                                <Link href="/dashboard/d-id">Video</Link>
                     
                                <Link href="/dashboard/avatar">Avatar</Link>
                        
                            {/* Add more links as needed */}
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                         {userId ? (
                            <Stack>
                                <Link href="/gallery">Gallery</Link>
                                <Link href="/account">Account</Link>
                                <SignOut />
                            </Stack>
                        ) : (
                            <Link href="/auth/signup">Login / Signup</Link>
                        )}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/* Desktop Navbar */}
            <Navbar
                position="sticky"
                borderBottomWidth="1px"
                background="transparent"
                backdropFilter="blur(10px)"
            >
                <Logo width="50" height="50" />
                <Spacer />
                <Stack direction="row" spacing={4} align="center">
                    <NavbarItem>
                        <NavbarLink href="/">Home</NavbarLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavbarLink href="/dashboard">Image</NavbarLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavbarLink href="/dashboard/d-id">Video</NavbarLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavbarLink href="/dashboard/avatar">Avatar</NavbarLink>
                    </NavbarItem>
                    <NavbarItem><FacebookTest /></NavbarItem>


                </Stack>
                <Spacer />
                <UserMenu />
            </Navbar>
        </Box>
    );
};

export default NewNavbar;
