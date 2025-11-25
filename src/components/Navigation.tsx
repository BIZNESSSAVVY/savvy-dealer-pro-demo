import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
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
    window.location.href = "tel:+13177417443";
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Savvy DS" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Savvy DS</h1>
              <p className="text-xs text-gray-600">Indianapolis, IN</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium ${
                  isActive(item.path)
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Phone className="h-4 w-4 text-blue-600" />
              <span>(317) 741-7443</span>
            </div>
            <Button 
              onClick={handleCallNow}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Call Now
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium px-4 py-2 ${
                    isActive(item.path)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 py-2 border-t border-gray-200 mt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-700 mb-3">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span>(317) 741-7443</span>
                </div>
                <Button 
                  onClick={handleCallNow}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
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