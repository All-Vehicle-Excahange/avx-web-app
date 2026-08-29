"use client";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  ClipboardCheck,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/button";
import SleekInput from "@/components/ui/sleekInput";
import CustomSelect from "@/components/ui/custom-select";

function Contactus() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const topicOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "inspection", label: "Vehicle Inspection & Verification" },
    { value: "consultant", label: "Partner & Consultant Program" },
    { value: "seller", label: "Seller Support & Pricing" },
    { value: "security", label: "Account & Security Disputes" },
  ];

  const validateForm = () => {
    let formErrors = {};
    if (!name.trim()) {
      formErrors.name = "Full name is required";
    }

    if (!email.trim()) {
      formErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Please enter a valid email address";
    }

    if (phone && !/^\+?[0-9\s-]{10,15}$/.test(phone.replace(/\s+/g, ""))) {
      formErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }

    if (!topic) {
      formErrors.topic = "Please select a topic of inquiry";
    }

    if (!message.trim()) {
      formErrors.message = "Message cannot be empty";
    } else if (message.trim().length < 10) {
      formErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the errors in the form.", {
        style: {
          background: "#1e1e1e",
          color: "#fffef7",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API Submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you! Your message has been sent successfully.", {
        style: {
          background: "#1e1e1e",
          color: "#fffef7",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      });
      setName("");
      setEmail("");
      setPhone("");
      setTopic("");
      setMessage("");
      setErrors({});
    }, 1800);
  };

  return (
    <section className="relative w-full py-12 md:py-10 overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="relative z-10 container mx-auto px-4">
        {/* HEADER SECTION */}
        <div className="text-center lg:text-left mb-12 sm:mb-16">
          {/* <p className="text-xs sm:text-sm tracking-[0.45em] uppercase text-fourth font-extrabold mb-3">
            Contact Channels
          </p> */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary tracking-tight font-primary">
            Connect with{" "}
            <span className="text-fourth/80  font-secondary relative inline-block">
              Reecomm
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-third max-w-2xl font-secondary leading-relaxed">
            Have questions about buying, selling, or our 200-point vehicle
            inspections? Our support teams and certified auto consultants are
            ready to assist you.
          </p>
        </div>

        {/* TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* LEFT COLUMN: INFO & SOCIALS */}
          <div className="lg:col-span-4 w-full flex flex-col justify-between h-full bg-white/5 border border-white/8 rounded-2xl p-5 sm:p-6 backdrop-blur-md relative overflow-hidden group">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/business-address.jpg"
                alt="Office Background"
                fill
                className="object-cover opacity-12 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-b from-secondary/90 via-secondary/95 to-black" />
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              <div>
                <h3 className="text-base font-bold uppercase tracking-wider text-primary mb-6 border-b border-white/5 pb-3">
                  Reach Us Directly
                </h3>

                {/* CONTACT DETAILS LIST */}
                <div className="flex flex-col gap-6">
                  {/* General Support */}
                  <div className="flex gap-3 items-start">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-fourth/90 hover:bg-fourth/10 transition-colors">
                      <Mail size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-third/80 mb-0.5">
                        General Support
                      </p>
                      <a
                        href="mailto:info@reecomm.com"
                        className="text-primary hover:text-fourth font-medium text-sm transition-colors break-all"
                      >
                        info@reecomm.com
                      </a>
                      <p className="text-[11px] text-third/50 mt-0.5">
                        For listing details, subscription and account help.
                      </p>
                    </div>
                  </div>

                  {/* Inspection Support */}
                  <div className="flex gap-3 items-start">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-fourth/90 hover:bg-fourth/10 transition-colors">
                      <ClipboardCheck size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-third/80 mb-0.5">
                        Inspection Services
                      </p>
                      <a
                        href="mailto:inspect@reecomm.com"
                        className="text-primary hover:text-fourth font-medium text-sm transition-colors break-all"
                      >
                        inspect@reecomm.com
                      </a>
                      <p className="text-[11px] text-third/50 mt-0.5">
                        Book or query about 200-point door inspection reports.
                      </p>
                    </div>
                  </div>

                  {/* Direct Call */}
                  <div className="flex gap-3 items-start">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-fourth/90 hover:bg-fourth/10 transition-colors">
                      <Phone size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-third/80 mb-0.5">
                        Call Support
                      </p>
                      <a
                        href="tel:+919876543210"
                        className="text-primary hover:text-fourth font-medium text-sm transition-colors"
                      >
                        +91 98765 43210
                      </a>
                      <div className="flex gap-2 items-center mt-1 text-[11px] text-third/50">
                        <Clock size={12} />
                        <span>Mon - Sat, 9:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                  </div>

                  {/* Corporate Address */}
                  <div className="flex gap-3 items-start">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-fourth/90 hover:bg-fourth/10 transition-colors">
                      <MapPin size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-third/80 mb-0.5">
                        Headquarters
                      </p>
                      <p className="text-primary text-sm leading-relaxed">
                        Reecomm Technologies Pvt. Ltd.
                        <br />
                        First Floor, Loriya Complex, Part B/D,
                        <br />
                        Survey No 268/2, Chhapi, Palanpur Ahmedabad Highway,
                        <br />
                        Banas Kantha, Pin 385210
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SOCIAL CHANNELS */}
              <div className="mt-8 border-t border-white/5 pt-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-third/65 mb-3 text-center lg:text-left">
                  Follow Our Journey
                </p>
                <div className="flex justify-center lg:justify-start gap-3">
                  <Link
                    href="https://www.facebook.com/reecommindia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 text-third hover:text-fourth hover:border-fourth hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    aria-label="Visit Facebook"
                  >
                    <Facebook size={16} />
                  </Link>
                  <Link
                    href="https://www.instagram.com/reecommindia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 text-third hover:text-fourth hover:border-fourth hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    aria-label="Visit Instagram"
                  >
                    <Instagram size={16} />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/reecomm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 text-third hover:text-fourth hover:border-fourth hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    aria-label="Visit LinkedIn"
                  >
                    <Linkedin size={16} />
                  </Link>
                  <Link
                    href="https://www.x.com/Reecommindia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 text-third hover:text-fourth hover:border-fourth hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    aria-label="Visit X"
                  >
                    <FaXTwitter size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div className="lg:col-span-8 w-full h-full">
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 border border-white/8 rounded-2xl p-6 sm:p-8 backdrop-blur-md hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all duration-300 flex flex-col justify-between h-full gap-6"
            >
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-primary">
                  Send Message
                </h3>
                <p className="text-xs text-third/50 mt-1">
                  Fill in your details below and our team will get back to you
                  shortly.
                </p>
              </div>

              {/* Grid fields layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                {/* Full Name */}
                <SleekInput
                  label="Full Name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name)
                      setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  error={errors.name}
                  required
                />

                {/* Email Address */}
                <SleekInput
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  error={errors.email}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Mobile Number */}
                <SleekInput
                  label="Mobile Number"
                  placeholder="10-digit number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone)
                      setErrors((prev) => ({ ...prev, phone: "" }));
                  }}
                  error={errors.phone}
                />

                {/* Topic of Inquiry */}
                <div className="flex flex-col space-y-1.5 w-full">
                  <span className="text-xs font-semibold uppercase tracking-wider text-third/80 ml-1">
                    Topic of Inquiry <span className="text-rose-500">*</span>
                  </span>
                  <CustomSelect
                    variant="transparent"
                    placeholder="Select general topic"
                    value={topic}
                    onChange={(val) => {
                      setTopic(val);
                      if (errors.topic)
                        setErrors((prev) => ({ ...prev, topic: "" }));
                    }}
                    options={topicOptions}
                  />
                  {errors.topic && (
                    <span className="text-rose-500 text-[10px] ml-1 animate-in fade-in slide-in-from-top-1">
                      {errors.topic}
                    </span>
                  )}
                </div>
              </div>

              {/* Message Details */}
              <div className="flex flex-col space-y-1.5 w-full">
                <span className="text-xs font-semibold uppercase tracking-wider text-third/80 ml-1">
                  Your Message <span className="text-rose-500">*</span>
                </span>
                <textarea
                  rows={5}
                  placeholder="Tell us details of what you need help with..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message)
                      setErrors((prev) => ({ ...prev, message: "" }));
                  }}
                  className={`w-full bg-white/2 border rounded-xl p-4 outline-none transition-all duration-300 text-primary text-sm placeholder:text-third/35 hover:border-white/20 focus:border-primary focus:bg-white/4 focus:shadow-[0_0_15px_rgba(255,254,247,0.03)] resize-none
                    ${errors.message ? "border-rose-500/50 focus:border-rose-500" : "border-white/8"}
                  `}
                />
                {errors.message && (
                  <span className="text-rose-500 text-[10px] ml-1 animate-in fade-in slide-in-from-top-1">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* SUBMIT ACTION */}
              <div className="mt-4 flex justify-end">
                <Button
                  type="submit"
                  variant="ghost"
                  size="md"
                  full={false}
                  loading={isSubmitting}
                  className="font-bold tracking-wider uppercase text-xs px-8"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* BOTTOM SECTION: HELP / FAQ CTA */}
        <div className="mt-16 sm:mt-24 relative rounded-2xl bg-white/5 border border-white/8 p-8 backdrop-blur-md text-center max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold font-primary mb-3">
            Looking for Immediate Answers?
          </h3>
          <p className="text-sm sm:text-base text-third max-w-xl mx-auto mb-6 leading-relaxed">
            Check out our Help Center for documentation regarding user
            verification, subscription invoices, boosting listings, and
            buying/selling guides.
          </p>
          <div className="inline-block">
            <Button
              href="/help"
              variant="outline"
              size="sm"
              showIcon={true}
              className="text-xs uppercase tracking-wider font-semibold"
            >
              Browse FAQs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contactus;
