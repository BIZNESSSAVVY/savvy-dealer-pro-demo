import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            About Savvy D's
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Quality vehicles and exceptional service in Indianapolis
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Savvy D's has been serving Indianapolis and surrounding communities with quality pre-owned vehicles and flexible financing solutions.
                </p>
                <p>
                  We specialize in helping families find reliable transportation with financing options that work for their budget. Our straightforward approach and commitment to customer service have made us a trusted name in the community.
                </p>
                <p>
                  At Savvy D's, we believe everyone deserves access to dependable transportation. That's why we work hard to provide quality vehicles and financing solutions tailored to your needs.
                </p>
              </div>
            </div>
            <div>
              <img
                src="cece.jfif"
                alt="Savvy D's dealership"
                className="rounded-lg w-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Card className="border-gray-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Integrity</h3>
                <p className="text-gray-600 leading-relaxed">
                  Honest, transparent service with every customer. No hidden fees, no pressure.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Quality</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every vehicle is thoroughly inspected to meet our high standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  Proud to be part of Indianapolis and committed to serving our neighbors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="text-white">
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-white text-lg">Happy Customers</div>
            </div>
            <div className="text-white">
              <div className="text-5xl font-bold mb-2">10+</div>
              <div className="text-white text-lg">Years Serving</div>
            </div>
            <div className="text-white">
              <div className="text-5xl font-bold mb-2">4.8</div>
              <div className="text-white text-lg">Star Rating</div>
            </div>
            <div className="text-white">
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-white text-lg">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Ready to Find Your Next Vehicle?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Visit us today and discover why Indianapolis trusts Savvy D's
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/inventory">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg">
                Browse Inventory
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="px-10 py-6 text-lg border-2">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;