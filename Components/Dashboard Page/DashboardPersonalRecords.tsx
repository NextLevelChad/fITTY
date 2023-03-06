import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

//trpc imports
import { trpc } from "../../utils/trpc";

//parts
import TitleBadge from "./TitleBadge";
import ExerciseRecordCard from "./ExerciseRecordCard";
import DashboardCard from "./DashboardCard";

const DashboardPersonalRecords = () => {
  const { data: session } = useSession();
  const email = session?.user.email;

  const { isLoading, isError, data } =
    trpc.dashboard.getAllPersonalRecords.useQuery({
      userEmail: email,
    });

  if (isLoading) {
    return (
      <DashboardCard titleText={"Personal Records"} themeColor={"aquamarine"}>
        <span className="text-center">
          Your last 5 Personal Records are loading...
        </span>
      </DashboardCard>
    );
  }

  if (isError) {
    return (
      <DashboardCard titleText={"Personal Records"} themeColor={"aquamarine"}>
        <span className="text-center">
          There was an error retrieving your personal records
        </span>
      </DashboardCard>
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
      <DashboardCard titleText={"Personal Records"} themeColor={"aquamarine"}>
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
      </DashboardCard>
    );
  }
};

export default DashboardPersonalRecords;
