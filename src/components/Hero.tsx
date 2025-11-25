import { useState, useEffect } from "react";
import { Search, Star, Shield, DollarSign, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-bg.png";
import { db } from "@/firebaseConfig";
import { collection, onSnapshot, query, CollectionReference } from "firebase/firestore";
import { Vehicle } from "@/types/vehicle";

type VehicleData = Omit<Vehicle, 'id'>;
const vehiclesCollectionRef = collection(db, "vehicles") as CollectionReference<VehicleData>;

const Hero = () => {
  const navigate = useNavigate();
  const [searchMake, setSearchMake] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [makes, setMakes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(vehiclesCollectionRef);
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const vehicleList = snapshot.docs.map(doc => doc.data() as VehicleData);
        const uniqueMakes = Array.from(new Set(vehicleList.map(v => v.make))).sort();
        setMakes(uniqueMakes);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching makes:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchMake) searchParams.set("make", searchMake);
    if (searchModel) searchParams.set("model", searchModel);
    if (maxPrice) searchParams.set("maxPrice", maxPrice);
    navigate(`/inventory?${searchParams.toString()}`);
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with enhanced overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-cyan-900/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 pb-16">
        <div className="animate-fade-in">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full mb-6 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">Premium Dealership Experience</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Quality Used Cars in{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Felton, DE
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Your trusted local dealership for affordable, reliable vehicles with
            financing options that work for you.
          </p>

          {/* Search Bar - Enhanced */}
          <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-cyan-900/20 max-w-5xl mx-auto mb-12 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Search className="h-5 w-5 text-cyan-400" />
                Find Your Perfect Car
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={searchMake} onValueChange={setSearchMake} disabled={loading}>
                <SelectTrigger className="bg-slate-800 border-2 border-slate-700 text-white font-medium hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 h-12">
                  <SelectValue placeholder={loading ? "Loading..." : "Make"} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {makes.map((make) => (
                    <SelectItem key={make} value={make.toLowerCase()} className="text-white hover:bg-slate-700 focus:bg-slate-700">
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Model"
                value={searchModel}
                onChange={(e) => setSearchModel(e.target.value)}
                className="bg-slate-800 border-2 border-slate-700 text-white font-medium hover:border-cyan-500/50 focus:border-cyan-500 placeholder:text-slate-500 h-12"
              />

              <Select value={maxPrice} onValueChange={setMaxPrice}>
                <SelectTrigger className="bg-slate-800 border-2 border-slate-700 text-white font-medium hover:border-cyan-500/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 h-12">
                  <SelectValue placeholder="Max Price" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="10000" className="text-white hover:bg-slate-700 focus:bg-slate-700">Under $10,000</SelectItem>
                  <SelectItem value="15000" className="text-white hover:bg-slate-700 focus:bg-slate-700">Under $15,000</SelectItem>
                  <SelectItem value="20000" className="text-white hover:bg-slate-700 focus:bg-slate-700">Under $20,000</SelectItem>
                  <SelectItem value="25000" className="text-white hover:bg-slate-700 focus:bg-slate-700">Under $25,000</SelectItem>
                  <SelectItem value="30000" className="text-white hover:bg-slate-700 focus:bg-slate-700">Under $30,000</SelectItem>
                </SelectContent>
              </Select>

              <Button
                className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-900/50 hover:shadow-cyan-900/70 hover:scale-105 transition-all duration-300"
                onClick={handleSearch}
              >
                <Search className="h-5 w-5 mr-2" />
                Search Cars
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="text-lg px-10 py-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-2xl shadow-cyan-900/50 hover:shadow-cyan-900/70 hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/inventory")}
            >
              View Our Inventory
            </Button>
            <Button
              size="lg"
              className="text-lg px-10 py-6 bg-slate-900/90 backdrop-blur-sm border-2 border-slate-700 hover:border-cyan-500 text-white hover:bg-slate-800 font-bold shadow-xl hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/contact")}
            >
              Contact Us Today
            </Button>
          </div>

          {/* Trust Indicators - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group flex flex-col items-center text-white p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/70 transition-all duration-300">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-5 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 border border-cyan-500/20">
                <DollarSign className="h-10 w-10 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                Affordable Quality Cars
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Best prices on quality pre-owned vehicles
              </p>
            </div>

            <div className="group flex flex-col items-center text-white p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/70 transition-all duration-300">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-5 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 border border-cyan-500/20">
                <Shield className="h-10 w-10 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">Financing Options</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Flexible payment plans for every budget
              </p>
            </div>

            <div className="group flex flex-col items-center text-white p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/70 transition-all duration-300">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-5 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 border border-cyan-500/20">
                <Star className="h-10 w-10 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                Trusted in Felton, DE
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Serving our community with integrity
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;