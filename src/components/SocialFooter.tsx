import React from "react";
import { Instagram, Mail, Phone, MapPin, ExternalLink, ArrowUpRight, Shield } from "lucide-react";
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
      className={`mt-auto relative overflow-hidden transition-colors duration-500 pt-24 pb-8 px-4 sm:px-6 lg:px-8 border-t ${
        isLight ? "bg-white border-gray-200" : "bg-[#050505] border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Massive Typography Banner */}
        <div className="mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className={`text-[12vw] sm:text-[10vw] leading-[0.8] font-serif font-black tracking-tighter uppercase mb-6 ${
              isLight ? "text-black" : "text-white"
            }`}>
              Let's Create<br />Together.
            </h2>
          </motion.div>
          <motion.a 
            href={`mailto:${STUDIO_STATISTICS.email}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-sans font-bold uppercase tracking-widest transition-transform hover:scale-105 ${
              isLight ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            Get in Touch <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Info Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b ${
          isLight ? "border-gray-200" : "border-white/10"
        }`}>
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center ${isLight ? "bg-black" : "bg-white"}`}>
                <span className={`font-sans font-black text-xl tracking-tight ${isLight ? "text-white" : "text-black"}`}>1F</span>
              </div>
              <div>
                <span className={`font-serif italic text-2xl font-bold leading-none block ${isLight ? "text-black" : "text-white"}`}>
                  1FS Photography
                </span>
              </div>
            </div>
            <p className={`text-sm font-sans mb-8 leading-relaxed ${isLight ? "text-gray-500" : "text-gray-400"}`}>
              Premium visual curation, cinematic event coverage, and elite camera rentals in Bengaluru.
            </p>
            <a
              href="https://instagram.com/_.hemxnth__"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-bold transition-all border ${
                isLight
                  ? "bg-gray-50 border-gray-200 text-black hover:border-[#E1306C]"
                  : "bg-white/5 border-white/10 text-white hover:border-[#E1306C]"
              }`}
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span>@_.hemxnth__ (Dev)</span>
            </a>
          </div>

          {/* Contact Links */}
          <div className="lg:col-span-1">
            <h4 className={`text-xs uppercase font-sans font-bold tracking-widest mb-6 ${isLight ? "text-black" : "text-white"}`}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${STUDIO_STATISTICS.phone}`} className={`flex items-center gap-3 text-sm font-sans hover:translate-x-1 transition-transform ${isLight ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"}`}>
                  <Phone className="w-4 h-4" /> +91 {STUDIO_STATISTICS.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${STUDIO_STATISTICS.email}`} className={`flex items-center gap-3 text-sm font-sans hover:translate-x-1 transition-transform ${isLight ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"}`}>
                  <Mail className="w-4 h-4" /> {STUDIO_STATISTICS.email}
                </a>
              </li>
              <li>
                <a href={`https://instagram.com/1fs_photography`} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 text-sm font-sans hover:translate-x-1 transition-transform ${isLight ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"}`}>
                  <Instagram className="w-4 h-4" /> @1fs_photography
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div className="lg:col-span-1">
            <h4 className={`text-xs uppercase font-sans font-bold tracking-widest mb-6 ${isLight ? "text-black" : "text-white"}`}>
              Location
            </h4>
            <div className={`flex items-start gap-3 text-sm font-sans leading-relaxed ${isLight ? "text-gray-600" : "text-gray-400"}`}>
              <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{STUDIO_STATISTICS.address}</span>
            </div>
          </div>

          {/* Policy */}
          <div className="lg:col-span-1">
            <h4 className={`text-xs uppercase font-sans font-bold tracking-widest mb-6 ${isLight ? "text-black" : "text-white"}`}>
              Rental Policy
            </h4>
            <div className={`p-5 rounded-2xl border ${isLight ? "bg-gray-50 border-gray-200" : "bg-white/5 border-white/10"}`}>
              <div className={`flex items-center gap-2 text-xs uppercase font-sans font-bold mb-2 ${isLight ? "text-black" : "text-white"}`}>
                <Shield className="w-4 h-4" />
                ID Verification
              </div>
              <p className={`text-xs font-sans leading-relaxed ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                Aadhaar / Government ID and a small security deposit are required before gear handover.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs font-sans font-medium uppercase tracking-wider ${isLight ? "text-gray-500" : "text-gray-400"}`}>
          <div>
            © {year} 1FS Photography · All rights reserved
          </div>
          <div className="flex items-center gap-2">
            Built by 
            <a href="https://wa.me/919538520031" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 border-b pb-0.5 hover:opacity-70 transition-opacity ${isLight ? "text-black border-black" : "text-white border-white"}`}>
              Hemanth Kumar K <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
