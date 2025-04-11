"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/Sidebar";
import { links } from "@/data";
import { Dashboard } from "./DashboardContent";
import { JournalModal } from "./JournalModal";
import { cn } from "@/lib/utils";
import { Logo, LogoIcon } from "./Logo";
import { TagLibrary } from "./TagLibrary";
import { DashboardSingle } from "./DashboardSingle";
import { useUser } from "@clerk/nextjs";
import AiInsights from "./AiInsights";
import { AiAnalyseData } from "@/app/api/AIAnalyseAPI";

export function SideBar() {

    const localImages = [
        "/girl-bf.webp",
        "/girl-c.webp",
        "/girl-cf.webp",
        "/girl-df.webp",
        "/girl-dogg.webp",
        "/girl-fm.webp",
        "/girl-hp.webp",
        "/girl-sad.webp",
        "/girl1.webp",
    ];
  const [open, setOpen] = useState(false);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [showTagLibrary, setShowTagLibrary] = useState(false);
    const [showDashboard, setShowDashboard] = useState(true);
    const [showAIInsights, setShowAIInsights] = useState(false);
    const [journalEntries, setJournalEntries] = useState([]);
    const [editEntry, setEditEntry] = useState(null);
    const [aiAnalysis, setAiAnalysis] = useState(null);


    const { user } = useUser(); 
    const userId = user?.id;

    const handleSaveJournal = async (title, content, tag, mood, backgroundImage, editId) => {
        const existing = JSON.parse(localStorage.getItem(userId)) || [];
        let updated;
        let result = null

        // AI Analysis
        try {
            const aiResponse = await AiAnalyseData({
                userId,
                title, 
                content,
                tag,
                mood,
            });

            
            result = aiResponse.result
            console.log("AI Analysis Result:", result);
            setAiAnalysis(result);

        } catch (error) {
            console.error("Error fetching AI analysis:", error);
        }
        // Edit entry
        if (editId) {
          updated = existing.map((entry) => {
            if (entry.id === editId) {
              return {
                ...entry,
                title,
                content,
                tag,
                mood,
                backgroundImage,
                createdAt: new Date().toISOString(),
                analysis: result,    
              };
            }
            return entry;
          });
        } else {
          const newEntry = {
            id: Date.now(),
            title,
            content,
            tag,
            mood,
            createdAt: new Date().toISOString(),
            backgroundImage:
              backgroundImage ||
              localImages[Math.floor(Math.random() * localImages.length)],
            analysis: result, 
          };
      
          updated = [...existing, newEntry];
        }

        
        
      
        localStorage.setItem(userId, JSON.stringify(updated));
        setJournalEntries(updated);
        setIsJournalModalOpen(false);
        setEditEntry(null);
    };

    const handleDeleteJournal = (deleteId) => {
        const existing = JSON.parse(localStorage.getItem(userId)) || [];
        const updated = existing.filter((entry) => entry.id !== deleteId);
        localStorage.setItem(userId, JSON.stringify(updated));
        setJournalEntries(updated);

    }

    useEffect(() => {
        if(userId) {
            const stored = JSON.parse(localStorage.getItem(userId)) || [];
            setJournalEntries(stored);
        }

    }, [userId]);


  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "min-h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => {
                const handleClick = () => {
                switch (link.label) {
                    case "Create Journal":
                    setIsJournalModalOpen(true);
                    break;
                    case "Tags Library":
                    setShowTagLibrary(true);
                    setShowDashboard(false);
                    setIsJournalModalOpen(false);
                    setShowAIInsights(false);
                    break;
                    case "Dashboard":
                    setShowDashboard(true);
                    setShowTagLibrary(false);
                    setIsJournalModalOpen(false);
                    setShowAIInsights(false);
                    break;
                    case "AI Insights":
                    setShowDashboard(false);
                    setShowTagLibrary(false);
                    setIsJournalModalOpen(false);
                    setShowAIInsights(true);
                    break;
                    default:
                    break;
                }
                setOpen(false);
            };

                return (
                <button key={idx} onClick={() => handleClick(link.label)} className="text-left w-full">
                    <SidebarLink link={link} />
                </button>
                );
            })}
            </div>
          </div>
        </SidebarBody>
        <Dashboard>
            {showDashboard ? <DashboardSingle journalEntries={journalEntries} onEdit={(entry) => { 
                setEditEntry(entry);
                setIsJournalModalOpen(true);
            }} 
            analysis={aiAnalysis}
            onDelete={handleDeleteJournal}
            
            /> : null}
            {showTagLibrary ? <TagLibrary /> : null}
            {showAIInsights ? <AiInsights journalEntries={journalEntries}/> : []}
        </Dashboard>
      </Sidebar>

      {/* Show modal if open */}
      {isJournalModalOpen && (
        <JournalModal 
            onClose={() => {
                setIsJournalModalOpen(false);
                setEditEntry(null);
            }} 
            onSave={handleSaveJournal}
            initialData={editEntry}
        />
      )}
    </div>
  );
}
