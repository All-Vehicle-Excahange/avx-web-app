"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import EmptyState from "@/components/ui/EmptyState";
import {
  Building2,
  ShieldCheck,
  Users,
  MapPin,
  IndianRupee,
  Laptop,
  TrendingUp,
  BookOpen,
  Clock,
  Zap,
  ArrowRight,
  Mail,
  Compass,
  Briefcase,
} from "lucide-react";

export default function CareersComponent() {
  const whyJoinReasons = [
    {
      icon: Building2,
      title: "Early stage, real scale",
      description:
        "Your work ships to real consultants and buyers from week one. No staging for six months. No internal demos that go nowhere.",
    },
    {
      icon: ShieldCheck,
      title: "Trust is the product",
      description:
        "We're not building another listing site. We're building the verification and trust layer the used vehicle market has never had. The problem is real and the solution is ours to build.",
    },
    {
      icon: Users,
      title: "Small team, full ownership",
      description:
        "No politics, no waiting for approvals, no work that disappears into a roadmap nobody reads. You own your area end to end and you feel it.",
    },
    {
      icon: MapPin,
      title: "Gujarat-first, India next",
      description:
        "We're starting focused and building to scale. Join before it's big — your early contribution shapes how it grows.",
    },
  ];

  const openRoles = [];

  const howWeWorkPrinciples = [
    {
      title: "We ship, then improve",
      description:
        "Done and in front of real users beats perfect and in review. We move fast, learn from what we see, and iterate.",
    },
    {
      title: "We say what we think",
      description:
        "Honest feedback, direct communication, no politics. If something isn't working, we say so — and fix it.",
    },
    {
      title: "We own our work",
      description:
        "Nobody manages the details for you. You set the bar for your own output and you're accountable to the team, not to a process.",
    },
    {
      title: "We build for real people",
      description:
        "Consultants trying to grow their business. Buyers trying to make a confident decision. We keep them in the room — always.",
    },
  ];

  const perks = [
    {
      icon: IndianRupee,
      title: "Competitive salary",
      description:
        "Market rate for your role and experience — reviewed as the company grows.",
    },
    {
      icon: Laptop,
      title: "Equipment provided",
      description:
        "The tools you need to do your best work — laptop, peripherals, software.",
    },
    {
      icon: TrendingUp,
      title: "Early equity",
      description:
        "You're building something valuable. You should share in what you help create.",
    },
    {
      icon: BookOpen,
      title: "Learning budget",
      description:
        "Courses, books, conferences — we invest in the people who invest in Reecomm.",
    },
    {
      icon: Clock,
      title: "Flexible hours",
      description:
        "We care about output, not when you're at your desk. Own your schedule.",
    },
    {
      icon: Zap,
      title: "Direct impact",
      description:
        "No six-month waits to see your work used. What you ship goes live to real users.",
    },
  ];

  const handleApplyClick = (roleName) => {
    const subject = encodeURIComponent(
      `Application for ${roleName} at Reecomm`,
    );
    const body = encodeURIComponent(
      `Hi Reecomm Team,\n\nI am interested in applying for the ${roleName} role. Here is a link to my work/CV:\n\n[Link]\n\nLooking forward to hearing from you!`,
    );
    window.location.href = `mailto:careers@reecomm.com?subject=${subject}&body=${body}`;
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full text-primary font-secondary bg-transparent overflow-x-hidden">
      <section className="relative flex flex-col justify-center pt-20 pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          {/* Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.h1
              className="text-[40px] sm:text-[50px] md:text-[60px] font-bold leading-[1.05] tracking-tight text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Build the platform that <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fourth to-fourth/60">
                organizes India's
              </span>{" "}
              vehicle market.
            </motion.h1>

            <motion.p
              className="text-[16px] md:text-[18px] text-third leading-relaxed max-w-2xl mb-8 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We're a small team solving a large problem. India's used vehicle
              market runs on WhatsApp, referrals, and guesswork — and we're
              building the infrastructure to change that. If you want your work
              to matter from day one, Reecomm is where you build it.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button href="#open-roles" variant="ghost" showIcon={false}>
                View Open Roles
                <ArrowRight
                  size={16}
                  className="ml-2 inline group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </motion.div>
          </div>

          {/* Decorative Right Side UI Element */}
          <motion.div
            className="lg:col-span-5 hidden lg:flex justify-center relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl max-w-sm w-full overflow-hidden">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-lg bg-fourth/20 flex items-center justify-center text-fourth font-bold">
                  R
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm">
                    Reecomm Storefront
                  </h3>
                  <p className="text-[10px] text-third">
                    Storefront Status: Active
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-semibold border border-green-500/30">
                  <ShieldCheck size={11} /> Verified
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 w-1/3 bg-white/10 rounded" />
                <div className="h-4 w-5/6 bg-white/20 rounded" />
                <div className="h-2 w-4/6 bg-white/10 rounded" />
              </div>
              <div className="grid grid-cols-2 gap-2.5 mt-6 pt-4 border-t border-white/10">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-center">
                  <span className="block text-[11px] text-third">Listings</span>
                  <span className="text-base font-bold text-primary">124</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-center">
                  <span className="block text-[11px] text-third">Rating</span>
                  <span className="text-base font-bold text-fourth">4.9 ★</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — WHY REECOMM */}
      <section id="why-join" className="py-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="max-w-3xl mb-8">
            <p className="text-xs tracking-[0.4em] uppercase text-third font-semibold mb-2">
              Why Reecomm
            </p>
            <h2 className="text-[32px] sm:text-[40px] md:text-[45px] font-bold text-primary">
              Why join us?
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyJoinReasons.map((item, idx) => (
              <motion.div
                key={idx}
                className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-fourth/50 hover:bg-white/[0.07] transition-all duration-300 shadow-md flex flex-col md:flex-row gap-5 items-start"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-fourth/10 border border-fourth/20 flex items-center justify-center text-fourth shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-third leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — OPEN ROLES */}
      <section id="open-roles" className="py-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="max-w-3xl mb-8">
            <p className="text-xs tracking-[0.4em] uppercase text-third font-semibold mb-2">
              Open Roles
            </p>
            <h2 className="text-[32px] sm:text-[40px] md:text-[45px] font-bold text-primary mb-4">
              Open roles
            </h2>
            <p className="text-[16px] text-third font-light">
              We hire for craft, ownership, and honesty — not pedigree.
            </p>
          </div>

          {/* Table/List for Roles */}
          {openRoles.length > 0 ? (
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-third text-xs uppercase tracking-wider font-semibold">
                      <th className="py-4 px-6">Role</th>
                      <th className="py-4 px-6">Department</th>
                      <th className="py-4 px-6">Location</th>
                      <th className="py-4 px-6">Type</th>
                      <th className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openRoles.map((role, idx) => (
                      <tr
                        key={idx}
                        onClick={() => handleApplyClick(role.role)}
                        className="border-b border-white/5 last:border-0 hover:bg-white/[0.04] transition-colors cursor-pointer group"
                      >
                        <td className="py-5 px-6 font-semibold text-primary text-sm sm:text-base">
                          {role.role}
                        </td>
                        <td className="py-5 px-6 text-third text-sm">
                          {role.department}
                        </td>
                        <td className="py-5 px-6 text-third text-sm flex items-center gap-1">
                          <MapPin size={13} className="text-third/80" />{" "}
                          {role.location}
                        </td>
                        <td className="py-5 px-6 text-third text-sm">
                          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium">
                            {role.type}
                          </span>
                        </td>
                        <td className="py-5 px-6 text-right text-fourth font-semibold text-sm">
                          <span className="inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-300">
                            Apply <ArrowRight size={14} />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <EmptyState
              title="No Open Roles Right Now"
              description="We don't have any active openings at the moment. However, we are always looking for exceptional talent. If you take full ownership and build for real people, drop us your CV!"
            />
          )}

          {/* Footer note */}
          {openRoles.length > 0 && (
            <div className="flex items-center justify-center p-6 border border-white/10 bg-white/5 rounded-2xl max-w-2xl mx-auto">
              <p className="text-[14px] text-third text-center font-light leading-relaxed">
                Don't see your role? Send your CV to{" "}
                <a
                  href="mailto:careers@reecomm.com"
                  className="text-fourth font-medium hover:underline transition-all"
                >
                  careers@reecomm.com
                </a>{" "}
                — we read every one.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4 — HOW WE WORK */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="max-w-3xl mb-8">
            <p className="text-xs tracking-[0.4em] uppercase text-third font-semibold mb-2">
              Culture
            </p>
            <h2 className="text-[32px] sm:text-[40px] md:text-[45px] font-bold text-primary mb-4">
              How we work
            </h2>
            <p className="text-[16px] text-third font-light">
              A few things that are true about Reecomm as a team.
            </p>
          </div>

          {/* Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {howWeWorkPrinciples.map((item, idx) => (
              <motion.div
                key={idx}
                className="relative pl-6 border-l border-white/10 hover:border-fourth transition-colors duration-300"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="text-[11px] font-mono text-fourth font-bold mb-1">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="text-[18px] font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-[14px] text-third leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — PERKS */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="max-w-3xl mb-8">
            <p className="text-xs tracking-[0.4em] uppercase text-third font-semibold mb-2">
              What We Offer
            </p>
            <h2 className="text-[32px] sm:text-[40px] md:text-[45px] font-bold text-primary">
              What we offer
            </h2>
          </div>

          {/* Perks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((item, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-fourth/30 transition-all duration-300 flex flex-col gap-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <div className="w-10 h-10 rounded-lg bg-fourth/10 flex items-center justify-center text-fourth shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-primary mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-third leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — BOTTOM CTA */}
      <section className="py-10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
          <motion.h2
            className="text-[36px] sm:text-[46px] md:text-[52px] font-bold text-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Think you belong here?
          </motion.h2>

          <motion.p
            className="text-[16px] md:text-[18px] text-third leading-relaxed font-light max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We don't care where you went to college. We care what you've built,
            how you think, and whether you take ownership. Send us your work and
            tell us what you'd build at Reecomm.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button href="#open-roles" variant="ghost" showIcon={false}>
              View Open Roles
            </Button>
            <Button
              href="mailto:careers@reecomm.com"
              variant="outlineSecondary"
              showIcon={false}
              className="flex items-center gap-2"
            >
              <Mail size={16} />
              careers@reecomm.com
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
