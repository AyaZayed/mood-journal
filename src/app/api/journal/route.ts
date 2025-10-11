import { getUserByClerkId } from "@/src/utils/auth";
import { prisma } from "@/src/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
   const user = await getUserByClerkId();

   // Create entry with empty content or a placeholder
   const entry = await prisma.journalEntry.create({
      data: {
         userId: user.id,
         content: "", // ✅ Empty content instead of placeholder
      },
   });

   // ✅ Create default analysis without calling AI
   await prisma.analysis.create({
      data: {
         userId: user.id,
         entryId: entry.id,
         mood: "neutral",
         subject: "New Entry",
         negative: false,
         summary: "Start writing to analyze your mood...",
         color: "#cccccc",
         sentimentScore: 0,
      },
   });

   revalidatePath("/journal");
   return NextResponse.json({ data: entry });
};
