"use client";
import React, { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/client";
import { Link } from '@chakra-ui/next-js'

    


const MenuItem = ({ title, onClick, href }) => (
  <Menu.Item>
    {({ active }) => (
      <Link 
      href={href} 
      color='blue.400' 
      _hover={{ color: 'blue.500' }}
        onClick={onClick}
     >
        {title}
      </Link>
    )}
  </Menu.Item>
);

const DropdownMenu = ({ items }) => (
  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <Menu.Items className="mobile-menu-items">
     {items.map((item) => (
        <Menu.Item key={item.name}>
          {({ active }) => (
            <a
              href={item.href}
              className={`${
                active ? "bg-gray-100" : ""
              } block px-4 py-2 text-sm text-slate-900 w-full text-left`}
            >
              {item.name}
            </a>
          )}
        </Menu.Item>
      ))}
    </Menu.Items>
  </Transition>
);

const UserMenu = ({ userImageUrl }) => (
  <Menu as="div">
    <Menu.Button>
      <img className="avatar-button" src={userImageUrl} alt="User Avatar" />
    </Menu.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="profile-menu-items">
        <MenuItem title="Your Profile" href="/account" />
        <MenuItem title="Settings" href="#" />
        <MenuItem title="Login" href="/login" />
      </Menu.Items>
    </Transition>
  </Menu>
);

const MobileMenu = ({ navigation, open }) => (
  <Disclosure.Panel
    className="mobile-menu"
    style={{ display: open ? "block" : "none" }}
  >
    <div style={{ padding: "8px" }}>
      {navigation.map((item) => (
        <Disclosure.Button
          key={item.name}
          as="a"
          href={item.href}
          style={{
            display: "block",
            padding: "8px 12px",
            textDecoration: "none",
            color: "black",
          }}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}
        </Disclosure.Button>
      ))}
    </div>
  </Disclosure.Panel>
);

const UserInfo = ({ email, provider, avatar_url }) => {
  return (
    <div className="status-display">
      email: {email} | provider: {provider}
    </div>
  );
};

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();
      const session = await supabase.auth.getSession();
      console.log("User data:", user);
      console.log("Session data:", session);
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
    <Disclosure as="nav" className="navbar-container">
      {({ open }) => (
        <>
          {/* Mobile menu button */}
          <Disclosure.Button
            className="logo-main"
          >
            <span className="sr-only">Open main menu</span>
            {open ? (
              <XMarkIcon className="icon" aria-hidden="true" />
            ) : (
              <Bars3Icon className="icon" aria-hidden="true" />
            )}
          </Disclosure.Button>

          {/* Logo */}
          <Menu as="div" className="logo-main">
            <Menu.Button>
              <img
                src="/sciLive.svg"
                alt="sciLive"
                style={{ height: "60px" }}
              />
            </Menu.Button>
            <DropdownMenu items={navigation} />
          </Menu>

          <UserInfo
            className="status-display"
            email={email}
            provider={provider}
            avatar_url={avatar_url}
          />

          {/* Right-side elements */}
          <UserMenu userImageUrl={avatar_url} />

          {/* Mobile menu panel */}
          <MobileMenu navigation={navigation} open={open} />
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
