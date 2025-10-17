import { GlassCard } from "./GlassComponents";
import { EntryWithAnalysis } from "../types/analysis";

const EntryCard = ({ entry }: { entry: any }) => {
   const date = new Date(entry.createdAt).toDateString();

   function bgColorOpacity(hex: string, opacity: number) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${opacity})`;
   }

   return (
      <>
         {entry && entry.content.length >= 0 && (
            <GlassCard variant="subtle" className="p-4 mb-4">
               <div className="flex gap-2 justify-between">
                  <p className="text-sm mb-2 text-amber-200">{date}</p>
                  <div
                     className="capitalize px-4 py-1 mb-2 rounded-2xl"
                     style={{
                        color: entry.analysis.color,
                        backgroundColor: bgColorOpacity(
                           entry.analysis.color,
                           0.2
                        ),
                     }}>
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
