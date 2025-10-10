import { analyze } from "@/src/utils/ai";
import { getUserByClerkId } from "@/src/utils/auth";
import { prisma } from "@/src/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
   const user = await getUserByClerkId();
   const entry = await prisma.journalEntry.create({
      data: {
         userId: user.id,
         content: "Tell me about your day!",
      },
   });

   const analysis = await analyze(`${entry.content}`);
   await prisma.analysis.create({
      data: {
         userId: user.id,
         entryId: entry.id,
         ...analysis,
      },
   });

   revalidatePath("/journal");
   return NextResponse.json({ data: entry });
};
