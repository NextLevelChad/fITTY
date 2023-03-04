import React from "react";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";

function Chart({ type, name }) {
  const { data: session } = useSession();
  const email = session?.user.email;

  const { isLoading, isError, data } =
    trpc.dashboard.getPersonalRecordsByExerciseName.useQuery({
      userEmail: email,
      exerciseName: name,
    });

  if (isLoading) {
    return (
      <div className="shadow-dashboard-card m-4 py-10 px-2 relative justify-center flex flex-col rounded-lg border-2 border-orange-accent sm:min-h-80 max-w-xs bg-color-light-white-fill md:max-w-lg ">
        <span className="text-center">
          `Your last Chart for ${name} Personal Records is loading...`
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
    return <div>Chart</div>;
  }
}

export default Chart;
