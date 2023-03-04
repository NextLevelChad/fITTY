import { useState } from "react";
import { useSession } from "next-auth/react";
import MobileNav from "./Components/MobileNav";
import DesktopNav from "./Components/DesktopNav";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="flex filter drop-shadow-sm bg-white px-4 py-4 h-20 items-center mb-4 relative z-50">
      <DesktopNav session={session} />
      <MobileNav open={open} setOpen={setOpen} session={session} />
    </nav>
  );
}
