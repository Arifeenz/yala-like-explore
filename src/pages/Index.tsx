import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, TrendingUp, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-yala.jpg";

const Index = () => {
  const featuredPlaces = [
    {
      id: 1,
      name: "Central Mosque of Yala",
      category: "🕌 Mosque",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=250&fit=crop",
      rating: 4.8,
      description: "Beautiful architectural masterpiece and spiritual center"
    },
    {
      id: 2,
      name: "Mama's Kitchen",
      category: "🍜 Restaurant", 
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=250&fit=crop",
      rating: 4.6,
      description: "Authentic Southern Thai cuisine with family recipes"
    },
    {
      id: 3,
      name: "Yala Garden Hotel",
      category: "🏨 Hotel",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=250&fit=crop",
      rating: 4.4,
      description: "Comfortable accommodation with traditional hospitality"
    }
  ];

  const categories = [
    { name: "Mosques", icon: "🕌", count: "12+" },
    { name: "Food", icon: "🍜", count: "25+" },
    { name: "Hotels", icon: "🏨", count: "18+" },
    { name: "Transport", icon: "🚐", count: "8+" }
  ];

  const newsUpdates = [
    {
      title: "New Heritage Trail Opened",
      date: "Jan 15, 2024",
      description: "Discover Yala's rich history through our new guided heritage walking trail."
    },
    {
      title: "Food Festival This Weekend",
      date: "Jan 12, 2024", 
      description: "Join us for authentic Southern Thai cuisine at the weekly night market."
    },
    {
      title: "Community Upload Feature",
      date: "Jan 10, 2024",
      description: "Locals can now easily share their favorite places with visitors."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Beautiful Yala landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Discover Yala <span className="text-primary-glow">Your Way</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up">
              Explore authentic experiences, hidden gems, and local favorites 
              recommended by the Yala community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/plan-trip">
                <Button size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow hover:shadow-hover transition-all">
                  Plan Your Trip
                </Button>
              </Link>
              <Link to="/places">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                  Browse Places
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Stats */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
          <div className="flex gap-8 text-white/90 text-center">
            <div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm">Places</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div>
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm">Visitors</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div>
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Places */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Places
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover the best of Yala, curated by locals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPlaces.map((place, index) => (
            <Card key={place.id} className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 group animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="relative overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge variant="secondary" className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm">
                  {place.category}
                </Badge>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{place.rating}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                <p className="text-muted-foreground mb-4">{place.description}</p>
                <Link to={`/place/${place.id}`}>
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-muted-foreground">
              Find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={category.name} to="/places">
                <Card className="text-center p-6 hover:shadow-hover transition-all duration-300 group cursor-pointer animate-bounce-gentle" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-muted-foreground text-sm">{category.count} places</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest Updates
          </h2>
          <p className="text-xl text-muted-foreground">
            Stay updated with what's happening in Yala
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsUpdates.map((news, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-all animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{news.title}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {news.date}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{news.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Travelers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real experiences from real people
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmad Hassan",
                role: "Solo Traveler",
                quote: "Amazing place! YalaLike helped me discover hidden gems I never would have found on my own. The local recommendations were spot on.",
                rating: 5
              },
              {
                name: "Sarah Chen", 
                role: "Family Visitor",
                quote: "Perfect for planning our family trip. The cultural insights and food recommendations made our visit truly memorable.",
                rating: 5
              },
              {
                name: "Mohammed Ali",
                role: "Business Traveler",
                quote: "Great platform for finding authentic experiences. The community-driven content really shows the real Yala.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <Card key={index} className="shadow-card animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 text-primary text-xl font-bold mb-4">
                <MapPin className="h-6 w-6" />
                <span>YalaLike</span>
              </div>
              <p className="text-white/80">
                Your trusted companion for discovering the authentic Yala experience.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                <li><Link to="/places" className="text-white/80 hover:text-primary transition-colors">Places</Link></li>
                <li><Link to="/plan-trip" className="text-white/80 hover:text-primary transition-colors">Plan Trip</Link></li>
                <li><Link to="/upload" className="text-white/80 hover:text-primary transition-colors">Add Place</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-white/80 hover:text-primary transition-colors">Join Us</Link></li>
                <li><Link to="/profile" className="text-white/80 hover:text-primary transition-colors">Your Profile</Link></li>
                <li><a href="#" className="text-white/80 hover:text-primary transition-colors">Guidelines</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-white/80 hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="text-white/80 hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="text-white/80 hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60">
              © 2024 YalaLike. Made with ❤️ for the Yala community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
