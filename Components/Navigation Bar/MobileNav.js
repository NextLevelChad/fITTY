import MobileLink from "./MobileLink";

export default function MobileNav({ open, setOpen, session }) {
  return (
    <>
      <div
        className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {/* hamburger button */}
        <span
          className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
            open ? "rotate-45 translate-y-3.5" : ""
          }`}
        />
        <span
          className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${
            open ? "w-0" : "w-full"
          }`}
        />
        <span
          className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
            open ? "-rotate-45 -translate-y-3.5" : ""
          }`}
        />
      </div>
      <div
        className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${
          open ? "-translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
      >
        <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
          <a className="text-xl font-semibold" href="/">
            fITTY
          </a>
        </div>
        <div className="z-40 flex flex-col ml-4">
          <MobileLink
            href="/home"
            setOpen={setOpen}
            open={open}
            linkText="HOME"
          />
          {session ? (
            <>
              <MobileLink
                href="/logworkout"
                setOpen={setOpen}
                open={open}
                linkText="LOG WORKOUT"
              />
              <MobileLink
                href="/dashboard"
                setOpen={setOpen}
                open={open}
                linkText="DASHBOARD"
              />

              <MobileLink
                href="/profile"
                setOpen={setOpen}
                open={open}
                linkText="PROFILE"
              />
            </>
          ) : (
            <MobileLink
              href="/login"
              setOpen={setOpen}
              open={open}
              linkText="Login"
            />
          )}
        </div>
      </div>
    </>
  );
}
