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
    <Disclosure as="nav" style={{ backgroundColor: '#f1f1f1' }}>
      {({ open }) => (
        <div className="navbar-container" style={{ margin: 'auto', maxWidth: '1200px', padding: '0 16px' }}>
          <div style={{ position: 'relative', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            {/* Mobile menu button */}
            <Disclosure.Button style={{ position: 'absolute', insetY: '0', left: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
              <span className="sr-only">Open main menu</span>
              {open ? <XMarkIcon className="icon" aria-hidden="true" /> : <Bars3Icon className="icon" aria-hidden="true" />}
            </Disclosure.Button>

            {/* Logo and navigation links */}
            <div style={{ display: 'flex', left: '0px', flex: '1', alignItems: 'center', justifyContent: 'center' }}>
              <img
                style={{ display: 'absolute', marginTop: '16px', height: '64px' }}
                src="/sciLive.svg"
                alt="sciLive"
              />

              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '24px' }}>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    style={{ padding: '8px 12px', textDecoration: 'none', color: 'black' }}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Right-side elements */}
            <div style={{ position: 'fixed', insetY: '0', right: '0', display: 'flex', alignItems: 'center', paddingRight: '8px' }}>
              <Menu as="div" className="profile-dropdown" style={{ position: 'relative' }}>
                <Menu.Button style={{ display: 'flex' }}>
                  <img
                    style={{ height: '48px' }}
                    src="/avatar-icon.svg"
                    alt="Avatar"
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
                  <Menu.Items className="menu-items" style={{ position: 'absolute', right: '0', marginTop: '8px', width: '192px', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    {/* Menu items here */}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

          </div>

          {/* Mobile menu panel */}
          <Disclosure.Panel className="mobile-menu" style={{ display: open ? 'block' : 'none' }}>
            <div style={{ padding: '8px' }}>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  style={{ display: 'block', padding: '8px 12px', textDecoration: 'none', color: 'black' }}
                  aria-current={item.current ? 'page' : undefined}
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
