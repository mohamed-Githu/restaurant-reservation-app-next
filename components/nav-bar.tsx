import Logo from "./logo";
import { Button } from "./ui/button";

export default function Navbar(): React.ReactNode {
  return (
    <nav className="shadow py-6">
      <div className="container flex justify-between items-center">
        <Logo />
        <div className="space-x-4">
          <Button>Sign In</Button>
          <Button variant="secondary">Register</Button>
        </div>
      </div>
    </nav>
  );
}