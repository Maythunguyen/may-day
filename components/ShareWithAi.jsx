"use client";

import { messageWithAiAPI } from "@/app/api/ChatWithAiAPI";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import VoiceInputModal from "./VoiceInputModal";
import { useState, useRef, useEffect } from "react";

export function ShareWithAi() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageInput, setMessageInput] = useState([]);
    const chatContainerRef = useRef(null);
    const [draft, setDraft] = useState("");  
    const [interimTranscript, setInterimTranscript] = useState("");

    const placeholders = [
        "Would you like to share any thing today?",
        "How's your relationship going?",
        "Ask my anything?",
    ];

    const handleChange = (e) => {
        setDraft(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const value = e.target.querySelector("input")?.value?.trim();
        if (!value) return;

        setMessageInput((prev) => [...prev, { role: "user", content: value }])

        try {
            const response = await messageWithAiAPI(value);
            console.log("AI Response:", response);
            setMessageInput((prev) => [...prev, {role: "ai", content: response.reply}]);

        } catch (error) {
            console.error("Error sending message to AI:", error);
            setMessageInput((prev) => [...prev, { role: "assistant", content: "⚠️ Failed to get response." }]);
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messageInput]);
    return (
        <div className="h-screen flex flex-col justify-self-start mx-auto">
            <div className="flex-1 overflow-y-auto px-6 pt-6 pb-32" ref={chatContainerRef}>
                <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl">Share <span>MayAI </span> Anything</h2>
                <div className="flex flex-col space-y-2 max-w-2xl mx-auto">
                    {messageInput.map((msg, idx) => (
                        <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`px-6 py-3 rounded-lg max-w-[90%] whitespace-pre-wrap break-words ${
                                msg.role === "user"
                                    ? "bg-blue-100 text-black"
                                    : "bg-gray-100 text-black"
                                }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isModalOpen && interimTranscript && (
                        <div className="flex justify-end">
                            <div className="px-6 py-3 rounded-lg max-w-[90%] whitespace-pre-wrap break-words bg-blue-200 text-black opacity-80 italic animate-pulse">
                                {interimTranscript}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 mb-10 sm:p-1">
                <PlaceholdersAndVanishInput 
                    placeholders={placeholders} 
                    onChange={handleChange} 
                    onSubmit={handleSubmit} 
                    setMessageInput={setMessageInput}
                    setModalOpen={setIsModalOpen}
                />
            </div>
            <div>
                <VoiceInputModal 
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setMessageInput={setMessageInput}
                    setInterimTranscript={setInterimTranscript}
                />
            </div>
        </div>
    );
}
