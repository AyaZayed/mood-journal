import { GlassCard } from "./GlassComponents";
import { EntryWithAnalysis } from "../types/analysis";

const EntryCard = ({ entry }: { entry: any }) => {
   const date = new Date(entry.createdAt).toDateString();
   return (
      <>
         {entry && entry.content.length >= 0 && (
            <GlassCard variant="subtle" className="p-4 mb-4">
               <div className="flex gap-2">
                  <p className="text-sm mb-2">{date}</p>
                  <div
                     className={`text-[${entry.analysis.color} bg-[${entry.analysis.color}]/50`}>
                     {entry.analysis.mood}
                  </div>
               </div>
               <p className="break-words">
                  {entry.analysis.summary.length > 100
                     ? entry.analysis.summary.slice(0, 100) + "..."
                     : entry.analysis.summary}
               </p>
            </GlassCard>
         )}
      </>
   );
};

export default EntryCard;
