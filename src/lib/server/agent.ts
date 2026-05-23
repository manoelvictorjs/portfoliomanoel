import { profile } from "@/content/profile";

const SYSTEM_PROMPT = `Você é o agente de triagem do Manoel Victor, engenheiro de software Full Stack e DevOps.
Responda em português, de forma profissional e concisa (máx. 4 frases por resposta).
Foque em: projetos RM Ecopeças e Pomodoro, skills Next.js/TypeScript/Docker/Linux, transição da indústria naval para tech.
Se pedirem contato ou entrevista, sugira LinkedIn e e-mail.
Nunca invente métricas de produção que não foram fornecidas.`;

export type AgentToolCall = {
  name: "open_link";
  args: { url: string; label?: string };
};

export type AgentChatResult = {
  reply: string;
  toolCalls: AgentToolCall[];
  degraded?: boolean;
};

function extractToolCalls(content: string): AgentToolCall[] {
  const tools: AgentToolCall[] = [];
  const linkedinMatch = /linkedin|contato|entrevista|agendar/i.test(content);
  if (linkedinMatch) {
    tools.push({
      name: "open_link",
      args: { url: profile.linkedin, label: `LinkedIn — ${profile.name}` },
    });
  }
  return tools;
}

export async function runAgentChat(
  messages: { role: "user" | "assistant"; content: string }[],
): Promise<AgentChatResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  const baseUrl =
    process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  if (!apiKey) {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const userText = lastUser?.content ?? "";
    const tools = extractToolCalls(userText + " linkedin contato");
    return {
      reply:
        "Modo demonstração (sem OPENAI_API_KEY). Manoel atua em Next.js, Docker e APIs em VPS. Projetos: RM Ecopeças, Pomodoro. Para contato, use o LinkedIn.",
      toolCalls: tools,
      degraded: true,
    };
  }

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 400,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-12),
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`LLM error: ${res.status}`);
  }

  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const reply =
    json.choices?.[0]?.message?.content?.trim() ??
    "Não consegui processar sua mensagem agora.";

  const toolCalls = extractToolCalls(
    `${messages.at(-1)?.content ?? ""} ${reply}`,
  );

  return { reply, toolCalls };
}
