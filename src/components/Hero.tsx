import { useState, useEffect } from "react";
import { Search } from "lucide-react";
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
    <section className="relative min-h-[600px] flex items-center justify-center bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Quality Used Cars in Indianapolis
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Your trusted dealership for affordable, reliable vehicles
        </p>

        <div className="bg-white rounded-lg p-6 shadow-xl max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={searchMake} onValueChange={setSearchMake} disabled={loading}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder={loading ? "Loading..." : "Make"} />
              </SelectTrigger>
              <SelectContent>
                {makes.map((make) => (
                  <SelectItem key={make} value={make.toLowerCase()}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Model"
              value={searchModel}
              onChange={(e) => setSearchModel(e.target.value)}
              className="h-12"
            />

            <Select value={maxPrice} onValueChange={setMaxPrice}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Max Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10000">Under $10,000</SelectItem>
                <SelectItem value="15000">Under $15,000</SelectItem>
                <SelectItem value="20000">Under $20,000</SelectItem>
                <SelectItem value="25000">Under $25,000</SelectItem>
                <SelectItem value="30000">Under $30,000</SelectItem>
              </SelectContent>
            </Select>

            <Button
              className="h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              onClick={handleSearch}
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            onClick={() => navigate("/inventory")}
          >
            View Inventory
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white hover:bg-gray-100 text-gray-900 px-8"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;