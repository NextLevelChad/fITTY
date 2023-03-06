import Link from "next/link";
import React from "react";

function DashboardMoreButton({ href, themeColor }) {
  return (
    <Link href={href}>
      <div
        className={`flex justify-center text-center items-center mt-4 bg-color-light-white-fill border-2 rounded-sm border-${themeColor}-500 p-4`}
      >
        More...
      </div>
    </Link>
  );
}

export default DashboardMoreButton;
