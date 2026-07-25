import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Scale,
  Lock,
  FileText,
  Download,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  ChevronDown,
  MessageSquareText,
  Sparkles,
  Gavel,
  Layers,
  Bot,
  UploadCloud,
  ClipboardCheck,
  FileSearch,
} from "lucide-react";

// ---------------------------------------------------------------------------
// LegalLens AI — Analysis Results Dashboard
// Single-file React + Tailwind component. No external UI/animation libraries.
// Placeholder data throughout — swap for real API responses.
// ---------------------------------------------------------------------------

const DOCUMENT_META = {
  fileName: "Employment_Agreement_Draft.pdf",
  docType: "Employment Contract",
  userRole: "Employee",
  analysisGoal: "Risk Assessment",
  timestamp: "24 Jul 2026, 6:42 PM",
};

const STATS = {
  healthScore: 72,
  healthStatus: "Moderate Risk",
  riskLevel: "Medium",
  complianceScore: 84,
  criticalClauses: 3,
};

const RISK_FINDINGS = {
  high: [
    { title: "Non-compete clause is broad", detail: "Restricts employment in the same industry for 24 months, nationwide." },
    { title: "Unilateral termination rights", detail: "Employer may terminate without notice for undefined 'cause'." },
  ],
  medium: [
    { title: "Ambiguous IP assignment", detail: "Covers work created 'in connection with' employment, not just work hours." },
    { title: "Bonus clause is discretionary", detail: "No defined criteria or minimum guarantee for the performance bonus." },
  ],
  low: [
    { title: "Standard confidentiality term", detail: "Survives 3 years post-termination — within typical market range." },
  ],
};

const COMPLIANCE_ITEMS = [
  { label: "Minimum notice period disclosed", met: true },
  { label: "Statutory leave entitlements included", met: true },
  { label: "Data protection clause present", met: true },
  { label: "Equal opportunity statement included", met: true },
  { label: "Overtime compensation defined", met: false },
  { label: "Dispute resolution process specified", met: false },
];

const compliancePct = Math.round(
  (COMPLIANCE_ITEMS.filter((i) => i.met).length / COMPLIANCE_ITEMS.length) * 100
);

const KEY_CLAUSES = [
  { name: "Termination", summary: "Either party may terminate with 30 days' written notice; employer retains immediate-cause exit.", significance: "Defines how and when the relationship can end — review the 'cause' definition closely." },
  { name: "Liability", summary: "Employee liability is capped at gross negligence or willful misconduct.", significance: "Protects you from being held responsible for ordinary business losses." },
  { name: "Confidentiality", summary: "Standard NDA-style clause covering trade secrets and client data, surviving 3 years post-exit.", significance: "Common and enforceable — no unusual restrictions found." },
  { name: "Intellectual Property", summary: "All work product 'in connection with' employment is assigned to the employer.", significance: "Broader than work-hours-only clauses — could cover side projects." },
  { name: "Payment Terms", summary: "Monthly salary with a discretionary annual bonus, no guaranteed minimum.", significance: "Bonus isn't contractually guaranteed — treat it as variable income." },
  { name: "Governing Law", summary: "Agreement is governed by the laws of the state where the employer is headquartered.", significance: "Determines which courts and statutes apply in a dispute." },
  { name: "Data Protection", summary: "References compliance with applicable data protection regulation for employee and client data.", significance: "Confirms baseline data-handling obligations are acknowledged." },
];

const WORKFLOW_STEPS = [
  { icon: UploadCloud, title: "PDF Uploaded" },
  { icon: FileText, title: "Text Extraction" },
  { icon: Layers, title: "RAG Retrieval" },
  { icon: Bot, title: "AI Agent Routing" },
  { icon: FileSearch, title: "Multi-LLM Analysis" },
  { icon: ClipboardCheck, title: "Final Report" },
];




