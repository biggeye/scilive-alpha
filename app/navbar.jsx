"use client";
import { usePathname } from "next/navigation";
import { AccountIcon, DashboardIcon, GalleryIcon } from "./icons";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState, useRef } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { name: "Gallery", href: "/gallery", icon: GalleryIcon },
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
    <div className="navbar-container">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="nav-item"
          aria-current={pathname === item.href ? "page" : undefined}
        >
          <item.icon />
        </a>
      ))}

      <div className="account-icon" onClick={toggleDropdown} ref={dropdownRef}>
        <AccountIcon />
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {session ? (
              <button onClick={handleSignout}>Log Out</button>
            ) : (
              <a href="/login">Log In</a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
