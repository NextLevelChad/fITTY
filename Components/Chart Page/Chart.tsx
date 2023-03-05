import React from "react";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

function Chart({ type, name }) {
  const { data: session } = useSession();
  const email = session?.user.email;

  const { isLoading, isError, data } =
    trpc.dashboard.getPersonalRecordsByExerciseName.useQuery({
      userEmail: email,
      exerciseName: name,
    });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  if (isLoading) {
    return (
      <div className="">
        <span className="text-center">
          "Your last Chart for {name} Personal Records is loading..."
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="shadow-dashboard-card m-4 py-10 px-2 relative justify-center flex flex-col rounded-lg border-2 border-orange-accent sm:min-h-80 max-w-xs bg-color-light-white-fill md:max-w-lg ">
        <span className="text-center">
          There was an error retrieving your Personal Records. We are truly
          sorry. Please refresh the page and try again, or try again later.
        </span>
      </div>
    );
  }

  if (data) {
    let chartTitleText;

    switch (type) {
      case "personalRecord":
        chartTitleText = `${name} Personal Record Chart`;
        break;
      case "timeRecord":
        chartTitleText = `${name} Time Records Chart`;
        break;
      case "exerciseRecord":
        chartTitleText = `${name} Recent Exercise Record Chart`;
        break;
      default:
        chartTitleText = `${name} Chart`;
    }

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: chartTitleText || "Chart",
        },
      },
    };

    const labels = data.map((record) => {
      return record.datePerformed.toDateString();
    });

    const chartData = {
      labels,
      datasets: [
        {
          label: data[0] ? data[0].exerciseName : "Chart Label",
          data: data?.map((record) => {
            return record.weight;
          }),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };

    return <Line options={options} data={chartData} />;
  }
}

export default Chart;
