"use client";

import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { createClient } from "@/utils/supabase/client";
import { getUserId } from "@/utils/supabase/getUserId";
import { AccountIcon, DashboardIcon, GalleryIcon } from './icons';



const navigation = [
  { name: "Dashboard", href: "/", icon: DashboardIcon },
  { name: "Gallery", href: "/gallery", icon: GalleryIcon },
  { name: "Account", href: "/account", icon: AccountIcon },
];

export default async function Navbar({}) {
  const supabase = createClient();
  const pathname = usePathname();
  const checkUser = getUserId(supabase);


  return (
    <Disclosure
      as="nav"
      className="navbar-container"
    >
      {({ open }) => (
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
          </div>
      )}
    </Disclosure>
  );
}
