"use client";

import RegisterModal from "./auth/register-modal";
import SignInModal from "./auth/sign-in-modal";
import NavbarActionsLogged from "./auth/nav-bar-actions-logged";
import { useContext } from "react";
import { AuthContext } from "@/app/context/auth-context";
import { Loader2 } from "lucide-react";

export default function NavbarActions() {
  const { user, isLoading } = useContext(AuthContext);

  return (
    <>
      {!user && (
        <div className="space-x-4 flex">
          <>
            <SignInModal />
            <RegisterModal />
          </>
        </div>
      )}
      {user && user?.firstname && user?.lastname && (
        <NavbarActionsLogged
          firstname={user?.firstname}
          lastname={user?.lastname}
        />
      )}
      {isLoading && (
        <div className="w-screen h-screen absolute flex items-center justify-center bg-white z-50 top-0 left-0 no-doc-scroll">
          <Loader2 className="animate-spin size-10" />
        </div>
      )}
    </>
  );
}
