import Logo from "./logo";
import RegisterModal from "./auth/register-modal";
import SignInModal from "./auth/sign-in-modal";

export default function Navbar(): React.ReactNode {
  return (
    <nav className="shadow py-6 z-50">
      <div className="container flex justify-between items-center">
        <Logo />
        <div className="space-x-4 flex">
          <SignInModal />
          <RegisterModal />
        </div>
      </div>
    </nav>
  );
}
