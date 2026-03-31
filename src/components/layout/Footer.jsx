import { Facebook, Instagram, X, Youtube, ArrowUp } from "lucide-react";
import Link from "next/link";
import React from "react";

const footerLinks = {
    product: [
        { label: 'Design', href: '#' },
        { label: 'Development', href: '#' },
        { label: 'Enterprise', href: '#' },
        { label: 'Figma to AVX', href: '#' },
        { label: 'AI Features', href: '#' },
        { label: 'Visual Sitemap', href: '#' },
        { label: 'Business Solutions', href: '#' },
        { label: 'eCommerce', href: '#' },
        { label: 'CMS', href: '#' },
        { label: 'Management Tools', href: '#' },
        { label: 'SEO', href: '#' },
        { label: 'Marketing Integrations', href: '#' },
        { label: 'Security', href: '#' },
        { label: 'Reliability & Performance', href: '#' },
        { label: 'Top Features', href: '#' },
    ],
    resources: [
        { label: 'Reecomm Academy', href: '#' },
        { label: 'Community', href: '#' },
        { label: 'Forum', href: '#' },
        { label: 'Inspiration', href: '#' },
        { label: 'Marketing Resources', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Partner Program', href: '#' },
        { label: 'Help Center', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Brand Guidelines', href: '#' },
    ],
    moreFromReecomm: [
        { label: 'Website Builder', href: '#' },
        { label: 'Website Design', href: '#' },
        { label: 'Website Templates', href: '#' },
        { label: 'eCommerce Website', href: '#' },
        { label: 'Appointment Scheduling', href: '#' },
        { label: 'Portfolio Website', href: '#' },
        { label: 'Blog Website', href: '#' },
    ],
    company: [
        { label: 'About Reecomm', href: '/aboutus' },
        { label: 'Reecomm Works', href: '/avx-works' },
        { label: 'Help Center', href: '/help' },
        { label: 'Why Choose Us', href: '/why-chose-us' },
        { label: 'Site Map', href: '#' },
        { label: 'Careers', href: '#' },
    ],
    legal: [
        { label: 'Terms of Use', href: '#' },
        { label: 'Privacy Policy', href: '#' },
    ]
};

const Footer = () => {
    return (
        <footer className=" text-white font-sans">
            <div className="container mx-auto ">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 justify-between mb-16">

                    {/* Brand & Description Column */}
                    <div className="lg:w-[25%] flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/logo/logo.webp" alt="Reecomm Logo" className="h-6 md:h-6 w-auto object-contain block" />
                        </Link>

                        <p className="text-primary/60 text-[13px] leading-relaxed lg:pr-4">
                            Reecomm is the website building platform for designers, developers, and marketers.
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
                                {footerLinks.product.map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="text-primary/60 hover:text-white text-[13px] transition-colors">{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-4 relative lg:pr-4">
                            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2 text-white">Resources</h3>
                            <ul className="flex flex-col gap-3">
                                {footerLinks.resources.map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="text-primary/60 hover:text-white text-[13px] transition-colors">{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                            {/* Vertical line separator for desktop */}
                            <div className="hidden lg:block absolute right-[-1rem] top-0 bottom-0 w-px bg-[#ffffff20]"></div>
                        </div>

                        {/* Column 3 */}
                        <div className="flex flex-col gap-4 lg:pl-4">
                            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2 text-white">More From Reecomm</h3>
                            <ul className="flex flex-col gap-3">
                                {footerLinks.moreFromReecomm.map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="text-primary/60 hover:text-white text-[13px] transition-colors">{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4 */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-2 text-white">Company</h3>
                            <ul className="flex flex-col gap-3">
                                {footerLinks.company.map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="text-primary/60 hover:text-white text-[13px] transition-colors">{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#ffffff20] text-[13px] text-primary/60">
                    <div className="flex gap-6 mb-4 md:mb-0">
                        {footerLinks.legal.map((item) => (
                            <Link key={item.label} href={item.href} className="hover:text-white transition-colors hover:underline">
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <p>Reecomm is part of Reecomm.com Ltd. &copy; 2006-2026</p>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="w-10 h-10 cursor-pointer rounded-full border border-gray-600 flex items-center justify-center hover:border-white hover:text-white transition-colors"
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
