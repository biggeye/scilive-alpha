"use client";
import { Fragment, useState } from "react";
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
        <div
          className="navbar-container"
          style={{ margin: "auto", maxWidth: "1200px", padding: "0 16px" }}
        >
          <div
            style={{
              position: "relative",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Mobile menu button */}
            <Disclosure.Button
              style={{
                position: "absolute",
                insetY: "0",
                left: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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

            {/* Logo and navigation links */}
            <div style={{}}>
                <Menu as="div" className="relative inline-block text-left">
          <Menu.Button style={{ ... }}>
            <img
              src="/sciLive.svg"
              alt="sciLive"
              style={{ height: "64px" }}
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
            <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {navigation.map((item) => (
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
        </Menu>

            {/* Right-side elements */}
            <div
              style={{
                position: "fixed",
                insetY: "0",
                right: "0",
                display: "flex",
                alignItems: "center",
                paddingRight: "8px",
              }}
            >
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="relative flex">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-20 top-4 right-4 w-auto"
                      src="/avatartech.png"
                      alt="Avatar"
                    />
                  </Menu.Button>
                </div>
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
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={openAccountModal}
                          className={
                            (active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-slate-900 w-full text-left")
                          }
                        >
                          Your Profile
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={
                            (active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-slate-900")
                          }
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/login"
                          className={
                            (active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-slate-900")
                          }
                        >
                          Login
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          {isAccountModalOpen && (
            <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
              <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
                <span className="absolute top-0 right-0 p-4">
                  <button onClick={closeAccountModal} className="text-black">
                    &times;
                  </button>
                </span>
                <AccountForm />
              </div>
            </div>
          )}

          {/* Mobile menu panel */}
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
        </div>
      )}
    </Disclosure>
  );
};

export default Navbar;
