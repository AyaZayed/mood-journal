import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Question from "@/components/Question";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
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
      <Question />
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
