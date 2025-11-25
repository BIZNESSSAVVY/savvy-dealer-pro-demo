import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MapPin, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Inventory", path: "/inventory" },
    { name: "Financing", path: "/financing" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleCallNow = () => {
    window.location.href = "tel:+13022847114";
  };

  return (
    <nav className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50 shadow-2xl">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-2 rounded-xl border border-slate-700 group-hover:border-cyan-500/50 transition-all">
                <img src={logo} alt="Savvy D's" className="h-10 w-auto" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Savvy D's
              </h1>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Zap className="h-3 w-3 text-cyan-400" />
                Felton, Delaware
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                  isActive(item.path)
                    ? "text-cyan-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                )}
                {!isActive(item.path) && (
                  <div className="absolute inset-0 bg-slate-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <Phone className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-slate-300">(302) 284-7114</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-slate-300">Felton, DE</span>
            </div>
            <Button 
              onClick={handleCallNow}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold px-6 py-2 rounded-lg shadow-lg shadow-blue-900/50 hover:shadow-blue-900/70 hover:scale-105 transition-all duration-300"
            >
              Call Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-all duration-300 px-4 py-3 rounded-lg ${
                    isActive(item.path)
                      ? "text-cyan-400 bg-slate-800/70 border-l-4 border-cyan-500"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 py-4 border-t border-slate-800 mt-4 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-slate-300 px-3 py-2 bg-slate-800/50 rounded-lg">
                  <Phone className="h-4 w-4 text-cyan-400" />
                  <span>(302) 284-7114</span>
                </div>
                <Button 
                  onClick={handleCallNow}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-900/50"
                >
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;