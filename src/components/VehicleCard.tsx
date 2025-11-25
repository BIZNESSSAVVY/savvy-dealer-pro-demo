// src/components/VehicleCard.tsx

import { Image, Gauge, Calendar, Fuel, Car, Plus, Maximize, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Import the centralized Vehicle interface from the types folder
import { Vehicle } from "@/types/vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (id: string) => void;
  onScheduleTest: (id: string) => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
};

const formatMileage = (mileage: number) => {
  return new Intl.NumberFormat("en-US").format(mileage);
};

const VehicleCard = ({ vehicle, onViewDetails, onScheduleTest }: VehicleCardProps) => {

  // Ensure 'images' is an array, defaulting to empty array if undefined or null
  const images = vehicle.images ?? []; 
  const imageUrls = images.length > 0 ? images : ["/placeholder-car.jpg"];

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-900/30 bg-slate-900 border border-slate-800 hover:border-cyan-500/50">
      <CardHeader className="p-0 relative">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {imageUrls.map((url, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[3/2] w-full bg-slate-950 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 z-10"></div>
                  <img
                    src={url}
                    alt={`${vehicle.make} ${vehicle.model} image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-car.jpg";
                    }}
                  />
                  {/* Image counter */}
                  {images.length > 0 && (
                    <Badge className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-sm text-cyan-400 hover:bg-slate-900 border border-cyan-500/30 z-20">
                      <Image className="h-3 w-3 mr-1" />
                      {index + 1} / {images.length}
                    </Badge>
                  )}
                  
                  {/* Stock Number Badge - Top Left */}
                  {vehicle.stockNumber && (
                    <Badge className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-slate-300 font-mono text-xs border border-slate-700 hover:bg-slate-900 hover:border-cyan-500/50 transition-all z-20">
                      #{vehicle.stockNumber}
                    </Badge>
                  )}
                  
                  {/* New/Featured Badges - Top Right */}
                  {(vehicle.isNew || vehicle.isFeatured) && (
                    <Badge className={`absolute top-3 right-3 z-20 ${
                      vehicle.isNew 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                    } hover:opacity-90 shadow-lg flex items-center gap-1`}>
                      <Sparkles className="h-3 w-3" />
                      {vehicle.isNew ? 'New Arrival' : 'Featured'}
                    </Badge>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {imageUrls.length > 1 && (
            <>
              <CarouselPrevious className="left-2 bg-slate-900/90 backdrop-blur-sm border-slate-700 hover:bg-cyan-500 hover:border-cyan-500 text-white" />
              <CarouselNext className="right-2 bg-slate-900/90 backdrop-blur-sm border-slate-700 hover:bg-cyan-500 hover:border-cyan-500 text-white" />
            </>
          )}
        </Carousel>
      </CardHeader>

      <CardContent className="p-5 flex-grow bg-gradient-to-b from-slate-900 to-slate-950">
        <CardTitle className="text-xl font-bold mb-2 line-clamp-2 min-h-[56px] text-white group-hover:text-cyan-400 transition-colors">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </CardTitle>
        <div className="mb-4">
          <p className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {formatPrice(vehicle.price)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all">
            <div className="p-1.5 bg-cyan-500/10 rounded">
              <Gauge className="h-4 w-4 text-cyan-400" />
            </div>
            <span className="text-sm text-slate-300">{formatMileage(vehicle.mileage)} mi</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all">
            <div className="p-1.5 bg-cyan-500/10 rounded">
              <Fuel className="h-4 w-4 text-cyan-400" />
            </div>
            <span className="text-sm text-slate-300">{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all">
            <div className="p-1.5 bg-cyan-500/10 rounded">
              <Car className="h-4 w-4 text-cyan-400" />
            </div>
            <span className="text-sm text-slate-300">{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all">
            <div className="p-1.5 bg-cyan-500/10 rounded">
              <Calendar className="h-4 w-4 text-cyan-400" />
            </div>
            <span className="text-sm text-slate-300">{vehicle.year}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex justify-between gap-3 bg-slate-950">
        <Button 
          className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-900/30 hover:shadow-cyan-900/50 hover:scale-105 transition-all duration-300" 
          onClick={() => onViewDetails(vehicle.id)}
        >
          <Maximize className="h-4 w-4 mr-2" />
          View Details
        </Button>
        <Button 
          className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 hover:border-cyan-500/50 hover:text-white shadow-lg hover:scale-105 transition-all duration-300" 
          onClick={() => onScheduleTest(vehicle.id)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Test
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;

// Re-export the Vehicle type
export type { Vehicle };