"use client";
import { motion } from "motion/react";
import { dashboardItems, moods } from "@/data";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "./ui/DropdownMenu"
import {
    IconTag,
    IconMoodHappy
} from "@tabler/icons-react";

export function JournalModal({ onClose, onSave, initialData, isSaving }) {
    const [selectedTag, setSelectedTag] = useState(initialData?.tag || "Daily Journal");
    const [selectedMood, setSelectedMood] = useState(initialData?.mood || "Normal");
    const [content, setContent] = useState(initialData?.content ||"");
    const [entryTitle, setEntryTitle] = useState(initialData?.title || "");
    const [selectedBackground, setSelectedBackground] = useState(initialData?.backgroundImage || "");

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-cover bg-center"
        style={{
        backgroundImage: `url('/girl-fm.webp')`,
        backgroundBlendMode: 'overlay',
        }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white dark:bg-neutral-400 p-10 rounded-4xl shadow-xl w-full max-w-md md:mx-3 sm:mx-3"
      >
        <h2 className="lg:text-3xl md:text-2xl font-bold mb-10 text-neutral-600 dark:text-neutral-100 mx-auto sm:text-xl">Write your New Journal</h2>

        <div className="mb-4">
            <p className="mb-2 text-orange-1 font-bold">Title</p>
            <input
                type="text"
                placeholder="This Journal is about..."
                className="w-full px-6 py-3 rounded-2xl border border-dashed border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-1  focus:ring-orange-1"
                value={entryTitle}
                onChange={(e) => setEntryTitle(e.target.value)}
            />
        </div>


        <textarea
           className="w-full mb-6 h-[25vh] p-6 rounded-3xl border border-dashed border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-1  focus:ring-orange-1"
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />

        <div className="mb-6">
          <label className="inline-block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-200">
            <div className="flex items-center gap-2">
                <IconTag className="text-orange-1" />
                <span className="text-orange-1">{selectedTag}</span>
            </div>
            <p className="font-extralight">Choose your tag from dropdown menu below</p>
          </label>

          <DropdownMenu>
            <DropdownMenuTrigger className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-left dark:text-white text-sm">
              {selectedTag}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full bg-white border border-orange-3">
              {dashboardItems.map((item, idx) => (
                <DropdownMenuItem
                  key={idx}
                  onClick={() => setSelectedTag(item.label)}
                  className="cursor-pointer hover:bg-orange-1 hover:text-white dark:hover:bg-orange-1 dark:hover:text-white"

                >
                  {item.icon} {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mb-6">
          <label className="inline-block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-200">
            <div className="flex items-center gap-2">
                <IconMoodHappy className="text-orange-1" />
                <span className="text-orange-1">{selectedMood}</span>
            </div>
            <p className="font-extralight">Choose your mood from dropdown menu below</p>
          </label>

          <DropdownMenu>
            <DropdownMenuTrigger className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-700 text-left dark:text-white text-sm">
              {selectedMood}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full bg-white border border-orange-3">
              {moods.map((mood, idx) => (
                <DropdownMenuItem
                  key={idx}
                  onClick={() => setSelectedMood(mood.label, mood.icon)}
                  className="cursor-pointer hover:bg-orange-1 hover:text-white dark:hover:bg-orange-1 dark:hover:text-white"

                >
                    {mood.icon}
                  {mood.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-300 dark:bg-neutral-700 rounded-xl text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button 
          
          className="px-4 py-2 bg-black text-white rounded-xl text-sm cursor-pointer"
          disabled={isSaving}
          onClick={() => {
            if (!isSaving) {
              onSave(
                entryTitle,
                content,
                selectedTag,
                selectedMood,
                selectedBackground,
                initialData?.id
              );
            } 
          }}
          >
           {isSaving ? (
              <span className="flex items-center gap-2">
                <span className="animate-pulse">Saving</span>
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
              </span>
            ) : (
              <>{initialData ? "Update" : "Save"}</>
            )}
          </button>
          
        </div>
      </motion.div>
    </div>
  );
}
