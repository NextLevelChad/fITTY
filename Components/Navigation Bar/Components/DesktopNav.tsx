import React from "react";
import Image from "next/image";

function NavLink({ to, children }) {
  return (
    <a href={to} className={`mx-4`}>
      {children}
    </a>
  );
}

function DesktopNav({ session }) {
  return (
    <>
      <div className="w-3/12 flex items-center">
        <a className="text-2xl font-semibold" href="/">
          fITTY
        </a>
      </div>
      <div className="w-9/12 flex justify-end items-center ">
        <div className="hidden md:flex">
          <NavLink to="/">HOME</NavLink>
          {session ? (
            <>
              <NavLink to="/logworkout">LOG WORKOUT</NavLink>
              <NavLink to="/dashboard">DASHBOARD</NavLink>
              <NavLink to="/profile">PROFILE </NavLink>
            </>
          ) : (
            <NavLink to="/login">LOGIN</NavLink>
          )}
        </div>
        {session && (
          <div className="hidden md:flex h-10 w-10">
            <Image
              src={session?.user.image}
              className="rounded-full"
              width="40"
              height="10"
              alt="Profile Picture for Currently Logged in User"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default DesktopNav;
