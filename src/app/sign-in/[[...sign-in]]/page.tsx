import { GlassCard } from "@/src//components/GlassComponents";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
   return (
      <div className="flex items-center justify-center">
         <GlassCard variant="default" className="shadow-2xl">
            <SignIn
               appearance={{
                  elements: {
                     card: "bg-transparent shadow-none",
                     socialButtonsButtonIcon: "text-white",
                     socialButtonsButtonText: "text-white",
                     formButtonPrimary:
                        "bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border border-white/30",
                     formFieldInput:
                        "bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-md",
                     headerTitle: "text-white text-xl font-semibold",
                     headerSubtitle: "text-white/70",
                     footer: "mt-6 text-center bg-transparent",
                     footerAction: "text-white/70 text-sm",
                     footerActionLink:
                        "text-blue-300 hover:text-blue-200 font-medium transition-colors",
                  },
                  variables: {
                     colorBackground: "transparent",
                     colorText: "#fff",
                     colorPrimary: "rgba(255,255,255,0.6)",
                  },
               }}
            />
         </GlassCard>
      </div>
   );
}
