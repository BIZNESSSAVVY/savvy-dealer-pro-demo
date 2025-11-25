import { Phone, MapPin, Mail, Clock, Car, Shield, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Premium gradient background with texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      
      {/* Animated subtle grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }}></div>
      
      {/* Top accent line with gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Savvy D's
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Premium automotive solutions, powered by cutting-edge technology
              </p>
            </div>
            
            {/* Trust Badges */}
            <div className="flex gap-3 mt-6">
              <div className="bg-slate-800/50 backdrop-blur-sm p-2.5 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                <Shield className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-2.5 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                <Award className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-2.5 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                <Car className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <div className="h-px w-6 bg-gradient-to-r from-cyan-500 to-transparent"></div>
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/inventory", label: "Inventory" },
                { to: "/financing", label: "Financing" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-slate-400 hover:text-cyan-400 transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-cyan-400 group-hover:w-4 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <div className="h-px w-6 bg-gradient-to-r from-cyan-500 to-transparent"></div>
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className="group">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300">
                  <div className="mt-0.5 p-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg">
                    <Phone className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Phone</p>
                    <p className="text-slate-200 text-sm font-medium">(302) 284-7114</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300">
                  <div className="mt-0.5 p-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg">
                    <Mail className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Email</p>
                    <p className="text-slate-200 text-sm font-medium break-all">ceceauto@yahoo.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Hours */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
              <div className="h-px w-6 bg-gradient-to-r from-cyan-500 to-transparent"></div>
              Visit Us
            </h4>
            <div className="space-y-4">
              <div className="group">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300">
                  <div className="mt-0.5 p-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg">
                    <MapPin className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Location</p>
                    <p className="text-slate-200 text-sm font-medium leading-snug">102 Lombard St<br />Felton, DE 19943</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300">
                  <div className="mt-0.5 p-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg">
                    <Clock className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Hours</p>
                    <p className="text-slate-200 text-sm font-medium leading-snug">Mon-Fri: 10 AM - 5 PM<br />Sat: 10 AM - 4 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} Savvy D's. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400">Powered by</span>
              <a
                href="https://savvyordersystems.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-900/50 hover:shadow-blue-900/70 hover:scale-105"
              >
                <span>Savvy OS</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;