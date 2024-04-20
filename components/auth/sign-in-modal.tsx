"use client";

import { signIn } from "@/actions/user-actions";
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

export default function SignInModal() {
  const { toast } = useToast();

  const handleSignIn = async (formData: FormData) => {
    const existingUser = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const result: SafeParseReturnType<LoginSchemaType, LoginSchemaType> =
      loginSchema.safeParse(existingUser);

    if (result.success) {
      await signIn(formData);
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
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>SIGN IN</DialogTitle>
        </DialogHeader>
        <form action={handleSignIn}>
          <SignInForm />
        </form>
      </DialogContent>
    </Dialog>
  );
}
