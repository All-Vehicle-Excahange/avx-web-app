import React from "react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Amit Sharma",
    role: "Founder & CEO, Reecomm",
    bio: "I've watched talented vehicle consultants build real expertise and struggle to show it beyond phone contacts. Reecomm exists to build the trust infrastructure India's market has needed for years.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    name: "Ashwin Santiago",
    role: "Engineering Manager",
    bio: "Lead engineering teams building high-performance marketplace services, secure APIs, and real-time search engine indexers.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    name: "Caitlyn King",
    role: "Product Manager",
    bio: "Founding design team. Specializes in building clean, trust-first user experiences and intuitive consultant storefronts.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    name: "Owen Garcia",
    role: "Frontend Developer",
    bio: "Focused on implementing responsive layouts, fluid animations, and highly performant search discovery dashboards.",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&h=400&q=80",
  },
];

function OurTeam() {
  return (
    <section className="py-24 text-primary bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="mb-4 text-sm tracking-[0.4em] uppercase text-third font-semibold">
            Built by people who understand the market
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Montserrat] mb-6 leading-tight text-primary">
            Meet Our <span className="text-fourth/80">Team</span>
          </h2>
          <p className="text-third text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Reecomm was founded by people who saw the gap between the scale of
            India&apos;s used vehicle industry and the quality of infrastructure
            serving it — and decided to do something about it.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group flex flex-col items-start">
              {/* Photo Frame */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 mb-6 relative">
                {/* Image overlay to blend in */}
                <div className="absolute inset-0 bg-neutral-950/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-105"
                />
              </div>

              {/* Identity */}
              <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-fourth transition-colors duration-300">
                {member.name}
              </h3>

              <h4 className="text-sm font-semibold text-fourth/90 mb-3 uppercase tracking-wider">
                {member.role}
              </h4>

              {/* Bio */}
              <p className="text-third text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurTeam;
