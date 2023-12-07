"use client";
import { usePathname } from "next/navigation";
import { AccountIcon, DashboardIcon, GalleryIcon } from "./icons";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRef } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: DashboardIcon },
  { name: "Gallery", href: "/gallery", icon: GalleryIcon },
  { name: "Account", href: "/account", icon: AccountIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [message, setMessage] = useState("");

  const [session, setSession] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const session = supabase.auth.getSession();
    setSession(session);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
console.log("authListener.subscription: ", authListener.subscription);
    return () => {
    //  authListener.unsubscribe();
    
  };
  }, [supabase]);

  const toggleDropdown = () => {
    console.log("Toggling dropdown...");
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="navbar-container">
      <div className="nav-item">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="nav-link"
            aria-current={pathname === item.href ? "page" : undefined}
          >
            <item.icon />
          </a>
        ))}
        <div className="avatar">
          <div
            className="account-icon"
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            <div className="flex-col">
              <AccountIcon />
              {session ? (
                <div className="account-icon">
                  Logged in as {session.user.email}
                </div>
              ) : (
                <div className="account-icon">Not logged in</div>
              )}
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {session ? (
                    <button onClick={handleSignout}>Log Out</button>
                  ) : (
                    <a href="/account">Log In</a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
