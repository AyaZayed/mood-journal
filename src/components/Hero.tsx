import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "@clerk/nextjs/server";

export default async function Hero() {
   const { userId } = await auth();
   let href = userId ? "/journal" : "/new-user";
   return (
      <section className="hero flex items-center justify-center">
         <div className="hero md:w-2/3 px-6 content flex flex-col justify-center items-center text-center gap-10">
            <Image src="/logo.svg" alt="logo" width={400} height={400} />
            <h1 className="text-5xl font-bold text-amber-200">
               Track Your Inner Universe
            </h1>
            <p>
               Journal your thoughts and emotions. Let AI understand your moods
               and patterns over time, illuminating your emotional landscape
               like phases of the moon.
            </p>
            <Link href={href}>
               <button className="bg-white text-secondary px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
                  Get Started
               </button>
            </Link>
         </div>
      </section>
   );
}
