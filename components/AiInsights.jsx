"use client";
import React, { useEffect, useState } from "react";
import { AiAnalyseBulk } from "@/app/api/AIAnalyseAPI";


export default function AiInsights({ journalEntries, onBulkComplete, bulkResult, setBulkResult }) {
 
  useEffect(() => {

    if (!journalEntries || journalEntries.length === 0 || bulkResult) return;
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
      if (count >= 2) {
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
          const data = await AiAnalyseBulk(
            journalEntries.map((entry) => ({
              title: entry.title,
              content: entry.content,
              tag: entry.tag,
              mood: entry.mood,
            }))
          );

          console.log("🧾 Sending to AI bulk:", JSON.stringify({
            entries: journalEntries.map((entry) => ({
              title: entry.title,
              content: entry.content,
              tag: entry.tag,
              mood: entry.mood,
            }))
          }, null, 2));
  
          setBulkResult(data.bulk_result);
          console.log("✅ Bulk AI Response:", data);
          let parsedResult;
          try {
            parsedResult = typeof data.bulk_result === "string"
              ? JSON.parse(data.bulk_result)
              : data.bulk_result;
          } catch (err) {
            console.error("Failed to parse bulk_result:", err);
            parsedResult = null;
          }

          setBulkResult(parsedResult);

          if (onBulkComplete) {
            onBulkComplete(); 
          }

        } catch (err) {
          console.error("Bulk analysis error:", err);
        }
      }
  }, [journalEntries]);

  return (
    <div className="p-4 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-bold mb-2">AI Insights (Aggregated)</h1>
          {Array.isArray(bulkResult) ? (
          <div className="space-y-4">
            {bulkResult.map((entry, idx) => (
              <div
                key={idx}
                className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-orange-100 dark:border-orange-300 shadow-sm"
              >
                <p className="text-lg font-semibold text-orange-600">{entry.name}</p>
                <p className="text-sm text-neutral-700 dark:text-neutral-200">{entry.insight}</p>
              </div>
            ))}
          </div>
          ) : (
            <p className="text-neutral-400">No aggregated insights yet.</p>
          )}
        </div>
    </div>
  );
}

