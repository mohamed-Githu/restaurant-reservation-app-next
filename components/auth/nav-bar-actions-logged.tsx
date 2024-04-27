"use client";

import { useContext, useState } from "react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { AuthContext } from "@/app/context/auth-context";
import { signOutAction } from "@/actions/user-actions";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import Link from "next/link";

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
      <Popover>
        <PopoverTrigger asChild className="cursor-pointer">
          <div className="flex flex-col items-center">
            <Avatar>
              <AvatarFallback className="text-white font-extrabold bg-gray-800">
                {firstname[0].toUpperCase()}
                {lastname[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </PopoverTrigger>
        <PopoverContent className="mr-4 xs:w-52">
          <div className="flex items-center uppercase space-x-1 text-sm font-extrabold text-gray-800 justify-center">
            <p>{firstname}</p>
            <p>{lastname}</p>
          </div>
          
          <div className="my-4 flex flex-col items-center">
          <Link href="/profile">
            <Button variant="ghost">Bookings</Button>
          </Link>

          </div>
          <Separator />
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={handleSignOut}
            className="w-full mt-2"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
            Sign Out
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
