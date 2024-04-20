import Logo from "./logo";
import RegisterModal from "./register-modal";
import SignInModal from "./sign-in-modal";
import { Button } from "./ui/button";

export default function Navbar(): React.ReactNode {
  return (
    <nav className="shadow py-6 z-50">
      <div className="container flex justify-between items-center">
        <Logo />
        <div className="space-x-4">
          <SignInModal />
          <RegisterModal />
        </div>
      </div>
    </nav>
  );
}