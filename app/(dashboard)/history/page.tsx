import HistoryChart from "@/components/HistoryChart";
import { getUserByClerkId } from "@/utils/auth";

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
    <div className="w-full h-full">
      <h1>History</h1>
      {analyses.map((analysis) => (
        <div key={analysis.id}>{analysis.sentimentScore}</div>
      ))}
      <div>average: {averageAnalysis}</div>
      <div className="w-full h-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  );
};

export default historyPage;
