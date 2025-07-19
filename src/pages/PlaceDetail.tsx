import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Clock, Phone, Star, Bookmark, Share, Navigation } from "lucide-react";
import Navbar from "@/components/Navbar";

const PlaceDetail = () => {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Sample place data - in real app, fetch based on ID
  const place = {
    id: 1,
    name: "Central Mosque of Yala",
    category: "mosque",
    description: "The Central Mosque of Yala stands as a magnificent architectural masterpiece and spiritual center of the community. Built in traditional Islamic architecture with modern touches, this mosque serves not only as a place of worship but also as a cultural landmark that represents the rich Islamic heritage of the region.",
    fullDescription: "This beautiful mosque welcomes visitors to experience the peaceful atmosphere and admire the intricate architectural details. The mosque features stunning geometric patterns, beautiful calligraphy, and a serene prayer hall that can accommodate hundreds of worshippers. The courtyard provides a tranquil space for reflection and community gatherings.",
    images: [
      "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 127,
    openHours: "5:00 AM - 10:00 PM",
    phone: "+66 73 212 345",
    location: "Yala City Center",
    address: "123 Sateng Nok Road, Yala City Center, Yala 95000",
    coordinates: { lat: 6.5411, lng: 101.2812 },
    amenities: ["Free Parking", "Wheelchair Accessible", "Air Conditioning", "Prayer Mats", "Ablution Area"],
    tips: [
      "Dress modestly and remove shoes before entering",
      "Best time to visit is during sunset prayers for beautiful lighting", 
      "Guided tours available on weekends",
      "Photography allowed in courtyard only"
    ]
  };

  const reviews = [
    {
      id: 1,
      name: "Ahmad Hassan",
      rating: 5,
      date: "2 weeks ago",
      comment: "Beautiful mosque with stunning architecture. Very peaceful and welcoming to visitors."
    },
    {
      id: 2,
      name: "Sarah Chen",
      rating: 5,
      date: "1 month ago", 
      comment: "Amazing cultural experience. The architecture is breathtaking and the atmosphere is so serene."
    },
    {
      id: 3,
      name: "Mohammed Ali",
      rating: 4,
      date: "2 months ago",
      comment: "Well maintained mosque with beautiful Islamic art. Parking can be limited during prayer times."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/places" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Places
        </Link>

        {/* Hero Image */}
        <div className="relative mb-8 rounded-lg overflow-hidden shadow-card">
          <img
            src={place.images[0]}
            alt={place.name}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{place.name}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                🕌 Mosque
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{place.rating}</span>
                <span className="text-white/80">({place.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>About This Place</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{place.description}</p>
                <p className="text-muted-foreground">{place.fullDescription}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Amenities & Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {place.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Visitor Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {place.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Reviews ({place.reviewCount})</CardTitle>
                <CardDescription>What visitors are saying</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{review.name}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Visit Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{place.address}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Opening Hours</p>
                    <p className="text-sm text-muted-foreground">{place.openHours}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-sm text-muted-foreground">{place.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-48 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Interactive map would appear here</p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Photo Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {place.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${place.name} ${index + 2}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;