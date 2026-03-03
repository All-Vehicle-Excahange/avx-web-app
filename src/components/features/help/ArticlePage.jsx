import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
  ChevronRight,
  X,
} from "lucide-react";
import { articles, tagStyles } from "./Articles.data";
import SupportFlow from "./SupportFlow";

/* ── Content Renderer ── */
function RenderContent({ content }) {
  const blocks = content.split("\n\n").filter(Boolean);
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (/^\*\*[^*]+\*\*$/.test(block.trim())) {
          return (
            <h3
              key={i}
              className="text-[11px] uppercase tracking-[0.3em] font-black pt-6 font-primary"
              style={{ color: "#fff" }}
            >
              {block.replace(/\*\*/g, "")}
            </h3>
          );
        }
        const parts = block.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p
            key={i}
            className="text-sm sm:text-[15px] leading-[1.9] font-secondary"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {parts.map((part, j) =>
              part.startsWith("**") ? (
                <span
                  key={j}
                  className="font-semibold"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {part.replace(/\*\*/g, "")}
                </span>
              ) : (
                part
              ),
            )}
          </p>
        );
      })}
    </div>
  );
}

import SupportFlowModal from "./SupportFlowModal";

/* ── Page ── */
export default function ArticleDetailPage() {
  const router = useRouter();
  const { slug } = router.query || {};
  const [feedback, setFeedback] = useState(null);
  const [supportOpen, setSupportOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!router.isReady) return null;

  const article = articles.find((a) => a.slug === slug);
  const articleIndex = articles.findIndex((a) => a.slug === slug);
  const prevArticle = articleIndex > 0 ? articles[articleIndex - 1] : null;
  const nextArticle =
    articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;

  if (!article) {
    return (
      <section className="relative min-h-[50vh] py-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <p
            className="text-6xl font-black mb-4 font-primary"
            style={{ color: "rgba(255,255,255,0.06)" }}
          >
            404
          </p>
          <p
            className="text-sm mb-6 font-secondary"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Article not found.
          </p>
          <Link
            href="/help"
            className="text-[11px] uppercase tracking-[0.25em] font-black text-fourth font-primary hover:gap-2 flex items-center justify-center gap-1.5 transition-all"
          >
            <ArrowLeft size={11} /> Back to Help Center
          </Link>
        </div>
      </section>
    );
  }

  const tc = tagStyles[article.tag] || {
    bg: "rgba(255,255,255,0.06)",
    text: "rgba(255,255,255,0.5)",
  };

  return (
    <>
      {supportOpen && (
        <SupportFlowModal onClose={() => setSupportOpen(false)} />
      )}
      <section className="relative min-h-screen py-12 px-4 sm:px-8 lg:px-16 overflow-hidden">
        {/* bg ambient */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0,123,255,0.05) 0%, transparent 70%)",
          }}
        />

        <div
          className={`max-w-7xl mx-auto transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="max-w-2xl mx-auto">
            {/* ── BREADCRUMB / NAV ── */}
            <div className="flex items-center justify-between gap-2 mb-10">
              <Link
                href="/help"
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-black font-primary transition-colors hover:text-primary group"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <ArrowLeft
                  size={13}
                  className="group-hover:-translate-x-0.5 transition-transform duration-200"
                />
                Back
              </Link>
              <div
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black font-primary"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                <Link
                  href="/help"
                  className="hover:text-primary transition-colors"
                >
                  Help
                </Link>
                <ChevronRight size={9} />
                <span style={{ color: "rgba(255,255,255,0.45)" }}>
                  {article.tag}
                </span>
              </div>
              <Link
                href="/inspection-process"
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.3em] font-black font-primary transition-colors hover:text-primary"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <Shield size={12} /> Inspection
              </Link>
            </div>

            {/* ── META ── */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[9px] uppercase tracking-[0.3em] font-black px-2.5 py-1 rounded-lg font-primary"
                style={{ backgroundColor: tc.bg, color: tc.text }}
              >
                {article.tag}
              </span>
              <span
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-primary"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                <Clock size={9} /> {article.readTime} read
              </span>
            </div>

            {/* ── TITLE ── */}
            <h1 className="text-2xl sm:text-3xl lg:text-[2.6rem] font-black uppercase leading-tight tracking-tight mb-5 font-primary text-primary">
              {article.question}
            </h1>

            {/* ── LAST UPDATED ── */}
            <div
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] pb-8 mb-8 font-primary"
              style={{
                color: "rgba(255,255,255,0.2)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Calendar size={9} /> Last Updated: {article.lastUpdated}
            </div>

            {/* ── CONTENT ── */}
            <div className="mb-14">
              <RenderContent content={article.content} />
            </div>

            {/* ── DIVIDER ── */}
            <div
              className="h-px w-full mb-8"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,123,255,0.2), rgba(255,255,255,0.05), transparent)",
              }}
            />

            {/* ── HELPFUL WIDGET ── */}
            <div
              className="rounded-2xl p-6 mb-5 border"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              {feedback === "yes" ? (
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(0,123,255,0.12)" }}
                  >
                    <CheckCircle size={16} className="text-fourth" />
                  </div>
                  <div>
                    <p className="text-sm font-black font-primary text-primary">
                      Thanks for your feedback
                    </p>
                    <p
                      className="text-[11px] mt-0.5 font-secondary"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Glad this article was helpful.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <p
                    className="text-[10px] uppercase tracking-[0.3em] font-black mb-4 font-primary"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    Was this helpful?
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setFeedback("yes")}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-[0.15em] font-black font-primary text-fourth border border-fourth/20 hover:bg-fourth/10 transition-all duration-200"
                      style={{ background: "rgba(0,123,255,0.08)" }}
                    >
                      <ThumbsUp size={12} /> Yes
                    </button>
                    <button
                      onClick={() => {
                        setFeedback("no");
                        setSupportOpen(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-[0.15em] font-black font-primary border transition-all duration-200"
                      style={{
                        background:
                          feedback === "no"
                            ? "rgba(245,158,11,0.08)"
                            : "rgba(255,255,255,0.04)",
                        borderColor:
                          feedback === "no"
                            ? "rgba(245,158,11,0.25)"
                            : "rgba(255,255,255,0.08)",
                        color:
                          feedback === "no"
                            ? "#f59e0b"
                            : "rgba(255,255,255,0.35)",
                      }}
                    >
                      <ThumbsDown size={12} /> No
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* ── SUPPORT FLOW PLACEHOLDER DIVIDER ── */}

            {/* ── DIVIDER ── */}
            <div
              className="h-px w-full mb-8"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.05), transparent)",
              }}
            />

            {/* ── STILL NEED HELP CTA ── */}
            <div className="relative h-[120px]   overflow-hidden p-6 mb-10  bg-fourth">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-black uppercase tracking-wide font-primary text-primary">
                      Still Need Help?
                    </p>
                    <p
                      className="text-[11px] mt-0.5 font-secondary"
                      
                    >
                      Our team is available to assist you.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setFeedback("no");
                    setSupportOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-[0.15em] font-black font-primary text-secondary transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "#fff",
                    boxShadow: "0 6px 20px rgba(0,123,255,0.25)",
                  }}
                >
                  Contact Support <ArrowUpRight size={11} />
                </button>
              </div>
            </div>

            {/* ── PREV / NEXT ── */}
            {(prevArticle || nextArticle) && (
              <div className="grid grid-cols-2 gap-3">
                {prevArticle ? (
                  <Link
                    href={`/help/${prevArticle.slug}`}
                    className="group flex flex-col gap-1.5 p-4 rounded-xl transition-all duration-200 border hover:border-white/12"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      borderColor: "rgba(255,255,255,0.07)",
                    }}
                  >
                    <span
                      className="text-[9px] uppercase tracking-[0.25em] font-black flex items-center gap-1 font-primary"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      <ArrowLeft size={8} /> Previous
                    </span>
                    <span
                      className="text-[12px] font-semibold leading-snug line-clamp-2 font-secondary"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {prevArticle.question}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextArticle ? (
                  <Link
                    href={`/help/${nextArticle.slug}`}
                    className="group flex flex-col gap-1.5 p-4 rounded-xl transition-all duration-200 border hover:border-white/12 text-right"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      borderColor: "rgba(255,255,255,0.07)",
                    }}
                  >
                    <span
                      className="text-[9px] uppercase tracking-[0.25em] font-black flex items-center justify-end gap-1 font-primary"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      Next <ArrowUpRight size={8} />
                    </span>
                    <span
                      className="text-[12px] font-semibold leading-snug line-clamp-2 font-secondary"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {nextArticle.question}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
