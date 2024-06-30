import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Leads_Table } from "@/components/leads";
import { currentUser } from "@clerk/nextjs/server";

const Leads = async () => {
  const user = await currentUser();
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center lg:p-12 p-8">
        <h1 className="text-3xl font-bold">Hi {user?.firstName}👋</h1>
        <div className="bg-gradient-to-r from-transparent via-neutral-400 dark:via-neutral-700 to-transparent my-3 h-[1px] w-full" />
        <Leads_Table id={user?.id}/>
      </div>
    </MaxWidthWrapper>
  );
};

export default Leads;
