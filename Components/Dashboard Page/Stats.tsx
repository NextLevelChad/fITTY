import React from "react";
import DashboardCard from "./DashboardCard";
import StatCard from "./Stats Card Components/StatCard";

function Stats() {
  return (
    <DashboardCard titleText="Stats" themeColor="redOrange" more={false}>
      <div className="grid grid-cols-2 md:gap-2">
        <StatCard
          text="260lbs"
          stat="weight"
          themeColor="redOrange"
          symbol="/assets/svgs/weightScale.svg"
        />
        <StatCard
          text="260lbs"
          stat="weight"
          themeColor="redOrange"
          symbol="/assets/svgs/weightScale.svg"
        />
        <StatCard
          text="260lbs"
          stat="weight"
          themeColor="redOrange"
          symbol="/assets/svgs/weightScale.svg"
        />
        <StatCard
          text="260lbs"
          stat="weight"
          themeColor="redOrange"
          symbol="/assets/svgs/weightScale.svg"
        />
      </div>
    </DashboardCard>
  );
}

export default Stats;
