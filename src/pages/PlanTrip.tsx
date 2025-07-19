import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, DollarSign, MapPin, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";

const PlanTrip = () => {
  const [formData, setFormData] = useState({
    date: "",
    timeOfDay: "",
    budget: "",
    style: "",
  });
  const [tripPlan, setTripPlan] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate sample trip plan based on form data
    const samplePlan = {
      title: "Your Perfect Yala Adventure",
      duration: "Full Day Experience",
      activities: [
        {
          time: "9:00 AM",
          activity: "Visit Central Mosque",
          description: "Start your day with the beautiful architecture",
          duration: "1 hour"
        },
        {
          time: "11:00 AM", 
          activity: "Local Market Tour",
          description: "Experience authentic local culture and food",
          duration: "1.5 hours"
        },
        {
          time: "1:00 PM",
          activity: "Traditional Thai Lunch",
          description: "Enjoy local specialties at a community restaurant",
          duration: "1 hour"
        },
        {
          time: "3:00 PM",
          activity: "Temple Visit",
          description: "Explore the spiritual side of Yala",
          duration: "2 hours"
        }
      ],
      totalCost: `${formData.budget || "500-800"} THB`,
      tips: ["Bring comfortable walking shoes", "Respect local customs", "Try the local fruits"]
    };
    
    setTripPlan(samplePlan);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 animate-fade-in">
            Plan Your Perfect Trip
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up">
            Tell us your preferences and we'll create a personalized itinerary
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Trip Preferences
              </CardTitle>
              <CardDescription>
                Help us create the perfect experience for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Travel Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Preferred Time
                  </Label>
                  <Select onValueChange={(value) => setFormData({...formData, timeOfDay: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select time of day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                      <SelectItem value="evening">Evening (6PM - 10PM)</SelectItem>
                      <SelectItem value="fullday">Full Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Budget (THB)
                  </Label>
                  <Select onValueChange={(value) => setFormData({...formData, budget: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500-800">Budget (500-800 THB)</SelectItem>
                      <SelectItem value="800-1500">Moderate (800-1,500 THB)</SelectItem>
                      <SelectItem value="1500-3000">Premium (1,500-3,000 THB)</SelectItem>
                      <SelectItem value="3000+">Luxury (3,000+ THB)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Trip Style
                  </Label>
                  <Select onValueChange={(value) => setFormData({...formData, style: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="What kind of experience?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relaxing">Relaxing & Cultural</SelectItem>
                      <SelectItem value="adventurous">Adventurous & Active</SelectItem>
                      <SelectItem value="foodie">Food & Local Experiences</SelectItem>
                      <SelectItem value="family">Family Friendly</SelectItem>
                      <SelectItem value="spiritual">Spiritual & Peaceful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full shadow-hover hover:shadow-glow transition-all">
                  Generate My Trip
                </Button>
              </form>
            </CardContent>
          </Card>

          {tripPlan && (
            <Card className="mt-8 shadow-card animate-slide-up">
              <CardHeader>
                <CardTitle className="text-primary">{tripPlan.title}</CardTitle>
                <CardDescription>
                  {tripPlan.duration} • Estimated Cost: {tripPlan.totalCost}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tripPlan.activities.map((activity: any, index: number) => (
                    <div key={index} className="border-l-4 border-primary pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-foreground">{activity.activity}</h3>
                        <span className="text-sm text-primary font-medium">{activity.time}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{activity.description}</p>
                      <span className="text-xs text-muted-foreground">Duration: {activity.duration}</span>
                    </div>
                  ))}
                  
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Pro Tips:</h4>
                    <ul className="space-y-1">
                      {tripPlan.tips.map((tip: string, index: number) => (
                        <li key={index} className="text-sm text-muted-foreground">• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanTrip;