import HistoryChart from "@/src/components/HistoryChart";
import { getUserByClerkId } from "@/src/utils/auth";
import { prisma } from "@/src/utils/db";
import { log } from "console";

const getData = async () => {
   const user = await getUserByClerkId();
   const analyses = await prisma.analysis.findMany({
      where: {
         userId: user.id,
      },
      orderBy: {
         createdAt: "asc",
      },
   });
   const sum = analyses.reduce(
      (acc, analysis) => acc + analysis.sentimentScore,
      0
   );
   const averageAnalysis = sum / analyses.length;
   return { analyses, averageAnalysis };
};

const historyPage = async () => {
   const { analyses, averageAnalysis } = await getData();
   return (
      <div className="">
         <h1>History</h1>
         {analyses.length > 0 &&
            analyses.map((analysis) => (
               <div key={analysis.id}>{analysis.sentimentScore}</div>
            ))}
         <div>average: {averageAnalysis}</div>
         <div className="h-full w-full">
            {analyses.length > 0 && <HistoryChart data={analyses} />}
         </div>
      </div>
   );
};

export default historyPage;
