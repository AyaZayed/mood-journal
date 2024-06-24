import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const links = [
  { name: "Journal", href: "/journal" },
  {
    name: "Home",
    href: "/",
  },
  { name: "History", href: "/history" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen w-screen relative ">
      <aside className="absolute top-0 left-0 h-full border-r border-black/10 w-[200px]">
        <h1>MOOD</h1>
        <ul>
          {links.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <article className="ml-[200px]">
        <header className="h-[50px] border-b border-black/10 flex justify-between">
          <UserButton />
        </header>
        {children}
      </article>
    </main>
  );
};

export default DashboardLayout;
