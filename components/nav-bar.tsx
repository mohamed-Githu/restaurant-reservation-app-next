import Logo from "./logo";
import NavbarActions from "./nav-bar-actions";

export default async function Navbar() {
  return (
    <nav className="shadow py-6 z-50">
      <div className="container flex justify-between items-center">
        <Logo />
        <NavbarActions />
      </div>
    </nav>
  );
}
