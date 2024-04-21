"use client";

import { createUserAction } from "@/actions/user-actions";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import RegisterForm from "./register-form";
import { useToast } from "../ui/use-toast";
import { ZodError } from "zod";
import { registerSchema } from "./zod-schemas";
import { formatZodError } from "./utils";
import { ResponseType } from "./types";
import { useContext, useRef } from "react";
import { AuthContext } from "@/app/context/auth-context";

export default function RegisterModal() {
  const { toast } = useToast();
  const { setUser } = useContext(AuthContext);
  const formRef = useRef<HTMLFormElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleRegister = async (formData: FormData) => {
    const newUser = {
      email: formData.get("email"),
      password: formData.get("password"),
      phone: formData.get("phone"),
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      city: formData.get("city"),
    };

    try {
      const result = registerSchema.parse(newUser);
      const res: ResponseType | any = await createUserAction(result);

      // If user creation failed, show error message
      if (!res?.success) {
        toast({
          variant: "destructive",
          title: "Sign In Failed",
          description: res?.error,
        });
        return;
      }

      // If user creation is successful, show success message
      triggerRef.current?.click();
      formRef.current?.reset();
      if (res?.success && res?.user) {
        setUser(res.user);
      }
      toast({
        variant: "success",
        title: "Your Account is Created!",
        description: "You have successfully registered",
      });
    } catch (error: ZodError | unknown) {
      if (error instanceof ZodError) {
        const errorMessage = formatZodError(error);
        toast({
          variant: "destructive",
          title: "Sign In Failed",
          description: errorMessage,
        });
        return;
      }
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: "An unknown error occurred",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" ref={triggerRef}>
          Register
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>REGISTER</DialogTitle>
        </DialogHeader>
        <form id="register-form" action={handleRegister} ref={formRef}>
          <RegisterForm />
        </form>
      </DialogContent>
    </Dialog>
  );
}
