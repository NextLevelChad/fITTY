import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
//trpc imports
import { trpc } from "../../utils/trpc";

//parts
import TitleBadge from "./TitleBadge";
import ExerciseRecordCard from "./ExerciseRecordCard";

const DashboardPersonalRecords = () => {
  const { data: session } = useSession();
  const email = session?.user.email;
  const [personalRecords, setPersonalRecords] = useState(null);

  useEffect(() => {
    setPersonalRecords(() => {
      trpc.dashboard.getAllPersonalRecords.useQuery({
        userEmail: email,
      });
    });
  }, []);

  console.log("These are the returned Personal Records", personalRecords);

  if (!personalRecords) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shadow-dashboard-card m-4 py-10 px-2 relative justify-center flex flex-col rounded-lg border-2 border-orange-accent sm:min-h-80 max-w-xs bg-color-light-white-fill md:max-w-lg ">
      <TitleBadge text="PERSONAL RECORDS..." />
      <span className="text-center">Your last 5 Personal Records</span>
      {personalRecords.data?.map((record) => {
        return (
          <ExerciseRecordCard
            exerciseName={record.exerciseName}
            type="strength"
            weight={record.weight}
          />
        );
      })}
    </div>
  );
};

export default DashboardPersonalRecords;
