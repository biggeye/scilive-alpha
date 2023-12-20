"use client";
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AccountForm from '@/components/auth/AccountForm'; // Adjust the import path as necessary

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Gallery", href: "/gallery" },
];

const Navbar = () => {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const openAccountModal = () => setIsAccountModalOpen(true);
  const closeAccountModal = () => setIsAccountModalOpen(false);

  return (
    <Disclosure as="nav" className="navbar">
      {({ open }) => (
        <>
          <div className="navbar-container">
    
              <div className="mobile-menu-button">
                <Disclosure.Button className="menu-button">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="icon" />
                  ) : (
                    <Bars3Icon className="icon" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="navbar-content">
        
                  <img
                    className="logo-main"
                    src="/sciLive.svg"
                    alt="sciLive"
                  />
       
                <div className="nav-link">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="nav-link"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="navbar-right">
                <Menu as="div">
     
                    <Menu.Button className="menu-button">
                      <span className="sr-only">Open user menu</span>
                      <img
              
                        src="/avatar-icon.svg"
                        alt="Avatar"
                      />
                    </Menu.Button>
             
                  <Transition
                    as={Fragment}
                    enter="transition-enter"
                    enterFrom="transition-start"
                    enterTo="transition-end"
                    leave="transition-leave"
                    leaveFrom="transition-start"
                    leaveTo="transition-end"
                  >
                    <Menu.Items className="dropdown-menu">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={openAccountModal}
                            className={`dropdown-item ${active ? 'item-active' : ''}`}
                          >
                            Your Profile
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`dropdown-item ${active ? 'item-active' : ''}`}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/login"
                            className={`dropdown-item ${active ? 'item-active' : ''}`}
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
            <div className="modal-container">
              <div className="modal-content">
                <span className="modal-close">
                  <button onClick={closeAccountModal} className="close-button">&times;</button>
                </span>
                <AccountForm />
              </div>
            </div>
          )}

          <Disclosure.Panel className="mobile-menu">
            <div className="mobile-menu-content">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={`mobile-nav-link ${item.current ? 'mobile-link-active' : ''}`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
