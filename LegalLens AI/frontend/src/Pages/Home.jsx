import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Scale,
  Lock,
  Sparkles,
  Layers,
  Bot,
  AlertTriangle,
  ShieldCheck,
  FileSearch,
  Gauge,
  FileText,
  UploadCloud,
  Cpu,
  Search,
  Route,
  MessageSquareText,
  ClipboardCheck,
  Zap,
  ShieldHalf,
  Target,
  Eye,
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertOctagon,
  XCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// LegalLens AI — Landing Page
// Single-file React + Tailwind component. No external UI/animation libraries.
// ---------------------------------------------------------------------------

const NAV_LINKS = ["Home", "Features", "About"];

const FEATURES = [
  { icon: Sparkles, title: "AI-Powered Legal Analysis", desc: "Multi-model reasoning reads contracts the way a trained associate would." },
  { icon: Layers, title: "Retrieval-Augmented Generation", desc: "Answers are grounded in your actual document, not general assumptions." },
  { icon: Route, title: "AI Agent Routing", desc: "Each query is routed to the specialist agent best suited to handle it." },
  { icon: AlertTriangle, title: "Risk Detection", desc: "Automatically flags clauses that could work against you or your business." },
  { icon: ShieldCheck, title: "Compliance Checklist", desc: "Cross-checks documents against relevant regulatory requirements." },
  { icon: FileSearch, title: "Clause Explanation", desc: "Plain-language breakdowns of dense legal language, clause by clause." },
  { icon: Cpu, title: "Multi-LLM Intelligence", desc: "Combines Gemini and OpenAI for more reliable, cross-verified insight." },
  { icon: Lock, title: "Secure PDF Document Analysis", desc: "Documents are processed with encryption and never used for training." },
];

const WORKFLOW_STEPS = [
  { icon: UploadCloud, title: "Upload Legal Document", desc: "Add any contract, policy, or agreement as a PDF." },
  { icon: FileText, title: "AI Processes the PDF", desc: "Text is extracted and structured for analysis." },
  { icon: Search, title: "RAG Retrieves Relevant Information", desc: "Indexed for accurate, grounded retrieval." },
  { icon: Route, title: "AI Agent Selects the Analysis", desc: "The right specialist agent is chosen for your goal." },
  { icon: Bot, title: "Gemini & OpenAI Generate Insights", desc: "Multiple models cross-check the findings." },
  { icon: ClipboardCheck, title: "View Summary, Risks & Compliance", desc: "Results delivered in a clear, structured report." },
];

const WHY_CARDS = [
  { icon: Zap, title: "Faster Legal Understanding", desc: "Turn a 40-page contract into a clear summary in minutes, not hours." },
  { icon: ShieldHalf, title: "Enterprise-Level Security", desc: "Documents are encrypted in transit and at rest, always." },
  { icon: Target, title: "Context-Aware Answers with RAG", desc: "Every answer is retrieved directly from your uploaded document." },
  { icon: Eye, title: "Explainable AI Insights", desc: "No black boxes — every finding comes with a clear rationale." },
];

const TECH_STACK = [
  "React", "Tailwind CSS", "FastAPI", "LangChain", "FAISS",
  "Google Gemini", "OpenAI", "RAG", "AI Agents",
];

const FOOTER_LINKS = ["Home", "Features", "About", "GitHub", "Contact"];

function Logo({ size = "md" }) {
  const dims = size === "sm" ? "w-9 h-9" : "w-11 h-11";
  const iconDims = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className={`relative flex items-center justify-center ${dims} rounded-xl bg-[#111827] border border-[#334155] shrink-0`}>
      <Scale className={`${iconDims} text-[#2563EB]`} strokeWidth={1.75} />
      <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#22C55E] ring-2 ring-[#0B1120]">
        <Lock className="w-2 h-2 text-[#0B1120]" strokeWidth={3} />
      </span>
    </div>
  );
}

function SectionEyebrow({ children }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-3">
      <span className="w-6 h-px bg-[#2563EB]/50" />
      <span className="text-xs font-semibold tracking-[0.15em] text-[#2563EB] uppercase">{children}</span>
      <span className="w-6 h-px bg-[#2563EB]/50" />
    </div>
  );
}

