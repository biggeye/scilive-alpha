"use client";
import { usePathname } from "next/navigation";
import { AccountIcon, DashboardIcon, GalleryIcon } from "./icons";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState, useRef } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { name: "Gallery", href: "/gallery", icon: GalleryIcon },
  { name: "Account", href: "/login", icon: AccountIcon },
];

const Navbar = ({ user, handleSignout }) => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [session, setSession] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    return () => {
      if (authListener && typeof authListener.unsubscribe === "function") {
        authListener.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div class="relative z-10">
      {/* Menu Icon/Button to Open the Side Panel */}
      {!isDropdownOpen && (
        <button onClick={toggleDropdown} class="menu-button">
          {/* Replace with your menu icon */}
          <span>Menu</span>
        </button>
      )}

      {/* Only render the backdrop when the dropdown is open */}
      {isDropdownOpen && (
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      )}

      <div class={`fixed inset-0 overflow-hidden ${isDropdownOpen ? '' : 'hidden'}`}>
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            {/* The close button is now inside the conditional block, so it only appears when the side panel is open */}
            {isDropdownOpen && (
              <div class="pointer-events-auto relative w-screen max-w-md">
                <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={toggleDropdown}
                  >
                    <span class="sr-only">Close panel</span>
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div class="px-4 sm:px-6">
                    <h2
                      class="text-base font-semibold leading-6 text-gray-900"
                      id="slide-over-title"
                    >
                      Panel title
                    </h2>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* Navigation Links */}
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="nav-item"
                        aria-current={pathname === item.href ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                    <hr />
                    {/* Sign Out / Log In Button */}
                    {session ? (
                      <button onClick={handleSignout}>Log Out</button>
                    ) : (
                      <a href="/login">Log In</a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
)};

export default Navbar;