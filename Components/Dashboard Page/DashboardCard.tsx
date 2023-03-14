import Link from "next/link";
import React from "react";
import DashboardMoreButton from "./Dashboard Card Components/DashboardMoreButton";
import TitleBadge from "./Dashboard Card Components/TitleBadge";
import { textColor, bgColor, borderColor } from "../../lib/themeColor";

function DashboardCard({ children, titleText, themeColor, more }) {
  return (
    <div
      className={`shadow-dashboard-card m-4 py-10 px-2 relative justify-center flex flex-col rounded-lg border-2 ${borderColor[themeColor]} sm:min-h-80 max-w-xs bg-color-light-white-fill md:max-w-lg`}
    >
      <TitleBadge text={titleText} themeColor={themeColor} />
      <div>{children}</div>
      {more && (
        <DashboardMoreButton
          href="/dashboard/personalrecords"
          themeColor={themeColor}
        />
      )}
    </div>
  );
}

export default DashboardCard;
