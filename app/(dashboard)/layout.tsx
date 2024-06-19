import { UserButton } from "@clerk/nextjs";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen w-screen relative ">
      <aside className="absolute top-0 left-0 h-full border-r border-black/10 w-[200px]"></aside>
      <article className="ml-[200px]">
        <header className="h-[50px] border-b border-black/10">
          <UserButton />
        </header>
        {children}
      </article>
    </main>
  );
};

export default DashboardLayout;
