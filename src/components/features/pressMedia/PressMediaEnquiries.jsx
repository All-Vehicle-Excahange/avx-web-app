import React from "react";
import {
  Building2,
  Mail,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import Button from "@/components/ui/button";

export default function PressMediaEnquiries() {
  return (
    <section
      id="media-enquiries"
      className="relative py-8 md:py-10 bg-transparent"
      aria-label="Press and Media Enquiries"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        {/* Main Box - Black theme with border only */}
        <div className="relative rounded-2xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 lg:p-10 overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold tracking-widest uppercase text-fourth mb-2.5">
                <Mail className="w-3.5 h-3.5" />
                <span>Let&apos;s Connect</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight leading-tight mb-3 font-[Montserrat]">
                Have a Story to Tell About Reecomm?
              </h2>

              <p className="text-xs sm:text-sm text-third leading-relaxed font-normal mb-5 max-w-2xl">
                We&apos;re open to conversations with journalists, media
                publications, podcast hosts and organisations interested in our
                journey and the future of India&apos;s used-vehicle industry. For
                interviews, press enquiries, media collaborations or company
                information, reach out to our team.
              </p>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <Button
                  variant="ghost"
                  href="/contactus"
                  size="sm"
                  showIcon={true}
                  className="font-semibold shadow-sm text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-secondary" />
                  Contact Our Team
                </Button>

                <Button
                  variant="outlineSecondary"
                  href="/aboutus"
                  size="sm"
                  className="border-white/20 text-primary hover:border-white/40 text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5"
                >
                  <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-third" />
                  About Reecomm
                </Button>
              </div>
            </div>

            {/* Right Attribution Card - Black theme with clean border only */}
            <div className="lg:col-span-4 p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-fourth" />
                <span>Official Communications</span>
              </div>

              <div className="text-sm font-semibold text-primary mb-1.5 font-[Montserrat]">
                Press &amp; Media Enquiries
              </div>
              <p className="text-xs text-third leading-relaxed mb-3">
                Reecomm is an initiative powered by{" "}
                <strong className="text-primary font-medium">Quba Infotech</strong>
                , dedicated to bringing transparency and technology to India&apos;s
                automobile commerce.
              </p>

              <div className="pt-2.5 border-t border-white/10 space-y-1 text-xs text-third">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Media response window: 24–48 hours</span>
                </div>
                <div className="text-[11px] text-third/80">
                  Official Press Kit &amp; Assets available on request.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
