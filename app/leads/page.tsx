import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AddLeadsDailog from "@/components/add_leads_dailog";
import Leads_Table from "@/components/leads_table";
import { currentUser } from "@clerk/nextjs/server";

const Leads = async () => {
  const user = await currentUser();
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center lg:p-12 p-8">
        <div className="flex flex-nowrap items-center w-full">
          <AddLeadsDailog id={user?.id}/>
          <p className="flex-grow text-xl md:text-3xl font-bold text-center">
            Hi {user?.firstName}👋
          </p>
        </div>
        <div className="bg-gradient-to-r from-transparent via-neutral-400 dark:via-neutral-700 to-transparent my-3 h-[1px] w-full" />
        <Leads_Table id={user?.id} />
      </div>
    </MaxWidthWrapper>
  );
};

export default Leads;
