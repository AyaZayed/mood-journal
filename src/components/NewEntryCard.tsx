"use client";

import { createNewEntry } from "@/src/utils/api";
import { useRouter } from "next/navigation";
import { GlassCard } from "./GlassComponents";
import Image from "next/image";

const NewEntryCard = () => {
   const router = useRouter();

   const handleClick = async () => {
      const data = await createNewEntry();
      router.push(`/journal/${data.id}`);
   };

   return (
      <GlassCard variant="default" className="p-6" onClick={handleClick}>
         <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold">New Entry</h2>
            <Image
               src="/full.svg"
               alt="plus"
               width={50}
               height={50}
               className="ml-auto"
            />
         </div>
         <button
            className="bg-white text-brand-blue rounded-md w-full p-2 hover:opacity-85"
            onClick={handleClick}>
            Start Writing
         </button>
      </GlassCard>
   );
};

export default NewEntryCard;
