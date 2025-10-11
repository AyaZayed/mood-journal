import { JournalEntry } from "@prisma/client";

export type AnalysisData = {
   mood: string;
   subject: string;
   negative: boolean;
   summary: string;
   color: string;
   sentimentScore: number;
};

export type Analysis = AnalysisData & {
   id: string;
   userId: string;
   entryId: string;
   createdAt: Date;
   updatedAt: Date;
};

export type EntryWithAnalysis = Analysis & JournalEntry;
