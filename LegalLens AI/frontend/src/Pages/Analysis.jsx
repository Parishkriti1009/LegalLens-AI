import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Scale,
  UploadCloud,
  FileText,
  FileSearch,
  Bot,
  Gavel,
  ShieldCheck,
  ClipboardCheck,
  ArrowDown,
  Sparkles,
  AlertTriangle,
  ListChecks,
  MessageSquareText,
  Workflow,
  Layers,
  ChevronDown,
  Lock,
} from "lucide-react";

// ---------------------------------------------------------------------------
// LegalLens AI — Analysis Input Page
// Single-file React + Tailwind component. No external UI/animation libraries.
// ---------------------------------------------------------------------------

const DOCUMENT_TYPES = [
  "Employment Contract",
  "Rental Agreement",
  "NDA",
  "Privacy Policy",
  "Terms & Conditions",
  "Service Agreement",
  "Other",
];

const USER_ROLES = [
  "Employee",
  "Employer",
  "Tenant",
  "Landlord",
  "Client",
  "Business Owner",
  "General User",
];

const ANALYSIS_GOALS = [
  { value: "comprehensive", label: "Comprehensive Analysis", hint: "Full read-through, clause by clause" },
  { value: "risk", label: "Risk Assessment", hint: "Surface clauses that could work against you" },
  { value: "compliance", label: "Compliance Review", hint: "Check against relevant regulations" },
  { value: "simplified", label: "Simplified Explanation", hint: "Plain-language rewrite of the document" },
  { value: "clause", label: "Clause Explanation", hint: "Explain a specific clause in detail" },
  { value: "custom", label: "Custom Question", hint: "Ask the AI Agent anything about the document" },
];

const WORKFLOW_STEPS = [
  { icon: UploadCloud, title: "Upload PDF", desc: "Document is securely ingested and parsed" },
  { icon: Layers, title: "RAG Processing", desc: "Text is chunked and indexed for retrieval" },
  { icon: Bot, title: "AI Agent Routing", desc: "Query routed to the right specialist agent" },
  { icon: Gavel, title: "Legal Analysis", desc: "Clauses interpreted against legal context" },
  { icon: ShieldCheck, title: "Compliance Check", desc: "Cross-checked against relevant regulations" },
  { icon: ClipboardCheck, title: "Final Report", desc: "Structured findings, risks, and summary" },
];

const FEATURES = [
  { icon: Sparkles, label: "AI Summary" },
  { icon: AlertTriangle, label: "Risk Detection" },
  { icon: ListChecks, label: "Compliance Checklist" },
  { icon: FileSearch, label: "Clause Explanation" },
  { icon: MessageSquareText, label: "RAG-based Q&A" },
  { icon: Workflow, label: "AI Agent Routing" },
  { icon: Layers, label: "Multi-LLM Analysis" },
];

function SectionLabel({ index, children }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#2563EB]/15 text-[#60A5FA] text-[10px] font-semibold border border-[#2563EB]/30">
        {index}
      </span>
      <label className="text-sm font-medium text-[#F8FAFC] tracking-wide">{children}</label>
    </div>
  );
}

function Dropdown({ id, value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-lg bg-[#0B1120] border border-[#334155] text-[#F8FAFC] text-sm px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-colors duration-150 cursor-pointer hover:border-[#475569]"
      >
        <option value="" disabled className="text-[#94A3B8]">
          {placeholder}
        </option>
        {options.map((opt) =>
          typeof opt === "string" ? (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        )}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
    </div>
  );
}

export default function LegalLensAnalysisPage() {
  const [file, setFile] = useState(null);
const [fileName, setFileName] = useState(null);
const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [docType, setDocType] = useState("");
  const [userRole, setUserRole] = useState("");
  const [analysisGoal, setAnalysisGoal] = useState("");
  const [context, setContext] = useState("");
  const [question, setQuestion] = useState("");

  const navigate = useNavigate();

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
  setFile(file);
  setFileName(file.name);
}
  }, []);

 const handleFileSelect = (e) => {
  const selectedFile = e.target.files?.[0];

  if (selectedFile) {
    setFile(selectedFile);
    setFileName(selectedFile.name);
  }
};

  const selectedGoal = ANALYSIS_GOALS.find((g) => g.value === analysisGoal);

  return (
    <div className="min-h-screen w-full bg-[#0B1120] text-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Header */}
        <header className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#111827] border border-[#334155]">
              <Scale className="w-5 h-5 text-[#2563EB]" strokeWidth={1.75} />
              <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-[#22C55E] ring-2 ring-[#0B1120]">
                <Lock className="w-2.5 h-2.5 text-[#0B1120]" strokeWidth={3} />
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F8FAFC]">
              LegalLens <span className="text-[#2563EB]">AI</span>
            </h1>
          </div>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl">
            AI-Powered Legal &amp; Compliance Assistant
          </p>
        </header>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8 items-start">
          {/* LEFT: Analysis form */}
          <div className="rounded-2xl border border-[#334155]/70 bg-[#111827]/60 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-semibold text-[#F8FAFC]">New Document Analysis</h2>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Upload a document and tell the AI Agent what you need
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span className="text-[11px] font-medium text-[#22C55E]">Encrypted &amp; Confidential</span>
              </div>
            </div>

            {/* 1. Upload */}
            <div className="mb-7">
              <SectionLabel index={1}>Upload Document</SectionLabel>
              <label
                htmlFor="file-upload"
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`group flex flex-col items-center justify-center gap-3 w-full rounded-xl border-2 border-dashed px-6 py-10 text-center cursor-pointer transition-colors duration-200 ${
                  isDragging
                    ? "border-[#2563EB] bg-[#2563EB]/5"
                    : "border-[#334155] bg-[#0B1120] hover:border-[#2563EB]/60 hover:bg-[#2563EB]/[0.03]"
                }`}
              >
                <input id="file-upload" type="file" accept="application/pdf" className="hidden" onChange={handleFileSelect} />
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1E293B] border border-[#334155] group-hover:border-[#2563EB]/50 transition-colors">
                  <UploadCloud className="w-5 h-5 text-[#2563EB]" strokeWidth={1.75} />
                </div>
                {fileName ? (
                  <div className="flex items-center gap-2 text-sm text-[#F8FAFC]">
                    <FileText className="w-4 h-4 text-[#22C55E]" />
                    <span className="font-medium">{fileName}</span>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-[#F8FAFC]">
                      Drag &amp; drop your PDF here, or <span className="text-[#2563EB]">browse</span>
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-1">PDF only · Max 20MB</p>
                  </div>
                )}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-1">
                  {["Employment Contracts", "Rental Agreements", "NDAs", "Privacy Policies", "Terms & Conditions", "Service Agreements"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-[#1E293B] border border-[#334155] text-[#94A3B8]"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </label>
            </div>

            {/* 2 & 3. Document Type + User Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
              <div>
                <SectionLabel index={2}>Document Type</SectionLabel>
                <Dropdown
                  id="doc-type"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  options={DOCUMENT_TYPES}
                  placeholder="Select document type"
                />
              </div>
              <div>
                <SectionLabel index={3}>Your Role</SectionLabel>
                <Dropdown
                  id="user-role"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  options={USER_ROLES}
                  placeholder="Select your role"
                />
              </div>
            </div>

            {/* 4. Analysis Goal */}
            <div className="mb-7">
              <SectionLabel index={4}>Analysis Goal</SectionLabel>
              <Dropdown
                id="analysis-goal"
                value={analysisGoal}
                onChange={(e) => setAnalysisGoal(e.target.value)}
                options={ANALYSIS_GOALS}
                placeholder="What should the AI Agent do?"
              />
              {selectedGoal && (
                <p className="text-xs text-[#94A3B8] mt-2 pl-1">{selectedGoal.hint}</p>
              )}
            </div>

            {/* 5. Additional Context */}
            <div className="mb-7">
              <SectionLabel index={5}>Additional Context</SectionLabel>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={3}
                placeholder="I'm joining a startup and would like the AI to identify hidden clauses and explain them in simple language."
                className="w-full resize-none rounded-lg bg-[#0B1120] border border-[#334155] text-[#F8FAFC] text-sm px-4 py-3 placeholder:text-[#94A3B8]/70 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-colors duration-150 hover:border-[#475569]"
              />
            </div>

            {/* 6. Ask a Question */}
            <div className="mb-8">
              <SectionLabel index={6}>Ask a Question</SectionLabel>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Can I terminate this contract before one year?"
                className="w-full rounded-lg bg-[#0B1120] border border-[#334155] text-[#F8FAFC] text-sm px-4 py-3 placeholder:text-[#94A3B8]/70 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] transition-colors duration-150 hover:border-[#475569]"
              />
            </div>

            {/* Submit */}
         <button
disabled={loading}
type="button"
  onClick={async () => {

  if (!file) {
    alert("Please upload PDF first");
    return;
  }


  try {

    setLoading(true);


    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    formData.append(
      "question",
      question || "Analyze this legal document"
    );


    const response = await axios.post(
      "http://127.0.0.1:8000/analyze",
      formData,
      {
        headers:{
          "Content-Type":"multipart/form-data"
        },
        timeout: 300000
      }
);
      


    console.log(response.data);


    
navigate("/result", {
  state:{
    fileName:fileName,

    question: question || "Analyze this legal document",

    summary:
    response.data.analysis.summary,

    riskAnalysis:
    response.data.analysis.risk_analysis
  }
});


  } catch(error){

    console.log(error);
    alert("Analysis failed");

  }
  finally{

    setLoading(false);

  }

}}
  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white text-sm font-semibold py-3.5"
>
  <span>
{
 loading 
 ? "⏳"
 : "🚀"
}
</span>

<span>
{
 loading
 ? "Analysing..."
 : "Analyse Document"
}
</span>
</button>
          </div>

          {/* RIGHT: Workflow + Features */}
          <div className="flex flex-col gap-6">
            {/* Workflow card */}
            <div className="rounded-2xl border border-[#334155]/70 bg-[#1E293B]/60 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-6">
                <Workflow className="w-4 h-4 text-[#2563EB]" />
                <h3 className="text-sm font-semibold text-[#F8FAFC] tracking-wide">How LegalLens AI Works</h3>
              </div>
              <div className="relative pl-2">
                {WORKFLOW_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isLast = i === WORKFLOW_STEPS.length - 1;
                  return (
                    <div key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
                      {!isLast && (
                        <span className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-[#334155] to-transparent" />
                      )}
                      <div className="relative z-10 flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-[#0B1120] border border-[#334155]">
                        <Icon className="w-4 h-4 text-[#2563EB]" strokeWidth={1.75} />
                      </div>
                      <div className="pt-1.5">
                        <p className="text-sm font-medium text-[#F8FAFC]">{step.title}</p>
                        <p className="text-xs text-[#94A3B8] mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Features card */}
            <div className="rounded-2xl border border-[#334155]/70 bg-[#1E293B]/60 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="text-sm font-semibold text-[#F8FAFC] tracking-wide">Features</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {FEATURES.map((f) => {
                  const Icon = f.icon;
                  return (
                    <li
                      key={f.label}
                      className="flex items-center gap-2.5 rounded-lg border border-[#334155]/60 bg-[#0B1120]/50 px-3 py-2.5 hover:border-[#2563EB]/40 transition-colors duration-150"
                    >
                      <Icon className="w-4 h-4 text-[#2563EB] shrink-0" strokeWidth={1.75} />
                      <span className="text-xs text-[#F8FAFC]">{f.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-xl border border-[#334155]/60 bg-[#111827]/50 px-5 py-4 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            This AI provides educational legal insights and should not replace advice from a qualified legal professional.
          </p>
        </div>
      </div>
    </div>
  );
}