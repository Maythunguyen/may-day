"use client";
import { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { messageWithAiAPI } from "@/app/api/ChatWithAiAPI";
import { X } from "lucide-react";

export default function VoiceInputModal({
    isModalOpen,
    setIsModalOpen,
    setMessageInput,
}) {
    const [thinking, setThinking] = useState(false);
    const [aiTalking, setAiTalking] = useState(false);
    const lastSentRef = useRef("");               // remembers what we’ve already sent, keep track of the last thing already sent to AI, so when voice gives new words(finalTrsnacript), we do not need send the same words again by acident 

    const {
        interimTranscript, //live words currently saying
        finalTranscript, //finilized version after stop speaking 
        resetTranscript, // clears transcript
        browserSupportsSpeechRecognition, // checks if browser supports speech recognition - true/false
    } = useSpeechRecognition({ interimResults: true });

  /* ---------- whenever a new final transcript appears - watch for new spoken text ---------- */
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
        setMessageInput((prev) => [...prev, { role: "user", content: message }]);
        setThinking(true);
        setAiTalking(false); // reset AI talking state

        const { reply } = await messageWithAiAPI(message);
        setMessageInput((prev) => [...prev, { role: "ai", content: reply }]);
        setThinking(false);

        const utter = new SpeechSynthesisUtterance(reply);
        utter.voice = speechSynthesis
            .getVoices()
            .find(v => v.name === "Google UK English Female" || v.name.includes("Natural"));

        // silence mic while TTS plays
        utter.onstart = () =>{ 
            setAiTalking(true);
            SpeechRecognition.abortListening()
        };
        utter.onend = () => {
            setAiTalking(false)  
            setThinking(false);
            resetTranscript();                      // clear interim
            SpeechRecognition.startListening({        // reopen mic
                continuous: true,
                interimResults: true,
                language: "en"
            });
        };

        window.speechSynthesis.cancel(); // cancel any stuck TTS
        window.speechSynthesis.speak(utter);
    };

    //Starts the mic when the modal opens, Stops listening + resets everything when you close it
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
        setThinking(false);
        setAiTalking(false);
        window.speechSynthesis.cancel(); // stop any ongoing speech synthesis
    };

    if (!isModalOpen) return null;

    let micCircleClass = "w-32 h-32 rounded-full transition-all duration-500";
    if (aiTalking) {
        micCircleClass += " w-48 h-48 bg-blue-900 animate-pulse scale-110";
    } else if (interimTranscript) {
        micCircleClass += " w-48 h-48 bg-blue-800 animate-pulse scale-105";
    } else {
        micCircleClass += " bg-blue-400";
    }

    return (
         <div className="fixed inset-0 bg-black z-50 grid place-items-center">
            <div className="relative flex flex-col items-center">
                <div className={micCircleClass} />
                <button
                    onClick={handleClose}
                    className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-lg z-50 cursor-pointer"
                >
                    <X size={24} />
                </button>
            </div>
        </div>
    );
}
