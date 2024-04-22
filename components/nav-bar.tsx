import Logo from "./logo";
import { cookies } from "next/headers";
import NavbarActions from "./nav-bar-actions";
import useAuth from "@/hooks/use-auth";

export default async function Navbar() {
  const token = cookies().get("jwt")?.value;
  const { verifyToken } = useAuth();
  const res: any = await verifyToken(token);

  return (
    <nav className="shadow py-6 z-50">
      <div className="container flex justify-between items-center">
        <Logo />
        <NavbarActions user={res?.user} success={res?.success} />
      </div>
    </nav>
  );
}
