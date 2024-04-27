"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useFormStatus } from "react-dom";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
  const { pending } = useFormStatus();
  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 items-center gap-4 xs:grid-cols-1">
          <div className="space-y-1">
            <Label htmlFor="firstname">First Name</Label>
            <Input
              disabled={pending}
              id="firstname"
              name="firstname"
              placeholder="Enter your first name"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              disabled={pending}
              id="lastname"
              name="lastname"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-4 xs:grid-cols-1">
          <div className="space-y-1">
            <Label htmlFor="firstname">Phone Number</Label>
            <Input
              disabled={pending}
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="city">City</Label>
            <Input
              disabled={pending}
              id="city"
              name="city"
              placeholder="Enter your city"
            />
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-4 items-center xs:grid-cols-1 space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled={pending}
            id="email"
            name="email"
            placeholder="Enter your email"
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center xs:grid-cols-1 space-y-2">
          <Label htmlFor="password">Password</Label>
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
        <Button form="register-form" disabled={pending} type="submit">
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
          Register
        </Button>
      </DialogFooter>
    </>
  );
}
