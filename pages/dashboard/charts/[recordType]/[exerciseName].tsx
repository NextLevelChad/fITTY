import React from "react";
import { useRouter } from "next/router";
import Chart from "../../../../Components/Chart Page/Chart";

function ChartPage() {
  const router = useRouter();
  const recordType = router.query.recordType as string;
  const exerciseName = router.query.exerciseName as string;

  return (
    <>
      <Chart type={recordType} name={exerciseName} />
    </>
  );
}

export default ChartPage;
