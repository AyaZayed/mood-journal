import { GlassContainer } from "@/src/components/GlassComponents";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const links = [
   {
      name: "Journal",
      href: "/journal",
   },
   { name: "History", href: "/history" },
   {
      name: "Home",
      href: "/",
   },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <main className="">
         <header>
            <GlassContainer
               className="flex items-center gap-4 px-6 py-4 rounded-[0px] justify-between"
               variant="subtle">
               <Link href="/">
                  <Image
                     src="/logo.svg"
                     alt="logo"
                     width={100}
                     height={100}
                     className="w-[100px] md:w-[150px]"
                  />
               </Link>
               <nav className="flex gap-6 items-center">
                  <ul className="flex gap-4 items-center">
                     {links.map((link) => (
                        <li key={link.name}>
                           <Link
                              href={link.href}
                              className="transition-[border] duration-100 hover:border-b-2 border-white pb-2 border-">
                              {link.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
                  <UserButton
                     afterSignOutUrl="/"
                     appearance={{
                        elements: {
                           userButtonAvatarBox: "w-[38px] h-[38px]",
                        },
                     }}
                  />
               </nav>
            </GlassContainer>
         </header>
         <article className="w-full flex flex-col">{children}</article>
      </main>
   );
};

export default DashboardLayout;
