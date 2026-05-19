import React, { useState } from "react";
import { ChevronRight, Calendar, Clock, FileText, ThumbsUp, ThumbsDown, Ticket } from "lucide-react";
import Button from "@/components/ui/button";

export default function HelpArticleView({
  article,
  articles,
  onNavigate,
  onSelectArticle
}) {
  const [feedback, setFeedback] = useState(null); // 'yes' | 'no' | null

  if (!article) return null;

  // Find related articles
  const relatedArticles = articles.filter(a =>
    article.relatedIds?.includes(a.id)
  );

  return (
    <div className="space-y-6 animate-[fadeUp_0.3s_ease-out]">
      {/* Breadcrumbs */}
      <nav className="flex items-center  gap-2 text-xs text-third">
        <button
          onClick={() => onNavigate("home")}
          className="hover:text-fourth transition-colors cursor-pointer"
        >
          Help Center
        </button>
        <ChevronRight size={12} className="text-third/50" />
        <span className="text-third/80">{article.categoryName}</span>
        <ChevronRight size={12} className="text-third/50" />
        <span className="text-primary truncate max-w-[200px] sm:max-w-xs">{article.title}</span>
      </nav>

      {/* Heading & Metadata */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight text-primary leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-third">
          <span className="flex items-center gap-1">
            <Calendar size={13} /> Updated {article.updatedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} /> {article.readTime}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-fourth/15 text-fourth text-[10px] font-medium uppercase tracking-wider">
            {article.categoryName}
          </span>
        </div>
      </div>

      <hr className="border-third/15" />

      {/* Article Body */}
      <div className="text-sm text-third/95 leading-relaxed whitespace-pre-line space-y-4">
        {article.content}
      </div>

      {/* Tip Info Box */}
      <div className="bg-fourth/5 border border-fourth/20 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-fourth">
        <div className="p-1 bg-fourth/10 rounded h-fit">
          <FileText size={14} />
        </div>
        <div>
          <span className="font-semibold text-primary block mb-0.5">Quick Pro-Tip:</span>
          Need more specific support or didn&apos;t find your exact situation? You can file a ticket directly. Our support staff has access to real-time system logs to troubleshoot your listing or wallet.
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-third">Related Articles</h3>
          <div className="space-y-2">
            {relatedArticles.map((rel) => (
              <button
                key={rel.id}
                onClick={() => {
                  onSelectArticle(rel);
                  setFeedback(null);
                }}
                className="w-full cursor-pointer text-left p-3 rounded-lg border border-third/10 hover:border-fourth/35 hover:bg-primary/5 transition-all flex items-center gap-3 text-sm text-fourth"
              >
                <FileText size={16} className="text-third" />
                <span className="hover:underline flex-1 truncate">{rel.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Helpful Feedback Row */}
      <div className="border-t border-third/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {feedback === null ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-third">Was this article helpful?</span>
            <button
              onClick={() => setFeedback("yes")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-third/20 text-xs font-medium hover:border-green-500 hover:text-green-400 transition-colors"
            >
              <ThumbsUp size={12} /> Yes
            </button>
            <button
              onClick={() => setFeedback("no")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-third/20 text-xs font-medium hover:border-red-500 hover:text-red-400 transition-colors"
            >
              <ThumbsDown size={12} /> No
            </button>
          </div>
        ) : (
          <p className="text-sm text-green-400 font-medium">Thank you for your feedback!</p>
        )}

        <div className="flex items-center gap-3">
          <span className="text-xs text-third">Still need help?</span>
          <Button
            onClick={() => onNavigate("create")}
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Ticket size={14} /> Raise a Ticket
          </Button>
        </div>
      </div>
    </div>
  );
}
