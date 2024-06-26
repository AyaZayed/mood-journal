import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
    include: {
      analysis: true,
    },
  });
  return entry;
};

const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id);

  return (
    <section className="w-full h-[calc(100vh-60px)] grid grid-cols-3">
      <Editor entry={entry} />
    </section>
  );
};

export default EntryPage;
