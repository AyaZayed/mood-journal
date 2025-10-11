import EntryCard from "@/src/components/EntryCard";
import NewEntryCard from "@/src/components/NewEntryCard";
import Question from "@/src/components/Question";
import { getUserByClerkId } from "@/src/utils/auth";
import { prisma } from "@/src/utils/db";
import Link from "next/link";

const getEntries = async () => {
   const user = await getUserByClerkId();
   const entries = await prisma.journalEntry.findMany({
      where: {
         userId: user.id,
      },
      orderBy: {
         createdAt: "desc",
      },
      include: {
         analysis: true,
      },
   });

   return entries;
};

const JournalPage = async () => {
   const entries = await getEntries();

   return (
      <div className="p-10 grid grid-cols-1 md:grid-cols-5 gap-6">
         <div className="actions-col md:col-span-3">
            <Question />
            <NewEntryCard />
         </div>
         <div className="entries-col md:col-span-2">
            {entries.map((entry) => (
               <Link href={`/journal/${entry.id}`} key={entry.id}>
                  <EntryCard entry={entry} />
               </Link>
            ))}
         </div>
      </div>
   );
};

export default JournalPage;
