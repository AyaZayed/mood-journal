import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/src//utils/db";

export const getUserByClerkId = async () => {
   const { userId } = await auth();
   if (!userId) throw new Error("No user ID found");
   const user = await prisma.user.findUniqueOrThrow({
      where: {
         clerkId: userId,
      },
   });
   return user;
};
