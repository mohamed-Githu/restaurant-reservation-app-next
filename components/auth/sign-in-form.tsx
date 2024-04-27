import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";

export default function SignInForm() {
  const { pending } = useFormStatus();
  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4 xs:grid-cols-1">
          <Label htmlFor="email" className="text-right xs:text-left">
            Email
          </Label>
          <Input
            disabled={pending}
            id="email"
            name="email"
            placeholder="Enter your email"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4 xs:grid-cols-1">
          <Label htmlFor="password" className="text-right xs:text-left">
            Password
          </Label>
          <Input
            disabled={pending}
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button form="signin-form" type="submit" disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign In
        </Button>
      </DialogFooter>
    </>
  );
}
