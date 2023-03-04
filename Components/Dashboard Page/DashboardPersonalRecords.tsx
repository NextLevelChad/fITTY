import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

//trpc imports
import { trpc } from "../../utils/trpc";

//parts
import TitleBadge from "./TitleBadge";
import ExerciseRecordCard from "./ExerciseRecordCard";

const DashboardPersonalRecords = () => {
  const { data: session } = useSession();
  const email = session?.user.email;

  const { isLoading, isError, data } =
    trpc.dashboard.getAllPersonalRecords.useQuery({
      userEmail: email,
    });

  if (isLoading) {
    return (
      <div className="shadow-dashboard-card m-4 py-10 px-2 relative justify-center flex flex-col rounded-lg border-2 border-orange-accent sm:min-h-80 max-w-xs bg-color-light-white-fill md:max-w-lg ">
        <TitleBadge text="PERSONAL RECORDS..." />
        <span className="text-center">
          Your last 5 Personal Records are loading...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="shadow-dashboard-card m-4 py-10 px-2 relative justify-center flex flex-col rounded-lg border-2 border-orange-accent sm:min-h-80 max-w-xs bg-color-light-white-fill md:max-w-lg ">
        <TitleBadge text="PERSONAL RECORDS..." />
        <span className="text-center">
          There was an error retrieving your personal records
        </span>
      </div>
    );
  }

  if (data) {
    const slicedData = data.slice(-5);
    slicedData.sort(
      (a, b) =>
        new Date(b.datePerformed).valueOf() -
        new Date(a.datePerformed).valueOf()
    );
    return (
      <div className="shadow-dashboard-card m-4 py-10 px-2 relative justify-center flex flex-col rounded-lg border-2 border-orange-accent sm:min-h-80 max-w-xs bg-color-light-white-fill md:max-w-lg ">
        <TitleBadge text="PERSONAL RECORDS..." />
        <span className="text-center">Your last 5 Personal Records</span>
        {data.length > 0 ? (
          slicedData?.map((record) => {
            return (
              <ExerciseRecordCard
                key={record.id}
                exerciseName={record.exerciseName}
                type="strength"
                weight={record.weight}
                logType="personalRecord"
              />
            );
          })
        ) : (
          <div>You do not currently have any stored personal records</div>
        )}
        <Link href="/dashboard/personalrecords">
          <div className="flex justify-center text-center items-center mt-4 bg-color-light-white-fill border-2 rounded-sm border-orange-accent p-4">
            More...
          </div>
        </Link>
      </div>
    );
  }
};

export default DashboardPersonalRecords;
