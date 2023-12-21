'use client'
import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import AccountForm from "@/components/auth/AccountForm"; // Adjust the import path as necessary

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Gallery", href: "/gallery" },
];

const Navbar = () => {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const openAccountModal = () => setIsAccountModalOpen(true);
  const closeAccountModal = () => setIsAccountModalOpen(false);

  return (
    <Disclosure as="nav" style={{ backgroundColor: "#f1f1f1" }}>
      {({ open }) => (
        <>
          <div
            className="navbar-container"
          >
            <div
              style={{
                height: "64px",
                display: "flex",
              }}
            >
              {/* Mobile menu button */}
              <Disclosure.Button
                style={{
                  position: "absolute",
                  insetY: "0",
                  left: "0",
                  padding: "8px",
                }}
              >
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="icon" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="icon" aria-hidden="true" />
                )}
              </Disclosure.Button>

              {/* Logo */}
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button>
                  <img
                    src="/sciLive.svg"
                    alt="sciLive"
                    style={{ height: "64px" }}
                  />
                </Menu.Button>
                <DropdownMenu items={navigation} />
              </Menu>

              {/* Right-side elements */}
              <UserMenu
                onOpenAccountModal={openAccountModal}
                userImageUrl="/avatartech.png"
              />
            </div>

            {/* Account Modal */}
            {isAccountModalOpen && (
              <AccountModal onClose={closeAccountModal} />
            )}

            {/* Mobile menu panel */}
            <MobileMenu navigation={navigation} open={open} />
          </div>
        </>
      )}
    </Disclosure>
  );
};

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
    <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      {items.map((item) => (
        <Menu.Item key={item.name}>
          {({ active }) => (
            <a
              href={item.href}
              className={`${
                active ? 'bg-gray-100' : ''
              } group flex rounded-md items-center w-full px-2 py-2 text-sm text-slate-900`}
            >
              {item.name}
            </a>
          )}
        </Menu.Item>
      ))}
    </Menu.Items>
  </Transition>
);

const UserMenu = ({ onOpenAccountModal, userImageUrl }) => (
  <Menu as="div" className="relative">
    <Menu.Button className="flex">
      <img
        className="h-20 w-auto"
        src={userImageUrl}
        alt="User Avatar"
      />
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
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <MenuItem title="Your Profile" onClick={onOpenAccountModal} />
        <MenuItem title="Settings" href="#" />
        <MenuItem title="Login" href="/login" />
      </Menu.Items>
    </Transition>
  </Menu>
);

const MenuItem = ({ title, onClick, href }) => (
  <Menu.Item>
    {({ active }) => (
      <a
        href={href}
        onClick={onClick}
        className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-slate-900 w-full text-left`}
      >
        {title}
      </a>
    )}
  </Menu.Item>
);

const AccountModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
    <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
      <span className="absolute top-0 right-0 p-4">
        <button onClick={onClose} className="text-black">
          &times;
        </button>
      </span>
      <AccountForm />
    </div>
  </div>
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

export default Navbar;