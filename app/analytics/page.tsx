"use client";

import { api } from "@/lib/api";
import type { Project } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, ChartNoAxesCombined, CircleDollarSign, Target } from "lucide-react";

export default function AnalyticsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Project[]>("/projects")
      .then(setProjects)
      .catch((loadError: unknown) => setError(loadError instanceof Error ? loadError.message : "Could not load analytics."))
      .finally(() => setIsLoading(false));
  }, []);

  const analysis = useMemo(() => {
    const byStatus = projects.reduce<Record<string, { count: number; budget: number }>>((groups, project) => {
      const status = project.status || "Unspecified";
      groups[status] ??= { count: 0, budget: 0 };
      groups[status].count += 1;
      groups[status].budget += project.budget ?? 0;
      return groups;
    }, {});
    const closed = projects.filter((project) => ["won", "closed", "completed", "lost"].includes((project.status || "").toLowerCase()));
    const won = projects.filter((project) => ["won", "completed"].includes((project.status || "").toLowerCase())).length;
    const budgeted = projects.filter((project) => project.budget != null);

    return {
      byStatus: Object.entries(byStatus).sort((first, second) => second[1].budget - first[1].budget),
      totalBudget: projects.reduce((total, project) => total + (project.budget ?? 0), 0),
      winRate: closed.length ? Math.round((won / closed.length) * 100) : 0,
      averageBudget: budgeted.length ? Math.round(budgeted.reduce((total, project) => total + (project.budget ?? 0), 0) / budgeted.length) : 0,
      maxBudget: Math.max(...Object.values(byStatus).map((group) => group.budget), 0),
      topProjects: [...projects].sort((first, second) => (second.budget ?? 0) - (first.budget ?? 0)).slice(0, 4),
    };
  }, [projects]);

  return (
    <main className="insights-page analytics-page">
      <header className="insights-heading">
        <div>
          <div className="insights-kicker"><ChartNoAxesCombined size={15} /> PERFORMANCE OVERVIEW</div>
          <h1>Pipeline analytics</h1>
          <p>A live read on deal value, stage mix, and your largest opportunities.</p>
        </div>
        <div className="live-chip"><span /> Live project data</div>
      </header>

      <section className="insight-metrics" aria-label="Pipeline metrics">
        <article className="insight-metric insight-metric-featured">
          <div className="insight-metric-icon"><CircleDollarSign size={19} /></div>
          <p>Total pipeline</p>
          <strong>${analysis.totalBudget.toLocaleString()}</strong>
          <span>Across {projects.length} active records</span>
        </article>
        <article className="insight-metric">
          <div className="insight-metric-icon insight-icon-coral"><Target size={18} /></div>
          <p>Closed win rate</p>
          <strong>{analysis.winRate}<small>%</small></strong>
          <span>Won or completed / closed</span>
        </article>
        <article className="insight-metric">
          <div className="insight-metric-icon insight-icon-blue"><BriefcaseBusiness size={18} /></div>
          <p>Average project</p>
          <strong>${analysis.averageBudget.toLocaleString()}</strong>
          <span>Among budgeted projects</span>
        </article>
      </section>

      <section className="insight-content-grid">
        <article className="insight-panel stage-panel">
          <div className="insight-panel-heading">
            <div><span className="insight-overline">DEAL DISTRIBUTION</span><h2>Pipeline by stage</h2></div>
            <span className="stage-total">{projects.length} total</span>
          </div>
          {isLoading ? <p className="insight-state" role="status">Gathering project data...</p> : error ? <p className="insight-state insight-error" role="alert">{error}</p> : analysis.byStatus.length === 0 ? <p className="insight-state">Your stage breakdown will appear once projects are added.</p> : (
            <div className="stage-list">
              {analysis.byStatus.map(([status, group], index) => (
                <div className="stage-row" key={status}>
                  <div className="stage-label"><span className={`stage-dot stage-dot-${index % 4}`} /><strong>{status}</strong><span>{group.count} {group.count === 1 ? "project" : "projects"}</span><b>${group.budget.toLocaleString()}</b></div>
                  <div className="stage-track" role="img" aria-label={`${status}: ${group.count} projects, $${group.budget.toLocaleString()}`}>
                    <div className={`stage-fill stage-fill-${index % 4}`} style={{ width: `${analysis.maxBudget ? Math.max(3, (group.budget / analysis.maxBudget) * 100) : 0}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
          <a className="insight-inline-link" href="/projects">Explore all projects <ArrowUpRight size={15} /></a>
        </article>

        <article className="insight-panel opportunities-panel">
          <div className="insight-panel-heading">
            <div><span className="insight-overline">WHERE TO LOOK</span><h2>Largest opportunities</h2></div>
            <span className="opportunity-mark"><ArrowUpRight size={17} /></span>
          </div>
          {isLoading ? <p className="insight-state" role="status">Loading opportunities...</p> : error ? <p className="insight-state insight-error" role="alert">Analysis unavailable. Check the project API connection.</p> : analysis.topProjects.length === 0 ? <p className="insight-state">No opportunities to rank yet.</p> : (
            <div className="opportunity-list">
              {analysis.topProjects.map((project, index) => (
                <a className="opportunity-row" href={`/projects/${project.id}`} key={project.id}>
                  <span className={`opportunity-rank rank-${index}`}>{String(index + 1).padStart(2, "0")}</span>
                  <span className="opportunity-info"><strong>{project.title}</strong><small>{project.status || "Unstaged"}</small></span>
                  <b>${(project.budget ?? 0).toLocaleString()}</b>
                  <ArrowUpRight className="opportunity-arrow" size={15} />
                </a>
              ))}
            </div>
          )}
          <div className="opportunity-footnote">Ranked by project budget</div>
        </article>
      </section>
    </main>
  );
}
