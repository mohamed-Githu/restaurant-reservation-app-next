"use client";

import { createUser } from "@/actions/user-actions";
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
import { SafeParseReturnType } from "zod";
import { RegisterSchemaType } from "./types";
import { registerSchema } from "./zod-schemas";

export default function RegisterModal() {
  const { toast } = useToast();

  const handleRegister = async (formData: FormData) => {
    const newUser = {
      email: formData.get("email"),
      password: formData.get("password"),
      phone: formData.get("phone"),
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      city: formData.get("city"),
    };
    const result: SafeParseReturnType<RegisterSchemaType, RegisterSchemaType> =
      registerSchema.safeParse(newUser);

    if (result.success) {
      await createUser(formData);
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
        <Button variant="secondary">Register</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>REGISTER</DialogTitle>
        </DialogHeader>
        <form action={handleRegister}>
          <RegisterForm />
        </form>
      </DialogContent>
    </Dialog>
  );
}
