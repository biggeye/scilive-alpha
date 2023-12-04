"use client";
import { usePathname } from "next/navigation";
import { AccountIcon, DashboardIcon, GalleryIcon } from "./icons";
import { createClient } from "@/utils/supabase/client";
import Account from "./account";

const navigation = [
  { name: "Dashboard", href: "/", icon: DashboardIcon },
  { name: "Gallery", href: "/gallery", icon: GalleryIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const supabase = createClient();
  const user = supabase.auth.getUser();
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

        <Account />
        </div>
      </div>
    </div>
  );
}