function ScoreRing({ value, size = 96, stroke = 8 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 80 ? "#22C55E" : value >= 50 ? "#F59E0B" : "#EF4444";

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#334155" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-[#F8FAFC]">{value}</span>
        <span className="text-[10px] text-[#94A3B8]">/ 100</span>
      </div>
    </div>
  );
}

function StatCard({ label, children, accent }) {
  return (
    <div className="rounded-2xl border border-[#334155]/70 bg-[#1E293B]/60 backdrop-blur-xl shadow-[0_8px_30px_-14px_rgba(0,0,0,0.5)] p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#94A3B8] tracking-wide">{label}</span>
        {accent}
      </div>
      {children}
    </div>
  );
}

function RiskGroup({ level, items, color, Icon }) {
  if (!items.length) return null;
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4" style={{ color }} />
        <span className="text-xs font-semibold tracking-wide" style={{ color }}>
          {level} Risk
        </span>
        <span
          className="text-[10px] font-medium rounded-full px-2 py-0.5 border"
          style={{ color, borderColor: `${color}4D`, backgroundColor: `${color}1A` }}
        >
          {items.length}
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <div key={item.title} className="rounded-lg border border-[#334155]/60 bg-[#0B1120]/50 px-4 py-3">
            <p className="text-sm font-medium text-[#F8FAFC]">{item.title}</p>
            <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClauseAccordion({ clause, isOpen, onToggle }) {
  return (
    <div className="rounded-lg border border-[#334155]/60 bg-[#0B1120]/50 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#2563EB]/[0.04] transition-colors duration-150"
      >
        <span className="text-sm font-medium text-[#F8FAFC]">{clause.name}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#94A3B8] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-1 border-t border-[#334155]/50">
          <p className="text-xs text-[#CBD5E1] leading-relaxed mb-2">{clause.summary}</p>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            <span className="text-[#2563EB] font-medium">Why it matters — </span>
            {clause.significance}
          </p>
        </div>
      )}
    </div>
  );
}

