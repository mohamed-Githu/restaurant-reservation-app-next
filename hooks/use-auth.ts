import {
  createUserAction,
  signInAction,
  signOutAction,
  verifyTokenAction,
} from "@/actions/user-actions";
import { LoginSchemaType, RegisterSchemaType } from "@/components/auth/types";

const useAuth = () => {
  const signIn = async (user: LoginSchemaType) => {
    const response = await signInAction(user);
    return response;
  }

  const signOut = async () => {
    const response = await signOutAction();
    return response;
  }

  const register = async (user: RegisterSchemaType) => {
    const response = await createUserAction(user);
    return response;
  }

  const verifyToken = async (token: string | undefined) => {
    const response = await verifyTokenAction(token);
    return response;
  }

  return {
    register,
    signIn,
    signOut,
    verifyToken,
  };
};

export default useAuth
