import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, MapPin, Calendar, Star, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Profile = () => {
  const [user] = useState({
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    joinDate: "January 2024",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150&h=150&fit=crop&crop=face"
  });

  const [savedPlaces] = useState([
    {
      id: 1,
      name: "Central Mosque of Yala",
      category: "mosque",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=300&h=200&fit=crop",
      rating: 4.8,
      savedDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Mama's Kitchen", 
      category: "restaurant",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop",
      rating: 4.6,
      savedDate: "2024-01-14"
    },
    {
      id: 3,
      name: "Riverside Park",
      category: "attraction", 
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop",
      rating: 4.5,
      savedDate: "2024-01-12"
    }
  ]);

  const [tripHistory] = useState([
    {
      id: 1,
      title: "Cultural Heritage Tour",
      date: "2024-01-10",
      duration: "Full Day",
      places: ["Central Mosque", "Heritage Museum", "Traditional Market"],
      status: "completed"
    },
    {
      id: 2,
      title: "Food Adventure",
      date: "2024-01-05",
      duration: "Half Day",
      places: ["Mama's Kitchen", "Street Food Market", "Coffee House"],
      status: "completed"
    },
    {
      id: 3,
      title: "Nature & Relaxation",
      date: "2024-01-20",
      duration: "Full Day",
      places: ["Riverside Park", "Sunset Viewpoint", "Mountain Trail"],
      status: "upcoming"
    }
  ]);

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      mosque: "🕌",
      restaurant: "🍜",
      hotel: "🏨",
      transport: "🚐",
      attraction: "🎯"
    };
    return icons[category] || "📍";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="shadow-card mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-foreground mb-2">{user.name}</h1>
                <p className="text-muted-foreground mb-4">{user.email}</p>
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Member since {user.joinDate}
                  </div>
                  <div className="flex items-center gap-2">
                    <Bookmark className="h-4 w-4" />
                    {savedPlaces.length} saved places
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {tripHistory.filter(t => t.status === "completed").length} trips completed
                  </div>
                </div>
              </div>
              
              <Button className="mt-4 md:mt-0">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">{savedPlaces.length}</div>
              <p className="text-muted-foreground">Saved Places</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-secondary mb-2">
                {tripHistory.filter(t => t.status === "completed").length}
              </div>
              <p className="text-muted-foreground">Trips Completed</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">
                {tripHistory.filter(t => t.status === "upcoming").length}
              </div>
              <p className="text-muted-foreground">Upcoming Trips</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="saved" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="saved">Saved Places</TabsTrigger>
            <TabsTrigger value="trips">Trip History</TabsTrigger>
          </TabsList>

          <TabsContent value="saved">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Your Saved Places</CardTitle>
                <CardDescription>
                  Places you've bookmarked for future visits
                </CardDescription>
              </CardHeader>
              <CardContent>
                {savedPlaces.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedPlaces.map((place) => (
                      <Card key={place.id} className="overflow-hidden group hover:shadow-hover transition-all">
                        <div className="relative">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                          />
                          <Badge variant="secondary" className="absolute top-2 left-2">
                            {getCategoryIcon(place.category)}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">{place.name}</h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{place.rating}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              Saved {place.savedDate}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Link to={`/place/${place.id}`} className="flex-1">
                              <Button size="sm" variant="outline" className="w-full">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No saved places yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start exploring and save places you'd like to visit
                    </p>
                    <Link to="/places">
                      <Button>Browse Places</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trips">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Trip History</CardTitle>
                <CardDescription>
                  Your planned and completed trips in Yala
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tripHistory.map((trip) => (
                    <Card key={trip.id} className="border hover:shadow-hover transition-all">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{trip.title}</h3>
                            <p className="text-muted-foreground">{trip.duration} trip</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={trip.status === "completed" ? "default" : "secondary"}>
                              {trip.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">{trip.date}</p>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-2">Included Places:</p>
                          <div className="flex flex-wrap gap-1">
                            {trip.places.map((place, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {place}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          {trip.status === "upcoming" && (
                            <Button size="sm" variant="outline">
                              Edit Trip
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <Link to="/plan-trip">
                    <Button>Plan New Trip</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;