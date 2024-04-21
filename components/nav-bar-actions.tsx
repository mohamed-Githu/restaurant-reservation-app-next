"use client";

import { useContext, useState } from "react";
import RegisterModal from "./auth/register-modal";
import SignInModal from "./auth/sign-in-modal";
import { AuthContext, User } from "@/app/context/auth-context";
import { Button } from "./ui/button";
import { signOutAction } from "@/actions/user-actions";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface NavbarActionsProps {
  user?: User;
  success: boolean;
}

export default function NavbarActions({ user, success }: NavbarActionsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authContext = useContext(AuthContext);
  const { toast } = useToast();
  if (success && user && !user.email && !user.firstname && !user.lastname) {
    authContext.setUser(user);
  }

  const handleSignOut = async () => {
    setIsLoading(true);
    const res: any = await signOutAction();
    if (res?.success) {
      setIsLoading(false);
      authContext.setUser(null);
      toast({
        title: "Success",
        description: "You have been signed out",
        variant: "success",
      });
    } else {
      setIsLoading(false);
      toast({
        title: "Error",
        description: res?.error,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {!authContext.user && (
        <div className="space-x-4 flex">
          <>
            <SignInModal />
            <RegisterModal />
          </>
        </div>
      )}
      {authContext.user && (
        <>
          <div className="flex items-center uppercase space-x-1 text-sm font-extrabold text-gray-800 -ml-5">
            <p>{authContext.user.firstname}</p>
            <p>{authContext.user.lastname}</p>
          </div>
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={handleSignOut}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
            Sign Out
          </Button>
        </>
      )}
    </>
  );
}
