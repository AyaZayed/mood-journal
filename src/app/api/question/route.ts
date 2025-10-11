import { getUserByClerkId } from "@/src/utils/auth";
import { prisma } from "@/src/utils/db";
import { qa } from "@/src/utils/ai";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
   const { question } = await request.json();
   const user = await getUserByClerkId();
   if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }
   const entries = await prisma.journalEntry.findMany({
      where: {
         userId: user.id,
      },
      select: {
         id: true,
         content: true,
         createdAt: true,
      },
   });

   if (entries.length === 0) {
      return NextResponse.json(
         { data: "No journal entries found to answer the question." },
         { status: 200 }
      );
   }

   const answer = await qa(question, entries);

   return NextResponse.json({ data: answer });
};
