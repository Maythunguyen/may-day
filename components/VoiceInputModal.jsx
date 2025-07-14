"use client";
import { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { messageWithAiAPI } from "@/app/api/ChatWithAiAPI";

export default function VoiceInputModal({
    isModalOpen,
    setIsModalOpen,
    pushMessage,
}) {
    const [thinking, setThinking] = useState(false);
    const lastSentRef = useRef("");               // remembers what we’ve already sent

    const {
        interimTranscript,
        finalTranscript,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition({ interimResults: true });

  /* ---------- whenever a new final transcript appears ---------- */
    useEffect(() => {
        if (!isModalOpen) return;
        if (!finalTranscript) return;

        // slice off the part we've already handled
        const newStuff = finalTranscript.replace(lastSentRef.current, "").trim();
        if (!newStuff) return;

        lastSentRef.current = finalTranscript;      // advance the pointer
        handleFinalText(newStuff);
    }, [finalTranscript, isModalOpen]);

    const handleFinalText = async (message) => {
        pushMessage?.("user", message);
        setThinking(true);

        const { reply } = await messageWithAiAPI(message);
        pushMessage?.("ai", reply);
        setThinking(false);

        const utter = new SpeechSynthesisUtterance(reply);
        utter.lang = "en-AU";

        // silence mic while TTS plays
        utter.onstart = () => SpeechRecognition.abortListening();
        utter.onend = () => {
        setThinking(false);
        resetTranscript();                        // clear interim
        SpeechRecognition.startListening({        // reopen mic
            continuous: true,
            interimResults: true,
            onError: (event) => {
                console.error("Speech error:", event.error);   // 👈 now you’ll see NotAllowedError, no-speech, etc.
                if (event.error === "not-allowed") {
                alert("Mic permission denied. Click the pad-lock icon and choose Allow.");
                }
            },
        });
        };

        window.speechSynthesis.speak(utter);
    };

    useEffect(() => {
        if (!isModalOpen) return;

        if (!browserSupportsSpeechRecognition) {
        alert("Voice recognition isn’t supported in this browser.");
        return;
        }

        SpeechRecognition.startListening({ continuous: true, interimResults: true });
        
        return () => {
        SpeechRecognition.abortListening();
        resetTranscript();
        lastSentRef.current = "";
        };
    }, [isModalOpen, browserSupportsSpeechRecognition]);

    const handleClose = () => {
        SpeechRecognition.abortListening();
        resetTranscript();
        lastSentRef.current = "";
        setIsModalOpen(false);
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 grid place-items-center">
            <div className="relative flex flex-col items-center">
                <div
                    className={`w-44 h-44 rounded-full bg-gradient-to-br from-blue-200 to-blue-600 ${
                        !thinking ? "animate-pulse" : ""
                    }`}
                />
                <p className="absolute bottom-52 w-80 text-center text-sm text-gray-200 px-4">
                    {thinking ? "🤖 Thinking…" : interimTranscript || "Listening…"}
                </p>

                <button
                    onClick={handleClose}
                    className="mt-16 w-14 h-14 rounded-full bg-white text-black grid place-items-center text-xl cursor-pointer"
                >
                    x
                </button>
            </div>
        </div>
    );
}
