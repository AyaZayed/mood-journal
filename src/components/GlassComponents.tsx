import React from "react";

// Glass Button Component
interface GlassButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: "default" | "subtle" | "strong";
   children: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
   variant = "default",
   className = "",
   children,
   ...props
}) => {
   const variants = {
      default: "bg-white/10 border-white/20 hover:bg-white/20",
      subtle: "bg-white/5 border-white/10 hover:bg-white/15",
      strong: "bg-white/20 border-white/30 hover:bg-white/30",
   };

   return (
      <button
         className={`
        inline-flex items-center justify-center gap-2 
        whitespace-nowrap rounded-md text-sm font-medium 
        transition-all duration-200
        disabled:pointer-events-none disabled:opacity-50 
        outline-none focus-visible:ring-2 focus-visible:ring-white/50
        border backdrop-blur-md
        h-9 px-4 py-2
        text-white
        ${variants[variant]}
        ${className}
      `}
         {...props}>
         {children}
      </button>
   );
};

// Glass Card Component
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
   variant?: "default" | "subtle" | "strong";
   children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
   variant = "default",
   className = "",
   children,
   ...props
}) => {
   const variants = {
      default: "bg-white/10 border-white/20",
      subtle: "bg-white/5 border-white/10",
      strong: "bg-white/20 border-white/30",
   };

   return (
      <div
         className={`
        rounded-lg border backdrop-blur-md
        transition-all duration-200
        ${variants[variant]}
        ${className}
      `}
         {...props}>
         {children}
      </div>
   );
};

// Glass Input Component
interface GlassInputProps
   extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
   variant?: "default" | "subtle" | "strong";
}

export const GlassInput: React.FC<GlassInputProps> = ({
   variant = "default",
   className = "",
   ...props
}) => {
   const variants = {
      default: "bg-white/10 border-white/20 focus:bg-white/15",
      subtle: "bg-white/5 border-white/10 focus:bg-white/10",
      strong: "bg-white/20 border-white/30 focus:bg-white/25",
   };

   return (
      <textarea
         className={`
        w-full rounded-md border backdrop-blur-md
        px-3 py-2 text-sm
        text-white placeholder:text-white/50
        transition-all duration-200
        outline-none focus:ring-2 focus:ring-white/50
        disabled:pointer-events-none disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
         {...props}></textarea>
   );
};

// Glass Container Component (for larger sections)
interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
   variant?: "default" | "subtle" | "strong";
   children: React.ReactNode;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
   variant = "default",
   className = "",
   children,
   ...props
}) => {
   const variants = {
      default: "bg-white/10 border-white/20",
      subtle: "bg-white/5 border-white/10",
      strong: "bg-white/20 border-white/30",
   };

   return (
      <div
         className={`
        rounded-xl border backdrop-blur-lg
        shadow-lg
        ${variants[variant]}
        ${className}
      `}
         {...props}>
         {children}
      </div>
   );
};
