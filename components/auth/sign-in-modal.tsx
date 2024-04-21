"use client";

import { signInAction } from "@/actions/user-actions";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SignInForm from "./sign-in-form";
import { loginSchema } from "./zod-schemas";
import { SafeParseReturnType } from "zod";
import { LoginSchemaType } from "./types";
import { useToast } from "../ui/use-toast";
import { useContext, useRef } from "react";

export default function SignInModal() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleSignIn = async (formData: FormData) => {
    const existingUser = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const result: SafeParseReturnType<LoginSchemaType, LoginSchemaType> =
      loginSchema.safeParse(existingUser);

    if (result.success) {
      const res = await signInAction(result.data);
      triggerRef.current?.click();
      formRef.current?.reset();
      if (res?.success) {
        toast({
          variant: "success",
          title: "Sign In Successful",
          description: "You have successfully signed in",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Sign In Failed",
          description: res?.error,
        });
      }
    } else {
      let errorMessage = "";

      for (const [key, value] of Object.entries(
        result.error.flatten().fieldErrors
      )) {
        errorMessage += `\n${key.toUpperCase()}:\n${value.join("\n")}\n`;
      }
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: errorMessage,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={triggerRef}>Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>SIGN IN</DialogTitle>
        </DialogHeader>
        <form id="signin-form" action={handleSignIn} ref={formRef}>
          <SignInForm />
        </form>
      </DialogContent>
    </Dialog>
  );
}
