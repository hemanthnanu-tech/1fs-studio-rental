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
        isLight ? "bg-white/40 backdrop-blur-2xl border-t border-gray-200" : "bg-black/40 backdrop-blur-2xl border-t border-white/5"
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
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-sans font-bold uppercase tracking-widest transition-all shadow-xl ${
              isLight ? "bg-gray-900 text-white hover:bg-black shadow-black/10" : "bg-white text-black hover:bg-gray-100 shadow-white/10"
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
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://instagram.com/${STUDIO_STATISTICS.devInstagram}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-bold font-sans transition-all border ${
                    isLight 
                      ? "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100 text-indigo-900 shadow-sm hover:shadow-md hover:border-indigo-200"
                      : "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:border-indigo-500/40"
                  }`}
                >
                  <Instagram className="w-3.5 h-3.5" />
                  @{STUDIO_STATISTICS.devInstagram} <span className="opacity-60 text-[9px] uppercase tracking-widest">(Developer)</span>
                </motion.a>
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
            <div className={`p-5 rounded-2xl border backdrop-blur-xl ${isLight ? "bg-white/60 border-gray-200" : "bg-white/5 border-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.02)]"}`}>
              <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide mb-2 ${isLight ? "text-gray-900" : "text-white"}`}>
                <Shield className="w-3.5 h-3.5" />
                ID Verification
              </div>
              <p className={`text-xs font-sans leading-relaxed ${isLight ? "text-gray-600" : "text-gray-300"}`}>
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
          <div className="flex items-center gap-3">
            <span className={`text-[10px] uppercase tracking-widest font-bold font-mono ${isLight ? "text-gray-400" : "text-gray-600"}`}>
              Developed By
            </span>
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={`https://instagram.com/${STUDIO_STATISTICS.devInstagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold font-sans text-xs transition-all relative group ${
                isLight
                  ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20"
                  : "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              }`}
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-1.5">
                {STUDIO_STATISTICS.developerName}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
