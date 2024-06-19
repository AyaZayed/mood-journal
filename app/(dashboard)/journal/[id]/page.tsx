import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
  });
  return entry;
};

const analysisData = [
  { name: "Subject", value: "Day" },
  { name: "Summary", value: "Bad" },
  { name: "Mood", value: "Terrible" },
  { name: "Nagative", value: "true" },
];

const EntryPage = async ({ params }) => {
  return (
    <section className="w-full h-[calc(100vh-60px)] grid grid-cols-3">
      <Editor entry={await getEntry(params.id)} />
      <div title="sidebar" className="border-l border-black/10 p-6">
        <h2 className="text-3xl text-blue-400">Analysis</h2>
        <ul>
          {analysisData.map(({ name, value }) => (
            <li key={name} className="">
              {name}: {value}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default EntryPage;
