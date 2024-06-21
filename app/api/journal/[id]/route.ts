import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import { analyze } from "@/utils/ai";
import { revalidatePath } from "next/cache";

export const PATCH = async (request, { params }) => {
  const { content } = await request.json();
  const user = await getUserByClerkId();
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
  });

  const analysis = await analyze(`${updatedEntry.content}`);
  const updatedAnalysis = await prisma.analysis.update({
    where: {
      entryId: updatedEntry.id,
    },
    data: {
      ...analysis,
    },
  });

  revalidatePath(`/journal/${params.id}`);

  return NextResponse.json({
    data: { ...updatedEntry, analysis: updatedAnalysis },
  });
};
