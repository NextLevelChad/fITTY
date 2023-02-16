import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

function LoginForm() {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(
      "Testing whether env variables are here ",
      process.env.NEXTAUTH_URL
    );
    signIn("google");
  };

  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <p>
          Click to go to your <a href="/profile">Profile</a>
        </p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={(e) => {
          handleLogin(e);
        }}
      >
        Sign in
      </button>
    </>
  );
}
export default LoginForm;
