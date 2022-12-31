import React from "react";
import { useSession, signOut } from "next-auth/react";

function profile() {
  const { data: session } = useSession();

  if (!session) {
  }
  return <div>profile</div>;
}

export default profile;
