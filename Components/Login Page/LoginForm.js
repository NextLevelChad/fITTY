import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

function LoginForm() {
  const handleGoogleLogin = (e) => {
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
      <div className="flex flex-col items-center gap-4">
        <h1>Signed in as {session.user.name.toLocaleUpperCase()}</h1>
        <p>
          <a href="/profile">Click here to go to your Profile</a>
        </p>
        <button className="btn-primary" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <h1>You are not signed in currently, please select a provider:</h1>
      <button
        className="btn-primary"
        onClick={(e) => {
          handleGoogleLogin(e);
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
export default LoginForm;
