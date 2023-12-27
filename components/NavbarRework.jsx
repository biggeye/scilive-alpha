import React, { useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import AccountForm from "@/components/account/AccountForm";
import styles from './Navbar.module.css'; // CSS Module for styles

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Gallery", href: "/gallery" },
];

const Navbar = () => {
  // ... existing logic

  return (
    <Disclosure as="nav" className={styles.navbarContainer}>
      {({ open }) => (
        <>
          {/* Mobile menu button */}
          <Disclosure.Button className={styles.mobileMenuButton}>
            <span className="sr-only">Open main menu</span>
            {open ? <XMarkIcon className="icon" aria-hidden="true" /> : <Bars3Icon className="icon" aria-hidden="true" />}
          </Disclosure.Button>

          {/* Logo and DropdownMenu */}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className={styles.logoButton}>
              <img src="/sciLive.svg" alt="sciLive" />
            </Menu.Button>
            <DropdownMenu items={navigation} />
          </Menu>

          {/* Right-side elements */}
          <UserMenu onOpenAccountModal={openAccountModal} userImageUrl="/avatartech2.svg" />
          
          {/* Account Modal */}
          {isAccountModalOpen && <AccountModal onClose={closeAccountModal} />}

          {/* Mobile menu panel */}
          <MobileMenu navigation={navigation} open={open} />
        </>
      )}
    </Disclosure>
  );
};

// Rest of the components (DropdownMenu, UserMenu, MenuItem, AccountModal, MobileMenu)
// Update these components to use styles from Navbar.module.css where applicable

export default Navbar;
