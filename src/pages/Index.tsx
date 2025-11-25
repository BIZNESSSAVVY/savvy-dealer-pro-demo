// src/pages/Index.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import DealershipHighlight from "@/components/DealershipHighlight";
import VehicleCard, { Vehicle } from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, TrendingUp, Sparkles } from "lucide-react";

// 🎯 Firestore Imports
import { db } from "@/firebaseConfig";
import { collection, query, orderBy, limit, onSnapshot, CollectionReference } from "firebase/firestore";

type VehicleData = Omit<Vehicle, 'id'>;
const vehiclesCollectionRef = collection(db, "vehicles") as CollectionReference<VehicleData>;

const Index = () => {
  const navigate = useNavigate();
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // 🎯 Fetch 3 vehicles from Firestore
  useEffect(() => {
    const q = query(
      vehiclesCollectionRef, 
      orderBy("year", "desc"), 
      limit(3)
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const vehicleList: Vehicle[] = snapshot.docs.map(doc => {
          const data = doc.data() as VehicleData;
          return {
            id: doc.id,
            ...data,
            images: data.images || [],
            stockNumber: data.stockNumber || undefined,
          } as Vehicle;
        });
        
        setFeaturedVehicles(vehicleList);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching featured vehicles:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleViewDetails = (id: string) => {
    navigate(`/vehicle/${id}`);
  };

  const handleScheduleTest = (id: string) => {
    navigate(`/vehicle/${id}#contact-form`);
  };

  return (
    <div className="bg-slate-950">
      <Hero />
      
      {/* 🎯 DealershipHighlight Section */}
      <DealershipHighlight />
      
      {/* Featured Vehicles Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">Premium Selection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Vehicles
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Hand-picked quality vehicles from our inventory, ready for their new owners
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-700 border-t-cyan-500 mb-4"></div>
              <p className="text-lg text-slate-400">Loading featured vehicles...</p>
            </div>
          ) : featuredVehicles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onViewDetails={handleViewDetails}
                    onScheduleTest={handleScheduleTest}
                  />
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold shadow-2xl shadow-cyan-900/50 hover:shadow-cyan-900/70 hover:scale-105 transition-all duration-300"
                  onClick={() => navigate('/inventory')}
                >
                  View All Inventory
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
              <p className="text-lg text-slate-400">No vehicles available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Why Savvy D's</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Trusted Partner
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              We're not just a car dealership - we're your trusted automotive partner in Felton, Delaware
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-900/20">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">Quality Assured</h3>
                <p className="text-slate-400 leading-relaxed">
                  Every vehicle undergoes thorough inspection and comes with our quality guarantee
                </p>
              </div>
            </div>
            
            <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-900/20">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">Local Expertise</h3>
                <p className="text-slate-400 leading-relaxed">
                  Proudly serving Felton and surrounding communities with personalized service
                </p>
              </div>
            </div>
            
            <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-900/20">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">Quick Financing</h3>
                <p className="text-slate-400 leading-relaxed">
                  Fast approval process with flexible payment options to fit your budget
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Browse our inventory or contact us today to discuss your automotive needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-10 py-6 bg-white text-cyan-600 hover:bg-slate-100 font-bold shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/inventory')}
            >
              Browse Inventory
            </Button>
            <Button 
              size="lg" 
              className="text-lg px-10 py-6 bg-slate-900 hover:bg-slate-800 text-white font-bold border-2 border-white/20 hover:border-white/40 shadow-2xl hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/contact')}
            >
              Contact Us Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;