function MockDashboardPreview() {
  return (
    <div className="rounded-2xl border border-[#334155]/70 bg-[#111827]/80 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] p-5 sm:p-6">
      {/* fake window chrome */}
      <div className="flex items-center gap-1.5 mb-5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]/60" />
        <span className="ml-3 text-[11px] text-[#64748B]">Analysis Results — Employment_Agreement.pdf</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="rounded-xl border border-[#334155]/60 bg-[#1E293B]/70 p-3.5">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[11px] font-medium text-[#F8FAFC]">AI Summary</span>
          </div>
          <div className="space-y-1.5">
            <span className="block h-1.5 rounded-full bg-[#334155] w-full" />
            <span className="block h-1.5 rounded-full bg-[#334155] w-4/5" />
            <span className="block h-1.5 rounded-full bg-[#334155] w-3/5" />
          </div>
        </div>
        <div className="rounded-xl border border-[#334155]/60 bg-[#1E293B]/70 p-3.5">
          <div className="flex items-center gap-1.5 mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="text-[11px] font-medium text-[#F8FAFC]">Risk Analysis</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <AlertOctagon className="w-3 h-3 text-[#EF4444]" />
              <span className="block h-1.5 rounded-full bg-[#334155] w-3/4" />
            </div>
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3 text-[#F59E0B]" />
              <span className="block h-1.5 rounded-full bg-[#334155] w-1/2" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-[#334155]/60 bg-[#1E293B]/70 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[11px] font-medium text-[#F8FAFC]">Compliance</span>
            </div>
            <span className="text-[10px] font-semibold text-[#22C55E]">84%</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />
              <span className="block h-1.5 rounded-full bg-[#334155] w-2/3" />
            </div>
            <div className="flex items-center gap-1.5">
              <XCircle className="w-3 h-3 text-[#EF4444]" />
              <span className="block h-1.5 rounded-full bg-[#334155] w-1/2" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border-l-2 border-[#2563EB] bg-[#2563EB]/[0.08] p-3.5">
          <div className="flex items-center gap-1.5 mb-2">
            <MessageSquareText className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[11px] font-medium text-[#F8FAFC]">AI Response</span>
          </div>
          <div className="space-y-1.5">
            <span className="block h-1.5 rounded-full bg-[#334155] w-full" />
            <span className="block h-1.5 rounded-full bg-[#334155] w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LegalLensLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#0B1120] text-[#F8FAFC] font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-20 border-b border-[#334155]/60 bg-[#0B1120]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size="sm" />
            <span className="text-base font-semibold tracking-tight">
              LegalLens <span className="text-[#2563EB]">AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-150"
              >
                {link}
              </a>
            ))}
          </div>
          <button
  type="button"
  onClick={() => navigate("/analyze")}
  className="rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold px-4 py-2 transition-colors duration-150"
>
  Get Started
</button>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.12),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#334155] bg-[#111827] px-3.5 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span className="text-xs font-medium text-[#94A3B8]">AI + RAG + Agents, purpose-built for legal review</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-tight leading-[1.1] mb-6">
                Understand Legal Documents with AI in Minutes
              </h1>
              <p className="text-base text-[#94A3B8] leading-relaxed mb-8 max-w-xl">
                LegalLens AI analyses contracts, agreements, policies, and legal documents using
                Artificial Intelligence, Retrieval-Augmented Generation (RAG), and AI Agents —
                turning dense legal language into clear, actionable insight.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
  type="button"
  onClick={() => navigate("/analyze")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold px-6 py-3.5 shadow-[0_4px_20px_-4px_rgba(37,99,235,0.5)] transition-colors duration-150"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#334155] hover:border-[#475569] bg-[#111827] text-[#F8FAFC] text-sm font-semibold px-6 py-3.5 transition-colors duration-150"
                >
                  Learn More
                </button>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#22C55E]" />
                  <span className="text-xs text-[#94A3B8]">Encrypted by default</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-xs text-[#94A3B8]">Results in minutes</span>
                </div>
              </div>
            </div>
            <MockDashboardPreview />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center mb-12">
          <SectionEyebrow>Capabilities</SectionEyebrow>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">Key Features</h2>
          <p className="text-sm text-[#94A3B8] max-w-xl mx-auto">
            Everything you need to read, understand, and trust a legal document — before you sign it.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-2xl border border-[#334155]/70 bg-[#1E293B]/50 p-6 hover:border-[#2563EB]/40 hover:bg-[#1E293B]/80 transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0B1120] border border-[#334155] group-hover:border-[#2563EB]/50 mb-4 transition-colors duration-200">
                  <Icon className="w-4.5 h-4.5 text-[#2563EB]" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-semibold text-[#F8FAFC] mb-1.5">{f.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#111827]/40 border-y border-[#334155]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center mb-14">
            <SectionEyebrow>Under the Hood</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">How It Works</h2>
            <p className="text-sm text-[#94A3B8] max-w-xl mx-auto">
              From upload to insight — a six-step pipeline built on retrieval-augmented generation and agent routing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WORKFLOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-[#334155]/70 bg-[#1E293B]/50 p-6 hover:border-[#2563EB]/40 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0B1120] border border-[#334155]">
                      <Icon className="w-4 h-4 text-[#2563EB]" strokeWidth={1.75} />
                    </div>
                    <span className="text-[11px] font-mono text-[#475569]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#F8FAFC] mb-1.5">{step.title}</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center mb-12">
          <SectionEyebrow>Why LegalLens AI</SectionEyebrow>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">Why Choose LegalLens AI</h2>
          <p className="text-sm text-[#94A3B8] max-w-xl mx-auto">
            Built for the people who actually have to make sense of legal documents under time pressure.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="rounded-2xl border border-[#334155]/70 bg-gradient-to-b from-[#1E293B]/70 to-[#1E293B]/30 p-6 hover:border-[#2563EB]/40 transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/30 mb-4">
                  <Icon className="w-5 h-5 text-[#2563EB]" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-semibold text-[#F8FAFC] mb-2">{c.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech stack */}
      <section className="bg-[#111827]/40 border-y border-[#334155]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center mb-10">
            <SectionEyebrow>Built With</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Technology Stack</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[#334155] bg-[#1E293B]/60 px-4 py-2 text-xs font-medium text-[#F8FAFC] hover:border-[#2563EB]/50 hover:text-[#2563EB] transition-colors duration-150"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="relative overflow-hidden rounded-2xl border border-[#2563EB]/40 bg-gradient-to-br from-[#2563EB]/15 via-[#111827] to-[#111827] px-6 sm:px-12 py-14 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_65%)]" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
              Ready to Analyse Your Legal Documents?
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto mb-8">
              Upload any contract or agreement and get a clear, AI-generated breakdown of what it
              really means — in minutes, not hours.
            </p>
            <button
  type="button"
  onClick={() => navigate("/analyze")}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold px-7 py-3.5 shadow-[0_4px_24px_-4px_rgba(37,99,235,0.6)] transition-colors duration-150"
            >
              Start Analysing
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#334155]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5 mb-3">
                <Logo size="sm" />
                <span className="text-base font-semibold tracking-tight">
                  LegalLens <span className="text-[#2563EB]">AI</span>
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                AI-powered legal and compliance analysis for contracts, agreements, and policies —
                built on retrieval-augmented generation and multi-agent reasoning.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-[#F8FAFC] tracking-wide">Links</span>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {FOOTER_LINKS.map((link) => (
                  <a
                    key={link}
                    href={link === "GitHub" ? "https://github.com" : `#${link.toLowerCase()}`}
                    className="text-xs text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-150 flex items-center gap-1.5"
                  >
                    
                    {link === "Contact" && <Mail className="w-3.5 h-3.5" />}
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#334155]/60 bg-[#111827]/50 px-4 py-3 mb-6">
            <p className="text-[11px] text-[#94A3B8] leading-relaxed">
              LegalLens AI provides AI-generated legal insights for educational purposes and should
              not replace professional legal advice.
            </p>
          </div>

          <div className="pt-6 border-t border-[#334155]/50 text-center">
            <p className="text-[11px] text-[#64748B]">
              © {new Date().getFullYear()} LegalLens AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}