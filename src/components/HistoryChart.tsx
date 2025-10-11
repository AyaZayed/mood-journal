"use client";

import { Analysis } from "@prisma/client";
import { ResponsiveContainer, XAxis, LineChart, Line, Tooltip } from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
   if (!active || !payload || !payload.length) {
      return null;
   }

   const dateLabel = new Date(label).toLocaleString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
   });

   const analysis = payload[0].payload;

   return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
         <div
            className="absolute left-2 top-2 w-2 h-2 rounded-full"
            style={{ background: analysis.color }}
         />
         <p className="label text-sm text-black/30">{dateLabel}</p>
         <p className="intro text-xl uppercase">{analysis.mood}</p>
      </div>
   );
};

const HistoryChart = ({ data }: { data: Analysis[] }) => {
   console.log("Chart data:", data);

   // ✅ Check if data exists and has items
   if (!data || data.length === 0) {
      return (
         <div className="w-full h-full flex items-center justify-center text-gray-500">
            No data to display
         </div>
      );
   }

   // ✅ Transform data to ensure dates are formatted correctly
   const chartData = data.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt).getTime(), // Convert to timestamp for better X-axis handling
   }));

   return (
      <ResponsiveContainer width="100%" height="100%">
         <LineChart data={chartData}>
            <Line
               type="monotone"
               dataKey="sentimentScore"
               stroke="#8884d8"
               strokeWidth={2}
               activeDot={{ r: 8 }}
            />
            <XAxis
               dataKey="createdAt"
               tickFormatter={(timestamp) => {
                  const date = new Date(timestamp);
                  return date.toLocaleDateString("en-us", {
                     month: "short",
                     day: "numeric",
                  });
               }}
            />
            <Tooltip content={<CustomTooltip />} />
         </LineChart>
      </ResponsiveContainer>
   );
};

export default HistoryChart;
