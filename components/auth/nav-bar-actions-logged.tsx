"use client";

import { useContext, useState } from "react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { AuthContext } from "@/app/context/auth-context";
import { signOutAction } from "@/actions/user-actions";

interface NavbarActionsLoggedProps {
  firstname: string;
  lastname: string;
}

export default function NavbarActionsLogged({
  firstname,
  lastname,
}: NavbarActionsLoggedProps): React.ReactNode {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const { toast } = useToast();

  const handleSignOut = async () => {
    setIsLoading(true);
    const res: any = await signOutAction();
    if (res?.success) {
      setIsLoading(false);
      setUser(null);
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
      <div className="flex items-center uppercase space-x-1 text-sm font-extrabold text-gray-800 -ml-5">
        <p>{firstname}</p>
        <p>{lastname}</p>
      </div>
      <Button disabled={isLoading} variant="outline" onClick={handleSignOut}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign
        Out
      </Button>
    </>
  );
}
