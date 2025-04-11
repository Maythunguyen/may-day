"use client";

import { dashboardItems } from "@/data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import edit from "../public/edit.svg";
import bin from "../public/bin.svg";
import CardModal from "./CardModal";
import { FloatingDock } from "./ui/FloatingDock";
import { IconPencil, IconTrash } from "@tabler/icons-react";



export const DashboardSingle = ({ journalEntries = [], onEdit, onDelete }) => {
    const [selectedTag, setSelectedTag] = useState(null);
    const [showCards, setShowCards] = useState(false);

    // Filter journal entries based on selectedTag
  const filteredEntries = selectedTag
    ? journalEntries.filter((entry) => entry.tag === selectedTag)
    : journalEntries;
    return (
      <div className="flex flex-1">
        <div
          className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
          <div className="flex justify-around">
          <FloatingDock
            items={dashboardItems.map((item) => ({
                label: item.label,
                icon: item.icon,
                onClick: () => setSelectedTag(item.label),
            }))}
               desktopClassName="mx-auto mt-4"
               mobileClassName=""
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {filteredEntries.length === 0 ? (
                <p className="text-neutral-400">No journal entries yet.</p>
            ) : (
                filteredEntries.map((entry, idx) => {
                const bgImage = entry.backgroundImage || "/girl-c.webp"; // fallback image

                return (
                    <div 
                    key={idx} 
                    className="max-w-xs w-full group/card"
                    onClick={() => setShowCards(entry)}
                    
                    >
                        <div
                            className={cn(
                            "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4 bg-cover bg-center"
                            )}
                            style={{ backgroundImage: `url(${bgImage})`, opacity: 0.8 }}
                        >
                            {/* Overlay on hover */}
                            <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-80"></div>

                            {/* Top Section: Date + Mood */}
                            <div className="flex flex-row justify-between space-x-4 z-10">
                                <div className="flex flex-col gap-2 w-[50%]">
                                    <div className="font-normal text-white relative z-10 text-sm">
                                    {new Date(entry.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="border border-orange-1 rounded-full py-1 text-white font-bold flex items-center justify-center text-center text-xs w-[60%]">
                                         {entry.mood} 
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2 w-[40%] justify-end">
                                    <div>
                                    
                                        <IconPencil
                                            className="text-neutral-200 hover:text-white cursor-pointer"
                                            width={20}
                                            height={20}
                                            alt="Picture of the author"
                                        onClick={(e) => { e.stopPropagation(); onEdit(entry); }}
                                        />
                        
                                    </div>
                                    <div>
                                        <IconTrash
                                            className="text-neutral-200 hover:text-white cursor-pointer"
                                            width={20}
                                            height={20}
                                            alt="Picture of the author"
                                            onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Section: Tag + Content */}
                            <div className="text content z-10">
                                <h1 className="font-bold text-xl md:text-2xl text-white truncate">
                                    {entry.title || "Untitled"}
                                </h1>

                                <p className="font-medium text-xs text-orange-1 mt-1 mb-2">
                                    {entry.tag}
                                </p>

                                <p className="font-normal text-sm text-white truncate overflow-hidden whitespace-nowrap">
                                    {entry.content}
                                </p>
                            </div>
                        </div>
                    
                    </div>
                );
                })
            )}
            
            </div>
        </div>

        {showCards && (<CardModal 
            entry={showCards}
            onClose={() => setShowCards(false)}
        />)}
      </div>
    );
  };
  

