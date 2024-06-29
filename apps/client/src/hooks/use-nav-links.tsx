"use client";

import { HiUsers } from "react-icons/hi";
import { BiSolidConversation } from "react-icons/bi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { useSignOut } from "./use-sign-out";

export const useNavLinks = () => {
  const { pathname } = useLocation();
  const signOut = useSignOut();

  const navLinks = [
    {
      label: "Chat",
      href: "/conversations",
      icon: BiSolidConversation,
      active: pathname === "/conversations",
    },
    {
      label: "Users",
      href: "/users",
      icon: HiUsers,
      active: pathname === "/users",
    },
    {
      label: "Logout",
      href: "#",
      onClick: () => signOut(),
      icon: RiLogoutBoxRFill,
    },
  ];

  return navLinks;
};
