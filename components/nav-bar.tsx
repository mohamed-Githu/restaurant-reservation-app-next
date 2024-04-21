import Logo from "./logo";
import { cookies } from "next/headers";
import { verifyToken } from "@/actions/user-actions";
import NavbarActions from "./nav-bar-actions";

export default async function Navbar(): Promise<React.ReactNode> {
  const token = cookies().get("jwt");
  const res = await verifyToken(token?.value);

  return (
    <nav className="shadow py-6 z-50">
      <div className="container flex justify-between items-center">
        <Logo />
        <NavbarActions user={res?.user} success={res?.success} />
      </div>
    </nav>
  );
}
