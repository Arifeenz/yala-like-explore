import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Filter, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Places = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Places", icon: "🌟" },
    { id: "mosque", name: "Mosques", icon: "🕌" },
    { id: "restaurant", name: "Restaurants", icon: "🍜" },
    { id: "hotel", name: "Hotels", icon: "🏨" },
    { id: "transport", name: "Transport", icon: "🚐" },
    { id: "attraction", name: "Attractions", icon: "🎯" }
  ];

  const samplePlaces = [
    {
      id: 1,
      name: "Central Mosque of Yala",
      category: "mosque",
      description: "Beautiful central mosque with stunning architecture and peaceful atmosphere.",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=250&fit=crop",
      rating: 4.8,
      openHours: "5:00 AM - 10:00 PM",
      location: "Yala City Center"
    },
    {
      id: 2,
      name: "Mama's Kitchen",
      category: "restaurant",
      description: "Authentic Southern Thai cuisine with family recipes passed down generations.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=250&fit=crop",
      rating: 4.6,
      openHours: "8:00 AM - 9:00 PM",
      location: "Old Town Market"
    },
    {
      id: 3,
      name: "Yala Garden Hotel",
      category: "hotel",
      description: "Comfortable accommodation with modern amenities and traditional hospitality.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=250&fit=crop",
      rating: 4.4,
      openHours: "24 Hours",
      location: "Business District"
    },
    {
      id: 4,
      name: "Betong Scenic Route",
      category: "attraction",
      description: "Breathtaking mountain views and natural beauty along the scenic driving route.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=250&fit=crop",
      rating: 4.9,
      openHours: "Dawn to Dusk",
      location: "Betong Road"
    },
    {
      id: 5,
      name: "Local Tuk-Tuk Service",
      category: "transport",
      description: "Friendly local transport service covering all major attractions in Yala.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=250&fit=crop",
      rating: 4.3,
      openHours: "6:00 AM - 11:00 PM",
      location: "Multiple Locations"
    },
    {
      id: 6,
      name: "Riverside Park",
      category: "attraction",
      description: "Peaceful riverside park perfect for evening walks and family picnics.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=250&fit=crop",
      rating: 4.5,
      openHours: "5:00 AM - 8:00 PM",
      location: "Riverside District"
    }
  ];

  const filteredPlaces = samplePlaces.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 animate-fade-in">
            Discover Amazing Places
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up">
            Explore the best of Yala, recommended by locals
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search places..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="transition-all hover:shadow-hover"
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-muted-foreground">
            Found {filteredPlaces.length} places
          </p>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <Card key={place.id} className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                    {categories.find(c => c.id === place.category)?.icon}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{place.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{place.rating}</span>
                  </div>
                </div>
                <CardDescription>{place.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {place.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {place.openHours}
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Link to={`/place/${place.id}`} className="flex-1">
                    <Button className="w-full" variant="default">
                      View Details
                    </Button>
                  </Link>
                  <Button variant="outline" size="icon">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No places found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Places;