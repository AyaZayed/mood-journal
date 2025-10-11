import { analyze } from "@/src/utils/ai";
import { getUserByClerkId } from "@/src/utils/auth";
import { prisma } from "@/src/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const PATCH = async (
   request: Request,
   { params }: { params: { id: string } }
) => {
   const { content } = await request.json();
   const user = await getUserByClerkId();

   // Update the journal entry
   const updatedEntry = await prisma.journalEntry.update({
      where: {
         userId_id: {
            userId: user.id,
            id: params.id,
         },
      },
      data: {
         content,
      },
      include: { analysis: true },
   });

   // ✅ Only analyze if content has meaningful text (more than 10 characters)
   if (content && content.trim().length > 10) {
      const analysis = await analyze(content);

      // Update or create analysis
      await prisma.analysis.upsert({
         where: {
            entryId: params.id,
         },
         update: analysis,
         create: {
            userId: user.id,
            entryId: params.id,
            ...analysis,
         },
      });
   } else {
      // If content is too short, keep or create default analysis
      await prisma.analysis.upsert({
         where: {
            entryId: params.id,
         },
         update: {
            mood: "neutral",
            subject: "Entry in progress",
            negative: false,
            summary: "Keep writing to analyze your mood...",
            color: "#cccccc",
            sentimentScore: 0,
         },
         create: {
            userId: user.id,
            entryId: params.id,
            mood: "neutral",
            subject: "Entry in progress",
            negative: false,
            summary: "Keep writing to analyze your mood...",
            color: "#cccccc",
            sentimentScore: 0,
         },
      });
   }

   revalidatePath("/journal");
   return NextResponse.json({ data: updatedEntry });
};
