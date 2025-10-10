import Link from "next/link";
import Hero from "../components/Hero";
import Moons from "../components/Moons";
import Image from "next/image";
import { GlassButton } from "../components/GlassComponents";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
   const { userId } = await auth();
   let href = userId ? "/journal" : "/new-user";

   return (
      <>
         <header className="header flex justify-between items-center p-5 mb-3">
            <Link href={"/"}>
               <Image src="/logo.svg" alt="logo" width={150} height={100} />
            </Link>
            <Link href={href}>
               <GlassButton>Get Started</GlassButton>
            </Link>
         </header>
         <main className="home">
            <Hero />
            <Moons />
         </main>
      </>
   );
}
