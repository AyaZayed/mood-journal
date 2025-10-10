import { getUserByClerkId } from "@/src/utils/auth";
import { prisma } from "@/src/utils/db";
import { qa } from "@/src/utils/ai";
import { NextResponse } from "next/server";

export const POST = async (request) => {
   const { question } = await request.json();
   const user = getUserByClerkId();
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

   const answer = await qa(question, entries);

   return NextResponse.json({ data: answer });
};
