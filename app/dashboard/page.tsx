import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Activities from '@/components/dashboard_charts/activities';
import { currentUser } from '@clerk/nextjs/server';
const Dashboard = async () => {
  const user = await currentUser();
  return (
    <MaxWidthWrapper>
    <div className="flex flex-col items-center lg:p-12 p-8">
      <h1 className="text-3xl font-bold">Hi {user?.firstName}👋</h1>
      <div className="bg-gradient-to-r from-transparent via-neutral-400 dark:via-neutral-700 to-transparent my-3 h-[1px] w-full" />
      <Activities/>
    </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;