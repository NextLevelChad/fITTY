import Link from "next/link";
import { borderColor } from "../../../lib/themeColor";

function DashboardMoreButton({ href, themeColor }) {
  return (
    <Link href={href}>
      <div
        className={`flex justify-center text-center items-center mt-4 bg-color-light-white-fill border-2 rounded-sm ${borderColor[themeColor]} p-4`}
      >
        More...
      </div>
    </Link>
  );
}

export default DashboardMoreButton;
