import Link from "next/link";
import React from "react";
import DashboardMoreButton from "./DashboardMoreButton";
import TitleBadge from "./TitleBadge";

function DashboardCard({ children, titleText, themeColor }) {
  return (
    <div
      className={`shadow-dashboard-card m-4 py-10 px-2 relative justify-center flex flex-col rounded-lg border-2 border-${themeColor}-500 sm:min-h-80 max-w-xs bg-color-light-white-fill md:max-w-lg`}
    >
      <TitleBadge text={titleText} themeColor={themeColor} />
      <div>{children}</div>
      <DashboardMoreButton
        href="/dashboard/personalrecords"
        themeColor={themeColor}
      />
    </div>
  );
}

export default DashboardCard;
