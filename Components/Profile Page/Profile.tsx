import { useSession, signIn, signOut } from "next-auth/react";

function Profile() {
  const { data: session } = useSession();

  // What else do I want here?
  // Stats? Or other identity data like height, weight, etc?

  return (
    <div className="flex justify-center flex-col items-center container flex-grow gap-4">
      <div className="">
        <img src={session?.user.image} className="h-40 w-40 rounded-full" />
      </div>
      <div>
        <h1>Welcome {session?.user.name.toLocaleUpperCase()}</h1>
      </div>
      <div>
        <button className="btn-primary" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
