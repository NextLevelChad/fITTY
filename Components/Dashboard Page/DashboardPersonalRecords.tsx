import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
//trpc imports
import { trpc } from "../../utils/trpc";

const DashboardPersonalRecords = () => {
  const { data: session } = useSession();
  const email = session?.user.email;

  const personalRecords = trpc.dashboard.getAllPersonalRecords.useQuery({
    userEmail: email,
  });

  console.log("These are the returned Personal Records", personalRecords);

  return <div>Dashboard Component</div>;
};

export default DashboardPersonalRecords;
