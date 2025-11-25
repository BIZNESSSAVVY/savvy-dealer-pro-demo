// src/components/VehicleCard.tsx

import { Image, Gauge, Calendar, Fuel, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
  const images = vehicle.images ?? []; 
  const imageUrls = images.length > 0 ? images : ["/placeholder-car.jpg"];

  return (
    <Card className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <CardHeader className="p-0 relative">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {imageUrls.map((url, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[3/2] w-full bg-gray-100">
                  <img
                    src={url}
                    alt={`${vehicle.make} ${vehicle.model} image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-car.jpg";
                    }}
                  />
                  {images.length > 0 && (
                    <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                      <Image className="h-3 w-3 mr-1" />
                      {index + 1} / {images.length}
                    </Badge>
                  )}
                  
                  {vehicle.stockNumber && (
                    <Badge className="absolute top-2 left-2 bg-white text-gray-900 font-mono">
                      #{vehicle.stockNumber}
                    </Badge>
                  )}
                  
                  {(vehicle.isNew || vehicle.isFeatured) && (
                    <Badge className={`absolute top-2 right-2 ${vehicle.isNew ? 'bg-blue-600' : 'bg-orange-500'} text-white`}>
                      {vehicle.isNew ? 'New Arrival' : 'Featured'}
                    </Badge>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {imageUrls.length > 1 && (
            <>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </>
          )}
        </Carousel>
      </CardHeader>

      <CardContent className="p-5">
        <CardTitle className="text-xl font-bold mb-2 text-gray-900">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </CardTitle>
        <p className="text-3xl font-bold text-blue-600 mb-4">
          {formatPrice(vehicle.price)}
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-gray-500" />
            <span>{formatMileage(vehicle.mileage)} mi</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-gray-500" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-gray-500" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>{vehicle.year}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex gap-3">
        <Button 
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" 
          onClick={() => onViewDetails(vehicle.id)}
        >
          View Details
        </Button>
        <Button 
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white" 
          onClick={() => onScheduleTest(vehicle.id)}
        >
          Schedule Test
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;

export type { Vehicle };