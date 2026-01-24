import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Twitch,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-secondary text-primary pt-16 pb-8">
      {/* CENTERED CONTENT WRAPPER */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-16">
          {/* Column 1 */}
          <div className="space-y-6">
            <div className="flex items-center gap-1 mb-6">
              <div className="text-4xl font-black tracking-tighter italic flex">
                <span className="text-pink-500">A</span>
                <span className="text-blue-500 -mx-1">V</span>
                <span className="text-pink-500">X</span>
              </div>
            </div>

            <p className="text-third text-sm leading-relaxed max-w-sm">
              Your trusted automotive partner for buying, selling, and
              exchanging premium vehicles across India.
            </p>

            <div className="flex gap-4">
              <Link href="/facebook" className="bg-primary/10 p-2 rounded hover:bg-primary/20 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5 text-primary" />
              </Link>
              <Link href="/twitch" className="bg-primary/10 p-2 rounded hover:bg-primary/20 transition-colors cursor-pointer">
                <Twitch className="w-5 h-5 text-primary" />
              </Link>
              <Link href="/linkedin" className="bg-primary/10 p-2 rounded hover:bg-primary/20 transition-colors cursor-pointer">
                <Linkedin className="w-5 h-5 text-primary" />
              </Link>
              <Link href="/instagram" className="bg-primary/10 p-2 rounded hover:bg-primary/20 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5 text-primary" />
              </Link>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Phone className="w-5 h-5 text-primary" />
              <Link href="tel:07525410245" className="font-medium text-primary">+91 75254 10245</Link>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary">Newsletter</h3>
            <p className="text-third text-sm">
              Subscribe to get updates on latest cars and exclusive deals
            </p>

            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-primary text-secondary px-4 py-3 rounded text-sm outline-none focus:ring-2 focus:ring-third"
              />

              <button className="max-w-60 md:w-auto bg-transparent border border-third/40 text-primary px-8 py-3 rounded text-sm font-medium hover:bg-primary hover:text-secondary transition-colors uppercase tracking-wide cursor-pointer">
                Submit
              </button>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary">Our Offices</h3>

            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
              <p className="text-third text-sm leading-relaxed">
                2061/2, Behind khankah zakariya masjid, Mahi, Chhapi, TA -
                Vadgam, Gujarat, India - 385210
              </p>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
              <p className="text-third text-sm leading-relaxed">
                2061/2, Behind khankah zakariya masjid, Mahi, Chhapi, TA -
                Vadgam, Gujarat, India - 385210
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-third/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-third">
          <p>
            © 2025 Value Drive Technologies Private Limited. All rights
            reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
