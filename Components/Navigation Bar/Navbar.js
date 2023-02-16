import { useState } from "react";
import { useSession } from "next-auth/react";
import MobileNav from "./MobileNav";

function NavLink({ to, children }) {
  return (
    <a href={to} className={`mx-4`}>
      {children}
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="flex filter drop-shadow-sm bg-white px-4 py-4 h-20 items-center mb-4">
      <div className="w-3/12 flex items-center">
        <a className="text-2xl font-semibold" href="/">
          fITTY
        </a>
      </div>
      <div className="w-9/12 flex justify-end items-center">
        <MobileNav open={open} setOpen={setOpen} session={session} />
        <div className="hidden md:flex">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/about">ABOUT</NavLink>
          {session ? (
            <>
              <NavLink to="/dashboard">DASHBOARD</NavLink>
              <NavLink to="/profile">PROFILE </NavLink>
            </>
          ) : (
            <NavLink to="/login">LOGIN</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
