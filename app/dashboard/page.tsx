import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { AccDenProg } from "@/components/dashboard_charts/accdenprog";
import { Activities } from "@/components/dashboard_charts/activities";
import { currentUser } from "@clerk/nextjs/server";

const Dashboard = async () => {
  const user = await currentUser();
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center lg:p-12 p-8">
        <h1 className="text-3xl font-bold">Hi {user?.firstName}👋</h1>
        <div className="bg-gradient-to-r from-transparent via-neutral-400 dark:via-neutral-700 to-transparent my-3 h-[1px] w-full" />
        <div className="grid md:auto-rows-[26rem] grid-cols-1 bento-lg:grid-cols-2 gap-4 max-w-7xl mx-auto ">
          <div className="row-span-1 rounded-xl shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4">
            <Activities id={user?.id} />
          </div>
          <div className="row-span-1 rounded-xl shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4">
            <AccDenProg id={user?.id} />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
