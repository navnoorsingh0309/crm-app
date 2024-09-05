import read_accdenprog from "@/appwrite/read_accdenprog";
import { cn } from "@/lib/utils";
import { DonutChart, List, ListItem } from "@tremor/react";

export async function AccDenProg(id: any) {
  const chartvalues = await read_accdenprog.getAccDenProg(id["id"]);
  const chartdata = [
    {
      name: "Acceptances",
      value: chartvalues[0],
      color: "bg-green-500",
    },
    {
      name: "Denials",
      value: chartvalues[1],
      color: "bg-red-500",
    },
    {
      name: "on Progress",
      value: chartvalues[2],
      color: "bg-blue-500",
    },
  ];
  return (
    <div className="border border-black rounded-xl w-full sm:w-[500px] h-[400px] p-4">
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Leads Marketing
      </h3>
      <DonutChart
        className="mt-8"
        data={chartdata}
        category="value"
        index="name"
        showTooltip={false}
        colors={["green", "red", "blue"]}
        showAnimation={true}
      />
      <p className="mt-4 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
        <span>Category</span>
        <span>Number</span>
      </p>
      <List className="mt-1">
        {chartdata.map((item) => (
          <ListItem key={item.name} className="space-x-6">
            <div className="flex items-center space-x-2.5 truncate">
              <span
                className={cn(item.color, "h-2.5 w-2.5 shrink-0 rounded-sm")}
                aria-hidden={true}
              />
              <span className="truncate dark:text-dark-tremor-content-emphasis">
                {item.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {item.value}
              </span>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
