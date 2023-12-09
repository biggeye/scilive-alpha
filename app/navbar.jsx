"use client";
import { usePathname } from "next/navigation";
import { AccountIcon, DashboardIcon, GalleryIcon } from "./icons";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRef } from "react";

const navigation = [
  { name: "Home", href: "/", icon: DashboardIcon},
  { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
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
  }, [session]);

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
           <div className="account-icon">
            <AccountIcon />
           </div>
          </div>
        </div>
      </div>
    </div>
  );
}
