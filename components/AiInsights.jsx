"use client";
import React, { useEffect, useState } from "react";
import { AiAnalyseBulk } from "@/app/api/AIAnalyseAPI";

export default function AiInsights({ journalEntries }) {
  const [bulkResult, setBulkResult] = useState(null);

  useEffect(() => {

    if (!journalEntries || journalEntries.length === 0) return;
    let names = []
    for(let entry of journalEntries) {
        if (!entry.title) continue;
        const firstWord = entry.title.split(" ")[0]
        if (firstWord) {
            names.push(firstWord);
        }
    }

    let nameFreq = {}
    for(let n of names) {
        nameFreq[n] = (nameFreq[n] || 0) + 1
    } 

    let shouldBulk = false;
    for (const [name, count] of Object.entries(nameFreq)) {
      if (count > 2) {
        shouldBulk = true;
        break;
      }
    }

    if (shouldBulk) {
    console.log("journalEntries for bulk analysis:", journalEntries);
      doBulkAnalysis(); // calls the function below
    }
    async function doBulkAnalysis() {
        try {
          // pass entire journal array
          const data = await AiAnalyseBulk({
            // If your backend expects { entries: [..] }, you can do:
            entries: journalEntries,
            // or if you only want to pass these 'names' specifically, you can do:
            // names
          });
  
          setBulkResult(data.bulk_result);
        } catch (err) {
          console.error("Bulk analysis error:", err);
        }
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

