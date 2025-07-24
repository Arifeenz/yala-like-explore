import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Camera, MapPin, Clock, Phone, Star, Save, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";

const UpdatePlace = () => {
  const { id } = useParams();
  
  // Mock existing data
  const [placeData, setPlaceData] = useState({
    name: "ร้านอาหารใต้ต้นไผ่",
    category: "restaurant",
    description: "ร้านอาหารใต้แท้ๆ บรรยากาศดี รสชาติถูกปาก ราคาไม่แพง เหมาะสำหรับครอบครัว",
    address: "123 ถนนยะลา ตำบลสะเตง อำเภอเมือง จังหวัดยะลา 95000",
    phone: "073-123456",
    openHours: "08:00 - 22:00",
    website: "www.restaurant-bamboo.com",
    latitude: "6.5404",
    longitude: "101.2801",
    priceRange: "100-300",
    facilities: ["parking", "wifi", "aircondition", "halal"],
    images: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop"
    ]
  });

  const [reviews] = useState([
    {
      id: 1,
      user: "นางสาวมาลี",
      rating: 5,
      comment: "อาหารอร่อยมาก บริการดี บรรยากาศร่มรื่น",
      date: "2024-01-20",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b898?w=50&h=50&fit=crop&crop=face"
    },
    {
      id: 2,
      user: "นายสมชาย",
      rating: 4,
      comment: "รสชาติดี ราคาเหมาะสม แต่ที่จอดรถน้อยไปหน่อย",
      date: "2024-01-18",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
    }
  ]);

  const categoryOptions = [
    { value: "mosque", label: "มัสยิด", icon: "🕌" },
    { value: "restaurant", label: "ร้านอาหาร", icon: "🍜" },
    { value: "hotel", label: "โรงแรม", icon: "🏨" },
    { value: "transport", label: "การขนส่ง", icon: "🚐" },
    { value: "attraction", label: "สถานที่ท่องเที่ยว", icon: "🎯" },
    { value: "shopping", label: "ช้อปปิ้ง", icon: "🛍️" }
  ];

  const facilityOptions = [
    { value: "parking", label: "ที่จอดรถ", icon: "🚗" },
    { value: "wifi", label: "WiFi", icon: "📶" },
    { value: "aircondition", label: "เครื่องปรับอากาศ", icon: "❄️" },
    { value: "halal", label: "อาหารฮาลาล", icon: "🥗" },
    { value: "disabled", label: "เข้าถึงได้สำหรับผู้พิการ", icon: "♿" },
    { value: "family", label: "เหมาะสำหรับครอบครัว", icon: "👨‍👩‍👧‍👦" },
    { value: "creditcard", label: "รับบัตรเครดิต", icon: "💳" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setPlaceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFacilityToggle = (facility: string) => {
    setPlaceData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated data:", placeData);
    // Handle update logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/profile" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปโปรไฟล์
          </Link>
          <h1 className="text-3xl font-bold text-foreground">อัปเดตข้อมูลสถานที่</h1>
          <p className="text-muted-foreground mt-2">แก้ไขและอัปเดตข้อมูลสถานที่ของคุณ</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Update Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>ข้อมูลสถานที่</CardTitle>
                <CardDescription>อัปเดตข้อมูลให้เป็นปัจจุบัน</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Tabs defaultValue="basic" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="basic">ข้อมูลพื้นฐาน</TabsTrigger>
                      <TabsTrigger value="details">รายละเอียด</TabsTrigger>
                      <TabsTrigger value="location">ที่อยู่</TabsTrigger>
                      <TabsTrigger value="media">รูปภาพ</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-4">
                      <div>
                        <Label htmlFor="name">ชื่อสถานที่ *</Label>
                        <Input
                          id="name"
                          value={placeData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="ชื่อสถานที่"
                        />
                      </div>

                      <div>
                        <Label htmlFor="category">ประเภท *</Label>
                        <Select value={placeData.category} onValueChange={(value) => handleInputChange("category", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกประเภท" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.icon} {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="description">คำอธิบาย *</Label>
                        <Textarea
                          id="description"
                          value={placeData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="อธิบายเพิ่มเติมเกี่ยวกับสถานที่"
                          rows={4}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="details" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                          <Input
                            id="phone"
                            value={placeData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="073-123456"
                          />
                        </div>

                        <div>
                          <Label htmlFor="website">เว็บไซต์</Label>
                          <Input
                            id="website"
                            value={placeData.website}
                            onChange={(e) => handleInputChange("website", e.target.value)}
                            placeholder="www.example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="openHours">เวลาเปิด-ปิด</Label>
                          <Input
                            id="openHours"
                            value={placeData.openHours}
                            onChange={(e) => handleInputChange("openHours", e.target.value)}
                            placeholder="08:00 - 22:00"
                          />
                        </div>

                        <div>
                          <Label htmlFor="priceRange">ช่วงราคา (บาท)</Label>
                          <Input
                            id="priceRange"
                            value={placeData.priceRange}
                            onChange={(e) => handleInputChange("priceRange", e.target.value)}
                            placeholder="100-300"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>สิ่งอำนวยความสะดวก</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {facilityOptions.map((facility) => (
                            <div
                              key={facility.value}
                              onClick={() => handleFacilityToggle(facility.value)}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                placeData.facilities.includes(facility.value)
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-background hover:bg-muted border-border"
                              }`}
                            >
                              <div className="text-center">
                                <div className="text-lg mb-1">{facility.icon}</div>
                                <div className="text-xs">{facility.label}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="location" className="space-y-4">
                      <div>
                        <Label htmlFor="address">ที่อยู่ *</Label>
                        <Textarea
                          id="address"
                          value={placeData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="ที่อยู่ของสถานที่"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="latitude">ละติจูด</Label>
                          <Input
                            id="latitude"
                            value={placeData.latitude}
                            onChange={(e) => handleInputChange("latitude", e.target.value)}
                            placeholder="6.5404"
                          />
                        </div>

                        <div>
                          <Label htmlFor="longitude">ลองจิจูด</Label>
                          <Input
                            id="longitude"
                            value={placeData.longitude}
                            onChange={(e) => handleInputChange("longitude", e.target.value)}
                            placeholder="101.2801"
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span className="font-medium">พิกัดปัจจุบัน</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {placeData.latitude}, {placeData.longitude}
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          เลือกจากแผนที่
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="media" className="space-y-4">
                      <div>
                        <Label>รูปภาพปัจจุบัน</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {placeData.images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`รูปที่ ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ลบ
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
                        <div className="text-center">
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-lg font-medium mb-2">เพิ่มรูปภาพใหม่</p>
                          <p className="text-muted-foreground mb-4">
                            ลากและวางไฟล์รูปภาพหรือคลิกเพื่อเลือก
                          </p>
                          <div className="flex gap-2 justify-center">
                            <Button variant="outline">
                              <Upload className="h-4 w-4 mr-2" />
                              เลือกไฟล์
                            </Button>
                            <Button variant="outline">
                              <Camera className="h-4 w-4 mr-2" />
                              ถ่ายรูป
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex gap-4 pt-6 border-t">
                    <Button type="submit" className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      บันทึกการเปลี่ยนแปลง
                    </Button>
                    <Link to="/profile">
                      <Button variant="outline">ยกเลิก</Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Reviews */}
          <div className="space-y-6">
            {/* Preview Card */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>ตัวอย่าง</CardTitle>
                <CardDescription>การแสดงผลสถานที่ของคุณ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={placeData.images[0]}
                      alt={placeData.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Badge variant="secondary" className="absolute top-2 left-2">
                      {categoryOptions.find(c => c.value === placeData.category)?.icon}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">{placeData.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {placeData.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-3 w-3" />
                    <span>{placeData.openHours}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3" />
                    <span>{placeData.phone}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {placeData.facilities.slice(0, 3).map((facility) => {
                      const facilityData = facilityOptions.find(f => f.value === facility);
                      return (
                        <Badge key={facility} variant="outline" className="text-xs">
                          {facilityData?.icon} {facilityData?.label}
                        </Badge>
                      );
                    })}
                    {placeData.facilities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{placeData.facilities.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>รีวิวล่าสุด</CardTitle>
                <CardDescription>ความคิดเห็นจากผู้เยี่ยมชม</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="flex gap-3">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{review.user}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {review.comment}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                    </div>
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

export default UpdatePlace;