export default function LegalLensResultsDashboard() {
  const [openClause, setOpenClause] = useState("Termination");

  const { state } = useLocation();

  const summary =
    state?.summary ||
    "No summary generated";

  const riskAnalysis =
    state?.riskAnalysis ||
    "No risk analysis generated";

  const AI_QUESTION =
    state?.question ||
    "Analyze this legal document";
  const aiResponse =
    state?.answer ||
    state?.response ||
    "No response generated for your question";
  const navigate = useNavigate();

  const documentMeta = {
    fileName: state?.fileName || "Employment_Agreement_Draft.pdf",
    docType: state?.docType || "Employment Contract",
    userRole: state?.userRole || "Employee",
    analysisGoal: state?.analysisGoal || "Risk Assessment",
    timestamp: new Date().toLocaleString(),
  };

  return (
    <div className="min-h-screen w-full bg-[#0B1120] text-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
          <div className="flex items-start gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#111827] border border-[#334155] shrink-0">
              <Scale className="w-5 h-5 text-[#2563EB]" strokeWidth={1.75} />
              <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-[#22C55E] ring-2 ring-[#0B1120]">
                <Lock className="w-2.5 h-2.5 text-[#0B1120]" strokeWidth={3} />
              </span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F8FAFC]">
                Analysis Results
              </h1>
              <p className="text-sm text-[#94A3B8] mt-1">
                AI-generated legal insights powered by RAG and AI Agents
              </p>
            </div>
          </div>

          {/* Document info card */}
          <div className="w-full lg:w-[320px] shrink-0 rounded-2xl border border-[#334155]/70 bg-[#1E293B]/60 backdrop-blur-xl shadow-[0_8px_30px_-14px_rgba(0,0,0,0.5)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span className="text-sm font-medium text-[#F8FAFC] truncate">{documentMeta.fileName}</span>
            </div>
            <dl className="grid grid-cols-2 gap-y-1.5 text-xs mb-4">
              <dt className="text-[#94A3B8]">Type</dt>
              <dd className="text-[#F8FAFC] text-right">{documentMeta.docType}</dd>
              <dt className="text-[#94A3B8]">Role</dt>
              <dd className="text-[#F8FAFC] text-right">{documentMeta.userRole}</dd>
              <dt className="text-[#94A3B8]">Goal</dt>
              <dd className="text-[#F8FAFC] text-right">{documentMeta.analysisGoal}</dd>
              <dt className="text-[#94A3B8]">Analysed</dt>
              <dd className="text-[#F8FAFC] text-right">{documentMeta.timestamp}</dd>
            </dl>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold py-2.5 transition-colors duration-150"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Analyse Another Document
              </button>
              <button
type="button"
onClick={() => navigate("/analyze")}
                className="flex items-center justify-center gap-2 rounded-lg border border-[#334155] hover:border-[#475569] bg-[#0B1120] text-[#F8FAFC] text-xs font-semibold py-2.5 transition-colors duration-150"
              >
                <Download className="w-3.5 h-3.5" />
                Download Report
              </button>
            </div>
          </div>
        </header>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          <StatCard label="Document Health Score">
            <div className="flex items-center gap-3">
              <ScoreRing value={STATS.healthScore} size={72} stroke={6} />
              <div>
                <p className="text-sm font-medium text-[#F59E0B]">{STATS.healthStatus}</p>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">Overall assessment</p>
              </div>
            </div>
          </StatCard>

          <StatCard label="Risk Level" accent={<AlertTriangle className="w-4 h-4 text-[#F59E0B]" />}>
            <div>
              <p className="text-2xl font-semibold text-[#F59E0B]">{STATS.riskLevel}</p>
              <p className="text-[11px] text-[#94A3B8] mt-1">2 high-risk clauses need review</p>
            </div>
          </StatCard>

          <StatCard label="Compliance Score" accent={<ShieldCheck className="w-4 h-4 text-[#22C55E]" />}>
            <div>
              <p className="text-2xl font-semibold text-[#22C55E]">{STATS.complianceScore}%</p>
              <p className="text-[11px] text-[#94A3B8] mt-1">Against relevant statutes</p>
            </div>
          </StatCard>

          <StatCard label="Critical Clauses" accent={<AlertOctagon className="w-4 h-4 text-[#EF4444]" />}>
            <div>
              <p className="text-2xl font-semibold text-[#EF4444]">{STATS.criticalClauses}</p>
              <p className="text-[11px] text-[#94A3B8] mt-1">Flagged for immediate attention</p>
            </div>
          </StatCard>
        </div>

        {/* Two-column dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8 items-start">
          {/* LEFT column */}
          <div className="flex flex-col gap-6">
            {/* AI Summary */}
            <div className="rounded-2xl border border-[#334155]/70 bg-[#111827]/60 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                <h3 className="text-sm font-semibold text-[#F8FAFC] tracking-wide">AI Summary</h3>
              </div>
              <p className="text-sm text-[#CBD5E1] leading-relaxed mb-3 whitespace-pre-line">
  {summary}
</p>
              <ul className="space-y-2">
                {[
                  "Base compensation and standard benefits are clearly defined and market-typical.",
                  "A 24-month, nationwide non-compete clause is unusually broad.",
                  "Termination can occur with 30 days' notice, or immediately for undefined 'cause'.",
                  "IP assignment extends beyond work hours to anything 'in connection with' the role.",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-[#CBD5E1]">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk Analysis */}
            <div className="rounded-2xl border border-[#334155]/70 bg-[#111827]/60 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="text-sm font-semibold text-[#F8FAFC] tracking-wide">Risk Analysis</h3>
              </div>
              <div className="rounded-xl border border-[#334155]/60 bg-[#0B1120]/50 p-4">
  <p className="text-sm text-[#CBD5E1] leading-relaxed whitespace-pre-line">
    {riskAnalysis}
  </p>
</div>
            </div>

            {/* Compliance Checklist */}
            <div className="rounded-2xl border border-[#334155]/70 bg-[#111827]/60 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] p-6 sm:p-7">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                  <h3 className="text-sm font-semibold text-[#F8FAFC] tracking-wide">Compliance Checklist</h3>
                </div>
                <span className="text-xs font-semibold text-[#22C55E] rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-2.5 py-1">
                  {compliancePct}% compliant
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {COMPLIANCE_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg border border-[#334155]/60 bg-[#0B1120]/50 px-4 py-2.5"
                  >
                    {item.met ? (
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#EF4444] shrink-0" />
                    )}
                    <span className={`text-sm ${item.met ? "text-[#F8FAFC]" : "text-[#94A3B8]"}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT column */}
          <div className="flex flex-col gap-6">
            {/* AI Response */}
            <div className="rounded-2xl border border-[#2563EB]/40 bg-[#111827]/60 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquareText className="w-4 h-4 text-[#2563EB]" />
                <h3 className="text-sm font-semibold text-[#F8FAFC] tracking-wide">AI Response</h3>
              </div>
              <p className="text-xs text-[#94A3B8] mb-3">Your question</p>
              <p className="text-sm text-[#F8FAFC] font-medium mb-4">{AI_QUESTION}</p>
              <div className="rounded-xl border-l-2 border-[#2563EB] bg-[#2563EB]/[0.06] px-4 py-3.5">
                <p className="text-sm text-[#CBD5E1] leading-relaxed whitespace-pre-line">
  {aiResponse}
</p>
              </div>
            </div>

            {/* Key Clauses */}
            <div className="rounded-2xl border border-[#334155]/70 bg-[#111827]/60 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-5">
                <Gavel className="w-4 h-4 text-[#2563EB]" />
                <h3 className="text-sm font-semibold text-[#F8FAFC] tracking-wide">Key Clauses Identified</h3>
              </div>
              <div className="flex flex-col gap-2.5">
                {KEY_CLAUSES.map((clause) => (
                  <ClauseAccordion
                    key={clause.name}
                    clause={clause}
                    isOpen={openClause === clause.name}
                    onToggle={() => setOpenClause(openClause === clause.name ? null : clause.name)}
                  />
                ))}
              </div>
            </div>

            {/* AI Processing Workflow */}
            <div className="rounded-2xl border border-[#334155]/70 bg-[#1E293B]/60 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-6">
                <Layers className="w-4 h-4 text-[#2563EB]" />
                <h3 className="text-sm font-semibold text-[#F8FAFC] tracking-wide">AI Processing Workflow</h3>
              </div>
              <div className="relative pl-2">
                {WORKFLOW_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isLast = i === WORKFLOW_STEPS.length - 1;
                  return (
                    <div key={step.title} className="relative flex items-center gap-4 pb-5 last:pb-0">
                      {!isLast && (
                        <span className="absolute left-[19px] top-10 bottom-0 w-px bg-[#22C55E]/40" />
                      )}
                      <div className="relative z-10 flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-[#0B1120] border border-[#22C55E]/50">
                        <Icon className="w-4 h-4 text-[#22C55E]" strokeWidth={1.75} />
                      </div>
                      <div className="flex items-center justify-between flex-1">
                        <p className="text-sm font-medium text-[#F8FAFC]">{step.title}</p>
                        <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-xl border border-[#334155]/60 bg-[#111827]/50 px-5 py-4 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            This analysis is generated using AI and Retrieval-Augmented Generation (RAG) for
            educational purposes. It should not be considered professional legal advice. Always
            consult a qualified legal professional before making legal decisions.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-6 text-center">
          <p className="text-[11px] text-[#64748B]">
            Powered by React, Tailwind CSS, FastAPI, LangChain, FAISS, Gemini, OpenAI, RAG &amp; AI Agents
          </p>
        </footer>
      </div>
    </div>
  );
}