import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/dist/types/server";
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
  });
  return entries;
};

const JournalPage = async () => {
  const entries = await getEntries();
  return (
    <div>
      <NewEntryCard />
      {entries.map((entry) => (
        <Link href={`/journal/${entry.id}`} key={entry.id}>
          <EntryCard entry={entry} />
        </Link>
      ))}
    </div>
  );
};

export default JournalPage;
