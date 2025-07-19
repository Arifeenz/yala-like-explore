import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload as UploadIcon, MapPin, Camera, Mic, FileText, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Upload = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    address: "",
    phone: "",
    openHours: "",
    image: null as File | null,
    audio: null as File | null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const categories = [
    { value: "mosque", label: "🕌 Mosque" },
    { value: "restaurant", label: "🍜 Restaurant" },
    { value: "hotel", label: "🏨 Hotel" },
    { value: "transport", label: "🚐 Transport" },
    { value: "attraction", label: "🎯 Attraction" },
    { value: "shopping", label: "🛒 Shopping" },
    { value: "entertainment", label: "🎭 Entertainment" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Place submitted successfully!",
        description: "Your submission is now pending review by our team.",
      });
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, audio: e.target.files[0] });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">Thank You!</h1>
            <p className="text-muted-foreground mb-6">
              Your place submission has been received and is now under review. 
              We'll notify you once it's approved and live on YalaLike.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="mr-4">
              Submit Another Place
            </Button>
            <Button variant="outline" onClick={() => window.location.href = "/"}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 animate-fade-in">
            Share Your Favorite Place
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up">
            Help fellow travelers discover amazing places in Yala
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadIcon className="h-5 w-5 text-primary" />
                Add New Place
              </CardTitle>
              <CardDescription>
                Share details about a place you love in Yala. All submissions are reviewed before publishing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  
                  <div>
                    <Label htmlFor="name">Place Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter the name of the place"
                      required
                    />
                  </div>

                  <div>
                    <Label>Category *</Label>
                    <Select onValueChange={(value) => setFormData({...formData, category: value})} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe what makes this place special..."
                      rows={4}
                      required
                    />
                  </div>
                </div>

                {/* Contact & Location */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location & Contact
                  </h3>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Street address or general location"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+66 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="openHours">Opening Hours</Label>
                      <Input
                        id="openHours"
                        value={formData.openHours}
                        onChange={(e) => setFormData({...formData, openHours: e.target.value})}
                        placeholder="e.g., 9:00 AM - 6:00 PM"
                      />
                    </div>
                  </div>
                </div>

                {/* Media Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Media</h3>
                  
                  <div>
                    <Label htmlFor="image" className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Upload Photo
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mt-1"
                    />
                    {formData.image && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Selected: {formData.image.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="audio" className="flex items-center gap-2">
                      <Mic className="h-4 w-4" />
                      Upload Audio Description (Optional)
                    </Label>
                    <Input
                      id="audio"
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioUpload}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload an audio recording describing the place (MP3 format)
                    </p>
                    {formData.audio && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Selected: {formData.audio.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <Button type="submit" className="w-full shadow-hover hover:shadow-glow transition-all">
                    <FileText className="h-4 w-4 mr-2" />
                    Submit for Review
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Your submission will be reviewed by our team before being published
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="mt-6 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Submission Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Ensure all information is accurate and up-to-date</li>
                <li>• Use high-quality photos that represent the place well</li>
                <li>• Be respectful and honest in your descriptions</li>
                <li>• Include practical information that helps other travelers</li>
                <li>• Audio descriptions should be clear and informative</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upload;