import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? "/journal" : "/new-user";

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center flex flex-col items-center gap-10">
        <h1 className="text-5xl">MOOD</h1>
        <p className="w-1/2 text-white/70">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
          quisquam aliquid, vero iure autem dolores quia delectus accusamus
          necessitatibus perferendis pariatur, esse, ipsa eligendi minus
          quaerat. Magni, exercitationem. Distinctio, a.
        </p>
        <Link href={href}>
          <button className="bg-white text-black p-2 hover:bg-black hover:text-white hover:border">
            Get Started
          </button>
        </Link>
      </div>
    </main>
  );
}
