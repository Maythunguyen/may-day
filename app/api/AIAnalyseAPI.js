const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function AiAnalyseData(entry) {
    console.log("AI call to:", `${baseURL}/api/ai_analyse`);
    const res = await fetch(`${baseURL}/api/ai_analyse`, {
        method: "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    });
    if(!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export async function AiAnalyseBulk(journalEntries) {
   
    const res = await fetch(`${baseURL}/api/ai_analyse_bulk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entries: journalEntries,
      }),
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch bulk analysis");
    }
  
    return res.json();
  }