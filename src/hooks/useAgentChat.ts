"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const WELCOME: Message = {
  role: "assistant",
  content:
    "IA-Agent online. Pergunte sobre RM Ecopeças, Pomodoro, stack ou agendamento. Digite 'exit' para sair.",
};

export function useAgentChat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const send = useCallback(async (text: string) => {
    const userMsg: Message = { role: "user", content: text };
    const history = [...messagesRef.current, userMsg];
    setMessages(history);
    setPending(true);
    setError(null);

    try {
      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "agent failed");

      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply },
      ]);

      for (const tool of data.toolCalls ?? []) {
        if (tool.name === "open_link" && tool.args?.url) {
          window.open(tool.args.url, "_blank", "noopener,noreferrer");
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro no agente");
    } finally {
      setPending(false);
    }
  }, []);

  const reset = useCallback(() => {
    setMessages([WELCOME]);
    setError(null);
  }, []);

  return { messages, pending, error, send, reset };
}
