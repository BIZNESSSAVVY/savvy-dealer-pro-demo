// src/pages/Index.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import DealershipHighlight from "@/components/DealershipHighlight";
import VehicleCard, { Vehicle } from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { db } from "@/firebaseConfig";
import { collection, query, orderBy, limit, onSnapshot, CollectionReference } from "firebase/firestore";

type VehicleData = Omit<Vehicle, 'id'>;
const vehiclesCollectionRef = collection(db, "vehicles") as CollectionReference<VehicleData>;

const Index = () => {
  const navigate = useNavigate();
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="bg-white">
      <Hero />
      
      <DealershipHighlight />
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Vehicles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hand-picked quality vehicles from our inventory
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Loading vehicles...</p>
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
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                  onClick={() => navigate('/inventory')}
                >
                  View All Inventory
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No vehicles available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Savvy D's?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your trusted automotive partner in Indianapolis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Quality Assured</h3>
              <p className="text-gray-600">
                Every vehicle undergoes thorough inspection
              </p>
            </div>
            
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Local Expertise</h3>
              <p className="text-gray-600">
                Serving Indianapolis with personalized service
              </p>
            </div>
            
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Quick Financing</h3>
              <p className="text-gray-600">
                Fast approval with flexible payment options
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Browse our inventory or contact us today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8"
              onClick={() => navigate('/inventory')}
            >
              Browse Inventory
            </Button>
            <Button 
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;