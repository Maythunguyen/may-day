"use client";
import React, { useEffect, useState } from "react";
import { AiAnalyseBulk } from "@/app/api/AIAnalyseAPI";

export default function AiInsights({ journalEntries }) {
  const [bulkResult, setBulkResult] = useState(null);

  useEffect(() => {
    const doBulkAnalysis = async () => {
      try {
        const data = await AiAnalyseBulk(journalEntries);
        setBulkResult(data.bulk_result);
      } catch (err) {
        console.error("Bulk analysis error:", err);
      }
    };

    // Only call if we have some entries
    if (journalEntries && journalEntries.length > 3) {
      doBulkAnalysis();
    }
  }, [journalEntries]);

  return (
    <div className="p-4 flex flex-col gap-5">
        <div>
            <h1 className="text-2xl font-bold mb-2">AI Insights (Aggregated)</h1>
        </div>
        <div>
        {bulkResult ? (
    
            <p>{bulkResult}</p>
        ) : (
            <p>No aggregated insights yet.</p>
        )}
        </div>
    </div>
  );
}

