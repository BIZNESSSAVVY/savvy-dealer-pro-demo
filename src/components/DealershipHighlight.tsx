import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";
import dealershipImage from "@/images/dealership.jpg";

const DealershipHighlight: React.FC = () => {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Visit Savvy D's
          </h2>
          <p className="text-xl text-gray-600">
            Your trusted dealership in Indianapolis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={dealershipImage}
              alt="Savvy D's Dealership"
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Quality used cars, flexible financing options, and friendly local service. 
                We're here to help you find the perfect vehicle that fits your budget and lifestyle.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600">123 Demo Street, Indianapolis, IN 46204</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">(317) 741-7443</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Hours</p>
                    <p className="text-gray-600">Mon-Fri: 9 AM - 6 PM | Sat: 10 AM - 4 PM</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/financing" className="w-full">
                  <button className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                    Apply for Financing
                  </button>
                </Link>
                
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=123+Demo+Street,+Indianapolis,+IN+46204"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <button className="w-full px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg">
                    Get Directions
                  </button>
                </a>
              </div>

              <Link to="/inventory" className="block mt-4">
                <button className="w-full px-8 py-4 border-2 border-gray-300 hover:border-blue-600 text-gray-900 font-semibold rounded-lg">
                  Browse Inventory
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealershipHighlight;