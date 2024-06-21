"use client";

import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";

const NewEntryCard = () => {
  const router = useRouter();

  const handleClick = async () => {
    const data = await createNewEntry();
    console.log(data);
    router.push(`/journal/${data.id}`);
  };

  return (
    <div className="text-3xl cursor-pointer" onClick={handleClick}>
      +
    </div>
  );
};

export default NewEntryCard;
