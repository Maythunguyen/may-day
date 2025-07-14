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

    const placeholders = [
        "Would you like to share any thing today?",
        "How's your relationship going?",
        "Ask my anything?",
    ];

    const handleChange = (e) => {
        setDraft(e.target.value);
    };

    const pushMessage = (role, content) => setMessageInput((p) => [...p, { role, content }]);


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
                <div className="space-y-2 max-w-2xl mx-auto">
                {messageInput.map((msg, idx) => (
                    <div
                    key={idx}
                    className={`px-6 py-3 rounded-lg backdrop-blur-md ${
                        msg.role === "user"
                        ? "bg-gray-50 text-right"
                        : "bg-gray-50 text-left"
                    }`}
                    >
                    <p>{msg.content}</p>
                    </div>
                ))}
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
                    pushMessage={pushMessage} 
                />
            </div>
        </div>
    );
}
