import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  RotateCcw,
  User,
  Bot,
  Minimize2,
  Maximize2
} from "lucide-react";
const QUICK_TOPICS = [
  { label: "Universities", prompt: "Which online universities are available?" },
  { label: "Find a course", prompt: "Help me find a course based on my career goal" },
  { label: "Affordable", prompt: "What are the most affordable online universities?" },
  { label: "How to choose", prompt: "How do I choose the right online degree?" },
  { label: "Admission steps", prompt: "What is the admission process for online courses?" },
  { label: "Online MBA", prompt: "Which universities offer online MBA programs?" },
  { label: "Before enrolling", prompt: "What should I check before enrolling in an online university?" },
  { label: "Compare", prompt: "Can you compare two online universities?" }
];
export const GeminiChatbot = ({
  isOpen,
  onClose,
  onOpenApply,
  initialQuery
}) => {
  const [messages, setMessages] = useState(() => {
    const saved = typeof window !== "undefined"
      ? window.sessionStorage.getItem("siksha_chat_history")
      : null;
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
      }
    }
    return [
      {
        id: "welcome-msg",
        role: "assistant",
        text: `Hi! How can I help you compare universities, check fees, or verify UGC approvals today?`,
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ];
  });
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modelChoice, setModelChoice] = useState("gemini-3.5-flash");
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const processedInitialQueryRef = useRef("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("siksha_chat_history", JSON.stringify(messages));
    }
  }, [messages]);
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isLoading]);
  useEffect(() => {
    if (initialQuery && isOpen && processedInitialQueryRef.current !== initialQuery) {
      processedInitialQueryRef.current = initialQuery;
      sendMessage(initialQuery);
    }
  }, [initialQuery, isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);
  const sendMessage = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;
    const userMsg = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            text: m.text
          })),
          modelChoice
        })
      });
      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }
      const data = await response.json();
      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: data.text || "I apologize, could you please repeat your query?",
        suggestions: Array.isArray(data.suggestions) ? data.suggestions.slice(0, 5) : [],
        sources: Array.isArray(data.sources) ? data.sources.slice(0, 3) : [],
        dataNote: data.dataNote || "",
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg = {
        id: `assistant-err-${Date.now()}`,
        role: "assistant",
        text: `I couldn't reach the admissions records service right now. Please try again in a moment.\n\nYou can still ask about **fee structures, eligibility requirements, and scholarships** across the listed online universities, or connect through our **Free Advisory Helpline**.`,
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };
  const clearChat = () => {
    const welcomeMsg = {
      id: `welcome-${Date.now()}`,
      role: "assistant",
      text: `Admissions session refreshed. Which university or degree program would you like to review?`,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages([welcomeMsg]);
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("siksha_chat_history");
    }
  };
  if (!isOpen) return null;
  const renderFormattedText = (raw) => {
    return raw.split("\n").map((line, idx) => {
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const content = line.trim().substring(2);
        return <li key={idx} className="ml-4 list-disc my-1 text-xs sm:text-[13px] text-[#1a222f] leading-relaxed font-sans">
            <span>{formatInline(content)}</span>
          </li>;
      }
      if (/^\d+\.\s/.test(line.trim())) {
        const content = line.trim().replace(/^\d+\.\s/, "");
        return <li key={idx} className="ml-4 list-decimal my-1 text-xs sm:text-[13px] text-[#1a222f] leading-relaxed font-sans">
            <span>{formatInline(content)}</span>
          </li>;
      }
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      return <p
        key={idx}
        className="my-1.5 text-xs sm:text-[13px] text-[#1a222f] leading-relaxed font-sans font-normal"
      >{formatInline(line)}</p>;
    });
  };
  function formatInline(str) {
    const tokenPattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
    const parts = str.split(tokenPattern).filter(Boolean);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="font-semibold text-[#000f22]">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={index} className="italic text-[#1a222f]">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={index} className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-[#004689]">{part.slice(1, -1)}</code>;
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  }
  return <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="admissions-ai-title"
    className={`fixed z-50 transition-all duration-300 flex flex-col font-sans ${isExpanded ? "inset-2 sm:inset-6 md:inset-10 bg-white rounded-2xl shadow-2xl border border-[#e7eeff] overflow-hidden" : "bottom-0 left-0 w-full h-[min(680px,calc(100dvh-4rem))] sm:bottom-6 sm:left-6 sm:w-[440px] md:w-[460px] sm:h-[600px] sm:max-h-[85vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#e7eeff] overflow-hidden"}`}
  >
      {
    /* Header - Clean Institutional Advisory Bar */
  }
      <div className="bg-white text-[#000f22] px-4 sm:px-5 py-3.5 flex items-center justify-between border-b border-[#e7eeff] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0b2540] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h3 id="admissions-ai-title" className="text-sm font-bold tracking-tight text-[#000f22] font-sans">
            Admissions AI
          </h3>
        </div>

        {
    /* Controls */
  }
        <div className="flex items-center gap-1.5">
          {
    /* Mode Switcher */
  }
          <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-0.5 text-xs font-medium border border-slate-200/80 font-sans">
            <button
    type="button"
    onClick={() => setModelChoice("gemini-3.5-flash")}
    className={`px-2.5 py-1 rounded-md transition-colors ${modelChoice === "gemini-3.5-flash" ? "bg-white text-[#0b2540] font-semibold shadow-2xs" : "text-[#555960] hover:text-[#000f22]"}`}
    title="Comprehensive analysis mode"
  >
              Detailed
            </button>
            <button
    type="button"
    onClick={() => setModelChoice("gemini-3.1-flash-lite")}
    className={`px-2.5 py-1 rounded-md transition-colors ${modelChoice === "gemini-3.1-flash-lite" ? "bg-white text-[#0b2540] font-semibold shadow-2xs" : "text-[#555960] hover:text-[#000f22]"}`}
    title="Quick answer mode"
  >
              Quick
            </button>
          </div>

          <button
    type="button"
    onClick={clearChat}
    title="Reset conversation"
    className="p-2 text-[#555960] hover:text-[#0b2540] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
    aria-label="Reset conversation"
  >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
    type="button"
    onClick={() => setIsExpanded(!isExpanded)}
    title={isExpanded ? "Minimize" : "Expand"}
    className="hidden sm:block p-2 text-[#555960] hover:text-[#0b2540] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
    aria-label={isExpanded ? "Minimize chat" : "Expand chat"}
  >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
    type="button"
    onClick={onClose}
    className="p-2 text-[#555960] hover:text-[#000f22] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
    aria-label="Close advisory window"
  >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {
    /* Message Thread */
  }
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4 bg-[#fbfcfe] text-[#111c2d]">
        {messages.map((msg) => {
    const isUser = msg.role === "user";
    return <div
      key={msg.id}
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
              <div
      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-semibold shadow-xs ${isUser ? "bg-[#115eaf] text-white" : "bg-[#f0f4f8] text-[#0b2540] border border-[#e2e8f0]"}`}
    >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-[#0b2540]" />}
              </div>

              <div
      className={`max-w-[85%] break-words ${isUser ? "" : "flex w-[85%] flex-col items-stretch"}`}
    >
                <div
      className={`break-words rounded-2xl ${isUser ? "bg-[#0b2540] text-white rounded-tr-xs px-4 py-3 shadow-xs font-sans text-xs sm:text-[13px] font-normal leading-relaxed" : "bg-white border border-[#e7eeff] text-[#1a222f] rounded-tl-xs p-4 sm:p-5 shadow-xs font-sans text-xs sm:text-[13px] leading-relaxed"}`}
    >
                  {isUser ? <p className="my-0.5 text-white leading-relaxed font-sans">{msg.text}</p> : renderFormattedText(msg.text)}

                  <span
      role="status"
      aria-live="polite"
      className={`block text-[10px] mt-2 font-normal font-sans ${isUser ? "text-slate-300 text-right" : "text-[#74777e]"}`}
    >
                    {msg.timestamp}
                  </span>
                </div>

                {!isUser && (msg.dataNote || (msg.sources && msg.sources.length > 0) || (msg.suggestions && msg.suggestions.length > 0)) ? (
                  <div className="mt-2 flex flex-col items-start gap-1.5">
                    {msg.dataNote ? (
                      <span className="text-[10px] italic text-[#74777e] font-sans">{msg.dataNote}</span>
                    ) : null}
                    {msg.sources && msg.sources.length > 0 ? (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-[#74777e] font-sans">Sources:</span>
                        {msg.sources.map((url, sIdx) => (
                          <a
                            key={sIdx}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="max-w-[180px] truncate text-[11px] font-semibold text-[#115eaf] hover:text-[#004689] hover:underline font-sans"
                          >
                            {url.replace(/^\/universities\//, "").replace(/-+/g, " ")}
                          </a>
                        ))}
                      </div>
                    ) : null}
                    {msg.suggestions && msg.suggestions.length > 0 ? (
                      <div className="flex flex-wrap items-center gap-2">
                        {msg.suggestions.map((suggestion, sIdx) => (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => sendMessage(suggestion)}
                            className="px-3 py-1.5 bg-white hover:bg-[#eef4ff] text-[#004689] border border-[#d5e3ff] hover:border-[#115eaf] rounded-full text-xs font-semibold transition-colors cursor-pointer font-sans text-left"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>;
  })}

        {
    /* Loading Indicator - Clean Institutional Status */
  }
        {isLoading && <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#f0f4f8] border border-[#e2e8f0] text-[#0b2540] flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-4 h-4 text-[#0b2540]" />
            </div>
            <div className="bg-white border border-[#e7eeff] rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-2.5 text-[#555960] shadow-xs">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:0.4s]" />
              </span>
              <span className="text-xs text-[#555960] font-normal font-sans">
                Reviewing institutional records...
              </span>
            </div>
          </div>}

        <div ref={messagesEndRef} />
      </div>

      {
    /* Suggested Quick Topics (1-2 words each) */
  }
      {messages.length <= 2 && !isLoading && <div className="px-4 py-2.5 bg-[#f8faff] border-t border-[#e7eeff] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-2 flex-nowrap">
            {QUICK_TOPICS.map((topic, pIdx) => <button
    key={pIdx}
    type="button"
    onClick={() => sendMessage(topic.prompt)}
    className="px-3 py-1.5 bg-white hover:bg-[#eef4ff] text-[#004689] border border-[#d5e3ff] hover:border-[#115eaf] rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0 shadow-2xs font-sans cursor-pointer"
  >
                {topic.label}
              </button>)}
          </div>
        </div>}

      {
    /* Input Form */
  }
      <form
    onSubmit={(e) => {
      e.preventDefault();
      sendMessage();
    }}
    className="p-3.5 sm:p-4 bg-white border-t border-[#e7eeff] flex items-center gap-2.5 shrink-0"
  >
        <input
    ref={inputRef}
    type="text"
    value={inputText}
    onChange={(e) => setInputText(e.target.value)}
    aria-label="Ask the admissions advisor"
    placeholder="Ask about fees, UGC validity, eligibility..."
    disabled={isLoading}
    className="flex-1 h-11 px-4 text-xs sm:text-sm bg-[#f9fbff] border border-[#c4c6ce] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/15 rounded-xl font-normal text-[#111c2d] placeholder:text-[#74777e] outline-none font-sans"
  />

        <button
    type="submit"
    disabled={!inputText.trim() || isLoading}
    className="h-11 px-4 bg-[#115eaf] hover:bg-[#004689] disabled:opacity-40 text-white rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 font-semibold text-xs font-sans shrink-0 active:scale-95 cursor-pointer"
    aria-label="Send query"
  >
          <span className="hidden sm:inline">Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>;
};
export const ChatbotFloatingTrigger = ({ onClick }) => {
  return <button
    type="button"
    onClick={onClick}
    className="fixed bottom-[140px] right-4 md:bottom-[84px] md:right-6 z-40 h-14 w-14 rounded-full border border-white bg-[#0b2540] text-white shadow-xl shadow-slate-900/25 transition-all duration-200 flex items-center justify-center hover:bg-[#115eaf] hover:shadow-2xl active:scale-95 group font-sans cursor-pointer"
    aria-label="Open Admissions Desk AI Robot"
    title="Admissions Desk AI"
  >
      <div className="relative flex items-center justify-center">
        <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-transform duration-200 group-hover:scale-110" />
        {
    /* Pulsing online indicator beacon */
  }
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white" />
        </span>
      </div>

      {
    /* Hover tooltip badge for desktop */
  }
      <span className="pointer-events-none absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap shadow-md hidden sm:block">
        Admissions Desk AI
      </span>
    </button>;
};
