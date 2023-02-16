import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

function profile() {
  const { data: session } = useSession();

  console.log(session ? session.user.name : "NO Session yet");

  if (!session) {
    return (
      <div className="flex justify-center flex-col items-center h-screen container">
        <h1>Loading...</h1>
      </div>
    );
  }
  // What else do I want here?
  // Stats? Or other identity data like height, weight, etc?

  return (
    <div className="flex justify-center flex-col items-center container flex-grow gap-4">
      <div>
        <h1>Welcome {session.user.name.toLocaleUpperCase()}</h1>
      </div>
      <div>
        <button className="btn-primary" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default profile;
