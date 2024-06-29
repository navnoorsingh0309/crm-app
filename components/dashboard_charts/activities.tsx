import read_activities from '@/appwrite/read_activities';
import { BarChart } from '@tremor/react';

const chartdata = [
  {
    name: 'Topic 1',
    'Group A': 890,
    'Group B': 338,
    'Group C': 538,
    'Group D': 396,
    'Group E': 138,
    'Group F': 436,
  },
  {
    name: 'Topic 2',
    'Group A': 289,
    'Group B': 233,
    'Group C': 253,
    'Group D': 333,
    'Group E': 133,
    'Group F': 533,
  },
  {
    name: 'Topic 3',
    'Group A': 380,
    'Group B': 535,
    'Group C': 352,
    'Group D': 718,
    'Group E': 539,
    'Group F': 234,
  },
  {
    name: 'Topic 4',
    'Group A': 90,
    'Group B': 98,
    'Group C': 28,
    'Group D': 33,
    'Group E': 61,
    'Group F': 53,
  },
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

export async function Activities(id:any) {
  const chartvalues = await read_activities.getphones(id['id']);
  const chartdata = [
    {
      'Phone Calls': chartvalues[0],
      'Meetings': chartvalues[1],
      'Acceptances': chartvalues[2],
    }
  ]
  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Activities
      </h3>
      <BarChart
        className="mt-6 border border-black rounded-xl w-11/12 sm:w-[500px] min-w-[400px]"
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
    </>
  );
}