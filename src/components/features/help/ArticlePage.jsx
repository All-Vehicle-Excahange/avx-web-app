// app/avx-help-center/[slug]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ArrowUpRight,
  CheckCircle,
  Shield,
} from "lucide-react";
import { articles, tagStyles } from "@/app/components/avx-help-center/Articles.data";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function RenderContent({ content }) {
  const blocks = content.split("\n\n").filter(Boolean);

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (/^\*\*[^*]+\*\*$/.test(block.trim())) {
          return (
            <h3
              key={i}
              className="text-[11px] uppercase tracking-[0.25em] font-bold pt-4 font-primary text-primary"
            >
              {block.replace(/\*\*/g, "")}
            </h3>
          );
        }

        const parts = block.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p
            key={i}
            className="text-sm sm:text-[15px] leading-[1.9] text-third/60 font-secondary"
          >
            {parts.map((part, j) =>
              part.startsWith("**") ? (
                <span key={j} className="text-primary font-semibold">
                  {part.replace(/\*\*/g, "")}
                </span>
              ) : (
                part
              )
            )}
          </p>
        );
      })}
    </div>
  );
}

// ─── Support Flow ─────────────────────────────────────────────────────────────

function SupportFlow({ onClose }) {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  if (sent) {
    return (
      <div className="rounded-2xl p-6 flex items-center gap-4 bg-fourth/5 border border-fourth/15">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 bg-fourth/10 text-fourth">
          <CheckCircle size={16} />
        </div>
        <div>
          <p className="text-sm font-bold font-primary text-primary">Message received</p>
          <p className="text-[11px] mt-0.5 text-third/40">
            Our support team will follow up with you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-6 bg-warning/5 border border-warning/15">
      <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-1 font-primary text-warning/75">
        Still Need Help?
      </p>
      <p className="text-[12px] mb-4 text-third/40">
        Tell us what was unclear and our team will respond directly.
      </p>

      <textarea
        rows={3}
        placeholder="Describe what you need help with…"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full text-sm resize-none rounded-xl px-4 py-3 mb-3 outline-none transition-all duration-200 bg-primary/5 border border-primary/10 text-primary font-secondary focus:border-warning/30"
      />

      <div className="flex items-center gap-2">
        <button
          disabled={!message.trim()}
          onClick={() => message.trim() && setSent(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-[0.15em] font-bold transition-all duration-200 bg-fourth text-primary shadow-[0_6px_20px_rgba(0,123,255,0.2)] hover:shadow-[0_8px_28px_rgba(0,123,255,0.35)] disabled:opacity-50 disabled:cursor-not-allowed font-primary"
        >
          <MessageSquare size={11} />
          Send Message
        </button>

        <button
          onClick={onClose}
          className="px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-[0.15em] font-bold transition-all duration-200 bg-primary/5 border border-primary/10 text-third/50 hover:border-primary/15 hover:text-primary font-primary"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [supportOpen, setSupportOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const article = articles.find((a) => a.slug === slug);
  const articleIndex = articles.findIndex((a) => a.slug === slug);
  const prevArticle = articleIndex > 0 ? articles[articleIndex - 1] : null;
  const nextArticle = articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;

  if (!article) {
    return (
      <section className="relative min-h-[50vh] py-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl font-black mb-4 font-primary text-third/15">404</p>
          <p className="text-sm mb-6 text-third/40">Article not found.</p>
          <Link href="/avx-help-center" className="text-[11px] uppercase tracking-[0.25em] font-bold text-fourth font-primary">
            ← Back to AVX Help Center
          </Link>
        </div>
      </section>
    );
  }

  const tc = tagStyles[article.tag] || { bg: "var(--color-third)", text: "var(--color-secondary)" };

  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 overflow-hidden">
      <div className={`max-w-7xl mx-auto transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        <div className="max-w-2xl mx-auto">
          
          {/* ── BREADCRUMB ──────────────────────────── */}
          <div className="flex items-center justify-between gap-2 text-[12px] uppercase tracking-[0.35em] font-bold mb-10 font-primary">
            <Link href="/avx-help-center" className="transition-colors duration-200 text-primary/60 hover:text-primary flex items-center gap-1">
              <ArrowLeft size={14} /> Back
            </Link>
            <Link href="/inspection-process" className="transition-colors duration-200 text-primary/60 hover:text-primary flex items-center gap-1">
              <Shield size={13} /> Inspection Process
            </Link>
          </div>

          {/* ── META ────────────────────────────────── */}
          <div className="flex items-center gap-3 mb-5">
            <span 
              className="text-[9px] uppercase tracking-[0.3em] font-bold px-2.5 py-1 rounded-lg font-primary"
              style={{ backgroundColor: tc.bg, color: tc.text }}
            >
              {article.tag}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-third/30">
              <Clock size={9} /> {article.readTime} read
            </span>
          </div>

          {/* ── TITLE ───────────────────────────────── */}
          <h1 className="text-2xl sm:text-3xl lg:text-[2.6rem] font-black uppercase leading-tight tracking-tight mb-5 font-primary text-primary">
            {article.question}
          </h1>

          {/* ── LAST UPDATED ────────────────────────── */}
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] pb-8 mb-8 text-third/30 border-b border-primary/5">
            <Calendar size={9} /> Last Updated: {article.lastUpdated}
          </div>

          {/* ── CONTENT ─────────────────────────────── */}
          <div className="mb-12">
            <RenderContent content={article.content} />
          </div>

          {/* ── DIVIDER ─────────────────────────────── */}
          <div className="h-px w-full mb-8 bg-linear-to-r from-fourth/20 via-primary/5 to-transparent" />

          {/* ── HELPFUL? ────────────────────────────── */}
          <div className="rounded-2xl p-6 mb-5 bg-primary/5 border border-primary/10">
            {feedback === "yes" ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0 bg-fourth/10 text-fourth">
                  <CheckCircle size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold font-primary text-primary">Thanks for your feedback</p>
                  <p className="text-[11px] mt-0.5 text-third/40">Glad this article was helpful.</p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 font-primary text-third/35">
                  Was this helpful?
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFeedback("yes")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-[0.15em] font-bold transition-all duration-200 bg-fourth/10 border border-fourth/20 text-fourth hover:bg-fourth/20 font-primary"
                  >
                    <ThumbsUp size={12} /> Yes
                  </button>
                  <button
                    onClick={() => { setFeedback("no"); setSupportOpen(true); }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-[0.15em] font-bold transition-all duration-200 border font-primary ${
                      feedback === "no" ? "bg-warning/10 border-warning/30 text-warning" : "bg-primary/5 border-primary/10 text-third/50 hover:text-warning hover:border-warning/25"
                    }`}
                  >
                    <ThumbsDown size={12} /> No
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ── SUPPORT FLOW ────────────────────────── */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${supportOpen ? "max-h-100 opacity-100 mb-5" : "max-h-0 opacity-0"}`}>
            <SupportFlow onClose={() => setSupportOpen(false)} />
          </div>

          {/* ── DIVIDER ─────────────────────────────── */}
          <div className="h-px w-full mb-8 bg-linear-to-r from-primary/5 to-transparent" />

          {/* ── STILL NEED HELP CTA ─────────────────── */}
          <div className="relative rounded-2xl overflow-hidden border border-fourth/15 bg-fourth/5 p-6 mb-10">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-fourth/40 to-transparent" />
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 bg-fourth/10 text-fourth">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-wide font-primary text-primary">Still Need Help?</p>
                  <p className="text-[11px] mt-0.5 text-third/40">Our team is available to assist you.</p>
                </div>
              </div>
              <button
                onClick={() => { setFeedback("no"); setSupportOpen(true); window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-[0.15em] font-bold transition-all duration-300 bg-fourth text-primary shadow-[0_6px_20px_rgba(0,123,255,0.2)] hover:shadow-[0_8px_30px_rgba(0,123,255,0.35)] hover:-translate-y-0.5 font-primary"
              >
                Contact Support <ArrowUpRight size={11} />
              </button>
            </div>
          </div>

          {/* ── PREV / NEXT ─────────────────────────── */}
          {(prevArticle || nextArticle) && (
            <div className="grid grid-cols-2 gap-3">
              {prevArticle ? (
                <Link href={`/avx-help-center/${prevArticle.slug}`} className="group flex flex-col gap-1.5 p-4 rounded-xl transition-all duration-200 bg-primary/5 border border-primary/10 hover:bg-primary/10 hover:border-primary/20">
                  <span className="text-[9px] uppercase tracking-[0.25em] font-bold flex items-center gap-1 text-third/30 font-primary">
                    <ArrowLeft size={8} /> Previous
                  </span>
                  <span className="text-[12px] font-semibold leading-snug line-clamp-2 text-primary/65 font-secondary">
                    {prevArticle.question}
                  </span>
                </Link>
              ) : <div />}

              {nextArticle ? (
                <Link href={`/avx-help-center/${nextArticle.slug}`} className="group flex flex-col gap-1.5 p-4 rounded-xl transition-all duration-200 bg-primary/5 border border-primary/10 hover:bg-primary/10 hover:border-primary/20 text-right">
                  <span className="text-[9px] uppercase tracking-[0.25em] font-bold flex items-center justify-end gap-1 text-third/30 font-primary">
                    Next <ArrowUpRight size={8} />
                  </span>
                  <span className="text-[12px] font-semibold leading-snug line-clamp-2 text-primary/65 font-secondary">
                    {nextArticle.question}
                  </span>
                </Link>
              ) : <div />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}