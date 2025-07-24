import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Store, Users, Calendar, Star, Edit, Eye, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const CommunityProfile = () => {
  const [business] = useState({
    name: "นางสาวสมใจ ใจดี",
    businessName: "ร้านอาหารใต้ต้นไผ่",
    email: "somjai@restaurant.com",
    phone: "081-234-5678",
    joinDate: "มีนาคม 2023",
    type: "ผู้ประกอบการร้านอาหาร",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    businessLogo: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=100&h=100&fit=crop"
  });

  const [managedPlaces] = useState([
    {
      id: 1,
      name: "ร้านอาหารใต้ต้นไผ่",
      category: "restaurant",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop",
      rating: 4.6,
      reviews: 124,
      status: "active",
      lastUpdated: "2024-01-20"
    },
    {
      id: 2,
      name: "บริการรถตู้ทัวร์ยะลา",
      category: "transport", 
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop",
      rating: 4.8,
      reviews: 89,
      status: "active",
      lastUpdated: "2024-01-18"
    }
  ]);

  const [communityActivities] = useState([
    {
      id: 1,
      title: "เทศกาลอาหารใต้ยะลา",
      date: "2024-02-15",
      type: "งานเทศกาล",
      participants: 250,
      description: "งานแสดงอาหารพื้นเมืองและวัฒนธรรมใต้",
      status: "upcoming"
    },
    {
      id: 2,
      title: "การฝึกอบรมไกด์ท้องถิ่น",
      date: "2024-01-25",
      type: "อบรม",
      participants: 30,
      description: "ฝึกอบรมไกด์ท้องถิ่นเพื่อส่งเสริมการท่องเที่ยว",
      status: "completed"
    },
    {
      id: 3,
      title: "โครงการดูแลสิ่งแวดล้อม",
      date: "2024-01-10",
      type: "อนุรักษ์",
      participants: 80,
      description: "กิจกรรมรักษาความสะอาดแหล่งท่องเที่ยว",
      status: "completed"
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

  const getActivityTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "งานเทศกาล": "bg-purple-100 text-purple-800",
      "อบรม": "bg-blue-100 text-blue-800",
      "อนุรักษ์": "bg-green-100 text-green-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Business Profile Header */}
        <Card className="shadow-card mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={business.avatar} alt={business.name} />
                  <AvatarFallback className="text-2xl">{business.name.split(' ')[1]?.[0] || business.name[0]}</AvatarFallback>
                </Avatar>
                {business.businessLogo && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-muted">
                    <img src={business.businessLogo} alt="Business Logo" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-foreground mb-1">{business.name}</h1>
                <h2 className="text-xl text-primary mb-2">{business.businessName}</h2>
                <Badge variant="secondary" className="mb-4">{business.type}</Badge>
                <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    เข้าร่วมตั้งแต่ {business.joinDate}
                  </div>
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    {managedPlaces.length} สถานที่ที่ดูแล
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {communityActivities.filter(a => a.status === "completed").length} กิจกรรมที่ผ่านมา
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button className="mt-4 md:mt-0">
                  แก้ไขโปรไฟล์
                </Button>
                <Link to="/ai-assistant">
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    ผู้ช่วย AI
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">{managedPlaces.length}</div>
              <p className="text-muted-foreground">สถานที่ที่ดูแล</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-secondary mb-2">
                {managedPlaces.reduce((sum, place) => sum + place.reviews, 0)}
              </div>
              <p className="text-muted-foreground">รีวิวทั้งหมด</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">
                {communityActivities.filter(a => a.status === "upcoming").length}
              </div>
              <p className="text-muted-foreground">กิจกรรมที่กำลังมา</p>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-warning mb-2">
                {communityActivities.reduce((sum, activity) => sum + activity.participants, 0)}
              </div>
              <p className="text-muted-foreground">ผู้เข้าร่วมกิจกรรม</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="places" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="places">สถานที่ที่ดูแล</TabsTrigger>
            <TabsTrigger value="activities">กิจกรรมชุมชน</TabsTrigger>
            <TabsTrigger value="analytics">สถิติการใช้งาน</TabsTrigger>
          </TabsList>

          <TabsContent value="places">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>สถานที่ที่คุณดูแลอยู่</CardTitle>
                <CardDescription>
                  จัดการและอัปเดตข้อมูลสถานที่ของคุณ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {managedPlaces.map((place) => (
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
                        <Badge 
                          variant={place.status === "active" ? "default" : "secondary"}
                          className="absolute top-2 right-2"
                        >
                          {place.status === "active" ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{place.name}</h3>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{place.rating}</span>
                            <span className="text-xs text-muted-foreground">({place.reviews} รีวิว)</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            อัปเดต {place.lastUpdated}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/place/${place.id}`} className="flex-1">
                            <Button size="sm" variant="outline" className="w-full">
                              <Eye className="h-3 w-3 mr-1" />
                              ดู
                            </Button>
                          </Link>
                          <Link to={`/update/${place.id}`}>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <Link to="/upload">
                    <Button>เพิ่มสถานที่ใหม่</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>กิจกรรมชุมชน</CardTitle>
                <CardDescription>
                  กิจกรรมที่คุณมีส่วนร่วมหรือจัดขึ้น
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityActivities.map((activity) => (
                    <Card key={activity.id} className="border hover:shadow-hover transition-all">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{activity.title}</h3>
                            <p className="text-muted-foreground">{activity.description}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={activity.status === "completed" ? "default" : "secondary"}>
                              {activity.status === "completed" ? "เสร็จสิ้น" : "กำลังมา"}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">{activity.date}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <Badge className={getActivityTypeColor(activity.type)}>
                            {activity.type}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            {activity.participants} คน
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            ดูรายละเอียด
                          </Button>
                          {activity.status === "upcoming" && (
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3 mr-1" />
                              แก้ไข
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>สถิติการใช้งาน</CardTitle>
                <CardDescription>
                  ข้อมูลการเข้าชมและการใช้งานสถานที่ของคุณ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">สถิติรายเดือน</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>การเข้าชมโปรไฟล์</span>
                        <span className="font-semibold">1,234 ครั้ง</span>
                      </div>
                      <div className="flex justify-between">
                        <span>การบันทึกสถานที่</span>
                        <span className="font-semibold">89 ครั้ง</span>
                      </div>
                      <div className="flex justify-between">
                        <span>รีวิวใหม่</span>
                        <span className="font-semibold">23 รีวิว</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">สถานที่ยอดนิยม</h3>
                    <div className="space-y-2">
                      {managedPlaces.map((place, index) => (
                        <div key={place.id} className="flex justify-between">
                          <span>{index + 1}. {place.name}</span>
                          <span className="font-semibold">{place.reviews} รีวิว</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityProfile;