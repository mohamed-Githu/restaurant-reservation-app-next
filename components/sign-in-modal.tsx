"use client"

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function SignInModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>SIGN IN</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="Enter your password"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Sign In</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}