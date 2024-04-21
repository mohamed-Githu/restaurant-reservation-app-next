"use client";

import { useContext } from "react";
import RegisterModal from "./auth/register-modal";
import SignInModal from "./auth/sign-in-modal";
import { AuthContext, User } from "@/app/context/auth-context";
import { Button } from "./ui/button";

interface NavbarActionsProps {
  user?: User;
  success: boolean;
}

export default function NavbarActions({ user, success }: NavbarActionsProps) {
  const { setUser } = useContext(AuthContext);
  if (success && user && !user.email && !user.firstname && !user.lastname) {
    setUser(user);
  }

  return (
    <>
      {!success && (
        <div className="space-x-4 flex">
          <>
            <SignInModal />
            <RegisterModal />
          </>
        </div>
      )}
      {success && user && user.email && user.firstname && user.lastname && (
        <>
          <div className="flex items-center uppercase space-x-1 text-sm font-extrabold text-gray-800 -ml-5">
            <p>{user.firstname}</p>
            <p>{user.lastname}</p>
          </div>
          <Button variant="outline">Sign Out</Button>
        </>
      )}
    </>
  );
}
