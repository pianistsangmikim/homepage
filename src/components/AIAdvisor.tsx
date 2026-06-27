import React, { useState, useEffect, useRef } from "react";
import { ChatMessage } from "../types";
import { Sparkles, Send, Loader2, BookOpen, Music, Play } from "lucide-react";

interface AIAdvisorProps {
  accentColor: string;
}

const PRESET_TOPICS = [
  {
    label: "Alicia de Larrocha Compositions",
    prompt: "Can you tell me about Alicia de Larrocha as a composer? What are some of her notable solo piano compositions, and what characterizes her writing style?"
  },
  {
    label: "Iberia by Isaac Albéniz",
    prompt: "What are some practical performance tips for Evocación or Triana from Albéniz's Iberia suite, specifically regarding Spanish rhythms and pedaling?"
  },
  {
    label: "Granados Goyescas Ornaments",
    prompt: "In Enrique Granados' Goyescas, how should a pianist approach the vocal, operatic ornamentation (like in 'Quejas, ó la Maja y el Ruiseñor')?"
  }
];

export default function AIAdvisor({ accentColor }: AIAdvisorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [complexity, setComplexity] = useState<"fast" | "general" | "complex">("general");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const threadEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (userPrompt: string) => {
    if (!userPrompt.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: userPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/music/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          complexity
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to communicate with the Spanish Keyboard AI Advisor.");
      }

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#121216] border border-purple-950/40 rounded-2xl p-6 flex flex-col h-[520px] shadow-lg">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-purple-950/30 shrink-0 gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
            Gemini Musicology Core
          </span>
          <h3 className="font-serif text-base font-bold text-white mt-0.5">Spanish Keyboard Lit Research Advisor</h3>
          <p className="text-[10px] text-gray-400">Ask theoretical, historical, or interpretive performance queries</p>
        </div>

        {/* Engine dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500 font-bold uppercase shrink-0">Model Tier:</span>
          <select
            value={complexity}
            onChange={(e) => setComplexity(e.target.value as any)}
            className="text-[11px] p-1.5 bg-[#08080a] border border-purple-950 text-slate-300 rounded-lg focus:outline-none"
          >
            <option value="general">models/gemini-3.5-flash (Standard)</option>
            <option value="fast">models/gemini-3.1-flash-lite (Ultra Fast)</option>
            <option value="complex">models/gemini-3.1-pro-preview (Deep Research)</option>
          </select>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto my-4 pr-1 space-y-4 scroll-smooth">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 max-w-md mx-auto space-y-4">
            <div className="p-3 bg-purple-950/40 text-purple-300 rounded-full border border-purple-900/30 animate-pulse">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-sm font-bold text-white">Inquire with the Musicological Advisor</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Unlock insights regarding piano technique, composer catalogs, or historical contexts of the Iberian Peninsula literature.
              </p>
            </div>

            {/* Quick Presets */}
            <div className="w-full space-y-2 pt-2">
              <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider text-left">Suggested Research Questions:</p>
              <div className="grid grid-cols-1 gap-1.5 text-left">
                {PRESET_TOPICS.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(topic.prompt)}
                    className="flex items-center gap-2 p-2 bg-[#08080a] border border-purple-950 hover:border-purple-800 rounded-xl text-[11px] text-slate-300 hover:text-white text-left transition"
                  >
                    <Music className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">{topic.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] p-4 rounded-xl leading-relaxed whitespace-pre-wrap text-xs md:text-sm ${
                    isUser
                      ? "bg-slate-800 text-white rounded-br-none"
                      : "bg-[#08080a] text-slate-200 border border-purple-950/40 rounded-bl-none"
                  }`}
                >
                  <p className="font-semibold text-[10px] uppercase tracking-wider opacity-60 mb-1">
                    {isUser ? "Researcher" : "PhD Keyboard Advisor"}
                  </p>
                  <p className="font-light leading-relaxed">{msg.content}</p>
                  <span className="block text-[9px] text-right mt-2 opacity-40">{msg.timestamp}</span>
                </div>
              </div>
            );
          })
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#08080a] text-slate-400 p-4 rounded-xl rounded-bl-none border border-purple-950/40 flex items-center gap-2 text-xs">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
              <span>Analyzing historical manuscript source scores...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-950/20 text-red-400 border border-red-900/40 rounded-xl text-xs font-light">
            {error}
          </div>
        )}
        <div ref={threadEndRef} />
      </div>

      {/* Input controls */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="flex gap-2 shrink-0 border-t border-purple-950/30 pt-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Alicia de Larrocha compositions, Iberia rhythms..."
          className="flex-1 text-xs px-4 py-3 border border-purple-950/60 bg-[#08080a] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
