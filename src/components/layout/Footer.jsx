import { Facebook, Instagram, X, Youtube, ArrowUp } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className=" text-white pt-16 pb-8 font-sans">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 justify-between mb-16 lg:px-4">

                    {/* Brand & Description Column */}
                    <div className="lg:w-[25%] flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-white flex items-center justify-center rounded-sm text-black">
                                {/* A simple square logo stand-in */}
                                <div className="w-3 h-3 bg-black rounded-full"></div>
                            </div>
                            <span className="text-xl font-semibold tracking-wider">AVX</span>
                        </Link>

                        <p className="text-primary/60 text-[13px] leading-relaxed lg:pr-4">
                            AVX is the website building platform for designers, developers, and marketers.
                            With high-end design capabilities, streamlined workflows, and robust business tools,
                            it empowers freelancers and agencies to build, manage, and scale exceptional websites
                            with maximum efficiency.
                        </p>

                        <div className="flex gap-4 mt-4">
                            <Link href="#" className="text-primary/60 hover:text-white transition-colors">
                                <Youtube size={18} />
                            </Link>
                            <Link href="#" className="text-primary/60 hover:text-white transition-colors">
                                <X size={18} />
                            </Link>
                            <Link href="#" className="text-primary/60 hover:text-white transition-colors">
                                <Instagram size={18} />
                            </Link>
                            <Link href="#" className="text-primary/60 hover:text-white transition-colors">
                                <Facebook size={18} />
                            </Link>
                            <Link href="#" className="text-primary/60 hover:text-white transition-colors flex items-center justify-center">
                                {/* Tiktok SVG */}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                            </Link>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:w-[70%] grid grid-cols-2 lg:grid-cols-4 gap-8 relative">

                        {/* Column 1 */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2 text-white">Product</h3>
                            <ul className="flex flex-col gap-3">
                                {['Design', 'Development', 'Enterprise', 'Figma to AVX', 'AI Features', 'Visual Sitemap', 'Business Solutions', 'eCommerce', 'CMS', 'Management Tools', 'SEO', 'Marketing Integrations', 'Security', 'Reliability & Performance', 'Top Features'].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-primary/60 hover:text-white text-[13px] transition-colors">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-4 relative lg:pr-4">
                            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2 text-white">Resources</h3>
                            <ul className="flex flex-col gap-3">
                                {['AVX Academy', 'Community', 'Forum', 'Inspiration', 'Marketing Resources', 'Blog', 'Partner Program', 'Help Center', 'Pricing', 'Brand Guidelines'].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-primary/60 hover:text-white text-[13px] transition-colors">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                            {/* Vertical line separator for desktop */}
                            <div className="hidden lg:block absolute right-[-1rem] top-0 bottom-0 w-px bg-[#ffffff20]"></div>
                        </div>

                        {/* Column 3 */}
                        <div className="flex flex-col gap-4 lg:pl-4">
                            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2 text-white">More From AVX</h3>
                            <ul className="flex flex-col gap-3">
                                {['Website Builder', 'Website Design', 'Website Templates', 'eCommerce Website', 'Appointment Scheduling', 'Portfolio Website', 'Blog Website'].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-primary/60 hover:text-white text-[13px] transition-colors">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4 */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2 text-white">Company</h3>
                            <ul className="flex flex-col gap-3">
                                {['About AVX', 'Contact Us', 'Press & Media', 'Accessibility Statement', 'Site Map', 'Careers'].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-primary/60 hover:text-white text-[13px] transition-colors">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#ffffff20] text-[13px] text-primary/60">
                    <div className="flex gap-6 mb-4 md:mb-0">
                        <Link href="#" className="hover:text-white transition-colors hover:underline">Terms of Use</Link>
                        <Link href="#" className="hover:text-white transition-colors hover:underline">Privacy Policy</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <p>AVX is part of AVX.com Ltd. &copy; 2006-2026</p>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-white hover:text-white transition-colors"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp size={18} />
                        </button>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
