"use client";
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
    <Disclosure as="nav" className="bg-slate-100">
    {({ open }) => (
      <div className="navbar-container">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-slate-900 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>

            {/* Logo and navigation links */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="mt-4 h-16 w-auto"
                  src="/sciLive.svg"
                  alt="sciLive"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex flex-space-between space-x-4 mt-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={(
                        item.current
                          ? "bg-gray-800 text-white"
                          : "text-slate-900 hover:bg-slate-300 hover:text-slate-800",
                        "px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right-side elements */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Notification bell */}
      
              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="relative flex">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-12 w-auto"
                      src="/avatar-icon.svg"
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
                className={(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-slate-900 w-full text-left"
                )}
              >
                Your Profile
              </button>
            )}
          </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-slate-900"
                          )}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/login"
                        className={(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-slate-900"
                        )}
                      >
                        Login
                      </a>
                               )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              
              </Menu>
                 {/* AccountForm Modal */}
    {isAccountModalOpen && (
      <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
        <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
          <span className="absolute top-0 right-0 p-4">
            <button onClick={closeAccountModal} className="text-black">&times;</button>
          </span>
          <AccountForm />
        </div>
      </div>
    )}
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <Disclosure.Panel className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-slate-900 hover:bg-slate-300 hover:text-slate-800",
                  "block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                )}
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
