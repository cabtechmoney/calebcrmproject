"use client";

import { api } from "@/lib/api";
import type { Project } from "@/lib/types";
import { FormEvent, useEffect, useState } from "react";
import { ArrowUpRight, Bot, BriefcaseBusiness, ChartNoAxesCombined, CircleAlert, Layers3, Send, Sparkles, Target } from "lucide-react";

const prompts = [
  { title: "Pipeline pulse", text: "Summarize the current pipeline and identify the biggest risks.", icon: ChartNoAxesCombined },
  { title: "Prioritize the week", text: "Which projects have the highest value, and what should I prioritize?", icon: Target },
  { title: "Move deals forward", text: "Compare project stages and suggest the next actions to move deals forward.", icon: ArrowUpRight },
];

type AiResult = { success: boolean; text: string; message?: string };

export default function AiAssistantPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    api<Project[]>("/projects")
      .then(setProjects)
      .catch((loadError: unknown) => setError(loadError instanceof Error ? loadError.message : "Could not load project context."))
      .finally(() => setIsLoadingProjects(false));
  }, []);

  const generate = async (question: string) => {
    if (!question.trim()) return;
    setPrompt(question);
    setError("");
    setAnswer("");
    setIsGenerating(true);
    const context = projects.map((project) => ({
      title: project.title,
      status: project.status,
      budget: project.budget,
      deadline: project.deadline,
    }));
    try {
      const result = await api<AiResult>("/ai/generate", {
        method: "POST",
        body: JSON.stringify({ prompt: question, context }),
      });
      if (!result.success) throw new Error(result.message || "AI generation is unavailable.");
      setAnswer(result.text);
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : "Could not generate an answer.");
    } finally {
      setIsGenerating(false);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void generate(prompt);
  };

  return (
    <main className="insights-page assistant-page">
      <header className="assistant-heading">
        <div className="assistant-heading-copy">
          <div className="insights-kicker"><Sparkles size={15} /> CALEB CRM INTELLIGENCE</div>
          <h1>Think through the pipeline.</h1>
          <p>Ask focused questions. Get answers grounded in the projects you are managing.</p>
        </div>
        <div className="assistant-orbit" aria-hidden="true"><span /><Bot size={34} strokeWidth={1.5} /></div>
      </header>

      <div className="assistant-context-row">
        <span className={`context-status ${isLoadingProjects ? "context-loading" : error ? "context-error" : ""}`}><span />{isLoadingProjects ? "Syncing workspace" : error ? "Workspace unavailable" : "Workspace connected"}</span>
        <span className="context-divider" />
        <span><BriefcaseBusiness size={14} /> {projects.length} projects in context</span>
        <span className="context-divider" />
        <span><Layers3 size={14} /> Project data only</span>
      </div>

      <section className="assistant-workspace">
        <aside className="assistant-prompts">
          <div className="assistant-section-head"><span className="insight-overline">START WITH A SIGNAL</span><h2>Guided analysis</h2></div>
          <div className="assistant-prompt-list">
            {prompts.map(({ title, text, icon: Icon }) => (
              <button key={title} type="button" disabled={isGenerating || isLoadingProjects || Boolean(error)} onClick={() => void generate(text)} className="assistant-prompt-card">
                <span className="assistant-prompt-icon"><Icon size={17} /></span>
                <span><strong>{title}</strong><small>{text}</small></span>
                <ArrowUpRight className="assistant-prompt-arrow" size={15} />
              </button>
            ))}
          </div>
          <div className="assistant-privacy-note"><CircleAlert size={15} /><span>Answers use your current project names, stages, budgets, and deadlines.</span></div>
        </aside>

        <section className="assistant-conversation">
          <div className="conversation-topline"><div><span className="insight-overline">PIPELINE COPILOT</span><h2>Ask your workspace</h2></div><span className="conversation-model"><Sparkles size={13} /> Gemini analysis</span></div>
          <form className="assistant-composer" onSubmit={submit}>
            <label htmlFor="ai-prompt">What would you like to understand?</label>
            <textarea id="ai-prompt" required maxLength={1000} value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="For example: Which projects need attention first, and why?" />
            <div className="composer-footer"><span>{prompt.length}/1000</span><button type="submit" disabled={isGenerating || isLoadingProjects || Boolean(error) || !prompt.trim()}>{isGenerating ? "Working..." : "Analyze"}<Send size={15} /></button></div>
          </form>

          <div className={`assistant-answer ${answer || error || isGenerating ? "has-answer" : ""}`} aria-live="polite">
            {isGenerating ? <p className="answer-wait" role="status"><Sparkles size={16} /> Reading your pipeline and preparing an analysis...</p> : error ? <p className="answer-error" role="alert"><CircleAlert size={17} />{error}</p> : answer ? <><span className="insight-overline">ANALYSIS</span><p>{answer}</p></> : <><span className="answer-star"><Sparkles size={16} /></span><strong>Your analysis will appear here</strong><span>Choose a guided prompt or ask a question about your project pipeline.</span></>}
          </div>
        </section>
      </section>
    </main>
  );
}