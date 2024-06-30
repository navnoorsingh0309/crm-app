import read_activities from '@/appwrite/read_activities';
import { BarChart } from '@tremor/react';

export async function Activities(id:any) {
  const chartvalues = await read_activities.getActivities(id['id']);
  const chartdata = [
    {
      'Phone Calls': chartvalues[0],
      'Meetings': chartvalues[1],
      'Acceptances': chartvalues[2],
    }
  ]
  return (
    <div className="border border-black rounded-xl w-11/12 sm:w-[500px] min-w-[400px] h-[400px] p-4">
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Activities
      </h3>
      <BarChart
        className="mt-6"
        data={chartdata}
        index="name"
        categories={[
          'Phone Calls',
          'Meetings',
          'Acceptances',
        ]}
        colors={['blue', 'amber', 'teal']}
        showAnimation={true}
        />
    </div>
  );
}