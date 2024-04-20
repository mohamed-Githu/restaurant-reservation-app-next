"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export default function RegisterModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Register</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>REGISTER</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="space-y-1">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                name="firstname"
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                name="lastname"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 items-center gap-4">
            <div className="space-y-1">
              <Label htmlFor="firstname">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" placeholder="Enter your city" />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Enter your password"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Register</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
