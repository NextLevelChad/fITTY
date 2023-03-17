import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import GoalsForm from "./Profile Page Components/GoalsForm";
import InfoForm from "./Profile Page Components/InfoForm";

interface goalsOrInfo {
  state: "goals" | "info";
}

function Profile() {
  const { data: session } = useSession();
  const [goalsOrInfo, setGoalsOrInfo] = useState("info");

  // What else do I want here?
  // Stats? Or other identity data like height, weight, etc?

  return (
    <div className="flex justify-center flex-col items-center container flex-grow gap-4">
      <div className="">
        <Image
          src={session?.user.image}
          className="h-64 w-64 rounded-full"
          height="40"
          width="40"
          alt="Profile Picture"
        />
      </div>
      <div className="flex justify-even items-center flex-wrap gap-4">
        <button className="btn-primary" onClick={() => setGoalsOrInfo("goals")}>
          Goals
        </button>
        <button className="btn-primary" onClick={() => setGoalsOrInfo("info")}>
          Info
        </button>
      </div>
      {goalsOrInfo === "info" && <InfoForm />}
      {goalsOrInfo === "goals" && <GoalsForm />}
      <div>
        <button className="btn-primary" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
