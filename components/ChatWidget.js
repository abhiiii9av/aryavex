"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const starterPrompts = [
  "What is UPI Payment Switch?",
  "Difference between eKYC and Video KYC?",
  "Which product helps with onboarding?"
];

function formatMessage(content) {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I can help explain digital banking tools, Aryavex products, switching, KYC, onboarding, and other fintech basics."
    }
  ]);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading]
  );

  useEffect(() => {
    if (!isOpen) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }, [isOpen, messages, isLoading]);

  async function sendMessage(text) {
    const message = text.trim();
    if (!message || isLoading) return;

    const nextMessages = [...messages, { role: "user", content: message }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get assistant response.");
      }

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.reply || "No response generated."
        }
      ]);
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            error.message ||
            "Something went wrong. Please try again in a moment."
        }
      ]);
    }

    setIsLoading(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      {isOpen ? (
        <div className="flex h-[36rem] w-[22rem] flex-col overflow-hidden border border-line bg-[#faf8f3] shadow-[0_28px_60px_rgba(30,24,14,0.16)] sm:w-[24.5rem]">
          <div className="flex items-center justify-between border-b border-line bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(250,248,243,0.9)_100%)] px-5 py-4">
            <div>
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-muted">
                Digital Banking Assistant
              </p>
              <p className="mt-1 text-sm leading-6 text-muted">
                Ask about payments, KYC, switching, and Aryavex products
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center border border-transparent text-2xl text-muted transition hover:border-line hover:bg-white hover:text-ink"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(239,123,93,0.08),transparent_28%)] px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`animate-rise-in max-w-[90%] ${
                  message.role === "assistant"
                    ? ""
                    : "ml-auto"
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center text-[0.8rem] font-semibold ${
                      message.role === "assistant"
                        ? "bg-[var(--color-panel)] text-[var(--color-ink)]"
                        : "bg-[#ef7b5d] text-white"
                    }`}
                  >
                    {message.role === "assistant" ? "AI" : "You"}
                  </span>
                  <span className="text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                    {message.role === "assistant" ? "Aryavex Guide" : "Your Question"}
                  </span>
                </div>

                <div
                  className={`border px-4 py-3 text-[0.97rem] leading-7 shadow-[0_8px_20px_rgba(30,24,14,0.04)] ${
                    message.role === "assistant"
                      ? "border-line bg-white text-ink"
                      : "border-[#ef7b5d]/35 bg-[#ef7b5d] text-white"
                  }`}
                >
                  <div className="space-y-3">
                    {formatMessage(message.content).map((line, lineIndex) => (
                      <p key={`${index}-${lineIndex}`}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {messages.length === 1 ? (
              <div className="space-y-2 pt-2">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="block w-full border border-line bg-white px-4 py-3 text-left text-[0.93rem] leading-6 text-muted transition hover:border-[#ef7b5d]/35 hover:bg-[#faf4eb] hover:text-ink"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            ) : null}

            {isLoading ? (
              <div className="animate-rise-in max-w-[90%]">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center bg-[var(--color-panel)] text-[0.8rem] font-semibold text-[var(--color-ink)]">
                    AI
                  </span>
                  <span className="text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                    Aryavex Guide
                  </span>
                </div>
                <div className="border border-line bg-white px-4 py-4 shadow-[0_8px_20px_rgba(30,24,14,0.04)]">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 animate-chat-pulse rounded-full bg-[#ef7b5d]" />
                    <span className="h-2.5 w-2.5 animate-chat-pulse rounded-full bg-[#ef7b5d] [animation-delay:0.18s]" />
                    <span className="h-2.5 w-2.5 animate-chat-pulse rounded-full bg-[#ef7b5d] [animation-delay:0.36s]" />
                    <span className="ml-2 text-[0.93rem] text-muted">
                      Thinking through that...
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-line bg-[linear-gradient(180deg,rgba(255,255,255,0.84)_0%,rgba(250,248,243,0.96)_100%)] p-4"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about UPI, AEPS, KYC..."
                className="h-12 flex-1 border border-line bg-white px-4 text-[0.96rem] text-ink outline-none transition placeholder:text-muted focus:border-[#ef7b5d] focus:shadow-[0_0_0_3px_rgba(239,123,93,0.12)]"
              />

              <button
                type="submit"
                disabled={!canSend}
                className="inline-flex h-12 w-12 items-center justify-center bg-[#ef7b5d] text-xl text-white transition hover:-translate-y-0.5 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                ↗
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 border border-line bg-white px-5 py-4 shadow-[0_18px_40px_rgba(30,24,14,0.12)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(30,24,14,0.16)]"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center bg-[#ef7b5d] text-xl text-white">
            ✦
          </span>

          <span className="font-editorial text-[1.05rem] text-ink">
            Ask Banking Assistant
          </span>
        </button>
      )}
    </div>
  );
}
