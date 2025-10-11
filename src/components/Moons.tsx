import Image from "next/image";
import React from "react";
import { GlassCard } from "./GlassComponents";

export default function Moons() {
   return (
      <section className="my-10 p-10">
         <div className="moons flex flex-col items-center text-center gap-20">
            <h2 className="font-bold text-3xl tracking-wide">
               Your Moods Have Phases
            </h2>
            <div className="moods grid md:grid-cols-3 gap-20 content-between">
               <div className="phase flex flex-col items-center gap-3">
                  <Image
                     src="/quarter-right.svg"
                     alt="waning quarter moon"
                     width={120}
                     height={120}
                  />
                  <h3 className="text-amber-200 text-2xl font-semibold">
                     Gentle Rise
                  </h3>
               </div>
               <div className="phase flex flex-col items-center gap-3">
                  <Image
                     src="/most-left.svg"
                     alt="waxing quarter moon"
                     width={120}
                     height={120}
                  />
                  <h3 className="text-amber-200 text-2xl font-semibold">
                     Halfway There
                  </h3>
               </div>

               <div className="phase flex flex-col items-center gap-3">
                  <Image
                     src="/full.svg"
                     alt="full moon"
                     width={120}
                     height={120}
                  />
                  <h3 className="text-amber-200 text-2xl font-semibold">
                     Quiet Renewal
                  </h3>
               </div>
            </div>
         </div>
         <div className="services grid md:grid-cols-3 gap-10 mt-20">
            <GlassCard className="shadow-2xl p-6" variant="subtle">
               <Image
                  src="/journal.svg"
                  alt="journal"
                  width={100}
                  height={100}
               />
               <h4 className="font-bold  tracking-wide">Daily Journaling</h4>
               <p className="mt-2 opacity-70">
                  Write your thoughts, feelings, and experiences. Create a
                  personal space for reflection.
               </p>
            </GlassCard>
            <GlassCard className="shadow-2xl p-6" variant="subtle">
               <Image src="/bulb.svg" alt="bulb" width={100} height={100} />
               <h4 className="font-bold  tracking-wide">AI Mood Analysis</h4>
               <p className="mt-2 opacity-70">
                  Advanced AI analyzes your entries to identify emotional
                  patterns and insights.
               </p>
            </GlassCard>
            <GlassCard className="shadow-2xl p-6" variant="subtle">
               <Image
                  src="/progress.svg"
                  alt="progress"
                  width={100}
                  height={100}
               />
               <h4 className="font-bold  tracking-wide">Track Progress</h4>
               <p className="mt-2 opacity-70">
                  Visualize your emotional journey and understand yourself
                  better over time.
               </p>
            </GlassCard>
         </div>
      </section>
   );
}
