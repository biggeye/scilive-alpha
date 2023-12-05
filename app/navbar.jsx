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
  const supabase = createClient();
  const user = supabase.auth.getSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [message, setMessage] = useState("");

 

  const toggleDropdown = () => {
    console.log('Toggling dropdown...');
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
            <AccountIcon />
            {isDropdownOpen && (
              <div className="dropdown-menu">
              {user ? ( <button onClick={handleSignout}>Sign Out</button>
              ) : (
               <a href="/account">Log In</a>
               )}
                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
