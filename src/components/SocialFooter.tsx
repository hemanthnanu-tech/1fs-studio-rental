import React from "react";
import { Instagram, Mail, Phone, MapPin, ArrowUpRight, Shield, ExternalLink } from "lucide-react";
import { STUDIO_STATISTICS } from "../data";
import { motion } from "motion/react";

interface SocialFooterProps {
  isLight: boolean;
}

export function SocialFooter({ isLight }: SocialFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className={`relative overflow-hidden transition-colors duration-500 ${
        isLight ? "bg-gray-50 border-t border-gray-200" : "bg-[#080808] border-t border-white/5"
      }`}
    >
      {/* Big CTA Banner */}
      <div className={`py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b text-center ${
        isLight ? "border-gray-200" : "border-white/5"
      }`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <p className={`text-[10px] sm:text-xs uppercase tracking-[0.25em] font-mono font-bold mb-6 ${isLight ? "text-gray-400" : "text-gray-600"}`}>
            Let's Work Together
          </p>
          <h2 className={`text-[10vw] sm:text-[7vw] leading-[0.85] font-serif font-black tracking-tighter uppercase mb-10 ${
            isLight ? "text-gray-900" : "text-white"
          }`}>
            Let's Create<br />Together.
          </h2>
          <motion.a
            href={`mailto:${STUDIO_STATISTICS.email}`}
            whileHover={{ scale: 1.07, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-sans font-bold uppercase tracking-widest transition-colors ${
              isLight ? "bg-gray-900 text-white hover:bg-black" : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Get in Touch <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>

      {/* Info Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isLight ? "bg-gray-900" : "bg-white"}`}>
                <span className={`font-serif font-black text-sm ${isLight ? "text-white" : "text-black"}`}>1FS</span>
              </div>
              <div>
                <span className={`font-serif font-bold text-lg leading-none block ${isLight ? "text-gray-900" : "text-white"}`}>
                  {STUDIO_STATISTICS.studioBrand}
                </span>
                <span className={`text-[10px] font-mono uppercase tracking-wider ${isLight ? "text-gray-400" : "text-gray-600"}`}>
                  Bengaluru
                </span>
              </div>
            </div>
            <p className={`text-sm font-sans leading-relaxed mb-6 ${isLight ? "text-gray-500" : "text-gray-500"}`}>
              Premium visual curation, cinematic event coverage, and elite camera rentals in Bengaluru.
            </p>
            <a
              href={`https://instagram.com/${STUDIO_STATISTICS.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-bold transition-all border hover:scale-105 ${
                isLight
                  ? "bg-white border-gray-200 text-gray-800 hover:border-pink-300"
                  : "bg-white/5 border-white/10 text-white hover:border-pink-500/40"
              }`}
            >
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              @{STUDIO_STATISTICS.instagram}
            </a>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`text-xs uppercase font-sans font-bold tracking-widest mb-5 ${isLight ? "text-gray-900" : "text-white"}`}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${STUDIO_STATISTICS.phone}`} className={`flex items-center gap-3 text-sm font-sans hover:translate-x-1 transition-transform ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}>
                  <Phone className="w-4 h-4 shrink-0" />
                  +91 {STUDIO_STATISTICS.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${STUDIO_STATISTICS.email}`} className={`flex items-center gap-3 text-sm font-sans hover:translate-x-1 transition-transform break-all ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}>
                  <Mail className="w-4 h-4 shrink-0" />
                  {STUDIO_STATISTICS.email}
                </a>
              </li>
              <li>
                <a href={`https://instagram.com/${STUDIO_STATISTICS.devInstagram}`} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 text-sm font-sans hover:translate-x-1 transition-transform ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}>
                  <Instagram className="w-4 h-4 shrink-0" />
                  @{STUDIO_STATISTICS.devInstagram} (Dev)
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className={`text-xs uppercase font-sans font-bold tracking-widest mb-5 ${isLight ? "text-gray-900" : "text-white"}`}>
              Location
            </h4>
            <div className={`flex items-start gap-3 text-sm font-sans leading-relaxed ${isLight ? "text-gray-500" : "text-gray-400"}`}>
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{STUDIO_STATISTICS.address}</span>
            </div>
          </div>

          {/* Policy */}
          <div>
            <h4 className={`text-xs uppercase font-sans font-bold tracking-widest mb-5 ${isLight ? "text-gray-900" : "text-white"}`}>
              Rental Policy
            </h4>
            <div className={`p-4 rounded-2xl border ${isLight ? "bg-white border-gray-200" : "bg-white/5 border-white/8"}`}>
              <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide mb-2 ${isLight ? "text-gray-800" : "text-white"}`}>
                <Shield className="w-3.5 h-3.5" />
                ID Verification
              </div>
              <p className={`text-xs font-sans leading-relaxed ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                Aadhaar / Government ID and a refundable security deposit required before gear handover.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 pt-10 mt-10 border-t text-xs font-sans ${
          isLight ? "border-gray-200 text-gray-400" : "border-white/5 text-gray-600"
        }`}>
          <div>© {year} {STUDIO_STATISTICS.studioBrand} · All rights reserved</div>
          <div className="flex items-center gap-2">
            Built by
            <a
              href={`https://wa.me/${STUDIO_STATISTICS.whatsappNum}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 font-medium underline underline-offset-2 hover:opacity-70 transition-opacity ${isLight ? "text-gray-600" : "text-gray-400"}`}
            >
              {STUDIO_STATISTICS.developerName} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
