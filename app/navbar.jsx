"use client";
import { usePathname } from "next/navigation";
import { AccountIcon, DashboardIcon, GalleryIcon } from "./icons";
import { createClient } from "@/lib/supabase/client";
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
  const user = supabase.auth.getUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("You have been signed out.");
        redirect("/login"); // Redirect after successful sign out
      }
    } catch (error) {
      setMessage("An error occurred during sign out: ", error);
    }
  };
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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
                <button onClick={handleSignout}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
