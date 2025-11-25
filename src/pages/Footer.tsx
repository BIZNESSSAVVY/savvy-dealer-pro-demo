import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Savvy D's
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Premium automotive solutions powered by Savvy OS
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-blue-600 text-sm">Home</Link></li>
              <li><Link to="/inventory" className="text-gray-600 hover:text-blue-600 text-sm">Inventory</Link></li>
              <li><Link to="/financing" className="text-gray-600 hover:text-blue-600 text-sm">Financing</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-blue-600 text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>(317) 741-7443</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>sales@savvyordersystems.com</span>
              </div>
            </div>
          </div>

          {/* Location & Hours */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Visit Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                <span>123 Demo Street<br />Indianapolis, IN 46204</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
                <span>Mon-Fri: 9 AM - 6 PM<br />Sat: 10 AM - 4 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Savvy D's. All rights reserved.
          </p>
          <a
            href="https://savvyordersystems.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            Powered by <span className="font-semibold">Savvy OS</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;