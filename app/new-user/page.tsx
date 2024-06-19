import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const createNewUser = async () => {
  const user = await currentUser();
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        email: user?.emailAddresses[0].emailAddress,
        clerkId: user?.id,
      },
    });
  }

  redirect("/journal");
};

const newUser = async () => {
  await createNewUser();
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
};

export default newUser;
