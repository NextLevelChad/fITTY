import React from "react";
import DashboardPersonalRecords from "../../Components/Dashboard Page/DashboardPersonalRecords";
import Stats from "../../Components/Dashboard Page/Stats";

function dashboard() {
  return (
    <div className="container flex justify-center flex-wrap gap-4">
      <Stats />
      <DashboardPersonalRecords />
    </div>
  );
}

export default dashboard;
